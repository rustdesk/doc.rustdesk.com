---
title: Linux 
weight: 4
description: "RustDesk のLinuxに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk linux", "rustdesk ubuntu", "rustdesk fedora", "rustdesk arch", "rustdesk appimage", "rustdesk flatpak", "rustdesk wayland", "rustdesk selinux"]
---

## どの Linux パッケージを使うべきですか？

| 状況 | 最適なパッケージ |
| --- | --- |
| Ubuntu / Debian 系ディストリビューション | `.deb` |
| Fedora / CentOS 系ディストリビューション | `.rpm` |
| Arch Linux または Manjaro | `.pkg.tar.zst` |
| openSUSE | SUSE 向け `.rpm` |
| 単一ファイルのポータブル利用 | `AppImage` |
| サンドボックス型デスクトップ導入 | `Flatpak` |

## Linux のクイック回答

- 可能ならディストリビューションに合ったネイティブパッケージを使ってください。
- RustDesk `1.2.0` 以降も Wayland 対応は実験的です。
- ログイン画面へのリモートアクセスが必要なら、引き続き X11 を使ってください。
- SELinux が enforcing で `avc: denied` が出る場合は、RustDesk の SELinux ガイドに従ってください。

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

