---
publishDate: 2026-07-09T08:32:00Z
lang: 'zh-cn'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk for Linux：开源远程桌面工具'
excerpt: '在 Linux 上安装并运行 RustDesk：涵盖 .deb、.rpm、Flatpak 与 AppImage 安装包、X11 与 Wayland 对比、无头模式与无人值守访问，以及自建服务器。'
image: '~/assets/images/blog/rustdesk-for-linux-og.png'
category: '指南'
tags: ['RustDesk', 'Linux', '自托管']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-zh-cn'
faq:
  - question: 'RustDesk 支持 Wayland 吗？'
    answer: '是的——在所有远程桌面工具中，RustDesk 对 Wayland 的支持堪称最强之一，其中包括 1.4.3 版本新增的多显示器共享功能。在 Wayland 上，RustDesk 通过 PipeWire 和 XDG 桌面门户捕获屏幕，系统会弹出一个授权对话框让你选择要共享的显示器——多数情况下这个选择会被记住，因此不会每次都重复询问——并且捕获操作是在当前已登录的会话内进行的。这一授权步骤是 Wayland 的安全设计，所有屏幕共享类应用都要遵循。对于目前需要登录前访问或完全无人值守的机器，请使用无头虚拟显示器方案（或者在仍然提供 X11 会话的发行版上使用 X11，因为已有不少发行版正转向仅支持 Wayland）；完全无人值守的 Wayland 捕获功能目前正在积极开发中（参见 github.com/rustdesk/rustdesk/pull/15420）。'
  - question: '在 Linux 上应该安装哪种安装包？'
    answer: '在 Debian、Ubuntu 和 Linux Mint 上使用 .deb，在 Fedora、RHEL 和 openSUSE 上使用 .rpm，如果想要沙盒化且兼容性广泛的构建版本可以选择来自 Flathub 的 Flatpak，或者选择便携的单文件 AppImage 作为备用方案。.deb 和 .rpm 安装包会注册并启动 systemd 服务，因此 RustDesk 能在重启后依然运行；而 Flatpak 和 AppImage 默认不会这样做。'
  - question: '为什么我的无头 Linux 主机显示黑屏？'
    answer: '在没有连接显示器的情况下，X 或 Wayland 根本不会分配帧缓冲区，因此 RustDesk 没有内容可以捕获，你会看到黑屏或“等待图像”的提示。你可以接入虚拟显示器插头（dummy HDMI/DisplayPort），配置诸如 xserver-xorg-video-dummy 或 VKMS 之类的虚拟显示驱动，或者启用 RustDesk 内置的可选 Linux 无头模式，让系统自动为你创建一个虚拟显示器。'
  - question: '我可以在 Linux 上自建 RustDesk 服务器吗？'
    answer: '可以。RustDesk 服务器（包括 hbbs ID/信令服务和 hbbr 中继服务进程）是为 Linux 构建的，这也是运行它的标准方式。免费开源的社区服务器可以无限期免费运行，而 Server Pro 在此基础上增加了 Web 控制台、设备分组和自定义客户端生成器。两者都可以安装在普通的 Linux 虚拟机或裸机主机上。'
metadata:
  description: 'RustDesk 在 Linux 上的完整指南：涵盖各发行版与 ARM 开发板的安装包选择、Wayland 与 X11 屏幕捕获、无头模式配置，以及自建服务器。'
  keywords: 'RustDesk Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux 安装'
---

长期以来，Linux 用户在优秀远程桌面工具上的选择一直不多，现有的产品通常要么是闭源商业软件，要么是老旧的 VNC 技术栈。RustDesk 走的是一条不同的路：它是一款采用 AGPL 协议开源授权的开源远程桌面客户端，能够在所有主流发行版上原生运行，并且你可以将它指向自己搭建的服务器。正是这种组合——可审计的代码、原生 Linux 客户端，以及可自建的基础设施——让 RustDesk 成为人们寻找 Linux 开源远程桌面方案时最常被提及的答案之一。

本指南将介绍如何安装 RustDesk、几乎所有人都会踩中的那个坑（X11 与 Wayland 的区别）、如何让无人值守和无头访问顺利运行，以及服务器在其中扮演的角色。

## 在 Linux 上安装 RustDesk

RustDesk 为每一种常见的 Linux 打包格式都提供了安装包，因此你几乎不需要自行编译源码。可以从 [GitHub 上的 RustDesk 发布页面](https://github.com/rustdesk/rustdesk/releases)或 [Linux 安装文档](https://rustdesk.com/docs/en/client/linux/)获取最新版本，然后选择与你的发行版相匹配的格式。

| 格式     | 最适用于                      | 是否自动启动服务？ | 备注                                                                                                         |
| -------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `.deb`   | Debian、Ubuntu、Linux Mint    | 是（systemd）      | `sudo apt install ./rustdesk-*.deb`                                                                          |
| `.rpm`   | Fedora、RHEL/CentOS、openSUSE | 是（systemd）      | `sudo dnf install ./rustdesk-*.rpm`                                                                          |
| Flatpak  | 任意发行版，沙盒隔离          | 否                 | `flatpak install flathub com.rustdesk.RustDesk`（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)） |
| AppImage | 任意发行版，便携              | 否                 | 较新版本的 Ubuntu 上可能需要 `libfuse2`；先执行 `chmod +x` 再运行                                            |
| AUR      | Arch、Manjaro                 | 视具体软件包而定   | 社区维护（`rustdesk-bin`、`rustdesk-appimage`）                                                              |

如果你希望 RustDesk 以后台服务的形式运行，并且能在重启后依然存活，那么 `.deb` 和 `.rpm` 安装包是首选——两者都会自动注册并启动一个 systemd 服务单元。Flatpak（在 [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk) 上的 `com.rustdesk.RustDesk`）是一个沙盒化的构建版本，便于桌面日常使用，但默认不会安装系统服务。如果你的发行版没有 RustDesk 直接提供的安装包，建议优先选择 **Flatpak**——由于它自带运行时环境，兼容性通常是最广泛的。AppImage 是一种便携的单文件替代方案，但实际兼容性参差不齐（例如在较新版本的 Ubuntu 上可能需要 `libfuse2`）。

实际使用中，RustDesk 已被广泛应用于 Ubuntu、Debian、Fedora、RHEL/CentOS、openSUSE、Arch 和 NixOS 等发行版，并提供 **x86_64、ARM64（aarch64）和 ARM32（ARMv7）** 架构的构建版本——因此它不仅能运行在标准 PC 上，也能运行在各类 ARM 开发板和服务器上。

## X11 与 Wayland：关键的区别

这是在 Linux 上使用 RustDesk 时最需要理解的一点，因为它决定了远程控制能否立即“开箱即用”，还是需要先做一点小小的设置调整。

**X11（Xorg）：最直接的捕获路径，前提是你的发行版仍然提供它。** 在 X11 下，RustDesk 直接读取帧缓冲区并直接注入输入事件，因此屏幕捕获与鼠标/键盘控制都尽可能地直接，显示器的变化也能被动态检测到。许多显示管理器在登录界面的齿轮菜单中仍然提供“Xorg”/“X11”选项。不过要注意，已经有不少发行版正转向仅支持 Wayland，并逐步淘汰 X11 会话——因此应把 X11 视为“恰好可用时的便利选项”，而不是部署方案的设计基础。

**Wayland：可以说 RustDesk 在这方面拥有所有远程桌面工具中最强的支持。** RustDesk 自 1.2.0 版本起就支持 Wayland，并一直在持续扩展相关能力。由于 Wayland 合成器不允许直接访问帧缓冲区，RustDesk 通过 `xdg-desktop-portal` 服务和 [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) 捕获屏幕画面，并通过内核的 `uinput` 模块注入输入事件。由此产生了两个源自 Wayland 自身设计的结果——不仅 RustDesk 如此，所有 Wayland 屏幕共享工具都是这样：

- **每次连接都需要授权。** 门户（portal）会弹出对话框，要求你选择要共享哪个显示器。这是 Wayland 刻意设计的安全机制，而不是 RustDesk 的缺陷——后台应用无法在你不知情的情况下悄悄开始录制屏幕。Portal v4 及更高版本支持“恢复令牌”（restore token），因此不会每次都重复提示，但首次共享仍需要在屏幕上手动点击确认。
- **仅限已登录的会话。** Wayland 捕获与已登录的图形会话绑定。目前还不支持捕获 Wayland 的登录欢迎界面（login greeter）——该功能正在积极开发中（[PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)）。如果现在就需要登录前的访问能力，请使用下文的无头/虚拟显示器配置，或者在仍然提供 X11 会话的发行版上使用 X11。

Wayland 支持一直在持续改进——例如，RustDesk 1.4.3（2025 年 10 月）[为 Wayland 新增了多显示器共享功能](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)。但如果你连接后在 Wayland 主机上看到黑屏，几乎总是因为 portal/PipeWire 这条路径没有被正确满足。我们专门撰写的[RustDesk 已连接但一直等待图像](/zh-cn/blog/rustdesk-connected-waiting-for-image-zh-cn)一文详细讲解了 Wayland 黑屏的具体情况。

## Linux 上的无人值守访问

无人值守访问是指连接到一台没有人坐在跟前操作的机器——这是经典的远程支持场景。在 Linux 上，具体做法是：

1. 通过 `.deb` 或 `.rpm` 安装，以便注册 systemd 服务，或者在应用中点击**启用服务（Enable Service）**。
2. 在 RustDesk 的连接设置中设置一个强度足够的**永久密码**（最好同时启用双因素身份验证）。
3. 如果需要在用户登录之前或跨越登录会话进行访问，请使用下文的无头虚拟显示器配置（上文提到的 Wayland 登录界面限制在这里同样适用）。

有一点 Wayland 的现实情况需要提前规划：在正在开发中的无人值守支持正式上线之前，前文 Wayland 部分提到的基于授权确认的门户机制，会让完全无人值守的屏幕捕获比在 X11 上更难实现，因此对于完全无人值守的机器，建议提前规划使用无头虚拟显示器方案。

## 无头 Linux：没有显示器的服务器

一种非常常见的 Linux 使用场景是完全没有连接显示器的主机——比如家庭服务器、实验室机器或虚拟机。这里的问题并不出在 RustDesk 身上，而是出在图形栈上：没有插上显示器时，X 或 Wayland 根本不会分配帧缓冲区，因此实际上没有任何图像可供捕获，你看到的只会是黑屏。

有三种方法可以让系统有内容可渲染：

- **虚拟显示器插头（dummy plug）**——一种廉价的物理 HDMI/DisplayPort“无头”转接头，能让 GPU 误以为已经连接了显示器。
- **虚拟显示驱动**——在 X11 上使用 `xserver-xorg-video-dummy`，或者使用像 VKMS 这样的内核级方案。
- **RustDesk 内置的可选无头模式**——通过 `sudo rustdesk --option allow-linux-headless Y` 启用。根据 [Headless Linux Support wiki](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) 的说明，该模式默认关闭，主要在搭载 GNOME 的 Ubuntu 上测试过，并依赖 `xserver-xorg-video-dummy`、`lightdm` 等软件包。你可以用 `sudo rustdesk --get-id` 获取该机器的 ID，并用 `sudo rustdesk --password <password>` 设置密码。

无头模式目前还不够成熟，存在一些粗糙之处，因此应将其视为“可用，但需谨慎操作”的方案，而非开箱即用的成品。

## 在 Linux 上自建 RustDesk 服务器

以上介绍的都是 _客户端_ 层面的内容。RustDesk 在 Linux 上故事的另一半，是**服务端**——`hbbs` ID/信令（rendezvous）服务与 `hbbr` 中继服务——它是一个原生 Linux 应用程序，Linux 正是它的天然归宿。这也是为什么你可以把会话协商与中继流量都保留在自己拥有的基础设施上，而不必经由某个厂商的云端转发。

你有两种选择。免费开源的**社区服务器**可以无限期免费运行，涵盖核心的连接与中继功能。**RustDesk Server Pro** 在此基础上增加了自托管的 Web 控制台、设备分组、共享通讯录、自定义品牌客户端生成器，以及 [LDAP/Active Directory 与 OIDC 单点登录](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/ldap/)。你也完全不必被绑定在 Docker 上——关于纯虚拟机或裸机安装方式，可参见[不使用 Docker 运行 Server Pro](https://rustdesk.com/docs/zh-cn/self-host/rustdesk-server-pro/installscript/)一文。如果你正在为大规模设备群评估硬件配置，请在投入前，根据你实际的并发连接数与中继流量情况来规划容量。

关于自建服务器有一点需要说明：无论是免费的社区服务器还是 Server Pro，运行、打补丁和安全维护的责任都在你自己手中。硬件要求很低，一旦搭建完成，后续维护工作也很轻松——如果遇到问题，RustDesk 支持团队也可以提供帮助。这种自主掌控正是自建服务器的意义所在。（此外，Server Pro 的许可证在激活以及后续维持授权有效期间，也需要能够访问 rustdesk.com 的出站网络连接。）

## 开始使用

为你的发行版安装相应的软件包，设置一个用于无人值守访问的永久密码——如果你关注的是数据主权，那么不妨搭建免费的社区服务器。关于当前套餐详情，请以 [rustdesk.com/pricing](https://rustdesk.com/pricing) 为准，如需深入了解 Server Pro，可联系 [sales@rustdesk.com](mailto:sales@rustdesk.com)。想先看看实际效果？欢迎查看RustDesk 实战演示。
