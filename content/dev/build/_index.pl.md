---
title: Budowanie
weight: 1
description: "Dokumentacja RustDesk dotycząca Budowanie. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Sprawdź [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) po informacje na temat pakowania wersji desktopowej.

## Co obejmuje sekcja build?

Sekcja build obejmuje środowisko budowania aplikacji desktopowej dla Linuksa, Windows i macOS. Wybierz przewodnik dla swojej platformy, aby przygotować zależności, `vcpkg`, toolchain Rusta oraz końcowe kroki budowania lub pakietowania.

## Który przewodnik build wybrać?

| Platforma | Przewodnik |
| --- | --- |
| Linux | [Linux](/docs/pl/dev/build/linux/) |
| Windows | [Windows](/docs/pl/dev/build/windows/) |
| macOS | [macOS](/docs/pl/dev/build/osx/) |
| Rozwiązywanie problemów Windows | [FAQ Windows](/docs/pl/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
