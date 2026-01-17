---
title: Windows
weight: 20
---

{{% notice note %}}
这里的命令行命令必须在 Git Bash 中运行，而不是命令提示符，否则您将遇到语法错误。
{{% /notice %}}

## 前置要求

- Windows 10/11 (64位)，推荐 16 GB 内存，约 10-15 GB 磁盘空间
- 管理员权限（用于部分安装）

## 依赖

### C++ 编译环境

下载并安装 [Visual Studio Community](https://visualstudio.microsoft.com/downloads/)，选择：
- ✅ 使用 C++ 的桌面开发（MSVC v143、Windows 10/11 SDK、CMake 工具）

**验证安装：** `cl` 命令应显示编译器版本

### Rust 开发环境

下载 [rustup-init.exe](https://rustup.rs/) 并以管理员身份运行。安装 Rust 1.75：
```powershell
rustup toolchain install 1.75
rustup default 1.75
```

**验证安装：** `rustc --version` 和 `cargo --version`

### LLVM 和 Clang

下载 [LLVM 15.0.6](https://github.com/llvm/llvm-project/releases) 并安装。设置环境变量：
```powershell
[System.Environment]::SetEnvironmentVariable("LIBCLANG_PATH", "C:\Program Files\LLVM\bin", [System.EnvironmentVariableTarget]::Machine)
```

**验证安装：** `clang --version`

### vcpkg

```powershell
cd C:\dev
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
[System.Environment]::SetEnvironmentVariable("VCPKG_ROOT", "C:\dev\vcpkg", [System.EnvironmentVariableTarget]::Machine)
.\vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

添加系统环境变量 `VCPKG_ROOT`=`<path>\vcpkg`。`<path>` 应该是您在上面选择克隆 `vcpkg` 的位置。

![](/docs/en/dev/build/windows/images/env.png)

### Flutter SDK

下载 [Flutter 3.24.5](https://docs.flutter.dev/release/archive) 并解压到 `C:\dev\flutter`。添加到 PATH：
```powershell
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable("Path", "$currentPath;C:\dev\flutter\bin", [System.EnvironmentVariableTarget]::Machine)
flutter doctor
flutter precache --windows
```

克隆 rustdesk 后，应用补丁：
```powershell
cd C:\dev\flutter
git apply C:\path\to\rustdesk\.github\patches\flutter_3.24.4_dropdown_menu_enableFilter.diff
```

### Python 3.11+

下载 [Python](https://www.python.org/downloads/) 并安装，勾选"将 Python 添加到 PATH"。

### Git

下载 [Git for Windows](https://git-scm.com/download/win)。使用 Git Bash 运行命令。

## 构建

### 克隆仓库

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
```

### 安装 Flutter Rust Bridge

对于 Flutter 构建，需要安装桥接工具（需要 Rust 1.78+，但 rustdesk 使用 1.75）：
```powershell
# 选项 1：尝试使用 --locked 标志（推荐）
cargo install flutter_rust_bridge_codegen --version 1.80.1 --features uuid --locked

# 选项 2：仅对桥接工具使用较新的 Rust 工具链
rustup toolchain install 1.78
cargo +1.78 install flutter_rust_bridge_codegen --version 1.80.1 --features uuid
rustup default 1.75
```

### 构建 Flutter 版本（推荐）

```powershell
cd flutter
flutter pub get
cd ..
flutter_rust_bridge_codegen --rust-input src/flutter_ffi.rs --dart-output flutter/lib/generated_bridge.dart
python build.py --flutter --hwcodec --vram
```

### 构建 Sciter 版本（已弃用）

```sh
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```

## 故障排除

- **找不到 clang：** 确保 `LIBCLANG_PATH` 设置正确
- **找不到 vcpkg 包：** 验证 `VCPKG_ROOT` 是否设置：`& "$env:VCPKG_ROOT\vcpkg.exe" list`
- **Flutter 版本不匹配：** `flutter version 3.24.5`
- **桥接工具需要 Rust 1.78+：** 使用 `--locked` 标志或安装 Rust 1.78+ 作为附加工具链
- **找不到 Python：** 将 Python 添加到 PATH
- **桥接生成失败：** 先在 `flutter` 目录运行 `flutter pub get`
