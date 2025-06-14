---
title: Linux
weight: 4
---

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

### 權限問題

如果啟用了SELinux，RustDesk在X11或Wayland環境中都無法正常工作，相關[問題](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues)。

您可以執行：

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
`audit`後括號中的數字是時間戳記。
{{% /notice %}}

如果輸出包含`avc: denied`，您需要新增SELinux策略，請參閱[SELinux](https://rustdesk.com/docs/en/client/linux/selinux/)。