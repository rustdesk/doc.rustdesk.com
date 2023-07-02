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

## Installation

Almost as the same as the open source version, but you do not need to run hbbs/hbbr with any arguments, all can be set later in web console.

- `-k _` is set by default
- `-r <server:host>` is not needed any more if the relay server runs on the same machine with hbbs, and you can set multiple relay servers in the web console

### One more port

One more tcp port `21114` is added for web console, please take care of this port when you set firewall rules and docker port mapping.
