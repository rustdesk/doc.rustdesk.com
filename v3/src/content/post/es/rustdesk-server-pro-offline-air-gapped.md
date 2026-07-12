---
publishDate: 2026-06-28T16:50:00Z
lang: 'es'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: '¿Puede RustDesk Server Pro funcionar sin conexión o en modo air-gapped?'
excerpt: 'No: RustDesk Server Pro autoalojado necesita acceso saliente continuo a rustdesk.com para validar su licencia, por lo que no se admite una implementación completamente air-gapped.'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.png
category: 'Implementación'
tags: ['RustDesk', 'Implementación', 'Autoalojamiento']
author: 'RustDesk Team'
slug: 'puede-rustdesk-server-pro-funcionar-sin-conexion-o-en-modo-air-gapped'
faq:
  - question: '¿Puede RustDesk Server Pro funcionar sin conexión o en modo air-gapped?'
    answer: 'No. La versión con licencia de Server Pro debe mantener una conexión saliente a rustdesk.com para validar su licencia mientras se ejecuta, por lo que no se admite una implementación completamente air-gapped que nunca se comunique con el exterior. Aun así, puedes restringir estrictamente el tráfico saliente y enrutarlo a través de un proxy.'
  - question: '¿Necesita RustDesk Server Pro una conexión a internet permanente?'
    answer: 'Necesita acceso saliente continuo a rustdesk.com para la validación de la licencia, pero no una conexión literalmente ininterrumpida. El servidor se conecta a través del puerto 443 aproximadamente una vez al día y, si una verificación falla, sigue reintentándolo hasta que tiene éxito o pasan unos siete días; por lo tanto, se tolera una interrupción breve, pero un servidor desconectado de rustdesk.com durante más tiempo que ese margen deja de validarse. Las sesiones remotas en sí son intermediadas por tus propios servidores de retransmisión (relay) e ID (rendezvous) autoalojados.'
  - question: '¿Qué acceso saliente necesita una implementación aislada de RustDesk Server Pro?'
    answer: 'Permite el tráfico HTTPS saliente desde el servidor hacia rustdesk.com para la validación de la licencia (y para el aprovisionamiento de clientes personalizados, si lo utilizas). Se admite el uso de un proxy, de modo que el resto de la red puede permanecer restringida. Confirma los dominios y puertos exactos en la documentación de RustDesk.'
  - question: '¿Existe una opción de licencia de RustDesk totalmente air-gapped?'
    answer: 'El producto estándar con licencia no está diseñado para un air gap que nunca se comunique con el exterior. Si tienes requisitos estrictos de air gap, confirma tu escenario exacto con RustDesk antes de comprometerte.'
metadata:
  description: '¿Puede RustDesk Server Pro autoalojado funcionar en modo air-gapped? No: la licencia Pro necesita acceso saliente continuo a rustdesk.com, por lo que no se admite un aislamiento total (air gap).'
  keywords: 'rustdesk server pro sin conexión, rustdesk air-gapped, rustdesk autoalojado requisito de internet, rustdesk server pro verificación de licencia, rustdesk implementación sin conexión, rustdesk necesita internet'
---

No: una implementación autoalojada de RustDesk Server Pro no está diseñada para funcionar completamente sin conexión o en modo air-gapped. La licencia Pro debe contactar con rustdesk.com mediante una conexión saliente para seguir siendo válida, tanto al activarla como de forma continua mientras el servidor está en funcionamiento, por lo que una red que nunca se comunique con el exterior queda fuera del modelo compatible.

## La respuesta corta

En la práctica, la verificación es periódica y no constante: el servidor contacta con rustdesk.com a través del puerto 443 aproximadamente una vez al día y, si una verificación falla, reintenta hasta que tiene éxito o transcurren unos siete días, momento en el que la licencia deja de validarse. Ese margen de gracia integrado significa que una interrupción breve de internet no romperá tu implementación de inmediato, pero un servidor permanentemente desconectado sí lo hará. Tus servicios de ID y de retransmisión (relay) siguen siendo autoalojados: las sesiones directas fluyen entre los extremos y las sesiones retransmitidas utilizan tu propio relay. Puedes mantener la red estrictamente restringida: se admite el uso de un proxy, de modo que en la práctica solo permites la vía HTTPS saliente necesaria y bloqueas el resto.

## En detalle

El servidor RustDesk de código abierto, que puedes autoalojar sin necesidad de licencia, es un caso distinto; el requisito aquí se aplica específicamente al conjunto de funciones de **Server Pro con licencia**. Si tu objeción se centra fundamentalmente en mantener los datos de las sesiones en tu propia infraestructura, el autoalojamiento ya lo consigue: el requisito de conexión saliente tiene que ver con la licencia, no con la intermediación de cada sesión.

Hay un segundo flujo de trabajo a tener en cuenta: **la creación de un cliente personalizado**. Si generas un cliente personalizado o preconfigurado desde Server Pro, ese paso de aprovisionamiento también requiere acceso saliente. Confirma el comportamiento actual para tu versión y tu plan.

Para una red estrictamente air-gapped, este es el detalle decisivo. Un servidor verdaderamente aislado que _nunca_ pueda contactar con rustdesk.com queda fuera del modelo predeterminado, así que, si tienes requisitos estrictos de air gap, confirma tu escenario exacto con RustDesk antes de comprometerte. Para la configuración mucho más habitual de "mayormente aislada, con salida restringida", la conclusión práctica es prever una única vía HTTPS saliente hacia rustdesk.com (directamente o a través de un proxy) y definir los dominios, puertos y flujo de aprobación exactos antes de redactar la política del firewall. Consulta la [documentación de RustDesk](https://rustdesk.com/docs) y ten en cuenta que ese mismo requisito de licencia es la razón por la que [no puedes ejecutar Server Pro sin ningún acceso a internet, incluso al instalarlo sin Docker](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/installscript/).

## Quién pregunta esto

Los operadores de redes aisladas o reguladas se hacen esta pregunta incluso antes de instalar RustDesk: tanto los equipos de seguridad como los [MSP](/es/blog/rustdesk-para-msp-una-unica-herramienta-autoalojada-y-personalizable) que atienden entornos restringidos. Sus redes pueden estar protegidas por firewalls de salida estrictos, o simplemente quieren minimizar las dependencias externas. Saber que la licencia necesita una vía de salida continua, pero solo eso, les permite redactar una regla de firewall precisa, en lugar de abrir la red más de lo necesario o de asumir erróneamente que el producto funcionará en un vacío total.

## Preguntas relacionadas

- Dominios y puertos de salida: consulta la [documentación de RustDesk](https://rustdesk.com/docs).
- [¿Puedo instalar RustDesk Server Pro sin Docker en una VM sencilla?](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/installscript/)
- Generar un cliente personalizado con tu marca: consulta la [documentación de RustDesk](https://rustdesk.com/docs).

¿Estás planificando una implementación restringida o casi air-gapped? Confirma los detalles actuales de conectividad y licencia en rustdesk.com antes de finalizar tu política de firewall.
