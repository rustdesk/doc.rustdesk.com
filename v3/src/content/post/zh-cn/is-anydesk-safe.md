---
publishDate: 2026-06-30T17:26:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: is-anydesk-safe
draft: false
title: 'AnyDesk 安全吗？加密机制、2024 年安全事件与诈骗风险'
excerpt: 'AnyDesk 安全吗？本文客观分析其加密机制、2024 年生产系统安全事件，以及诈骗分子为何频繁利用它，并比较开源方案与之的差异。'
image: ~/assets/images/blog/is-anydesk-safe-og.webp
category: '安全'
tags: ['AnyDesk', '安全']
author: 'RustDesk Team'
slug: 'is-anydesk-safe-zh-cn'
faq:
  - question: '使用 AnyDesk 安全吗？'
    answer: '是的，正当使用是安全的。AnyDesk 是一款成熟的商业工具，其文档载明采用 TLS 1.2 和 256 位 AES 传输加密，并为无人值守访问提供双因素认证和访问控制列表。主要风险在于：2024 年 2 月 2 日的生产系统入侵事件、默认通过 AnyDesk 自己的云端协调连接（Ultimate 提供 On-Premises），以及诱骗受害者安装它的诈骗分子。'
  - question: 'AnyDesk 被黑客攻击过吗？'
    answer: '是的。AnyDesk 于 2024 年 2 月 2 日披露其生产系统遭到入侵。官方声明介绍了更换证书、修复系统以及出于预防目的重置 my.anydesk.com 密码等措施，并表示没有证据显示终端用户设备受到影响。Akamai 的安全研究人员另行讨论了有关源代码和代码签名材料外泄的报道。'
  - question: '诈骗分子为什么喜欢用 AnyDesk？'
    answer: '因为 AnyDesk 免费、几秒钟就能装好，而且被控制一方无需注册账号，技术支持诈骗分子会打电话或发邮件联系受害者，诱导其安装并授予控制权。这是使用层面的风险，而不是 AnyDesk 的漏洞：同样的伎俩对任何远程桌面工具都有效，包括 RustDesk。AnyDesk 也发布了防滥用指南。'
  - question: 'AnyDesk 的加密安全吗？'
    answer: '根据 AnyDesk 的安全文档，它采用带 AEAD 的 TLS 1.2、RSA-2048 非对称密钥交换和 256 位 AES 传输加密，并具备完全前向保密。这些都是符合行业标准的防护措施。需要注意的是，你要信任一个闭源客户端，并且默认由 AnyDesk 的云端协调连接，因此你依赖的是厂商的运维安全，而无法自行审计代码。'
metadata:
  description: 'AnyDesk 安全吗？本文基于可靠来源，评估其 TLS/AES 加密机制、2024 年生产系统安全事件、诈骗滥用问题，以及闭源模式的利弊权衡。'
  keywords: 'AnyDesk安全吗, AnyDesk安全性, AnyDesk 2024年数据泄露, AnyDesk诈骗, AnyDesk加密, AnyDesk使用安全吗, AnyDesk被黑'
---

简短回答：正当使用 AnyDesk 是安全的。它是一款成熟的商业远程桌面产品，采用标准级别的加密，并不是恶意软件。值得了解的风险在于：它是闭源软件，默认通过 AnyDesk 的云端协调连接；它在 2024 年 2 月披露过一起生产系统入侵事件；它还被诈骗分子大量滥用。以下是基于可靠来源的完整分析。

## 简要回答

是的，前提是主动、正当地使用。AnyDesk 的文档载明采用 TLS 1.2 和 256 位 AES 传输加密，并为无人值守访问提供双因素认证和访问控制列表。有三件事决定了你应该如何使用它：[2024 年 2 月 2 日的生产系统入侵事件](https://anydesk.com/en/public-statement-2-2-2024)、默认通过 AnyDesk 自己的云端协调连接（Ultimate 提供 On-Premises 本地部署设备），以及诱骗受害者安装它的技术支持诈骗分子。这三点都不意味着*安装*它不安全；但它们都决定了你应当如何*使用*它。

## AnyDesk 如何保护你的会话安全

根据 [AnyDesk 官方安全文档](https://anydesk.com/en/security)，其会话通过带 AEAD 的 TLS 1.2 进行保护，采用 RSA-2048 非对称密钥交换来验证端点身份、防范中间人攻击，并使用 256 位 AES 传输加密，同时通过临时密钥交换实现完全前向保密。在账户安全方面，AnyDesk 为无人值守访问提供双因素认证（TOTP），提供用于限制可连接对象的访问控制列表（白名单），并采用加盐密码哈希。（AnyDesk 的部分资料提到了更新版本的 TLS；上面链接的安全页面是当前的参考依据。）

这些都是扎实、符合行业标准的防护措施——与其他正规竞争对手所采用的技术在本质上不相上下。就传输层而言，这里没有什么值得担忧的地方。真正值得探讨的问题在于*信任模型*和*人为因素*，而不是加密套件本身。

## 2024 年 AnyDesk 安全事件：究竟发生了什么

**2024 年 2 月 2 日**，[AnyDesk 披露其生产系统遭到入侵](https://anydesk.com/en/public-statement-2-2-2024)。声明介绍了与 CrowdStrike 合作开展的事件响应、证书吊销/更换、系统修复，以及出于预防目的的网页门户密码重置。[Akamai 的分析](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations)则在厂商的公开披露之外，另行讨论了有关源代码和代码签名材料外泄的报道。

[AnyDesk 表示**没有证据显示终端用户设备受到影响**](https://anydesk.com/en/public-statement-2-2-2024)，并且它不存储可用于连接这些设备的凭据。

由此得出的结论并不是 AnyDesk 格外不安全，而是**厂商集中化风险**：当第三方运营着为你的会话提供连接协调、并保存你账户数据的基础设施时，那里一旦遭到入侵，就是一次你无从选择、也无法阻止的事件。

## 社会工程诈骗是另一类风险

对大多数个人用户来说，与 AnyDesk 相关的最大危险是社会工程攻击，而不是某个 CVE 漏洞。[FBI 警告称，技术支持诈骗分子会引导受害者安装远程访问软件](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software)，再滥用由此获得的访问权限；AnyDesk 也正因如此发布了[防滥用指南](https://anydesk.com/en/abuse-prevention)。风险在于谁被授权连接，而不在于会话加密的强度。

为什么偏偏是 AnyDesk？因为它可以免费下载、几秒钟就能装好，而且——最关键的是——被*控制*的一方根本不需要注册账号。这种低门槛，对正当的技术支持来说是一项优点，对诈骗分子来说却是一份大礼：他们打电话或发邮件联系目标，编造一个紧急的“问题”，再一步步引导对方交出完整的远程控制权限。

这正是那些耸人听闻的标题所忽略的公道之处：**这是一种使用层面的风险，而不是 AnyDesk 的漏洞。** 同样的伎俩用在 TeamViewer、Chrome Remote Desktop 或 RustDesk 身上照样奏效。如果你心甘情愿地把钥匙交给电话那头的陌生人，再强的 AES 加密也保护不了你。如果你想了解具体的防范方法，我们在另一篇文章中做了详细介绍，参见[如何避免远程桌面诈骗](/zh-cn/blog/avoid-remote-desktop-scams-zh-cn)；同样的道理也适用于 [Chrome Remote Desktop 是否安全](/zh-cn/blog/is-chrome-remote-desktop-safe-zh-cn)这个问题。

## 闭源与云端协调：信任问题

这正是 AnyDesk 与 RustDesk 两种模式分道扬镳之处——分歧不在于加密是否足够可靠，而在于*你需要凭信任接受什么*。

AnyDesk 是专有软件。你无法查看其客户端源代码，无法自行构建，也无法独立验证它的实际行为；你只能相信 AnyDesk 的二进制程序确实如宣传所说的那样运作。而且默认情况下，你的会话通过 AnyDesk 的云端协调，因此该基础设施的可用性和安全性都由厂商掌控——2024 年的事件就是明证。AnyDesk Ultimate 提供本地部署设备，为购买该套餐的用户缩小了这一差距。

在这两点上，RustDesk 都从相反的方向出发。RustDesk 的客户端和 RustDesk Server OSS（免费社区服务器）[以 AGPL 开源](https://github.com/rustdesk/rustdesk)；Server Pro 是商业的专有自托管服务器软件。客户端可审计、可自行构建，因此你无需盲目信任一个专有的二进制程序。而且，由于你可以[自托管](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn) ID/连接协调服务和中继，为你的会话提供连接协调的基础设施归你所有，而不是掌握在第三方手中——这正是 2024 年事件所具体印证的厂商集中化风险。这也有助于构建[数据主权方面的设计](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn)。

同样公道地说：这只是转移了信任，而非消除了信任。正因为代码是开放的，RustDesk 自身的缺陷同样是公开的，因此请持续关注[最新版本发布](https://github.com/rustdesk/rustdesk/releases)以及漏洞记录。而且，可审计、自托管的基础设施只是一个起点，而非保证：会话仍在端点之间直接传输，服务器也需要由你自行打补丁维护。

## 那么，AnyDesk 到底安全吗？

对于主动、正当的使用：是的。AnyDesk 是一款成熟的产品，拥有标准级别的加密和合理的账户控制机制。请保持更新，用双因素认证保护无人值守访问，用访问控制列表限制传入连接，并核实每一个支持请求。

需要保留的限定条件关乎信任，而不是密码学。其默认的闭源、云端协调模式意味着要依赖 AnyDesk 的运维安全，而这在 2024 年确实受到过实质性冲击；Ultimate On-Premises 能缩小这一差距。如果这种权衡让你感到不安，[自托管的 TeamViewer 与 AnyDesk 替代方案](/zh-cn/blog/self-hosted-teamviewer-alternative-zh-cn)会改变信任的基础：可审计的代码和由你掌控的连接协调，代价是需要自行运行服务器。

无论你最终选择哪款工具，最能避免损失的那条规则，往往也是成本最低的：绝不要因为某个主动联系*你*的人提出要求，就去安装远程访问软件。
