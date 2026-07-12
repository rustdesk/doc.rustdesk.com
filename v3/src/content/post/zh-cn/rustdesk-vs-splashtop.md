---
publishDate: 2026-07-06T10:09:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-vs-splashtop'
draft: false
title: '自托管 Splashtop 替代方案：应优先评估的内容'
excerpt: '一份自托管 Splashtop 替代方案评估指南，涵盖许可授权、基础设施、可靠性证据、工作流测试和迁移风险。'
image: ~/assets/images/blog/rustdesk-vs-splashtop-og.png
category: '对比'
tags: ['RustDesk', 'Splashtop', '对比']
author: 'RustDesk Team'
slug: "rustdesk-vs-splashtop-zh-cn"
faq:
  - question: 'RustDesk 和 Splashtop 是否都可以自托管？'
    answer: '可以，但产品模式不同。RustDesk 提供免费开源服务器，以及围绕自托管构建的商业版 Server Pro 套餐；Splashtop 除主流 SaaS 套餐外，还提供需要单独授权的专有 On-Prem 产品。'
  - question: 'Splashtop On-Prem 需要哪些基础设施？'
    answer: 'Splashtop On-Prem 使用由客户自行运维的 Splashtop Gateway。企业需要根据自身部署需求规划服务器容量、网络、TLS、监控、备份、升级和可用性。'
  - question: '我应该自托管，还是使用厂商运维的服务？'
    answer: '如果你希望掌控服务器端服务、使用开源软件，或按自身用户和设备数量进行授权，就应该选择自托管；如果你明确希望由他人来运维服务，厂商运维的 SaaS 则是替代方案。在做决定之前，请先测试所需的工作流程，并比较当前的书面条款。'
  - question: 'IT 团队应该如何测试 Splashtop 的替代方案？'
    answer: '使用具有代表性的用户、终端设备、网络和支持工作流，开展并行试点测试。针对连接可靠性、远程音频、显示器映射、移动端访问、管理功能和安全控制制定验收标准，并在替代方案通过这些标准之前，保留有文档记录的回退方案。'
metadata:
  description: '从许可授权、基础设施、工作流兼容性、安全控制、试点设计和迁移风险等方面，评估自托管 Splashtop 替代方案。'
  keywords: '自托管 Splashtop 替代方案, Splashtop 替代品, 从 Splashtop 迁移, RustDesk 对比 Splashtop, 适合 IT 团队的 Splashtop 替代方案'
---

当你的 IT 团队需要掌控服务器端服务、使用开源软件，或需要一种与自身用户、设备和并发会话数相匹配的授权模式时，自托管 Splashtop 替代方案就值得评估。但这并不意味着切换一定是正确之举：迁移会将基础设施相关工作转移到你的团队身上，也可能暴露出功能对比表所无法覆盖的工作流缺口。

真正重要的区别在于**三种运维模式，而不是简单的“云端与自托管”之分**。Splashtop 既销售厂商运维的 SaaS 套餐，_也_ 提供需要单独授权的 **On-Prem** 产品；而 RustDesk 则通过其免费的社区服务器和 Server Pro，将自托管作为核心部署模式。

## 简明结论

| 决策因素     | RustDesk                                                                                                                 | Splashtop SaaS                                          | Splashtop On-Prem                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 服务器运维   | 客户自行运维社区服务器或 Server Pro                                                                                      | 厂商运维                                                | 客户自行运维 Splashtop On-Prem Gateway                                       |
| 源代码模式   | 核心客户端和社区服务器基于 AGPL 开源                                                                                     | 闭源专有                                                | 闭源专有                                                                     |
| 授权方式     | 标准版 Server Pro 套餐按登录用户数加受管设备数计费；[Customized V2](https://rustdesk.com/pricing#custom2) 则按并发数计费 | 因 Remote Access、Remote Support 或 Enterprise 套餐而异 | 单独授权，需通过销售洽谈；请以书面报价为准                                   |
| 并发会话数   | 标准套餐无限制；Customized V2 设有明确额度                                                                               | 取决于套餐                                              | 取决于许可                                                                   |
| 治理管控     | Server Pro 功能因套餐而异；请比较 SSO、2FA、审计、访问控制、通讯录和设备管理等功能                                       | 企业级管控功能因套餐而异                                | 用户/组权限、Active Directory 集成、IP 限制等功能因版本而异                  |
| 基础设施工作 | 由你的团队负责部署、TLS、网络暴露面、监控、备份、升级和可用性                                                            | 服务基础设施由厂商负责                                  | 由你的团队负责 Gateway 容量规划、网络部署位置、TLS、监控、备份、升级和可用性 |
| 最佳起点     | 免费社区服务器可用于基础评估；如需管理功能，可发送邮件至 sales@rustdesk.com 进行 Server Pro 评估                         | SaaS 试用，适合希望使用托管服务的团队                   | 直接联系销售并进行范围明确的基础设施评估                                     |

在比较具体功能之前，先确定运维模式。如果你希望由厂商运维服务，就应该权衡自行运维 RustDesk 的投入与使用 Splashtop SaaS 之间的取舍。如果掌控基础设施是硬性要求，就应该将 RustDesk Server Pro 与 Splashtop On-Prem 进行比较——而不是与 SaaS 试用版比较，因为后者对 On-Prem 几乎没有参考价值。

## 比较时选对 Splashtop 产品

Splashtop 的标准 Remote Access 和 Remote Support 套餐均由厂商运维。其[定价页面](https://www.splashtop.com/pricing)在企业级产品中列出了 On-Prem 选项，[On-Prem 产品页面](https://www.splashtop.com/products/on-prem)则说明了如何在 DMZ 或企业防火墙内部部署 **Splashtop On-Prem Gateway**，并附有针对操作系统、硬件配置和端口的专属[系统要求](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements)。

由此可见，On-Prem 确实存在——但它是一款独立的专有产品，需要直接对接销售并由客户自行搭建基础设施，而并非每个 Splashtop 订阅背后的默认形态。RustDesk 则恰恰相反：社区服务器和 Server Pro 默认就是自托管的。在 Server Pro 中，ID/rendezvous 服务器、中继（relay）、控制台以及已存储的部署数据都运行在你所掌控的基础设施上，而直连会话仍然在终端设备之间直接传输。

## 开源与信任模型

RustDesk 的核心客户端和社区服务器均采用 **AGPL** 协议开源。安全团队或工程团队无需先购买商业许可，就可以阅读源代码、自行构建客户端并运行免费服务器；Server Pro 则是在此基础上增加了专有的管理功能。Splashtop 的 SaaS 和 On-Prem 均为闭源专有产品——On-Prem 改变的只是服务器的*运行位置*，而不是代码是否开放。这里需要区分两个独立的问题：

1. 服务器端服务是否需要运行在我们自己掌控的基础设施上？_（On-Prem 和 RustDesk 对此的答案都是肯定的。）_
2. 我们是否需要源代码可见性以及自行构建客户端的能力？_（只有 RustDesk 对此的答案是肯定的。）_

## 许可授权与成本

RustDesk 标准版 Server Pro 套餐按**登录用户数加受管设备数**计费，并包含无限并发连接；[Customized V2](https://rustdesk.com/pricing#custom2) 则改为按并发数计费。Splashtop 的定价则取决于需求属于 Remote Access、Remote Support、Enterprise SaaS 还是 On-Prem，其中 Enterprise 和 On-Prem 均需通过销售渠道洽谈。

请依据注明日期的书面条款，对双方相同的量化指标进行比较——包括技术人员或登录用户数、受管终端数、并发会话数、你实际需要的身份认证/审计/录制功能，以及服务器运维——并按续费价格而非首年价格来建模。较低的入门价格，或者其他客户的历史报价，都无法反映你所需部署方案的真实成本。RustDesk 当前的价格信息请见 [RustDesk 定价页面](https://rustdesk.com/pricing)。

## 可靠性报告：仅是信号，并不代表普遍情况

公开讨论帖的观点往往正反皆有。2025 年 [Splashtop 社区](https://www.reddit.com/r/Splashtop_Official/comments/1ltgest/constant_crashing_on_local_win10_computer/)的一个帖子记录了 Windows 客户端崩溃的问题；2026 年的一篇 [Atera 讨论帖](https://www.reddit.com/r/atera/comments/1qucbx3/is_splashtop_just_terrible_for_you_guys/)中既有用户抱怨，也有管理员反映多年来使用稳定——其中部分案例涉及通过 RMM 集成交付的 Splashtop，而非独立产品本身。应将这些内容视为需要在你自己的试点中，针对自己的终端组合、网络环境、RMM 打包方式和操作系统版本去复现验证的场景，而不是用来判断某个问题在整体安装基数中有多普遍的证据。

## 真正应该测试的内容

跳过泛泛而谈的功能对比清单，去测试那些真正决定 Splashtop 迁移成败的因素：

- **远程音频**与麦克风透传，包括重新连接后音频设备的表现。
- **多显示器**布局，以及显示器映射关系在多次会话之间是否能保持一致。
- **移动端与浏览器**访问——确认哪些平台可以作为*控制端*，哪些只能*被控制*，并将浏览器/WebSocket 会话与原生客户端分开验证。
- **RMM 打包**以及在生产环境所用操作系统版本上的无人值守部署。
- **直连与中继回退**，以及在高延迟和受限网络环境下的重连行为。
- **治理管控**——包括 SSO 或目录集成、受控设备 2FA、审计日志、设备分组，以及确认仅凭设备 ID 无法绕过你的授权模型。免费社区服务器并未包含所有 Server Pro 的治理管控功能，因此请以当前的 Server Pro 功能矩阵和 [LDAP/SSO 文档](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/ldap/)为准进行核实，而不要仅凭免费服务器的表现来推断。

将其作为一次**并行试点**，覆盖有代表性的技术人员、终端设备和网络环境；在替代方案通过所有必要工作流验证之前，保持现有系统持续运行；并在扩大推广范围之前，明确记录触发回退的条件。

## RustDesk 更具优势的场景

如果你希望将自托管作为常规部署模式、使用可审计并可自行构建的开源软件、拥有免费的社区服务器路径，或者需要按登录用户数和受管设备数计费的授权模式，那么 RustDesk 就值得评估。有一点适用于 RustDesk 和 Splashtop On-Prem 两者：服务器的部署、安全加固、监控、备份和更新都需要由你的团队完成。只有在你已经做好运维准备的前提下，掌控基础设施才是值得的。

## 无需承诺全员部署即可评估 RustDesk

先使用免费社区服务器验证基本连接功能，如果需要集中式治理管控，再评估 Server Pro——评估时应使用与测试 Splashtop 相同的终端设备、网络环境、技术人员工作流和验收标准。如需了解当前 Server Pro 的评估条款，请发送邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com)，或查看 [RustDesk 定价页面](https://rustdesk.com/pricing)。
