---
title: OIDC
weight: 16
description: "Documentation RustDesk sur OIDC. Consultez les guides d'installation, de configuration, de déploiement et de dépannage."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Réponse rapide

OIDC permet à RustDesk Server Pro d’utiliser votre fournisseur d’identité existant pour le single sign-on au lieu de comptes locaux. Activez-le si vous voulez une gestion d’identité centralisée et moins de mots de passe administrateur séparés.

## Points clés

- Préparez l’URL du fournisseur, le client ID et le client secret
- Vérifiez que l’URL de redirection correspond à la console web RustDesk
- Mappez correctement les champs utilisateur requis
- Testez d’abord avec un compte administrateur avant un déploiement large

<!-- GEO-LOCALIZED-INTRO:END -->

- Utilisez vos comptes existants `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab`, etc. pour créer facilement et vous connecter à votre compte `RustDesk Pro`.
- Pour la spécification voir [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Exemples
{{% children depth="4" showhidden="true" %}}