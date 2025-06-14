---
title: Auto-hospedaje
weight: 5
pre: "<b>2. </b>"
---

Si estás usando RustDesk deberías tener tu propio servidor RustDesk, estos documentos te ayudarán en tu viaje con RustDesk.

El soporte está disponible a través de nuestro [Discord](https://discord.com/invite/nDceKgxnkV) para OSS y por [email](mailto:support@rustdesk.com) para Pro.

### ¿Cómo funciona el servidor auto-hospedado?

Técnicamente hay dos ejecutables (servidores):

- `hbbs` - Servidor de ID RustDesk (encuentro / señalización), escucha en TCP (`21114` - para http solo en Pro, `21115`, `21116`, `21118` para web socket) y UDP (`21116`)
- `hbbr` - Servidor de retransmisión RustDesk, escucha en TCP (`21117`, `21119` para web socket)

Cuando instalas a través de script de instalación / docker compose / deb, ambos servicios serán instalados.

Aquí están las [ilustraciones](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) de cómo el cliente RustDesk se comunica con `hbbr` / `hbbs`.

Mientras RustDesk esté ejecutándose en una máquina, la máquina hace ping constantemente al servidor de ID (`hbbs`) para dar a conocer su dirección IP y puerto actuales.

Cuando inicias una conexión de la computadora A a la computadora B, la computadora A contacta al servidor de ID y solicita comunicarse con la computadora B.

El servidor de ID entonces intenta conectar A y B directamente entre sí usando hole punching.

Si el hole punching falla, A se comunicará con B a través del servidor de retransmisión (`hbbr`).

En la mayoría de los casos, el hole punching es exitoso, y el servidor de retransmisión nunca se usa.

Aquí hay una discusión sobre [¿Deberías auto-hospedar un servidor rustdesk?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

### Puertos Requeridos

Los puertos requeridos para el auto-hospedaje del servidor RustDesk dependen en gran medida de tu entorno y lo que quieras hacer con RustDesk. Los ejemplos mostrados a lo largo de la documentación generalmente tendrán todos los puertos sugeridos para ser abiertos.

Puertos Principales: \
TCP `21114-21119` \
UDP `21116`

Los `21115-21117` anteriores son los puertos mínimos requeridos para que RustDesk funcione, estos manejan los puertos de señal y retransmisión así como la traversía NAT.

Los puertos TCP `21118` y `21119` son los puertos WebSocket para el [Cliente Web RustDesk](https://rustdesk.com/web/), necesitas un proxy reverso para hacer que soporte HTTPS, por favor consulta esta [configuración de ejemplo de Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client).

Para usuarios Pro sin un Proxy SSL necesitarás abrir el puerto TCP `21114` para que la API funcione alternativamente usando un Proxy SSL abre el puerto TCP `443`.

{{% children depth="4" showhidden="true" %}}
