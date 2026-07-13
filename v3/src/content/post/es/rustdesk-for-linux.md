---
publishDate: 2026-07-09T08:32:00Z
lang: 'es'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk para Linux: el escritorio remoto de código abierto'
excerpt: 'Instala y ejecuta RustDesk en Linux: .deb, .rpm, Flatpak y AppImage, X11 frente a Wayland, acceso headless y desatendido, y alojamiento propio del servidor.'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: 'Guías'
tags: ['RustDesk', 'Linux', 'Autoalojamiento']
author: 'RustDesk Team'
slug: 'rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto'
faq:
  - question: '¿RustDesk funciona en Wayland?'
    answer: 'Sí: RustDesk cuenta con uno de los soportes de Wayland más sólidos de cualquier herramienta de escritorio remoto, incluida la compartición multimonitor añadida en la versión 1.4.3. En Wayland, captura la pantalla a través de PipeWire y el portal de escritorio XDG, que muestra un cuadro de diálogo de consentimiento para elegir una pantalla —en la mayoría de los casos la elección se recuerda, por lo que no se vuelve a preguntar— y funciona dentro de la sesión gráfica activa con el usuario conectado. Ese paso de consentimiento forma parte del diseño de seguridad de Wayland y lo comparten todas las aplicaciones de compartición de pantalla. Para equipos previos al inicio de sesión o totalmente desatendidos, utiliza hoy la configuración headless con pantalla virtual (o una sesión X11 donde la distribución todavía la ofrezca, ya que varias están migrando a Wayland exclusivamente); la captura de Wayland totalmente desatendida está en desarrollo activo (consulta github.com/rustdesk/rustdesk/pull/15420).'
  - question: '¿Qué paquete debo instalar en Linux?'
    answer: 'Usa el .deb en Debian, Ubuntu y Linux Mint, el .rpm en Fedora, RHEL y openSUSE, el Flatpak de Flathub para una compilación en sandbox ampliamente compatible, o el AppImage portátil como alternativa de archivo único. Los paquetes .deb y .rpm registran e inician un servicio systemd para que RustDesk sobreviva a los reinicios; el Flatpak y el AppImage no lo hacen de forma predeterminada.'
  - question: '¿Por qué mi equipo Linux headless muestra una pantalla en negro?'
    answer: 'Sin un monitor conectado, X o Wayland nunca asignan un framebuffer, por lo que no hay nada que RustDesk pueda capturar y el visor muestra una pantalla en negro o de espera de imagen. Conecta un conector ficticio HDMI/DisplayPort, configura una pantalla virtual como xserver-xorg-video-dummy o VKMS, o activa el modo headless opcional de RustDesk para Linux para que se cree una pantalla virtual automáticamente.'
  - question: '¿Puedo alojar yo mismo el servidor de RustDesk en Linux?'
    answer: 'Sí. El servidor de RustDesk (los procesos hbbs de ID/rendezvous y hbbr de retransmisión) está creado para Linux y es la forma estándar de ejecutarlo. El servidor comunitario gratuito y de código abierto funciona indefinidamente sin coste, y Server Pro añade además una consola web, grupos de dispositivos y un generador de clientes personalizados. Ambos se instalan en una VM Linux normal o en un host físico (bare-metal).'
metadata:
  description: 'RustDesk en Linux, de principio a fin: opciones de paquetes para cada distribución y placa ARM, captura en Wayland y X11, configuración headless y cómo ejecutar tu propio servidor.'
  keywords: 'RustDesk para Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, instalar RustDesk en Linux'
---

Los usuarios de Linux nunca han tenido una gran variedad de buenas herramientas de escritorio remoto, y las que existen suelen ser productos comerciales de código cerrado o anticuadas soluciones basadas en VNC. RustDesk ocupa un lugar distinto: es un cliente de escritorio remoto de código abierto con licencia AGPL, funciona de forma nativa en todas las distribuciones principales, y puedes apuntarlo a un servidor alojado por ti mismo. Esa combinación —código auditable, cliente nativo para Linux e infraestructura que puedes alojar tú mismo— es la razón por la que RustDesk se ha convertido en una de las respuestas de referencia cuando alguien busca un escritorio remoto de código abierto para Linux.

Esta guía explica cómo instalarlo, el aspecto que suele confundir a todo el mundo (X11 frente a Wayland), cómo lograr que funcionen el acceso desatendido y headless, y qué papel juega el servidor en todo esto.

## Instalación de RustDesk en Linux

RustDesk distribuye paquetes para todos los formatos de empaquetado habituales en Linux, por lo que rara vez tendrás que compilarlo desde el código fuente. Descarga la versión actual desde la [página de versiones de RustDesk en GitHub](https://github.com/rustdesk/rustdesk/releases) o desde la [documentación de instalación en Linux](https://rustdesk.com/docs/en/client/linux/) y elige el formato que corresponda a tu distribución.

| Formato  | Ideal para                    | ¿Inicia un servicio automáticamente? | Notas                                                                                                       |
| -------- | ----------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint    | Sí (systemd)                         | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE | Sí (systemd)                         | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Cualquier distro, en sandbox  | No                                   | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Cualquier distro, portátil    | No                                   | Puede necesitar `libfuse2` en Ubuntu reciente; ejecuta `chmod +x` y luego ejecútalo                         |
| AUR      | Arch, Manjaro                 | Depende del paquete                  | Mantenido por la comunidad (`rustdesk-bin`, `rustdesk-appimage`)                                            |

Los paquetes `.deb` y `.rpm` son los que debes usar si quieres que RustDesk se ejecute como un servicio en segundo plano que sobrevive a los reinicios: ambos registran e inician automáticamente una unidad systemd. El Flatpak (`com.rustdesk.RustDesk` en [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) es una compilación en sandbox cómoda para uso de escritorio, pero que no instala un servicio del sistema de forma predeterminada. Para una distribución que RustDesk no empaqueta directamente, recurre primero al **Flatpak**: al incluir su propio runtime, suele ser la opción más ampliamente compatible. El AppImage es una alternativa portátil de archivo único, pero en la práctica su compatibilidad es más irregular (por ejemplo, puede necesitar `libfuse2` en Ubuntu reciente).

En la práctica, RustDesk se usa en Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch y NixOS, con compilaciones para **x86_64, ARM64 (aarch64) y ARM32 (ARMv7)**, por lo que funciona tanto en placas y servidores ARM como en equipos estándar.

## X11 frente a Wayland: la parte que realmente importa

Esto es lo más importante que hay que entender sobre RustDesk en Linux, porque determina si el control remoto «simplemente funciona» de inmediato o necesita antes un pequeño ajuste de configuración.

**X11 (Xorg): la vía de captura más directa, allí donde tu distribución todavía la ofrezca.** Con X11, RustDesk lee el framebuffer directamente e inyecta la entrada directamente, por lo que la captura y el control de ratón/teclado son todo lo directos que pueden ser, y los cambios de monitor se detectan de forma dinámica. Muchos gestores de inicio de sesión todavía permiten elegir «Xorg»/«X11» desde un menú con icono de engranaje en la pantalla de inicio de sesión. Ten en cuenta, sin embargo, que varias distribuciones están pasando a Wayland exclusivamente y retirando la sesión X11, así que trata X11 como una comodidad disponible allí donde exista, no como algo sobre lo que diseñar tu implementación.

**Wayland: es posible que RustDesk tenga el soporte más sólido de cualquier herramienta de escritorio remoto.** RustDesk es compatible con Wayland desde la versión 1.2.0 y no ha dejado de ampliar ese soporte. Como los compositores de Wayland no permiten el acceso directo al framebuffer, RustDesk captura la pantalla a través del servicio `xdg-desktop-portal` y [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support), e inyecta la entrada mediante el módulo `uinput` del kernel. De este diseño propio de Wayland se derivan dos consecuencias, que se aplican a cualquier herramienta de compartición de pantalla en Wayland, no solo a RustDesk:

- **Consentimiento por conexión.** El portal muestra un cuadro de diálogo que te pide seleccionar qué pantalla compartir. Se trata de una característica de seguridad deliberada de Wayland, no de un fallo de RustDesk: una aplicación en segundo plano no puede empezar a grabar tu pantalla de forma silenciosa. El portal v4 y versiones posteriores admiten un «token de restauración» para que no se te vuelva a pedir confirmación cada vez, pero la primera compartición requiere un clic en pantalla.
- **Solo sesión activa.** La captura en Wayland está ligada a la sesión gráfica con el usuario conectado. Capturar la pantalla de bienvenida (greeter) de Wayland aún no es compatible; está en desarrollo activo ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Para acceso previo al inicio de sesión, utiliza por ahora la configuración headless/pantalla virtual que se explica más abajo, o una sesión X11 en las distribuciones que todavía la ofrezcan.

El soporte de Wayland no deja de mejorar: RustDesk 1.4.3 (octubre de 2025), por ejemplo, [añadió la compartición multimonitor para Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Pero si te conectas y ves una pantalla en negro en un equipo con Wayland, casi siempre se debe a que no se cumple correctamente la vía del portal/PipeWire. Nuestro artículo específico sobre [RustDesk conectado pero esperando la imagen](/es/blog/rustdesk-conectado-esperando-imagen-guia-completa-de-solucion) repasa en detalle el caso de pantalla en negro en Wayland.

## Acceso desatendido en Linux

El acceso desatendido significa conectarse a un equipo sin que haya nadie sentado delante: el escenario clásico de soporte remoto. En Linux, la receta es la siguiente:

1. Instala mediante `.deb` o `.rpm` para que se registre el servicio systemd, o haz clic en **Habilitar servicio** dentro de la aplicación.
2. En RustDesk, define una **contraseña permanente** segura en la configuración de conexión (e, idealmente, activa la autenticación de dos factores).
3. Para acceder antes del inicio de sesión o entre distintas sesiones de usuario, utiliza la configuración headless con pantalla virtual que se explica más abajo (aquí se aplica la limitación de la pantalla de bienvenida de Wayland mencionada antes).

Una realidad de Wayland que conviene prever: el portal basado en consentimiento descrito en la sección de Wayland hace que la captura totalmente desatendida sea más difícil que en X11, al menos hasta que llegue el soporte desatendido que está en desarrollo. Así que, para equipos sin intervención humana, cuenta con la configuración headless de pantalla virtual.

## Linux headless: servidores sin monitor

Un caso de uso muy habitual en Linux es un equipo sin ninguna pantalla conectada: un servidor doméstico, una máquina de laboratorio, una VM. Aquí el problema no es RustDesk, sino la pila gráfica: sin un monitor conectado, X o Wayland nunca asignan un framebuffer, así que literalmente no hay ninguna imagen que capturar y obtienes una pantalla en negro.

Hay tres formas de darle algo que renderizar:

- **Un conector ficticio (dummy plug)**: un adaptador físico económico HDMI/DisplayPort «headless» que hace creer a la GPU que hay un monitor conectado.
- **Un controlador de pantalla virtual**: `xserver-xorg-video-dummy` en X11, o una opción a nivel de kernel como VKMS.
- **El modo headless opcional de RustDesk**: actívalo con `sudo rustdesk --option allow-linux-headless Y`. Según la [wiki de soporte de Linux headless](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support), está desactivado de forma predeterminada, se prueba principalmente en Ubuntu con GNOME, y requiere paquetes como `xserver-xorg-video-dummy` y `lightdm`. Puedes obtener el ID del equipo con `sudo rustdesk --get-id` y establecer una contraseña con `sudo rustdesk --password <password>`.

El modo headless todavía tiene algunas asperezas, así que considéralo como «funciona, con cuidado» más que como una solución llave en mano.

## Alojamiento propio del servidor de RustDesk en Linux

Todo lo anterior corresponde al _cliente_. La otra mitad de la historia de RustDesk en Linux es que el **servidor** —el servicio `hbbs` de ID/rendezvous y el relé `hbbr`— es una aplicación nativa de Linux, y Linux es su entorno natural. Eso es lo que te permite mantener la intermediación de sesiones y el tráfico retransmitido en infraestructura de tu propiedad, en lugar de enrutarlo a través de la nube de un proveedor.

Tienes dos opciones. El **servidor comunitario**, gratuito y de código abierto, funciona indefinidamente sin coste y cubre la función básica de conexión y retransmisión. **RustDesk Server Pro** añade una consola web autoalojada, grupos de dispositivos, una libreta de direcciones compartida, un generador de clientes personalizados con tu marca, y [SSO mediante LDAP/Active Directory y OIDC](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/ldap/). Tampoco estás obligado a usar Docker: consulta [cómo ejecutar Server Pro sin Docker](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/installscript/) para una instalación en una VM normal o en un host físico (bare-metal). Si estás dimensionando el hardware para una flota grande, planifica la capacidad en función de tu perfil real de concurrencia y de retransmisión antes de comprometerte.

Una nota sobre el autoalojamiento: el servidor comunitario gratuito y Server Pro son tuyos para ejecutar, parchear y proteger. Los requisitos de hardware son bajos y, una vez configurado, el mantenimiento es ligero, y el soporte de RustDesk puede ayudarte si surge alguna duda. Esa propiedad es precisamente el objetivo. (La licencia de Server Pro también necesita una conexión saliente hacia rustdesk.com para activarse y mantener la licencia vigente).

## Primeros pasos

Instala el paquete correspondiente a tu distribución, define una contraseña permanente para el acceso desatendido y, si la soberanía de los datos es la razón por la que estás aquí, pon en marcha el servidor comunitario gratuito. Para conocer los detalles actuales de los planes, [rustdesk.com/pricing](https://rustdesk.com/pricing) es la fuente oficial, y [sales@rustdesk.com](mailto:sales@rustdesk.com) puede resolver tus dudas sobre Server Pro. ¿Quieres verlo en acción primero? [Mira RustDesk en acción](https://www.youtube.com/@rustdesk).
