---
title: Client Deployment
weight: 400
pre: "<b>2.4. </b>"
description: "Deploy RustDesk clients at scale with PowerShell, batch, or macOS bash scripts. Use these deployment examples to install RustDesk, apply config strings, and set passwords automatically."
keywords: ["rustdesk client deployment", "rustdesk powershell deploy", "rustdesk mass deployment", "rustdesk intune", "rustdesk rmm", "rustdesk silent deployment"]
---

This guide covers large-scale RustDesk client deployment with scripts and automation tools such as PowerShell, batch, and macOS bash. If you need the simplest experience and have RustDesk Server Pro, start with the custom client generator: https://twitter.com/rustdesk/status/1788905463678951787.

## What is the best way to deploy RustDesk clients at scale?

For RustDesk Server Pro, the easiest large-scale deployment path is usually the custom client generator because it packages your server settings into the client build. For environments managed through RMM, Intune, GPO, or custom automation, PowerShell, batch, and shell scripts are more flexible.

## Which deployment method should you choose?

| Method | Best for | Why you would use it |
| --- | --- | --- |
| Custom client generator | RustDesk Server Pro teams | Simplest packaged deployment with preloaded settings |
| PowerShell | Windows fleet automation | Good fit for RMM, Intune, and scripted installs |
| Batch or cmd | Basic Windows scripting | Works in simpler Windows environments without PowerShell-heavy tooling |
| MSI | Managed Windows software deployment | Better fit when you already use MSI-based packaging workflows |
| macOS bash | Mac fleet deployment | Scriptable installation and config for macOS hosts |

## What inputs do deployment scripts need?

Most deployment scripts need three things:

- A RustDesk config string
- A deployment method that can run with administrator or root privileges
- A password policy, either random or explicitly set during deployment

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


## macOS Bash

This script handles the full macOS deployment lifecycle: downloading the latest release (auto-detecting Apple Silicon vs Intel), installing to `/Applications`, initializing the config directory as the logged-in user, setting the password and relay server configuration, and optionally launching in headless server mode. It includes proper error handling, timestamped logging to `/tmp/rustdesk-install.log`, and a LaunchAgent fallback for machines where no user is logged in at install time (e.g., DEP/MDM enrollments).

```sh
#!/bin/bash

# Assign the value random password to the password variable
rustdesk_pw=$(openssl rand -hex 4)

## Relay server configuration
## Set these to your own RustDesk relay server details
RELAY_SERVER="your.relay.server.com"
RELAY_KEY="YOUR_RELAY_KEY_HERE"
MSP="yourorg"
## Server mode - set to "y" to launch RustDesk in headless mode on login
SERVER="Y"

LOG="/tmp/rustdesk-install.log"
rm -f "$LOG"
# Create log file with world-writable permissions so the user-context subscript can write to it
touch "$LOG"
chmod 666 "$LOG"
echo "Version 1.4.6.85800" >> ${LOG}

# Trap unexpected exits and log them
_on_exit() {
    local code=$?
    [[ $code -ne 0 ]] && echo "$(date '+%Y-%m-%d %H:%M:%S') | FATAL: Script terminated unexpectedly (exit code $code)" | tee -a "$LOG"
}
trap _on_exit EXIT



######################################################################
############# Please Do Not Edit Below This Line #####################
######################################################################

# Root password request for privilege escalation
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Helper functions
console_user() {
    /usr/bin/who | grep console | cut -d ' ' -f1 | head -1
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
echo "$(date '+%Y-%m-%d %H:%M:%S') | Downloading RustDesk Now" | tee -a "$LOG"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file="/tmp/$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file="/tmp/$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")"
fi

# Verify download link was found
if [ -z "$rd_link" ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: Failed to find RustDesk download link. Installation aborted." | tee -a "$LOG"
    exit 1
fi

# Download the DMG
echo "$(date '+%Y-%m-%d %H:%M:%S') | Download URL: $rd_link" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | Architecture: $(arch)" | tee -a "$LOG"
if ! curl -fL "$rd_link" --output "$dmg_file"; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: Failed to download RustDesk. Installation aborted." | tee -a "$LOG"
    exit 1
fi

# Verify file was downloaded and is not empty
if [ ! -s "$dmg_file" ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: Downloaded file is empty or missing. Installation aborted." | tee -a "$LOG"
    exit 1
fi

# Mount the DMG file to the specified mount point
echo "$(date '+%Y-%m-%d %H:%M:%S') | Mounting DMG: $dmg_file" | tee -a "$LOG"
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Check if the mounting was successful
if [ $? -eq 0 ]; then
    # Move the contents of the mounted DMG to the /Applications folder
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null
    echo "$(date '+%Y-%m-%d %H:%M:%S') | RustDesk.app copied to /Applications/" | tee -a "$LOG"

    # Unmount the DMG file
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: Failed to mount the RustDesk DMG. Installation aborted." | tee -a "$LOG"
    exit 1
fi

# Initialize the config directory via Launch Services (RustDesk becomes responsible process for TCC)
CONSOLE_USER=$(/usr/bin/who | grep console | cut -d ' ' -f1 | head -1)
echo "$(date '+%Y-%m-%d %H:%M:%S') | Console user detected: '${CONSOLE_USER:-<empty>}'" | tee -a "$LOG"

if [[ -z "$CONSOLE_USER" || "$CONSOLE_USER" == "loginwindow" || "$CONSOLE_USER" == "_mbsetupuser" ]]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: No valid console user found. Cannot initialize RustDesk config directory." | tee -a "$LOG"
    exit 1
fi

echo "$(date '+%Y-%m-%d %H:%M:%S') | Launching RustDesk as '$CONSOLE_USER' to initialize config directory..." | tee -a "$LOG"
if ! run_as_user open /Applications/RustDesk.app --args --server >> "$LOG" 2>&1; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: Failed to launch RustDesk as '$CONSOLE_USER'. Check if RustDesk.app is installed." | tee -a "$LOG"
    exit 1
fi
echo "$(date '+%Y-%m-%d %H:%M:%S') | RustDesk launched successfully." | tee -a "$LOG"

# Wait for RustDesk to initialize its config directory rather than using a fixed sleep.
# Also confirm the directory is owned by the console user, not root.
RDCONFIG_DIR="/Users/$CONSOLE_USER/Library/Preferences/com.carriez.RustDesk"
MAX_WAIT=30
WAITED=0
echo "$(date '+%Y-%m-%d %H:%M:%S') | Waiting up to ${MAX_WAIT}s for config directory to appear and be user-owned..." | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | Expected path: $RDCONFIG_DIR" | tee -a "$LOG"

while [[ $WAITED -lt $MAX_WAIT ]]; do
    if [[ -d "$RDCONFIG_DIR" && "$(stat -f '%Su' "$RDCONFIG_DIR")" == "$CONSOLE_USER" ]]; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') | Config directory ready and user-owned after ${WAITED}s." | tee -a "$LOG"
        break
    fi
    echo "$(date '+%Y-%m-%d %H:%M:%S') | Still waiting... (${WAITED}s elapsed)" | tee -a "$LOG"
    sleep 1
    WAITED=$((WAITED + 1))
done

if [[ ! -d "$RDCONFIG_DIR" || "$(stat -f '%Su' "$RDCONFIG_DIR")" != "$CONSOLE_USER" ]]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') | ERROR: RustDesk config directory never appeared or is not owned by '$CONSOLE_USER' after ${MAX_WAIT}s. Aborting." | tee -a "$LOG"
    echo "$(date '+%Y-%m-%d %H:%M:%S') | Diagnostic — directory exists: $([[ -d "$RDCONFIG_DIR" ]] && echo yes || echo no)" | tee -a "$LOG"
    echo "$(date '+%Y-%m-%d %H:%M:%S') | Diagnostic — directory owner: $(stat -f '%Su' "$RDCONFIG_DIR" 2>/dev/null || echo 'N/A')" | tee -a "$LOG"
    echo "$(date '+%Y-%m-%d %H:%M:%S') | Diagnostic — RustDesk processes: $(pgrep -la RustDesk 2>/dev/null || echo none)" | tee -a "$LOG"
    exit 1
fi

# Install the password (config operation, no TCC involvement)
echo "$(date '+%Y-%m-%d %H:%M:%S') | Setting RustDesk password..." | tee -a "$LOG"
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw
sleep 1
# Get RustDesk ID
rustdesk_id=$(/Applications/RustDesk.app/Contents/MacOS/RustDesk --get-id)
sleep 1

# Kill RustDesk
pkill -x RustDesk &>/dev/null || true

echo "$(date '+%Y-%m-%d %H:%M:%S') | ..............................................." | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | Install complete!" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | RustDesk ID: $rustdesk_id" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | RustDesk Password: $rustdesk_pw" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | ..............................................." | tee -a "$LOG"

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

LOG="$LOG"
exec > >(tee -a "\$LOG") 2>&1

echo "=== RustDesk Config Script Started: \$(date) ==="

RELAY_SERVER="$RELAY_SERVER"
RELAY_KEY="$RELAY_KEY"
SERVER_MODE="$SERVER"
CONSOLE_USER=\$(/usr/bin/who | grep console | cut -d ' ' -f1 | head -1)

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

# Start RustDesk based on configured mode
if [[ "\$SERVER_MODE" == "y" || "\$SERVER_MODE" == "Y" ]]; then
    echo "\$(date '+%Y-%m-%d %H:%M:%S') | SERVER MODE: Launching RustDesk in headless/server mode" | tee -a "\$LOG"
    open /Applications/RustDesk.app --args --server
    echo "\$(date '+%Y-%m-%d %H:%M:%S') | SERVER MODE: RustDesk server launched (exit code: \$?)" | tee -a "\$LOG"
elif [[ "\$SERVER_MODE" == "n" || "\$SERVER_MODE" == "N" ]]; then
    echo "\$(date '+%Y-%m-%d %H:%M:%S') | CLIENT MODE: Launching RustDesk in GUI mode" | tee -a "\$LOG"
    open -n /Applications/RustDesk.app
    echo "\$(date '+%Y-%m-%d %H:%M:%S') | CLIENT MODE: RustDesk launched (exit code: \$?)" | tee -a "\$LOG"
fi
SCRIPT_EOF

chmod +x "$CONFIG_SCRIPT"

# Try to run as currently logged-in user
if run_as_user /bin/bash "$CONFIG_SCRIPT"; then
	echo "$(date '+%Y-%m-%d %H:%M:%S') | ..............................................." | tee -a "$LOG"
	echo "$(date '+%Y-%m-%d %H:%M:%S') | Configuration completed for logged-in user" | tee -a "$LOG"
	echo "$(date '+%Y-%m-%d %H:%M:%S') | Server mode: $SERVER" | tee -a "$LOG"
	echo "$(date '+%Y-%m-%d %H:%M:%S') | ..............................................." | tee -a "$LOG"
    rm -f "$dmg_file"
    exit 0
fi

# No user logged in - create LaunchAgent for next login
echo "$(date '+%Y-%m-%d %H:%M:%S') | No user logged in. Creating LaunchAgent for next login..." | tee -a "$LOG"

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

echo "$(date '+%Y-%m-%d %H:%M:%S') | ..............................................." | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | Install Complete (configuration pending login)" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | Server mode: $SERVER" | tee -a "$LOG"
echo "$(date '+%Y-%m-%d %H:%M:%S') | ..............................................." | tee -a "$LOG"
# Cleanup downloaded DMG
rm -f "$dmg_file"

exit 0
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
