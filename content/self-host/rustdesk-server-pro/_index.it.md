---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro ha più funzionalità rispetto alla versione open source.

- Account
- Nessun limite di connessioni simultanee, ovvero nessun limite di connessioni simultanee (anche la versione OSS non ha limiti, ma TeamViewer ecc. hanno questo limite)
- [Console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- API
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Rubrica
- Rinomina
- Gestione dei log (connessione, trasferimento file, allarme, ecc.)
- Gestione dei dispositivi
- [Sincronizzazione delle impostazioni di sicurezza](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Controllo degli accessi](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Server di relay multipli](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (seleziona automaticamente il relay più vicino)
- [Generatore di client personalizzato](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)

{{% notice note %}}
Se costruisci il tuo server a casa/ufficio e non riesci a connetterti tramite IP pubblico/dominio, controlla [questo articolo](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Consigliamo di leggere prima questo, [Come funziona il server self-hosted?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Requisiti hardware

Il livello VPS più basso è sufficiente per i tuoi casi d'uso. Il software del server non è intensivo in termini di CPU e memoria. Il nostro server ID pubblico ospitato su un server Vultr da 2 CPU/4 GB serve oltre 1,0 milioni di endpoint. Ogni connessione relay consuma in media 180 kb al secondo. 1 core CPU e 1 GB di RAM sono sufficienti per supportare 1000 connessioni relay simultanee.

## Tutorial articoli
- [Guida passo-passo: Self-Host RustDesk Server Pro su Cloud tramite Docker per accesso remoto sicuro](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Tutorial video

Ci sono [molti tutorial video](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/#video-tutorials) disponibili online che possono guidarti nell'installazione della versione gratuita OSS.

Ecco un altro [buon tutorial](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f/?trackingId=a07rn2fkBW1ctLHaJ0tVcg%3D%3D) per l'auto-hosting della versione gratuita OSS su Hetzner cloud con docker.

L'installazione della versione Pro è quasi identica, tranne per le seguenti differenze:

- Sono richiesti un percorso di download diverso e [immagini Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/) / [file compose](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose).
- È necessaria una porta TCP aggiuntiva (21114) per la console web.

## Licenza

Puoi ottenere la licenza da https://rustdesk.com/pricing.html, controlla la [pagina della licenza](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) per maggiori dettagli.

## Iniziare
### 1. Installazione

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

Per maggiori dettagli, controlla [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Porte richieste

È necessario aprire le porte `21114`-`21119` TCP e `21116` UDP, assicurati che queste porte siano configurate quando imposti le regole del firewall e il mapping delle porte Docker.

Per maggiori informazioni su queste porte, controlla [qui](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3. Impostare la licenza

Apri la tua console web accedendo a `http://<server ip>:21114`, [accedi](/docs/en/self-host/rustdesk-server-pro/console/#log-in) utilizzando le credenziali predefinite admin/test1234 `admin`/`test1234`. Segui [questa guida](/docs/en/self-host/rustdesk-server-pro/license/#set-license) per impostare la licenza.

### 4. Configurare HTTPS per la console web

> Puoi saltare questo passaggio se non vuoi usare HTTPS durante la prova, ma ricorda di cambiare l'indirizzo API del client dopo aver configurato HTTPS.

Ecco un semplice tutorial per la [configurazione manuale di HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Configurare il client per utilizzare il server self-hosted

https://rustdesk.com/docs/en/self-host/client-configuration/

## Aggiornamento del server

Questa [guida](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) copre come aggiornare RustDesk Server Pro da una versione inferiore, affrontando diversi metodi di installazione.

## Migrazione a un nuovo host e backup/ripristino

Ecco un [tutorial dettagliato](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Migrare la licenza

Segui questa [guida](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Aggiornare la licenza

Segui [questa guida](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) per aggiornare la tua licenza per più utenti e dispositivi in qualsiasi momento.

## Informazioni sulla sicurezza

https://github.com/rustdesk/rustdesk/discussions/9835
