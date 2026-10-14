---
publishDate: 2026-07-07T18:21:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: why-self-host-remote-desktop-software
draft: false
title: 'Why Self-Host Your Remote Desktop Software'
excerpt: 'Why teams leaving TeamViewer and AnyDesk self-host remote desktop: you choose where the servers run, who operates them, and what you pay for.'
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: Guides
tags:
  - RustDesk
  - self-hosting
author: RustDesk Team
faq:
  - question: 'What does it mean to self-host remote desktop software?'
    answer: "Self-hosting remote desktop software means running the connection server (RustDesk's ID/rendezvous service) and the fallback relay on infrastructure you control instead of a vendor's cloud. With RustDesk Server Pro the web console and device data live there too; direct sessions still travel endpoint to endpoint."
  - question: 'What does running a self-hosted RustDesk server actually involve?'
    answer: 'A small Linux host, a few open ports and routine upkeep. Provision a VM, open TCP 21115-21117 and UDP 21116 for native RustDesk clients, put the Server Pro console and API behind HTTPS on port 443, and schedule backups you have test-restored. After that, the ongoing work is patching, monitoring, relay capacity and certificate renewal.'
  - question: 'Does self-hosting help with data residency and GDPR compliance?'
    answer: 'Yes. Self-hosting RustDesk lets you choose where the ID/rendezvous, relay, console and device data run and who operates them, which is the control data-residency rules ask about. It is a deployment control, not a compliance certification: direct sessions still travel between endpoints, so GDPR compliance also depends on routing, retention and your wider program.'
  - question: 'Is self-hosting right for every team?'
    answer: 'No, but it fits most teams that already run their own infrastructure and want control of their remote-access servers. RustDesk Server OSS, the free community server, has no license fee, and RustDesk Server Pro adds the web console, Access Control and SSO. Teams that want no server to operate at all are better served by a managed service.'

metadata:
  description: 'The case for self-hosting remote desktop: you choose where the servers run and who operates them. RustDesk Server OSS and Server Pro as the worked example.'
  keywords: 'why self-host remote desktop, self-hosted remote desktop benefits, on-premise remote access, remote desktop without vendor cloud'
---

Most remote-desktop tools are sold one way: as a cloud subscription, with the vendor's servers coordinating sessions and relaying them when a direct path fails. Self-hosting moves those roles onto infrastructure you control: clients coordinate through your ID/rendezvous server, connect directly when possible and fall back to your relay. This article makes the case, using RustDesk Server OSS (the free community server) and Server Pro as the concrete example.

## What "self-host remote desktop" actually means

The cost of cloud-only convenience is that your device list, your connection metadata, and sometimes your session traffic pass through a third party — on their uptime, under their pricing, subject to their security posture.

Self-hosting reverses that. With RustDesk, your team runs the ID/rendezvous and relay services, and Server Pro also places the web console and stored device data on your infrastructure. Direct sessions flow between the endpoints; relayed sessions use your relay. RustDesk's **client and Server OSS are [AGPL-licensed](https://github.com/rustdesk/rustdesk)**; **Server Pro is commercial, proprietary self-hosted server software**.

## Cloud-only vs. self-hosted, at a glance

|                                          | Typical cloud-only tool                                     | Self-hosted (RustDesk Server Pro)                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Where sessions are brokered              | Vendor's cloud                                              | Your on-prem box or VPS                                                                                                            |
| Data residency                           | Vendor-controlled                                           | Server-side services run on infrastructure you control; [endpoint routes still matter](/blog/remote-desktop-data-sovereignty-gdpr) |
| Licensed concurrent connections/channels | Plan-dependent allowance                                    | Unlimited on standard plans; Customized V2 has a licensed allowance                                                                |
| Pricing model                            | Product-specific users, endpoints and connection allowances | [Login users plus managed devices](https://rustdesk.com/pricing); Customized V2 also licenses concurrency                          |
| Source code                              | Product-dependent, commonly proprietary                     | Auditable AGPL client                                                                                                              |
| Outage dependency                        | Vendor uptime                                               | Your own ops                                                                                                                       |
| Who runs the server                      | Vendor                                                      | You                                                                                                                                |

Self-hosting doesn't cost you capability. For [MSPs](/blog/rustdesk-for-msps) and internal IT, Server Pro adds a self-hosted web console with per-user and device-group [Access Control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/), plus a custom client generator and [LDAP/OIDC SSO](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/) from the Basic plan. Nor does it cost you scale: RustDesk's public server recorded more than two million online endpoints on one 12-core, 32 GB host on July 7, 2026 (internal telemetry), and the [large-fleet planning guide](/blog/rustdesk-scale-50000-200000-devices) covers what to validate for Server Pro.

## What running the server actually involves

The control comes with operational work: a one-time setup, then routine upkeep. Here's the concrete list:

- **Provision a host.** RustDesk's hardware requirements are low, so a modest Linux VM — on-prem or an inexpensive VPS — runs the ID/rendezvous and relay services. Size it for your device count and how much traffic ends up relayed rather than peer-to-peer.
- **Open only the ports you use.** Native RustDesk clients require **TCP 21115-21117 and UDP 21116** for NAT testing, connection services, registration, heartbeat, and relay. Do not expose the whole 21114-21119 range. TCP 21118-21119 are WebSocket backends, and TCP 21114 is the Pro HTTP API/console backend. When an HTTPS/WSS reverse proxy fronts the Pro API and WebSocket services, expose only TCP 443 publicly for that traffic and keep 21114 and 21118-21119 internal. Public 443 does not replace the native-client core ports when native clients also connect. See the [official port reference](https://rustdesk.com/docs/en/self-host/).
- **Set up TLS.** Terminate HTTPS and WSS at the reverse proxy so credentials, API calls, and browser-client traffic use public TCP 443 rather than exposing the plain-HTTP console/API or raw WebSocket backends.
- **Back up.** The server holds your device inventory, user accounts, address book, and access rules. Schedule backups — and actually test that you can restore from them.
- **Keep a patch cadence.** New server builds ship over time, and you own the OS underneath. Decide who applies updates and how often.
- **Monitor it.** The coordinating service is now yours, so you watch uptime, disk, and relay throughput, and you own the alerting and recovery.

None of this is exotic for a team that already runs Linux servers. Assign an owner and a schedule for updates, backups, certificate renewal and restore tests, and the server runs as routine infrastructure.

## How to evaluate self-hosting

- **Start with Server OSS.** Deploy it this afternoon, inspect the code and run it as long as you like: there is no license fee or expiry, only your own hosting and bandwidth.
- **Need the Pro feature set?** Current plan rates are at [rustdesk.com/pricing](https://rustdesk.com/pricing), and [sales@rustdesk.com](mailto:sales@rustdesk.com) can tell you which evaluation options exist right now.
- **Rather watch than install?** There's a full video demo on the [RustDesk YouTube channel](https://www.youtube.com/@rustdesk).

If price changes, closed code or a vendor cloud pushed you to look, self-hosting is the structural fix, not a discount: you choose where the servers run and who operates them. For a team already running infrastructure it is a next step, not a leap; pilot on Server OSS, size the relay for your peak sessions, and move the fleet when the workflow holds.
