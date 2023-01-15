---
title: Android
weight: 22
---

{{% notice note %}}
Diese Anleitung basiert auf **Linux** und setzt voraus, dass Sie mit [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) und [Flutter](https://flutter.dev/) **vertraut** sind. Wenn nicht, überspringen Sie bitte diese Seite.
{{% /notice %}}

## Rust erstellen
```
cd
# Um Ihre und unsere Zeit zu sparen, haben wir abhängige Dateien für Sie vorbereitet.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# Bitte verwenden Sie r22b, das neue NDK hat folgendes Problem
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip
unzip android-ndk-r22b-linux-x86_64.zip

# ffigen und llvm installieren 
dart pub global activate ffigen 5.0.1
# Auf Ubuntu 18 ist es: sudo apt install libclang-9-dev
sudo apt-get install libclang-dev
sudo apt install gcc-multilib

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r22b flutter/ndk_arm64.sh
```

## Flutter erstellen

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Auf Ihrem Android-Gerät ausführen, unterstützt noch keinen Simulator (Bitte fragen Sie nicht, warum).
# Viel Glück!
# openjdk 11 erforderlich, nicht höher oder niedriger verwenden, beide haben ein Problem
flutter run
```
