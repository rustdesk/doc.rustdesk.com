---
title: Implantação de cliente
weight: 400
pre: "<b>2.4. </b>"
---

A maneira mais simples é usar um cliente personalizado, https://twitter.com/rustdesk/status/1788905463678951787.

Você pode implementar o cliente personalizado usando vários métodos, alguns dos quais são abordados em [Configuração do Cliente](https://rustdesk.com/docs/pt/self-host/client-configuration/).

Como alternativa, você pode usar scripts de implementação em massa com seu RMM, Intune etc. O script irá gerar a ID e a senha. Você deve coletar essas informações ou dividi-las em scripts diferentes para coletar a ID e a senha separadamente.

A senha permanente aleatória pode ser alterada para uma senha de sua preferência. Para fazer isso, altere o conteúdo dentro dos `()` após `rustdesk_pw` para a senha desejada no PowerShell e na linha correspondente para qualquer outra plataforma.

### PowerShell

```ps
$ErrorActionPreference= 'silentlycontinue'

# Atribua o valor de senha aleatória à variável password
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Obtenha sua string de configuração do seu portal da Web e preencha abaixo
$rustdesk_cfg="configstring"

################################### Please Do Not Edit Below This Line #########################################

# Execute como administrador e permaneça no diretório atual
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Esta função retornará a versão mais recente e o link de download como um objeto
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

   # Link de exemplo atual: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

   # correção de bug - às vezes é necessário substituir "about:"
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

    # Crie um objeto para retornar
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
    New-Item -ItemType Directory -Force -Path C:\Temp > null
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
# Mostre o valor da variável ID
Write-Output "RustDesk ID: $rustdesk_id"

# Mostre o valor da variável Password
Write-Output "Password: $rustdesk_pw"
Write-Output "..............................................."
```

### Windows batch/cmd

```bat
@echo off

REM Define o valor da senha aleatória para a variável password
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Preencha a string de configuração (configstring) obtida do portal web
set rustdesk_cfg="configstring"

REM ############################### Por favor, não edite abaixo desta linha #########################################

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
REM Mostrar o valor da variável ID
echo RustDesk ID: %rustdesk_id%

REM Mostra o valor da variável de senha
echo Password: %rustdesk_pw%
echo ...............................................
```

### MSI

Você também pode usar msi em vez de `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/en/client/windows/msi/

### macOS Bash

```sh
#!/bin/bash

# Define o valor da senha aleatória para a variável password
rustdesk_pw=$(openssl rand -hex 4)

# Preencha a string de configuração (configstring) obtida do portal web
rustdesk_cfg="configstring"

################################### Por favor, não edite abaixo desta linha #########################################

# Verifica se o script está sendo executado como root
if [[ $EUID -ne 0 ]]; then
    echo "Este script deve ser executado como root."
    exit 1
fi

# Define o caminho para o arquivo rustdesk.dmg
dmg_file="/tmp/rustdesk-1.2.6-x86_64.dmg"

# Define o ponto de montagem para o DMG (diretório temporário)
mount_point="/Volumes/RustDesk"

# Baixa o arquivo rustdesk.dmg
echo "Baixando o RustDesk agora"

if [[ $(arch) == 'arm64' ]]; then
    curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-aarch64.dmg --output "$dmg_file"
else
    curl -L https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.dmg --output "$dmg_file"
fi

# Monta o arquivo DMG no ponto de montagem especificado
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Verifica se a montagem foi bem-sucedida
if [ $? -eq 0 ]; then
    # Move o conteúdo do DMG montado para a pasta /Applications
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Desmonta o arquivo DMG
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Falha ao montar o DMG do RustDesk. Instalação abortada."
    exit 1
fi

# Executa o comando rustdesk com --get-id e armazena a saída na variável rustdesk_id
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Aplica a nova senha ao RustDesk
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

# Define um valor aleatório para a senha e armazena na variável password
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Preencha a string de configuração (configstring) obtida do portal web
rustdesk_cfg="configstring"

################################### Por favor, não edite abaixo desta linha #########################################

# Verifica se o script está sendo executado como root
if [[ $EUID -ne 0 ]]; then
    echo "Este script deve ser executado como root."
    exit 1
fi

# Identifica o Sistema Operacional (SO)
if [ -f /etc/os-release ]; then
    # freedesktop.org e systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Retorna para ID_LIKE se ID não for 'ubuntu' ou 'debian'
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # Para algumas versões do Debian/Ubuntu sem o comando lsb_release
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # mais antigos Debian, Ubuntu, etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # mais antigos SuSE etc.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # mais antigos Red Hat, CentOS, etc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Retorna para uname, por exemplo, "Linux <versão>". Isso também funciona para BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Instala o RustDesk

echo "Instalando RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "Sistema operacional não suportado"
    # Aqui você poderia pedir permissão ao usuário para tentar instalar mesmo assim
    # se eles disserem sim, então faça a instalação
    # se eles disserem não, saia do script
    exit 1
fi

# Executa o comando rustdesk com --get-id e armazena a saída na variável rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Aplica a nova senha ao RustDesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Verifica se o rustdesk_id não está vazio
if [ -n "$rustdesk_id" ]; then
    echo "RustDesk ID: $rustdesk_id"
else
    echo "Falha para pegar RustDesk ID."
fi

# Exiba o valor da variável de senha
echo "Password: $rustdesk_pw"
echo "..............................................."
```
