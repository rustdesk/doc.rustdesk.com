---
title: Déploiement Client
weight: 400
pre: "<b>2.4. </b>"
---

La méthode la plus simple est d'utiliser un client personnalisé, https://twitter.com/rustdesk/status/1788905463678951787.

Vous pouvez déployer en utilisant plusieurs méthodes, dont certaines sont couvertes dans [Configuration Client](https://rustdesk.com/docs/en/self-host/client-configuration/).

Alternativement, vous pouvez utiliser des scripts de déploiement de masse avec votre RMM, Intune, etc. L'ID et le mot de passe sont sortis par le script. Vous devriez collecter cela ou le diviser en différents scripts pour collecter l'ID et le mot de passe.

Le mot de passe permanent peut être changé d'aléatoire à celui que vous préférez en modifiant le contenu entre `()` après `rustdesk_pw` vers votre mot de passe préféré pour PowerShell et la ligne correspondante pour toute autre plateforme.

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Assigner la valeur du mot de passe aléatoire à la variable mot de passe
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Obtenez votre chaîne de config depuis votre portail Web et remplissez ci-dessous
$rustdesk_cfg="configstring"

################################## Veuillez ne pas modifier en dessous de cette ligne #########################################

# Exécuter en tant qu'administrateur et rester dans le répertoire courant
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Cette fonction retournera la dernière version et le lien de téléchargement comme un objet
function getLatest()
{
    $Page = Invoke-WebRequest -Uri 'https://github.com/rustdesk/rustdesk/releases/latest' -UseBasicParsing
    $HTML = New-Object -Com "HTMLFile"
    try
    {
        $HTML.IHTMLDocument2_write($Page.Content)
    }
    catch
    {
        $src = [System.Text.Encoding]::Unicode.GetBytes($Page.Content)
        $HTML.write($src)
    }

    # Lien d'exemple actuel : https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # correction de bug - parfois vous devez remplacer "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "ERREUR : Version ou lien de téléchargement non trouvé."
        Exit
    }

    # Créer un objet à retourner
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver est la version la plus récente."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp | Out-Null
}

cd C:\Temp

Invoke-WebRequest $RustDeskOnGitHub.Downloadlink -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install
Start-Sleep -seconds 20

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Write-Output "Installation du service"
    cd $env:ProgramFiles\RustDesk
    Start-Process .\rustdesk.exe --install-service
    Start-Sleep -seconds 20
    $arrService = Get-Service -Name $ServiceName
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}

cd $env:ProgramFiles\RustDesk\
.\rustdesk.exe --get-id | Write-Output -OutVariable rustdesk_id

.\rustdesk.exe --config $rustdesk_cfg

.\rustdesk.exe --password $rustdesk_pw

Write-Output "..............................................."
# Afficher la valeur de la variable ID
Write-Output "ID RustDesk : $rustdesk_id"

# Afficher la valeur de la variable mot de passe
Write-Output "Mot de passe : $rustdesk_pw"
Write-Output "..............................................."
```

## Windows batch/cmd

```bat
@echo off

REM Assigner la valeur du mot de passe aléatoire à la variable mot de passe
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Obtenez votre chaîne de config depuis votre portail Web et remplissez ci-dessous
set rustdesk_cfg="configstring"

REM ############################### Veuillez ne pas modifier en dessous de cette ligne #########################################

if not exist C:\Temp\ md C:\Temp\
cd C:\Temp\

curl -L "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -o rustdesk.exe

rustdesk.exe --silent-install
timeout /t 20

cd "C:\Program Files\RustDesk\"
rustdesk.exe --install-service
timeout /t 20

for /f "delims=" %%i in ('rustdesk.exe --get-id ^| more') do set rustdesk_id=%%i

rustdesk.exe --config %rustdesk_cfg%

rustdesk.exe --password %rustdesk_pw%

echo ...............................................
REM Afficher la valeur de la variable ID
echo ID RustDesk : %rustdesk_id%

REM Afficher la valeur de la variable mot de passe
echo Mot de passe : %rustdesk_pw%
echo ...............................................
```

## MSI

Vous pouvez aussi utiliser msi au lieu de `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/en/client/windows/msi/


## Winget

vous pouvez déployer via powershell avec winget également (cela s'installe via la version Microsoft d'apt - partie des installations Windows les plus récentes)

depuis une fenêtre powershell ou via un script (par exemple via GPO)

```
winget install --id=RustDesk.RustDesk  -e
```

## macOS Bash

```sh
#!/bin/bash

# Assigner la valeur du mot de passe aléatoire à la variable mot de passe
rustdesk_pw=$(openssl rand -hex 4)

# Obtenez votre chaîne de config depuis votre portail Web et remplissez ci-dessous
rustdesk_cfg="configstring"

################################## Veuillez ne pas modifier en dessous de cette ligne #########################################

# Demande de mot de passe root pour l'élévation de privilège
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Spécifier le point de montage pour le DMG (répertoire temporaire)
mount_point="/Volumes/RustDesk"

# Télécharger le fichier rustdesk.dmg
echo "Téléchargement de RustDesk maintenant"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# Monter le fichier DMG au point de montage spécifié
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Vérifier si le montage a réussi
if [ $? -eq 0 ]; then
    # Déplacer le contenu du DMG monté vers le dossier /Applications
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Démonter le fichier DMG
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Échec du montage du DMG RustDesk. Installation abandonnée."
    exit 1
fi

# Exécuter la commande rustdesk avec --get-id et stocker la sortie dans la variable rustdesk_id
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Appliquer le nouveau mot de passe à RustDesk
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Tuer tous les processus nommés RustDesk
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# Vérifier si rustdesk_id n'est pas vide
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk : $rustdesk_id"
else
    echo "Échec de l'obtention de l'ID RustDesk."
fi

# Afficher la valeur de la variable mot de passe
echo "Mot de passe : $rustdesk_pw"
echo "..............................................."

echo "Veuillez terminer l'installation sur GUI, lancement de RustDesk maintenant."
open -n /Applications/RustDesk.app
```

## Linux

```sh
#!/bin/bash

# Assigner une valeur aléatoire à la variable mot de passe
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Obtenez votre chaîne de config depuis votre portail Web et remplissez ci-dessous
rustdesk_cfg="configstring"

################################## Veuillez ne pas modifier en dessous de cette ligne #########################################

# Vérifier si le script est exécuté en tant que root
if [[ $EUID -ne 0 ]]; then
    echo "Ce script doit être exécuté en tant que root."
    exit 1
fi

# Identifier l'OS
if [ -f /etc/os-release ]; then
    # freedesktop.org et systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Retomber sur ID_LIKE si ID n'était pas 'ubuntu' ou 'debian'
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # Pour certaines versions de Debian/Ubuntu sans la commande lsb_release
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Debian plus ancien, Ubuntu, etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # SuSE plus ancien etc.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Red Hat plus ancien, CentOS, etc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Retomber sur uname, par exemple "Linux <version>", fonctionne aussi pour BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Installer RustDesk

echo "Installation de RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "OS non supporté"
    # ici vous pourriez demander à l'utilisateur la permission d'essayer d'installer quand même
    # s'il dit oui, alors faire l'installation
    # s'il dit non, quitter le script
    exit 1
fi

# Exécuter la commande rustdesk avec --get-id et stocker la sortie dans la variable rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Appliquer le nouveau mot de passe à RustDesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Vérifier si rustdesk_id n'est pas vide
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk : $rustdesk_id"
else
    echo "Échec de l'obtention de l'ID RustDesk."
fi

# Afficher la valeur de la variable mot de passe
echo "Mot de passe : $rustdesk_pw"
echo "..............................................."
```