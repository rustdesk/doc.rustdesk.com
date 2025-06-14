---
title: MSI
weight: 49
---


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
