---
title: Elevazione Windows Portable
weight: 49
---

I programmi portatili di Windows non hanno privilegi di amministratore, il che può portare ai seguenti problemi:

- Lo schermo non può essere trasmesso quando appare la finestra UAC (Controllo Account Utente).
- Quando appare una finestra elevata, come il Task Manager, il mouse diventa non responsivo.

Elevando i privilegi, RustDesk può creare un processo con privilegi di amministratore durante l'avvio o una sessione, consentendogli di eseguire screenshot e operazioni del mouse, evitando così i problemi sopra citati.

## Elevare all'avvio

In questo modo, gli utenti remoti non hanno bisogno di richiedere l'elevazione durante la connessione. Ci sono due metodi:

* Metodo 1: Cambiare il nome del programma portatile per includere `-qs-` (le versioni 1.2.0, 1.2.1, 1.2.2, 1.2.3 terminano con `qs.exe`). Fare clic con il tasto sinistro del mouse per eseguire, fare clic su `Accetta` nella finestra UAC.

* Metodo 2: Fare clic destro ed eseguire come amministratore.

## Elevare dal lato controllato

Il lato controllato può fare clic direttamente su `Accetta ed Eleva` durante la connessione, o fare clic su `Eleva` quando già connesso.

| Connessione | Connesso |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Richiedere elevazione dal lato controllore

Dopo aver selezionato `Richiedi Elevazione` dal menu azioni, apparirà la seguente finestra di dialogo. Se scegli `Chiedi all'utente remoto di autenticarsi`, non avrai bisogno di inserire un nome utente e una password, ma l'utente sul computer remoto deve avere privilegi di amministratore. Se selezioni `Trasmetti il nome utente e la password dell'amministratore`, l'utente sul computer remoto deve solo accettare nella finestra UAC. Dopo aver inviato la richiesta, attendi che l'utente dall'altra parte accetti la finestra UAC. Alla conferma, apparirà un messaggio di successo. Nota che **entrambi i metodi richiedono che qualcuno dal lato controllato accetti la finestra UAC**. Pertanto, se non c'è nessuno disponibile dall'altra parte, l'elevazione non dovrebbe essere richiesta dal lato controllore.

| Menu | Dialogo |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Attesa** | **Successo** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

## Come Scegliere

| Scenario | Metodo |
| :---: | :---: |
| Nessuna elevazione richiesta | Installare il programma |
| Nessun utente disponibile dal lato controllato | Rinominare<br/>*o*<br/> Eseguire come amministratore |
| Utente disponibile dal lato controllato<br/>*e*<br/> Elevazione immediata quando connesso<br/>*e*<br/> Connessione tramite accetta-clic | Fare clic su `Accetta ed Eleva` quando si riceve la connessione dal lato controllato |
| Utente disponibile dal lato controllato<br/>*e*<br/> Elevazione quando necessario | Fare clic su `Eleva` nella finestra di gestione connessione dal lato controllato<br/>*o*<br/> Richiedere elevazione dal lato controllore |