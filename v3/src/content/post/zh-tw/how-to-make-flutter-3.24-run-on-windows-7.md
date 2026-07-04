---
publishDate: 2024-12-02T00:00:00Z
lang: zh-tw
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 如何讓 Flutter 3.24 在 Windows 7 上執行？
excerpt: Flutter 自 3.22 起停止支援 Windows 7 / 8，因此需要修改 Flutter 引擎以恢復 Windows 7 支援。
image: ~/assets/images/blog/flutter-win7.png
category: 發布
slug: ru-he-rang-flutter-3-24-zai-windows-7-shang-zhi-xing
tags: [開發]
---

我們最近在 [RustDesk](https://github.com/rustdesk/rustdesk) 中導入 Flutter 3.24.5，結果程式無法在 Windows 7 上執行。為解決此問題，我們嘗試修改 Flutter Engine。

## 在 Windows 7 上執行 Flutter 3.24.5 的方案

Flutter 與 Dart 官方已宣布，Dart 3.3 和 Flutter 3.19 是最後支援 Windows 7、8 的版本。因此 Flutter 3.24.5 無法直接在 Windows 7 執行。要恢復支援，必須撤銷 Dart 中的部分變更。

相關連結：[官方公告](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 修正中文環境中的 `Platform.localHostname`

Dart 原先使用 `gethostname` API，這會使 `Platform.localHostname` 在中文環境中失敗。Dart 因而改用僅支援 Windows 8 以上版本的 `GetHostNameW` API。為讓 Flutter 在 Windows 7 執行，需要撤銷此變更；但這會影響中文環境中的 `Platform.localHostname`。

相關 Issue：[Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. 恢復 Windows 7 的展開記錄 API 處理

Dart 曾針對 Windows 7 缺少 `RtlAddGrowableFunctionTable` API 做相容處理，但之後移除了這項修改。為保持相容，需要撤銷移除該處理的提交。

相關 Commit：[Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. 修正 Windows 目錄相對符號連結問題

Dart 修正目錄相對符號連結時修改了 `File::GetType`，卻使用僅支援 Windows 8 以上版本的 `PathCchCombineEx` API。為恢復 Windows 7 支援，也需要撤銷此修改。

相關 Commit：[Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## 結論

要讓 Flutter 3.24.5 在 Windows 7 執行，必須撤銷 Dart 的幾項關鍵修改。這會帶來副作用，包括影響中文環境的 `Platform.localHostname` 與目錄相對符號連結；但對仍依賴 Windows 7 的使用者而言，這些步驟不可或缺。

完整實作請參閱[我們的 CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml)。

[這裡](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)展示如何在專案中套用修改後的引擎。
