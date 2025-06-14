---
title: 客户端部署
weight: 400
pre: "<b>2.4. </b>"
---

最简单的方法是使用自定义客户端，https://twitter.com/rustdesk/status/1788905463678951787。

您可以使用多种方法进行部署，其中一些在[客户端配置](https://rustdesk.com/docs/en/self-host/client-configuration/)中有介绍。

或者，您可以通过 RMM、Intune 等使用批量部署脚本。ID 和密码由脚本输出。您应该收集这些信息或将其拆分为不同的脚本来收集 ID 和密码。

可以通过将 `rustdesk_pw` 后面 `()` 内的内容更改为您首选的密码来将永久密码从随机更改为您首选的密码，这适用于 PowerShell，其他平台的相应行也是如此。

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# 为密码变量分配随机密码值
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# 从您的 Web 门户获取配置字符串并填写下面
$rustdesk_cfg="configstring"

################################## 请不要编辑此行以下的内容 #########################################

# 以管理员身份运行并保持在当前目录
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# 此函数将返回最新版本和下载链接作为对象
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

    # 当前示例链接: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # 错误修复 - 有时需要替换 "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "错误：未找到版本或下载链接。"
        Exit
    }

    # 创建要返回的对象
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
    Write-Output "正在安装服务"
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
# 显示 ID 变量的值
Write-Output "RustDesk ID: $rustdesk_id"

# 显示密码变量的值
Write-Output "密码: $rustdesk_pw"
Write-Output "..............................................."
```

## Windows 批处理/cmd

```bat
@echo off

REM 为密码变量分配随机密码值
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM 从您的 Web 门户获取配置字符串并填写下面
set rustdesk_cfg="configstring"

REM ############################### 请不要编辑此行以下的内容 #########################################

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
REM 显示 ID 变量的值
echo RustDesk ID: %rustdesk_id%

REM 显示密码变量的值
echo 密码: %rustdesk_pw%
echo ...............................................
```

## MSI

您也可以使用 msi 而不是 `rustdesk.exe --silent-install`。

https://rustdesk.com/docs/en/client/windows/msi/


## Winget

您也可以通过 powershell 使用 winget 进行部署（这通过微软版本的 apt 安装 - 大多数最新 Windows 安装的一部分）

从 powershell 窗口或通过脚本（例如通过 GPO）

```
winget install --id=RustDesk.RustDesk  -e
```

## macOS Bash

```sh
#!/bin/bash

# 为密码变量分配随机密码值
rustdesk_pw=$(openssl rand -hex 4)

# 从您的 Web 门户获取配置字符串并填写下面
rustdesk_cfg="configstring"

################################## 请不要编辑此行以下的内容 #########################################

# 请求 root 密码以进行权限提升
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# 指定 DMG 的挂载点（临时目录）
mount_point="/Volumes/RustDesk"

# 下载 rustdesk.dmg 文件
echo "正在下载 RustDesk"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# 将 DMG 文件挂载到指定的挂载点
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# 检查挂载是否成功
if [ $? -eq 0 ]; then
    # 将挂载的 DMG 内容移动到 /Applications 文件夹
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # 卸载 DMG 文件
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "挂载 RustDesk DMG 失败。安装中止。"
    exit 1
fi

# 运行 rustdesk 命令带 --get-id 并将输出存储在 rustdesk_id 变量中
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# 为 RustDesk 应用新密码
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# 终止所有名为 RustDesk 的进程
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# 检查 rustdesk_id 是否不为空
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "获取 RustDesk ID 失败。"
fi

# 回显密码变量的值
echo "密码: $rustdesk_pw"
echo "..............................................."

echo "请在 GUI 上完成安装，现在启动 RustDesk。"
open -n /Applications/RustDesk.app
```

## Linux

```sh
#!/bin/bash

# 为密码变量分配随机值
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# 从您的 Web 门户获取配置字符串并填写下面
rustdesk_cfg="configstring"

################################## 请不要编辑此行以下的内容 #########################################

# 检查脚本是否以 root 身份运行
if [[ $EUID -ne 0 ]]; then
    echo "此脚本必须以 root 身份运行。"
    exit 1
fi

# 识别操作系统
if [ -f /etc/os-release ]; then
    # freedesktop.org 和 systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # 如果 ID 不是 'ubuntu' 或 'debian'，则回退到 ID_LIKE
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # 对于一些没有 lsb_release 命令的 Debian/Ubuntu 版本
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # 较旧的 Debian、Ubuntu 等
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # 较旧的 SuSE 等
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # 较旧的 Red Hat、CentOS 等
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # 回退到 uname，例如 "Linux <version>"，也适用于 BSD 等
    OS=$(uname -s)
    VER=$(uname -r)
fi

# 安装 RustDesk

echo "正在安装 RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "不支持的操作系统"
    # 这里您可以询问用户是否允许尝试安装
    # 如果他们说是，则进行安装
    # 如果他们说否，退出脚本
    exit 1
fi

# 运行 rustdesk 命令带 --get-id 并将输出存储在 rustdesk_id 变量中
rustdesk_id=$(rustdesk --get-id)

# 为 RustDesk 应用新密码
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# 检查 rustdesk_id 是否不为空
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "获取 RustDesk ID 失败。"
fi

# 回显密码变量的值
echo "密码: $rustdesk_pw"
echo "..............................................."
```