---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-04T17:05:00Z
lang: 'it'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Sovranità dei dati del desktop remoto e GDPR: self-hosting'
excerpt: 'Come il self-hosting dà ai team regolamentati il controllo su rendezvous, relay e dati dei dispositivi, e quali domande su GDPR e conformità restano aperte.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp'
category: 'Sicurezza'
tags: ['RustDesk', 'Sicurezza', 'GDPR', 'Self-hosting']
author: 'RustDesk Team'
slug: 'sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting'
faq:
  - question: 'RustDesk è conforme a ISO 27001, SOC 2 o HIPAA?'
    answer: 'RustDesk self-hosted viene valutato all''interno del tuo programma di conformità: ID/rendezvous, relay e console girano su un''infrastruttura che gestisci tu, quindi rientrano nel perimetro ISO 27001, nei controlli SOC 2 o nelle misure di salvaguardia HIPAA come il resto del tuo ambiente. Il self-hosting è un controllo di implementazione, non una certificazione. Chiedi a sales@rustdesk.com quali report del fornitore, BAA, DPA o documentazione per il procurement sono disponibili per il tuo scenario.'
  - question: 'Il self-hosting di RustDesk aiuta con la conformità al GDPR?'
    answer: 'Sì: ti dà il controllo su cui di solito verte il GDPR. Scegli tu dove risiedono ID/rendezvous, relay, console e dati dei dispositivi e puoi mantenerli nella tua regione, su un''infrastruttura che gestisci tu. È una base solida più che una garanzia automatica, perché il GDPR è un programma: base giuridica, ruoli di titolare e responsabile del trattamento, conservazione, controllo degli accessi, ubicazione degli endpoint e risposta agli incidenti sono ancora da definire, e la responsabilità rimane del titolare.'
  - question: 'Dove vanno realmente i dati di sessione di RustDesk?'
    answer: 'RustDesk tenta prima una connessione peer-to-peer diretta; se non riesce, il traffico passa dal relay configurato. Il self-hosting elimina dal percorso un rendezvous e un relay gestiti dal fornitore, ma una sessione tra endpoint situati in paesi diversi attraversa comunque quelle reti: la sola posizione del server non confina tutto il traffico in un''unica giurisdizione.'
  - question: 'Posso mantenere i dati del desktop remoto all''interno dell''UE con RustDesk?'
    answer: 'Sì. Puoi collocare ID/rendezvous, relay, console e dati dei dispositivi archiviati in un data center dell''UE. Per vincolare anche il traffico di sessione, entrambi gli endpoint devono trovarsi all''interno del confine e la policy deve forzare il traffico attraverso il tuo relay approvato; documenta la posizione degli endpoint e l''instradamento insieme alla posizione del server.'
  - question: 'Quali funzionalità di RustDesk aiutano a rispettare il GDPR?'
    answer: 'RustDesk Server Pro offre log di audit con conservazione configurabile (Impostazioni > Altro > Conservazione log (giorni); con 0 i log sono conservati a tempo indeterminato), Controllo di accesso e Ruolo di controllo per il privilegio minimo, SSO LDAP/OIDC, consenso per singola connessione, modalità privacy su Windows e macOS ed eliminazione di utenti e dispositivi dalla console o tramite API per le richieste di cancellazione. Con il self-hosting scegli tu dove gira tutto questo.'
metadata:
  description: 'Sovranità dei dati e GDPR nel desktop remoto: cosa controlla il self-hosting, sessioni dirette e via relay, e perché la posizione del server non basta.'
  keywords: 'sovranità dei dati desktop remoto, accesso remoto GDPR, residenza dei dati desktop remoto, conformità accesso remoto self-hosted'
---

Se la tua organizzazione è soggetta al GDPR, alle normative sulla privacy in ambito sanitario o a un obbligo del settore pubblico del tipo «i nostri dati restano sulla nostra infrastruttura», una sola domanda decide quali strumenti di desktop remoto puoi anche solo prendere in considerazione: **dove vanno realmente i dati di sessione?**

In un servizio ospitato dal fornitore, di norma è il fornitore a gestire il coordinamento e ad archiviare i dati di gestione e degli account. I flussi della sessione possono viaggiare direttamente tra gli endpoint oppure passare da un relay. Un'analisi dei flussi di dati deve distinguere questi percorsi: «mediato dal cloud» non significa che ogni pacchetto dello schermo attraversi quel cloud.

Questa guida parla di **sovranità dei dati nel desktop remoto**: cosa significa, perché è importante per i team regolamentati e per chi acquista nell'UE, e quali parti di un'installazione di accesso remoto puoi controllare grazie al self-hosting. Useremo RustDesk come esempio pratico.

## Cosa significa la «sovranità dei dati» per l'accesso remoto

La sovranità dei dati è il principio secondo cui i dati sono soggetti alle leggi del paese in cui vengono fisicamente archiviati ed elaborati. Nell'assistenza remota, i dati sensibili non sono solo i file che trasferisci: è la sessione stessa, cioè ciò che appare sullo schermo, l'elenco dei dispositivi che gestisci, i metadati di connessione e spesso l'instradamento dei pixel in tempo reale.

Le domande fondamentali sono: **quali sistemi archiviano i metadati, quali sistemi inoltrano il traffico e dove si trovano entrambi gli endpoint?** Il self-hosting può eliminare dal percorso un servizio di rendezvous o di relay gestito dal fornitore, ma non può garantire che una sessione tra endpoint situati in paesi diversi resti all'interno di un'unica giurisdizione.

## La differenza fondamentale: cloud del fornitore o infrastruttura tua

È qui che l'architettura, non il marketing, determina il risultato.

**RustDesk Server Pro è self-hosted.** Il server ID/rendezvous, il server relay, la console web e i dati dei dispositivi gestiti girano sull'infrastruttura che scegli tu. RustDesk tenta prima una connessione peer-to-peer diretta tramite hole punching; se non riesce, il traffico di sessione passa dal relay configurato. In questo modo controlli il livello di rendezvous/relay e i dati dei dispositivi archiviati, ma sono gli endpoint e i loro percorsi di rete a determinare dove viaggia il traffico diretto.

|                                     | Strumenti cloud del fornitore     | RustDesk self-hosted                                                                              |
| ----------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| Dove vengono coordinate le sessioni | Il cloud del fornitore            | Il tuo server ID/rendezvous                                                                       |
| Dove passa il traffico di sessione  | Instradamento deciso dal fornitore | Diretto tra gli endpoint quando possibile; altrimenti tramite il tuo relay                       |
| Chi controlla la residenza dei dati | Il fornitore                      | Scegli tu la posizione lato server e la policy del relay; gli endpoint restano comunque rilevanti |
| Verificabilità del client           | Di solito closed source           | [Open source (AGPL)](https://github.com/rustdesk/rustdesk): puoi leggerlo e compilarlo tu stesso  |
| Chi gestisce il server              | Il fornitore                      | Il tuo team                                                                                       |

I team che valutano il self-hosting citano spesso per primo proprio questo controllo: scegliere la posizione e il gestore dei sistemi di rendezvous, relay e gestione.

## Vantaggio 1: controlli la posizione dei dati lato server

Colloca i servizi di ID, relay e gestione in un data center in Germania e potrai documentare esattamente dove risiedono quei servizi e i dati che archiviano. Mantieni entrambi gli endpoint all'interno del confine richiesto e forza il traffico attraverso quel relay approvato, e potrai vincolare anche il percorso della sessione.

## Vantaggio 2: con l'open source puoi verificare il client

Il **client RustDesk e RustDesk Server OSS (il server community gratuito) hanno [licenza AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro è un software server self-hosted commerciale e proprietario**. Il tuo team di sicurezza può leggere il codice del client, verificare cosa fa su un endpoint e compilarlo in proprio. Per l'accesso remoto questo conta più del solito: al software si affida il controllo completo di una macchina, e chi acquista nei settori regolamentati vuole sempre più spesso verificare cosa fa un client invece di fidarsi della parola del fornitore.

## Vantaggio 3: un modello di licenza del server diverso

I piani standard di RustDesk sono concessi in licenza **per utente con login più per dispositivo gestito** e includono connessioni simultanee illimitate; solo [Customized V2](https://rustdesk.com/pricing#custom2) prevede in licenza un numero definito di connessioni simultanee. Puoi [effettuare l'upgrade di una licenza](/it/blog/aggiornare-la-licenza-rustdesk-a-meta-abbonamento-come-funziona) in qualsiasi momento, quando cambiano le esigenze.

Il modello cresce con il tuo parco dispositivi: la [guida alla pianificazione di flotte di grandi dimensioni](/it/blog/rustdesk-puo-scalare-fino-a-200-000-dispositivi) copre installazioni fino a 200.000 dispositivi. Server Pro aggiunge il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) per utente e per gruppo di dispositivi, oltre a SSO LDAP/OIDC e alla generazione di client personalizzati dal piano Basic.

## Come RustDesk si inserisce nei requisiti ISO 27001, SOC 2 o HIPAA

I team di procurement aziendali e quelli del settore sanitario chiedono quasi sempre come uno strumento di accesso remoto si rapporta a ISO 27001, SOC 2 o HIPAA. Con un prodotto cloud dipendi dalla certificazione che il fornitore ha ottenuto per la propria infrastruttura e dalle sue condizioni di responsabilità condivisa. RustDesk self-hosted funziona al contrario: ID/rendezvous, relay e console girano su un'infrastruttura già coperta dal tuo programma, quindi li valuti nel tuo perimetro ISO 27001, con i tuoi controlli SOC 2 o con le tue misure di salvaguardia HIPAA, e il tuo team di sicurezza può esaminare il codice sorgente del client nell'ambito di quella valutazione. Il self-hosting è un controllo di implementazione, non una certificazione; è la valutazione a farlo rientrare nel perimetro.

Alcune note pratiche:

- Il self-hosting ti permette di scegliere la posizione e il gestore di rendezvous, relay, console e dati di gestione archiviati. Documenta, insieme a queste posizioni, anche l'instradamento degli endpoint, i backup e gli accessi amministrativi.
- Se il tuo processo di procurement richiede espressamente un report SOC 2 del fornitore, un Business Associate Agreement (BAA) firmato, un DPA o questionari di sicurezza compilati, chiedi al team RustDesk all'indirizzo [sales@rustdesk.com](mailto:sales@rustdesk.com) cosa è attualmente disponibile per il tuo scenario.
- Poiché il client è open source, alla domanda «come facciamo a sapere cosa fa?» si risponde con l'ispezione del codice; i report di assurance del fornitore rispondono a una domanda di procurement diversa.

In breve, il self-hosting porta l'accesso remoto all'interno del programma di conformità che già gestisci, e per un team regolamentato questa è spesso una posizione più solida che affidarsi alla certificazione del fornitore su un'infrastruttura che non puoi ispezionare.

## Controlli a supporto di un programma GDPR self-hosted

Il self-hosting è la base, e su di essa RustDesk offre controlli concreti su cui i team self-hosted fanno affidamento in un programma GDPR:

- **I dati del server restano dove li collochi, con pochi flussi in uscita.** I servizi self-hosted di ID/rendezvous, relay e gestione Pro trattano i dati dell'installazione nel luogo in cui li esegui. I flussi in uscita da documentare sono la convalida della licenza Pro (HTTPS verso rustdesk.com circa una volta al giorno), il servizio di compilazione dei client personalizzati, gli aggiornamenti dei client, l'SMTP se configuri un server di posta esterno e gli eventuali provider di identità esterni che colleghi. Vedi la guida [RustDesk Server Pro può funzionare offline o air-gapped?](/it/blog/rustdesk-server-pro-puo-funzionare-offline-o-air-gapped).
- **Conservazione dei log di audit configurabile.** I [log di audit di Server Pro](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/audit-logs/#visibilità-e-conservazione-dei-log) coprono connessioni, trasferimenti di file, allarmi e operazioni della console. In **Impostazioni → Altro → Conservazione log (giorni)** (Settings → Other → Log Retention (Days)), `0` conserva tutti i log a tempo indeterminato; un valore positivo elimina i log più vecchi, con una pulizia ogni ora. Definisci separatamente la conservazione di esportazioni e backup.
- **Accesso granulare e delimitato.** Il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) decide chi può raggiungere quali dispositivi tramite assegnazioni per utente, gruppi di dispositivi e regole tra gruppi (i permessi dei gruppi di utenti e dei gruppi di dispositivi si sommano). La rubrica condivisa si limita a organizzare le voci: non è un confine di accesso. Il [Ruolo di controllo](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/control-role/) limita ciò che un tecnico può fare durante la sessione: tastiera/mouse, appunti, trasferimento file, audio, videocamera, terminale, stampa, registrazione e altro ancora. Insieme a SSO/LDAP e alla 2FA sui dispositivi controllati, applicano i principi del privilegio minimo e della limitazione della finalità.
- **Modalità privacy e consenso per singola connessione.** Il lato controllato può richiedere l'approvazione di ogni connessione in entrata, e la modalità privacy (supportata su Windows e macOS) oscura lo schermo locale durante la sessione, limitando l'esposizione accidentale dei dati personali visualizzati.
- **Eliminazione alle tue condizioni.** Poiché i dati risiedono sul tuo server, puoi disabilitare o rimuovere utenti, eliminare dispositivi e record, anche tramite l'API REST, e gestire direttamente le richieste di cancellazione e di conservazione.
- **Infrastruttura nella tua regione e gestita da te.** ID/rendezvous, relay, console e dati archiviati girano dove li collochi tu, su hardware che controlli.
- **Le build dei client personalizzati sono temporanee.** La generazione di un client con il tuo marchio è l'unico passaggio che usa il servizio di compilazione di RustDesk, ed è volutamente di breve durata: la configurazione di build che invii viene eliminata al termine della compilazione e il programma di installazione generato viene rimosso automaticamente dopo circa un giorno, quindi scaricalo e conservalo nel tuo repository approvato.

Sono leve che un programma GDPR può davvero azionare: sei comunque tu a documentarle e gestirle, ma non devi aspettare che un fornitore dia seguito alla richiesta di un interessato.

## Una sovranità che puoi dimostrare

Ospitare in proprio rendezvous, relay, console e dati archiviati offre a un programma di conformità qualcosa di concreto: un'infrastruttura che collochi, gestisci e verifichi. È una base di partenza, non un traguardo, ma è la parte su cui poggia tutto il resto.

## Checklist di implementazione per GDPR e sovranità

Il self-hosting ti offre delle scelte; l'implementazione deve trasformarle in controlli:

- Documenta dove si trovano il server ID, il relay, la console, i backup, i log e gli amministratori.
- Mappa i percorsi peer-to-peer diretti separatamente da quelli tramite relay. Un server in Germania non mantiene in Germania una sessione diretta tra la Germania e un altro paese.
- Decidi in quali casi forzare il relay, perché il passaggio da una posizione controllata conta più delle prestazioni peer-to-peer.
- Registra finalità, periodo di conservazione e policy di accesso per i metadati di dispositivi, account, audit e connessioni.
- Applica gruppi di dispositivi a privilegio minimo, MFA/SSO dove disponibili e un processo di gestione di ingressi, cambi di ruolo e uscite (joiner-mover-leaver) per i tecnici.
- Metti la console web dietro HTTPS, limita l'accesso di rete amministrativo e verifica il ripristino dei backup.
- Completa la valutazione legale appropriata, ad esempio registro dei trattamenti, verifica dei responsabili del trattamento, valutazione dei trasferimenti e DPIA, in base al tuo caso d'uso.

RustDesk può supportare un'architettura di sovranità, ma il titolare del trattamento resta responsabile dell'architettura e della sua base giuridica.

## Valutalo all'interno del tuo perimetro

Puoi valutare RustDesk alle tue condizioni. Installa oggi stesso Server OSS in self-hosting, oppure scrivi a [sales@rustdesk.com](mailto:sales@rustdesk.com) per le attuali condizioni di valutazione delle funzionalità Pro. Controlla i piani attuali e le funzionalità esatte su [rustdesk.com/pricing](https://rustdesk.com/pricing). Preferisci guardare prima? Sul [canale YouTube di RustDesk](https://www.youtube.com/@rustdesk) trovi una videoguida completa.
