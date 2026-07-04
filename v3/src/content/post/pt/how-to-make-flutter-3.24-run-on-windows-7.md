---
publishDate: 2024-12-02T00:00:00Z
lang: pt
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Como executar o Flutter 3.24 no Windows 7?
excerpt: O Flutter deixou de oferecer suporte ao Windows 7 / 8 na versão 3.22; precisamos modificar o Flutter Engine.
image: ~/assets/images/blog/flutter-win7.png
category: Lançamento
slug: executar-flutter-3-24-no-windows-7
tags: [desenvolvimento]
---

Recentemente adotamos o Flutter 3.24.5 no [RustDesk](https://github.com/rustdesk/rustdesk), que deixou de funcionar no Windows 7. Para resolver o problema, modificamos o Flutter Engine.

## Solução para o Flutter 3.24.5 no Windows 7

Flutter e Dart anunciaram que Dart 3.3 e Flutter 3.19 seriam as últimas versões compatíveis com Windows 7 e 8. Para usar o Flutter 3.24.5, precisamos reverter algumas alterações do Dart.

Link: [Anúncio oficial](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Corrigir `Platform.localHostname` em ambientes chineses

O Dart usava `gethostname`, fazendo `Platform.localHostname` falhar nesses ambientes. Depois adotou `GetHostNameW`, disponível apenas a partir do Windows 8. Para o Windows 7, essa mudança deve ser revertida, embora isso afete `Platform.localHostname` em ambientes chineses.

Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Restaurar o tratamento de registros de unwinding

O Dart tratava a ausência de `RtlAddGrowableFunctionTable` no Windows 7, mas essa compatibilidade foi removida. É necessário reverter o commit correspondente.

Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Corrigir links simbólicos relativos para diretórios

A correção do Dart alterou `File::GetType` usando `PathCchCombineEx`, disponível apenas a partir do Windows 8. Essa alteração também deve ser revertida.

Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusão

Executar o Flutter 3.24.5 no Windows 7 exige reverter mudanças importantes do Dart. Isso afeta `Platform.localHostname` em ambientes chineses e links simbólicos relativos, mas é necessário para quem depende do Windows 7.

Veja a implementação em [nosso CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml) e [como aplicamos o motor modificado](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109).
