---
publishDate: 2026-10-14T00:00:00Z
lang: es
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0: Conexiones directas con WebRTC y mejoras de QoS'
excerpt: 'RustDesk 1.5.0 añade rutas WebRTC, acceso directo desde el cliente web y ajustes de QoS para el retardo, la congestión y los objetivos de FPS.'
image: ~/assets/images/blog/web-client.jpg
category: Lanzamiento
slug: rustdesk-1-5-0-webrtc-qos-es
tags:
  - WebRTC
  - QoS
  - cliente web
  - lanzamiento
---

Hace poco compartimos una experiencia práctica: tras actualizar a la versión 1.5.0, el acceso a un Mac en casa desde otro continente se sentía más fluido que antes. La [publicación original](https://x.com/rustdesk/status/2110243829978898520) describe esa experiencia. A continuación detallamos los cambios concretos de la versión 1.5.0 en las conexiones y en la adaptación de la transmisión de la pantalla.

La [PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) incorporó compatibilidad con WebRTC Data Channel. Los intentos de conexión ICE compiten en paralelo con los mecanismos existentes de perforación de NAT mediante TCP y UDP y las rutas directas por IPv6. Cuando un servidor de retransmisión está listo, pero aún hay un intento de conexión directa pendiente, RustDesk mantiene durante un breve intervalo la preferencia por una conexión directa. Puede utilizar el servidor de retransmisión cuando termina ese intervalo o fallan los intentos directos. Esto añade oportunidades de conexión directa para algunas conexiones que antes requerían retransmisión.

**El cliente web ahora también puede conectarse directamente.** Antes, las sesiones de RustDesk en un navegador tenían que pasar por un servidor de retransmisión. Cuando las condiciones de red lo permiten e ICE selecciona una ruta directa, los datos de la sesión ahora pueden viajar directamente entre el navegador y el dispositivo remoto, lo que puede evitar la latencia y los límites de ancho de banda de la retransmisión. Una conexión WebRTC reenviada mediante TURN sigue siendo una conexión retransmitida. La integración transporta el protocolo RustDesk a través de Data Channel; RustDesk sigue encargándose de la codificación y decodificación de vídeo.

Los cambios de QoS proceden de la [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082). Esta aborda las caídas bruscas de la frecuencia de fotogramas que la política anterior provocaba tras una sola respuesta lenta o una breve interrupción, seguidas de una recuperación lenta. Los cambios de la versión 1.5.0 incluyen:

- **Mejora del retardo de referencia.** Se utiliza el retardo bajo de referencia de cada conexión desde la primera respuesta, con una adaptación gradual a los cambios estables de esa referencia para reducir las evaluaciones erróneas en enlaces de alta latencia.
- **Confirmación de las fluctuaciones normales del retardo.** Para reducir la frecuencia de fotogramas en casos normales se requieren tres respuestas desfavorables consecutivas. Un exceso grave de retardo y la expiración del tiempo de espera de las sondas aún pueden provocar reducciones más rápidas.
- **Primero la tasa de bits cuando las condiciones lo permiten.** Durante el ajuste normal ante la congestión, se reduce primero la tasa de bits cuando la tasa de bits adaptativa está activada y todavía puede disminuir, en lugar de depender únicamente de reducir los fotogramas mientras el codificador mantiene su tasa de bits objetivo.
- **Aumento inicial y recuperación más rápidos del objetivo de frecuencia de fotogramas.** Dos respuestas consecutivas con poco retardo adicional en un enlace sin perturbaciones pueden acelerar el aumento del objetivo al inicio. Tras una congestión, dos respuestas favorables pueden restablecer el objetivo anterior de frecuencia de fotogramas. El controlador revierte el cambio si la congestión reaparece poco después del restablecimiento.

Estas políticas utilizan información de retorno sobre el retardo que comparte la ruta de transmisión de la pantalla. Esa información incluye la acumulación de datos pendientes en el transporte, el recorrido de ida y vuelta de la red y la programación de las respuestas del cliente. Indica cambios en la carga, en lugar de medir de forma aislada el retardo de las colas. [Implementación de QoS en la versión 1.5.0](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs).

Para el cambio que acelera el inicio, el autor de la PR comparó ese cambio con su commit padre en una prueba de oficina sobre un enlace local: el tiempo de inicio hasta alcanzar el **objetivo de 60 FPS** bajó de **7.99 segundos a 2.98 segundos**. Esto mide el efecto del cambio en el aumento inicial del objetivo de frecuencia de fotogramas en esa prueba. [Informe de la prueba](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117).

Actualice a [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0) o pruebe la nueva ruta de conexión en el [cliente web](https://rustdesk.com/web). WebRTC requiere compatibilidad tanto de los dos extremos como del servidor. Está desactivado de forma predeterminada para los servidores autoalojados; habilítelo explícitamente con `enable-webrtc=Y`. Para Server Pro, la documentación indica compatibilidad a partir de la versión 1.8.7. Consulte la [guía de configuración](https://rustdesk.com/docs/es/self-host/client-configuration/advanced-settings/#enable-webrtc) para configurarlo.
