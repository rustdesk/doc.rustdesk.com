---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-03T08:18:00Z
lang: 'es'
translationKey: 'avoid-remote-desktop-scams'
draft: false
title: 'Estafas de escritorio remoto: cómo detectarlas y evitarlas'
excerpt: 'Cómo funcionan las estafas de acceso remoto, las señales de alerta que las delatan y qué hacer exactamente si un estafador ya ha tomado el control de tu ordenador.'
image: '~/assets/images/blog/avoid-remote-desktop-scams-og.webp'
category: 'Seguridad'
tags: ['Seguridad', 'Solución de problemas']
author: 'RustDesk Team'
slug: 'estafas-de-escritorio-remoto-como-detectarlas-y-evitarlas'
faq:
  - question: '¿Qué es una estafa de escritorio remoto?'
    answer: 'Una estafa de escritorio remoto es un fraude en el que un delincuente te convence para instalar software legítimo de acceso remoto y luego lo usa para controlar tu ordenador, normalmente para mover dinero, robar datos o instalar malware. Las herramientas son las mismas que usan a diario los equipos de TI. Lo que lo convierte en estafa es que la persona al otro lado contactó contigo con un pretexto falso y te convenció para darle acceso.'
  - question: '¿Puede un estafador entrar en mi ordenador si nunca le di un código ni instalé nada?'
    answer: 'Normalmente, no. En una estafa típica de soporte técnico, negarte a instalar la herramienta de quien llama o a compartir un código de conexión detiene el intento. Aun así existen otras vías: un acceso desatendido configurado antes, credenciales robadas, malware o servicios expuestos como RDP. Si ves sesiones o actividad en tus cuentas que no te explicas, desconecta el dispositivo e investiga aunque nunca hayas compartido un código.'
  - question: '¿Qué debo hacer justo después de darme cuenta de que me han estafado?'
    answer: 'Desconecta el dispositivo, conserva las pruebas, elimina el software de acceso remoto no autorizado y cambia las contraseñas desde otro dispositivo de confianza, empezando por el correo y la banca. Contacta cuanto antes con tu banco o el emisor de tu tarjeta. En Estados Unidos, denuncia ante ReportFraud de la FTC y el IC3 del FBI y plantéate una alerta de fraude o un bloqueo de crédito en las agencias de crédito estadounidenses. En otros países, acude a la policía local, a la autoridad competente en materia de fraude y a tu servicio local de protección de la identidad.'
  - question: '¿Usar RustDesk me protege de las estafas?'
    answer: 'No. Ninguna herramienta de escritorio remoto puede hacerte inmune a las estafas, tampoco RustDesk: si alguien te engaña para que instales un cliente y le leas un código de conexión, puede tomar el control en cualquier plataforma. RustDesk añade estructura de tu lado: el autoalojamiento pone el servidor de ID y relay bajo tu control, el Control de acceso de Server Pro y una lista de ID o IP admitidos te permiten restringir quién puede conectarse, y el cliente de código abierto se puede auditar.'
metadata:
  description: 'Cómo funcionan las estafas de acceso remoto, las señales de alerta que debes vigilar y qué hacer si un estafador ya ha tomado el control de tu ordenador.'
  keywords: 'estafas de escritorio remoto, estafa de acceso remoto, estafa de soporte técnico, cómo evitar una estafa de acceso remoto, estafador con acceso remoto al ordenador, denunciar estafa de soporte técnico'
---

Una estafa de escritorio remoto es un tipo de fraude en el que un delincuente te convence para instalar software legítimo de acceso remoto y luego lo usa para tomar el control de tu ordenador: para vaciar una cuenta bancaria, robar datos o instalar malware. Las herramientas son las mismas que usan a diario los departamentos de TI. Lo que lo convierte en una estafa es quién está al otro lado y cómo se las ha ingeniado para entrar.

Esta guía es deliberadamente neutral respecto a los proveedores. Cualquier producto de escritorio remoto puede usarse de forma fraudulenta así, RustDesk incluido. El objetivo es ayudarte a reconocer el patrón, rechazarlo y recuperarte si ya has caído.

## Cómo funciona una estafa de acceso remoto

La [Comisión Federal de Comercio de EE. UU.](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams) (FTC) y el [FBI](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams) describen un guion sorprendentemente constante:

1. **El anzuelo.** Una ventana emergente avisa de que «tu ordenador está infectado», o recibes una llamada, un correo o un mensaje inesperado. El remitente se hace pasar por un nombre en el que confías: Microsoft, Apple, Amazon, tu banco, una compañía de suministros o incluso tu propio departamento de TI.
2. **Urgencia fabricada.** Tu cuenta está comprometida, un virus se está propagando, tienes un reembolso pendiente o te van a cortar el servicio. Según la FTC, los estafadores «quieren que actúes antes de que tengas tiempo de pensar», así que la presión para darte prisa es justamente el objetivo.
3. **Instalar la herramienta.** Te piden que descargues un «software gratuito de soporte remoto» para poder «arreglar» el problema. Es software real, y eso es lo que lo hace convincente.
4. **Conceder acceso.** Te piden que leas en voz alta el código de conexión o la contraseña que aparece en tu pantalla, o que aceptes la sesión entrante. Un ID de dispositivo por sí solo no suele dar el control; compartir el código o aceptar la solicitud es el momento en que logran entrar.
5. **Tomar el control.** Simulan un análisis antivirus, abren la web de tu banco, mueven dinero o abren cuentas nuevas. La [oficina del FBI en Boston](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) ha advertido de que los estafadores usan este acceso para abrir cuentas de moneda virtual y liquidar los saldos bancarios reales de las víctimas.

Las pérdidas no son teóricas. En esa misma advertencia del FBI, los investigadores describían el caso de una pareja de Maine que, después de que una ventana emergente les indicara llamar a un número de «Fidelity», recibió instrucciones para instalar software de escritorio remoto y dejar que falsos representantes de «Microsoft» y «Fidelity» vigilaran sus cuentas. Perdieron unos **1,1 millones de dólares**.

## Las señales de alerta

Casi todas las estafas de acceso remoto hacen saltar al menos una de estas alarmas:

- **Contacto no solicitado.** Un desconocido se pone en contacto contigo para arreglar un problema informático que nunca has comunicado. La FTC es tajante: ni ella ni sus administradores de reembolsos «te pedirán jamás que pagues con tarjetas regalo» ni «solicitarán acceso remoto a tu dispositivo». Tampoco lo harán Microsoft, Apple ni tu banco.
- **Una ventana emergente con un número de teléfono.** Las advertencias de seguridad legítimas nunca te piden que llames a una línea de soporte. Ese número es del estafador.
- **Presión y urgencia.** «Hazlo ahora mismo o lo perderás todo» es una táctica de manipulación, no un procedimiento de soporte.
- **La petición de instalar software y leer un código en voz alta.** Es el mecanismo central de la estafa. Nadie honrado que te llame sin que lo hayas pedido lo necesita.
- **Un giro hacia el dinero.** Tarjetas regalo, transferencias, criptomonedas o un «reembolso» que, por algún motivo, es demasiado alto y hay que «devolver».
- **Que sigan al teléfono mientras inicias sesión.** Quieren ver cómo escribes tus credenciales bancarias.

## Soporte legítimo frente a una estafa

|                       | Soporte remoto legítimo                              | Una estafa                                                   |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| Quién lo inicia       | Tú contactas con ellos, en un número que has buscado | Ellos contactan contigo sin previo aviso                     |
| El problema           | Uno que ya habías comunicado                         | Uno que ellos han «descubierto» y te cuentan                 |
| Urgencia              | Programada, sin prisas                               | «Actúa ahora o atente a las consecuencias»                   |
| El código de conexión | Decides compartirlo, sabiendo lo que haces           | Te presionan para que lo leas en voz alta y deprisa          |
| Pago                  | Facturación normal, si la hay                        | Tarjetas regalo, transferencias, criptomonedas, «reembolsos» |
| Acceso a la banca     | Nunca hace falta para arreglar un ordenador          | El verdadero objetivo                                        |

## Qué hacer si ya le has dado acceso a un estafador

Si te das cuenta durante la llamada o después de que te han estafado, actúa rápido y en este orden:

1. **Desconéctate de internet.** Apaga la wifi o desenchufa el cable de red para cortar su sesión de inmediato.
2. **Desinstala la aplicación de acceso remoto** que te hicieron instalar. Si no sabes cómo, un técnico local de confianza puede ayudarte.
3. **Busca malware.** Ejecuta un análisis antivirus completo y plantéate una limpieza profesional si había equipos con información sensible. Da por hecho que pueden haber dejado algo instalado.
4. **Cambia tus contraseñas desde otro dispositivo de confianza**: primero el correo y la banca, y después todo lo que comparta contraseña.
5. **Llama a tu banco y a los emisores de tus tarjetas.** Denuncia el fraude, pregunta si se pueden revertir las transferencias y vigila cualquier actividad no autorizada.
6. **Protege tu identidad.** Si has compartido datos personales, solicita una alerta de fraude o un bloqueo de crédito en las tres grandes agencias de crédito de EE. UU.: Equifax, Experian y TransUnion.
7. **Denúncialo en tu jurisdicción.** En **Estados Unidos**, presenta la denuncia ante la FTC en [ReportFraud.ftc.gov](https://reportfraud.ftc.gov) y ante el [IC3 del FBI](https://www.ic3.gov). Fuera de Estados Unidos, acude a la policía local y a la autoridad competente en denuncias de fraude, y pregunta a tu banco por las medidas locales de protección de la identidad.

## Cómo prevenirlo

La prevención se reduce a unos pocos hábitos:

- **No instales nunca software remoto a petición de alguien que te ha contactado.** Invierte el sentido: si necesitas ayuda, busca tú el número real del proveedor y llama.
- **No leas nunca en voz alta un código de conexión** a alguien con quien no te hayas puesto en contacto deliberadamente.
- **Considera falsos los números de teléfono de las ventanas emergentes.** Cierra el navegador (fuerza el cierre si hace falta) en lugar de llamar.
- **Ve más despacio.** La urgencia es la herramienta del estafador. Una institución real te dejará colgar y volver a llamar.
- **Coméntalo con alguien.** Estas estafas se ceban especialmente con las personas mayores y con quienes están bajo estrés. Un rápido «¿a ti te parece normal esto?» a un familiar rompe el hechizo.

## El papel de las herramientas de escritorio remoto

Vale la pena repetirlo: el software no es el villano. Las herramientas de escritorio remoto son la forma en que los equipos de TI mantienen en marcha los ordenadores de todo el mundo, y la misma aplicación puede ser un salvavidas o un arma según quién la tenga en las manos. Culpar a un producto concreto no ayuda: la defensa consiste en controlar a quién dejas entrar.

Dicho esto, si _ofreces_ soporte remoto de forma profesional, algunas decisiones estructurales reducen tu exposición. Autoalojar el servidor de RustDesk pone los servicios de ID/rendezvous y relay en infraestructura que tú controlas. Quién puede conectarse lo deciden entonces tus propios controles: aplica una [higiene básica de acceso desatendido](/es/blog/acceso-desatendido-en-rustdesk-guia-de-configuracion) con contraseñas permanentes seguras y únicas y 2FA en las conexiones, añade una lista de IP o ID admitidos en los dispositivos controlados y usa el [Control de acceso](https://rustdesk.com/docs/es/self-host/rustdesk-server-pro/permissions/) de Server Pro por usuario y grupo de dispositivos. Y como RustDesk es [de código abierto](https://github.com/rustdesk/rustdesk), tú, o tu equipo de seguridad, puedes auditar exactamente lo que hace en tus equipos.

Nada de esto hace que RustDesk, ni ninguna otra herramienta, sea inmune a las estafas. Un usuario al que engañan para instalar un cliente y leer un código en voz alta puede ser víctima en cualquier plataforma. La estructura reduce ciertos riesgos, pero nunca sustituye la regla sencilla que está en el centro de todas las advertencias anteriores: no entregues el control de tu ordenador a alguien que se ha puesto en contacto _contigo_.

Si quieres profundizar en cómo gestionan la seguridad determinadas herramientas y cómo las suplantan, consulta nuestras guías complementarias sobre si [AnyDesk es seguro](/es/blog/es-seguro-anydesk-cifrado-el-incidente-de-seguridad-de-2024-y-las) y si [Chrome Remote Desktop es seguro](/es/blog/es-seguro-chrome-remote-desktop-una-resena-honesta).
