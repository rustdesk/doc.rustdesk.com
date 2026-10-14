---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: zh-cn
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 我们如何让 Flutter 3.24.5 在 Windows 7 上运行
excerpt: Flutter 3.19 是最后一个支持 Windows 7 和 8 的版本。本文介绍 RustDesk 于 2024 年底为 Flutter 3.24.5 打的引擎与 Dart 补丁。
image: ~/assets/images/blog/flutter-win7.png
category: 发布
slug: ru-he-rang-flutter-3-24-yun-xing-yu-windows-7
tags:
  - 开发
---

本文记录 RustDesk 于 2024 年底为 **Flutter 3.24.5** 打的引擎补丁。[RustDesk](https://github.com/rustdesk/rustdesk) 升级到 Flutter 3.24.5 后无法在 Windows 7 上运行，因此我们修改了 Flutter 引擎，并撤销了三项 Dart 更改。

## 在 Windows 7 上运行 Flutter 3.24.5 的解决方案

Flutter 和 Dart 团队已宣布，**Flutter 3.19 和 Dart 3.3** 是最后支持 Windows 7 和 8 的版本。为了让我们的 Flutter 3.24.5 构建在 Windows 7 上运行，我们撤销了下面三项 Dart 更改。每项撤销也会恢复原先的行为，包括其已知的局限。

相关链接：[官方公告](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 修复中文环境中的 `Platform.localHostname` 问题

Dart 原先使用 `gethostname` API，这会导致 `Platform.localHostname` 在中文环境中失败。为解决该问题，Dart 改用了仅在 Windows 8 及更高版本中提供的 `GetHostNameW` API。为了让 Flutter 在 Windows 7 上运行，需要撤销这项更改。请注意，撤销后会影响中文环境中的 `Platform.localHostname` 功能。

相关 Issue：[Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. 恢复 Windows 7 的展开记录 API 兼容处理

Dart 此前针对 Windows 7 缺少 `RtlAddGrowableFunctionTable` API 做过兼容处理，但后来删除了这项修改。为了保持 Windows 7 兼容性，需要撤销删除该处理的提交。

相关 Commit：[Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. 修复 Windows 上目录相对符号链接失效的问题

Dart 曾修复 Windows 上目录相对符号链接无法工作的问题，并修改了 `File::GetType` 方法。但该修改使用了仅在 Windows 8 及更高版本中提供的 `PathCchCombineEx` API。为恢复 Windows 7 支持，也需要撤销这项修改。

相关 Commit：[Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## 总结

在我们的 Flutter 3.24.5 构建中，这三项撤销恢复了 Windows 7 兼容性。代价是回到旧的 Dart 行为：`Platform.localHostname` 在中文环境中会再次失败，目录相对符号链接也失去了较新的修复。上游对 Windows 7 的支持止于 Flutter 3.19 和 Dart 3.3，因此如果你要复用这些补丁，请用你自己的应用测试打过补丁的引擎。

完整实现请参阅[我们的 CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml)。

[这里](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)展示了如何在项目中应用修改后的引擎。
