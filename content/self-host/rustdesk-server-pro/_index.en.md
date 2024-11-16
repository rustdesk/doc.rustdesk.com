---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro has more features compared to the open source version.

- Account
- No concurrent connection limit, aka no limit of simultaneous connections (OSS version has no limit either, but TeamViewer etc. have this limit)
- [Web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- API
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Address book
- Rename
- Log management (Connection, file transfer, alarm, etc.)
- Device management
- [Security Settings sync](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Access control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Multiple relay servers](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (automatically selects your closest relay)
- [Custom client generator](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)

{{% notice note %}}
RustDesk Client ≥ 1.2.0 required
{{% /notice %}}
{{% notice note %}}
If you build you own server on your home/office, and can't connect it through public IP/domain, please check [this article](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

### Hardware requirement

Lowest level VPS is enough for your use case. The server software is not CPU and memory intensive. Our public ID server hosted on a 2 CPU/4 GB Vultr server serves 1.5+ million endpoints.

### Video tutorials

There are many video tutorials available online that can guide you through installing the OSS version, https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/#video-tutorials.

The installation of the Pro version is almost identical, except for the following differences:

- Different download path and Docker images are required.
- An additional TCP port (21114) is needed for the web console.

### License

You can get license from https://rustdesk.com/pricing.html, check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.

### Download

[https://github.com/rustdesk/rustdesk-server-pro/releases/latest](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)

### Installation

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

For me details, please check [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

{{% notice note %}}
Don't forget to get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.
{{% /notice %}}

#### Ports Required

You need port 21114-21119 TCP and 21116 UDP open, please ensure these ports are setup when you set firewall rules and Docker port mapping.

More information about these ports, please check [here](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### Upgrade

This [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) covers how to upgrade RustDesk Server Pro from a lower version, addressing different installation methods.

### Setup HTTPS for web console

The simple install script includes HTTPS setup, but it may fail or you do not like it. It can not be used for the other installation methods.

Here is a simple tutorial of [manual HTTPS setup](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### Migrate to new host and backup / restore

Here is a detailed [tutorial](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

### Migrate license

Please follow this [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).
