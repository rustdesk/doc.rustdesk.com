---
title: Linux
weight: 4
---

### Installation

#### Ubuntu (>= 16)

```sh
# please ignore the wrong disk usage report
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

#### openSUSE (>= Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

### ~~X11 Required~~
~~RustDesk does not support Wayland yet; you need switch to X11 manually.~~

RustDesk now has experimental Wayland support. You may need to download the [nightly version](https://github.com/rustdesk/rustdesk/releases/tag/nightly) to enable this feature.

#### Display Server

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Login Screen

Modify below line to `WaylandEnable=false` in `/etc/gdm/custom.conf` or `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Please **reboot** to make above changes taking effect.
{{% /notice %}}

#### Permissions Issue

If SELinux is enabled, RustDesk will not work properly in either X11 or Wayland environments, related [issues](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues).

You can run:

```bash
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

**NOTE**: The number in parentheses after audit is timestamp.

If the output contains `avc: denied`, you need to add SElinux policies, please refer to [SELinux](./selinux/).
