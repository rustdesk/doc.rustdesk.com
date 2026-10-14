---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: de
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Wie wir Flutter 3.24.5 unter Windows 7 zum Laufen gebracht haben
excerpt: Flutter 3.19 unterstützte als letzte Version Windows 7 und 8. Diese Engine- und Dart-Patches hat RustDesk Ende 2024 auf Flutter 3.24.5 angewendet.
image: ~/assets/images/blog/flutter-win7.png
category: Veröffentlichung
slug: flutter-3-24-unter-windows-7-ausfuehren
tags: [Entwicklung]
---

Dieser Beitrag dokumentiert die Engine-Patches, die RustDesk Ende 2024 auf **Flutter 3.24.5** angewendet hat. Nach dem Umstieg von [RustDesk](https://github.com/rustdesk/rustdesk) auf Flutter 3.24.5 lief die Anwendung nicht mehr unter Windows 7; deshalb haben wir die Flutter-Engine angepasst und drei Dart-Änderungen zurückgenommen.

## Lösung für Flutter 3.24.5 unter Windows 7

Das Flutter- und das Dart-Team haben **Flutter 3.19 und Dart 3.3** als letzte Versionen mit Unterstützung für Windows 7 und 8 angekündigt. Damit unser Build mit Flutter 3.24.5 unter Windows 7 läuft, haben wir die drei unten beschriebenen Dart-Änderungen zurückgenommen. Jede Rücknahme bringt auch das ältere Verhalten zurück, einschließlich seiner bekannten Einschränkung.

Weiterführender Link: [Offizielle Ankündigung](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Korrektur für `Platform.localHostname` in chinesischen Umgebungen

Dart verwendete ursprünglich die API `gethostname`, wodurch `Platform.localHostname` in chinesischen Umgebungen fehlschlug. Als Lösung wechselte Dart zur API `GetHostNameW`, die erst ab Windows 8 verfügbar ist. Damit Flutter unter Windows 7 läuft, müssen wir diese Änderung zurücknehmen. Beachten Sie, dass die Rücknahme die Funktion von `Platform.localHostname` in chinesischen Umgebungen beeinträchtigt.

Zugehöriges Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Behandlung der Unwinding-Records-API für Windows 7 wiederherstellen

Dart enthielt früher eine Kompatibilitätsanpassung für die unter Windows 7 fehlende API `RtlAddGrowableFunctionTable`, die inzwischen entfernt wurde. Um die Kompatibilität mit Windows 7 zu erhalten, müssen wir den Commit zurücknehmen, der diese Behandlung entfernt hat.

Zugehöriger Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Korrektur für relative symbolische Verzeichnislinks unter Windows

Dart hatte zuvor das Problem behoben, dass relative symbolische Links auf Verzeichnisse unter Windows nicht funktionierten, und dafür die Methode `File::GetType` geändert. Diese Änderung verwendete die API `PathCchCombineEx`, die erst ab Windows 8 verfügbar ist. Um Windows 7 wieder zu unterstützen, müssen wir auch diese Änderung zurücknehmen.

Zugehöriger Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Fazit

In unserem Build mit Flutter 3.24.5 haben diese drei Rücknahmen die Kompatibilität mit Windows 7 wiederhergestellt. Der Preis dafür ist das ältere Dart-Verhalten: `Platform.localHostname` schlägt in chinesischsprachigen Umgebungen wieder fehl, und relative symbolische Verzeichnislinks verlieren die neuere Korrektur. Die offizielle Unterstützung für Windows 7 endete mit Flutter 3.19 und Dart 3.3; wenn Sie diese Patches übernehmen, testen Sie die angepasste Engine daher mit Ihrer eigenen Anwendung.

Die vollständige Umsetzung finden Sie in [unserer CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Hier](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) sehen Sie, wie wir die angepasste Engine in unser Projekt einbinden.
