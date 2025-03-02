---
title: macOS
weight: 21
---

There are multiple ways to do this, this guide assumes that `Xcode`, `Git` and `Homebrew` are already installed.

The biggest challenge is probably to find versions of all the tools that work together, especially since parts of the toolchain like Xcode and LLVM are dictated by your macOS version. The versions used in this guide probably aren't what you should use. As a start to figure what versions to use is to look in the [GitHub build workflow](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) for the RustDesk version you want to build. Choose the tag for which to see the file in the upper left of the page. But that won't necessarily work because the macOS tools that comes with the GitHub runner might not be the same versions as those on your local system.

#### Export
`export` is used to set various environmental variables. When you run `export`, that variable is set for the current terminal session only, and these must therefore be repeated for every new terminal window you want to use to build RustDesk, now or in the future. Generally, it's preferable to add all `export`s to a script that is executed automatically for every terminal that is opened, for example `~/.bash_profile`. The full `export` commands listed here can simply be appended to the file, but must also be run in the current terminal because the file isn't read until a *new* terminal is opened.

### Install the tools we're going to use from Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Some of the installations might fail because some of the target folders don't exist on our system. In that case, create the folder, set owner and permissions and run the `brew` command again. Example if `/usr/local/include` doesn't exist:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

### Install vcpkg
Vcpkg is used to manage the C/C++ dependencies used by RustDesk. Decide where you want the installation and run the following from the folder in which you want the `vcpkg` folder to reside. In this example `/Users/<username>/repos/` is used as the location, and the tag `2023.04.15` is used as the version.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

### Install and configure Rust
We use `rustup` to manage Rust, which was already installed above using Homebrew. But, it still needs to be configured. Follow the instructions and make sure both `rustup` and `rustc` are on the `PATH`. In this example we use Rust version `1.75.0`, but you might need to use a different version. You can install and manage multiple versions of Rust with `rustup`.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
For an overview over installed and default Rust toolchains, run `rustup show`.

### Download the RustDesk source files

Decide where you want the RustDesk source files and run the following from the folder in which you want the `rustdesk` folder to reside. In this example `/Users/<username>/repos/` is used as the location.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

If `python3` or `pip` is unknown, add them to the `PATH` with something like (use your actual folder names):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Once that's done, run the failed command(s) again. Remember to also edit `~/.bash_profile`.

### Install user interface components
RustDesk can be built both using [Sciter](https://sciter.com/) and [Flutter](https://flutter.dev/). Both of these need additional components, so follow the steps for the relevant version, or both.

#### Sciter

From the `rustdesk` folder, run:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

#### Flutter

[FVM](https://fvm.app/) lets you manage which version of Flutter is used, and is probably the easiest way to be able to easily try different Flutter versions.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Install and use, for example Flutter `3.16.9`, with:

```sh
fvm global 3.16.9
```
FVM is meant to use a more complex setup where it can provide different Flutter versions for different projects, but that's beyond the scope of this guide. Instead, simply add the location of the default Flutter provided by FVM to your `PATH` manually, which means that you must use `fvm global` to switch Flutter version:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Once that is done, you should disable telemetry and check if everything is OK:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
It doesn't matter if some of the checks fail, they usually will, what's important is that the check for the environment you intend to use is OK, namely `Xcode`. If there are problems reported, address them before moving forward.

Once Flutter is up and running, it's time to install the "bridge" that binds Rust and Flutter together. Here is another one of the versions that much work together with everything else, in this example we use `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

### Build

Build from the `rustdesk` folder. Build the Sciter version with:

```sh
python3 ./build.py
```

Build the Flutter version with:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
If everything goes well, you should now have a `dmg` file ready to install in your `rustdesk` folder.
