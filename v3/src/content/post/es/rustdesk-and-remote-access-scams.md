---
publishDate: 2026-07-06T12:36:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'es'
translationKey: 'rustdesk-and-remote-access-scams'
draft: false
title: 'RustDesk y las estafas de acceso remoto: qué estamos haciendo'
excerpt: 'Por qué RustDesk abandonó Google Play, añadió advertencias y requisitos de inicio de sesión en el servidor público, y cómo los usuarios pueden proteger los dispositivos controlados con contraseñas, 2FA y listas blancas de IP y de ID.'
image: ~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp
category: 'Seguridad'
tags: ['RustDesk', 'Seguridad', 'Estafas']
author: 'RustDesk Team'
slug: 'rustdesk-y-las-estafas-de-acceso-remoto-que-estamos-haciendo'
faq:
  - question: '¿Es RustDesk una estafa?'
    answer: 'No. RustDesk es un software legítimo de acceso remoto de código abierto. Sin embargo, como otras herramientas de escritorio remoto, puede usarse de forma indebida cuando un estafador convence a alguien de que lo instale, inicie su servicio y conceda acceso. RustDesk publica advertencias sobre estafas y ha añadido restricciones de distribución y del servidor público para reducir ese abuso, pero ningún producto de acceso remoto puede hacer imposible la ingeniería social.'
  - question: '¿Por qué RustDesk no está disponible en Google Play?'
    answer: 'RustDesk retiró voluntariamente su aplicación de Android de Google Play en septiembre de 2023 para evitar más estafas dirigidas a los usuarios. Las compilaciones de Android siguen disponibles en los lanzamientos oficiales de RustDesk en GitHub y en F-Droid. Descarga el software únicamente desde fuentes que hayas comprobado por tu cuenta, nunca desde un enlace que te envíe alguien que te ha llamado sin que lo pidieras.'
  - question: '¿Por qué el servidor público de RustDesk requiere inicio de sesión?'
    answer: 'RustDesk indica que, actualmente, el inicio de sesión del controlador es obligatorio en su servidor público debido al abuso continuo por parte de estafadores y botnets. El inicio de sesión es gratuito a través de proveedores de identidad de terceros compatibles. El servidor público está pensado para demostraciones y pruebas, no para producción ni para trabajos sensibles; el autoalojamiento sigue disponible para las organizaciones que necesitan operar su propia infraestructura y sus propias políticas.'
  - question: '¿Cómo debo proteger un dispositivo que acepta conexiones de RustDesk?'
    answer: 'Configura una contraseña permanente fuerte y única en el dispositivo controlado, activa la 2FA por TOTP del cliente para las conexiones y usa su lista de IP permitidas cuando las direcciones o los rangos CIDR de tus controladores sean predecibles. Desde RustDesk 1.5.0, una lista de ID permitidos también puede limitar qué IDs pueden conectarse. Reduce al mínimo las excepciones de dispositivos de confianza. Estas capas atenúan los riesgos de contraseña y de origen de red, pero no protegen a quien entrega deliberadamente a un estafador la contraseña, el código 2FA vigente o la aprobación manual.'
metadata:
  description: 'RustDesk ante las estafas de acceso remoto: advertencias, retirada de Google Play, inicio de sesión en el servidor público, 2FA y listas blancas de IP y de ID.'
  keywords: 'estafa de RustDesk, es RustDesk una estafa, RustDesk Google Play, inicio de sesión obligatorio en RustDesk, RustDesk 2FA, lista blanca de IP de RustDesk, lista blanca de ID de RustDesk, prevención de estafas de acceso remoto'
---

RustDesk es un software legítimo de acceso remoto de código abierto, pero el software legítimo también puede usarse de forma indebida. Un estafador puede llamar a una víctima, inventarse un problema urgente y convencerla de que instale una herramienta de control remoto y le conceda acceso. RustDesk no está exento de ese riesgo, y el cifrado no puede corregir un consentimiento obtenido mediante engaño.

Nuestra respuesta ha sido introducir advertencias y fricción en varios puntos de ese proceso: en nuestro sitio web, dentro del flujo del dispositivo controlado en Android, en un canal de distribución importante y en el servidor público. Estas medidas también incomodan a los usuarios legítimos. Este artículo documenta lo que hemos hecho, por qué lo hicimos y dónde siguen estando los límites.

## ¿Qué ha hecho RustDesk frente a las estafas de acceso remoto?

| Acción                                            | Qué aborda                                                                                 | Coste o limitación                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Advertencias en el sitio web y en el cliente      | Una persona a quien un desconocido le pide por teléfono que instale RustDesk               | La advertencia se puede ignorar de todos modos                                                                  |
| Retirada voluntaria de Google Play                | La instalación fácil impulsada por estafas a través de una tienda de aplicaciones conocida | Los usuarios legítimos de Android pierden la visibilidad en la tienda y las actualizaciones automáticas de Play |
| Inicio de sesión en el servidor público           | El uso anónimo de la infraestructura compartida por parte de estafadores y botnets         | Los usuarios legítimos deben iniciar sesión y algunos flujos de trabajo existentes se ven interrumpidos         |
| Controles de seguridad del dispositivo controlado | El robo de contraseñas, la exposición amplia de la red y el riesgo del acceso desatendido  | Deben configurarse correctamente y no pueden hacer nada frente a una divulgación voluntaria                     |

Se trata de medidas para reducir el riesgo, no de una afirmación de que RustDesk sea inmune a las estafas.

## Advertencias en los lugares donde una posible víctima puede verlas

La [página de soporte de RustDesk](https://rustdesk.com/support) comienza con una advertencia directa sobre estafas. Indica a las personas que están al teléfono con alguien a quien no conocen ni en quien confían, y a quienes se les ha pedido que instalen RustDesk, que se detengan. El [repositorio de RustDesk en GitHub](https://github.com/rustdesk/rustdesk) también incluye un descargo de responsabilidad contra el uso indebido, el acceso no autorizado, el control y la invasión de la privacidad.

La advertencia también está presente en el cliente oficial de Android distribuido a través de [GitHub Releases](https://github.com/rustdesk/rustdesk/releases). En un dispositivo Android que va a ser controlado y no tiene sesión iniciada, al tocar **Iniciar servicio** se abre una advertencia antes de que arranque el servicio de captura de pantalla. La advertencia pide al usuario que se detenga y cuelgue si se lo ha indicado alguien desconocido en quien no confía. Las compilaciones oficiales imponen una cuenta atrás antes de que el usuario pueda continuar. Tanto el [flujo actual del lado controlado](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421) como el [texto de advertencia en inglés](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194) son visibles en el repositorio de código abierto.

Esa ubicación importa. Una página general de seguridad puede llegar a alguien que está investigando un producto; una advertencia en **Iniciar servicio** llega a la persona justo cuando una sesión entrante en Android está a punto de ser posible. Aun así, no puede obligar a esa persona a desconfiar de un interlocutor convincente.

## Por qué RustDesk no está en Google Play

El 3 de septiembre de 2023, la cuenta oficial de RustDesk en X declaró: [«Hemos retirado temporalmente RustDesk de Google Play para evitar más estafas dirigidas a los usuarios.»](https://x.com/rustdesk/status/1698372220379349421) El enlace y el texto también se conservan en la [discusión de GitHub #5660](https://github.com/rustdesk/rustdesk/discussions/5660), ya respondida, y las [preguntas frecuentes actuales de RustDesk indican que el proyecto se retiró de Google Play debido a las estafas](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store).

Por lo tanto, RustDesk **actualmente no se distribuye a través de Google Play**. Esto no fue una afirmación de que el cliente de Android fuera malware ni de que toda persona que lo instalara estuviera en riesgo. Fue una decisión de distribución destinada a reducir una vía habitual utilizada en las instrucciones de las estafas.

El coste es real: salir de Google Play resta visibilidad a los usuarios legítimos y les quita una instalación conocida y las actualizaciones automáticas de la tienda. Las compilaciones actuales de Android están disponibles en los [lanzamientos oficiales de RustDesk en GitHub](https://github.com/rustdesk/rustdesk/releases) y en [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). Verifica tú mismo el destino. No instales un APK desde un enlace de descarga que te envíe un supuesto técnico de soporte que te ha llamado sin que lo pidieras. Nuestra [guía de Android e iOS](/es/blog/control-remoto-de-rustdesk-en-android-e-ios-que-funciona) enumera las funciones móviles actuales y las fuentes de instalación.

## Por qué el servidor público requiere inicio de sesión

La actual [guía sobre el inicio de sesión obligatorio en el servidor público](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server) de RustDesk indica que el inicio de sesión del controlador es obligatorio debido al abuso continuo por parte de estafadores y botnets. El inicio de sesión es gratuito y utiliza un proveedor de identidad de terceros compatible, como Google o GitHub; en el servidor público no se ofrece un nombre de usuario y una contraseña independientes. La guía indica actualmente que solo los controladores deben iniciar sesión.

Esto añade un paso de identificación y elimina parte del acceso anónimo a la infraestructura que RustDesk opera con fines de demostración y pruebas. No rige para un servidor privado de RustDesk, y no puede impedir que un estafador utilice otra infraestructura o cree una nueva identidad.

Esto también provocó interrupciones. En una [discusión de Reddit sobre el nuevo error de inicio de sesión](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/), algunos usuarios legítimos informaron de que no podían acceder a los dispositivos de su hogar o de su familia hasta que entendieron y completaron el paso de inicio de sesión. Otros se mostraron en desacuerdo con tener que vincular una identidad de terceros. Estos comentarios no son una prueba de que la restricción funcione o falle contra los estafadores, pero sí documentan su coste operativo. La prevención del abuso que añade fricción debe reconocer ese coste con claridad.

## ¿Cómo proteger un dispositivo controlado de RustDesk?

Las restricciones a nivel de plataforma son solo una capa. El propietario o administrador de un dispositivo controlado también debe reducir quién puede conectarse y qué puede hacer una credencial robada.

### 1. Configura una contraseña permanente fuerte y única

Para el [acceso desatendido](/es/blog/acceso-desatendido-en-rustdesk-guia-de-configuracion), configura una **contraseña permanente fuerte y única** en la configuración de seguridad de RustDesk del dispositivo controlado. No reutilices la contraseña de inicio de sesión del sistema operativo, la del correo electrónico ni una contraseña usada en otro servicio. Cámbiala de inmediato si es posible que se haya revelado.

Para el soporte con el usuario presente, usa preferiblemente una contraseña temporal de un solo uso o la aprobación explícita con un clic cuando sea posible. Una contraseña permanente fuerte reduce el riesgo de que la adivinen, el relleno de credenciales (credential stuffing) y la reutilización de contraseñas. No sirve de nada si la víctima le dicta esa contraseña a quien la llama.

### 2. Activa la 2FA en el dispositivo controlado

RustDesk incluye autenticación en dos pasos (2FA) por TOTP para las conexiones entrantes a un dispositivo controlado. En el dispositivo que aceptará las conexiones, abre su configuración de seguridad, activa **2FA**, escanea el código QR con una aplicación de autenticación y confirma la configuración con el código de seis dígitos.

Una vez activada, no basta con aceptar la contraseña de conexión normal: el controlador también debe proporcionar el código TOTP de seis dígitos vigente antes de que el dispositivo controlado autorice la sesión. Esta función se introdujo específicamente como [2FA para el acceso desatendido](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b), y su [implementación de TOTP es pública](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs).

De manera opcional, RustDesk puede confiar en un dispositivo controlador y omitir las solicitudes de 2FA posteriores. Deja esa omisión desactivada para obtener el comportamiento más estricto. Si la utilizas, revisa la lista de dispositivos de confianza y elimina los que se hayan perdido, sustituido, compartido o que ya no estén autorizados.

La 2FA protege frente a una contraseña que ha sido adivinada, reutilizada o expuesta. No puede proteger a alguien que le da a un estafador tanto la contraseña como el código de autenticación vigente.

### 3. Restringe las conexiones entrantes con una lista blanca de IP

En la interfaz de RustDesk en español, esta función se llama **Direcciones IP admitidas** (*IP Whitelisting* en inglés). Dicho de otro modo, es una lista de IP permitidas: el dispositivo controlado rechaza cualquier conexión cuya dirección de origen quede fuera de la lista configurada, antes de la autorización por contraseña y 2FA.

Configúrala en:

- **Dispositivo controlado de escritorio:** **Ajustes → Seguridad → Seguridad → Usar lista de IPs admitidas**
- **Dispositivo controlado móvil:** **Ajustes → Compartir pantalla → Usar lista de IPs admitidas**

La configuración acepta direcciones IPv4 o IPv6 individuales y rangos CIDR. CIDR combina una dirección de red con una longitud de prefijo. El prefijo indica cuántos bits iniciales son fijos: un prefijo mayor implica un rango permitido más pequeño.

- `203.0.113.10` o `203.0.113.10/32`: una dirección IPv4.
- `203.0.113.0/24`: 256 direcciones IPv4, desde `203.0.113.0` hasta `203.0.113.255`.
- `2001:db8::10/128`: una dirección IPv6.
- `2001:db8:1234::/64`: una subred IPv6.

Son rangos reservados para documentación; no los copies tal cual. Introduce las direcciones o redes reales de tus controladores. Puedes separar varias entradas con comas, puntos y coma, espacios o saltos de línea. RustDesk documenta esta configuración en su [referencia de configuración avanzada del cliente](https://rustdesk.com/docs/es/self-host/client-configuration/advanced-settings/#whitelist), y la [aplicación de esta restricción en el lado controlado es visible en el código fuente](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1410-L1437).

Utiliza los rangos más pequeños que resulten prácticos. Las direcciones de salida fijas de la oficina y los rangos de VPN conocidos son buenos candidatos. Las direcciones residenciales dinámicas y los controladores itinerantes no lo son. Confirma qué dirección de origen ve RustDesk en tu topología de NAT, VPN, conexión directa o relay, y prueba la nueva regla desde otra sesión antes de cerrar la sesión de trabajo actual. Una dirección o un CIDR incorrectos pueden dejar fuera al personal de soporte legítimo.

Una lista de IP permitidas restringe desde dónde puede originarse una conexión. No sustituye a una contraseña ni a la 2FA, y no puede detener a un controlador malicioso que ya esté operando desde una red permitida.

### 4. Limita qué IDs de RustDesk pueden conectarse

A partir de RustDesk 1.5.0, un dispositivo controlado también puede aceptar conexiones únicamente de los IDs de RustDesk que figuren en una lista. La interfaz en español llama a esta función **IDs admitidos** (*ID whitelisting* en inglés). Encaja con equipos de soporte cuyas direcciones de red cambian pero cuyos dispositivos de control son conocidos, cuando una lista de IP permitidas no resulta práctica.

Configúrala en:

- **Dispositivo controlado de escritorio:** **Ajustes → Seguridad → Seguridad → Usar lista de IDs admitidos**
- **Dispositivo controlado móvil:** **Ajustes → Compartir pantalla → Usar lista de IDs admitidos**

Introduce los IDs de RustDesk de los dispositivos que pueden controlar este. Como en la lista de IP, puedes separar las entradas con comas, puntos y coma, espacios o saltos de línea. La comparación no distingue entre mayúsculas y minúsculas, y se admiten dos comodines:

- `123456789`: un ID.
- `12345678?`: `?` coincide con exactamente un carácter, así que permite cualquier ID de nueve caracteres que empiece por `12345678`.
- `support-*`: `*` coincide con cualquier número de caracteres, lo que resulta útil cuando tus controladores usan IDs personalizados con un prefijo común.

Estos también son valores de ejemplo. La configuración aparece como `id-whitelist` en la [referencia de configuración avanzada del cliente](https://rustdesk.com/docs/es/self-host/client-configuration/advanced-settings/#id-whitelist), de modo que los administradores pueden predefinirla en un cliente personalizado, y [su aplicación es visible en el código fuente](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1439-L1467).

La comprobación se realiza cuando el controlador envía su solicitud de inicio de sesión, antes de verificar la contraseña o el código de 2FA. También se aplica cuando los dos extremos de una sesión intercambian sus roles, algo que de otro modo no requiere contraseña. Si además hay configurada una lista de IP permitidas, la conexión debe superar ambas. Un controlador rechazado ve el mensaje «Tu ID está bloqueado por el dispositivo remoto», y los intentos tienen un límite de frecuencia, por lo que la lista no puede sondearse rápidamente en busca de IDs permitidos.

Ten en cuenta su límite. El ID lo comunica el cliente que se conecta. No es una prueba de identidad, y un cliente modificado puede declarar un ID permitido; RustDesk muestra esta advertencia junto a la configuración. Lo que hace la lista es rechazar a los clientes normales con IDs que no figuran en ella antes de que lleguen a la solicitud de contraseña. En un dispositivo en el que un administrador ha predefinido la lista, quien llame y convenza al usuario de que le lea el ID y la contraseña sigue sin poder conectarse con el cliente estándar desde un ID que no esté en la lista. Mantén una contraseña fuerte y la 2FA, y prueba la lista desde otra sesión antes de cerrar una que funcione: un error tipográfico puede dejar fuera al personal de soporte legítimo.

## Qué no pueden hacer estas medidas

Las advertencias, la retirada de la tienda, el inicio de sesión obligatorio, las contraseñas fuertes, la 2FA y las listas de IP e ID permitidos le quitan, cada una, parte de su oportunidad a un atacante. Ninguna elimina el riesgo central de la ingeniería social: a una persona siempre se le puede convencer de aprobar el acceso o de revelar todos los factores.

El autoalojamiento tampoco hace que el abuso sea imposible. Le da a una organización el control de su servidor RustDesk y de sus políticas, pero un estafador también puede operar infraestructura privada o distribuir un cliente modificado. Las restricciones del servidor público de RustDesk solo se aplican al servidor público; un despliegue autoalojado funciona con las políticas que fije quien lo opera.

Si un desconocido te llama y te dice que instales RustDesk, inicies su servicio, compartas una contraseña, reveles un código de 2FA o abras el sitio web de tu banco, detente. Nuestra guía independiente de proveedores sobre [cómo detectar, prevenir y superar las estafas de escritorio remoto](/es/blog/estafas-de-escritorio-remoto-como-detectarlas-y-evitarlas) explica las señales de advertencia y qué hacer si el acceso ya ha sido concedido.

La responsabilidad aquí no es un único ajuste ni una declaración de buenas intenciones. Es el trabajo continuo de advertir a los usuarios, aceptar fricción donde el abuso lo exige, proporcionar controles técnicos, documentar sus límites y cambiar la respuesta a medida que los atacantes cambian sus métodos.
