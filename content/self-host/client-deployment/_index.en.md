---
title: Client Deployment
weight: 400
pre: "<b>2.4. </b>"
---

The simplest way is to use custom client, https://twitter.com/rustdesk/status/1788905463678951787.

You can deploy using a number of methods, some are covered in [Client Configuration](https://rustdesk.com/docs/en/self-host/client-configuration/).

Alternatively you can use mass deployment scripts with your RMM, Intune, etc. The ID and password are output by the script. You should collect this or split it into different scripts to collect the ID and password.

The permanent password can be changed from random to one you prefer using by changing the content inside `()` after `rustdesk_pw` to your preferred password for PowerShell and the corresponding line for any other platform.

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Assign the value random password to the password variable
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Get your config string from your Web portal and Fill Below
$rustdesk_cfg="configstring"

################################## Please Do Not Edit Below This Line #########################################

# Run as administrator and stays in the current directory
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# This function will return the latest version and download link as an object
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

    # Current example link: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # bugfix - sometimes you need to replace "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "ERROR: Version or download link not found."
        Exit
    }

    # Create object to return
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver is the newest version."
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
    Write-Output "Installing service"
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
# Show the value of the ID Variable
Write-Output "RustDesk ID: $rustdesk_id"

# Show the value of the Password Variable
Write-Output "Password: $rustdesk_pw"
Write-Output "..............................................."
```

## Windows batch/cmd

```bat
@echo off

REM Assign the value random password to the password variable
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Get your config string from your Web portal and Fill Below
set rustdesk_cfg="configstring"

REM ############################### Please Do Not Edit Below This Line #########################################

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
REM Show the value of the ID Variable
echo RustDesk ID: %rustdesk_id%

REM Show the value of the Password Variable
echo Password: %rustdesk_pw%
echo ...............................................
```

## MSI

You can also use msi instead of `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/en/client/windows/msi/


## Winget

you can deploy via powershell with winget as well (this installs via microsofts version of apt - part of most recent windows installs)

from a powershell window or via script (for example via GPO)

```
winget install --id=RustDesk.RustDesk  -e
```

## macOS Bash

```sh
#!/bin/bash
# Written by Jordan Eunson - 2026-01-24 - jordaneunson.com
# v0.1 basic code added
# v0.2 embedded script to write to /usr/local/bin for user facing configuration
# v0.3 added login hook and server/headless option
# v0.4 made the config and plist self destruct


# Requires a user to be logged into the console, will try to adapt with a launchagent but YMMV

# Assign the value random password to the password variable
rustdesk_pw=$(openssl rand -hex 4)

## Relay server configuration
RELAY_SERVER="PUT YOUR RELAY SERVER HERE"
RELAY_KEY="PUT YOUR RELAY KEY HERE="
MSP="NAME OF YOUR COMPANY OR DEPARTMENT HERE, NO WHITE SPACE"

## Server/Headless mode - set to "y" to launch RustDesk in headless mode on login
SERVER="n"


######################################################################
############# Please Do Not Edit Below This Line #####################
######################################################################

# Root password request for privilege escalation
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Helper functions
console_user() {
    /usr/sbin/scutil <<< 'show State:/Users/ConsoleUser' | awk '/Name :/ {print $3}'
}

run_as_user() {
    local u
    u="$(console_user || true)"
    [[ -n "$u" && "$u" != "loginwindow" && "$u" != "_mbsetupuser" ]] || return 1
    /bin/launchctl asuser "$(/usr/bin/id -u "$u")" /usr/bin/sudo -u "$u" "$@"
}

# Specify the mount point for the DMG (temporary directory)
mount_point="/Volumes/RustDesk"

# Download the rustdesk.dmg file
echo "Downloading RustDesk Now"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# Verify download link was found
if [ -z "$rd_link" ]; then
    echo "Failed to find RustDesk download link. Installation aborted."
    exit 1
fi

# Download the DMG
if ! curl -fL "$rd_link" --output "$dmg_file"; then
    echo "Failed to download RustDesk. Installation aborted."
    exit 1
fi

# Verify file was downloaded and is not empty
if [ ! -s "$dmg_file" ]; then
    echo "Downloaded file is empty or missing. Installation aborted."
    exit 1
fi

# Mount the DMG file to the specified mount point
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Check if the mounting was successful
if [ $? -eq 0 ]; then
    # Move the contents of the mounted DMG to the /Applications folder
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Unmount the DMG file
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Failed to mount the RustDesk DMG. Installation aborted."
    exit 1
fi

# Initialize the config directory
CONSOLE_USER=`/usr/sbin/scutil <<< 'show State:/Users/ConsoleUser' | awk '/Name :/ {print $3}'`
sudo -u $CONSOLE_USER /Applications/RustDesk.app/Contents/MacOS/RustDesk --server &
sleep 3
# Install the password
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw
# Get RustDesk ID 
rustdesk_id=`/Applications/RustDesk.app/Contents/MacOS/RustDesk --get-id`
# Kill RustDesk
pkill -x RustDesk &>/dev/null || true

echo "..............................................."
echo "Install complete!"
echo "RustDesk ID: $rustdesk_id"
echo "RustDesk Password: $rustdesk_pw"
echo "..............................................."

# Configuration paths
CONFIG_SCRIPT_DIR="/usr/local/bin"
CONFIG_SCRIPT="$CONFIG_SCRIPT_DIR/configure_rustdesk.sh"
LAUNCHAGENT_PLIST="/Library/LaunchAgents/com.${MSP}.rustdesk-config.plist"

# Create directory for config script
[[ ! -d "$CONFIG_SCRIPT_DIR" ]] && mkdir -p "$CONFIG_SCRIPT_DIR"

# Write the configure script
cat > "$CONFIG_SCRIPT" <<SCRIPT_EOF
#!/bin/bash

# RustDesk Client Configuration Script
# Runs as the logged-in user to configure relay server

LOG="/tmp/rustdesk-config.log"
exec > >(tee -a "\$LOG") 2>&1

echo "=== RustDesk Config Script Started: \$(date) ==="

RELAY_SERVER="$RELAY_SERVER"
RELAY_KEY="$RELAY_KEY"
SERVER_MODE="$SERVER"
CONSOLE_USER=\$(/usr/sbin/scutil <<< 'show State:/Users/ConsoleUser' | awk '/Name :/ {print \$3}')

echo "Console user: \$CONSOLE_USER"

if [[ -z "\$CONSOLE_USER" || "\$CONSOLE_USER" == "loginwindow" ]]; then
    echo "ERROR: No valid user logged in"
    exit 1
fi

CONFIG_DIR="/Users/\$CONSOLE_USER/Library/Preferences/com.carriez.RustDesk"
BINARY="/Applications/RustDesk.app/Contents/MacOS/RustDesk"

echo "Config dir: \$CONFIG_DIR"
echo "Binary: \$BINARY"

# Verify binary exists
if [[ ! -x "\$BINARY" ]]; then
    echo "ERROR: RustDesk binary not found or not executable"
    exit 1
fi

# Verify config directory exists
if [[ ! -d "\$CONFIG_DIR" ]]; then
    echo "ERROR: Config directory does not exist: \$CONFIG_DIR"
    exit 1
fi

echo "=== Writing RustDesk Configuration ==="

# Write config file
if ! cat > "/tmp/RustDesk2.toml" <<TOML_EOF
rendezvous_server = '\$RELAY_SERVER'
nat_type = 1
serial = 0
unlock_pin = ''
trusted_devices = ''

[options]
custom-rendezvous-server = '\$RELAY_SERVER'
relay-server = '\$RELAY_SERVER'
api-server = ''
key = '\$RELAY_KEY'
TOML_EOF
then
    echo "ERROR: Failed to write config file"
    exit 1
fi

rm -f "\$CONFIG_DIR/RustDesk2.toml"
cp /tmp/RustDesk2.toml "\$CONFIG_DIR/"

echo "..............................................."
echo "Configuration complete!"
echo "Relay Server: \$RELAY_SERVER"
echo "Relay Key: \$RELAY_KEY"
echo "..............................................."

# Cleanup - remove LaunchAgent and this script
rm -f "$LAUNCHAGENT_PLIST"

# Start RustDesk in server/headless mode if configured
if [[ "\$SERVER_MODE" == "y" || "\$SERVER_MODE" == "Y" ]]; then
    /Applications/RustDesk.app/Contents/MacOS/RustDesk --server &
fi

# Launch RustDesk
open -n /Applications/RustDesk.app

SCRIPT_EOF

chmod +x "$CONFIG_SCRIPT"

# Try to run as currently logged-in user
if run_as_user /bin/bash "$CONFIG_SCRIPT"; then
    echo "Configuration completed for logged-in user"
	
    # Create server mode LaunchAgent if enabled
    if [[ "$SERVER" == "y" || "$SERVER" == "Y" ]]; then
        echo "Creating RustDesk server mode LaunchAgent..."

        SERVER_PLIST="/Library/LaunchAgents/com.copiousit.rustdesk-server.plist"

        cat > "$SERVER_PLIST" <<SERVER_PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.copiousit.rustdesk-server</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Applications/RustDesk.app/Contents/MacOS/RustDesk</string>
        <string>--server</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
SERVER_PLIST_EOF

        chmod 644 "$SERVER_PLIST"
        echo "Server mode LaunchAgent created at $SERVER_PLIST"
    fi
	
    rm -f "$dmg_file"
    exit 0
fi

# No user logged in - create LaunchAgent for next login
echo "No user logged in. Creating LaunchAgent for next login..."

cat > "$LAUNCHAGENT_PLIST" <<PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.${MSP}.rustdesk-config</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>$CONFIG_SCRIPT</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
PLIST_EOF

chmod 644 "$LAUNCHAGENT_PLIST"

echo "..............................................."
echo "Install Complete (configuration pending login)"
echo "..............................................."

# Cleanup downloaded DMG
rm -f "$dmg_file"
```

## Linux

```sh
#!/bin/bash

# Assign a random value to the password variable
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Get your config string from your Web portal and Fill Below
rustdesk_cfg="configstring"

################################## Please Do Not Edit Below This Line #########################################

# Check if the script is being run as root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root."
    exit 1
fi

# Identify OS
if [ -f /etc/os-release ]; then
    # freedesktop.org and systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Fallback to ID_LIKE if ID was not 'ubuntu' or 'debian'
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # For some versions of Debian/Ubuntu without lsb_release command
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Older Debian, Ubuntu, etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # Older SuSE etc.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Older Red Hat, CentOS, etc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Fall back to uname, e.g. "Linux <version>", also works for BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Install RustDesk

echo "Installing RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "Unsupported OS"
    # here you could ask the user for permission to try and install anyway
    # if they say yes, then do the install
    # if they say no, exit the script
    exit 1
fi

# Run the rustdesk command with --get-id and store the output in the rustdesk_id variable
rustdesk_id=$(rustdesk --get-id)

# Apply new password to RustDesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Check if the rustdesk_id is not empty
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "Failed to get RustDesk ID."
fi

# Echo the value of the password variable
echo "Password: $rustdesk_pw"
echo "..............................................."
```
