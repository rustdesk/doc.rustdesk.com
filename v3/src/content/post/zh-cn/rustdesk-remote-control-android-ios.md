---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: rustdesk-remote-control-android-ios
draft: false
title: 'RustDesk Android 与 iOS 远程控制：哪些功能真正可用'
excerpt: 'RustDesk 可以远程控制 Android 手机，也能把 Android 手机、iPhone 和 iPad 变成控制电脑的控制端。iOS 应用仅作为控制端。'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: '指南'
tags: ['RustDesk', '移动端']
author: 'RustDesk Team'
slug: 'rustdesk-remote-control-android-ios-zh-cn'
faq:
  - question: '可以用 RustDesk 远程控制 Android 手机吗？'
    answer: '可以。在 Android 设备上启动 RustDesk 的屏幕捕获服务（需要在屏幕上确认授权提示），并启用 RustDesk Input 无障碍服务，远程的点击和滑动操作才能注入。屏幕共享需要 Android 6 或更高版本；共享设备内部的系统音频需要 Android 10 或更高版本。部分厂商会限制侧载应用使用无障碍功能，因此可能需要先允许受限设置。'
  - question: 'RustDesk 可以控制 iPhone 或 iPad 吗？'
    answer: '不可以。RustDesk iOS/iPadOS 应用仅作为控制端：可以用 iPhone 或 iPad 控制 Windows、macOS、Linux 和 Android 设备。RustDesk 未实现 iOS 被控、屏幕共享或远程输入。其他一些厂商提供有人在场时的 iOS 屏幕查看，Apple 也在 FaceTime 通话中提供需经同意的远程控制。'
  - question: '可以用手机控制我的电脑吗？'
    answer: '可以。Android 和 iOS 版 RustDesk 应用都是完整的控制端：通过 ID 连接 Windows、macOS 或 Linux 电脑，用屏幕触控板或鼠标模式加软件键盘进行控制。部分剪贴板、文件传输和特殊按键的操作方式因移动操作系统而异。用手机控制电脑是移动端最可靠的使用场景。'
  - question: 'RustDesk 移动应用是开源的吗？'
    answer: '是的。移动客户端与桌面客户端共用同一套 AGPL 开源代码。Android 版本可从 RustDesk 官方 GitHub Releases 和 F-Droid 获取，包名为 com.carriez.flutter_hbb；iOS 控制端可从 Apple App Store 获取。RustDesk 目前不通过 Google Play 分发。'
  - question: '可以把 Android 设备设置为无人值守控制吗？'
    answer: '只能部分实现。RustDesk 可以通过前台通知让捕获服务保持运行，并在开机时重启服务，但屏幕捕获需要授权、锁屏界面无法输入、重启后需要手动解锁，这些都让真正的无人值守 Android 控制并不可靠。请把 Android 控制当作有人在场的支持方式，而不是一次设置、长期免管的访问方式。'
metadata:
  description: 'RustDesk 在 Android 和 iOS 上：远程控制 Android 设备，用任一移动应用操控你的电脑，以及为什么 iPhone 和 iPad 应用仅作为控制端。'
  keywords: 'RustDesk Android iOS 远程控制, 用 RustDesk 远程控制手机, RustDesk Android 被控端, 远程控制 Android 设备, RustDesk iOS, 远程控制 iPhone, RustDesk 手机应用'
---

只要设备所有者授予屏幕捕获和输入权限，RustDesk 就能真正控制 Android 设备；两款移动应用也都是控制电脑的出色 _控制端_。iOS 应用仅作为控制端：RustDesk 未实现 iOS 被控或屏幕共享，因此无法用 RustDesk 远程进入 iPhone 或 iPad。本指南说明哪些可行、哪些不可行以及原因，方便你按真实能力做规划。

两款移动应用都基于采用 AGPL 协议的 RustDesk 客户端代码；RustDesk Server OSS（免费社区服务器）同样采用 AGPL 协议，而 Server Pro 是商业的专有自托管服务器软件。Android 版本可从 [RustDesk 官方 GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 和 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 获取，包名为 `com.carriez.flutter_hbb`，设备覆盖面很广——提供 arm64、arm32 和 x86_64 版本，以及一个通用 APK；iOS 控制端可在 App Store 获取。RustDesk [目前不通过 Google Play 分发](/zh-cn/blog/rustdesk-and-remote-access-scams-zh-cn)：为应对诈骗滥用，RustDesk 主动下架了 Google Play 上的 Android 应用。同一套代码，同一个可审计的核心。

## 一张表看懂

| 场景                                         | 是否支持 | 说明                               |
| -------------------------------------------- | -------- | ---------------------------------- |
| **从** Android 控制 Windows/macOS/Linux 电脑 | 是       | 完整控制端；支持触控板或鼠标模式   |
| **从** iPhone/iPad 控制电脑                  | 是       | 完整控制端；支持触控板或鼠标模式   |
| 控制 **Android 设备**（作为被控端）          | 是       | 需要屏幕捕获授权 + 无障碍服务      |
| 用 RustDesk 控制 **iOS 设备**                | **否**   | RustDesk iOS 是控制端应用          |
| 用 RustDesk 远程查看 iOS 屏幕                | **否**   | RustDesk 未实现传入的屏幕查看      |

下文就是每一行背后的细节。

## 把手机当作控制端（简单的部分）

这是“装上就能用”的场景。在 Android 或 iOS 设备上安装 RustDesk，它就成了任何 RustDesk 被控端的完整控制端——你的 Windows 台式机、[Mac](https://rustdesk.com/docs/zh-cn/client/mac/)，或者 [Linux 主机](/zh-cn/blog/rustdesk-for-linux-zh-cn)。输入目标 ID 和密码，就能看到远程屏幕，并使用屏幕触控板、鼠标模式和软件键盘。部分剪贴板、文件和特殊按键的操作方式因移动操作系统而异。手机端不需要任何特殊设置，因为你只是在 _发出_ 控制，而不是被控制。

如果你的需求是“随时随地修好一台电脑”，运行 RustDesk 的手机确实是一件好工具。

## 控制 Android 设备（作为被控端）

RustDesk 可以把 Android 手机或平板变成可被控制的被控端。屏幕捕获和远程输入分别依赖 Android 的不同服务，两者都需要设置。

**屏幕捕获。** RustDesk 使用 Android 的 `MediaProjection` API 捕获屏幕。在应用中点击 **启动服务** 时，Android 会弹出授权提示，请求录制屏幕的权限——这个对话框是强制的，无法静默跳过。屏幕共享需要 **Android 6 或更高版本**；捕获手机的**内部系统音频**需要 **Android 10 或更高版本**。在授予捕获权限之前，任何传入连接都看不到画面。

**远程输入。** 能看到屏幕不等于能控制它。为了注入点击、滑动和按键事件，RustDesk 注册了一个名为 **RustDesk Input** 的 [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms)，你需要在 **设置 → 无障碍** 中启用。它把远程的鼠标和手势事件转换为 Android 手势，还能触发返回、主屏幕、最近任务等系统操作。

**保持运行。** RustDesk 会保留一个前台服务通知，并可选显示悬浮窗，防止 Android 结束捕获进程；它还可以在开机时重启服务。

接下来是局限，因为 Android 的安全模型确实带来了实实在在的限制：

- **启动捕获需要授权。** 必须有人（或事先授权）接受屏幕录制提示。
- **锁屏会阻止输入。** Android 不允许无障碍服务在安全锁屏界面输入内容，因此设备一旦锁屏，通常就无法远程输入解锁密码——这一限制已被[实际使用者记录下来](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html)。
- **重启后需要手动解锁。** 设备重启后，通常要有人在现场解锁，才能恢复控制。
- **厂商限制。** 在部分厂商的系统上，侧载应用的 **RustDesk Input** 无障碍开关会显示为灰色，直到你授予“受限设置”（长按应用图标 → 应用信息 → 允许受限设置）。某些厂商激进的电池管理也可能结束后台服务。

实际结论是：Android 控制非常适合**有人在场的支持**——帮助正拿着手机的人；而**一次设置、长期免管的无人值守**访问，更适合由桌面被控端来承担，因为移动操作系统会限制持续的后台访问。根据任务选择平台。（桌面端的做法见[无人值守访问设置指南](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn)。）

## iOS：RustDesk 控制端、屏幕查看与输入控制

**RustDesk iOS 版是控制端，不是被控端。** 可以用它控制受支持的电脑或 Android 设备。RustDesk 未实现传入的 iOS 屏幕查看和输入控制，相关讨论见 [iOS 被控端功能请求](https://github.com/rustdesk/rustdesk/discussions/4839)。

其他厂商的做法不同。Apple 的广播 API 允许由用户发起的屏幕共享，[AnyDesk 的文档说明其支持 iOS/iPadOS 12 及更高版本的传入远程查看](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos)，但不支持远程输入控制。技术人员看着屏幕、由机主自己点按，和直接控制屏幕是两种不同的工作流程。

Apple 还[在 FaceTime 中提供需经同意的远程控制](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios)，但受设备、地区和系统版本要求限制。如果你的支持流程需要查看 iPhone 屏幕，请使用实现了该流程的工具；如果是用 iPhone 或 iPad 控制电脑，RustDesk 控制端应用正合适。

## 关于隐私与自托管

移动应用是开源的，并且与桌面客户端使用相同的协议，因此你可以让它们连接你自己的[自托管 RustDesk 服务器](/zh-cn/blog/why-self-host-remote-desktop-software-zh-cn)，而不是公共网络——这样移动会话就由你掌控的基础设施来协调，包括 ID 在内。对于涉及个人设备的远程支持流程，这种数据主权考量比平时更重要。

取舍一如既往：服务器要由你自己运行和保护——包括更新、监控、备份和容量规划；而对许多团队来说，把会话数据留在自己的地盘上非常值得。

## 快速上手

从[官方 GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 下载 Android 版本，或从 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 安装。RustDesk [目前不通过 Google Play 分发](/zh-cn/blog/rustdesk-and-remote-access-scams-zh-cn)；iOS 控制端仍可从 Apple App Store 获取。要控制一部手机，这部手机必须是 Android——接受屏幕捕获授权提示，并启用 RustDesk Input 无障碍服务。要用手机控制电脑，两款移动应用都可以直接使用。当前套餐见 [rustdesk.com/pricing](https://rustdesk.com/pricing)，Server Pro 相关问题可联系 [sales@rustdesk.com](mailto:sales@rustdesk.com)。想先看看效果？[观看 RustDesk 实际演示](https://www.youtube.com/@rustdesk)。
