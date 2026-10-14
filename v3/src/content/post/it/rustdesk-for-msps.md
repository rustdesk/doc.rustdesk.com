---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-05T19:40:00Z
lang: it
translationKey: rustdesk-for-msps
draft: false
title: 'RustDesk per gli MSP: un unico strumento self-hosted e personalizzabile'
excerpt: "Confronta il consolidamento di TeamViewer, AnyDesk e ScreenConnect in un'unica piattaforma di supporto remoto self-hosted e personalizzabile con il tuo marchio."
image: ~/assets/images/blog/rustdesk-for-msps-og.webp
category: 'Guide'
tags: ['RustDesk', 'MSP', 'Self-hosting']
author: RustDesk Team
slug: 'rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile'
faq:
  - question: 'RustDesk può consolidare più strumenti di supporto remoto per MSP?'
    answer: "Sì, per il controllo e il supporto remoto. RustDesk Server Pro offre a un MSP un'unica console self-hosted, client con il proprio marchio dal piano Basic, il Controllo di accesso per utente e per gruppo di dispositivi e connessioni simultanee illimitate nei piani standard, al posto di console e contratti separati. Prima, fai un pilota delle integrazioni PSA/RMM da cui dipendi."
  - question: 'Come funziona la licenza di RustDesk per gli MSP?'
    answer: 'Paghi per utente con login (i tuoi tecnici) e per dispositivo gestito (le macchine che supporti), e i piani standard includono connessioni simultanee illimitate, così più tecnici possono gestire sessioni contemporaneamente senza acquistare canali. Solo Customized V2 concede in licenza un numero prestabilito di connessioni simultanee; vedi rustdesk.com/pricing.'
  - question: 'Posso applicare il white-label o personalizzare il branding del client RustDesk?'
    answer: 'Sì. RustDesk Server Pro include un generatore di client personalizzati, disponibile dal piano Basic in su, che crea un client con il tuo nome, logo, icona e configurazione del server. I tuoi clienti installano uno strumento con il tuo marchio che si connette al tuo server, invece di un download con il marchio di un fornitore.'
  - question: 'RustDesk è self-hosted, e chi gestisce il server?'
    answer: "Sì. RustDesk Server Pro è self-hosted: l'MSP gestisce server ID/rendezvous, relay, console web e dati di gestione memorizzati sul proprio host on-prem o VPS, e si occupa di patch, monitoraggio, backup e certificati. RustDesk Server OSS, il server community gratuito, fornisce ID/rendezvous e relay senza la gestione Pro."
  - question: 'Come dovrebbe un MSP iniziare a valutare RustDesk?'
    answer: 'Inizia con RustDesk Server OSS, il server community gratuito, su una VM di test: non ha canone di licenza né scadenza, quindi i tecnici possono convalidare un flusso di supporto rappresentativo prima di pagare. Aggiungi Server Pro quando il team ha bisogno della console web, dei client con il tuo marchio o del Controllo di accesso, e scrivi a sales@rustdesk.com per le condizioni di valutazione attuali.'

metadata:
  description: 'RustDesk per MSP: alternativa self-hosted a ScreenConnect/TeamViewer con client a tuo marchio, Controllo di accesso e sessioni illimitate nei piani standard.'
  keywords: 'RustDesk per MSP, supporto remoto self-hosted per MSP, desktop remoto white-label per MSP, strumento di supporto remoto per MSP, licenza desktop remoto per tecnico'
---

La maggior parte degli MSP non cerca un altro strumento di supporto remoto. Ne cerca _meno_: una postazione cloud di supporto remoto qui, uno strumento per tecnico là, un'utility di supporto rapido per i lavori occasionali, ciascuno con la sua console, il suo contratto e il suo rinnovo. RustDesk sostituisce questo cumulo con un'unica piattaforma self-hosted e personalizzabile con il tuo marchio; prima di dismettere qualcosa, fai un pilota delle integrazioni PSA/RMM e dei flussi sugli endpoint su cui contano i tuoi tecnici.

Questa guida tratta il client open source di RustDesk, le opzioni di server self-hosted, l'amministrazione commerciale Pro, il branding e le licenze per i flussi di lavoro degli MSP.

## Gestisci in proprio i servizi di accesso remoto

RustDesk Server Pro è **self-hosted**: è il tuo team a gestire ID/rendezvous, relay, console e dati di gestione memorizzati. Il client di RustDesk e RustDesk Server OSS (il server community gratuito) hanno **[licenza AGPL](https://github.com/rustdesk/rustdesk)**; Server Pro è un software server self-hosted commerciale e proprietario. Quando la revisione di sicurezza di un cliente chiede «che cosa fa questo agent sui nostri endpoint?», puoi indicare il codice sorgente del client invece di un binario chiuso, e scegli tu dove girano i servizi lato server.

Ecco come un'unica piattaforma self-hosted si confronta con il cumulo di strumenti che gli MSP stanno abbandonando:

|                                          | Strumenti di supporto remoto cloud separati | RustDesk Server Pro                                                                                              |
| ---------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Console da gestire                       | Una per strumento                           | Un'unica console self-hosted                                                                                     |
| Branding del client                      | Dipende dal prodotto e dal piano            | Generatore di client personalizzati dal piano Basic in su                                                        |
| Hosting                                  | Cloud del fornitore                         | Self-hosted (on-prem o il tuo VPS)                                                                               |
| Codice sorgente                          | Dipende dal prodotto, spesso proprietario   | Client AGPL verificabile                                                                                         |
| Connessioni/canali simultanei in licenza | Limite che dipende dal piano                | Illimitati nei piani standard; [Customized V2](https://rustdesk.com/pricing#custom2) prevede un numero in licenza |
| Base di licenza                          | Per postazione / per canale                 | [Per utente con login + per dispositivo gestito](https://rustdesk.com/pricing)                                   |

Per i livelli di piano esatti e i prezzi attuali, consulta [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Connessioni simultanee secondo il piano

Paghi per gli utenti con login autorizzati (di solito i tecnici) e per i dispositivi gestiti. I piani standard includono connessioni simultanee illimitate, quindi quando durante un'interruzione tre tecnici lavorano contemporaneamente su tre siti clienti diversi, è un martedì qualsiasi, non un evento da conteggiare. Se finora hai razionato le sessioni simultanee o organizzato il team in base a un numero di canali, nei piani standard quel vincolo sparisce.

Solo [Customized V2](https://rustdesk.com/pricing#custom2) concede in licenza un numero prestabilito di connessioni simultanee. Secondo la [definizione di connessione simultanea](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections) di RustDesk, una connessione simultanea è un dispositivo di controllo attivo, un «canale»: una postazione tecnica con cinque schede di sessione usa un canale, e tre postazioni tecniche attive contemporaneamente ne usano tre. Customized V2 conta inoltre come dispositivi gestiti solo quelli assegnati a un utente o a un gruppo di dispositivi, quindi le macchine assistite occasionalmente non vengono né conteggiate né disattivate; vedi [cosa conta come dispositivo gestito](/it/blog/cosa-conta-come-dispositivo-gestito-in-rustdesk).

## Personalizzalo con il tuo marchio e aggiungi il controllo degli accessi

Server Pro offre a un MSP una console web self-hosted e tre controlli distinti. Il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) decide quali tecnici possono raggiungere quali dispositivi, tramite regole per utenti e gruppi di dispositivi; ogni dispositivo appartiene a un solo gruppo di dispositivi, e i permessi dei gruppi di utenti e dei gruppi di dispositivi sono cumulativi. La rubrica condivisa organizza le voci per i tecnici; non è un confine di accesso. Il [Ruolo di controllo](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/control-role/) limita cosa può fare un tecnico all'interno di una sessione. Il generatore di client personalizzati e lo SSO LDAP/OIDC partono dal piano Basic.

Il client personalizzato conta perché i tuoi clienti installano uno strumento con il tuo nome, il tuo logo e le impostazioni del tuo server, non quello di un fornitore. Il Controllo di accesso ti permette di limitare ogni tecnico ai gruppi di dispositivi dei siti clienti che segue.

## Controllo sulla posizione dei dati lato server

Il self-hosting permette a un MSP di scegliere dove girano ID/rendezvous, relay, console e dati dei dispositivi memorizzati e chi li gestisce, ed è spesso il punto decisivo per i clienti dei settori regolamentati. È un controllo sul deployment, non una certificazione di conformità: le sessioni dirette continuano a viaggiare tra gli endpoint, quindi mappa posizioni e instradamento degli endpoint come descritto in [Sovranità dei dati del desktop remoto e GDPR](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting).

## Mettilo alla prova alle tue condizioni

Puoi valutare RustDesk già da oggi, senza prenotare alcun incontro:

- **Avvia Server OSS su una VM di riserva.** Non ha canone di licenza né scadenza, così puoi convalidare un flusso di lavoro reale con un cliente prima di spendere qualsiasi cosa.
- **Quando entrano in gioco branding e controllo degli accessi,** confronta i livelli su [rustdesk.com/pricing](https://rustdesk.com/pricing) e chiedi a [sales@rustdesk.com](mailto:sales@rustdesk.com) quali condizioni di valutazione sono in vigore.
- **Poco tempo per i test?** Guarda prima RustDesk in azione, oppure sfoglia le guide sul [canale YouTube di RustDesk](https://www.youtube.com/@rustdesk).

Puoi **[effettuare l'upgrade in qualsiasi momento](/it/blog/aggiornare-la-licenza-rustdesk-a-meta-abbonamento-come-funziona)** man mano che la tua base di clienti cresce: l'upgrade estende la licenza a un anno intero dalla data dell'upgrade e accredita il valore residuo già pagato. Inizia da [rustdesk.com/pricing](https://rustdesk.com/pricing).
