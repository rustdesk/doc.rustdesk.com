---
title: Linux
weight: 10
description: "RustDesk 的Linux文档，提供安装、配置、部署和故障排查指南。"
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

# 在 Linux 上编译

## 在 Linux 上构建前需要准备什么？

在 Linux 上构建 RustDesk 需要先安装对应发行版的开发依赖、配置可用的 `vcpkg`、通过 `rustup` 安装 Rust，并在运行 `cargo` 前把 Sciter 共享库放到输出目录中。

## Linux 构建检查清单

- 安装与你的发行版匹配的编译器和桌面依赖。
- 克隆并初始化 `vcpkg`，然后导出 `VCPKG_ROOT`。
- 通过 `rustup` 安装 Rust，并加载 cargo 环境。
- 递归克隆 RustDesk 仓库。
- 将 `libsciter-gtk.so` 下载到 `target/debug`。
- 在项目根目录运行 `cargo run`。

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

## 安装 vcpkg

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

## 修复 libvpx (仅仅针对 Fedora)

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

## 构建

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
