---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T08:32:00Z
lang: 'es'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk para Linux: el escritorio remoto de código abierto'
excerpt: 'Instala y ejecuta RustDesk en Linux: .deb, .rpm, Flatpak y AppImage, X11 frente a Wayland, acceso sin monitor y desatendido, y cómo autoalojar el servidor.'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: 'Guías'
tags: ['RustDesk', 'Linux', 'Autoalojamiento']
author: 'RustDesk Team'
slug: 'rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto'
faq:
  - question: '¿Funciona RustDesk en Wayland?'
    answer: 'Sí. Las compilaciones estándar de RustDesk capturan escritorios Wayland mediante PipeWire y xdg-desktop-portal en una sesión iniciada, con varios monitores desde la versión 1.4.3. El portal pide consentimiento para compartir la pantalla, y la versión 4 del portal y posteriores pueden recordar la elección. Una compilación preliminar aparte añade acceso desatendido y acceso a la pantalla de inicio de sesión tras un reinicio, y está pensada para sistemas x86_64 basados en Debian/Ubuntu.'
  - question: '¿Qué paquete debo instalar en Linux?'
    answer: 'Usa el .deb en Debian, Ubuntu y Linux Mint, el .rpm en Fedora, RHEL y openSUSE, el Flatpak de Flathub si quieres una compilación aislada y compatible con casi cualquier sistema, o el AppImage portátil como alternativa de un solo archivo. Los paquetes .deb y .rpm registran e inician un servicio systemd para que RustDesk siga funcionando tras los reinicios; el Flatpak y el AppImage no lo hacen de forma predeterminada.'
  - question: '¿Por qué mi equipo Linux sin monitor muestra una pantalla negra?'
    answer: 'Normalmente, porque el equipo Linux sin monitor no tiene ninguna pantalla activa que RustDesk pueda capturar. Sin monitor, la pila gráfica a menudo no expone ninguna salida, así que la sesión se conecta pero muestra una pantalla negra o en espera de imagen. Conecta un adaptador HDMI o DisplayPort ficticio (dummy plug) o configura una pantalla virtual, como xserver-xorg-video-dummy en X11, y vuelve a conectarte.'
  - question: '¿Puedo autoalojar el servidor de RustDesk en Linux?'
    answer: 'Sí. El servidor de RustDesk (los procesos hbbs de ID/rendezvous y hbbr de relay) está pensado para Linux, y Linux es la forma habitual de ejecutarlo. RustDesk Server OSS (el servidor comunitario gratuito) no tiene cuota de licencia ni caducidad, y Server Pro añade una consola web, grupos de dispositivos y un generador de clientes personalizados. Ambos se instalan en una VM Linux normal o en un servidor físico.'
metadata:
  description: 'RustDesk en Linux de principio a fin: paquetes para cada distribución y placa ARM, captura en Wayland y X11, equipos sin monitor y tu propio servidor.'
  keywords: 'RustDesk para Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, instalar RustDesk en Linux'
---

RustDesk es un escritorio remoto de código abierto para Linux. Su cliente y RustDesk Server OSS (el servidor comunitario gratuito) tienen licencia AGPL, hay paquetes nativos para las principales distribuciones y puedes conectar todos los clientes a servicios de ID/rendezvous y relay que alojas tú mismo. Server Pro es software de servidor autoalojado, comercial y propietario, que añade una consola web y gestión centralizada. Código auditable, un cliente nativo para Linux e infraestructura que puedes autoalojar: por eso RustDesk es una respuesta habitual cuando alguien busca un escritorio remoto de código abierto para Linux.

Esta guía explica cómo instalarlo, el aspecto que confunde a todo el mundo (X11 frente a Wayland), cómo conseguir que funcionen el acceso desatendido y el acceso a equipos sin monitor, y qué papel juega el servidor.

## Instalación de RustDesk en Linux

RustDesk publica paquetes en todos los formatos de empaquetado habituales de Linux, así que rara vez tendrás que compilarlo desde el código fuente. Descarga la versión actual desde la [página de versiones de RustDesk en GitHub](https://github.com/rustdesk/rustdesk/releases) o desde la [documentación de instalación en Linux](https://rustdesk.com/docs/es/client/linux/) y elige el formato que corresponda a tu distribución.

| Formato  | Ideal para                    | ¿Inicia un servicio automáticamente? | Notas                                                                                                       |
| -------- | ----------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint    | Sí (systemd)                         | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE | Sí (systemd)                         | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Cualquier distro, aislado     | No                                   | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Cualquier distro, portátil    | No                                   | Puede necesitar `libfuse2` en versiones recientes de Ubuntu; aplica `chmod +x` y ejecútalo                  |
| AUR      | Arch, Manjaro                 | Depende del paquete                  | Mantenido por la comunidad (`rustdesk-bin`, `rustdesk-appimage`)                                            |

Los paquetes `.deb` y `.rpm` son los que debes usar si quieres que RustDesk se ejecute como servicio en segundo plano y siga funcionando tras los reinicios: ambos registran e inician automáticamente una unidad systemd. El Flatpak (`com.rustdesk.RustDesk` en [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) es una compilación aislada, cómoda para el uso de escritorio, pero no instala un servicio del sistema de forma predeterminada. Para una distribución que RustDesk no empaqueta directamente, recurre primero al **Flatpak**: como incluye su propio entorno de ejecución, suele ser la opción más compatible. El AppImage es una alternativa portátil de un solo archivo, pero en la práctica su compatibilidad es más irregular (por ejemplo, puede necesitar `libfuse2` en versiones recientes de Ubuntu).

En la práctica, RustDesk se usa en Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch y NixOS, con compilaciones para **x86_64, ARM64 (aarch64) y ARM32 (ARMv7)**, así que funciona tanto en placas y servidores ARM como en equipos estándar.

## X11 frente a Wayland: la parte que importa

Es lo más importante que hay que entender sobre RustDesk en Linux, porque determina si el control remoto «simplemente funciona» desde el principio o necesita antes un pequeño ajuste.

**X11 (Xorg): la vía de captura más directa, allí donde tu distribución todavía la ofrezca.** Con X11, RustDesk lee el framebuffer e inyecta la entrada directamente, así que la captura y el control de ratón y teclado son todo lo directos que pueden ser, y los cambios de monitor se detectan de forma dinámica. Muchos gestores de pantalla todavía permiten elegir «Xorg»/«X11» desde un menú con icono de engranaje en la pantalla de inicio de sesión. Ten en cuenta, eso sí, que varias distribuciones están pasando a ser solo Wayland y retirando la sesión X11, así que trata X11 como una comodidad allí donde esté disponible, no como algo sobre lo que diseñar tu despliegue.

**Wayland: compatible en las compilaciones estándar, con una versión preliminar para el acceso desatendido.** Como los compositores Wayland no permiten el acceso directo al framebuffer, las compilaciones estándar de RustDesk capturan la pantalla mediante `xdg-desktop-portal` y [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) en la sesión iniciada, e inyectan la entrada a través del módulo `uinput` del kernel. RustDesk 1.4.3 (octubre de 2025) [añadió la compartición de varios monitores en Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Una [versión preliminar de Wayland para acceso desatendido](/es/blog/unattended-remote-access-wayland-es) añade acceso desatendido y acceso a la pantalla de inicio de sesión tras un reinicio; está pensada para **sistemas x86_64 basados en Debian/Ubuntu**.

- **Consentimiento al empezar a compartir.** El portal muestra un cuadro de diálogo que pregunta qué pantalla compartir. Es una medida de seguridad de Wayland, no un fallo de RustDesk: una aplicación en segundo plano no puede empezar a grabar tu pantalla en silencio. La versión 4 del portal y posteriores admiten un «token de restauración», así que no se te vuelve a preguntar en cada conexión.
- **Acceso a la pantalla de inicio de sesión.** Las compilaciones estándar capturan la sesión iniciada. Para la pantalla de bienvenida tras un reinicio, usa la versión preliminar desatendida en sistemas x86_64 basados en Debian/Ubuntu, o una pantalla de bienvenida X11 donde tu distribución todavía la ofrezca.

Si te conectas a un equipo con Wayland y ves una pantalla negra con una compilación estándar, normalmente no se cumple la vía del portal/PipeWire: no se aceptó la solicitud, o `xdg-desktop-portal` o PipeWire no se están ejecutando. Nuestra guía sobre [RustDesk conectado, esperando imagen](/es/blog/rustdesk-conectado-esperando-imagen-guia-completa-de-solucion) repasa el caso de Wayland.

## Acceso desatendido en Linux

El acceso desatendido consiste en conectarse a un equipo sin nadie delante: el escenario clásico del soporte remoto. En Linux, la receta es esta:

1. Instala con `.deb` o `.rpm` para que se registre el servicio systemd, o pulsa **Habilitar Servicio** en la aplicación.
2. Define una **contraseña permanente** segura en **Ajustes → Seguridad**. El modo de aprobación predeterminado ya la acepta; añade la 2FA de conexión en el dispositivo controlado como segundo factor. Consulta la [guía de configuración del acceso desatendido](/es/blog/acceso-desatendido-en-rustdesk-guia-de-configuracion).
3. Para acceder antes del inicio de sesión en Wayland, usa la [versión preliminar de Wayland para acceso desatendido](/es/blog/unattended-remote-access-wayland-es) en sistemas x86_64 basados en Debian/Ubuntu, o configura la pantalla de bienvenida del gestor de pantalla para usar X11 donde sea compatible. Elegir solo una sesión de escritorio X11 afecta únicamente a la sesión posterior al inicio de sesión.

## Linux sin monitor: servidores headless

Un caso de uso habitual en Linux es un equipo sin ninguna pantalla conectada: un servidor doméstico, una máquina de laboratorio, una VM. Sin monitor, la pila gráfica a menudo no expone ninguna salida activa, así que no hay imagen que capturar y obtienes una pantalla negra.

Hay dos formas de darle algo que renderizar:

- **Un adaptador ficticio (dummy plug)**: un adaptador físico HDMI/DisplayPort «headless» y barato que hace creer a la GPU que hay un monitor conectado.
- **Un controlador de pantalla virtual**: `xserver-xorg-video-dummy` en X11, o una opción a nivel de kernel como VKMS.

## Autoalojar el servidor de RustDesk en Linux

Todo lo anterior se refiere al _cliente_. La otra mitad de la historia de RustDesk en Linux es que el **servidor** (el servicio `hbbs` de ID/rendezvous y el relay `hbbr`) es una aplicación nativa de Linux, y Linux es su entorno natural. Es lo que te permite mantener la intermediación de sesiones y el tráfico retransmitido en infraestructura propia, en lugar de enrutarlos a través de la nube de un proveedor.

Tienes dos opciones. **Server OSS** es gratuito, sin cuota de licencia ni caducidad, y cubre la función básica de conexión y relay. **RustDesk Server Pro** añade una consola web autoalojada, grupos de dispositivos y una libreta de direcciones compartida y, desde el plan Basic, un generador de clientes con marca personalizada y [SSO con LDAP/Active Directory y OIDC](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/ldap/). Tampoco estás obligado a usar Docker: consulta [cómo ejecutar Server Pro sin Docker](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/installscript/) para instalarlo en una VM normal o en un servidor físico.

Una nota sobre el autoalojamiento: Server OSS y Server Pro los ejecutas, parcheas y proteges tú. Los [requisitos de hardware son muy bajos](https://rustdesk.com/docs/es/self-host/rustdesk-server-oss/install/) (un servidor básico en la nube o incluso una Raspberry Pi ejecutan Server OSS); dimensiona según tus dispositivos en línea y el tráfico de relay, y asigna a alguien las actualizaciones, la supervisión y las copias de seguridad. Los planes de pago incluyen soporte. (Server Pro también comprueba su licencia por HTTPS saliente aproximadamente una vez al día, así que necesita una ruta hacia rustdesk.com).

## Primeros pasos

Instala el paquete de tu distribución, define una contraseña permanente para el acceso desatendido y, si la soberanía de los datos es lo que te ha traído aquí, pon en marcha Server OSS. Para los detalles actuales de los planes, [rustdesk.com/pricing](https://rustdesk.com/pricing) es la fuente de referencia, y en [sales@rustdesk.com](mailto:sales@rustdesk.com) pueden hablar contigo sobre Server Pro. ¿Quieres verlo funcionando antes? [Mira RustDesk en acción](https://www.youtube.com/@rustdesk).
