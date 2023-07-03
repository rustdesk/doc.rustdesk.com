---
title: Pro
weight: 100
---

Self-host Pro is built on the open source version, but with more features.

- OIDC and ldap login
- Address book
- Rename 
- Log management
- Device managment
- Settings sync
- Permission control
- Multiple relay servers (serve you with the neareast one)

{{% notice note %}}
RustDesk client >=1.2.0 required
{{% /notice %}}

## Download

[https://github.com/rustdesk/rustdesk-server-pro/releases/tag/1.1.8](https://github.com/rustdesk/rustdesk-server-pro/releases/tag/1.1.8)

## Installation

Almost as the same as the open source version, but you do not need to run hbbs/hbbr with any arguments, all can be set later in web console.

# Simple Install

Copy and paste the above command into your linux terminal `curl -s https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`, takes care of everything.

{{% notice note %}}
Don't forget to get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), you will be required to enter license in the web console.
{{% /notice %}}

- `-k _` is set by default
- `-r <server:host>` is not needed any more if the relay server runs on the same machine with hbbs, and you can set multiple relay servers in the web console

### One more port (or use a proxy)

One more tcp port `21114` is added for web console, please take care of this port when you set firewall rules and docker port mapping.
