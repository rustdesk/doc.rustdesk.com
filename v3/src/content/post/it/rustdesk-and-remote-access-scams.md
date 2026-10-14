---
publishDate: 2026-07-06T12:36:00Z
updateDate: 2026-10-14T00:00:00Z
lang: it
translationKey: rustdesk-and-remote-access-scams
draft: false
title: 'RustDesk e le truffe di accesso remoto: cosa stiamo facendo'
excerpt: 'Perché RustDesk ha lasciato Google Play, ha aggiunto avvisi e requisiti di login sul server pubblico, e come gli utenti possono proteggere i dispositivi controllati con password, 2FA e liste di indirizzi IP e di ID consentiti.'
image: ~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp
category: 'Sicurezza'
tags: ['RustDesk', 'Sicurezza', 'Truffe']
author: RustDesk Team
slug: 'rustdesk-e-le-truffe-di-accesso-remoto-cosa-stiamo-facendo'
faq:
  - question: 'RustDesk è una truffa?'
    answer: "No. RustDesk è un software legittimo e open source per l'accesso remoto. Come altri strumenti di desktop remoto, tuttavia, può essere usato in modo improprio quando un truffatore convince qualcuno a installarlo, avviare il suo servizio e concedere l'accesso. RustDesk pubblica avvisi sulle truffe e ha aggiunto restrizioni alla distribuzione e al server pubblico per ridurre questo abuso, ma nessun prodotto di accesso remoto può rendere impossibile l'ingegneria sociale."
  - question: 'Perché RustDesk non è disponibile su Google Play?'
    answer: 'RustDesk ha rimosso volontariamente la sua app Android da Google Play a settembre 2023 per prevenire ulteriori truffe ai danni degli utenti. Le build per Android restano disponibili tramite le release ufficiali su GitHub di RustDesk e su F-Droid. Scarica solo da fonti che hai verificato in modo indipendente, non da un link inviato da qualcuno che ti ha chiamato di sua iniziativa.'
  - question: 'Perché il server pubblico di RustDesk richiede il login?'
    answer: 'RustDesk afferma che il login del controller è attualmente richiesto sul suo server pubblico a causa di truffe e abusi da botnet in corso. Il login è gratuito tramite i provider di identità di terze parti supportati. Il server pubblico è pensato per dimostrazione e test, non per uso in produzione o per lavori sensibili; il self-hosting resta disponibile per le organizzazioni che devono gestire la propria infrastruttura e le proprie policy.'
  - question: 'Come posso proteggere un dispositivo che accetta connessioni RustDesk?'
    answer: "Imposta una password permanente forte e univoca sul dispositivo controllato, attiva la 2FA TOTP del client per le connessioni e usa la lista di indirizzi IP consentiti quando gli indirizzi o gli intervalli CIDR dei tuoi controller sono prevedibili. A partire da RustDesk 1.5.0, una lista di ID consentiti può inoltre limitare quali ID RustDesk possono connettersi. Mantieni ristrette le eccezioni per i dispositivi attendibili. Questi livelli riducono i rischi legati alla password e all'origine di rete, ma non possono proteggere chi fornisce deliberatamente a un truffatore la password, il codice 2FA corrente o l'approvazione manuale."
metadata:
  description: 'Come RustDesk risponde alle truffe di accesso remoto: avvisi pubblici, rimozione da Google Play, login sul server pubblico, 2FA e liste di IP e ID consentiti.'
  keywords: 'RustDesk truffa, RustDesk è una truffa, RustDesk Google Play, RustDesk login richiesto, RustDesk 2FA, RustDesk whitelist IP, RustDesk whitelist ID, prevenzione truffe accesso remoto'
---

RustDesk è un software legittimo e open source per l'accesso remoto, ma anche un software legittimo può essere usato in modo improprio. Un truffatore può chiamare una vittima, inventare un problema urgente e convincere quella persona a installare uno strumento di controllo remoto e a concedere l'accesso. RustDesk non è esente da questo rischio, e la crittografia non può rimediare a un consenso ottenuto tramite inganno.

La nostra risposta è stata quella di introdurre avvisi e attrito in diversi punti di questo percorso: sul nostro sito web, all'interno del flusso del dispositivo controllato Android, su un importante canale di distribuzione e sul server pubblico. Queste misure creano disagio anche agli utenti legittimi. Questo articolo documenta cosa abbiamo fatto, perché lo abbiamo fatto e quali sono i limiti che restano.

## Cosa ha fatto RustDesk contro le truffe di accesso remoto?

| Azione                                             | Cosa affronta                                                                         | Costo o limitazione                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Avvisi sul sito web e nel client                   | Una persona a cui uno sconosciuto al telefono chiede di installare RustDesk           | Un avviso può comunque essere ignorato                                                                  |
| Rimozione volontaria da Google Play                | Installazione facile, su indicazione dei truffatori, da uno store di app familiare     | Gli utenti Android legittimi perdono la visibilità nello store e gli aggiornamenti automatici da Play  |
| Login sul server pubblico                          | Uso anonimo dell'infrastruttura condivisa per truffe e botnet                         | Gli utenti legittimi devono accedere e alcuni flussi di lavoro esistenti vengono interrotti             |
| Controlli di sicurezza del dispositivo controllato | Furto di password, ampia esposizione di rete e rischi dell'accesso non presidiato     | Devono essere configurati correttamente e non possono contrastare una divulgazione volontaria           |

Si tratta di misure di riduzione del rischio, non di un'affermazione secondo cui RustDesk sia a prova di truffa.

## Avvisi nei punti in cui una potenziale vittima potrebbe vederli

La [pagina di supporto di RustDesk](https://rustdesk.com/support) si apre con un avviso diretto sulle truffe. Dice alle persone che sono al telefono con qualcuno che non conoscono e di cui non si fidano, e a cui è stato chiesto di installare RustDesk, di fermarsi. Anche il [repository GitHub di RustDesk](https://github.com/rustdesk/rustdesk) riporta una clausola di esclusione di responsabilità contro l'accesso non autorizzato, il controllo e la violazione della privacy.

L'avviso si trova anche all'interno del client Android ufficiale distribuito tramite [GitHub Releases](https://github.com/rustdesk/rustdesk/releases). Su un dispositivo Android senza login che sta per essere controllato, toccando **Avvia servizio** si apre un avviso prima che il servizio di cattura schermo abbia inizio. L'avviso invita chi è stato guidato da un interlocutore sconosciuto e non affidabile a fermarsi e riagganciare. Le build ufficiali impongono un conto alla rovescia prima che l'utente possa continuare. Sia il [flusso attuale lato dispositivo controllato](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421) sia il [testo dell'avviso in inglese](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194) sono visibili nel repository open source.

Questa collocazione è importante. Una pagina generica sulla sicurezza può raggiungere chi sta facendo ricerche su un prodotto; un avviso su **Avvia servizio** raggiunge la persona proprio nel momento in cui una sessione Android in ingresso sta per diventare possibile. Ciò non può comunque costringere quella persona a diffidare di un chiamante convincente.

## Perché RustDesk non è su Google Play

Il 3 settembre 2023, l'account X ufficiale di RustDesk ha dichiarato: [“Abbiamo temporaneamente rimosso la pubblicazione di RustDesk da Google Play per prevenire ulteriori truffe ai danni degli utenti.”](https://x.com/rustdesk/status/1698372220379349421) Il link e il testo sono conservati anche nella [discussione GitHub #5660](https://github.com/rustdesk/rustdesk/discussions/5660) a cui è stata data risposta, e le attuali [FAQ di RustDesk affermano che il progetto si è ritirato da Google Play a causa delle truffe](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store).

RustDesk **non è quindi attualmente distribuito tramite Google Play**. Non significava che il client Android fosse malware, né che chiunque lo installasse fosse a rischio. Si è trattato di una decisione di distribuzione volta a ridurre un percorso comune utilizzato nelle istruzioni delle truffe.

Il compromesso è reale: per gli utenti legittimi, lasciare Google Play significa meno visibilità, un'installazione meno familiare e niente aggiornamenti automatici dallo store. Le build Android attuali sono disponibili tramite le [release ufficiali su GitHub di RustDesk](https://github.com/rustdesk/rustdesk/releases) e su [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). Verifica tu stesso la destinazione. Non installare un APK da un link di download inviato da un sedicente operatore di assistenza che ti ha chiamato di sua iniziativa. La nostra [guida per Android e iOS](/it/blog/controllo-remoto-rustdesk-su-android-e-ios-cosa-funziona) elenca le funzionalità mobili attuali e le fonti di installazione.

## Perché il server pubblico richiede il login

L'attuale [guida al login sul server pubblico](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server) di RustDesk afferma che il login del controller è richiesto a causa di truffe e abusi da botnet in corso. Il login è gratuito e utilizza un provider di identità di terze parti supportato, come Google o GitHub; sul server pubblico non vengono offerti un nome utente e una password separati. La guida afferma attualmente che solo i controller sono tenuti ad accedere.

Questo aggiunge un passaggio di identità e rimuove parte dell'accesso anonimo all'infrastruttura che RustDesk gestisce per dimostrazione e test. Non regola un server RustDesk privato e non può fermare un truffatore che utilizza un'altra infrastruttura o crea una nuova identità.

Ha anche causato disagi. In una [discussione su Reddit riguardante il nuovo errore di login](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/), alcuni utenti legittimi hanno segnalato di non riuscire a raggiungere i dispositivi di casa o della famiglia finché non hanno compreso e completato il passaggio di login. Altri si sono opposti al collegamento di un'identità di terze parti. Questi commenti non sono una prova che la restrizione funzioni o fallisca contro i truffatori, ma documentano il suo costo operativo. Una prevenzione degli abusi che introduce attrito dovrebbe riconoscere apertamente questo costo.

## Come proteggere un dispositivo RustDesk controllato?

Le restrizioni a livello di piattaforma rappresentano solo un livello. Il proprietario o l'amministratore di un dispositivo controllato dovrebbe inoltre ridurre chi può connettersi e cosa può fare una credenziale rubata.

### 1. Imposta una password permanente forte e univoca

Per l'[accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione), imposta una **password permanente forte e univoca** nelle impostazioni di sicurezza di RustDesk del dispositivo controllato. Non riutilizzare il login del sistema operativo, la password dell'email o una password usata su un altro servizio. Cambiala immediatamente se potrebbe essere stata divulgata.

Per il supporto assistito, preferisci una password temporanea monouso o l'approvazione esplicita con un clic quando è praticabile. Una password permanente forte riduce i rischi legati ai tentativi di indovinarla, al credential stuffing e al riutilizzo della password. Non è di alcun aiuto se una vittima legge quella password a un chiamante.

### 2. Abilita la 2FA sul dispositivo controllato

RustDesk include la 2FA TOTP per le connessioni in ingresso verso un dispositivo controllato. Sul dispositivo che accetterà le connessioni, apri le sue impostazioni di sicurezza, abilita la **2FA**, scansiona il codice QR con un'app di autenticazione e conferma la configurazione con il codice a sei cifre.

Una volta abilitata, accettare la normale password di connessione non è sufficiente: il controller deve anche fornire il codice TOTP a sei cifre corrente prima che il dispositivo controllato autorizzi la sessione. La funzionalità è stata introdotta specificamente come [2FA per l'accesso non presidiato](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b), e la sua [implementazione TOTP è pubblica](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs).

RustDesk può facoltativamente considerare attendibile un dispositivo controller e saltare le successive richieste di 2FA. Lascia questa opzione di bypass disabilitata per il comportamento più rigoroso. Se la utilizzi, controlla l'elenco dei dispositivi attendibili e rimuovi quelli persi, sostituiti, condivisi o non più autorizzati.

La 2FA protegge da una password che è stata indovinata, riutilizzata o esposta. Non può proteggere chi fornisce a un truffatore sia la password sia il codice dell'autenticatore corrente.

### 3. Limita le connessioni in ingresso con una lista di indirizzi IP consentiti

Nell'interfaccia italiana di RustDesk questa funzionalità si chiama **IP autorizzati** (in inglese *IP Whitelisting*). In pratica è una lista di indirizzi IP consentiti: il dispositivo controllato rifiuta una connessione il cui indirizzo di origine è al di fuori dell'elenco configurato, prima dell'autorizzazione tramite password e 2FA.

Configurala qui:

- **Dispositivo controllato desktop:** **Impostazioni → Sicurezza → Sicurezza → Usa elenco IP autorizzati**
- **Dispositivo controllato mobile:** **Impostazioni → Condividi schermo → Usa elenco IP autorizzati**

L'impostazione accetta singoli indirizzi IPv4 o IPv6 e intervalli CIDR. Il CIDR combina un indirizzo di rete con una lunghezza di prefisso. Il prefisso indica quanti bit iniziali sono fissi: un prefisso più grande significa un intervallo consentito più piccolo.

- `203.0.113.10` oppure `203.0.113.10/32`: un indirizzo IPv4.
- `203.0.113.0/24`: 256 indirizzi IPv4, da `203.0.113.0` a `203.0.113.255`.
- `2001:db8::10/128`: un indirizzo IPv6.
- `2001:db8:1234::/64`: una sottorete IPv6.

Questi sono intervalli di esempio a solo scopo documentativo; non copiarli così come sono. Inserisci gli indirizzi o le reti reali dei tuoi controller. Più voci possono essere separate da virgole, punti e virgola, spazi o nuove righe. RustDesk documenta questa impostazione nel suo [riferimento per la configurazione avanzata del client](https://rustdesk.com/docs/it/self-host/client-configuration/advanced-settings/#whitelist), e l'[applicazione lato dispositivo controllato è visibile nel codice sorgente](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1410-L1437).

Usa gli intervalli più ristretti che la pratica consente. Gli indirizzi fissi di uscita dell'ufficio e gli intervalli VPN noti sono buoni candidati. Gli indirizzi residenziali dinamici e i controller in roaming non lo sono. Verifica quale indirizzo di origine vede RustDesk nella tua topologia NAT, VPN, diretta o relay, e testa la nuova regola da un'altra sessione prima di chiudere quella di lavoro. Un indirizzo o un CIDR errato può escludere il personale di supporto legittimo.

Una lista di indirizzi IP consentiti restringe da dove può avere origine una connessione. Non sostituisce una password o la 2FA, e non può fermare un controller malintenzionato che sta già operando da una rete consentita.

### 4. Limita quali ID RustDesk possono connettersi

A partire da RustDesk 1.5.0, un dispositivo controllato può anche accettare connessioni solo dagli ID RustDesk presenti in un elenco. Nell'interfaccia italiana si chiama **ID autorizzati** (in inglese *ID whitelisting*). È adatta ai team di supporto i cui indirizzi di rete cambiano ma i cui dispositivi di controllo sono noti, cioè nei casi in cui una lista di indirizzi IP consentiti non è praticabile.

Configurala qui:

- **Dispositivo controllato desktop:** **Impostazioni → Sicurezza → Sicurezza → Usa elenco ID autorizzati**
- **Dispositivo controllato mobile:** **Impostazioni → Condividi schermo → Usa elenco ID autorizzati**

Inserisci gli ID RustDesk dei dispositivi autorizzati a controllare questo. Come per l'elenco degli IP, le voci possono essere separate da virgole, punti e virgola, spazi o nuove righe. Il confronto non distingue tra maiuscole e minuscole e sono supportati due caratteri jolly:

- `123456789`: un ID.
- `12345678?`: `?` corrisponde esattamente a un carattere, quindi questa voce consente qualsiasi ID di nove caratteri che inizi con `12345678`.
- `support-*`: `*` corrisponde a un numero qualsiasi di caratteri, il che è utile quando i tuoi controller usano ID personalizzati con un prefisso comune.

Anche questi sono valori di esempio. L'impostazione compare come `id-whitelist` nel [riferimento per la configurazione avanzata del client](https://rustdesk.com/docs/it/self-host/client-configuration/advanced-settings/#id-whitelist), quindi gli amministratori possono preimpostarla in un client personalizzato, e la [sua applicazione è visibile nel codice sorgente](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1439-L1467).

Il controllo avviene quando il controller invia la sua richiesta di login, prima della verifica della password o del codice 2FA. Si applica anche quando le due parti di una sessione si scambiano i ruoli, operazione che altrimenti non richiede alcuna password. Se è impostata anche una lista di indirizzi IP consentiti, una connessione deve superare entrambi i controlli. Un controller rifiutato vede il messaggio «Il tuo ID è bloccato dal dispositivo remoto» (Your ID is blocked by the peer), e i tentativi sono soggetti a un limite di frequenza, quindi non è possibile sondare rapidamente l'elenco alla ricerca di ID consentiti.

Tieni presente il suo limite. L'ID è dichiarato dal client che si connette. Non è una prova d'identità, e un client modificato può dichiarare un ID consentito; RustDesk mostra questa avvertenza accanto all'impostazione. Ciò che l'elenco fa è respingere i client ordinari con ID non presenti nell'elenco prima che arrivino alla richiesta della password. Su un dispositivo in cui un amministratore ha preimpostato l'elenco, un chiamante che convince l'utente a leggergli ID e password non può comunque connettersi con il client standard da un ID non presente nell'elenco. Mantieni una password forte e la 2FA, e testa l'elenco da un'altra sessione prima di chiuderne una funzionante: un errore di battitura può escludere il personale di supporto legittimo.

## Cosa non possono fare queste misure

Avvisi, rimozione dallo store, requisiti di login, password forti, 2FA e liste di indirizzi IP e di ID consentiti eliminano ciascuno una parte dell'opportunità di un attaccante. Nessuno di essi elimina il rischio centrale legato all'ingegneria sociale: una persona può comunque essere convinta ad approvare l'accesso o a rivelare ogni fattore.

Anche il self-hosting non rende impossibile l'abuso. Offre a un'organizzazione il controllo del proprio server RustDesk e delle proprie policy, ma un truffatore può anche gestire un'infrastruttura privata o distribuire un client modificato. Le restrizioni del server pubblico di RustDesk valgono solo per il server pubblico; un deployment self-hosted funziona secondo le policy stabilite da chi lo gestisce.

Se un chiamante sconosciuto ti dice di installare RustDesk, avviare il suo servizio, condividere una password, rivelare un codice 2FA o aprire un sito bancario, fermati. La nostra guida, valida per qualsiasi fornitore, su come [riconoscere, prevenire e gestire le truffe del desktop remoto](/it/blog/truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle) spiega i segnali di allarme e cosa fare se l'accesso è già stato concesso.

La responsabilità, in questo caso, non è un'unica impostazione o una dichiarazione di buone intenzioni. È il lavoro continuo di avvisare gli utenti, accettare attrito dove l'abuso lo richiede, fornire controlli tecnici, documentarne i limiti e adattare la risposta man mano che gli attaccanti cambiano i loro metodi.
