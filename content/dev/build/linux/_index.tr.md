---
title: Linux
weight: 10
description: "Gerekli sistem paketleri, vcpkg bağımlılıkları ve Rust araç zinciri ile Linux'ta RustDesk derleyin. cargo çalıştırmadan önce Ubuntu, Fedora veya Arch adımlarını izleyin."
keywords: ["rustdesk linux derleme", "rustdesk linux derleme rehberi", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu derleme"]
---

Linux üzerinde RustDesk derlemek, gerekli paketleri kurmak, `vcpkg` hazırlamak ve masaüstü uygulamasını kaynaktan derlemek için bu kılavuzu kullanın.

## Linux'ta derlemeden önce nelere ihtiyacınız var?

RustDesk'i Linux'ta derlemek için dağıtımınıza ait sistem geliştirme paketleri, çalışan bir `vcpkg` kurulumu, `rustup` ile kurulmuş Rust ve `cargo` çalıştırmadan önce derleme çıktı dizinine yerleştirilmiş Sciter paylaşımlı kütüphanesi gerekir.

## Linux derleme kontrol listesi

- Dağıtımınız için derleyici ve masaüstü bağımlılıklarını kurun.
- `vcpkg` deposunu klonlayıp bootstrap edin, ardından `VCPKG_ROOT` değişkenini export edin.
- `rustup` ile Rust'ı kurun ve cargo ortamını yükleyin.
- RustDesk deposunu alt modülleriyle (submodules) birlikte klonlayın.
- `libsciter-gtk.so` dosyasını `target/debug` dizinine indirin.
- Proje kök dizininden `cargo run` komutunu çalıştırın.

## Linux'ta nasıl derlenir

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

### vcpkg Kurulumu

```sh
git clone --recurse-submodules https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

### libvpx Düzeltmesi (Fedora için)

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

### Derleme

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.lnx/x64/libsciter-gtk.so
mv libsciter-gtk.so target/debug
# Not: VCPKG_ROOT hala tanımlı olmalı
cargo run
```
