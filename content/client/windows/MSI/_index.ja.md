---
title: MSI
weight: 49
---

MSIパッケージは、サイレントインストール用のコマンドラインパラメータをサポートしています。

## パラメータ

## INSTALLFOLDER

インストールフォルダ。

**デフォルト**: `[ProgramFiles6432Folder]\[app name]`、通常は `C:\Program Files\[app name]`。


## CREATESTARTMENUSHORTCUTS

スタートメニューのショートカットを作成するかどうか。

**デフォルト**:
1. インストール。デフォルトは `1`。
2. アップグレード。デフォルトは最後にインストールされたオプション。

| 番号 | 値 | 説明 |
| :---: | :---: | :---: |
| 1 | `1` | はい |
| 2 | `0` | いいえ |
| 3 | `Y` | はい、`1` と同じ |
| 4 | `N` | いいえ、`0` と同じ |

## CREATEDESKTOPSHORTCUTS

デスクトップショートカットを作成するかどうか。

**デフォルト**:
1. インストール。デフォルトは `1`。
2. アップグレード。デフォルトは最後にインストールされたオプション。

| 番号 | 値 | 説明 |
| :---: | :---: | :---: |
| 1 | `1` | はい |
| 2 | `0` | いいえ |
| 3 | `Y` | はい、`1` と同じ |
| 4 | `N` | いいえ、`0` と同じ |

## INSTALLPRINTER

プリンターをインストールするかどうか。プリンターは、制御される側の印刷ジョブをローカルで実行するために使用されます。

バージョン `1.3.9` から。

**デフォルト**:
1. インストール。デフォルトは `1`。
2. アップグレード。デフォルトは最後にインストールされたオプション。

| 番号 | 値 | 説明 |
| :---: | :---: | :---: |
| 1 | `1` | はい |
| 2 | `0` | いいえ |
| 3 | `Y` | はい、`1` と同じ |
| 4 | `N` | いいえ、`0` と同じ |

# 例

**注意**: `2024-08-05` より前のバージョンでは、サイレントインストールとサイレント修復に問題があります。まずアンインストールしてから、インストールしてください。

## インストールパラメータを使用したインストール

サイレントインストール、インストールパスを設定、デスクトップショートカットは作成しない、スタートメニューショートカットを作成。

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**注意**: `/l*v install.log` は、実行ログを `install.log` に出力することを意味します。

## アップグレード、パラメータなし

以前のインストールパスとインストールオプションでアップグレード。

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## アップグレード、インストールオプションを変更

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```