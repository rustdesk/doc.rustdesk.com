---
title: Android
weight: 22
---

{{% notice note %}}
Ez a tutorial **Linux**-ra van építve, és feltételezi hogy te **ismered** az [Android NDK](https://developer.android.com/ndk/downloads)-t, a [Rust](https://rustup.rs/)-ot és a [Flutter](https://flutter.dev/)-t. Ha nem ismered ezeket, kérlek skippelj.
{{% /notice %}}

## Építsd meg a Rustot
```
cd
# Hogy időt mentsünk, előre elkészítettük a build fájlokat.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# Kérlek használd az r22b-t, az új NDK-nak a következő hibája van:
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip
unzip android-ndk-r22b-linux-x86_64.zip

# ffigen és llvm telepítése
dart pub global activate ffigen 5.0.1
# Ubuntu 18: sudo apt install libclang-9-dev
sudo apt-get install libclang-dev

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r22b flutter/ndk_arm64.sh
```

## Építsd meg a Fluttert

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Az android eszközödön futtasd, nincs simulator támogatás. (Ne kérdezd miért)
# Sok sikert!
# openjdk11 a minimum, ne használj újabbat, se régebbit
flutter run
```