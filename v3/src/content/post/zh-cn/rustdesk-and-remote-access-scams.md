---
publishDate: 2026-07-06T12:36:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-and-remote-access-scams'
draft: false
title: 'RustDesk 与远程访问诈骗:我们正在采取的措施'
excerpt: 'RustDesk 为何退出 Google Play、新增安全警示与公共服务器登录要求,以及用户如何通过密码、双因素认证(2FA)和 IP 白名单强化受控设备的安全性。'
image: '~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp'
category: '安全'
tags: ['RustDesk', '安全', '诈骗']
author: 'RustDesk Team'
slug: "rustdesk-and-remote-access-scams-zh-cn"
faq:
  - question: 'RustDesk 是骗局吗?'
    answer: '不是。RustDesk 是合法的开源远程访问软件。但与其他远程桌面工具一样,当诈骗者说服某人安装该软件、启动其服务并授予访问权限时,它同样可能被滥用。RustDesk 发布了诈骗警示,并在分发渠道和公共服务器方面新增了限制措施以减少此类滥用行为,但没有任何一款远程访问产品能够彻底杜绝社会工程学攻击。'
  - question: '为什么 RustDesk 在 Google Play 上无法获取?'
    answer: 'RustDesk 于 2023 年 9 月主动将其 Android 应用从 Google Play 下架,以防止针对用户的诈骗事件进一步发生。Android 版本目前仍可从 RustDesk 官方 GitHub Releases 页面和 F-Droid 获取。请仅从您自行核实过的来源下载,切勿使用陌生来电者发来的链接。'
  - question: '为什么 RustDesk 公共服务器需要登录?'
    answer: 'RustDesk 表示,由于持续存在的诈骗和僵尸网络滥用问题,目前在其公共服务器上进行控制端连接需要登录。登录可通过受支持的第三方身份提供商免费完成。公共服务器旨在用于演示和测试,而非生产环境或敏感工作;对于需要自行运维基础设施和管理策略的组织,自托管方案仍然可用。'
  - question: '应如何保护接受 RustDesk 连接的设备?'
    answer: '请在受控设备上设置强度高且唯一的永久密码,启用客户端的 TOTP 连接双因素认证(2FA),并在您的控制端地址或 CIDR 范围可预测的情况下使用 IP 白名单功能。将受信任设备的例外范围控制到最小。这些防护层可以降低密码和网络来源方面的风险,但如果有人主动将密码、当前的 2FA 验证码或手动批准提供给诈骗者,这些措施也无法提供保护。'
metadata:
  description: 'RustDesk 如何应对远程访问诈骗:公开警示、退出 Google Play、公共服务器登录要求、受控设备双因素认证(2FA)以及 CIDR IP 白名单。'
  keywords: 'RustDesk 诈骗, RustDesk 是骗局吗, RustDesk Google Play, RustDesk 登录要求, RustDesk 双因素认证, RustDesk IP 白名单, 远程访问诈骗防范'
---

RustDesk 是合法的开源远程访问软件,但合法软件同样可能被滥用。诈骗者可以打电话给受害者,编造一个紧急问题,诱导对方安装远程控制工具并授予访问权限。RustDesk 也无法完全免于这种风险,而加密技术也无法弥补通过欺骗手段获取的同意。

我们的应对方式,是在这条链路的多个环节设置警示与阻力:官网、Android 受控端流程、一个主要分发渠道,以及公共服务器。这些措施同样会给合法用户带来不便。本文记录了我们已经采取的措施、采取这些措施的原因,以及这些措施目前仍然存在的局限。

## RustDesk 针对远程访问诈骗采取了哪些措施?

| 措施                 | 应对的问题                                   | 代价或局限                                              |
| -------------------- | -------------------------------------------- | ------------------------------------------------------- |
| 官网和客户端警示     | 被陌生来电者指示安装 RustDesk 的用户         | 警示仍可能被忽视                                        |
| 主动退出 Google Play | 借助熟悉的应用商店轻易实施诈骗驱动的安装     | 合法 Android 用户失去应用商店的可发现性和 Play 自动更新 |
| 公共服务器登录要求   | 匿名诈骗和僵尸网络对共享基础设施的滥用       | 合法用户必须登录,部分现有工作流程受到影响               |
| 受控设备安全控制     | 密码窃取、网络暴露面过大以及无人值守访问风险 | 必须正确配置,且无法阻止主动泄露信息的行为               |

这些都是降低风险的措施,并不代表 RustDesk 能够完全杜绝诈骗。

## 潜在受害者可能看到警示的位置

[RustDesk 支持页面](https://rustdesk.com/support)开篇就直接给出了诈骗警示。它告诉那些正在与陌生、不信任的人通话,并被要求安装 RustDesk 的用户:请立即停止。[RustDesk GitHub 代码仓库](https://github.com/rustdesk/rustdesk)中也附有一份滥用声明,明确反对未经授权的访问、控制和侵犯隐私的行为。

这一警示同样内置于通过 [GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 分发的官方 Android 客户端中。在尚未登录、即将被控制的 Android 设备上,点击**启动服务(Start Service)**后,系统会在屏幕捕获服务启动前先弹出一条警示。该警示会提醒被陌生、不受信任的来电者指示操作的用户:停止操作并挂断电话。官方构建版本会设置一段倒计时,用户必须等待倒计时结束才能继续操作。[当前的受控端流程](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421)和[英文警示文本](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194)均可在开源代码仓库中查看。

警示出现的位置很重要。一个通用的安全页面或许能触及正在研究产品的人;而**启动服务**处的警示,则能在 Android 会话即将建立连接的那一刻触及当事人。但它仍然无法强迫对方对一个极具说服力的来电者产生怀疑。

## RustDesk 为何不在 Google Play 上架

2023 年 9 月 3 日,RustDesk 官方 X 账号发文表示:["我们已暂时将 RustDesk 从 Google Play 下架,以防止针对用户的诈骗事件进一步发生。"](https://x.com/rustdesk/status/1698372220379349421)该链接和文字内容也保留在已获回复的 [GitHub Discussion #5660](https://github.com/rustdesk/rustdesk/discussions/5660) 中,而当前 RustDesk 的 [FAQ 也说明该项目因诈骗问题而主动从 Google Play 下架](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store)。

因此,RustDesk **目前并未通过 Google Play 分发**。这并不意味着该 Android 客户端是恶意软件,也不代表每一位安装它的人都处于风险之中。这是一项分发层面的决策,旨在减少诈骗指令中常被利用的一条途径。

这种权衡是真实存在的:退出 Google Play 会降低合法用户的可发现性,失去熟悉的安装方式和应用商店的自动更新。目前的 Android 版本可从 [RustDesk 官方 GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 和 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 获取。请自行核实下载来源。切勿从自称提供支持、主动致电给您的陌生人发来的链接安装 APK。我们的 [Android 与 iOS 使用指南](/zh-cn/blog/rustdesk-remote-control-android-ios-zh-cn)列出了当前的移动端功能和安装来源。

## 公共服务器为何需要登录

RustDesk 当前的[公共服务器登录指南](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server)指出,由于持续存在的诈骗和僵尸网络滥用问题,控制端需要登录。登录是免费的,使用受支持的第三方身份提供商(例如 Google 或 GitHub)完成;公共服务器不提供单独的用户名和密码注册方式。该指南目前说明,仅控制端需要登录。

此举增加了一道身份验证步骤,减少了对 RustDesk 用于演示和测试用途的基础设施的匿名访问。它并不适用于私有 RustDesk 服务器,也无法阻止使用其他基础设施或注册新身份的诈骗者。

这一举措也带来了一些干扰。在一篇[关于新登录错误的 Reddit 讨论](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/)中,一些合法用户反映,在理解并完成登录步骤之前,他们一度无法连接到家中或家人的设备。也有用户反对关联第三方身份。这些评论并不能证明该限制措施对诈骗者是否有效,但确实记录了它带来的实际使用成本。任何会增加操作阻力的防滥用措施,都应当坦诚地承认这一成本。

## 如何保护受 RustDesk 控制的设备?

平台层面的限制只是其中一道防线。受控设备的所有者或管理员还应当进一步限制谁可以连接,以及被窃取的凭据能够造成多大的影响。

### 1. 设置强度高且唯一的永久密码

对于[无人值守访问](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn),请在受控设备的 RustDesk 安全设置中设置一个**强度高且唯一的永久密码**。不要重复使用操作系统登录密码、邮箱密码,或已用于其他服务的密码。如果密码可能已经泄露,请立即更改。

对于有人值守的技术支持场景,在条件允许时,建议优先使用临时一次性密码或明确的点击批准方式。强度高的永久密码可以降低密码被猜出、撞库攻击以及密码重复使用带来的风险。但如果受害者将密码直接读给来电者,这种措施就无法起到作用。

### 2. 在受控设备上启用双因素认证(2FA)

RustDesk 为受控设备的传入连接内置了 TOTP 双因素认证(2FA)功能。在将要接受连接的设备上,打开其安全设置,启用 **2FA**,使用身份验证器扫描二维码,并输入六位数验证码确认设置完成。

启用后,仅凭正常的连接密码已经不够:控制端还必须提供当前有效的六位数 TOTP 验证码,受控设备才会授权该会话。这项功能最初正是作为[无人值守访问的 2FA](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b)推出的,其 [TOTP 实现代码是公开的](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs)。

RustDesk 也可以选择信任某个控制端设备,并跳过后续的 2FA 验证提示。若要采用最严格的安全策略,请将此项跳过功能保持关闭。如果您确实使用了该功能,请定期检查受信任设备列表,并移除已丢失、已更换、已共享或不再获得授权的设备。

2FA 能够防范密码被猜出、重复使用或泄露的情况。但如果有人将密码和当前的验证器代码一并提供给诈骗者,2FA 也无法提供保护。

### 3. 使用 IP 白名单限制传入连接

在 RustDesk 界面中,该功能被称为 **IP Whitelisting**(IP 白名单)。从概念上讲,这是一种 IP 允许列表:在完成密码和 2FA 认证之前,受控设备会先拒绝来源地址不在配置列表内的连接。

配置路径如下:

- **桌面端受控设备:** **设置 → 安全 → 安全 → 使用 IP 白名单**(Settings → Security → Security → Use IP Whitelisting)
- **移动端受控设备:** **设置 → 共享屏幕 → 使用 IP 白名单**(Settings → Share screen → Use IP Whitelisting)

该设置支持填写单个 IPv4 或 IPv6 地址,以及 CIDR 范围。CIDR 由网络地址与前缀长度组成。前缀表示有多少位前导比特是固定的:前缀数值越大,允许的范围就越小。

- `203.0.113.10` 或 `203.0.113.10/32`:单个 IPv4 地址。
- `203.0.113.0/24`:256 个 IPv4 地址,范围从 `203.0.113.0` 到 `203.0.113.255`。
- `2001:db8::10/128`:单个 IPv6 地址。
- `2001:db8:1234::/64`:一个 IPv6 子网。

以上仅为文档中的示例范围,请勿直接照搬使用,应填写您实际的控制端地址或网络。多个条目之间可以用逗号、分号、空格或换行符分隔。RustDesk 在其[高级客户端配置参考文档](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#whitelist)中对该设置进行了说明,[受控端的强制执行逻辑也可以在源代码中查看](https://github.com/rustdesk/rustdesk/blob/master/src/server/connection.rs#L1347-L1374)。

请使用尽可能小且实用的范围。固定的办公网络出口地址和已知的 VPN 网段是比较理想的选择,而动态的家庭住宅地址和漫游中的控制端则不适合。请先确认在您的 NAT、VPN、直连或中继拓扑结构中,RustDesk 实际识别到的来源地址是什么,并在关闭当前工作会话之前,从另一个会话中测试新规则是否生效。填写错误的地址或 CIDR 可能会将合法的支持人员锁在门外。

白名单只能缩小连接可能发起的来源范围。它无法替代密码或 2FA,也无法阻止已经在允许网络范围内活动的恶意控制端。

## 这些措施无法做到什么

警示、应用商店下架、登录要求、强密码、2FA 和 IP 白名单,这些措施各自都能消除攻击者的部分可乘之机,但没有一项能够消除社会工程学攻击这一核心风险:一个人依然可能被说服批准访问,或泄露全部验证要素。

自托管同样无法让滥用行为绝迹。它能让组织自主掌控自己的 RustDesk 服务器和策略,但诈骗者同样可以运营私有基础设施,或分发经过修改的客户端。不应将 RustDesk 公共服务器的限制措施,误认为是一种能自动延伸到每一个自托管部署的防护。

如果有陌生来电者要求您安装 RustDesk、启动其服务、分享密码、泄露 2FA 验证码,或打开银行网站,请立即停止。我们这份厂商中立的指南,说明了如何[识别、防范远程桌面诈骗并从中恢复](/zh-cn/blog/avoid-remote-desktop-scams-zh-cn),其中详细介绍了相关警示信号,以及在访问权限已经被授予时应当采取的措施。

这里所说的责任,不是某一项设置,也不是一句表达良好意愿的声明,而是一项持续的工作:提醒用户注意风险、在滥用行为需要时坦然接受随之而来的操作阻力、提供技术控制手段、如实说明这些手段的局限,并随着攻击者手法的变化不断调整应对方式。
