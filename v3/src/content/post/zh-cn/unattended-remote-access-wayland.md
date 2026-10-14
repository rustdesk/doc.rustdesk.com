---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-cn'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'RustDesk Wayland 预览版：无人值守访问与登录界面访问'
excerpt: '面向 x86_64 Debian/Ubuntu 系系统的 RustDesk 预览版带来 Wayland 无人值守访问，支持多显示器以及重启后的登录界面。'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: '发布'
tags: ['RustDesk', 'Wayland', 'Linux', '无人值守访问']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-zh-cn'

metadata:
  description: '试用面向 x86_64 Debian/Ubuntu 系系统的 RustDesk Wayland 预览版：跨多个显示器的无人值守访问，以及重启后在登录界面即可连接。'
  keywords: 'RustDesk Wayland, Wayland 无人值守访问, Wayland 远程桌面, Linux 远程桌面 Wayland, RustDesk Linux, 无人值守远程访问'
---

Wayland 支持一直是 Linux 远程桌面中较难解决的部分之一。

RustDesk 标准构建版本已经可以在已登录的会话中，通过 PipeWire 和 `xdg-desktop-portal` 捕获 Wayland 桌面，自 1.4.3 版本起还支持多显示器。全新的**面向 x86_64 Debian/Ubuntu 系系统的 RustDesk Wayland 预览版**带来了**Wayland 上真正的无人值守访问**：完成初始设置后，远程电脑旁无需有人批准每次会话。**多显示器配置在无人值守会话中同样可用。**

即使没有人登录，你也可以连接——包括重启后的**登录界面**。

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">在 X 上观看演示视频</a></blockquote>
</div>
<script data-astro-rerun>
(function () {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  } else if (!document.getElementById('twitter-wjs')) {
    var s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(s);
  }
})();
</script>

目前，我们以独立预览版的形式发布这一功能，适用于 **x86_64 的 Debian/Ubuntu 系系统**：

**[下载 Wayland 无人值守访问版本](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

作为对比，[AnyDesk 的文档说明 Linux 接收入站连接需要 Xorg](https://support.anydesk.com/anydesk-for-linux-raspberry-pi)，而 [TeamViewer 将其 Wayland 支持描述为实验性功能](https://community.teamviewer.com/English/discussion/122410)。

在将其设为默认方式之前，我们希望获得更多真实环境的测试反馈。

待实现稳定后，我们计划将 Wayland 无人值守访问带到更多 Linux 发行版，包括 **Fedora 和 Arch Linux**，并最终纳入 RustDesk 的标准版本。

如果你在使用 Wayland，尤其是多显示器环境，欢迎试用这个预览版，并告诉我们哪些功能正常、哪些还有问题。建议重点检查：重启后在任何人登录之前进行连接、注销后重新连接，以及逐一选择每个显示器。反馈时请注明你的发行版、桌面环境、显示管理器和构建版本，并在这些检查通过之前保留现有的访问方式。

## 相关阅读

- [RustDesk for Linux](/zh-cn/blog/rustdesk-for-linux-zh-cn)
- [RustDesk 无人值守访问](/zh-cn/blog/rustdesk-unattended-access-setup-zh-cn)
- [RustDesk 对比 AnyDesk](/zh-cn/blog/rustdesk-vs-anydesk-zh-cn)
- [RustDesk 对比 TeamViewer](/zh-cn/blog/rustdesk-vs-teamviewer-zh-cn)
- [Wayland 屏幕捕获实现（DRM/KMS）](https://github.com/rustdesk/rustdesk/pull/15420)
