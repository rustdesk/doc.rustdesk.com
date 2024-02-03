---
title: RustDesk Client
weight: 2
pre: "<b>1. </b>"
chapter: true
---

### 簡介
RustDesk 客戶端可用於透過我們的 RustDesk 伺服器（無論是開源還是專業版）連接設備，可從 [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) 下載。

### 支援平台
- Microsoft Windows
- macOS
- Debian 衍生版（Ubuntu ≥ 16、Linux Mint 等）
- Red Hat 衍生版（CentOS、Fedora ≥ 18、Rocky Linux 等）
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS（不支援被控制）
- Web

### 安裝

#### Windows

從 GitHub 下載 exe 檔案並安裝。

要靜默安裝，請使用 `--silent-install` 參數執行安裝程序。

#### macOS

從 GitHub 下載 dmg 檔案，更多資訊可在 [macOS 頁面](https://rustdesk.com/docs/zh-tw/client/mac/)找到。

打開 dmg 檔案並將 `RustDesk` 拖到 `應用程式`。

允許 RustDesk 運行。

啟用所需的權限並按照 RustDesk 左側的提示完成設置。

#### Linux

請參照以下指南安裝各種 Linux "口味" 的 RustDesk（安裝程序可在 GitHub 或發行版的代碼庫中找到）。

##### Debian 衍生版

```sh
# 請忽略錯誤的磁碟占用率報告
sudo apt install -fy ./rustdesk-<version>.deb
```

##### Red Hat 衍生版

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

##### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

##### openSUSE（≥ Leap 15.0）

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

##### Nix / NixOS（≥ 22.05）

臨時進入一個帶有 `rustdesk` 的 shell：

```sh
nix shell nixpkgs#rustdesk
```

在當前用戶配置文件中安裝：

```sh
nix profile install nixpkgs#rustdesk
```

要安裝在 NixOS 的系統中，請在編輯 `configuration.nix` 後執行 `nixos-rebuild switch --flake /etc/nixos`：

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

#### Android
從我們的 GitHub 安裝 apk，更多資訊可在 [Android 頁面](https://rustdesk.com/docs/zh-tw/client/android/)找到。

#### iOS（iPhone、iPad）
從 [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015) 下載。

### 使用
安裝後（或作為臨時可執行文件執行），RustDesk 將連接到公共伺服器。您將在底部看到消息 (1) "準備就緒，若您需要更快的連線速度，您可以選擇自行建立伺服器"。在左上角您會看到您的 (2) ID，(3) 一次性密碼，以及在右側的 (4) 方框，用於連接到另一台電腦（如果您知道他們的 ID）。

![](/docs/en/client/images/client.png)

要訪問設置，請點擊 ID 右側的 (5) 選單按鈕 [ &#8942; ]。

在設置中您會找到：
- 一般 - 服務控制、主題、硬體編解碼器、音訊、錄製和語言
- 安全 - 控制權限、密碼、更改 ID 和進階安全設定
- 網絡 - 在此處設置您自己的伺服器設置和代理伺服器
- 顯示 - 控制遠端工作階段的顯示設置和其他預設選項，同步剪貼板等
- 帳戶 - 可與專業版伺服器一起使用，以登入 API
- 關於 - 顯示有關軟體的資訊。

### 配置 RustDesk
有多種方法可以配置 RustDesk。

最簡單的方法是使用 RustDesk 伺服器專業版，您可以獲得一個加密的配置字符串，這可以與 `--config` 一起使用來導入設置。要做到這一點：
1. 在您使用的任何作業系統上打開終端機，到 RustDesk 安裝的文件夾，如 Windows 上的 `C:\Program Files\RustDesk`，Linux 上的 `/usr/bin`。
2. 使用命令 `rustdesk.exe --config your-encrypted-string`，例如 `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`。

您也可以手動設定客戶端。要做到這一點：
1. 點擊設定。
2. 點擊網絡。
3. 點擊解鎖網絡設定。
4. 輸入您的 ID、中繼、API（如果使用專業版伺服器）和您的 Key。

![](/docs/en/client/images/network-settings.png)

如果您手動設定了客戶端，您可以搜尋 `RustDesk2.toml` 文件（在用戶文件夾中），並使用 `--import-config` 以類似於上面的範例。

### 命令行參數
- `--password` 可用於設置固定密碼。
- `--get-id` 可用於取得 ID。
- `--set-id` 可用於設置 ID，請注意 ID 應以字母開頭。
- `--silent-install` 可用於在 Windows 上靜默安裝 RustDesk。

更多高級參數可在 [此處](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242) 找到。
