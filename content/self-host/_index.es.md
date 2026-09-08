---
title: Auto-hospedaje
description: "Aprende cómo auto-hospedar tu propio servidor RustDesk. Guía completa que cubre instalación, configuración y despliegue de infraestructura de servidor RustDesk para acceso seguro a escritorio remoto."
keywords: ["rustdesk auto-hospedaje", "servidor rustdesk", "servidor escritorio remoto", "guía auto-hospedaje", "instalación rustdesk", "hbbs hbbr", "servidor rustdesk pro"]
weight: 5
pre: "<b>2. </b>"
---

Si estás usando RustDesk deberías tener tu propio servidor RustDesk, estos documentos te ayudarán en tu viaje con RustDesk.

El soporte está disponible a través de nuestro [Discord](https://discord.com/invite/nDceKgxnkV) para OSS y por [email](mailto:support@rustdesk.com) para Pro.

## ¿Cómo funciona el servidor auto-hospedado?

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

## Puertos Requeridos

Los puertos requeridos para el auto-hospedaje del servidor RustDesk dependen en gran medida de tu entorno y lo que quieras hacer con RustDesk. Los ejemplos mostrados a lo largo de la documentación generalmente tendrán todos los puertos sugeridos para ser abiertos.

Puertos Principales: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: Se usa para el servidor API HTTP en RustDesk Server Pro.
- TCP `21115`: Se usa para la prueba de tipo de NAT.
- UDP `21116`: Se usa para el registro de dispositivos.
- TCP `21116`: Se usa para el registro de dispositivos y la perforación NAT.
- TCP `21117`: Se usa para la comunicación de retransmisión.
- TCP `21118`: Se usa para la comunicación WebSocket.
- TCP `21119`: Se usa para la comunicación WebSocket.

Los puertos `21115`-`21117` son los puertos mínimos requeridos para que RustDesk funcione. Estos manejan señalización, retransmisión y travesía NAT.

Para una configuración WSS, los puertos TCP `21118` y TCP `21119` normalmente no necesitan exponerse externamente porque el proxy inverso, como Nginx, accede a ellos internamente. Si no usas WebSocket, estos puertos no necesitan exponerse. Consulta esta [configuración de ejemplo de Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Para usuarios Pro sin un proxy SSL, debes abrir el puerto TCP `21114` para que la API funcione. Si HTTPS (`443`) está configurado para el servidor, TCP `21114` no necesita exponerse a Internet.

RustDesk también admite un modo de despliegue en el que solo se expone TCP `443` y todos los demás puertos están cerrados. Con esta configuración, la comunicación solo puede funcionar mediante retransmisión WSS, y las conexiones directas punto a punto no están disponibles.

{{% children depth="4" showhidden="true" %}}
