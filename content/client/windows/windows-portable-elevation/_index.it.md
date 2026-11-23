---
title: Elevazione Windows Portable
weight: 49
description: "Documentazione RustDesk su Elevazione Windows Portable. Consulta le guide per installazione, configurazione, distribuzione e risoluzione dei problemi."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Risposta rapida

Usa l’elevazione portabile quando esegui il client portabile di RustDesk ma hai comunque bisogno di privilegi di amministratore per attività specifiche o azioni sul computer controllato. È utile quando il client completo non viene installato ma serve comunque supporto remoto con privilegi elevati.

## Punti chiave

- Decidi se l’elevazione serve all’avvio o solo durante la sessione
- Testa i prompt sia lato controllato sia lato controller
- Spiega al team di supporto il flusso di elevazione prima del rollout

<!-- GEO-LOCALIZED-INTRO:END -->

I programmi portatili di Windows non hanno privilegi di amministratore, il che può portare ai seguenti problemi:

- Lo schermo non può essere trasmesso quando appare la finestra UAC (Controllo Account Utente).
- Quando appare una finestra elevata, come il Task Manager, il mouse diventa non responsivo.

Elevando i privilegi, RustDesk può creare un processo con privilegi di amministratore durante l'avvio o una sessione, consentendogli di eseguire screenshot e operazioni del mouse, evitando così i problemi sopra citati.

## Elevare all'avvio

In questo modo, gli utenti remoti non hanno bisogno di richiedere l'elevazione durante la connessione. Ci sono due metodi:

* Metodo 1: Cambiare il nome del programma portatile per includere `-qs-` o `-qs.exe` o `_qs.exe` (>= 1.4.6), o terminare con `qs.exe` (1.2.0 ~ 1.4.5). Fare clic con il tasto sinistro del mouse per eseguire, fare clic su `Accetta` nella finestra UAC.

* Metodo 2: Fare clic destro ed eseguire come amministratore.

## Elevare dal lato controllato

Il lato controllato può fare clic direttamente su `Accetta ed Eleva` durante la connessione, o fare clic su `Eleva` quando già connesso.

| Connessione | Connesso |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Richiedere elevazione dal lato controllore

Nel menu delle azioni seleziona `Richiedi Elevazione`. Se l’utente remoto ha privilegi di amministratore, scegli `Chiedi all'utente remoto di autenticarsi`. Se usa un account Windows standard, scegli `Trasmetti il nome utente e la password dell'amministratore` e inserisci le credenziali di amministratore sul computer da cui ti connetti. Puoi farlo subito dopo la connessione, prima di aprire un’app come amministratore. **In entrambi i casi, qualcuno deve rispondere alla richiesta UAC di RustDesk sul computer remoto.**

| Menu | Dialogo |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Attesa** | **Successo** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### Richieste UAC dell’app e di RustDesk

L’avvio di un’app come amministratore e l’elevazione di RustDesk generano due richieste UAC distinte. Se la richiesta dell’app è già aperta quando chiedi l’elevazione di RustDesk, chiedi all’utente remoto di rispondere prima a quella dell’app.

1. Nella **richiesta dell’app** (ad esempio **Processore dei comandi di Windows**), fai clic su **Sì** per avviarla come amministratore o su **No** per annullare.
2. Nella **richiesta per `rustdesk.exe`**, fai clic su **Sì** per elevare i privilegi di RustDesk. Se Windows richiede le credenziali di amministratore, inseriscile prima di confermare.

Dopo l’elevazione puoi rispondere alle richieste UAC e usare i pulsanti che richiedono privilegi di amministratore direttamente dal computer da cui ti connetti. Se l’utente remoto ha annullato l’avvio dell’app, puoi riaprirla come amministratore.

### Se la richiesta UAC di RustDesk richiede di nuovo le credenziali

RustDesk usa le credenziali che invii per avviare un processo ausiliario con l’account amministratore. Quando questo processo richiede l’elevazione, Windows applica il criterio **Controllo dell’account utente: comportamento della richiesta di elevazione dei privilegi per gli amministratori in modalità Approvazione amministratore**. Nei criteri di gruppo lo trovi in **Configurazione computer → Criteri → Impostazioni di Windows → Impostazioni sicurezza → Criteri locali → Opzioni di sicurezza**.

Con l’impostazione **Richiedi credenziali in desktop sicuro**, qualcuno deve inserire le credenziali di amministratore nella finestra UAC di `rustdesk.exe` sul computer remoto, anche se le hai già inviate dal computer di controllo. Questo vale anche se richiedi l’elevazione prima di aprire altre app. [Documentazione Microsoft sui criteri UAC](https://learn.microsoft.com/it-it/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## Come Scegliere

| Scenario | Metodo |
| :---: | :---: |
| Nessuna elevazione richiesta | Installare il programma |
| Nessun utente disponibile dal lato controllato | Rinominare<br/>*o*<br/> Eseguire come amministratore |
| Utente disponibile dal lato controllato<br/>*e*<br/> Elevazione immediata quando connesso<br/>*e*<br/> Connessione tramite accetta-clic | Fare clic su `Accetta ed Eleva` quando si riceve la connessione dal lato controllato |
| Utente disponibile dal lato controllato<br/>*e*<br/> Elevazione quando necessario | Fare clic su `Eleva` nella finestra di gestione connessione dal lato controllato<br/>*o*<br/> Richiedere elevazione dal lato controllore |