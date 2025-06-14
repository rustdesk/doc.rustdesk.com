---
title: RustDesk 客户端
weight: 2
pre: "<b>1. </b>"
---

### 介绍
RustDesk 客户端用于设备通过我们的 RustDesk 服务器（开源版或专业版）进行连接，可从 [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) 下载。

### 支持的平台
- Microsoft Windows
- macOS
- Debian 衍生版（Ubuntu ≥ 16、Linux Mint 等）
- Red Hat 衍生版（CentOS、Fedora ≥ 18、Rocky Linux 等）
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS（不支持被控制）
- Web

### 安装

#### Windows

从 GitHub 下载 exe 文件并安装。

要静默安装，请使用 `--silent-install` 参数调用安装 exe。

#### macOS

从 GitHub 下载 dmg 文件，更多信息可在 [macOS 页面](https://rustdesk.com/docs/en/client/mac/) 找到。

打开 dmg 文件并将 `RustDesk` 拖动到 `Applications`。

允许 RustDesk 运行。

启用请求的权限并按照 RustDesk 左侧的提示完成设置。

#### Linux

请参阅以下说明为各种 Linux "发行版" 安装（安装程序在 GitHub 上或可从发行版的存储库获得）。

##### Debian 衍生版

```sh
# 请忽略错误的磁盘使用报告
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

临时进入准备运行 `rustdesk` 的 shell：

```sh
nix shell nixpkgs#rustdesk
```

在当前用户配置文件中安装：

```sh
nix profile install nixpkgs#rustdesk
```

要在 NixOS 中系统范围安装，请在编辑 `configuration.nix` 后运行 `nixos-rebuild switch --flake /etc/nixos`：

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

#### Android
从我们的 GitHub 安装 apk，更多信息可在 [Android 页面](https://rustdesk.com/docs/en/client/android/) 找到。

#### iOS（iPhone、iPad）
从 [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015) 下载应用。

### 使用方法
安装后（或作为临时可执行文件运行），RustDesk 将连接到公共服务器。您将看到底部显示 (1) "Ready, For faster connection, please set up your own server"（准备就绪，为了更快的连接，请设置您自己的服务器）的消息。在左上角您将看到您的 (2) ID、(3) 一次性密码，右侧有一个 (4) 框供您连接到另一台计算机（如果您知道它们的 ID）。

![](/docs/en/client/images/client.png)

要访问设置，请点击 ID 右侧的 (5) 菜单按钮 [ &#8942; ]。

在设置下您将找到：
- 常规 - 服务控制、主题、硬件编解码器、音频、录制和语言
- 安全 - 他人控制的权限、密码选项、更改您的 ID 的能力和高级安全设置
- 网络 - 在此设置您自己的服务器设置和代理
- 显示 - 控制远程会话的显示设置和其他默认选项、同步剪贴板等
- 账户 - 这可以与专业服务器配合使用来登录 API
- 关于 - 显示有关软件的信息

### 配置 RustDesk
有多种方法来配置 RustDesk。

最简单的方法是使用 RustDesk Server Pro，您可以获得加密的配置字符串，这可以与 `--config` 一起使用来导入设置。要做到这一点：
1. 在您使用的任何操作系统上打开命令行，到 RustDesk 安装的文件夹，即 Windows 上的 `C:\Program Files\RustDesk`，Linux 上的 `/usr/bin`。
2. 使用命令 `rustdesk.exe --config your-encrypted-string`，例如 `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`。

您可以手动设置客户端。要做到这一点：
1. 点击设置。
2. 点击网络。
3. 点击解锁网络设置。
4. 输入您的 ID、中继、API（如果使用专业服务器）和您的密钥。

![](/docs/en/client/images/network-settings.png)

如果您手动设置客户端，您可以检索 `RustDesk2.toml` 文件（在用户文件夹中）并以类似于上述示例的方式使用 `--import-config`。

### 命令行参数
- `--password` 可用于设置永久密码。
- `--get-id` 可用于检索 ID。
- `--set-id` 可用于设置 ID，请注意 ID 应以字母开头。
- `--silent-install` 可用于在 Windows 上静默安装 RustDesk。

更多高级参数可在[这里](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242)找到。

{{% children depth="3" showhidden="true" %}}
