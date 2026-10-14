---
publishDate: 2026-07-05T19:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-for-msps
draft: false
title: 'RustDesk for MSPs: One Self-Hosted, Brandable Tool'
excerpt: 'Compare consolidating TeamViewer, AnyDesk, and ScreenConnect onto one self-hosted, brandable remote-support platform.'
image: ~/assets/images/blog/rustdesk-for-msps-og.webp
category: Guides
tags:
  - RustDesk
  - MSP
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Can RustDesk consolidate multiple MSP remote-support tools?'
    answer: 'Yes, for remote control and support. RustDesk Server Pro gives an MSP one self-hosted console, branded clients from the Basic plan, per-user and device-group Access Control, and unlimited concurrent connections on standard plans, in place of separate consoles and contracts. Pilot the PSA/RMM integrations you depend on first.'
  - question: 'How does RustDesk license for MSPs?'
    answer: 'You pay per login-user (your technicians) and per managed-device (the machines you support), and standard plans include unlimited concurrent connections so several techs can run sessions at once without buying channels. Only Customized V2 licenses a set number of concurrent connections; see rustdesk.com/pricing.'
  - question: 'Can I white-label or brand the RustDesk client?'
    answer: 'Yes. RustDesk Server Pro includes a custom client generator, available from the Basic plan and up, that builds a client with your own name, logo, icon and server configuration. Your customers install a tool that carries your brand and connects to your server, rather than a vendor-branded download.'
  - question: 'Is RustDesk self-hosted, and who runs the server?'
    answer: 'Yes. RustDesk Server Pro is self-hosted: the MSP runs the ID/rendezvous server, relay, web console and stored management data on its own on-prem host or VPS, and owns patching, monitoring, backups and certificates. RustDesk Server OSS, the free community server, provides ID/rendezvous and relay without Pro management.'
  - question: 'How should an MSP start evaluating RustDesk?'
    answer: 'Start with RustDesk Server OSS, the free community server, on a test VM: it has no license fee or expiry, so technicians can validate a representative support workflow before paying. Add Server Pro when the team needs the web console, branded clients or Access Control, and email sales@rustdesk.com for current evaluation terms.'

metadata:
  description: 'RustDesk for MSPs: a self-hosted ScreenConnect/TeamViewer alternative with branded clients, Access Control and unlimited concurrency on standard plans.'
  keywords: 'RustDesk for MSPs, self-hosted remote support for MSPs, white-label remote desktop for MSPs, MSP remote support tool, per-technician remote desktop licensing'
---

Most MSPs are not looking for another remote-support tool. They are looking for _fewer_ of them: a cloud remote-support seat here, a per-technician tool there, a standalone quick-support utility for one-off jobs, each with its own console, contract and renewal. RustDesk replaces that pile with one self-hosted, brandable platform; pilot the PSA/RMM integrations and endpoint workflows your technicians rely on before you retire anything.

This guide covers RustDesk's open client, self-hosted server options, commercial Pro administration, branding and licensing for MSP workflows.

## Operate the remote-access services yourself

RustDesk Server Pro is **self-hosted**: your team operates ID/rendezvous, relay, console and stored management data. RustDesk's client and RustDesk Server OSS (the free community server) are **[AGPL-licensed](https://github.com/rustdesk/rustdesk)**; Server Pro is commercial, proprietary self-hosted server software. When a client's security review asks "what is this agent doing on our endpoints?", you can point at the client source instead of a closed binary, and you choose where the server-side services run.

Here is how one self-hosted platform maps against the pile MSPs consolidate away from:

|                                          | Separate cloud remote-support tools     | RustDesk Server Pro                                                                                         |
| ---------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Consoles to manage                       | One per tool                            | Single self-hosted console                                                                                  |
| Client branding                          | Product- and plan-dependent             | Custom-branded client generator from Basic and up                                                           |
| Hosting                                  | Vendor cloud                            | Self-hosted (on-prem or your VPS)                                                                           |
| Source                                   | Product-dependent, commonly proprietary | Auditable AGPL client                                                                                       |
| Licensed concurrent connections/channels | Plan-dependent allowance                | Unlimited on standard plans; [Customized V2](https://rustdesk.com/pricing#custom2) has a licensed allowance |
| Licensing basis                          | Per seat / per channel                  | [Per login-user + per managed-device](https://rustdesk.com/pricing)                                         |

For exact plan tiers and current prices, see [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Plan-dependent concurrent connections

You pay for authorized login users (typically technicians) and managed devices. Standard plans include unlimited concurrent connections, so when three engineers work three different client sites at once during an outage, that is just Tuesday, not a metered event. If you have been rationing simultaneous sessions or timing your team around a channel count, that constraint goes away on standard plans.

Only [Customized V2](https://rustdesk.com/pricing#custom2) licenses a set number of concurrent connections. In RustDesk's [concurrency definition](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections), a concurrent connection is an active controlling device, a "channel": one technician machine with five session tabs uses one channel, and three technician machines active at once use three. Customized V2 also counts only devices assigned to a user or device group as managed devices, so one-off support machines are neither counted nor disabled; see [what counts as a managed device](/blog/what-counts-as-a-managed-device).

## Brand it, and put access control on it

Server Pro gives an MSP a self-hosted web console and three distinct controls. [Access Control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/) decides which technicians can reach which devices, through user and device-group rules; each device belongs to one device group, and user-group and device-group permissions are cumulative. The shared address book organizes entries for technicians; it is not an access boundary. [Control Role](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/control-role/) limits what a technician can do inside a session. The custom client generator and LDAP/OIDC SSO start at the Basic plan.

The branded client matters because your customers install a tool with your name, logo and server settings, not a vendor's. Access Control lets you scope each technician to the device groups of the client sites they serve.

## Control over server-side data location

Self-hosting lets an MSP choose where the ID/rendezvous, relay, console and stored device data run and who operates them, which is often the deciding point for regulated customers. It is a deployment control, not a compliance certification: direct sessions still travel between endpoints, so map endpoint locations and routing as covered in [Remote Desktop Data Sovereignty & GDPR](/blog/remote-desktop-data-sovereignty-gdpr).

## Put it to the test on your own terms

You can evaluate RustDesk today with no meeting booked:

- **Stand up Server OSS on a spare VM.** It has no license fee or expiry, so you can validate a real client workflow before spending anything.
- **When branding and access control enter the picture,** compare tiers at [rustdesk.com/pricing](https://rustdesk.com/pricing) and ask [sales@rustdesk.com](mailto:sales@rustdesk.com) what evaluation terms currently apply.
- **Short on lab time?** See RustDesk in action first, or browse the walkthroughs on the [RustDesk YouTube channel](https://www.youtube.com/@rustdesk).

You can **[upgrade any time](/blog/upgrade-rustdesk-license-mid-subscription)** as your client base grows: the upgrade extends your license to one full year from the upgrade date and credits the remaining paid value. Start at [rustdesk.com/pricing](https://rustdesk.com/pricing).
