---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-06T08:31:00Z
lang: 'it'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: "RustDesk «Connesso, in attesa dell'immagine»: guida completa alla risoluzione"
excerpt: "Diagnostica «Connesso, in attesa dell'immagine» in RustDesk: disponibilità del display, permessi di cattura, codec, driver GPU, build Wayland e connettività del relay."
image: '~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp'
category: 'Risoluzione dei problemi'
tags: ['RustDesk', 'Risoluzione dei problemi']
author: 'RustDesk Team'
slug: 'rustdesk-connesso-in-attesa-dellimmagine-guida-completa-alla-risoluzione'
faq:
  - question: "Perché RustDesk mostra «Connesso, in attesa dell'immagine»?"
    answer: 'La sessione si è connessa, ma non arriva alcuna immagine. La causa segnalata più spesso è che la macchina remota non ha nulla da catturare: nessun monitor, un display in sospensione o il permesso di registrazione dello schermo mancante. Collega un monitor, un dummy plug HDMI o un display virtuale, riattiva lo schermo, concedi il permesso e poi prova un altro codec, come VP9.'
  - question: "Come risolvo il problema di RustDesk in attesa dell'immagine su un computer headless?"
    answer: "Dai al computer headless un display da catturare. Collega un monitor o un economico dummy plug HDMI, che fa comportare la GPU come se fosse collegato un display, oppure configura un display virtuale. Poi mantieni il display attivo, verifica il permesso di cattura dello schermo e, se l'immagine ancora non compare, passa a un codec software come VP9."
  - question: 'Cambiare il codec video risolve lo schermo nero?'
    answer: "Spesso sì. Nella barra degli strumenti della sessione remota o nelle impostazioni puoi cambiare codec: VP8, VP9, AV1 o H.264/H.265 dove l'hardware li supporta. Un codec che l'hardware remoto non riesce a codificare mostra un'immagine vuota o bloccata, e tornare a un codec software come VP9 di solito ripristina l'immagine."
  - question: "RustDesk mostra l'immagine su un PC ma non su un altro. Perché?"
    answer: "Una differenza tra due PC indica qualcosa di locale sulla macchina che non funziona: un display assente o in sospensione, il permesso di registrazione dello schermo mancante su macOS, un driver GPU obsoleto, un conflitto di accelerazione hardware o un codec che l'hardware non riesce a gestire. Applica le soluzioni per causa sulla macchina che presenta il problema, non su quella che funziona."
  - question: "Il mio server self-hosted può causare «in attesa dell'immagine»?"
    answer: "Di solito no. Quando RustDesk mostra «Connesso, in attesa dell'immagine», il server ID ha già fatto il suo lavoro. Una porta del relay bloccata o un relay sovraccarico possono però bloccare il flusso video. Su un server self-hosted consenti TCP 21115-21117 e UDP 21116, e consenti TCP 21118-21119 solo se usi client WebSocket."

metadata:
  description: "RustDesk «Connesso, in attesa dell'immagine»? Risolvi lo schermo nero: display headless, sospensione/blocco, codec, driver GPU, Wayland e porte del firewall."
  keywords: "RustDesk connesso in attesa dell'immagine, RustDesk schermo nero, soluzione RustDesk in attesa dell'immagine, RustDesk nessuna immagine, RustDesk dummy plug HDMI, codec video RustDesk, accelerazione hardware RustDesk"
---

Se RustDesk mostra **«Connesso, in attesa dell'immagine»** e poi uno schermo nero, la parte difficile ha già funzionato: i due capi si sono trovati e la sessione è stabilita. Quello che manca è l'_immagine_. Il più delle volte la macchina remota non ha nulla da catturare; meno spesso è un codec, un driver GPU o il percorso del relay a bloccare il flusso. Questa guida analizza ogni causa, dalla più segnalata ai casi limite, con una soluzione concreta per ciascuna.

## La risposta breve

La sessione si è connessa, ma non arriva alcuna immagine. La causa segnalata più spesso è una macchina remota che non ha nulla da catturare: **nessun monitor, un display in sospensione o il permesso di registrazione dello schermo mancante**. Fornisci a RustDesk un display reale e attivo (un monitor, un dummy plug HDMI o un display virtuale) e il permesso corretto, poi passa a un altro codec, come VP9, se l'immagine ancora non compare. Se resta tutto nero, aggiorna il driver della GPU e verifica che le porte del relay siano raggiungibili.

## Inizia da qui: c'è qualcosa da catturare?

La causa segnalata più spesso è una **macchina headless**: un server, un mini-PC o una workstation in funzione senza monitor collegato, oppure con il display in sospensione. Senza un display attivo spesso non c'è alcun framebuffer da catturare, quindi RustDesk si connette ma non ha nulla da inviare. Lo schema ricorre di continuo nell'issue tracker di RustDesk, comprese le [segnalazioni di schermate nere proprio quando il monitor del dispositivo di destinazione è spento](https://github.com/rustdesk/rustdesk/issues/9884) e la lunga discussione [«Connected, waiting for image»](https://github.com/rustdesk/rustdesk/issues/222).

Due modi per darle qualcosa da catturare:

- **Collega un monitor** e assicurati che sia acceso e attivo.
- **Usa un dummy plug HDMI (o DisplayPort).** Questi adattatori economici fanno credere alla GPU che un display sia collegato, così continua a renderizzare un framebuffer che RustDesk può catturare. È la soluzione standard per desktop headless e server domestici.

Se un monitor _è_ collegato, il prossimo sospettato è che sia andato in sospensione.

## Soluzione per causa

| Causa                               | Segnale                                  | Soluzione                                                                                                                                                  |
| ----------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / nessun display           | Schermo nero su un server o mini-PC      | Collega un monitor o aggiungi un dummy plug HDMI                                                                                                           |
| Schermo in sospensione / bloccato   | Funzionava prima, nero dopo l'inattività | Riattiva lo schermo; mantieni il display attivo nelle ore di accesso; lascia attivo il blocco protetto da password                                         |
| Permesso mancante (macOS)           | Si connette, nero permanente             | Concedi Registrazione schermo in Privacy e sicurezza; installa l'helper per la schermata di login                                                          |
| Codec non compatibile               | Immagine vuota o bloccata                | Cambia codec (VP8 / VP9 / AV1 / H.264 / H.265); torna a un codec software                                                                                  |
| Conflitto di accelerazione hardware | Nero su GPU specifiche                   | Disattiva il codec hardware nella barra della sessione o nelle Impostazioni, oppure cambia codec                                                           |
| Driver GPU obsoleto                 | Nero dopo un aggiornamento di driver/SO  | Aggiorna il driver della GPU (soprattutto NVIDIA)                                                                                                          |
| Sessione Wayland (Linux)            | Nessuna richiesta di consenso, vuoto     | Accetta la richiesta di PipeWire/portale e verifica che il desktop portal sia installato; funziona anche una sessione X11, dove la distro la offre ancora |
| Blocco di rete / relay              | Resta su «in attesa dell'immagine»       | Consenti TCP 21115-21117 e UDP 21116; aggiungi TCP 21118-21119 per i client WebSocket                                                                      |

### Sospensione, blocco e screensaver dello schermo

Se funzionava prima ed è diventato nero dopo un periodo di inattività della macchina, il display è andato in sospensione.

- **Windows:** imposta il piano di alimentazione in modo che display e macchina restino attivi nelle ore in cui ti serve l'accesso remoto. Con RustDesk installato come servizio puoi connetterti anche dalla schermata di blocco, quindi lascia attivo il blocco protetto da password.
- **macOS:** impedisci al display di andare in sospensione nelle ore in cui ti serve l'accesso remoto: impostalo in **Impostazioni di Sistema → Monitor** (o nelle impostazioni Schermata di blocco / Energia) e tieni il Mac collegato all'alimentatore, perché a batteria la sospensione si comporta diversamente.
- **Android:** lo schermo deve essere acceso per poter essere condiviso, quindi tocca il display per riattivarlo prima di connetterti. Connettersi da iOS a un dispositivo Android in stand-by con lo schermo spento è un [caso noto di «in attesa dell'immagine»](https://github.com/rustdesk/rustdesk/issues/11479): riattiva prima il dispositivo di destinazione.

### Permessi di macOS

macOS non permette a nessuna app di registrare lo schermo senza un consenso esplicito. Se RustDesk si connette ma resta nero su un Mac, apri **Impostazioni di Sistema → Privacy e sicurezza → Registrazione schermo**, abilita RustDesk e riavvia l'app. Uno schermo nero proprio _nella finestra di login_ significa che il servizio/helper di RustDesk non è installato per funzionare prima che un utente effettui l'accesso: installalo per la cattura prima del login.

### Codec video non compatibile

RustDesk può codificare il flusso in diversi modi, e l'opzione predefinita non sempre è adatta all'hardware remoto. Nella barra degli strumenti della sessione (o nelle Impostazioni), cambia il codec (**VP8, VP9, AV1 o H.264/H.265 dove l'hardware li supporta**) e verifica se l'immagine compare. Se un codec hardware produce un'immagine vuota su una determinata GPU, tornare a un codec software come VP9 è la mossa più affidabile.

### Accelerazione hardware e driver GPU

Alcune GPU (le configurazioni NVIDIA sono quelle che ricorrono più spesso) entrano in conflitto con i percorsi di cattura e rendering accelerati via hardware di RustDesk. Ci sono due leve:

- **Disattiva il codec hardware.** Nella barra degli strumenti della sessione (o nelle Impostazioni), disattiva **Abilita codec hardware** in modo che la codifica passi a un percorso software: su molte GPU problematiche questo elimina lo schermo nero.
- **Aggiorna il driver della GPU.** Uno schermo nero comparso dopo un aggiornamento del driver o del sistema operativo si risolve spesso passando a un driver aggiornato, in particolare su hardware NVIDIA.

### Linux e Wayland

Su Linux, le build standard di RustDesk catturano i desktop Wayland, monitor multipli inclusi dalla versione 1.4.3, tramite **PipeWire e `xdg-desktop-portal`** in una sessione con utente connesso. Il portale ti chiede di scegliere un display da condividere, e dalla versione 4 del portale la scelta può essere memorizzata. Se su Wayland ottieni uno schermo vuoto, accetta la richiesta di condivisione dello schermo del portale e verifica che `xdg-desktop-portal` e PipeWire siano installati e in esecuzione. Anche accedere con una sessione X11/Xorg evita il percorso del portale, dove la distribuzione la offre ancora. Uno schermo nero nella schermata di login è normale con le build standard, che catturano la sessione dell'utente connesso; la [build di anteprima Wayland per l'accesso non presidiato](/it/blog/unattended-remote-access-wayland-it), separata e destinata a **sistemi x86_64 basati su Debian/Ubuntu**, aggiunge l'accesso non presidiato e l'accesso alla schermata di login dopo un riavvio.

### Rete e relay

Poiché il messaggio contiene la parola «connesso», la sessione di solito è già attiva, ma il _video_ può comunque bloccarsi se il relay è sovraccarico o una porta del relay è bloccata. Per il percorso server standard, assicurati che **TCP 21115-21117 e UDP 21116** siano raggiungibili da un capo all'altro. Apri **TCP 21118-21119 solo se usi client WebSocket**. Il server demo pubblico è condiviso e il suo throughput non è garantito, quindi se usi RustDesk ogni giorno, ospitare in proprio il relay ti dà il controllo su capacità e monitoraggio. Se è la sessione stessa a cadere o a non stabilirsi mai, il problema è un altro: consulta le [FAQ di RustDesk Server Pro](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/faq/).

## Mantieni tutto aggiornato

Le build vecchie si portano dietro vecchi bug di cattura. Aggiorna all'ultima versione **sia** il client che controlla sia quello controllato e, se fai self-hosting, aggiorna anche il server. Diverse segnalazioni di schermo nero scompaiono semplicemente dopo un aggiornamento su entrambi i lati.

## Il vantaggio open source

Quando uno schermo nero resiste alla checklist, RustDesk ti offre qualcosa che gli strumenti closed-source non offrono: il codice di cattura vero e proprio, con licenza AGPL. Tu (o un consulente) puoi leggere esattamente come funziona la cattura sulla tua piattaforma, riprodurre il problema e aprire una segnalazione precisa nel repository pubblico, invece di aspettare in coda al supporto di un fornitore.

## Meno variabili quando il server è tuo

Gestisci [il tuo relay e il tuo server ID](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto), e l'infrastruttura pubblica condivisa esce di scena: un'incognita in meno quando stai inseguendo un problema di cattura, e il pieno controllo sulle parti che puoi ottimizzare. È un vantaggio discreto che si aggiunge al controllo dei dati.
