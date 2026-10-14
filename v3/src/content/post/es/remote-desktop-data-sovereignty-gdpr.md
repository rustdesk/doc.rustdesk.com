---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-04T17:05:00Z
lang: 'es'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Soberanía de datos en el escritorio remoto y RGPD: autoalojamiento'
excerpt: 'Cómo el autoalojamiento da a los equipos regulados el control de los datos de rendezvous, relay y dispositivos, y qué cuestiones de RGPD y cumplimiento siguen abiertas.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp'
category: 'Seguridad'
tags: ['RustDesk', 'Seguridad', 'GDPR', 'Autoalojamiento']
author: 'RustDesk Team'
slug: 'soberania-de-datos-en-el-escritorio-remoto-y-rgpd-autoalojamiento'
faq:
  - question: '¿Cumple RustDesk con ISO 27001, SOC 2 o HIPAA?'
    answer: 'RustDesk autoalojado se evalúa dentro de tu propio programa de cumplimiento: el ID/rendezvous, el relay y la consola se ejecutan en infraestructura que tú operas, así que quedan bajo tu alcance de ISO 27001, tus controles SOC 2 o tus salvaguardas HIPAA, como el resto de tu entorno. El autoalojamiento es un control de despliegue, no una certificación. Pregunta a sales@rustdesk.com por los informes del proveedor, el BAA, el DPA o la documentación de compras disponibles para tu caso.'
  - question: '¿Ayuda autoalojar RustDesk a cumplir el RGPD?'
    answer: 'Sí. Te da el control en el que suele centrarse el RGPD: eliges dónde residen el ID/rendezvous, el relay, la consola y los datos de los dispositivos, y puedes mantenerlos en la región, en infraestructura que tú operas. Es una base sólida, no una garantía automática, porque el RGPD es un programa: la base jurídica, los roles de responsable y encargado, la conservación, el control de acceso, la ubicación de los extremos y la respuesta a incidentes siguen siendo cosa tuya, y el responsable del tratamiento sigue respondiendo de ello.'
  - question: '¿Adónde van realmente los datos de sesión de RustDesk?'
    answer: 'RustDesk intenta primero una conexión directa entre pares; si falla, el tráfico pasa por el relay que hayas configurado. Autoalojar elimina de la ruta un rendezvous y un relay operados por el proveedor, pero una sesión entre extremos situados en países distintos sigue atravesando esas redes: la ubicación del servidor, por sí sola, no confina todo el tráfico a una única jurisdicción.'
  - question: '¿Puedo mantener los datos del escritorio remoto dentro de la UE con RustDesk?'
    answer: 'Sí. Puedes ubicar el ID/rendezvous, el relay, la consola y los datos de dispositivos almacenados en un centro de datos de la UE. Para acotar también el tráfico de las sesiones, ambos extremos deben estar dentro de ese perímetro y la política debe forzar el tráfico a través de tu relay aprobado; documenta la ubicación de los extremos y el enrutamiento junto con la ubicación de los servidores.'
  - question: '¿Qué funciones de RustDesk ayudan a cumplir el RGPD?'
    answer: 'RustDesk Server Pro ofrece registros de auditoría con retención configurable (Configuración > Otros > Retención de registros (días); 0 los conserva indefinidamente), Control de acceso y Rol de control para aplicar el mínimo privilegio, SSO con LDAP/OIDC, consentimiento por conexión, modo de privacidad en Windows y macOS, y eliminación de usuarios y dispositivos desde la consola o la API para atender solicitudes de supresión. Autoalojar te permite elegir dónde se ejecuta todo ello.'
metadata:
  description: 'RGPD y soberanía de datos en escritorio remoto: qué controla el autoalojamiento, sesiones directas y por relay, y por qué la ubicación del servidor no basta.'
  keywords: 'soberanía de datos en escritorio remoto, acceso remoto y RGPD, residencia de datos en escritorio remoto, cumplimiento de acceso remoto autoalojado'
---

Si tu organización está sujeta al RGPD, a normas de privacidad sanitaria o a un mandato del sector público del tipo «nuestros datos se quedan en nuestra infraestructura», hay una pregunta que decide qué herramientas de escritorio remoto puedes siquiera preseleccionar: **¿adónde van realmente los datos de la sesión?**

En un servicio alojado por el proveedor, este suele operar la coordinación y almacenar los datos de gestión y de cuentas. El contenido de la sesión puede viajar directamente entre los extremos o pasar por un relay. Una revisión de flujos de datos debe distinguir esas rutas: que la nube «intermedie» la conexión no significa que cada paquete de pantalla pase por ella.

Esta guía trata sobre la **soberanía de datos en el escritorio remoto**: qué significa, por qué importa a los compradores regulados y de la UE, y qué partes de un despliegue de acceso remoto te permite controlar el autoalojamiento. Usaremos RustDesk como ejemplo práctico.

## Qué significa la «soberanía de datos» en el acceso remoto

La soberanía de datos es el principio según el cual los datos están sujetos a las leyes del país donde se almacenan y procesan físicamente. En el soporte remoto, los datos sensibles no son solo los archivos que transfieres: es la propia sesión, es decir, lo que aparece en pantalla, la lista de dispositivos que gestionas, los metadatos de conexión y, a menudo, el enrutamiento de los píxeles en tiempo real.

Las preguntas clave son: **¿qué sistemas almacenan metadatos, qué sistemas retransmiten el tráfico y dónde están ambos extremos?** El autoalojamiento puede eliminar de la ruta un servicio de rendezvous o de relay operado por el proveedor, pero no puede garantizar que una sesión entre extremos de países distintos permanezca en una sola jurisdicción.

## La diferencia clave: la nube del proveedor frente a tu infraestructura

Aquí decide la arquitectura, no el marketing.

**RustDesk Server Pro es autoalojado.** El servidor de ID/rendezvous, el servidor relay, la consola web y los datos de los dispositivos gestionados se ejecutan en la infraestructura que tú elijas. RustDesk intenta primero una conexión directa entre pares mediante perforación de NAT (hole punching); si falla, el tráfico de la sesión pasa por el relay que hayas configurado. Así controlas la capa de rendezvous/relay y los datos de dispositivos almacenados, pero los extremos y sus rutas de red siguen determinando por dónde viaja el tráfico directo.

|                                           | Herramientas en la nube del proveedor  | RustDesk autoalojado                                                                              |
| ----------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Dónde se coordinan las sesiones           | La nube del proveedor                  | Tu servidor de ID/rendezvous                                                                      |
| Por dónde fluye el tráfico de la sesión   | Enrutamiento definido por el proveedor | Directo entre los extremos cuando es posible; si no, a través de tu relay                         |
| Quién controla la residencia de los datos | El proveedor                           | Tú eliges la ubicación del lado del servidor y la política de relay; los extremos siguen contando |
| Auditabilidad del cliente                 | Normalmente, código cerrado            | [Código abierto (AGPL)](https://github.com/rustdesk/rustdesk): léelo y compílalo tú mismo         |
| Quién opera el servidor                   | El proveedor                           | Tu equipo                                                                                         |

Los equipos que evalúan el autoalojamiento suelen citar primero este control: elegir la ubicación y el operador de los sistemas de rendezvous, relay y gestión.

## Ventaja 1: controlas la ubicación de los datos del lado del servidor

Si ubicas los servicios de ID, relay y gestión en un centro de datos alemán, puedes documentar con exactitud dónde residen esos servicios y los datos que almacenan. Si además mantienes ambos extremos dentro del perímetro exigido y fuerzas el tráfico a través de ese relay aprobado, también puedes acotar la ruta de la sesión.

## Ventaja 2: el código abierto te permite verificar el cliente

El **cliente de RustDesk y RustDesk Server OSS (el servidor comunitario gratuito) tienen [licencia AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro es software de servidor autoalojado, comercial y propietario**. Tu equipo de seguridad puede leer el código del cliente, auditar lo que hace en un equipo y compilarlo por su cuenta. Eso importa más de lo habitual en el acceso remoto: se confía al software el control total de una máquina, y los compradores regulados quieren cada vez más verificar lo que hace un cliente en lugar de fiarse de la palabra del proveedor.

## Ventaja 3: un modelo distinto de licencias de servidor

Los planes estándar de RustDesk se licencian **por usuario con inicio de sesión más por dispositivo gestionado** e incluyen conexiones simultáneas ilimitadas; solo [Customized V2](https://rustdesk.com/pricing#custom2) licencia un número determinado de conexiones simultáneas. Puedes [ampliar una licencia](/es/blog/actualizar-la-licencia-de-rustdesk-a-mitad-de-suscripcion-como-funciona) en cualquier momento a medida que cambien tus necesidades.

El modelo crece con tu parque de dispositivos: la [guía de planificación para flotas grandes](/es/blog/puede-rustdesk-escalar-a-200-000-dispositivos) cubre despliegues de hasta 200.000 dispositivos. Server Pro añade [Control de acceso](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/permissions/) por usuario y grupo de dispositivos, además de SSO con LDAP/OIDC y generación de clientes personalizados desde el plan Basic.

## Cómo encaja RustDesk con los requisitos de ISO 27001, SOC 2 o HIPAA

Los equipos de compras de las empresas y del sector sanitario casi siempre preguntan cómo encaja una herramienta de acceso remoto con ISO 27001, SOC 2 o HIPAA. Con un producto en la nube, dependes de la certificación que el proveedor tenga de su propia infraestructura y de sus condiciones de responsabilidad compartida. RustDesk autoalojado funciona al revés: el ID/rendezvous, el relay y la consola se ejecutan en infraestructura que tu programa ya cubre, así que los evalúas dentro de tu propio alcance de ISO 27001, tus controles SOC 2 o tus salvaguardas HIPAA, y tu equipo de seguridad puede inspeccionar el código fuente del cliente como parte de esa evaluación. El autoalojamiento es un control de despliegue, no una certificación; es la evaluación la que lo incorpora al alcance.

Algunas notas prácticas:

- El autoalojamiento te permite elegir la ubicación y el operador del rendezvous, el relay, la consola y los datos de gestión almacenados. Documenta el enrutamiento de los extremos, las copias de seguridad y el acceso de los administradores junto con esas ubicaciones.
- Si tu proceso de compras exige específicamente un informe SOC 2 del proveedor, un Business Associate Agreement (BAA) firmado, un DPA o cuestionarios de seguridad cumplimentados, pregunta al equipo de RustDesk en [sales@rustdesk.com](mailto:sales@rustdesk.com) qué hay disponible actualmente para tu caso.
- Como el cliente es de código abierto, la pregunta «¿cómo sabemos lo que hace?» se responde inspeccionándolo; los informes de garantía del proveedor responden a otra pregunta del proceso de compras.

En resumen, el autoalojamiento integra el acceso remoto en el programa de cumplimiento que ya tienes, lo que para un equipo regulado suele ser una posición más sólida que depender de la certificación de un proveedor sobre una infraestructura que no puedes inspeccionar.

## Controles que respaldan un programa de RGPD autoalojado

El autoalojamiento es la base, y sobre ella RustDesk ofrece controles concretos en los que se apoyan los equipos que autoalojan dentro de un programa de RGPD:

- **Los datos del servidor se quedan donde los colocas, con una lista corta de flujos salientes.** Los servicios autoalojados de ID/rendezvous, relay y gestión de Pro procesan sus datos de despliegue donde los ejecutas. Los flujos salientes que hay que documentar son la validación de la licencia Pro (HTTPS a rustdesk.com aproximadamente una vez al día), el servicio de compilación de clientes personalizados, las actualizaciones de los clientes, SMTP si configuras un servidor de correo externo y cualquier proveedor de identidad externo que conectes. Consulta la [guía de Server Pro sin conexión y en modo air-gapped](/es/blog/puede-rustdesk-server-pro-funcionar-sin-conexion-o-en-modo-air-gapped).
- **Retención de auditoría configurable.** Los [registros de auditoría de Server Pro](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/audit-logs/#visibilidad-y-retención-de-registros) cubren conexiones, transferencias de archivos, alarmas y operaciones de la consola. En **Configuración → Otros → Retención de registros (días)**, `0` conserva todos los registros indefinidamente; un valor positivo elimina los registros más antiguos, con una limpieza cada hora. Define por separado la retención de las exportaciones y las copias de seguridad.
- **Acceso granular y acotado.** El [Control de acceso](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/permissions/) decide quién puede llegar a qué dispositivos mediante asignaciones por usuario, grupos de dispositivos y reglas entre grupos (los permisos de grupos de usuarios y de grupos de dispositivos son acumulativos). La libreta de direcciones compartida solo organiza entradas; no es una frontera de acceso. El [Rol de control](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/control-role/) limita lo que un técnico puede hacer durante la sesión: teclado y ratón, portapapeles, transferencia de archivos, audio, cámara, terminal, impresión, grabación y más. Junto con SSO/LDAP y la 2FA del dispositivo controlado, aplican el mínimo privilegio y la limitación de la finalidad.
- **Modo de privacidad y consentimiento por conexión.** El lado controlado puede exigir aprobación para cada conexión entrante, y el modo de privacidad (compatible con Windows y macOS) oscurece la pantalla local durante la sesión, lo que limita la exposición incidental de datos personales en pantalla.
- **Eliminación en tus propios términos.** Como los datos residen en tu servidor, puedes desactivar o eliminar usuarios y borrar dispositivos y registros (también mediante la API REST), y atender directamente las solicitudes de supresión y de conservación.
- **Infraestructura en la región y operada por ti.** El ID/rendezvous, el relay, la consola y los datos almacenados se ejecutan donde los colocas, en hardware que controlas.
- **Las compilaciones de clientes personalizados son efímeras.** Generar un cliente con tu marca es el único paso que usa el servicio de compilación de RustDesk, y es deliberadamente breve: la configuración que envías se elimina en cuanto termina la compilación y el instalador generado se borra automáticamente al cabo de aproximadamente un día, así que lo descargas y lo guardas en tu propio repositorio aprobado.

Son palancas que un programa de RGPD puede accionar de verdad: tú sigues documentándolas y operándolas, pero no esperas a que un proveedor atienda la solicitud de un interesado.

## Una soberanía que puedes demostrar

Alojar tú mismo el rendezvous, el relay, la consola y los datos almacenados da a un programa de cumplimiento algo concreto: infraestructura que tú ubicas, operas y auditas. Es un cimiento, no una meta, pero es la parte sobre la que descansa todo lo demás.

## Lista de comprobación de despliegue para RGPD y soberanía

El autoalojamiento te da opciones; el despliegue tiene que convertirlas en controles:

- Documenta dónde están el servidor de ID, el relay, la consola, las copias de seguridad, los registros y los administradores.
- Traza por separado las rutas directas entre pares y las rutas por relay. Un servidor en Alemania no mantiene dentro de Alemania una sesión directa entre Alemania y otro país.
- Decide cuándo hay que forzar el relay porque enrutar a través de una ubicación controlada importa más que el rendimiento entre pares.
- Registra la finalidad, el plazo de conservación y la política de acceso de los metadatos de dispositivos, cuentas, auditoría y conexiones.
- Aplica grupos de dispositivos con mínimo privilegio, MFA/SSO donde esté disponible y un proceso de altas, cambios y bajas para los técnicos.
- Pon la consola web detrás de HTTPS, restringe el acceso de red de administración y prueba la restauración de las copias de seguridad.
- Completa la evaluación jurídica que corresponda (por ejemplo, el registro de actividades de tratamiento, la revisión de encargados, la evaluación de transferencias y la EIPD) según tu caso de uso.

RustDesk puede respaldar una arquitectura de soberanía, pero el responsable del tratamiento sigue respondiendo de esa arquitectura y de su base jurídica.

## Evalúalo dentro de tu propio perímetro

Puedes evaluarlo en tus propios términos. Autoaloja hoy mismo Server OSS o escribe a [sales@rustdesk.com](mailto:sales@rustdesk.com) para conocer las condiciones de evaluación vigentes de las funciones Pro. Consulta los planes actuales y las funciones exactas en [rustdesk.com/pricing](https://rustdesk.com/pricing). ¿Prefieres verlo antes? Hay un recorrido completo en vídeo en el [canal de YouTube de RustDesk](https://www.youtube.com/@rustdesk).
