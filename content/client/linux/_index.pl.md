---
title: Linux
weight: 4
---

## Instalacja

### Ubuntu (≥ 18)

```sh
# zignoruj błędny raport o zużyciu miejsca na dysku
sudo apt install -fy ./rustdesk-<version>.deb
```

Dla Ubuntu 18.04 wykonaj poniższe polecenia w celu konfiguracji [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# Dla Fedory
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Dla Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 jest wymagany~~
~~RustDesk jeszcze nie wspiera Waylanda; musisz ręcznie przełączyć się na X11.~~

RustDesk ma eksperymentalne wsparcie Waylanda od wersji 1.2.0.

### Serwer wyświetlania

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Ekran logowania

Obsługa ekranów logowania przy użyciu Waylanda nie jest jeszcze wspierana. Jeżeli potrzebujesz ich obsługi (po ponownym uruchomieniu albo wylogowaniu przez RustDesk), musisz zmienić ekran logowania na X11. Musisz zmienić poniższą linię na `WaylandEnable=false` w `/etc/gdm/custom.conf` lub `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
**Uruchom ponownie** system aby powyższe zmiany weszły w życie.
{{% /notice %}}

### Problemy z uprawnieniami

Jeżeli SELinux jest włączony, RustDesk nie będzie poprawnie działał ani w środowiskach X11, ani Waylandowych. Powiązane zgłoszenia znajdziesz [tutaj](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues).

Możesz wykonać:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
Numer w nawiasach po `audit` to znacznik czasu.
{{% /notice %}}

Jeżeli wyjście zawiera `avc: denied`, konieczne jest utworzenie odpowiednich polityk SELinux. Zobacz [SELinux](https://rustdesk.com/docs/en/client/linux/selinux/).
