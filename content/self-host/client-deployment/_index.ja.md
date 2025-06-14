---
title: クライアントデプロイメント
weight: 400
pre: "<b>2.4. </b>"
---

最も簡単な方法はカスタムクライアントを使用することです、https://twitter.com/rustdesk/status/1788905463678951787。

いくつかの方法でデプロイできます。一部は[クライアント設定](https://rustdesk.com/docs/en/self-host/client-configuration/)でカバーされています。

あるいは、RMM、Intuneなどで一括デプロイメントスクリプトを使用できます。IDとパスワードはスクリプトによって出力されます。これを収集するか、IDとパスワードを収集するために別々のスクリプトに分割する必要があります。

永続パスワードは、PowerShellの`rustdesk_pw`の後の`()`内の内容をお好みのパスワードに変更し、他のプラットフォームの対応する行を変更することで、ランダムからお好みのものに変更できます。

### PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# パスワード変数にランダムパスワード値を割り当てる
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Webポータルから設定文字列を取得し、以下で入力してください
$rustdesk_cfg="configstring"

################################### この線より下を編集しないでください #########################################

# 管理者として実行し、現在のディレクトリに残る
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# この関数は最新バージョンとダウンロードリンクをオブジェクトとして返します
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

    # 現在の例リンク: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # バグ修正 - 時々"about:"を置き換える必要があります
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "エラー: バージョンまたはダウンロードリンクが見つかりません。"
        Exit
    }

    # 返すオブジェクトを作成
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver は最新バージョンです。"
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
    Write-Output "サービスをインストール中"
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
# ID変数の値を表示
Write-Output "RustDesk ID: $rustdesk_id"

# パスワード変数の値を表示
Write-Output "パスワード: $rustdesk_pw"
Write-Output "..............................................."
```

### Windows batch/cmd

```bat
@echo off

REM パスワード変数にランダムパスワード値を割り当てる
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Webポータルから設定文字列を取得し、以下で入力してください
set rustdesk_cfg="configstring"

REM ############################### この線より下を編集しないでください #########################################

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
REM ID変数の値を表示
echo RustDesk ID: %rustdesk_id%

REM パスワード変数の値を表示
echo パスワード: %rustdesk_pw%
echo ...............................................
```

### MSI

`rustdesk.exe --silent-install`の代わりにmsiを使用することもできます。

https://rustdesk.com/docs/en/client/windows/msi/


### Winget

wingetを使ってpowershell経由でデプロイすることもできます（これは最近のWindowsインストールの一部であるMicrosoft版apt経由でインストールします）

powershellウィンドウから、またはスクリプト経由で（例えばGPO経由）

```
winget install --id=RustDesk.RustDesk  -e
```

### macOS Bash

```sh
#!/bin/bash

# パスワード変数にランダムパスワード値を割り当てる
rustdesk_pw=$(openssl rand -hex 4)

# Webポータルから設定文字列を取得し、以下で入力してください
rustdesk_cfg="configstring"

################################### この線より下を編集しないでください #########################################

# 特権昇格のためのrootパスワードの要求
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# DMGのマウントポイントを指定（一時ディレクトリ）
mount_point="/Volumes/RustDesk"

# rustdesk.dmgファイルをダウンロード
echo "RustDeskをダウンロード中"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# DMGファイルを指定したマウントポイントにマウント
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# マウントが成功したか確認
if [ $? -eq 0 ]; then
    # マウントされたDMGの内容を/Applicationsフォルダに移動
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # DMGファイルをアンマウント
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "RustDesk DMGのマウントに失敗しました。インストールを中止します。"
    exit 1
fi

# --get-idでrustdeskコマンドを実行し、出力をrustdesk_id変数で保存
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# RustDeskに新しいパスワードを適用
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# RustDeskという名前のすべてのプロセスを終了
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# rustdesk_idが空でないか確認
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "RustDesk IDの取得に失敗しました。"
fi

# パスワード変数の値を表示
echo "パスワード: $rustdesk_pw"
echo "..............................................."

echo "GUIでインストールを完了してください。RustDeskを起動します。"
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# パスワード変数にランダム値を割り当てる
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Webポータルから設定文字列を取得し、以下で入力してください
rustdesk_cfg="configstring"

################################### この線より下を編集しないでください #########################################

# スクリプトがrootとして実行されているか確認
if [[ $EUID -ne 0 ]]; then
    echo "このスクリプトはrootとして実行する必要があります。"
    exit 1
fi

# OSを特定
if [ -f /etc/os-release ]; then
    # freedesktop.orgとsystemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # IDが'ubuntu'または'debian'でない場合はID_LIKEにフォールバック
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # lsb_releaseコマンドがない一部のDebian/Ubuntuバージョン用
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # 古いDebian、Ubuntuなど
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # 古いSuSEなど
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # 古いRed Hat、CentOSなど
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # unameにフォールバック、例えば"Linux <version>"、BSDなどでも動作
    OS=$(uname -s)
    VER=$(uname -r)
fi

# RustDeskをインストール

echo "RustDeskをインストール中"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "サポートされていないOS"
    # ここでユーザーにとにかくインストールを試す許可を求めることができます
    # 彼らがはいと言った場合、インストールを実行
    # 彼らがいいえと言った場合、スクリプトを終了
    exit 1
fi

# --get-idでrustdeskコマンドを実行し、出力をrustdesk_id変数で保存
rustdesk_id=$(rustdesk --get-id)

# RustDeskに新しいパスワードを適用
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# rustdesk_idが空でないか確認
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "RustDesk IDの取得に失敗しました。"
fi

# パスワード変数の値を表示
echo "パスワード: $rustdesk_pw"
echo "..............................................."
```