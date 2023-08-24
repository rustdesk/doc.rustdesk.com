---
title: Client Deployment
weight: 6
---

You can deploy using a number of methods, some are covered in [Client](/docs/en/client/#configuring-rustdesk)

Alternatively you can use mass deployment scripts with your RMM, intune etc, the ID and password is output by the script, you should collect this, or split this off into different scripts to collect the ID and password.

The permanent password can be changed from random to one you prefer using by changing the content inside () after $rustdesk_pw to your preferred password.

### Powershell

```ps
$ErrorActionPreference= 'silentlycontinue'

$rdaddr = 
$rdapi = 
$rdkey = 
$rustdesk_pw = (-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_})) 


####################################Please Do Not Edit Below This Line##########################################

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq "1.2.2") 
{
write-output "RustDesk $rdver is the newest version"

exit
}

If (!(Test-Path c:\Temp)) {
  New-Item -ItemType Directory -Force -Path c:\Temp > null
}

cd c:\Temp

powershell Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Start-Sleep -seconds 20
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}
net stop rustdesk

$username = ((Get-WMIObject -ClassName Win32_ComputerSystem).Username).Split('\')[1]
Remove-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = '$rdaddr' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = '$rdaddr'`nkey = '$rdkey'`nrelay-server = '$rdaddr'`napi-server = '$rdapi'"
Remove-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = '$rdaddr' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = '$rdaddr'`nkey = '$rdkey'`nrelay-server = '$rdaddr'`napi-server = '$rdapi'"

net start rustdesk

cd $env:ProgramFiles\RustDesk\
$rustdesk_id = (.\RustDesk.exe --get-id | out-host)

net stop rustdesk > null
$ProcessActive = Get-Process rustdesk -ErrorAction SilentlyContinue
if($ProcessActive -ne $null)
{
stop-process -ProcessName rustdesk -Force
}

Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" "--password $rustdesk_pw" -wait

Write-Output $rustdesk_id
Write-Output $rustdesk_pw

net start rustdesk > null
```

### Mac OS Bash

```sh
#!/bin/bash

# Assign the value random password to the password variable
rustdesk_password=$(openssl rand -hex 4)

# Get your config string from your Web portal and Fill Below.
rustdesk_config="configstring" 

####################################Please Do Not Edit Below This Line##########################################

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
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_password &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_config

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
echo "Password: $rustdesk_password"
echo "..............................................."

echo "Please complete install on GUI, launching RustDesk now."
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# Assign a random value to the password variable
rustdesk_password=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)


# Get your config string from your Web portal and Fill Below.
rustdesk_config="encryptedconfigstring" 

####################################Please Do Not Edit Below This Line##########################################

# Check if the script is being run as root
if [[ $EUID -ne 0 ]]; then
	echo "This script must be run as root."
	exit 1
fi

# identify OS
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
    # Older Debian/Ubuntu/etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSe-release ]; then
    # Older SuSE/etc.
    OS=SuSE
    VER=$(cat /etc/SuSe-release)
elif [ -f /etc/redhat-release ]; then
    # Older Red Hat, CentOS, etc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Fall back to uname, e.g. "Linux <version>", also works for BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Install Rustdesk

echo "Installing Rustdesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ]  || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.2-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ]  || [ "${UPSTREAM_ID}" = "rhel" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.2-0.x86_64.rpm -y > null
else
    echo "Unsupported OS"
    # here you could ask the user for permission to try and install anyway
    # if they say yes, then do the install
    # if they say no, exit the script
    exit 1
fi

systemctl stop rustdesk

# Run the rustdesk command with --get-id and store the output in the rustdesk_id variable
rustdesk_id=$(rustdesk --get-id)

# Apply new password to RustDesk
systemctl start rustdesk
rustdesk --password $rustdesk_password &> /dev/null

rustdesk --config $rustdesk_config

systemctl restart rustdesk


echo "..............................................."
# Check if the rustdesk_id is not empty
if [ -n "$rustdesk_id" ]; then
	echo "RustDesk ID: $rustdesk_id"
else
	echo "Failed to get RustDesk ID."
fi

# Echo the value of the password variable
echo "Password: $rustdesk_password"
echo "..............................................."
```
