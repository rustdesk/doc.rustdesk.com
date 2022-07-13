---
title: Windows
weight: 20
---

## Dependencies

### C++ build környezet

Telepítsd a [msvc](https://visualstudio.microsoft.com/)-t.

### Rust fejlesztői környezet
Telepísd Rustot a [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) használatával.

### vcpkg

Használd a [git-bash](https://git-scm.com/download/win)-t hogy futtasd a következő parancsokat, töltsd le a `vcpkg`-t, telepítsd a `libvpx`, `libyuv`, `opus` csomagokat.

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2021.12.01
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

Addold a `VCPKG_ROOT`=`<path>\vcpkg` környezeti változót.

![](/docs/en/dev/build/windows/images/env.png)

### sciter

Az asztali verziók a [sciter](https://sciter.com/)-t használják a GUI-hoz, kérlek töltsd le a [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)-t.

### llvm

A rust-bindgen a clangtól függ, töltsd le és telepítsd az [llvm](https://github.com/llvm/llvm-project/releases)-et, majd állítsd be a `LIBCLANG_PATH`=`<llvm_install_dir>/bin` környezeti változót.


## Építés

### Alap

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
mv sciter.dll target/debug
cargo run
```
