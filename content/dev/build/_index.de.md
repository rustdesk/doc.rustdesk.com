---
title: Erstellen
weight: 1
description: "RustDesk-Dokumentation zu Erstellen. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Schauen Sie sich [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) für die Erstellung der Desktop-Version an.

## Was umfasst der Build-Bereich?

Der Build-Bereich deckt die Desktop-Build-Umgebung fur Linux, Windows und macOS ab. Wahlen Sie den passenden Leitfaden fur Ihre Plattform, um Abhangigkeiten, `vcpkg`, das Rust-Toolchain-Setup und die abschliessenden Build- oder Paketierungsschritte vorzubereiten.

## Welchen Build-Leitfaden sollten Sie wahlen?

| Plattform | Leitfaden |
| --- | --- |
| Linux | [Linux](/docs/de/dev/build/linux/) |
| Windows | [Windows](/docs/de/dev/build/windows/) |
| macOS | [macOS](/docs/de/dev/build/osx/) |
| Windows-Fehlerbehebung | [Windows-FAQ](/docs/de/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
