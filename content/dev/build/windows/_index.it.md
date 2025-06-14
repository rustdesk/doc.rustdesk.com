---
title: Windows
weight: 20
---

{{% notice note %}}
I comandi da riga di comando qui mostrati devono essere eseguiti in Git Bash e non nel prompt dei comandi, altrimenti si verificheranno errori di sintassi.
{{% /notice %}}

### Dipendenze

#### Ambiente di build C++

Scarica [MSVC](https://visualstudio.microsoft.com/) e installalo.
Seleziona `Windows` come OS della macchina di sviluppo e spunta `C++`, quindi scarica la versione Visual Studio Community e installala. L'installazione potrebbe richiedere un po' di tempo.

#### Ambiente di sviluppo Rust

Scarica [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) ed eseguilo come amministratore per installare `rust`.

#### vcpkg

Vai nella cartella dove vuoi clonare vcpkg e usa [Git Bash](https://git-scm.com/download/win) per eseguire i seguenti comandi, per scaricare `vcpkg` e installare le versioni a 64 bit di `libvpx`, `libyuv` e `opus`.
Se non hai `Git` installato, scarica `Git` [qui](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Aggiungi la variabile d'ambiente di sistema `VCPKG_ROOT`=`<path>\vcpkg`. Il `<path>` dovrebbe essere la posizione scelta sopra per clonare `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

#### Sciter

Le versioni desktop utilizzano [Sciter](https://sciter.com/) per la GUI, per favore scarica [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

#### LLVM

`rust-bindgen` dipende da `clang`, scarica [LLVM](https://github.com/llvm/llvm-project/releases) e installalo, aggiungi la variabile d'ambiente di sistema `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

Puoi scaricare la versione 15.0.2 dei binari LLVM qui: [64 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

### Build

#### Predefinito

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```