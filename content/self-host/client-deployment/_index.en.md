---
title: Client Deployment
weight: 400
pre: "<b>2.4. </b>"
---

You can deploy using a number of methods, some are covered in [Client Configuration](/docs/en/self-host/client-configuration/).

Alternatively you can use mass deployment scripts with your RMM, Intune, etc. The ID and password are output by the script. You should collect this or split it into different scripts to collect the ID and password.

The permanent password can be changed from random to one you prefer using by changing the content inside `()` after `rustdesk_pw` to your preferred password for PowerShell and the corresponding line for any other platform.

### PowerShell

```ps
$ErrorActionPreference= 'silentlycontinue'

# Assign the value random password to the password variable
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Get your config string from your Web portal and Fill Below
$rustdesk_cfg="configstring"

################################### Please Do Not Edit Below This Line #########################################

# Run as administrator and stays in the current directory
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
    Write-Output "RustDesk $rdver is the newest version"
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
    Write-Output "Installing service"
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
# Show the value of the ID Variable
Write-Output "RustDesk ID: $rustdesk_id"

# Show the value of the Password Variable
Write-Output "Password: $rustdesk_pw"
Write-Output "..............................................."
```

### Windows batch/cmd

```bat
@echo off

REM Assign the value random password to the password variable
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789

set rustdesk_pw=
FOR /L %%b IN (1, 1, 12) DO (
    SET /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
)

REM Get your config string from your Web portal and Fill Below
set rustdesk_cfg="configstring"

REM ############################### Please Do Not Edit Below This Line #########################################

if not exist C:\Temp\ md C:\Temp\
cd C:\Temp\

curl -L "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -o rustdesk.exe

rustdesk.exe --silent-install
timeout /t 20

cd "C:\Program Files\RustDesk\"
rustdesk.exe --install-service -wait -Verbose
timeout /t 20

for /f "delims=" %%i IN ('rustdesk.exe --get-id ^| more') DO set rustdesk_id=%%i

RustDesk.exe --config %rustdesk_cfg%

RustDesk.exe --password %rustdesk_pw%

echo ...............................................
REM Show the value of the ID Variable
echo RustDesk ID: %rustdesk_id%

REM Show the value of the Password Variable
echo Password: %rustdesk_pw%
echo ...............................................
```

### macOS Bash

```sh
#!/bin/bash

# Assign the value random password to the password variable
rustdesk_pw=$(openssl rand -hex 4)

# Get your config string from your Web portal and Fill Below
rustdesk_cfg="configstring"

################################### Please Do Not Edit Below This Line #########################################

# Check if the script is being run as root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root."
    exit 1
fi

# Specify the path to the rustdesk.dmg file
dmg_file="/tmp/rustdesk-1.2.2-x86_64.dmg"

# Specify the mount point for the DMG (temporary directory)
mount_point="/Volumes/RustDesk"

# Download the rustdesk.dmg file
echo "Downloading RustDesk Now"

if [[ $(arch) == 'arm64' ]]; then
    curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-aarch64.dmg --output "$dmg_file"
else
    curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.dmg --output "$dmg_file"
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

# Run the rustdesk command with --get-id and store the output in the rustdesk_id variable
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Apply new password to RustDesk
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Kill all processes named RustDesk
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

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

echo "Please complete install on GUI, launching RustDesk now."
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# Assign a random value to the password variable
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Get your config string from your Web portal and Fill Below
rustdesk_cfg="configstring"

################################### Please Do Not Edit Below This Line #########################################

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
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.2-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.2-0.x86_64.rpm -y > null
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
