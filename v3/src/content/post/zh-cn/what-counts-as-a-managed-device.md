---
publishDate: 2026-07-02T14:43:00Z
lang: 'zh-cn'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'RustDesk 中什么才算作受管理设备?'
excerpt: '在 RustDesk 标准套餐中,你设置可访问的每台设备只计费一次。Customized V2 套餐则只计算已分配到分组或用户的设备,临时(ad-hoc)设备不计入统计。'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.png
category: '定价'
tags: ['RustDesk', '定价', '许可']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-zh-cn'
faq:
  - question: 'RustDesk 如何计算受管理设备的数量?'
    answer: '在标准套餐中,你设置可访问的每台设备都只计为一台受管理设备,且只计算一次——无论是有人值守还是无人值守,无论你连接一次还是上千次。Customized V2 套餐的计算方式不同:只有分配到设备分组或用户的设备才计入你的授权设备数量。'
  - question: '临时性、一次性支持的设备是如何计算的?'
    answer: '在 Customized V2 套餐中,只有分配到设备分组或用户的设备才算作受管理设备。如果你只是临时连接某台设备提供一次性支持,且从未对其进行分配,那么该设备不会计入你的授权设备数量,也不会被禁用。对于以临时支持为主的工作场景,相比逐一计算每个终端,Customized V2 显然更合适。'

metadata:
  description: 'RustDesk 如何计算受管理设备数量:标准套餐将每台可访问设备计为一次;Customized V2 套餐只计算已分配到分组或用户的设备。'
  keywords: '什么算受管理设备, RustDesk 设备计数, RustDesk 与 TeamViewer 授权对比, 无人值守与有人值守设备授权, RustDesk 临时支持, MSP 远程支持授权'
---

如果你是从 TeamViewer 的按坐席计费模式转过来的,会发现 RustDesk 标准套餐的计数规则简单得令人耳目一新:**你想要访问的每台设备,都只计为一台受管理设备,且只计算一次。** **[Customized V2](https://rustdesk.com/pricing#custom2)** 套餐的计算方式则不同——只有你分配给分组或用户的设备才会被计入——这正是它更适合大量临时支持场景的原因。

## 简短回答

在标准套餐中,"受管理设备"是指任何你希望能够访问到的设备,服务器只会将其计算一次。以下这些因素都不会影响计数结果:

- 设备是**有人值守**(有人坐在设备前操作)还是**无人值守**(无显示器服务器、信息亭终端或长期开机的工作站),
- 你会连接**一次**还是**多次**,
- 你访问它的频率如何。

如果你的工作以临时性、一次性支持为主,下文介绍的范围更窄的 **[Customized V2](https://rustdesk.com/pricing#custom2)** 计数方式正是为这种场景设计的。

## 详细说明

真正会带来变化的是套餐类型。在 **[Customized V2](https://rustdesk.com/pricing#custom2)** 套餐中,受管理设备的定义范围更窄:只有你**分配给设备分组或用户**的设备,才会计入你的授权设备数量。仅用于临时、一次性支持且从未被分配的设备,不会被计入,也不会被禁用。如果你希望这些未分配的设备完全不出现在控制台中,可以通过 [`register-device` 客户端设置](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) 来控制,该设置在授权的并发连接数达到 2 或以上时生效。实际上,这类快速支持会话只会显示一个 ID 和一次性密码,用于单次有人值守连接,因此真正的一次性交互根本不需要在你的设备清单中占用永久名额。如果你的大部分工作都属于这种情况,Customized V2 通常是更合适的选择——请发送邮件至 [sales@rustdesk.com](mailto:sales@rustdesk.com) 说明你的使用场景以获取当前条款,或查看 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

例如,设想一家 [MSP](/zh-cn/blog/rustdesk-for-msps-zh-cn)(托管服务提供商),拥有 20 名技术人员,负责支持大约 1,000 台客户设备:它需要**同时**满足两个授权维度——为全部 20 名技术人员提供足够的登录用户名额,并为需要保持可访问的设备提供足够的受管理设备名额。对于真正的一次性支持终端,上述 Customized V2 规则同样适用;当前的额度信息请参见 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

## 谁会关心这个问题

任何试图把 TeamViewer 或 AnyDesk 的坐席数换算成 RustDesk 计费单位的人,都会首先遇到这个定义问题,因为两者的授权单位并不是一一对应的。RustDesk 付费套餐要求同时具备足够的容量:既要覆盖登录用户,也要覆盖受管理的设备。

## 相关问题

- 按用户还是按设备授权、并发连接,以及 Server Pro 部署的设备计数:参见 [RustDesk 定价](https://rustdesk.com/pricing)。
- [从 TeamViewer 迁移过来——对 MSP 而言,RustDesk 的定价相比如何?](/zh-cn/blog/rustdesk-vs-teamviewer-zh-cn)

正在评估设备规模,不确定一次性支持是否应计入设备数量?可以在 [rustdesk.com/pricing](https://rustdesk.com/pricing) 查看当前条款,或在购买前咨询团队。
