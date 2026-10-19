---
title: Linux
description: "Ubuntu, Fedora, CentOS, Arch, openSUSE ve NixOS dahil Linux dağıtımlarına RustDesk kurun. Wayland notlarını, AppImage/Flatpak seçeneklerini ve SELinux ayarlarını inceleyin."
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
weight: 4
---

Bu Linux kılavuzunu kullanarak başlıca dağıtımlara RustDesk kurabilir, Wayland ve giriş ekranı (login screen) sınırlamalarını inceleyebilir ve SELinux gibi yaygın izin sorunlarını giderebilirsiniz.

{{% notice note %}}
Ayrıca genel bakış kılavuzuna bakın: [Linux için RustDesk](https://rustdesk.com/blog/rustdesk-for-linux).
{{% /notice %}}

## Hangi Linux paketini kullanmalısınız?

| Durum | En İyi Paket |
| --- | --- |
| Ubuntu veya Debian tabanlı sistemler | `.deb` |
| Fedora veya CentOS tabanlı sistemler | `.rpm` |
| Arch Linux veya Manjaro | `.pkg.tar.zst` |
| openSUSE | SUSE'ye özel `.rpm` |
| Taşınabilir tek dosya kullanımı | `AppImage` |
| Yalıtılmış (sandboxed) masaüstü kurulumu | `Flatpak` |

## Linux hızlı yanıtlar

- Mümkün olduğunda dağıtımınızın yerel paketini kullanın.
- RustDesk `1.2.0` sürümünden itibaren deneysel Wayland desteği bulunmaktadır.
- Giriş ekranına (login screen) uzaktan erişim hâlâ X11 gerektirir.
- SELinux etkinse ve `avc: denied` hatası görüyorsanız RustDesk SELinux ilke yönergelerini uygulayın.

## Kurulum

### Ubuntu (≥ 18)

```sh
# lütfen hatalı disk kullanım raporunu dikkate almayın
sudo apt install -fy ./rustdesk-<version>.deb
```

Ubuntu 18.04 için lütfen [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883) adına önce aşağıdakileri uygulayın:
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
# Fedora için
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Ubuntu için
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 Gerekli~~
~~RustDesk henüz Wayland'ı desteklememektedir; manuel olarak X11'e geçmeniz gerekir.~~

RustDesk, 1.2.0 sürümünden bu yana deneysel Wayland desteğine sahiptir.

### Ekran Sunucusu (Display Server)

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Giriş Ekranı (Login Screen)

Wayland kullanılan giriş ekranı henüz desteklenmemektedir. RustDesk ile yeniden başlatma veya oturumu kapatma sonrasında giriş ekranına erişmek istiyorsanız, giriş ekranını X11 olarak değiştirmeniz gerekir. Lütfen `/etc/gdm/custom.conf` veya `/etc/gdm3/custom.conf` dosyasındaki aşağıdaki satırı `WaylandEnable=false` olarak değiştirin:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Yukarıdaki değişikliklerin geçerli olması için lütfen sistemi **yeniden başlatın**.
{{% /notice %}}
