---
publishDate: 2026-07-02T14:43:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'RustDesk 中什么算作受管设备？'
excerpt: '在 RustDesk Server Pro 标准套餐中，你设置为可访问的每台设备只计一次。Customized V2 只计算分配到分组或用户的设备；临时（ad-hoc）设备不计入。'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: '定价'
tags: ['RustDesk', '定价', '许可']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-zh-cn'
faq:
  - question: 'RustDesk 如何计算受管设备？'
    answer: '在标准套餐中，你设置为可访问的每台设备都计为一台受管设备，且只计一次——无论有人值守还是无人值守，无论你连接一次还是一千次。Customized V2 的计算方式不同：只有分配到设备组或用户的设备，才计入你的授权设备数。'
  - question: '临时的一次性支持设备如何计算？'
    answer: '在 Customized V2 套餐中，只有分配到设备组或用户的设备才算受管设备。为临时支持而连接过一次、且从未分配的机器，不计入你的授权设备数，也不会被停用。如果你的工作以临时支持为主，Customized V2 比逐台计算每个终端更合适。'

metadata:
  description: 'RustDesk 如何计算受管设备：标准套餐中，每台可访问的设备无论连接多少次都只计一次；Customized V2 只计算分配到分组或用户的设备。'
  keywords: '什么算受管设备, RustDesk 设备计数, RustDesk 与 TeamViewer 授权对比, 无人值守与有人值守设备授权, RustDesk 临时支持, MSP 远程支持授权'
---

RustDesk Server Pro 按已授权的登录用户和受管设备计数。在标准套餐中，**你想访问的每台设备都计为一台受管设备，且只计一次。** **[Customized V2](https://rustdesk.com/pricing#custom2)** 套餐的计算方式不同——只有你分配给分组或用户的设备才计入——这正是它适合大量临时支持场景的原因。

## 简短回答

在标准套餐中，“受管设备”就是你希望能够访问的任何机器，服务器对每台只计一次。以下因素都不影响计数：

- 设备是**有人值守**（有人坐在设备前）还是**无人值守**（无头服务器、自助终端或长期开机的工作站），
- 你会连接**一次**还是**多次**，
- 你访问它的频率。

如果你的工作以临时的一次性支持为主，下文介绍的、范围更窄的 **[Customized V2](https://rustdesk.com/pricing#custom2)** 计数方式正是为这种情况设计的。

## 详细说明

改变计数的是套餐。在 **[Customized V2](https://rustdesk.com/pricing#custom2)** 套餐中，受管设备的定义更窄：只有你**分配给设备组或用户**的设备，才计入你的授权设备数。仅用于临时、一次性支持且从未分配的机器不会计入，也不会被停用。如果你希望这些未分配的设备完全不出现在控制台中，可以用 [`register-device` 客户端设置](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/advanced-settings/#register-device)来控制，该设置在授权的并发连接数为 2 或以上时生效。实际上，这类快速支持会话只显示一个 ID 和一次性密码，用于一次有人值守的连接，因此真正的一次性交互根本不需要在你的设备群中占用永久名额。如果你的大量工作都是这种形式，Customized V2 通常更合适——请把你的场景发送至 [sales@rustdesk.com](mailto:sales@rustdesk.com) 了解当前条款，或查看 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

例如，设想一家 [MSP](/zh-cn/blog/rustdesk-for-msps-zh-cn) 有 20 名技术人员，支持大约 1,000 台客户机器：它需要**同时**满足两个授权维度——足够覆盖全部 20 名技术人员的登录用户，以及足够覆盖需保持可访问机器的受管设备。对于真正只有一次的支持请求，适用上面的 Customized V2 规则；当前额度见 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

## 并发连接是另一个授权单位

Server Pro 标准套餐（Individual、Basic、Customized）包含无限并发连接；只有 [Customized V2](https://rustdesk.com/pricing#custom2) 按设定数量授权。根据 RustDesk 的[并发连接定义](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)，一个并发连接是一台处于活动状态的控制端设备，即一个“通道”，而不是每个发起的会话标签页：一台技术员电脑打开五个会话标签页只占用一个通道，三台控制端电脑同时活动则占用三个通道。在 Customized V2 上，请分别测算登录用户、受管设备和通道数量。

## 谁会问这个问题

凡是要把 TeamViewer 或 AnyDesk 的坐席数换算成 RustDesk 授权单位的人，都会先碰到这个定义，因为两边的授权单位并不一一对应。RustDesk 付费套餐需要同时覆盖登录的人员和纳入管理的设备。

## 相关问题

- 按用户与按设备授权、并发连接，以及 Server Pro 的设备计数：参见 [RustDesk 定价](https://rustdesk.com/pricing)。
- [从 TeamViewer 转过来——对 MSP 而言，RustDesk 的定价相比如何？](/zh-cn/blog/rustdesk-vs-teamviewer-zh-cn)

正在测算设备规模，不确定一次性支持是否要计入设备数？请在 [rustdesk.com/pricing](https://rustdesk.com/pricing) 查看当前条款，或在购买前咨询团队。
