---
title: Linux
weight: 4
---

## Instalare

### Ubuntu (≥ 18)

```sh
# vă rugăm să ignorați raportul incorect de utilizare a discului
sudo apt install -fy ./rustdesk-<version>.deb
```

Pentru Ubuntu 18.04, rulați mai întâi pașii de mai jos pentru [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# Pentru Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Pentru Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 necesar~~
~~RustDesk nu acceptă încă Wayland; trebuie să treceți manual la X11.~~

RustDesk are acum suport experimental pentru Wayland începând cu versiunea 1.2.0.

### Server de afișare

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Ecranul de autentificare

Ecranul de autentificare folosind Wayland nu este încă acceptat. Dacă doriți să accesați ecranul de autentificare după repornire sau deconectare cu RustDesk, trebuie să schimbați ecranul de autentificare la X11; modificați linia de mai jos în `WaylandEnable=false` în `/etc/gdm/custom.conf` sau `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Vă rugăm **reporniți** sistemul pentru ca modificările de mai sus să aibă efect.
{{% /notice %}}

### Probleme de permisiuni

Dacă SELinux este activat, RustDesk nu va funcționa corect nici în medii X11, nici în Wayland; vedeți problemele relevante în repo.

Puteți rula:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
Numărul între paranteze după `audit` este un timestamp.
{{% /notice %}}

Dacă ieșirea conține `avc: denied`, trebuie să adăugați politici SELinux; consultați pagina [SELinux](https://rustdesk.com/docs/en/client/linux/selinux/).