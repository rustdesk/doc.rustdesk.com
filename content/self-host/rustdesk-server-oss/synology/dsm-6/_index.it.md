---
title: Synology DSM 6
weight: 22
description: "Documentazione RustDesk su Synology DSM 6. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["rustdesk synology dsm 6", "rustdesk synology docker", "rustdesk nas dsm 6", "rustdesk self-host synology"]
---

## Quando dovresti usare la guida DSM 6?

Usa questa guida solo se il tuo NAS Synology esegue ancora DSM 6 e stai distribuendo RustDesk Server OSS tramite il vecchio pacchetto Docker. Se il dispositivo è già passato a DSM 7.2, usa invece la [guida Container Manager](/docs/it/self-host/rustdesk-server-oss/synology/dsm-7/).

## Checklist deployment DSM 6

- Conferma che il NAS esegua ancora DSM 6.
- Installa `Docker` dal Package Center.
- Crea una directory host persistente per dati e chiavi RustDesk.
- Esegui `hbbs` e `hbbr` con host network e auto-restart attivo.
- Recupera `id_ed25519.pub` dopo l'avvio dei container.

> Un tutorial alternativo aggiornato di terze parti è [qui](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Questo tutorial è basato sulle ultime versioni DSM v6 e v7.

{{% notice note %}}
Dopo l'aggiornamento DSM 7.2, Docker è stato aggiornato al nuovo "Container Manager", si prega di controllare [questo articolo](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7) invece.
{{% /notice %}}

## Installare Docker

| Aprire Centro Pacchetti | Installare Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Installare RustDesk Server

| Cercare rustdesk-server nel registry Docker e installare facendo doppio clic | Immagine rustdesk-server installata, fare doppio clic per creare il contenitore rustdesk-server |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Creare contenitore hbbs

Come menzionato sopra, fare doppio clic sull'immagine rustdesk-server per creare un nuovo contenitore, impostare il nome su `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Cliccare su `Impostazioni Avanzate` sopra.

- Abilitare `Abilita riavvio automatico`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Abilitare `Usa la stessa rete dell'Host Docker`. Per maggiori informazioni su host net, si prega di [controllare](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Montare una directory host (es. `/home/rustdesk/`) su `/root`, hbbs genererà alcuni file (database e file `key`) in questa directory che devono persistere attraverso i riavvii.

| Montare | File generati nella directory host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Impostare comando
{{% notice note %}}
L'OS di Synology è basato su Debian, quindi host net (--net=host) funziona bene, non abbiamo bisogno di mappare le porte con l'opzione `-p`.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Fatto

## Creare contenitore hbbr

Si prega di ripetere i passaggi `hbbs` sopra, ma nominare il contenitore `hbbr` e il comando (per il Passaggio Impostare Comando) dovrebbe essere `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## contenitori hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Fare doppio clic sul contenitore e controllare il log | Riconfermare che hbbs/hbbr usano la rete host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Recuperare la tua Chiave

Navigare nella cartella impostata prima usando File Station, scaricare `id_ed25519.pub` e aprirlo con un editor di testo per vedere la tua chiave.