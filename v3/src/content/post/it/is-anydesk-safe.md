---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-06-30T17:26:00Z
lang: 'it'
translationKey: 'is-anydesk-safe'
draft: false
title: 'AnyDesk è sicuro? Crittografia, l''incidente di sicurezza del 2024 e le truffe'
excerpt: 'AnyDesk è sicuro? Uno sguardo equilibrato sulla crittografia, sull''incidente del 2024 ai sistemi di produzione e sul perché i truffatori ne abusano, con un confronto con l''open source.'
image: '~/assets/images/blog/is-anydesk-safe-og.webp'
category: 'Sicurezza'
tags: ['AnyDesk', 'Sicurezza']
author: 'RustDesk Team'
slug: 'anydesk-e-sicuro-crittografia-lincidente-di-sicurezza-del-2024-e-le'
faq:
  - question: 'AnyDesk è sicuro da usare?'
    answer: 'Sì, per un uso legittimo. AnyDesk è uno strumento commerciale maturo che documenta TLS 1.2 con crittografia di trasporto AES a 256 bit, autenticazione a due fattori per l''accesso non presidiato ed elenchi di controllo degli accessi. I rischi principali sono la violazione dei sistemi di produzione del 2 febbraio 2024, il coordinamento predefinito tramite il cloud di AnyDesk (On-Premises è disponibile in Ultimate) e i truffatori che convincono le vittime a installarlo.'
  - question: 'AnyDesk è stato violato?'
    answer: 'Sì. AnyDesk ha comunicato la compromissione dei propri sistemi di produzione il 2 febbraio 2024. La dichiarazione ufficiale descriveva la sostituzione dei certificati, la bonifica dei sistemi e il reset precauzionale delle password di my.anydesk.com, e affermava di non avere prove che i dispositivi degli utenti finali fossero stati colpiti. I ricercatori di sicurezza di Akamai hanno analizzato separatamente le notizie sull''esposizione di codice sorgente e materiale di firma del codice.'
  - question: 'Perché i truffatori usano AnyDesk?'
    answer: 'Perché AnyDesk è gratuito, si installa in pochi secondi e non richiede un account sul lato controllato: i truffatori del finto supporto tecnico telefonano o scrivono alle vittime e le convincono a installarlo e a concedere il controllo. È un rischio legato all''uso, non una vulnerabilità di AnyDesk: lo stesso trucco funziona con qualsiasi strumento di desktop remoto, RustDesk compreso. AnyDesk pubblica indicazioni per prevenire gli abusi.'
  - question: 'La crittografia di AnyDesk è sicura?'
    answer: 'La documentazione sulla sicurezza di AnyDesk descrive TLS 1.2 con AEAD, uno scambio di chiavi asimmetrico RSA-2048 e una crittografia di trasporto AES a 256 bit, oltre alla perfect forward secrecy. Sono protezioni allineate agli standard del settore. Il limite è che ti affidi a un client a codice chiuso e, per impostazione predefinita, al cloud di AnyDesk per mediare la connessione, quindi dipendi dalla sicurezza operativa del fornitore invece di poter verificare tu stesso il codice.'
metadata:
  description: 'AnyDesk è sicuro? Analisi documentata di crittografia TLS/AES, incidente del 2024 ai sistemi di produzione, abusi dei truffatori e limiti del codice chiuso.'
  keywords: 'AnyDesk è sicuro, sicurezza AnyDesk, violazione AnyDesk 2024, truffa AnyDesk, crittografia AnyDesk, AnyDesk è sicuro da usare, AnyDesk violato'
---

In breve: AnyDesk è sicuro per un uso legittimo. È un prodotto commerciale di desktop remoto maturo, con una crittografia di livello standard, non un malware. I rischi da capire sono tre: è closed source e, per impostazione predefinita, coordinato tramite il cloud di AnyDesk; a febbraio 2024 ha comunicato una violazione dei sistemi di produzione; e i truffatori ne abusano molto. Ecco il quadro, con le fonti.

## La risposta breve

Sì, per un uso consapevole e legittimo. AnyDesk documenta TLS 1.2 con crittografia di trasporto AES a 256 bit, autenticazione a due fattori per l'accesso non presidiato ed elenchi di controllo degli accessi. Tre fattori determinano come dovresti usarlo: la [violazione dei sistemi di produzione del 2 febbraio 2024](https://anydesk.com/en/public-statement-2-2-2024), il coordinamento predefinito tramite il cloud di AnyDesk (in Ultimate è disponibile un'appliance On-Premises) e i truffatori del finto supporto tecnico che convincono le vittime a installarlo. Nessuno di questi fattori rende pericoloso _installarlo_; tutti influiscono su come lo _usi_.

## Come AnyDesk protegge le tue sessioni

Secondo la [documentazione ufficiale sulla sicurezza di AnyDesk](https://anydesk.com/en/security), le sessioni sono protette con TLS 1.2 tramite AEAD, uno scambio di chiavi asimmetrico RSA-2048 per verificare gli endpoint e proteggere dagli attacchi man-in-the-middle e una crittografia di trasporto AES a 256 bit, con perfect forward secrecy grazie a uno scambio di chiavi effimere. Sul fronte dell'account, AnyDesk supporta l'autenticazione a due fattori (TOTP) per l'accesso non presidiato, un elenco di controllo degli accessi / allowlist per limitare chi può connettersi e l'hashing delle password con salt. (Alcuni materiali di AnyDesk citano versioni di TLS più recenti; il riferimento attuale è la pagina sulla sicurezza indicata sopra.)

Sono protezioni solide e allineate agli standard del settore, paragonabili per tipo a quelle di ogni concorrente serio. A livello di trasporto non c'è nulla di allarmante. Le domande interessanti riguardano il _modello di fiducia_ e il _comportamento umano_, non le suite di cifratura.

## L'incidente di sicurezza di AnyDesk del 2024: cosa è successo davvero

Il **2 febbraio 2024** [AnyDesk ha comunicato la compromissione dei propri sistemi di produzione](https://anydesk.com/en/public-statement-2-2-2024). La dichiarazione descriveva la risposta all'incidente con CrowdStrike, la revoca e sostituzione dei certificati, la bonifica dei sistemi e il reset precauzionale delle password del portale web. L'[analisi di Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) tratta le notizie sull'esposizione di codice sorgente e materiale di firma del codice separatamente dalla comunicazione pubblica del fornitore.

[AnyDesk ha dichiarato di **non avere prove che i dispositivi degli utenti finali fossero stati colpiti**](https://anydesk.com/en/public-statement-2-2-2024) e di non conservare credenziali utilizzabili per connettersi a essi.

La lezione non è che AnyDesk sia insicuro più di altri. Riguarda il **rischio di concentrazione sul fornitore**: quando una terza parte gestisce l'infrastruttura che coordina le tue sessioni e conserva i dati del tuo account, una compromissione lì è qualcosa che non hai scelto e che non potevi impedire.

## Le truffe di ingegneria sociale sono un rischio a parte

Per la maggior parte delle persone, il pericolo più grande legato ad AnyDesk è l'ingegneria sociale, non una CVE. L'[FBI avverte che i truffatori del finto supporto tecnico inducono le vittime a installare software di accesso remoto](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) per poi abusare dell'accesso ottenuto, e AnyDesk pubblica [indicazioni per prevenire gli abusi](https://anydesk.com/en/abuse-prevention) proprio per questo motivo. Il rischio riguarda chi è autorizzato a connettersi, non la robustezza della crittografia della sessione.

Perché proprio AnyDesk? È gratuito, si installa in pochi secondi e, soprattutto, la persona che viene _controllata_ non deve creare un account. Questa facilità è un vantaggio per l'assistenza legittima e un regalo per i truffatori, che telefonano o scrivono a un bersaglio, inventano un «problema» urgente e lo guidano passo dopo passo fino a concedere il pieno controllo remoto.

È il punto di equità che si perde nei titoli allarmistici: **si tratta di un rischio legato all'uso, non di una vulnerabilità di AnyDesk.** Lo stesso identico trucco funziona con TeamViewer, Chrome Remote Desktop o RustDesk. Nessuna quantità di AES ti protegge se consegni volontariamente le chiavi a uno sconosciuto al telefono. Se vuoi la strategia difensiva, l'abbiamo descritta a parte in [come riconoscere ed evitare le truffe del desktop remoto](/it/blog/truffe-del-desktop-remoto-come-riconoscerle-ed-evitarle), e lo stesso ragionamento vale per la domanda [se Chrome Remote Desktop sia sicuro](/it/blog/chrome-remote-desktop-e-sicuro-una-recensione-onesta).

## Codice chiuso e mediazione cloud: la questione della fiducia

È qui che il modello di AnyDesk e quello di RustDesk si separano: non sulla qualità della crittografia, ma su _ciò che devi accettare sulla fiducia._

AnyDesk è proprietario. Non puoi leggere il codice sorgente del client, compilarlo tu stesso o verificarne in modo indipendente il funzionamento; ti fidi di AnyDesk sul fatto che il binario si comporti come dichiarato. E, per impostazione predefinita, le tue sessioni sono mediate dal cloud di AnyDesk, quindi disponibilità e sicurezza di quell'infrastruttura sono nelle mani del fornitore, come ha dimostrato il 2024. AnyDesk Ultimate offre un'appliance on-premises, che riduce questo divario per chi la acquista.

RustDesk parte dal lato opposto di entrambe queste scommesse. Il client RustDesk e RustDesk Server OSS (il server community gratuito) sono [open source con licenza AGPL](https://github.com/rustdesk/rustdesk); Server Pro è un software server self-hosted commerciale e proprietario. Il client è verificabile e compilabile, quindi non devi accettare sulla fiducia un binario proprietario. E poiché puoi [fare self-hosting](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto) di ID/rendezvous e relay, l'infrastruttura che media le tue sessioni è tua e non di terzi: proprio l'esposizione al rischio di concentrazione sul fornitore che il 2024 ha reso concreta. Questo supporta anche una [progettazione orientata alla sovranità dei dati](/it/blog/sovranita-dei-dati-del-desktop-remoto-e-gdpr-self-hosting).

Per essere altrettanto equi: così la fiducia si sposta, non scompare. Poiché il codice è aperto, anche i difetti di RustDesk sono pubblici, quindi segui le [ultime release](https://github.com/rustdesk/rustdesk/releases) e i registri delle vulnerabilità. E un'infrastruttura verificabile e self-hosted è un punto di partenza, non una garanzia: le sessioni continuano a passare direttamente tra gli endpoint, e le patch del server toccano a te.

## Quindi, AnyDesk è sicuro?

Per un uso consapevole e legittimo, sì. AnyDesk è un prodotto maturo, con una crittografia di livello standard e controlli dell'account sensati. Tienilo aggiornato, proteggi l'accesso non presidiato con l'autenticazione a due fattori, limita le connessioni in entrata con l'elenco di controllo degli accessi e verifica ogni richiesta di assistenza.

Le riserve riguardano la fiducia, non la cifratura. Il suo modello predefinito, closed source e coordinato dal cloud, significa affidarsi alla sicurezza operativa di AnyDesk, che nel 2024 ha subito un colpo reale; Ultimate On-Premises riduce questo divario. Se il compromesso non ti convince, [un'alternativa self-hosted a TeamViewer e AnyDesk](/it/blog/la-migliore-alternativa-self-hosted-a-teamviewer) cambia la base delle garanzie: codice verificabile e coordinamento sotto il tuo controllo, al prezzo di gestire un server in proprio.

Qualunque strumento tu scelga, la regola che previene i danni maggiori è anche la più economica: non installare mai software di accesso remoto perché te lo ha chiesto qualcuno che ha contattato _te_.
