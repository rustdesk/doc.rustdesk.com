---
publishDate: 2026-07-02T14:43:00Z
lang: en
translationKey: what-counts-as-a-managed-device
draft: false
title: 'What Counts as a Managed Device in RustDesk?'
excerpt: 'On standard RustDesk plans every device you set up to reach counts once. Customized V2 counts only devices assigned to a group or user; ad-hoc devices are not counted.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.png
category: Pricing
tags:
  - RustDesk
  - pricing
  - licensing
author: RustDesk Team
faq:
  - question: 'How does RustDesk count managed devices?'
    answer: "On standard plans, every device you set up to access counts as one managed device, a single time — attended or unattended, whether you connect once or a thousand times. Customized V2 counts differently: only devices assigned to a device group or a user count toward your licensed device number, so machines touched only for ad-hoc, one-off support are not counted and are not disabled."
  - question: 'How are ad-hoc, one-off support devices counted?'
    answer: "On the Customized V2 plan, only devices assigned to a device group or a user count as managed devices. A machine you connect to once for spontaneous support — and never assign — is not counted toward your licensed device number and is not disabled. For work that is mostly ad-hoc, that makes Customized V2 a better fit than counting every endpoint."
  - question: 'Do concurrent connections to the same device count more than once?'
    answer: 'No. A device is counted a single time no matter how many times, or how simultaneously, you connect to it. You pay for the device being reachable, not per connection to it.'
  - question: 'Does an attended device count differently from an unattended one?'
    answer: 'No. An unattended server and an attended employee laptop each count as one managed device. The attended/unattended split does not create two pricing buckets — what changes the count is the plan: Customized V2 counts only devices assigned to a group or user.'

metadata:
  description: 'How RustDesk counts managed devices: standard plans count every reachable device once; Customized V2 counts only devices assigned to a group or user.'
  keywords: 'what counts as a managed device, rustdesk device counting, rustdesk vs teamviewer licensing, unattended vs attended device license, rustdesk ad-hoc support, msp remote support licensing'
---

If you're coming from TeamViewer's per-seat model, the counting rule on RustDesk's standard plans is refreshingly simple: **every device you want to access counts as one managed device, counted once.** Attended or unattended, connected once or constantly, it's the same single count. The **[Customized V2](https://rustdesk.com/pricing#custom2)** plan counts differently — only devices you assign to a group or user count — which is what makes it the fit for heavy ad-hoc support.

## The short answer

On standard plans, a "managed device" is any machine you want to be able to reach, and the server counts each one a single time. It doesn't matter:

- whether the device is **attended** (someone is sitting at it) or **unattended** (a headless server, kiosk, or always-on workstation),
- whether you'll connect **once** or **many times**,
- how frequently you access it.

If your work is largely spontaneous, one-off support, the narrower **[Customized V2](https://rustdesk.com/pricing#custom2)** counting covered below is designed for exactly that case.

## In detail

On standard plans, the server tracks the devices registered to be accessed; it cannot see the future, so it can't distinguish a machine you'll touch once from one you'll touch daily, nor an attended desk from an unattended server. Every reachable device therefore counts the same way: **once.** That's a meaningful difference from per-seat or per-technician licensing. You aren't paying per concurrent session or per simultaneous connection to the same box — a device is a device. This makes capacity planning predictable: count the machines you intend to keep reachable, and that's your number.

The important nuance is the **attended/unattended split you may be used to elsewhere doesn't create two pricing buckets here.** An unattended server and an attended employee laptop each count as one device. What _does_ change things is the plan. On the **[Customized V2](https://rustdesk.com/pricing#custom2)** plan the definition of a managed device is narrower: only the devices you **assign to a device group or a user** count toward your licensed device number. Machines you reach only for ad-hoc, one-off support — and never assign — are not counted, and they are not disabled. If you would rather these unassigned devices not appear in the console at all, the [`register-device` client setting](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) controls that, and it takes effect once the licensed concurrent-connection count is 2 or more. In practice such a quick-support session shows only an ID and a one-time password for a single attended connection, so a genuine one-off interaction never needs a permanent slot in your fleet. If a lot of your work looks like that, Customized V2 is usually the better fit — email [sales@rustdesk.com](mailto:sales@rustdesk.com) with your scenario for current terms, or check [rustdesk.com/pricing](https://rustdesk.com/pricing).

For example, imagine an [MSP](/blog/rustdesk-for-msps) with 20 technicians supporting roughly 1,000 customer machines: it would need to satisfy **both** licensing dimensions — enough login users for all 20 technicians and enough managed devices for the machines kept reachable. For endpoints that are truly one-time support calls, the Customized V2 rule above applies; current allowances are at [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Who asks this

Anyone translating a TeamViewer or AnyDesk seat count into RustDesk's units hits this definition first, because the licensing units do not map one-to-one. RustDesk paid plans require capacity for both the people who log in and the devices kept under management.

## Related questions

- [Does RustDesk license per user, per device, or both?](/blog/rustdesk-pro-license-cost-how-to-pay)
- [Do concurrent connections to the same device count more than once?](/blog/rustdesk-concurrent-connections-limit)
- [How do I count devices for a self-hosted RustDesk Server Pro deployment?](/blog/rustdesk-custom-quote-minimum-users-invoice-fees)
- [Coming from TeamViewer — how does RustDesk's pricing compare for MSPs?](/blog/rustdesk-vs-teamviewer)

Sizing a fleet and not sure whether one-off support calls belong in your device count? Check the current terms at [rustdesk.com/pricing](https://rustdesk.com/pricing) or ask the team before you buy.
