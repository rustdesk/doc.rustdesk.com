---
title: Android
weight: 22
---

{{% notice note %}}
This tutorial suppose that you are **familiar** with [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) and [Flutter](https://flutter.dev/). If you are not, please skip. Or you can go further but at your own risk
{{% /notice %}}

{{% notice note %}}
It is possible to build, run end edit Android version on Windows, but it requires patched `flutter` directory

By "patched" I mean directory in state like before running `flutter build` on Linux machine. 

Developing RustDesk on **Windows** and **MacOS** instruction is still under active development
{{% /notice %}}

# Introduction

Here you will learn how to prepare your environment to such an extent that you will be able to successfully build the application and enable yourself to work on the code through, for example, Android Studio.

This tutorial is based on latest working workflow file, to ensuree that everything will just works, if you encounter any problems feel free to contact us on our [Discord](https://discord.com/invite/nDceKgxnkV) or by other communication channel.

# Linux

## Assumptions
- You are using **Ubuntu 20.04** or later ( due to fact that this tutorial is based on this version)
- You have working internet connection
- You already installed [**Flutter**](https://docs.flutter.dev/get-started/install/linux), [**vcpkg**]() and [**Rust**](https://www.rust-lang.org/tools/install)
- You cloned [RustDesk repository](https://github.com/rustdesk/rustdesk)
- You know what are you doing

## Build Rust
```
cd
# For saving your time and our time, we prepared dependent files for you.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# please use r22b, new NDK has below problem
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip
unzip android-ndk-r22b-linux-x86_64.zip

# install ffigen and llvm 
dart pub global activate ffigen 5.0.1
# on Ubuntu 18, it is: sudo apt install libclang-9-dev
sudo apt-get install libclang-dev
sudo apt install gcc-multilib

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r22b flutter/ndk_arm64.sh
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
