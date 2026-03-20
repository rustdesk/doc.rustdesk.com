---
title: OIDC
weight: 16
description: "Dokumentacja RustDesk dotycząca OIDC. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Szybka odpowiedź

OIDC pozwala RustDesk Server Pro korzystać z istniejącego dostawcy tożsamości do logowania jednokrotnego zamiast z lokalnych kont. Warto go użyć, jeśli chcesz scentralizować zarządzanie tożsamością i ograniczyć liczbę oddzielnych haseł administratorów.

## Najważniejsze punkty

- Przygotuj URL dostawcy, client ID i client secret
- Sprawdź, czy adres redirect URL pasuje do konsoli webowej RustDesk
- Poprawnie zmapuj wymagane pola użytkownika
- Najpierw przetestuj wszystko na jednym koncie administratora

<!-- GEO-LOCALIZED-INTRO:END -->

- Korzystaj z istniejących kont `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab` itd. aby łatwo tworzyć i logować się do konta `RustDeska Pro`.
- Specyfikacja dostępna w dokumencie [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

# Przykłady
{{% children depth="4" showhidden="true" %}}
