---
publishDate: 2026-06-29T16:16:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-for-enterprise'
draft: false
title: 'RustDesk 企业部署：自托管、可扩展、支持 AD/LDAP'
excerpt: '企业 IT 团队为何选择 RustDesk：自托管带来的数据掌控、AD/LDAP、基于设备组的访问控制，以及面向大型设备群的可预测定价。'
image: '~/assets/images/blog/rustdesk-for-enterprise-og.webp'
category: '指南'
tags: ['RustDesk', '企业', '自托管']
author: 'RustDesk Team'
slug: 'rustdesk-for-enterprise-zh-cn'
faq:
  - question: 'RustDesk 能否在企业设备群中大规模部署？'
    answer: '可以。RustDesk 提供 Windows MSI 安装包，支持通过 msiexec 静默、无人值守安装，可借助组策略（GPO）、Microsoft Intune、RMM 工具或其他打包工具部署；此外，自定义客户端生成器（Basic 及以上套餐）可以生成预先配置好您自己服务器的客户端。'
  - question: 'RustDesk 提供 REST API 吗？'
    answer: '提供。RustDesk Server Pro 提供 REST API（通过在 Web 控制台中创建的 API 令牌授权），还提供 Python CLI 管理工具。脚本可以批量完成设备的接入、枚举、分配和移除，并批量管理用户、分组、地址簿和审计日志，而不必只通过 Web 控制台操作。'
  - question: 'RustDesk 是否支持企业身份管理所需的 Active Directory 和 SSO？'
    answer: '支持。RustDesk Server Pro 从 Basic 套餐起包含 LDAP/Active Directory 和 OIDC SSO，技术人员直接通过您现有的身份源进行身份验证，无需另外维护一份用户名单。Individual 套餐不包含 LDAP/AD 和 OIDC SSO。'
  - question: '企业能否把 RustDesk 的数据留在自己的基础设施上？'
    answer: '可以，这正是 RustDesk Server Pro 的核心模式。ID/连接协调服务器、中继、Web 控制台和存储的设备数据，都由您自托管在自己运营的基础设施上。直连会话在端点之间传输，经中继的会话使用您自己的中继，因此在记录服务器部署位置的同时，也要记录端点的路由方式。'
  - question: '面向大型设备群，RustDesk 如何定价？'
    answer: 'RustDesk Server Pro 按登录用户和受管设备授权，标准套餐包含无限并发连接；只有 Customized V2 按设定数量授权并发连接。升级可以随时购买，升级时抵扣原许可证剩余已付价值，并将到期日延长至升级日起一年。请在 rustdesk.com/pricing 分别核算这两项数量。'
metadata:
  description: 'RustDesk 企业部署：自托管 ID 服务器、中继和控制台，LDAP/AD 与 OIDC SSO，基于设备组的访问控制，MSI 批量部署，标准套餐不限并发连接。'
  keywords: 'RustDesk 企业版, RustDesk 企业部署, AD 集成远程支持, RustDesk 企业架构'
---

## 将远程访问留在您掌控的基础设施上

RustDesk Server Pro 在您的安全边界之内运行 ID/连接协调服务器、中继、Web 控制台和设备数据，从 Basic 套餐起提供 LDAP/AD 和 OIDC SSO，标准套餐包含无限并发连接。这覆盖了企业评估时通常最看重的几点：基础设施掌控、身份管理、访问策略、可审计性、规模，以及授权费用的可预测性。

RustDesk 客户端和 RustDesk Server OSS（免费社区服务器）采用 AGPL 协议；Server Pro 是商业的专有自托管服务器软件。

## 核心区别：自己托管，才能自己掌控

RustDesk Server Pro 是**自托管**的：服务器由您的团队运营，而不是由厂商运营（[团队为何选择自托管](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn)）。正是这一架构事实带来了下文的大部分优势，也让 **[采用 AGPL 协议的客户端](https://github.com/rustdesk/rustdesk)** 不只是一句宣传语：必须为生产终端上每一个代理程序给出理由的安全团队，可以阅读源代码并自行构建客户端，于是“我们能准确审计运行的是什么”就成了一项真正能勾选的采购要求。

## 需要先回答的企业架构问题

在比较功能矩阵之前，先把部署设计明确下来：

| 决策事项 | 设计必须写明的内容                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------- |
| 身份     | OIDC 或 LDAP 身份源、MFA 策略、紧急访问（break-glass）机制，以及账户生命周期                             |
| 授权     | 设备组归属、技术人员角色、外包人员的权限边界，以及批准模式                                               |
| 网络     | ID 服务器和中继的部署位置、直连与中继策略、对外暴露的端口，以及区域路由                                  |
| 可用性   | 容量假设、监控、备份、恢复目标，以及多中继设计                                                           |
| 终端管理 | 支持的操作系统版本、客户端打包方式、配置强制执行，以及更新 SLA                                           |
| 安全运营 | 日志、保留期限、告警、漏洞响应，以及事件处置的责任归属                                                   |
| 授权许可 | 所需的登录用户数、受管设备数，以及任何 [Customized V2](https://rustdesk.com/pricing#custom2) 并发额度 |

RustDesk 提供远程访问组件和企业级控制能力；它们能否满足组织在可用性、合规和运营方面的要求，取决于您的架构设计。

## 数据掌控与合规

自托管让您可以自主选择连接协调服务器、中继、控制台和存储的设备数据放在哪里、由谁运营。直连会话仍在端点之间传输，因此仅凭服务器位置并不能保证流量留在境内，也不能保证符合 GDPR。请完整记录[数据流和合规控制措施](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn)。

Server Pro 会为连接、文件传输、告警和控制台操作记录[审计日志](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/audit-logs/)。把 **设置 > 其他 > 日志保留（天）** 设为正数，即可自动删除更早的日志（清理任务每小时运行一次）；设为 `0` 则无限期保留。您可以在控制台中或通过 API 停用或删除用户和设备，以处理删除请求。需要规划的出站流程包括 Pro 许可证验证、自定义客户端构建服务、客户端更新，以及您接入的任何外部身份提供商。

这也是成本驱动型迁移背后一个不太显眼的原因。许多企业团队不满的不只是价格，而是在为自己并未充分使用的云服务和功能捆绑付费。自托管把这一点倒转过来：您按需配置资源，不必把别人的数据中心当作强制性的中间环节来租用。

## 规模与并发连接授权

企业部署会在两个维度上碰壁：技术上限和价格上限。RustDesk 两方面都有应对。

技术层面，根据 RustDesk 内部遥测数据，2026 年 7 月 7 日，RustDesk 公共服务器在一台 12 核、32 GB 内存的主机上记录到超过 200 万个在线端点（内部遥测数据，并非经审计的基准测试，也不是 Server Pro 的容量保证）。对于 Server Pro，[20 万台设备规划指南](/zh-cn/blog/rustdesk-scale-50000-200000-devices-zh-cn)介绍了需要在试点中验证的数据库、控制台和中继负载。

RustDesk **按登录用户和受管设备**收费。标准套餐包含无限并发连接；只有 [Customized V2](https://rustdesk.com/pricing#custom2) 按设定数量授权。您可以随时[在订阅期内升级](/zh-cn/blog/upgrade-rustdesk-license-mid-subscription-zh-cn)：升级时抵扣原许可证剩余已付价值，并将到期日延长至升级日起一年。

## 管理员期待的 AD/LDAP 与访问控制

企业远程访问必须回答“谁能访问哪些机器，我们能否证明”。RustDesk 付费套餐**从 Basic 套餐起包含 LDAP/SSO（OIDC）**，您可以基于已在运行的身份源来配置技术人员的访问权限，无需维护一份平行的用户名单。

[访问控制](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)通过用户分配、设备组和跨组规则决定谁能访问哪些设备。每台设备只属于一个设备组，用户组和设备组的权限可以叠加。共享地址簿为技术人员整理设备条目，但它不是访问边界。[控制角色](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/control-role/)限制技术人员在会话中能做什么。自定义客户端生成器同样从 Basic 套餐起提供；[查看套餐对比](https://rustdesk.com/pricing)。

## 批量部署与自动化

靠人工把远程访问逐台部署到成千上万台终端上并不现实，因此 RustDesk 支持标准的企业部署路径。在 Windows 上，RustDesk 提供 **MSI 安装包**，支持通过 `msiexec /qn` 静默、无人值守安装，您可以通过**组策略（GPO）、Microsoft Intune、RMM 工具或任意打包工具**推送，并用命令行参数指定安装位置、快捷方式和其他选项。再搭配[自定义客户端生成器](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/#1-自定义客户端生成器仅限-pro-版本基础计划或自定义计划)，部署的客户端开箱即已预先配置好您自己的服务器和设置，无需逐台设置。

设备群运维请参考 [Windows MSI 参考文档](https://rustdesk.com/docs/zh-cn/client/windows/msi/)、[客户端部署指南](https://rustdesk.com/docs/zh-cn/self-host/client-deployment/)和 [Server Pro API/CLI 工具](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/console/#python-cli-管理工具)。这些管理工具涵盖用户、设备、分组、地址簿、策略和审计。请按任务限定 API 令牌的权限范围，并在试点中测试接入、停用和删除流程。

## 上线前的验收检查

上线之前，请验证预期的用户与设备访问矩阵、身份恢复、无人值守访问、客户端更新、中继峰值容量、日志保留和备份恢复。正是这些验收检查，把自托管带来的基础设施掌控变成一套可以运营的企业部署。

## 企业级掌控，由您做主

在企业规模下，理由很简单：ID/中继服务、控制台和存储的数据都在您的安全边界之内，与您的身份系统和访问策略对接，核心系统不由任何厂商运行。这正是采购和安全团队所要求的态势，而 RustDesk Server Pro 就是为此而打造的。

## 决定之前，先行试用

您可以 **[无需联系销售](https://www.youtube.com/@rustdesk)** 就开始评估。有两条路径：

- **用 Server OSS 验证架构。** 它免费，没有许可费，也没有到期限制，运行在您自己的网络中——这是向安全团队证明自托管模式可行的低风险方式。
- **如需 Pro 功能——身份管理、访问控制、客户端生成——** 请先在 [rustdesk.com/pricing](https://rustdesk.com/pricing) 查看当前套餐，然后发送邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com)，了解适用于贵组织的评估条款。

无论选哪条路径，都请先在自己的环境中搭建服务器进行验证，再做决定。
