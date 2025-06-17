---
title: Windows & PM2 o NSSM
weight: 20
---

{{% notice note %}}
La política de seguridad de Windows es complicada, si este tutorial no funciona para usted, o encuentra una conexión inestable, por favor migre a un servidor Linux.
{{% /notice %}}

{{% notice note %}}
La versión GUI, `RustDeskServer.setup.exe` ya no se mantiene, no se recomienda.
{{% /notice %}}

## Una encrucijada
Ahora tiene dos opciones, puede usar PM2 (más fácil) o NSSM (un poco más difícil) para iniciar el servidor RustDesk
Hay algunos beneficios al usar NSSM:
- Compatibilidad con versiones anteriores de Windows (Windows Server 2008 R2/Windows 7 y anteriores aunque no probado).
- Ideal para Windows Server
- Inicio automático en el arranque sin inicio de sesión (El usuario que creó la entrada de inicio no necesita iniciar sesión para que se inicie).
- Ejecutar ambos binarios como Servicios.
- Independiente (sin dependencia de Node.js)

Mientras que los beneficios de PM2 incluyen:
- Buena idea si ejecuta el servidor en la misma computadora que su computadora de trabajo principal
- Inicia sesión regularmente en el usuario que creó la entrada de inicio de RustDesk
- Más fácil de usar

## Instalación usando NSSM

### Instalando NSSM
Por favor [descargue](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) y extraiga NSSM seleccione la arquitectura apropiada para su sistema Windows (si x86 use el contenido de la carpeta win32, si x64 use el contenido de la carpeta win64). También es una buena práctica mover el binario de NSSM al directorio `Program Files\NSSM` (NSSM una vez iniciado como servicio, no se puede mover del directorio en el que se colocó. por lo tanto, es mejor guardarlo en `Program Files`) de su unidad de instalación (generalmente la unidad C:). También es recomendable agregar la ruta (como `C:\Program Files\NSSM`) a la variable de ruta.

### Verificando si NSSM está instalado correctamente
Si ha hecho todo correctamente, la carpeta `C:\Program Files\NSSM` (en este ejemplo uso la unidad C: pero puede usar cualquier unidad en la que instaló Windows o cualquier ruta que desee) solo debe contener el archivo `nssm.exe`.

Usaremos `C:\Program Files\NSSM` en este ejemplo.

Abra el símbolo del sistema y ejecute `nssm` si ve una página de ayuda, está listo para pasar al siguiente paso.

### Ejecutar hbbr y hbbs
Descargue la versión de Windows de [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases).
Descomprima el programa en `C:\Program Files\RustDesk Server` (o en cualquier lugar que desee, solo asegúrese de que no cambie después de instalar el servicio). Ahora vuelva al símbolo del sistema.

Usaremos `C:\Program Files\RustDesk Server` en este ejemplo.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Nota:**
- Puede cambiar `RustDesk hbbs service` a lo que desee para nombrar el servicio hbbs
- Puede cambiar `RustDesk hbbr service` a lo que desee para nombrar el servicio hbbr
- Puede cambiar `C:\Program Files\RustDesk Server\hbbs.exe` a donde haya colocado los binarios de RustDesk
- Puede cambiar `C:\Program Files\RustDesk Server\hbbr.exe` a donde haya colocado los binarios de RustDesk

**Plantillas de comando:**

La plantilla de comando en caso de que solo quiera copiar, pegar y editar.

```cmd
nssm install <Nombre de servicio hbbs deseado> <Ruta del binario hbbs de RustDesk> <Argumentos hbbs de RustDesk>
nssm install <Nombre de servicio hbbr deseado> <Ruta del binario hbbr de RustDesk> <Argumentos hbbr de RustDesk>
```

**Iniciar servicios**

Después de la instalación exitosa de los servicios, deben iniciarse.
```cmd
nssm start <Nombre de servicio hbbs deseado>
nssm start <Nombre de servicio hbbr deseado>
```

**¡Listo!**

(El método anterior ha sido probado en Windows Server Core 2022 Standard).

## o

## Instalación usando PM2

### Instalar Node.js

Por favor [descargue](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) e instale Node.js.
Node.js es el entorno de tiempo de ejecución de PM2, por lo que primero debe instalar Node.js.

### Instalar PM2

Ingrese lo siguiente en `cmd.exe`, presione la tecla <kbd>Enter</kbd> para cada línea, y ejecútelas línea por línea.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Ejecutar hbbr y hbbs

Descargue la versión de Windows de [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases). Descomprima el programa en la unidad C:. Ejecute los siguientes cuatro comandos:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Ver el registro

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Tutoriales alternativos
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
