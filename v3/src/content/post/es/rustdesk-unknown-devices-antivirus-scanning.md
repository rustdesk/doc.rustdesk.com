---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-30T13:46:00Z
lang: 'es'
translationKey: 'rustdesk-unknown-devices-antivirus-scanning'
draft: false
title: '¿Dispositivos desconocidos en tu consola de RustDesk? Investiga primero'
excerpt: '¿Ves dispositivos desconocidos en tu consola de RustDesk? El sandbox de un antivirus es una posibilidad, pero antes hay que descartar una configuración filtrada o un registro no autorizado.'
image: '~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.webp'
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Seguridad']
author: 'RustDesk Team'
slug: 'dispositivos-desconocidos-en-tu-consola-de-rustdesk-investiga-primero'
faq:
  - question: '¿Por qué aparecen en mi consola de RustDesk dispositivos desconocidos que nunca he instalado?'
    answer: 'El sandbox de un antivirus o de una solución de protección de endpoints puede crear registros temporales, pero un dispositivo desconocido también puede indicar una configuración filtrada, un token de despliegue expuesto, un registro no autorizado o un error de despliegue. Trátalo como un incidente de seguridad hasta que los logs, las credenciales, las claves, los tokens y el historial de despliegue identifiquen la causa; después, restringe el alta de dispositivos nuevos.'
  - question: '¿Cómo impido por completo que se registren dispositivos desconocidos?'
    answer: 'Si tu lista de dispositivos es estable y no añades equipos con frecuencia, desactiva el registro de dispositivos nuevos en la consola, en Configuración → Otros → Desactivar dispositivos nuevos en la consola web (Disable new devices on web console). A partir de ahí no se puede registrar nada nuevo, venga o no de un sandbox. Si sigues incorporando dispositivos con regularidad, usa en su lugar un token de despliegue para que los despliegues reales sigan funcionando.'
  - question: '¿Cómo exijo un token de despliegue para los dispositivos nuevos?'
    answer: 'Activa Configuración → Otros → Requerir despliegue para nuevos dispositivos, crea un token de API con el permiso Dispositivos en Lectura y escritura y ejecuta rustdesk --deploy --token <api_token> durante la instalación autorizada (con sudo en macOS y Linux). Un sandbox no puede usar esta vía de alta salvo que también consiga el token. No incluyas los tokens en clientes distribuidos ni en scripts públicos, limita sus permisos y rota los que hayan quedado expuestos.'
  - question: '¿Cómo distingo un análisis antivirus inofensivo de una intrusión real?'
    answer: 'Un registro de corta duración que coincide con un análisis de seguridad conocido y no va seguido de ninguna sesión puede respaldar la explicación del sandbox. Las sesiones inesperadas, las altas repetidas, el uso de credenciales válidas o un cliente configurado distribuido fuera de su canal previsto no son inofensivos y requieren una respuesta ante incidentes.'

metadata:
  description: 'Dispositivos desconocidos en tu consola de RustDesk: cómo distinguir el sandbox de un antivirus de una configuración filtrada o un registro no autorizado.'
  keywords: 'dispositivo desconocido rustdesk, dispositivo fantasma rustdesk, registro aleatorio de dispositivos rustdesk, sandbox de antivirus rustdesk, desactivar nuevos dispositivos rustdesk, rustdesk --deploy'
---

Un dispositivo desconocido en la consola de RustDesk no basta para identificar su causa. El sandbox de un antivirus es una posibilidad conocida, pero el mismo síntoma puede deberse a una configuración filtrada, un alta no autorizada, un token expuesto o un error de despliegue.

## La respuesta corta

Algunos productos antivirus y EDR ejecutan binarios desconocidos en sandboxes en la nube. Si un sandbox recibe una compilación del cliente que contiene la configuración de tu servidor y puede llegar al servidor de ID, es posible que se registre brevemente. Sin embargo, una dirección IP de un proveedor de nube o un nombre de hardware poco habitual **no** demuestran esta explicación: los atacantes también usan servidores en la nube. Conserva y revisa las pruebas antes de descartar el incidente.

## En detalle

### Por qué ocurre

Los clientes de RustDesk pueden registrarse en el servidor de ID/rendezvous configurado cuando se ejecutan y pueden alcanzarlo. Eso hace que la ejecución en un sandbox sea una causa plausible, como se comenta en un [hilo público de GitHub](https://github.com/rustdesk/rustdesk-server-pro/discussions/307), pero también significa que cualquiera que consiga un cliente configurado o material de despliegue válido puede producir un registro similar.

Antes de clasificar el incidente, revisa los logs de registro y de conexión del servidor, la hora en que apareció el dispositivo por primera vez y su IP de origen, el historial de despliegues y la vía de distribución de los clientes personalizados. Rota, según corresponda, las contraseñas expuestas, los tokens de API o de despliegue y la configuración o las claves del servidor. Comprueba si las mismas credenciales se han reutilizado en otros sitios y si el dispositivo desconocido intentó o llegó a completar alguna sesión.

### Cómo detenerlo

Hay dos ajustes de la consola que lo resuelven, y cuál te conviene depende de si sigues incorporando dispositivos nuevos reales.

**Opción 1: desactivar por completo el registro de dispositivos nuevos.** Si tu lista de dispositivos es básicamente estable y no añades equipos con frecuencia, es la solución más sencilla: ve a **Configuración → Otros → Desactivar dispositivos nuevos en la consola web** (_Disable new devices on web console_). A partir de ahí no se puede registrar nada nuevo, venga o no de un sandbox.

**Opción 2: exigir un token de despliegue.** Si sigues desplegando dispositivos nuevos con regularidad (un MSP que incorpora clientes, un equipo de TI que prepara imágenes para equipos nuevos), un ajuste general de «desactivar dispositivos nuevos» te estorba a ti mismo. En su lugar, activa **Configuración → Otros → Requerir despliegue para nuevos dispositivos**, crea un token de API (permiso **Dispositivos**, **Lectura y escritura**) y haz que tu proceso de instalación ejecute en cada dispositivo el [comando de despliegue](https://rustdesk.com/docs/es/self-host/client-deployment/#despliegue-explícito-para-nuevos-dispositivos) documentado:

```
rustdesk --deploy --token <api_token>
```

La [documentación de despliegue](https://rustdesk.com/docs/es/self-host/client-deployment/#despliegue-explícito-para-nuevos-dispositivos) especifica esta vía de alta. Exigir un token puede bloquear un sandbox que solo recibe el cliente configurado, **siempre que el token no esté incluido en ese cliente ni en su material de instalación**. Un sandbox o un atacante con un token válido sí puede darse de alta. Protege la distribución de los tokens, usa los permisos mínimos necesarios y rota un token si ha podido filtrarse.

**Un control relacionado, más limitado:** si prefieres dejar abierto el registro pero mantener fuera de la vista los dispositivos sin asignar hasta revisarlos, también existe **Configuración → Otros → Solo el administrador puede acceder a dispositivos no asignados** (_Only admin can access unassigned devices_). No impide el registro, pero los usuarios normales no podrán ver ni tocar nada de lo que aparezca antes de que hayas podido revisarlo.

### Cómo evaluar el resultado

El registro por sí solo no demuestra que un atacante haya controlado otro endpoint, pero sigue siendo una actividad no autorizada mientras no se explique. Un registro de corta duración que coincide con un análisis de seguridad conocido y no va seguido de ningún acceso puede respaldar la hipótesis del sandbox. Las sesiones inesperadas, las altas repetidas, el uso de credenciales válidas o la distribución de un cliente configurado fuera de su canal previsto requieren una respuesta ante incidentes.

## Quién pregunta esto

Quienes empiezan a operar un servidor, tanto administradores de TI como MSP, suelen toparse con esto a los pocos días de montar un servidor autoalojado, antes de haber reforzado los controles de registro. Investigar pronto importa, porque en la consola un análisis inofensivo y un alta no autorizada pueden parecer iguales.

## Preguntas relacionadas

- Generar un cliente personalizado con tu marca: consulta la [documentación de RustDesk](https://rustdesk.com/docs).
- [¿Qué cuenta como dispositivo gestionado en RustDesk?](/es/blog/que-cuenta-como-un-dispositivo-administrado-en-rustdesk)
- [Consulta las versiones actuales de RustDesk y sus correcciones de seguridad](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk para MSP: una única herramienta autoalojada y con tu marca](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable)

¿Ves un dispositivo que no reconoces? Conserva los logs relevantes, restringe las altas nuevas, rota cualquier secreto que haya podido quedar expuesto y, si la causa sigue sin estar clara, ponte en contacto con el soporte de RustDesk aportando datos de diagnóstico no sensibles.
