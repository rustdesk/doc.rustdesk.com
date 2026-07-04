---
publishDate: 2024-12-02T00:00:00Z
lang: de
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Wie lässt sich Flutter 3.24 unter Windows 7 ausführen?
excerpt: Seit Flutter 3.22 Windows 7 / 8 nicht mehr unterstützt, muss die Flutter Engine angepasst werden.
image: ~/assets/images/blog/flutter-win7.png
category: Veröffentlichung
slug: flutter-3-24-unter-windows-7-ausfuehren
tags: [Entwicklung]
---

Wir haben kürzlich Flutter 3.24.5 in [RustDesk](https://github.com/rustdesk/rustdesk) eingeführt. Dadurch lief RustDesk nicht mehr unter Windows 7. Um das Problem zu lösen, haben wir die Flutter Engine angepasst.

## Lösung für Flutter 3.24.5 unter Windows 7

Flutter und Dart haben angekündigt, dass Dart 3.3 und Flutter 3.19 die letzten Versionen mit Unterstützung für Windows 7 und 8 sind. Damit Flutter 3.24.5 dennoch funktioniert, müssen einige Dart-Änderungen zurückgenommen werden.

Weiterführender Link: [Offizielle Ankündigung](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. `Platform.localHostname` in chinesischen Umgebungen

Dart verwendete ursprünglich die API `gethostname`, wodurch `Platform.localHostname` in chinesischen Umgebungen fehlschlug. Als Lösung wechselte Dart zur erst ab Windows 8 verfügbaren API `GetHostNameW`. Für Windows 7 muss diese Änderung zurückgenommen werden. Dadurch wird allerdings `Platform.localHostname` in chinesischen Umgebungen beeinträchtigt.

Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Behandlung der Unwinding-Records-API für Windows 7 wiederherstellen

Dart enthielt eine Kompatibilitätsbehandlung für die unter Windows 7 fehlende API `RtlAddGrowableFunctionTable`, die später entfernt wurde. Für die Windows-7-Kompatibilität muss der entsprechende Commit zurückgenommen werden.

Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Relative symbolische Verzeichnislinks unter Windows

Eine Dart-Korrektur für relative symbolische Verzeichnislinks änderte `File::GetType` und verwendete dabei die erst ab Windows 8 verfügbare API `PathCchCombineEx`. Auch diese Änderung muss für Windows 7 zurückgenommen werden.

Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Fazit

Für Flutter 3.24.5 unter Windows 7 sind mehrere Rücknahmen in Dart nötig. Sie haben Nebenwirkungen bei `Platform.localHostname` in chinesischen Umgebungen und bei relativen symbolischen Links, sind für Nutzer von Windows 7 aber erforderlich.

Die vollständige Umsetzung finden Sie in [unserer CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml). [Hier](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) wird die angepasste Engine in RustDesk eingebunden.
