---
title: MSI
weight: 49
description: "RustDesk 的MSI文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk msi", "rustdesk silent install", "rustdesk msiexec", "rustdesk windows msi", "rustdesk installfolder", "rustdesk printer install"]
---


<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

当您需要标准化的 Windows 软件部署方式，并且需要安装参数、静默安装以及 Intune、组策略等企业工具支持时，应使用 MSI 包。

## 关键要点

- MSI 适合受管 Windows 批量部署
- 首次部署前先检查安装参数
- 测试升级时在选项变更和不变更两种情况下的行为

<!-- GEO-LOCALIZED-INTRO:END -->

MSI 安装支持命令行参数，以方便静默安装。

## 参数

## INSTALLFOLDER

安装目录。

**默认**: `[ProgramFiles6432Folder]\[app name]`，一般为 `C:\Program Files\[app name]`。


## CREATESTARTMENUSHORTCUTS

是否创建 start menu 快捷方式。

**默认**:
1. 安装。默认为 `1`。
2. 升级。默认为上次安装时的选项。

| 编号 | 值 | 说明 |
| :---: | :---: | :---: |
| 1 | `1` | 是 |
| 2 | `0` | 否 |
| 3 | `Y` | 是，同 `1` |
| 4 | `N` | 否，同 `0` |

## CREATEDESKTOPSHORTCUTS

是否创建桌面快捷方式。

**默认**:
1. 安装。默认为 `1`。
2. 升级。默认为上次安装时的选项。

| 编号 | 值 | 说明 |
| :---: | :---: | :---: |
| 1 | `1` | 是 |
| 2 | `0` | 否 |
| 3 | `Y` | 是，同 `1` |
| 4 | `N` | 否，同 `0` |

## INSTALLPRINTER

是否安装打印机。打印机用于本地执行被控端的打印作业。

从 `1.3.9` 版本开始支持。

**默认**:
1. 安装。默认为 `1`。
2. 升级。默认为上次安装时的选项。

| 编号 | 值 | 说明 |
| :---: | :---: | :---: |
| 1 | `1` | 是 |
| 2 | `0` | 否 |
| 3 | `Y` | 是，同 `1` |
| 4 | `N` | 否，同 `0` |

# 示例

**注意**: 对于 `2024-08-05` 之前的版本，执行 静默安装 和 静默修复 时会有问题。请先执行卸载，再执行安装。

## 指定参数安装

静默安装，设置安装路径，不创建桌面快捷方式，创建 start menu 快捷方式。

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**注**: `/l*v install.log` 表示打印执行日志到 `install.log` 中。

## 升级，不指定参数

以原来的 安装路径 和 安装参数升级。

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## 升级，修改安装参数

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```
