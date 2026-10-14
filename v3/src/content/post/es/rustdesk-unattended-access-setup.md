---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-08T11:04:00Z
lang: 'es'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'Acceso desatendido en RustDesk: guía de configuración'
excerpt: 'Configura bien el acceso desatendido de RustDesk: una contraseña permanente, ejecución como servicio para que arranque con el equipo y despliegue masivo con un cliente preconfigurado.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.webp
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Acceso desatendido']
author: 'RustDesk Team'
slug: 'acceso-desatendido-en-rustdesk-guia-de-configuracion'
faq:
  - question: '¿Cómo configuro el acceso desatendido en RustDesk?'
    answer: 'En dos pasos: establece una contraseña permanente en Ajustes → Seguridad e instala RustDesk para que su servicio del sistema arranque con el equipo. El modo de aprobación predeterminado ya acepta la contraseña permanente; en macOS también hacen falta los permisos de Grabación de pantalla y Accesibilidad. Con ambos pasos hechos, puedes acceder al equipo encendido en cualquier momento, incluida la pantalla de inicio de sesión de Windows, sin que haya nadie delante.'
  - question: '¿Por qué se corta mi conexión de RustDesk cuando el usuario cierra sesión?'
    answer: 'Porque RustDesk se está ejecutando como ejecutable portable y no como servicio instalado. Un proceso portable vive dentro de la sesión del usuario, así que se detiene al cerrar sesión y, sin elevación, no puede manejar el escritorio seguro de UAC de Windows. Instala RustDesk y mantén activo su servicio del sistema, que funciona con independencia de cualquier usuario conectado. La elevación del portable sigue disponible para el soporte en Windows con el usuario presente.'
  - question: '¿Es seguro el acceso desatendido con una contraseña permanente?'
    answer: 'Sí, si está bien configurado. Usa una contraseña permanente larga y única, distinta del inicio de sesión del sistema operativo, activa la 2FA de conexión en el dispositivo controlado y restringe quién puede conectarse con una lista de IP o de ID permitidos y, en Server Pro, con el Control de acceso. Mantén los clientes actualizados y revisa los registros. Autoalojar sitúa el rendezvous, el relay y la consola en servidores que operas tú.'
  - question: '¿Puedo desplegar el acceso desatendido de RustDesk en muchos equipos a la vez?'
    answer: 'Sí. En los planes autoalojados Basic y superiores, el generador de clientes personalizados crea un instalador preconfigurado con la dirección de tu servidor, la clave y los ajustes ya integrados, de modo que los usuarios finales no tienen que escribir nada. Distribúyelo con tus herramientas de despliegue habituales y cada dispositivo instalará el servicio y se registrará automáticamente en tu servidor.'
  - question: '¿Funciona el acceso desatendido en la pantalla de inicio de sesión de Windows?'
    answer: 'Sí, una vez que RustDesk está instalado como servicio. El servicio instalado arranca con el sistema antes de que ningún usuario inicie sesión, así que puedes conectarte a la pantalla de inicio de sesión, autenticarte e incluso reiniciar el equipo y volver a conectarte. El ejecutable portable no puede hacerlo porque solo existe dentro de una sesión de usuario.'

metadata:
  description: 'Acceso desatendido en RustDesk: contraseña permanente, servicio que arranca con el equipo, notas para Windows, macOS y Linux, y despliegue en flotas.'
  keywords: 'acceso desatendido RustDesk, contraseña permanente RustDesk, inicio con el sistema RustDesk, instalación como servicio RustDesk, configuración de acceso desatendido RustDesk, implementación a gran escala RustDesk, acceso remoto desatendido'
---

El acceso desatendido consiste en conectarse a un equipo cuando no hay nadie delante: un servidor en un rack, un quiosco, el PC de un familiar en la otra punta del país. RustDesk lo resuelve bien en cuanto se cumplen dos condiciones: una **contraseña permanente**, para que nadie tenga que aprobar cada conexión, y RustDesk ejecutándose **como servicio**, para que esté disponible antes del inicio de sesión y después de cerrarla. Esta guía cubre ambas cosas, los permisos de cada plataforma y cómo desplegarlo en toda una flota.

## La respuesta corta

Establece una **contraseña permanente** (Ajustes → Seguridad) e **instala RustDesk como servicio del sistema**, que arranca con el equipo. El modo de aprobación predeterminado ya acepta la contraseña permanente, así que nadie tiene que hacer clic para aceptar; el servicio funciona con independencia de cualquier usuario conectado, de modo que puedes conectarte en cualquier momento, incluida la pantalla de inicio de sesión de Windows. En macOS también hacen falta los permisos de Grabación de pantalla y Accesibilidad. Para desplegarlo a gran escala, genera un cliente preconfigurado para que cada equipo se instale contra tu servidor.

## Paso 1: Establece una contraseña permanente

De forma predeterminada, RustDesk muestra una contraseña de un solo uso que va cambiando y que la persona del otro lado te leería. Para el acceso desatendido, la sustituyes por una credencial fija:

1. Abre RustDesk en el equipo al que quieres acceder.
2. Ve a **Ajustes → Seguridad** (en versiones antiguas, el área de contraseña de la pantalla principal).
3. Elige **Establecer contraseña permanente** (*Set permanent password*) e introduce un valor fuerte y único.

La configuración predeterminada ya acepta esa contraseña: las sesiones se aceptan tanto por contraseña como por clic, y se permiten ambos tipos de contraseña. Si alguien cambió el modo de aprobación a solo clic o el tipo de contraseña a solo de un solo uso, vuelve a **Aceptar sesiones a través de contraseña** (o **a través de ambos**) y a **Usar contraseña permanente** (*Use permanent password*) o **Usar ambas contraseñas**. En despliegues gestionados, las [claves de configuración](https://rustdesk.com/docs/es/self-host/client-configuration/advanced-settings/#approve-mode) equivalentes son `approve-mode` (predeterminada: `password-click`) y `verification-method` (predeterminada: `use-both-passwords`).

La [documentación del cliente de RustDesk](https://rustdesk.com/docs/es/client/) lo describe como el núcleo del acceso desatendido. Una regla que conviene subrayar: **no reutilices la contraseña de inicio de sesión del sistema operativo.** Usa una contraseña exclusiva y de alta entropía para RustDesk, de modo que la filtración de una credencial no comprometa la otra.

## Paso 2: Instálalo como servicio y haz que arranque con el equipo

Este es el paso que más se pasa por alto. Un `.exe` o `.app` portable se ejecuta dentro de la sesión del usuario, así que se detiene cuando el usuario cierra sesión y, en Windows, no puede manejar el escritorio seguro de UAC sin elevación (la [elevación del portable](https://rustdesk.com/docs/es/client/windows/windows-portable-elevation/) existe para el soporte con el usuario presente). Para que sea realmente desatendido, RustDesk debe ejecutarse en segundo plano como **servicio del sistema**.

- Ejecuta el **instalador** de RustDesk (no la versión portable) y completa la instalación.
- En **Ajustes → General**, comprueba que el **Servicio** esté en ejecución; usa **Iniciar** si aparece detenido. Una vez instalado, el servicio arranca automáticamente con el equipo.

Cuando RustDesk funciona como servicio, se carga antes de que nadie inicie sesión, y eso es lo que te permite conectarte a la **pantalla de inicio de sesión**, autenticarte a distancia e incluso reiniciar y volver a conectarte sin nadie presente. macOS y Linux añaden sus propios requisitos de captura de pantalla y de sesión gráfica, que se explican a continuación.

## Notas por plataforma

| Plataforma | Qué hacer                                                         | Ten en cuenta                                                                                                                                                                                              |
| ---------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows    | Instálalo; mantén el servicio en ejecución (arranca con el equipo) | El ejecutable portable se detiene al cerrar sesión y no puede manejar las solicitudes de UAC sin elevación; usa el instalador                                                                             |
| macOS      | Instálalo, establece la contraseña permanente y concede permisos | Hay que conceder Grabación de pantalla y Accesibilidad; la captura en la pantalla de inicio de sesión requiere instalar el componente auxiliar                                                             |
| Linux      | Instala el paquete con el servicio                                | Las compilaciones estándar capturan en Wayland la sesión iniciada; la [versión preliminar desatendida](/es/blog/unattended-remote-access-wayland-es) añade el acceso a la pantalla de inicio de sesión (x86_64 Debian/Ubuntu) |
| Android    | Establece la contraseña permanente; activa la captura            | La pantalla debe estar activa; concede el consentimiento de captura de pantalla (MediaProjection) y el permiso de entrada                                                                                  |

### Windows

El camino más limpio. Instala, activa el servicio, establece la contraseña permanente y listo. Como el servicio se ejecuta al arrancar, el acceso desatendido a la pantalla de inicio de sesión y tras los reinicios funciona como cabe esperar.

### macOS

macOS protege la captura de pantalla y la entrada con permisos. Después de instalarlo, abre **Ajustes del Sistema → Privacidad y seguridad** y concede a RustDesk **Grabación de pantalla** y **Accesibilidad**. Para acceder en la _ventana de inicio de sesión_ (antes de que ningún usuario inicie sesión), el servicio o componente auxiliar de RustDesk debe estar instalado para poder capturar antes del inicio de sesión; si no, verás una pantalla negra, el mismo [problema de captura que explicamos en nuestra guía sobre la pantalla negra](/es/blog/rustdesk-conectado-esperando-imagen-guia-completa-de-solucion).

### Linux

Instala RustDesk para que su servicio se ejecute al arrancar. Las compilaciones estándar de RustDesk capturan escritorios Wayland, incluidos varios monitores desde la versión 1.4.3, mediante PipeWire y `xdg-desktop-portal` en una sesión iniciada. Para un equipo que se queda en la pantalla de inicio de sesión, la [versión preliminar de acceso desatendido en Wayland](/es/blog/unattended-remote-access-wayland-es), independiente y para **sistemas x86_64 basados en Debian/Ubuntu**, añade el acceso desatendido y el acceso a la pantalla de inicio de sesión tras un reinicio. Si la distribución aún la ofrece, una pantalla de inicio de sesión X11 es otra opción; en un equipo sin monitor, añade un emulador de pantalla o una pantalla virtual. Consulta [RustDesk para Linux](/es/blog/rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto) para más detalles.

## Paso 3: Despliégalo a gran escala con un cliente preconfigurado

Configurar un equipo a mano está bien; configurar cincuenta, no. En los **planes autoalojados Basic y superiores**, el **generador de clientes personalizados** de la consola web crea un instalador con la **dirección de tu servidor, la clave pública y los ajustes ya integrados**, de modo que los usuarios finales no tienen que escribir nada. Combinado con tu herramienta de despliegue habitual (directivas de grupo, Intune, el RMM de un MSP, un script de shell), cada dispositivo instala el servicio y se registra en _tu_ servidor en la primera ejecución.

Aquí es donde el autoalojamiento compensa a los equipos: toda la flota se registra en servidores de ID/rendezvous y relay que operas tú (consulta [RustDesk para MSP](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable)). Los planes de Server Pro se licencian por **usuarios con inicio de sesión y dispositivos gestionados**. Los planes estándar incluyen conexiones simultáneas ilimitadas; solo [Customized V2](https://rustdesk.com/pricing#custom2) se licencia por un número determinado de conexiones simultáneas. Presupuesta según cuántos equipos y administradores tienes; consulta [qué cuenta como dispositivo gestionado](/es/blog/que-cuenta-como-un-dispositivo-administrado-en-rustdesk). Sirve la consola web [por HTTPS](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/faq/#configurar-https-para-consola-web-manualmente) detrás de un proxy inverso.

## Protégelo bien

El acceso desatendido es una puerta permanente a un equipo, así que trata las credenciales con seriedad:

- **Contraseña permanente fuerte y única**, renovada periódicamente.
- **2FA de conexión** en el dispositivo controlado y, en Server Pro, [Control de acceso](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/permissions/), que decide quién puede llegar a qué dispositivos mediante reglas de usuarios y grupos de dispositivos (los permisos de los grupos de usuarios y de dispositivos son acumulativos). La libreta de direcciones compartida solo organiza entradas; no es una barrera de acceso. El [Rol de control](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/control-role/) limita lo que un técnico puede hacer dentro de una sesión.
- **Autoaloja el servidor**, para que el rendezvous, el relay, la consola y los datos de gestión almacenados se ejecuten en la infraestructura que elijas. El cliente de RustDesk y Server OSS tienen licencia AGPL, así que su código de autenticación puede revisarse; Server Pro es software de servidor autoalojado, comercial y propietario.

## Acceso desatendido que realmente controlas

Apunta una flota siempre encendida a un servidor que operas tú y el acceso permanente a esos equipos seguirá pasando por hardware que es tuyo, no por una nube que alquilas. Para un acceso permanente, mantener esa ruta en tus manos compensa de sobra la breve configuración.
