---
title: Android
weight: 22
---

{{% notice note %}}
This tutorial suppose that you are **familiar** with [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) and [Flutter](https://flutter.dev/). If you are not, please skip. Or you can go further but at your own risk
{{% /notice %}}

{{% notice note %}}
It is possible to build RustDesk Android on **Windows** 
Developing RustDesk on **Windows** and **MacOS** instruction is still under active development
{{% /notice %}}

# Introduction

Here you will learn how to prepare your environment to such an extent that you will be able to successfully build the application and enable yourself to work on the code through, for example, Android Studio.

This tutorial is based on latest working workflow file, to ensuree that everything will just works, if you encounter any problems feel free to contact us on our [Discord](https://discord.com/invite/nDceKgxnkV) or by other communication channel.

It is possible to build, run end edit Android version on Windows, but it requires patched `flutter` directory

By "patched" I mean directory in state like before running `flutter build` on Linux machine. 

# Assumptions
- You are using **Ubuntu 20.04** or later ( due to fact that this tutorial is based on this version)
- You have working internet connection
- You already installed [**Flutter**](https://docs.flutter.dev/get-started/install/linux), [**vcpkg**]() and [**Rust**](https://www.rust-lang.org/tools/install)
- You cloned [RustDesk repository](https://github.com/rustdesk/rustdesk)
- You know what are you doing

# System
This part of tutorial is based on clean **Ubuntu 20.04** instance with prerequisites like **Flutter**, **Rust** and **vcpkg** already installed and configured.

If you missing any of these prerequisites, obtain and configure them, then go back here.

# Instruction
This is step-to-step instruction.

## Generating Bridge 🌉

Due to fact that this project is based on [Flutter Rust Bridge](https://cjycode.com/flutter_rust_bridge/index.html) you should first generate it, you can achieve it by running following commands:

Change your current directory into `rustdesk` directory:

```
cd rustdesk
```

**If you did not have one**, clone [RustDesk repository](https://github.com/rustdesk/rustdesk), you can achieve that by running:

```
git clone https://github.com/rustdesk/rustdesk
```

Then you'll be able to change your directory into `rustdesk`

```
cd rustdesk
```

You also might be required to install some prerequisites if you are doing this first time
```
sudo apt update -y
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang cmake libclang-dev ninja-build llvm-dev libclang-10-dev llvm-10-dev pkg-config
```
### Installing Flutter Rust Bridge dependencies
At this step you'll install additional dependencies required by [Flutter Rust Bridge](https://cjycode.com/flutter_rust_bridge/index.html) also you'll download flutter dependencies from `pubspec.yaml` file.

This might take some time depending on your internet connection speed and overall desktop performance
```
cargo install flutter_rust_bridge_codegen
pushd flutter && flutter pub get && popd
```
### Generating bridge files
In order for everything to work you'll need to generate Flutter Rust Bridge, in order to do it simply run:

```
~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

If everything worked fine, you should see something like this in your's terminal window:
```yaml
2023/02/27 20:44:39 [INFO] Success!
2023/02/27 20:44:39 [INFO] Now go and use it :)
```

## Building RustDesk for Android 📱

### Installing dependencies

At this step you might require some additional dependencies, you could install them by running this:
```
sudo apt update -y
sudo apt-get -qq install -y  git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake libclang-dev ninja-build libappindicator3-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libvdpau-dev libva-dev libclang-dev llvm-dev libclang-10-dev llvm-10-dev pkg-config tree g++ libc6-dev gcc-multilib g++-multilib openjdk-11-jdk-headless
```
### Downloading additional dependencies
For this tutorial we prepared some dependencies for you, feel free to use them. It requires `vcpkg` to be installed, in this case at `/opt`

```
pushd /opt
sudo wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
sudo tar xzf dep.tar.gz
popd
```

#### Warning
It requires vcpkg directory to be at `$HOME`, if `Building rustdesk lib` part of this instruction will throw errors like:
```yaml
error: failed to run custom build command for `magnum-opus v0.4.0 (https://github.com/rustdesk/magnum-opus#79be072c)`

Caused by:
  process didn't exit successfully: `/home/user/rustdesk/target/release/build/magnum-opus-05dc0023b86da8fc/build-script-build` (exit status: 101)
  --- stdout
  cargo:info=arm64-android
  cargo:rustc-link-lib=static=opus
  cargo:rustc-link-search=/home/user/vcpkg/installed/arm64-android/lib
  cargo:include=/home/user/vcpkg/installed/arm64-android/include
  rerun-if-changed=/home/user/.cargo/git/checkouts/magnum-opus-4bb999f3bcbf6ab0/79be072/opus_ffi.h
  rerun-if-changed=/home/user/vcpkg/installed/arm64-android/include
```
consider running installing `vcpkg` in your home directory, then running
```
pushd $HOME
sudo wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
sudo tar xzf dep.tar.gz
popd
``` 

### Disabling Flutter Rust Bridge build
You'll might need to disable building Flutter Rust Bridge from `build.rs` file, you can do it by running:
```
sed -i "s/gen_flutter_rust_bridge();/\/\//g" build.rs
```

### Building rustdesk lib
At this step you'll build `librustdesk.so` file

First, add triplet to rust:
```
rustup target add aarch64-linux-android
```

Then install `cargo-ndk` it is required to generate `librustdesk.so` file

```
cargo install cargo-ndk
```

Now it's time to run `ndk_arm64.sh`, this script contains code that build's Rust for Flutter, it requires `NDK` in version `r22b`. 

You could download it [here](https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip), you'll be required to install it manually or follow [this](https://developer.android.com/studio/projects/install-ndk) instruction. This file is quite heavy so this proceeds might take a while, it mostly depends on your internet connection.

Just remember to set **ANDROID_NDK_HOME** variable and check if it's valid

Then simply run:
```
./flutter/ndk_arm64.sh
```

### Moving generated library into jniLibs directory
If you generated `librustdesk.so` then create proper directory:
```
mkdir -p ./flutter/android/app/src/main/jniLibs/arm64-v8a
```
And just copy it there
```
cp ./target/aarch64-linux-android/release/liblibrustdesk.so ./flutter/android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
```

### Building RustDesk
It's the last step, now we'll build our apk. 

If you done everything correctly you'll be able to build it with ease.

First you need to download so
```
pushd flutter
sudo wget -O so.tar.gz https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
```
Then unpack it
```
tar xzvf so.tar.gz
popd
```
We'll temporary use debug sign config

```
sed -i "s/signingConfigs.release/signingConfigs.debug/g" ./flutter/android/app/build.gradle
```
Then you need to copy `librustdesk.so` file into proper directory
```
mkdir -p ./flutter/android/app/src/main/jniLibs/arm64-v8a
cp ./target/aarch64-linux-android/release/liblibrustdesk.so ./flutter/android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
```
Now we'll finally build Flutter
```
pushd flutter
flutter build apk --release --target-platform android-arm64 --split-per-abi
```
{{% notice note %}}
At this step you might see some errors in terminal, this is normal as long as they about kotlin or 
{{% /notice %}}

### Optional
If you want you might move builded app somewhere else, feel free to run:
```
mv build/app/outputs/flutter-apk/app-arm64-v8a-release.apk ../rustdesk-release.apk
```