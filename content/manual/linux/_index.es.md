---
title: Linux 
weight: 4
---

### Installation
------

- Ubuntu (>= 16)
```
# please ignore the wrong disk usage report
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

### X11 Required

RustDesk aún no admite wayland, debe cambiar a X11. RustDesk lo guiará para cambiar a X11.

| Haga clic en "Fix it" | corrección para la pantalla de inicio de sesión | Ingrese su contraseña |
| ---- | ---- | --- |
|![](/docs/en/manual/linux/images/fix1.png)|![](/docs/en/manual/linux/images/fix3.png)|![](/docs/en/manual/linux/images/fix2.png)|

{{% notice note %}}
Por favor **reiniciar** para hacer que los cambios anteriores surtan efecto
{{% /notice %}}

#### También puede hacer los cambios anteriores manualmente

#### Servidor de visualización

Ubuntu: https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop

Fedora: https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/

Arch: https://bbs.archlinux.org/viewtopic.php?id=218319

##### Login Screen

Modificar debajo de la línea para `WaylandEnable=false` en `/etc/gdm/custom.conf` o `/etc/gdm3/custom.conf`.
```
#WaylandEnable=false
```

