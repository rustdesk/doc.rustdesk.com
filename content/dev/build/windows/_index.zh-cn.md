---
title: Windows
weight: 20
---

## 依赖

### c++编译环境

推荐下载[msvc](https://visualstudio.microsoft.com/)并安装

### Rust 开发环境
下载[rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)并安装

### vcpkg

使用[git-bash](https://git-scm.com/download/win)运行下列命令, 下载`vcpkg`, 安装`libvpx`, `libyuv`, `opus`

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2021.12.01
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

添加环境变量`VCPKG_ROOT`=`<path>\vcpkg`。

![](/docs/en/dev/build/windows/images/env.png)

### sciter

桌面版本使用[sciter](https://sciter.com/) , 下载动态库[sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

### llvm

rust-bindgen依赖于clang, 下载[llvm](https://github.com/llvm/llvm-project/releases)并安装， 添加环境变量`LIBCLANG_PATH`，值为`<llvm_install_dir>/bin`



## 构建

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
mv sciter.dll target/debug
cargo run
```

