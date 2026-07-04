---
publishDate: 2024-12-02T00:00:00Z
lang: es
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: ¿Cómo ejecutar Flutter 3.24 en Windows 7?
excerpt: Flutter dejó de admitir Windows 7 / 8 desde la versión 3.22, por lo que debemos modificar Flutter Engine.
image: ~/assets/images/blog/flutter-win7.png
category: Lanzamiento
slug: ejecutar-flutter-3-24-en-windows-7
tags: [desarrollo]
---

Hace poco incorporamos Flutter 3.24.5 a [RustDesk](https://github.com/rustdesk/rustdesk), lo que impidió ejecutarlo en Windows 7. Para resolverlo, modificamos Flutter Engine.

## Solución para ejecutar Flutter 3.24.5 en Windows 7

Flutter y Dart anunciaron que Dart 3.3 y Flutter 3.19 serían las últimas versiones compatibles con Windows 7 y 8. Para usar Flutter 3.24.5 debemos revertir varios cambios de Dart.

Enlace: [Anuncio oficial](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Corregir `Platform.localHostname` en entornos chinos

Dart usaba la API `gethostname`, que hacía fallar `Platform.localHostname` en entornos chinos. Cambió entonces a `GetHostNameW`, disponible solo desde Windows 8. Para Windows 7 hay que revertir ese cambio, aunque afectará a `Platform.localHostname` en dichos entornos.

Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Recuperar el manejo de registros de desenrollado de Windows 7

Dart tenía compatibilidad para la ausencia de `RtlAddGrowableFunctionTable` en Windows 7, pero se eliminó. Debemos revertir el commit que retiró ese manejo.

Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Corregir enlaces simbólicos relativos a directorios

La corrección de Dart para enlaces simbólicos relativos modificó `File::GetType` y usó `PathCchCombineEx`, disponible solo desde Windows 8. También debemos revertirla.

Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusión

Ejecutar Flutter 3.24.5 en Windows 7 exige revertir cambios clave de Dart. Esto afecta a `Platform.localHostname` en entornos chinos y a enlaces simbólicos relativos, pero es necesario para quienes siguen usando Windows 7.

Consulte la implementación completa en [nuestro CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml) y [cómo aplicamos el motor modificado](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109).
