---
title: Client-Bereitstellung
weight: 400
pre: "<b>2.4. </b>"
---

Sie können eine Reihe von Methoden für die Bereitstellung verwenden, von denen einige in [Client-Konfiguration](/docs/de/self-host/client-configuration/) beschrieben sind.

Alternativ können Sie Skripte für die Massenbereitstellung mit Ihrem RMM, Intune usw. verwenden. Die ID und das Passwort werden vom Skript ausgegeben. Sie sollten sie ermitteln oder sie in verschiedene Skripte aufteilen, um die ID und das Passwort zu ermitteln.

Das permanente Passwort kann von einem Zufallspasswort in ein von Ihnen bevorzugtes Passwort geändert werden, indem Sie den Inhalt in `()` nach `rustdesk_pw` in Ihr bevorzugtes Passwort für PowerShell und die entsprechende Zeile für jede andere Plattform ändern.

### PowerShell

```ps
$ErrorActionPreference= 'silentlycontinue'

# Der Passwortvariablen ein zufälliges Passwort zuweisen
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Die Konfigurationszeichenkette von Ihrem Webportal abrufen und unten ausfüllen
$rustdesk_cfg="configstring"

############################## Bitte nicht unterhalb dieser Zeile bearbeiten ###################################

# Wird als Administrator ausgeführt und bleibt im aktuellen Verzeichnis
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq "1.2.2")
{
    Write-Output "RustDesk $rdver ist die neueste Version"
    Exit
}

If (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Write-Output "Installieren des Dienstes"
    cd $env:ProgramFiles\RustDesk
    Start-Process .\rustdesk.exe --install-service -wait -Verbose
    Start-Sleep -seconds 20
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}

cd $env:ProgramFiles\RustDesk\
.\RustDesk.exe --get-id | Write-Output -OutVariable rustdesk_id

.\RustDesk.exe --config $rustdesk_cfg

.\RustDesk.exe --password $rustdesk_pw

Write-Output "..............................................."
# Den Wert der ID-Variable anzeigen
Write-Output "RustDesk-ID: $rustdesk_id"

# Den Wert der Passwort-Variable anzeigen
Write-Output "Passwort: $rustdesk_pw"
Write-Output "..............................................."
```

### Windows batch/cmd

```bat
@echo off

REM Der Variablen password den Wert random password zuweisen
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789

set rustdesk_pw=
FOR /L %%b IN (1, 1, 12) DO (
    SET /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
)

REM Holen Sie sich Ihren Konfigurationsstring von Ihrem Webportal und füllen Sie ihn wie folgt aus
set rustdesk_cfg="configstring"

REM ############################## Bitte nicht unterhalb dieser Zeile bearbeiten ###############################

if not exist C:\Temp\ md C:\Temp\
cd C:\Temp\

curl -L "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -o rustdesk.exe

rustdesk.exe --silent-install
timeout /t 20

cd "C:\Program Files\RustDesk\"
for /f "delims=" %%i IN ('rustdesk.exe --get-id ^| more') DO set rustdesk_id=%%i

RustDesk.exe --config %rustdesk_cfg%

RustDesk.exe --password %rustdesk_pw%

echo ...............................................
REM Den Wert der ID-Variablen ausgeben
echo RustDesk-ID: %rustdesk_id%

REM Den Wert der Passwort-Variablen ausgeben
echo Passwort: %rustdesk_pw%
echo ...............................................
```

### macOS Bash

```sh
#!/bin/bash

# Der Passwortvariablen ein zufälliges Passwort zuweisen
rustdesk_pw=$(openssl rand -hex 4)

# Die Konfigurationszeichenkette von Ihrem Webportal abrufen und unten ausfüllen
rustdesk_cfg="configstring"

############################## Bitte nicht unterhalb dieser Zeile bearbeiten ###################################

# Prüfen, ob das Skript als root ausgeführt wird
if [[ $EUID -ne 0 ]]; then
    echo "Das Skript muss als root ausgeführt werden."
    exit 1
fi

# Den Pfad zur Datei rustdesk.dmg angeben
dmg_file="/tmp/rustdesk-1.2.2-x86_64.dmg"

# Den Einhängepunkt für das DMG (temporäres Verzeichnis) angeben
mount_point="/Volumes/RustDesk"

# Die Datei rustdesk.dmg herunterladen
echo "RustDesk jetzt herunterladen"

if [[ $(arch) == 'arm64' ]]; then
    curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-aarch64.dmg --output "$dmg_file"
else
    curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.dmg --output "$dmg_file"
fi

# Einhängen der DMG-Datei in den angegebenen Einhängepunkt
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Prüfen, ob das Einhängen erfolgreich war
if [ $? -eq 0 ]; then
    # Den Inhalt der gemounteten DMG in den Ordner /Applications verschieben
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Aushängen der DMG-Datei
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Die RustDesk-DMG konnte nicht eingehängt werden. Die Installation wurde abgebrochen."
    exit 1
fi

# Den Befehl rustdesk mit --get-id ausführen und die Ausgabe in der Variable rustdesk_id speichern
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Neues Passwort auf RustDesk anwenden
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Alle Prozesse namens RustDesk beenden
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# Prüfen, ob die rustdesk_id nicht leer ist
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk-ID: $rustdesk_id"
else
    echo "RustDesk-ID konnte nicht ermittelt werden."
fi

# Den Wert der Passwortvariablen ausgeben
echo "Passwort: $rustdesk_pw"
echo "..............................................."

echo "Bitte schließen Sie die Installation auf der GUI ab und starten Sie RustDesk jetzt."
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# Der Passwortvariablen ein zufälliges Passwort zuweisen
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Die Konfigurationszeichenkette von Ihrem Webportal abrufen und unten ausfüllen
rustdesk_cfg="configstring"

############################## Bitte nicht unterhalb dieser Zeile bearbeiten ###################################

# Prüfen, ob das Skript als root ausgeführt wird
if [[ $EUID -ne 0 ]]; then
    echo "Dieses Skript muss als root ausgeführt werden."
    exit 1
fi

# OS identifizieren
if [ -f /etc/os-release ]; then
    # freedesktop.org und systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Rückgriff auf ID_LIKE, wenn ID nicht 'ubuntu' oder 'debian' war
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # Für einige Versionen von Debian/Ubuntu ohne den Befehl lsb_release
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Ältere Debian, Ubuntu usw.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # Ältere SuSE usw.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Ältere Red Hat, CentOS usw.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Rückgriff auf uname, z. B. "Linux <version>", funktioniert auch für BSD usw.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# RustDesk installieren

echo "Installieren von RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.2-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.2-0.x86_64.rpm -y > null
else
    echo "Nicht unterstütztes OS"
    # Hier könnten Sie den Benutzer um Erlaubnis bitten, die Installation trotzdem zu versuchen
    # Wenn sie ja sagen, dann installieren Sie
    # Wenn sie nein sagen, das Skript beenden
    exit 1
fi

# Führen Sie den Befehl rustdesk mit --get-id aus und speichern Sie die Ausgabe in der Variable rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Neues Passwort auf RustDesk anwenden
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Prüfen, ob die rustdesk_id nicht leer ist
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk-ID: $rustdesk_id"
else
    echo "RustDesk-ID konnte nicht ermittelt werden."
fi

# Den Wert der Passwortvariablen ausgeben
echo "Passwort: $rustdesk_pw"
echo "..............................................."
```
