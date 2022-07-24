---
title: Linux 
weight: 4
---

### Telepítés

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

### X11-re szükség van

A RustDesk nem támogatja a waylanded még; X11-re kell váltanod manuálisan.

#### Display Szerver

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Belépő screen

Módosítsd a következő config opciót a `/etc/gdm/custom.conf` fájlban, vagy a `/etc/gdm3/custom.conf` configban:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Kérlek **indíts újra** a masinádat hogy a fenti változások érvénybe lépjenek.
{{% /notice %}}
