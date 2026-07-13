---
publishDate: 2026-07-07T17:09:00Z
lang: 'zh-cn'
translationKey: rustdesk-remote-control-android-ios
draft: false
title: 'RustDesk Android 与 iOS 远程控制:哪些功能真正可用'
excerpt: 'RustDesk 如何远程控制 Android 手机、将 iPhone 和 iPad 变成控制端,以及为何没有厂商能够远程控制 iOS 设备。'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: '指南'
tags: ['RustDesk', '移动端']
author: 'RustDesk Team'
slug: "rustdesk-remote-control-android-ios-zh-cn"
faq:
  - question: '我可以用 RustDesk 远程控制 Android 手机吗?'
    answer: '可以。在 Android 设备上,你需要启动 RustDesk 的屏幕捕获服务(该操作需要弹出屏幕授权确认提示),并启用 RustDesk Input 无障碍服务,这样才能注入远程的点击和滑动操作。屏幕共享需要 Android 6 或更高版本;共享设备内部系统音频则需要 Android 10 或更高版本。部分厂商会限制以侧载方式安装的应用使用无障碍权限,因此你可能需要先允许受限设置。'
  - question: 'RustDesk 可以控制 iPhone 或 iPad 吗?'
    answer: '任何远程桌面应用都无法做到——这是 iOS 平台本身的限制,而非 RustDesk 的问题。苹果对屏幕录制和后台运行的限制,使第三方应用无法作为被控端接受远程控制,因此没有任何厂商能够真正远程控制 iPhone 或 iPad。RustDesk 的 iOS/iPadOS 应用擅长的是作为控制端使用:你可以用 iPhone 或 iPad 来控制你的 Windows、macOS、Linux 和 Android 设备。'
  - question: '我可以用手机控制我的电脑吗?'
    answer: '可以。Android 和 iOS 版 RustDesk 应用都可以作为完整的控制端客户端使用。你可以从其中任意一端连接到 Windows、macOS 或 Linux 设备,并通过屏幕触控板或鼠标模式进行控制。这是移动端最可靠的使用场景,其表现与桌面客户端完全一致。'
  - question: 'RustDesk 移动应用是开源的吗?'
    answer: '是的。移动客户端与桌面客户端共享同一套采用 AGPL 协议的开源代码。Android 版本可以从 RustDesk 官方 GitHub 发行版和 F-Droid 获取,包名为 com.carriez.flutter_hbb;iOS 控制端可以从苹果 App Store 获取。RustDesk 目前尚未在 Google Play 上架。'
  - question: '我可以把 Android 设备设置为无人值守控制吗?'
    answer: '部分可以。RustDesk 可以通过前台通知让捕获服务保持运行,并在设备重启后自动重新启动该服务,但屏幕捕获授权提示、锁屏状态下无法输入,以及重启后需要手动解锁等因素,使得真正的无人值守 Android 控制并不可靠。请将 Android 控制视为有人值守的技术支持,而不是一次设置、无需再管的访问方式。'
metadata:
  description: 'RustDesk 在 Android 和 iOS 上的实际表现:如何远程控制 Android 设备、如何用任意一款移动应用来操控你的电脑,以及苹果在 iPhone 和 iPad 上究竟允许哪些操作。'
  keywords: 'RustDesk Android iOS 远程控制, 用 RustDesk 远程控制手机, RustDesk Android 被控端, 远程控制 Android 设备, RustDesk iOS, 远程控制 iPhone, RustDesk 手机应用'
---

“我能远程连接手机吗?”是 RustDesk 最常被问到的问题之一,它值得一个诚实的回答,而不是营销式的说辞。简单来说:RustDesk 确实可以真正控制 Android 设备,两款移动应用都是操控电脑的出色 _控制端_,而——这也是大家不太想听到的部分——目前你还无法远程连接进入 iPhone 或 iPad。本指南将准确说明哪些功能可行、哪些不可行,以及背后的原因,让你可以基于真实能力而非主观假设来做规划。

与 RustDesk 的其他部分一样,这两款移动应用同样基于 AGPL 协议开源。Android 版本可以从 [RustDesk 官方 GitHub 发行版](https://github.com/rustdesk/rustdesk/releases)和 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)获取,包名为 `com.carriez.flutter_hbb`,并覆盖广泛的设备架构——包括 arm64、arm32 和 x86_64 版本,以及一个通用 APK;iOS 控制端则可以在 App Store 中获取。RustDesk [目前尚未在 Google Play 上架](/zh-cn/blog/rustdesk-and-remote-access-scams-zh-cn):为应对诈骗滥用问题,RustDesk 主动下架了 Google Play 上的 Android 应用。同一套代码,同一个可审计的核心。

## 一表总结

| 场景                                         | 是否支持 | 说明                            |
| -------------------------------------------- | -------- | ------------------------------- |
| **从** Android 控制 Windows/macOS/Linux 电脑 | 是       | 完整控制端;支持触控板或鼠标模式 |
| **从** iPhone/iPad 控制电脑                  | 是       | 完整控制端                      |
| 控制**Android 设备**(作为被控端)             | 是       | 需要屏幕捕获授权 + 无障碍服务   |
| 控制**iOS 设备**(iPhone/iPad 作为被控端)     | **否**   | 苹果系统限制;尚未实现           |
| 远程查看 iOS 屏幕                            | **否**   | 目前不支持                      |

本文接下来的内容,就是对表格中每一行的详细说明。

## 将手机用作控制端(简单的部分)

这是那种“开箱即用”的使用场景。在你的 Android 或 iOS 设备上安装 RustDesk,它就会成为任何 RustDesk 被控端的完整控制端——无论是你的 Windows 台式机、[Mac](https://rustdesk.com/docs/zh-cn/client/mac/),还是 [Linux 主机](/zh-cn/blog/rustdesk-for-linux-zh-cn)。输入目标 ID 和密码,你就能看到远程屏幕,并使用屏幕触控板、鼠标模式、软件键盘以及文件传输功能。手机端不需要任何特殊设置,因为你只是在 _发出_ 控制指令,而不是被控制。

如果你的需求是“无论身在何处都能修好一台电脑”,那么运行 RustDesk 的手机确实是一款出色的工具,其表现与桌面客户端完全一致。

## 控制 Android 设备(作为被控端)

这正是 RustDesk 做到大多数远程工具做不到的地方:它可以把 Android 手机或平板变成一台可被控制的被控端。这依赖两个 Android 子系统的支持,而且两者都需要手动进行明确设置。

**屏幕捕获。** RustDesk 使用 Android 的 `MediaProjection` API 来捕获屏幕画面。当你在应用中点击**启动服务**时,Android 会弹出一个授权提示,请求录制屏幕的权限——这个弹窗是强制性的,无法被静默跳过。屏幕共享需要 **Android 6 或更高版本**;捕获手机的**内部系统音频**则需要 **Android 10 或更高版本**。在获得该捕获权限之前,任何接入的连接都无法看到任何画面。

**远程输入。** 能看到屏幕并不等于能控制它。为了注入点击、滑动和按键事件,RustDesk 注册了一个名为 **RustDesk Input** 的 [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms),你需要在**设置 → 无障碍**中启用它。它会将远程的鼠标和手势事件转换为 Android 手势,并能触发返回、主屏幕、最近任务等系统操作。

**保持运行。** RustDesk 会保留一个前台服务通知,并可选择显示一个悬浮窗,以防止 Android 系统终止捕获进程,同时它还可以在设备启动时自动重启该服务。

接下来是这些功能的局限性,因为 Android 的安全模型确实带来了一些实实在在的限制:

- **启动捕获需要授权。** 必须有人(或提前完成授权)接受屏幕录制提示。
- **锁屏会阻止输入。** Android 不允许无障碍服务在安全锁屏界面中输入内容,因此设备一旦锁屏,你通常就无法远程输入解锁密码——这一限制已被[实际使用者记录在案](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html)。
- **重启后需要手动解锁。** 设备重启后,通常需要有人到现场亲自解锁,才能恢复控制。
- **OEM 厂商限制。** 在部分厂商定制的系统上,针对以侧载方式安装的应用,**RustDesk Input** 无障碍开关会呈灰色不可用状态,直到你授予“受限设置”权限(长按应用图标 → 应用信息 → 允许受限设置)。部分厂商激进的电池管理机制也可能会终止后台服务。

实际结论是:Android 控制非常适合**有人值守的支持场景**——也就是帮助正拿着手机的人——而**一次设置、无需再管的无人值守**访问,则是桌面被控端更擅长的工作,因为移动操作系统会限制持续性的后台访问。请为合适的场景选择合适的平台。(关于桌面端,[无人值守访问设置指南](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn)介绍了真正可行的方案。)

## 控制 iOS 设备:苹果允许哪些操作

这是一个经常被问到、却总是被其他地方含糊其辞的问题,所以我们直说吧:**没有任何一款远程桌面应用能够远程控制 iPhone 或 iPad——RustDesk 也不例外。** 在 iOS 上,RustDesk 应用是一个出色的控制端——它可以 _向外_ 连接、控制你的电脑——但苹果不允许任何第三方应用在 iOS 上作为被远程控制的被控端。

原因在于苹果自身。iOS 严格限制后台运行、屏幕录制以及任何形式的合成输入注入,这正是没有任何第三方应用能够真正远程 _控制_ iPhone 的原因。与其说这是 RustDesk 的疏漏,不如说这是一堵平台壁垒——iOS 被控端支持已在 [GitHub 上被多次请求](https://github.com/rustdesk/rustdesk/discussions/4839),但至今仍未实现。苹果的广播 API(ReplayKit)理论上可以推流屏幕画面,但那是由应用自身发起的广播,而不是远程方可以主动拉取的内容——因此第三方远程查看 iOS 屏幕的功能依然无法实现,从另一台设备完全远程控制 iOS 设备,也不是该系统允许第三方做到的事情。

所以,如果你的需求恰好是“远程连接进入一台 iPhone”,目前没有任何远程桌面工具能够做到——正如我们在 [RustDesk 对比 AnyDesk](/zh-cn/blog/rustdesk-vs-anydesk-zh-cn) 一文中提到的,这是每个厂商都会碰到的 iOS 平台壁垒,而不是 RustDesk 独有的缺陷。我们宁愿提前把这一点告诉你,也不希望你在设置完成之后才发现这个事实。

## 关于隐私与自托管的说明

由于移动应用是开源的,并且使用与桌面客户端相同的协议,你可以将它们指向你自己的[自托管 RustDesk 服务器](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn),而不是公共网络——这样一来,移动端会话(包括 ID 分配在内)都由你自己掌控的基础设施来中转。对于涉及个人设备的远程支持工作流来说,这种数据主权层面的考量往往比平时更加重要。

这里的取舍一如既往:你需要自己搭建并保障该服务器的安全——鉴于其资源需求不高,这其实是一项不算繁重的工作——而对许多团队来说,把会话数据留在自己的地盘上是完全值得的。

## 快速上手

从[官方 GitHub 发行版](https://github.com/rustdesk/rustdesk/releases)下载 Android 版本,或从 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 安装该应用包。RustDesk [目前尚未在 Google Play 上架](/zh-cn/blog/rustdesk-and-remote-access-scams-zh-cn);iOS 控制端仍可从苹果 App Store 获取。若要控制一台手机,该手机必须是 Android 系统——接受屏幕捕获授权提示,并启用 RustDesk Input 无障碍服务。若要从手机控制你的电脑,两款移动应用都可以开箱即用。当前的套餐方案见 [rustdesk.com/pricing](https://rustdesk.com/pricing),[sales@rustdesk.com](mailto:sales@rustdesk.com) 可以为你提供 Server Pro 相关的帮助。想先看看实际效果?[观看 RustDesk 实战演示](https://www.youtube.com/@rustdesk)。
