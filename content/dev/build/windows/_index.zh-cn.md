---
title: Windows
weight: 20
---

{{% notice note %}}
这里的命令行命令必须在 Git Bash 中运行，而不是命令提示符，否则您将遇到语法错误。
{{% /notice %}}

## 依赖

### C++编译环境

下载 [MSVC](https://visualstudio.microsoft.com/) 并安装。
选择 `Windows` 作为开发人员机器操作系统并勾选 `C++`，然后下载 Visual Studio Community 版本并安装。安装可能需要一段时间。

### Rust 开发环境

下载 [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) 并以管理员身份运行它来安装 `rust`。

### vcpkg

转到您想要克隆 vcpkg 的文件夹，并使用 [Git Bash](https://git-scm.com/download/win) 运行以下命令，下载 `vcpkg`，安装 64 位版本的 `libvpx`、`libyuv` 和 `opus`。
如果您没有安装 `Git`，请在[这里](https://git-scm.com/download/win)获取 `Git`。

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

添加系统环境变量 `VCPKG_ROOT`=`<path>\vcpkg`。`<path>` 应该是您在上面选择克隆 `vcpkg` 的位置。

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

桌面版本使用 [Sciter](https://sciter.com/) 作为 GUI，请下载 [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)。

### LLVM

`rust-bindgen` 依赖于 `clang`，下载 [LLVM](https://github.com/llvm/llvm-project/releases) 并安装，添加系统环境变量 `LIBCLANG_PATH`=`<llvm_install_dir>/bin`。

您可以在这里下载 LLVM 二进制文件的 15.0.2 版本：[64 位](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 位](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe)。

#### 默认

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
