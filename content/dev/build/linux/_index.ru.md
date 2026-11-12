---
title: Linux
weight: 10
description: "Сборка RustDesk в Linux: нужные системные пакеты, зависимости vcpkg и инструменты Rust. Выполните шаги для Ubuntu, Fedora или дистрибутивов на основе Arch, прежде чем запускать cargo."
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

В этом руководстве описано, как собрать RustDesk в Linux: установить нужные пакеты, подготовить `vcpkg` и скомпилировать настольное приложение из исходного кода.

## Что нужно для сборки в Linux?

Для сборки RustDesk в Linux нужны пакеты разработки вашего дистрибутива, рабочая установка `vcpkg`, Rust, установленный через `rustup`, и общая библиотека Sciter, которую перед запуском `cargo` нужно положить в папку сборки.

## Порядок сборки в Linux

- Установите компилятор и зависимости для настольных приложений вашего дистрибутива.
- Склонируйте и инициализируйте `vcpkg`, затем задайте `VCPKG_ROOT` через `export`.
- Установите Rust с помощью `rustup` и загрузите окружение cargo.
- Склонируйте репозиторий RustDesk вместе с подмодулями.
- Скачайте `libsciter-gtk.so` в `target/debug`.
- Выполните `cargo run` из корня проекта.

## Как собрать в Linux

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

### Установка vcpkg

```sh
git clone --recurse-submodules https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

### Исправление libvpx (для Fedora)

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

### Сборка

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
