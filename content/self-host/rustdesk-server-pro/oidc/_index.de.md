---
title: OIDC
weight: 16
description: "RustDesk-Dokumentation zu OIDC. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Kurze Antwort

OIDC erlaubt es RustDesk Server Pro, Ihren bestehenden Identity Provider für Single Sign-on statt lokaler Konten zu verwenden. Setzen Sie es ein, wenn Sie zentrale Identitätsverwaltung und weniger eigenständige Admin-Passwörter möchten.

## Wichtige Punkte

- Provider-URL, Client-ID und Client-Secret vorbereiten
- Prüfen, dass die Redirect-URL zur RustDesk-Webkonsole passt
- Die benötigten Benutzerfelder korrekt zuordnen
- Zuerst mit einem Admin-Konto testen, bevor Sie breit ausrollen

<!-- GEO-LOCALIZED-INTRO:END -->

- Verwenden Sie Ihre bestehenden Konten bei `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab` usw., um Ihr `RustDesk Pro`-Konto einfach zu erstellen und sich dort anzumelden.
- Für die Spezifikation siehe [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Beispiele
{{% children depth="4" showhidden="true" %}}
