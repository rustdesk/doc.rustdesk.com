---
title: Android
weight: 22
---

{{% notice note %}}
Это руководство основано на **Linux**, и предполагается, что вы **знакомы** с [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) и [Flutter](https://flutter.dev/). Если это не так, пожалуйста, пропустите.
{{% /notice %}}

## Сборка на Rust
```
cd
# Для экономии вашего и нашего времени мы подготовили для вас файлы зависимостей.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# пожалуйста, используйте r23c, у нового NDK имеется следующая проблема
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r23c-linux.zip
unzip android-ndk-r23c-linux.zip

# установка ffigen и llvm 
dart pub global activate ffigen
sudo apt-get install libclang-dev

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r23c flutter/ndk_arm64.sh
```

## Сборка на Flutter

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Запустите на своем устройстве Android, симулятор пока не поддерживается (Пожалуйста, не спрашивайте, почему).
# Требуется openjdk 11, не используйте более высокие или более низкие версии, у них есть проблемы.
# Удачи!
flutter run
```
