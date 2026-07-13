---
publishDate: 2026-07-07T17:09:00Z
lang: 'es'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'Control remoto de RustDesk en Android e iOS: qué funciona'
excerpt: 'Cómo RustDesk controla remotamente teléfonos Android, convierte iPhones e iPads en controladores, y por qué ningún proveedor puede controlar remotamente iOS.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: 'Guías'
tags: ['RustDesk', 'Móvil']
author: 'RustDesk Team'
slug: 'control-remoto-de-rustdesk-en-android-e-ios-que-funciona'
faq:
  - question: '¿Puedo controlar remotamente un teléfono Android con RustDesk?'
    answer: 'Sí. En el dispositivo Android debes iniciar el servicio de captura de pantalla de RustDesk (que requiere un aviso de consentimiento en pantalla) y activar el servicio de accesibilidad RustDesk Input para que se inyecten los toques y deslizamientos remotos. Compartir la pantalla requiere Android 6 o posterior; compartir el audio interno del sistema requiere Android 10 o posterior. Algunos fabricantes restringen la accesibilidad para aplicaciones instaladas manualmente (sideloaded), por lo que es posible que primero debas permitir la configuración restringida.'
  - question: '¿Puede RustDesk controlar un iPhone o un iPad?'
    answer: 'No, desde ninguna aplicación de escritorio remoto: es una limitación de la plataforma iOS, no de RustDesk. Las restricciones de Apple sobre grabación de pantalla y ejecución en segundo plano no permiten que una aplicación de terceros actúe como host controlado remotamente, por lo que ningún proveedor ofrece control remoto real hacia un iPhone o un iPad. Lo que sí hace bien la aplicación de RustDesk para iOS/iPadOS es funcionar como controlador: usar un iPhone o iPad para controlar tus equipos Windows, macOS, Linux y Android.'
  - question: '¿Puedo usar mi teléfono para controlar mi equipo?'
    answer: 'Sí. Las aplicaciones de RustDesk para Android e iOS funcionan como clientes controladores completos. Desde cualquiera de las dos puedes conectarte a un equipo Windows, macOS o Linux y controlarlo con un panel táctil en pantalla o en modo ratón. Este es el caso de uso móvil más fiable y funciona igual que el cliente de escritorio.'
  - question: '¿Son de código abierto las aplicaciones móviles de RustDesk?'
    answer: 'Sí. Los clientes móviles comparten la misma base de código abierto con licencia AGPL que el cliente de escritorio. Las compilaciones para Android están disponibles en las versiones oficiales de RustDesk en GitHub y en F-Droid como com.carriez.flutter_hbb; el controlador para iOS está disponible en la App Store de Apple. Actualmente RustDesk no se distribuye a través de Google Play.'
  - question: '¿Puedo dejar un dispositivo Android configurado para control desatendido?'
    answer: 'En parte. RustDesk puede mantener activo su servicio de captura mediante una notificación en primer plano y reiniciarlo al arrancar el dispositivo, pero el consentimiento de captura de pantalla, el teclado bloqueado en la pantalla de bloqueo y la necesidad de desbloquear manualmente tras un reinicio hacen que el control desatendido real en Android no sea fiable. Trata el control de Android como soporte asistido en lugar de como un acceso de tipo configúralo y olvídate.'
metadata:
  description: 'RustDesk en Android e iOS: controla Android de forma remota, usa cualquiera de las dos apps móviles para manejar tus equipos de escritorio, y qué permite Apple en iPhone e iPad.'
  keywords: 'control remoto RustDesk Android iOS, controlar teléfono remotamente con RustDesk, RustDesk host Android, controlar Android de forma remota, RustDesk iOS, controlar iPhone remotamente, aplicación móvil RustDesk'
---

"¿Puedo controlar remotamente un teléfono?" es una de las preguntas más frecuentes que recibe RustDesk, y merece una respuesta honesta en lugar de una respuesta de marketing. La versión corta: RustDesk puede controlar de verdad un dispositivo Android, ambas aplicaciones móviles funcionan como excelentes _controladores_ para tus equipos y —la parte que nadie quiere escuchar— actualmente no es posible controlar remotamente un iPhone o un iPad. Esta guía explica exactamente qué funciona, qué no, y por qué, para que puedas planificar según capacidades reales en lugar de suposiciones.

Ambas aplicaciones móviles son, como el resto de RustDesk, de código abierto bajo la licencia AGPL. Las compilaciones para Android están disponibles en las [versiones oficiales de RustDesk en GitHub](https://github.com/rustdesk/rustdesk/releases) y en [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) como `com.carriez.flutter_hbb`, con amplia cobertura de dispositivos —compilaciones arm64, arm32 y x86_64, además de un APK universal—; el controlador para iOS está en la App Store. RustDesk [actualmente no se distribuye a través de Google Play](/es/blog/rustdesk-y-las-estafas-de-acceso-remoto-que-estamos-haciendo): la aplicación para Android se retiró de forma voluntaria en respuesta al abuso por parte de estafadores. Mismo código base, mismo núcleo auditable.

## Resumen en una tabla

| Escenario                                                | ¿Compatible? | Notas                                                                      |
| -------------------------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| Controlar un PC Windows/macOS/Linux **desde** Android    | Sí           | Controlador completo; panel táctil o modo ratón                            |
| Controlar un PC **desde** iPhone/iPad                    | Sí           | Controlador completo                                                       |
| Controlar **un dispositivo Android** (como host)         | Sí           | Requiere consentimiento de captura de pantalla + servicio de accesibilidad |
| Controlar **un dispositivo iOS** (iPhone/iPad como host) | **No**       | Restricciones de Apple; no implementado                                    |
| Ver una pantalla iOS de forma remota                     | **No**       | No compatible actualmente                                                  |

El resto del artículo no es más que el detalle detrás de cada fila.

## Usar tu teléfono como controlador (la parte fácil)

Este es el caso de uso que "simplemente funciona". Instala RustDesk en tu dispositivo Android o iOS y se convierte en un controlador completo para cualquier host de RustDesk: tu escritorio Windows, tu [Mac](https://rustdesk.com/docs/es/client/mac/), tu [equipo Linux](/es/blog/rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto). Introduce el ID y la contraseña del destino y obtendrás la pantalla remota con un panel táctil en pantalla, un modo ratón, un teclado por software y transferencia de archivos. No se requiere nada especial en el lado del teléfono porque solo estás _enviando_ control, no siendo controlado.

Si tu trabajo consiste en "arreglar un equipo desde donde sea que estés", un teléfono con RustDesk es una herramienta genuinamente buena, y se comporta igual que el cliente de escritorio.

## Controlar un dispositivo Android (como host)

Aquí es donde RustDesk hace algo que la mayoría de las herramientas de acceso remoto no pueden hacer: convertir un teléfono o tablet Android en un host controlable. Dos subsistemas de Android hacen esto posible, y ambos requieren una configuración explícita.

**Captura de pantalla.** RustDesk utiliza la API `MediaProjection` de Android para capturar la pantalla. Cuando pulsas **Iniciar servicio** en la aplicación, Android muestra un aviso de consentimiento solicitando permiso para grabar la pantalla; ese cuadro de diálogo es obligatorio y no se puede omitir de forma silenciosa. Compartir la pantalla requiere **Android 6 o posterior**; capturar el **audio interno del sistema** del teléfono requiere **Android 10 o posterior**. Hasta que se conceda ese permiso de captura, ninguna conexión entrante puede ver nada.

**Entrada remota.** Ver la pantalla no es lo mismo que controlarla. Para inyectar toques, deslizamientos y eventos de teclado, RustDesk registra un [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) llamado **RustDesk Input**, que se activa en **Ajustes → Accesibilidad**. Este servicio traduce los eventos remotos de ratón y gestos en gestos nativos de Android, y puede activar acciones del sistema como Atrás, Inicio y Recientes.

**Mantenerse activo.** RustDesk mantiene una notificación de servicio en primer plano y, opcionalmente, una ventana superpuesta flotante para que Android no cierre el proceso de captura, y puede reiniciar el servicio al arrancar el dispositivo.

Ahora las limitaciones, porque el modelo de seguridad de Android impone algunas reales:

- **Se requiere consentimiento para iniciar la captura.** Alguien (o una autorización previa) debe aceptar el aviso de grabación de pantalla.
- **La pantalla de bloqueo impide la entrada.** Android no permite que un servicio de accesibilidad escriba en la pantalla de bloqueo segura, así que si el dispositivo se bloquea, en general no podrás introducir el código de desbloqueo de forma remota —una limitación [documentada por usuarios que lo han probado](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Los reinicios requieren un desbloqueo manual.** Tras un reinicio, normalmente el dispositivo debe desbloquearse en persona antes de que se reanude el control.
- **Restricciones del fabricante (OEM).** En las compilaciones de algunos fabricantes, el interruptor de accesibilidad de **RustDesk Input** aparece desactivado para aplicaciones instaladas manualmente hasta que concedes la "configuración restringida" (mantén pulsado el icono de la app → Información de la app → permitir configuración restringida). Los gestores de batería agresivos de ciertos fabricantes también pueden cerrar el servicio en segundo plano.

La conclusión práctica: el control de Android es excelente para el **soporte asistido** —ayudar a alguien que tiene el teléfono en la mano—, mientras que el acceso **desatendido de tipo "configúralo y olvídate"** es un trabajo que el host de escritorio hace mejor, porque los sistemas operativos móviles restringen el acceso persistente en segundo plano. Ajusta la plataforma a la tarea. (Para equipos de escritorio, la [guía de configuración de acceso desatendido](/es/blog/acceso-desatendido-en-rustdesk-guia-de-configuracion) cubre el caso real.)

## Controlar un dispositivo iOS: qué permite Apple

Esta es la parte que se pregunta constantemente y que en otros sitios se responde de forma vaga, así que seremos directos: **ninguna aplicación de escritorio remoto puede controlar remotamente un iPhone o un iPad, RustDesk incluido.** En iOS, la aplicación de RustDesk es un controlador capaz —se conecta _hacia fuera_ para controlar tus equipos—, pero Apple no permite que ninguna aplicación de terceros actúe como host controlado remotamente en iOS.

El motivo es Apple. iOS restringe fuertemente la ejecución en segundo plano, la grabación de pantalla y cualquier forma de inyección de entrada sintética, razón por la cual ninguna aplicación de terceros ofrece un _control_ remoto real de un iPhone. Esto no es tanto un descuido de RustDesk como un muro impuesto por la plataforma: la compatibilidad de iOS como host ha sido una funcionalidad [solicitada repetidamente en GitHub](https://github.com/rustdesk/rustdesk/discussions/4839) que sigue sin implementarse. Las API de difusión de Apple (ReplayKit) pueden, en principio, transmitir una pantalla, pero se trata de una difusión iniciada por la propia aplicación, no de algo que una parte remota pueda obtener; por eso la visualización remota de iOS por parte de terceros sigue sin estar disponible, y el control remoto completo de iOS desde otro dispositivo no es algo que el sistema operativo permita a terceros.

Así que si tu requisito es específicamente "controlar remotamente un iPhone", ninguna herramienta de escritorio remoto actual puede hacerlo: es un muro de la plataforma iOS con el que se topa todo proveedor, no una carencia de RustDesk, como se señala en nuestra comparativa [RustDesk frente a AnyDesk](/es/blog/rustdesk-vs-anydesk-escritorio-remoto-autoalojado-y-de-codigo-abierto). Preferimos decírtelo de antemano antes de que lo descubras después de configurarlo todo.

## Una nota sobre privacidad y autoalojamiento

Como las aplicaciones móviles son de código abierto y hablan el mismo protocolo que el cliente de escritorio, puedes apuntarlas a tu propio [servidor RustDesk autoalojado](/es/blog/por-que-autoalojar-tu-software-de-escritorio-remoto) en lugar de a la red pública, de modo que las sesiones móviles son gestionadas por una infraestructura que tú controlas, ID incluido. En los flujos de soporte remoto que involucran dispositivos personales, ese aspecto de soberanía de datos importa más de lo habitual.

El compromiso es el de siempre: tú mismo ejecutas y proteges ese servidor —una tarea modesta dados sus bajos requisitos— y, para muchos equipos, mantener los datos de las sesiones en su propio terreno merece claramente la pena.

## Primeros pasos

Descarga las compilaciones para Android desde las [versiones oficiales en GitHub](https://github.com/rustdesk/rustdesk/releases) o instala el paquete desde [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk [actualmente no se distribuye a través de Google Play](/es/blog/rustdesk-y-las-estafas-de-acceso-remoto-que-estamos-haciendo); el controlador para iOS sigue disponible en la App Store de Apple. Para controlar un teléfono, ese teléfono debe ser Android: acepta el aviso de captura de pantalla y activa el servicio de accesibilidad RustDesk Input. Para controlar tus equipos desde un teléfono, cualquiera de las dos aplicaciones móviles funciona desde el primer momento. Los planes actuales están en [rustdesk.com/pricing](https://rustdesk.com/pricing), y [sales@rustdesk.com](mailto:sales@rustdesk.com) puede ayudarte con Server Pro. ¿Quieres verlo primero? [Mira RustDesk en acción](https://www.youtube.com/@rustdesk).
