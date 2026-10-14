---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk for Linux：开源远程桌面工具'
excerpt: '在 Linux 上安装并运行 RustDesk：涵盖 .deb、.rpm、Flatpak 与 AppImage 安装包、X11 与 Wayland 对比、无头模式与无人值守访问，以及自建服务器。'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: '指南'
tags: ['RustDesk', 'Linux', '自托管']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-zh-cn'
faq:
  - question: 'RustDesk 支持 Wayland 吗？'
    answer: '支持。RustDesk 标准构建版本在已登录的会话中通过 PipeWire 和 xdg-desktop-portal 捕获 Wayland 桌面，自 1.4.3 版本起支持多显示器。portal 会请求屏幕共享授权，portal v4 及更高版本可以记住这一选择。另有独立的预览版，增加了无人值守访问和重启后的登录界面访问，面向 x86_64 的 Debian/Ubuntu 系系统。'
  - question: '在 Linux 上应该安装哪种安装包？'
    answer: '在 Debian、Ubuntu 和 Linux Mint 上使用 .deb，在 Fedora、RHEL 和 openSUSE 上使用 .rpm；如果想要沙盒化且兼容性广泛的构建版本，可以选择来自 Flathub 的 Flatpak；也可以把便携的单文件 AppImage 作为备用方案。.deb 和 .rpm 安装包会注册并启动 systemd 服务，因此 RustDesk 在重启后依然运行；Flatpak 和 AppImage 默认不会这样做。'
  - question: '为什么我的无头 Linux 主机显示黑屏？'
    answer: '通常是因为这台无头 Linux 主机没有可供 RustDesk 捕获的活动显示输出。没有连接显示器时，图形栈往往不会暴露任何输出，因此会话虽然能连上，却只显示黑屏或“等待画面传输”的提示。接入 HDMI 或 DisplayPort 显示器模拟插头，或在 X11 上配置 xserver-xorg-video-dummy 等虚拟显示器，然后重新连接。'
  - question: '我可以在 Linux 上自建 RustDesk 服务器吗？'
    answer: '可以。RustDesk 服务器（hbbs ID/连接协调进程和 hbbr 中继进程）是为 Linux 构建的，在 Linux 上运行也是标准做法。RustDesk Server OSS（免费社区服务器）没有许可费，也不会到期，Server Pro 则在此基础上增加了 Web 控制台、设备组和自定义客户端生成器。两者都可以安装在普通的 Linux 虚拟机或裸机主机上。'
metadata:
  description: 'RustDesk 在 Linux 上的完整指南：涵盖各发行版与 ARM 开发板的安装包选择、Wayland 与 X11 屏幕捕获、无头模式配置，以及自建服务器。'
  keywords: 'RustDesk Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux 安装'
---

RustDesk 是一款面向 Linux 的开源远程桌面。它的客户端和 RustDesk Server OSS（免费社区服务器）采用 AGPL 许可证，原生安装包覆盖各主流发行版，你还可以让每个客户端都指向你自己托管的 ID/连接协调服务和中继服务。Server Pro 是商业的专有自托管服务器软件，在此基础上增加了 Web 控制台和集中管理功能。可审计的代码、原生 Linux 客户端和可自托管的基础设施，正是人们寻找 Linux 开源远程桌面时 RustDesk 常被推荐的原因。

本指南将介绍如何安装 RustDesk、几乎所有人都会踩中的那个坑（X11 与 Wayland 的区别）、如何让无人值守和无头访问顺利运行，以及服务器在其中扮演的角色。

## 在 Linux 上安装 RustDesk

RustDesk 为每一种常见的 Linux 打包格式都提供了安装包，因此你几乎不需要自行编译源码。可以从 [GitHub 上的 RustDesk 发布页面](https://github.com/rustdesk/rustdesk/releases)或 [Linux 安装文档](https://rustdesk.com/docs/zh-cn/client/linux/)获取最新版本，然后选择与你的发行版相匹配的格式。

| 格式     | 最适用于                      | 是否自动启动服务？ | 备注                                                                                                         |
| -------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `.deb`   | Debian、Ubuntu、Linux Mint    | 是（systemd）      | `sudo apt install ./rustdesk-*.deb`                                                                          |
| `.rpm`   | Fedora、RHEL/CentOS、openSUSE | 是（systemd）      | `sudo dnf install ./rustdesk-*.rpm`                                                                          |
| Flatpak  | 任意发行版，沙盒隔离          | 否                 | `flatpak install flathub com.rustdesk.RustDesk`（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)） |
| AppImage | 任意发行版，便携              | 否                 | 较新版本的 Ubuntu 上可能需要 `libfuse2`；先执行 `chmod +x` 再运行                                            |
| AUR      | Arch、Manjaro                 | 视具体软件包而定   | 社区维护（`rustdesk-bin`、`rustdesk-appimage`）                                                              |

如果你希望 RustDesk 以后台服务的形式运行，并且能在重启后依然存活，那么 `.deb` 和 `.rpm` 安装包是首选——两者都会自动注册并启动一个 systemd 服务单元。Flatpak（在 [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk) 上的 `com.rustdesk.RustDesk`）是一个沙盒化的构建版本，便于桌面日常使用，但默认不会安装系统服务。如果你的发行版没有 RustDesk 直接提供的安装包，建议优先选择 **Flatpak**——由于它自带运行时环境，兼容性通常最为广泛。AppImage 是一种便携的单文件替代方案，但实际兼容性参差不齐（例如在较新版本的 Ubuntu 上可能需要 `libfuse2`）。

实际使用中，RustDesk 已被广泛应用于 Ubuntu、Debian、Fedora、RHEL/CentOS、openSUSE、Arch 和 NixOS 等发行版，并提供 **x86_64、ARM64（aarch64）和 ARM32（ARMv7）** 架构的构建版本——因此它不仅能运行在标准 PC 上，也能运行在各类 ARM 开发板和服务器上。

## X11 与 Wayland：关键的区别

这是在 Linux 上使用 RustDesk 时最需要理解的一点，因为它决定了远程控制能否立即“开箱即用”，还是需要先做一点小小的设置调整。

**X11（Xorg）：最直接的捕获路径，前提是你的发行版仍然提供它。** 在 X11 下，RustDesk 直接读取帧缓冲区并直接注入输入事件，因此屏幕捕获与鼠标/键盘控制都尽可能地直接，显示器的变化也能被动态检测到。许多显示管理器在登录界面的齿轮菜单中仍然提供“Xorg”/“X11”选项。不过要注意，已经有不少发行版正转向仅支持 Wayland，并逐步淘汰 X11 会话——因此应把 X11 视为“恰好可用时的便利选项”，而不是部署方案的设计基础。

**Wayland：标准构建版本即可支持，另有面向无人值守访问的预览版。** 由于 Wayland 合成器不允许直接访问帧缓冲区，RustDesk 标准构建版本在已登录的会话中通过 `xdg-desktop-portal` 和 [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) 捕获屏幕，并通过内核的 `uinput` 模块注入输入。RustDesk 1.4.3（2025 年 10 月）[为 Wayland 新增了多显示器共享](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)。独立的 [Wayland 无人值守预览版](/zh-cn/blog/unattended-remote-access-wayland-zh-cn)增加了无人值守访问和重启后的登录界面访问，面向 **x86_64 的 Debian/Ubuntu 系系统**。

- **开始共享时需要授权。** portal 会弹出对话框，询问要共享哪个显示器。这是 Wayland 的安全特性，而不是 RustDesk 的缺陷：后台应用无法在你不知情的情况下悄悄开始录制屏幕。Portal v4 及更高版本支持“恢复令牌”（restore token），因此不会每次连接都重复提示。
- **登录界面访问。** 标准构建版本捕获的是已登录的会话。如需在重启后访问登录欢迎界面，请在 x86_64 的 Debian/Ubuntu 系系统上使用无人值守预览版，或在发行版仍提供的情况下使用 X11 登录欢迎界面。

如果你用标准构建版本连接 Wayland 主机后看到黑屏，通常是 portal/PipeWire 这条路径的条件没有满足：授权提示没有被接受，或者 `xdg-desktop-portal` 或 PipeWire 没有运行。我们的 [RustDesk 显示“已连接，等待图像”修复指南](/zh-cn/blog/rustdesk-connected-waiting-for-image-zh-cn)详细讲解了 Wayland 的情况。

## Linux 上的无人值守访问

无人值守访问是指连接到一台没有人坐在跟前操作的机器——这是经典的远程支持场景。在 Linux 上，具体做法是：

1. 通过 `.deb` 或 `.rpm` 安装，以便注册 systemd 服务，或者在应用中点击**允许服务**（Enable Service）。
2. 在 **设置 → 安全** 中设置一个强度足够的**固定密码**。默认的审批模式已经接受固定密码；如需第二重验证，可启用受控设备连接 2FA。参见[无人值守访问设置指南](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn)。
3. 如需在 Wayland 上于登录前访问，请在 x86_64 的 Debian/Ubuntu 系系统上使用 [Wayland 无人值守预览版](/zh-cn/blog/unattended-remote-access-wayland-zh-cn)，或在支持的情况下将显示管理器的登录欢迎界面配置为使用 X11。仅选择 X11 桌面会话，只会影响登录后的会话。

## 无头 Linux：没有显示器的服务器

一种常见的 Linux 使用场景是完全没有连接显示器的主机：家庭服务器、实验室机器或虚拟机。没有显示器时，图形栈往往不会暴露任何活动输出，因此没有图像可供捕获，你看到的只会是黑屏。

有两种方法可以让系统有内容可渲染：

- **显示器模拟插头（dummy plug）**——一种廉价的物理 HDMI/DisplayPort“无头”转接头，能让 GPU 误以为已经连接了显示器。
- **虚拟显示驱动**——在 X11 上使用 `xserver-xorg-video-dummy`，或者使用像 VKMS 这样的内核级方案。

## 在 Linux 上自建 RustDesk 服务器

以上介绍的都是*客户端*。RustDesk 在 Linux 上的另一半故事是**服务器**——`hbbs` ID/连接协调服务和 `hbbr` 中继——它是原生 Linux 应用程序，Linux 正是它的天然归宿。正因如此，你可以把会话协调和中继流量保留在自己拥有的基础设施上，而不必经由厂商的云端。

你有两种选择。**Server OSS** 免费，没有许可费，也不会到期，涵盖核心的连接与中继功能。**RustDesk Server Pro** 增加了自托管的 Web 控制台、设备组和共享通讯录，并从 Basic 套餐起提供自定义品牌客户端生成器和 [LDAP/Active Directory 与 OIDC 单点登录](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/ldap/)。你也不必被绑定在 Docker 上——关于纯虚拟机或裸机安装，请参见[不使用 Docker 运行 Server Pro](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/)。

关于自托管有一点需要说明：Server OSS 和 Server Pro 的运行、打补丁和安全维护都由你负责。[硬件要求非常低](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-oss/install/)（一台基础云服务器甚至一块 Raspberry Pi 就能运行 Server OSS）；请按在线设备数和中继流量规划容量，并指定专人负责更新、监控和备份。付费套餐包含技术支持。（Server Pro 还会大约每天一次通过出站 HTTPS 检查许可证，因此需要能够访问 rustdesk.com。）

## 开始使用

安装适合你发行版的软件包，为无人值守访问设置固定密码；如果你是为了数据主权而来，就部署一台 Server OSS。当前套餐详情以 [rustdesk.com/pricing](https://rustdesk.com/pricing) 为准，[sales@rustdesk.com](mailto:sales@rustdesk.com) 可以与你详细沟通 Server Pro。想先看看实际效果？[观看 RustDesk 实战演示](https://www.youtube.com/@rustdesk)。
