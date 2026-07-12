---
publishDate: 2026-07-01T08:14:00Z
lang: 'zh-cn'
translationKey: 'chrome-remote-desktop-alternative'
draft: false
title: 'Chrome Remote Desktop 替代方案：自托管 RustDesk'
excerpt: 'Chrome Remote Desktop 免费且简单，但会将你与 Google 绑定，并且缺少一些关键功能。这里有一款开源、自托管、完全由你掌控的替代方案。'
image: '~/assets/images/blog/chrome-remote-desktop-alternative-og.png'
category: '替代方案'
tags: ['RustDesk', 'Chrome Remote Desktop', '替代方案', '自托管']
author: 'RustDesk Team'
slug: "chrome-remote-desktop-alternative-zh-cn"
faq:
  - question: '有没有不需要 Google 账号的 Chrome Remote Desktop 替代方案？'
    answer: '有。自托管的 RustDesk 完全不需要任何第三方账号（公共演示服务器需要控制端进行免费登录），它使用自己的 ID/rendezvous 服务器和中继服务器来代替 Google 账号，并且你可以自行托管这些服务器，中间不会有任何第三方云服务介入。相比之下，Chrome Remote Desktop 要求被控端和主控端都必须登录 Google 账号。'
  - question: 'Chrome Remote Desktop 支持文件传输吗？'
    answer: 'Chrome Remote Desktop 提供基本的文件上传/下载功能，但不支持拖放传输。RustDesk 在远程控制之外还内置了完整的文件传输功能。'
  - question: 'Chrome Remote Desktop 可以实现无人值守访问吗？'
    answer: '可以，但目标设备必须处于开机状态，并登录同一个 Google 账号，而且 Chrome Remote Desktop 无法唤醒处于休眠状态的电脑。RustDesk 支持通过固定密码对整个设备群进行无人值守访问，并可在你自己的控制台中统一管理。'
  - question: 'RustDesk 和 Chrome Remote Desktop 一样免费吗？'
    answer: 'RustDesk 是基于 AGPL 协议的开源软件，你可以免费、无限期地运行社区服务器。商业版 Server Pro 增加了团队协作功能，同样支持自托管；具体条款请参见 rustdesk.com/pricing。'
metadata:
  description: 'Chrome Remote Desktop 免费且简单，但会将你与 Google 绑定，并缺少一些关键功能。将其与开源、自托管的替代方案 RustDesk 进行比较。'
  keywords: 'Chrome Remote Desktop 替代方案, 自托管 Chrome Remote Desktop 替代方案, 无需 Google 账号的远程桌面, RustDesk 对比 Chrome Remote Desktop'
---

Chrome Remote Desktop 的自托管开源替代方案就是 RustDesk：你可以自行托管调度服务，还能查看客户端源代码——而不必让每一次会话都经过 Google 云端转发，也不必将访问权限与 Google 账号绑定在一起。

## 为什么要寻找 Chrome Remote Desktop 的替代方案

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) 是 Google 推出的免费、基于浏览器的远程访问工具。它简单快捷：安装一个小型主机程序、登录账号，几分钟内就能从另一台设备访问你的电脑——这正是普通个人使用场景所需要的。

但只要你的需求超出「窝在沙发上帮自己的笔记本电脑解决点小问题」这种场景，问题就开始暴露出来了。你要依赖 Google 的账号体系和信令服务，一些面向支持团队的功能是缺失的，而且控制平面无法自托管。Google 的[网络指南](https://support.google.com/chrome/a/answer/16364503)解释了其中的边界：连接最初通过 Google 服务协商建立，而实时的 WebRTC 流量则使用直连、STUN 或 TURN/中继路径。只有 TURN/中继会话的数据包才会经由 Google 数据中心转发。如果你也遇到过这些限制，本文将介绍一个自托管、开源的替代方案是什么样的。

## Chrome Remote Desktop 的优势所在

公道地说，[TechRadar 的评测](https://www.techradar.com/reviews/chrome-remote-desktop-review)称它「完全免费，没有订阅或高级付费层级」，设置简单，非常适合个人使用。它可以在 Windows、macOS 和 Linux 上运行，无需协商许可证，也没有任何需要自行托管的部分。如果你只是想用手机查看一下家里的电脑，CRD 几乎不需要花什么力气。

这种简单本身就是它的产品定位。但当你需要它完成技术支持团队或多设备环境真正需要的任务时，问题就来了。

## Chrome Remote Desktop 的局限性

### 缺失的功能：自托管控制、设备管理与团队协作

Google 的帮助文档介绍了如何远程访问文件和应用程序，并允许管理员控制访问权限和网络行为，但描述的始终是一项基于 Google 账号、由 Google 负责协调的服务——也就是前文提到的信令与中继分离机制。换句话说：CRD 应付简单的访问需求没有问题，但它不是一个具备 RustDesk 那种设备分组或自定义品牌功能的自托管支持控制台。

### 无人值守访问与休眠设备

CRD 可以实现无人值守访问，但目标设备仍然必须**处于开机联网状态**，并登录**同一个 Google 账号**。Google 文档中描述的是基于 PIN 码的远程访问方式，而不是网络唤醒（wake-on-LAN）的替代方案。如果设备处于休眠或离线状态，CRD 就无法连接。对于管理一批远程终端设备而言，这是一个实实在在的运维限制。

### 用户管理与 Google 账号要求

每个参与者都需要一个 Google 账号，对于共享（非无人值守）会话，还必须有人在场授权访问。Google Workspace 管理员可以[启用或禁用 CRD 并限制防火墙穿透行为](https://support.google.com/chrome/a/answer/2799701)，但这与拥有设备分组和分级技术人员权限的自托管支持控制台并不是一回事——而且正如前文所述，Google 始终处于身份验证和会话建立的路径之中。（关于安全性方面的具体分析，请参见[Chrome Remote Desktop 安全吗？](/zh-cn/blog/is-chrome-remote-desktop-safe-zh-cn)）

## Chrome Remote Desktop 与 RustDesk 一览对比

|                                                                                         | Chrome Remote Desktop                                     | RustDesk                                                                                                                        |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 费用                                                                                    | 免费                                                      | 开源（AGPL）；免费社区服务器；付费 Server Pro                                                                                   |
| 控制平面与流量                                                                          | Google 身份验证/信令；直连、STUN 或经 Google 中继的媒体流 | [自托管](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn)服务器角色；直连或自建中继的媒体流 |
| 源代码                                                                                  | 闭源                                                      | 开源（[AGPL](https://github.com/rustdesk/rustdesk)），可审计                                                                    |
| 所需账号                                                                                | 双端均需 Google 账号                                      | 使用你自己的 ID；无需第三方账号                                                                                                 |
| 文件传输/传输流程                                                                       | 仅支持上传/下载（不支持拖放）                             | 内置支持                                                                                                                        |
| [无人值守访问](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn) | 需同一 Google 账号，且设备必须处于唤醒状态                | 使用固定密码访问你管理的整个设备群                                                                                              |
| 集中管理                                                                                | Google Admin 策略；无自托管支持控制台                     | Web 控制台、[设备分组、共享通讯录](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)                  |
| 自定义品牌                                                                              | 不支持                                                    | 自定义品牌客户端生成器（Basic 套餐及以上）                                                                                      |
| 支持平台                                                                                | Win/macOS/Linux（需在 Chrome 中运行）                     | Win/macOS/[Linux](/zh-cn/blog/rustdesk-for-linux-zh-cn)/Android；iOS 端仅可作为控制端   |

## RustDesk 的定位：自托管与开源

RustDesk 的核心正是 CRD 在架构上无法提供的两件事：**由你托管基础设施，并且你可以阅读源代码。**

RustDesk 基于 **[AGPL](https://github.com/rustdesk/rustdesk)** 协议开源——你可以准确审计运行在自己设备上的每一行代码，自行编译构建，并**无限期免费运行社区服务器**。升级到 Server Pro 后，它依然**[天生就是自托管的](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn)**：ID/rendezvous 服务器和中继服务器运行在你自己的机器上，或是你租用的 VPS 上，中间不会有任何 Google（或其他厂商）的云服务。有一点值得在合规规划时留意：直连连接仍然是在两个端点之间直接传输，而中继流量走的是你自己的中继服务器，因此请仔细评估[数据主权方面的影响](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn)，而不要想当然地认为服务器所在地就能控制每一个数据包的流向。

在这一自托管核心之上，RustDesk 还增添了 CRD 所缺乏的团队功能：[自托管 Web 控制台](https://rustdesk.com/docs)、自定义品牌客户端生成器、用于分级访问控制的[设备分组与共享通讯录](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)，以及从 Basic 套餐起提供的 [LDAP/AD 与 OIDC 单点登录（SSO）](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/ldap/)。在 Windows、macOS、Linux 和 Android 主机上，完整的文件传输与固定密码[无人值守访问](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn)都是标准功能；iOS 客户端仅可作为控制端使用。

## 脱离 Google 云，转向你自己的云

相比 Chrome Remote Desktop，真正的提升在于掌控权：调度、访问策略和会话数据从 Google 的服务器，转移到由你自己运营、可审计的服务器上。对于希望远程访问工具只对自己负责的人来说，这就是最大的价值所在。

## 无需销售电话，直接上手试用

你可以完全按照自己的节奏评估 RustDesk，整个过程无需涉及任何 Google 账号。开源社区服务器可以免费运行，想用多久就用多久；当你需要 Pro 版的团队功能时，可以联系 [sales@rustdesk.com](mailto:sales@rustdesk.com) 了解当前的评估条款，[rustdesk.com/pricing](https://rustdesk.com/pricing) 页面则列出了各套餐的价格。

你可以亲自到 [GitHub](https://github.com/rustdesk/rustdesk) 上查看源代码，把几台设备指向你自己搭建的服务器进行测试，在做出任何承诺之前，自行判断这些取舍是否符合你的需求。
