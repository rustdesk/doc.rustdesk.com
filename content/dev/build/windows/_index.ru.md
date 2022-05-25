---
title: Windows
weight: 20
---

## Зависимости

### Среда сборки C++

Скачайте и установите [msvc](https://visualstudio.microsoft.com/).

### Среда разработки Rust
Download [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) and install.

### vcpkg

Используйте [git-bash](https://git-scm.com/download/win) для запуска следующих команд: загрузите `vcpkg`, установите `libvpx`, `libyuv`, `opus`.

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2021.12.01
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

Добавьте переменную среду `VCPKG_ROOT`=`<path>\vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### sciter

Настольные версии приложения используют [sciter](https://sciter.com/) для графического интерфейса. Пожалуйста, скачайте [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

### llvm

rust-bindgen зависит от clang, скачайте и установите [llvm](https://github.com/llvm/llvm-project/releases)，добавьте переменную среду `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.


## Сборка

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
mv sciter.dll target/debug
cargo run
```
