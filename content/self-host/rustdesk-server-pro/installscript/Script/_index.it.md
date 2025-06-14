---
title: install.sh
weight: 4
---

{{% notice note %}}
Non dimenticare di ottenere la tua licenza da [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/), controlla la pagina [licenza](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) per maggiori dettagli.

Leggi prima [installazione OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) prima di fare questa installazione semplice. Puoi conoscere più dettagli sottostanti lì.
{{% /notice %}}

### Installare

Copia e incolla il comando sopra nel tuo terminale Linux per installare RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Raccomando di usare [l'immagine Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose); semplifica enormemente il processo di distribuzione della soluzione così come l'aggiornamento. Il consumo di risorse è molto basso.

E per favore esegui quanto sopra nella tua directory home piuttosto che in una directory dove non hai permessi di scrittura.
{{% /notice %}}

Cosa fa:

- Installa alcune dipendenze
- Configura il firewall UFW se disponibile
- Crea una directory di lavoro `/var/lib/rustdesk-server` e una directory di log `/var/log/rustdesk-server`
- Installa eseguibili in `/usr/bin`
- Scarica ed estrae i Servizi RustDesk Pro nella cartella sopra
- Crea servizi systemd per hbbs e hbbr (i nomi dei servizi sono `rustdesk-hbbs.service` e `rustdesk-hbbr.service`)
- Se scegli Dominio, installerà Nginx e Certbot, permettendo all'API di essere disponibile sulla porta `443` (HTTPS) e ottenere un certificato SSL sulla porta `80`, viene rinnovato automaticamente. Quando l'https è pronto, accedi con `https://tuodominio.com` piuttosto che `https://tuodominio.com:21114`.

{{% notice note %}}
Come [configurare HTTPS per la console web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Se il servizio systemd fallisce nell'avvio, è probabilmente correlato a SELinux, controlla [questo](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Se il tuo client non riesce a connettersi al tuo server o non riesci ad accedere alla console web, controlla [questo](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

### Aggiornare

Copia e incolla il comando sopra nel tuo terminale Linux per aggiornare la tua installazione esistente di RustDesk Server Pro, questo potrebbe anche essere salvato localmente e programmato con cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Se incontri problemi con questo script, suggerirei di passare attraverso lo script ed eseguire i passaggi manualmente, uno per uno.

E per favore esegui quanto sopra nella tua directory home piuttosto che in una directory dove non hai permessi di scrittura.
{{% /notice %}}

Cosa fa:

- Controlla nuove versioni di RustDesk Server Pro
- Se trova una nuova versione, rimuove i file API e scarica nuovi eseguibili e file API

### Convertire da open source

Copia e incolla il comando sopra nel tuo terminale Linux per convertire da RustDesk Server a RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Per favore aggiungi la porta TCP `21114` al tuo firewall, questa è una porta aggiuntiva per la console web e il login utente nel client RustDesk.
{{% /notice %}}

{{% notice note %}}
Suggerirei di passare a un'installazione Docker se incontri problemi con questo script. In alternativa, puoi passare attraverso lo script ed eseguire i passaggi manualmente, uno per uno.
{{% /notice %}}

Cosa fa:

- Disabilita e rimuove i vecchi servizi
- Installa alcune dipendenze
- Configura il firewall UFW se disponibile
- Crea una cartella `/var/lib/rustdesk-server` e copia i certificati qui
- Elimina `/var/log/rustdesk` e crea `/var/log/rustdesk-server`
- Scarica ed estrae i Servizi RustDesk Pro nella cartella sopra
- Crea servizi systemd per hbbs e hbbr (i nomi dei servizi sono rustdesk-hbbs.service e rustdesk-hbbr.service)
- Se scegli Dominio, installerà Nginx e Certbot, permettendo all'API di essere disponibile sulla porta 443 (HTTPS) e ottenere un certificato SSL sulla porta 80, viene rinnovato automaticamente