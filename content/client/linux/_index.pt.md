---
title: Linux
weight: 4
---

### Instalação

#### Ubuntu (≥ 18)

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

#### CentOS/Fedora (≥ 28)

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### AppImage

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

#### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

### ~~X11 Necessário~~
~~RustDesk ainda não suporta Wayland; você precisa mudar para X11 manualmente.~~

RustDesk agora tem suporte experimental ao Wayland desde a versão 1.2.0.

#### Servidor de Display

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Tela de Login

A tela de login usando Wayland ainda não é suportada. Se você quiser acessar a tela de login após reiniciar ou sair com o RustDesk, você precisa alterar a tela de login para X11, por favor modifique a linha abaixo para `WaylandEnable=false` em `/etc/gdm/custom.conf` ou `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
Por favor **reinicie** para que as alterações acima tenham efeito.
{{% /notice %}}

#### Problema de Permissões

Se o SELinux estiver habilitado, o RustDesk não funcionará corretamente nem em ambientes X11 nem Wayland, relacionado aos [problemas](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues).

Você pode executar:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
O número entre parênteses após `audit` é o timestamp.
{{% /notice %}}

Se a saída contiver `avc: denied`, você precisa adicionar políticas do SELinux, por favor consulte [SELinux](https://rustdesk.com/docs/en/client/linux/selinux/).