---
publishDate: 2026-07-07T18:21:00Z
lang: 'it'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Perché fare self-hosting del tuo software di desktop remoto'
excerpt: 'Perché i team che abbandonano TeamViewer e AnyDesk scelgono di fare self-hosting del desktop remoto: controllo dei dati, costi prevedibili e nessun cloud di mezzo.'
image: '~/assets/images/blog/why-self-host-remote-desktop-software-og.webp'
category: 'Guide'
tags: ['RustDesk', 'Self-hosting']
author: 'RustDesk Team'
slug: 'perche-fare-self-hosting-del-tuo-software-di-desktop-remoto'
faq:
  - question: 'Cosa significa fare self-hosting del software di desktop remoto?'
    answer: "Significa eseguire, su un'infrastruttura sotto il proprio controllo, il server che coordina le connessioni e inoltra il traffico quando la connettività diretta non è possibile, invece di instradare le sessioni attraverso il cloud di un fornitore. Con RustDesk Server Pro, il server ID/rendezvous, il relay, la console e i dati di distribuzione memorizzati vengono eseguiti sulla propria infrastruttura."
  - question: 'Cosa comporta realmente la gestione di un server RustDesk self-hosted?'
    answer: 'I requisiti hardware sono minimi e la maggior parte del lavoro è una tantum: si predispone un piccolo host Linux, si aprono solo le porte effettivamente utilizzate (i client nativi richiedono TCP 21115-21117 e UDP 21116), si configura il TLS su un reverse proxy e si pianificano i backup; dopodiché si tratta di normale applicazione di patch e monitoraggio, con il supporto RustDesk disponibile in caso di difficoltà.'
  - question: 'Il self-hosting aiuta con la residenza dei dati e la conformità al GDPR?'
    answer: "Sì: in questo ambito offre un controllo reale, perché sei tu a scegliere dove vengono eseguiti il rendezvous, il relay, la console e i dati dei dispositivi. Si tratta però di una base di partenza e non di una garanzia assoluta, perché le connessioni dirette continuano comunque a viaggiare tra gli endpoint: mantenere il traffico all'interno del paese e rispettare gli obblighi del GDPR dipende quindi anche da come instradi e gestisci la distribuzione."
  - question: 'Il self-hosting è adatto a ogni team?'
    answer: "Il self-hosting è adatto ai team che vogliono avere il controllo dei propri dati e della propria infrastruttura. Comporta effettivamente la gestione di un server — un impegno modesto e per lo più una tantum in fase di configurazione — quindi se preferisci non gestire alcun server, un SaaS gestito rappresenta il modello alternativo. Ma RustDesk Server Pro è progettato fin dall'origine per essere self-hosted, proprio affinché i tuoi dati restino sulla tua infrastruttura senza alcun cloud di un fornitore di mezzo — e per i team che gestiscono già un'infrastruttura, questo controllo è proprio il punto centrale."

metadata:
  description: 'Le ragioni per fare self-hosting del software di desktop remoto: controllo dei dati, costi prevedibili, nessun vincolo al fornitore, nessuna interruzione cloud. RustDesk come esempio concreto.'
  keywords: 'perché fare self-hosting del desktop remoto, vantaggi del desktop remoto self-hosted, accesso remoto on-premise, desktop remoto senza cloud del fornitore'
---

La maggior parte degli strumenti di desktop remoto viene venduta in un solo modo: come abbonamento cloud, con i server del fornitore che fanno da intermediari — e spesso da relay — per ogni sessione. Esiste un altro modo di gestire l'accesso remoto, e non è nuovo: è semplicemente meno pubblicizzato, perché non porta con sé un abbonamento cloud ricorrente. È la scelta di **fare self-hosting del proprio software di desktop remoto**: eseguire, su un'infrastruttura sotto il proprio controllo, il server che coordina le connessioni e inoltra il traffico quando la connettività diretta non è disponibile. Questo articolo espone le ragioni a favore di questo modello e utilizza RustDesk come esempio concreto.

## Cosa significa realmente "self-host" per il desktop remoto

Il prezzo della comodità del solo cloud è che l'elenco dei dispositivi, i metadati di connessione e talvolta il traffico stesso della sessione passano attraverso una terza parte, soggetti al suo uptime, ai suoi prezzi e al suo livello di sicurezza.

Il self-hosting ribalta questo schema. Con RustDesk Server Pro, il server ID/rendezvous, il relay, la console e i dati di distribuzione memorizzati vengono eseguiti sulla **tua infrastruttura**. Le sessioni dirette continuano a fluire tra gli endpoint; le sessioni inoltrate (relayed) utilizzano il relay che hai configurato. RustDesk è [open source (AGPL)](https://github.com/rustdesk/rustdesk) e il server community gratuito può essere eseguito a tempo indeterminato.

## Solo cloud vs. self-hosted, in sintesi

|                                       | Strumento tipico solo cloud             | Self-hosted (RustDesk Server Pro)                                                                                                                                                                     |
| ------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dove vengono intermediate le sessioni | Cloud del fornitore                     | Il tuo box on-prem o VPS                                                                                                                                                                              |
| Residenza dei dati                    | Controllata dal fornitore               | I servizi lato server vengono eseguiti su un'infrastruttura che controlli; [i percorsi degli endpoint restano comunque rilevanti](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting) |
| Limiti di connessioni simultanee      | Spesso per canale/postazione            | Piani standard illimitati; Customized V2 a consumo                                                                                                                                                    |
| Modello di prezzo                     | Abbonamento cloud per postazione/canale | [Per utente di accesso + per dispositivo gestito](https://rustdesk.com/pricing) ([pricing](https://rustdesk.com/pricing))                                                                             |
| Codice sorgente                       | Chiuso                                  | Open source (AGPL), verificabile                                                                                                                                                                      |
| Dipendenza da interruzioni            | Uptime del fornitore                    | Le tue operazioni                                                                                                                                                                                     |
| Chi gestisce il server                | Il fornitore                            | Tu                                                                                                                                                                                                    |

Il self-hosting non significa rinunciare a scalabilità o funzionalità. RustDesk pubblica [linee guida per la pianificazione di grandi flotte](/it/blog/rustdesk-puo-scalare-fino-a-200-000-dispositivi) per i team che devono supportare parchi dispositivi più grandi. Per gli [MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile) e l'IT interno è disponibile una [console web self-hosted](https://rustdesk.com/docs), un generatore di client con marchio personalizzato, e [gruppi di dispositivi con una rubrica condivisa](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) per il controllo degli accessi per singolo utente. [LDAP/SSO](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/ldap/) (OIDC) è disponibile a partire dal piano Basic.

## Cosa comporta realmente gestire il server

Il controllo comporta un certo lavoro operativo — meno di quanto la maggior parte dei team si aspetti, e per lo più una tantum. Ecco la realtà concreta:

- **Predisponi un host.** I requisiti hardware di RustDesk sono minimi, quindi una modesta VM Linux — on-prem o un VPS economico — è sufficiente per eseguire i servizi ID/rendezvous e relay. Dimensionala in base al numero di dispositivi e alla quantità di traffico che finisce per essere inoltrato (relayed) anziché peer-to-peer.
- **Apri solo le porte che utilizzi.** I client RustDesk nativi richiedono **TCP 21115-21117 e UDP 21116** per il test NAT, i servizi di connessione, la registrazione, l'heartbeat e il relay. Non esporre l'intero intervallo 21114-21119. TCP 21118-21119 sono i backend WebSocket, mentre TCP 21114 è il backend dell'API HTTP/console Pro. Quando un reverse proxy HTTPS/WSS fa da front-end all'API Pro e ai servizi WebSocket, esponi pubblicamente solo TCP 443 per quel traffico e mantieni 21114 e 21118-21119 interni. La porta pubblica 443 non sostituisce le porte principali dei client nativi quando anche i client nativi si connettono. Consulta il [riferimento ufficiale delle porte](https://rustdesk.com/docs/en/self-host/).
- **Configura il TLS.** Termina HTTPS e WSS a livello di reverse proxy in modo che le credenziali, le chiamate API e il traffico del client browser utilizzino la porta pubblica TCP 443, invece di esporre la console/API in HTTP semplice o i backend WebSocket non cifrati.
- **Esegui i backup.** Il server contiene l'inventario dei dispositivi, gli account utente, la rubrica e le regole di accesso. Pianifica i backup — e verifica realmente di riuscire a ripristinarli.
- **Mantieni una cadenza di patch.** Nel tempo vengono rilasciate nuove build del server, e il sistema operativo sottostante è di tua responsabilità. Decidi chi applica gli aggiornamenti e con quale frequenza.
- **Monitoralo.** Il servizio di coordinamento è ora tuo, quindi tieni sotto controllo uptime, spazio disco e throughput del relay, e gestisci in prima persona gli alert e il ripristino.

Niente di tutto questo è particolarmente esotico, e gran parte è configurazione una tantum. Se sorge una domanda in qualsiasi momento, il [supporto RustDesk](mailto:support@rustdesk.com) può aiutarti a risolverla.

## Come valutare il self-hosting

- **Inizia con il server community.** Il core è AGPL: puoi distribuire il server open source gratuito già questo pomeriggio, sottoporlo ad audit ed eseguirlo per tutto il tempo che vuoi senza alcun costo.
- **Ti serve il set di funzionalità Pro?** Le tariffe dei piani attuali sono disponibili su [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) può indicarti quali opzioni di valutazione sono disponibili al momento.
- **Preferisci guardare piuttosto che installare?** È disponibile una demo video completa sul [canale YouTube di RustDesk](https://www.youtube.com/@rustdesk).

Se sono stati gli aumenti di prezzo, il codice chiuso o un cloud che non controlli a spingerti a cercare alternative, il self-hosting è la soluzione strutturale, non semplicemente uno sconto. Per un team che gestisce già un'infrastruttura, è un passo successivo, non un salto: possiedi il server, possiedi i dati, possiedi i costi.
