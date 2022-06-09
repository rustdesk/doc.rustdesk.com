---
title: 安卓
weight: 22
---

{{% notice note %}}
本教程基于**Linux**，假设您**熟悉** [Android NDK](https://developer.android.com/ndk/downloads)、[Rust](https://rustup.rs/) 和 [Flutter](https://flutter.dev/)。 如果你是初学者，可能比较费劲。
{{% /notice %}}

## 构建 Rust
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
dart pub global activate ffigen
# on Ubuntu 18, it is: sudo apt install libclang-9-dev
sudo apt-get install libclang-dev

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r22b flutter/ndk_arm64.sh
```

## 构建 Flutter

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Run on your android device, not support simulator yet (Please do not ask why).
# Good Luck!
flutter run
```
