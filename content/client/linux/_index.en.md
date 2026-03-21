---
title: Linux
description: "Install RustDesk on Linux distributions including Ubuntu, Fedora, CentOS, Arch, openSUSE, and NixOS. Review Wayland notes, AppImage and Flatpak options, and SELinux troubleshooting."
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
weight: 4
---

Use this Linux guide to install RustDesk on major distributions, review Wayland and login-screen limitations, and troubleshoot common permission issues such as SELinux policy blocks.

## Which Linux package should you use?

| Situation | Best package |
| --- | --- |
| Ubuntu or Debian-based systems | `.deb` |
| Fedora or CentOS-based systems | `.rpm` |
| Arch Linux or Manjaro | `.pkg.tar.zst` |
| openSUSE | SUSE-specific `.rpm` |
| Portable single-file usage | `AppImage` |
| Sandboxed desktop install | `Flatpak` |

## Linux quick answers

- Use the native package for your distribution when possible.
- Wayland support is experimental since RustDesk `1.2.0`.
- Remote access to the login screen still requires X11.
- If SELinux is enforced and you see `avc: denied`, apply the RustDesk SELinux policy guidance.

## Installation

### Ubuntu (≥ 18)

```sh
# please ignore the wrong disk usage report
sudo apt install -fy ./rustdesk-<version>.deb
```

For Ubuntu 18.04, please do below first for [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# For Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# For Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 Required~~
~~RustDesk does not support Wayland yet; you need switch to X11 manually.~~

RustDesk now has experimental Wayland support since version 1.2.0.

### Display Server

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Login Screen

Login screen using Wayland is not supported yet. If you wanna access login screen after reboot or logout with RustDesk, you need to change login screen to X11, please modify below line to `WaylandEnable=false` in `/etc/gdm/custom.conf` or `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Please **reboot** to make above changes taking effect.
{{% /notice %}}

