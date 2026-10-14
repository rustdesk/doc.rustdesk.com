---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-03T08:18:00Z
lang: 'it'
translationKey: avoid-remote-desktop-scams
draft: false
title: 'Truffe del desktop remoto: come riconoscerle ed evitarle'
excerpt: "Come funzionano le truffe dell'accesso remoto, i segnali d'allarme che le tradiscono ed esattamente cosa fare se un truffatore ha già preso il controllo del tuo computer."
image: ~/assets/images/blog/avoid-remote-desktop-scams-og.webp
category: 'Sicurezza'
tags: ['Sicurezza', 'Risoluzione dei problemi']
author: RustDesk Team
slug: 'truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle'
faq:
  - question: "Che cos'è una truffa del desktop remoto?"
    answer: "È una forma di frode in cui un criminale ti convince a installare un software di accesso remoto legittimo e poi lo usa per controllare il tuo computer, di solito per spostare denaro, rubare dati o installare malware. Gli strumenti sono gli stessi che i team IT usano ogni giorno. Ciò che la trasforma in una truffa è che la persona dall'altra parte ti ha contattato con un pretesto falso e ti ha convinto a concedere l'accesso."
  - question: 'Un truffatore può entrare nel mio computer se non gli ho mai fornito un codice o installato nulla?'
    answer: 'Di solito no. In una tipica truffa del finto supporto tecnico, rifiutarsi di installare lo strumento di chi chiama o di condividere un codice di connessione blocca il tentativo. Esistono però altre strade: un accesso non presidiato configurato in precedenza, credenziali rubate, malware o servizi esposti come RDP. Se noti sessioni o attività sull''account che non sai spiegare, disconnetti il dispositivo e indaga, anche se non hai mai condiviso un codice.'
  - question: 'Cosa devo fare subito dopo aver capito di essere stato truffato?'
    answer: 'Disconnetti il dispositivo, conserva le prove, rimuovi il software di accesso remoto non autorizzato e cambia le password da un altro dispositivo affidabile, partendo da email e home banking. Contatta subito la banca o l''emittente della carta. Negli Stati Uniti, segnala il caso a FTC ReportFraud e all''IC3 dell''FBI e valuta un avviso antifrode o un blocco del credito presso le agenzie di credito statunitensi. Altrove, contatta la polizia locale, l''autorità antifrode competente e il servizio locale di tutela dell''identità.'
  - question: 'Usare RustDesk mi protegge dalle truffe?'
    answer: 'No. Nessuno strumento di desktop remoto, RustDesk compreso, può renderti immune dalle truffe: chi ti convince a installare un client e a dettargli un codice di connessione può prendere il controllo su qualsiasi piattaforma. RustDesk aggiunge struttura dalla tua parte: con il self-hosting server ID e relay sono sotto il tuo controllo, il Controllo di accesso di Server Pro e un elenco di ID/IP autorizzati limitano chi può connettersi, e il client open source è verificabile.'
metadata:
  description: 'Come funzionano le truffe di accesso remoto, i segnali d''allarme da riconoscere e cosa fare se un truffatore ha già preso il controllo del tuo computer.'
  keywords: "truffe del desktop remoto, truffa dell'accesso remoto, truffa del supporto tecnico, come evitare una truffa di accesso remoto, truffatore accesso remoto computer, segnalare una truffa del supporto tecnico"
---

Una truffa del desktop remoto è un tipo di frode in cui un criminale ti convince a installare un software di accesso remoto legittimo, per poi usarlo per prendere il controllo del tuo computer — per svuotare un conto bancario, rubare dati o installare malware. Gli strumenti in sé sono gli stessi che i reparti IT usano ogni giorno. Ciò che la trasforma in una truffa è chi si trova dall'altra parte e come si è fatto strada fino a te.

Questa guida è deliberatamente neutrale rispetto ai fornitori. Qualsiasi prodotto di desktop remoto può essere usato in modo improprio in questo modo, RustDesk incluso. L'obiettivo qui è aiutarti a riconoscere lo schema, a rifiutarlo e a recuperare la situazione se sei già caduto in trappola.

## Come funziona una truffa dell'accesso remoto

La [Federal Trade Commission statunitense](https://consumer.ftc.gov/articles/how-spot-avoid-and-report-tech-support-scams) e l'[FBI](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/tech-support-scams) descrivono entrambe uno schema sorprendentemente coerente:

1. **L'esca.** Un pop-up avvisa che "il tuo computer è infetto", oppure ricevi una chiamata, un'email o un messaggio inaspettato. Il mittente si finge un nome di cui ti fidi — Microsoft, Apple, Amazon, la tua banca, una società di servizi o persino il tuo stesso reparto IT.
2. **Urgenza artificiale.** Il tuo account è compromesso, un virus si sta diffondendo, un rimborso ti aspetta o il tuo servizio sta per essere interrotto. Secondo la FTC, i truffatori "vogliono che tu agisca prima di avere il tempo di pensare", quindi la pressione ad agire in fretta è proprio lo scopo.
3. **Installare lo strumento.** Ti chiedono di scaricare un "software di supporto remoto gratuito" per poter "risolvere" il problema. È un software vero — ed è proprio questo che lo rende convincente.
4. **Concedere l'accesso.** Ti chiedono di leggere loro il codice di connessione o la password che vedi sullo schermo, oppure di approvare la sessione in arrivo. Di solito l'ID del dispositivo da solo non basta per prendere il controllo: entrano nel momento in cui condividi il codice o accetti la richiesta.
5. **Prendere il controllo.** Simulano una scansione antivirus, aprono il sito della tua banca, spostano denaro o creano nuovi account. L'[ufficio di Boston dell'FBI](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) ha avvertito che i truffatori usano questo accesso per aprire conti in valuta virtuale e liquidare i saldi bancari reali delle vittime.

Le perdite non sono teoriche. In quello stesso avviso dell'FBI, gli investigatori hanno descritto il caso di una coppia del Maine che, dopo che un pop-up aveva chiesto loro di chiamare un numero per "Fidelity", ha ricevuto istruzioni di installare un software di desktop remoto e ha lasciato che falsi rappresentanti di "Microsoft" e "Fidelity" osservassero i loro conti — perdendo circa **1,1 milioni di dollari**.

## I segnali d'allarme

Quasi ogni truffa dell'accesso remoto fa scattare almeno uno di questi campanelli d'allarme:

- **Contatto non richiesto.** Uno sconosciuto ti contatta per risolvere un problema del computer che non hai mai segnalato. La FTC è molto chiara su questo punto: né lei né i suoi amministratori dei rimborsi "ti chiederanno mai di pagare con carte regalo" o "richiederanno l'accesso remoto al tuo dispositivo". Lo stesso vale per Microsoft, Apple o la tua banca.
- **Un pop-up con un numero di telefono.** Gli avvisi di sicurezza legittimi non ti chiedono mai di chiamare una linea di assistenza. Quel numero appartiene al truffatore.
- **Pressione e urgenza.** "Fallo subito o perderai tutto" è una tattica di manipolazione, non una procedura di assistenza.
- **Una richiesta di installare un software e leggere ad alta voce un codice.** Questo è il meccanismo centrale della truffa. Nessun operatore onesto che chiama a freddo ne ha bisogno.
- **Una svolta verso il denaro.** Carte regalo, bonifici, criptovalute, oppure un "rimborso" che risulta stranamente troppo elevato e che deve essere "restituito."
- **Restare in linea mentre accedi.** Vogliono osservarti digitare le tue credenziali bancarie.

## Assistenza legittima contro truffa

|                           | Assistenza remota legittima                                     | Una truffa                                              |
| ------------------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| Chi la avvia              | Sei tu a contattarli, a un numero che hai cercato personalmente | Ti contattano loro, di punto in bianco                  |
| Il problema               | Uno che hai già segnalato                                       | Uno che hanno "scoperto" loro e ti hanno riferito       |
| Urgenza                   | Programmata, senza fretta                                       | "Agisci ora, altrimenti…"                               |
| Il codice di connessione  | Scegli tu di condividerlo, consapevolmente                      | Sei sotto pressione per leggerlo ad alta voce in fretta |
| Pagamento                 | Fatturazione normale, se prevista                               | Carte regalo, bonifici, cripto, "rimborsi"              |
| Accesso al conto bancario | Mai necessario per riparare un PC                               | Il vero obiettivo                                       |

## Cosa fare se hai già dato accesso a un truffatore

Se ti rendi conto durante la chiamata o in seguito di essere stato truffato, agisci rapidamente e in quest'ordine:

1. **Disconnettiti da internet.** Disattiva il Wi-Fi o scollega il cavo di rete per interrompere immediatamente la loro sessione.
2. **Disinstalla l'app di accesso remoto** che ti hanno fatto installare. Se non sei sicuro di come farlo, un tecnico locale di fiducia può aiutarti.
3. **Esegui una scansione per il malware.** Esegui una scansione antivirus completa; valuta un intervento professionale se sono coinvolti dispositivi sensibili. Parti dal presupposto che potrebbero aver lasciato qualcosa alle spalle.
4. **Cambia le password da un dispositivo diverso e affidabile** — prima email e home banking, poi tutto ciò che condivide una password.
5. **Chiama la tua banca e gli emittenti delle carte.** Segnala la frode, chiedi informazioni sull'annullamento dei bonifici e tieni d'occhio eventuali attività non autorizzate.
6. **Proteggi la tua identità.** Se hai condiviso dati personali, attiva un avviso antifrode o un blocco del credito presso tutte e tre le principali agenzie di credito statunitensi: Equifax, Experian e TransUnion.
7. **Segnala l'accaduto nel tuo paese.** Negli **Stati Uniti**, presenta una segnalazione alla FTC su [ReportFraud.ftc.gov](https://reportfraud.ftc.gov) e all'[IC3 dell'FBI](https://www.ic3.gov). Fuori dagli Stati Uniti, contatta la polizia locale e l'autorità competente per le segnalazioni di frode, e chiedi alla tua banca quali misure di tutela dell'identità sono disponibili nel tuo paese.

## Come prevenirla

La prevenzione si riduce a poche abitudini:

- **Non installare mai un software di accesso remoto su richiesta di qualcuno che ti ha contattato.** Inverti la direzione: se hai bisogno di aiuto, trova tu il numero reale del fornitore e chiamalo.
- **Non leggere mai ad alta voce un codice di connessione** a qualcuno che non hai contattato tu stesso deliberatamente.
- **Considera falsi i numeri di telefono nei pop-up.** Chiudi il browser — forzane la chiusura se necessario — invece di chiamare.
- **Rallenta.** L'urgenza è lo strumento del truffatore. Un'istituzione vera ti lascerà riagganciare e richiamare.
- **Parlane.** Queste truffe colpiscono in modo sproporzionato le persone anziane e chi è sotto stress. Un rapido "ti sembra normale?" rivolto a un familiare spezza l'incantesimo.

## Il ruolo degli strumenti di desktop remoto

Vale la pena ripeterlo: il software non è il cattivo della storia. Gli strumenti di desktop remoto sono il modo in cui i team IT tengono in funzione i computer di tutto il mondo, e la stessa identica app può essere un'ancora di salvezza o un'arma a seconda di chi la impugna. Incolpare un singolo prodotto non coglie il punto — la difesa consiste nel controllare chi lasci entrare.

Detto questo, se _gestisci_ professionalmente un servizio di assistenza remota, alcune scelte strutturali riducono la tua esposizione. Con il self-hosting del server RustDesk, i servizi ID/rendezvous e relay girano su un'infrastruttura che controlli tu. Chi può connettersi lo stabiliscono quindi i tuoi controlli: applica le regole di base dell'[accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione), con password permanenti robuste e uniche e 2FA per le connessioni, aggiungi un elenco di IP o ID autorizzati sui dispositivi controllati e usa il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) di Server Pro per utente e per gruppo di dispositivi. E poiché RustDesk è [open source](https://github.com/rustdesk/rustdesk), puoi verificare, da solo o con un team di sicurezza, esattamente cosa fa sulle tue macchine.

Nulla di tutto questo rende RustDesk — o qualsiasi altro strumento — immune dalle truffe. Un utente ingannato al punto da installare un client e leggere ad alta voce un codice può essere vittimizzato su qualsiasi piattaforma. La struttura riduce alcuni rischi, ma non sostituisce mai la semplice regola al centro di ogni avviso qui sopra: non affidare il controllo del tuo computer a qualcuno che ha contattato _te_.

Se vuoi approfondire come strumenti specifici gestiscono la sicurezza e come vengono impersonati dai truffatori, consulta le nostre guide correlate su se [AnyDesk è sicuro](/it/blog/anydesk-e-sicuro-crittografia-lincidente-di-sicurezza-del-2024-e-le) e se [Chrome Remote Desktop è sicuro](/it/blog/chrome-remote-desktop-e-sicuro-una-recensione-onesta).
