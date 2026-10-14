---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-02T14:43:00Z
lang: 'es'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: '¿Qué cuenta como dispositivo gestionado en RustDesk?'
excerpt: 'En los planes estándar de RustDesk Server Pro, cada dispositivo al que configuras el acceso cuenta una vez. Customized V2 solo cuenta los asignados a un grupo o usuario; los puntuales no cuentan.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: 'Precios'
tags: ['RustDesk', 'Precios', 'Licencias']
author: 'RustDesk Team'
slug: 'que-cuenta-como-un-dispositivo-administrado-en-rustdesk'
faq:
  - question: '¿Cómo cuenta RustDesk los dispositivos gestionados?'
    answer: 'En los planes estándar, cada dispositivo al que configuras el acceso cuenta como un dispositivo gestionado, una sola vez, tanto si hay alguien delante como si no, y tanto si te conectas una vez como mil. Customized V2 cuenta de otra forma: solo los dispositivos asignados a un grupo de dispositivos o a un usuario cuentan para tu número de dispositivos bajo licencia.'
  - question: '¿Cómo se cuentan los dispositivos de soporte puntual?'
    answer: 'En el plan Customized V2, solo cuentan como dispositivos gestionados los asignados a un grupo de dispositivos o a un usuario. Un equipo al que te conectas una vez para un soporte puntual, y que nunca asignas, no cuenta para tu número de dispositivos bajo licencia ni se desactiva. Si tu trabajo es sobre todo puntual, Customized V2 encaja mejor que un modelo que cuente cada endpoint.'

metadata:
  description: 'Dispositivos gestionados en RustDesk: los planes estándar cuentan una vez cada equipo accesible; Customized V2, solo los asignados a un grupo o usuario.'
  keywords: 'qué cuenta como dispositivo gestionado, recuento de dispositivos en rustdesk, licencias rustdesk vs teamviewer, licencia de dispositivo con o sin supervisión, soporte puntual en rustdesk, licencias de soporte remoto para msp'
---

RustDesk Server Pro cuenta los usuarios con inicio de sesión autorizados y los dispositivos gestionados. En sus planes estándar, **cada dispositivo al que quieres acceder cuenta como un dispositivo gestionado, y se cuenta una sola vez.** El plan **[Customized V2](https://rustdesk.com/pricing#custom2)** cuenta de otra forma —solo cuentan los dispositivos que asignas a un grupo o a un usuario—, y por eso es el adecuado para un uso intensivo del soporte puntual.

## La respuesta corta

En los planes estándar, un «dispositivo gestionado» es cualquier equipo al que quieras poder acceder, y el servidor cuenta cada uno una sola vez. Da igual:

- si el dispositivo es **supervisado** (hay alguien delante) o **desatendido** (un servidor sin monitor, un quiosco o una estación de trabajo siempre encendida),
- si te vas a conectar **una vez** o **muchas**,
- con qué frecuencia accedes a él.

Si tu trabajo consiste sobre todo en soporte espontáneo y puntual, el recuento más restringido de **[Customized V2](https://rustdesk.com/pricing#custom2)**, que se explica a continuación, está pensado precisamente para ese caso.

## En detalle

Lo que cambia el recuento es el plan. En el plan **[Customized V2](https://rustdesk.com/pricing#custom2)**, la definición de dispositivo gestionado es más restringida: solo cuentan para tu número de dispositivos bajo licencia los dispositivos que **asignas a un grupo de dispositivos o a un usuario**. Los equipos a los que solo accedes para un soporte puntual, y que nunca asignas, no se cuentan ni se desactivan. Si prefieres que estos dispositivos sin asignar ni siquiera aparezcan en la consola, lo controla el [ajuste de cliente `register-device`](https://rustdesk.com/docs/es/self-host/client-configuration/advanced-settings/#register-device), que surte efecto cuando el número de conexiones simultáneas bajo licencia es 2 o más. En la práctica, una sesión de soporte rápido de este tipo solo muestra un ID y una contraseña de un solo uso para una única conexión con el usuario presente, así que una interacción realmente puntual nunca necesita una plaza permanente en tu flota. Si buena parte de tu trabajo es así, Customized V2 suele ser la mejor opción: escribe a [sales@rustdesk.com](mailto:sales@rustdesk.com) con tu caso para conocer las condiciones vigentes o consulta [rustdesk.com/pricing](https://rustdesk.com/pricing).

Por ejemplo, imagina un [MSP](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable) con 20 técnicos que da soporte a unos 1.000 equipos de clientes: tendría que cubrir **las dos** dimensiones de la licencia, es decir, suficientes usuarios con inicio de sesión para los 20 técnicos y suficientes dispositivos gestionados para los equipos que se mantienen accesibles. Para los endpoints que son de verdad llamadas de soporte puntuales, se aplica la regla de Customized V2 anterior; los cupos vigentes están en [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Las conexiones simultáneas son una unidad de licencia aparte

Los planes estándar de Server Pro (Individual, Basic, Customized) incluyen conexiones simultáneas ilimitadas; solo [Customized V2](https://rustdesk.com/pricing#custom2) se licencia por un número determinado. Según la [definición de conexiones simultáneas](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections) de RustDesk, una conexión simultánea es un dispositivo de control activo, un «canal», y no cada pestaña de sesión saliente: un equipo de técnico con cinco pestañas de sesión usa un canal, y tres equipos de control activos a la vez usan tres. En Customized V2, dimensiona por separado los usuarios con inicio de sesión, los dispositivos gestionados y los canales.

## Quién pregunta esto

Cualquiera que intente traducir un número de puestos de TeamViewer o AnyDesk a las unidades de RustDesk se encuentra primero con esta definición, porque las unidades de licencia no se corresponden una a una. Los planes de pago de RustDesk requieren capacidad tanto para las personas que inician sesión como para los dispositivos que se mantienen bajo gestión.

## Preguntas relacionadas

- Licencias por usuario frente a por dispositivo, conexiones simultáneas y recuento de dispositivos en Server Pro: consulta los [precios de RustDesk](https://rustdesk.com/pricing).
- [¿Vienes de TeamViewer? Cómo se comparan los precios de RustDesk para un MSP](/es/blog/rustdesk-vs-teamviewer-la-alternativa-autoalojada)

¿Estás dimensionando una flota y no sabes si las llamadas de soporte puntuales deben entrar en tu recuento de dispositivos? Consulta las condiciones vigentes en [rustdesk.com/pricing](https://rustdesk.com/pricing) o pregunta al equipo antes de comprar.
