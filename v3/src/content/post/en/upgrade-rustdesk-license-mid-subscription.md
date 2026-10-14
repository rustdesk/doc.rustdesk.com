---
publishDate: 2026-07-03T09:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: upgrade-rustdesk-license-mid-subscription
draft: false
title: 'Upgrade RustDesk License Mid-Subscription: How It Works'
excerpt: 'Add RustDesk Server Pro users or devices mid-term, understand the new one-year expiry and credit for the remaining paid term, and refresh your license to apply the limits.'
image: ~/assets/images/blog/upgrade-rustdesk-license-mid-subscription-og.webp
category: Pricing
tags:
  - RustDesk
  - pricing
  - licensing
author: RustDesk Team
faq:
  - question: 'Can I upgrade my RustDesk license mid-subscription?'
    answer: 'Yes. Upgrade users or managed devices through the self-service portal at any time. The upgrade extends expiry to one full year from the upgrade date and credits the remaining paid value of your current license. Refresh the same license in the web console to apply the new limits immediately; otherwise they apply automatically within about 24 hours.'
  - question: 'How is a RustDesk license upgrade priced?'
    answer: 'A RustDesk Server Pro upgrade extends the license to one full year from the upgrade date and credits the remaining paid value of the current license. New users or devices are charged for a full year; existing capacity is charged only for the extension beyond its old expiry date. The official Wiki FAQ shows a worked calculation, and the self-service portal shows the total before payment.'
  - question: "Why don't my new devices appear after I upgrade my license?"
    answer: 'New limits apply automatically within about 24 hours, when Server Pro next checks its license. To apply them immediately, refresh the license in the Server Pro web console: click Edit, then OK without changing the key. The refresh pulls the updated entitlement right away, and the license key stays the same.'
  - question: 'How do I refresh my license in the web console?'
    answer: 'After payment, open the license settings in your Server Pro web console, click Edit, then OK without changing the key. This pulls the updated entitlement; the license key stays the same. Without a refresh, the new limits apply automatically within about 24 hours, at the next periodic license check.'
  - question: 'Where do I buy the upgrade or renew my license?'
    answer: 'Use the self-service license portal at rustdesk.com/self-host/account/. Log in with the email address you used on the payment page when you bought the license; if you no longer know which email that was, contact support@rustdesk.com. The portal also holds your invoices and renewals.'
  - question: 'Can I downgrade or reduce seats mid-subscription?'
    answer: 'Downgrades and seat reductions on a RustDesk Server Pro license go through the RustDesk team: email sales@rustdesk.com with your license email and the change you need. The self-service portal at rustdesk.com/self-host/account/ handles upgrades, which you can buy at any time, along with renewals and invoices.'

metadata:
  description: 'Upgrade RustDesk Server Pro mid-term: new one-year expiry, credit for remaining paid value, the official calculation example, and license refresh steps.'
  keywords: 'upgrade RustDesk license mid-subscription, add more devices RustDesk license, RustDesk license upgrade pricing, increase managed devices RustDesk, refresh license web console RustDesk, RustDesk per-user per-device licensing'
---

You can upgrade your RustDesk Server Pro license mid-subscription to add [managed devices](/blog/what-counts-as-a-managed-device) or login users. The [official upgrade rules](https://github.com/rustdesk/rustdesk/wiki/FAQ#renew--upgrade-license) extend the expiry to a full year from the upgrade date. The calculation credits the remaining paid value of your current license: new capacity is charged for twelve months, and existing capacity is charged for the additional period beyond its previous expiry. It is not simply a charge for added users or devices over the days remaining.

## How to upgrade

Make the upgrade in the [self-service license portal](https://rustdesk.com/self-host/account/). Log in with the email you used on the payment page when you first bought the license; if you no longer know which email that was, email [support@rustdesk.com](mailto:support@rustdesk.com). The same portal is where you renew and download invoices.

After payment, refresh the license in your [web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#refresh-license): click **Edit**, then **OK** without changing the key. The new limits apply immediately; without a refresh they apply automatically within about 24 hours, at the next periodic license check. The existing license key is retained.

For example, the [official calculation example](https://github.com/rustdesk/rustdesk/wiki/FAQ#is-it-over-charge-in-upgrade) describes an upgrade on August 14, 2025 for a license previously expiring March 12, 2026. Adding 100 devices moves the expiry to August 14, 2026: the new devices are charged for a year, and the existing 10 users and 800 devices are charged for the roughly five-month extension. The example explains the method, not current rates; use the portal total and [current pricing](https://rustdesk.com/pricing) for your purchase.

## Who asks this

Growth is the usual trigger: an admin or [MSP](/blog/rustdesk-for-msps) who sized the license for the fleet as it stood is now onboarding new endpoints, staff, or client sites partway through the year. The concern behind it is usually twofold: whether scaling up is even possible mid-term, and whether they will be fairly charged for it.

## Related questions

- [How RustDesk counts users and managed devices, and per-user vs. per-device licensing](/blog/what-counts-as-a-managed-device)
- Refreshing your license in the web console: see the [RustDesk docs](https://rustdesk.com/docs).

Growing your deployment? Upgrade from the [self-service portal](https://rustdesk.com/self-host/account/) whenever your team needs more capacity.
