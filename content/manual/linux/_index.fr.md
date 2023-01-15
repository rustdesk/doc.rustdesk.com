---
title: Linux 
weight: 4
---


### Installation

#### Ubuntu (>= 16)

```bash
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

### X11 nécessaire

RustDesk ne prend pas encore en charge wayland ; vous devez passer manuellement à X11.

#### Serveur d'affichage

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Écran de connexion

Modifiez la ligne ci-dessous en `WaylandEnable=false` dans `/etc/gdm/custom.conf` ou `/etc/gdm3/custom.conf` :

```ini
#WaylandEnable=false
```

{{% notice note %}}
Veuillez **redémarrer** pour que les modifications ci-dessus prennent effet
{{% /notice %}}
