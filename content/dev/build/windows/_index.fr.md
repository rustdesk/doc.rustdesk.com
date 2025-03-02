---
title: Windows
weight: 20
---


{{% notice note %}}
Les lignes de commande ce dessous doivent être exécutées dans `git-bash` et non dans "l'invite de commande", sinon vous obtiendrez des erreurs de syntaxe.
{{% /notice %}}

## Dépendances

### Environnement de compilation C++

Télécharger et installer [msvc](https://visualstudio.microsoft.com/).
Sélectionner "Windows" en tant que système d'exploitation de la machine de développement et "C++", puis téléchargez la version Visual Studio Community et installez-la. L'installation peut prendre un certain temps.

### Environnement de développement Rust
Téléchargez et exécuter en tant qu'administrateur pour installer "rust" [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) 

### vcpkg

Accédez au dossier dans lequel vous souhaitez cloner vcpkg et utilisez [git-bash](https://git-scm.com/download/win) afin d'exécuter les commandes données ci après qui permettrons de télécharger "vcpkg", et installer la version 64 bits de "libvpx", "libyuv" et "opus".
Si vous n'avez pas installé "git", téléchargez le [ici](https://git-scm.com/download/win).

```shell
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2023.04.15
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```
Ajoutez la variable d'environnement système `VCPKG_ROOT=<chemin>\vcpkg`. Le "\<chemin\>" devra être l'emplacement que vous avez choisi ci-dessus pour cloner "vcpkg".

![](/docs/en/dev/build/windows/images/env.png)

### sciter

Les versions Bureau utilisent la bibliothèque [sciter](https://sciter.com/) pour l'interface graphique. Téléchargez [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

### llvm

rust-bindgen dépend de clang, téléchargez et installez [llvm](https://github.com/llvm/llvm-project/releases), ajoutez la variable d'environnement système `LIBCLANG_PATH=<llvm_install_dir>/bin`.

Vous pouvez télécharger LLVM 15.02 ici : [64-bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32-bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe)


## Compilation

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
