---
title: Windows
weight: 20
---

## Dependencias

### Entorno de compilación C++

Descargar [msvc](https://visualstudio.microsoft.com/) e instalar.

### Entorno de desarrollo Rust

Descargar [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) e instalar.

### vcpkg

Usar [git-bash](https://git-scm.com/download/win) para ejecutar los siguientes comandos， download `vcpkg`, install `libvpx`, `libyuv`, `opus`.

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2023.04.15
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Agregar variable de entorno `VCPKG_ROOT`=`<path>\vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### sciter

Uso de versiones de escritorio [sciter](https://sciter.com/) para GUI, descargue [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

### llvm

rust-bindgen depende del clang, descargar [llvm](https://github.com/llvm/llvm-project/releases) e instalar, agregar variable de entorno `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.



## Construir

### Por defecto

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
mv sciter.dll target/debug
cargo run
```
