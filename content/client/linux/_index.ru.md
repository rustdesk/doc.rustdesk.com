---
title: Linux
description: "Установка RustDesk в дистрибутивах Linux: Ubuntu, Fedora, CentOS, Arch, openSUSE и NixOS. Особенности Wayland, варианты AppImage и Flatpak, решение проблем с SELinux."
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
weight: 4
---

В этом руководстве описано, как установить RustDesk в популярных дистрибутивах Linux, какие ограничения есть у Wayland и экрана входа и как решать частые проблемы с правами, например блокировки политикой SELinux.

{{% notice note %}}
См. также обзорную статью: [RustDesk для Linux](https://rustdesk.com/blog/rustdesk-for-linux) (на английском языке).
{{% /notice %}}

## Какой пакет Linux выбрать?

| Ситуация | Подходящий пакет |
| --- | --- |
| Ubuntu или системы на основе Debian | `.deb` |
| Fedora или системы на основе CentOS | `.rpm` |
| Arch Linux или Manjaro | `.pkg.tar.zst` |
| openSUSE | `.rpm` для SUSE |
| Переносной запуск из одного файла | `AppImage` |
| Установка в изолированной среде | `Flatpak` |

## Коротко о Linux

- По возможности используйте родной пакет вашего дистрибутива.
- Поддержка Wayland экспериментальная, начиная с RustDesk `1.2.0`.
- Для удалённого доступа к экрану входа по-прежнему нужен X11.
- Если SELinux работает в принудительном режиме и вы видите `avc: denied`, примените политику SELinux для RustDesk.

## Установка

### Ubuntu (≥ 18)

```sh
# please ignore the wrong disk usage report
sudo apt install -fy ./rustdesk-<version>.deb
```

Для Ubuntu 18.04 сначала выполните следующие команды для [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# For Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# For Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~Требуется X11~~
~~RustDesk пока не поддерживает Wayland, нужно вручную переключиться на X11.~~

Начиная с версии 1.2.0 в RustDesk есть экспериментальная поддержка Wayland.

### Графический сервер

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Экран входа

Экран входа на Wayland пока не поддерживается. Чтобы получать доступ к экрану входа через RustDesk после перезагрузки или выхода из системы, переключите экран входа на X11: измените строку ниже на `WaylandEnable=false` в файле `/etc/gdm/custom.conf` или `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Чтобы изменения вступили в силу, **перезагрузите** компьютер.
{{% /notice %}}

