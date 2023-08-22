---
title: Linux
weight: 4
---

### 安裝

#### Ubuntu (>= 16)

```bash
# 請忽略磁碟使用錯誤回報
sudo apt install -fy ./rustdesk-<version>.deb
```

#### CentOS/Fedora (>=18)

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### Opensuse (>= Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

### ~~需要 X11~~
~~RustDesk 尚未支援 wayland；您需要手動切換至 X11。~~

RustDesk 現已支援 Wayland (測試中)，您可能需要下載 Nightly 版來啟用此功能。

#### 顯示伺服器

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) |
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) |
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### 登入畫面

在 `/etc/gdm/custom.conf` 或 `/etc/gdm3/custom.conf` 中，將該行更改為 `WaylandEnable=false`：

```ini
#WaylandEnable=false
```

{{% notice note %}}
請**重新啟動**以套用上述變更
{{% /notice %}}
