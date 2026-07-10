---
publishDate: 2026-07-03T13:07:00Z
lang: en
translationKey: rustdesk-concurrent-connections-limit
draft: false
title: 'Does RustDesk Limit Concurrent Connections?'
excerpt: 'Standard RustDesk plans do not cap concurrent connections; Customized V2 does. Learn how plan, user, and device counts affect licensing.'
image: ~/assets/images/blog/rustdesk-concurrent-connections-limit-og.png
category: Pricing
tags:
  - RustDesk
  - pricing
  - licensing
author: RustDesk Team
faq:
  - question: 'How many concurrent connections does RustDesk allow?'
    answer: 'Standard RustDesk plans (Individual, Basic, and standard Customized) include unlimited concurrent connections. Customized V2 is the exception: it caps concurrent connections and prices additional ones separately. Every paid deployment must also fit its licensed login-user and managed-device counts.'
  - question: 'What is the difference between a login user and a managed device?'
    answer: 'The login-user count covers the people who sign in to your RustDesk deployment; the managed-device count covers the endpoints under management. Both must fit your license, and on standard plans concurrency is not metered separately. Concurrency becomes a sizing input only on Customized V2.'
  - question: 'Can multiple people control the same device at the same time?'
    answer: 'On Individual, Basic, and standard Customized plans there is no separate concurrency meter, so simultaneous sessions are not capped. On Customized V2, concurrent connections are part of the licensed allowance, so size the plan for the peak number you need.'
  - question: 'Does RustDesk charge extra for peak-hour usage or overages?'
    answer: 'Standard plans do not add peak-hour or overage charges, because they count login users and managed devices rather than live sessions. Customized V2 licenses a defined number of concurrent connections and prices additional connections separately, so plan for your busiest period.'

metadata:
  description: 'Standard RustDesk plans include unlimited concurrent connections, while Customized V2 limits them. Learn how plan, user, and device counts work.'
  keywords: 'RustDesk concurrent connections, RustDesk concurrent connection limit, RustDesk user vs device licensing, RustDesk concurrent sessions, remote desktop concurrent channels, RustDesk licensing for MSPs'
---

Standard RustDesk plans include unlimited concurrent connections. **[Customized V2](https://rustdesk.com/pricing#custom2) is the exception:** it limits concurrent connections and prices additional connections separately. All paid plans also enforce their licensed login-user and managed-device allowances.

## The short answer

On Individual, Basic, and standard Customized plans, concurrent connections are unlimited. If you choose Customized V2, size the plan for the number of simultaneous connections you need. In either case, also count **login users** (the people who sign in) and **managed devices** (the machines they control).

## In detail

Remote-desktop vendors package simultaneous sessions in different ways. A channel-based model ties capacity to peak live sessions; RustDesk standard plans do not, while Customized V2 does define a concurrency allowance. Compare the busiest support window, not only average use.

Most RustDesk plans use a different model: you count the people who need access and the endpoints they connect to, without a separate concurrency meter. Customized V2 offers different packaging for buyers who prefer to license a defined number of concurrent connections.

The counts mean different things. The **login-user count** covers the people who sign in, while the **managed-device count** covers the endpoints under management. Both must fit the license. Concurrency is an additional sizing input only for Customized V2.

For current allowances and per-connection pricing on Customized V2, check [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Who asks this

Support desks and [MSPs](/blog/rustdesk-for-msps) that have been rationing simultaneous sessions under channel-priced tools are the classic askers here. The important step is to compare the exact RustDesk plan: standard plans and Customized V2 handle concurrency differently.

## Related questions

- [What is the difference between a user and a device in RustDesk licensing?](/blog/what-counts-as-a-managed-device)
- [Do I need a separate license for every technician on my team?](/blog/rustdesk-pro-license-cost-how-to-pay)
- [How do I control which users can connect to which devices?](/blog/rustdesk-per-user-access-control-device-groups-shared-address-book)
- [How do I count devices for unattended access?](/blog/rustdesk-unattended-access-setup)
- [Does RustDesk charge extra for peak-hour usage or overages?](/blog/rustdesk-custom-quote-minimum-users-invoice-fees)

Sizing a plan for your team? Count login users and managed devices, then include concurrent connections if you are considering Customized V2.
