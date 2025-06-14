---
title: Windows
weight: 20
---

{{% notice note %}}
此處的所有指令皆須在 git-bash 中執行，而非命令提示字元，否則您會遇到語法錯誤。
{{% /notice %}}

# 依賴

## C++ 編譯環境

下載 [msvc](https://visualstudio.microsoft.com/) 並安裝。
選擇 `Windows` 作為開發機作業系統，並勾選 `C++`。然後下載 Visual Studo 社群版並安裝。安裝可能需要一段時間。

## Rust 開發環境
下載 [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe)，以管理員身份執行並安裝。

## vcpkg

使用[git-bash](https://git-scm.com/download/win)執行下列指令，下載 `vcpkg`，安裝`libvpx`、`libyuv`、`opus`。
如果您尚未安裝 `git`，請在[此](https://git-scm.com/download/win)下載。

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2023.04.15
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

加入系統環境變數 `VCPKG_ROOT`=`<path>\vcpkg`。`<path>` 應為您複製 `vcpkg` 的路徑。

![](/docs/en/dev/build/windows/images/env.png)

## Sciter

桌面版本的介面使用 [sciter](https://sciter.com/)，請下載 [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

## llvm

rust-bindgen 依賴 clang，下載 [llvm](https://github.com/llvm/llvm-project/releases) 並安裝，加入系統環境變數 `LIBCLANG_PATH`=`<llvm_install_dir>/bin`。

您可以在此下載 LLVM 15.02 版本的安裝包：[64 位元](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 位元](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe)

# 編譯

## 預設

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
