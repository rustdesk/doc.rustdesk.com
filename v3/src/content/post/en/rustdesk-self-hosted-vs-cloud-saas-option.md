---
publishDate: 2026-07-08T12:07:00Z
lang: en
translationKey: rustdesk-self-hosted-vs-cloud-saas-option
draft: false
title: 'Does RustDesk Host the Server? Self-Hosted vs Cloud'
excerpt: "Does RustDesk offer a cloud or SaaS option? No. RustDesk Server Pro is self-hosted only — you deploy it on your own infrastructure. Here's what that means."
image: ~/assets/images/blog/rustdesk-self-hosted-vs-cloud-saas-option-og.png
category: Guides
tags:
  - RustDesk
  - self-hosting
  - deployment
author: RustDesk Team
faq:
  - question: 'Does RustDesk offer a cloud or SaaS-hosted option?'
    answer: 'No — RustDesk does not host the server for you. RustDesk Server Pro is a self-hosted solution only, with no SaaS or cloud-hosted option. You deploy and manage it on your own server infrastructure.'
  - question: 'Can I run RustDesk Server Pro on a cloud VM like AWS, Azure, or a VPS?'
    answer: 'Yes. Self-hosted means you run the server on infrastructure you control — an on-premises machine or a cloud VM such as a VPS, AWS, Azure, or GCP instance that you provision and administer. RustDesk supplies the software; you host it, and with low hardware requirements and light day-to-day upkeep, that is a modest responsibility.'
  - question: 'What is the difference between the free RustDesk OSS server and Server Pro?'
    answer: 'Both are self-hosted. The free open-source server covers core connectivity you can run indefinitely. Server Pro adds a web console, user and device management, device groups, and a shared address book; the custom branded client generator and identity features such as LDAP/AD and OIDC SSO are available from the Basic plan and up.'
  - question: 'Does RustDesk offer a monthly Server Pro plan?'
    answer: 'RustDesk Server Pro licenses are sold annually rather than month to month. Self-hosting and billing cadence are separate: you operate the server on infrastructure you control, while the commercial license is renewed yearly. Check the pricing page for current terms.'

metadata:
  description: "RustDesk has no hosted SaaS tier: Server Pro runs on infrastructure you control, on-prem or cloud VM. What self-hosting covers and how billing works."
  keywords: 'does RustDesk host the server, RustDesk self-hosted vs cloud, RustDesk monthly plan, RustDesk SaaS option'
---

No — RustDesk does not host the server for you. RustDesk Server Pro is a self-hosted product only, and there is currently no SaaS or cloud-hosted option. You run it on infrastructure you control.

## The short answer

"Self-hosted" fixes the division of labor: RustDesk supplies the server software and the license; you supply the host — an on-premises machine or a cloud VM (a VPS, AWS, Azure, or GCP instance) you provision and administer — and you operate the ID/rendezvous service, the relay, and the web console on it. There is no tier where RustDesk takes over that operating role for you.

## In detail

The distinction matters because it's different from how most remote-desktop tools you may be leaving — TeamViewer, AnyDesk, and similar products — are sold. Those are typically SaaS: the vendor runs the relay and rendezvous infrastructure, and you connect to their cloud. RustDesk's Server Pro flips that model. You get the server software and a license, and you stand up the service yourself.

In practice, "self-hosted" means you install the RustDesk server components (the rendezvous/ID server and relay server) on a host you own or rent, point your clients at it, and handle the usual operational duties: the operating system, networking and firewall rules, TLS certificates, backups, and updates. RustDesk provides the software; the hosting is yours, and the hardware requirements are low.

This has real trade-offs. On the plus side, self-hosting gives you control of the ID/rendezvous, relay, console, and stored deployment data. Direct sessions still flow between endpoints, so endpoint location and routing remain part of any compliance or privacy assessment. The trade-off is operational: you need someone comfortable provisioning a server and keeping it patched — mostly one-time setup, then light ongoing patching — and RustDesk support can help if you get stuck. If you were hoping to buy a login and have everything "just work" in someone else's cloud, that specific offering does not exist for Server Pro today.

If a fully managed, RustDesk-hosted service is a hard requirement for you, it's worth checking [rustdesk.com](https://rustdesk.com) for the latest, since product offerings can change over time. As of this writing, the answer from the team is clear: self-hosted only.

## Billing is annual, not monthly

Server location and billing cadence are easy to conflate. Self-hosting describes **who operates the infrastructure**; it does not mean the commercial license is a one-time purchase. RustDesk Server Pro licenses are sold on a yearly basis, with no monthly Server Pro plan currently listed. Compare the current term, login-user allowance, and managed-device allowance together on the [pricing page](https://rustdesk.com/pricing).

The free community server is different: it provides the core self-hosted ID and relay services and can be run indefinitely without a Server Pro subscription. Server Pro is the annual commercial option when you need the web console, centralized device administration, identity integration, access controls, or client generation.

## Who asks this

Shoppers arriving from SaaS remote-desktop products — IT admins and [MSPs](/blog/rustdesk-for-msps) alike — raise this early, often right after asking about a [free trial](/blog/rustdesk-server-pro-free-trial) and expecting a comparable cloud sign-up. Many phrase it as looking for "any cloud hosting option," assuming the paid product is simply a hosted upgrade. It isn't: the free experience and the paid Server Pro are both built around infrastructure you run, not a vendor-operated cloud. Teams with the in-house ability to manage a server tend to see the self-hosted model as a feature rather than a limitation.

## Related questions

- [What do I need to deploy RustDesk Server Pro on my own server?](/blog/self-host-rustdesk-server-hardware-at-scale)
- [How is RustDesk licensing structured — per user versus per device?](/blog/what-counts-as-a-managed-device)
- [Does self-hosting RustDesk keep my session data on my own infrastructure?](/blog/remote-desktop-data-sovereignty-gdpr)
- [How much does Server Pro cost, and how do I buy it?](/blog/rustdesk-pro-license-cost-how-to-pay)

Planning a migration from TeamViewer or AnyDesk? Spin up a server, point your clients at it, and you're in full control — see [rustdesk.com](https://rustdesk.com) for deployment guides and licensing details.
