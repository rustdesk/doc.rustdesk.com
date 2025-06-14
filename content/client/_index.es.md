---
title: Cliente RustDesk
weight: 2
pre: "<b>1. </b>"
---

## Introducción
El cliente RustDesk es utilizado en dispositivos para conectar con los servidores de RustDesk, tanto el servidor Pro como el de código abierto. El cliente esta disponible en [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

## Plataformas compatibles
- Microsoft Windows
- macOS
- Derivados de Debian (Ubuntu, Mint, etc.)
- Derivados de Redhat (Centos, Rocky, etc.)
- Arch/Manjaro
- openSUSE
- AppImage / Flatpak
- Android
- iOS (no soporta control remoto)
- Web (1.1.9 Beta)

## Instalación

### Windows

Descarga el .exe de Github y ejecútalo.

Para instalar silenciosamente ejecuta el .exe con el parámetro `--silent-install`.


### macOS

Descarga el archivo .dmg de Github, mas información en la [pagina de macOS](/docs/es/client/mac/).

Abri el archivo .dmg, arrastra `RustDesk` a `Aplicaciones`.

Permite la ejecución de RustDesk

Habilita la petición de permisos y seguí las instrucciones del lado inquiero del cliente de RustDesk para terminar la configuración.
Enable permissions requested and follow prompts on the left hand side of RustDesk to finish setup.

### Linux

Por favor lee las instrucciones de abajo para instalar en los distintos "sabores" de Linux, todos los instaladores están en GitHub


### Derivados de  Debian (>= 16)

```sh
# Ignora el reporte de uso incorrecto del disco {wrong disk usage}.
sudo apt install -fy ./rustdesk-<version>.deb
```

### CentOS/Fedora (>= 18)

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

### Arch/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

### openSUSE (>= Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```
### Android
Instala el archivo .apk de nuestro GitHub, mas información en la [Pagina de android](/docs/es/client/android/)

### iOS (iPhone, iPad)
Descarga la app de la [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).


## Utilización
Una vez instalado(o ejecutado de manera temporal) RustDesk se conectara a los servidores públicos. Veras un mensaje en la parte inferior con el texto (1) "Listo, Para una conexión mas rápida, configure su propio servidor". En la parte superior izquierda veras (2) ID, (3) Contraseña de un solo uso, (4) entrada de texto para conectar a otra computadora mediante su ID

![image](/docs/en/client/images/client.png)

Para acceder a los ajustes, hace click en el (5) botón de menu [ &#8942; ] a la derecha de la ID.

En ajustes encontraras:
- General - Control del servicio, Temas, Codec de Hardware, Audio, Grabación e Idioma.
- Seguridad - Permisos para alguien tomando el control, Opciones de contraseña, Posibilidad de cambiar tu ID y Opciones avanzadas de seguridad.
- Red - Configuración de tu propio servidor y Proxy.
- Pantalla - Controla la configuración de la pantalla de conexiones remotas y otras opciones por defecto, sincronización del portapapeles,etc.
- Cuenta - Puede ser usado en conjunto con el Pro Server para ingresar a la API.
- About - Muestra información sobre el software.


## Configurando RustDesk

Hay varias maneras de configurar RUstDesk

La manera mas fácil es usando RusDesk Server Pro (servidor profesional de RustDesk) para obtener una cadena encriptada, Esto puede ser usado en conjunto con `--config` para importar los ajustes. para hacer esto:
1. Abri la interfaz de linea de comandos de tu sistema operativo, en la carpeta de instalación de RustDesk `C:\Program Files\RustDesk` en Windows, `/usr/bin` en Linux.
2. Usa el comando `rustdesk.exe --config tu-cadena-encriptada` ej. `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.
   
Podes configurar el cliente manualmente también, para hacerlo:
1. Hace click en Ajustes
2. Hace click en Red
3. Hace click en Desbloquear Ajustes de Red
4. Ingresa las direcciones de los servidores IDs, Relay y Api(si estas usando Pro) y tu "key"
   
![image](/docs/en/client/images/network-settings.png)

Si configuras el cliente manualmente, podes usar el archivo `RustDesk2.toml` (en la carpeta de usuarios) y usar `--import-config` de manera similar al ejemplo de arriba.

## Parámetros de la linea de comandos
- `--password` Puede ser usado para establecer un parámetro de contraseña
- `--get-id` Puede ser usado para obtener la ID
- `--set-id` Puede ser usado para establecer una ID, tenga en cuenta que las ID necesitan empezar con una letra.
- `--silent-install` Puede ser usado para instalar RustDesk de manera silenciosa en Windows.

Parámetros adicionales avanzados se pueden encontrar [aquí](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).


{{% children depth="1" showhidden="true" %}}
