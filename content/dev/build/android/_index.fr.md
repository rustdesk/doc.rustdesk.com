---
title: Android
weight: 22
---

{{% notice note %}}
Ce tutoriel est basé sur **Linux**, et en supposant que vous êtes **familier** avec [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) et [Flutter](https://flutter.dev/). Si vous ne l'êtes pas, passez votre chemin.
{{% /notice %}}

## Compiler Rust
```
cd
# Pour gagner du temps et de notre temps, nous avons préparé des fichiers dépendants pour vous.
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
tar xzf dep.tar.gz
# Veuillez utiliser R22B, le nouveau NDK a un problème voir lien ci-dessous
# https://stackoverflow.com/questions/68873570/how-do-i-fix-ld-error-unable-to-find-library-lgcc-when-cross-compiling-rust
wget https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip
unzip android-ndk-r22b-linux-x86_64.zip

# installez ffigen and llvm 
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

## Compiler Flutter

```
cd flutter
wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
tar xzf so.tar.gz
cp ../target/aarch64-linux-android/release/liblibrustdesk.so android/app/src/main/jniLibs/arm64-v8a/librustdesk.so

# A exécuter sur votre appareil Android, ne pas demander pourquoi ceci ne fonctionne pas toujours avec les émulateurs android!
# OpenJDK 11 requis ni avant, ni après, sinon il y aura un problème
# Bonne chance!
flutter run
```
