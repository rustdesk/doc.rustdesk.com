---
title: Self-host
weight: 5
pre: "<b>2. </b>"
---

If you are using RustDesk you should have your own RustDesk Server, these docs will help you on your RustDesk journey.

Support is available via our [Discord](https://discord.com/invite/nDceKgxnkV) for OSS and [email](mailto:support@rustdesk.com) for Pro.

### Basic Setup

[Set up your own server instance manually.](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/#set-up-your-own-server-instance-manually)

### Ports Required

Ports required for RustDesk Server self-hosting depends largely on your environment and what you want to do with RustDesk. The Examples shown throughout the docs will generally have all ports suggested to be opened.

Core Ports: \
TCP `21114-21119` \
UDP `21116`

The above `21115-21117` are the minimum required ports for RustDesk to work, these handle the signal and relay ports as well as NAT traversal.

Additionally TCP ports `21118` and `21119` can be opened if you want to use the [RustDesk Web Client](https://rustdesk.com/docs/en/dev/build/web/).

For Pro users without an SSL Proxy you will need to open TCP port `21114` for the API to work alternatively using an SSL Proxy open TCP port `443`.

### Test Ports are opened

To check ports are opened and working you can use `test-netconnection domain.com -p 21115` with PowerShell or [CanYouSeeMe.org](https://canyouseeme.org/).

{{% children depth="3" showhidden="true" %}}
