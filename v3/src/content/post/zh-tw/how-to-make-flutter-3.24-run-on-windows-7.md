---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: zh-tw
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 我們如何讓 Flutter 3.24.5 在 Windows 7 上執行
excerpt: Flutter 3.19 是最後支援 Windows 7 與 8 的版本。本文整理 RustDesk 在 2024 年底為 Flutter 3.24.5 套用的引擎與 Dart 修補。
image: ~/assets/images/blog/flutter-win7.png
category: 發布
slug: ru-he-rang-flutter-3-24-zai-windows-7-shang-zhi-xing
tags: [開發]
---

本文記錄 RustDesk 在 2024 年底為 **Flutter 3.24.5** 套用的引擎修補。將 [RustDesk](https://github.com/rustdesk/rustdesk) 升級到 Flutter 3.24.5 後，程式就無法在 Windows 7 上執行，因此我們修改了 Flutter 引擎，並回退了三項 Dart 變更。

## 讓 Flutter 3.24.5 在 Windows 7 上執行的方案

Flutter 與 Dart 團隊已宣布，**Flutter 3.19 與 Dart 3.3** 是最後支援 Windows 7 與 8 的版本。為了讓我們的 Flutter 3.24.5 組建能在 Windows 7 上執行，我們回退了下列三項 Dart 變更。每一項回退也會帶回舊的行為，包括其已知的限制。

相關連結：[官方公告](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 修正中文環境中 `Platform.localHostname` 的問題

Dart 原本使用 `gethostname` API，導致 `Platform.localHostname` 在中文環境中失敗。為了解決這個問題，Dart 改用只有 Windows 8 以上版本才提供的 `GetHostNameW` API。要讓 Flutter 在 Windows 7 上執行，就必須回退這項變更。請注意，回退後會影響 `Platform.localHostname` 在中文環境中的功能。

相關 Issue：[Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. 移除 Windows 7 展開記錄 API 的處理

Dart 先前曾針對 Windows 7 缺少 `RtlAddGrowableFunctionTable` API 做過相容性修改，但這項修改現在已被移除。為了維持 Windows 7 相容性，我們需要回退移除這項處理的提交。

相關 Commit：[Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. 修正 Windows 上目錄相對符號連結無法運作的問題

Dart 先前修正了 Windows 上目錄相對符號連結無法運作的問題，並修改了 `File::GetType` 方法。這項修改使用了只有 Windows 8 以上版本才提供的 `PathCchCombineEx` API。為了恢復 Windows 7 支援，我們也需要回退這項修改。

相關 Commit：[Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## 結論

在我們的 Flutter 3.24.5 組建中，這三項回退恢復了 Windows 7 相容性。代價是回到舊的 Dart 行為：`Platform.localHostname` 在中文環境中會再次失敗，目錄相對符號連結也失去較新的修正。上游對 Windows 7 的支援已在 Flutter 3.19 與 Dart 3.3 結束，因此如果你要沿用這些修補，請用自己的應用程式測試修補後的引擎。

完整實作請參閱[我們的 CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml)。

[這裡](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)說明我們如何在專案中套用修改後的引擎。
