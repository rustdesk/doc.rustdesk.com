---
publishDate: 2026-06-30T13:46:00Z
lang: 'es'
translationKey: 'rustdesk-unknown-devices-antivirus-scanning'
draft: false
title: '¿Dispositivos desconocidos en tu consola de RustDesk? Investiga primero'
excerpt: '¿Ves dispositivos desconocidos en tu consola de RustDesk? El sandboxing de antivirus es una posibilidad, pero antes hay que descartar una configuración filtrada o un registro no autorizado.'
image: '~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.png'
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Seguridad']
author: 'RustDesk Team'
slug: 'dispositivos-desconocidos-en-tu-consola-de-rustdesk-investiga-primero'
faq:
  - question: '¿Por qué aparecen en mi consola de RustDesk dispositivos desconocidos que nunca instalé?'
    answer: 'El sandboxing de antivirus o de protección de endpoints puede crear registros temporales, pero un dispositivo desconocido también puede deberse a una configuración filtrada, un token de implementación expuesto, un registro no autorizado o un error de implementación. Trátalo como un incidente de seguridad hasta que los logs, las credenciales, las claves, los tokens y el historial de implementación identifiquen la causa; después restringe la inscripción de nuevos dispositivos.'
  - question: '¿Cómo evito por completo que se registren dispositivos desconocidos?'
    answer: 'Si tu lista de dispositivos es estable y no agregas máquinas con regularidad, desactiva el registro de nuevos dispositivos en la consola, en Settings → Others → Disable new devices on web console. A partir de ese momento, nada nuevo podrá registrarse, ya sea desde un sandbox o no. Si aún incorporas dispositivos con regularidad, usa en su lugar un token de implementación para que las implementaciones reales sigan funcionando.'
  - question: '¿Cómo exijo un token de implementación para los dispositivos nuevos?'
    answer: 'Activa Settings → Others → Require deployment for new devices en la consola web, crea un token de API con el permiso Devices configurado como Read and write, y haz que tu proceso de instalación ejecute rustdesk --deploy --token <api_token> en cada dispositivo nuevo (con sudo en macOS y Linux). Solo los dispositivos que presenten un token válido pueden registrarse, de modo que un análisis de antivirus en sandbox no puede añadirse a sí mismo, mientras que tu RMM o tu implementación mediante script sigue funcionando con normalidad.'
  - question: '¿Cómo distingo un análisis de antivirus benigno de una intrusión real?'
    answer: 'Un registro de corta duración que coincide con un análisis de seguridad conocido y no muestra ninguna sesión posterior puede respaldar la explicación del sandbox. Las sesiones inesperadas, la inscripción repetida, el uso de credenciales válidas o un cliente configurado que se distribuye fuera de su canal previsto no son benignos y requieren una respuesta ante incidentes.'

metadata:
  description: 'Los dispositivos desconocidos en tu consola de RustDesk requieren investigación. Aprende a distinguir el sandboxing de antivirus de una configuración filtrada o un registro no autorizado.'
  keywords: 'dispositivo desconocido rustdesk, dispositivo fantasma rustdesk, registro aleatorio de dispositivos rustdesk, sandbox de antivirus rustdesk, desactivar nuevos dispositivos rustdesk, rustdesk --deploy'
---

Un dispositivo desconocido en la consola de RustDesk no basta por sí solo para identificar su causa. El sandboxing de antivirus es una posibilidad conocida, pero el mismo síntoma puede deberse a una configuración filtrada, una inscripción no autorizada, un token expuesto o un error de implementación.

## La respuesta corta

Algunos productos de antivirus/EDR ejecutan binarios desconocidos en sandboxes en la nube. Si un sandbox recibe una compilación del cliente que contiene la configuración de tu servidor y puede alcanzar el servidor de ID, es posible que se registre brevemente. Sin embargo, una dirección IP de un proveedor de nube o un nombre de hardware inusual **no** demuestra esta explicación; los atacantes también usan servidores en la nube. Conserva y revisa la evidencia antes de descartar el incidente.

## En detalle

### Por qué ocurre esto

Los clientes de RustDesk pueden registrarse con el servidor de ID/rendezvous configurado cuando se ejecutan y pueden alcanzarlo. Esto hace que la ejecución en sandbox sea una causa plausible, como se explica en un [hilo público de GitHub](https://github.com/rustdesk/rustdesk-server-pro/discussions/307), pero también significa que cualquiera que obtenga un cliente configurado o material de implementación válido puede producir un registro similar.

Antes de clasificar el incidente, revisa los logs de registro y conexión del servidor, la hora de primera aparición del dispositivo y su IP de origen, el historial de implementación y la ruta de distribución de los clientes personalizados. Rota las contraseñas expuestas, los tokens de API/implementación y la configuración o las claves del servidor según corresponda. Comprueba si las mismas credenciales se reutilizaron en otro lugar y si el dispositivo desconocido intentó o completó alguna sesión.

### Cómo detenerlo

Dos ajustes de la consola resuelven esto, y cuál te conviene depende de si todavía estás incorporando activamente dispositivos nuevos reales.

**Opción 1 — desactivar por completo el registro de nuevos dispositivos.** Si tu lista de dispositivos es básicamente estable y no agregas máquinas con regularidad, esta es la solución más simple: ve a **Settings → Others → Disable new devices on web console**. A partir de ahí, nada nuevo podrá registrarse, ya sea desde un sandbox o no.

**Opción 2 — exigir un token de implementación.** Si todavía estás implementando dispositivos nuevos con regularidad (un MSP incorporando clientes, un equipo de TI instalando imágenes en máquinas nuevas), un ajuste general de «desactivar nuevos dispositivos» se convierte en un obstáculo para tu propio trabajo. En su lugar, activa **Settings → Others → Require deployment for new devices**, crea un token de API (permiso Devices, Read and write) y haz que tu proceso de instalación ejecute el [comando de implementación](https://rustdesk.com/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) documentado en cada dispositivo:

```
rustdesk --deploy --token <api_token>
```

La opción exacta puede cambiar entre versiones, así que trata esto como algo ilustrativo y verifica la sintaxis actual en la documentación de RustDesk Server Pro antes de incluirla en un script. Solo un dispositivo que presente un token válido se añade a tu inventario. Un análisis de antivirus en sandbox — que no tiene forma de conocer ni proporcionar ese token — no logra registrarse, mientras que tu implementación real sigue funcionando con normalidad. Este es también el mecanismo que usan los MSP para inscribir dispositivos mediante RMM o una instalación por script, sin que un técnico tenga que iniciar sesión manualmente en cada máquina.

**Un control relacionado y más específico:** si prefieres dejar el registro abierto pero simplemente mantener los dispositivos no asignados fuera de la vista hasta que los hayas revisado, también existe **Settings → Others → Only admin can access unassigned devices** — esto no detiene el registro, pero sí evita que los usuarios normales vean o puedan tocar cualquier cosa que aparezca antes de que hayas tenido la oportunidad de revisarla.

### Cómo evaluar el resultado

El registro por sí solo no demuestra que un atacante haya controlado otro endpoint, pero sigue siendo una actividad no autorizada hasta que se explique. Un registro de corta duración que coincide con un análisis de seguridad conocido y no muestra ningún acceso posterior puede respaldar la hipótesis del sandbox. Las sesiones inesperadas, la inscripción repetida, el uso de credenciales válidas o la distribución de un cliente configurado fuera de su canal previsto requieren una respuesta ante incidentes.

## Quién pregunta esto

Los nuevos operadores de servidores — tanto administradores de TI como MSP — suelen encontrarse con esto pocos días después de poner en marcha un servidor autoalojado, antes de haber reforzado los controles de registro. Investigar a tiempo importa porque un análisis benigno y una inscripción no autorizada pueden parecer similares en la consola.

## Preguntas relacionadas

- Generar un cliente personalizado con tu marca: consulta la [documentación de RustDesk](https://rustdesk.com/docs).
- [¿Qué se considera un dispositivo administrado en RustDesk?](/es/blog/que-cuenta-como-un-dispositivo-administrado-en-rustdesk)
- [Consulta las versiones actuales de RustDesk y las correcciones de seguridad](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk para MSP: una única herramienta autoalojada y de marca blanca](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable)
  ¿Ves un dispositivo que no reconoces? Conserva los logs relevantes, restringe la inscripción de nuevos dispositivos, rota cualquier secreto que pueda estar expuesto y ponte en contacto con el soporte de RustDesk con detalles de diagnóstico no sensibles si la causa sigue sin estar clara.
