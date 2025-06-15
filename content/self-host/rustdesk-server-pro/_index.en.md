---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro has more features compared to the open source version.

- Account
- [Web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Address book
- Log management (Connection, file transfer, alarm, etc.)
- Device management
- [Security Settings sync](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Access control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Multiple relay servers](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (automatically selects your closest relay)
- [Custom client generator](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Web client self-host

{{% notice note %}}
If you build your own server on your home/office, and can't connect it through public IP/domain, please check [this article](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
We recommend reading this first before proceeding, [How does self-hosted server work?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Hardware requirement

Lowest level VPS is enough for your use cases. The server software is not CPU and memory intensive. Our public ID server hosted on a 2 CPU/4 GB Vultr server serves 1.0+ million endpoints. Each relay connection consumes avg 180kb per second. 1 cpu core and 1G ram is enough to support 1000 relay concurrent connections.

## Article tutorials
[Step-by-Step Guide: Self-Host RustDesk Server Pro on Cloud via Docker for Secure Remote Access](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Video tutorials

[Beginner's Guide: Self-Host RustDesk Server Pro for Novice Linux User](https://www.youtube.com/watch?v=MclmfYR3frk)

[Quick Guide: Self-Host RustDesk Server Pro for Adavanced Linux User](https://youtu.be/gMKFEziajmo)


## License

You can get license from https://rustdesk.com/pricing.html, check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.

## Get started
### 1, Installation

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

For more details, please check [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2, Ports Required

You need port `21114`-`21119` TCP and `21116` UDP open, please ensure these ports are setup when you set firewall rules and Docker port mapping.

More information about these ports, please check [here](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3, Set license

Open your web console by accessing `http://<server ip>:21114`, [log in](/docs/en/self-host/rustdesk-server-pro/console/#log-in) using the default credentials admin/test1234 `admin`/`test1234`. Follow [this guide](/docs/en/self-host/rustdesk-server-pro/license/#set-license) to set the license.

### 4, Setup HTTPS for web console

> You can skip this step if you don't want to use HTTPS during the trial, but remember to change the client's API address after you set up HTTPS

Here is a simple tutorial of [manual HTTPS setup](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5, Configure client to use the self-hosted server

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6, Set up WebSocket

To enable web client or [desktop / mobile client](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket) work properly with WebSocket, you need to add the following settings to your reverse proxy configuration.

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## Upgrade Server

This [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) covers how to upgrade RustDesk Server Pro from a lower version, addressing different installation methods.

## Migrate to new host and backup / restore

Here is a detailed [tutorial](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Migrate license

Please follow this [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Upgrade license

Follow [this guide](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) to upgrade your license for more users and devices at any time.

## About security

https://github.com/rustdesk/rustdesk/discussions/9835
