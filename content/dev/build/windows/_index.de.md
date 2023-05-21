---
title: Windows
weight: 20
---

{{% notice note %}}
Die Kommandos in der Befehlszeile müssen in Git Bash und nicht in der Eingabeaufforderung ausgeführt werden, da sonst Syntaxfehler auftreten.
{{% /notice %}}

## Abhängigkeiten

### C++-Build-Umgebung

Laden Sie [Visual Studio](https://visualstudio.microsoft.com/) herunter und installieren Sie es.
Wählen Sie `Windows` als Betriebssystem für die Entwicklungsmaschine und markieren Sie `C++`, laden Sie dann die Visual Studio Community-Version herunter und installieren Sie sie. Die Installation kann eine Weile dauern.

### Rust-Entwicklungsumgebung
Laden Sie [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) herunter und führen Sie es als Administrator aus, um `rust` zu installieren.

### vcpkg

Gehen Sie in den Ordner, in den Sie `vcpkg` klonen wollen, und verwenden Sie [Git Bash](https://git-scm.com/download/win), um die folgenden Befehle auszuführen: Laden Sie `vcpkg` herunter, installieren Sie die 64-Bit-Version von `libvpx`, `libyuv` und `opus`.
Wenn Sie `git` nicht installiert haben, holen Sie sich `git` [hier](https://git-scm.com/download/win).

```sh
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg
  git checkout 2023.04.15
  cd ..
  vcpkg/bootstrap-vcpkg.bat
  export VCPKG_ROOT=$PWD/vcpkg
  vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Fügen Sie die Systemumgebungsvariable `VCPKG_ROOT`=`<pfad>\vcpkg` hinzu. `<pfad>` sollte der Ort sein, den Sie oben zum Klonen von `vcpkg` gewählt haben.

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

Desktop-Versionen verwenden [Sciter](https://sciter.com/) für die Benutzeroberfläche, bitte laden Sie [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll) herunter.

### LLVM

rust-bindgen hängt von clang ab, laden Sie [LLVM](https://github.com/llvm/llvm-project/releases) herunter und installieren Sie es. Fügen Sie die Systemumgebungsvariable `LIBCLANG_PATH`=`<llvm_install_dir>/bin` hinzu.

Sie können die Version 15.0.2 der LLVM-Binärdateien hier herunterladen: [64 Bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 Bit](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).


## Erstellen

### Standard

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
