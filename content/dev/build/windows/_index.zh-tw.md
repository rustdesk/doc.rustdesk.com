---
title: Windows
weight: 20
---

## 依賴

### c++編譯環境

推薦下載[msvc](https://visualstudio.microsoft.com/)並安裝

### Rust 開發環境
下載[rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)並安裝

### vcpkg

使用[git-bash](https://git-scm.com/download/win)運行下列命令, 下載`vcpkg`, 安裝`libvpx`, `libyuv`, `opus`

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2021.12.01
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

添加環境變量`VCPKG_ROOT`=`<path>\vcpkg`。

![](/docs/en/dev/build/windows/images/env.png)

### sciter

桌面版本使用[sciter](https://sciter.com/) , 下載動態庫[sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

### llvm

rust-bindgen依赖于clang, 下載[llvm](https://github.com/llvm/llvm-project/releases)並安裝， 添加環境變量`LIBCLANG_PATH`， 值為`<llvm_install_dir>/bin`



## 構建

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
mv sciter.dll target/debug
cargo run
```