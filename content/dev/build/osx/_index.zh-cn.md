---
title: macOS
weight: 21
---

有多种方式可以完成这项工作，本指南假设您已经安装了 `Xcode`、`Git` 和 `Homebrew`。

最大的挑战可能是找到所有能够协同工作的工具版本，特别是因为工具链的某些部分（如 Xcode 和 LLVM）由您的 macOS 版本决定。本指南中使用的版本可能不是您应该使用的版本。确定使用什么版本的起点是查看您想要构建的 RustDesk 版本的 [GitHub 构建工作流](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml)。在页面左上角选择要查看文件的标签。但这可能不一定有效，因为 GitHub 运行器附带的 macOS 工具可能与您本地系统上的版本不同。

#### Export
`export` 用于设置各种环境变量。当您运行 `export` 时，该变量仅为当前终端会话设置，因此必须在每个新的终端窗口中重复这些设置，无论是现在还是将来想要构建 RustDesk 时。通常，最好将所有 `export` 添加到为每个打开的终端自动执行的脚本中，例如 `~/.bash_profile`。这里列出的完整 `export` 命令可以简单地追加到文件中，但也必须在当前终端中运行，因为文件在打开*新*终端之前不会被读取。

### 从 Homebrew 安装我们要使用的工具

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

某些安装可能会失败，因为我们的系统上不存在某些目标文件夹。在这种情况下，创建文件夹，设置所有者和权限，然后再次运行 `brew` 命令。例如，如果 `/usr/local/include` 不存在：
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

### 安装 vcpkg
Vcpkg 用于管理 RustDesk 使用的 C/C++ 依赖项。决定您希望安装的位置，并从您希望 `vcpkg` 文件夹所在的文件夹运行以下命令。在此示例中，使用 `/Users/<username>/repos/` 作为位置，使用标签 `2023.04.15` 作为版本。

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

### 安装和配置 Rust
我们使用 `rustup` 来管理 Rust，它已经通过上面的 Homebrew 安装了。但是，它仍然需要配置。按照说明操作，并确保 `rustup` 和 `rustc` 都在 `PATH` 中。在这个示例中我们使用 Rust 版本 `1.75.0`，但您可能需要使用不同的版本。您可以使用 `rustup` 安装和管理多个版本的 Rust。

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
要查看已安装和默认的 Rust 工具链概述，请运行 `rustup show`。

### 下载 RustDesk 源文件

决定您希望 RustDesk 源文件的位置，并从您希望 `rustdesk` 文件夹所在的文件夹运行以下命令。在此示例中，使用 `/Users/<username>/repos/` 作为位置。

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

如果 `python3` 或 `pip` 未知，请使用类似以下的方式将它们添加到 `PATH`（使用您的实际文件夹名称）：
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
完成后，再次运行失败的命令。记住也要编辑 `~/.bash_profile`。

### 安装用户界面组件
RustDesk 可以使用 [Sciter](https://sciter.com/) 和 [Flutter](https://flutter.dev/) 构建。这两者都需要额外的组件，因此请按照相关版本或两者的步骤进行操作。

#### Sciter

从 `rustdesk` 文件夹运行：
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

#### Flutter

[FVM](https://fvm.app/) 让您管理使用的 Flutter 版本，可能是能够轻松尝试不同 Flutter 版本的最简单方法。

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
例如，安装并使用 Flutter `3.16.9`：

```sh
fvm global 3.16.9
```
FVM 旨在使用更复杂的设置，为不同项目提供不同的 Flutter 版本，但这超出了本指南的范围。相反，只需手动将 FVM 提供的默认 Flutter 位置添加到您的 `PATH`，这意味着您必须使用 `fvm global` 来切换 Flutter 版本：

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

完成后，您应该禁用遥测并检查是否一切正常：

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
一些检查失败并不重要，它们通常会失败，重要的是您打算使用的环境（即 `Xcode`）的检查是正常的。如果报告了问题，请在继续之前解决它们。

Flutter 启动并运行后，就该安装将 Rust 和 Flutter 绑定在一起的"桥接"了。这是另一个需要与其他所有东西协同工作的版本，在这个示例中我们使用 `1.80.1`：

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

### 构建

从 `rustdesk` 文件夹构建。构建 Sciter 版本：

```sh
python3 ./build.py
```

构建 Flutter 版本：
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
如果一切顺利，您现在应该在 `rustdesk` 文件夹中有一个准备安装的 `dmg` 文件。