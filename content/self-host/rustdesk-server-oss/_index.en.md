---
title: RustDesk Server OSS
description: "Run your own RustDesk Server OSS deployment with the free and open-source self-hosted backend. Learn what is included, when to choose OSS, and how to install RustDesk ID and relay services."
keywords: ["rustdesk server oss", "rustdesk open source server", "self-hosted rustdesk server", "rustdesk hbbs", "rustdesk hbbr", "rustdesk docker", "rustdesk server install", "rustdesk relay server", "rustdesk id server", "rustdesk community self-hosting"]
weight: 100
pre: "<b>2.1. </b>"
---

RustDesk Server OSS is the free and open-source self-hosted backend for RustDesk. It lets you run your own ID and relay services, keep remote access traffic under infrastructure you control, and deploy RustDesk on your own cloud or on-prem environment.

Use RustDesk Server OSS when you want core self-hosting capabilities and are comfortable managing deployment, networking, and upgrades yourself. If you need a web console, API access, OIDC, LDAP, 2FA, device management, or other centralized admin features, compare it with [RustDesk Server Pro](/docs/en/self-host/rustdesk-server-pro/).

## What is included in RustDesk Server OSS?

- `hbbs` for RustDesk ID, rendezvous, and signaling.
- `hbbr` for relay traffic when direct peer-to-peer connectivity is not possible.
- Community support and deployment guidance through the documentation and [Discord](https://discord.com/invite/nDceKgxnkV).

## Get started with RustDesk Server OSS

- Start with the [Installation](/docs/en/self-host/rustdesk-server-oss/install/) guide for the standard deployment path.
- Use the [Docker](/docs/en/self-host/rustdesk-server-oss/docker/) guide if you want a container-based setup.
- Use [Windows & PM2 or NSSM](/docs/en/self-host/rustdesk-server-oss/windows/) for Windows hosts.
- Use the [Synology](/docs/en/self-host/rustdesk-server-oss/synology/) guide for NAS deployments.

{{% notice note %}}
If you build your own server on your home/office, and can't connect it through public IP/domain, please check [this article](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% children depth="3" showhidden="true" %}}
