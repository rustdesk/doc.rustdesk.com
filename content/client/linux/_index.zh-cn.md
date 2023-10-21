---
title: Linux 
weight: 4
---

### 安装

#### Ubuntu (>= 16)

```bash
# 请忽略磁盘错误使用报告
sudo apt install -fy ./rustdesk-<version>.deb
```

#### CentOS/Fedora (>= 18)

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

~~RustDesk 尚未支持 Wayland; 您需要手动切换到 X11。~~

RustDesk 现在有实验性的 Wayland 支持，您可能需要下载 [nightly version](https://github.com/rustdesk/rustdesk/releases/tag/nightly) 来启用这一特性。

#### 显示服务器

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) |
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) |
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### 登陆屏幕

在 `/etc/gdm/custom.conf` 或 `/etc/gdm3/custom.conf` 中，将如下的该行更改为 `WaylandEnable=false`：

```ini
#WaylandEnable=false
```

{{% notice note %}}
请**重新启动**来使上述变更生效
{{% /notice %}}


#### 权限问题

如果启用了 SELinux ，那么无论是 X11 环境 还是 Wayland 环境， RustDesk 都无法正常工作。

您可以运行如下命令：

```bash
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

如果有 `avc: denied` 的输出，则需要添加 SElinux 策略，请参考[SELinux](./selinux/)。
