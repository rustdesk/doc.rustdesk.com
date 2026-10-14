---
publishDate: 2026-07-05T19:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-for-msps'
draft: false
title: 'RustDesk 助力 MSP：一套自托管、可定制品牌的工具'
excerpt: '比较把 TeamViewer、AnyDesk 和 ScreenConnect 整合到一套自托管、可定制品牌的远程支持平台上的做法。'
image: '~/assets/images/blog/rustdesk-for-msps-og.webp'
category: '指南'
tags: ['RustDesk', 'MSP', '自托管']
author: 'RustDesk Team'
slug: 'rustdesk-for-msps-zh-cn'
faq:
  - question: 'RustDesk 能整合 MSP 的多款远程支持工具吗？'
    answer: '在远程控制和技术支持方面可以。RustDesk Server Pro 为 MSP 提供一个自托管控制台、从 Basic 套餐起的品牌客户端、按用户和设备组设置的访问控制，标准套餐还包含无限并发连接，取代各自独立的控制台和合同。请先试点你依赖的 PSA/RMM 集成。'
  - question: 'RustDesk 面向 MSP 如何授权？'
    answer: '按登录用户（你的技术人员）和受管设备（你支持的机器）付费，标准套餐包含无限并发连接，多名技术人员可以同时开展会话，无需购买通道。只有 Customized V2 按设定数量授权并发连接；详见 rustdesk.com/pricing。'
  - question: '可以为 RustDesk 客户端做白标或加上自己的品牌吗？'
    answer: '可以。RustDesk Server Pro 包含自定义客户端生成器，从 Basic 套餐起提供，可以生成带有你自己的名称、徽标、图标和服务器配置的客户端。你的客户安装的是带有你的品牌、连接你的服务器的工具，而不是厂商品牌的下载包。'
  - question: 'RustDesk 是自托管的吗？服务器由谁运行？'
    answer: '是的。RustDesk Server Pro 是自托管的：MSP 在自己的本地主机或 VPS 上运行 ID/连接协调服务器、中继、Web 控制台和存储的管理数据，并负责打补丁、监控、备份和证书。RustDesk Server OSS（免费社区服务器）提供 ID/连接协调和中继服务，但不含 Pro 的管理功能。'
  - question: 'MSP 应该如何开始评估 RustDesk？'
    answer: '先在测试虚拟机上部署 RustDesk Server OSS（免费社区服务器）：它没有许可费，也没有到期限制，技术人员可以在付费之前验证一套有代表性的支持流程。当团队需要 Web 控制台、品牌客户端或访问控制时再加上 Server Pro，并发邮件至 sales@rustdesk.com 了解当前的评估条款。'

metadata:
  description: 'RustDesk 助力 MSP：自托管的 ScreenConnect/TeamViewer 替代方案，提供品牌客户端、访问控制，标准套餐不限并发连接。'
  keywords: 'RustDesk 面向 MSP, MSP 自托管远程支持, MSP 白标远程桌面, MSP 远程支持工具, 按技术人员授权的远程桌面'
---

大多数 MSP 并不是在找又一款远程支持工具，而是想要 _更少_ 的工具：这里一个云端远程支持席位，那里一个按技术人员计费的工具，再加一个应付零散任务的独立快速支持工具，每一个都有自己的控制台、合同和续费。RustDesk 用一套自托管、可定制品牌的平台取代这一堆工具；在停用任何工具之前，请先试点技术人员依赖的 PSA/RMM 集成和终端工作流程。

本指南介绍 RustDesk 面向 MSP 工作流程的开放客户端、自托管服务器选项、商业版 Pro 管理功能、品牌定制和授权方式。

## 自己运营远程访问服务

RustDesk Server Pro 是**自托管**的：ID/连接协调服务器、中继、控制台和存储的管理数据都由你的团队运营。RustDesk 的客户端和 RustDesk Server OSS（免费社区服务器）采用 **[AGPL 协议](https://github.com/rustdesk/rustdesk)**；Server Pro 是商业的专有自托管服务器软件。当客户的安全审查追问“这个代理程序在我们的终端上到底在做什么？”时，你可以直接指向客户端源代码，而不是一个闭源的二进制文件；服务端服务运行在哪里，也由你决定。

下面是一套自托管平台与 MSP 想要整合掉的那堆工具的对比：

|                     | 各自独立的云端远程支持工具 | RustDesk Server Pro                                                                  |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| 需要管理的控制台    | 每款工具一个               | 一个自托管控制台                                                                     |
| 客户端品牌定制      | 取决于产品和套餐           | 从 Basic 套餐起提供自定义品牌客户端生成器                                            |
| 托管方式            | 厂商云端                   | 自托管（本地部署或你的 VPS）                                                         |
| 源代码              | 因产品而异，通常为专有     | 可审计的 AGPL 客户端                                                                 |
| 授权的并发连接/通道 | 额度取决于套餐             | 标准套餐不限；[Customized V2](https://rustdesk.com/pricing#custom2) 有授权额度       |
| 授权依据            | 按坐席/按通道              | [按登录用户 + 按受管设备](https://rustdesk.com/pricing)                              |

具体的套餐等级和当前价格，请参见 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

## 并发连接因套餐而异

你为已授权的登录用户（通常是技术人员）和受管设备付费。标准套餐包含无限并发连接，所以在一次故障中，三名工程师同时处理三个不同的客户现场，也只是平常的一天，而不是一次要计量的事件。如果你过去一直在限量分配同时进行的会话，或者让团队围着通道数安排工作，在标准套餐上这个限制就不存在了。

只有 [Customized V2](https://rustdesk.com/pricing#custom2) 按设定数量授权并发连接。根据 RustDesk 的[并发连接定义](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)，一个并发连接就是一台处于活动状态的控制端设备，即一个“通道”：一台技术员电脑打开五个会话标签页，只占用一个通道；三台技术员电脑同时活动，则占用三个通道。Customized V2 还只把分配给用户或设备组的设备算作受管设备，因此一次性支持的机器既不计数，也不会被停用；参见[什么算作受管设备](/zh-cn/blog/what-counts-as-a-managed-device-zh-cn)。

## 打上你的品牌，再加上访问控制

Server Pro 为 MSP 提供自托管的 Web 控制台和三项不同的控制。[访问控制](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)通过用户和设备组规则决定哪些技术人员能访问哪些设备；每台设备只属于一个设备组，用户组和设备组的权限可以叠加。共享地址簿为技术人员整理条目，但它不是访问边界。[控制角色](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/control-role/)限制技术人员在会话中能做什么。自定义客户端生成器和 LDAP/OIDC SSO 从 Basic 套餐起提供。

品牌客户端之所以重要，是因为你的客户安装的是带有你的名称、徽标和服务器设置的工具，而不是厂商的工具。访问控制则让你把每位技术人员的权限限定在其负责的客户现场对应的设备组内。

## 掌控服务端数据的位置

自托管让 MSP 可以决定 ID/连接协调服务器、中继、控制台和存储的设备数据运行在哪里、由谁运营，对于受监管行业的客户，这往往是决定性因素。它是一种部署层面的控制手段，而不是合规认证：直连会话仍在端点之间传输，因此还需要梳理端点所在位置和路由方式，详见[远程桌面数据主权与 GDPR](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn)。

## 按你自己的方式实测

今天就可以开始评估 RustDesk，无需预约任何会议：

- **在闲置的虚拟机上部署 Server OSS。** 它没有许可费，也没有到期限制，你可以在花钱之前先验证真实的客户工作流程。
- **当需要品牌定制和访问控制时，** 在 [rustdesk.com/pricing](https://rustdesk.com/pricing) 比较各套餐等级，并发邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com) 询问当前适用的评估条款。
- **没时间搭测试环境？** 先看看 RustDesk 的实际演示，或浏览 [RustDesk YouTube 频道](https://www.youtube.com/@rustdesk)上的操作讲解。

随着客户规模扩大，你可以 **[随时升级](/zh-cn/blog/upgrade-rustdesk-license-mid-subscription-zh-cn)**：升级时抵扣原许可证剩余已付价值，并将到期日延长至升级日起一年。从 [rustdesk.com/pricing](https://rustdesk.com/pricing) 开始吧。
