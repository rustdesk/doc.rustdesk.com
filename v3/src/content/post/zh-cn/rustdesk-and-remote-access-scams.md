---
publishDate: 2026-07-06T12:36:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-and-remote-access-scams'
draft: false
title: 'RustDesk 与远程访问诈骗：我们正在采取的措施'
excerpt: 'RustDesk 为何退出 Google Play、增加警示和公共服务器登录要求，以及用户如何用密码、双重认证（2FA）、IP 白名单和 ID 白名单加固受控设备。'
image: '~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp'
category: '安全'
tags: ['RustDesk', '安全', '诈骗']
author: 'RustDesk Team'
slug: "rustdesk-and-remote-access-scams-zh-cn"
faq:
  - question: 'RustDesk 是骗局吗？'
    answer: '不是。RustDesk 是正规的开源远程访问软件。但和其他远程桌面工具一样，当诈骗者说服某人安装它、启动服务并授予访问权限时，它也可能被滥用。RustDesk 发布了诈骗警示，并在分发渠道和公共服务器上增加了限制来减少滥用，但没有任何远程访问产品能彻底杜绝社会工程学攻击。'
  - question: '为什么在 Google Play 上找不到 RustDesk？'
    answer: 'RustDesk 于 2023 年 9 月主动将 Android 应用从 Google Play 下架，以防止更多针对用户的诈骗。Android 版本仍可从 RustDesk 官方 GitHub Releases 和 F-Droid 获取。请只从您自行核实过的来源下载，不要使用主动来电的陌生人发来的链接。'
  - question: '为什么 RustDesk 公共服务器需要登录？'
    answer: 'RustDesk 表示，由于诈骗和僵尸网络滥用持续存在，目前在其公共服务器上，控制端必须登录。登录免费，可通过受支持的第三方身份提供商完成。公共服务器用于演示和测试，不适合生产环境或敏感工作；需要自行运营基础设施和策略的组织，仍然可以选择自托管。'
  - question: '如何保护接受 RustDesk 连接的设备？'
    answer: '请在受控设备上设置一个强度高且独一无二的固定密码，启用客户端的 TOTP 连接双重认证（2FA），并在控制端地址或 CIDR 范围可预测时启用 IP 白名单。从 RustDesk 1.5.0 起，还可以用 ID 白名单限制允许连接的 RustDesk ID。受信任设备的例外要尽量少。这些防护层能降低密码和网络来源方面的风险，但如果有人主动把密码、当前的 2FA 验证码或手动批准交给诈骗者，它们也无能为力。'
metadata:
  description: 'RustDesk 如何应对远程访问诈骗：公开警示、退出 Google Play、公共服务器登录要求、受控设备双重认证（2FA），以及 IP 白名单和 ID 白名单。'
  keywords: 'RustDesk 诈骗, RustDesk 是骗局吗, RustDesk Google Play, RustDesk 登录要求, RustDesk 双重认证, RustDesk IP 白名单, RustDesk ID 白名单, 远程访问诈骗防范'
---

RustDesk 是正规的开源远程访问软件，但正规软件同样可能被滥用。诈骗者可以打电话给受害者，编造一个紧急问题，说服对方安装远程控制工具并授予访问权限。RustDesk 也无法置身于这种风险之外，而通过欺骗得到的“同意”，加密技术也无从弥补。

我们的应对办法，是在这条路径的多个环节设置警示和阻力：官网、Android 受控端流程、一个主要分发渠道，以及公共服务器。这些措施同样会给正当用户带来不便。本文记录我们做了什么、为什么这样做，以及仍然存在哪些局限。

## RustDesk 针对远程访问诈骗采取了哪些措施？

| 措施                 | 应对的问题                                   | 代价或局限                                                    |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| 官网和客户端警示     | 被陌生来电者要求安装 RustDesk 的用户         | 警示仍可能被忽视                                              |
| 主动退出 Google Play | 诈骗者借助熟悉的应用商店轻松诱导安装         | 正当的 Android 用户无法再通过应用商店发现应用，也没有 Play 自动更新 |
| 公共服务器登录要求   | 诈骗和僵尸网络对共享基础设施的匿名滥用       | 正当用户必须登录，部分现有工作流程受到影响                    |
| 受控设备安全控制     | 密码被盗、网络暴露面过大以及无人值守访问风险 | 必须正确配置，且无法阻止当事人主动泄露                        |

这些措施旨在降低风险，并不是说 RustDesk 能杜绝诈骗。

## 在潜在受害者看得到的地方给出警示

[RustDesk 支持页面](https://rustdesk.com/support)开篇就是一条直接的诈骗警示：如果您正在和一个并不认识、也不信任的人通话，而对方要求您安装 RustDesk，请立即停止。[RustDesk GitHub 代码仓库](https://github.com/rustdesk/rustdesk)中也附有滥用免责声明，明确反对未经授权的访问、控制和侵犯隐私。

通过 [GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 分发的官方 Android 客户端里同样有这条警示。在未登录、即将被控制的 Android 设备上，点击 **启动服务**（Start service）后，屏幕捕获服务启动前会先弹出警示，提醒受陌生、不可信来电者指使的用户停止操作并挂断电话。官方构建版本还设置了倒计时，结束后用户才能继续。[当前的受控端流程](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421)和[英文警示文本](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194)都可以在开源代码仓库中查看。

警示放在哪里很关键。一般的安全页面也许能触达正在了解产品的人；而 **启动服务** 处的警示，能在 Android 设备即将可以接受传入会话的那一刻触达当事人。但它仍然无法迫使当事人怀疑一个极具说服力的来电者。

## RustDesk 为何不在 Google Play 上架

2023 年 9 月 3 日，RustDesk 官方 X 账号发文称：[“我们已暂时将 RustDesk 从 Google Play 下架，以防止更多针对用户的诈骗。”](https://x.com/rustdesk/status/1698372220379349421)该链接和原文也保留在已回复的 [GitHub Discussion #5660](https://github.com/rustdesk/rustdesk/discussions/5660) 中，当前的 RustDesk [FAQ 也说明项目因诈骗问题主动退出了 Google Play](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store)。

因此，RustDesk **目前不通过 Google Play 分发**。这并不是说 Android 客户端是恶意软件，也不是说每个安装它的人都有风险，而是一项分发决策，目的是堵住诈骗话术中常用的一条途径。

这种取舍确实有代价：退出 Google Play 后，正当用户更难发现这款应用，也失去了熟悉的安装方式和应用商店自动更新。目前的 Android 版本可从 [RustDesk 官方 GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 和 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 获取。请自行核实下载地址，不要通过主动来电的“技术支持”发来的下载链接安装 APK。我们的 [Android 与 iOS 指南](/zh-cn/blog/rustdesk-remote-control-android-ios-zh-cn)列出了当前的移动端功能和安装来源。

## 公共服务器为何需要登录

RustDesk 当前的[公共服务器登录说明](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server)指出，由于诈骗和僵尸网络滥用持续存在，控制端必须登录。登录免费，通过 Google、GitHub 等受支持的第三方身份提供商完成；公共服务器不提供单独的用户名和密码。该说明目前写明只有控制端需要登录。

这增加了一道身份步骤，也减少了对 RustDesk 用于演示和测试的基础设施的匿名访问。它不约束私有 RustDesk 服务器，也拦不住使用其他基础设施或重新注册身份的诈骗者。

这项措施也带来了干扰。在一篇[关于新登录错误的 Reddit 讨论](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/)中，一些正当用户反映，在弄明白并完成登录步骤之前，他们无法连接家里或家人的设备；也有人不愿意绑定第三方身份。这些评论并不能证明这项限制对诈骗者有效或无效，但确实记录了它的使用成本。增加阻力的防滥用措施，应当坦率承认这种成本。

## 如何保护受 RustDesk 控制的设备？

平台层面的限制只是一道防线。受控设备的所有者或管理员还应进一步限制谁能连接，以及被盗的凭据能造成多大影响。

### 1. 设置强度高且独一无二的固定密码

对于[无人值守访问](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn)，请在受控设备的 RustDesk 安全设置中设置一个**强度高且独一无二的固定密码**。不要沿用操作系统登录密码、邮箱密码或其他服务用过的密码。如果密码可能已经泄露，请立即更换。

对于有人在场的技术支持，条件允许时优先使用临时的一次性密码或明确的点击确认。强固定密码可以降低被猜中、撞库和密码复用的风险，但如果受害者把密码念给来电者，它就帮不上忙。

### 2. 在受控设备上启用双重认证（2FA）

RustDesk 为受控设备的传入连接内置了 TOTP 双重认证（2FA）。在将要接受连接的设备上打开安全设置，启用 **2FA**，用身份验证器扫描二维码，再输入六位验证码完成设置。

启用后，仅凭普通的连接密码已经不够：控制端还必须提供当前有效的六位 TOTP 验证码，受控设备才会授权会话。这项功能当初正是作为[无人值守访问的 2FA](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b) 推出的，其 [TOTP 实现代码公开可查](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs)。

RustDesk 可以选择信任某台控制端设备，之后跳过 2FA 提示。若要最严格的行为，请保持这项豁免关闭。如果启用了，请定期检查受信任设备列表，移除已丢失、已更换、多人共用或不再获授权的设备。

2FA 可以防范被猜中、被复用或已泄露的密码，但如果有人把密码和当前的验证码一并交给诈骗者，它也无法提供保护。

### 3. 用 IP 白名单限制传入连接

RustDesk 界面中把这项功能称为 **IP 白名单**（IP Whitelisting）。通俗地说，它就是一份 IP 允许列表：在校验密码和 2FA 之前，受控设备会先拒绝来源地址不在列表中的连接。

配置位置：

- **桌面受控设备：** **设置 → 安全 → 安全 → 只允许白名单上的 IP 访问**
- **移动受控设备：** **设置 → 共享屏幕 → 只允许白名单上的 IP 访问**

该设置接受单个 IPv4 或 IPv6 地址，也接受 CIDR 范围。CIDR 由网络地址和前缀长度组成，前缀表示前面有多少位是固定的：前缀越大，允许的范围越小。

- `203.0.113.10` 或 `203.0.113.10/32`：一个 IPv4 地址。
- `203.0.113.0/24`：256 个 IPv4 地址，从 `203.0.113.0` 到 `203.0.113.255`。
- `2001:db8::10/128`：一个 IPv6 地址。
- `2001:db8:1234::/64`：一个 IPv6 子网。

以上是仅供文档使用的示例地址段，请勿原样照抄，应填写您实际的控制端地址或网段。多个条目可以用逗号、分号、空格或换行分隔。RustDesk 在[客户端高级配置参考](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/advanced-settings/#whitelist)中说明了这项设置，[受控端的校验逻辑也可以在源代码中查看](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1410-L1437)。

范围要尽可能小。固定的办公网络出口地址和已知的 VPN 网段是合适的选择，动态的家庭宽带地址和经常移动的控制端则不合适。请确认在您的 NAT、VPN、直连或中继拓扑中，RustDesk 看到的来源地址究竟是哪个；关闭当前可用的会话之前，先从另一个会话测试新规则。地址或 CIDR 填错，可能把正当的支持人员挡在门外。

白名单缩小的是连接可以发起的来源范围。它不能替代密码或 2FA，也拦不住已经在允许网络内活动的恶意控制端。

### 4. 限制可以连接的 RustDesk ID

从 RustDesk 1.5.0 起，受控设备还可以只接受来自指定 RustDesk ID 的连接。界面中把这项功能称为 **ID 白名单**（ID whitelisting）。它适合网络地址经常变化、但控制端设备固定且已知的支持团队，这类场景下 IP 白名单难以使用。

配置位置：

- **桌面受控设备：** **设置 → 安全 → 安全 → 只允许白名单上的 ID 访问**
- **移动受控设备：** **设置 → 共享屏幕 → 只允许白名单上的 ID 访问**

填写允许控制本设备的那些设备的 RustDesk ID。与 IP 白名单一样，多个条目可以用逗号、分号、空格或换行分隔。匹配不区分大小写，并支持两种通配符：

- `123456789`：一个 ID。
- `12345678?`：`?` 恰好匹配一个字符，因此该条目允许所有以 `12345678` 开头、共九个字符的 ID。
- `support-*`：`*` 匹配任意数量的字符，适用于控制端使用带共同前缀的自定义 ID 的情况。

以上同样是示例值。该设置在[客户端高级配置参考](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/advanced-settings/#id-whitelist)中以 `id-whitelist` 列出，因此管理员可以在自定义客户端中预先配置；[其校验逻辑也可以在源代码中查看](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1439-L1467)。

这项检查在控制端发送登录请求时执行，早于密码或 2FA 验证码的校验。会话双方互换角色时（这一操作原本不需要密码）同样会检查。如果同时设置了 IP 白名单，连接必须两项都通过。被拒绝的控制端会看到“你的 ID 已被对方阻止”（Your ID is blocked by the peer），而且连接尝试有频率限制，无法通过快速试探找出名单中的 ID。

也要清楚它的局限。ID 由发起连接的客户端自行上报，不能证明身份，修改过的客户端可以冒用名单中的 ID；RustDesk 在该设置旁边也标注了这一点。这份名单的作用，是在 ID 不在名单上的普通客户端到达密码输入环节之前就把它们挡回去。在管理员预先配置了名单的设备上，即使来电者诱导用户念出 ID 和密码，也无法用标准客户端从名单外的 ID 连上来。请继续保留强密码和 2FA；关闭当前可用的会话之前，先从另一个会话测试名单：一个笔误就可能把正当的支持人员挡在门外。

## 这些措施做不到什么

警示、应用商店下架、登录要求、强密码、2FA、IP 白名单和 ID 白名单，各自都能消除攻击者的一部分机会，但没有一项能消除社会工程学这个核心风险：人仍然可能被说服去批准访问，或者交出所有验证要素。

自托管也不能让滥用绝迹。它让组织掌控自己的 RustDesk 服务器和策略，但诈骗者同样可以运营私有基础设施，或分发修改过的客户端。RustDesk 公共服务器的限制只适用于公共服务器；自托管部署遵循的是其运营者自己设定的策略。

如果有陌生来电者要求您安装 RustDesk、启动它的服务、告知密码、透露 2FA 验证码或打开银行网站，请立即停止。我们这份不偏向任何厂商的指南介绍了如何[识别、防范远程桌面诈骗以及受骗后如何补救](/zh-cn/blog/avoid-remote-desktop-scams-zh-cn)，包括各种危险信号，以及访问权限已经交出后该怎么办。

这里的责任，不是某一项设置，也不是一句善意的表态，而是一项持续的工作：提醒用户，在滥用逼迫之下接受必要的阻力，提供技术控制手段，如实说明这些手段的局限，并随着攻击者手法的变化不断调整应对。
