---
publishDate: 2026-10-14T00:00:00Z
lang: it
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0: connessioni dirette WebRTC e miglioramenti al QoS'
excerpt: 'RustDesk 1.5.0 aggiunge percorsi WebRTC, accesso diretto dal client Web e aggiorna il QoS per ritardo, congestione e obiettivi FPS.'
image: ~/assets/images/blog/web-client.jpg
category: Rilascio
slug: rustdesk-1-5-0-webrtc-qos-it
tags:
  - WebRTC
  - QoS
  - client Web
  - rilascio
---

Di recente abbiamo condiviso un’esperienza concreta: dopo l’aggiornamento alla versione 1.5.0, accedere a un Mac a casa da un altro continente è sembrato più fluido di prima. Il [post originale](https://x.com/rustdesk/status/2110243829978898520) descrive quell’esperienza. Ecco le modifiche specifiche introdotte nella versione 1.5.0 per la connessione e l’adattamento della trasmissione dello schermo.

La [PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) ha introdotto il supporto a WebRTC Data Channel, avviando i tentativi di connessione ICE in parallelo all’hole punching TCP e UDP e ai percorsi diretti IPv6 già disponibili. Quando un relay è pronto ma un tentativo di connessione diretta è ancora in corso, RustDesk mantiene un breve intervallo di preferenza per la connessione diretta. Può usare il relay allo scadere di questo intervallo o se i tentativi diretti falliscono. Questo offre ulteriori possibilità di connessione diretta ad alcune connessioni che prima richiedevano un relay.

**Anche il client Web può ora connettersi direttamente.** In precedenza, le sessioni RustDesk nel browser dovevano passare attraverso un server relay. Quando le condizioni di rete lo consentono e ICE seleziona un percorso diretto, i dati della sessione possono ora viaggiare direttamente tra il browser e il dispositivo remoto, evitando potenzialmente la latenza e i limiti di larghezza di banda del relay. Una connessione WebRTC inoltrata tramite TURN rimane una connessione tramite relay. L’integrazione trasporta il protocollo RustDesk tramite Data Channel; RustDesk continua a occuparsi della codifica e della decodifica video.

Le modifiche al QoS provengono dalla [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082). Affrontano il comportamento della vecchia logica, che riduceva bruscamente la frequenza dei fotogrammi dopo una sola risposta lenta o un breve blocco, per poi recuperare lentamente. Le modifiche della versione 1.5.0 includono:

- **Migliore riferimento per il ritardo.** Usa il valore di riferimento a basso ritardo di ciascuna connessione fin dalla prima risposta, adattandolo gradualmente alle variazioni stabili del ritardo di base per ridurre le valutazioni errate sui collegamenti ad alta latenza.
- **Conferma delle normali oscillazioni del ritardo.** Le riduzioni ordinarie della frequenza dei fotogrammi richiedono tre risposte consecutive con valori sfavorevoli. Un ritardo in eccesso molto elevato e i timeout delle sonde possono comunque attivare riduzioni più rapide.
- **Priorità al bitrate quando le condizioni lo consentono.** Durante i normali adeguamenti alla congestione, riduce prima il bitrate se il bitrate adattivo è abilitato e può ancora diminuire, invece di affidarsi soltanto a un numero minore di fotogrammi con un codificatore che mantiene il proprio bitrate obiettivo.
- **Avvio e recupero dell’obiettivo di frequenza dei fotogrammi più rapidi.** Due risposte consecutive con un basso ritardo in eccesso su un collegamento senza congestione possono accelerare l’aumento dell’obiettivo durante l’avvio. Dopo una congestione, due risposte favorevoli possono ripristinare il precedente obiettivo di frequenza dei fotogrammi. Il controller annulla il ripristino se la congestione si ripresenta rapidamente.

Queste logiche utilizzano un feedback sul ritardo che condivide il percorso della trasmissione dello schermo. Il feedback include i dati in attesa nel trasporto, il tempo di andata e ritorno sulla rete e la pianificazione delle risposte del client. Segnala le variazioni di carico, senza misurare isolatamente il ritardo di accodamento. [Implementazione del QoS nella versione 1.5.0](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs).

Per la modifica che accelera l’avvio, l’autore della PR ha confrontato la modifica con il suo commit padre in un test su un collegamento locale in ufficio: il tempo di avvio per raggiungere l’**obiettivo di 60 FPS** è sceso da **7,99 secondi a 2,98 secondi**. Questa misurazione riguarda l’effetto della modifica sull’aumento progressivo dell’obiettivo di frequenza dei fotogrammi durante l’avvio in quel test. [Resoconto del test](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117).

Aggiorna a [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0), oppure prova il nuovo percorso di connessione nel [client Web](https://rustdesk.com/web). WebRTC richiede il supporto di entrambi i peer e del server. È disabilitato per impostazione predefinita per i server self-hosted; abilita esplicitamente `enable-webrtc=Y`. Per Server Pro, la documentazione indica il supporto a partire dalla versione 1.8.7. Consulta la [guida alle impostazioni](https://rustdesk.com/docs/it/self-host/client-configuration/advanced-settings/#enable-webrtc) per la configurazione.
