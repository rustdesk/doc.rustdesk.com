# Windows Development Environment Setup for rustdesk

## Prerequisites

- Windows 10/11 (64-bit), 16 GB RAM recommended, ~10-15 GB disk space
- Administrator access for installations

## Dependencies

### 1. Visual Studio / MSVC Build Tools

Download [Visual Studio Community](https://visualstudio.microsoft.com/downloads/) and install:
- ✅ Desktop development with C++ (MSVC v143, Windows 10/11 SDK, CMake tools)

**Verify:** `cl` command should show compiler version

### 2. Rust Toolchain

Download and run [rustup-init.exe](https://rustup.rs/) as Administrator. Install Rust 1.75:
```powershell
rustup toolchain install 1.75
rustup default 1.75
```

**Verify:** `rustc --version` and `cargo --version`

### 3. LLVM and Clang

Download [LLVM 15.0.6](https://github.com/llvm/llvm-project/releases) and install. Set environment variable:
```powershell
[System.Environment]::SetEnvironmentVariable("LIBCLANG_PATH", "C:\Program Files\LLVM\bin", [System.EnvironmentVariableTarget]::Machine)
```

**Verify:** `clang --version`

### 4. vcpkg

```powershell
cd C:\dev
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
[System.Environment]::SetEnvironmentVariable("VCPKG_ROOT", "C:\dev\vcpkg", [System.EnvironmentVariableTarget]::Machine)
.\vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

### 5. Flutter SDK

Download [Flutter 3.24.5](https://docs.flutter.dev/release/archive) and extract to `C:\dev\flutter`. Add to PATH:
```powershell
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
[System.Environment]::SetEnvironmentVariable("Path", "$currentPath;C:\dev\flutter\bin", [System.EnvironmentVariableTarget]::Machine)
flutter doctor
flutter precache --windows
```

After cloning rustdesk, apply patch:
```powershell
cd C:\dev\flutter
git apply C:\path\to\rustdesk\.github\patches\flutter_3.24.4_dropdown_menu_enableFilter.diff
```

### 6. Python 3.11+

Download [Python](https://www.python.org/downloads/) and install with "Add Python to PATH" checked.

### 7. Git

Download [Git for Windows](https://git-scm.com/download/win). Use Git Bash for commands.

## Build

### Clone Repository
```powershell
git clone --recurse-submodules https://github.com/rustdesk/rustdesk.git
cd rustdesk
```

### Install Flutter Rust Bridge

For Flutter builds, install bridge tool (requires Rust 1.78+ but rustdesk uses 1.75):
```powershell
# Option 1: Try with --locked flag (recommended)
cargo install flutter_rust_bridge_codegen --version 1.80.1 --features uuid --locked

# Option 2: Use newer Rust toolchain for bridge only
rustup toolchain install 1.78
cargo +1.78 install flutter_rust_bridge_codegen --version 1.80.1 --features uuid
rustup default 1.75
```

### Build Flutter Version (Recommended)
```powershell
cd flutter
flutter pub get
cd ..
flutter_rust_bridge_codegen --rust-input src/flutter_ffi.rs --dart-output flutter/lib/generated_bridge.dart
python build.py --flutter --hwcodec --vram
```

### Build Sciter Version (Deprecated)
```powershell
mkdir -p target\debug
Invoke-WebRequest -Uri https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll -OutFile target\debug\sciter.dll
cargo run
```

## Troubleshooting

- **clang not found:** Ensure `LIBCLANG_PATH` is set correctly
- **vcpkg packages not found:** Verify `VCPKG_ROOT` is set: `& "$env:VCPKG_ROOT\vcpkg.exe" list`
- **Flutter version mismatch:** `flutter version 3.24.5`
- **Bridge tool requires Rust 1.78+:** Use `--locked` flag or install Rust 1.78+ as additional toolchain
- **Python not found:** Add Python to PATH
- **Bridge generation fails:** Run `flutter pub get` in `flutter` directory first
