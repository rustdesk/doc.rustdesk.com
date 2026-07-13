---
publishDate: 2026-07-05T18:49:00Z
lang: 'zh-cn'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktop 安全吗？一份诚实的评测'
excerpt: 'Chrome Remote Desktop 安全吗？本文客观剖析其加密方式、PIN 码与 Google 账户模型、真实存在的风险，以及自托管方案的不同之处。'
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: '安全'
tags: ['Chrome Remote Desktop', '安全']
author: 'RustDesk Team'
slug: 'is-chrome-remote-desktop-safe-zh-cn'
faq:
  - question: '使用 Chrome Remote Desktop 安全吗？'
    answer: '对于日常个人使用而言，Chrome Remote Desktop 相当安全。Google 表示所有远程桌面会话都经过完全加密，访问需要 PIN 码，远程支持会话则使用一次性访问代码。主要风险在于 PIN 码设置过弱、与之绑定的 Google 账户被盗用，以及——与任何远程工具一样——骗子诱导你授予访问权限。它提供的管理控制功能有限，且完全运行在 Google 的云端。'
  - question: 'Chrome Remote Desktop 是加密的吗？'
    answer: '是的。Google 的支持文档指出，所有 Chrome Remote Desktop 会话都经过完全加密，第三方评测也将其描述为采用标准的 Web 传输安全机制。Google 并未在其面向消费者的帮助页面上公开详细的协议细节，因此对于超出日常使用范畴的场景，应将其加密视为足够可靠，但无法独立审计。'
  - question: 'Chrome Remote Desktop 存在哪些安全风险？'
    answer: '三个实际风险分别是：PIN 码设置过弱或容易被猜到（最低仅需六位数字）、主机所绑定的 Google 账户被攻破，以及社会工程学诈骗——骗子诱导受害者安装该软件并分享访问代码。只要为 Google 账户开启双重验证，并且绝不向主动联系你的人分享访问代码，就能消除现实中的大部分风险。'
  - question: '我可以自托管 Chrome Remote Desktop 吗？'
    answer: '不可以。Chrome Remote Desktop 完全通过 Google 的基础设施进行中转，并与你的 Google 账户绑定；没有任何选项可以在自己的服务器上运行连接服务，也无法审查客户端代码。如果自托管和可审查的代码对你很重要，那么开源替代方案提供的是另一种保障模式。'
metadata:
  description: 'Chrome Remote Desktop 安全吗？了解 Google 官方文档中关于 CRD 加密、PIN 码保护、实际风险以及 Google 账户信任模型的说明。'
  keywords: 'Chrome Remote Desktop 安全吗, Chrome Remote Desktop 安全性, Chrome Remote Desktop 加密, Chrome Remote Desktop PIN 码, Chrome Remote Desktop 风险, CRD 安全吗'
---

简而言之：对于日常个人使用来说，Chrome Remote Desktop（CRD）已经相当安全。它是 Google 推出的一款免费、简洁的工具，会对你的会话进行加密，并通过 PIN 码和 Google 账户来限制访问。但坦白说，它也存在一些需要留意的地方：闭源、完全依赖 Google 云端中转、管理控制功能有限，而且——与所有远程工具一样——也可能被骗子利用来对付你。下面是一份客观、有据可查的详细剖析。

## 简要回答

CRD 对于其设计初衷而言已经足够安全：无论是远程连接自己的电脑，还是帮助家人解决问题，Google 都会为这条连接提供安全保障。根据 [Google 官方支持文档](https://support.google.com/chrome/answer/1649523)，所有远程桌面会话都经过完全加密，无人值守访问需要 PIN 码，而一次性支持会话则使用只能生效一次的单次访问代码。这对个人使用而言已是合理的安全基线。

但如果使用场景超出日常范畴，就需要多留个心眼了。CRD 与你的 Google 账户绑定，运行在 Google 的基础设施之上，管理控制功能有限，其实际的薄弱环节在于容易被猜中的 PIN 码、可能被攻破的 Google 账户，以及社会工程学攻击。这些都不代表安装它很危险——只是决定了你应该在多大程度上依赖它。

## Chrome Remote Desktop 如何保护会话安全

真正起作用的是三种机制，均记录在 [Google 帮助页面](https://support.google.com/chrome/answer/1649523)中：

- **加密。** Google 表示“所有远程桌面会话都经过完全加密”。第三方分析普遍认为该连接采用了标准的 Web 传输安全机制（TLS 配合 AES）。Google 并未在面向消费者的页面上公开详细的协议说明，因此应将其加密视为足够可靠，但无法进行独立审计。
- **无人值守访问的 PIN 码。** 要连接一台你已设置为可持续远程访问的电脑，需要输入 PIN 码。正是这一机制，阻止了那些拥有你 Google 会话信息的陌生人悄无声息地连接进来。
- **用于技术支持的一次性访问代码。** 当你实时帮助他人时，主机会生成一个代码；根据 Google 的说明，该代码只能使用一次，若要继续共享访问权限，则需要定期重新确认。

在这些机制之上，还有 Google 账户本身这一层防护——它可以、而且对于远程访问而言绝对应该，通过双重验证来加以保护。对于在可信网络中的个人使用而言，这套安全体系确实是可靠的。

## 真正的风险到底在哪里

CRD 的薄弱环节并不特殊，正是其设计本身自然带来的三个问题。

**PIN 码过弱。** PIN 码是无人值守访问的门锁，而 Google 规定的最低位数仅为六位。面对陌生人的单次猜测，六位数字本身没什么问题，但人们往往会选择容易预测的数字——生日、重复数字、连续数字——这会让实际的搜索空间远小于位数所暗示的规模。对于一台 24 小时全天候可被访问的电脑来说，一个随意设置的 PIN 码是最可能被突破的入口。请选择一个不容易被猜到的组合。

**Google 账户被攻破。** 由于无人值守的 CRD 与你的 Google 账户绑定，该账户本身*就是*安全边界。如果有人通过钓鱼手段窃取了你的 Google 密码，而你又没有开启双重验证，那么你的远程桌面也会随之落入对方手中。与其说这是 CRD 的缺陷，不如说这是把所有鸡蛋都放进 Google 账户这一个篮子里所带来的必然后果——这正是为什么，如果你使用 CRD，为该账户开启双重验证是没有商量余地的。

**诈骗。** 与所有远程工具一样，现实中最大的危害并非来自加密体系被攻破，而是社会工程学攻击。[FBI 曾发出警告](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software)，冒充技术支持的骗子惯用手法是诱导受害者安装远程桌面软件并分享访问权限，随后洗劫其账户。CRD 的一次性代码很容易被人在电话里念给一个“热心的技术人员”听，而这恰恰就是问题所在。公平地说，这是一种使用风险，而非 CRD 本身的漏洞——同样的伎俩用在 [AnyDesk](/zh-cn/blog/is-anydesk-safe-zh-cn)、TeamViewer 或 RustDesk 上也同样奏效。我们在[如何避免远程桌面诈骗](/zh-cn/blog/avoid-remote-desktop-scams-zh-cn)一文中介绍了相应的防范习惯。

## CRD 给不了你什么

CRD 刻意保持简约，这对许多人来说正是它的魅力所在。但我们仍有必要说清楚其中的取舍，尤其是当你考虑将其用于个人使用之外的场景时。

你无法对它进行自托管。每一次 CRD 连接都通过 Google 云端中转，并与 Google 账户绑定；没有任何选项可以在自己的服务器上运行中转（rendezvous）服务，也没有源代码可供审查——你只能相信 Google 所说的主机行为与其描述一致。此外，它在团队管理、集中式策略、访问控制列表、会话日志或设备分组等方面也几乎没有提供什么支持。这并不是在批评 Google——CRD 本来就不是为此而设计的。如果你需要这些功能，说明你已经超出了它的能力范围，那么[功能更强大的免费远程桌面工具](/zh-cn/blog/best-free-remote-desktop-software-zh-cn)或[专门的 Chrome Remote Desktop 替代方案](/zh-cn/blog/chrome-remote-desktop-alternative-zh-cn)才是务实的下一步选择。

这正是开源、自托管模式所能提供的地方——它带来的是另一*种*保障，而不仅仅是更多功能。CRD 要求你在没有公开协议可供检视的情况下，就把它的加密视为足够可靠；而 RustDesk 则[基于 AGPL 协议开源](https://github.com/rustdesk/rustdesk)，因此客户端及其加密机制都摆在那里供你审查，而不必凭信任来接受。此外，CRD 把你的 Google 账户当作安全边界，而[自托管](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn)则把 ID/中转服务器和中继服务器放在你自己的机器或 VPS 上——因此中转和访问策略掌握在你自己可控的基础设施上，而不是藏在单一的云端登录之后——这也直接契合了[数据主权与 GDPR](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn) 方面的合规考量。

需要说明的是，这种开放性是一把双刃剑：正因为代码是公开的，RustDesk 自身的漏洞同样是公开的，因此请持续关注其[最新版本](https://github.com/rustdesk/rustdesk/releases)和漏洞披露记录。而且自托管只是把一种维护负担换成了另一种——CRD 所需的账户与 PIN 码维护，变成了需要你自己打补丁的服务器，而流量依然在端点之间直接传输。这是另一种保障模式，而非更轻松的模式。

## 结论

Chrome Remote Desktop 安全吗？对于日常个人使用——连接自己的电脑、帮助亲人——答案是肯定的，它相当安全，而且简单、成本低。应据此来评价它的价值。为你的 Google 账户开启双重验证，选择一个不是生日的 PIN 码，并且绝不向主动联系你的人念出访问代码，做到这几点，你就已经妥善处理了真正重要的风险。

CRD 的局限性体现在控制力和可扩展性上：它是闭源的，依赖 Google 云端中转，管理功能也比较薄弱。如果你需要审查代码、将中转服务保留在自己的基础设施上，或是需要管理两台以上的设备，那正是该考虑开源、自托管方案的时候——这并不是因为 CRD 不安全，而是因为它从一开始就不打算成为那样的工具。
