---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2024-12-02T00:00:00Z
lang: es
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'Cómo hicimos funcionar Flutter 3.24.5 en Windows 7'
excerpt: 'Flutter 3.19 fue la última versión compatible con Windows 7 y 8. Estos son los parches de motor y Dart que RustDesk aplicó a Flutter 3.24.5 a finales de 2024.'
image: ~/assets/images/blog/flutter-win7.png
category: Lanzamiento
slug: ejecutar-flutter-3-24-en-windows-7
tags: [desarrollo]
---

Este artículo documenta los parches del motor que RustDesk aplicó a **Flutter 3.24.5** a finales de 2024. Al actualizar [RustDesk](https://github.com/rustdesk/rustdesk) a Flutter 3.24.5, dejó de funcionar en Windows 7, así que modificamos el motor de Flutter y revertimos tres cambios de Dart.

## Solución para ejecutar Flutter 3.24.5 en Windows 7

Los equipos de Flutter y Dart anunciaron que **Flutter 3.19 y Dart 3.3** serían las últimas versiones compatibles con Windows 7 y 8. Para que nuestra compilación de Flutter 3.24.5 funcionara en Windows 7, revertimos los tres cambios de Dart que se describen a continuación. Cada reversión recupera también el comportamiento anterior, incluida su limitación conocida.

Enlace relacionado: [anuncio oficial](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Corregir el problema de `Platform.localHostname` en entornos en chino

Originalmente, Dart usaba la API `gethostname`, que hacía fallar `Platform.localHostname` en entornos en chino. Para resolverlo, Dart pasó a usar la API `GetHostNameW`, que solo está disponible a partir de Windows 8. Para que Flutter funcione en Windows 7, hay que revertir ese cambio. Ten en cuenta que, al revertirlo, `Platform.localHostname` vuelve a fallar en entornos en chino.

Incidencia relacionada: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Eliminar el tratamiento de la API de registros de desenrollado para Windows 7

Dart había incluido una adaptación de compatibilidad para la ausencia de la API `RtlAddGrowableFunctionTable` en Windows 7, pero esa adaptación se ha eliminado. Para mantener la compatibilidad con Windows 7, hay que revertir el commit que eliminó ese tratamiento.

Commit relacionado: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Corregir el problema por el que los enlaces simbólicos relativos a directorios no funcionan en Windows

Dart había corregido el problema por el que los enlaces simbólicos relativos a directorios no funcionaban en Windows, y para ello modificó el método `File::GetType`. Esa modificación usaba la API `PathCchCombineEx`, que solo está disponible a partir de Windows 8. Para recuperar la compatibilidad con Windows 7, también hay que revertir esa modificación.

Commit relacionado: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusión

En nuestra compilación de Flutter 3.24.5, estas tres reversiones recuperaron la compatibilidad con Windows 7. El precio es volver al comportamiento anterior de Dart: `Platform.localHostname` vuelve a fallar en entornos en chino, y los enlaces simbólicos relativos a directorios pierden la corrección más reciente. La compatibilidad oficial con Windows 7 terminó con Flutter 3.19 y Dart 3.3, así que, si reutilizas estos parches, prueba el motor modificado con tu propia aplicación.

Para ver la implementación completa, consulta [nuestro CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Aquí](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) puedes ver cómo aplicamos el motor modificado a nuestro proyecto.
