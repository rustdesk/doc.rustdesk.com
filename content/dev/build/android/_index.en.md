---
title: Android
weight: 22
---

{{% notice note %}}
This tutorial is based on **Linux**, and supposing you are **familiar** with [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) and [Flutter](https://flutter.dev/). If you are not, please skip.
{{% /notice %}}

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
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
cargo install cargo-ndk
OPENSSL_DIR=$HOME/openssl VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r22b flutter/ndk_arm64.sh
```

## Build Flutter

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Run on your android device, not support simulator yet (Please do not ask why).
# Good Luck!
flutter run
```
