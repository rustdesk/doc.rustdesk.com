---
publishDate: 2026-07-05T18:49:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktop 安全吗？安全性与部署局限'
excerpt: 'Chrome Remote Desktop 安全吗？本文客观剖析其加密方式、PIN 码与 Google 账户模型、真实存在的风险，以及自托管方案的不同之处。'
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: '安全'
tags: ['Chrome Remote Desktop', '安全']
author: 'RustDesk Team'
slug: 'is-chrome-remote-desktop-safe-zh-cn'
faq:
  - question: '使用 Chrome Remote Desktop 安全吗？'
    answer: '是的，个人使用是安全的。Google 的文档表明，Chrome Remote Desktop 会话经过完全加密，无人值守访问需要 PIN 码，支持会话使用一次性访问代码。主要风险在于 PIN 码过弱、Google 账户被盗，以及诱导受害者分享代码的诈骗分子。请为 Google 账户开启双重验证，并选择一个不容易被猜到的 PIN 码。'
  - question: 'Chrome Remote Desktop 是加密的吗？'
    answer: '是的。Google 表示所有 Chrome Remote Desktop 会话都经过完全加密。其企业网络指南介绍，WebRTC/ICE 连接会尽可能在两台电脑之间直接建立，否则经由 TURN 中继；Chromium 还公开了 remoting 源代码，因此主机、客户端和协议组件都可以检查。'
  - question: 'Chrome Remote Desktop 存在哪些安全风险？'
    answer: '三个实际风险是：PIN 码过弱或容易被猜到（最低仅需六位数字）、主机所绑定的 Google 账户被攻破，以及有人诱导受害者分享访问代码的社会工程诈骗。为 Google 账户开启双重验证、选择不容易被猜到的 PIN 码，并且绝不向主动联系你的人分享代码，就能应对现实中的大部分风险。'
  - question: '我可以自托管 Chrome Remote Desktop 吗？'
    answer: '不能。Chromium 公开了 Chrome Remote Desktop 的 remoting 源代码，但 Google 的连接协调服务无法自托管，因此每个连接都要经由 Google 建立。RustDesk 是可自托管的替代方案：免费社区服务器 RustDesk Server OSS 可运行你自己的 ID/连接协调服务和中继，RustDesk Server Pro 则增加了 Web 控制台、访问控制和品牌客户端。'
metadata:
  description: 'Chrome Remote Desktop 安全吗？了解 Google 官方文档中关于 CRD 加密和 PIN 码保护的说明、实际存在的风险，以及 Google 账户信任模型。'
  keywords: 'Chrome Remote Desktop 安全吗, Chrome Remote Desktop 安全性, Chrome Remote Desktop 加密, Chrome Remote Desktop PIN 码, Chrome Remote Desktop 风险, CRD 安全吗'
---

简短回答：对个人使用而言，Chrome Remote Desktop（CRD）是相当安全的。它是 Google 推出的一款免费、简洁的工具，会对会话加密，并通过 PIN 码和你的 Google 账户控制访问。需要注意的是：连接协调服务由 Google 运营，管理依靠 Google 的企业策略而不是支持控制台，而且和所有远程工具一样，它也可能被诈骗分子用来对付你。以下是基于可靠来源的详细分析。

## 简要回答

是的，个人使用是安全的。对于它的设计用途——远程连接自己的电脑，或者帮助家人——CRD 已经足够安全，Google 会为这条连接提供保护。根据 [Google 官方支持文档](https://support.google.com/chrome/answer/1649523)，所有远程桌面会话都经过完全加密，无人值守访问需要 PIN 码，一次性支持会话则使用只能生效一次的访问代码。对个人使用而言，这是合理的安全基线。

对于组织使用，Google 的[企业管理策略](https://support.google.com/chrome/a/answer/2799701)和[网络指南](https://support.google.com/chrome/a/answer/16364503)允许管理员限制谁可以使用 CRD 以及它如何连接；连接协调服务仍由 Google 运营。

## Chrome Remote Desktop 如何保护会话安全

真正起作用的是三种机制，均记录在 [Google 帮助页面](https://support.google.com/chrome/answer/1649523)中：

- **加密与路由。** Google 表示会话经过完全加密。其[网络指南](https://support.google.com/chrome/a/answer/16364503)介绍，ICE/WebRTC 连接可以是直连、借助 STUN 建立，或经 TURN 中继。连接协调使用 Google 服务；会话媒体并不总是经过 Google 中继。
- **无人值守访问的 PIN 码。** 要连接一台你已设置为可持续远程访问的电脑，需要输入 PIN 码。正是这一机制，阻止了那些拿到你 Google 会话的陌生人悄无声息地连接进来。
- **用于技术支持的一次性访问代码。** 当你实时帮助他人时，主机会生成一个代码；根据 Google 的说明，该代码只能使用一次，若要继续共享，则需要定期重新确认。

在这些机制之上，还有 Google 账户本身这一层防护——它可以、而且对于远程访问而言绝对应该，通过双重验证来加以保护。对于在可信网络中的个人使用而言，这套安全体系确实是可靠的。

## 真正的风险到底在哪里

CRD 的薄弱环节并不特殊，正是其设计本身自然带来的三个问题。

**PIN 码过弱。** PIN 码是无人值守访问的门锁，而 Google 规定的最低位数仅为六位。面对陌生人的单次猜测，六位数字本身没什么问题，但人们往往会选择容易预测的数字——生日、重复数字、连续数字——这会让实际的搜索空间远小于位数所暗示的规模。对于一台 24 小时全天候可被访问的电脑来说，一个随意设置的 PIN 码是最可能被突破的入口。请选择一个不容易被猜到的组合。

**Google 账户被攻破。** Google 账户是 CRD 访问边界的一部分：如果有人通过钓鱼窃取了你的密码，而你又没有开启双重验证，你的远程桌面列表也会一并落入对方手中。请为账户开启 2FA，检查已登录的设备，并撤销不再需要的访问权限。无人值守访问还需要主机 PIN 码，因此仅凭账户密码并不能打开每一台主机。

**诈骗。** 来电者可能说服受害者分享访问代码并批准会话。[FBI 已就远程访问软件被滥用发出警告](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software)。请通过独立渠道核实支持请求；对于被有意授权给诈骗分子的会话，加密也无能为力。参见[如何避免远程桌面诈骗](/zh-cn/blog/avoid-remote-desktop-scams-zh-cn)。

## CRD 给不了你什么

CRD 刻意保持简约，这对许多人来说正是它的魅力所在。但我们仍有必要说清楚其中的取舍，尤其是当你考虑将其用于个人使用之外的场景时。

[Chromium 公开了 CRD 的 remoting 源代码](https://chromium.googlesource.com/chromium/src/+/main/remoting/)，包括主机、客户端和协议组件，但 Google 的连接协调服务无法自托管。Google 的[企业策略](https://support.google.com/chrome/a/answer/2799701)控制谁可以使用 CRD，却不会把它变成一个由客户运营、具备设备组、按用户访问规则和品牌客户端的支持控制台。这并不是在批评 Google，只是 CRD 本就不是为此而生。如果你需要这些功能，下一步可以看看 [Chrome Remote Desktop 替代方案](/zh-cn/blog/chrome-remote-desktop-alternative-zh-cn)。

RustDesk 的**客户端和 RustDesk Server OSS（免费社区服务器）采用 [AGPL 许可证](https://github.com/rustdesk/rustdesk)**；**Server Pro 是商业的专有自托管服务器软件**。Server OSS 可运行你自己的 ID/连接协调服务和中继，Server Pro 则增加了 Web 控制台、按用户和设备组设定的访问控制以及品牌客户端，因此连接协调和访问策略都位于你掌控的基础设施上，而不是藏在单一的云端登录之后。这与[数据主权与 GDPR](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn) 的要求相契合。

需要说明的是，这种开放性是一把双刃剑：正因为代码是公开的，RustDesk 自身的漏洞同样是公开的，因此请持续关注其[最新版本](https://github.com/rustdesk/rustdesk/releases)和漏洞披露记录。而且自托管只是把一种维护负担换成了另一种——CRD 所需的账户与 PIN 码维护，变成了需要你自己打补丁的服务器，而流量依然在端点之间直接传输。这是另一种保障模式，而非更轻松的模式。

## 结论

Chrome Remote Desktop 安全吗？对个人使用而言——连接自己的电脑或帮助亲人——是安全的。CRD 会对会话加密，用 PIN 码保护无人值守访问，并在支持会话中使用一次性代码。为你的 Google 账户开启双重验证，选择一个不是生日的 PIN 码，并且绝不向先联系你的人念出访问代码，就能应对真正重要的风险。

CRD 力有不逮的地方在于控制权和规模：连接协调服务由 Google 运营，管理依靠 Google 的企业策略而不是支持控制台。如果你需要把连接协调留在自己的基础设施上、按设备组限定技术人员的访问范围，或从一个控制台管理整批设备，那就是该考虑自托管 RustDesk 的时候了——不是因为 CRD 不安全，而是因为它从来就不打算成为那样的工具。
