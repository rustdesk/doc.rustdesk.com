---
title: Linux 
weight: 4
---

### Установка
------

- Ubuntu (>= 16)
```
# игнорируйте предупреждение "wrong disk usage"
sudo apt install -fy ./rustdesk-<version>.deb
```

- CentOS/Fedora (>=18)
```
sudo yum localinstall ./rustdesk-<version>.rpm
```

- Arch/Manjaro
```
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

- Opensuse (>= Leap 15.0)
```
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

### ~~X11 обязателен~~
~~RustDesk пока не поддерживает Wayland. Необходимо перейти на X11 вручную.~~

В RustDesk теперь есть экспериментальная поддержка Wayland. Возможно, вам потребуется скачать ночную версию, чтобы включить эту функцию.

#### Сервер отображения
Ubuntu: https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop

Fedora: https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/

Arch: https://bbs.archlinux.org/viewtopic.php?id=218319

##### Экран входа в систему

Измените параметр `WaylandEnable` в `/etc/gdm/custom.conf` или `/etc/gdm3/custom.conf`.
```
#WaylandEnable=false
```

{{% notice note %}}
**Перезагрузите** ваш компьютер, чтобы применить изменения
{{% /notice %}}

