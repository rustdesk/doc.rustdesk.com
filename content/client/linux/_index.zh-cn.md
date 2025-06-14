---
title: Linux
weight: 4
---

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

### 权限问题

如果启用了SELinux，RustDesk在X11或Wayland环境中都无法正常工作，相关[问题](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues)。

您可以运行：

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
`audit`后括号中的数字是时间戳。
{{% /notice %}}

如果输出包含`avc: denied`，您需要添加SELinux策略，请参阅[SELinux](https://rustdesk.com/docs/en/client/linux/selinux/)。