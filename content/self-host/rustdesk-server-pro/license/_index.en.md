---
title: License
weight: 15
---

### Buy license

Please get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), enter a valid email address in the Stripe checkout page. The license (and the invoice in a separate mail) will be sent to your email once payment is done successfully.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

### Set license

You will be required to enter license in the web console (`http://<rustdesk-server-pro-ip>:21114`), or change license later.

| Set license | Change license |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

### Renew/upgrade license

Renew/upgrade license can be found via the [self-service license portal](https://rustdesk.com/self-host/account/) as described below.

| License page with renew/upgrade actions | Upgrade window |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

After payment, you need to proceed to the web console to activate it manually as below. Just click on `Edit`, then `OK`, no need to edit anything, because your license key remains the same.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

### Invoices, License Retrieval and Migration

The license can be only used on one machine (for hbbs only, hbbr does not require license), if you want to migrate to the other machine, retrieve your license or download invoices, please go to [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Log in with the email address used for Stripe checkout, unbind the old machine you want to migrate from as below, when you set the license in the new servers web console it will assign the license and register automatically in the console.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

### Proxy
If your server can not access internet to verify license directly, you can add proxy. e.g. `proxy=http://username:password@example.com:8080 ./hbbs`.

Alternatively, you can add `proxy=http://username:password@example.com:8080` to `.env` file
under working directory (where `id_ed25519` / `db.sqlite3` files reside).

`http` can be replaced with `https` or `socks5`. If there is no `username` / `password` / `port`, it can be `proxy=http://example.com`.
