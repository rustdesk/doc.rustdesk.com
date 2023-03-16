---
title: 安卓
weight: 22
---

{{% notice note %}}
本教程基於**Linux**，假設您**熟悉** [Android NDK](https://developer.android.com/ndk/downloads)、[Rust](https://rustup.rs/) 和 [Flutter](https://flutter.dev/)。如果你是初學者，可能比較費勁。
{{% /notice %}}

## 構建 Rust
```
cd
# For saving your time and our time, we prepared dependent files for you.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# please use r23c, new NDK has below problem
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r23c-linux.zip
unzip android-ndk-r23c-linux.zip

# install ffigen and llvm 
dart pub global activate ffigen 5.0.1
# on Ubuntu 18, it is: sudo apt install libclang-9-dev
sudo apt-get install libclang-dev

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r23c flutter/ndk_arm64.sh
```

## 構建 Flutter

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
