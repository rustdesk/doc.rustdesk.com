---
title: MSI
weight: 49
---

MSI 套件支援命令列參數進行靜默安裝。

## 參數

## INSTALLFOLDER

安裝資料夾。

**預設值**：`[ProgramFiles6432Folder]\[app name]`，通常是 `C:\Program Files\[app name]`。


## CREATESTARTMENUSHORTCUTS

是否建立開始功能表捷徑。

**預設值**：
1. 安裝。預設為 `1`。
2. 升級。預設為上次安裝的選項。

| 編號 | 值 | 描述 |
| :---: | :---: | :---: |
| 1 | `1` | 是 |
| 2 | `0` | 否 |
| 3 | `Y` | 是，與 `1` 相同 |
| 4 | `N` | 否，與 `0` 相同 |

## CREATEDESKTOPSHORTCUTS

是否建立桌面捷徑。

**預設值**：
1. 安裝。預設為 `1`。
2. 升級。預設為上次安裝的選項。

| 編號 | 值 | 描述 |
| :---: | :---: | :---: |
| 1 | `1` | 是 |
| 2 | `0` | 否 |
| 3 | `Y` | 是，與 `1` 相同 |
| 4 | `N` | 否，與 `0` 相同 |

## INSTALLPRINTER

是否安裝印表機。印表機用於在本地執行被控端的列印作業。

自版本 `1.3.9` 起。

**預設值**：
1. 安裝。預設為 `1`。
2. 升級。預設為上次安裝的選項。

| 編號 | 值 | 描述 |
| :---: | :---: | :---: |
| 1 | `1` | 是 |
| 2 | `0` | 否 |
| 3 | `Y` | 是，與 `1` 相同 |
| 4 | `N` | 否，與 `0` 相同 |

# 範例

**注意**：對於 `2024-08-05` 之前的版本，靜默安裝和靜默修復存在問題。請先解除安裝，然後重新安裝。

## 使用安裝參數進行安裝

靜默安裝，設定安裝路徑，不建立桌面捷徑，建立開始功能表捷徑。

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**注意**：`/l*v install.log` 表示將執行日誌列印到 `install.log`。

## 升級，不使用參數

使用先前的安裝路徑和安裝選項進行升級。

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## 升級，修改安裝選項

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```