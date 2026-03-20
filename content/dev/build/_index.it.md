---
title: Compilazione
weight: 1
description: "Documentazione RustDesk su Compilazione. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Consulta [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) per il packaging della versione desktop.

## Cosa copre la sezione build?

La sezione build copre l'ambiente di compilazione desktop per Linux, Windows e macOS. Scegli la guida della tua piattaforma per preparare dipendenze, `vcpkg`, toolchain Rust e i passaggi finali di build o packaging.

## Quale guida build dovresti scegliere?

| Piattaforma | Guida |
| --- | --- |
| Linux | [Linux](/docs/it/dev/build/linux/) |
| Windows | [Windows](/docs/it/dev/build/windows/) |
| macOS | [macOS](/docs/it/dev/build/osx/) |
| Risoluzione problemi Windows | [FAQ Windows](/docs/it/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
