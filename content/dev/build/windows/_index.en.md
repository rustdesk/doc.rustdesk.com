---
title: Windows
weight: 20
---

{{% notice note %}}
The command line commands here must be run in Git Bash not command prompt or you will get syntax errors.
{{% /notice %}}

### Dependencies

#### C++ build environment

Download [MSVC](https://visualstudio.microsoft.com/) and install.
Select `Windows` as Developer machine OS and check `C++`, then download Visual Studio Community version and install. The installation may take a while.

#### Rust develop environment

Download [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) and run it as administrator to install `rust`.

#### vcpkg

Go to the folder you want to clone vcpkg and use [Git Bash](https://git-scm.com/download/win) to run the following commands, download `vcpkg`, install 64-bit version of `libvpx`, `libyuv` and `opus`.
If you don't have `Git` installed, get `Git` [here](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Add System environment variable `VCPKG_ROOT`=`<path>\vcpkg`. The `<path>` should be the location you choose above to clone `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

#### Sciter

Desktop versions use [Sciter](https://sciter.com/) for GUI, please download [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

#### LLVM

`rust-bindgen` depends on `clang`, download [LLVM](https://github.com/llvm/llvm-project/releases) and install, add System environment variable `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

You can download version 15.0.2 of the LLVM binaries here: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

### Build

#### Default

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
