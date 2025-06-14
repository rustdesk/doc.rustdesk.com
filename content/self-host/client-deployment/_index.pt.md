---
title: Implantação do Cliente
weight: 400
pre: "<b>2.4. </b>"
---

A maneira mais simples é usar um cliente personalizado, https://twitter.com/rustdesk/status/1788905463678951787.

Você pode implantar usando vários métodos, alguns são cobertos em [Configuração do Cliente](https://rustdesk.com/docs/en/self-host/client-configuration/).

Alternativamente, você pode usar scripts de implantação em massa com seu RMM, Intune, etc. O ID e a senha são outputados pelo script. Você deve coletar isso ou dividi-lo em scripts diferentes para coletar o ID e a senha.

A senha permanente pode ser alterada de aleatória para uma de sua preferência modificando o conteúdo dentro de `()` após `rustdesk_pw` para sua senha preferida para PowerShell e a linha correspondente para qualquer outra plataforma.

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Atribuir o valor da senha aleatória à variável senha
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Obtenha sua string de configuração do seu portal Web e preencha abaixo
$rustdesk_cfg="configstring"

################################## Por favor não edite abaixo desta linha #########################################

# Executar como administrador e permanecer no diretório atual
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Esta função retornará a última versão e link de download como um objeto
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

    # correção de bug - às vezes você precisa substituir "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "ERRO: Versão ou link de download não encontrado."
        Exit
    }

    # Criar objeto para retornar
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver é a versão mais recente."
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
    Write-Output "Instalando serviço"
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
# Mostrar o valor da variável ID
Write-Output "ID RustDesk: $rustdesk_id"

# Mostrar o valor da variável senha
Write-Output "Senha: $rustdesk_pw"
Write-Output "..............................................."
```

## Windows batch/cmd

```bat
@echo off

REM Atribuir o valor da senha aleatória à variável senha
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Obtenha sua string de configuração do seu portal Web e preencha abaixo
set rustdesk_cfg="configstring"

REM ############################### Por favor não edite abaixo desta linha #########################################

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
echo ID RustDesk: %rustdesk_id%

REM Mostrar o valor da variável senha
echo Senha: %rustdesk_pw%
echo ...............................................
```

## MSI

Você também pode usar msi em vez de `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/en/client/windows/msi/


## Winget

você pode implantar via powershell com winget também (isso instala via a versão da Microsoft do apt - parte das instalações mais recentes do Windows)

de uma janela do powershell ou via script (por exemplo via GPO)

```
winget install --id=RustDesk.RustDesk  -e
```

## macOS Bash

```sh
#!/bin/bash

# Atribuir o valor da senha aleatória à variável senha
rustdesk_pw=$(openssl rand -hex 4)

# Obtenha sua string de configuração do seu portal Web e preencha abaixo
rustdesk_cfg="configstring"

################################## Por favor não edite abaixo desta linha #########################################

# Solicitação de senha de root para elevação de privilégio
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Especificar o ponto de montagem para o DMG (diretório temporário)
mount_point="/Volumes/RustDesk"

# Baixar o arquivo rustdesk.dmg
echo "Baixando RustDesk agora"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# Montar o arquivo DMG no ponto de montagem especificado
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Verificar se a montagem foi bem-sucedida
if [ $? -eq 0 ]; then
    # Mover o conteúdo do DMG montado para a pasta /Applications
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Desmontar o arquivo DMG
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Falha ao montar o DMG do RustDesk. Instalação abortada."
    exit 1
fi

# Executar o comando rustdesk com --get-id e armazenar a saída na variável rustdesk_id
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Aplicar nova senha ao RustDesk
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Matar todos os processos chamados RustDesk
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# Verificar se rustdesk_id não está vazio
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk: $rustdesk_id"
else
    echo "Falha ao obter o ID do RustDesk."
fi

# Mostrar o valor da variável senha
echo "Senha: $rustdesk_pw"
echo "..............................................."

echo "Por favor complete a instalação na GUI, lançando RustDesk agora."
open -n /Applications/RustDesk.app
```

## Linux

```sh
#!/bin/bash

# Atribuir um valor aleatório à variável senha
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Obtenha sua string de configuração do seu portal Web e preencha abaixo
rustdesk_cfg="configstring"

################################## Por favor não edite abaixo desta linha #########################################

# Verificar se o script está sendo executado como root
if [[ $EUID -ne 0 ]]; then
    echo "Este script deve ser executado como root."
    exit 1
fi

# Identificar OS
if [ -f /etc/os-release ]; then
    # freedesktop.org e systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Retornar para ID_LIKE se ID não era 'ubuntu' ou 'debian'
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
    # Debian mais antigo, Ubuntu, etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # SuSE mais antigo etc.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Red Hat mais antigo, CentOS, etc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Retornar para uname, ex. "Linux <version>", também funciona para BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

# Instalar RustDesk

echo "Instalando RustDesk"
if [ "${ID}" = "debian" ] || [ "$OS" = "Ubuntu" ] || [ "$OS" = "Debian" ] || [ "${UPSTREAM_ID}" = "ubuntu" ] || [ "${UPSTREAM_ID}" = "debian" ]; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.deb
    apt-get install -fy ./rustdesk-1.2.6-x86_64.deb > null
elif [ "$OS" = "CentOS" ] || [ "$OS" = "RedHat" ] || [ "$OS" = "Fedora Linux" ] || [ "${UPSTREAM_ID}" = "rhel" ] || [ "$OS" = "Almalinux" ] || [ "$OS" = "Rocky*" ] ; then
    wget https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-0.x86_64.rpm
    yum localinstall ./rustdesk-1.2.6-0.x86_64.rpm -y > null
else
    echo "SO não suportado"
    # aqui você pode perguntar ao usuário permissão para tentar instalar mesmo assim
    # se eles disserem sim, então faça a instalação
    # se eles disserem não, saia do script
    exit 1
fi

# Executar o comando rustdesk com --get-id e armazenar a saída na variável rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Aplicar nova senha ao RustDesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Verificar se rustdesk_id não está vazio
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk: $rustdesk_id"
else
    echo "Falha ao obter o ID do RustDesk."
fi

# Mostrar o valor da variável senha
echo "Senha: $rustdesk_pw"
echo "..............................................."
```