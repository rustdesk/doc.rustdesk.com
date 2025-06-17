---
title: macOS
weight: 21
---

有多種方法可以做到這一點，本指南假設 `Xcode`、`Git` 和 `Homebrew` 已經安裝。

最大的挑戰可能是找到所有工具可以一起工作的版本，特別是因為工具鏈的某些部分（如 Xcode 和 LLVM）由您的 macOS 版本決定。本指南中使用的版本可能不是您應該使用的版本。作為確定使用哪些版本的起點，可以查看您想要構建的 RustDesk 版本的 [GitHub 構建工作流程](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml)。在頁面左上角選擇標籤以查看文件。但這不一定會起作用，因為 GitHub runner 附帶的 macOS 工具可能與您本地系統上的版本不同。

### Export
`export` 用於設置各種環境變數。當您運行 `export` 時，該變數僅為當前終端會話設置，因此必須為您想要用於構建 RustDesk 的每個新終端窗口重複執行，無論是現在還是將來。通常，最好將所有 `export` 添加到為每個打開的終端自動執行的腳本中，例如 `~/.bash_profile`。這裡列出的完整 `export` 命令可以簡單地附加到文件中，但也必須在當前終端中運行，因為該文件要到打開*新*終端時才會被讀取。

## 從 Homebrew 安裝我們將要使用的工具

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

某些安裝可能會失敗，因為我們系統上不存在某些目標文件夾。在這種情況下，創建文件夾、設置所有者和權限，然後再次運行 `brew` 命令。例如，如果 `/usr/local/include` 不存在：
```sh
sudo mkdir /usr/local/include
sudo chown <使用者名稱>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## 安裝 vcpkg
Vcpkg 用於管理 RustDesk 使用的 C/C++ 依賴項。決定您想要安裝的位置，並從您希望 `vcpkg` 文件夾所在的文件夾運行以下命令。在此示例中，使用 `/Users/<使用者名稱>/repos/` 作為位置，並使用標籤 `2023.04.15` 作為版本。

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## 安裝和配置 Rust
我們使用 `rustup` 來管理 Rust，它已經使用 Homebrew 安裝了。但是，它仍然需要配置。按照說明操作，確保 `rustup` 和 `rustc` 都在 `PATH` 上。在此示例中，我們使用 Rust 版本 `1.75.0`，但您可能需要使用不同的版本。您可以使用 `rustup` 安裝和管理多個版本的 Rust。

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
要查看已安裝和默認的 Rust 工具鏈概覽，請運行 `rustup show`。

## 下載 RustDesk 源文件

決定您想要 RustDesk 源文件的位置，並從您希望 `rustdesk` 文件夾所在的文件夾運行以下命令。在此示例中，使用 `/Users/<使用者名稱>/repos/` 作為位置。

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

如果 `python3` 或 `pip` 未知，請使用類似以下內容將它們添加到 `PATH`（使用您的實際文件夾名稱）：
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
完成後，再次運行失敗的命令。記得也要編輯 `~/.bash_profile`。

## 安裝用戶界面組件
RustDesk 可以使用 [Sciter](https://sciter.com/) 和 [Flutter](https://flutter.dev/) 構建。這兩者都需要額外的組件，因此請按照相關版本的步驟操作，或兩者都操作。

### Sciter

從 `rustdesk` 文件夾運行：
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) 讓您管理使用哪個版本的 Flutter，這可能是能夠輕鬆嘗試不同 Flutter 版本的最簡單方法。

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
安裝並使用，例如 Flutter `3.16.9`：

```sh
fvm global 3.16.9
```
FVM 旨在使用更複雜的設置，它可以為不同的項目提供不同的 Flutter 版本，但這超出了本指南的範圍。相反，只需手動將 FVM 提供的默認 Flutter 位置添加到您的 `PATH`，這意味著您必須使用 `fvm global` 來切換 Flutter 版本：

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

完成後，您應該禁用遙測並檢查一切是否正常：

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
如果某些檢查失敗並不重要，它們通常會失敗，重要的是您打算使用的環境檢查是否正常，即 `Xcode`。如果報告了問題，請在繼續之前解決它們。

一旦 Flutter 啟動並運行，就該安裝將 Rust 和 Flutter 綁定在一起的"橋接"了。這是另一個必須與其他所有組件一起工作的版本，在此示例中我們使用 `1.80.1`：

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## 構建

從 `rustdesk` 文件夾構建。使用以下命令構建 Sciter 版本：

```sh
python3 ./build.py
```

使用以下命令構建 Flutter 版本：
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
如果一切順利，您現在應該在 `rustdesk` 文件夾中有一個準備安裝的 `dmg` 文件。