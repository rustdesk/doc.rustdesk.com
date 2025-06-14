---
title: 客戶端部署
weight: 400
pre: "<b>2.4. </b>"
---

最簡單的方法是使用自訂客戶端，https://twitter.com/rustdesk/status/1788905463678951787。

您可以使用多種方法進行部署，其中一些方法在[客戶端配置](https://rustdesk.com/docs/en/self-host/client-configuration/)中有所涵蓋。

或者，您可以在 RMM、Intune 等系統中使用大量部署腳本。腳本會輸出 ID 和密碼。您應該收集這些資訊或將其分割到不同的腳本中以收集 ID 和密碼。

永久密碼可以透過修改 PowerShell 中 `rustdesk_pw` 後面的 `()` 中的內容，以及其他平台相應行的內容，從隨機密碼更改為您偏好的密碼。

### PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# 為密碼變數分配隨機密碼值
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# 從您的 Web 門戶獲取配置字串並填入以下位置
$rustdesk_cfg="configstring"

################################### 請勿編輯此行以下的內容 #########################################

# 以管理員身份執行並保持在目前目錄
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# 此函數會將最新版本和下載連結作為物件回傳
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

    # 目前範例連結：https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # 錯誤修復 - 有時您需要替換 "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "錯誤：找不到版本或下載連結。"
        Exit
    }

    # 建立要回傳的物件
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver 是最新版本。"
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
    Write-Output "正在安裝服務"
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
# 顯示 ID 變數的值
Write-Output "RustDesk ID：$rustdesk_id"

# 顯示密碼變數的值
Write-Output "密碼：$rustdesk_pw"
Write-Output "..............................................."
```

### Windows batch/cmd

```bat
@echo off

REM 為密碼變數分配隨機密碼值
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM 從您的 Web 門戶獲取配置字串並填入以下位置
set rustdesk_cfg="configstring"

REM ############################### 請勿編輯此行以下的內容 #########################################

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
REM 顯示 ID 變數的值
echo RustDesk ID：%rustdesk_id%

REM 顯示密碼變數的值
echo 密碼：%rustdesk_pw%
echo ...............................................
```

### MSI

您也可以使用 msi 代替 `rustdesk.exe --silent-install`。

https://rustdesk.com/docs/en/client/windows/msi/


### Winget

您也可以透過帶有 winget 的 powershell 進行部署（這會透過 Microsoft 版本的 apt 進行安裝 - 大多數最新 Windows 安裝的一部分）

從 powershell 視窗或透過腳本（例如透過 GPO）

```
winget install --id=RustDesk.RustDesk  -e
```

### macOS Bash

```sh
#!/bin/bash

# 為密碼變數分配隨機密碼值
rustdesk_pw=$(openssl rand -hex 4)

# 從您的 Web 門戶獲取配置字串並填入以下位置
rustdesk_cfg="configstring"

################################### 請勿編輯此行以下的內容 #########################################

# 需要 root 密碼進行權限提升
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# 為 DMG 指定掛載點（臨時目錄）
mount_point="/Volumes/RustDesk"

# 下載 rustdesk.dmg 檔案
echo "正在下載 RustDesk"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# 將 DMG 檔案掛載到指定的掛載點
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# 檢查掛載是否成功
if [ $? -eq 0 ]; then
    # 將掛載的 DMG 內容移動到 /Applications 資料夾
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # 卸載 DMG 檔案
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "無法掛載 RustDesk DMG。安裝已中止。"
    exit 1
fi

# 執行帶有 --get-id 的 rustdesk 命令並將輸出儲存在 rustdesk_id 變數中
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# 為 RustDesk 套用新密碼
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# 終止所有名為 RustDesk 的處理程序
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# 檢查 rustdesk_id 是否不為空
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID：$rustdesk_id"
else
    echo "無法取得 RustDesk ID。"
fi

# 顯示密碼變數的值
echo "密碼：$rustdesk_pw"
echo "..............................................."

echo "請在 GUI 上完成安裝，正在啟動 RustDesk。"
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# 為密碼變數分配隨機值
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# 從您的 Web 門戶獲取配置字串並填入以下位置
rustdesk_cfg="configstring"

################################### 請勿編輯此行以下的內容 #########################################

# 檢查腳本是否以 root 身份執行
if [[ $EUID -ne 0 ]]; then
    echo "此腳本必須以 root 身份執行。"
    exit 1
fi

# 識別作業系統
if [ -f /etc/os-release ]; then
    # freedesktop.org 和 systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # 如果 ID 不是 'ubuntu' 或 'debian'，則回退到 ID_LIKE
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # 針對某些沒有 lsb_release 命令的 Debian/Ubuntu 版本
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # 較舊的 Debian、Ubuntu 等
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # 較舊的 SuSE 等
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # 較舊的 Red Hat、CentOS 等
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # 回退到 uname，例如 "Linux <version>"，也適用於 BSD 等
    OS=$(uname -s)
    VER=$(uname -r)
fi

# 安裝 RustDesk

echo "正在安裝 RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "不支援的作業系統"
    # 在這裡您可以詢問使用者是否允許嘗試安裝
    # 如果他們說是，則進行安裝
    # 如果他們說不，則退出腳本
    exit 1
fi

# 執行帶有 --get-id 的 rustdesk 命令並將輸出儲存在 rustdesk_id 變數中
rustdesk_id=$(rustdesk --get-id)

# 為 RustDesk 套用新密碼
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# 檢查 rustdesk_id 是否不為空
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID：$rustdesk_id"
else
    echo "無法取得 RustDesk ID。"
fi

# 顯示密碼變數的值
echo "密碼：$rustdesk_pw"
echo "..............................................."
```