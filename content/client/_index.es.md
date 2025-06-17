---
title: Cliente RustDesk
weight: 2
pre: "<b>1. </b>"
---

## Introducción
El cliente RustDesk se utiliza en dispositivos para conectarse a través de nuestro servidor RustDesk, ya sea de código abierto o Pro. Está disponible para descargar desde [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

## Plataformas compatibles
- Microsoft Windows
- macOS
- Derivados de Debian (Ubuntu ≥ 16, Linux Mint, etc.)
- Derivados de Red Hat (CentOS, Fedora ≥ 18, Rocky Linux, etc.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (no soporta ser controlado)
- Web

## Instalación

### Windows

Descarga el exe de GitHub e instálalo.

Para instalar silenciosamente ejecuta el exe de instalación con `--silent-install`.

### macOS

Descarga el archivo dmg de GitHub, más información se puede encontrar en la [página de macOS](https://rustdesk.com/docs/es/client/mac/).

Abre el archivo dmg y arrastra `RustDesk` a `Aplicaciones`.

Permite la ejecución de RustDesk.

Habilita los permisos solicitados y sigue las instrucciones en el lado izquierdo de RustDesk para terminar la configuración.

### Linux

Por favor, consulta las siguientes instrucciones para instalar en las distintas "distribuciones" de Linux (los instaladores están en GitHub o disponibles en el repositorio de la distribución).

#### Derivados de Debian

```sh
# por favor ignora el reporte erróneo de uso del disco
sudo apt install -fy ./rustdesk-<version>.deb
```

#### Derivados de Red Hat

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

Entrar temporalmente en un shell con `rustdesk` listo para ejecutar:

```sh
nix shell nixpkgs#rustdesk
```

Instalar en el perfil del usuario actual:

```sh
nix profile install nixpkgs#rustdesk
```

Para instalar en todo el sistema en NixOS, ejecuta `nixos-rebuild switch --flake /etc/nixos` después de editar `configuration.nix`:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

### Android
Instala el apk desde nuestro GitHub, más información se puede encontrar en la [página de Android](https://rustdesk.com/docs/es/client/android/).

### iOS (iPhone, iPad)
Descarga la aplicación desde la [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

## Uso
Una vez instalado (o ejecutado como un ejecutable temporal) RustDesk se conectará a los servidores públicos. Verás un mensaje en la parte inferior que dice (1) "Listo, para una conexión más rápida, por favor configure su propio servidor". En la parte superior izquierda verás tu (2) ID, (3) Contraseña de un solo uso y a la derecha un (4) cuadro para conectarte a otra computadora si conoces su ID.

![](/docs/en/client/images/client.png)

Para acceder a la configuración, haz clic en el (5) botón de Menú [ &#8942; ] a la derecha del ID.

En Configuración encontrarás:
- General - Control del servicio, tema, códec de hardware, audio, grabación e idioma
- Seguridad - Permisos para alguien tomando el control, opciones de contraseña, capacidad de cambiar tu ID y configuración avanzada de seguridad
- Red - Configura aquí tu propia configuración del servidor y proxy
- Pantalla - Controla la configuración de pantalla para sesiones remotas y otras opciones predeterminadas, sincronizar portapapeles, etc.
- Cuenta - Esto se puede usar junto con el servidor Pro para iniciar sesión en la API
- Acerca de - Muestra información sobre el software.

## Configurando RustDesk
Hay varias formas de configurar RustDesk.

La forma más fácil es usando RustDesk Server Pro, puedes obtener una cadena de configuración encriptada, esto se puede usar junto con `--config` para importar configuraciones. Para hacer esto:
1. Abre la línea de comandos en cualquier sistema operativo que uses, en la carpeta donde está instalado RustDesk, es decir, `C:\Program Files\RustDesk` en Windows, `/usr/bin` en Linux.
2. Usa el comando `rustdesk.exe --config tu-cadena-encriptada` por ejemplo `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Puedes configurar manualmente un cliente. Para hacer esto:
1. Haz clic en Configuración.
2. Haz clic en Red.
3. Haz clic en Desbloquear configuración de red.
4. Ingresa tu ID, Relay, API (si usas servidor pro) y tu clave.

![](/docs/en/client/images/network-settings.png)

Si configuras manualmente un cliente, puedes recuperar el archivo `RustDesk2.toml` (en la carpeta de usuarios) y usar `--import-config` de manera similar al ejemplo anterior.

## Parámetros de línea de comandos
- `--password` se puede usar para establecer una contraseña permanente.
- `--get-id` se puede usar para obtener el ID.
- `--set-id` se puede usar para establecer un ID, ten en cuenta que los IDs deben comenzar con una letra.
- `--silent-install` se puede usar para instalar RustDesk silenciosamente en Windows.

Los parámetros avanzados adicionales se pueden encontrar [aquí](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}