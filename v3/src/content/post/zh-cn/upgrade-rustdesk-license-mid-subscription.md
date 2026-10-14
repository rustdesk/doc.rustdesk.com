---
publishDate: 2026-07-03T09:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: upgrade-rustdesk-license-mid-subscription
draft: false
title: '订阅期内升级 RustDesk 许可证：具体如何运作'
excerpt: '在订阅期内为 RustDesk Server Pro 增加用户或设备：了解新的一年到期日、剩余已付期限如何抵扣，以及如何刷新许可证让新额度生效。'
image: ~/assets/images/blog/upgrade-rustdesk-license-mid-subscription-og.webp
category: '定价'
tags: ['RustDesk', '定价', '许可']
author: 'RustDesk Team'
slug: 'upgrade-rustdesk-license-mid-subscription-zh-cn'
faq:
  - question: '可以在订阅期内升级 RustDesk 许可证吗？'
    answer: '可以。您可以随时通过自助服务门户增加用户或受管设备。升级时抵扣原许可证剩余已付价值，并将到期日延长至升级日起一年。在 Web 控制台中刷新同一个许可证，新额度会立即生效；不刷新的话，约 24 小时内也会自动生效。'
  - question: 'RustDesk 许可证升级如何计价？'
    answer: 'RustDesk Server Pro 升级会把许可证延长至升级日起一整年，并抵扣原许可证剩余已付价值。新增的用户或设备按一整年计费；原有容量只对超出原到期日的延长部分计费。官方 Wiki FAQ 给出了计算示例，自助服务门户会在付款前显示总金额。'
  - question: '升级许可证后，为什么新设备没有出现？'
    answer: '新额度会在约 24 小时内、Server Pro 下次检查许可证时自动生效。如需立即生效，请在 Server Pro Web 控制台中刷新许可证：点击“编辑”，然后在不修改密钥的情况下点击“确定”。刷新会立即拉取更新后的授权，许可证密钥保持不变。'
  - question: '如何在 Web 控制台中刷新许可证？'
    answer: '付款后，打开 Server Pro Web 控制台的许可证设置，点击“编辑”，然后在不修改密钥的情况下点击“确定”。这会拉取更新后的授权，许可证密钥保持不变。如果不刷新，新额度会在约 24 小时内、下一次定期许可证检查时自动生效。'
  - question: '在哪里购买升级或续订许可证？'
    answer: '请使用 rustdesk.com/self-host/account/ 上的自助许可证门户。用您购买许可证时在付款页面填写的邮箱登录；如果记不清是哪个邮箱，请联系 support@rustdesk.com。门户中还可以查看发票和办理续订。'
  - question: '可以在订阅期内降级或减少席位吗？'
    answer: 'RustDesk Server Pro 许可证的降级和减少席位需要由 RustDesk 团队处理：请把您的许可证邮箱和所需变更发送至 sales@rustdesk.com。rustdesk.com/self-host/account/ 上的自助服务门户负责处理升级（可随时购买）、续订和发票。'

metadata:
  description: '在订阅期内升级 RustDesk Server Pro：新的一年到期日、原许可证剩余已付价值如何抵扣、官方计算示例，以及在 Web 控制台刷新许可证的步骤。'
  keywords: '订阅期内升级 RustDesk 许可证, RustDesk 许可证增加设备, RustDesk 许可证升级价格, 增加 RustDesk 受管设备, Web 控制台刷新 RustDesk 许可证, RustDesk 按用户按设备授权'
---

您可以在订阅期内升级 RustDesk Server Pro 许可证，增加[受管设备](/zh-cn/blog/what-counts-as-a-managed-device-zh-cn)或登录用户。根据[官方升级规则](https://github.com/rustdesk/rustdesk/wiki/FAQ#renew--upgrade-license)，到期日会延长至升级日起一整年。计算时会抵扣原许可证剩余已付价值：新增容量按十二个月计费，原有容量则按超出原到期日的延长期限计费。这并不是简单地按剩余天数对新增的用户或设备收费。

## 如何升级

在[自助许可证门户](https://rustdesk.com/self-host/account/)中完成升级。用您首次购买许可证时在付款页面填写的邮箱登录；如果记不清是哪个邮箱，请发邮件至 [support@rustdesk.com](mailto:support@rustdesk.com)。续订和下载发票也在同一个门户中进行。

付款后，在 [Web 控制台中刷新许可证](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/license/#刷新许可证)：点击 **编辑**，然后在不修改密钥的情况下点击 **确定**。新额度会立即生效；如果不刷新，新额度会在约 24 小时内、下一次定期许可证检查时自动生效。原有的许可证密钥保持不变。

举个例子，[官方计算示例](https://github.com/rustdesk/rustdesk/wiki/FAQ#is-it-over-charge-in-upgrade)描述了这样一次升级：一份原定于 2026 年 3 月 12 日到期的许可证，在 2025 年 8 月 14 日升级。增加 100 台设备后，到期日变为 2026 年 8 月 14 日：新增设备按一年计费，原有的 10 个用户和 800 台设备则按大约五个月的延长期计费。这个示例说明的是计算方法，而不是当前费率；实际购买请以门户显示的总额和[当前定价](https://rustdesk.com/pricing)为准。

## 谁会问这个问题

业务增长通常是起因：管理员或 [MSP](/zh-cn/blog/rustdesk-for-msps-zh-cn) 当初按当时的设备规模购买了许可证，现在却要在年度中途接入新的终端、员工或客户站点。背后的顾虑通常有两点：订阅期中途能否扩容，以及费用是否合理。

## 相关问题

- [RustDesk 如何计算用户和受管设备，以及按用户与按设备授权的区别](/zh-cn/blog/what-counts-as-a-managed-device-zh-cn)
- 在 Web 控制台中刷新许可证：参见 [RustDesk 文档](https://rustdesk.com/docs/zh-cn/)。

部署规模在扩大？团队需要更多容量时，随时可以在[自助服务门户](https://rustdesk.com/self-host/account/)中升级。
