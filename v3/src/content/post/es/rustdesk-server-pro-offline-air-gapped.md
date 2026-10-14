---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-28T16:50:00Z
lang: 'es'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: '¿Puede RustDesk Server Pro funcionar sin conexión o en modo air-gapped?'
excerpt: 'No: RustDesk Server Pro autoalojado necesita acceso saliente continuo a rustdesk.com para validar su licencia, así que no se admite un despliegue completamente aislado.'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Autoalojamiento']
author: 'RustDesk Team'
slug: 'puede-rustdesk-server-pro-funcionar-sin-conexion-o-en-modo-air-gapped'
faq:
  - question: '¿Puede RustDesk Server Pro funcionar sin conexión o en modo air-gapped?'
    answer: 'No. RustDesk Server Pro comprueba su licencia con rustdesk.com mediante HTTPS saliente (puerto 443) aproximadamente una vez al día y, si una comprobación falla, sigue reintentándolo durante unos 7 días, así que un despliegue de Pro aislado de forma permanente queda fuera del modelo de licencias estándar. Se admite el uso de un proxy. RustDesk Server OSS, el servidor comunitario gratuito, no tiene comprobación de licencia.'
  - question: '¿Necesita RustDesk Server Pro una conexión a internet permanente?'
    answer: 'Necesita acceso saliente continuo a rustdesk.com para validar la licencia, pero no una conexión literalmente ininterrumpida. El servidor se comunica por el puerto 443 aproximadamente una vez al día y, si una comprobación falla, sigue reintentándolo hasta que lo consigue o pasan unos siete días; por eso tolera un corte breve, pero un servidor sin acceso a rustdesk.com durante más tiempo que ese margen deja de validar la licencia. Las sesiones remotas en sí las coordinan tus propios servidores autoalojados de relay e ID (rendezvous).'
  - question: '¿Qué acceso saliente necesita un despliegue aislado de RustDesk Server Pro?'
    answer: 'Permite el HTTPS saliente desde el servidor hacia rustdesk.com para validar la licencia, además del servicio de compilación de clientes personalizados si generas clientes con tu marca. Se admite un proxy, así que el resto de la red puede seguir cerrado. Otros flujos salientes que conviene planificar son las actualizaciones de los clientes y cualquier proveedor de identidad externo que conectes.'
  - question: '¿Existe una opción de licencia de RustDesk totalmente air-gapped?'
    answer: 'No. La licencia estándar de RustDesk Server Pro requiere una verificación periódica en línea. RustDesk Server OSS, el servidor comunitario gratuito, no tiene comprobación de licencia: sus servicios de ID/rendezvous y relay funcionan dentro de una red aislada, sin la consola web ni las funciones de gestión de Pro. Si necesitas un aislamiento total con Pro, escribe a sales@rustdesk.com y describe tu caso.'
metadata:
  description: '¿RustDesk Server Pro funciona en modo air-gapped? No: la licencia Pro necesita acceso saliente continuo a rustdesk.com, por eso no admite un aislamiento total.'
  keywords: 'rustdesk server pro sin conexión, rustdesk air-gapped, rustdesk autoalojado requisito de internet, rustdesk server pro verificación de licencia, rustdesk implementación sin conexión, rustdesk necesita internet'
---

No: un despliegue autoalojado de RustDesk Server Pro no está diseñado para funcionar completamente sin conexión ni en modo air-gapped. La licencia Pro tiene que llegar a rustdesk.com mediante una conexión saliente para seguir siendo válida, tanto al activarla como de forma continuada mientras el servidor está en marcha, así que una red completamente aislada queda fuera del modelo admitido.

## La respuesta corta

Las [preguntas frecuentes oficiales sobre la comprobación de licencia](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) describen una verificación periódica: el servidor contacta con rustdesk.com por el puerto 443 aproximadamente una vez al día y, si una comprobación falla, reintenta hasta que lo consigue o pasan unos siete días, momento a partir del cual la licencia deja de validarse. Ese margen de gracia integrado significa que un corte breve de internet no romperá tu despliegue de inmediato, pero un servidor desconectado de forma permanente sí. Tus servicios de ID y relay siguen siendo autoalojados: las sesiones directas fluyen entre los endpoints y las sesiones por relay usan tu relay. Se admite un proxy, así que puedes permitir la ruta HTTPS saliente necesaria y cerrar el resto de la red.

## En detalle

Este requisito afecta a **Server Pro**. **RustDesk Server OSS (el servidor comunitario gratuito)** no tiene comprobación de licencia. El cliente y Server OSS de RustDesk tienen licencia AGPL; Server Pro es software de servidor autoalojado, comercial y propietario. En una red aislada, los clientes y los servicios locales de ID/relay siguen necesitando rutas que funcionen, las claves correctas y los permisos de cada plataforma. Las sesiones directas negociadas por ID viajan entre los endpoints; las sesiones por relay usan tu servidor. Las sesiones basadas en ID están cifradas de extremo a extremo cuando los clientes llevan la clave pública de tu servidor, mientras que [Direct IP Access no va cifrado](https://github.com/rustdesk/rustdesk/wiki/FAQ), así que no sustituye a una conexión por ID bien configurada.

Hay otro flujo de trabajo que tener en cuenta: **la compilación de un cliente personalizado**. Si generas desde Server Pro un cliente con tu marca o preconfigurado, esa compilación se ejecuta en el servicio de compilación de RustDesk, así que también necesita acceso saliente. La configuración enviada se elimina en cuanto termina la compilación y el instalador se borra automáticamente al cabo de aproximadamente un día, así que descárgalo y guárdalo en tu propio repositorio.

Para una red estrictamente aislada, este es el detalle decisivo: un servidor que _nunca_ pueda llegar a rustdesk.com queda fuera del modelo predeterminado, así que, si tienes requisitos estrictos de aislamiento total, confirma tu caso concreto con RustDesk antes de comprometerte. Para la configuración mucho más habitual de «red casi aislada con salida muy restringida», prevé una única ruta HTTPS saliente hacia rustdesk.com —directa o a través de un proxy— y define los dominios, puertos y el flujo de aprobación exactos antes de redactar la política del firewall. Consulta la [documentación de RustDesk](https://rustdesk.com/docs) y ten en cuenta que ese mismo requisito de licencia es la razón por la que [no puedes ejecutar Server Pro sin ningún acceso a internet, ni siquiera instalándolo sin Docker](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/installscript/).

## Haz inventario de todas las dependencias salientes

Los equipos de seguridad y los [MSP](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable) que trabajan en entornos cerrados suelen preguntarlo antes de instalar RustDesk. Su lista de salidas de Server Pro es corta: la validación de la licencia con rustdesk.com por HTTPS, el servicio de compilación de clientes personalizados si generas clientes con tu marca, las actualizaciones de los clientes, SMTP si tu servidor de correo está fuera de la red y cualquier proveedor de identidad externo que conectes. El servidor de ID/rendezvous, el relay y la consola se ejecutan dentro de tu red, así que basta con una regla de firewall precisa en lugar de abrir la red de más.

## Preguntas relacionadas

- Dominios y puertos de salida: consulta la [documentación de RustDesk](https://rustdesk.com/docs).
- [¿Puedo instalar RustDesk Server Pro sin Docker en una máquina virtual normal?](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/installscript/)
- Generar un cliente con tu marca: consulta la [documentación de RustDesk](https://rustdesk.com/docs).

¿Estás planificando un despliegue cerrado o casi aislado? Abre la ruta de la licencia y los flujos salientes que realmente uses, deja todo lo demás en la red interna y escribe a [sales@rustdesk.com](mailto:sales@rustdesk.com) si tu requisito es un aislamiento total permanente.
