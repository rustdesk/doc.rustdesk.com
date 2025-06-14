---
title: Linux 
weight: 4
---

## Instalación
------

- Ubuntu (>= 16)
```
# Ignora el reporte de uso incorrecto del disco {wrong disk usage}.
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

## ~~X11 Required~~
~~RustDesk aún no admite wayland, debe cambiar a X11. RustDesk lo guiará para cambiar a X11.~~


### Servidor de visualización

Ubuntu: https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop

Fedora: https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/

Arch: https://bbs.archlinux.org/viewtopic.php?id=218319

#### Login Screen

Modificar la linea mostrada abajo por `WaylandEnable=false` en `/etc/gdm/custom.conf` o `/etc/gdm3/custom.conf`.
```
#WaylandEnable=false
```

{{% notice note %}}
Por favor **reinicia** para que los cambios tomen efecto en el sistema.
{{% /notice %}}

### Problemas de permisos

Si el proceso  RustDesk --server no esta corriendo, es decir, no hay salida al ejecutar `ps -ef | grep -E 'rustdesk +--server'`.
Entonces probablemente hay un problema de permisos.

Ve a [SELinux](./selinux/) para añadir políticas de SELinux.

