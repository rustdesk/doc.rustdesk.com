---
publishDate: 2024-12-02T00:00:00Z
lang: it
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Come eseguire Flutter 3.24 su Windows 7?
excerpt: Da Flutter 3.22 il supporto a Windows 7 / 8 è terminato; occorre modificare Flutter Engine.
image: ~/assets/images/blog/flutter-win7.png
category: Rilascio
slug: eseguire-flutter-3-24-su-windows-7
tags: [sviluppo]
---

Abbiamo recentemente introdotto Flutter 3.24.5 in [RustDesk](https://github.com/rustdesk/rustdesk), che ha smesso di funzionare su Windows 7. Per risolvere il problema abbiamo modificato Flutter Engine.

## Soluzione per Flutter 3.24.5 su Windows 7

Flutter e Dart hanno annunciato che Dart 3.3 e Flutter 3.19 sarebbero state le ultime versioni per Windows 7 e 8. Per usare Flutter 3.24.5 dobbiamo annullare alcune modifiche di Dart.

Link: [Annuncio ufficiale](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Correggere `Platform.localHostname` negli ambienti cinesi

Dart usava `gethostname`, che causava errori di `Platform.localHostname` negli ambienti cinesi. È quindi passato a `GetHostNameW`, disponibile solo da Windows 8. Per Windows 7 occorre annullare la modifica, con conseguenze su `Platform.localHostname` in tali ambienti.

Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Ripristinare la gestione dei record di unwinding

Dart gestiva l’assenza di `RtlAddGrowableFunctionTable` in Windows 7, ma tale compatibilità è stata rimossa. Va annullato il commit corrispondente.

Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Correggere i link simbolici relativi alle directory

La correzione di Dart ha modificato `File::GetType` usando `PathCchCombineEx`, disponibile solo da Windows 8. Anche questa modifica va annullata.

Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusione

Flutter 3.24.5 su Windows 7 richiede di annullare modifiche chiave di Dart. Ciò influisce su `Platform.localHostname` in ambienti cinesi e sui link simbolici relativi, ma è necessario per chi dipende da Windows 7.

Vedi [la nostra CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml) per l’implementazione completa e [qui](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) per l’integrazione.
