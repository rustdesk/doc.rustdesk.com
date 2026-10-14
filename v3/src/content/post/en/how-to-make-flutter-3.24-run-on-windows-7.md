---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: en
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'How We Made Flutter 3.24.5 Run on Windows 7'
excerpt: 'Flutter 3.19 was the last release to support Windows 7 and 8. These are the engine and Dart patches RustDesk applied to Flutter 3.24.5 in late 2024.'
image: ~/assets/images/blog/flutter-win7.png
category: Release
slug: how-to-make-flutter-3.24-run-on-windows-7
tags:
  - dev
---

This post documents the engine patches RustDesk applied to **Flutter 3.24.5** in late 2024. Upgrading [RustDesk](https://github.com/rustdesk/rustdesk) to Flutter 3.24.5 stopped it from running on Windows 7, so we modified the Flutter engine and reverted three Dart changes.

## Solution for Running Flutter 3.24.5 on Windows 7

The Flutter and Dart teams announced **Flutter 3.19 and Dart 3.3** as the last releases supporting Windows 7 and 8. To make our Flutter 3.24.5 build run on Windows 7, we reverted the three Dart changes below. Each revert also brings back the older behavior, including its known limitation.

Related link: [Official Announcement](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Fix the issue with `Platform.localHostname` in Chinese environments

Originally, Dart used the `gethostname` API, which caused `Platform.localHostname` to fail in Chinese environments. To solve this problem, Dart switched to the `GetHostNameW` API, which is only available in Windows 8 and later versions. To make Flutter run on Windows 7, we need to revert this change. Note that reverting this change will affect the functionality of `Platform.localHostname` in Chinese environments.

Related issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Remove the handling of unwinding records API for Windows 7

Dart had previously made compatibility modifications for the lack of the `RtlAddGrowableFunctionTable` API in Windows 7, but this modification has now been removed. To maintain compatibility with Windows 7, we need to revert the commit that removed this handling.

Related commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Fix the issue where relative symbolic links to directories do not work on Windows

Dart had previously fixed the issue where relative symbolic links to directories did not work on Windows and modified the File::GetType method. This modification used the PathCchCombineEx API, which is only available in Windows 8 and later versions. To restore support for Windows 7, we also need to revert this modification.

Related commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusion

In our Flutter 3.24.5 build, these three reverts restored Windows 7 compatibility. The trade-off is the older Dart behavior: `Platform.localHostname` fails again in Chinese-language environments, and relative symbolic links to directories lose the newer fix. Upstream Windows 7 support ended with Flutter 3.19 and Dart 3.3, so if you reuse these patches, test the patched engine with your own application.

For full implementation, please check [our CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Here](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) is how we apply the modified engine to our project.
