---
title: Compilation
weight: 1
description: "Documentation RustDesk sur Compilation. Consultez les guides d'installation, de configuration, de déploiement et de dépannage."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Récupérer le script [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) pour compiler la version bureau.

## Que couvre la section build ?

La section build couvre l'environnement de compilation desktop pour Linux, Windows et macOS. Choisissez le guide adapte a votre plateforme pour preparer les dependances, `vcpkg`, la toolchain Rust et les etapes finales de compilation ou de packaging.

## Quel guide de build choisir ?

| Plateforme | Guide |
| --- | --- |
| Linux | [Linux](/docs/fr/dev/build/linux/) |
| Windows | [Windows](/docs/fr/dev/build/windows/) |
| macOS | [macOS](/docs/fr/dev/build/osx/) |
| Depannage Windows | [FAQ Windows](/docs/fr/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
