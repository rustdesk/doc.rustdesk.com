---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-05T18:49:00Z
lang: 'it'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktop è sicuro? Sicurezza e limiti di implementazione'
excerpt: 'Chrome Remote Desktop è sicuro? Uno sguardo equilibrato su crittografia, PIN e modello basato sull''account Google, sui rischi reali e su ciò che cambia con il self-hosting.'
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: 'Sicurezza'
tags: ['Chrome Remote Desktop', 'Sicurezza']
author: 'RustDesk Team'
slug: 'chrome-remote-desktop-e-sicuro-una-recensione-onesta'
faq:
  - question: 'Chrome Remote Desktop è sicuro da usare?'
    answer: 'Sì, per uso personale. Google documenta sessioni di Chrome Remote Desktop completamente crittografate, un PIN per l''accesso non presidiato e codici di accesso monouso per le sessioni di assistenza. I rischi principali sono un PIN debole, un account Google compromesso e i truffatori che convincono le vittime a condividere un codice. Attiva l''autenticazione a due fattori sull''account Google e scegli un PIN non ovvio.'
  - question: 'Chrome Remote Desktop è crittografato?'
    answer: 'Sì. Google afferma che tutte le sessioni di Chrome Remote Desktop sono completamente crittografate. La sua guida di rete per le aziende descrive connessioni WebRTC/ICE che passano direttamente tra i computer quando possibile e tramite un relay TURN negli altri casi, e Chromium pubblica il codice sorgente remoting, quindi i componenti host, client e protocollo possono essere esaminati.'
  - question: 'Quali sono i rischi di sicurezza di Chrome Remote Desktop?'
    answer: 'I tre rischi pratici sono un PIN debole o facile da indovinare (il minimo è di sei cifre), la compromissione dell''account Google a cui è legato l''host e le truffe di ingegneria sociale in cui qualcuno convince la vittima a condividere un codice di accesso. L''autenticazione a due fattori sull''account Google, un PIN non ovvio e il rifiuto di condividere un codice con chi ti ha contattato eliminano gran parte del pericolo reale.'
  - question: 'Posso fare il self-hosting di Chrome Remote Desktop?'
    answer: 'No. Chromium pubblica il codice sorgente remoting di Chrome Remote Desktop, ma il servizio di coordinamento di Google non può essere ospitato in proprio, quindi ogni connessione viene stabilita tramite Google. RustDesk è un''alternativa che puoi ospitare tu: RustDesk Server OSS, il server community gratuito, esegue i tuoi servizi ID/rendezvous e relay, e RustDesk Server Pro aggiunge console web, Controllo di accesso e client con il tuo marchio.'
metadata:
  description: 'Chrome Remote Desktop è sicuro? Cosa documenta Google su crittografia e PIN di CRD, i rischi pratici e il modello di fiducia basato sull''account Google.'
  keywords: 'Chrome Remote Desktop è sicuro, sicurezza Chrome Remote Desktop, crittografia Chrome Remote Desktop, PIN Chrome Remote Desktop, rischi Chrome Remote Desktop, CRD sicuro'
---

In breve: per uso personale, Chrome Remote Desktop (CRD) è ragionevolmente sicuro. È uno strumento gratuito ed essenziale di Google che crittografa le sessioni e protegge l'accesso con un PIN e con il tuo account Google. I limiti sono che il servizio di coordinamento lo gestisce Google, che l'amministrazione passa dalle policy aziendali di Google anziché da una console di assistenza e che, come ogni strumento remoto, un truffatore può usarlo contro di te. Ecco l'analisi, con le fonti.

## La risposta breve

Sì, per uso personale. CRD è abbastanza sicuro per il compito per cui è nato: raggiungere il tuo computer o aiutare un familiare, tramite una connessione che Google protegge per te. Secondo la [documentazione di supporto di Google](https://support.google.com/chrome/answer/1649523), tutte le sessioni di desktop remoto sono completamente crittografate, l'accesso non presidiato richiede un PIN e le sessioni di assistenza occasionali usano un codice di accesso monouso, valido una sola volta. È una base ragionevole per l'uso personale.

Per l'uso in un'organizzazione, le [policy di amministrazione aziendale](https://support.google.com/chrome/a/answer/2799701) e la [guida di rete](https://support.google.com/chrome/a/answer/16364503) di Google permettono agli amministratori di limitare chi può usare CRD e come si connette; il servizio di coordinamento resta comunque gestito da Google.

## Come Chrome Remote Desktop protegge una sessione

Tre meccanismi fanno il lavoro vero e proprio, tutti documentati nelle [pagine di assistenza di Google](https://support.google.com/chrome/answer/1649523):

- **Crittografia e instradamento.** Google afferma che le sessioni sono completamente crittografate. La sua [guida di rete](https://support.google.com/chrome/a/answer/16364503) descrive connessioni ICE/WebRTC che possono essere dirette, assistite da STUN o inoltrate tramite TURN. Il coordinamento usa i servizi Google; i flussi della sessione non passano sempre da un relay di Google.
- **PIN per l'accesso non presidiato.** Per raggiungere un computer configurato per l'accesso remoto continuativo, inserisci un PIN. È ciò che impedisce a una persona qualsiasi in possesso della tua sessione Google di connettersi senza che tu lo sappia.
- **Codici di accesso monouso per l'assistenza.** Quando aiuti qualcuno in tempo reale, l'host genera un codice che, secondo Google, funziona una sola volta, e per proseguire la condivisione è richiesta periodicamente una nuova conferma.

A tutto questo si aggiunge l'account Google stesso, che può (e, per l'accesso remoto, deve assolutamente) essere protetto con l'autenticazione a due fattori. Per l'uso personale su una rete affidabile, questo insieme di protezioni è davvero adeguato.

## Dove sono davvero i rischi

I punti deboli di CRD non sono esotici. Sono i tre che derivano dalla sua progettazione.

**PIN deboli.** Il PIN è la serratura dell'accesso non presidiato, e il minimo richiesto da Google è di sole sei cifre. Sei cifre bastano contro un estraneo che tenta una volta a caso, ma le persone scelgono numeri prevedibili (compleanni, cifre ripetute, sequenze), il che riduce lo spazio di ricerca reale ben al di sotto di quanto il numero di cifre lascerebbe pensare. Per una macchina raggiungibile 24 ore su 24, un PIN scelto con leggerezza è la via d'ingresso più probabile. Scegline uno non ovvio.

**Compromissione dell'account Google.** L'account Google fa parte del perimetro di accesso di CRD: se qualcuno ti sottrae la password con il phishing e non hai l'autenticazione a due fattori, il tuo elenco di desktop remoti è tra le cose che eredita. Proteggi l'account con la 2FA, controlla i dispositivi connessi e revoca gli accessi che non ti servono più. L'accesso non presidiato richiede anche il PIN dell'host, quindi la sola password dell'account non apre tutti gli host.

**Truffe.** Chi telefona può convincere una vittima a condividere un codice di accesso e ad approvare una sessione. L'[FBI mette in guardia dall'abuso dei software di accesso remoto](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software). Verifica in modo indipendente ogni richiesta di assistenza: la crittografia non può proteggere una sessione autorizzata deliberatamente a favore di un truffatore. Vedi [come riconoscere ed evitare le truffe del desktop remoto](/it/blog/truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle).

## Cosa non ti offre CRD

CRD è volutamente essenziale, e per molte persone è proprio questo il suo pregio. Ma conviene essere chiari sui compromessi, soprattutto se lo stai valutando per qualcosa che va oltre l'uso personale.

[Chromium pubblica il codice sorgente remoting di CRD](https://chromium.googlesource.com/chromium/src/+/main/remoting/), compresi i componenti host, client e protocollo, ma il servizio di coordinamento di Google non può essere ospitato in proprio. Le [policy aziendali](https://support.google.com/chrome/a/answer/2799701) di Google controllano chi può usare CRD; non lo trasformano in una console di assistenza gestita dal cliente, con gruppi di dispositivi, regole di accesso per utente e client con il tuo marchio. Non è una critica a Google: semplicemente CRD non nasce per questo. Se ti servono queste funzionalità, il passo successivo è un'[alternativa a Chrome Remote Desktop](/it/blog/alternativa-a-chrome-remote-desktop-rustdesk-self-hosted).

Il **client RustDesk e RustDesk Server OSS (il server community gratuito) hanno [licenza AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro è un software server self-hosted commerciale e proprietario**. Server OSS esegue i tuoi servizi ID/rendezvous e relay, e Server Pro aggiunge una console web, il Controllo di accesso per utente e per gruppo di dispositivi e client con il tuo marchio, così coordinamento e criteri di accesso risiedono su un'infrastruttura che controlli tu invece che dietro un unico login cloud. Questo risponde ai requisiti di [sovranità dei dati e GDPR](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting).

Va detto chiaramente che questa apertura ha due facce. Codice pubblico significa che anche le vulnerabilità di RustDesk sono pubbliche, quindi tieni d'occhio le [ultime release](https://github.com/rustdesk/rustdesk/releases) e le relative segnalazioni. E il self-hosting si limita a sostituire un tipo di manutenzione con un altro: l'igiene di account e PIN richiesta da CRD diventa un server da aggiornare, con un traffico che continua a passare direttamente tra gli endpoint. Un modello di garanzia diverso, non più leggero.

## Il verdetto

Chrome Remote Desktop è sicuro? Sì, per uso personale: raggiungere il tuo PC o aiutare un parente. CRD crittografa le sessioni, protegge l'accesso non presidiato con un PIN e usa codici monouso per l'assistenza. Attiva l'autenticazione a due fattori sull'account Google, scegli un PIN che non sia la tua data di nascita e non dettare mai un codice di accesso a qualcuno che ti ha contattato per primo: così gestisci i rischi che contano davvero.

CRD mostra i suoi limiti sul fronte del controllo e della scala: il servizio di coordinamento lo gestisce Google, e l'amministrazione passa dalle policy aziendali di Google invece che da una console di assistenza. Se devi mantenere il coordinamento sulla tua infrastruttura, limitare i tecnici a specifici gruppi di dispositivi o gestire una flotta da un'unica console, è il momento di guardare a RustDesk self-hosted: non perché CRD sia insicuro, ma perché non ha mai voluto essere quel tipo di strumento.
