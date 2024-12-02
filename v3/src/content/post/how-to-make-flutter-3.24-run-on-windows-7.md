---
publishDate: 2024-12-02T00:00:00Z
title: How to make Flutter 3.24 run on Windows 7?
excerpt: Since Flutter 3.22 starts to drop support for Windows 7 / 8, we need to modify Flutter engine to restore support for Windows 7.
image: ~/assets/images/blog/flutter-win7.png
category: Release
slug: how-to-make-flutter-3.24-run-on-windows-7
tags:
  - dev
---

We recently introduced Flutter 3.24.5 in [RustDesk](https://github.com/rustdesk/rustdesk), which resulted in it not running on Windows 7. To solve this problem, we attempted to modify the Flutter Engine.

## Solution for Running Flutter 3.24.5 on Windows 7

Given that the Flutter and Dart officials have announced that Dart 3.3 and Flutter 3.19 will be the last versions to support Windows 7 and 8, we are facing the issue of Flutter 3.24.5 not running on Windows 7. To solve this problem, we need to revert some changes in Dart to restore support for Windows 7. Here are the changes that need to be reverted:

Related link: [Official Announcement](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Fix the issue with `Platform.localHostname` in Chinese environments

Originally, Dart used the `gethostname` API, which caused `Platform.localHostname` to fail in Chinese environments. To solve this problem, Dart switched to the `GetHostNameW` API, which is only available in Windows 8 and later versions. To make Flutter run on Windows 7, we need to revert this change. Note that reverting this change will affect the functionality of `Platform.localHostname` in Chinese environments.

Related Issue link: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Remove the handling of unwinding records API for Windows 7

Dart had previously made compatibility modifications for the lack of the `RtlAddGrowableFunctionTable` API in Windows 7, but this modification has now been removed. To maintain compatibility with Windows 7, we need to revert the commit that removed this handling.

Related Commit link: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Fix the issue where relative symbolic links to directories do not work on Windows
Dart had previously fixed the issue where relative symbolic links to directories did not work on Windows and modified the File::GetType method. This modification used the PathCchCombineEx API, which is only available in Windows 8 and later versions. To restore support for Windows 7, we also need to revert this modification.

Related Commit Link: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusion
To make Flutter 3.24.5 run on Windows 7, we need to revert some key modifications in Dart. These reverts will have side effects, such as affecting the use of `Platform.localHostname` in Chinese environments and issues with relative symbolic links. However, for users who rely on Windows 7, these reverts are necessary steps.

For full implementation, please check [our CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Here](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) is how we apply the modified engine to our project.

