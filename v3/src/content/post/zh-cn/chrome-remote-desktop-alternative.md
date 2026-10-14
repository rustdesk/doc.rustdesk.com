---
publishDate: 2026-07-01T08:14:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'chrome-remote-desktop-alternative'
draft: false
title: 'Chrome Remote Desktop 替代方案：自托管 RustDesk'
excerpt: '对比由 Google 运营的 Chrome Remote Desktop 与 RustDesk：自托管的连接协调与中继服务、开放的客户端、免费的 Server OSS 以及 Pro 团队管理功能。'
image: '~/assets/images/blog/chrome-remote-desktop-alternative-og.webp'
category: '替代方案'
tags: ['RustDesk', 'Chrome Remote Desktop', '替代方案', '自托管']
author: 'RustDesk Team'
slug: 'chrome-remote-desktop-alternative-zh-cn'
faq:
  - question: '有没有不需要 Google 账号的 Chrome Remote Desktop 替代方案？'
    answer: '有。连接到你自托管服务器的 RustDesk 客户端通过设备 ID 和密码连接，无需 Google 或任何其他第三方账号。Server Pro 还可以添加本地管理的账号，或接入你自己的身份提供商。只有 RustDesk 公共演示服务器要求控制端进行免费登录。Chrome Remote Desktop 则使用 Google 身份和由 Google 运营的连接协调。'
  - question: 'Chrome Remote Desktop 支持文件传输吗？'
    answer: '支持，但只有基本的上传和下载。Chrome Remote Desktop 不支持拖放传输。RustDesk 在远程控制之外内置了双向文件传输，技术人员无需离开会话或切换到其他工具，就能在两个方向上移动文件。'
  - question: 'Chrome Remote Desktop 可以实现无人值守访问吗？'
    answer: '可以。Chrome Remote Desktop 支持基于账号、受 PIN 码保护的无人值守访问，前提是目标设备在线。RustDesk 使用固定密码（默认设置即接受固定密码），并需要被控端上的 RustDesk 服务处于运行状态；Server Pro 还可以集中管理这些设备。两款工具都无法自行唤醒已关机的电脑。'
  - question: 'RustDesk 和 Chrome Remote Desktop 一样免费吗？'
    answer: '是的。RustDesk 客户端和 RustDesk Server OSS（免费社区服务器）采用 AGPL 许可证，免费使用，没有许可费，也不会到期；主机和带宽由你自行提供。商业专有的 Server Pro 增加了自托管的团队管理功能，例如 Web 控制台、设备组和 LDAP/OIDC 单点登录；详见 rustdesk.com/pricing。'
metadata:
  description: 'Chrome Remote Desktop 免费且简单，但会把你与 Google 绑定，并缺少一些关键功能。来看看它与开源、自托管的替代方案 RustDesk 的对比。'
  keywords: 'Chrome Remote Desktop 替代方案, 自托管 Chrome Remote Desktop 替代方案, 无需 Google 账号的远程桌面, RustDesk 对比 Chrome Remote Desktop'
---

Chrome Remote Desktop 的自托管开源替代方案就是 RustDesk：你可以用 RustDesk Server OSS（免费社区服务器）自行运行 ID/连接协调服务器和中继服务器，还能阅读客户端源代码，而不必把访问权限绑定在 Google 账号和由 Google 运营的连接协调上。商业版 Server Pro 在同样的自托管基础上增加了团队管理功能。

## 为什么要寻找 Chrome Remote Desktop 的替代方案

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) 是 Google 推出的免费、基于浏览器的远程访问工具。它简单快捷：安装一个小型主机程序、登录账号，几分钟内就能从另一台设备访问你的电脑——这正是普通个人使用场景所需要的。

但只要你的需求超出“窝在沙发上帮自己的笔记本电脑解决点小问题”，短板就会显现：你被绑定在 Google 的身份与信令体系上，一些面向支持团队的功能缺失，而且控制平面无法自托管。Google 的[网络指南](https://support.google.com/chrome/a/answer/16364503)说明了其中的边界：连接通过 Google 服务协商建立，实时会话流量则使用直连、STUN 或 TURN/中继路径，只有 TURN/中继数据包才会经过 Google 数据中心。

## Chrome Remote Desktop 的优势所在

公道地说，[TechRadar 的评测](https://www.techradar.com/reviews/chrome-remote-desktop-review)称它“完全免费，没有订阅或高级付费层级”，设置简单，非常适合个人使用。它可以在 Windows、macOS 和 Linux 上运行，无需协商许可证，也没有任何需要自行托管的部分。如果你只是想用手机查看一下家里的电脑，CRD 几乎不需要花什么力气。

这种简单本身就是它的产品定位。但当你需要它完成技术支持团队或多设备环境真正需要的任务时，问题就来了。

## Chrome Remote Desktop 的局限性

### 缺失的功能：自托管控制、设备管理与团队协作

Google 的帮助文档介绍了如何远程访问文件和应用程序，并允许管理员控制访问权限和网络行为，但描述的始终是一项基于 Google 账号、由 Google 负责协调的服务——也就是前文提到的信令与中继分离机制。换句话说：CRD 应付简单的访问需求没有问题，但它不是一个具备 RustDesk 那种设备组或自定义品牌功能的自托管支持控制台。

### 无人值守访问与休眠设备

CRD 支持受 PIN 码保护的无人值守访问，但目标设备必须开机、联网，并关联到同一个 Google 账号。RustDesk 同样需要被控端在线，且其服务处于运行状态、已获得平台权限。两款工具都无法自行唤醒已关机的电脑；RustDesk 文档指出，在局域网发现之后，如果本地环境支持，可以使用网络唤醒（Wake-on-LAN）。

### 用户管理与 Google 账号要求

每个参与者都需要一个 Google 账号，对于共享（非无人值守）会话，还必须有人在场授权访问。Google Workspace 管理员可以[启用或禁用 CRD 并限制防火墙穿透](https://support.google.com/chrome/a/answer/2799701)，但这与拥有设备组和分级技术人员权限的自托管支持控制台并不是一回事——而且正如前文所述，Google 始终处于身份验证和会话建立的路径之中。（关于安全性方面的具体分析，请参见 [Chrome Remote Desktop 安全吗？](/zh-cn/blog/is-chrome-remote-desktop-safe-zh-cn)）

## Chrome Remote Desktop 与 RustDesk 一览对比

|                                                                    | Chrome Remote Desktop                                                                                                      | RustDesk                                                                                            |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 费用                                                               | 免费                                                                                                                       | 客户端和 Server OSS 免费；Server Pro 付费                                                           |
| 控制平面与流量                                                     | Google 身份验证/信令；直连、STUN 或经 Google 中继的媒体流                                                                  | [自托管](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn)服务器角色；直连或经自建中继的媒体流 |
| 源代码                                                             | [Chromium remoting 组件公开](https://chromium.googlesource.com/chromium/src/+/main/remoting/)；Google 服务不提供自托管     | AGPL 客户端和 Server OSS；专有的 Server Pro 管理功能                                                |
| 所需账号                                                           | 双端均需 Google 账号                                                                                                       | 使用你自己的 ID；无需第三方账号                                                                     |
| 文件传输/传输流程                                                  | 仅支持上传/下载（不支持拖放）                                                                                              | 内置支持                                                                                            |
| [无人值守访问](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn) | 基于账号/PIN 码；目标设备必须在线                                                                                          | 固定密码；服务运行且已授予操作系统权限；目标设备必须在线                                            |
| 集中管理                                                           | Google Admin 策略；没有由客户运营的 CRD 控制服务                                                                           | Server Pro 控制台、访问控制、设备组和共享通讯录                                                     |
| 自定义品牌                                                         | 不支持                                                                                                                     | 自定义品牌客户端生成器（Basic 套餐及以上）                                                          |
| 支持平台                                                           | Win/macOS/Linux（在 Chrome 中运行）                                                                                        | Win/macOS/[Linux](/zh-cn/blog/rustdesk-for-linux-zh-cn)/Android；iOS 控制端应用                     |

## RustDesk 的定位：自托管与开源

RustDesk 的独特之处在于**一条可部署的自托管服务器路径**。[Chromium 公开了 CRD 的 remoting 源代码](https://chromium.googlesource.com/chromium/src/+/main/remoting/)，但 Google 的连接协调服务无法自托管；而使用 RustDesk，你可以自行运行 Server OSS 或 Server Pro。

**RustDesk 客户端和 Server OSS 采用 AGPL 许可证**，可以独立审查和构建。Server OSS 提供自托管的 ID/连接协调服务和中继，没有许可费，也不会到期。**Server Pro 是商业的专有自托管服务器软件**，在你的基础设施上增加管理功能。直连会话在端点之间传输；中继会话经过你的中继。请结合服务器部署位置，评估[数据主权方面的影响](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn)。

Server Pro 增加了 CRD 所缺乏的团队功能：自托管 Web 控制台、设备组、共享通讯录以及按用户和设备组设定的[访问控制](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)，并从 Basic 套餐起提供自定义客户端生成和 LDAP/OIDC 单点登录。在 Windows、macOS 和 Linux 被控端上，只要服务处于运行状态并已授予操作系统权限，就可以使用固定密码进行无人值守访问；Android 被控端还需要屏幕录制授权和输入权限，并受手机厂商的后台限制影响；iOS 应用仅作控制端。

## 脱离 Google 云，转向你自己的云

从 Chrome Remote Desktop 更进一步，得到的是控制权：连接协调、访问策略和管理数据从 Google 的服务器转移到你运营的服务器上，再配合一个你可以审计的客户端。这份控制权也带来了打补丁、保障可用性和故障恢复的责任。

## 无需销售电话，直接上手试用

你可以完全按照自己的节奏评估 RustDesk，整个过程无需任何 Google 账号。Server OSS 可以免费运行，没有许可费，也不会到期；当你需要 Pro 团队功能时，可以联系 [sales@rustdesk.com](mailto:sales@rustdesk.com) 了解当前的评估条款，[rustdesk.com/pricing](https://rustdesk.com/pricing) 页面则列出了各套餐的价格。

你可以亲自到 [GitHub](https://github.com/rustdesk/rustdesk) 上查看源代码，把几台设备指向你自己搭建的服务器进行测试，在做出任何承诺之前，自行判断这些取舍是否符合你的需求。
