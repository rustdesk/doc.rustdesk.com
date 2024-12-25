---
title: Self-host
weight: 5
pre: "<b>2. </b>"
---

If you are using RustDesk you should have your own RustDesk Server, these docs will help you on your RustDesk journey.

Support is available via our [Discord](https://discord.com/invite/nDceKgxnkV) for OSS and [email](mailto:support@rustdesk.com) for Pro.

### How does self-hosted server work?

There are technically two executables (servers):

- `hbbs` - RustDesk ID (rendezvous / signaling) server, listen on TCP (`21114` - for http in Pro only, `21115`, `21116`, `21118` for web socket) and UDP (`21116`)
- `hbbr` - RustDesk relay server, listen on TCP (`21117`, `21119` for web socket)

When you install via installation script / docker compose / deb, the two services will be both installed.

Here is [illustrations](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) of how RustDesk client communicates with `hbbr` / `hbbs`.

As long as RustDesk is running on a machine, the machine constantly pings the ID server (`hbbs`) to make its current IP address and port known.

When you start a connection from computer A to computer B, computer A contacts the ID server and requests to communicate with computer B.

The ID server then attempts to connect A and B directly to each other using hole punching.

If hole punching fails, A will communicate with B via the relay server (`hbbr`).

In the majority of cases, hole punching is successful, and the relay server is never used.

Here is a discussion about [Should you self-host a rustdesk server?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

### Basic Setup

[Set up your own server instance manually.](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/#set-up-your-own-server-instance-manually)

### Ports Required

Ports required for RustDesk Server self-hosting depends largely on your environment and what you want to do with RustDesk. The Examples shown throughout the docs will generally have all ports suggested to be opened.

Core Ports: \
TCP `21114-21119` \
UDP `21116`

The above `21115-21117` are the minimum required ports for RustDesk to work, these handle the signal and relay ports as well as NAT traversal.

TCP ports `21118` and `21119` are the WebSocket ports for the [RustDesk Web Client](https://rustdesk.com/web/), you need a reverse proxy to make it support HTTPS, please refer this [sample Nginx configuration](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client).

For Pro users without an SSL Proxy you will need to open TCP port `21114` for the API to work alternatively using an SSL Proxy open TCP port `443`.

### Test Ports are opened

To check ports are opened and working you can use `test-netconnection domain.com -p 21115` with PowerShell or [CanYouSeeMe.org](https://canyouseeme.org/).

{{% children depth="4" showhidden="true" %}}
