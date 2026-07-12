---
publishDate: 2026-07-06T08:31:00Z
lang: 'es'
translationKey: rustdesk-connected-waiting-for-image
draft: false
title: 'RustDesk conectado, esperando imagen: guía completa de solución'
excerpt: '"Conectado, esperando imagen" significa que la pantalla remota no se está capturando. Aquí encontrarás todas las causas —equipos sin monitor, reposo, códecs, controladores— y su solución.'
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.png
category: 'Solución de problemas'
tags: ['RustDesk', 'Solución de problemas']
author: RustDesk Team
slug: 'rustdesk-conectado-esperando-imagen-guia-completa-de-solucion'
faq:
  - question: '¿Por qué RustDesk dice "Conectado, esperando imagen"?'
    answer: 'La sesión se estableció correctamente, pero el equipo remoto no está generando una imagen de pantalla para enviar. La causa más común es que no hay ninguna pantalla activa que capturar: un servidor sin monitor, una pantalla que ha entrado en reposo o se ha bloqueado, o una pantalla que el sistema operativo no permite que RustDesk grabe. Soluciona el origen de la captura y la imagen aparecerá.'
  - question: '¿Cómo soluciono que RustDesk se quede esperando imagen en un equipo sin monitor?'
    answer: 'Un equipo sin monitor no tiene framebuffer que capturar, así que RustDesk no tiene nada que enviar. Conecta un monitor real, instala un conector HDMI simulador económico que haga creer a la GPU que hay una pantalla conectada, o en Linux utiliza la configuración sin monitor documentada (github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Activar la pantalla o evitar que entre en reposo resuelve la mayoría de los casos.'
  - question: '¿Cambiar el códec de vídeo soluciona la pantalla negra?'
    answer: 'A menudo, sí. En la barra de herramientas de la sesión remota o en la configuración puedes cambiar de códec: VP8, VP9, AV1 o H.264/H.265 donde el hardware lo admita. Un códec que el hardware remoto no puede codificar mostrará una imagen en blanco o congelada, y volver a un códec por software como VP9 suele restaurar la imagen.'
  - question: 'RustDesk muestra la imagen en un PC pero no en otro. ¿Por qué?'
    answer: 'Eso apunta a algo local en el equipo que falla: una pantalla en reposo o ausente, falta de permiso de grabación de pantalla en macOS, un controlador de GPU desactualizado, un conflicto de aceleración por hardware o un códec que el hardware no puede procesar. Revisa las soluciones de esta guía, causa por causa, en el equipo que falla, no en el que funciona.'
  - question: '¿Puede mi servidor autoalojado provocar el mensaje "esperando imagen"?'
    answer: 'Normalmente la sesión ya está conectada cuando ves este mensaje, así que el servidor está cumpliendo su función. Pero un relé público sobrecargado o un puerto de relé bloqueado puede estancar el flujo de vídeo. Para la ruta de servidor estándar, permite TCP 21115-21117 y UDP 21116; abre TCP 21118-21119 solo si usas clientes WebSocket. Considera autoalojar el relé para obtener un rendimiento más constante.'

metadata:
  description: '¿"RustDesk conectado, esperando imagen"? Soluciona la pantalla negra: pantallas sin monitor, reposo o bloqueo, códecs de vídeo, controladores de GPU, Wayland y puertos del cortafuegos.'
  keywords: 'RustDesk conectado esperando imagen, RustDesk pantalla negra, solución RustDesk esperando imagen, RustDesk sin imagen, RustDesk conector HDMI simulador, códec de vídeo RustDesk, aceleración por hardware RustDesk'
---

Si RustDesk muestra **"Conectado, esperando imagen"** y después aparece una pantalla negra, la buena noticia es que la parte difícil ya funcionó: los dos extremos se encontraron y la sesión está establecida. Lo que falta es la _imagen_. Algo en el equipo remoto no está generando una imagen de pantalla para enviar. Esta guía repasa todas las causas conocidas, desde la más común hasta los casos límite, con una solución concreta para cada una.

## La respuesta corta

La sesión se conectó, pero no hay ningún framebuffer que capturar. En un equipo remoto **sin monitor, con la pantalla en reposo o bloqueada, o con una pantalla que el sistema operativo no deja grabar a RustDesk**, el flujo de vídeo no tiene nada que codificar. Dale a RustDesk una pantalla real y activa para capturar: un monitor, un conector HDMI simulador, el permiso correcto o un códec compatible, y la imagen aparecerá.

## Empieza por aquí: ¿hay algo que capturar?

Con diferencia, la causa más reportada es un **equipo sin monitor (headless)**: un servidor, un mini-PC o una estación de trabajo que funciona sin monitor conectado, o con la pantalla en reposo. Sin una pantalla activa, la GPU no genera ningún framebuffer, así que RustDesk se conecta pero no tiene nada que enviar. Este patrón aparece repetidamente en el rastreador de incidencias de RustDesk, incluidos [informes de pantallas negras específicamente cuando el monitor del equipo de destino está apagado](https://github.com/rustdesk/rustdesk/issues/9884) y el extenso [hilo sobre "Conectado, esperando imagen"](https://github.com/rustdesk/rustdesk/issues/222).

Tres maneras de darle algo que capturar:

- **Conecta un monitor** y asegúrate de que esté encendido y activo.
- **Usa un conector HDMI (o DisplayPort) simulador.** Estos adaptadores económicos hacen que la GPU crea que hay una pantalla conectada, de modo que sigue renderizando un framebuffer para que RustDesk lo capture. Esta es la solución estándar para equipos de escritorio sin monitor y servidores domésticos.
- **En Linux, usa la ruta sin monitor documentada.** RustDesk admite configuraciones de Linux sin monitor, pero la configuración difiere de una sesión de escritorio normal; consulta el [wiki de compatibilidad con Linux sin monitor](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support).

Si _sí_ hay un monitor conectado, el siguiente sospechoso es que haya entrado en reposo.

## Solución según la causa

| Causa                                 | Señal                                                              | Solución                                                                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sin monitor (headless)                | Pantalla negra en un servidor o mini-PC                            | Conecta un monitor, añade un conector HDMI simulador o usa la ruta sin monitor de Linux                                                                        |
| Pantalla en reposo o bloqueada        | Funcionaba antes, negra tras inactividad                           | Activa la pantalla; desactiva el reposo/salvapantallas; en macOS evita que la pantalla entre en reposo desde Configuración                                     |
| Falta de permiso (macOS)              | Conecta, pantalla negra permanente                                 | Concede el permiso de Grabación de pantalla en Privacidad y seguridad; instala el ayudante para la pantalla de inicio de sesión                                |
| Códec incompatible                    | Imagen en blanco o congelada                                       | Cambia de códec (VP8 / VP9 / AV1 / H.264 / H.265); usa un códec por software como alternativa                                                                  |
| Conflicto de aceleración por hardware | Negra en GPUs específicas                                          | Desactiva el códec por hardware en la barra de herramientas de la sesión o en Configuración, o cambia de códec                                                 |
| Controlador de GPU desactualizado     | Negra tras una actualización de controlador o de sistema operativo | Actualiza el controlador de la GPU (especialmente en NVIDIA)                                                                                                   |
| Sesión Wayland (Linux)                | Sin aviso de consentimiento, en blanco                             | Acepta el aviso de PipeWire/portal y confirma que el portal de escritorio está instalado; una sesión X11 también funciona donde la distribución aún la ofrezca |
| Interrupción de red o relé            | Se queda en "esperando imagen"                                     | Permite TCP 21115-21117 y UDP 21116; añade TCP 21118-21119 para clientes WebSocket                                                                             |

### Reposo, bloqueo y salvapantallas

Si funcionaba antes y se puso en negro después de que el equipo estuviera inactivo, la pantalla entró en reposo.

- **Windows:** configura el plan de energía para que la pantalla y el equipo nunca entren en reposo durante las horas en que necesites acceso remoto, y desactiva el salvapantallas (o configúralo para que no requiera contraseña durante la sesión).
- **macOS:** evita que la pantalla entre en reposo durante las horas en que necesites acceso remoto; configúralo en **Configuración del Sistema → Pantallas** (o en los ajustes de Bloqueo de pantalla / Energía), y mantén el Mac conectado al adaptador de corriente, ya que el reposo se comporta de forma distinta con batería.
- **Android:** la pantalla debe estar encendida para poder compartirla, así que toca la pantalla para activarla antes de conectar. Conectar desde iOS a un dispositivo Android en reposo con la pantalla apagada es un [caso conocido de "esperando imagen"](https://github.com/rustdesk/rustdesk/issues/11479); activa primero el dispositivo de destino.

### Permisos de macOS

macOS se niega a dejar que cualquier aplicación grabe la pantalla sin un consentimiento explícito. Si RustDesk se conecta pero la pantalla permanece negra en un Mac, abre **Configuración del Sistema → Privacidad y seguridad → Grabación de pantalla** y activa RustDesk, luego reinicia la aplicación. Una pantalla negra específicamente _en la ventana de inicio de sesión_ significa que el servicio o ayudante de RustDesk no está instalado para ejecutarse antes de que un usuario inicie sesión: instálalo para permitir la captura previa al inicio de sesión.

### Códec de vídeo incompatible

RustDesk puede codificar el flujo de varias formas, y la opción predeterminada no siempre se adapta al hardware remoto. En la barra de herramientas de la sesión (o en Configuración), cambia el códec —**VP8, VP9, AV1 o H.264/H.265 donde el hardware lo admita**— y comprueba si la imagen aparece. Si un códec por hardware produce una imagen en blanco en una GPU concreta, volver a un códec por software como VP9 es la solución más fiable.

### Aceleración por hardware y controladores de GPU

Algunas GPU —las configuraciones NVIDIA son las que más aparecen— entran en conflicto con las rutas de captura y renderizado acelerado por hardware de RustDesk. Hay dos palancas que ayudan:

- **Desactiva el códec por hardware.** En la barra de herramientas de la sesión (o en Configuración), desactiva **Usar códec por hardware** para que la codificación recurra a una ruta por software; esto elimina la pantalla negra en muchas GPU problemáticas.
- **Actualiza el controlador de la GPU.** Una pantalla negra que empezó tras una actualización del controlador o del sistema operativo suele solucionarse pasando a un controlador actual, especialmente en hardware NVIDIA.

### Linux y Wayland

En Linux, **la captura de pantalla en Wayland pasa por PipeWire y el `xdg-desktop-portal`**: la primera vez solicita consentimiento para elegir una pantalla —en la mayoría de los casos la elección se recuerda, así que no vuelve a preguntar— y funciona dentro de una sesión de inicio de sesión activa. Se trata de un diseño de seguridad propio de Wayland, así que por sí solo no cubre la pantalla de bienvenida (greeter) ni un equipo realmente sin monitor, aunque la captura desatendida en Wayland está en desarrollo activo ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Si obtienes una pantalla en blanco en Wayland, la solución suele ser aceptar el aviso de compartir pantalla del portal y confirmar que `xdg-desktop-portal` y PipeWire están instalados y en ejecución; en un equipo sin monitor, usa la [configuración sin monitor documentada](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Iniciar sesión en una sesión X11/Xorg también evita la ruta del portal donde una distribución todavía la ofrezca, pero como muchas distribuciones avanzan hacia Wayland exclusivamente, solucionar la ruta del portal/PipeWire es el enfoque más preparado para el futuro.

### Red y relé

Como el mensaje contiene la palabra "conectado", la sesión normalmente ya está activa, pero el _vídeo_ puede seguir estancado si el relé está sobrecargado o un puerto del relé está bloqueado. Para la ruta de servidor estándar, asegúrate de que **TCP 21115-21117 y UDP 21116** sean accesibles de extremo a extremo. Abre **TCP 21118-21119 solo si usas clientes WebSocket**. El servidor de demostración público es compartido y su rendimiento no está garantizado, así que si dependes de RustDesk a diario, autoalojar tu propio relé te da un comportamiento mucho más constante. Si la sesión en sí se corta o nunca llega a establecerse, eso es un problema distinto; consulta las [preguntas frecuentes de RustDesk Server Pro](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/faq/).

## Mantén todo actualizado

Las versiones antiguas arrastran errores de captura antiguos. Actualiza **tanto** el cliente que controla como el cliente controlado a la última versión, y si autoalojas el servidor, actualízalo también. Varios informes de pantalla negra simplemente desaparecen después de actualizar ambos extremos.

## La ventaja del código abierto

Cuando una pantalla negra desafía la lista de comprobación, RustDesk te ofrece algo que las herramientas de código cerrado no dan: el código de captura real bajo licencia AGPL. Tú (o un contratista) puedes leer exactamente cómo funciona la captura en tu plataforma, reproducir el problema y presentar un informe preciso en el repositorio público, en lugar de esperar en la cola de soporte de un proveedor.

## Menos variables cuando el servidor es tuyo

Ejecuta [tu propio relé y servidor de ID](/es/blog/por-que-autoalojar-tu-software-de-escritorio-remoto), y la infraestructura pública compartida deja de formar parte de la ecuación: una incógnita menos cuando estás persiguiendo un problema de captura, y control total sobre las partes que puedes ajustar. Es una ventaja silenciosa, además de conservar los datos.
