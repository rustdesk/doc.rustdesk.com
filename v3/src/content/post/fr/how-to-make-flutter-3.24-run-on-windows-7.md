---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: fr
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'Comment nous avons fait tourner Flutter 3.24.5 sous Windows 7'
excerpt: 'Flutter 3.19 est la dernière version compatible avec Windows 7 et 8. Voici les correctifs de moteur et de Dart appliqués par RustDesk à Flutter 3.24.5 fin 2024.'
image: ~/assets/images/blog/flutter-win7.png
category: Version
slug: executer-flutter-3-24-sous-windows-7
tags: [développement]
---

Cet article décrit les correctifs du moteur que RustDesk a appliqués à **Flutter 3.24.5** fin 2024. Le passage de [RustDesk](https://github.com/rustdesk/rustdesk) à Flutter 3.24.5 l’a empêché de fonctionner sous Windows 7 : nous avons donc modifié le moteur Flutter et annulé trois changements de Dart.

## Solution pour exécuter Flutter 3.24.5 sous Windows 7

Les équipes Flutter et Dart ont annoncé que **Flutter 3.19 et Dart 3.3** seraient les dernières versions compatibles avec Windows 7 et 8. Pour que notre build de Flutter 3.24.5 fonctionne sous Windows 7, nous avons annulé les trois changements de Dart ci-dessous. Chaque annulation rétablit aussi l’ancien comportement, avec sa limite connue.

Lien associé : [annonce officielle](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Corriger le problème de `Platform.localHostname` dans les environnements chinois

À l’origine, Dart utilisait l’API `gethostname`, ce qui faisait échouer `Platform.localHostname` dans les environnements chinois. Pour résoudre ce problème, Dart est passé à l’API `GetHostNameW`, disponible uniquement à partir de Windows 8. Pour que Flutter fonctionne sous Windows 7, il faut annuler ce changement. Notez que cette annulation affecte le fonctionnement de `Platform.localHostname` dans les environnements chinois.

Ticket associé : [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Supprimer la gestion de l’API des enregistrements de déroulement pour Windows 7

Dart avait auparavant ajouté une adaptation de compatibilité pour pallier l’absence de l’API `RtlAddGrowableFunctionTable` sous Windows 7, mais cette adaptation a depuis été supprimée. Pour rester compatibles avec Windows 7, nous devons annuler le commit qui l’a supprimée.

Commit associé : [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Corriger les liens symboliques relatifs vers des répertoires qui ne fonctionnent pas sous Windows

Dart avait corrigé le problème des liens symboliques relatifs vers des répertoires qui ne fonctionnaient pas sous Windows, en modifiant la méthode `File::GetType`. Cette modification utilisait l’API `PathCchCombineEx`, disponible uniquement à partir de Windows 8. Pour rétablir la prise en charge de Windows 7, nous devons aussi annuler cette modification.

Commit associé : [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusion

Dans notre build de Flutter 3.24.5, ces trois annulations ont rétabli la compatibilité avec Windows 7. La contrepartie est le retour de l’ancien comportement de Dart : `Platform.localHostname` échoue de nouveau dans les environnements en langue chinoise, et les liens symboliques relatifs vers des répertoires perdent le correctif plus récent. La prise en charge officielle de Windows 7 s’est arrêtée avec Flutter 3.19 et Dart 3.3 : si vous réutilisez ces correctifs, testez le moteur modifié avec votre propre application.

Pour l’implémentation complète, consultez [notre CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Voici](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) comment nous appliquons le moteur modifié à notre projet.
