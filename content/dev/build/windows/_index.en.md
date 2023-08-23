---
title: Windows
weight: 20
---

{{% notice note %}}
The command line commands here must be run in git-bash not command prompt or you will get syntax errors.
{{% /notice %}}

## Dependencies
### C++ build environment
Download [msvc](https://visualstudio.microsoft.com/) and install.
Select `Windows` as Developer machine OS and check `C++`, then download Visual Studio Community version and install. The installation may take a while.

### Rust develop environment
Download [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) and run it as administrator to install `rust`.

### vcpkg
Go to the folder you want to clone vcpkg and use [git-bash](https://git-scm.com/download/win) to run the following commands, download `vcpkg`, install 64-bit version of `libvpx`, `libyuv` and `opus`.
If you don't have `git` installed, get `git` [here](https://git-scm.com/download/win).

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2023.04.15
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Add System environment variable `VCPKG_ROOT`=`<path>\vcpkg`. The `<path>` should be the location you choose above to clone `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### LLVM
rust-bindgen depends on clang, download [LLVM](https://github.com/llvm/llvm-project/releases) and install, add System environment variable `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

You can download 15.02 of the LLVM binaries here: [64-bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32-bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe)





## Build
To build a rustdesk executable file(.exe) from your windows machine make sure to follow the following steps:

### Generate bridge
```sh
  cargo install flutter_rust_bridge_codegen --version 1.75.3 --features "uuid" --force
  cd flutter
  flutter pub get
  cd ..
  ~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

### Build rustdesk-install
{{% notice note %}}
Make sure you execute the following command with admin privileges
{{% /notice %}}

```sh
  python3 .\build.py --portable --hwcodec --flutter --feature IddDriver
```

### Build rustdesk-portable
  cd libs/portable
  python3 ./generate.py -f ../../flutter/build/windows/runner/Release/ -o . -e ../../flutter/build/windows/runner/Release/rustdesk.exe
