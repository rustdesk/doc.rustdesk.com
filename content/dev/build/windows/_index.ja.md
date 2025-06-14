---
title: Windows
weight: 20
---

{{% notice note %}}
ここに示すコマンドライン指示は、コマンドプロンプトではなく Git Bash で実行する必要があります。そうしないと構文エラーが発生します。
{{% /notice %}}

### 依存関係

#### C++ ビルド環境

[MSVC](https://visualstudio.microsoft.com/) をダウンロードしてインストールします。
開発者マシンOS として `Windows` を選択し、`C++` をチェックしてから、Visual Studio Community版をダウンロードしてインストールします。インストールには時間がかかる場合があります。

#### Rust開発環境

[rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) をダウンロードし、管理者として実行して `rust` をインストールします。

#### vcpkg

vcpkg をクローンしたいフォルダに移動し、[Git Bash](https://git-scm.com/download/win) を使用して以下のコマンドを実行し、`vcpkg` をダウンロードして、64ビット版の `libvpx`、`libyuv`、`opus` をインストールします。
`Git` がインストールされていない場合は、[こちら](https://git-scm.com/download/win) から `Git` を入手してください。

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

システム環境変数 `VCPKG_ROOT`=`<path>\vcpkg` を追加します。`<path>` は、上記で vcpkg をクローンした場所です。

![](/docs/en/dev/build/windows/images/env.png)

#### Sciter

デスクトップ版は GUI に [Sciter](https://sciter.com/) を使用しています。[sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll) をダウンロードしてください。

#### LLVM

`rust-bindgen` は `clang` に依存しています。[LLVM](https://github.com/llvm/llvm-project/releases) をダウンロードしてインストールし、システム環境変数 `LIBCLANG_PATH`=`<llvm_install_dir>/bin` を追加します。

LLVM バイナリ版 15.0.2 はこちらからダウンロードできます: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe)

### ビルド

#### デフォルト

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```