---
title: Windows
weight: 20
---

{{% notice Let op %}}
De commando-regel commando's moeten worden uitgevoerd in git-bash en niet in command prompt, anders krijg je syntaxfouten.
{{% /notice %}}

## Afhankelijkheden

### C++ build-omgeving

Download [msvc](https://visualstudio.microsoft.com/) en installeer.
Selecteer `Windows` als Ontwikkelmachine OS en vink `C++` aan, download dan Visual Studo Community versie en installeer. De installatie kan even duren.

### Rust ontwikkel omgeving
Download [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) en voer het uit als administrator om `rust` te installeren.

### vcpkg

Ga naar de map waarin u vcpkg wilt klonen en gebruik [git-bash](https://git-scm.com/download/win) om de volgende commando's uit te voeren， download `vcpkg`, installeer 64bit versie van `libvpx`, `libyuv` en `opus`.
Als je `git` niet hebt ingesteld, haal dan `git` [hier](https://git-scm.com/download/win).

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2021.12.01
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

Voeg Systeem omgevingsvariabele toe `VCPKG_ROOT`=`<path>\vcpkg`. Het `<path>` moet de locatie zijn die u hierboven hebt gekozen om `vcpkg` te klonen.

![](/docs/en/dev/build/windows/images/env-nl.png)

### sciter

Desktop versies gebruiken [sciter](https://sciter.com/) voor GUI, download [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

### llvm

rust-bindgen zijn afhankelijk van clang, download [llvm](https://github.com/llvm/llvm-project/releases) en installeer, voeg systeem omgevingsvariabele `LIBCLANG_PATH`=`<llvm_install_dir>/bin` toe.

You can download 15.02 of the LLVM binaries here: [64-bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32-bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe)


## Build

### Standaard

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
