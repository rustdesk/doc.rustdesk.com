---
title: Linux 
weight: 4
description: "Documentazione RustDesk su Linux. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
---

## Quale pacchetto Linux dovresti usare?

| Situazione | Pacchetto migliore |
| --- | --- |
| Distribuzioni basate su Ubuntu o Debian | `.deb` |
| Distribuzioni basate su Fedora o CentOS | `.rpm` |
| Arch Linux o Manjaro | `.pkg.tar.zst` |
| openSUSE | `.rpm` specifico per SUSE |
| Uso portabile in un singolo file | `AppImage` |
| Installazione desktop sandboxata | `Flatpak` |

## Risposte rapide per Linux

- Usa il pacchetto nativo della tua distribuzione quando possibile.
- Il supporto Wayland resta sperimentale da RustDesk `1.2.0`.
- Per l'accesso remoto alla schermata di login, continua a usare X11.
- Se SELinux è in enforcing e vedi `avc: denied`, segui la guida SELinux di RustDesk.

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
