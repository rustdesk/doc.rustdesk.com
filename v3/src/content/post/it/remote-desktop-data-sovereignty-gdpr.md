---
publishDate: 2026-07-04T17:05:00Z
lang: 'it'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Sovranità dei dati del desktop remoto e GDPR: self-hosting'
excerpt: 'Come il self-hosting garantisce ai team regolamentati il controllo su rendezvous, relay e dati dei dispositivi — e quali domande su GDPR e conformità restano aperte.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.png'
category: 'Sicurezza'
tags: ['RustDesk', 'Sicurezza', 'GDPR', 'Self-hosting']
author: 'RustDesk Team'
slug: 'sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting'
faq:
  - question: 'RustDesk è conforme a ISO 27001, SOC 2 o HIPAA?'
    answer: "RustDesk è self-hosted, quindi la conformità dipende dal tuo ambiente: esegui l'accesso remoto all'interno del tuo perimetro ISO 27001 o HIPAA e dei controlli già esistenti, e il software open source può essere verificato direttamente anziché essere preso sulla fiducia. Se hai bisogno in particolare di un report SOC 2 del fornitore, di un BAA firmato, di un DPA o di questionari di sicurezza completati, contatta sales@rustdesk.com per sapere cosa è disponibile per il tuo scenario."
  - question: 'Il self-hosting di RustDesk aiuta con la conformità al GDPR?'
    answer: "Sì: offre il controllo che di solito è al centro del GDPR: scegli dove risiedono i dati di ID/rendezvous, relay, console e dispositivi, e puoi mantenerli nella tua regione su un'infrastruttura gestita da te. Si tratta di una base solida, non di una garanzia automatica, poiché il GDPR è un programma: base giuridica, ruoli di titolare/responsabile del trattamento, conservazione, controllo degli accessi, ubicazione degli endpoint e risposta agli incidenti restano compiti da definire, con il titolare che rimane responsabile."
  - question: 'Dove vanno realmente i dati di sessione di RustDesk?'
    answer: "RustDesk tenta prima una connessione peer-to-peer diretta; se non riesce, il traffico passa attraverso il relay configurato. Il self-hosting elimina dal percorso un rendezvous e un relay gestiti dal fornitore, ma una sessione tra endpoint situati in paesi diversi attraversa comunque quelle reti — la sola collocazione del server non confina tutto il traffico in un'unica giurisdizione."
  - question: "Posso mantenere i dati del desktop remoto all'interno dell'UE con RustDesk?"
    answer: "Puoi collocare ID/rendezvous, relay, console e i dati dei dispositivi archiviati in un data center dell'UE. Per vincolare anche il traffico di sessione, entrambi gli endpoint devono trovarsi all'interno del confine stabilito e la policy deve forzare il traffico attraverso il tuo relay approvato; documenta la posizione degli endpoint e il routing insieme alla collocazione del server."
  - question: 'Quali funzionalità di RustDesk aiutano a soddisfare il GDPR?'
    answer: "Il self-hosting mantiene i dati su un'infrastruttura che controlli tu: la telemetria di utilizzo che il servizio RustDesk ospitato elaborerebbe rimane invece sul tuo server quando fai self-hosting, e a parte il controllo della licenza di Server Pro, poco altro deve raggiungere rustdesk.com. Server Pro aggiunge log di audit integrati con rotazione dei log, controllo degli accessi granulare e un Control Role, SSO/LDAP e 2FA per i dispositivi controllati, modalità privacy e consenso per singola connessione, ed eliminazione diretta di utenti, dispositivi e record (anche tramite REST API) per le richieste di cancellazione e conservazione."
metadata:
  description: 'Sovranità dei dati del desktop remoto e GDPR: cosa controlla il self-hosting, come differiscono le sessioni dirette da quelle tramite relay, e perché la conformità richiede più della semplice collocazione del server.'
  keywords: 'sovranità dei dati desktop remoto, accesso remoto GDPR, residenza dei dati desktop remoto, conformità accesso remoto self-hosted'
---

Se la tua organizzazione è vincolata dal GDPR, da normative sulla privacy in ambito sanitario o da un mandato del settore pubblico secondo cui "i nostri dati restano sulla nostra infrastruttura", una sola domanda decide quali strumenti di desktop remoto puoi anche solo prendere in considerazione: **dove vanno realmente i dati di sessione?**

Con la maggior parte dei prodotti di accesso remoto più diffusi, la risposta è "attraverso il cloud del fornitore". Il tuo tecnico si connette, il tuo endpoint si connette, e il traffico viene instradato da server che non possiedi, in una giurisdizione che potresti non controllare. Per molti acquirenti va bene così. Per i team regolamentati, è un problema di conformità ancora prima che qualcuno abbia condiviso uno schermo.

Questa guida parla di **sovranità dei dati nel desktop remoto**: cosa significa, perché è importante per i team regolamentati e per gli acquirenti dell'UE, e quali parti di una distribuzione di accesso remoto puoi controllare grazie al self-hosting. Useremo RustDesk come esempio pratico.

## Cosa significa la "sovranità dei dati" per l'accesso remoto

La sovranità dei dati è il principio secondo cui i dati sono soggetti alle leggi del paese in cui vengono fisicamente archiviati ed elaborati. Nel supporto remoto, i dati sensibili non sono solo i file che trasferisci: è la sessione stessa — ciò che appare sullo schermo, l'elenco dei dispositivi che gestisci, i metadati di connessione e spesso l'instradamento dei pixel in tempo reale.

Le domande fondamentali sono: **quali sistemi archiviano i metadati, quali sistemi instradano il traffico e dove si trovano entrambi gli endpoint?** Il self-hosting può eliminare dal percorso un servizio di rendezvous o relay gestito dal fornitore, ma non può garantire che una sessione tra endpoint situati in paesi diversi resti all'interno di un'unica giurisdizione.

## La differenza fondamentale: cloud del fornitore vs. la tua infrastruttura

È qui che l'architettura, non il marketing, determina il risultato.

**RustDesk Server Pro è self-hosted.** Il server ID/rendezvous, il server relay, la console web e i dati dei dispositivi gestiti vengono eseguiti sull'infrastruttura che scegli tu. RustDesk tenta prima una connessione peer-to-peer diretta tramite hole punching; se non riesce, il traffico di sessione utilizza il relay configurato. Questo ti offre il controllo sul livello di rendezvous/relay e sui dati dei dispositivi archiviati, ma gli endpoint e i loro percorsi di rete determinano comunque dove viaggia il traffico diretto.

|                                     | Strumenti cloud del fornitore  | RustDesk self-hosted                                                                              |
| ----------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| Dove vengono coordinate le sessioni | Il cloud del fornitore         | Il tuo server ID/rendezvous                                                                       |
| Dove scorre il traffico di sessione | Routing definito dal fornitore | Diretto tra gli endpoint quando possibile; altrimenti tramite il tuo relay                        |
| Chi controlla la residenza dei dati | Il fornitore                   | Scegli tu la posizione lato server e la policy del relay; gli endpoint restano comunque rilevanti |
| Verificabilità del client           | Solitamente closed source      | [Open source (AGPL)](https://github.com/rustdesk/rustdesk) — leggilo e compilalo tu stesso        |
| Chi gestisce il server              | Il fornitore                   | Il tuo team                                                                                       |

I team che valutano il self-hosting citano spesso la possibilità di scegliere la posizione e l'operatore dei sistemi di rendezvous, relay e gestione. Si tratta di un controllo significativo, ma deve essere documentato insieme alla posizione degli endpoint e al comportamento di routing.

## Vantaggio 1: controlli la posizione dei dati lato server

Collocare i servizi di ID, relay e gestione in un data center in Germania ti permette di documentare dove risiedono quei servizi e i relativi dati archiviati. Se anche entrambi gli endpoint si trovano all'interno del confine richiesto e la policy forza il traffico attraverso un relay approvato, puoi progettare un percorso più vincolato. Senza questi controlli aggiuntivi, la sola collocazione del server non garantisce che tutto il traffico di sessione resti in Germania.

## Vantaggio 2: l'open source ti permette di dimostrarlo, non solo di fidartene

La sovranità dei dati non riguarda solo la posizione, ma anche la conoscenza di ciò che fa il software. Il core di RustDesk è **open source con licenza AGPL**. Tu (o il tuo team di sicurezza) puoi leggere il codice, verificare esattamente cosa fa il client, compilarlo tu stesso ed eseguire indefinitamente il server community gratuito. Questa verificabilità conta più del solito per l'accesso remoto: poiché al software è affidato il controllo completo di una macchina, gli acquirenti nei settori regolamentati vogliono sempre più verificare cosa fa un client anziché fidarsi della parola del fornitore. Poter ispezionare il client da soli è una risposta concreta alla domanda "come facciamo a saperlo?"

## Vantaggio 3: sovranità senza una tassa di licenza

I piani standard di RustDesk sono concessi in licenza **per utente di accesso più per dispositivo gestito** e includono connessioni simultanee illimitate; [Customized V2](https://rustdesk.com/pricing#custom2) limita invece le connessioni simultanee e le tariffa di conseguenza. Puoi [effettuare l'upgrade di una licenza](/it/blog/aggiornare-la-licenza-rustdesk-a-meta-abbonamento-come-funziona) quando cambiano le esigenze. Controlla la matrice dei piani attuale prima dell'acquisto.

L'architettura si adatta anche alle dimensioni del tuo parco dispositivi: RustDesk pubblica [linee guida di pianificazione per flotte di grandi dimensioni](/it/blog/rustdesk-puo-scalare-fino-a-200-000-dispositivi) per i team che valutano distribuzioni più estese. Per il [controllo degli accessi per utente](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/), le distribuzioni self-hosted includono una [console web](https://rustdesk.com/docs), un generatore di client con marchio personalizzato, gruppi di dispositivi con rubrica condivisa e [LDAP/SSO](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/ldap/) (OIDC) disponibile dal piano Basic in su.

## Come RustDesk si integra con i requisiti ISO 27001, SOC 2 o HIPAA

I team di procurement aziendale e quelli del settore sanitario chiedono quasi sempre come uno strumento di accesso remoto si collochi rispetto a ISO 27001, SOC 2 o HIPAA. Con un prodotto cloud, erediti — e dipendi — dalla certificazione che il fornitore fa della _propria_ infrastruttura. Il modello di RustDesk è diverso, e per i team regolamentati la differenza gioca solitamente a tuo favore: poiché fai **self-hosting**, l'accesso remoto viene eseguito all'interno dell'ambiente che già controlli e verifichi, quindi rientra nel _tuo_ perimetro ISO 27001 o HIPAA e nei _tuoi_ controlli esistenti anziché in quelli di terze parti. Collochi ID, relay e console su un'infrastruttura già coperta dal tuo programma e — poiché RustDesk è [open source](https://github.com/rustdesk/rustdesk) — il tuo team di sicurezza può leggere e verificare esattamente cosa fa come parte di una valutazione, invece di doversi fidare di un binario chiuso.

Alcune note pratiche:

- Il self-hosting mantiene i sistemi sensibili — rendezvous, relay, console e dati dei dispositivi — su hardware di tua proprietà, che è esattamente ciò che un controllo di residenza dei dati o HIPAA cerca solitamente di garantire. La checklist di distribuzione più avanti trasforma questo in controlli documentati.
- Se il tuo processo di procurement richiede specificamente un report SOC 2 lato fornitore, un Business Associate Agreement (BAA) firmato, un DPA o questionari di sicurezza completati, chiedi al team RustDesk all'indirizzo [sales@rustdesk.com](mailto:sales@rustdesk.com) cosa è attualmente disponibile per il tuo scenario.
- Poiché RustDesk è open source, alla domanda "come facciamo a sapere cosa fa?" si risponde tramite ispezione, non con un certificato di cui doversi fidare ciecamente.

In breve, il self-hosting ti permette di integrare l'accesso remoto nel programma di conformità che già gestisci — spesso una posizione più solida, per un team regolamentato, rispetto a noleggiare una scatola nera certificata.

## Controlli a supporto di un programma GDPR self-hosted

Il self-hosting è la base, e su di essa RustDesk fornisce controlli concreti su cui i team self-hosted fanno affidamento per soddisfare il GDPR nella pratica:

- **La telemetria va al tuo server, non a RustDesk.** I dati di utilizzo descritti nell'informativa sulla privacy di RustDesk — avvio dell'app, indirizzo IP, statistiche di base della macchina, orari delle sessioni e ID RustDesk — sono quelli che il **servizio pubblico ospitato** di RustDesk elabora; quando gestisci tu stesso i server ID/rendezvous e relay, quei dati restano invece sulla **tua** infrastruttura. A parte il controllo della licenza di Server Pro, poco altro deve raggiungere rustdesk.com — verifica le connessioni in uscita esatte per la build del client e le impostazioni che distribuisci. Questo mantiene per impostazione predefinita i dati di sessione e utilizzo su un'infrastruttura che controlli, un approccio solido alla minimizzazione dei dati.
- **Rotazione e conservazione integrate dei log di audit.** I log di audit di Server Pro sono suddivisi in quattro categorie — connessione, trasferimento file, allarme e operazioni sulla console — con **rotazione dei log integrata**, in modo che i dati di audit non vengano conservati indefinitamente (limitazione della conservazione), e puoi esportarli dalla console web o tramite la REST API per i tuoi registri delle attività di trattamento.
- **Accesso granulare e delimitato.** Assegnazioni per utente, gruppi di dispositivi, regole tra gruppi e un Control Role (cosa può fare un tecnico durante la sessione — tastiera/mouse, appunti, trasferimento file, audio, videocamera, terminale, stampa, registrazione e altro ancora) applicano il principio del privilegio minimo e della limitazione della finalità, supportati da SSO/LDAP e 2FA per i dispositivi controllati.
- **Modalità privacy e consenso per singola connessione.** Il lato controllato può richiedere una conferma per una connessione in ingresso e può oscurare lo schermo (modalità privacy, supportata su Windows e macOS) durante una sessione, limitando l'esposizione accidentale di dati personali sullo schermo.
- **Eliminazione alle tue condizioni.** Poiché i dati risiedono sul tuo server, puoi disabilitare o rimuovere utenti, eliminare dispositivi e record — anche tramite la REST API — e gestire direttamente le richieste di cancellazione e conservazione.
- **Infrastruttura in-region e autogestita.** ID/rendezvous, relay, console e dati archiviati vengono eseguiti dove li collochi tu, su hardware che controlli.
- **Anche le build di client personalizzati non lasciano dati residui.** Generare un client con marchio personalizzato è l'unico passaggio che utilizza il servizio di build di RustDesk, ed è deliberatamente transitorio: la configurazione di build che invii non viene conservata sul server di build di RustDesk (viene eliminata al termine della build), e il programma di installazione generato viene rimosso automaticamente dopo circa un giorno, quindi sei tu a scaricarlo e conservarlo.

Queste sono leve che un programma GDPR può effettivamente azionare: sei comunque tu a documentarle e gestirle, ma non devi aspettare che un fornitore agisca su una richiesta di un interessato.

## Una sovranità concreta

Ospitare tu stesso rendezvous, relay, console e dati archiviati offre a un programma di conformità qualcosa di concreto: un'infrastruttura che collochi, gestisci e verifichi. È una base di partenza, non un traguardo, ma è la parte su cui poggia tutto il resto.

## Checklist di distribuzione per GDPR e sovranità

Il self-hosting ti offre delle scelte; la distribuzione deve trasformare quelle scelte in controlli:

- Documenta dove si trovano il server ID, il relay, la console, i backup, i log e gli amministratori.
- Mappa i percorsi peer-to-peer diretti separatamente da quelli tramite relay. Un server in Germania non mantiene in Germania una sessione diretta tra la Germania e un altro paese.
- Decidi quando il relay deve essere forzato, perché instradare il traffico attraverso una posizione controllata conta più delle prestazioni peer-to-peer.
- Registra finalità, periodo di conservazione e policy di accesso per i metadati di dispositivi, account, audit e connessioni.
- Applica gruppi di dispositivi a privilegio minimo, MFA/SSO dove disponibile, e un processo di joiner-mover-leaver per i tecnici.
- Metti la console web dietro HTTPS, limita l'accesso di rete amministrativo e testa il ripristino dei backup.
- Completa la valutazione legale appropriata — come i registri delle attività di trattamento, la revisione dei responsabili del trattamento, la valutazione dei trasferimenti e la DPIA — in base al tuo caso d'uso.

RustDesk può supportare un'architettura di sovranità, ma il titolare del trattamento resta responsabile dell'architettura e della sua base giuridica.

## Valutalo all'interno del tuo perimetro

Puoi valutare RustDesk alle tue condizioni. Fai il self-hosting oggi stesso del server community gratuito e open source, oppure scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) per conoscere le attuali condizioni di valutazione delle funzionalità Pro. Controlla i piani attuali e le funzionalità esatte su [rustdesk.com/pricing](https://rustdesk.com/pricing). Preferisci guardare prima un video? È disponibile una guida video completa sul [canale YouTube di RustDesk](https://www.youtube.com/@rustdesk).
