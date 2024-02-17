---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

I Server Pro di RustDesk contengono più funzionalità rispetto alle versioni open source.

- Nessun limite di connessione simultanea (anche la versione open source non ha limiti, ma TeamViewer etc.. hanno questo limite)
- [Console Web](/docs/en/self-host/rustdesk-server-pro/console/)
- API
- [OIDC](/docs/en/self-host/rustdesk-server-pro/oidc/), LDAP, [2FA](/docs/en/self-host/rustdesk-server-pro/2fa/)
- Gestione dei log (Connessione, trasferimento file, etc.)
- Gestione del dispositivo
- [Sincronizzazione delle impostazioni di Sicurezza](/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Controllo accessi](/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Server relay multipli](/docs/en/self-host/rustdesk-server-pro/relay/)(viene scelto automaticamente il relay più vicino)

{{% notice note %}}
Versione di RustDesk Client >= 1.2.0 necessaria
{{% /notice %}}

### Hardware requirement

Una VPS di basso livello è abbastanza. Il server non fa un uso intensivo di CPU e RAM. Gli ID dei nostri server pubblici sono ospitati in server Vultr da 2 CPU e 4 GB di Ram e supportano 1.5+ milioni di utenti.

### Download

[Download da GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)

### Installazione

#### Installazione Semplice

Per rendere più facile l' installazione abbiamo sviluppato script che pensano a tutto (installazione/aggiornamenti/conversione da open source) [Script di Installazione Semplice](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/).

{{% notice note %}}
Non dimenticare di prendere la tua licenza da [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), controlla la pagina [licenza](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/license/) per maggiori informazioni.
{{% /notice %}}


#### Installazione Manuale

L' installazione è simile alla [versione opensource](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/), ma non è necessario eseguire hbbs/hbbr con alcun argomento. Possono essere inseriti in seguito dalla console web.

- `-k _` è impostato di default
- `-r <server:host>` non è più necessario se il server relay è eseguito sulla stessa macchina tramite hbbs, in seguito possono essere impostati relay multipli dalla console web.

#### Porte Richieste

Sono necessarie le porte TCP `21114-21119` e UDP `21116`, assicurati che queste siano aperte quando imposti le regole del firewall e il port mapping di Docker.


{{% notice note %}}
E' consigliato utilizzare un proxy come Nginx per utilizzare HTTPS, questo richiede che la porta `443` venga aperta.
{{% /notice %}}