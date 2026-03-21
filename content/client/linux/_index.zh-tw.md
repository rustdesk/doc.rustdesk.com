---
title: Linux
weight: 4
description: "RustDesk 的Linux文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
---

## 應該使用哪個 Linux 套件？

| 情境 | 最佳套件格式 |
| --- | --- |
| Ubuntu 或 Debian 系發行版 | `.deb` |
| Fedora 或 CentOS 系發行版 | `.rpm` |
| Arch Linux 或 Manjaro | `.pkg.tar.zst` |
| openSUSE | SUSE 專用 `.rpm` |
| 單檔可攜使用 | `AppImage` |
| 沙箱化桌面安裝 | `Flatpak` |

## Linux 快速答案

- 盡量優先使用與發行版相符的原生套件。
- 自 RustDesk `1.2.0` 起，Wayland 支援仍屬實驗性。
- 若要在登入畫面進行遠端存取，仍應使用 X11。
- 如果 SELinux 為 enforcing 且出現 `avc: denied`，請依 RustDesk 的 SELinux 指南處理。

## 安裝

### Ubuntu (≥ 18)

```sh
# 請忽略錯誤的磁碟使用報告
sudo apt install -fy ./rustdesk-<version>.deb
```

對於Ubuntu 18.04，請首先為[pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883)執行以下操作。
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
# 對於Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# 對於Ubuntu
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
~~RustDesk尚不支援Wayland；您需要手動切換到X11。~~

RustDesk從版本1.2.0開始具有實驗性Wayland支援。

### 顯示伺服器

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### 登入畫面

尚不支援使用Wayland的登入畫面。如果您希望在重啟或登出後使用RustDesk存取登入畫面，您需要將登入畫面更改為X11，請在`/etc/gdm/custom.conf`或`/etc/gdm3/custom.conf`中將以下行修改為`WaylandEnable=false`：

```ini
#WaylandEnable=false
```

{{% notice note %}}
請**重啟**以使上述更改生效。
{{% /notice %}}

