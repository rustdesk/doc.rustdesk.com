---
title: Windows
weight: 4
description: "RustDesk-Dokumentation zu Windows. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## Welchen Windows-Leitfaden sollten Sie wahlen?

| Bedarf | Bester Leitfaden |
| --- | --- |
| Standardinstallation des Windows-Clients | [Windows](/docs/de/client/windows/) |
| Verwaltete Bereitstellung, Silent-Install oder Paketierung | [MSI](/docs/de/client/windows/msi/) |
| Portabler Modus mit UAC-/Elevations-Unterstutzung | [Windows Portable Elevation](/docs/de/client/windows/windows-portable-elevation/) |

## Windows-Kurzantworten

- Fur die meisten Endnutzer reicht der Standardinstaller.
- Fur Unternehmens-Rollouts oder skriptgesteuerte Installationen verwenden Sie den MSI-Leitfaden.
- Wenn Sie im portablen Modus Administratorrechte anfordern mussen, nutzen Sie portable elevation.
- Wenn Sie selbst hosten, kombinieren Sie dies mit [Client Deployment](/docs/de/self-host/client-deployment/) fur serverseitige Rollout-Einstellungen.

{{% children depth="3" showhidden="true" %}}
