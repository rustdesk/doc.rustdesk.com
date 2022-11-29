# Environment Configuration for Build

## Dependencies

- C++ build environment
- Rust develop environment
- vcpkg
- sciter
- Python
- llvm (Versão 10.0.0)
- Dart
- Flutter ( V3.0.5 )

### C++ build environment

Install the C++ build if you don't have the visual studio code installed on the machine.

Link for C++ Build 

- [https://visualstudio.microsoft.com/pt-br/](https://visualstudio.microsoft.com/pt-br/)

### Rust develop environment

Link for Rust

Note: Requires administrator permissions to install and configure

- [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

### vcpkg

Install vcpkg to install sciter dependencies

Link for vcpkg

- [https://github.com/microsoft/vcpkg](https://github.com/microsoft/vcpkg)

To install and configure vcpkg follow the steps below:

1. Download vcpkg
2. Open powershell as administrator
3. Run the command below to clone the vcpkg repository

```bash

git clone https://github.com/microsoft/vcpkg
git checkout 2021.12.01

```

After cloning the repository, navigate to the vcpkg folder and run the command below to install vcpkg

```bash
vcpkg/bootstrap-vcpkg.bat
```

Create an environment variable in windows with the following content:

| Nome da variável | Conteúdo |
| --- | --- |
| VCPKG_ROOT | Path to the location where the repository clone was made Ex: ( C:\Users\seu_usuario\vcpkg ) |

Run the command below to install dependencies and enable vcpgk

```bash
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static
```

### sciter

Link for Sciter

- [https://sciter.com/](https://sciter.com/)

Link for Sciter DLL

- [Sciter DLL](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll)

Copy the sciter DLL to

```bash

...{Raiz do Projeto Rustdesk}.../target/debug
...{Raiz do Projeto Rustdesk}.../target/release

```

### Python

Note:

- Download and install following the recommendations and accept all options.
- At the end it will ask to disable the path size limit, accept and finish the installation
- At the end of the installation, go to the folder where it was installed, make a copy of the python.exe and pip.exe executables
- I renamed the copies to python3.exe and pip3.exe respectively.

Link for Python

- [https://www.python.org/downloads/](https://www.python.org/downloads/)

### lvvm

Link for llvm (10)

- [https://releases.llvm.org/download.html](https://releases.llvm.org/download.html)
- [https://github.com/llvm/llvm-project/releases/download/llvmorg-10.0.0/LLVM-10.0.0-win64.exe](https://github.com/llvm/llvm-project/releases/download/llvmorg-10.0.0/LLVM-10.0.0-win64.exe)

Link for llvm (15)

- [https://github.com/llvm/llvm-project/releases](https://github.com/llvm/llvm-project/releases)

### Dart/Flutter

Obs: Flutter Version 3.0.5

- [https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.0.5-stable.zip](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.0.5-stable.zip)

## Finalizing the configuration

To complete the installation, run the commands below.

```bash
cargo run
cargo build --release
```

Okay, if there's been no problem so far, you're on the right track.

## Run the flutter project (The icing on the cake)

In the flutter project root create a file called run.ps1 and paste the following content:

```bash
dart pub global activate ffigen --version 5.0.1
flutter pub get
cargo build --features flutter
flutter run -d windows
```

To run the flutter project, follow the steps below:

1. Open powershell as administrator

2. Run the command below to install flutter

```bash
dart pub global activate ffigen --version 5.0.1
$exists = Test-Path ~/.cargo/bin/flutter_rust_bridge_codegen.exe
Push-Location ..
git clone https://github.com/SoLongAndThanksForAllThePizza/flutter_rust_bridge --depth=1
Push-Location flutter_rust_bridge/frb_codegen ; cargo install --path . ; Pop-Location
Pop-Location
Push-Location flutter ; flutter pub get ; Pop-Location
~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

If you don't have compilation problems, also run the command below:

```bash
python3 .\build.py --portable --hwcodec --flutter
```

Finished run the run.ps1 file

```bash
.\run.ps1
```

Okay, now you can navigate to the flutter project folder and run the project.

At the end of the changes, if you want to generate the portable run the build.py script at the root of the project and it will generate an EXE with the project with the embedded dependencies.
