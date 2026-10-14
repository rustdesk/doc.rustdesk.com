---
publishDate: 2026-06-28T16:50:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'Can RustDesk Server Pro Run Offline or Air-Gapped?'
excerpt: "No — self-hosted RustDesk Server Pro needs ongoing outbound access to rustdesk.com to validate its license, so a fully air-gapped deployment isn't supported."
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: Deployment
tags:
  - RustDesk
  - deployment
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Can RustDesk Server Pro run offline or air-gapped?'
    answer: 'No. RustDesk Server Pro checks its license with rustdesk.com over outbound HTTPS (port 443) about once a day and keeps retrying for about 7 days if a check fails, so a permanently air-gapped Pro deployment is outside the standard licensing model. A proxy is supported. RustDesk Server OSS, the free community server, has no license check.'
  - question: 'Does RustDesk Server Pro need a permanent internet connection?'
    answer: 'It needs ongoing outbound access to rustdesk.com for license validation, but not a literally uninterrupted one. The server checks in over port 443 about once a day and, if a check fails, keeps retrying until it succeeds or roughly seven days pass — so a brief outage is tolerated, but a server cut off from rustdesk.com for longer than that grace window stops validating. Remote sessions themselves are brokered by your own self-hosted relay and ID (rendezvous) servers.'
  - question: 'Which outbound access does an isolated RustDesk Server Pro deployment need?'
    answer: 'Allow outbound HTTPS from the server to rustdesk.com for license validation, plus the custom client build service if you generate branded clients. A proxy is supported, so the rest of the network can stay locked down. Other outbound workflows to plan for are client updates and any external identity provider you connect.'
  - question: 'Is there a fully air-gapped RustDesk licensing option?'
    answer: 'No. The standard RustDesk Server Pro license requires periodic online verification. RustDesk Server OSS, the free community server, has no license check: its ID/rendezvous and relay services run inside an isolated network, without the Pro web console or management features. For a hard air-gap requirement on Pro, contact sales@rustdesk.com with your scenario.'
metadata:
  description: "Can self-hosted RustDesk Server Pro run air-gapped? No — the Pro license needs ongoing outbound access to rustdesk.com, so a full air gap isn't supported."
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, rustdesk self-hosted internet requirement, rustdesk server pro license check, rustdesk offline deployment, does rustdesk need internet'
---

No — a self-hosted RustDesk Server Pro deployment is not designed to run fully offline or air-gapped. The Pro license has to reach rustdesk.com over an outbound connection to stay valid — both when you activate it and on an ongoing basis while the server runs — so a fully isolated network falls outside the supported model.

## The short answer

The [official license-check FAQ](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) describes periodic verification: the server contacts rustdesk.com over port 443 roughly once a day, and if a check fails it retries until it either succeeds or about seven days elapse — after which the license stops validating. That built-in grace window means a short internet outage will not immediately break your deployment, but a permanently offline server will. Your ID and relay services stay self-hosted; direct sessions flow between endpoints and relayed sessions use your relay. A proxy is supported, so you can allow the required outbound HTTPS path and lock the rest of the network down.

## In detail

This requirement applies to **Server Pro**. **RustDesk Server OSS (the free community server)** has no license check. RustDesk's client and Server OSS are AGPL-licensed; Server Pro is commercial, proprietary self-hosted server software. In an isolated network, clients and local ID/relay services still need working routes, correct keys and platform permissions. Direct ID-negotiated sessions travel between endpoints; relayed sessions use your server. ID-based sessions are end-to-end encrypted when clients carry your server's public key, while [Direct IP Access is unencrypted](https://github.com/rustdesk/rustdesk/wiki/FAQ), so it is not a substitute for a properly configured ID connection.

One more workflow to account for: **building a custom client**. If you generate a branded or pre-configured client from Server Pro, that build runs on RustDesk's build service, so it also needs outbound access. The submitted configuration is deleted once the build completes and the installer is auto-removed after about a day, so download it and keep it in your own repository.

For a strictly air-gapped network, this is the deciding detail: a server that can _never_ reach rustdesk.com falls outside the default model, so if you have hard air-gap requirements, confirm your exact scenario with RustDesk before committing. For the far more common "mostly isolated, tight egress" setup, budget for one outbound HTTPS path to rustdesk.com — directly or via a proxy — and define the exact domains, ports, and approval workflow before you write the firewall policy. See the [RustDesk docs](https://rustdesk.com/docs), and note that the same license requirement is why you [cannot run Server Pro without any internet access even when installing without Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/).

## Inventory every outbound dependency

Security teams and [MSPs](/blog/rustdesk-for-msps) serving locked-down environments usually ask this before RustDesk is installed. Their Server Pro egress list is short: license validation to rustdesk.com over HTTPS, the custom client build service if you generate branded clients, client updates, SMTP if your mail server sits outside the network, and any external identity provider you connect. The ID/rendezvous server, relay and console run inside your network, so a precise firewall rule replaces over-opening the network.

## Related questions

- Outbound domains and ports: see the [RustDesk docs](https://rustdesk.com/docs).
- [Can I install RustDesk Server Pro without Docker on a plain VM?](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/)
- Generating a custom-branded client: see the [RustDesk docs](https://rustdesk.com/docs).

Planning a locked-down or near-air-gapped rollout? Open the license path and the outbound workflows you actually use, keep everything else internal, and email [sales@rustdesk.com](mailto:sales@rustdesk.com) if your requirement is a permanent air gap.
