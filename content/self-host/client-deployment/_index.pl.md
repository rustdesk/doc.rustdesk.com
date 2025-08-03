---
title: Wdrażanie klientów
weight: 400
pre: "<b>2.4. </b>"
---

Najprostszym sposobem jest użycie niestandardowego klienta, https://twitter.com/rustdesk/status/1788905463678951787.

Możesz wdrożyć to na kilka sposobów, niektóre z nich opisano w sekcji [Konfiguracja klienta](https://rustdesk.com/docs/pl/self-host/client-configuration/).

Alternatywnie można użyć skryptów masowego wdrażania z RMM, Intune itp. ID i hasło są generowane przez skrypt. Należy je zebrać lub podzielić na różne skrypty, aby zebrać ID i hasło.

Stałe hasło można zmienić z losowego na preferowane, zmieniając zawartość wewnątrz `()` po `rustdesk_pw` na preferowane hasło dla PowerShella i odpowiednią linię dla każdej innej platformy.

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Przypisz wartość losowego hasła do zmiennej password
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Pobierz ciąg konfiguracyjny z portalu internetowego i wypełnij poniższe pola.
$rustdesk_cfg="stringkonfiguracyjny"

################################## Proszę nie edytować poniżej tej linii #########################################

# Uruchom jako administrator i pozostań w bieżącym katalogu
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Ta funkcja zwróci najnowszą wersję i link do pobrania jako obiekt.
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

    # Aktualny przykładowy link: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # poprawka błędu - czasami trzeba zastąpić "about:"
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

    # Utwórz obiekt do zwrócenia
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver to najnowsza wersja."
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
    Write-Output "Instalowanie usługi"
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
# Wyświetl wartość zmiennej ID
Write-Output "ID RustDeska: $rustdesk_id"

# Wyświetl wartość zmiennej Password
Write-Output "Hasło: $rustdesk_pw"
Write-Output "..............................................."
```

## Windows batch/cmd

```bat
@echo off

REM Przypisz wartość losowego hasła do zmiennej Password.
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Pobierz string konfiguracyjny z portalu webowego i wypełnij poniższe pola.
set rustdesk_cfg="stringkonfiguracyjny"

REM ############################### Proszę nie edytować poniżej tej linii #########################################

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
REM Pokaż wartość zmiennej ID
echo ID RustDeska: %rustdesk_id%

REM Pokaż wartość zmiennej Password
echo Hasło: %rustdesk_pw%
echo ...............................................
```

## MSI

Można również użyć msi zamiast `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/pl/client/windows/msi/


## Winget

można również wdrożyć za pomocą powershella z winget (instaluje się to za pomocą wersji apt firmy Microsoft — części najnowszych instalacji systemu Windows)

z okna powershella lub za pomocą skryptu (na przykład za pomocą GPO)

```
winget install --id=RustDesk.RustDesk  -e
```

## macOS Bash

```sh
#!/bin/bash

# Przypisz wartość losowego hasła do zmiennej password
rustdesk_pw=$(openssl rand -hex 4)

# Pobierz string konfiguracyjny z portalu webowego i wypełnij poniższe pola.
rustdesk_cfg="stringkonfiguracyjny"

################################## Proszę nie edytować poniżej tej linii #########################################

# Żądanie hasła administratora w celu podwyższenia uprawnień
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Określ punkt montowania dla DMG (katalog tymczasowy)
mount_point="/Volumes/RustDesk"

# Pobierz plik rustdesk.dmg
echo "Pobieranie RustDeska"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# Zamontuj plik DMG w określonym punkcie montowania
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Sprawdź, czy montaż zakończył się powodzeniem.
if [ $? -eq 0 ]; then
    # Przenieś zawartość zamontowanego pliku DMG do folderu /Applications.
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Odmontuj plik DMG
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Nie udało się zamontować pliku DMG RustDesk. Instalacja została przerwana."
    exit 1
fi

# Uruchom polecenie rustdesk z opcją --get-id i zapisz wynik w zmiennej rustdesk_id.
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Zastosuj nowe hasło do RustDeska
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Zakończ wszystkie procesy o nazwie RustDesk
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# Sprawdź, czy rustdesk_id nie jest puste
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDeska: $rustdesk_id"
else
    echo "Nie udało się uzyskać ID RustDeska"
fi

# Echo the value of the password variable
echo "Hasło: $rustdesk_pw"
echo "..............................................."

echo "Proszę zakończyć instalację w GUI, trwa uruchamianie RustDeska"
open -n /Applications/RustDesk.app
```

## Linux

```sh
#!/bin/bash

# Przypisz losową wartość do zmiennej password
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Pobierz string konfiguracyjny z portalu webowego i wypełnij poniższe pola.
rustdesk_cfg="stringkonfiguracyjny"

################################## Proszę nie edytować poniżej tej linii #########################################

# Sprawdź, czy skrypt jest uruchamiany jako root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root."
    exit 1
fi

# Zidentyfikuj system operacyjny
if [ -f /etc/os-release ]; then
    # freedesktop.org i systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Jeśli identyfikator nie był 'ubuntu' ani 'debian', należy użyć ID_LIKE.
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # W niektórych wersjach Debiana/Ubuntu bez polecenia lsb_release
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Starsze Debiany, Ubuntu, itd.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # Starszy SuSE itd.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Starsze Red Hat, CentOS, itd.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Użyj uname, np. "Linux <wersja>", działa również w przypadku BSD itp.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Zainstaluj RustDeska

echo "Instalacja RustDeska"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "Niewspierany system operacyjny"
    # tutaj można poprosić użytkownika o zgodę na próbę instalacji mimo wszystko
    # jeśli użytkownik wyrazi zgodę, należy przeprowadzić instalację
    # jeśli użytkownik odmówi, należy zamknąć skrypt
    exit 1
fi

# Uruchom polecenie rustdesk z opcją --get-id i zapisz wynik w zmiennej rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Zastosuj nowe hasło do RustDeska
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Sprawdź, czy rustdesk_id nie jest puste
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDeska: $rustdesk_id"
else
    echo "Nie udało się uzyskać ID RustDeska."
fi

# Wyświetl wartość zmiennej "password"
echo "Hasło: $rustdesk_pw"
echo "..............................................."
```
