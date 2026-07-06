---
title: 클라이언트 배포
weight: 400
pre: "<b>2.4. </b>"
description: "PowerShell, 배치 또는 macOS bash 스크립트를 사용하여 RustDesk 클라이언트를 대규모로 배포하세요. 이러한 배포 예제를 사용해 RustDesk를 설치하고, 구성 문자열을 적용하며, 암호를 자동으로 설정할 수 있습니다."
keywords: ["rustdesk client deployment", "rustdesk powershell deploy", "rustdesk mass deployment", "rustdesk intune", "rustdesk rmm", "rustdesk silent deployment"]
---

이 안내서는 PowerShell, 배치 및 macOS bash와 같은 스크립트 및 자동화 도구를 사용한 대규모 RustDesk 클라이언트 배포를 다룹니다. 가장 간단한 경험을 원하고 RustDesk Server Pro를 보유한 경우, 사용자 지정 클라이언트 생성기를 이용해 시작하세요: https://twitter.com/rustdesk/status/1788905463678951787.

## 대규모로 RustDesk 클라이언트를 배포하는 가장 좋은 방법은 무엇인가요?

RustDesk Server Pro의 경우, 서버 설정을 클라이언트 빌드에 포함시키기 때문에 사용자 지정 클라이언트 생성기가 일반적으로 가장 쉬운 대규모 배포 경로입니다. RMM, Intune, GPO 또는 사용자 지정 자동화를 통해 관리되는 환경에서는 PowerShell, 배치 및 셸 스크립트가 더 유연합니다.

## 어떤 배포 방법을 선택해야 하나요?

| 방법 | 가장 적합한 경우 | 사용하는 이유 |
| --- | --- | --- |
| 사용자 지정 클라이언트 생성기 | RustDesk Server Pro 팀 | 미리 로드된 설정과 함께 가장 간단한 패키지 배포 |
| PowerShell | Windows 플릿 자동화 | RMM, Intune 및 스크립트 기반 설치에 적합 |
| 배치 또는 cmd | 기본 Windows 스크립팅 | PowerShell 중심의 도구 없이 더 간단한 Windows 환경에서 작동 |
| MSI | 관리되는 Windows 소프트웨어 배포 | 이미 MSI 기반 패키징 워크플로를 사용하는 경우 더 적합 |
| macOS bash | Mac 플릿 배포 | macOS 호스트용 스크립트 가능한 설치 및 구성 |

## 배포 스크립트에는 어떤 입력이 필요합니까?

대부분의 배포 스크립트는 세 가지를 필요로 합니다:

- RustDesk 구성 문자열
- 관리자 또는 root 권한으로 실행할 수 있는 배포 방법
- 무작위 또는 배포 시 명시적으로 설정된 비밀번호 정책

여러 방법을 사용해 배포할 수 있으며, 일부 방법은 [Client Configuration](https://rustdesk.com/docs/en/self-host/client-configuration/)에 설명되어 있습니다.

또는 RMM, Intune 등과 함께 대량 배포 스크립트를 사용할 수도 있습니다. ID와 비밀번호는 스크립트에서 출력됩니다. 이를 수집하거나 ID와 비밀번호를 각각 다른 스크립트로 분리하여 수집해야 합니다.

영구 비밀번호는 `rustdesk_pw` 이후 `()` 내부의 내용을 PowerShell용 선호하는 비밀번호로 변경하고, 기타 플랫폼의 경우 해당 라인을 변경함으로써 무작위에서 원하는 비밀번호로 변경할 수 있습니다.

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

## Windows 배치/명령줄

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

`rustdesk.exe --silent-install` 대신 msi를 사용할 수도 있습니다.

https://rustdesk.com/docs/en/client/windows/msi/

## macOS Bash

```sh
#!/bin/bash

# Assign the value random password to the password variable
rustdesk_pw=$(openssl rand -hex 4)

# Get your config string from your Web portal and Fill Below
rustdesk_cfg="configstring"

################################## Please Do Not Edit Below This Line #########################################

# Root password request for privilege escalation
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

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
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > /dev/null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > /dev/null
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

## 새 장치에 대한 명시적 배포

기본적으로 RustDesk 클라이언트는 처음 서버에 연결할 때 자체 호스팅된 서버에 등록됩니다. 일반 모드에서는 추가적인 배포 단계가 필요하지 않습니다.

서버 웹 콘솔에서 **설정 → 기타 → 새 장치에 대한 배포 요구**를 활성화하면, 새 장치는 이 서버에 등록되기 전에 반드시 명시적으로 배포되어야 합니다.

관리자 계정으로 서버 웹 콘솔에서 [API token](/docs/ko/self-host/rustdesk-server-pro/console/#api-token)를 생성하세요. 해당 토큰은 **장치** 권한이 **읽기 및 쓰기**로 설정되어 있어야 합니다. 그런 다음 RustDesk를 설치하고 자체 호스팅된 서버를 사용하도록 구성한 후 각 새 데스크톱 장치에서 배포 명령을 실행하세요.

### Windows, macOS 및 Linux

Windows에서는 관리자 권한으로 명령 프롬프트 또는 PowerShell을 실행하세요:

```bat
rustdesk --deploy --token <api_token>
```

macOS 및 Linux에서는 `sudo`와 함께 명령어를 실행하십시오:

```sh
sudo rustdesk --deploy --token <api_token>
```

### 선택적 사용자 지정 ID

특정 RustDesk ID로 장치를 배포하려면 `--id <custom_id>`를 추가하세요:

```sh
rustdesk --deploy --token <api_token> --id <custom_id>
```

ID가 이미 다른 기계에서 사용되고 있으면 배포가 실패하고 RustDesk는 해당 ID가 이미 사용 중이라고 보고합니다.

### Android

Android는 명령줄 배포 흐름을 사용하지 않습니다. 서버가 배포를 요구하고 Android 클라이언트가 아직 배포되지 않은 경우, RustDesk는 **배포** 프롬프트를 표시합니다. **확인**을 탭하고 배포 대화상자에 API 토큰을 입력한 다음, 선택적으로 사용자 지정 ID를 입력하세요. 또한 **설정 → 배포**에서 동일한 대화상자를 수동으로 열 수도 있습니다.

배포가 성공하면 장치가 서버 장치 목록에 추가되고 클라이언트는 정상적으로 등록할 수 있습니다.