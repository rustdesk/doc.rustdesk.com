---
title: Windows
weight: 4
description: "Documentation RustDesk sur Windows. Consultez les guides d'installation, de configuration, de déploiement et de dépannage."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## Quel guide Windows choisir ?

| Besoin | Meilleur guide |
| --- | --- |
| Installation standard du client Windows | [Windows](/docs/fr/client/windows/) |
| Deploiement gere, installation silencieuse ou packaging | [MSI](/docs/fr/client/windows/msi/) |
| Mode portable avec prise en charge de l'elevation | [Windows Portable Elevation](/docs/fr/client/windows/windows-portable-elevation/) |

## Reponses rapides pour Windows

- Pour la plupart des utilisateurs finaux, l'installateur standard suffit.
- Pour les deploiements en entreprise ou les installations scriptes, utilisez le guide MSI.
- Si vous devez demander des droits administrateur en mode portable, utilisez portable elevation.
- Si vous auto-hebergez, combinez cela avec [Client Deployment](/docs/fr/self-host/client-deployment/) pour la distribution des reglages cote serveur.

{{% children depth="3" showhidden="true" %}}