---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-07T17:09:00Z
lang: 'es'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Control remoto de RustDesk en Android e iOS: qué funciona'
excerpt: 'RustDesk puede controlar a distancia teléfonos Android y convierte Android, iPhone y iPad en controladores para tus ordenadores. La app de iOS solo funciona como controlador.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guías'
tags: ['RustDesk', 'Móvil']
author: 'RustDesk Team'
slug: 'control-remoto-de-rustdesk-en-android-e-ios-que-funciona'
faq:
  - question: '¿Puedo controlar a distancia un teléfono Android con RustDesk?'
    answer: 'Sí. En el dispositivo Android inicias el servicio de captura de pantalla de RustDesk (que exige aceptar una solicitud de consentimiento en pantalla) y activas el servicio de accesibilidad RustDesk Input para que se inyecten los toques y deslizamientos remotos. Compartir la pantalla requiere Android 6 o posterior; compartir el audio interno del sistema, Android 10 o posterior. Algunos fabricantes restringen la accesibilidad para las apps instaladas fuera de la tienda, así que quizá tengas que permitir antes los ajustes restringidos.'
  - question: '¿Puede RustDesk controlar un iPhone o un iPad?'
    answer: 'No. La app de RustDesk para iOS/iPadOS solo funciona como controlador: usa un iPhone o un iPad para controlar dispositivos Windows, macOS, Linux y Android. RustDesk no implementa iOS como anfitrión, ni la compartición de pantalla, ni la entrada remota. Otros proveedores ofrecen la visualización de pantalla en iOS con el usuario presente, y Apple ofrece control remoto con consentimiento en las llamadas de FaceTime.'
  - question: '¿Puedo usar mi teléfono para controlar mi ordenador?'
    answer: 'Sí. Las apps de RustDesk para Android e iOS son controladores completos: conéctate a un equipo Windows, macOS o Linux por su ID y contrólalo con un panel táctil en pantalla o en modo ratón y un teclado por software. Algunos flujos de portapapeles, transferencia de archivos y teclas especiales varían según el sistema operativo móvil. Controlar un ordenador desde el teléfono es el uso móvil más fiable.'
  - question: '¿Son de código abierto las aplicaciones móviles de RustDesk?'
    answer: 'Sí. Los clientes móviles comparten la misma base de código abierto con licencia AGPL que el cliente de escritorio. Las compilaciones para Android están disponibles en las versiones oficiales de RustDesk en GitHub y en F-Droid como com.carriez.flutter_hbb; el controlador para iOS está disponible en la App Store de Apple. Actualmente RustDesk no se distribuye a través de Google Play.'
  - question: '¿Puedo dejar un dispositivo Android configurado para control desatendido?'
    answer: 'En parte. RustDesk puede mantener vivo su servicio de captura con una notificación en primer plano y reiniciarlo al arrancar, pero el consentimiento de captura de pantalla, el bloqueo del teclado en la pantalla de bloqueo y la necesidad de desbloquear a mano tras un reinicio hacen que el control realmente desatendido en Android no sea fiable. Trata el control de Android como soporte con el usuario presente, no como un acceso que se configura y se olvida.'
metadata:
  description: 'RustDesk en Android e iOS: controla Android a distancia, maneja tus ordenadores desde cualquiera de las apps y por qué la de iPhone e iPad solo es controlador.'
  keywords: 'control remoto RustDesk Android iOS, controlar teléfono remotamente con RustDesk, RustDesk host Android, controlar Android de forma remota, RustDesk iOS, controlar iPhone remotamente, aplicación móvil RustDesk'
---

RustDesk puede controlar de verdad un dispositivo Android en cuanto su propietario concede los permisos de captura de pantalla y de entrada, y las dos apps móviles son excelentes _controladores_ para tus ordenadores. La app de iOS solo funciona como controlador: RustDesk no implementa iOS como anfitrión ni la compartición de pantalla, así que no puedes conectarte a un iPhone o un iPad con RustDesk. Esta guía explica qué funciona, qué no y por qué, para que puedas planificar en función de las capacidades reales.

Las dos apps móviles comparten la base de código del cliente de RustDesk, con licencia AGPL; RustDesk Server OSS (el servidor comunitario gratuito) también tiene licencia AGPL, mientras que Server Pro es software de servidor autoalojado, comercial y propietario. Las compilaciones para Android están disponibles en las [versiones oficiales de RustDesk en GitHub](https://github.com/rustdesk/rustdesk/releases) y en [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) como `com.carriez.flutter_hbb`, con amplia cobertura de dispositivos —compilaciones arm64, arm32 y x86_64, además de un APK universal—; el controlador para iOS está en la App Store. RustDesk [no se distribuye actualmente a través de Google Play](/es/blog/rustdesk-y-las-estafas-de-acceso-remoto-que-estamos-haciendo): retiró voluntariamente la app de Android en respuesta al abuso por parte de estafadores. Mismo código base, mismo núcleo auditable.

## Resumen en una tabla

| Escenario                                                | ¿Compatible? | Notas                                                                      |
| -------------------------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| Controlar un PC Windows/macOS/Linux **desde** Android    | Sí           | Controlador completo; panel táctil o modo ratón                            |
| Controlar un PC **desde** iPhone/iPad                    | Sí           | Controlador completo; panel táctil o modo ratón                            |
| Controlar **un dispositivo Android** (como host)         | Sí           | Requiere consentimiento de captura de pantalla + servicio de accesibilidad |
| Controlar **un dispositivo iOS** con RustDesk            | **No**       | RustDesk para iOS es una app de control                                    |
| Ver a distancia una pantalla de iOS con RustDesk         | **No**       | La visualización de pantalla entrante no está implementada en RustDesk     |

El resto del artículo es el detalle que hay detrás de cada fila.

## Usar tu teléfono como controlador (la parte fácil)

Este es el caso de uso que «simplemente funciona». Instala RustDesk en tu dispositivo Android o iOS y se convierte en un controlador completo para cualquier host de RustDesk: tu escritorio Windows, tu [Mac](https://rustdesk.com/docs/es/client/mac/), tu [equipo Linux](/es/blog/rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto). Introduce el ID y la contraseña del equipo de destino y verás la pantalla remota con un panel táctil en pantalla, un modo ratón y un teclado por software. Algunos flujos de portapapeles, archivos y teclas especiales varían según el sistema operativo móvil. No hace falta nada especial en el teléfono, porque solo estás _enviando_ el control, no recibiéndolo.

Si tu trabajo es «arreglar un ordenador desde donde esté», un teléfono con RustDesk es una herramienta realmente buena.

## Controlar un dispositivo Android (como host)

RustDesk puede convertir un teléfono o una tablet Android en un host controlable. La captura de pantalla y la entrada remota usan servicios de Android distintos, y ambos requieren configuración.

**Captura de pantalla.** RustDesk usa la API `MediaProjection` de Android para capturar la pantalla. Cuando tocas **Iniciar servicio** en la app, Android muestra una solicitud de consentimiento que pide permiso para grabar la pantalla; ese diálogo es obligatorio y no se puede omitir en silencio. Compartir la pantalla requiere **Android 6 o posterior**; capturar el **audio interno del sistema** del teléfono requiere **Android 10 o posterior**. Mientras no se conceda ese permiso de captura, ninguna conexión entrante puede ver nada.

**Entrada remota.** Ver la pantalla no es lo mismo que controlarla. Para inyectar toques, deslizamientos y pulsaciones de teclas, RustDesk registra un [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) llamado **RustDesk Input**, que se activa en **Ajustes → Accesibilidad**. Traduce los eventos remotos de ratón y gestos en gestos de Android y puede lanzar acciones del sistema como Atrás, Inicio y Recientes.

**Mantenerse activo.** RustDesk mantiene una notificación de servicio en primer plano y, de forma opcional, una ventana flotante superpuesta para que Android no cierre el proceso de captura, y puede reiniciar el servicio al arrancar.

Ahora las limitaciones, porque el modelo de seguridad de Android impone algunas muy reales:

- **Hace falta consentimiento para iniciar la captura.** Alguien (o una autorización previa) tiene que aceptar la solicitud de grabación de pantalla.
- **La pantalla de bloqueo impide la entrada.** Android no deja que un servicio de accesibilidad escriba en la pantalla de bloqueo segura, así que, si el dispositivo se bloquea, por lo general no podrás introducir el código de desbloqueo a distancia, una limitación [documentada por usuarios que lo han probado](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Tras un reinicio hay que desbloquear a mano.** Después de reiniciar, normalmente hay que desbloquear el dispositivo en persona antes de recuperar el control.
- **Restricciones de los fabricantes.** En las versiones de Android de algunos fabricantes, el interruptor de accesibilidad de **RustDesk Input** aparece desactivado para las apps instaladas fuera de la tienda hasta que concedes los «ajustes restringidos» (mantén pulsado el icono de la app → Información de la app → permitir ajustes restringidos). Los gestores de batería agresivos de ciertos fabricantes también pueden cerrar el servicio en segundo plano.

La conclusión práctica: el control de Android es excelente para el **soporte con el usuario presente** —ayudar a alguien que tiene el teléfono en la mano—, mientras que el acceso **desatendido que se configura y se olvida** lo resuelve mejor un host de escritorio, porque los sistemas operativos móviles restringen el acceso persistente en segundo plano. Elige la plataforma según la tarea. (Para equipos de escritorio, la [guía de configuración del acceso desatendido](/es/blog/acceso-desatendido-en-rustdesk-guia-de-configuracion) cubre el caso completo).

## iOS: controladores de RustDesk, visualización de pantalla y control de la entrada

**RustDesk para iOS es un controlador, no un host.** Úsalo para controlar ordenadores compatibles o dispositivos Android. La visualización de pantalla y el control de la entrada en iOS no están implementados en RustDesk, como se explica en la [solicitud de función para usar iOS como host](https://github.com/rustdesk/rustdesk/discussions/4839).

Otros proveedores siguen otro enfoque. Las API de difusión de Apple permiten compartir la pantalla a iniciativa del usuario, y [AnyDesk documenta la visualización remota entrante en iOS/iPadOS 12 y posteriores](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos), sin control remoto de la entrada. Que un técnico vea una pantalla mientras su propietario toca es un flujo de trabajo distinto de controlarla.

Apple también ofrece [control remoto con consentimiento en FaceTime](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios), sujeto a sus requisitos de dispositivo, región y versión del sistema. Si tu flujo de soporte exige ver la pantalla de un iPhone, usa una herramienta que implemente ese flujo; para controlar ordenadores desde un iPhone o un iPad, la app de control de RustDesk es la opción adecuada.

## Una nota sobre privacidad y autoalojamiento

Como las apps móviles son de código abierto y hablan el mismo protocolo que el cliente de escritorio, puedes apuntarlas a tu propio [servidor RustDesk autoalojado](/es/blog/por-que-autoalojar-tu-software-de-escritorio-remoto) en lugar de a la red pública, de modo que las sesiones móviles las coordina una infraestructura que controlas, ID incluido. En los flujos de soporte remoto que tocan dispositivos personales, poder decidir dónde residen los datos importa más de lo habitual.

La contrapartida es la de siempre: tú operas y proteges ese servidor —incluidas las actualizaciones, la monitorización, las copias de seguridad y la planificación de capacidad— y, para muchos equipos, mantener los datos de las sesiones en su propio terreno compensa con creces.

## Primeros pasos

Descarga las compilaciones para Android desde las [versiones oficiales en GitHub](https://github.com/rustdesk/rustdesk/releases) o instala el paquete desde [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk [no se distribuye actualmente a través de Google Play](/es/blog/rustdesk-y-las-estafas-de-acceso-remoto-que-estamos-haciendo); el controlador para iOS sigue disponible en la App Store de Apple. Para controlar un teléfono, ese teléfono tiene que ser Android: acepta la solicitud de captura de pantalla y activa el servicio de accesibilidad RustDesk Input. Para controlar tus ordenadores desde un teléfono, cualquiera de las dos apps funciona desde el primer momento. Los planes vigentes están en [rustdesk.com/pricing](https://rustdesk.com/pricing), y [sales@rustdesk.com](mailto:sales@rustdesk.com) puede ayudarte con Server Pro. ¿Quieres verlo antes? [Mira RustDesk en acción](https://www.youtube.com/@rustdesk).
