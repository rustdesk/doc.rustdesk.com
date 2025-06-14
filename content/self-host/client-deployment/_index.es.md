---
title: Despliegue de Cliente
weight: 400
pre: "<b>2.4. </b>"
---

La forma más simple es usar un cliente personalizado, https://twitter.com/rustdesk/status/1788905463678951787.

Puedes desplegar usando varios métodos, algunos están cubiertos en [Configuración del Cliente](https://rustdesk.com/docs/en/self-host/client-configuration/).

Alternativamente, puedes usar scripts de despliegue masivo con tu RMM, Intune, etc. El ID y la contraseña son outputados por el script. Deberías recopilar esto o dividirlo en diferentes scripts para recopilar el ID y la contraseña.

La contraseña permanente puede cambiarse de aleatoria a una que prefieras modificando el contenido dentro de `()` después de `rustdesk_pw` a tu contraseña preferida para PowerShell y la línea correspondiente para cualquier otra plataforma.

## PowerShell

```powershell
$ErrorActionPreference= 'silentlycontinue'

# Asignar el valor de contraseña aleatoria a la variable contraseña
$rustdesk_pw=(-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))

# Obtener tu cadena de configuración desde tu portal Web y rellenar abajo
$rustdesk_cfg="configstring"

################################## Por favor no edites debajo de esta línea #########################################

# Ejecutar como administrador y permanecer en el directorio actual
if (-Not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))
{
    if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000)
    {
        Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
        Exit;
    }
}

# Esta función devolverá la última versión y enlace de descarga como un objeto
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

    # Enlace de ejemplo actual: https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe
    $Downloadlink = ($HTML.Links | Where {$_.href -match '(.)+\/rustdesk\/rustdesk\/releases\/download\/\d{1}.\d{1,2}.\d{1,2}(.{0,3})\/rustdesk(.)+x86_64.exe'} | select -first 1).href

    # corrección de bug - a veces necesitas reemplazar "about:"
    $Downloadlink = $Downloadlink.Replace('about:', 'https://github.com')

    $Version = "unknown"
    if ($Downloadlink -match './rustdesk/rustdesk/releases/download/(?<content>.*)/rustdesk-(.)+x86_64.exe')
    {
        $Version = $matches['content']
    }

    if ($Version -eq "unknown" -or $Downloadlink -eq "")
    {
        Write-Output "ERROR: Versión o enlace de descarga no encontrado."
        Exit
    }

    # Crear objeto para devolver
    $params += @{Version = $Version}
    $params += @{Downloadlink = $Downloadlink}
    $Result = New-Object PSObject -Property $params

    return($Result)
}

$RustDeskOnGitHub = getLatest


$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq $RustDeskOnGitHub.Version)
{
    Write-Output "RustDesk $rdver es la versión más reciente."
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
    Write-Output "Instalando servicio"
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
# Mostrar el valor de la variable ID
Write-Output "ID RustDesk: $rustdesk_id"

# Mostrar el valor de la variable contraseña
Write-Output "Contraseña: $rustdesk_pw"
Write-Output "..............................................."
```

## Windows batch/cmd

```bat
@echo off

REM Asignar el valor de contraseña aleatoria a la variable contraseña
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
set alfanum=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
set rustdesk_pw=
for /L %%b in (1, 1, 12) do (
    set /A rnd_num=!RANDOM! %% 62
    for %%c in (!rnd_num!) do (
        set rustdesk_pw=!rustdesk_pw!!alfanum:~%%c,1!
    )
)

REM Obtener tu cadena de configuración desde tu portal Web y rellenar abajo
set rustdesk_cfg="configstring"

REM ############################### Por favor no edites debajo de esta línea #########################################

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
REM Mostrar el valor de la variable ID
echo ID RustDesk: %rustdesk_id%

REM Mostrar el valor de la variable contraseña
echo Contraseña: %rustdesk_pw%
echo ...............................................
```

## MSI

También puedes usar msi en lugar de `rustdesk.exe --silent-install`.

https://rustdesk.com/docs/en/client/windows/msi/


## Winget

puedes desplegar vía powershell con winget también (esto instala vía la versión de Microsoft de apt - parte de las instalaciones de Windows más recientes)

desde una ventana de powershell o vía script (por ejemplo vía GPO)

```
winget install --id=RustDesk.RustDesk  -e
```

## macOS Bash

```sh
#!/bin/bash

# Asignar el valor de contraseña aleatoria a la variable contraseña
rustdesk_pw=$(openssl rand -hex 4)

# Obtener tu cadena de configuración desde tu portal Web y rellenar abajo
rustdesk_cfg="configstring"

################################## Por favor no edites debajo de esta línea #########################################

# Solicitud de contraseña de root para elevación de privilegios
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

# Especificar el punto de montaje para el DMG (directorio temporal)
mount_point="/Volumes/RustDesk"

# Descargar el archivo rustdesk.dmg
echo "Descargando RustDesk ahora"

if [[ $(arch) == 'arm64' ]]; then
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.aarch64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
else
    rd_link=$(curl -sL https://github.com/rustdesk/rustdesk/releases/latest | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*/\d{1}.\d{1,2}.\d{1,2}/rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    dmg_file=$(echo $rd_link | grep -Eo "rustdesk.\d{1}.\d{1,2}.\d{1,2}.x86_64.dmg")
    curl -L "$rd_link" --output "$dmg_file"
fi

# Montar el archivo DMG en el punto de montaje especificado
hdiutil attach "$dmg_file" -mountpoint "$mount_point" &> /dev/null

# Verificar si el montaje fue exitoso
if [ $? -eq 0 ]; then
    # Mover el contenido del DMG montado a la carpeta /Applications
    cp -R "$mount_point/RustDesk.app" "/Applications/" &> /dev/null

    # Desmontar el archivo DMG
    hdiutil detach "$mount_point" &> /dev/null
else
    echo "Error al montar el DMG de RustDesk. Instalación abortada."
    exit 1
fi

# Ejecutar el comando rustdesk con --get-id y almacenar la salida en la variable rustdesk_id
cd /Applications/RustDesk.app/Contents/MacOS/
rustdesk_id=$(./RustDesk --get-id)

# Aplicar nueva contraseña a RustDesk
./RustDesk --server &
/Applications/RustDesk.app/Contents/MacOS/RustDesk --password $rustdesk_pw &> /dev/null

/Applications/RustDesk.app/Contents/MacOS/RustDesk --config $rustdesk_cfg

# Matar todos los procesos llamados RustDesk
rdpid=$(pgrep RustDesk)
kill $rdpid &> /dev/null

echo "..............................................."
# Verificar si rustdesk_id no está vacío
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk: $rustdesk_id"
else
    echo "Error al obtener el ID de RustDesk."
fi

# Mostrar el valor de la variable contraseña
echo "Contraseña: $rustdesk_pw"
echo "..............................................."

echo "Por favor completa la instalación en GUI, lanzando RustDesk ahora."
open -n /Applications/RustDesk.app
```

## Linux

```sh
#!/bin/bash

# Asignar un valor aleatorio a la variable contraseña
rustdesk_pw=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)

# Obtener tu cadena de configuración desde tu portal Web y rellenar abajo
rustdesk_cfg="configstring"

################################## Por favor no edites debajo de esta línea #########################################

# Verificar si el script se está ejecutando como root
if [[ $EUID -ne 0 ]]; then
    echo "Este script debe ejecutarse como root."
    exit 1
fi

# Identificar OS
if [ -f /etc/os-release ]; then
    # freedesktop.org y systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID

    UPSTREAM_ID=${ID_LIKE,,}

    # Recurrir a ID_LIKE si ID no era 'ubuntu' o 'debian'
    if [ "${UPSTREAM_ID}" != "debian" ] && [ "${UPSTREAM_ID}" != "ubuntu" ]; then
        UPSTREAM_ID="$(echo ${ID_LIKE,,} | sed s/\"//g | cut -d' ' -f1)"
    fi

elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # Para algunas versiones de Debian/Ubuntu sin el comando lsb_release
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Debian más antiguo, Ubuntu, etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSE-release ]; then
    # SuSE más antiguo etc.
    OS=SuSE
    VER=$(cat /etc/SuSE-release)
elif [ -f /etc/redhat-release ]; then
    # Red Hat más antiguo, CentOS, etc.
    OS=RedHat
    VER=$(cat /etc/redhat-release)
else
    # Recurrir a uname, ej. "Linux <version>", también funciona para BSD, etc.
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
    echo "OS no soportado"
    # aquí podrías preguntar al usuario por permiso para intentar instalar de todos modos
    # si dicen sí, entonces hacer la instalación
    # si dicen no, salir del script
    exit 1
fi

# Ejecutar el comando rustdesk con --get-id y almacenar la salida en la variable rustdesk_id
rustdesk_id=$(rustdesk --get-id)

# Aplicar nueva contraseña a RustDesk
rustdesk --password $rustdesk_pw &> /dev/null

rustdesk --config $rustdesk_cfg

systemctl restart rustdesk

echo "..............................................."
# Verificar si rustdesk_id no está vacío
if [ -n "$rustdesk_id" ]; then
    echo "ID RustDesk: $rustdesk_id"
else
    echo "Error al obtener el ID de RustDesk."
fi

# Mostrar el valor de la variable contraseña
echo "Contraseña: $rustdesk_pw"
echo "..............................................."
```