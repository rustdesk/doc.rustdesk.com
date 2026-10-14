---
publishDate: 2026-07-07T18:21:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: '为什么要自托管远程桌面软件'
excerpt: '离开 TeamViewer 和 AnyDesk 的团队为何选择自托管远程桌面：服务器运行在哪里、由谁运营、为哪些东西付费，都由你决定。'
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: '指南'
tags: ['RustDesk', '自托管']
author: 'RustDesk Team'
slug: 'why-self-host-remote-desktop-software-zh-cn'
faq:
  - question: '自托管远程桌面软件是什么意思？'
    answer: '自托管远程桌面软件，是指在你自己掌控的基础设施上，而不是在厂商的云端，运行连接服务器（RustDesk 的 ID/连接协调服务）和作为后备的中继。使用 RustDesk Server Pro 时，Web 控制台和设备数据也放在那里；直连会话仍在端点之间直接传输。'
  - question: '运行自托管 RustDesk 服务器实际需要做什么？'
    answer: '一台小型 Linux 主机、开放少量端口，再加上日常维护。准备一台虚拟机，为原生 RustDesk 客户端开放 TCP 21115-21117 和 UDP 21116，把 Server Pro 控制台和 API 放在 443 端口的 HTTPS 之后，并安排经过恢复测试的备份。此后的日常工作是打补丁、监控、管理中继容量和续期证书。'
  - question: '自托管对数据驻留和 GDPR 合规有帮助吗？'
    answer: '有帮助。自托管 RustDesk 让你可以决定 ID/连接协调服务、中继、控制台和设备数据运行在哪里、由谁运营，这正是数据驻留规定所关注的控制权。它是一种部署层面的控制手段，而不是合规认证：直连会话仍在端点之间传输，因此能否符合 GDPR，还取决于路由、数据保留和你整体的合规体系。'
  - question: '自托管适合所有团队吗？'
    answer: '不是，但它适合大多数已经在运行自有基础设施、希望掌控远程访问服务器的团队。RustDesk Server OSS（免费社区服务器）没有许可费，RustDesk Server Pro 增加了 Web 控制台、访问控制和 SSO。完全不想运维任何服务器的团队，更适合使用托管服务。'

metadata:
  description: '为什么要自托管远程桌面：服务器运行在哪里、由谁运营，都由你决定。本文以 RustDesk Server OSS 和 Server Pro 为具体示例展开说明。'
  keywords: '为什么要自托管远程桌面, 自托管远程桌面的好处, 本地部署远程访问, 无需厂商云端的远程桌面'
---

大多数远程桌面工具只有一种卖法：云端订阅，由厂商的服务器协调会话，并在无法直连时中继流量。自托管把这些角色搬到你掌控的基础设施上：客户端通过你的 ID/连接协调服务器协调连接，能直连时直连，否则回退到你的中继。本文以 RustDesk Server OSS（免费社区服务器）和 Server Pro 为具体示例，讲清自托管的理由。

## “自托管远程桌面”究竟意味着什么

纯云端的便利是有代价的：你的设备列表、连接元数据，有时还有会话流量，都要经过第三方——依赖对方的可用性，受制于对方的定价，也取决于对方的安全水平。

自托管把这一切反转过来。使用 RustDesk 时，ID 服务和中继服务由你的团队运行，Server Pro 还会把 Web 控制台和存储的设备数据放在你的基础设施上。直连会话在端点之间传输；经中继的会话使用你的中继。RustDesk 的**客户端和 Server OSS 采用 [AGPL 协议](https://github.com/rustdesk/rustdesk)**；**Server Pro 是商业的专有自托管服务器软件**。

## 纯云端与自托管一览对比

|                       | 典型的纯云端工具                   | 自托管（RustDesk Server Pro）                                                                              |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 会话在哪里协调        | 厂商云端                           | 你的本地服务器或 VPS                                                                                       |
| 数据驻留              | 由厂商掌控                         | 服务端服务运行在你掌控的基础设施上；[端点之间的路由仍有影响](/zh-cn/blog/remote-desktop-data-sovereignty-gdpr-zh-cn) |
| 授权的并发连接/通道   | 额度取决于套餐                     | 标准套餐不限；Customized V2 有授权额度                                                                     |
| 定价模式              | 因产品而异的用户、端点和连接额度   | [登录用户加受管设备](https://rustdesk.com/pricing)；Customized V2 还按并发授权                             |
| 源代码                | 因产品而异，通常为专有             | 可审计的 AGPL 客户端                                                                                       |
| 故障依赖              | 厂商的可用性                       | 你自己的运维                                                                                               |
| 谁来运行服务器        | 厂商                               | 你自己                                                                                                     |

自托管不会让你损失功能。面向 [MSP](/zh-cn/blog/rustdesk-for-msps-zh-cn) 和内部 IT，Server Pro 提供自托管的 Web 控制台，支持按用户和设备组设置的[访问控制](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)，并从 Basic 套餐起提供自定义客户端生成器和 [LDAP/OIDC SSO](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/ldap/)。它也不会让你损失规模：根据 RustDesk 内部遥测数据，2026 年 7 月 7 日，RustDesk 公共服务器在一台 12 核、32 GB 内存的主机上记录到超过 200 万个在线端点；[大规模设备群规划指南](/zh-cn/blog/rustdesk-scale-50000-200000-devices-zh-cn)则说明了 Server Pro 需要验证哪些方面。

## 运行服务器实际需要做什么

掌控权伴随着运维工作：一次性的初始设置，然后是日常维护。具体清单如下：

- **准备一台主机。** RustDesk 的硬件要求不高，一台普通的 Linux 虚拟机——本地部署或便宜的 VPS 都行——就能运行 ID 服务和中继服务。请根据设备数量，以及最终有多少流量走中继而不是点对点，来确定主机规格。
- **只开放你用到的端口。** 原生 RustDesk 客户端需要 **TCP 21115-21117 和 UDP 21116**，用于 NAT 测试、连接服务、注册、心跳和中继。不要暴露整个 21114-21119 端口段。TCP 21118-21119 是 WebSocket 后端，TCP 21114 是 Pro 的 HTTP API/控制台后端。当 HTTPS/WSS 反向代理位于 Pro API 和 WebSocket 服务之前时，这部分流量只需对公网开放 TCP 443，21114 和 21118-21119 保持仅内网可达。如果原生客户端也要连接，公网 443 并不能替代原生客户端所需的核心端口。参见[官方端口说明](https://rustdesk.com/docs/zh-cn/self-host/)。
- **配置 TLS。** 在反向代理上终结 HTTPS 和 WSS，让凭据、API 调用和浏览器客户端流量都走公网 TCP 443，而不是暴露明文 HTTP 的控制台/API 或原始 WebSocket 后端。
- **做好备份。** 服务器上保存着你的设备清单、用户账户、地址簿和访问规则。请安排定期备份——并实际测试能否从备份恢复。
- **保持补丁节奏。** 新的服务器版本会持续发布，底层操作系统也由你负责。请确定由谁更新、多久更新一次。
- **做好监控。** 协调服务现在归你所有，因此可用性、磁盘和中继吞吐量都由你监控，告警和恢复也由你负责。

对于已经在运行 Linux 服务器的团队，这些都不稀奇。为更新、备份、证书续期和恢复测试指定负责人和时间表，服务器就会像其他常规基础设施一样运转。

## 如何评估自托管

- **从 Server OSS 开始。** 今天下午就能部署，可以审查代码，想用多久就用多久：没有许可费，也没有到期限制，只需承担自己的主机和带宽费用。
- **需要 Pro 功能集？** 当前套餐价格见 [rustdesk.com/pricing](https://rustdesk.com/pricing)，[sales@rustdesk.com](mailto:sales@rustdesk.com) 可以告诉你目前有哪些评估选项。
- **想先看再装？** [RustDesk YouTube 频道](https://www.youtube.com/@rustdesk)上有完整的视频演示。

如果是价格变动、闭源代码或厂商云端促使你开始寻找替代方案，那么自托管是结构性的解决办法，而不是一次折扣：服务器运行在哪里、由谁运营，都由你决定。对于已经在运行基础设施的团队，这是顺理成章的下一步，而不是一次冒险；先在 Server OSS 上试点，按会话峰值确定中继规模，工作流程验证可行后再迁移整个设备群。
