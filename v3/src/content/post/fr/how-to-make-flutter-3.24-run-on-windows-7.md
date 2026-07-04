---
publishDate: 2024-12-02T00:00:00Z
lang: fr
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Comment exécuter Flutter 3.24 sous Windows 7 ?
excerpt: Flutter ne prenant plus en charge Windows 7 / 8 depuis la version 3.22, il faut modifier Flutter Engine.
image: ~/assets/images/blog/flutter-win7.png
category: Version
slug: executer-flutter-3-24-sous-windows-7
tags: [développement]
---

Nous avons récemment intégré Flutter 3.24.5 à [RustDesk](https://github.com/rustdesk/rustdesk), qui ne fonctionnait alors plus sous Windows 7. Nous avons donc modifié Flutter Engine.

## Solution pour Flutter 3.24.5 sous Windows 7

Flutter et Dart ont annoncé que Dart 3.3 et Flutter 3.19 seraient les dernières versions compatibles avec Windows 7 et 8. Pour utiliser Flutter 3.24.5, plusieurs changements de Dart doivent être annulés.

Lien : [Annonce officielle](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Corriger `Platform.localHostname` dans les environnements chinois

Dart utilisait `gethostname`, ce qui faisait échouer `Platform.localHostname` dans ces environnements. Dart est passé à `GetHostNameW`, disponible seulement à partir de Windows 8. Il faut annuler ce changement pour Windows 7, au prix d’un impact sur `Platform.localHostname` en environnement chinois.

Issue : [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Rétablir la gestion de l’API des enregistrements de déroulement

Dart gérait l’absence de `RtlAddGrowableFunctionTable` sous Windows 7, puis cette compatibilité a été supprimée. Il faut annuler le commit correspondant.

Commit : [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Corriger les liens symboliques relatifs vers des répertoires

La correction de Dart a modifié `File::GetType` en utilisant `PathCchCombineEx`, disponible uniquement depuis Windows 8. Ce changement doit également être annulé.

Commit : [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusion

Flutter 3.24.5 sous Windows 7 nécessite l’annulation de plusieurs changements importants de Dart. Cela affecte `Platform.localHostname` dans les environnements chinois et les liens symboliques relatifs, mais reste nécessaire pour les utilisateurs de Windows 7.

Consultez [notre CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml) pour l’implémentation complète et [cet exemple](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) pour son intégration.
