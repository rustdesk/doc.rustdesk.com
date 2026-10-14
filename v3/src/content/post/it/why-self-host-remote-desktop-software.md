---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-07T18:21:00Z
lang: 'it'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Perché fare self-hosting del tuo software di desktop remoto'
excerpt: 'Perché chi lascia TeamViewer e AnyDesk sceglie il self-hosting del desktop remoto: decidi tu dove girano i server, chi li gestisce e che cosa paghi.'
image: '~/assets/images/blog/why-self-host-remote-desktop-software-og.webp'
category: 'Guide'
tags: ['RustDesk', 'Self-hosting']
author: 'RustDesk Team'
slug: 'perche-fare-self-hosting-del-tuo-software-di-desktop-remoto'
faq:
  - question: 'Cosa significa fare self-hosting del software di desktop remoto?'
    answer: "Fare self-hosting del software di desktop remoto significa eseguire il server di connessione (il servizio ID/rendezvous di RustDesk) e il relay di riserva su un'infrastruttura che controlli tu, invece che nel cloud di un fornitore. Con RustDesk Server Pro anche la console web e i dati dei dispositivi risiedono lì; le sessioni dirette continuano a viaggiare da un endpoint all'altro."
  - question: 'Cosa comporta davvero gestire un server RustDesk self-hosted?'
    answer: "Un piccolo host Linux, qualche porta aperta e una manutenzione di routine. Predisponi una VM, apri TCP 21115-21117 e UDP 21116 per i client RustDesk nativi, metti la console e l'API di Server Pro dietro HTTPS sulla porta 443 e pianifica backup di cui hai testato il ripristino. Dopodiché, il lavoro continuo riguarda patch, monitoraggio, capacità del relay e rinnovo dei certificati."
  - question: 'Il self-hosting aiuta con la residenza dei dati e la conformità al GDPR?'
    answer: 'Sì. Il self-hosting di RustDesk ti permette di scegliere dove girano ID/rendezvous, relay, console e dati dei dispositivi e chi li gestisce, cioè proprio il controllo richiesto dalle norme sulla residenza dei dati. È un controllo sul deployment, non una certificazione di conformità: le sessioni dirette continuano a viaggiare tra gli endpoint, quindi la conformità al GDPR dipende anche da instradamento, conservazione dei dati e programma di conformità complessivo.'
  - question: 'Il self-hosting è adatto a ogni team?'
    answer: 'No, ma è adatto alla maggior parte dei team che gestiscono già una propria infrastruttura e vogliono il controllo dei server di accesso remoto. RustDesk Server OSS, il server community gratuito, non ha canone di licenza, e RustDesk Server Pro aggiunge console web, Controllo di accesso e SSO. Ai team che non vogliono gestire alcun server conviene di più un servizio gestito.'

metadata:
  description: 'Le ragioni del self-hosting del desktop remoto: decidi tu dove girano i server e chi li gestisce. RustDesk Server OSS e Server Pro come esempio concreto.'
  keywords: 'perché fare self-hosting del desktop remoto, vantaggi del desktop remoto self-hosted, accesso remoto on-premise, desktop remoto senza cloud del fornitore'
---

La maggior parte degli strumenti di desktop remoto viene venduta in un solo modo: come abbonamento cloud, con i server del fornitore che coordinano le sessioni e le inoltrano quando un percorso diretto non riesce. Il self-hosting sposta questi ruoli su un'infrastruttura che controlli tu: i client si coordinano tramite il tuo server ID/rendezvous, si connettono direttamente quando possibile e ripiegano sul tuo relay. Questo articolo presenta le ragioni del self-hosting, usando come esempio concreto RustDesk Server OSS (il server community gratuito) e Server Pro.

## Cosa significa davvero «self-hosting» per il desktop remoto

Il prezzo della comodità del solo cloud è che l'elenco dei dispositivi, i metadati di connessione e talvolta il traffico stesso delle sessioni passano attraverso una terza parte, dipendendo dal suo uptime, dai suoi prezzi e dal suo livello di sicurezza.

Il self-hosting ribalta questo schema. Con RustDesk è il tuo team a gestire i servizi ID/rendezvous e relay, e Server Pro porta sulla tua infrastruttura anche la console web e i dati dei dispositivi memorizzati. Le sessioni dirette passano tra gli endpoint; quelle inoltrate usano il tuo relay. Il **client e Server OSS di RustDesk hanno [licenza AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro è un software server self-hosted commerciale e proprietario**.

## Solo cloud vs. self-hosted, in sintesi

|                                            | Strumento tipico solo cloud                                         | Self-hosted (RustDesk Server Pro)                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dove vengono coordinate le sessioni        | Cloud del fornitore                                                 | Il tuo server on-prem o VPS                                                                                                                                                               |
| Residenza dei dati                         | Controllata dal fornitore                                           | I servizi lato server girano su un'infrastruttura che controlli tu; [i percorsi tra gli endpoint restano rilevanti](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting) |
| Connessioni/canali simultanei in licenza   | Limite che dipende dal piano                                        | Illimitati nei piani standard; Customized V2 prevede un numero concesso in licenza                                                                                                        |
| Modello di prezzo                          | Utenti, endpoint e limiti di connessione specifici del prodotto     | [Utenti con login più dispositivi gestiti](https://rustdesk.com/pricing); Customized V2 concede in licenza anche le connessioni simultanee                                                 |
| Codice sorgente                            | Dipende dal prodotto, spesso proprietario                           | Client AGPL verificabile                                                                                                                                                                  |
| Dipendenza in caso di interruzioni         | Uptime del fornitore                                                | Le tue operazioni                                                                                                                                                                         |
| Chi gestisce il server                     | Il fornitore                                                        | Tu                                                                                                                                                                                        |

Il self-hosting non ti costa funzionalità. Per gli [MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile) e l'IT interno, Server Pro aggiunge una console web self-hosted con il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) per utente e per gruppo di dispositivi, oltre a un generatore di client personalizzati e allo [SSO LDAP/OIDC](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/ldap/) dal piano Basic. E non ti costa nemmeno scalabilità: il server pubblico di RustDesk ha registrato più di due milioni di endpoint online su un singolo host da 12 core e 32 GB il 7 luglio 2026 (telemetria interna), e la [guida alla pianificazione per grandi flotte](/it/blog/rustdesk-puo-scalare-fino-a-200-000-dispositivi) descrive cosa convalidare per Server Pro.

## Cosa comporta davvero gestire il server

Il controllo comporta lavoro operativo: una configurazione iniziale, poi la manutenzione di routine. Ecco l'elenco concreto:

- **Predisponi un host.** I requisiti hardware di RustDesk sono bassi, quindi una modesta VM Linux, on-prem o su un VPS economico, basta per i servizi ID/rendezvous e relay. Dimensionala in base al numero di dispositivi e alla quantità di traffico che finisce sul relay invece di passare in peer-to-peer.
- **Apri solo le porte che usi.** I client RustDesk nativi richiedono **TCP 21115-21117 e UDP 21116** per il test NAT, i servizi di connessione, la registrazione, l'heartbeat e il relay. Non esporre l'intero intervallo 21114-21119. TCP 21118-21119 sono i backend WebSocket, mentre TCP 21114 è il backend dell'API HTTP/console di Pro. Quando un reverse proxy HTTPS/WSS sta davanti all'API Pro e ai servizi WebSocket, esponi pubblicamente solo TCP 443 per quel traffico e mantieni 21114 e 21118-21119 interni. La porta pubblica 443 non sostituisce le porte principali dei client nativi, se anche questi si connettono. Consulta il [riferimento ufficiale delle porte](https://rustdesk.com/docs/it/self-host/).
- **Configura il TLS.** Termina HTTPS e WSS sul reverse proxy, in modo che credenziali, chiamate API e traffico del client browser usino la porta pubblica TCP 443 invece di esporre la console/API in HTTP semplice o i backend WebSocket grezzi.
- **Fai i backup.** Il server contiene l'inventario dei dispositivi, gli account utente, la rubrica e le regole di accesso. Pianifica i backup e verifica davvero di riuscire a ripristinarli.
- **Mantieni una cadenza di patch.** Nel tempo escono nuove build del server, e il sistema operativo sottostante è di tua responsabilità. Decidi chi applica gli aggiornamenti e con quale frequenza.
- **Monitoralo.** Il servizio di coordinamento ora è tuo, quindi tieni sotto controllo uptime, spazio disco e throughput del relay, e gestisci in prima persona alert e ripristino.

Nulla di tutto questo è esotico per un team che gestisce già server Linux. Assegna un responsabile e un calendario per aggiornamenti, backup, rinnovo dei certificati e test di ripristino, e il server diventa infrastruttura di routine.

## Come valutare il self-hosting

- **Inizia con Server OSS.** Installalo oggi pomeriggio, esamina il codice e usalo quanto vuoi: non ci sono canoni di licenza né scadenze, solo il tuo hosting e la tua banda.
- **Ti serve il set di funzionalità Pro?** Le tariffe dei piani attuali sono su [rustdesk.com/pricing](https://rustdesk.com/pricing), e [sales@rustdesk.com](mailto:sales@rustdesk.com) può indicarti quali opzioni di valutazione sono disponibili al momento.
- **Preferisci guardare piuttosto che installare?** C'è una demo video completa sul [canale YouTube di RustDesk](https://www.youtube.com/@rustdesk).

Se a farti cercare alternative sono stati aumenti di prezzo, codice chiuso o il cloud di un fornitore, il self-hosting è la soluzione strutturale, non uno sconto: decidi tu dove girano i server e chi li gestisce. Per un team che gestisce già infrastruttura è un passo successivo, non un salto nel vuoto: fai un progetto pilota su Server OSS, dimensiona il relay per i picchi di sessioni e sposta il parco dispositivi quando il flusso di lavoro regge.
