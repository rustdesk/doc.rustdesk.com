---
publishDate: 2026-07-08T11:04:00Z
lang: 'it'
translationKey: 'rustdesk-unattended-access-setup'
draft: false
title: 'Accesso non presidiato con RustDesk: guida alla configurazione'
excerpt: "Configura correttamente l'accesso non presidiato con RustDesk: una password permanente, l'esecuzione come servizio per l'avvio automatico all'accensione e la distribuzione su larga scala con un client preconfigurato."
image: '~/assets/images/blog/rustdesk-unattended-access-setup-og.png'
category: 'Distribuzione'
tags: ['RustDesk', 'Distribuzione', 'Accesso non presidiato']
author: 'RustDesk Team'
slug: 'accesso-non-presidiato-con-rustdesk-guida-alla-configurazione'
faq:
  - question: "Come si configura l'accesso non presidiato in RustDesk?"
    answer: 'Sono necessarie due cose: impostare una password permanente in Impostazioni, Sicurezza, in modo da non aver bisogno che qualcuno approvi ogni connessione, e installare RustDesk come servizio di sistema in modo che sia attivo prima del login e sopravviva al logout. Con entrambe le condizioni soddisfatte puoi raggiungere il computer in qualsiasi momento, anche nella schermata di login, senza che sia presente una persona.'
  - question: "Perché la mia connessione RustDesk si interrompe quando l'utente effettua il logout?"
    answer: "Questo accade quando RustDesk viene eseguito come eseguibile portatile invece di essere installato come servizio. Una sessione portatile termina quando l'utente effettua il logout o compare una richiesta UAC. Installa RustDesk (anziché eseguire l'eseguibile portatile) e mantieni attivo il suo servizio — il servizio installato si avvia con il sistema — in modo che venga eseguito in background indipendentemente da qualsiasi utente collegato, ed è proprio questo che rende affidabile l'accesso non presidiato."
  - question: "L'accesso non presidiato con una password permanente è sicuro?"
    answer: "Può essere implementato in modo sicuro se configurato correttamente. Usa una password permanente lunga e univoca, limita chi può connettersi, attiva i controlli di identità e accesso disponibili, aggiorna i client e controlla i log. Il self-hosting consente di controllare i servizi lato server e i dati di distribuzione memorizzati; l'endpoint continua comunque a proteggere le proprie credenziali locali."
  - question: "Posso distribuire l'accesso non presidiato di RustDesk su molti computer contemporaneamente?"
    answer: "Sì. Nei piani self-hosted Basic e superiori, il Custom Client Generator produce un programma di installazione preconfigurato con l'indirizzo del server, la chiave e le impostazioni già incorporati, così gli utenti finali non devono digitare nulla. Distribuiscilo con i tuoi strumenti di deployment esistenti e ogni dispositivo installa il servizio e si registra automaticamente sul tuo server."
  - question: "L'accesso non presidiato funziona nella schermata di login di Windows?"
    answer: "Sì, una volta che RustDesk è installato come servizio. Il servizio installato si avvia con il sistema prima che qualsiasi utente effettui il login, quindi puoi connetterti alla schermata di login, autenticarti e persino avviare un riavvio e riconnetterti. L'esecuzione dell'eseguibile portatile non può farlo perché esiste solo all'interno di una sessione utente."

metadata:
  description: "Configura l'accesso non presidiato con RustDesk: password permanente, esecuzione come servizio per l'avvio all'accensione, note specifiche per piattaforma per Windows/macOS/Linux e distribuzione su flotte di dispositivi."
  keywords: 'accesso non presidiato RustDesk, password permanente RustDesk, avvio automatico RustDesk, installazione servizio RustDesk, configurazione non presidiata RustDesk, distribuzione RustDesk su larga scala, accesso remoto non presidiato'
---

L'accesso non presidiato significa raggiungere un computer quando non c'è nessuno seduto davanti — un server in un rack, un kiosk, il PC di un familiare dall'altra parte del paese. RustDesk fa bene questo lavoro, ma solo se configuri correttamente due cose: una **password permanente**, così nessuno deve approvare ogni connessione, e RustDesk in esecuzione **come servizio**, così è disponibile prima del login e dopo il logout. Questa guida copre entrambi gli aspetti, oltre a come distribuirlo su un'intera flotta di dispositivi.

## La risposta breve

Imposta una **password permanente** (Impostazioni → Sicurezza) e **installa RustDesk come servizio di sistema** — il servizio installato si avvia con la macchina. La password elimina la necessità che una persona accetti la richiesta; il servizio fa sì che RustDesk funzioni indipendentemente da qualsiasi utente collegato, così puoi connetterti in qualsiasi momento, anche nella schermata di login. Per distribuire su larga scala, genera un client preconfigurato in modo che ogni macchina si installi automaticamente collegandosi al tuo server.

## Passaggio 1: imposta una password permanente

Per impostazione predefinita, RustDesk mostra una password monouso che cambia periodicamente, che una persona all'estremità remota dovrebbe leggerti ad alta voce. Per l'accesso non presidiato, la sostituisci con una credenziale fissa:

1. Apri RustDesk sul computer che vuoi raggiungere.
2. Vai su **Impostazioni → Sicurezza** (nelle versioni precedenti: l'area password nella schermata principale).
3. Scegli **Imposta password permanente** e inserisci un valore forte e univoco.

La [documentazione del client RustDesk](https://rustdesk.com/docs/en/client/) descrive questo passaggio come il fulcro dell'accesso non presidiato. Una regola che vale la pena sottolineare: **non riutilizzare la password di accesso del sistema operativo.** Usa per RustDesk una password dedicata e ad alta entropia, in modo che la compromissione di una credenziale non comprometta anche l'altra.

## Passaggio 2: installa come servizio e avvia all'accensione

Questo è il passaggio che molti trascurano. Se ti limiti a eseguire il file portatile `.exe` o `.app`, la sessione **termina nel momento in cui l'utente effettua il logout o compare una richiesta UAC/permesso** — perché quel processo esiste solo all'interno della sessione dell'utente. Per essere davvero non presidiato, RustDesk deve funzionare come **servizio di sistema** in background.

- Esegui il **programma di installazione** di RustDesk (non la versione portatile) e completa l'installazione.
- In **Impostazioni → Generale**, assicurati che il **Servizio** sia in esecuzione — usa **Avvia** se risulta arrestato. Una volta installato, il servizio si avvia automaticamente con la macchina.

Una volta che RustDesk funziona come servizio, si carica prima che chiunque effettui il login, ed è proprio questo che ti permette di connetterti alla **schermata di login**, autenticarti da remoto e persino riavviare e riconnetterti senza che sia presente una persona. Anche gli approfondimenti della community sulla [corretta configurazione del servizio Windows](https://www.smolkin.org/blog/2026/03/rustdesk-unattended-service-windows.html) sottolineano la stessa distinzione: l'eseguibile portatile consente solo l'accesso presidiato, mentre il servizio installato consente l'accesso non presidiato.

## Note specifiche per piattaforma

| Piattaforma | Cosa fare                                                               | Attenzione a                                                                                                                                                  |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows     | Installa; mantieni il servizio in esecuzione (si avvia con la macchina) | L'exe portatile si interrompe al logout/UAC; usa il programma di installazione                                                                                |
| macOS       | Installa, imposta la password permanente, concedi i permessi            | Devono essere concessi Registrazione schermo e Accessibilità; la cattura della schermata di login richiede l'installazione dell'helper                        |
| Linux       | Installa il pacchetto del servizio                                      | Wayland richiede una sessione attiva; per il pre-login usa la configurazione headless con display virtuale, oppure X11 dove una distribuzione lo offre ancora |
| Android     | Imposta la password permanente; abilita la cattura                      | Lo schermo deve essere attivo; concedi il consenso per la cattura schermo (MediaProjection) e il permesso di input                                            |

### Windows

Il percorso più pulito. Installa, attiva il servizio, imposta la password permanente, fatto. Poiché il servizio si avvia all'accensione, l'accesso non presidiato alla schermata di login e attraverso i riavvii funziona come previsto.

### macOS

macOS subordina la cattura dello schermo e dell'input a permessi specifici. Dopo l'installazione, apri **Impostazioni di Sistema → Privacy e Sicurezza** e concedi a RustDesk sia **Registrazione schermo** che **Accessibilità**. Per l'accesso alla _finestra di login_ (prima che qualsiasi utente abbia effettuato l'accesso), il servizio/helper di RustDesk deve essere installato per poter catturare lo schermo in fase di pre-login — altrimenti otterrai una schermata nera, lo stesso [problema di cattura trattato nella nostra guida sulla schermata nera](/it/blog/rustdesk-connesso-in-attesa-dellimmagine-guida-completa-alla-risoluzione).

### Linux

Installa RustDesk in modo che il suo componente di servizio si avvii all'accensione. Per una macchina che resta ferma sulla schermata di benvenuto (greeter) del login, Wayland non può ancora catturare il greeter — una scelta di progettazione di Wayland (non un limite di RustDesk) che RustDesk sta lavorando attivamente a colmare ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Su una macchina headless, usa la configurazione con display virtuale; su desktop, una sessione X11/Xorg gestisce ancora la situazione dove una distribuzione ne offre una, anche se diverse si stanno spostando verso il solo Wayland. Per i dettagli, consulta [RustDesk per Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source).

## Passaggio 3: distribuisci su larga scala con un client preconfigurato

Configurare una macchina a mano va bene. Configurarne cinquanta no. Nei **piani self-hosted Basic e superiori**, il **Custom Client Generator** nella console web crea un programma di installazione con **indirizzo del server, chiave pubblica e impostazioni già incorporati**, così gli utenti finali non devono digitare nulla. Combinato con il tuo strumento di deployment esistente (Group Policy, Intune, un RMM per MSP, uno script shell), ogni dispositivo installa il servizio e si registra sul _tuo_ server al primo avvio.

È qui che il self-hosting ripaga per i team: ottieni una [flotta non presidiata interamente sotto il tuo controllo](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile), senza un conteggio cloud per postazione a decidere quanti endpoint sei "autorizzato" a raggiungere. Configura il generatore tramite la [console web sulla porta 21114](https://rustdesk.com/docs). Nota che RustDesk viene concesso in licenza per **utente di accesso più per dispositivo gestito**, non per sessione simultanea, quindi pianifica il budget in base al numero di macchine e amministratori che hai — consulta [cosa conta come dispositivo gestito](/it/blog/cosa-conta-come-dispositivo-gestito-in-rustdesk).

## Blinda l'accesso

L'accesso non presidiato è una porta sempre aperta su una macchina, quindi tratta le credenziali con la massima serietà:

- **Password permanente forte e univoca**, cambiata periodicamente.
- **Autenticazione a due fattori** e, nella versione Pro, **controlli di accesso** in modo che possano connettersi solo gli account autorizzati. Il nostro approfondimento su [controllo di accesso per utente e gruppi di dispositivi](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/) spiega come delimitare chi può raggiungere cosa.
- **Esegui il self-hosting dei servizi lato server** quando hai bisogno di controllare rendezvous, relay, console e i dati di distribuzione memorizzati. Le credenziali dell'endpoint restano una responsabilità della sicurezza dell'endpoint stesso. Poiché RustDesk è open source con licenza AGPL, la sua implementazione dell'autenticazione può essere verificata.

## Accesso non presidiato che controlli davvero

Punta una flotta sempre attiva verso un server che gestisci tu, e l'accesso permanente a quelle macchine resta mediato da hardware di tua proprietà, non da un cloud che affitti. Per un accesso permanente, tenere quel percorso nelle proprie mani vale la breve configurazione iniziale.
