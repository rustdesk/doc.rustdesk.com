---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T10:47:00Z
lang: 'es'
translationKey: 'rustdesk-scale-50000-200000-devices'
draft: false
title: '¿Puede RustDesk escalar a 200.000 dispositivos?'
excerpt: 'Contexto operativo de primera mano de RustDesk para planificar flotas grandes: qué muestra la observación del servidor público y qué debe validar todavía un despliegue autoalojado.'
image: '~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.webp'
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Empresa']
author: 'RustDesk Team'
slug: 'puede-rustdesk-escalar-a-200-000-dispositivos'
faq:
  - question: '¿Cuántos dispositivos puede gestionar un servidor RustDesk autoalojado?'
    answer: 'El servidor público de RustDesk registró más de dos millones de endpoints en línea en un único host de 12 núcleos y 32 GB el 7 de julio de 2026 (telemetría interna, no un benchmark auditado). Para RustDesk Server Pro, toma 200.000 dispositivos como objetivo de planificación y valida en un piloto la carga de la base de datos, la consola y el relay.'
  - question: '¿Qué hay que ajustar para llegar a 200.000 dispositivos?'
    answer: 'Con 200.000 dispositivos, lo que más importa son las escrituras en la base de datos, la capacidad del relay y la carga de la consola. Haz pruebas de carga de RustDesk Server Pro por etapas para los cambios de estado de los dispositivos en línea, las sesiones remotas simultáneas, el ancho de banda del relay, la caché, el rendimiento de escritura de la base de datos y la actividad de la consola de gestión, con tu propia carga de trabajo y no solo con la presencia de endpoints.'
  - question: '¿Admite RustDesk Server Pro alta disponibilidad o balanceo de carga?'
    answer: 'Sí, para los relays: RustDesk Server Pro admite varios servidores relay distribuidos por región, y los relays hbbr no necesitan licencia. Una licencia Pro se vincula a un único servidor hbbs (ID/rendezvous), así que la alta disponibilidad del servidor de ID y de la base de datos es una cuestión de diseño; planifica la conmutación por error y la recuperación con RustDesk antes del despliegue.'

metadata:
  description: 'Contexto operativo de RustDesk para planificar 200.000 dispositivos y las variables de carga que debe validar un despliegue autoalojado de Server Pro.'
  keywords: 'rustdesk escalar 200000 dispositivos, rustdesk 50000 dispositivos, escalabilidad de servidor rustdesk autoalojado, despliegue empresarial de rustdesk, capacidad de rustdesk server pro, escritorio remoto para flotas grandes'
---

La telemetría interna de RustDesk registró **más de dos millones de endpoints en línea** en un único host del servidor público con una **CPU de 12 núcleos y 32 GB de RAM** el 7 de julio de 2026.

Dos salvedades definen su alcance. Primero, «endpoints en línea» son los dispositivos que figuraban como conectados en ese momento, no dos millones de sesiones de control remoto simultáneas. Segundo, es una observación interna de producción, no un benchmark auditado de forma independiente ni una garantía de Server Pro: un despliegue de Server Pro añade escrituras en la base de datos, actividad de auditoría, uso de la consola, procesamiento de políticas y tráfico de relay.

## La respuesta corta

**200.000 dispositivos en línea es un objetivo de planificación realista para Server Pro.** La observación del servidor público citada arriba está un orden de magnitud por encima, en un solo host de 12 núcleos y 32 GB. Lo que validas en un piloto es la carga que Server Pro añade a la mera presencia de endpoints: cambios de estado de los dispositivos, políticas, escrituras de auditoría, uso de la consola y sesiones retransmitidas simultáneas.

## En detalle

Las preguntas de escalabilidad están entre las más habituales que recibimos de equipos de TI que migran desde TeamViewer o AnyDesk, sobre todo de los que planifican flotas de decenas o cientos de miles de dispositivos. La respuesta depende de cuántos dispositivos permanecen en línea, con qué frecuencia cambia su estado, cuántas sesiones remotas hay a la vez y cuánto tráfico pasa por el relay.

En un despliegue de Server Pro, valida lo que la cifra del servidor público no cubre. La caché y el rendimiento de escritura de la base de datos importan a medida que los dispositivos se conectan y desconectan. El ancho de banda y la CPU del relay dependen del número, la duración, la resolución y el códec de las sesiones retransmitidas simultáneas. Las consultas de la consola, la retención de auditoría, los grupos de dispositivos, las políticas y las integraciones añaden una carga que la presencia de endpoints por sí sola no mide. Recoge en una prueba de carga representativa el número previsto de dispositivos en línea, la rotación de conexiones, las sesiones simultáneas directas y retransmitidas, la retención de la base de datos y la actividad administrativa.

Para un piloto de Server Pro repetible, anota las versiones de cliente y servidor, el hardware y la ubicación de la base de datos y del relay. Aumenta por etapas la presencia de dispositivos en línea y la rotación de conexiones mientras ejecutas las consultas de consola, los cambios de políticas y las escrituras de auditoría previstos. Mide la tasa de éxito de registro y reconexión, el tiempo de establecimiento de la conexión, la latencia de la base de datos, la CPU y la RAM, el crecimiento del disco y el caudal del relay. Incluye el pico de sesiones simultáneas y un ejercicio de recuperación, y mantén esas mediciones separadas de la cifra de endpoints en línea.

La alta disponibilidad y el balanceo de carga merecen el mismo tratamiento. Los relays escalan horizontalmente: puedes ejecutar varios y distribuirlos por región, y los relays hbbr no necesitan licencia. Una licencia Pro se vincula a un único servidor hbbs, así que diseña de forma explícita la conmutación por error del servidor de ID y de la base de datos, y revísala con RustDesk si tu flota es muy grande.

Después, dimensiona la licencia: Server Pro licencia usuarios con inicio de sesión y dispositivos gestionados, y los planes estándar incluyen conexiones simultáneas ilimitadas. Elige el nivel adecuado para tu flota en [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Quién pregunta esto

Los arquitectos que planifican despliegues plurianuales de flotas, en empresas, grandes [MSP](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable) y programas de TI del sector público, sitúan esta pregunta entre los primeros puntos de su lista de comprobaciones. Suelen estar dejando una herramienta comercial por motivos de coste o de soberanía de los datos, y necesitan confiar en que una plataforma autoalojada crecerá con ellos en lugar de toparse con un límite a mitad de contrato.

## Preguntas relacionadas

- Límites de conexiones simultáneas y licencias para grandes cantidades de dispositivos: consulta los [precios de RustDesk](https://rustdesk.com/pricing).
- [¿Puedo migrar una flota de TeamViewer o AnyDesk a RustDesk?](/es/blog/la-mejor-alternativa-autoalojada-a-teamviewer)

¿Planificas un despliegue a gran escala? Ponte en contacto con el [equipo de RustDesk](mailto:sales@rustdesk.com) para dimensionar un despliegue autoalojado según tu número de dispositivos, tus requisitos de rendimiento y tu calendario de crecimiento.
