---
title: Windows
weight: 4
description: "Documentație RustDesk pentru Windows. Găsiți ghiduri de instalare, configurare, implementare și depanare."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## Ce ghid Windows ar trebui să alegi?

| Necesitate | Cel mai bun ghid |
| --- | --- |
| Instalarea standard a clientului Windows | [Windows](/docs/ro/client/windows/) |
| Implementare administrată, instalare silențioasă sau împachetare | [MSI](/docs/ro/client/windows/msi/) |
| Mod portabil cu suport pentru elevare | [Windows Portable Elevation](/docs/ro/client/windows/windows-portable-elevation/) |

## Răspunsuri rapide pentru Windows

- Pentru majoritatea utilizatorilor finali este suficient instalatorul standard.
- Pentru rollout-uri enterprise sau instalări prin script, folosește ghidul MSI.
- Dacă ai nevoie de privilegii de administrator în modul portabil, folosește portable elevation.
- Dacă faci self-hosting, combină asta și cu [Client Deployment](/docs/ro/self-host/client-deployment/) pentru setările distribuite de server.

{{% children depth="3" showhidden="true" %}}