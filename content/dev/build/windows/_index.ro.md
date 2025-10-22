---
title: Windows
weight: 20
---

{{% notice note %}}
Comenzile din linia de comandă de aici trebuie rulate în Git Bash, nu în Command Prompt, altfel veți primi erori de sintaxă.
{{% /notice %}}

## Dependențe

### Mediu de build C++

Descărcați [MSVC](https://visualstudio.microsoft.com/) și instalați-l.
Selectați `Windows` ca OS pentru mașina Developer și bifați `C++`, apoi descărcați și instalați Visual Studio Community. Instalarea poate dura ceva timp.

### Mediu de dezvoltare Rust

Descărcați [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) și rulați-l ca administrator pentru a instala `rust`.

### vcpkg

Mergeți în folderul în care doriți să clonați `vcpkg` și folosiți [Git Bash](https://git-scm.com/download/win) pentru a rula comenzile de mai jos; acestea vor descărca `vcpkg` și vor instala versiunea pe 64-bit a pachetelor `libvpx`, `libyuv` și `opus`.
Dacă nu aveți `Git` instalat, descărcați-l de [aici](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Adăugați variabila de sistem `VCPKG_ROOT`=`<path>\vcpkg`. `<path>` ar trebui să fie locația în care ați clonat `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

Versiunile desktop folosesc [Sciter](https://sciter.com/) pentru GUI; descărcați `sciter.dll` de la: https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll

### LLVM

`rust-bindgen` depinde de `clang`; descărcați [LLVM](https://github.com/llvm/llvm-project/releases) și instalați-l, apoi adăugați variabila de sistem `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

Puteți descărca versiunea 15.0.2 a binarelor LLVM aici: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

## Build

### Implicit

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```