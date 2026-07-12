---
publishDate: 2026-06-30T17:26:00Z
lang: 'es'
translationKey: is-anydesk-safe
draft: false
title: '¿Es seguro AnyDesk? Cifrado, el incidente de seguridad de 2024 y las estafas'
excerpt: '¿Es seguro AnyDesk? Un análisis imparcial de su cifrado, el incidente de seguridad de 2024 en sus sistemas de producción y por qué los estafadores lo utilizan, además de cómo se compara con el código abierto.'
image: ~/assets/images/blog/is-anydesk-safe-og.png
category: 'Seguridad'
tags: ['AnyDesk', 'Seguridad']
author: RustDesk Team
slug: 'es-seguro-anydesk-cifrado-el-incidente-de-seguridad-de-2024-y-las'
faq:
  - question: '¿Es seguro usar AnyDesk?'
    answer: 'Para un uso legítimo, AnyDesk es una herramienta de escritorio remoto comercial madura y, en general, segura. Cifra las sesiones con seguridad de transporte estándar y ofrece autenticación de dos factores y listas de control de acceso. Los dos aspectos que hay que tener en cuenta son que es de código cerrado y que, de forma predeterminada, intermedia las conexiones a través de la nube, y que su mayor peligro en la práctica no es un fallo de software, sino los estafadores de soporte técnico que convencen a las víctimas de instalarlo.'
  - question: '¿Hackearon a AnyDesk?'
    answer: 'A principios de 2024, AnyDesk reveló un incidente de seguridad que afectó a sus sistemas de producción, en el que los atacantes obtuvieron código fuente y material de firma de código. AnyDesk revocó certificados, publicó un cliente firmado de nuevo y restableció las contraseñas del portal web. La empresa afirmó que ningún dispositivo de usuario final se vio afectado. Confirma el alcance exacto y las fechas consultando los propios avisos de AnyDesk y coberturas informativas neutrales.'
  - question: '¿Por qué los estafadores usan AnyDesk?'
    answer: 'Como es gratuito, se instala en segundos y no requiere una cuenta para la persona controlada, AnyDesk es una herramienta favorita de los estafadores de soporte técnico, que llaman o envían correos a las víctimas y las convencen de conceder acceso remoto. Se trata de un riesgo de uso, no de una vulnerabilidad de AnyDesk: el mismo truco de ingeniería social funciona con cualquier herramienta de escritorio remoto, incluida RustDesk.'
  - question: '¿Es seguro el cifrado de AnyDesk?'
    answer: 'La documentación de seguridad de AnyDesk describe TLS 1.2 con AEAD, un intercambio de claves asimétrico RSA-2048 y cifrado de transporte AES de 256 bits, además de confidencialidad directa perfecta (perfect forward secrecy). Son protecciones estándar del sector. La salvedad es que estás confiando en un cliente de código cerrado y, de forma predeterminada, en la nube de AnyDesk para intermediar la conexión, por lo que dependes de la seguridad operativa del proveedor en lugar de poder auditar el código tú mismo.'
metadata:
  description: '¿Es seguro AnyDesk? Revisión documentada de su cifrado TLS/AES, el incidente de seguridad de 2024 en sus sistemas de producción, el abuso por parte de estafadores y las contrapartidas de ser de código cerrado.'
  keywords: 'es seguro AnyDesk, seguridad de AnyDesk, brecha de AnyDesk 2024, estafa de AnyDesk, cifrado de AnyDesk, es seguro usar AnyDesk, hackearon AnyDesk'
---

Respuesta rápida: sí, AnyDesk es un producto de escritorio remoto comercial legítimo y, en general, seguro para quienes lo usan de forma intencionada. Los riesgos que vale la pena entender no son que AnyDesk sea malware —no lo es—, sino que es de código cerrado, intermedia las conexiones a través de la nube de forma predeterminada, sufrió un incidente de seguridad notable en 2024 y es una de las herramientas que más adoran explotar los estafadores. A continuación, el panorama justo y documentado.

## La respuesta breve

AnyDesk protege sus sesiones con un cifrado estándar y bien valorado, y ofrece las protecciones de cuenta que cabría esperar. Lo utilizan a diario equipos de soporte técnico y empresas sin incidentes. Hay dos salvedades importantes para tu decisión: primero, estás confiando en un cliente propietario y, de forma predeterminada, en la propia nube de AnyDesk para intermediar las conexiones, por lo que no puedes auditar el código y heredas la seguridad operativa del proveedor, un aspecto que dejó de ser abstracto en [2024](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/). Segundo, y con más probabilidades de afectar a un usuario normal, AnyDesk es un recurso favorito en las estafas de acceso remoto. Ninguna de las dos cosas hace que sea inseguro _instalarlo_; ambas determinan cómo deberías _usarlo_.

## Cómo protege AnyDesk tus sesiones

Según la [propia documentación de seguridad de AnyDesk](https://anydesk.com/en/security), las sesiones se protegen con TLS 1.2 usando AEAD, un intercambio de claves asimétrico RSA-2048 para verificar los extremos y protegerse de ataques de intermediario (man-in-the-middle), y cifrado de transporte AES de 256 bits, con confidencialidad directa perfecta gracias a un intercambio de claves efímero. En cuanto a las cuentas, AnyDesk admite autenticación de dos factores (TOTP) para el acceso desatendido, una lista de control de acceso o lista blanca para restringir quién puede conectarse, y hash de contraseñas con sal. (Algunos materiales de AnyDesk mencionan versiones de TLS más recientes; considera la página actual como la fuente autorizada y verifica ahí los detalles.)

Son protecciones sólidas y estándar en el sector, comparables en su naturaleza a las que usa cualquier competidor serio. En la capa de transporte no hay nada alarmante. Las preguntas interesantes giran en torno al _modelo de confianza_ y al _comportamiento humano_, no a los conjuntos de cifrado.

## El incidente de seguridad de AnyDesk de 2024: qué ocurrió realmente

A principios de 2024, AnyDesk reveló públicamente un incidente de seguridad que afectó a sus **sistemas de producción**. Según [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/) y analistas de seguridad de [Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations), los atacantes obtuvieron acceso a la infraestructura interna y consiguieron código fuente y material de firma de código. La respuesta de AnyDesk, según su propia versión, incluyó la contratación de un equipo forense externo, la revocación y sustitución de certificados relacionados con la seguridad, la publicación de una versión del cliente firmada de nuevo y el restablecimiento preventivo de las contraseñas del portal web.

Para ser justos con AnyDesk, afirmó que **ningún dispositivo de usuario final se vio afectado** y que sus sistemas están diseñados para no almacenar las claves privadas, tokens o contraseñas que permitirían a un atacante conectarse a las máquinas de los clientes. En su momento se informaron fechas y cifras exactas de diversas maneras, así que confirma los detalles con los avisos de AnyDesk y con coberturas neutrales, en lugar de basarte en un único resumen, incluido este.

La conclusión honesta no es que «AnyDesk sea especialmente inseguro». Todos los grandes proveedores de acceso remoto tienen un historial de incidentes. La verdadera conclusión tiene que ver con el **riesgo de concentración en el proveedor**: cuando un tercero opera la infraestructura que intermedia tus sesiones y almacena los datos de tu cuenta, un compromiso ahí es un compromiso que tú no elegiste y no pudiste evitar.

## El mayor riesgo no es un fallo: son las estafas

Para la mayoría de las personas, el mayor peligro relacionado con AnyDesk no tiene nada que ver con un CVE. Es la ingeniería social. El [FBI ha advertido](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) de que los estafadores de soporte técnico suelen indicar a las víctimas que instalen software de escritorio remoto y luego usan ese acceso para vaciar sus cuentas financieras. AnyDesk aparece constantemente en este tipo de esquemas, y la propia AnyDesk publica [directrices de prevención de abusos](https://anydesk.com/en/abuse-prevention) precisamente porque se utiliza como arma con mucha frecuencia.

¿Por qué AnyDesk en concreto? Es gratuito, se instala en segundos y, algo crucial, la persona _controlada_ no necesita crear una cuenta. Esa baja fricción es una ventaja para el soporte legítimo y un regalo para los estafadores, que llaman o envían un correo a un objetivo, inventan un «problema» urgente y lo guían paso a paso para que conceda el control remoto total.

Este es el matiz de justicia que se pierde en los titulares alarmistas: **se trata de un riesgo de uso, no de una vulnerabilidad de AnyDesk.** El mismo truco funciona exactamente igual con TeamViewer, Chrome Remote Desktop o RustDesk. Ninguna cantidad de AES te protege si entregas voluntariamente las llaves a un desconocido por teléfono. Si quieres conocer el plan de defensa, lo explicamos por separado en [cómo evitar las estafas de escritorio remoto](/es/blog/estafas-de-escritorio-remoto-como-detectarlas-y-evitarlas), y el mismo razonamiento se aplica a [si Chrome Remote Desktop es seguro](/es/blog/es-seguro-chrome-remote-desktop-una-resena-honesta).

## Código cerrado e intermediación en la nube: la cuestión de la confianza

Aquí es donde el modelo de AnyDesk y el de RustDesk toman caminos distintos: no en si el cifrado es bueno, sino en _qué debes aceptar por fe._

AnyDesk es propietario. No puedes leer el código fuente del cliente, compilarlo tú mismo ni verificar de forma independiente lo que hace; confías en que AnyDesk garantice que el binario se comporta como se anuncia. Y, de forma predeterminada, tus sesiones se intermedian a través de la nube de AnyDesk, por lo que la disponibilidad y la seguridad de esa infraestructura son responsabilidad del proveedor, tal como quedó claro en 2024. Los niveles superiores de AnyDesk ofrecen un dispositivo local (on-premises), lo que reduce esta brecha para quienes optan por él.

RustDesk parte del lado opuesto en ambas apuestas. Como es [de código abierto bajo la licencia AGPL](https://github.com/rustdesk/rustdesk), el cliente es auditable y se puede compilar, así que no aceptas un binario propietario por fe. Y como puedes [autoalojar](/es/blog/por-que-autoalojar-tu-software-de-escritorio-remoto) el servidor de ID/encuentro (rendezvous) y el relé, la infraestructura que intermedia tus sesiones es tuya y no de un tercero: justo la exposición a la concentración en el proveedor que 2024 dejó patente. Esto también puede respaldar un [diseño con soberanía de datos](/es/blog/soberania-de-datos-en-el-escritorio-remoto-y-rgpd-autoalojamiento), aunque la ubicación de los extremos, la retención y las obligaciones legales aún deben evaluarse.

Para ser igualmente justos: esto traslada la confianza en lugar de eliminarla. Como el código es abierto, los propios defectos de RustDesk también son públicos, así que conviene seguir las [últimas versiones](https://github.com/rustdesk/rustdesk/releases) y los registros de vulnerabilidades. Y una infraestructura auditable y autoalojada es un punto de partida, no una garantía: las sesiones siguen enrutándose directamente entre los extremos, y el servidor es tuyo, con la responsabilidad de aplicarle los parches.

## Entonces, ¿es seguro AnyDesk?

Para un uso deliberado y legítimo: sí. Es un producto maduro con cifrado de nivel estándar y controles de cuenta razonables, y se usa de forma segura a gran escala todos los días. Considéralo razonablemente seguro, porque eso es lo que respaldan los hechos.

Las salvedades son la parte honesta. Su modelo predeterminado, de código cerrado e intermediado en la nube, implica que confías en la seguridad operativa de AnyDesk, que sufrió un golpe real en 2024. Y el daño más habitual en la práctica proviene de estafadores que aprovechan lo fácil que es instalarlo: un problema humano, no criptográfico. Si estas contrapartidas no te convencen, una [alternativa de código abierto y autoalojada](/es/blog/la-mejor-alternativa-autoalojada-a-teamviewer) cambia la base de garantías: código auditable e intermediación bajo tu control, a cambio de tener que administrar tú mismo un servidor.

Sea cual sea la herramienta que elijas, la regla que evita más daño es también la más sencilla: nunca instales software de acceso remoto porque alguien que te contactó a _ti_ te lo haya pedido.
