---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-08T11:04:00Z
lang: 'it'
translationKey: 'rustdesk-unattended-access-setup'
draft: false
title: 'Accesso non presidiato con RustDesk: guida alla configurazione'
excerpt: "Configura bene l'accesso non presidiato di RustDesk: password permanente, esecuzione come servizio con avvio automatico e distribuzione su larga scala con un client preconfigurato."
image: '~/assets/images/blog/rustdesk-unattended-access-setup-og.webp'
category: 'Distribuzione'
tags: ['RustDesk', 'Distribuzione', 'Accesso non presidiato']
author: 'RustDesk Team'
slug: 'accesso-non-presidiato-con-rustdesk-guida-alla-configurazione'
faq:
  - question: "Come si configura l'accesso non presidiato in RustDesk?"
    answer: 'Due passaggi: imposta una password permanente in Impostazioni → Sicurezza e installa RustDesk in modo che il suo servizio di sistema si avvii con la macchina. La modalità di approvazione predefinita accetta già la password permanente; su macOS servono anche i permessi Registrazione schermo e Accessibilità. Completati entrambi i passaggi, puoi raggiungere la macchina online in qualsiasi momento, anche dalla schermata di login di Windows, senza che nessuno sia presente.'
  - question: "Perché la mia connessione RustDesk si interrompe quando l'utente effettua il logout?"
    answer: "Perché RustDesk è in esecuzione come eseguibile portatile invece che come servizio installato. Un processo portatile vive all'interno della sessione utente, quindi si ferma al logout, e senza privilegi elevati non può operare sul desktop sicuro UAC di Windows. Installa RustDesk e lascia attivo il suo servizio di sistema: il servizio funziona indipendentemente dall'utente connesso. L'elevazione della versione portatile resta disponibile per il supporto assistito su Windows."
  - question: "L'accesso non presidiato con una password permanente è sicuro?"
    answer: "Sì, se è configurato bene. Usa una password permanente lunga e univoca, diversa da quella di accesso al sistema operativo, attiva la 2FA per le connessioni sul dispositivo controllato e limita chi può connettersi con una lista di IP o ID consentiti e, su Server Pro, con il Controllo di accesso. Mantieni aggiornati i client e controlla i log. Con il self-hosting, rendezvous, relay e console girano su server gestiti da te."
  - question: "Posso distribuire l'accesso non presidiato di RustDesk su molti computer contemporaneamente?"
    answer: "Sì. Nei piani self-hosted Basic e superiori, il generatore di client personalizzati (Custom Client Generator) produce un programma di installazione preconfigurato con indirizzo del server, chiave e impostazioni già incorporati, così gli utenti finali non devono digitare nulla. Distribuiscilo con i tuoi strumenti di deployment esistenti e ogni dispositivo installa il servizio e si registra automaticamente sul tuo server."
  - question: "L'accesso non presidiato funziona nella schermata di login di Windows?"
    answer: "Sì, una volta che RustDesk è installato come servizio. Il servizio installato si avvia con il sistema prima che qualsiasi utente effettui il login, quindi puoi connetterti alla schermata di login, autenticarti e persino avviare un riavvio e riconnetterti. L'eseguibile portatile non può farlo, perché esiste solo all'interno di una sessione utente."

metadata:
  description: "Configura l'accesso non presidiato di RustDesk: password permanente, servizio con avvio automatico, note per Windows/macOS/Linux e distribuzione su larga scala."
  keywords: 'accesso non presidiato RustDesk, password permanente RustDesk, avvio automatico RustDesk, installazione servizio RustDesk, configurazione non presidiata RustDesk, distribuzione RustDesk su larga scala, accesso remoto non presidiato'
---

Accesso non presidiato significa raggiungere un computer quando nessuno è seduto davanti: un server in un rack, un chiosco, il PC di un familiare dall'altra parte del paese. RustDesk lo fa bene quando sono a posto due cose: una **password permanente**, così nessuno deve approvare ogni connessione, e RustDesk in esecuzione **come servizio**, così è disponibile prima del login e dopo il logout. Questa guida copre entrambe, i permessi per ogni piattaforma e come estendere la configurazione a un intero parco dispositivi.

## La risposta breve

Imposta una **password permanente** (Impostazioni → Sicurezza) e **installa RustDesk come servizio di sistema**, che si avvia con la macchina. La modalità di approvazione predefinita accetta già la password permanente, quindi nessuno deve fare clic per accettare; il servizio funziona indipendentemente dall'utente connesso, quindi puoi connetterti in qualsiasi momento, anche dalla schermata di login di Windows. Su macOS servono anche i permessi Registrazione schermo e Accessibilità. Per distribuire su larga scala, genera un client preconfigurato, così ogni macchina si installa e si registra sul tuo server.

## Passaggio 1: imposta una password permanente

Per impostazione predefinita, RustDesk mostra una password monouso che cambia periodicamente e che una persona dall'altra parte dovrebbe leggerti. Per l'accesso non presidiato la sostituisci con una credenziale fissa:

1. Apri RustDesk sul computer che vuoi raggiungere.
2. Vai su **Impostazioni → Sicurezza** (nelle versioni precedenti: l'area password nella schermata principale).
3. Scegli **Imposta password permanente** e inserisci un valore forte e univoco.

Le impostazioni predefinite accettano già questa password: le sessioni vengono accettate sia tramite password sia con un clic, e sono consentiti entrambi i tipi di password. Se qualcuno ha impostato la modalità di approvazione solo sul clic o il tipo di password solo sulla password monouso, torna a **Accetta sessioni via password** (o **Accetta sessioni con entrambe le password**) e a **Usa password permanente** (o **Usa password monouso e permanente**). Per i deployment gestiti, le [chiavi di configurazione](https://rustdesk.com/docs/it/self-host/client-configuration/advanced-settings/#approve-mode) corrispondenti sono `approve-mode` (predefinito `password-click`) e `verification-method` (predefinito `use-both-passwords`).

La [documentazione del client RustDesk](https://rustdesk.com/docs/it/client/) descrive questo passaggio come il fulcro dell'accesso non presidiato. Una regola che vale la pena sottolineare: **non riutilizzare la password di accesso del sistema operativo.** Usa per RustDesk una password dedicata e ad alta entropia, in modo che la fuga di una credenziale non comprometta anche l'altra.

## Passaggio 2: installa come servizio e avvia all'accensione

È il passaggio che molti saltano. Un `.exe` o `.app` portatile gira all'interno della sessione dell'utente, quindi si ferma quando l'utente esegue il logout, e su Windows non può operare sul desktop sicuro UAC senza privilegi elevati (per il supporto assistito esiste l'[elevazione della versione portatile](https://rustdesk.com/docs/it/client/windows/windows-portable-elevation/)). Per un accesso davvero non presidiato, RustDesk deve girare in background come **servizio di sistema**.

- Esegui il **programma di installazione** di RustDesk (non la versione portatile) e completa l'installazione.
- In **Impostazioni → Generale**, assicurati che il **Servizio** sia in esecuzione: usa **Avvia** se risulta fermo. Una volta installato, il servizio si avvia automaticamente con la macchina.

Quando RustDesk gira come servizio, si carica prima che chiunque effettui il login, ed è questo che ti permette di connetterti alla **schermata di login**, autenticarti da remoto e persino riavviare e riconnetterti senza nessuno presente. macOS e Linux aggiungono i propri requisiti di cattura dello schermo e di sessione grafica, descritti più avanti.

## Note specifiche per piattaforma

| Piattaforma | Cosa fare                                                               | Attenzione a                                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows     | Installa; mantieni il servizio in esecuzione (si avvia con la macchina) | L'exe portatile si ferma al logout e senza privilegi elevati non può operare sulle richieste UAC; usa il programma di installazione                                                               |
| macOS       | Installa, imposta la password permanente, concedi i permessi            | Devono essere concessi Registrazione schermo e Accessibilità; la cattura della schermata di login richiede l'installazione dell'helper                                                             |
| Linux       | Installa il pacchetto del servizio                                      | Le build Wayland standard catturano la sessione dell'utente connesso; l'[anteprima per l'accesso non presidiato](/it/blog/unattended-remote-access-wayland-it) aggiunge l'accesso alla schermata di login (x86_64 Debian/Ubuntu) |
| Android     | Imposta la password permanente; abilita la cattura                      | Lo schermo deve essere attivo; concedi il consenso per la cattura dello schermo (MediaProjection) e il permesso di input                                                                           |

### Windows

Il percorso più pulito. Installa, attiva il servizio, imposta la password permanente e il gioco è fatto. Poiché il servizio si avvia all'accensione, l'accesso non presidiato alla schermata di login e attraverso i riavvii funziona come previsto.

### macOS

macOS subordina la cattura dello schermo e l'input a permessi specifici. Dopo l'installazione, apri **Impostazioni di Sistema → Privacy e sicurezza** e concedi a RustDesk sia **Registrazione schermo** sia **Accessibilità**. Per l'accesso alla _finestra di login_ (prima che un utente effettui l'accesso), il servizio/helper di RustDesk deve essere installato per poter catturare lo schermo prima del login; altrimenti otterrai uno schermo nero, lo stesso [problema di cattura trattato nella nostra guida sullo schermo nero](/it/blog/rustdesk-connesso-in-attesa-dellimmagine-guida-completa-alla-risoluzione).

### Linux

Installa RustDesk in modo che il suo servizio si avvii all'accensione. Le build standard di RustDesk catturano i desktop Wayland, monitor multipli inclusi dalla versione 1.4.3, tramite PipeWire e `xdg-desktop-portal` in una sessione con utente connesso. Per una macchina ferma sulla schermata di login, la [build di anteprima Wayland per l'accesso non presidiato](/it/blog/unattended-remote-access-wayland-it), separata e destinata a **sistemi x86_64 basati su Debian/Ubuntu**, aggiunge l'accesso non presidiato e l'accesso alla schermata di login dopo un riavvio. Dove la distribuzione la offre ancora, una schermata di login X11 è un'altra opzione; su una macchina headless, aggiungi un dummy plug o un display virtuale. Per i dettagli vedi [RustDesk per Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source).

## Passaggio 3: distribuisci su larga scala con un client preconfigurato

Configurare una macchina a mano va bene. Configurarne cinquanta no. Nei **piani self-hosted Basic e superiori**, il **generatore di client personalizzati** (Custom Client Generator) della console web crea un programma di installazione con **indirizzo del server, chiave pubblica e impostazioni già incorporati**, così gli utenti finali non devono digitare nulla. Insieme al tuo strumento di deployment esistente (Group Policy, Intune, un RMM per MSP, uno script shell), ogni dispositivo installa il servizio e si registra sul _tuo_ server al primo avvio.

È qui che il self-hosting ripaga i team: l'intero parco dispositivi si registra su server ID/rendezvous e relay gestiti da te (vedi [RustDesk per gli MSP](/it/blog/rustdesk-per-gli-msp-un-unico-strumento-self-hosted-e-personalizzabile)). I piani Server Pro concedono in licenza **utenti con login e dispositivi gestiti**. I piani standard includono connessioni simultanee illimitate; solo [Customized V2](https://rustdesk.com/pricing#custom2) concede in licenza un numero prestabilito di connessioni simultanee. Pianifica il budget in base a quante macchine e quanti amministratori hai: vedi [cosa conta come dispositivo gestito](/it/blog/cosa-conta-come-dispositivo-gestito-in-rustdesk). Pubblica la console web [in HTTPS](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/faq/#impostare-https-per-console-web-manualmente) dietro un reverse proxy.

## Blinda l'accesso

L'accesso non presidiato è una porta sempre aperta su una macchina, quindi tratta le credenziali con la massima serietà:

- **Password permanente forte e univoca**, cambiata periodicamente.
- **2FA per le connessioni** sul dispositivo controllato e, su Server Pro, il [Controllo di accesso](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/permissions/), che decide chi può raggiungere quali dispositivi tramite regole per utenti e gruppi di dispositivi (i permessi dei gruppi di utenti e dei gruppi di dispositivi sono cumulativi). La rubrica condivisa organizza solo le voci: non è un confine di accesso. Il [Ruolo di controllo](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/control-role/) limita cosa può fare un tecnico all'interno di una sessione.
- **Ospita il server in self-hosting**, così rendezvous, relay, console e dati di gestione memorizzati girano sull'infrastruttura che scegli tu. Il client RustDesk e Server OSS hanno licenza AGPL, quindi il loro codice di autenticazione può essere esaminato; Server Pro è un software server self-hosted commerciale e proprietario.

## Accesso non presidiato che controlli davvero

Punta un parco dispositivi sempre acceso verso un server che gestisci tu, e l'accesso permanente a quelle macchine resta coordinato da hardware di tua proprietà, non da un cloud in affitto. Per un accesso permanente, tenere quel percorso nelle tue mani vale la breve configurazione.
