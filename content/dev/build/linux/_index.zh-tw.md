---
title: Linux
weight: 10
description: "RustDesk 的Linux文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

# 在 Linux 上編譯

## 在 Linux 上建置前需要準備什麼？

在 Linux 上建置 RustDesk 需要先安裝對應發行版的開發依賴、設定可用的 `vcpkg`、透過 `rustup` 安裝 Rust，並在執行 `cargo` 前把 Sciter 共用函式庫放到輸出目錄中。

## Linux 建置檢查清單

- 安裝與發行版相符的編譯器與桌面依賴。
- 複製並初始化 `vcpkg`，然後匯出 `VCPKG_ROOT`。
- 透過 `rustup` 安裝 Rust，並載入 cargo 環境。
- 遞迴複製 RustDesk 倉庫。
- 將 `libsciter-gtk.so` 下載到 `target/debug`。
- 在專案根目錄執行 `cargo run`。

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

## 安裝 vcpkg

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

## 修復 libvpx (僅僅針對 Fedora)

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

## 構建

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
