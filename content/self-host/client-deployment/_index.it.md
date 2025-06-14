---
title: Distribuzione Client
weight: 400
pre: "<b>2.4. </b>"
---

Il modo più semplice è utilizzare un client personalizzato, https://twitter.com/rustdesk/status/1788905463678951787.

Puoi distribuire utilizzando diversi metodi, alcuni sono coperti in [Configurazione Client](https://rustdesk.com/docs/en/self-host/client-configuration/).

In alternativa, puoi utilizzare script di distribuzione di massa con il tuo RMM, Intune, ecc. L'ID e la password sono outputtati dallo script. Dovresti raccogliere questo o dividerlo in script diversi per raccogliere l'ID e la password.

La password permanente può essere cambiata da casuale a una che preferisci modificando il contenuto dentro `()` dopo `rustdesk_pw` alla tua password preferita per PowerShell e la riga corrispondente per qualsiasi altra piattaforma.

### PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Assegna il valore della password casuale alla variabile password
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Ottieni la tua stringa di configurazione dal tuo portale Web e compila qui sotto
$rustdesk_cfg="configstring"

################################### Per favore non modificare sotto questa linea #########################################

# Esegui come amministratore e rimani nella directory corrente
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Questa funzione restituirà l'ultima versione e il link di download come oggetto
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

    # Link di esempio corrente: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # correzione bug - a volte devi sostituire "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "ERRORE: Versione o link di download non trovato."
        Exit
    }

    # Crea oggetto da restituire
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver è la versione più recente."
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
    Write-Output "Installazione servizio"
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
# Mostra il valore della variabile ID
Write-Output "ID RustDesk: $rustdesk_id"

# Mostra il valore della variabile password
Write-Output "Password: $rustdesk_pw"
Write-Output "..............................................."
```

### Windows batch/cmd

```bat
@echo off

REM Assegna il valore della password casuale alla variabile password
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Ottieni la tua stringa di configurazione dal tuo portale Web e compila qui sotto
set rustdesk_cfg="configstring"

REM ############################### Per favore non modificare sotto questa linea #########################################

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
REM Mostra il valore della variabile ID
echo ID RustDesk: %rustdesk_id%

REM Mostra il valore della variabile password
echo Password: %rustdesk_pw%
echo ...............................................
```

### MSI

Puoi anche usare msi invece di `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/en/client/windows/msi/


### Winget

puoi distribuire tramite powershell con winget anche (questo installa tramite la versione Microsoft di apt - parte delle installazioni Windows più recenti)

da una finestra powershell o tramite script (ad esempio tramite GPO)

```
winget install --id=RustDesk.RustDesk  -e
```

### macOS Bash

```sh
#!/bin/bash

# Assegna il valore della password casuale alla variabile password
rustdesk_pw=$(openssl rand -hex 4)

# Ottieni la tua stringa di configurazione dal tuo portale Web e compila qui sotto
rustdesk_cfg="configstring"

################################### Per favore non modificare sotto questa linea #########################################

# Richiesta password root per l'elevazione dei privilegi
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Specifica il punto di montaggio per il DMG (directory temporanea)
mount_point="/Volumes/RustDesk"

# Scarica il file rustdesk.dmg
echo "Scaricando RustDesk ora"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# Monta il file DMG al punto di montaggio specificato
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Controlla se il montaggio è riuscito
if [ $? -eq 0 ]; then
    # Sposta il contenuto del DMG montato nella cartella /Applications
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Smonta il file DMG
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Impossibile montare il DMG RustDesk. Installazione interrotta."
    exit 1
fi

# Esegui il comando rustdesk con --get-id e memorizza l'output nella variabile rustdesk_id
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Applica nuova password a RustDesk
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Termina tutti i processi chiamati RustDesk
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# Controlla se rustdesk_id non è vuoto
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk: $rustdesk_id"
else
    echo "Impossibile ottenere l'ID RustDesk."
fi

# Mostra il valore della variabile password
echo "Password: $rustdesk_pw"
echo "..............................................."

echo "Per favore completa l'installazione su GUI, avviando RustDesk ora."
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# Assegna un valore casuale alla variabile password
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Ottieni la tua stringa di configurazione dal tuo portale Web e compila qui sotto
rustdesk_cfg="configstring"

################################### Per favore non modificare sotto questa linea #########################################

# Controlla se lo script è in esecuzione come root
if [[ $EUID -ne 0 ]]; then
    echo "Questo script deve essere eseguito come root."
    exit 1
fi

# Identifica OS
if [ -f /etc/os-release ]; then
    # freedesktop.org e systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Fallback a ID_LIKE se ID non era 'ubuntu' o 'debian'
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # Per alcune versioni di Debian/Ubuntu senza il comando lsb_release
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Debian più vecchio, Ubuntu, ecc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # SuSE più vecchio ecc.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Red Hat più vecchio, CentOS, ecc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Fallback a uname, ad es. "Linux <version>", funziona anche per BSD, ecc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Installa RustDesk

echo "Installazione di RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "OS non supportato"
    # qui potresti chiedere all'utente il permesso di provare a installare comunque
    # se dicono sì, allora fai l'installazione
    # se dicono no, esci dallo script
    exit 1
fi

# Esegui il comando rustdesk con --get-id e memorizza l'output nella variabile rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Applica nuova password a RustDesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Controlla se rustdesk_id non è vuoto
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk: $rustdesk_id"
else
    echo "Impossibile ottenere l'ID RustDesk."
fi

# Mostra il valore della variabile password
echo "Password: $rustdesk_pw"
echo "..............................................."
```