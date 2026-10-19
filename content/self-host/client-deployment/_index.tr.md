---
title: İstemci Dağıtımı
weight: 400
pre: "<b>2.4. </b>"
description: "PowerShell, batch veya macOS bash komut dosyalarıyla RustDesk istemcilerini büyük ölçekte dağıtın. RustDesk'i kurmak, yapılandırma dizesini uygulamak ve şifre belirlemek için bu örnekleri kullanın."
keywords: ["rustdesk istemci dağıtımı", "rustdesk powershell dağıtım", "rustdesk toplu dağıtım", "rustdesk intune", "rustdesk rmm", "rustdesk sessiz dağıtım"]
---

Bu kılavuz; PowerShell, toplu iş dosyası (batch) ve macOS bash gibi komut dosyaları ve otomasyon araçlarıyla büyük ölçekli RustDesk istemci dağıtımını kapsar. En kolay deneyime ihtiyacınız varsa ve RustDesk Server Pro kullanıyorsanız özel istemci oluşturucu ile başlayın: https://twitter.com/rustdesk/status/1788905463678951787.

{{% notice note %}}
İlgili okuma: [katılımsız erişim kurulumu](https://rustdesk.com/blog/rustdesk-unattended-access-setup).
{{% /notice %}}

## RustDesk istemcilerini büyük ölçekte dağıtmanın en iyi yolu nedir?

RustDesk Server Pro için en kolay büyük ölçekli dağıtım yolu genellikle özel istemci oluşturucudur, çünkü sunucu ayarlarınızı istemci paketine gömer. RMM, Intune, GPO veya özel otomasyon yoluyla yönetilen ortamlar için PowerShell, batch ve kabuk komut dosyaları daha esnektir.

## Hangi dağıtım yöntemini seçmelisiniz?

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| Özel istemci oluşturucu | RustDesk Server Pro ekipleri | Önceden yüklenmiş ayarlarla en basit paketlenmiş dağıtım |
| PowerShell | Windows sistem filosu otomasyonu | RMM, Intune ve komut dosyasıyla kurulumlar için idealdir |
| Batch veya cmd | Temel Windows komut dosyaları | Ağır PowerShell araçları olmayan daha basit Windows ortamlarında çalışır |
| MSI | Yönetilen Windows yazılım dağıtımı | MSI tabanlı paketleme iş akışlarını zaten kullandığınızda daha uygundur |
| macOS bash | Mac filosu dağıtımı | macOS sistemleri için komut dosyasıyla kurulum ve yapılandırma |

## Dağıtım komut dosyaları hangi girdilere ihtiyaç duyar?

Çoğu dağıtım komut dosyası üç şeye ihtiyaç duyar:

- Bir RustDesk yapılandırma dizesi (config string)
- Yönetici veya root ayrıcalıklarıyla çalışabilen bir dağıtım yöntemi
- Dağıtım sırasında rastgele oluşturulan veya açıkça belirlenen bir parola politikası

Çeşitli yöntemleri kullanarak dağıtım yapabilirsiniz; bunlardan bazıları [İstemci Yapılandırması](/docs/tr/self-host/client-configuration/) bölümünde ele alınmıştır.

Alternatif olarak RMM, Intune vb. araçlarınızla toplu dağıtım komut dosyalarını kullanabilirsiniz. Kimlik (ID) ve parola komut dosyası tarafından çıktı olarak verilir. Bunu toplayabilir veya kimlik ve parolayı almak için farklı komut dosyalarına bölebilirsiniz.

Kalıcı parola; PowerShell için `rustdesk_pw` sonrasındaki `()` içindeki içerik ve diğer platformlar için ilgili satır değiştirilerek rastgeleden tercih ettiğiniz bir parolaya dönüştürülebilir.

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Parola değişkenine rastgele parola atama
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Web portalınızdan yapılandırma dizenizi alın ve aşağıya doldurun
$rustdesk_cfg="configstring"

################################## Lütfen Bu Çizginin Altını Düzenlemeyin #########################################

# Yönetici olarak çalıştır ve geçerli dizinde kal
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Bu fonksiyon en son sürümü ve indirme bağlantısını bir nesne olarak döndürür
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

    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "HATA: Sürüm veya indirme bağlantısı bulunamadı."
        Exit
    }

    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver en yeni sürümdür."
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
    Write-Output "Servis yükleniyor"
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
Write-Output "RustDesk ID: $rustdesk_id"
Write-Output "Şifre: $rustdesk_pw"
Write-Output "..............................................."
```

## Windows batch/cmd

```bat
@echo off

REM Parola değişkenine rastgele parola atama
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Web portalınızdan yapılandırma dizenizi alın ve aşağıya doldurun
set rustdesk_cfg="configstring"

REM ############################### Lütfen Bu Çizginin Altını Düzenlemeyin #########################################

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
echo RustDesk ID: %rustdesk_id%
echo Şifre: %rustdesk_pw%
echo ...............................................
```

## MSI

`rustdesk.exe --silent-install` yerine MSI yükleyicisini de kullanabilirsiniz:

Ayrıntılar için [Windows MSI Dağıtım Kılavuzu](/docs/tr/client/windows/msi/)'na bakın.

## macOS Bash

```sh
#!/bin/bash

# Parola değişkenine rastgele parola atama
rustdesk_pw=$(openssl rand -hex 4)

# Web portalınızdan yapılandırma dizenizi alın ve aşağıya doldurun
rustdesk_cfg="configstring"

################################## Lütfen Bu Çizginin Altını Düzenlemeyin #########################################

# Ayrıcalık yükseltme için root kontrolü
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# DMG için bağlama noktası (geçici dizin)
mount_point="/Volumes/RustDesk"

echo "RustDesk İndiriliyor..."

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# DMG dosyasını belirtilen bağlama noktasına bağla
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

if [ $? -eq 0 ]; then
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "RustDesk DMG bağlanamadı. Kurulum iptal edildi."
    exit 1
fi

cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "RustDesk ID alınamadı."
fi

echo "Şifre: $rustdesk_pw"
echo "..............................................."

echo "Lütfen GUI üzerinde kurulumu tamamlayın, RustDesk başlatılıyor."
open -n /Applications/RustDesk.app
```

## Linux

```sh
#!/bin/bash

# Parola değişkenine rastgele parola atama
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Web portalınızdan yapılandırma dizenizi alın ve aşağıya doldurun
rustdesk_cfg="configstring"

################################## Lütfen Bu Çizginin Altını Düzenlemeyin #########################################

if [[ $EUID -ne 0 ]]; then
    echo "Bu komut dosyası root olarak çalıştırılmalıdır."
    exit 1
fi

# İşletim sistemini tanımla
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
    UPSTREAM_ID=${ID_LIKE,,}

    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi
elif type lsb_release >/dev/null 2>&1; then
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    OS=$(uname -s)
    VER=$(uname -r)
fi

echo "RustDesk Yükleniyor"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > /dev/null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > /dev/null
else
    echo "Desteklenmeyen İşletim Sistemi"
    exit 1
fi

rustdesk_id=$(rustdesk --get-id)

rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "RustDesk ID alınamadı."
fi

echo "Şifre: $rustdesk_pw"
echo "..............................................."
```

## Yeni cihazlar için açıkça dağıtım (Explicit deployment)

Varsayılan olarak, bir RustDesk istemcisi sunucuya ilk kez bağlandığında kendi barındırdığınız sunucuya kaydedilir. Normal modda fazladan bir dağıtım adımı gerekmez.

Sunucu web konsolunda **Ayarlar → Diğerleri → Yeni cihazlar için dağıtım gerektir** seçeneğini etkinleştirirseniz, yeni cihazların bu sunucuya kaydedilebilmesi için önceden açıkça dağıtılması gerekir.

Sunucu web konsolundan bir yönetici hesabıyla bir [API belirteci (token)](/docs/tr/self-host/rustdesk-server-pro/console/#api-belirteci-token) oluşturun. Belirtecin **Cihazlar** (Devices) izninin **Okuma ve yazma** olarak ayarlanması gerekir. Ardından, RustDesk kurulup kendi sunucunuzu kullanacak şekilde yapılandırıldıktan sonra her yeni masaüstü cihazında dağıtım komutunu çalıştırın.

### Windows, macOS ve Linux

Windows'ta Komut İstemi'ni veya PowerShell'i Yönetici olarak çalıştırın:

```bat
rustdesk --deploy --token <api_belirteci>
```

macOS ve Linux'ta komutu `sudo` ile çalıştırın:

```sh
sudo rustdesk --deploy --token <api_belirteci>
```

### İsteğe bağlı özel kimlik (ID)

Cihazı belirli bir RustDesk Kimliği ile dağıtmak için `--id <özel_kimlik>` ekleyin:

```sh
rustdesk --deploy --token <api_belirteci> --id <özel_kimlik>
```

Kimlik başka bir makine tarafından zaten kullanılıyorsa dağıtım başarısız olur ve RustDesk kimliğin zaten alındığını bildirir.

### Android

Android, komut satırı dağıtım iş akışını kullanmaz. Sunucu dağıtım gerektirdiğinde ve Android istemcisi henüz dağıtılmadığında RustDesk bir **Dağıt** (Deploy) istemi gösterir. **Tamam**'a dokunun, dağıtım iletişim kutusuna API belirtecini girin ve isteğe bağlı olarak özel bir kimlik girin. Aynı iletişim kutusunu **Ayarlar → Dağıt** menüsünden manuel olarak da açabilirsiniz.

Dağıtım başarılı olduktan sonra cihaz sunucu cihaz listesine eklenir ve istemci normal şekilde kayıt olabilir.
