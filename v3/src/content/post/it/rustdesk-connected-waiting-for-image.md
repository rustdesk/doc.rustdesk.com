---
publishDate: 2026-07-06T08:31:00Z
lang: 'it'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: "RustDesk «Connesso, in attesa dell'immagine»: guida completa alla risoluzione"
excerpt: "«Connesso, in attesa dell'immagine» significa che lo schermo remoto non viene catturato. Ecco tutte le cause — macchine headless, sospensione, codec, driver — e la relativa soluzione."
image: '~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp'
category: 'Risoluzione dei problemi'
tags: ['RustDesk', 'Risoluzione dei problemi']
author: 'RustDesk Team'
slug: 'rustdesk-connesso-in-attesa-dellimmagine-guida-completa-alla-risoluzione'
faq:
  - question: "Perché RustDesk mostra «Connesso, in attesa dell'immagine»?"
    answer: "La sessione si è stabilita correttamente, ma la macchina remota non sta producendo un'immagine dello schermo da inviare. Il motivo più comune è l'assenza di un display attivo da catturare: un server headless senza monitor, uno schermo andato in sospensione o bloccato, oppure un display che il sistema operativo non permette a RustDesk di registrare. Risolvi la sorgente di acquisizione e l'immagine apparirà."
  - question: "Come risolvo il problema di RustDesk in attesa dell'immagine su un computer headless?"
    answer: 'Una macchina senza monitor non ha alcun framebuffer da catturare, quindi RustDesk non ha nulla da inviare. Collega un monitor reale, inserisci un economico dummy plug HDMI che fa credere alla GPU che un display sia collegato, oppure su Linux usa la configurazione headless documentata (github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Riattivare o mantenere attivo il display risolve la maggior parte dei casi.'
  - question: 'Cambiare il codec video risolve lo schermo nero?'
    answer: "Spesso sì. Nella barra degli strumenti della sessione remota o nelle impostazioni puoi cambiare codec — VP8, VP9, AV1 o H.264/H.265 dove l'hardware lo supporta. Un codec che l'hardware remoto non riesce a codificare mostrerà un'immagine vuota o bloccata, e tornare a un codec software come VP9 di solito ripristina l'immagine."
  - question: "RustDesk mostra l'immagine su un PC ma non su un altro. Perché?"
    answer: "Questo indica un problema locale sulla macchina che non funziona: un display assente o in sospensione, un permesso di registrazione schermo mancante su macOS, un driver GPU obsoleto, un conflitto di accelerazione hardware, oppure un codec che l'hardware non riesce a gestire. Percorri le soluzioni per ciascuna causa in questa guida sulla macchina che presenta il problema, non su quella che funziona."
  - question: "Il mio server self-hosted può causare «in attesa dell'immagine»?"
    answer: 'Di solito, quando vedi questo messaggio, la sessione è già connessa, quindi il server sta svolgendo il suo compito. Ma un relay pubblico sovraccarico o una porta relay bloccata possono bloccare lo stream video. Per il percorso server standard, consenti TCP 21115-21117 e UDP 21116; apri anche TCP 21118-21119 solo se utilizzi client WebSocket. Valuta di self-hostare il relay per un throughput più costante.'

metadata:
  description: "«RustDesk connesso, in attesa dell'immagine»? Risolvi lo schermo nero: display headless, sospensione/blocco, codec video, driver GPU, Wayland e porte del firewall."
  keywords: "RustDesk connesso in attesa dell'immagine, RustDesk schermo nero, soluzione RustDesk in attesa dell'immagine, RustDesk nessuna immagine, RustDesk dummy plug HDMI, codec video RustDesk, accelerazione hardware RustDesk"
---

Se RustDesk mostra **«Connesso, in attesa dell'immagine»** e poi uno schermo nero, la buona notizia è che la parte difficile ha già funzionato: i due capi si sono trovati e la sessione è stabilita. Quello che manca è l'_immagine_. Qualcosa sulla macchina remota non sta producendo un'immagine dello schermo da inviare. Questa guida analizza ogni causa nota, dalla più comune ai casi limite, con una soluzione concreta per ciascuna.

## La risposta breve

La sessione si è connessa, ma non c'è alcun framebuffer da catturare. Su una macchina remota **senza monitor, con un display in sospensione o bloccato, oppure uno schermo che il sistema operativo non permette a RustDesk di registrare**, lo stream video non ha nulla da codificare. Fornisci a RustDesk un display reale e attivo da catturare — un monitor, un dummy plug HDMI, il permesso corretto o un codec compatibile — e l'immagine apparirà.

## Inizia da qui: c'è qualcosa da catturare?

La causa di gran lunga più segnalata è una **macchina headless** — un server, un mini-PC o una workstation in funzione senza monitor collegato, oppure con il display in sospensione. Senza un display attivo, la GPU non produce alcun framebuffer, quindi RustDesk si connette ma non ha nulla da inviare. Questo schema ricorre ripetutamente nell'issue tracker di RustDesk, comprese le [segnalazioni di schermate nere specificamente quando il monitor del dispositivo di destinazione è spento](https://github.com/rustdesk/rustdesk/issues/9884) e la lunga discussione ["Connected, waiting for image"](https://github.com/rustdesk/rustdesk/issues/222).

Tre modi per darle qualcosa da catturare:

- **Collega un monitor** e assicurati che sia acceso e attivo.
- **Usa un dummy plug HDMI (o DisplayPort).** Questi adattatori economici fanno credere alla GPU che un display sia collegato, così continua a renderizzare un framebuffer che RustDesk può catturare. È la soluzione standard per desktop headless e server domestici.
- **Su Linux, segui il percorso headless documentato.** RustDesk supporta le configurazioni Linux headless, ma la configurazione differisce da una normale sessione desktop — consulta il [wiki Headless Linux Support](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support).

Se un monitor _è_ effettivamente collegato, il prossimo sospettato è che sia andato in sospensione.

## Soluzione per causa

| Causa                               | Segnale                                  | Soluzione                                                                                                                                                |
| ----------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / nessun display           | Schermo nero su un server o mini-PC      | Collega un monitor, aggiungi un dummy plug HDMI o usa il percorso headless su Linux                                                                      |
| Schermo in sospensione / bloccato   | Funzionava prima, nero dopo l'inattività | Riattiva lo schermo; disattiva sospensione/screensaver; su macOS blocca la sospensione del display nelle Impostazioni                                    |
| Permesso mancante (macOS)           | Si connette, nero permanente             | Concedi la Registrazione dello schermo in Privacy e sicurezza; installa l'helper per la schermata di login                                               |
| Codec non compatibile               | Immagine vuota o bloccata                | Cambia codec (VP8 / VP9 / AV1 / H.264 / H.265); torna a un codec software                                                                                |
| Conflitto di accelerazione hardware | Nero su GPU specifiche                   | Disattiva il codec hardware nella barra della sessione o nelle Impostazioni, oppure cambia codec                                                         |
| Driver GPU obsoleto                 | Nero dopo un aggiornamento di driver/SO  | Aggiorna il driver della GPU (soprattutto NVIDIA)                                                                                                        |
| Sessione Wayland (Linux)            | Nessuna richiesta di consenso, vuoto     | Accetta la richiesta di PipeWire/portal e verifica che il desktop portal sia installato; funziona anche una sessione X11 dove una distro la offre ancora |
| Blocco di rete / relay              | Resta su «in attesa dell'immagine»       | Consenti TCP 21115-21117 e UDP 21116; aggiungi TCP 21118-21119 per i client WebSocket                                                                    |

### Sospensione, blocco e screensaver dello schermo

Se funzionava prima ed è diventato nero dopo un periodo di inattività della macchina, il display è andato in sospensione.

- **Windows:** imposta il piano di alimentazione in modo che display e macchina non vadano mai in sospensione durante le ore in cui ti serve l'accesso remoto, e disattiva lo screensaver (oppure impostalo in modo che non richieda una password durante la sessione).
- **macOS:** impedisci al display di andare in sospensione durante le ore in cui ti serve l'accesso remoto — impostalo in **Impostazioni di Sistema → Monitor** (o nelle impostazioni di Blocco schermo / Energia), e mantieni il Mac collegato all'alimentatore, poiché la sospensione si comporta diversamente a batteria.
- **Android:** lo schermo deve essere acceso per poter essere condiviso, quindi tocca il display per riattivarlo prima di connetterti. Connettersi da iOS a un dispositivo Android in stand-by con lo schermo spento è un [caso noto di «in attesa dell'immagine»](https://github.com/rustdesk/rustdesk/issues/11479) — riattiva prima il dispositivo di destinazione.

### Permessi di macOS

macOS non permette a nessuna app di registrare lo schermo senza un consenso esplicito. Se RustDesk si connette ma rimane nero su un Mac, apri **Impostazioni di Sistema → Privacy e sicurezza → Registrazione dello schermo** e abilita RustDesk, quindi riavvia l'app. Uno schermo nero specificamente _nella schermata di login_ significa che il servizio/helper di RustDesk non è installato per essere eseguito prima che un utente effettui l'accesso — installalo per la cattura pre-login.

### Codec video non compatibile

RustDesk può codificare lo stream in diversi modi, e l'opzione predefinita non sempre è adatta all'hardware remoto. Nella barra degli strumenti della sessione (o nelle Impostazioni), cambia il codec — **VP8, VP9, AV1 o H.264/H.265 dove l'hardware li supporta** — e verifica se l'immagine appare. Se un codec hardware produce un'immagine vuota su una GPU specifica, tornare a un codec software come VP9 è la mossa più affidabile.

### Accelerazione hardware e driver GPU

Alcune GPU — le configurazioni NVIDIA sono quelle che ricorrono più spesso — entrano in conflitto con i percorsi di cattura e rendering accelerati via hardware di RustDesk. Due leve possono aiutare:

- **Disattiva il codec hardware.** Nella barra degli strumenti della sessione (o nelle Impostazioni), disabilita **Usa codec hardware** in modo che la codifica torni a un percorso software — questo risolve lo schermo nero su molte GPU problematiche.
- **Aggiorna il driver della GPU.** Uno schermo nero comparso dopo un aggiornamento di driver o del sistema operativo si risolve spesso passando a un driver aggiornato, in particolare su hardware NVIDIA.

### Linux e Wayland

Su Linux, **la cattura dello schermo su Wayland passa attraverso PipeWire e `xdg-desktop-portal`**: la prima volta chiede il consenso per scegliere un display — nella maggior parte dei casi la scelta viene memorizzata, quindi non richiede più la conferma — e funziona all'interno di una sessione di accesso attiva. Si tratta di una scelta di sicurezza propria di Wayland, quindi di per sé non copre la schermata di login (greeter) né una macchina realmente headless — anche se la cattura Wayland non presidiata è in fase di sviluppo attivo ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Se ottieni uno schermo vuoto su Wayland, la soluzione di solito è accettare la richiesta di condivisione schermo del portal e verificare che `xdg-desktop-portal` e PipeWire siano installati e in esecuzione; su una macchina headless, usa la [configurazione headless](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) documentata. Accedere a una sessione X11/Xorg evita anche il percorso del portal, dove una distribuzione lo offre ancora — ma poiché molte distribuzioni si stanno spostando verso il solo Wayland, risolvere il percorso portal/PipeWire è l'approccio più a prova di futuro.

### Rete e relay

Poiché il messaggio contiene la parola «connesso», la sessione è di solito già attiva — ma il _video_ può comunque bloccarsi se il relay è sovraccarico o una porta relay è bloccata. Per il percorso server standard, assicurati che **TCP 21115-21117 e UDP 21116** siano raggiungibili end-to-end. Apri **TCP 21118-21119 solo se utilizzi client WebSocket**. Il server demo pubblico è condiviso e il suo throughput non è garantito, quindi se fai affidamento su RustDesk quotidianamente, self-hostare il tuo relay ti garantisce un comportamento molto più costante. Se è la sessione stessa a cadere o a non stabilirsi mai, si tratta di un problema diverso — consulta le [FAQ di RustDesk Server Pro](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/faq/).

## Mantieni tutto aggiornato

Le build vecchie portano con sé bug di cattura vecchi. Aggiorna **sia** il client di controllo che il client controllato all'ultima versione e, se fai self-hosting, aggiorna anche il server. Diverse segnalazioni di schermo nero scompaiono semplicemente dopo un aggiornamento su entrambi i lati.

## Il vantaggio open source

Quando uno schermo nero sfida la checklist, RustDesk ti offre qualcosa che gli strumenti closed-source non offrono: il codice di cattura reale sotto licenza AGPL. Tu (o un contractor) puoi leggere esattamente come funziona la cattura sulla tua piattaforma, riprodurre il problema e presentare una segnalazione precisa nel repository pubblico — invece di aspettare in coda al supporto di un fornitore.

## Meno variabili quando il server è tuo

Gestisci [il tuo relay e ID server](/it/blog/perche-fare-self-hosting-del-tuo-software-di-desktop-remoto), e l'infrastruttura pubblica condivisa esce dal quadro — un'incognita in meno quando stai dando la caccia a un problema di cattura, e il pieno controllo sulle parti che puoi ottimizzare. È un bonus silenzioso in aggiunta a mantenere il controllo dei dati.
