---
publishDate: 2026-06-28T16:50:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'RustDesk Server Pro 能否离线或在物理隔离网络中运行？'
excerpt: '不能。自托管的 RustDesk Server Pro 需要持续通过出站连接访问 rustdesk.com 来验证许可证，因此不支持完全物理隔离（air-gapped）的部署。'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: '部署'
tags: ['RustDesk', '部署', '自托管']
author: RustDesk Team
slug: 'rustdesk-server-pro-offline-air-gapped-zh-cn'
faq:
  - question: 'RustDesk Server Pro 能离线或在物理隔离网络中运行吗？'
    answer: '不能。RustDesk Server Pro 大约每天通过出站 HTTPS（443 端口）向 rustdesk.com 检查一次许可证，检查失败后会持续重试约 7 天，因此永久物理隔离的 Pro 部署不在标准授权模式之内。支持使用代理。RustDesk Server OSS（免费社区服务器）没有许可证检查。'
  - question: 'RustDesk Server Pro 需要一直联网吗？'
    answer: '它需要持续的出站访问来连接 rustdesk.com 验证许可证，但并不要求一刻不断。服务器大约每天通过 443 端口签到一次；某次检查失败后会持续重试，直到成功或大约七天过去——因此可以容忍短暂断网，但如果服务器与 rustdesk.com 断开的时间超过这个宽限期，许可证就会验证失败。远程会话本身由你自托管的中继服务器和 ID（连接协调）服务器负责协调。'
  - question: '隔离环境中的 RustDesk Server Pro 部署需要哪些出站访问？'
    answer: '允许服务器通过出站 HTTPS 访问 rustdesk.com 以验证许可证；如果要生成品牌客户端，还需允许访问自定义客户端构建服务。支持使用代理，因此网络的其余部分可以保持封闭。其他需要规划的出站流程包括客户端更新，以及你接入的任何外部身份提供商。'
  - question: '有没有支持完全物理隔离的 RustDesk 授权选项？'
    answer: '没有。标准的 RustDesk Server Pro 许可证需要定期在线验证。RustDesk Server OSS（免费社区服务器）没有许可证检查：它的 ID/连接协调服务和中继服务可以在隔离网络内运行，但没有 Pro 的 Web 控制台和管理功能。如果 Pro 有硬性的物理隔离要求，请将你的场景发送至 sales@rustdesk.com。'
metadata:
  description: '自托管的 RustDesk Server Pro 能在物理隔离环境中运行吗？不能。Pro 许可证需要持续通过出站连接访问 rustdesk.com，因此不支持完全物理隔离。'
  keywords: 'rustdesk server pro 离线运行, rustdesk 物理隔离, rustdesk 气隙隔离, rustdesk 自托管联网要求, rustdesk server pro 许可证验证, rustdesk 离线部署, rustdesk 需要联网吗'
---

不能。自托管的 RustDesk Server Pro 部署不是为完全离线或物理隔离（air-gapped）环境设计的。Pro 许可证必须通过出站连接访问 rustdesk.com 才能保持有效——激活时如此，服务器运行期间也要持续验证——因此完全隔离的网络不在支持的模式之内。

## 简短回答

[官方许可证检查 FAQ](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) 说明验证是周期性的：服务器大约每天通过 443 端口连接一次 rustdesk.com；检查失败后会持续重试，直到成功或大约七天过去——之后许可证就会验证失败。有了这个内置的宽限期，短暂断网不会立刻让部署失效，但永久离线的服务器会。你的 ID 服务和中继服务仍然自托管；直连会话在端点之间传输，经中继的会话使用你的中继。支持使用代理，因此你可以只放行所需的出站 HTTPS 路径，把网络的其余部分封闭起来。

## 详细说明

这项要求只针对 **Server Pro**。**RustDesk Server OSS**（免费社区服务器）没有许可证检查。RustDesk 的客户端和 Server OSS 采用 AGPL 协议；Server Pro 是商业的专有自托管服务器软件。在隔离网络中，客户端和本地的 ID/中继服务仍然需要可用的路由、正确的密钥和平台权限。经 ID 协商的直连会话在端点之间传输；经中继的会话使用你的服务器。客户端配置了你服务器的公钥后，基于 ID 的会话为端到端加密，而 [IP 直接访问不加密](https://github.com/rustdesk/rustdesk/wiki/FAQ)，因此不能用它来替代配置正确的 ID 连接。

还有一个工作流程需要考虑：**构建自定义客户端**。如果你通过 Server Pro 生成品牌版或预配置的客户端，构建是在 RustDesk 的构建服务上进行的，因此同样需要出站访问。提交的配置会在构建完成后删除，生成的安装程序约一天后自动移除，所以请及时下载，并保存在你自己的软件仓库中。

对于严格物理隔离的网络，这是决定性的细节：一台 _永远_ 无法访问 rustdesk.com 的服务器不在默认模式之内，因此如果你有硬性的物理隔离要求，请在投入之前与 RustDesk 确认你的具体场景。对于更常见的“基本隔离、出站严格受限”环境，请预留一条通往 rustdesk.com 的出站 HTTPS 路径——直连或经代理均可——并在编写防火墙策略之前，明确具体的域名、端口和审批流程。参见 [RustDesk 文档](https://rustdesk.com/docs/zh-cn/)；同样由于这项许可证要求，[即使不用 Docker 安装，Server Pro 也不能在完全没有互联网访问的情况下运行](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/)。

## 盘点所有出站依赖

服务于封闭环境的安全团队和 [MSP](/zh-cn/blog/rustdesk-for-msps-zh-cn) 通常会在安装 RustDesk 之前问这个问题。他们的 Server Pro 出站清单很短：通过 HTTPS 访问 rustdesk.com 进行许可证验证；如果生成品牌客户端，还有自定义客户端构建服务；客户端更新；如果邮件服务器位于网络之外，还有 SMTP；以及你接入的任何外部身份提供商。ID/连接协调服务器、中继和控制台都在你的网络内运行，因此一条精确的防火墙规则就能取代对网络的过度开放。

## 相关问题

- 出站域名和端口：参见 [RustDesk 文档](https://rustdesk.com/docs/zh-cn/)。
- [可以不用 Docker，在普通虚拟机上安装 RustDesk Server Pro 吗？](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/)
- 生成自定义品牌客户端：参见 [RustDesk 文档](https://rustdesk.com/docs/zh-cn/)。

正在规划封闭或接近物理隔离的部署？只开放许可证路径和你实际使用的出站流程，其余一律保持内部访问；如果你的要求是永久物理隔离，请发邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com)。
