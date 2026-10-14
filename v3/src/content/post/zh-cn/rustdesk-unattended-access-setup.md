---
publishDate: 2026-07-08T11:04:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-unattended-access-setup'
draft: false
title: 'RustDesk 无人值守访问：设置指南'
excerpt: '用正确的方式设置 RustDesk 无人值守访问：设置固定密码，以服务方式运行实现开机启动，再用预配置客户端批量部署。'
image: '~/assets/images/blog/rustdesk-unattended-access-setup-og.webp'
category: '部署'
tags: ['RustDesk', '部署', '无人值守访问']
author: 'RustDesk Team'
slug: 'rustdesk-unattended-access-setup-zh-cn'
faq:
  - question: '如何在 RustDesk 中设置无人值守访问？'
    answer: '只需两步：在“设置 → 安全”中设置固定密码，并安装 RustDesk，让其系统服务随机器启动。默认的批准模式已经接受固定密码；macOS 还需要授予屏幕录制和辅助功能权限。完成这两步后，只要机器在线，你随时都能连接，包括在 Windows 登录界面，无需任何人在场。'
  - question: '为什么用户注销后 RustDesk 连接会断开？'
    answer: '因为 RustDesk 是以便携版可执行文件运行的，而不是已安装的服务。便携版进程存在于用户会话之中，用户注销时就会停止；未提权时，它也无法操作 Windows UAC 安全桌面。请安装 RustDesk 并保持其系统服务启用，该服务的运行不依赖任何已登录用户。对于有人在场的 Windows 支持，仍可使用便携版提权。'
  - question: '用固定密码进行无人值守访问安全吗？'
    answer: '安全，前提是配置得当。请使用足够长、独一无二且不同于操作系统登录密码的固定密码，在受控设备上启用连接双重认证，并通过 IP 或 ID 白名单（在 Server Pro 上还有访问控制）限制谁能连接。及时更新客户端并审查日志。自托管会把连接协调服务、中继和控制台放在你自己运行的服务器上。'
  - question: '可以一次性为多台电脑部署 RustDesk 无人值守访问吗？'
    answer: '可以。在 Basic 及更高级别的自托管套餐中，自定义客户端生成器（Custom Client Generator）可以生成预先内置服务器地址、密钥和相关设置的安装程序，最终用户无需输入任何内容。用你现有的部署工具推送，每台设备都会自动安装服务并注册到你的服务器。'
  - question: '无人值守访问在 Windows 登录界面也能用吗？'
    answer: '可以，前提是 RustDesk 已安装为服务。已安装的服务会在任何用户登录之前随系统启动，因此你可以连接到登录界面、完成身份验证，甚至触发重启后再重新连接。便携版可执行文件做不到这一点，因为它只存在于用户会话之中。'

metadata:
  description: '设置 RustDesk 无人值守访问：固定密码、以服务方式运行实现开机启动、Windows/macOS/Linux 各平台注意事项，以及批量部署。'
  keywords: 'RustDesk 无人值守访问, RustDesk 固定密码, RustDesk 永久密码, RustDesk 开机启动, RustDesk 服务安装, RustDesk 无人值守设置, RustDesk 批量部署, 无人值守远程访问'
---

无人值守访问，指的是在电脑前没有人的情况下访问这台电脑——机柜里的服务器、自助终端，或者远在千里之外的家人电脑。只要做好两件事，RustDesk 就能很好地胜任：设置**固定密码**，这样每次连接都不需要有人批准；让 RustDesk **以服务方式运行**，这样它在用户登录之前和注销之后都可用。本指南会讲清这两点、各平台所需的权限，以及如何在整个设备群中推广部署。

## 简短回答

设置**固定密码**（设置 → 安全），并**把 RustDesk 安装为系统服务**，让它随机器启动。默认的批准模式已经接受固定密码，因此无需有人点击接受；服务的运行不依赖任何已登录用户，所以你随时都能连接，包括在 Windows 登录界面。macOS 还需要屏幕录制和辅助功能权限。要批量部署，就生成一个预配置客户端，让每台机器自动安装并注册到你的服务器。

## 第一步：设置固定密码

默认情况下，RustDesk 显示的是一个不断变化的一次性密码，需要远端有人念给你听。要实现无人值守访问，就要换成一个固定的凭据：

1. 在你要访问的机器上打开 RustDesk。
2. 进入 **设置 → 安全**（旧版本在主界面的密码区域）。
3. 选择 **设置固定密码**，输入一个强度高且独一无二的密码。

默认设置已经接受这个密码：会话既可以通过密码接受，也可以通过点击接受，两种密码类型也都允许使用。如果有人把批准模式改成了仅点击，或把密码类型改成了仅一次性密码，请改回 **只允许密码访问**（或 **允许密码或点击访问**）以及 **使用固定密码**（或 **同时使用两种密码**）。在集中管理的部署中，对应的[配置项](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/advanced-settings/#approve-mode)是 `approve-mode`（默认值 `password-click`）和 `verification-method`（默认值 `use-both-passwords`）。

[RustDesk 客户端文档](https://rustdesk.com/docs/zh-cn/client/)把这一步视为无人值守访问的核心。有一条规则值得强调：**不要沿用操作系统的登录密码。** 请为 RustDesk 单独设置一个高熵值的专用密码，这样一个凭据泄露时不会连累另一个。

## 第二步：安装为服务并开机启动

这是大家最容易漏掉的一步。便携版 `.exe` 或 `.app` 运行在用户会话之中，用户注销时就会停止；在 Windows 上，未提权时它也无法操作 UAC 安全桌面（[便携版提权](https://rustdesk.com/docs/zh-cn/client/windows/windows-portable-elevation/)适用于有人在场的支持）。要实现真正的无人值守，RustDesk 必须作为后台**系统服务**运行。

- 运行 RustDesk **安装程序**（而不是便携版）并完成安装。
- 在 **设置 → 常规** 中确认 **服务** 正在运行——如果显示已停止，点击 **启动**。安装完成后，服务会随机器自动启动。

RustDesk 以服务方式运行后，会在任何人登录之前加载，这正是你能连接到**登录界面**、远程完成身份验证，甚至在无人在场的情况下重启并重新连接的原因。macOS 和 Linux 还有各自的屏幕捕获和显示会话要求，见下文。

## 各平台注意事项

| 平台    | 操作                               | 注意事项                                                                                                                                          |
| ------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows | 安装；保持服务运行（随机器启动）   | 便携版 exe 在注销时停止，未提权时无法操作 UAC 提示；请使用安装程序                                                                                |
| macOS   | 安装、设置固定密码、授予权限       | 必须授予“屏幕录制”和“辅助功能”权限；登录界面的画面捕获需要安装辅助程序                                                                            |
| Linux   | 安装服务软件包                     | 标准构建版本在 Wayland 下捕获已登录的会话；[无人值守预览版](/zh-cn/blog/unattended-remote-access-wayland-zh-cn)增加了登录界面访问（x86_64 Debian/Ubuntu） |
| Android | 设置固定密码；启用屏幕捕获         | 屏幕必须保持唤醒；需授予屏幕捕获（MediaProjection）许可和输入权限                                                                                 |

### Windows

这是最简单的情况：安装、开启服务、设置固定密码，就完成了。由于服务在开机时运行，登录界面的无人值守访问以及跨重启的访问都能按预期工作。

### macOS

macOS 把屏幕捕获和输入控制放在权限之后。安装完成后，打开 **系统设置 → 隐私与安全性**，为 RustDesk 同时授予 **屏幕录制** 和 **辅助功能** 权限。若要在 _登录窗口_（即任何用户登录之前）访问，必须安装 RustDesk 的服务/辅助程序，让它能在登录前捕获画面——否则在登录窗口看到的会是黑屏，也就是[黑屏修复指南中介绍的捕获问题](/zh-cn/blog/rustdesk-connected-waiting-for-image-zh-cn)。

### Linux

安装 RustDesk，让其服务开机运行。标准 RustDesk 构建版本在已登录的会话中通过 PipeWire 和 `xdg-desktop-portal` 捕获 Wayland 桌面，自 1.4.3 起还支持多显示器。对于停留在登录欢迎界面的机器，另有面向 **x86_64 Debian/Ubuntu 系系统**的 [Wayland 无人值守预览版](/zh-cn/blog/unattended-remote-access-wayland-zh-cn)，增加了无人值守访问和重启后的登录界面访问。如果发行版仍提供 X11 登录欢迎界面，也可以选择它；无头主机则需加装仿真插头或配置虚拟显示器。详见 [RustDesk for Linux](/zh-cn/blog/rustdesk-for-linux-zh-cn)。

## 第三步：用预配置客户端批量部署

手动配置一台机器没问题，手动配置五十台就不行了。在 **Basic 及更高级别的自托管套餐**中，Web 控制台里的 **自定义客户端生成器**（Custom Client Generator）可以生成一个预先内置**服务器地址、公钥和相关设置**的安装程序，最终用户无需输入任何内容。配合你现有的部署工具（组策略、Intune、MSP 的 RMM 工具或 shell 脚本），每台设备首次运行时都会安装服务，并注册到 _你自己的_ 服务器。

这正是自托管为团队带来回报的地方：整个设备群都注册到你自己运行的 ID 服务器和中继服务器上（参见 [RustDesk 助力 MSP](/zh-cn/blog/rustdesk-for-msps-zh-cn)）。Server Pro 套餐按**登录用户和受管设备**授权。标准套餐包含无限并发连接；只有 [Customized V2](https://rustdesk.com/pricing#custom2) 按设定数量授权并发连接。请按机器数量和管理员人数来做预算——参见[什么算作受管设备](/zh-cn/blog/what-counts-as-a-managed-device-zh-cn)。请在反向代理之后[通过 HTTPS](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/faq/#手动设置-web-控制台的-https) 提供 Web 控制台。

## 安全加固

无人值守访问相当于给机器常开了一扇门，因此要认真对待凭据：

- **强度高且独一无二的固定密码**，并定期更换。
- 在受控设备上启用**连接双重认证**；在 Server Pro 上还可使用[访问控制](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/permissions/)，通过用户和设备组规则决定谁能访问哪些设备（用户组和设备组的权限可以叠加）。共享地址簿只用于整理条目，并不是访问边界。[控制角色](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/control-role/)限制技术人员在会话中能做什么。
- **自托管服务器**，让连接协调服务、中继、控制台和存储的管理数据运行在你选择的基础设施上。RustDesk 客户端和 RustDesk Server OSS（免费社区服务器）采用 AGPL 协议，其身份验证代码可以审查；Server Pro 是商业的专有自托管服务器软件。

## 真正由你掌控的无人值守访问

让全天候在线的设备群指向你自己运行的服务器，这些机器的常驻访问就由你自己的硬件来协调，而不是由你租用的云服务来协调。对于长期存在的访问通道，花一点时间完成设置、把这条路径握在自己手里，是值得的。
