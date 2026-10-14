---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T10:47:00Z
lang: it
translationKey: rustdesk-scale-50000-200000-devices
draft: false
title: 'RustDesk può scalare fino a 200.000 dispositivi?'
excerpt: 'Il contesto operativo di prima mano di RustDesk per pianificare grandi flotte: cosa mostra l''osservazione sul server pubblico e cosa deve ancora verificare un rollout self-hosted.'
image: ~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.webp
category: 'Distribuzione'
tags: ['RustDesk', 'Distribuzione', 'Aziende']
author: 'RustDesk Team'
slug: 'rustdesk-puo-scalare-fino-a-200-000-dispositivi'
faq:
  - question: 'Quanti dispositivi può gestire un server RustDesk self-hosted?'
    answer: 'Il server pubblico di RustDesk ha registrato più di due milioni di endpoint online su un unico host con 12 core e 32 GB di RAM il 7 luglio 2026 (telemetria interna, non un benchmark verificato). Per RustDesk Server Pro, considera 200.000 dispositivi un obiettivo di pianificazione e verifica in un pilota il carico su database, console e relay.'
  - question: 'Cosa bisogna ottimizzare per raggiungere 200.000 dispositivi?'
    answer: 'A 200.000 dispositivi contano soprattutto le scritture sul database, la capacità dei relay e il carico della console. Esegui test di carico di RustDesk Server Pro per fasi, misurando il ricambio dei dispositivi online, le sessioni remote simultanee, la banda dei relay, il caching, le prestazioni di scrittura del database e l''attività della console di gestione, con il tuo carico di lavoro reale e non solo con la presenza degli endpoint.'
  - question: 'RustDesk Server Pro supporta l''alta disponibilità o il bilanciamento del carico?'
    answer: 'Sì, per i relay: RustDesk Server Pro supporta più server relay distribuiti per regione, e i relay hbbr non richiedono licenza. Una licenza Pro è vincolata a un solo server hbbs (ID/rendezvous), quindi l''alta disponibilità del server ID e del database va progettata; pianifica failover e ripristino con RustDesk prima del rollout.'

metadata:
  description: 'Il contesto operativo di prima mano di RustDesk per pianificare 200.000 dispositivi e le variabili di carico che un''installazione Server Pro deve verificare.'
  keywords: 'rustdesk scalabilità 200000 dispositivi, rustdesk 50000 dispositivi, scalabilità server rustdesk self-hosted, implementazione aziendale rustdesk, capacità rustdesk server pro, desktop remoto per grandi flotte'
---

La telemetria interna di RustDesk ha registrato **più di due milioni di endpoint online** su un unico host del server pubblico con **CPU a 12 core e 32 GB di RAM**, il 7 luglio 2026.

Due precisazioni ne definiscono la portata. Primo, per «endpoint online» si intendono i dispositivi risultati online in quel momento, non due milioni di sessioni di controllo remoto simultanee. Secondo, è un'osservazione interna in produzione, non un benchmark verificato in modo indipendente né una garanzia per Server Pro: un'installazione Server Pro aggiunge scritture sul database, attività di audit, uso della console, elaborazione delle policy e traffico dei relay.

## La risposta breve

**200.000 dispositivi online sono un obiettivo di pianificazione realistico per Server Pro.** L'osservazione sul server pubblico citata sopra è di un ordine di grandezza superiore, su un unico host con 12 core e 32 GB. Ciò che verifichi in un pilota è il carico che Server Pro aggiunge alla semplice presenza degli endpoint: ricambio dei dispositivi, policy, scritture di audit, uso della console e sessioni simultanee inoltrate dal relay.

## Nel dettaglio

Le domande sulla scalabilità sono tra le più frequenti che riceviamo dai team IT che migrano da TeamViewer o AnyDesk, soprattutto da chi pianifica flotte di decine o centinaia di migliaia di dispositivi. La risposta dipende da quanti dispositivi restano online, da quanto spesso cambia il loro stato, da quante sessioni remote sono attive contemporaneamente e da quanto traffico passa dal relay.

Per un rollout di Server Pro, verifica gli aspetti che il dato del server pubblico non copre. Il caching e le prestazioni di scrittura del database contano man mano che i dispositivi si connettono e si disconnettono. Banda e CPU dei relay dipendono dal numero, dalla durata, dalla risoluzione e dal codec delle sessioni simultanee inoltrate. Query della console, conservazione dei log di audit, gruppi di dispositivi, policy e integrazioni aggiungono un carico che la sola presenza degli endpoint non misura. In un test di carico rappresentativo, considera il numero previsto di dispositivi online, il ricambio delle connessioni, le sessioni simultanee dirette e inoltrate, la conservazione dei dati nel database e l'attività amministrativa.

Per un pilota di Server Pro ripetibile, annota versioni di client e server, hardware, posizione del database e dei relay. Aumenta per fasi la presenza e il ricambio dei dispositivi online mentre esegui le query della console, gli aggiornamenti delle policy e le scritture di audit previsti. Misura il successo di registrazione e riconnessione, il tempo di avvio della connessione, la latenza del database, CPU/RAM, la crescita del disco e il throughput dei relay. Includi il picco di sessioni simultanee e una prova di ripristino, e tieni queste misure separate dal numero di endpoint online.

Alta disponibilità e bilanciamento del carico meritano lo stesso trattamento. I relay scalano orizzontalmente: puoi eseguirne diversi, distribuirli per regione, e i relay hbbr non richiedono licenza. Una licenza Pro è vincolata a un solo server hbbs, quindi progetta esplicitamente il failover del server ID e del database e, per flotte molto grandi, rivedilo con RustDesk.

Poi dimensiona le licenze: Server Pro concede le licenze in base a utenti con login e dispositivi gestiti, e i piani standard includono connessioni simultanee illimitate. Scegli il piano adatto alla tua flotta su [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Chi si pone questa domanda

Gli architetti che pianificano rollout pluriennali di flotte, presso aziende, grandi [MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile) e programmi IT del settore pubblico, mettono questa domanda ai primi posti della loro due diligence. Di solito stanno abbandonando uno strumento commerciale per motivi di costo o di sovranità dei dati e devono avere la certezza che una piattaforma self-hosted crescerà con loro, invece di andare a sbattere contro un limite a metà contratto.

## Domande correlate

- Limiti di connessioni simultanee e licenze per grandi numeri di dispositivi: vedi i [prezzi di RustDesk](https://rustdesk.com/pricing).
- [Posso migrare a RustDesk una flotta TeamViewer o AnyDesk esistente?](/it/blog/la-migliore-alternativa-self-hosted-a-teamviewer)

Stai pianificando un rollout su larga scala? Contatta il [team RustDesk](mailto:sales@rustdesk.com) per dimensionare un'installazione self-hosted in base al numero di dispositivi, ai requisiti di prestazioni e ai tempi di crescita.
