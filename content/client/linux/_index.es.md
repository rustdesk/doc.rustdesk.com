---
title: Linux 
weight: 4
---

## Instalación

### Ubuntu (≥ 18)

```sh
# por favor ignore el reporte erróneo de uso del disco
sudo apt install -fy ./rustdesk-<version>.deb
```

Para Ubuntu 18.04, por favor haga lo siguiente primero para [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# Para Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Para Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 requerido~~
~~RustDesk aún no admite Wayland; necesita cambiar manualmente a X11.~~

RustDesk ahora tiene soporte experimental para Wayland desde la versión 1.2.0.

### Servidor de visualización

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Pantalla de inicio de sesión

La pantalla de inicio de sesión usando Wayland aún no es compatible. Si desea acceder a la pantalla de inicio de sesión después de reiniciar o cerrar sesión con RustDesk, necesita cambiar la pantalla de inicio de sesión a X11, por favor modifique la línea siguiente a `WaylandEnable=false` en `/etc/gdm/custom.conf` o `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Por favor **reinicie** para que los cambios anteriores tomen efecto.
{{% /notice %}}

### Problemas de permisos

Si SELinux está habilitado, RustDesk no funcionará correctamente en entornos X11 o Wayland, [problemas](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues) relacionados.

Puede ejecutar:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
El número entre paréntesis después de `audit` es la marca de tiempo.
{{% /notice %}}

Si la salida contiene `avc: denied`, necesita agregar políticas de SELinux, por favor consulte [SELinux](https://rustdesk.com/docs/es/client/linux/selinux/).