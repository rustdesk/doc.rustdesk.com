---
publishDate: 2026-07-04T17:05:00Z
lang: 'es'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Soberanía de Datos en el Escritorio Remoto y RGPD: Autoalojamiento'
excerpt: 'Cómo el autoalojamiento da a los equipos regulados control sobre los datos de rendezvous, relay y dispositivos, y qué preguntas de RGPD y cumplimiento normativo quedan pendientes.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp'
category: 'Seguridad'
tags: ['RustDesk', 'Seguridad', 'GDPR', 'Autoalojamiento']
author: 'RustDesk Team'
slug: 'soberania-de-datos-en-el-escritorio-remoto-y-rgpd-autoalojamiento'
faq:
  - question: '¿Es RustDesk compatible con ISO 27001, SOC 2 o HIPAA?'
    answer: 'RustDesk es autoalojado, por lo que el cumplimiento normativo depende de su propio entorno: usted ejecuta el acceso remoto dentro de su propio alcance de ISO 27001 o HIPAA y de sus controles existentes, y el software de código abierto puede auditarse directamente en lugar de aceptarse por confianza. Si necesita específicamente un informe SOC 2 del proveedor, un BAA firmado, un DPA o cuestionarios de seguridad completados, consulte con sales@rustdesk.com qué está disponible para su caso.'
  - question: '¿Ayuda el autoalojamiento de RustDesk a cumplir con el RGPD?'
    answer: 'Sí: le da el tipo de control en el que suele centrarse el RGPD: usted elige dónde residen los datos de ID/rendezvous, relay, consola y dispositivos, y puede mantenerlos dentro de la región en infraestructura que usted mismo opera. Se trata de una base sólida, no de una garantía automática, ya que el RGPD es un programa: la base jurídica, los roles de responsable/encargado del tratamiento, la retención, el control de acceso, la ubicación de los extremos y la respuesta a incidentes siguen siendo aspectos que usted debe definir, y el responsable del tratamiento sigue siendo el responsable último.'
  - question: '¿Adónde van realmente los datos de sesión de RustDesk?'
    answer: 'RustDesk intenta primero una conexión directa punto a punto; si falla, el tráfico utiliza el relay que usted haya configurado. El autoalojamiento elimina del recorrido un rendezvous y un relay operados por el proveedor, pero una sesión entre extremos situados en países distintos sigue atravesando esas redes: la ubicación del servidor por sí sola no confina todo el tráfico a una única jurisdicción.'
  - question: '¿Puedo mantener los datos del escritorio remoto dentro de la UE con RustDesk?'
    answer: 'Puede ubicar el ID/rendezvous, el relay, la consola y los datos de dispositivos almacenados en un centro de datos de la UE. Para restringir también el tráfico de la sesión, ambos extremos deben estar dentro del perímetro y la política debe obligar a que el tráfico pase por su relay aprobado; documente la ubicación de los extremos y el enrutamiento junto con la ubicación del servidor.'
  - question: '¿Qué funciones de RustDesk ayudan a cumplir con el RGPD?'
    answer: 'El autoalojamiento mantiene los datos en infraestructura que usted controla: la telemetría de uso que procesaría el servicio alojado de RustDesk permanece en su propio servidor cuando se autoaloja, y más allá de la verificación de la licencia de Server Pro, prácticamente nada más necesita llegar a rustdesk.com. Server Pro añade registros de auditoría integrados con rotación de registros, control de acceso granular y un Rol de Control, SSO/LDAP y 2FA en el dispositivo controlado, modo privacidad y consentimiento por conexión, y eliminación directa de usuarios, dispositivos y registros (incluso mediante la API REST) para atender solicitudes de supresión y retención.'
metadata:
  description: 'Soberanía de datos en el escritorio remoto y RGPD: qué controla el autoalojamiento, en qué se diferencian las sesiones directas de las retransmitidas, y por qué el cumplimiento normativo exige más que la ubicación del servidor.'
  keywords: 'soberanía de datos en escritorio remoto, acceso remoto y RGPD, residencia de datos en escritorio remoto, cumplimiento normativo de acceso remoto autoalojado'
---

Si su organización está sujeta al RGPD, a normas de privacidad del sector sanitario o a un mandato del sector público del tipo «nuestros datos permanecen en nuestra infraestructura», una sola pregunta decide qué herramienta de escritorio remoto puede siquiera preseleccionar: **¿adónde van realmente los datos de la sesión?**

Con la mayoría de los productos de acceso remoto convencionales, la respuesta es «a través de la nube del proveedor». Su técnico se conecta, su dispositivo se conecta, y el tráfico es intermediado por servidores que usted no posee, en una jurisdicción que quizá no controla. Para muchos compradores eso no es un problema. Para los equipos regulados, es un problema de cumplimiento normativo incluso antes de que alguien haya compartido una pantalla.

Esta guía trata sobre la **soberanía de datos en el escritorio remoto**: qué significa, por qué importa a compradores regulados y de la UE, y qué partes de una implementación de acceso remoto puede controlar gracias al autoalojamiento. Usaremos RustDesk como ejemplo práctico.

## Qué significa la «soberanía de datos» para el acceso remoto

La soberanía de datos es el principio según el cual los datos están sujetos a las leyes del país donde se almacenan y procesan físicamente. En el soporte remoto, los datos sensibles no son solo los archivos que se transfieren, sino la sesión en sí misma: lo que aparece en la pantalla, la lista de dispositivos que gestiona, los metadatos de conexión y, a menudo, el enrutamiento de los píxeles en tiempo real.

Las preguntas fundamentales son: **¿qué sistemas almacenan los metadatos, qué sistemas retransmiten el tráfico y dónde se encuentran ambos extremos (endpoints)?** El autoalojamiento puede eliminar del recorrido un servicio de rendezvous o de relay operado por el proveedor, pero no puede garantizar que una sesión entre extremos situados en países distintos permanezca dentro de una sola jurisdicción.

## La diferencia fundamental: la nube del proveedor frente a su propia infraestructura

Aquí es la arquitectura, y no el marketing, la que decide el resultado.

**RustDesk Server Pro es autoalojado.** El servidor de ID/rendezvous, el servidor de relay, la consola web y los datos de los dispositivos gestionados se ejecutan en la infraestructura que usted elija. RustDesk intenta primero una conexión directa punto a punto mediante hole punching (perforación de NAT); si eso falla, el tráfico de la sesión utiliza el relay que haya configurado. Esto le da control sobre la capa de rendezvous/relay y sobre los datos de dispositivos almacenados, pero los extremos y sus rutas de red siguen determinando por dónde viaja el tráfico directo.

|                                           | Herramientas en la nube del proveedor  | RustDesk autoalojado                                                                                  |
| ----------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Dónde se coordinan las sesiones           | La nube del proveedor                  | Su servidor de ID/rendezvous                                                                          |
| Por dónde fluye el tráfico de la sesión   | Enrutamiento definido por el proveedor | Directo entre extremos cuando es posible; en caso contrario, a través de su relay                     |
| Quién controla la residencia de los datos | El proveedor                           | Usted elige la ubicación del lado del servidor y la política de relay; los extremos siguen importando |
| Auditabilidad del cliente                 | Normalmente de código cerrado          | [Código abierto (AGPL)](https://github.com/rustdesk/rustdesk) — léalo y compílelo usted mismo         |
| Quién administra el servidor              | El proveedor                           | Su equipo                                                                                             |

Los equipos que evalúan el autoalojamiento suelen mencionar la posibilidad de elegir la ubicación y el operador de los sistemas de rendezvous, relay y gestión. Se trata de un control significativo, pero debe documentarse junto con la ubicación de los extremos y el comportamiento del enrutamiento.

## Beneficio 1: usted controla la ubicación de los datos en el lado del servidor

Ubicar los servicios de ID, relay y gestión en un centro de datos alemán le permite documentar dónde residen esos servicios y los datos que almacenan. Si ambos extremos también se encuentran dentro del perímetro requerido y la política obliga a que el tráfico pase por un relay aprobado, puede diseñar una ruta más restringida. Sin esos controles adicionales, la sola ubicación del servidor no garantiza que todo el tráfico de la sesión permanezca en Alemania.

## Beneficio 2: el código abierto le permite demostrarlo, no solo confiar en ello

La soberanía de datos no depende solo de la ubicación, sino de saber qué hace realmente el software. El núcleo de RustDesk es **de código abierto bajo licencia AGPL**. Usted (o su equipo de seguridad) puede leer el código, auditar exactamente qué hace el cliente, compilarlo usted mismo y ejecutar el servidor comunitario gratuito de forma indefinida. Esa auditabilidad importa más de lo habitual en el acceso remoto: dado que se confía al software el control total de una máquina, los compradores de sectores regulados quieren cada vez más verificar qué hace un cliente en lugar de fiarse de la palabra del proveedor. Poder inspeccionar el cliente usted mismo es una respuesta concreta a la pregunta «¿cómo lo sabemos?».

## Beneficio 3: soberanía sin sobrecoste de licencia

Los planes estándar de RustDesk se licencian **por usuario de inicio de sesión más por dispositivo gestionado**, e incluyen conexiones simultáneas ilimitadas; en cambio, [Customized V2](https://rustdesk.com/pricing#custom2) limita y tarifica las conexiones simultáneas. Puede [actualizar una licencia](/es/blog/actualizar-la-licencia-de-rustdesk-a-mitad-de-suscripcion-como-funciona) a medida que cambien sus necesidades. Consulte la tabla de planes vigente antes de comprar.

La arquitectura también escala con su parque de dispositivos: RustDesk publica [orientación de planificación para flotas grandes](/es/blog/puede-rustdesk-escalar-a-200-000-dispositivos) para los equipos que evalúan implementaciones de mayor tamaño. En cuanto al [control de acceso por usuario](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/permissions/), las implementaciones autoalojadas incluyen una [consola web](https://rustdesk.com/docs), un generador de clientes personalizados con marca propia, grupos de dispositivos con una libreta de direcciones compartida, y [LDAP/SSO](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/ldap/) (OIDC) disponible desde el plan Basic en adelante.

## Cómo encaja RustDesk con los requisitos de ISO 27001, SOC 2 o HIPAA

Los equipos de compras empresariales y del sector sanitario casi siempre preguntan cómo encaja una herramienta de acceso remoto con ISO 27001, SOC 2 o HIPAA. Con un producto en la nube, usted hereda —y depende de— la certificación que el proveedor hace de _su propia_ infraestructura. El modelo de RustDesk es distinto, y para los equipos regulados esa diferencia suele jugar a su favor: como usted **se autoaloja**, el acceso remoto se ejecuta dentro del entorno que ya controla y audita, por lo que queda dentro de _su_ alcance de ISO 27001 o HIPAA y de _sus_ controles existentes, en lugar de los de un tercero. Usted ubica el ID, el relay y la consola en infraestructura que su programa ya cubre y —dado que RustDesk es [de código abierto](https://github.com/rustdesk/rustdesk)— su equipo de seguridad puede leer y verificar exactamente qué hace como parte de una evaluación, en lugar de confiar ciegamente en un binario cerrado.

Algunas notas prácticas:

- El autoalojamiento mantiene los sistemas sensibles —rendezvous, relay, consola y datos de dispositivos— en hardware de su propiedad, que es precisamente lo que un control de residencia de datos o de HIPAA suele intentar garantizar. La lista de verificación de implementación que aparece más adelante convierte esto en controles documentados.
- Si su proceso de compras exige específicamente un informe SOC 2 del proveedor, un Acuerdo de Asociado Comercial (BAA) firmado, un DPA o cuestionarios de seguridad completados, consulte con el equipo de RustDesk en [sales@rustdesk.com](mailto:sales@rustdesk.com) qué hay disponible actualmente para su caso.
- Como RustDesk es de código abierto, la pregunta «¿cómo sabemos qué hace?» se responde mediante la inspección directa, no con un certificado que hay que aceptar por fe.

En resumen, el autoalojamiento le permite integrar el acceso remoto dentro del programa de cumplimiento normativo que ya gestiona, lo que suele ser una posición más sólida para un equipo regulado que alquilar una caja negra certificada.

## Controles que respaldan un programa de RGPD autoalojado

El autoalojamiento es la base, y sobre ella RustDesk ofrece controles concretos en los que los equipos autoalojados se apoyan para cumplir el RGPD en la práctica:

- **La telemetría va a su servidor, no a RustDesk.** Los datos de uso descritos en la política de privacidad de RustDesk —inicio de la aplicación, dirección IP, estadísticas básicas del equipo, horarios de sesión e ID de RustDesk— son los que procesa el **servicio público alojado por RustDesk**; cuando usted ejecuta sus propios servidores de ID/rendezvous y relay, esos datos permanecen en cambio en **su** infraestructura. Más allá de la verificación de la licencia de Server Pro, prácticamente nada más necesita llegar a rustdesk.com; confirme las conexiones salientes exactas para la compilación del cliente y la configuración que despliegue. Eso mantiene los datos de sesión y de uso, de forma predeterminada, en infraestructura que usted controla, una postura sólida de minimización de datos.
- **Rotación y retención integradas de registros de auditoría.** Los registros de auditoría de Server Pro se dividen en cuatro categorías —conexión, transferencia de archivos, alarma y operación de consola— con **rotación de registros integrada**, de modo que los datos de auditoría no se conservan indefinidamente (limitación del plazo de conservación), y puede exportarlos desde la consola web o mediante la API REST para sus registros de actividades de tratamiento.
- **Acceso granular y delimitado.** Las asignaciones por usuario, los grupos de dispositivos, las reglas entre grupos y un Rol de Control (lo que un técnico puede hacer durante la sesión: teclado/ratón, portapapeles, transferencia de archivos, audio, cámara, terminal, impresión, grabación y más) aplican el principio de mínimo privilegio y de limitación de la finalidad, respaldados por SSO/LDAP y la autenticación de dos factores (2FA) en el dispositivo controlado.
- **Modo privacidad y consentimiento por conexión.** El lado controlado puede exigir confirmación para una conexión entrante y puede oscurecer su pantalla (modo privacidad, compatible con Windows y macOS) durante una sesión, lo que limita la exposición incidental de datos personales en pantalla.
- **Eliminación en sus propios términos.** Como los datos residen en su servidor, puede deshabilitar o eliminar usuarios, borrar dispositivos y registros —incluso mediante la API REST— y atender directamente las solicitudes de supresión y retención.
- **Infraestructura regional y autogestionada.** El ID/rendezvous, el relay, la consola y los datos almacenados se ejecutan donde usted los ubique, en hardware que controla.
- **Incluso las compilaciones de clientes personalizados no dejan datos atrás.** Generar un cliente con marca propia es el único paso que utiliza el servicio de compilación de RustDesk, y es deliberadamente transitorio: la configuración de compilación que usted envía no se conserva en el servidor de compilación de RustDesk (se elimina en cuanto finaliza la compilación), y el instalador generado se elimina automáticamente al cabo de aproximadamente un día, por lo que es usted quien debe descargarlo y conservarlo.

Estas son palancas que un programa de RGPD puede accionar realmente: usted sigue teniendo que documentarlas y operarlas, pero no depende de que un proveedor actúe ante una solicitud de un interesado.

## Soberanía tangible

Alojar usted mismo el rendezvous, el relay, la consola y los datos almacenados le da a un programa de cumplimiento normativo algo concreto: infraestructura que usted ubica, opera y audita. Es un cimiento, no una meta final, pero es la parte sobre la que descansa todo lo demás.

## Lista de verificación de implementación para RGPD y soberanía

El autoalojamiento le da opciones; la implementación debe convertir esas opciones en controles:

- Documente dónde se encuentran ubicados el servidor de ID, el relay, la consola, las copias de seguridad, los registros y los administradores.
- Mapee por separado las rutas directas punto a punto y las rutas retransmitidas (relayed). Un servidor en Alemania no mantiene dentro de Alemania una sesión directa entre Alemania y otro país.
- Decida cuándo debe forzarse el uso del relay porque enrutar el tráfico a través de una ubicación controlada importa más que el rendimiento punto a punto.
- Registre la finalidad, el período de retención y la política de acceso para los metadatos de dispositivos, cuentas, auditoría y conexión.
- Aplique grupos de dispositivos basados en el mínimo privilegio, MFA/SSO donde esté disponible, y un proceso de alta, cambio y baja (joiner-mover-leaver) para los técnicos.
- Coloque la consola web detrás de HTTPS, restrinja el acceso de red administrativo y pruebe la restauración de copias de seguridad.
- Complete la evaluación legal correspondiente —como el registro de actividades de tratamiento, la revisión del encargado del tratamiento, la evaluación de transferencias y la Evaluación de Impacto relativa a la Protección de Datos (EIPD)— según su caso de uso.

RustDesk puede dar soporte a una arquitectura de soberanía, pero el responsable del tratamiento sigue siendo el responsable de la arquitectura y de su base jurídica.

## Evalúelo dentro de su propio perímetro

Puede evaluarlo en sus propios términos. Autoaloje hoy mismo el servidor comunitario gratuito y de código abierto, o escriba a [sales@rustdesk.com](mailto:sales@rustdesk.com) para conocer las condiciones de evaluación vigentes para las funciones Pro. Consulte los planes actuales y las funciones exactas en [rustdesk.com/pricing](https://rustdesk.com/pricing). ¿Prefiere verlo primero? Hay un recorrido en video completo en el [canal de YouTube de RustDesk](https://www.youtube.com/@rustdesk).
