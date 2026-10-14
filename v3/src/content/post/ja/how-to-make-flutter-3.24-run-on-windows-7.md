---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: ja
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'Flutter 3.24.5をWindows 7で動かすために行った変更'
excerpt: 'Windows 7 と 8 をサポートした最後のリリースは Flutter 3.19 でした。2024年後半に RustDesk が Flutter 3.24.5 に適用したエンジンと Dart のパッチを紹介します。'
image: ~/assets/images/blog/flutter-win7.png
category: リリース
slug: flutter-3-24-windows-7-de-ugokasu-houhou
tags: [開発]
---

この記事では、2024年後半に RustDesk が **Flutter 3.24.5** に適用したエンジンのパッチについて記録します。[RustDesk](https://github.com/rustdesk/rustdesk) を Flutter 3.24.5 にアップグレードしたところ Windows 7 で動かなくなったため、Flutter エンジンを修正し、Dart の3つの変更を元に戻しました。

## Windows 7 で Flutter 3.24.5 を動かすための解決策

Flutter チームと Dart チームは、**Flutter 3.19 と Dart 3.3** が Windows 7 と 8 をサポートする最後のリリースであると発表しています。私たちの Flutter 3.24.5 のビルドを Windows 7 で動かすため、以下の3つの Dart の変更を元に戻しました。どの変更を戻した場合も、既知の制限を含めて以前の動作に戻ります。

関連リンク：[公式発表](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 中国語環境での `Platform.localHostname` の問題の修正

もともと Dart は `gethostname` API を使っており、そのため中国語環境では `Platform.localHostname` が失敗していました。この問題を解決するため、Dart は Windows 8 以降でしか使えない `GetHostNameW` API に切り替えました。Flutter を Windows 7 で動かすには、この変更を元に戻す必要があります。なお、この変更を戻すと、中国語環境での `Platform.localHostname` の動作に影響します。

関連する Issue：[Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Windows 7 向けの unwinding records API の処理の削除

Dart には以前、Windows 7 に `RtlAddGrowableFunctionTable` API がないことに対応する互換性のための修正がありましたが、現在はその修正が削除されています。Windows 7 との互換性を保つため、この処理を削除したコミットを元に戻す必要があります。

関連するコミット：[Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Windows でディレクトリへの相対シンボリックリンクが機能しない問題の修正

Dart は以前、Windows でディレクトリへの相対シンボリックリンクが機能しない問題を修正し、`File::GetType` メソッドを変更しました。この変更では Windows 8 以降でしか使えない `PathCchCombineEx` API を使っています。Windows 7 のサポートを取り戻すため、この変更も元に戻す必要があります。

関連するコミット：[Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## まとめ

私たちの Flutter 3.24.5 のビルドでは、この3つの変更を元に戻すことで Windows 7 との互換性を取り戻しました。その代わり、Dart の動作は以前のものに戻ります。中国語環境では `Platform.localHostname` が再び失敗し、ディレクトリへの相対シンボリックリンクについては新しい修正が失われます。上流での Windows 7 のサポートは Flutter 3.19 と Dart 3.3 で終了しているため、これらのパッチを再利用する場合は、修正したエンジンをご自身のアプリケーションで検証してください。

完全な実装は[私たちの CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml)をご覧ください。

修正したエンジンをプロジェクトに適用する方法は[こちら](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)です。
