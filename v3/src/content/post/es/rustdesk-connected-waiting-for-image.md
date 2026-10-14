---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-06T08:31:00Z
lang: 'es'
translationKey: rustdesk-connected-waiting-for-image
draft: false
title: 'RustDesk conectado, esperando imagen: guía completa de solución'
excerpt: 'Diagnostica el mensaje «Conectado, esperando imagen» de RustDesk: pantalla disponible, permisos de captura, códecs, controladores de GPU, Wayland y conectividad del relay.'
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp
category: 'Solución de problemas'
tags: ['RustDesk', 'Solución de problemas']
author: RustDesk Team
slug: 'rustdesk-conectado-esperando-imagen-guia-completa-de-solucion'
faq:
  - question: '¿Por qué RustDesk dice «Conectado, esperando imagen»?'
    answer: 'La sesión se ha conectado, pero no llega ninguna imagen. La causa más citada es que el equipo remoto no tiene nada que capturar: no hay monitor, la pantalla está en reposo o falta el permiso de grabación de pantalla. Conecta un monitor, un emulador de pantalla HDMI o una pantalla virtual, activa la pantalla, concede el permiso y, después, prueba otro códec, como VP9.'
  - question: '¿Cómo soluciono que RustDesk se quede esperando imagen en un equipo sin monitor?'
    answer: 'Dale al equipo sin monitor una pantalla que capturar. Conecta un monitor o un emulador de pantalla HDMI económico, que hace que la GPU se comporte como si hubiera una pantalla conectada, o configura una pantalla virtual. Después, mantén la pantalla activa, confirma el permiso de captura de pantalla y cambia a un códec por software, como VP9, si la imagen sigue sin aparecer.'
  - question: '¿Cambiar el códec de vídeo soluciona la pantalla negra?'
    answer: 'A menudo, sí. En la barra de herramientas de la sesión remota o en los ajustes puedes cambiar de códec: VP8, VP9, AV1 o H.264/H.265 si el hardware los admite. Un códec que el hardware remoto no puede codificar muestra una imagen en blanco o congelada, y volver a un códec por software como VP9 suele recuperar la imagen.'
  - question: 'RustDesk muestra la imagen en un PC pero no en otro. ¿Por qué?'
    answer: 'Una diferencia entre dos PC apunta a algo local en el equipo que falla: una pantalla en reposo o ausente, la falta del permiso de grabación de pantalla en macOS, un controlador de GPU desactualizado, un conflicto de aceleración por hardware o un códec que el hardware no puede manejar. Aplica las soluciones de cada causa en el equipo que falla, no en el que funciona.'
  - question: '¿Puede mi servidor autoalojado provocar el mensaje «esperando imagen»?'
    answer: 'Normalmente no. Cuando RustDesk muestra «Conectado, esperando imagen», el servidor de ID ya ha hecho su trabajo. Aun así, un puerto del relay bloqueado o un relay sobrecargado pueden atascar el flujo de vídeo. En un servidor autoalojado, permite TCP 21115-21117 y UDP 21116, y permite TCP 21118-21119 solo si usas clientes WebSocket.'

metadata:
  description: '¿RustDesk dice «Conectado, esperando imagen»? Soluciona la pantalla negra: equipos sin monitor, reposo, códecs, controladores de GPU, Wayland y puertos.'
  keywords: 'RustDesk conectado esperando imagen, RustDesk pantalla negra, solución RustDesk esperando imagen, RustDesk sin imagen, RustDesk emulador de pantalla HDMI, códec de vídeo RustDesk, aceleración por hardware RustDesk'
---

Si RustDesk muestra **«Conectado, esperando imagen»** y después una pantalla negra, lo difícil ya ha funcionado: los dos extremos se han encontrado y la sesión está establecida. Lo que falta es la _imagen_. En la mayoría de los casos, el equipo remoto no tiene nada que capturar; con menos frecuencia, un códec, un controlador de GPU o la ruta del relay atascan el flujo. Esta guía repasa cada causa, de la más citada a los casos límite, con una solución concreta para cada una.

## La respuesta corta

La sesión se ha conectado, pero no llega ninguna imagen. La causa más citada es un equipo remoto que no tiene nada que capturar: **sin monitor, con la pantalla en reposo o sin permiso de grabación de pantalla**. Dale a RustDesk una pantalla real y activa (un monitor, un emulador de pantalla HDMI o una pantalla virtual) y el permiso adecuado y, si la imagen sigue sin aparecer, cambia a otro códec, como VP9. Si aun así sigue en negro, actualiza el controlador de la GPU y comprueba que los puertos del relay sean accesibles.

## Empieza por aquí: ¿hay algo que capturar?

La causa más citada es un **equipo sin monitor (headless)**: un servidor, un mini-PC o una estación de trabajo que funciona sin monitor conectado o con la pantalla en reposo. Sin una pantalla activa, a menudo no hay framebuffer que capturar, así que RustDesk se conecta pero no tiene nada que enviar. Este patrón aparece una y otra vez en el gestor de incidencias de RustDesk, incluidos [informes de pantallas negras precisamente cuando el monitor del equipo de destino está apagado](https://github.com/rustdesk/rustdesk/issues/9884) y el veterano [hilo sobre «Conectado, esperando imagen»](https://github.com/rustdesk/rustdesk/issues/222).

Dos formas de darle algo que capturar:

- **Conecta un monitor** y asegúrate de que esté encendido y activo.
- **Usa un emulador de pantalla HDMI (o DisplayPort).** Estos adaptadores económicos hacen creer a la GPU que hay una pantalla conectada, de modo que sigue generando un framebuffer para que RustDesk lo capture. Es la solución habitual para equipos de escritorio sin monitor y servidores domésticos.

Si _sí_ hay un monitor conectado, el siguiente sospechoso es que haya entrado en reposo.

## Solución según la causa

| Causa                                 | Síntoma                                                     | Solución                                                                                                                                        |
| ------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Sin monitor / sin pantalla            | Pantalla negra en un servidor o mini-PC                     | Conecta un monitor o añade un emulador de pantalla HDMI                                                                                         |
| Pantalla en reposo o bloqueada        | Funcionaba antes, negra tras un rato de inactividad         | Activa la pantalla; mantenla activa durante el horario de acceso; deja activado el bloqueo con contraseña                                       |
| Falta de permiso (macOS)              | Se conecta, pero la pantalla sigue negra                    | Concede Grabación de pantalla en Privacidad y seguridad; instala el componente auxiliar para la pantalla de inicio de sesión                    |
| Códec incompatible                    | Imagen en blanco o congelada                                | Cambia de códec (VP8 / VP9 / AV1 / H.264 / H.265); vuelve a un códec por software                                                               |
| Conflicto de aceleración por hardware | Negra con GPU concretas                                     | Desactiva el códec por hardware en la barra de herramientas de la sesión o en Ajustes, o cambia de códec                                        |
| Controlador de GPU desactualizado     | Negra tras actualizar el controlador o el sistema operativo | Actualiza el controlador de la GPU (sobre todo en NVIDIA)                                                                                       |
| Sesión Wayland (Linux)                | No aparece la solicitud de consentimiento; imagen en blanco | Acepta la solicitud de PipeWire/portal y confirma que el portal de escritorio está instalado; una sesión X11 también sirve si la distribución aún la ofrece |
| Atasco de red o del relay             | Se queda en «esperando imagen»                              | Permite TCP 21115-21117 y UDP 21116; añade TCP 21118-21119 para clientes WebSocket                                                              |

### Reposo, bloqueo y salvapantallas

Si funcionaba antes y se ha quedado en negro después de que el equipo estuviera inactivo, la pantalla ha entrado en reposo.

- **Windows:** configura el plan de energía para que la pantalla y el equipo sigan activos durante las horas en que necesitas acceso remoto. Con RustDesk instalado como servicio puedes conectarte en la pantalla de bloqueo, así que deja activado el bloqueo con contraseña.
- **macOS:** evita que la pantalla entre en reposo durante las horas en que necesitas acceso remoto; configúralo en **Ajustes del Sistema → Pantallas** (o en los ajustes de Pantalla bloqueada / Energía), y mantén el Mac conectado a la corriente, porque el reposo se comporta de otra forma con batería.
- **Android:** la pantalla tiene que estar encendida para poder compartirla, así que tócala para activarla antes de conectarte. Conectarse desde iOS a un dispositivo Android en reposo con la pantalla apagada es un [caso conocido de «esperando imagen»](https://github.com/rustdesk/rustdesk/issues/11479): activa primero el dispositivo de destino.

### Permisos de macOS

macOS no deja que ninguna aplicación grabe la pantalla sin un consentimiento explícito. Si RustDesk se conecta pero la pantalla sigue negra en un Mac, abre **Ajustes del Sistema → Privacidad y seguridad → Grabación de pantalla**, activa RustDesk y reinicia la aplicación. Una pantalla negra precisamente _en la ventana de inicio de sesión_ significa que el servicio o componente auxiliar de RustDesk no está instalado para ejecutarse antes de que un usuario inicie sesión: instálalo para permitir la captura antes del inicio de sesión.

### Códec de vídeo incompatible

RustDesk puede codificar el flujo de varias formas, y la opción predeterminada no siempre se adapta al hardware remoto. En la barra de herramientas de la sesión (o en Ajustes), cambia el códec —**VP8, VP9, AV1 o H.264/H.265 si el hardware los admite**— y comprueba si aparece la imagen. Si un códec por hardware produce una imagen en blanco en una GPU concreta, volver a un códec por software como VP9 es la opción fiable.

### Aceleración por hardware y controladores de GPU

Algunas GPU —las configuraciones de NVIDIA son las que más aparecen— chocan con las rutas de captura y renderizado aceleradas por hardware de RustDesk. Hay dos palancas que ayudan:

- **Desactiva el códec por hardware.** Hazlo desde la barra de herramientas de la sesión o desmarcando **Habilitar códec por hardware** en Ajustes, para que la codificación pase a una ruta por software; esto elimina la pantalla negra en muchas GPU problemáticas.
- **Actualiza el controlador de la GPU.** Una pantalla negra que empezó tras actualizar el controlador o el sistema operativo suele resolverse pasando a un controlador actual, sobre todo en hardware NVIDIA.

### Linux y Wayland

En Linux, las compilaciones estándar de RustDesk capturan escritorios Wayland, incluidos varios monitores desde la versión 1.4.3, mediante **PipeWire y `xdg-desktop-portal`** en una sesión iniciada. El portal te pide que elijas qué pantalla compartir, y la versión 4 del portal y posteriores pueden recordar la elección. Si ves una pantalla en blanco en Wayland, acepta la solicitud de compartir pantalla del portal y confirma que `xdg-desktop-portal` y PipeWire están instalados y en ejecución. Iniciar una sesión X11/Xorg también evita la ruta del portal si la distribución aún la ofrece. Con las compilaciones estándar, que capturan la sesión iniciada, es normal ver una pantalla negra en la pantalla de inicio de sesión; la [versión preliminar de acceso desatendido en Wayland](/es/blog/unattended-remote-access-wayland-es), independiente y para **sistemas x86_64 basados en Debian/Ubuntu**, añade el acceso desatendido y el acceso a la pantalla de inicio de sesión tras un reinicio.

### Red y relay

Como el mensaje incluye la palabra «conectado», normalmente la sesión ya está establecida, pero el _vídeo_ puede atascarse si el relay está sobrecargado o hay un puerto del relay bloqueado. Para la ruta de servidor estándar, asegúrate de que **TCP 21115-21117 y UDP 21116** sean accesibles de extremo a extremo. Abre **TCP 21118-21119 solo si usas clientes WebSocket**. El servidor de demostración público es compartido y su rendimiento no está garantizado, así que, si dependes de RustDesk a diario, autoalojar tu relay te da control sobre la capacidad y la monitorización. Si lo que falla es la propia sesión, que se corta o nunca llega a establecerse, el problema es otro: consulta las [preguntas frecuentes de RustDesk Server Pro](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/faq/).

## Mantén todo actualizado

Las versiones antiguas arrastran errores de captura antiguos. Actualiza a la última versión **tanto** el cliente que controla como el cliente controlado y, si autoalojas, actualiza también el servidor. Varios casos de pantalla negra desaparecen sin más tras actualizar ambos extremos.

## La ventaja del código abierto

Cuando una pantalla negra se resiste a la lista de comprobación, RustDesk te ofrece algo que las herramientas de código cerrado no dan: el código de captura real, con licencia AGPL. Tú (o un proveedor externo) puedes leer exactamente cómo funciona la captura en tu plataforma, reproducir el problema y abrir una incidencia precisa en el repositorio público, en lugar de esperar en la cola de soporte de un proveedor.

## Menos variables cuando el servidor es tuyo

Ejecuta [tu propio relay y servidor de ID](/es/blog/por-que-autoalojar-tu-software-de-escritorio-remoto) y la infraestructura pública compartida desaparece de la ecuación: una incógnita menos cuando estás persiguiendo un problema de captura, y control total sobre las piezas que puedes ajustar. Es una ventaja discreta que se suma a conservar los datos.
