---
publishDate: 2026-07-06T12:36:00Z
lang: it
translationKey: rustdesk-and-remote-access-scams
draft: false
title: 'RustDesk e le truffe di accesso remoto: cosa stiamo facendo'
excerpt: 'Perché RustDesk ha lasciato Google Play, ha aggiunto avvisi e requisiti di login sul server pubblico, e come gli utenti possono proteggere i dispositivi controllati con password, 2FA e liste di indirizzi IP consentiti.'
image: ~/assets/images/blog/rustdesk-and-remote-access-scams-og.png
category: 'Sicurezza'
tags: ['RustDesk', 'Sicurezza', 'Truffe']
author: RustDesk Team
slug: 'rustdesk-e-le-truffe-di-accesso-remoto-cosa-stiamo-facendo'
faq:
  - question: 'RustDesk è una truffa?'
    answer: "No. RustDesk è un software di accesso remoto open-source legittimo. Come altri strumenti di desktop remoto, tuttavia, può essere utilizzato in modo improprio quando un truffatore convince qualcuno a installarlo, avviare il suo servizio e concedere l'accesso. RustDesk pubblica avvisi sulle truffe e ha aggiunto restrizioni alla distribuzione e al server pubblico per ridurre questo abuso, ma nessun prodotto di accesso remoto può rendere impossibile l'ingegneria sociale."
  - question: 'Perché RustDesk non è disponibile su Google Play?'
    answer: 'RustDesk ha rimosso volontariamente la sua app Android da Google Play a settembre 2023 per prevenire ulteriori truffe ai danni degli utenti. Le build per Android restano disponibili tramite le release ufficiali su GitHub di RustDesk e su F-Droid. Scarica solo da fonti che hai verificato in modo indipendente, non da un link inviato da un chiamante non richiesto.'
  - question: 'Perché il server pubblico di RustDesk richiede il login?'
    answer: 'RustDesk afferma che il login del controller è attualmente richiesto sul suo server pubblico a causa di truffe e abusi da botnet in corso. Il login è gratuito tramite i provider di identità di terze parti supportati. Il server pubblico è pensato per dimostrazione e test, non per uso in produzione o per lavori sensibili; il self-hosting resta disponibile per le organizzazioni che devono gestire la propria infrastruttura e le proprie policy.'
  - question: 'Come posso proteggere un dispositivo che accetta connessioni RustDesk?'
    answer: "Imposta una password permanente forte e univoca sul dispositivo controllato, abilita la 2FA TOTP per la connessione del client e utilizza la lista di indirizzi IP consentiti quando gli indirizzi o gli intervalli CIDR del tuo controller sono prevedibili. Mantieni ristrette le eccezioni per i dispositivi attendibili. Questi livelli riducono i rischi legati alla password e all'origine di rete, ma non possono proteggere chi fornisce deliberatamente a un truffatore la password, il codice 2FA corrente o l'approvazione manuale."
metadata:
  description: 'Come RustDesk risponde alle truffe di accesso remoto: avvisi pubblici, rimozione da Google Play, login sul server pubblico, 2FA sul dispositivo controllato e liste di indirizzi IP consentiti CIDR.'
  keywords: 'RustDesk truffa, RustDesk è una truffa, RustDesk Google Play, RustDesk login richiesto, RustDesk 2FA, RustDesk whitelist IP, prevenzione truffe accesso remoto'
---

RustDesk è un software di accesso remoto open-source legittimo, ma anche un software legittimo può essere utilizzato in modo improprio. Un truffatore può chiamare una vittima, inventare un problema urgente e convincere quella persona a installare uno strumento di controllo remoto e a concedere l'accesso. RustDesk non è esente da questo rischio, e la crittografia non può rimediare a un consenso ottenuto tramite inganno.

La nostra risposta è stata quella di introdurre avvisi e attrito in diversi punti di questo percorso: sul nostro sito web, all'interno del flusso del dispositivo controllato Android, su un importante canale di distribuzione e sul server pubblico. Queste misure creano disagio anche agli utenti legittimi. Questo articolo documenta cosa abbiamo fatto, perché lo abbiamo fatto e quali sono i limiti che restano.

## Cosa ha fatto RustDesk contro le truffe di accesso remoto?

| Azione                                             | Cosa affronta                                                                         | Costo o limitazione                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Avvisi sul sito web e nel client                   | Una persona a cui un chiamante sconosciuto chiede di installare RustDesk              | Un avviso può comunque essere ignorato                                                                  |
| Rimozione volontaria da Google Play                | Installazione facile guidata da truffe tramite uno store di app familiare             | Gli utenti Android legittimi perdono la scopribilità nello store e gli aggiornamenti automatici di Play |
| Login sul server pubblico                          | Uso anonimo e da botnet dell'infrastruttura condivisa per finalità di truffa          | Gli utenti legittimi devono accedere e alcuni flussi di lavoro esistenti vengono interrotti             |
| Controlli di sicurezza del dispositivo controllato | Furto di password, ampia esposizione di rete e rischio legato all'accesso incustodito | Devono essere configurati correttamente e non possono contrastare una divulgazione volontaria           |

Si tratta di misure di riduzione del rischio, non di un'affermazione secondo cui RustDesk sia a prova di truffa.

## Avvisi nei punti in cui una potenziale vittima potrebbe vederli

La [pagina di supporto di RustDesk](https://rustdesk.com/support) si apre con un avviso diretto sulle truffe. Dice alle persone che sono al telefono con qualcuno che non conoscono e di cui non si fidano, e a cui è stato chiesto di installare RustDesk, di fermarsi. Anche il [repository GitHub di RustDesk](https://github.com/rustdesk/rustdesk) riporta una clausola di esclusione di responsabilità contro l'accesso non autorizzato, il controllo e la violazione della privacy.

L'avviso si trova anche all'interno del client Android ufficiale distribuito tramite [GitHub Releases](https://github.com/rustdesk/rustdesk/releases). Su un dispositivo Android non autenticato che sta per essere controllato, toccando **Avvia servizio** si apre un avviso prima che il servizio di cattura schermo abbia inizio. L'avviso dice a un utente che è stato indirizzato da un chiamante sconosciuto e non affidabile di fermarsi e riagganciare. Le build ufficiali impongono un conto alla rovescia prima che l'utente possa continuare. Sia il [flusso attuale lato dispositivo controllato](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421) sia il [testo dell'avviso in inglese](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194) sono visibili nel repository open-source.

Questa collocazione è importante. Una pagina generica sulla sicurezza può raggiungere chi sta facendo ricerche su un prodotto; un avviso su **Avvia servizio** raggiunge la persona proprio nel momento in cui una sessione Android in ingresso sta per diventare possibile. Ciò non può comunque costringere quella persona a diffidare di un chiamante convincente.

## Perché RustDesk non è su Google Play

Il 3 settembre 2023, l'account X ufficiale di RustDesk ha dichiarato: [“Abbiamo temporaneamente rimosso la pubblicazione di RustDesk da Google Play per prevenire ulteriori truffe ai danni degli utenti.”](https://x.com/rustdesk/status/1698372220379349421) Il link e il testo sono conservati anche nella [discussione GitHub #5660](https://github.com/rustdesk/rustdesk/discussions/5660) a cui è stata data risposta, e le attuali [FAQ di RustDesk affermano che il progetto si è ritirato da Google Play a causa delle truffe](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store).

RustDesk **non è quindi attualmente distribuito tramite Google Play**. Questo non era un'affermazione secondo cui il client Android fosse malware, né che ogni persona che lo installava fosse a rischio. Si è trattato di una decisione di distribuzione volta a ridurre un percorso comune utilizzato nelle istruzioni delle truffe.

Il compromesso è reale: lasciare Google Play riduce la scopribilità, la familiarità dell'installazione e gli aggiornamenti automatici dello store per gli utenti legittimi. Le build Android attuali sono disponibili tramite le [release ufficiali su GitHub di RustDesk](https://github.com/rustdesk/rustdesk/releases) e su [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). Verifica tu stesso la destinazione. Non installare un APK da un link di download inviato da un chiamante di supporto non richiesto. La nostra [guida per Android e iOS](/it/blog/controllo-remoto-rustdesk-su-android-e-ios-cosa-funziona) elenca le funzionalità mobili attuali e le fonti di installazione.

## Perché il server pubblico richiede il login

L'attuale [guida al login sul server pubblico](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server) di RustDesk afferma che il login del controller è richiesto a causa di truffe e abusi da botnet in corso. Il login è gratuito e utilizza un provider di identità di terze parti supportato, come Google o GitHub; sul server pubblico non vengono offerti un nome utente e una password separati. La guida afferma attualmente che solo i controller sono tenuti ad accedere.

Questo aggiunge un passaggio di identità e rimuove parte dell'accesso anonimo all'infrastruttura che RustDesk gestisce per dimostrazione e test. Non regola un server RustDesk privato e non può fermare un truffatore che utilizza un'altra infrastruttura o crea una nuova identità.

Ha anche causato disagi. In una [discussione su Reddit riguardante il nuovo errore di login](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/), alcuni utenti legittimi hanno segnalato di non riuscire a raggiungere i dispositivi di casa o della famiglia finché non hanno compreso e completato il passaggio di login. Altri si sono opposti al collegamento di un'identità di terze parti. Questi commenti non sono una prova che la restrizione funzioni o fallisca contro i truffatori, ma documentano il suo costo operativo. Una prevenzione degli abusi che introduce attrito dovrebbe riconoscere apertamente questo costo.

## Come proteggere un dispositivo RustDesk controllato?

Le restrizioni a livello di piattaforma rappresentano solo un livello. Il proprietario o l'amministratore di un dispositivo controllato dovrebbe inoltre ridurre chi può connettersi e cosa può fare una credenziale rubata.

### 1. Imposta una password permanente forte e univoca

Per l'[accesso incustodito](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione), imposta una **password permanente forte e univoca** nelle impostazioni di sicurezza di RustDesk del dispositivo controllato. Non riutilizzare il login del sistema operativo, la password dell'email o una password usata su un altro servizio. Cambiala immediatamente se potrebbe essere stata divulgata.

Per il supporto assistito, preferisci una password temporanea monouso o l'approvazione esplicita con un clic quando è praticabile. Una password permanente forte riduce i rischi legati ai tentativi di indovinarla, al credential stuffing e al riutilizzo della password. Non è di alcun aiuto se una vittima legge quella password a un chiamante.

### 2. Abilita la 2FA sul dispositivo controllato

RustDesk include la 2FA TOTP per le connessioni in ingresso verso un dispositivo controllato. Sul dispositivo che accetterà le connessioni, apri le sue impostazioni di sicurezza, abilita la **2FA**, scansiona il codice QR con un'app di autenticazione e conferma la configurazione con il codice a sei cifre.

Una volta abilitata, accettare la normale password di connessione non è sufficiente: il controller deve anche fornire il codice TOTP a sei cifre corrente prima che il dispositivo controllato autorizzi la sessione. La funzionalità è stata introdotta specificamente come [2FA per l'accesso incustodito](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b), e la sua [implementazione TOTP è pubblica](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs).

RustDesk può facoltativamente considerare attendibile un dispositivo controller e saltare le successive richieste di 2FA. Lascia questa opzione di bypass disabilitata per il comportamento più rigoroso. Se la utilizzi, controlla l'elenco dei dispositivi attendibili e rimuovi quelli persi, sostituiti, condivisi o non più autorizzati.

La 2FA protegge da una password che è stata indovinata, riutilizzata o esposta. Non può proteggere chi fornisce a un truffatore sia la password sia il codice dell'autenticatore corrente.

### 3. Limita le connessioni in ingresso con una lista di indirizzi IP consentiti

L'interfaccia di RustDesk chiama questa funzionalità **IP Whitelisting**. In termini esplicativi, si tratta di una lista di indirizzi IP consentiti: il dispositivo controllato rifiuta una connessione il cui indirizzo di origine è al di fuori dell'elenco configurato, prima dell'autorizzazione tramite password e 2FA.

Configurala qui:

- **Dispositivo controllato desktop:** **Impostazioni → Sicurezza → Sicurezza → Use IP Whitelisting**
- **Dispositivo controllato mobile:** **Impostazioni → Condividi schermo → Use IP Whitelisting**

L'impostazione accetta singoli indirizzi IPv4 o IPv6 e intervalli CIDR. Il CIDR combina un indirizzo di rete con una lunghezza di prefisso. Il prefisso indica quanti bit iniziali sono fissi: un prefisso più grande significa un intervallo consentito più piccolo.

- `203.0.113.10` oppure `203.0.113.10/32`: un indirizzo IPv4.
- `203.0.113.0/24`: 256 indirizzi IPv4, da `203.0.113.0` a `203.0.113.255`.
- `2001:db8::10/128`: un indirizzo IPv6.
- `2001:db8:1234::/64`: una sottorete IPv6.

Questi sono intervalli di esempio a solo scopo documentativo; non copiarli così come sono. Inserisci i tuoi indirizzi o le tue reti effettive del controller. Più voci possono essere separate da virgole, punti e virgola, spazi o nuove righe. RustDesk documenta questa impostazione nel suo [riferimento per la configurazione avanzata del client](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#whitelist), e l'[applicazione lato dispositivo controllato è visibile nel codice sorgente](https://github.com/rustdesk/rustdesk/blob/master/src/server/connection.rs#L1347-L1374).

Usa gli intervalli più piccoli possibile dal punto di vista pratico. Gli indirizzi fissi di uscita dell'ufficio e gli intervalli VPN noti sono buoni candidati. Gli indirizzi residenziali dinamici e i controller in roaming non lo sono. Verifica quale indirizzo di origine vede RustDesk nella tua topologia NAT, VPN, diretta o relay, e testa la nuova regola da un'altra sessione prima di chiudere quella di lavoro. Un indirizzo o un CIDR errato può escludere il personale di supporto legittimo.

Una lista di indirizzi IP consentiti restringe da dove può avere origine una connessione. Non sostituisce una password o la 2FA, e non può fermare un controller malintenzionato che sta già operando da una rete consentita.

## Cosa non possono fare queste misure

Avvisi, rimozione dallo store, requisiti di login, password forti, 2FA e liste di indirizzi IP consentiti eliminano ciascuno una parte dell'opportunità di un attaccante. Nessuno di essi elimina il rischio centrale legato all'ingegneria sociale: una persona può comunque essere convinta ad approvare l'accesso o a rivelare ogni fattore.

Anche il self-hosting non rende impossibile l'abuso. Offre a un'organizzazione il controllo del proprio server RustDesk e delle proprie policy, ma un truffatore può anche gestire un'infrastruttura privata o distribuire un client modificato. Le restrizioni del server pubblico di RustDesk non devono essere scambiate per una protezione che si estende automaticamente a ogni implementazione self-hosted.

Se un chiamante sconosciuto ti dice di installare RustDesk, avviare il suo servizio, condividere una password, rivelare un codice 2FA o aprire un sito bancario, fermati. La nostra guida indipendente dai fornitori su come [individuare, prevenire e recuperare da truffe di desktop remoto](/it/blog/truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle) spiega i segnali di allarme e cosa fare se l'accesso è già stato concesso.

La responsabilità, in questo caso, non è un'unica impostazione o una dichiarazione di buone intenzioni. È il lavoro continuo di avvisare gli utenti, accettare attrito dove l'abuso lo richiede, fornire controlli tecnici, documentarne i limiti e adattare la risposta man mano che gli attaccanti cambiano i loro metodi.
