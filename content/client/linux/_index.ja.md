---
title: Linux 
weight: 4
---

## インストール

### Ubuntu (≥ 18)

```sh
# 誤ったディスク使用量レポートは無視してください
sudo apt install -fy ./rustdesk-<version>.deb
```

Ubuntu 18.04の場合、[pipewire](https://github.com/rustdesk/rustdesk/discussions/6148#discussioncomment-9295883)のために最初に以下を実行してください。
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
# Fedoraの場合
sudo yum install libnsl
./rustdesk-<version>.AppImage
```

```sh
# Ubuntuの場合
sudo yum install libfuse2
./rustdesk-<version>.AppImage
```

### Flatpak

```sh
flatpak --user remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak --user install ./rustdesk-<version>.flatpak
flatpak run com.rustdesk.RustDesk
```

## ~~X11が必要~~
~~RustDeskはまだWaylandをサポートしていません。手動でX11に切り替える必要があります。~~

RustDeskは、バージョン1.2.0から実験的なWaylandサポートを提供しています。

### ディスプレイサーバー

[Ubuntu](https://askubuntu.com/questions/1260142/ubuntu-set-default-login-desktop) | 
[Fedora](https://docs.fedoraproject.org/en-US/quick-docs/configuring-xorg-as-default-gnome-session/) | 
[Arch Linux](https://bbs.archlinux.org/viewtopic.php?id=218319)

### ログイン画面

Waylandを使用するログイン画面はまだサポートされていません。RustDeskで再起動またはログアウト後にログイン画面にアクセスしたい場合は、ログイン画面をX11に変更する必要があります。`/etc/gdm/custom.conf`または`/etc/gdm3/custom.conf`の以下の行を`WaylandEnable=false`に変更してください：

```ini
#WaylandEnable=false
```

{{% notice note %}}
上記の変更を有効にするには**再起動**してください。
{{% /notice %}}

### 権限の問題

SELinuxが有効になっている場合、RustDeskはX11でもWayland環境でも正しく動作しません。関連する[問題](https://github.com/search?q=repo%3Arustdesk%2Frustdesk+SElinux&type=issues)。

次のコマンドを実行できます：

```sh
$ sudo grep 'comm="rustdesk"' /var/log/audit/audit.log | tail -1
type=AVC msg=audit(1697902459.165:707): avc:  denied  { name_connect } for  pid=31346 comm="rustdesk" dest=53330 scontext=system_u:system_r:init_t:s0 tcontext=system_u:object_r:ephemeral_port_t:s0 tclass=tcp_socket permissive=0
```

{{% notice note %}}
`audit`の後の括弧内の数字はタイムスタンプです。
{{% /notice %}}

出力に`avc: denied`が含まれている場合は、SELinuxポリシーを追加する必要があります。[SELinux](https://rustdesk.com/docs/ja/client/linux/selinux/)を参照してください。