---
title: Android
weight: 22
---

{{% notice note %}}
Este tutorial se basa en **Linux**, y suponiendo que eres **familiar** con [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) y [Flutter](https://flutter.dev/). Si no lo es, salte.
{{% /notice %}}

## Compilar Rust
```
cd
# Para ahorrar su tiempo y el nuestro, preparamos archivos dependientes para usted.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# use r22b, el nuevo NDK tiene el siguiente problema
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip
unzip android-ndk-r22b-linux-x86_64.zip

# install ffigen and llvm 
dart pub global activate ffigen 5.0.1
# en Ubuntu 18, es: sudo apt install libclang-9-dev
sudo apt-get install libclang-dev

git clone https://github.com/rustdesk/rustdesk
cd rustdesk
rustup target add aarch64-linux-android 

cargo install cargo-ndk

VCPKG_ROOT=$HOME/vcpkg ANDROID_NDK_HOME=$HOME/android-ndk-r22b flutter/ndk_arm64.sh
```

## Compilar Flutter

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
# Ejecute en su dispositivo Android, no es compatible con el simulador todavía (no pregunte por qué).
# Buena suerte!
# openjdk 11 requerido, no use más alto o más bajo, ambos tienen problemas
flutter run
```
