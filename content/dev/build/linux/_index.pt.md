---
title: Linux
weight: 10
---

## Dependências

Versões de desktop utilizam [sciter](https://sciter.com/) para a GUI, por favor baixe a biblioteca dinâmica sciter por conta própria.

[Windows](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll) |
[Linux](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.lnx/x64/libsciter-gtk.so) |
[MacOS](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.osx/libsciter.dylib)

## Compilação crua

- Prepare seu ambiente de desenvolvimento Rust e ambiente de compilação C++

- Instale [vcpkg](https://github.com/microsoft/vcpkg), e configure a variável de ambiente `VCPKG_ROOT` corretamente

  - Windows: vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
  - Linux/MacOS: vcpkg install

- Execute `cargo run`

## Como compilar no Linux

### Ubuntu 18 (Debian 10)

```sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake
```

### Fedora 28 (CentOS 8)

```sh
sudo yum -y install gcc-c++ git curl wget nasm yasm gcc gtk3-devel clang libxcb-devel libxdo-devel libXfixes-devel pulseaudio-libs-devel cmake alsa-lib-devel
```

### Arch (Manjaro)

```sh
sudo pacman -Syu --needed unzip git cmake gcc curl wget yasm nasm zip make pkg-config clang gtk3 xdotool libxcb libxfixes alsa-lib pulseaudio
```

### Instale vcpkg

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

### Conserte libvpx (Para o Fedora)

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

### Compile

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.lnx/x64/libsciter-gtk.so
mv libsciter-gtk.so target/debug
# Note: VCPKG_ROOT still set
cargo run
```

### Mude Wayland para X11 (Xorg)

RustDesk não suporta Wayland. Veja [esse link](https://docs.fedoraproject.org/pt_BR/quick-docs/configuring-xorg-as-default-gnome-session/) para configurar o Xorg como a sessão padrão do GNOME.
