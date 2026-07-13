---
publishDate: 2026-06-28T16:50:00Z
lang: 'zh-cn'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'RustDesk Server Pro 能否离线或在气隙网络中运行？'
excerpt: '不能——自托管的 RustDesk Server Pro 需要持续访问 rustdesk.com 的出站连接以验证许可证，因此不支持完全气隙隔离（air-gapped）部署。'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: '部署'
tags: ['RustDesk', '部署', '自托管']
author: RustDesk Team
slug: 'rustdesk-server-pro-offline-air-gapped-zh-cn'
faq:
  - question: 'RustDesk Server Pro 能否离线或在气隙网络中运行？'
    answer: '不可以。已获授权的 Server Pro 在运行期间必须保持与 rustdesk.com 的出站连接以验证许可证，因此不支持完全气隙隔离、从不回连的部署方式。不过，你仍然可以将出站流量严格限制，并通过代理进行路由。'
  - question: 'RustDesk Server Pro 需要永久性的互联网连接吗？'
    answer: '它需要持续的出站访问以连接 rustdesk.com 完成许可证验证，但并不需要真正意义上不间断的连接。服务器大约每天通过 443 端口签到一次；如果某次检查失败，会持续重试，直到成功或大约 7 天过去为止——因此短暂的中断是可以容忍的，但如果服务器与 rustdesk.com 断开连接的时间超过这一宽限期，许可证验证就会停止通过。远程会话本身，则由你自托管的中继服务器和 ID（rendezvous）服务器负责协调转发。'
  - question: '隔离环境中的 RustDesk Server Pro 部署，需要开放哪些出站访问？'
    answer: '请允许服务器向 rustdesk.com 发起出站 HTTPS 连接以完成许可证验证（如果你还使用自定义客户端生成功能，也需要保留这条出站访问）。系统支持通过代理访问，因此网络的其余部分仍可保持锁定状态。具体的域名和端口，请以 RustDesk 文档中的说明为准。'
  - question: '是否有完全气隙隔离的 RustDesk 授权方案？'
    answer: '标准的授权产品并非为“从不回连”的气隙隔离环境而设计。如果你有严格的气隙隔离需求，请在正式投入使用前，与 RustDesk 确认你的具体场景是否可行。'
metadata:
  description: '自托管的 RustDesk Server Pro 能否在气隙环境中运行？不能——Pro 许可证需要持续访问 rustdesk.com 的出站连接，因此不支持完全气隙隔离部署。'
  keywords: 'rustdesk server pro 离线运行, rustdesk 气隙隔离, rustdesk 自托管联网需求, rustdesk server pro 许可证验证, rustdesk 离线部署, rustdesk 需要联网吗'
---

不能——自托管的 RustDesk Server Pro 部署并非设计用于完全离线或气隙（air-gapped）环境运行。Pro 许可证必须通过出站连接访问 rustdesk.com 才能保持有效——无论是首次激活，还是服务器运行期间的持续验证，都是如此——因此，一个完全不对外连接、从不回连的网络环境并不在官方支持的部署模型范围之内。

## 简要回答

实际上，这项检查是周期性的，而非持续不断的：服务器大约每天通过 443 端口与 rustdesk.com 联系一次；如果某次检查失败，会持续重试，直到成功或大约 7 天过去为止——超过这一期限后，许可证将停止验证通过。这一内置的宽限期意味着，短暂的网络中断不会立即导致部署失效，但长期离线的服务器则会受到影响。你的 ID 服务器和中继服务器仍然完全由你自己托管；点对点直连会话在终端设备之间直接建立，中继会话则通过你的中继服务器转发。你完全可以将网络限制得非常严格：系统支持通过代理访问，因此实际操作中，你只需放行这一条必需的出站 HTTPS 通道，其余部分全部锁定即可。

## 详细说明

无需许可证即可自托管的开源 RustDesk 服务器是另一回事；本文所述的要求，专门适用于**已获授权的 Server Pro** 功能集。如果你真正在意的是将会话数据留在自己的基础设施内，那么自托管本身就已经实现了这一点——出站连接的要求关乎的是许可证验证，而不是要为每一次会话进行中转代理。

还有第二种工作流程需要考虑：**构建自定义客户端**。如果你通过 Server Pro 生成品牌定制版或预配置的客户端，这一生成步骤同样需要出站访问。请根据你所使用的版本和订阅方案，确认当前的具体行为。

对于严格的气隙网络而言，这正是决定性的细节所在。一台*永远*无法访问 rustdesk.com 的完全隔离服务器，不在默认支持的模型范围之内，因此，如果你有严格的气隙隔离需求，请务必在正式投入使用前，与 RustDesk 确认你的具体场景是否可行。而对于更为常见的“基本隔离、出站受限”这一类部署场景，实际的建议是：预留一条通往 rustdesk.com 的出站 HTTPS 通道——无论是直连还是通过代理——并在编写防火墙策略之前，明确具体的域名、端口和审批流程。请参阅 [RustDesk 文档](https://rustdesk.com/docs)。同样的许可证要求，也解释了为什么[即便以非 Docker 方式安装，Server Pro 也无法在完全没有互联网访问的情况下运行](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/)。

## 谁会问这个问题

隔离网络或受监管网络的运维人员，往往在安装 RustDesk 之前就会提出这个问题——无论是安全团队，还是服务于封闭环境的 [MSP（托管服务提供商）](/zh-cn/blog/rustdesk-for-msps-zh-cn)，都是如此。他们的网络可能部署在严格的出站防火墙之后，也可能只是希望尽量减少对外部的依赖。了解到许可证只需要一条持续的出站通道——仅此而已——就能让他们据此制定精确的防火墙规则，既不必为此过度开放网络，也不会误以为该产品能够在完全真空的环境中运行。

## 相关问题

- 出站域名和端口：请参阅 [RustDesk 文档](https://rustdesk.com/docs)。
- [我可以在不使用 Docker 的普通虚拟机上安装 RustDesk Server Pro 吗？](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/)
- 生成自定义品牌客户端：请参阅 [RustDesk 文档](https://rustdesk.com/docs)。

正在规划封闭式或接近气隙隔离的部署方案？在最终确定防火墙策略之前，请前往 rustdesk.com 确认最新的连接性与许可证相关细节。
