---
title: OIDC
weight: 16
description: "Documentație RustDesk pentru OIDC. Găsiți ghiduri de instalare, configurare, implementare și depanare."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Răspuns rapid

OIDC permite RustDesk Server Pro să folosească furnizorul tău existent de identitate pentru single sign-on în locul conturilor locale. Folosește-l dacă vrei administrare centralizată a identității și mai puține parole administrative separate.

## Puncte cheie

- Pregătește URL-ul furnizorului, client ID-ul și client secret-ul
- Confirmă că URL-ul de redirect se potrivește cu consola web RustDesk
- Mapează corect câmpurile de utilizator necesare
- Testează mai întâi cu un cont de administrator înainte de rollout larg

<!-- GEO-LOCALIZED-INTRO:END -->

- Folosiți conturile existente `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab` etc. pentru a crea și a vă autentifica cu ușurință în contul `RustDesk Pro`.
- Pentru specificații vedeți [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Exemple
{{% children depth="4" showhidden="true" %}}