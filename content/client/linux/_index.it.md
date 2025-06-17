---
title: Linux 
weight: 4
---

## Installazione

### Ubuntu (≥ 18)

```sh
# si prega di ignorare il report errato sull'utilizzo del disco
sudo apt install -fy ./rustdesk-<version>.deb
```

Per Ubuntu 18.04, eseguire prima quanto segue per [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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
# Per Fedora
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Per Ubuntu
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11 Richiesto~~
~~RustDesk non supporta ancora Wayland; è necessario passare manualmente a X11.~~

RustDesk ora ha il supporto sperimentale per Wayland dalla versione 1.2.0.

### Server di Visualizzazione

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Schermata di Login

La schermata di login che utilizza Wayland non è ancora supportata. Se vuoi accedere alla schermata di login dopo il riavvio o il logout con RustDesk, devi cambiare la schermata di login in X11, modifica la riga seguente in `WaylandEnable=false` in `/etc/gdm/custom.conf` o `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Si prega di **riavviare** per rendere effettive le modifiche sopra.
{{% /notice %}}

### Problemi di Permessi

Se SELinux è abilitato, RustDesk non funzionerà correttamente né in ambienti X11 né Wayland, [problemi](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues) correlati.

Puoi eseguire:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
Il numero tra parentesi dopo `audit` è il timestamp.
{{% /notice %}}

Se l'output contiene `avc: denied`, è necessario aggiungere le politiche SELinux, fare riferimento a [SELinux](https://rustdesk.com/docs/it/client/linux/selinux/).