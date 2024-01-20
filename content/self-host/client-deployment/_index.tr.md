---
title: Client Deployment
weight: 400
pre: "<b>2.4. </b>"
---

Aşağıdaki yöntemlerden birini kullanarak dağıtım yapabilirsiniz. Bazıları [Client](/docs/en/self-host/client-configuration/) bölümünde ele alınmıştır.

Alternatif olarak, RMM, intune vb. ile kütle dağıtım komut dosyaları da kullanabilirsiniz. Kimlik ve şifre komut dosyası tarafından üretilir, bunu toplamalısınız veya kimlik ve şifreyi toplamak için farklı komut dosyalarına bölmelisiniz.

Kalıcı şifreyi rastgele değerden tercih ettiğiniz bir şifreye değiştirmek için, rustdesk_pw'in içindeki () içeriğini tercih ettiğiniz şifreyle değiştirerek yapabilirsiniz.

### Powershell

```ps
$ErrorActionPreference= 'silentlycontinue'

# Şifre değişkenine rastgele bir şifre atayın
$rustdesk_pw = (-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_})) 

# Web portalından yapılandırma dizgesini alın ve aşağıdaki alanı doldurun.
rustdesk_cfg="configstring" 

####################################Lütfen Aşağıdaki Satırı Düzenlemeyin##########################################

# Yönetici olarak çalıştırın ve geçerli dizinde kalır
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000) {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Bu fonksiyon en son sürüm numarasını ve indirme bağlantısını bir nesne olarak döndürür
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
    
    # Güncel örnek linki: https://github.com/rustdesk/rustdesk/releases/download/1.2.3/rustdesk-1.2.3-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href
    
    # bugfix - Bazen "about:" kısmını değiştirmeniz gerekir.
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

    # Zurückgebendes Objekt erstellen
    $Result = New-Object PSObject -Property 
    @{
        Version = $Version
        Downloadlink = $Downloadlink
    }

    return($Result)
}

$RustDeskOnGitHub = getLatest

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq $RustDeskOnGitHub.Version) 
{
write-output "RustDesk $rdver en yeni sürüm"

exit
}

If (!(Test-Path c:\Temp)) {
  New-Item -ItemType Directory -Force -Path c:\Temp > null
}

cd c:\Temp

powershell Invoke-WebRequest $RustDeskOnGitHub.Downloadlink -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install
Start-Sleep -seconds 20

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Write-Output "Hizmetin yüklenmesi"
    cd $env:ProgramFiles\RustDesk
    Start-Process .\rustdesk.exe --install-service
    Start-Sleep -seconds 20
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}

cd $env:ProgramFiles\RustDesk\
$rustdesk_id = (.\RustDesk.exe --get-id | out-host)

net stop rustdesk > null
.\RustDesk.exe --config $rustdesk_cfg

$ProcessActive = Get-Process rustdesk -ErrorAction SilentlyContinue
if($ProcessActive -ne $null)
{
stop-process -ProcessName rustdesk -Force
}

Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" "--password $rustdesk_pw" -wait

Write-Output "..............................................."
# Kimlik Değişkeninin değerini gösterin
Write-Output "RustDesk Kimlik: $rustdesk_id"

# Şifre Değişkeninin değerini gösterin
Write-Output "Şifre: $rustdesk_pw"
Write-Output "..............................................."
```


### Mac OS Bash

```sh
#!/bin/bash

# Şifre değişkenine rastgele bir şifre atayın
rustdesk_pw=$(openssl rand -hex 4)

# Web portalından yapılandırma dizgesini alın ve aşağıdaki alanı doldurun.
rustdesk_cfg="configstring" 

####################################Lütfen Aşağıdaki Satırı Düzenlemeyin##########################################

# Skriptin kök olarak çalıştırılıp çalıştırılmadığını kontrol edin
if [[ $EUID -ne 0 ]]; then
	echo "

Bu komut dosyası kök olarak çalıştırılmalıdır."
	exit 1
fi

# rustdesk.dmg dosyasının yolunu belirtin
dmg_file="/tmp/rustdesk-1.2.2-x86_64.dmg"

# DMG için bağlama noktasını belirtin (geçici dizin)
mount_point="/Volumes/RustDesk"

# rustdesk.dmg dosyasını indirin
echo "RustDesk İndiriliyor"

if [[ $(arch) == 'arm64' ]]; then
curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-aarch64.dmg --output "$dmg_file"
else
curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.dmg --output "$dmg_file"
fi

# DMG dosyasını belirtilen bağlama noktasına bağla
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Bağlama işleminin başarılı olup olmadığını kontrol edin
if [ $? -eq 0 ]; then
	# Bağlanan DMG'nin içeriğini /Applications klasörüne kopyalayın
	cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null
	
	# DMG dosyasını bağlamayı kaldırın
	hdiutil detach "$mount_point" &> /dev/null
else
	echo "RustDesk DMG'si bağlanamadı. Kurulum iptal edildi."
	exit 1
fi

# rustdesk komutunu --get-id ile çalıştırın ve çıktıyı rustdesk_id değişkenine kaydedin
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Yeni şifreyi RustDesk'e uygulayın
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Tüm RustDesk adlı işlemleri sonlandırın
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# rustdesk_id boş değilse kontrol edin
if [ -n "$rustdesk_id" ]; then
	echo "RustDesk Kimlik: $rustdesk_id"
else
	echo "RustDesk Kimlik alınamadı."
fi

# Şifre değişkeninin değerini yazdırın
echo "Şifre: $rustdesk_pw"
echo "..............................................."

echo "Lütfen kurulumu GUI üzerinde tamamlayın, RustDesk'i şimdi başlatıyorum."
open -n /Applications/RustDesk.app
```

### Linux

```sh
#!/bin/bash

# Rastgele bir değer atayarak şifre değişkenine atayın
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)


# Web portalından yapılandırma dizgesini alın ve aşağıdaki alanı doldurun.
rustdesk_cfg="encryptedconfigstring" 

####################################Lütfen Aşağıdaki Satırı Düzenlemeyin##########################################

# Skriptin kök olarak çalıştırılıp çalıştırılmadığını kontrol edin
if [[ $EUID -ne 0 ]]; then
	echo "Bu komut dosyası kök olarak çalıştırılmalıdır."
	exit 1
fi

# İşletim sistemini belirleyin
if [ -f /etc/os-release ]; then
    # freedesktop.org ve systemd
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

# Rustdesk'i Yükle

echo "Rustdesk Yükleniyor"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ]  || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.2-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ]  || [ "${UPSTREAM_ID}" = "rhel" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.2-0.x86_64.rpm -y > null
else
    echo "Desteklenmeyen İşletim Sistemi"
    # burada kullanıcı

dan yine de kurulumu denemek için izin isteyebilirsiniz
    # eğer evet derlerse, kurulumu yapın
    # eğer hayır derlerse, komut dosyasını sonlandırın
    exit 1
fi

systemctl stop rustdesk

# rustdesk komutunu --get-id ile çalıştırın ve çıktıyı rustdesk_id değişkenine kaydedin
rustdesk_id=$(rustdesk --get-id)

# Yeni şifreyi RustDesk'e uygulayın
systemctl start rustdesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk


echo "..............................................."
# rustdesk_id boş değilse kontrol edin
if [ -n "$rustdesk_id" ]; then
	echo "RustDesk Kimlik: $rustdesk_id"
else
	echo "RustDesk Kimlik alınamadı."
fi

# Şifre değişkeninin değerini yazdırın
echo "Şifre: $rustdesk_password"
echo "..............................................."
```

Bu komut dosyaları, RustDesk'in farklı işletim sistemlerine dağıtımını gerçekleştirmek için tasarlanmıştır. Her bir komut dosyası belirli bir işletim sistemi için uygundur ve RustDesk'in yüklenmesini, yapılandırılmasını ve çalıştırılmasını otomatikleştirmektedir.
