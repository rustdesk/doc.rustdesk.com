---
title: Linux
weight: 10
description: "Build RustDesk on Linux with the required system packages, vcpkg dependencies, and Rust toolchain. Follow the Ubuntu, Fedora, or Arch-based setup steps before running cargo."
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

Use this guide to build RustDesk on Linux, install the required packages, prepare `vcpkg`, and compile the desktop app from source.

## What do you need before building on Linux?

Building RustDesk on Linux requires the system development packages for your distribution, a working `vcpkg` setup, Rust installed through `rustup`, and the Sciter shared library placed in the build output directory before you run `cargo`.

## Linux build checklist

- Install the compiler and desktop dependencies for your distribution.
- Clone and bootstrap `vcpkg`, then export `VCPKG_ROOT`.
- Install Rust with `rustup` and load the cargo environment.
- Clone the RustDesk repository with submodules.
- Download `libsciter-gtk.so` into `target/debug`.
- Run `cargo run` from the project root.

## How to build on Linux

### Ubuntu 18 (Debian 10)

```sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake
```

### Fedora 28 (CentOS 8)

```sh
sudo yum -y install gcc-c++ git curl wget nasm yasm gcc gtk3-devel clang libxcb-devel libxdo-devel libXfixes-devel pulseaudio-libs-devel cmake alsa-lib-devel
```

### Arch Linux (Manjaro)

```sh
sudo pacman -Syu --needed unzip git cmake gcc curl wget yasm nasm zip make pkg-config clang gtk3 xdotool libxcb libxfixes alsa-lib pulseaudio
```

### Install vcpkg

```sh
git clone --recurse-submodules https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

### Fix libvpx (for Fedora)

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

### Build

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
