---
title: OIDC
weight: 16
description: "Documentazione RustDesk su OIDC. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Risposta rapida

OIDC consente a RustDesk Server Pro di usare il tuo provider di identità esistente per il single sign-on al posto degli account locali. Usalo quando vuoi gestione centralizzata dell’identità e meno password amministrative separate.

## Punti chiave

- Prepara URL del provider, client ID e client secret
- Verifica che l’URL di reindirizzamento coincida con la console web RustDesk
- Mappa correttamente i campi utente richiesti
- Prova prima con un account amministratore prima di estendere il rollout

<!-- GEO-LOCALIZED-INTRO:END -->

- Usa i tuoi account esistenti `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab`, ecc. per creare facilmente e accedere al tuo account `RustDesk Pro`.
- Per la specifica vedi [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Esempi
{{% children depth="4" showhidden="true" %}}