---
title: Windows
weight: 4
description: "Dokumentacja RustDesk dotycząca Windows. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## Który przewodnik Windows wybrać?

| Potrzeba | Najlepszy przewodnik |
| --- | --- |
| Standardowa instalacja klienta Windows | [Windows](/docs/pl/client/windows/) |
| Zarządzane wdrożenie, cicha instalacja lub pakietowanie | [MSI](/docs/pl/client/windows/msi/) |
| Tryb przenośny ze wsparciem podnoszenia uprawnień | [Windows Portable Elevation](/docs/pl/client/windows/windows-portable-elevation/) |

## Szybkie odpowiedzi dla Windows

- Dla większości użytkowników końcowych wystarczy standardowy instalator.
- Do wdrożeń firmowych lub instalacji skryptowych używaj przewodnika MSI.
- Jeśli potrzebujesz uprawnień administratora w trybie przenośnym, użyj portable elevation.
- Jeśli korzystasz z self-hostingu, połącz to także z [Client Deployment](/docs/pl/self-host/client-deployment/) dla ustawień rozsyłanych przez serwer.

{{% children depth="3" showhidden="true" %}}
