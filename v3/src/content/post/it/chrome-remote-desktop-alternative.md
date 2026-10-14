---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-01T08:14:00Z
lang: it
translationKey: chrome-remote-desktop-alternative
draft: false
title: 'Alternativa a Chrome Remote Desktop: RustDesk self-hosted'
excerpt: 'Confronta Chrome Remote Desktop, gestito da Google, con RustDesk: rendezvous e relay self-hosted, un client aperto, Server OSS gratuito e gestione dei team con Pro.'
image: ~/assets/images/blog/chrome-remote-desktop-alternative-og.webp
category: 'Alternative'
tags: ['RustDesk', 'Chrome Remote Desktop', 'Alternativa', 'Self-hosting']
author: 'RustDesk Team'
slug: 'alternativa-a-chrome-remote-desktop-rustdesk-self-hosted'
faq:
  - question: 'Esiste un''alternativa a Chrome Remote Desktop che non richiede un account Google?'
    answer: 'Sì. I client RustDesk configurati sul tuo server self-hosted si connettono tramite ID del dispositivo e password, senza account Google o di altre terze parti. Server Pro può aggiungere account gestiti localmente o il tuo provider di identità. Solo il server demo pubblico di RustDesk richiede un accesso gratuito sul lato controller. Chrome Remote Desktop usa l''identità Google e un coordinamento gestito da Google.'
  - question: 'Chrome Remote Desktop supporta il trasferimento di file?'
    answer: 'Sì, ma solo caricamento e download di base. Chrome Remote Desktop non offre il trasferimento tramite trascinamento. RustDesk include un trasferimento file bidirezionale integrato accanto al controllo remoto, quindi un tecnico può spostare file in entrambe le direzioni senza uscire dalla sessione né passare a un altro strumento.'
  - question: 'Chrome Remote Desktop può offrire l''accesso non presidiato?'
    answer: 'Sì. Chrome Remote Desktop supporta un accesso non presidiato basato sull''account e protetto da PIN, purché il computer di destinazione sia online. RustDesk usa una password permanente, accettata dalle impostazioni predefinite, con il servizio RustDesk in esecuzione sull''host; Server Pro aggiunge la gestione centralizzata di questi dispositivi. Nessuno dei due strumenti riattiva da solo un computer spento.'
  - question: 'RustDesk è gratuito come Chrome Remote Desktop?'
    answer: 'Sì. Il client RustDesk e RustDesk Server OSS (il server community gratuito) hanno licenza AGPL e sono gratuiti, senza canone di licenza né scadenza; hosting e banda sono a carico tuo. Server Pro, commerciale e proprietario, aggiunge la gestione self-hosted dei team, ad esempio console web, gruppi di dispositivi e SSO LDAP/OIDC; vedi rustdesk.com/pricing.'
metadata:
  description: 'Chrome Remote Desktop è gratuito e semplice, ma ti lega a Google e gli mancano funzioni chiave. Confrontalo con RustDesk, alternativa open source e self-hosted.'
  keywords: 'alternativa a Chrome Remote Desktop, alternativa self-hosted a Chrome Remote Desktop, desktop remoto senza account Google, RustDesk vs Chrome Remote Desktop'
---

L'alternativa self-hosted e open source a Chrome Remote Desktop è RustDesk: gestisci tu i server ID/rendezvous e relay con RustDesk Server OSS (il server community gratuito) e puoi leggere il codice sorgente del client, invece di legare l'accesso a un account Google e a un coordinamento gestito da Google. Il commerciale Server Pro aggiunge l'amministrazione per i team sulla stessa base self-hosted.

## Perché cercare un'alternativa a Chrome Remote Desktop

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) è lo strumento gratuito di Google per l'accesso remoto basato su browser. È semplice e veloce: installi un piccolo host, accedi e in un paio di minuti puoi raggiungere il tuo computer da un altro dispositivo, esattamente ciò che serve per un uso personale occasionale.

Ma appena le tue esigenze vanno oltre «aiutare il mio portatile dal divano», i limiti emergono: sei legato all'identità e alla segnalazione di Google, mancano alcune funzionalità pensate per i team di assistenza e il piano di controllo non si può ospitare in proprio. La [guida di rete](https://support.google.com/chrome/a/answer/16364503) di Google spiega il confine: le connessioni vengono negoziate tramite i servizi Google, mentre il traffico della sessione in tempo reale usa percorsi diretti, STUN o TURN/relay, e solo i pacchetti TURN/relay passano dai data center di Google.

## Cosa fa bene Chrome Remote Desktop

Bisogna riconoscergli i suoi meriti. La [recensione di TechRadar](https://www.techradar.com/reviews/chrome-remote-desktop-review) lo definisce «completamente gratuito, senza abbonamenti né livelli premium», facile da configurare e adatto all'uso personale. Funziona su Windows, macOS e Linux, non richiede trattative sulle licenze e non c'è nulla da ospitare. Se vuoi controllare il PC di casa dallo smartphone, CRD richiede uno sforzo quasi nullo.

Quella semplicità è il prodotto stesso. I problemi iniziano quando gli chiedi ciò di cui un team di assistenza o una configurazione con più macchine hanno davvero bisogno.

## Dove Chrome Remote Desktop mostra i suoi limiti

### Funzionalità mancanti: controllo self-hosted, gestione dei dispositivi e flussi di lavoro per i team

Le pagine di supporto di Google documentano l'accesso remoto a file e applicazioni e permettono agli amministratori di controllare l'accesso e il comportamento di rete, ma descrivono comunque un servizio basato su account Google con coordinamento gestito da Google: la suddivisione tra segnalazione e relay illustrata nell'introduzione. In altre parole, CRD va bene per un accesso semplice, ma non è una console di assistenza self-hosted con gruppi di dispositivi come quelli di RustDesk o con un marchio personalizzato.

### Accesso non presidiato e computer in sospensione

CRD supporta l'accesso non presidiato protetto da PIN, ma il computer di destinazione deve essere acceso, online e associato allo stesso account Google. Anche RustDesk ha bisogno che l'host sia online, con il suo servizio in esecuzione e i permessi della piattaforma concessi. Nessuno dei due strumenti riattiva da solo un computer spento; la documentazione di RustDesk indica che, dopo il rilevamento nella LAN, il Wake-on-LAN può funzionare se è supportato localmente.

### Gestione degli utenti e il requisito dell'account Google

Ogni partecipante ha bisogno di un account Google e, per le sessioni condivise (cioè presidiate), qualcuno deve essere presente per concedere l'accesso. Gli amministratori di Google Workspace possono [abilitare o disabilitare CRD e limitare l'attraversamento del firewall](https://support.google.com/chrome/a/answer/2799701), ma questo non equivale a una console di assistenza self-hosted con gruppi di dispositivi e accesso dei tecnici con ambito delimitato, e Google resta nel percorso dell'identità e della configurazione della sessione, come descritto nell'introduzione. (Per l'aspetto specifico della sicurezza, vedi [Chrome Remote Desktop è sicuro?](/it/blog/chrome-remote-desktop-e-sicuro-una-recensione-onesta))

## Chrome Remote Desktop vs RustDesk: uno sguardo d'insieme

|                                                                                                  | Chrome Remote Desktop                                                                                                                                              | RustDesk                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Costo                                                                                            | Gratuito                                                                                                                                                           | Client e Server OSS gratuiti; Server Pro a pagamento                                                                                                     |
| Piano di controllo e traffico                                                                    | Identità/segnalazione Google; media diretti, via STUN o inoltrati dal relay di Google                                                                              | Ruoli server [self-hosted](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto); media diretti o inoltrati dal tuo relay               |
| Codice sorgente                                                                                  | [Componenti remoting pubblici di Chromium](https://chromium.googlesource.com/chromium/src/+/main/remoting/); il servizio Google non è disponibile in self-hosting | Client e Server OSS AGPL; gestione di Server Pro proprietaria                                                                                            |
| Account necessario                                                                               | Account Google su entrambi i lati                                                                                                                                  | ID proprio; nessun account di terze parti richiesto                                                                                                      |
| Trasferimento file / flussi di trasferimento                                                     | Solo caricamento/download (niente trascinamento)                                                                                                                   | Integrato                                                                                                                                                |
| [Accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione) | Basato su account/PIN; il computer di destinazione deve essere online                                                                                              | Password permanente; servizio in esecuzione e permessi del sistema operativo concessi; il computer di destinazione deve essere online                     |
| Gestione centralizzata                                                                           | Criteri di Google Admin; nessun servizio di controllo CRD gestito dal cliente                                                                                      | Console di Server Pro, Controllo di accesso, gruppi di dispositivi e rubriche condivise                                                                  |
| Marchio personalizzato                                                                           | No                                                                                                                                                                 | Generatore di client personalizzati con il tuo marchio (dal piano Basic in su)                                                                           |
| Piattaforme                                                                                      | Win/macOS/Linux (in Chrome)                                                                                                                                        | Win/macOS/[Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source)/Android; app controller per iOS                                             |

## Dove si colloca RustDesk: self-hosted e open source

Ciò che distingue RustDesk è un **server self-hosted che puoi davvero installare**. [Chromium pubblica il codice sorgente remoting di CRD](https://chromium.googlesource.com/chromium/src/+/main/remoting/), ma il servizio di coordinamento di Google non può essere ospitato in proprio; con RustDesk, invece, gestisci tu Server OSS o Server Pro.

Il **client RustDesk e Server OSS hanno licenza AGPL** e possono essere esaminati e compilati in modo indipendente. Server OSS fornisce ID/rendezvous e relay self-hosted, senza canone di licenza né scadenza. **Server Pro è un software server self-hosted commerciale e proprietario** che aggiunge l'amministrazione sulla tua infrastruttura. Le sessioni dirette viaggiano tra gli endpoint; quelle inoltrate usano il tuo relay. Valuta le [implicazioni sulla sovranità dei dati](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting) insieme alla posizione del server.

Server Pro aggiunge le funzionalità per i team che mancano a CRD: una console web self-hosted, gruppi di dispositivi, rubriche condivise e il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) per utente e per gruppo di dispositivi, con generazione di client personalizzati e SSO LDAP/OIDC dal piano Basic. L'accesso non presidiato con password permanente funziona su host Windows, macOS e Linux una volta avviato il servizio e concessi i permessi del sistema operativo; gli host Android richiedono anche il consenso alla cattura dello schermo e il permesso di input e sono soggetti ai limiti in background imposti dai produttori, mentre l'app iOS è solo un controller.

## Fuori dal cloud di Google, dentro il tuo

Il salto di qualità rispetto a Chrome Remote Desktop è il controllo: mediazione delle connessioni, criteri di accesso e dati di gestione passano dai server di Google a server che gestisci tu, con un client che puoi verificare. Questo controllo comporta la responsabilità di patch, disponibilità e ripristino.

## Provalo senza contattare le vendite

Puoi valutare RustDesk alle tue condizioni, senza alcun account Google in mezzo. Server OSS è gratuito, senza canone di licenza né scadenza; quando le funzionalità per i team di Pro diventano importanti, [sales@rustdesk.com](mailto:sales@rustdesk.com) può indicarti le attuali condizioni di valutazione, e [rustdesk.com/pricing](https://rustdesk.com/pricing) elenca le tariffe dei piani.

Leggi tu stesso il codice su [GitHub](https://github.com/rustdesk/rustdesk), collega un paio di dispositivi al tuo server e decidi se i compromessi ti convincono prima di impegnarti in qualsiasi cosa.
