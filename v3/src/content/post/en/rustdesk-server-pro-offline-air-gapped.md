---
publishDate: 2026-06-28T16:50:00Z
lang: en
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'Can RustDesk Server Pro Run Offline or Air-Gapped?'
excerpt: "No — self-hosted RustDesk Server Pro needs ongoing outbound access to rustdesk.com to validate its license, so a fully air-gapped deployment isn't supported."
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.png
category: Deployment
tags:
  - RustDesk
  - deployment
  - self-hosting
author: RustDesk Team
faq:
  - question: 'Can RustDesk Server Pro run offline or air-gapped?'
    answer: 'No. The licensed Server Pro must keep an outbound connection to rustdesk.com to validate its license while it runs, so a fully air-gapped, never-phones-home deployment is not supported. You can still lock egress down tightly and route it through a proxy.'
  - question: 'Does RustDesk Server Pro need a permanent internet connection?'
    answer: 'It needs ongoing outbound access to rustdesk.com for license validation, but not a literally uninterrupted one. The server checks in over port 443 about once a day and, if a check fails, keeps retrying until it succeeds or roughly seven days pass — so a brief outage is tolerated, but a server cut off from rustdesk.com for longer than that grace window stops validating. Remote sessions themselves are brokered by your own self-hosted relay and ID (rendezvous) servers.'
  - question: 'Which outbound access does an isolated RustDesk Server Pro deployment need?'
    answer: 'Allow outbound HTTPS from the server to rustdesk.com for license validation (and for custom-client provisioning if you use it). A proxy is supported, so the rest of the network can stay locked down. Confirm the exact domains and ports in the RustDesk docs.'
  - question: 'Is there a fully air-gapped RustDesk licensing option?'
    answer: 'The standard licensed product is not designed for a never-phones-home air gap. If you have hard air-gap requirements, confirm your exact scenario with RustDesk before committing.'
metadata:
  description: "Can self-hosted RustDesk Server Pro run air-gapped? No — the Pro license needs ongoing outbound access to rustdesk.com, so a full air gap isn't supported."
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, rustdesk self-hosted internet requirement, rustdesk server pro license check, rustdesk offline deployment, does rustdesk need internet'
---

No — a self-hosted RustDesk Server Pro deployment is not designed to run fully offline or air-gapped. The Pro license has to reach rustdesk.com over an outbound connection to stay valid — both when you activate it and on an ongoing basis while the server runs — so a truly never-phones-home network falls outside the supported model.

## The short answer

Server Pro needs an outbound path to rustdesk.com for license validation, and that requirement does not go away once the server is running. In practice the check is periodic rather than constant: the server contacts rustdesk.com over port 443 roughly once a day, and if a check fails it retries until it either succeeds or about seven days elapse — after which the license stops validating. That built-in grace window means a short internet outage will not immediately break your deployment, but a permanently offline server will. Your ID and relay services remain self-hosted; direct sessions flow between endpoints and relayed sessions use your relay. You can keep the network tightly restricted: a proxy is supported, so in practice you allow the required outbound HTTPS path and lock down the rest.

## In detail

Many teams evaluating a self-hosted remote-desktop tool assume "self-hosted" should mean "fully offline forever." With RustDesk Server Pro, remote sessions do not depend on a permanently live vendor cloud — but the **license** does require ongoing outbound connectivity. Activation is an online-only step, and validation continues while the server runs, so a server that is completely cut off from rustdesk.com is not a supported configuration for the licensed product.

It is worth separating two things. The open-source RustDesk server you can self-host without a license is a different matter; the requirement here applies specifically to the **licensed Server Pro** feature set. If your objection is fundamentally about keeping session data on your own infrastructure, self-hosting already achieves that — the outbound requirement is about licensing, not about brokering every session.

There is a second workflow to account for: **building a custom client**. If you generate a branded or pre-configured client from Server Pro, that provisioning step also expects outbound access. Confirm the current behavior for your version and plan.

For a strictly air-gapped network, this is the deciding detail. A truly isolated server that can _never_ reach rustdesk.com falls outside the default model, so if you have hard air-gap requirements, confirm your exact scenario with RustDesk before committing. For the far more common "mostly isolated, tight egress" setup, the practical takeaway is to budget for one outbound HTTPS path to rustdesk.com — directly or via a proxy — and define the exact domains, ports, and approval workflow before you write the firewall policy. See the [RustDesk docs](https://rustdesk.com/docs), and note that the same license requirement is why you [cannot run Server Pro without any internet access even when installing without Docker](/blog/rustdesk-server-pro-without-docker).

## Who asks this

This question comes up repeatedly from IT admins, [MSPs](/blog/rustdesk-for-msps), and security teams standing up RustDesk in locked-down or regulated environments, often while migrating away from cloud-dependent tools like TeamViewer or AnyDesk. Their networks may sit behind strict egress firewalls, or they simply want to minimize external dependencies. Knowing that the license needs an ongoing outbound path — but only that — lets them write a precise firewall rule rather than either over-opening the network or wrongly assuming the product will run in a total vacuum.

## Related questions

- [Which domains and ports does RustDesk Server Pro need for outbound connectivity?](https://rustdesk.com/docs)
- [Can I install RustDesk Server Pro without Docker on a plain VM?](/blog/rustdesk-server-pro-without-docker)
- [How do I generate and distribute a custom-branded RustDesk client?](/blog/rustdesk-web-console-custom-client-generator-port-21114)

Planning a locked-down or near-air-gapped rollout? Confirm the current connectivity and licensing specifics on rustdesk.com before you finalize your firewall policy.
