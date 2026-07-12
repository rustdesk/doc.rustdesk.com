---
publishDate: 2026-07-05T18:49:00Z
lang: 'it'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktop è sicuro? Una recensione onesta'
excerpt: "Chrome Remote Desktop è sicuro? Uno sguardo equilibrato su crittografia, PIN, modello basato sull'account Google, rischi reali e le differenze con l'auto-hosting."
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.png'
category: 'Sicurezza'
tags: ['Chrome Remote Desktop', 'Sicurezza']
author: 'RustDesk Team'
slug: 'chrome-remote-desktop-e-sicuro-una-recensione-onesta'
faq:
  - question: 'Chrome Remote Desktop è sicuro da usare?'
    answer: "Per un uso personale occasionale, Chrome Remote Desktop è ragionevolmente sicuro. Google afferma che tutte le sessioni di desktop remoto sono completamente crittografate, l'accesso richiede un PIN e le sessioni di assistenza remota usano codici di accesso monouso. I rischi principali sono PIN deboli, la compromissione dell'account Google a cui è legato e — come per ogni strumento di accesso remoto — truffatori che convincono l'utente a concedere l'accesso. Offre un controllo amministrativo limitato e funziona interamente sul cloud di Google."
  - question: 'Chrome Remote Desktop è crittografato?'
    answer: "Sì. La documentazione di supporto di Google afferma che tutte le sessioni di Chrome Remote Desktop sono completamente crittografate, e le recensioni di terze parti la descrivono come basata sulla sicurezza standard del trasporto web. Google non pubblica un'analisi dettagliata del protocollo sulle proprie pagine di assistenza per i consumatori, quindi per qualsiasi uso che vada oltre quello occasionale, è opportuno considerare la crittografia adeguata ma non verificabile in modo indipendente."
  - question: 'Quali sono i rischi di sicurezza di Chrome Remote Desktop?'
    answer: "I tre rischi pratici sono un PIN debole o facile da indovinare (il minimo è di sei cifre), la compromissione dell'account Google a cui l'host è legato, e le truffe di ingegneria sociale in cui qualcuno convince la vittima a installarlo e a condividere un codice di accesso. Attivare l'autenticazione a due fattori sul proprio account Google e non condividere mai un codice con qualcuno che ti ha contattato elimina gran parte del pericolo reale."
  - question: 'Posso auto-ospitare Chrome Remote Desktop?'
    answer: "No. Chrome Remote Desktop è interamente intermediato dall'infrastruttura di Google ed è legato al tuo account Google; non esiste la possibilità di eseguire il servizio di connessione sul proprio server né di verificare il codice del client. Se l'auto-hosting e la possibilità di ispezionare il codice sono importanti per te, un'alternativa open source rappresenta un modello di garanzia diverso."
metadata:
  description: "Chrome Remote Desktop è sicuro? Cosa documenta Google riguardo alla crittografia di CRD, alla protezione tramite PIN, ai rischi pratici e al modello di fiducia basato sull'account Google."
  keywords: 'Chrome Remote Desktop è sicuro, sicurezza Chrome Remote Desktop, crittografia Chrome Remote Desktop, PIN Chrome Remote Desktop, rischi Chrome Remote Desktop, CRD sicuro'
---

Versione breve: per un uso personale occasionale, Chrome Remote Desktop (CRD) è ragionevolmente sicuro. È uno strumento gratuito ed essenziale di Google che cripta la sessione e consente l'accesso solo tramite un PIN e il tuo account Google. Le avvertenze oneste sono che è closed-source, interamente intermediato dal cloud di Google, offre un controllo amministrativo limitato e — come ogni strumento di accesso remoto — può essere usato contro di te da un truffatore. Ecco l'analisi equilibrata e documentata.

## La risposta breve

CRD è sufficientemente sicuro per il compito per cui è stato creato: raggiungere il proprio computer o aiutare un familiare, tramite una connessione che Google protegge per te. Secondo la [documentazione di supporto ufficiale di Google](https://support.google.com/chrome/answer/1649523), tutte le sessioni di desktop remoto sono completamente crittografate, l'accesso non presidiato richiede un PIN e le sessioni di assistenza occasionali usano un codice di accesso monouso che funziona una sola volta. Si tratta di una base ragionevole per l'uso personale.

Il punto in cui fermarsi a riflettere è qualsiasi utilizzo che vada oltre l'uso occasionale. CRD è legato al tuo account Google e funziona sull'infrastruttura di Google con controlli amministrativi limitati, e i suoi punti deboli pratici sono un PIN facile da indovinare, un account Google compromesso e l'ingegneria sociale. Nulla di tutto ciò lo rende pericoloso da installare: definisce piuttosto quanto dovresti farci affidamento.

## Come Chrome Remote Desktop protegge una sessione

Tre meccanismi svolgono il lavoro vero e proprio, tutti documentati nelle [pagine di assistenza di Google](https://support.google.com/chrome/answer/1649523):

- **Crittografia.** Google afferma che «tutte le sessioni di desktop remoto sono completamente crittografate». Le analisi di terze parti descrivono generalmente la connessione come basata sulla sicurezza standard del trasporto web (TLS con AES). Google non pubblica un'analisi dettagliata del protocollo sulle proprie pagine per i consumatori, quindi è opportuno considerare la crittografia adeguata ma non verificabile in modo indipendente.
- **PIN per l'accesso non presidiato.** Per raggiungere un computer che hai configurato per l'accesso remoto continuativo, inserisci un PIN. Questo è ciò che impedisce a una persona qualsiasi in possesso della tua sessione Google di connettersi silenziosamente.
- **Codici di accesso monouso per l'assistenza.** Quando stai aiutando qualcuno in tempo reale, l'host genera un codice che, secondo Google, funziona una sola volta, e la condivisione continuativa richiede una riconferma periodica.

A questo si aggiunge l'account Google stesso, che può — e per l'accesso remoto assolutamente dovrebbe — essere protetto con l'autenticazione a due fattori. Per l'uso personale su una rete affidabile, questo insieme di protezioni è davvero adeguato.

## Dove si trovano davvero i rischi reali

I punti deboli di CRD non sono esotici. Sono i tre che derivano direttamente dalla sua progettazione.

**PIN deboli.** Il PIN è la serratura dell'accesso non presidiato, e il minimo richiesto da Google è di sole sei cifre. Sei cifre vanno bene contro un estraneo che tenta un singolo tentativo casuale, ma le persone scelgono numeri prevedibili — compleanni, cifre ripetute, sequenze — il che riduce lo spazio di ricerca reale ben al di sotto di quanto il numero di cifre lascerebbe intendere. Per una macchina che lasci raggiungibile 24 ore su 24, 7 giorni su 7, un PIN scelto con leggerezza è la via d'accesso più probabile. Scegli qualcosa di non ovvio.

**Compromissione dell'account Google.** Poiché l'accesso non presidiato di CRD è legato al tuo account Google, quell'account _è_ il perimetro di sicurezza. Se qualcuno ottiene la tua password Google tramite phishing e non hai attivato l'autenticazione a due fattori, il tuo desktop remoto fa parte di ciò che quella persona eredita. Non si tratta tanto di un difetto di CRD quanto della conseguenza di aver messo tutte le uova nello stesso paniere dell'account Google — motivo per cui attivare l'autenticazione a due fattori su quell'account non è negoziabile se usi CRD.

**Truffe.** Come per ogni strumento di accesso remoto, il danno reale più grande non è una violazione crittografica: è l'ingegneria sociale. [L'FBI ha avvertito](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) che i truffatori del finto supporto tecnico convincono regolarmente le vittime a installare software di desktop remoto e a condividere l'accesso, per poi svuotare i loro conti. I codici monouso di CRD sono facili da leggere ad alta voce a un «tecnico disponibile» al telefono, ed è esattamente questo il problema. Ad onor del vero, si tratta di un rischio legato all'uso, non di una vulnerabilità di CRD: lo stesso identico trucco funziona con [AnyDesk](/it/blog/anydesk-e-sicuro-crittografia-lincidente-di-sicurezza-del-2024-e-le), TeamViewer o RustDesk. Trattiamo le abitudini difensive in [come evitare le truffe del desktop remoto](/it/blog/truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle).

## Cosa non ti offre CRD

CRD è deliberatamente minimale, e per molte persone è proprio questo il suo fascino. Ma vale la pena essere chiari sui compromessi, specialmente se lo stai valutando per un uso che va oltre quello personale.

Non puoi auto-ospitarlo. Ogni connessione CRD è intermediata tramite il cloud di Google ed è legata a un account Google; non esiste la possibilità di eseguire il servizio di rendezvous sul proprio server, né codice sorgente da verificare — ti fidi di Google sul fatto che l'host si comporti come descritto. C'è anche ben poco in termini di amministrazione di team, policy centralizzate, liste di controllo degli accessi, registrazione delle sessioni o raggruppamento dei dispositivi. Questo non è un difetto di Google; semplicemente non è a questo che serve CRD. Se ti servono queste funzionalità, lo hai ormai superato, e un [tool gratuito per desktop remoto più capace](/it/blog/il-miglior-software-gratuito-per-il-desktop-remoto-aziendale-2026) o un'[alternativa dedicata a Chrome Remote Desktop](/it/blog/alternativa-a-chrome-remote-desktop-rustdesk-self-hosted) è il passo successivo onesto da compiere.

È qui che un modello open source e autogestito offre un _tipo_ di garanzia diverso, non semplicemente più funzionalità. CRD ti chiede di considerare la sua crittografia adeguata senza un protocollo pubblicato da ispezionare; RustDesk è invece [open source sotto licenza AGPL](https://github.com/rustdesk/rustdesk), quindi il client e la sua crittografia sono lì per essere verificati anziché accettati sulla fiducia. E laddove CRD fa del tuo account Google il perimetro di sicurezza, [l'auto-hosting](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto) colloca i server ID/rendezvous e relay sulla tua stessa macchina o su un VPS — quindi l'intermediazione e la policy di accesso restano su un'infrastruttura che controlli tu, e non dietro un unico login cloud — il che si collega direttamente alle preoccupazioni relative a [sovranità dei dati e GDPR](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting).

Va detto chiaramente che questa apertura ha un duplice risvolto: poiché il codice è pubblico, lo sono anche le vulnerabilità di RustDesk stesso, quindi conviene tenere d'occhio le [ultime release](https://github.com/rustdesk/rustdesk/releases) e i relativi registri di divulgazione. E l'auto-hosting si limita a sostituire un tipo di manutenzione con un altro — l'igiene di account e PIN di cui CRD ha bisogno diventa un server a cui applicare le patch e un traffico che continua a viaggiare direttamente tra gli endpoint. Un modello di garanzia diverso, non uno più leggero.

## Il verdetto

Chrome Remote Desktop è sicuro? Per un uso personale occasionale — raggiungere il proprio PC, aiutare un familiare — sì, è ragionevolmente sicuro, oltre che semplice ed economico. Valutalo di conseguenza. Attiva l'autenticazione a due fattori sul tuo account Google, scegli un PIN che non sia la tua data di nascita e non leggere mai un codice di accesso a qualcuno che ti ha contattato per primo: così avrai gestito i rischi che contano davvero.

Il punto in cui CRD raggiunge i propri limiti è il controllo e la scalabilità: è closed-source, intermediato dal cloud di Google e carente sul fronte amministrativo. Se hai bisogno di verificare il codice, di mantenere l'intermediazione sulla tua infrastruttura o di gestire più di un paio di macchine, è a quel punto che vale la pena considerare un'opzione open source e autogestita — non perché CRD sia insicuro, ma perché non ha mai avuto la pretesa di essere quello strumento.
