---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-30T17:26:00Z
lang: 'es'
translationKey: is-anydesk-safe
draft: false
title: '¿Es seguro AnyDesk? Cifrado, el incidente de seguridad de 2024 y las estafas'
excerpt: '¿Es seguro AnyDesk? Un análisis imparcial de su cifrado, el incidente de 2024 en sus sistemas de producción y por qué lo usan los estafadores, y cómo se compara el código abierto.'
image: ~/assets/images/blog/is-anydesk-safe-og.webp
category: 'Seguridad'
tags: ['AnyDesk', 'Seguridad']
author: RustDesk Team
slug: 'es-seguro-anydesk-cifrado-el-incidente-de-seguridad-de-2024-y-las'
faq:
  - question: '¿Es seguro usar AnyDesk?'
    answer: 'Sí, para un uso legítimo. AnyDesk es una herramienta comercial madura que documenta TLS 1.2 con cifrado de transporte AES de 256 bits, autenticación de dos factores para el acceso desatendido y listas de control de acceso. Los principales riesgos son la brecha en sus sistemas de producción del 2 de febrero de 2024, la coordinación por defecto a través de la nube de la propia AnyDesk (On-Premises se ofrece en Ultimate) y los estafadores que convencen a sus víctimas para instalarlo.'
  - question: '¿Hackearon AnyDesk?'
    answer: 'Sí. AnyDesk comunicó el 2 de febrero de 2024 que sus sistemas de producción se habían visto comprometidos. Su declaración oficial describía la sustitución de certificados, la reparación de sistemas y el restablecimiento preventivo de las contraseñas de my.anydesk.com, y afirmaba no tener pruebas de que los dispositivos de los usuarios finales se hubieran visto afectados. Por separado, investigadores de seguridad de Akamai analizaron la exposición de código fuente y de firma de código de la que se informó.'
  - question: '¿Por qué usan AnyDesk los estafadores?'
    answer: 'Porque AnyDesk es gratuito, se instala en segundos y no necesita cuenta en el lado controlado, los estafadores del falso soporte técnico llaman o escriben a sus víctimas y las convencen para instalarlo y cederles el control. Es un riesgo de uso, no una vulnerabilidad de AnyDesk: el mismo truco funciona con cualquier herramienta de escritorio remoto, RustDesk incluido. AnyDesk publica recomendaciones para prevenir abusos.'
  - question: '¿Es seguro el cifrado de AnyDesk?'
    answer: 'La documentación de seguridad de AnyDesk describe TLS 1.2 con AEAD, un intercambio de claves asimétrico RSA-2048 y cifrado de transporte AES de 256 bits, además de Perfect Forward Secrecy. Son protecciones estándar del sector. La salvedad es que confías en un cliente de código cerrado y, por defecto, en la nube de AnyDesk para intermediar la conexión, así que dependes de la seguridad operativa del proveedor en lugar de poder auditar el código tú mismo.'
metadata:
  description: '¿Es seguro AnyDesk? Análisis con fuentes de su cifrado TLS/AES, el incidente de seguridad de 2024, su uso en estafas y lo que implica el código cerrado.'
  keywords: 'es seguro AnyDesk, seguridad de AnyDesk, brecha de AnyDesk 2024, estafa de AnyDesk, cifrado de AnyDesk, es seguro usar AnyDesk, hackearon AnyDesk'
---

La respuesta rápida: AnyDesk es seguro para un uso legítimo. Es un producto comercial de escritorio remoto maduro, con un cifrado de nivel estándar, no un malware. Los riesgos que conviene entender son que es de código cerrado y se coordina por defecto a través de la nube de AnyDesk, que comunicó una brecha en sus sistemas de producción en febrero de 2024 y que los estafadores abusan mucho de él. Este es el panorama, con fuentes.

## La respuesta breve

Sí, para un uso deliberado y legítimo. AnyDesk documenta TLS 1.2 con cifrado de transporte AES de 256 bits, autenticación de dos factores para el acceso desatendido y listas de control de acceso. Tres cosas determinan cómo deberías usarlo: la [brecha en sus sistemas de producción del 2 de febrero de 2024](https://anydesk.com/en/public-statement-2-2-2024), la coordinación por defecto a través de la nube de la propia AnyDesk (en Ultimate se ofrece un appliance On-Premises) y los estafadores del falso soporte técnico que convencen a las víctimas para instalarlo. Ninguna de ellas lo hace inseguro de _instalar_; todas condicionan cómo lo _usas_.

## Cómo protege AnyDesk tus sesiones

Según la [propia documentación de seguridad de AnyDesk](https://anydesk.com/en/security), las sesiones se protegen con TLS 1.2 con AEAD, un intercambio de claves asimétrico RSA-2048 para verificar los extremos y protegerse de ataques de intermediario (man-in-the-middle) y cifrado de transporte AES de 256 bits, con Perfect Forward Secrecy gracias a un intercambio de claves efímero. En cuanto a las cuentas, AnyDesk admite autenticación de dos factores (TOTP) para el acceso desatendido, una lista de control de acceso (lista de permitidos) para restringir quién puede conectarse y almacenamiento de contraseñas con hash y sal. (Algunos materiales de AnyDesk mencionan versiones de TLS más recientes; la página de seguridad enlazada arriba es la referencia actual).

Son protecciones sólidas y estándar en el sector, comparables en su naturaleza a las que usa cualquier competidor serio. En la capa de transporte no hay nada alarmante. Las preguntas interesantes giran en torno al _modelo de confianza_ y al _comportamiento humano_, no a los conjuntos de cifrado.

## El incidente de seguridad de AnyDesk de 2024: qué ocurrió realmente

El **2 de febrero de 2024**, [AnyDesk comunicó que sus sistemas de producción se habían visto comprometidos](https://anydesk.com/en/public-statement-2-2-2024). La declaración describía la respuesta al incidente con CrowdStrike, la revocación y sustitución de certificados, la reparación de sistemas y el restablecimiento preventivo de las contraseñas del portal web. El [análisis de Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) trata, al margen de la comunicación pública del proveedor, la exposición de código fuente y de firma de código de la que se informó.

[AnyDesk afirmó **no tener pruebas de que los dispositivos de los usuarios finales se hubieran visto afectados**](https://anydesk.com/en/public-statement-2-2-2024) y que no almacenaba credenciales que pudieran usarse para conectarse a ellos.

La conclusión no es que AnyDesk sea especialmente inseguro, sino el **riesgo de concentración en el proveedor**: cuando un tercero opera la infraestructura que coordina tus sesiones y guarda los datos de tu cuenta, un compromiso ahí es algo que no has elegido y que no podías evitar.

## Las estafas de ingeniería social son un riesgo aparte

Para la mayoría de los particulares, el mayor peligro relacionado con AnyDesk es la ingeniería social, no una CVE. El [FBI advierte de que los estafadores del falso soporte técnico piden a las víctimas que instalen software de acceso remoto](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) y luego abusan del acceso concedido, y AnyDesk publica [recomendaciones para prevenir abusos](https://anydesk.com/en/abuse-prevention) precisamente por eso. El riesgo está en quién tiene autorización para conectarse, no en la solidez del cifrado de la sesión.

¿Por qué AnyDesk en concreto? Es gratuito, se instala en segundos y, algo crucial, la persona _controlada_ no necesita crear una cuenta. Esa baja fricción es una ventaja para el soporte legítimo y un regalo para los estafadores, que llaman o escriben a su objetivo, se inventan un «problema» urgente y lo guían paso a paso para que les conceda el control remoto total.

Este es el matiz que se pierde en los titulares alarmistas: **es un riesgo de uso, no una vulnerabilidad de AnyDesk.** El mismo truco funciona exactamente igual con TeamViewer, Chrome Remote Desktop o RustDesk. Ninguna cantidad de AES te protege si entregas voluntariamente las llaves a un desconocido por teléfono. Si quieres el manual de defensa, lo explicamos aparte en [cómo evitar las estafas de escritorio remoto](/es/blog/estafas-de-escritorio-remoto-como-detectarlas-y-evitarlas), y el mismo razonamiento vale para saber [si Chrome Remote Desktop es seguro](/es/blog/es-seguro-chrome-remote-desktop-una-resena-honesta).

## Código cerrado e intermediación en la nube: la cuestión de la confianza

Aquí es donde el modelo de AnyDesk y el de RustDesk se separan: no en si el cifrado es bueno, sino en _qué tienes que aceptar por fe._

AnyDesk es propietario. No puedes leer el código fuente del cliente, compilarlo tú mismo ni verificar de forma independiente lo que hace; confías en AnyDesk en que el binario se comporta como anuncia. Y, por defecto, tus sesiones se intermedian a través de la nube de AnyDesk, así que la disponibilidad y la seguridad de esa infraestructura dependen del proveedor, como quedó claro en 2024. AnyDesk Ultimate ofrece un appliance On-Premises, que reduce esa brecha para quienes lo contratan.

RustDesk parte del lado opuesto de esas dos apuestas. El cliente de RustDesk y RustDesk Server OSS (el servidor comunitario gratuito) son [de código abierto con licencia AGPL](https://github.com/rustdesk/rustdesk); Server Pro es software de servidor autoalojado, comercial y propietario. El cliente se puede auditar y compilar, así que no aceptas un binario propietario por fe. Y como puedes [autoalojar](/es/blog/por-que-autoalojar-tu-software-de-escritorio-remoto) el ID/rendezvous y el relay, la infraestructura que intermedia tus sesiones es tuya y no de un tercero: justo la exposición a la concentración en el proveedor que 2024 hizo tangible. Eso también respalda un [diseño con soberanía de datos](/es/blog/soberania-de-datos-en-el-escritorio-remoto-y-rgpd-autoalojamiento).

Para ser igual de justos: esto traslada la confianza en lugar de eliminarla. Como el código es abierto, los defectos de RustDesk también son públicos, así que sigue las [últimas versiones](https://github.com/rustdesk/rustdesk/releases) y los registros de vulnerabilidades. Y una infraestructura auditable y autoalojada es un punto de partida, no una garantía: las sesiones siguen yendo directamente entre los extremos, y el servidor lo parcheas tú.

## Entonces, ¿es seguro AnyDesk?

Para un uso deliberado y legítimo, sí. AnyDesk es un producto maduro con cifrado de nivel estándar y controles de cuenta razonables. Mantenlo actualizado, protege el acceso desatendido con autenticación de dos factores, restringe las conexiones entrantes con su lista de control de acceso y verifica cada solicitud de soporte.

Los matices tienen que ver con la confianza, no con el cifrado. Su modelo predeterminado, de código cerrado y coordinado en la nube, implica depender de la seguridad operativa de AnyDesk, que sufrió un golpe real en 2024; Ultimate On-Premises reduce esa brecha. Si esa contrapartida no te convence, [una alternativa autoalojada a TeamViewer y AnyDesk](/es/blog/la-mejor-alternativa-autoalojada-a-teamviewer) cambia la base de la confianza: código auditable y una coordinación que controlas tú, a cambio de operar tú mismo un servidor.

Sea cual sea la herramienta que elijas, la regla que evita más daños es también la más barata: no instales nunca software de acceso remoto porque te lo haya pedido alguien que se puso en contacto _contigo_.
