---
title: Android
weight: 22
---

{{% notice note %}}
This tutorial is based on **Linux**, and supposing you are **familiar** with [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) and [Flutter](https://flutter.dev/). If you are not, please skip.
{{% /notice %}}

{{% notice note %}}
It is possible to build RustDesk Android on **Windows** 
{{% /notice %}}

## Generating Bridge

Due to fact that this project is based on [Flutter Rust Bridge](https://cjycode.com/flutter_rust_bridge/index.html) you should first generate it, you can achieve it by running following commands:

- Change your current directory into `rustdesk` directory, if you did not have one, clone [RustDesk repository](https://github.com/rustdesk/rustdesk), you can achieve that by running: `git clone https://github.com/rustdesk/rustdesk`

```
cd rustdesk
```

You also might be required to install some prerequisites if you are doing this first time
```
sudo apt update -y
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang cmake libclang-dev ninja-build llvm-dev libclang-10-dev llvm-10-dev pkg-config
```
## Installing Flutter Rust Bridge dependencies
At this step you'll install additional dependencies required by [Flutter Rust Bridge](https://cjycode.com/flutter_rust_bridge/index.html) also you'll download flutter dependencies from `pubspec.yaml` file.

This might take some time depending on your internet connection speed and overall desktop performance
```
cargo install flutter_rust_bridge_codegen
pushd flutter && flutter pub get && popd
```

## Running Flutter Rust Bridge
This step will generate flutter bridge file (`generated_bridge.dart`), you'll use it later

This should take approximately 2 - 5 minutes
```
~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

## Build Flutter

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Run on your android device, not support simulator yet (Please do not ask why).
# Good Luck!
# openjdk 11 required, do not use higher or lower, both has problem
flutter run
```
