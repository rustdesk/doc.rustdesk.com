---
title: Linux
weight: 4
---

## Installation

### Ubuntu (≥ 18)

```sh
# Bitte ignorieren Sie den falschen Bericht zur Festplattennutzung
sudo apt install -fy ./rustdesk-<version>.deb
```

Für Ubuntu 18.04 führen Sie bitte zuerst die folgenden Schritte für [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883) aus.
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
# Für Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Für Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 erforderlich~~
~~RustDesk unterstützt Wayland noch nicht; Sie müssen manuell zu X11 wechseln.~~

RustDesk unterstützt Wayland experimentell seit Version 1.2.0.

### Server anzeigen

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Anmeldebildschirm

Der Anmeldebildschirm mit Wayland wird noch nicht unterstützt. Wenn Sie nach dem Neustart oder Abmelden mit RustDesk auf den Anmeldebildschirm zugreifen möchten, müssen Sie den Anmeldebildschirm auf X11 ändern. Bitte ändern Sie die folgende Zeile in `/etc/gdm/custom.conf` oder `/etc/gdm3/custom.conf` zu `WaylandEnable=false`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Bitte **neu starten**, damit die oben genannten Änderungen wirksam werden.
{{% /notice %}}

### Berechtigungsproblem

Wenn SELinux aktiviert ist, funktioniert RustDesk weder in X11- noch in Wayland-Umgebungen ordnungsgemäß, siehe zugehörige [Probleme](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues).

Sie können ausführen:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
Die Zahl in Klammern hinter `audit` ist der Zeitstempel.
{{% /notice %}}

Wenn die Ausgabe `avc: denied` enthält, müssen Sie SELinux-Richtlinien hinzufügen, siehe [SELinux](https://rustdesk.com/docs/de/client/linux/selinux/).
