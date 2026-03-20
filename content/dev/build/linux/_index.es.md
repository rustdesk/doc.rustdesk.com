---
title: Linux
weight: 10
description: "Documentación de RustDesk sobre Linux. Consulta guías de instalación, configuración, despliegue y solución de problemas."
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

# Cómo construir en Linux

## ¿Que necesitas antes de compilar en Linux?

Para compilar RustDesk en Linux necesitas las dependencias de desarrollo de tu distribucion, un `vcpkg` funcional, Rust instalado con `rustup` y la biblioteca compartida de Sciter en el directorio de salida antes de ejecutar `cargo`.

## Checklist de compilacion en Linux

- Instala el compilador y las dependencias de escritorio de tu distribucion.
- Clona e inicializa `vcpkg` y exporta `VCPKG_ROOT`.
- Instala Rust con `rustup` y carga el entorno de cargo.
- Clona el repositorio de RustDesk con submodulos.
- Descarga `libsciter-gtk.so` en `target/debug`.
- Ejecuta `cargo run` desde la raiz del proyecto.

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

## Instalar vcpkg

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

## Arreglar libvpx (Para Fedora)

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

## Construir

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
