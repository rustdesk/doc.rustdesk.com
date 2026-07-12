---
publishDate: 2026-06-30T17:26:00Z
lang: 'it'
translationKey: 'is-anydesk-safe'
draft: false
title: "AnyDesk è sicuro? Crittografia, l'incidente di sicurezza del 2024 e le truffe"
excerpt: "AnyDesk è sicuro? Uno sguardo equilibrato sulla sua crittografia, sull'incidente di sicurezza dei sistemi di produzione del 2024 e sul perché i truffatori ne abusano — con un confronto rispetto all'open source."
image: '~/assets/images/blog/is-anydesk-safe-og.png'
category: 'Sicurezza'
tags: ['AnyDesk', 'Sicurezza']
author: 'RustDesk Team'
slug: 'anydesk-e-sicuro-crittografia-lincidente-di-sicurezza-del-2024-e-le'
faq:
  - question: 'AnyDesk è sicuro da usare?'
    answer: 'Per un uso legittimo, AnyDesk è uno strumento di desktop remoto commerciale maturo e generalmente sicuro. Cripta le sessioni con una sicurezza di trasporto standard e offre autenticazione a due fattori ed elenchi di controllo degli accessi. Le due cose da tenere a mente sono che è a codice chiuso e, per impostazione predefinita, mediato tramite cloud, e che il suo pericolo più grande nel mondo reale non è un difetto del software ma i truffatori del finto supporto tecnico che convincono le vittime a installarlo.'
  - question: 'AnyDesk è stato violato?'
    answer: "All'inizio del 2024 AnyDesk ha comunicato un incidente di sicurezza che ha interessato i suoi sistemi di produzione, nel quale gli aggressori hanno ottenuto il codice sorgente e materiale per la firma del codice. AnyDesk ha revocato i certificati, distribuito un client ri-firmato e reimpostato le password del portale web. Ha dichiarato che nessun dispositivo degli utenti finali è stato coinvolto. Verifica la portata esatta e le date consultando gli avvisi ufficiali di AnyDesk e fonti giornalistiche neutrali."
  - question: 'Perché i truffatori usano AnyDesk?'
    answer: "Poiché è gratuito, rapido da installare e non richiede un account per la persona controllata, AnyDesk è uno strumento prediletto dai truffatori del finto supporto tecnico, che chiamano o scrivono via email alle vittime convincendole a concedere l'accesso remoto. Si tratta di un rischio legato all'uso, non di una vulnerabilità di AnyDesk: lo stesso trucco di ingegneria sociale funziona con qualsiasi strumento di desktop remoto, incluso RustDesk."
  - question: 'La crittografia di AnyDesk è sicura?'
    answer: "La documentazione sulla sicurezza di AnyDesk descrive TLS 1.2 con AEAD, uno scambio di chiavi asimmetrico RSA-2048 e una crittografia di trasporto AES a 256 bit, oltre alla perfect forward secrecy. Si tratta di protezioni conformi agli standard del settore. L'avvertenza è che ti stai affidando a un client a codice chiuso e, per impostazione predefinita, al cloud di AnyDesk per mediare la connessione, quindi dipendi dalla sicurezza operativa del fornitore invece di poter verificare tu stesso il codice."
metadata:
  description: "AnyDesk è sicuro? Analisi documentata della sua crittografia TLS/AES, dell'incidente di sicurezza dei sistemi di produzione del 2024, dell'abuso da parte dei truffatori e dei compromessi legati al codice chiuso."
  keywords: 'AnyDesk è sicuro, sicurezza AnyDesk, violazione AnyDesk 2024, truffa AnyDesk, crittografia AnyDesk, AnyDesk è sicuro da usare, AnyDesk violato'
---

Risposta rapida: sì, AnyDesk è un prodotto commerciale di desktop remoto legittimo e generalmente sicuro per chi lo utilizza consapevolmente. I rischi da comprendere non riguardano il fatto che AnyDesk sia malware — non lo è — ma il fatto che sia a codice chiuso, mediato tramite cloud per impostazione predefinita, che abbia subito un incidente di sicurezza significativo nel 2024 e che sia uno degli strumenti che i truffatori amano di più sfruttare. Quello che segue è un quadro equilibrato e documentato.

## La risposta breve

AnyDesk protegge le sue sessioni con una crittografia standard e apprezzata, e offre le protezioni dell'account che ci si aspetterebbe. Viene utilizzato ogni giorno da help desk e aziende senza incidenti. Due avvertenze sono rilevanti per la tua decisione: primo, ti stai affidando a un client proprietario e, per impostazione predefinita, al cloud di AnyDesk per mediare le connessioni, quindi non puoi verificare il codice ed erediti la sicurezza operativa del fornitore — un aspetto che ha smesso di essere astratto nel [2024](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/). Secondo, e più probabile che riguardi un utente comune, AnyDesk è un accessorio prediletto nelle truffe di accesso remoto. Nessuno dei due fattori lo rende pericoloso da _installare_; entrambi però determinano come dovresti _usarlo_.

## Come AnyDesk protegge le tue sessioni

Secondo la [documentazione ufficiale sulla sicurezza di AnyDesk](https://anydesk.com/en/security), le sessioni sono protette con TLS 1.2 tramite AEAD, uno scambio di chiavi asimmetrico RSA-2048 per verificare gli endpoint e proteggere dagli attacchi man-in-the-middle, e una crittografia di trasporto AES a 256 bit, con perfect forward secrecy grazie a uno scambio di chiavi effimere. Sul fronte dell'account, AnyDesk supporta l'autenticazione a due fattori (TOTP) per l'accesso non presidiato, un elenco di controllo degli accessi / allowlist per limitare chi può connettersi, e l'hashing delle password con salt. (Alcuni materiali di AnyDesk fanno riferimento a versioni più recenti di TLS; considera la pagina attuale come fonte autorevole e verifica lì i dettagli specifici.)

Si tratta di protezioni solide e conformi agli standard del settore, paragonabili per tipologia a quelle utilizzate da ogni concorrente serio. A livello di trasporto, non c'è nulla di allarmante. Le domande interessanti riguardano il _modello di fiducia_ e il _comportamento umano_, non le suite di cifratura.

## L'incidente di sicurezza di AnyDesk del 2024: cosa è successo davvero

All'inizio del 2024, AnyDesk ha reso pubblico un incidente di sicurezza che ha interessato i suoi **sistemi di produzione**. Secondo [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/) e gli analisti di sicurezza di [Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations), gli aggressori hanno ottenuto l'accesso all'infrastruttura interna e si sono impossessati del codice sorgente e di materiale per la firma del codice. La risposta di AnyDesk, secondo quanto dichiarato dall'azienda stessa, ha incluso il coinvolgimento di esperti forensi esterni, la revoca e sostituzione dei certificati legati alla sicurezza, la distribuzione di una build del client ri-firmata e, per precauzione, la reimpostazione delle password del portale web.

Per essere corretti con AnyDesk, l'azienda ha dichiarato che **nessun dispositivo degli utenti finali è stato coinvolto** e che i suoi sistemi sono progettati per non memorizzare le chiavi private, i token o le password che permetterebbero a un aggressore di connettersi alle macchine dei clienti. Date e cifre esatte sono state riportate in modo variabile all'epoca, quindi verifica i dettagli consultando gli avvisi di AnyDesk e fonti giornalistiche neutrali, piuttosto che affidarti a un singolo riassunto, incluso questo.

La conclusione onesta non è che «AnyDesk sia insicuro in modo unico». Ogni grande fornitore di accesso remoto ha una storia di incidenti. La vera questione è il **rischio di concentrazione sul fornitore**: quando una terza parte gestisce l'infrastruttura che media le tue sessioni e detiene i dati del tuo account, una violazione in quel punto è una violazione che non hai scelto e che non avresti potuto prevenire.

## Il rischio maggiore non è un bug — sono le truffe

Per la maggior parte delle persone, il pericolo più grande legato ad AnyDesk non ha nulla a che fare con una CVE. Si tratta di ingegneria sociale. L'[FBI ha avvertito](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) che i truffatori del finto supporto tecnico spingono regolarmente le vittime a installare software di desktop remoto, per poi usare quell'accesso per svuotare i conti finanziari. AnyDesk compare costantemente in questi schemi, e la stessa AnyDesk pubblica [linee guida per la prevenzione degli abusi](https://anydesk.com/en/abuse-prevention) proprio perché viene così spesso usata come arma.

Perché proprio AnyDesk? È gratuito da scaricare, si installa in pochi secondi e — punto cruciale — la persona che viene _controllata_ non deve creare un account. Questo basso attrito è un vantaggio per il supporto legittimo e un regalo per i truffatori, che chiamano o scrivono via email a un bersaglio, inventano un «problema» urgente e lo guidano passo dopo passo nella concessione del controllo remoto completo.

Questo è il punto di equità che si perde nei titoli allarmistici: **si tratta di un rischio legato all'uso, non di una vulnerabilità di AnyDesk.** Lo stesso identico trucco funziona con TeamViewer, Chrome Remote Desktop o RustDesk. Nessuna quantità di AES ti protegge se consegni volontariamente le chiavi a uno sconosciuto al telefono. Se vuoi la strategia difensiva, l'abbiamo descritta separatamente in [come evitare le truffe del desktop remoto](/it/blog/truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle), e lo stesso ragionamento si applica a [se Chrome Remote Desktop sia sicuro](/it/blog/chrome-remote-desktop-e-sicuro-una-recensione-onesta).

## Codice chiuso e mediazione cloud: la questione della fiducia

Ecco dove il modello di AnyDesk e quello di RustDesk si separano — non sulla qualità della crittografia, ma su _cosa devi accettare per fede._

AnyDesk è proprietario. Non puoi leggere il codice sorgente del client, compilarlo tu stesso o verificarne in modo indipendente il funzionamento; ti fidi di AnyDesk sul fatto che il binario si comporti come dichiarato. E per impostazione predefinita le tue sessioni vengono mediate tramite il cloud di AnyDesk, quindi la disponibilità e la sicurezza di quell'infrastruttura spettano al fornitore — come ha dimostrato il 2024. I livelli più alti di AnyDesk offrono un'appliance on-premises, che riduce questo divario per chi sceglie di aderirvi.

RustDesk parte dal lato opposto di entrambe queste scommesse. Poiché è [open source con licenza AGPL](https://github.com/rustdesk/rustdesk), il client è verificabile e compilabile, quindi non ti affidi a un binario proprietario per fede. E poiché puoi [fare self-hosting](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto) di ID/rendezvous e relay, l'infrastruttura che media le tue sessioni è tua e non di terzi — proprio quell'esposizione al rischio di concentrazione sul fornitore che il 2024 ha reso concreta. Questo può anche supportare un [design orientato alla sovranità dei dati](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting), anche se la posizione degli endpoint, la conservazione dei dati e gli obblighi legali devono comunque essere valutati.

Per essere altrettanto equi: questo sposta la fiducia anziché eliminarla. Poiché il codice è aperto, anche i difetti di RustDesk sono pubblici, quindi tieni traccia delle [ultime release](https://github.com/rustdesk/rustdesk/releases) e dei registri delle vulnerabilità. E un'infrastruttura verificabile e autogestita è un punto di partenza, non una garanzia: il traffico delle sessioni continua a fluire direttamente tra gli endpoint, e sei tu il responsabile dell'applicazione delle patch al server.

## Quindi, AnyDesk è sicuro?

Per un uso consapevole e legittimo: sì — è un prodotto maturo con crittografia di livello standard e controlli dell'account sensati, ed è utilizzato in sicurezza su larga scala ogni giorno. Consideralo ragionevolmente sicuro, perché è ciò che i fatti dimostrano.

Le precisazioni sono la parte onesta. Il suo modello predefinito, a codice chiuso e mediato tramite cloud, significa che ti stai affidando alla sicurezza operativa di AnyDesk, che nel 2024 ha subito un colpo reale. E il danno più comune nel mondo reale deriva dai truffatori che sfruttano la facilità di installazione — un problema umano, non crittografico. Se questi compromessi non ti convincono, un'[alternativa open source e autogestita](/it/blog/la-migliore-alternativa-self-hosted-a-teamviewer) cambia la base di fiducia: codice verificabile e mediazione sotto il tuo controllo, al prezzo di gestire tu stesso un server.

Qualunque strumento tu scelga, la regola che previene i danni maggiori è anche la più semplice: non installare mai software di accesso remoto perché qualcuno che ha contattato _te_ te lo ha chiesto.
