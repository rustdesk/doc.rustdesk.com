---
title: Linux
weight: 10
description: "RustDesk のLinuxに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

# Linuxでのビルド手順

## Linux でビルドする前に何が必要ですか？

Linux で RustDesk をビルドするには、ディストリビューション向けの開発依存関係、動作する `vcpkg`、`rustup` で入れた Rust、そして `cargo` 実行前に出力先へ配置した Sciter 共有ライブラリが必要です。

## Linux ビルドのチェックリスト

- ディストリビューションに合うコンパイラとデスクトップ依存関係を入れます。
- `vcpkg` をクローンして初期化し、`VCPKG_ROOT` を export します。
- `rustup` で Rust を入れ、cargo 環境を読み込みます。
- RustDesk リポジトリを submodule 付きで clone します。
- `libsciter-gtk.so` を `target/debug` に配置します。
- プロジェクトルートで `cargo run` を実行します。

## Ubuntu 18 (Debian 10)

```sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake
```

## Fedora 28 (CentOS 8)

```sh
sudo yum -y install gcc-c++ git curl wget nasm yasm gcc gtk3-devel clang libxcb-devel libxdo-devel libXfixes-devel pulseaudio-libs-devel cmake alsa-lib-devel
```

## Arch (Manjaro)

```sh
sudo pacman -Syu --needed unzip git cmake gcc curl wget yasm nasm zip make pkg-config clang gtk3 xdotool libxcb libxfixes alsa-lib pulseaudio
```

## Install vcpkg

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

## Fix libvpx (For Fedora)

```sh
cd vcpkg/buildtrees/libvpx/src
cd *
./configure
sed -i 's/CFLAGS+=-I/CFLAGS+=-fPIC -I/g' Makefile
sed -i 's/CXXFLAGS+=-I/CXXFLAGS+=-fPIC -I/g' Makefile
make
cp libvpx.a $VCPKG_ROOT/installed/x64-linux/lib/
cd
```

## Build

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.lnx/x64/libsciter-gtk.so
mv libsciter-gtk.so target/debug
# Note: VCPKG_ROOT still set
cargo run
```
