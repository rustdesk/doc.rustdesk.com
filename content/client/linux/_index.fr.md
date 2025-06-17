---
title: Linux 
weight: 4
---

## Installation

### Ubuntu (≥ 18)

```sh
# veuillez ignorer le rapport d'utilisation du disque erroné
sudo apt install -fy ./rustdesk-<version>.deb
```

Pour Ubuntu 18.04, veuillez d'abord faire ce qui suit pour [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# Pour Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Pour Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 requis~~
~~RustDesk ne prend pas encore en charge Wayland ; vous devez passer manuellement à X11.~~

RustDesk dispose désormais d'une prise en charge expérimentale de Wayland depuis la version 1.2.0.

### Serveur d'affichage

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Écran de connexion

L'écran de connexion utilisant Wayland n'est pas encore pris en charge. Si vous souhaitez accéder à l'écran de connexion après le redémarrage ou la déconnexion avec RustDesk, vous devez changer l'écran de connexion en X11, veuillez modifier la ligne ci-dessous en `WaylandEnable=false` dans `/etc/gdm/custom.conf` ou `/etc/gdm3/custom.conf` :

```ini
#WaylandEnable=false
```

{{% notice note %}}
Veuillez **redémarrer** pour que les modifications ci-dessus prennent effet.
{{% /notice %}}

### Problèmes de permissions

Si SELinux est activé, RustDesk ne fonctionnera pas correctement dans les environnements X11 ou Wayland, [problèmes](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues) connexes.

Vous pouvez exécuter :

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
Le nombre entre parenthèses après `audit` est l'horodatage.
{{% /notice %}}

Si la sortie contient `avc: denied`, vous devez ajouter des politiques SELinux, veuillez vous référer à [SELinux](https://rustdesk.com/docs/fr/client/linux/selinux/).