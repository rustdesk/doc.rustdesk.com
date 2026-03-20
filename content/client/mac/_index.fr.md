---
title: Mac 
weight: 3
description: "Documentation RustDesk sur Mac. Consultez les guides d'installation, de configuration, de déploiement et de dépannage."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## De quoi RustDesk a-t-il besoin sous macOS ?

Sous macOS, installer l'application ne suffit pas. Pour controler correctement un autre Mac, il faut en general placer RustDesk dans `Applications`, autoriser son execution, puis accorder `Accessibility`, `Screen Recording` et, dans certains cas, `Input Monitoring`.

## Reponses rapides pour macOS

- Installez RustDesk depuis le `.dmg` dans `Applications`.
- Si Gatekeeper bloque l'application, autorisez-la dans les reglages de securite macOS.
- Accordez `Accessibility` et `Screen Recording` pour le controle distant.
- Si le clavier ou la souris ne fonctionnent toujours pas, accordez aussi `Input Monitoring`.
- Si la reinitialisation des permissions ne suffit pas, redemarrez le Mac.

## Quelles permissions macOS sont importantes ?

| Permission | Role |
| --- | --- |
| Accessibility | Permet a RustDesk de controler le clavier et la souris |
| Screen Recording | Permet a RustDesk de capturer l'ecran local |
| Input Monitoring | Necessaire sur les versions recentes de macOS lorsque la capture d'entree locale echoue encore |

## Installation

Ouvrez le fichier .dmg et faites glisser `RustDesk` vers `Applications` comme ci-dessous.

![](/docs/en/client/mac/images/dmg.png)

Assurez-vous d'avoir quitté toutes les instances de RustDesk en cours d'exécution. Assurez-vous également de quitter le service RustDesk affiché dans la barre des menus.

![](/docs/en/client/mac/images/tray.png)

## Autoriser l'exécution de RustDesk

| Déverrouiller pour modifier | Cliquez sur `App Store et développeurs identifiés` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Activer les permissions

{{% notice note %}}
En raison du changement de politique de sécurité de macOS, notre API qui capture les entrées côté local ne fonctionne plus. Vous devez activer la permission "Surveillance des entrées" sur le Mac local.
Veuillez suivre ceci
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

Dans la version 1.2.4, vous pouvez essayer `Input source 2` qui peut être vu en cliquant sur l'icône du clavier dans la barre d'outils.
{{% /notice %}}

Pour capturer l'écran, vous devez accorder à RustDesk la permission d'**Accessibilité** et la permission d'**Enregistrement d'écran**. RustDesk vous guidera vers la fenêtre des paramètres.

| Fenêtre RustDesk | Fenêtre des paramètres |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Si vous l'avez activé dans la fenêtre des paramètres, mais RustDesk vous avertit toujours. Veuillez supprimer `RustDesk` de la fenêtre des paramètres avec le bouton `-`, et cliquez sur le bouton `+`, sélectionnez `RustDesk` dans `Applications`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Autres tentatives infructueuses : <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Le redémarrage est toujours requis.
{{% /notice %}}

| Boutons `-` et `+` | Sélectionnez `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Veuillez copier les étapes ci-dessus pour la permission d'**Enregistrement d'écran**.

![](/docs/en/client/mac/images/screen.png?v2)