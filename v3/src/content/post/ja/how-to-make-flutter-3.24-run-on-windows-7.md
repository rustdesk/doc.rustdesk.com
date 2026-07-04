---
publishDate: 2024-12-02T00:00:00Z
lang: ja
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Flutter 3.24 を Windows 7 で動かす方法
excerpt: Flutter 3.22 から Windows 7 / 8 のサポートが終了したため、Flutter Engine を修正します。
image: ~/assets/images/blog/flutter-win7.png
category: リリース
slug: flutter-3-24-windows-7-de-ugokasu-houhou
tags: [開発]
---

最近 [RustDesk](https://github.com/rustdesk/rustdesk) に Flutter 3.24.5 を導入したところ、Windows 7 で動作しなくなりました。この問題を解決するため Flutter Engine を修正しました。

## Windows 7 で Flutter 3.24.5 を実行する方法

Dart 3.3 と Flutter 3.19 が Windows 7 / 8 をサポートする最後のバージョンであると公式発表されています。Flutter 3.24.5 を動かすには、Dart の変更をいくつか戻す必要があります。

関連リンク：[公式発表](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 中国語環境の `Platform.localHostname` を修正

Dart は以前 `gethostname` API を使用しており、中国語環境で `Platform.localHostname` が失敗していました。その後 Windows 8 以降のみの `GetHostNameW` に変更されました。Windows 7 のためにはこの変更を戻しますが、中国語環境の `Platform.localHostname` に影響します。

Issue：[Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Windows 7 の unwind records API 処理を復元

Dart には Windows 7 に `RtlAddGrowableFunctionTable` がない場合の互換処理がありましたが、削除されました。そのコミットを戻します。

Commit：[Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. ディレクトリへの相対シンボリックリンクを修正

Dart の修正は `File::GetType` で Windows 8 以降のみの `PathCchCombineEx` を使用します。Windows 7 のため、この変更も戻します。

Commit：[Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## まとめ

Flutter 3.24.5 を Windows 7 で実行するには Dart の主要な変更を戻す必要があります。中国語環境の `Platform.localHostname` や相対シンボリックリンクに副作用がありますが、Windows 7 ユーザーには必要です。

完全な実装は[当社の CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml)、適用方法は[こちら](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)をご覧ください。
