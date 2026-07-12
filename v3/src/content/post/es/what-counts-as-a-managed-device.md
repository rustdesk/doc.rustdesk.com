---
publishDate: 2026-07-02T14:43:00Z
lang: 'es'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: '¿Qué cuenta como un dispositivo administrado en RustDesk?'
excerpt: 'En los planes estándar de RustDesk, cada dispositivo que configuras para acceder cuenta una sola vez. Customized V2 solo cuenta los dispositivos asignados a un grupo o usuario; los dispositivos ad hoc no se cuentan.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.png
category: 'Precios'
tags: ['RustDesk', 'Precios', 'Licencias']
author: 'RustDesk Team'
slug: 'que-cuenta-como-un-dispositivo-administrado-en-rustdesk'
faq:
  - question: '¿Cómo cuenta RustDesk los dispositivos administrados?'
    answer: 'En los planes estándar, cada dispositivo que configuras para acceder cuenta como un dispositivo administrado, una sola vez, ya sea atendido o no atendido, y sin importar si te conectas una vez o mil veces. Customized V2 cuenta de forma diferente: solo los dispositivos asignados a un grupo de dispositivos o a un usuario cuentan para tu número de dispositivos con licencia.'
  - question: '¿Cómo se cuentan los dispositivos de soporte puntual y ad hoc?'
    answer: 'En el plan Customized V2, solo los dispositivos asignados a un grupo de dispositivos o a un usuario cuentan como dispositivos administrados. Una máquina a la que te conectas una sola vez para brindar soporte espontáneo, y que nunca asignas, no se cuenta para tu número de dispositivos con licencia y no se deshabilita. Para el trabajo que es mayormente ad hoc, esto hace que Customized V2 sea una mejor opción que contar cada endpoint.'

metadata:
  description: 'Cómo cuenta RustDesk los dispositivos administrados: los planes estándar cuentan cada dispositivo accesible una vez; Customized V2 solo cuenta los dispositivos asignados a un grupo o usuario.'
  keywords: 'qué cuenta como dispositivo administrado, conteo de dispositivos en rustdesk, licencias rustdesk vs teamviewer, licencia de dispositivo atendido vs no atendido, soporte ad hoc en rustdesk, licenciamiento de soporte remoto para msp'
---

Si vienes del modelo por asiento de TeamViewer, la regla de conteo en los planes estándar de RustDesk resulta refrescantemente simple: **cada dispositivo al que quieras acceder cuenta como un dispositivo administrado, contado una sola vez.** El plan **[Customized V2](https://rustdesk.com/pricing#custom2)** cuenta de otra manera: solo cuentan los dispositivos que asignas a un grupo o usuario, lo que lo convierte en la opción adecuada para un soporte ad hoc intensivo.

## La respuesta breve

En los planes estándar, un "dispositivo administrado" es cualquier máquina a la que quieras poder acceder, y el servidor cuenta cada una una sola vez. No importa:

- si el dispositivo está **atendido** (alguien está sentado frente a él) o **no atendido** (un servidor sin monitor, un kiosco o una estación de trabajo siempre activa),
- si te conectarás **una vez** o **muchas veces**,
- con qué frecuencia accedes a él.

Si tu trabajo consiste principalmente en soporte espontáneo y puntual, el conteo más acotado de **[Customized V2](https://rustdesk.com/pricing#custom2)**, que se explica más abajo, está diseñado exactamente para ese caso.

## En detalle

Lo que _sí_ cambia las cosas es el plan. En el plan **[Customized V2](https://rustdesk.com/pricing#custom2)**, la definición de dispositivo administrado es más acotada: solo los dispositivos que **asignas a un grupo de dispositivos o a un usuario** cuentan para tu número de dispositivos con licencia. Las máquinas a las que accedes únicamente para soporte puntual y ad hoc, y que nunca asignas, no se cuentan ni se deshabilitan. Si prefieres que estos dispositivos sin asignar ni siquiera aparezcan en la consola, la [configuración de cliente `register-device`](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) controla eso, y entra en vigor una vez que el número de conexiones concurrentes con licencia es 2 o más. En la práctica, una sesión de soporte rápido de este tipo solo muestra un ID y una contraseña de un solo uso para una única conexión atendida, de modo que una interacción realmente puntual nunca necesita un espacio permanente en tu flota. Si gran parte de tu trabajo es así, Customized V2 suele ser la opción más adecuada; escribe a [sales@rustdesk.com](mailto:sales@rustdesk.com) con tu escenario para conocer las condiciones vigentes, o consulta [rustdesk.com/pricing](https://rustdesk.com/pricing).

Por ejemplo, imagina un [MSP](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable) con 20 técnicos que brindan soporte a aproximadamente 1000 máquinas de clientes: necesitaría cumplir con **ambas** dimensiones de licenciamiento: suficientes usuarios de inicio de sesión para los 20 técnicos y suficientes dispositivos administrados para las máquinas que se mantienen accesibles. Para los endpoints que son realmente llamadas de soporte puntuales, se aplica la regla de Customized V2 explicada arriba; los límites vigentes están en [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Quién pregunta esto

Cualquiera que intente traducir un conteo de asientos de TeamViewer o AnyDesk a las unidades de RustDesk se topa primero con esta definición, porque las unidades de licenciamiento no se corresponden una a una. Los planes pagos de RustDesk requieren capacidad tanto para las personas que inician sesión como para los dispositivos que se mantienen bajo administración.

## Preguntas relacionadas

- Licenciamiento por usuario vs. por dispositivo, conexiones simultáneas y conteo de dispositivos para Server Pro: consulta [precios de RustDesk](https://rustdesk.com/pricing).
- [¿Vienes de TeamViewer? ¿Cómo se compara el precio de RustDesk para MSP?](/es/blog/rustdesk-vs-teamviewer-la-alternativa-autoalojada)

¿Estás dimensionando tu flota y no estás seguro de si las llamadas de soporte puntuales deben incluirse en tu conteo de dispositivos? Consulta las condiciones vigentes en [rustdesk.com/pricing](https://rustdesk.com/pricing) o pregúntale al equipo antes de comprar.
