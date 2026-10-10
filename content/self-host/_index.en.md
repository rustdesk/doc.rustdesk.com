---
title: Self-host
description: "Learn how to self-host your own RustDesk server. Complete guide covering installation, configuration, and deployment of RustDesk server infrastructure for secure remote desktop access."
keywords: ["rustdesk self-host", "rustdesk server", "remote desktop server", "self-hosting guide", "rustdesk installation", "hbbs hbbr", "rustdesk pro server"]
weight: 5
pre: "<b>2. </b>"
---

Self-hosting RustDesk lets you control your own ID and relay infrastructure, keep deployment data on systems you manage, and optimize remote access for your network and compliance requirements.

Support is available via our [Discord](https://discord.com/invite/nDceKgxnkV) for OSS and [email](mailto:support@rustdesk.com) for Pro.

{{% notice note %}}
Background reading: [why self-host remote desktop software](https://rustdesk.com/blog/why-self-host-remote-desktop-software).
{{% /notice %}}

## Which RustDesk server should you choose?

| Option | Best for | What you get |
| --- | --- | --- |
| [RustDesk Server OSS](/docs/en/self-host/rustdesk-server-oss/) | Individuals and teams that want a free, open-source self-hosted backend | `hbbs` and `hbbr`, community support, manual deployment and configuration |
| [RustDesk Server Pro](/docs/en/self-host/rustdesk-server-pro/) | Businesses that need centralized administration and enterprise features | Web console, API, OIDC, LDAP, 2FA, device management, access control, and multi-relay management |

## How does self-hosted server work?

There are technically two executables (servers):

- `hbbs` - RustDesk ID (rendezvous / signaling) server, listen on TCP (`21114` - for http in Pro only, `21115`, `21116`, `21118` for web socket) and UDP (`21116`)
- `hbbr` - RustDesk relay server, listen on TCP (`21117`, `21119` for web socket)

When you install via installation script / docker compose / deb, the two services will be both installed.

Here are [illustrations](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) of how RustDesk client communicates with `hbbr` / `hbbs`.

As long as RustDesk is running on a machine, the machine constantly pings the ID server (`hbbs`) to make its current IP address and port known.

When you start a connection from computer A to computer B, computer A contacts the ID server and requests to communicate with computer B.

The ID server then attempts to connect A and B directly to each other using hole punching.

If hole punching fails, A will communicate with B via the relay server (`hbbr`).

In the majority of cases, hole punching is successful, and the relay server is never used.

Here is a discussion about [Should you self-host a rustdesk server?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Ports Required

The ports required for RustDesk Server self-hosting depend largely on your environment and what you want to do with RustDesk. The examples shown throughout the docs generally suggest opening all ports.

Core Ports: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: Used for the HTTP API server in RustDesk Server Pro.
- TCP `21115`: Used for the NAT type test.
- UDP `21116`: Used for device registration.
- TCP `21116`: Used for device registration and NAT hole punching.
- TCP `21117`: Used for relay communication.
- TCP `21118`: Used for WebSocket communication.
- TCP `21119`: Used for WebSocket communication.

Ports `21115`-`21117` are the minimum required ports for RustDesk to work. These handle signal, relay, and NAT traversal.

For WSS configuration, TCP `21118` and TCP `21119` usually do not need to be exposed externally because they are accessed internally by the reverse proxy, such as Nginx. If you do not use WebSocket, these ports do not need to be exposed. Please refer to this [sample Nginx configuration](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

For Pro users without an SSL proxy, you need to open TCP port `21114` for the API to work. If HTTPS (`443`) is configured for the server, TCP `21114` does not need to be exposed to the Internet.

RustDesk also supports a deployment mode where only TCP `443` is exposed and all other ports are closed. With this configuration, communication can only work through WSS relay, and direct peer-to-peer connections are not available.

{{% children depth="4" showhidden="true" %}}
