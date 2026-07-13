---
publishDate: 2026-07-01T08:14:00Z
lang: it
translationKey: chrome-remote-desktop-alternative
draft: false
title: 'Alternativa a Chrome Remote Desktop: RustDesk self-hosted'
excerpt: "Chrome Remote Desktop è gratuito e semplice, ma ti lega a Google e rinuncia a funzionalità chiave. Ecco un'alternativa open source e self-hosted che controlli tu."
image: ~/assets/images/blog/chrome-remote-desktop-alternative-og.webp
category: 'Alternative'
tags: ['RustDesk', 'Chrome Remote Desktop', 'Alternativa', 'Self-hosting']
author: 'RustDesk Team'
slug: 'alternativa-a-chrome-remote-desktop-rustdesk-self-hosted'
faq:
  - question: "Esiste un'alternativa a Chrome Remote Desktop che non richiede un account Google?"
    answer: "Sì. RustDesk self-hosted non richiede alcun account di terze parti (il server demo pubblico richiede comunque un accesso gratuito per il controller): al posto di un account Google utilizza propri server ID/rendezvous e relay, e puoi ospitare tu stesso questi server in modo che nessun cloud di terze parti si frapponga. Chrome Remote Desktop, al contrario, richiede un account Google sia sull'host che sul client."
  - question: 'Chrome Remote Desktop supporta il trasferimento di file?'
    answer: 'Chrome Remote Desktop offre un caricamento/download di file di base, ma non il trasferimento drag-and-drop. RustDesk include il trasferimento file integrato insieme al controllo remoto.'
  - question: "Chrome Remote Desktop può offrire l'accesso non presidiato?"
    answer: "Sì, può farlo, ma il computer di destinazione deve essere acceso e collegato allo stesso account Google, e Chrome Remote Desktop non è in grado di riattivare un computer in stato di sospensione. RustDesk supporta l'accesso non presidiato con password permanente su un parco macchine che gestisci dalla tua console."
  - question: 'RustDesk è gratuito come Chrome Remote Desktop?'
    answer: 'RustDesk è open source con licenza AGPL e puoi eseguire il server community gratuito a tempo indeterminato e senza costi. Il Server Pro commerciale aggiunge funzionalità per i team ed è self-hosted; per le condizioni attuali consulta rustdesk.com/pricing.'
metadata:
  description: "Chrome Remote Desktop è gratuito e semplice ma ti lega a Google e manca di funzionalità chiave. Confrontalo con RustDesk, un'alternativa open source e self-hosted."
  keywords: 'alternativa a Chrome Remote Desktop, alternativa self-hosted a Chrome Remote Desktop, desktop remoto senza account Google, RustDesk vs Chrome Remote Desktop'
---

La risposta self-hosted e open source a Chrome Remote Desktop è RustDesk: ospiti tu stesso l'intermediazione delle connessioni e puoi leggere il codice sorgente del client, invece di instradare ogni sessione attraverso il cloud di Google e legare l'accesso a un account Google.

## Perché cercare un'alternativa a Chrome Remote Desktop

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) è lo strumento di accesso remoto gratuito e basato su browser di Google. È semplice e veloce: installi un piccolo host, accedi con il tuo account e in un paio di minuti puoi raggiungere il tuo computer da un altro dispositivo — esattamente ciò che serve per un uso personale occasionale.

Ma nel momento in cui le tue esigenze superano il semplice "aiutare il mio portatile dal divano", i limiti emergono. Sei legato all'identità e alla segnalazione di Google, mancano alcune funzionalità pensate per i team di supporto e il piano di controllo non può essere self-hosted. La [guida di rete](https://support.google.com/chrome/a/answer/16364503) di Google spiega il confine: le connessioni vengono inizialmente negoziate tramite i servizi Google, mentre il traffico WebRTC in tempo reale utilizza percorsi diretti, STUN o TURN/relay. Solo i pacchetti di sessione TURN/relay vengono instradati attraverso i data center di Google. Se hai già toccato con mano questi compromessi, questa pagina illustra come si presenta un'alternativa self-hosted e open source.

## Cosa fa bene Chrome Remote Desktop

Va dato atto a Chrome Remote Desktop dei suoi meriti. La [recensione di TechRadar](https://www.techradar.com/reviews/chrome-remote-desktop-review) lo definisce "completamente gratuito, senza abbonamenti né livelli premium", facile da configurare e adatto all'uso personale. Funziona su Windows, macOS e Linux, non richiede alcuna negoziazione di licenza e non c'è nulla da ospitare. Se vuoi controllare il tuo PC di casa dallo smartphone, CRD è quasi a sforzo zero.

Quella semplicità è il prodotto stesso. I problemi iniziano quando gli chiedi di fare ciò di cui un team di supporto o una configurazione multi-macchina hanno davvero bisogno.

## Dove Chrome Remote Desktop mostra i suoi limiti

### Funzionalità mancanti: controllo self-hosted, gestione dei dispositivi e flussi di lavoro per i team

Le pagine di supporto di Google documentano l'accesso remoto a file e applicazioni e permettono agli amministratori di controllare l'accesso e il comportamento di rete, ma descrivono comunque un servizio basato su account Google con coordinamento gestito da Google — la suddivisione tra segnalazione e relay illustrata nell'introduzione. In altre parole: CRD va bene per un accesso semplice, ma non è una console di supporto self-hosted con gruppi di dispositivi in stile RustDesk o branding personalizzato.

### Accesso non presidiato e computer in sospensione

CRD è in grado di offrire l'accesso non presidiato, ma il computer di destinazione deve comunque essere **acceso e online** e connesso allo **stesso account Google**. Google documenta l'accesso remoto basato su PIN, non un sostituto del wake-on-LAN. Se il computer è in sospensione o offline, CRD non ha nulla a cui connettersi. Per un parco di endpoint remoti, si tratta di un vincolo operativo concreto.

### Gestione degli utenti e il requisito dell'account Google

Ogni partecipante ha bisogno di un account Google e, per le sessioni condivise (non presidiate), qualcuno deve essere presente per concedere l'accesso. Gli amministratori di Google Workspace possono [abilitare o disabilitare CRD e limitare l'attraversamento del firewall](https://support.google.com/chrome/a/answer/2799701), ma questo non equivale a una console di supporto self-hosted con gruppi di dispositivi e accesso dei tecnici con ambito delimitato — e Google resta comunque nel percorso di identità e configurazione della sessione, come descritto nell'introduzione. (Per l'aspetto specifico della sicurezza, vedi [Chrome Remote Desktop è sicuro?](/it/blog/chrome-remote-desktop-e-sicuro-una-recensione-onesta))

## Chrome Remote Desktop vs RustDesk: uno sguardo d'insieme

|                                                                                                  | Chrome Remote Desktop                                                               | RustDesk                                                                                                                                           |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Costo                                                                                            | Gratuito                                                                            | Open source (AGPL); server community gratuito; Server Pro a pagamento                                                                              |
| Piano di controllo e traffico                                                                    | Identità/segnalazione Google; media diretti, STUN o instradati tramite relay Google | Ruoli server [self-hosted](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto); media diretti o instradati tramite relay proprio |
| Codice sorgente                                                                                  | Proprietario                                                                        | Open source ([AGPL](https://github.com/rustdesk/rustdesk)), verificabile                                                                           |
| Account necessario                                                                               | Account Google su entrambi i lati                                                   | ID proprio; nessun account di terze parti richiesto                                                                                                |
| Trasferimento file / flussi di trasferimento                                                     | Solo upload/download (nessun drag-and-drop)                                         | Integrato                                                                                                                                          |
| [Accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione) | Stesso account Google, il computer deve essere attivo                               | Accesso con password permanente su un parco macchine che gestisci tu                                                                               |
| Gestione centralizzata                                                                           | Criteri di Google Admin; nessuna console di supporto self-hosted                    | Console web, [gruppi di dispositivi e rubrica condivisa](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/)                  |
| Branding personalizzato                                                                          | No                                                                                  | Generatore di client con branding personalizzato (piano Basic e superiori)                                                                         |
| Piattaforme                                                                                      | Win/macOS/Linux (in Chrome)                                                         | Win/macOS/[Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source)/Android; app controller per iOS                                       |

## Dove si colloca RustDesk: self-hosted e open source

RustDesk è costruito attorno alle due cose che CRD non può offrire per sua natura strutturale: **ospiti tu stesso l'infrastruttura e puoi leggere il codice.**

RustDesk è open source con licenza **[AGPL](https://github.com/rustdesk/rustdesk)** — puoi verificare esattamente cosa viene eseguito sulle tue macchine, compilarlo tu stesso ed eseguire il **server community gratuito a tempo indeterminato**. Quando passi a Server Pro, è **[self-hosted per progettazione](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto)**: i server ID/rendezvous e relay girano sulla tua macchina o su un VPS che noleggi, quindi nessun cloud di Google (o di qualsiasi altro fornitore) si frappone. Una sfumatura da considerare per la pianificazione della conformità: le connessioni dirette viaggiano comunque tra gli endpoint e il traffico instradato tramite relay utilizza il tuo relay, quindi valuta le [implicazioni sulla sovranità dei dati](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting) invece di presumere che la posizione del server controlli ogni pacchetto.

Oltre a questo nucleo self-hosted, RustDesk aggiunge le funzionalità per i team che mancano a CRD: una [console web self-hosted](https://rustdesk.com/docs), un generatore di client con branding personalizzato, [gruppi di dispositivi e una rubrica condivisa](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) per un accesso con ambito delimitato, e [SSO LDAP/AD e OIDC](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/ldap/) a partire dal piano Basic. Il trasferimento file reale e l'[accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione) con password permanente sono inclusi di serie sugli host Windows, macOS, Linux e Android; l'app iOS funge solo da controller.

## Fuori dal cloud di Google, dentro il tuo

Il passo avanti rispetto a Chrome Remote Desktop è il controllo: intermediazione, criteri di accesso e dati di sessione si spostano dai server di Google a un server che gestisci tu e che puoi verificare. Per chiunque voglia un accesso remoto che risponda solo a sé stesso, questo è il vantaggio.

## Provalo senza contattare le vendite

Puoi valutare RustDesk alle tue condizioni, senza alcun account Google coinvolto nel processo. Il server community open source è gratuito da eseguire quanto vuoi; quando le funzionalità per i team di Pro diventano rilevanti, [sales@rustdesk.com](mailto:sales@rustdesk.com) può indicarti le condizioni di valutazione attuali, e [rustdesk.com/pricing](https://rustdesk.com/pricing) elenca le tariffe dei piani.

Leggi tu stesso il codice su [GitHub](https://github.com/rustdesk/rustdesk), punta un paio di dispositivi verso il tuo server e decidi se i compromessi ti convincono prima di impegnarti in qualsiasi cosa.
