---
title: Windows
weight: 4
description: "Documentazione RustDesk su Windows. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## Quale guida Windows dovresti scegliere?

| Esigenza | Guida migliore |
| --- | --- |
| Installazione standard del client Windows | [Windows](/docs/it/client/windows/) |
| Deployment gestito, installazione silenziosa o packaging | [MSI](/docs/it/client/windows/msi/) |
| Modalità portabile con supporto all'elevazione | [Windows Portable Elevation](/docs/it/client/windows/windows-portable-elevation/) |

## Risposte rapide per Windows

- Per la maggior parte degli utenti finali basta l'installer standard.
- Per rollout aziendali o installazioni via script, usa la guida MSI.
- Se devi richiedere privilegi amministrativi in modalità portabile, usa portable elevation.
- Se stai facendo self-hosting, abbina anche [Client Deployment](/docs/it/self-host/client-deployment/) per le impostazioni distribuite dal server.

{{% children depth="3" showhidden="true" %}}