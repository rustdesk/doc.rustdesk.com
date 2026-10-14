---
publishDate: 2026-07-06T10:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-vs-splashtop'
draft: false
title: '自托管 Splashtop 替代方案：应优先评估的内容'
excerpt: '一份自托管 Splashtop 替代方案评估指南，涵盖许可授权、基础设施、可靠性证据、工作流测试和迁移风险。'
image: ~/assets/images/blog/rustdesk-vs-splashtop-og.webp
category: '对比'
tags: ['RustDesk', 'Splashtop', '对比']
author: 'RustDesk Team'
slug: 'rustdesk-vs-splashtop-zh-cn'
faq:
  - question: 'RustDesk 和 Splashtop 是否都可以自托管？'
    answer: '可以，但产品模式不同。RustDesk Server OSS（免费社区服务器）和商业版 Server Pro 都专为自托管而打造。Splashtop 除主流的厂商运维 SaaS 套餐外，还提供需要单独授权的专有 On-Prem 产品，其 Gateway 由客户自行运维。'
  - question: 'Splashtop On-Prem 需要哪些基础设施？'
    answer: 'Splashtop On-Prem 使用由客户自行运维的 Splashtop Gateway，部署在 DMZ 中或企业防火墙之后。企业需要自行规划服务器容量、网络、TLS、监控、备份、升级和可用性；Splashtop 发布了系统要求，涵盖 Gateway 的操作系统、硬件配置和端口。'
  - question: '我应该自托管，还是使用厂商运维的服务？'
    answer: '如果你的团队希望自行运行服务器端服务，并能承担更新、监控、备份和恢复，就选择自托管。RustDesk 把自托管作为默认模式，提供 AGPL 客户端、免费的 RustDesk Server OSS 和商业版 Server Pro 管理功能；Splashtop 则通过单独的 On-Prem 产品提供自托管。如果你希望由别人来运营服务，就选择厂商运维的 SaaS。'
  - question: 'IT 团队应该如何测试 Splashtop 的替代方案？'
    answer: '使用具有代表性的用户、终端、网络和支持工作流开展并行试点。针对连接可靠性、远程音频、显示器映射、移动端访问、管理功能和安全控制制定验收标准，在替代方案通过这些标准之前，保持现有系统运行，并准备有文档记录的回退方案。'
metadata:
  description: '评估自托管 Splashtop 替代方案：从许可授权、基础设施、工作流兼容性、安全控制，到试点设计和迁移风险，逐项梳理需要先确认的内容。'
  keywords: '自托管 Splashtop 替代方案, Splashtop 替代品, 从 Splashtop 迁移, RustDesk 对比 Splashtop, 适合 IT 团队的 Splashtop 替代方案'
---

当你的 IT 团队希望掌控服务器端服务、使用可审计的源代码，或采用与自身用户、设备和并发会话数相匹配的授权模式时，自托管 Splashtop 替代方案就值得评估。RustDesk 正是为此而打造的。不过评估仍然必要，因为迁移可能暴露出功能对比表遗漏的工作流缺口。

真正重要的区别在于**三种运维模式，而不是简单的“云端与自托管”之分**。Splashtop 既销售厂商运维的 SaaS 套餐，_也_ 提供需要单独授权的 **On-Prem** 产品；而 RustDesk 则通过 RustDesk Server OSS（免费社区服务器）和 Server Pro，将自托管作为核心部署模式。

## 简明结论

| 决策因素     | RustDesk                                                                                                                  | Splashtop SaaS                                          | Splashtop On-Prem                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 服务器运维   | 客户自行运维 Server OSS 或 Server Pro                                                                                     | 厂商运维                                                | 客户自行运维 Splashtop On-Prem Gateway                                       |
| 源代码模式   | 客户端和 Server OSS：AGPL；Server Pro：专有                                                                               | 专有                                                    | 专有                                                                         |
| 授权方式     | Server Pro 套餐按登录用户加受管设备授权；[Customized V2](https://rustdesk.com/pricing#custom2) 还授权固定数量的并发连接 | 因 Remote Access、Remote Support 或 Enterprise 套餐而异 | 单独授权，需通过销售洽谈；请以书面报价为准                                   |
| 并发会话     | 标准套餐无限制；Customized V2 设有明确额度                                                                                | 取决于套餐                                              | 取决于许可                                                                   |
| 治理管控     | Server Pro Web 控制台、按用户和设备组设定的访问控制以及共享通讯录；LDAP/OIDC 单点登录从 Basic 套餐起提供                 | 企业级管控功能因套餐而异                                | 用户/组权限、Active Directory 集成、IP 限制等功能因版本而异                  |
| 基础设施工作 | 由你的团队负责部署、TLS、网络暴露面、监控、备份、升级和可用性                                                             | 服务基础设施由厂商负责                                  | 由你的团队负责 Gateway 容量规划、网络部署位置、TLS、监控、备份、升级和可用性 |
| 最佳起点     | 免费的 Server OSS 用于基础评估；如需管理功能，可发邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com) 申请 Server Pro 评估 | SaaS 试用，适合希望使用托管服务的团队                   | 直接联系销售并进行范围明确的基础设施评估                                     |

在比较具体功能之前，先确定运维模式。如果你希望由厂商运维服务，就应该权衡自行运维 RustDesk 的投入与使用 Splashtop SaaS 之间的取舍。如果掌控基础设施是硬性要求，就应该将 RustDesk Server Pro 与 Splashtop On-Prem 进行比较——而不是与 SaaS 试用版比较，因为后者对 On-Prem 几乎没有参考价值。

## 比较时选对 Splashtop 产品

Splashtop 的标准 Remote Access 和 Remote Support 套餐均由厂商运维。其[定价页面](https://www.splashtop.com/pricing)在企业级产品中列出了 On-Prem 选项，[On-Prem 产品页面](https://www.splashtop.com/products/on-prem)则介绍了如何在 DMZ 中或企业防火墙之后部署 **Splashtop On-Prem Gateway**，并附有涵盖操作系统、硬件配置和端口的专属[系统要求](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements)。

由此可见，On-Prem 确实存在——但它是一款独立的专有产品，需要直接对接销售并由客户自行搭建基础设施，而不是每个 Splashtop 订阅背后的默认形态。RustDesk 则恰恰相反：Server OSS 和 Server Pro 默认就是自托管的。使用 Server Pro 时，ID/连接协调服务器、中继、控制台和存储的部署数据都运行在你掌控的基础设施上，而直连会话仍在终端之间直接传输。

## 开源与信任模型

RustDesk 的**客户端和 Server OSS 采用 AGPL 许可证**。安全团队或工程团队无需先购买商业许可，就可以阅读代码、构建客户端并运行 Server OSS；**Server Pro 是商业的专有自托管服务器软件**，在此基础上增加集中管理功能。Splashtop 的 SaaS 和 On-Prem 均为专有产品——On-Prem 改变的只是服务器的*运行位置*，而不是代码是否开放。这里需要区分两个独立的问题：

1. 服务器端服务是否需要运行在我们自己掌控的基础设施上？_（On-Prem 和 RustDesk 的答案都是肯定的。）_
2. 我们是否需要源代码可见性以及自行构建客户端的能力？_（只有 RustDesk 的答案是肯定的。）_

## 许可授权与成本

RustDesk 标准 Server Pro 套餐按**登录用户加受管设备**确定规模，并包含无限并发连接；只有 [Customized V2](https://rustdesk.com/pricing#custom2) 授权固定数量的并发连接。Splashtop 的定价取决于需求属于 Remote Access、Remote Support、Enterprise SaaS 还是 On-Prem，其中 Enterprise 和 On-Prem 均需通过销售洽谈。

请依据注明日期的书面条款，对双方相同的量化指标进行比较——技术人员或登录用户数、受管终端数、并发会话数、你实际需要的身份认证/审计/录制功能，以及服务器运维——并按续费价格而非首年价格来建模。较低的入门价格，或者其他客户的历史报价，都无法说明你所需部署的真实成本。RustDesk 当前的价格信息请见 [RustDesk 定价页面](https://rustdesk.com/pricing)。

## 可靠性报告：仅是信号，并不代表普遍情况

公开讨论帖的观点往往正反皆有。2025 年 [Splashtop 社区](https://www.reddit.com/r/Splashtop_Official/comments/1ltgest/constant_crashing_on_local_win10_computer/)的一个帖子记录了 Windows 客户端崩溃的问题；2026 年的一篇 [Atera 讨论帖](https://www.reddit.com/r/atera/comments/1qucbx3/is_splashtop_just_terrible_for_you_guys/)中既有用户抱怨，也有管理员反映多年来使用稳定——其中部分案例涉及通过 RMM 集成交付的 Splashtop，而非独立产品本身。应将这些内容视为需要在你自己的试点中，针对自己的终端组合、网络环境、RMM 打包方式和操作系统版本去复现的场景，而不是用来判断某个问题在整体安装基数中有多普遍的证据。

## 真正应该测试的内容

跳过泛泛而谈的功能对比清单，去测试那些在实践中真正决定 Splashtop 迁移成败的因素：

- **远程音频**与麦克风透传，包括重新连接后音频设备的表现。
- **多显示器**布局，以及显示器映射关系在多次会话之间是否能保持一致。
- **移动端与浏览器**访问——确认哪些平台可以作为*控制端*，哪些只能*被控制*，并将浏览器/WebSocket 会话与原生客户端分开验证。
- **RMM 打包**以及在生产环境所用操作系统版本上的无人值守部署。
- **直连与中继回退**，以及在高延迟和受限网络环境下的重连行为。
- **治理管控**——SSO 或目录集成、受控设备 2FA、审计日志、设备组，并确认仅凭设备 ID 无法绕过你的授权模型。Web 控制台、访问控制和 [LDAP/SSO](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/ldap/) 都是 Server Pro 功能，因此请在 Server Pro 评估环境中测试治理管控，而不是在 Server OSS 上测试。

将其作为一次**并行试点**，覆盖有代表性的技术人员、终端和网络环境；在替代方案通过所有必要工作流之前，保持现有系统持续运行；并在扩大推广范围之前，明确记录触发回退的条件。

## RustDesk 更具优势的场景

在以下情况下，RustDesk 是更有力的候选：

- **自托管应当是默认选项。** Server OSS 和 Server Pro 都运行在你选择的基础设施上；Splashtop 的对应方案是需要单独授权的 On-Prem 产品。
- **账单不应由并发数决定。** 标准 Server Pro 套餐按登录用户和受管设备授权，并包含无限并发连接。
- **目录登录很重要。** LDAP/Active Directory 和 OIDC 单点登录从 Basic 套餐起提供。
- **你希望免费试点并审计客户端。** Server OSS 没有许可费，也不会到期，客户端可以阅读源代码并自行构建。

有一点同样适用于 RustDesk 和 Splashtop On-Prem：服务器的部署、安全加固、监控、备份和更新都要由你的团队负责。

## 无需承诺全员部署即可评估 RustDesk

先用 Server OSS 验证基本连接，如果需要集中治理管控，再评估 Server Pro——评估时应使用与测试 Splashtop 相同的终端、网络环境、技术人员工作流和验收标准。如需了解当前 Server Pro 的评估条款，请发邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com)，或查看 [RustDesk 定价页面](https://rustdesk.com/pricing)。
