---
title: Linux 
weight: 4
---

### Installatie

#### Ubuntu (>= 16)

```bash
# please ignore the wrong disk usage report
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

### X11 Vereist

RustDesk ondersteunt wayland nog niet; u moet handmatig overschakelen naar X11.

#### Toon Server

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Login Scherm

Wijzig onderstaande regel in `WaylandEnable=false` in `/etc/gdm/custom.conf` of `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
**herstart** om bovenstaande wijzigingen in werking te laten treden
{{% /notice %}}
