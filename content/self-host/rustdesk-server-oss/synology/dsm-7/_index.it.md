---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
Dopo l'aggiornamento DSM 7.2, Synology ha rinominato il suo pacchetto "Docker" in "Container Manager". Porta una nuova GUI, e viene fornito con "docker-compose" all'interno della sua GUI, che rende più facile creare Docker.

## Modelli supportati e requisiti

Container Manager porta il supporto ARM64 per alcuni modelli di fascia bassa, come la serie J, per l'elenco dettagliato dei modelli supportati, si prega di controllare il [sito web Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
La maggior parte delle volte non avrai bisogno di installare RAM extra per installare Docker e RustDesk Server.

## 1. Installare Container Manager (Docker)

Apri "Centro Pacchetti", cerca e installa "Container Manager".

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. Creare cartella

Dopo aver installato "Container Manager", creerà una Cartella Condivisa chiamata `docker`, mettiamo i dati del nostro server qui.

Apri il tuo File Station, crea una cartella chiamata `rustdesk-server` (o come preferisci). Quindi crea una cartella chiamata `data` al suo interno proprio come nell'immagine.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. Creare contenitore

Apri il tuo Container Manager, vai su Progetto e clicca Crea.

Inserisci il nome del progetto `rustdesk-server` e cambia Origine da "Carica compose.yml" a "Crea compose.yml", e copia il seguente contenuto nella casella.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Si prega di cambiare questo in rustdesk/rustdesk-server-pro:latest se si vuole installare Pro.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Si prega di cambiare questo in rustdesk/rustdesk-server-pro:latest se si vuole installare Pro.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Perché si usa la modalità host docker
# Nel caso dimenticassi le porte:
# 21114 TCP per console web, disponibile solo nella versione Pro
# 21115 TCP per test tipo NAT
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/server ID
# 21117 TCP relay
```

Si prega di saltare `Impostazioni portale web` poi finire.

## 4. Controllare che funzioni

Apri il tuo File Station, dovresti vedere `id_ed25519`, `id_ed25519.pub` nella tua cartella `docker/rustdesk-server/data`. Potresti scaricarlo e aprirlo tramite qualsiasi editor di testo o usare [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). Questa è la chiave pubblica di cui hai bisogno per il tuo client RustDesk.

La chiave pubblica apparirà così:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

Controlla [qui](/docs/en/client) per configurare il tuo client. Solo `server ID` e `Chiave` sono necessari. `Server relay` non è necessario perché l'abbiamo impostato in `hbbs`, `hbbs` fornirà queste informazioni automaticamente.

## 5. Impostare port forwarding sul tuo router

Vai alla pagina web di amministrazione del tuo router, trova qualsiasi cosa relativa al `Port forwarding`, dovrebbe apparire nelle impostazioni `WAN` o `Firewall`.

Se ancora non riesci a trovare l'impostazione, cerca su Google `{Marca router} + port forwarding` o `{Modello router} + port forwarding`. Se questo dispositivo è del tuo ISP, chiedi a loro.

Apri queste porte richieste:
  * `21114` TCP per console web, disponibile solo nella versione Pro
  * `21115` TCP per test tipo NAT
  * `21116` TCP TCP hole punching
  * `21116` UDP heartbeat/server ID
  * `21117` TCP relay