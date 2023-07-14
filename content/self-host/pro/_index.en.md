---
title: Pro
weight: 100
---

Self-host Pro is built on the open source version, but with more features.

- OIDC, LDAP, 2FA (email verification)
- Address book
- Rename
- Log management
- Device management
- Settings sync
- Permission control
- Multiple relay servers (automatically selects your closest relay)

{{% notice note %}}
RustDesk client >= 1.2.0 required
{{% /notice %}}

## Download

[https://github.com/rustdesk/rustdesk-server-pro/releases/latest](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)

## Installation

### Simple Install

To make life easy, we have developed scripts which take care of everything (install/upgrade/convert from open source) [Simple Install Script](https://rustdesk.com/docs/en/self-host/pro/installscript/).

{{% notice note %}}
Don't forget to get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
{{% /notice %}}

### Manual Installation

Almost as the same as [the open source version](/docs/en/self-host/install/), but you do not need to run hbbs/hbbr with any arguments, all can be set later in web console.

- `-k _` is set by default
- `-r <server:host>` is not needed any more if the relay server runs on the same machine with hbbs, and you can set multiple relay servers in the web console

### One more port (or use a proxy)

One more TCP port `21114` is added for web console, please also add this port when you set firewall rules and docker port mapping.
