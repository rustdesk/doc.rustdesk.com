---
publishDate: 2026-07-06T00:00:00Z
lang: en
translationKey: what-counts-as-a-managed-device
draft: false
title: 'What Counts as a Managed Device in RustDesk?'
excerpt: 'Every device you reach counts once toward your RustDesk license, regardless of attended/unattended or connection frequency. Ad-hoc support has its own model.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.png
category: Pricing
tags:
  - RustDesk
  - pricing
  - licensing
author: RustDesk Team
faq:
  - question: 'How does RustDesk count managed devices?'
    answer: "Every device you want to be able to access counts as one managed device, counted a single time. It makes no difference whether a machine is attended or unattended, or whether you connect to it once or a thousand times. For pure ad-hoc, one-off support where you don't retain a permanent connection, RustDesk offers a separate quick-support license model."
  - question: 'What is the quick-support (ad-hoc) license model, and when should I use it?'
    answer: "Quick support is a separate model for spontaneous, one-off sessions where you don't keep a permanent connection to the machine. If your work is purely ad-hoc — you help someone once and move on — it fits better than counting every endpoint as a managed device."
  - question: 'Do concurrent connections to the same device count more than once?'
    answer: 'No. A device is counted a single time no matter how many times, or how simultaneously, you connect to it. You pay for the device being reachable, not per connection to it.'
  - question: 'Does an attended device count differently from an unattended one?'
    answer: 'No. An unattended server and an attended employee laptop each count as one managed device. The attended/unattended split does not create two pricing buckets — what changes the model is whether support is permanent or ad-hoc.'

metadata:
  description: 'Every device you reach counts once toward your RustDesk license, regardless of attended/unattended or connection frequency. Ad-hoc support has its own model.'
  keywords: 'what counts as a managed device, rustdesk device counting, rustdesk vs teamviewer licensing, unattended vs attended device license, rustdesk quick support license, msp remote support licensing'
---

If you're coming from TeamViewer's per-seat model, the counting rule in RustDesk is refreshingly simple: **every device you want to access counts as one managed device, counted once.** Attended or unattended, connected once or constantly, it's the same single count. Pure ad-hoc support is handled by a separate quick-support model.

## The short answer

A "managed device" is any machine you want to be able to reach. The server counts each one a single time. It doesn't matter:

- whether the device is **attended** (someone is sitting at it) or **unattended** (a headless server, kiosk, or always-on workstation),
- whether you'll connect **once** or **many times**,
- how frequently you access it.

The server has no way of knowing your intent, so it simply counts the devices you have set up to access. If your work is purely spontaneous, one-off support, look at the **quick-support license model** instead — that's the path built for ad-hoc sessions.

## In detail

The reasoning follows directly from how the counting works. The server tracks the devices registered to be accessed; it cannot see the future, so it can't distinguish a machine you'll touch once from one you'll touch daily, nor an attended desk from an unattended server. Every reachable device therefore counts the same way: **once.**

That's a meaningful difference from per-seat or per-technician licensing. You aren't paying per concurrent session or per simultaneous connection to the same box — a device is a device. This makes capacity planning predictable: count the machines you intend to keep reachable, and that's your number.

The important nuance is the **attended/unattended split you may be used to elsewhere doesn't create two pricing buckets here.** An unattended server and an attended employee laptop each count as one device. What _does_ change the model is whether the support is permanent or ad-hoc. If you don't need a standing, always-available connection — you just help someone once and move on — the quick-support model is the right tool, and it's licensed differently from your fleet of managed devices — see [rustdesk.com/pricing](https://rustdesk.com/pricing) for current terms.

For example, imagine an [MSP](/blog/rustdesk-for-msps) with 20 technicians supporting roughly 1,000 customer machines: it would need to satisfy **both** licensing dimensions — enough login users for all 20 technicians and enough managed devices for the machines kept reachable. If many endpoints are truly one-time support calls, ask RustDesk whether the current quick-support terms fit that workload better; you can check current allowances at [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Who asks this

This comes up from **MSPs and internal IT teams migrating off TeamViewer or AnyDesk**, where different licensing units make comparisons confusing. RustDesk paid plans require capacity for both the people who log in and the devices kept under management.

## Related questions

- [Does RustDesk license per user, per device, or both?](/blog/rustdesk-pro-license-cost-how-to-pay)
- Do [concurrent connections](/blog/rustdesk-concurrent-connections-limit) to the same device count more than once?
- [How do I count devices for a self-hosted RustDesk Server Pro deployment?](/blog/rustdesk-custom-quote-minimum-users-invoice-fees)
- [Coming from TeamViewer — how does RustDesk's pricing compare for MSPs?](/blog/rustdesk-vs-teamviewer)

Sizing a fleet and not sure whether one-off support calls belong in your device count? Check the current terms at [rustdesk.com/pricing](https://rustdesk.com/pricing) or ask the team before you buy.
