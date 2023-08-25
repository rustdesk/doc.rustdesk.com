---
title: Linux
weight: 4
---

### Kurulum

#### Ubuntu (>= 16)

```bash
# Lütfen yanlış disk kullanım raporunu görmezden gelin
sudo apt install -fy ./rustdesk-<sürüm>.deb
```

#### CentOS/Fedora (>= 18)

```sh
sudo yum localinstall ./rustdesk-<sürüm>.rpm
```

#### Arch/Manjaro

```sh
sudo pacman -U ./rustdesk-<sürüm>.pkg.tar.zst
```

#### Opensuse (>= Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<sürüm>-suse.rpm
```

### ~~X11 Gereklidir~~
~~RustDesk henüz Wayland'ı desteklemiyor; manuel olarak X11'e geçiş yapmanız gerekiyor.~~

RustDesk artık deneysel Wayland desteğine sahip. Bu özelliği etkinleştirmek için [gece yıllık sürümünü](https://github.com/rustdesk/rustdesk/releases/tag/nightly) indirmeniz gerekebilir.

#### Ekran Sunucusu

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Giriş Ekranı

Aşağıdaki satırı `/etc/gdm/custom.conf` veya `/etc/gdm3/custom.conf` içinde `WaylandEnable=false` olarak değiştirin:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Yukarıdaki değişikliklerin etkili olması için lütfen **yeniden başlatın**
{{% /notice %}}
