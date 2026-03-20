---
title: Compilação
weight: 1
description: "Documentação do RustDesk sobre Compilação. Consulte guias de instalação, configuração, implantação e solução de problemas."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Consulte [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) para empacotamento da versão desktop.

## O que a seção de build cobre?

A seção de build cobre o ambiente de compilação desktop para Linux, Windows e macOS. Escolha o guia da sua plataforma para preparar dependências, `vcpkg`, toolchain Rust e as etapas finais de build ou empacotamento.

## Qual guia de build você deve escolher?

| Plataforma | Guia |
| --- | --- |
| Linux | [Linux](/docs/pt/dev/build/linux/) |
| Windows | [Windows](/docs/pt/dev/build/windows/) |
| macOS | [macOS](/docs/pt/dev/build/osx/) |
| Solução de problemas no Windows | [FAQ Windows](/docs/pt/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
