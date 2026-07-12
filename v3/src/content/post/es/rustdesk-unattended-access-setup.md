---
publishDate: 2026-07-08T11:04:00Z
lang: 'es'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'Acceso desatendido en RustDesk: guía de configuración'
excerpt: 'Configura el acceso desatendido de RustDesk de la forma correcta: una contraseña permanente, ejecución como servicio para que se inicie con el sistema, y despliegue a gran escala con un cliente preconfigurado.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.png
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Acceso desatendido']
author: 'RustDesk Team'
slug: 'acceso-desatendido-en-rustdesk-guia-de-configuracion'
faq:
  - question: '¿Cómo configuro el acceso desatendido en RustDesk?'
    answer: 'Se requieren dos cosas: establecer una contraseña permanente en Configuración, Seguridad para no necesitar que alguien apruebe cada conexión, e instalar RustDesk como servicio del sistema para que se ejecute antes de iniciar sesión y siga funcionando después de cerrarla. Con ambas configuradas, puedes acceder al equipo en cualquier momento, incluso en la pantalla de inicio de sesión, sin que haya una persona presente.'
  - question: '¿Por qué se corta mi conexión de RustDesk cuando el usuario cierra sesión?'
    answer: 'Eso ocurre cuando RustDesk se ejecuta como ejecutable portátil en lugar de instalarse como servicio. Una sesión portátil termina cuando el usuario cierra sesión o aparece un aviso de UAC. Instala RustDesk (en lugar de ejecutar el ejecutable portátil) y mantén su servicio habilitado —el servicio instalado se inicia con el sistema— para que se ejecute en segundo plano independientemente de cualquier usuario con sesión iniciada, que es lo que hace fiable el acceso desatendido.'
  - question: '¿Es seguro el acceso desatendido con una contraseña permanente?'
    answer: 'Puede implementarse de forma segura cuando se configura correctamente. Usa una contraseña permanente larga y única, restringe quién puede conectarse, habilita los controles de identidad y acceso disponibles, mantén los clientes actualizados y revisa los registros. El autoalojamiento controla los servicios del lado del servidor y los datos de implementación almacenados; el endpoint sigue siendo responsable de proteger sus propias credenciales locales.'
  - question: '¿Puedo implementar el acceso desatendido de RustDesk en muchos equipos a la vez?'
    answer: 'Sí. En los planes autoalojados Basic y superiores, el Generador de Cliente Personalizado produce un instalador preconfigurado con la dirección de tu servidor, la clave y la configuración ya integradas, de modo que los usuarios finales no tienen que escribir nada. Distribúyelo con tu herramienta de implementación habitual y cada dispositivo instalará el servicio y se registrará automáticamente en tu servidor.'
  - question: '¿Funciona el acceso desatendido en la pantalla de inicio de sesión de Windows?'
    answer: 'Sí, una vez que RustDesk está instalado como servicio. El servicio instalado se inicia con el sistema antes de que cualquier usuario inicie sesión, por lo que puedes conectarte a la pantalla de inicio de sesión, autenticarte e incluso provocar un reinicio y reconectarte. El ejecutable portátil no puede hacer esto porque solo existe dentro de una sesión de usuario.'

metadata:
  description: 'Configura el acceso desatendido de RustDesk: contraseña permanente, ejecución como servicio para el inicio con el sistema, notas por plataforma para Windows/macOS/Linux, e implementación en flotas.'
  keywords: 'acceso desatendido RustDesk, contraseña permanente RustDesk, inicio con el sistema RustDesk, instalación como servicio RustDesk, configuración de acceso desatendido RustDesk, implementación a gran escala RustDesk, acceso remoto desatendido'
---

El acceso desatendido significa poder llegar a un equipo cuando no hay nadie sentado frente a él: un servidor en un rack, un quiosco, el PC de un familiar al otro lado del país. RustDesk hace esto muy bien, pero solo si configuras correctamente dos cosas: una **contraseña permanente** para que nadie tenga que aprobar cada conexión, y RustDesk ejecutándose **como servicio** para que esté disponible antes de iniciar sesión y después de cerrarla. Esta guía cubre ambos aspectos, además de cómo implementarlo en toda una flota de equipos.

## La respuesta corta

Establece una **contraseña permanente** (Configuración → Seguridad) e **instala RustDesk como servicio del sistema** —el servicio instalado se inicia junto con el equipo. La contraseña elimina la necesidad de que una persona acepte el aviso de conexión; el servicio hace que RustDesk se ejecute independientemente de cualquier usuario con sesión iniciada, para que puedas conectarte en cualquier momento, incluso en la pantalla de inicio de sesión. Para implementarlo a gran escala, genera un cliente preconfigurado para que cada equipo se instale automáticamente contra tu servidor.

## Paso 1: Establece una contraseña permanente

De forma predeterminada, RustDesk muestra una contraseña de un solo uso que va rotando, la cual una persona en el extremo remoto te leería en voz alta. Para el acceso desatendido, la sustituyes por una credencial fija:

1. Abre RustDesk en el equipo al que quieres acceder.
2. Ve a **Configuración → Seguridad** (en versiones antiguas: el área de contraseña en la pantalla principal).
3. Elige **Establecer contraseña permanente** e introduce un valor fuerte y único.

La [documentación del cliente de RustDesk](https://rustdesk.com/docs/en/client/) describe esto como el núcleo del acceso desatendido. Una regla que vale la pena destacar: **no reutilices la contraseña de inicio de sesión del sistema operativo.** Usa una contraseña dedicada y de alta entropía para RustDesk, de modo que la filtración de una credencial no comprometa la otra.

## Paso 2: Instálalo como servicio e inícialo con el sistema

Este es el paso que muchos pasan por alto. Si simplemente ejecutas el `.exe` o `.app` portátil, la sesión **termina en el momento en que el usuario cierra sesión o aparece un aviso de UAC/permisos** —porque ese proceso solo existe dentro de la sesión del usuario. Para ser verdaderamente desatendido, RustDesk debe ejecutarse como un **servicio del sistema** en segundo plano.

- Ejecuta el **instalador** de RustDesk (no la versión portátil) y completa la instalación.
- En **Configuración → General**, asegúrate de que el **Servicio** esté en ejecución —usa **Iniciar** si aparece como detenido. Una vez instalado, el servicio se inicia automáticamente con el equipo.

Una vez que RustDesk se ejecuta como servicio, se carga antes de que nadie inicie sesión, lo que te permite conectarte a la **pantalla de inicio de sesión**, autenticarte de forma remota e incluso reiniciar y reconectarte sin que haya una persona presente. Artículos de la comunidad sobre la [configuración correcta del servicio en Windows](https://www.smolkin.org/blog/2026/03/rustdesk-unattended-service-windows.html) insisten en la misma distinción: portátil equivale a solo asistido; servicio instalado equivale a desatendido.

## Notas por plataforma

| Plataforma | Qué hacer                                                            | Ten en cuenta                                                                                                                                                                                |
| ---------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows    | Instálalo; mantén el servicio en ejecución (se inicia con el equipo) | El exe portátil se desconecta al cerrar sesión/UAC; usa el instalador                                                                                                                        |
| macOS      | Instálalo, establece la contraseña permanente, concede los permisos  | Deben concederse Grabación de Pantalla y Accesibilidad; la captura en la pantalla de inicio de sesión necesita el helper instalado                                                           |
| Linux      | Instala el paquete del servicio                                      | Wayland necesita una sesión activa; para el acceso previo al inicio de sesión usa la configuración de pantalla virtual sin interfaz gráfica, o X11 donde una distribución todavía lo ofrezca |
| Android    | Establece la contraseña permanente; habilita la captura              | La pantalla debe estar activa; concede el consentimiento de captura de pantalla (MediaProjection) y el permiso de entrada                                                                    |

### Windows

El camino más limpio. Instala, activa el servicio, establece la contraseña permanente, listo. Como el servicio se ejecuta al arrancar, el acceso desatendido a la pantalla de inicio de sesión y a través de reinicios funciona como se espera.

### macOS

macOS restringe la captura de pantalla y la entrada detrás de permisos. Después de instalarlo, abre **Configuración del Sistema → Privacidad y Seguridad** y concede a RustDesk tanto **Grabación de Pantalla** como **Accesibilidad**. Para acceder en la _ventana de inicio de sesión_ (antes de que cualquier usuario inicie sesión), el servicio/helper de RustDesk debe estar instalado para poder capturar antes del inicio de sesión; de lo contrario, obtendrás ahí una pantalla negra, el mismo [problema de captura que cubrimos en nuestra guía de pantalla negra](/es/blog/rustdesk-conectado-esperando-imagen-guia-completa-de-solucion).

### Linux

Instala RustDesk para que su componente de servicio se ejecute al arrancar. En un equipo que permanece en la pantalla de bienvenida de inicio de sesión, Wayland todavía no puede capturar esa pantalla —una limitación de diseño de Wayland (no de RustDesk) que el equipo de RustDesk está trabajando activamente para resolver ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). En un equipo sin interfaz gráfica (headless), usa la configuración de pantalla virtual; en un equipo de escritorio, una sesión X11/Xorg todavía se encarga de ello donde una distribución ofrezca una, aunque varias se están moviendo exclusivamente a Wayland. Consulta [RustDesk para Linux](/es/blog/rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto) para más detalles.

## Paso 3: Despliega a gran escala con un cliente preconfigurado

Configurar un equipo a mano está bien; configurar cincuenta, no. En los **planes autoalojados Basic y superiores**, el **Generador de Cliente Personalizado** de la consola web crea un instalador con tu **dirección de servidor, clave pública y configuración ya integradas**, de modo que los usuarios finales no tienen que escribir nada. Combinado con tu herramienta de implementación existente (Group Policy, Intune, un RMM de MSP, un script de shell), cada dispositivo instala el servicio y se registra en _tu_ servidor en la primera ejecución.

Aquí es donde el autoalojamiento resulta rentable para los equipos: obtienes una [flota desatendida bajo tu control total](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable), sin una medición en la nube por asiento que decida cuántos endpoints tienes "permitido" alcanzar. Configura el generador a través de la [consola web en el puerto 21114](https://rustdesk.com/docs). Ten en cuenta que RustDesk se licencia por **usuario de inicio de sesión y dispositivo gestionado**, no por sesión concurrente, así que calcula tu presupuesto según cuántos equipos y administradores tienes; consulta [qué cuenta como dispositivo gestionado](/es/blog/que-cuenta-como-un-dispositivo-administrado-en-rustdesk).

## Protégelo bien

El acceso desatendido es una puerta permanentemente abierta a un equipo, así que trata las credenciales con seriedad:

- **Contraseña permanente fuerte y única**, rotada periódicamente.
- **Autenticación de dos factores** y, en Pro, **controles de acceso** para que solo las cuentas autorizadas puedan conectarse. Nuestro artículo sobre [control de acceso por usuario y grupos de dispositivos](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/permissions/) explica cómo delimitar quién accede a qué.
- **Autoaloja los servicios del lado del servidor** cuando necesites controlar el rendezvous, el relay, la consola y los datos de implementación almacenados. Las credenciales del endpoint siguen siendo responsabilidad de la seguridad del propio endpoint. Como RustDesk es de código abierto bajo AGPL, su implementación de autenticación puede revisarse.

## Acceso desatendido que realmente controlas

Apunta una flota siempre activa hacia un servidor que tú mismo gestionas, y el acceso permanente a esos equipos seguirá intermediado por hardware que te pertenece, no por una nube que alquilas. Para un acceso permanente, mantener ese camino bajo tu propio control vale la pena la breve configuración inicial.
