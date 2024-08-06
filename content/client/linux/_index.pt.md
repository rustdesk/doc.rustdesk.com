---
title: Linux
weight: 4
---

### Instalação do RustDesk

#### Ubuntu (≥ 18)

{{% notice note %}}
Observação: Você pode ignorar qualquer relatório incorreto de uso do disco durante a instalação.
{{% /notice %}}

```sh
# Instale o RustDesk usando o arquivo DEB
sudo apt install -fy ./rustdesk-<versão>.deb
```

##### Ubuntu 18.04
Devido a uma dependência do RustDesk, é necessário instalar o Pipewire antes de prosseguir. Siga as instruções abaixo para instalar o [Pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883) no Ubuntu 18.04

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
# For Ubuntu
sudo yum install libfuse2
./rustdesk-<versão>.AppImage
```

#### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<versão>.flatpak
flatpak run com.rustdesk.RustDesk
```

#### Suporte Wayland

O RustDesk possui suporte experimental ao Wayland desde a versão 1.2.0.

#### Servidor de Exibição

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

#### Tela de Login

A tela de login usando Wayland ainda não é suportada. Se você deseja acessar a tela de login após reiniciar ou sair com o RustDesk, é necessário alterar a tela de login para X11. Modifique a linha abaixo para `WaylandEnable=false` em `/etc/gdm/custom.conf` ou `/etc/gdm3/custom.conf`:

```ini
#WaylandEnable=false
```

{{% notice note %}}
É necessário reiniciar o sistema para que as alterações tenham efeito.
{{% /notice %}}

#### Problemas de permissão com SELinux
Se o SELinux estiver habilitado, o RustDesk não funcionará corretamente nos ambientes X11 ou Wayland. Veja os problemas [relacionados](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues) (em inglês).

Você pode executar o seguinte comando para verificar se há problemas de permissão:

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
O número entre parênteses após `audit` é um registro de data e hora.
{{% /notice %}}

Se a saída do comando contiver `avc: denied`, significa que há permissões negadas pelo SELinux. Para corrigir isso, você precisa adicionar políticas SELinux. Veja as instruções em [SELinux](https://rustdesk.com/docs/pt/client/linux/selinux/).
