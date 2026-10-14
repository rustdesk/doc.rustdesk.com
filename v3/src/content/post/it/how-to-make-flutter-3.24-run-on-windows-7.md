---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2024-12-02T00:00:00Z
lang: it
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'Come abbiamo fatto funzionare Flutter 3.24.5 su Windows 7'
excerpt: "Flutter 3.19 è stata l'ultima release con supporto per Windows 7 e 8. Ecco le patch al motore e a Dart che RustDesk ha applicato a Flutter 3.24.5 a fine 2024."
image: ~/assets/images/blog/flutter-win7.png
category: Rilascio
slug: eseguire-flutter-3-24-su-windows-7
tags: [sviluppo]
---

Questo articolo documenta le patch al motore che RustDesk ha applicato a **Flutter 3.24.5** a fine 2024. Dopo l'aggiornamento di [RustDesk](https://github.com/rustdesk/rustdesk) a Flutter 3.24.5, l'app non funzionava più su Windows 7, quindi abbiamo modificato il motore di Flutter e annullato tre modifiche di Dart.

## Soluzione per eseguire Flutter 3.24.5 su Windows 7

I team di Flutter e Dart hanno annunciato **Flutter 3.19 e Dart 3.3** come ultime release con supporto per Windows 7 e 8. Per far funzionare la nostra build di Flutter 3.24.5 su Windows 7, abbiamo annullato le tre modifiche di Dart descritte qui sotto. Ogni annullamento riporta anche il comportamento precedente, limite noto compreso.

Link correlato: [Annuncio ufficiale](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Correggere il problema di `Platform.localHostname` negli ambienti cinesi

In origine Dart usava l'API `gethostname`, che faceva fallire `Platform.localHostname` negli ambienti in lingua cinese. Per risolvere il problema, Dart è passato all'API `GetHostNameW`, disponibile solo da Windows 8 in poi. Per far funzionare Flutter su Windows 7 dobbiamo annullare questa modifica. Tieni presente che annullarla compromette il funzionamento di `Platform.localHostname` negli ambienti cinesi.

Issue correlata: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Rimozione della gestione dell'API dei record di unwinding per Windows 7

In passato Dart aveva introdotto modifiche di compatibilità per l'assenza dell'API `RtlAddGrowableFunctionTable` in Windows 7, ma queste modifiche sono state poi rimosse. Per mantenere la compatibilità con Windows 7, dobbiamo annullare il commit che ha rimosso questa gestione.

Commit correlato: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Correggere il problema dei link simbolici relativi alle directory che non funzionano su Windows

In passato Dart aveva corretto il problema dei link simbolici relativi alle directory che non funzionavano su Windows, modificando il metodo File::GetType. La modifica usava l'API PathCchCombineEx, disponibile solo da Windows 8 in poi. Per ripristinare il supporto a Windows 7, dobbiamo annullare anche questa modifica.

Commit correlato: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusione

Nella nostra build di Flutter 3.24.5, questi tre annullamenti hanno ripristinato la compatibilità con Windows 7. Il prezzo è il ritorno al vecchio comportamento di Dart: `Platform.localHostname` torna a fallire negli ambienti in lingua cinese, e i link simbolici relativi alle directory perdono la correzione più recente. Il supporto ufficiale a Windows 7 è terminato con Flutter 3.19 e Dart 3.3, quindi se riutilizzi queste patch, testa il motore modificato con la tua applicazione.

Per l'implementazione completa, consulta [la nostra CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Qui](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) trovi come applichiamo il motore modificato al nostro progetto.
