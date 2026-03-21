---
title: Linux
weight: 4
description: "RustDesk 的Linux文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
---

## 应该使用哪个 Linux 包？

| 场景 | 最佳包格式 |
| --- | --- |
| Ubuntu 或 Debian 系发行版 | `.deb` |
| Fedora 或 CentOS 系发行版 | `.rpm` |
| Arch Linux 或 Manjaro | `.pkg.tar.zst` |
| openSUSE | SUSE 专用 `.rpm` |
| 便携单文件使用 | `AppImage` |
| 沙箱化桌面安装 | `Flatpak` |

## Linux 快速答案

- 优先使用与你的发行版匹配的原生软件包。
- 自 RustDesk `1.2.0` 起，Wayland 支持仍为实验性。
- 需要在登录界面远程访问时，仍应使用 X11。
- 如果 SELinux 为 enforcing 且出现 `avc: denied`，请按 RustDesk 的 SELinux 指南处理。

## 安装

### Ubuntu (≥ 18)

```sh
# 请忽略错误的磁盘使用报告
sudo apt install -fy ./rustdesk-<version>.deb
```

对于Ubuntu 18.04，请首先为[pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883)执行以下操作。
```sh
sudo apt install software-properties-common
sudo add-apt-repository ppa:pipewire-debian/pipewire-upstream
sudo apt update
```

### CentOS/Fedora (≥ 28)

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

### AppImage

```sh
# 对于Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# 对于Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~需要X11~~
~~RustDesk尚不支持Wayland；您需要手动切换到X11。~~

RustDesk从版本1.2.0开始具有实验性Wayland支持。

### 显示服务器

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### 登录屏幕

尚不支持使用Wayland的登录屏幕。如果您希望在重启或注销后使用RustDesk访问登录屏幕，您需要将登录屏幕更改为X11，请在`/etc/gdm/custom.conf`或`/etc/gdm3/custom.conf`中将以下行修改为`WaylandEnable=false`：

```ini
#WaylandEnable=false
```

{{% notice note %}}
请**重启**以使上述更改生效。
{{% /notice %}}

