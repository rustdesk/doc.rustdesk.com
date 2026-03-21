---
title: Linux
weight: 4
description: "Documentação do RustDesk sobre Linux. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
---

## Qual pacote Linux você deve usar?

| Situação | Melhor pacote |
| --- | --- |
| Distribuições baseadas em Ubuntu ou Debian | `.deb` |
| Distribuições baseadas em Fedora ou CentOS | `.rpm` |
| Arch Linux ou Manjaro | `.pkg.tar.zst` |
| openSUSE | `.rpm` específico para SUSE |
| Uso portátil em arquivo único | `AppImage` |
| Instalação desktop em sandbox | `Flatpak` |

## Respostas rápidas para Linux

- Use o pacote nativo da sua distribuição sempre que possível.
- O suporte a Wayland continua experimental desde o RustDesk `1.2.0`.
- Para acesso remoto à tela de login, continue usando X11.
- Se o SELinux estiver em enforcing e você vir `avc: denied`, siga o guia SELinux do RustDesk.

## Instalação

### Ubuntu (≥ 18)

```sh
# por favor ignore o relatório de uso de disco incorreto
sudo apt install -fy ./rustdesk-<version>.deb
```

Para Ubuntu 18.04, faça primeiro o seguinte para [pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883).
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

## ~~X11 Necessário~~
~~RustDesk ainda não suporta Wayland; você precisa mudar para X11 manualmente.~~

RustDesk agora tem suporte experimental ao Wayland desde a versão 1.2.0.

### Servidor de Display

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### Tela de Login

A tela de login usando Wayland ainda não é suportada. Se você quiser acessar a tela de login após reiniciar ou sair com o RustDesk, você precisa alterar a tela de login para X11, por favor modifique a linha abaixo para `WaylandEnable=false` em `/etc/gdm/custom.conf` ou `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Por favor **reinicie** para que as alterações acima tenham efeito.
{{% /notice %}}

