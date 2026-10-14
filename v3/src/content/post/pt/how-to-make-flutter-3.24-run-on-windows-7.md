---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2024-12-02T00:00:00Z
lang: pt
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'Como fizemos o Flutter 3.24.5 rodar no Windows 7'
excerpt: 'O Flutter 3.19 foi a última versão a suportar o Windows 7 e 8. Estes são os patches na engine e no Dart que o RustDesk aplicou ao Flutter 3.24.5 no fim de 2024.'
image: ~/assets/images/blog/flutter-win7.png
category: Lançamento
slug: executar-flutter-3-24-no-windows-7
tags: [desenvolvimento]
---

Este post documenta os patches na engine que o RustDesk aplicou ao **Flutter 3.24.5** no fim de 2024. A atualização do [RustDesk](https://github.com/rustdesk/rustdesk) para o Flutter 3.24.5 fez com que ele deixasse de rodar no Windows 7; por isso, modificamos a engine do Flutter e revertemos três alterações do Dart.

## Solução para rodar o Flutter 3.24.5 no Windows 7

As equipes do Flutter e do Dart anunciaram o **Flutter 3.19 e o Dart 3.3** como as últimas versões com suporte ao Windows 7 e 8. Para que o nosso build do Flutter 3.24.5 rodasse no Windows 7, revertemos as três alterações do Dart descritas abaixo. Cada reversão também traz de volta o comportamento antigo, inclusive a limitação conhecida correspondente.

Link relacionado: [Anúncio oficial](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. Corrigir o problema de `Platform.localHostname` em ambientes chineses

Originalmente, o Dart usava a API `gethostname`, o que fazia `Platform.localHostname` falhar em ambientes em chinês. Para resolver esse problema, o Dart passou a usar a API `GetHostNameW`, disponível apenas no Windows 8 e em versões posteriores. Para que o Flutter rode no Windows 7, é preciso reverter essa alteração. Observe que essa reversão afeta o funcionamento de `Platform.localHostname` em ambientes em chinês.

Issue relacionada: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Remover o tratamento da API de registros de unwinding para o Windows 7

O Dart havia feito ajustes de compatibilidade para a ausência da API `RtlAddGrowableFunctionTable` no Windows 7, mas esses ajustes foram removidos. Para manter a compatibilidade com o Windows 7, é preciso reverter o commit que removeu esse tratamento.

Commit relacionado: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Corrigir o problema de links simbólicos relativos para diretórios que não funcionam no Windows

O Dart havia corrigido o problema de links simbólicos relativos para diretórios que não funcionavam no Windows, alterando o método `File::GetType`. Essa alteração usou a API `PathCchCombineEx`, disponível apenas no Windows 8 e em versões posteriores. Para restaurar o suporte ao Windows 7, também é preciso reverter essa alteração.

Commit relacionado: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## Conclusão

No nosso build do Flutter 3.24.5, essas três reversões restauraram a compatibilidade com o Windows 7. A contrapartida é o comportamento antigo do Dart: `Platform.localHostname` volta a falhar em ambientes em chinês, e os links simbólicos relativos para diretórios perdem a correção mais recente. O suporte oficial ao Windows 7 terminou no Flutter 3.19 e no Dart 3.3; se você reutilizar esses patches, teste a engine modificada com a sua própria aplicação.

Para a implementação completa, veja [o nosso CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

[Aqui](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) você vê como aplicamos a engine modificada ao nosso projeto.
