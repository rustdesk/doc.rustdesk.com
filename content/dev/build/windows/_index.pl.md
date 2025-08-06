---
title: Windows
weight: 20
---

{{% notice note %}}
Podane tutaj polecenia muszą być uruchamiane w Git Bashu a nie w natywnym wierszu poleceń, w innym przypadku będą występować błędy składni.
{{% /notice %}}

## Zależności

### Środowisko budowania C++

Pobierz [MSVC](https://visualstudio.microsoft.com/) i zainstaluj.
Wybierz `Windows` jako system operacyjny dewelopera i zaznacz `C++`, następnie pobierz Visual Studio Community i zainstaluj. Instalacja może zająć chwilę.

###  Środowisko programistyczne Rusta

Pobierz [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) i uruchom jako administrator aby zainstalować `rusta`.

### vcpkg

Przejdź do foleru do którego chcesz sklonować vcpkg i użyj [Git Basha](https://git-scm.com/download/win) aby wykonać poniższe polecenia; pobierz `vcpkg` i zainstaluj 64-bitową wersję `libvpx`, `libyuv` i `opus`.
Jeżeli nie masz jeszcze zainstalowanego `Gita`, możesz go pobrać [tutaj](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Dodaj systemową zmienną środowiskową `VCPKG_ROOT`=`<sciezka>\vcpkg`. Wartość `<sciezka>` to powyższa lokalizacja gdzie sklonowałeś `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

Desktopowe wersje korzystają ze [Scitera](https://sciter.com/) do GUI, z tego powodu musisz pobrać plik [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

### LLVM

`rust-bindgen` zależy od `clang`, pobierz [LLVM](https://github.com/llvm/llvm-project/releases) i zainstaluj, następnie dodaj systemową zmienną środowiskową `LIBCLANG_PATH` na `<katalog_instalacyjny_llvm>/bin`.

Możesz pobrać wersję 15.0.2 plików binarnych LLVM tutaj: [64 bitowe](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bitowe](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

## Budowanie

### Domyślne

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
