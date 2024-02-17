---
title: Self-host
weight: 5
pre: "<b>2. </b>"
---

Se stai usando RustDesk dovresti avere il tuo server RustDesk personale, questa documentazione vi aiuterà nell' installazione.

Il supporto è disponibile attraverso il nostro [Discord](https://discord.com/invite/nDceKgxnkV) per il server open source e via [email](mailto:support@rustdesk.com) per il server Pro.

### Configurazione Di Base

https://rustdesk.com/docs/it/self-host/rustdesk-server-oss/install/#set-up-your-own-server-instance-manually

### Porte Richieste

Le porte necessarie per il self-hosting dei Server di RustDesk dipendono ampiamente dal tuo ambiente di lavoro e da ciò che volete fare

Porte Principali: \
TCP `21115-21117` \
UDP `21116`

Queste sono le porte sufficienti per eseguire RustDesk. Queste porte gestiscono il segnale, il relay e il NAT.

Inoltre possono essere aperte le porte TCP `21118` e `21119` se vuoi utilizzare il [Client RustDesk Web](https://rustdesk.com/docs/en/dev/build/web/).

Per i server Pro senza Proxy SSL è necessario aprire anche la porta TCP `21114` per permettere all' API di lavorare. In alternativa, usare un Proxy SSL e aprire la porta TCP `443`.

### Controllo Delle Porte

Per controllare se le porte sono aperte e stanno funzionando usa il comando `test-netconnection domain.com -p 21115` su PowerShell oppure [CanYouSeeMe.org](https://canyouseeme.org/).

{{% children depth="3" showhidden="true" %}}