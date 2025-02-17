---
title: Strategia
weight: 200
---

## Strategia

La strategia è uno strumento per gli amministratori RustDesk per aggiornare in blocco le opzioni di sicurezza delle pagine di impostazione del client. Gli amministratori possono creare diverse strategie e applicarle a diversi dispositivi.

### Creare Strategie

Puoi creare una nuova strategia cliccando sul pulsante `+` ed eseguire varie azioni sulla strategia passando il mouse su di essa e cliccando sul menu.

Nel menu a comparsa, puoi scegliere di `Attivare` o `Disattivare` la strategia, `Rinominare`, `Duplicare` o `Eliminare`. Inoltre, puoi cliccare su `Modifica Dispositivi` per modificare i dispositivi applicati a quella strategia o cliccare su `Modifica Utenti` per modificare gli utenti applicati a quella strategia.

Sul lato destro del menu della strategia, puoi vedere il numero di dispositivi effettivamente applicati alla strategia, tenendo conto della priorità della strategia.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Strategia Dispositivo, Utente e Gruppo di Dispositivi

Le strategie vengono applicate secondo il seguente ordine di priorità:
1. Strategia Dispositivo (Priorità più alta)
2. Strategia Utente
3. Strategia Gruppo di Dispositivi (Priorità più bassa)

Ogni dispositivo può essere gestito da una sola strategia alla volta. Il sistema di priorità funziona come segue:
- Le strategie dispositivo hanno la precedenza sia sulle strategie utente che sulle strategie gruppo di dispositivi
- Le strategie utente hanno la precedenza sulle strategie gruppo di dispositivi
- Le strategie gruppo di dispositivi si applicano a tutti i dispositivi nel gruppo che non hanno una strategia dispositivo o utente assegnata

### Modificare Dispositivi

Quando clicchi sul menu `Modifica Dispositivi`, si aprirà una finestra di dialogo di modifica che mostra tutti i dispositivi. Puoi modificare lo stato di selezione delle caselle di controllo e quindi cliccare sul pulsante `Salva` per applicare le modifiche ai dispositivi effettuate nella pagina corrente. Se devi modificare dispositivi in altre pagine, naviga fino a quelle pagine. Puoi anche utilizzare il menu a discesa nell'angolo in alto a destra per filtrare i dispositivi.

Formato della colonna strategia: strategia dispositivo/strategia utente/strategia gruppo di dispositivi, oppure "-" per la strategia predefinita.

Ecco un esempio della finestra di dialogo che appare quando clicchi su `Modifica Dispositivi` nel menu "demo1". In questo esempio, il dispositivo "1981241962" è applicato alla strategia "demo3"; Il dispositivo "1279471875" è applicato alla strategia "demo2"; Il dispositivo "a123456" è applicato alla strategia "demo1"; Il dispositivo "1227624460" è applicato alla strategia predefinita.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

### Modificare Utenti

Quando clicchi sul menu `Modifica Utenti`, si aprirà una finestra di dialogo di modifica che mostra tutti gli utenti. Puoi modificare lo stato di selezione delle caselle di controllo e quindi cliccare sul pulsante `Salva` per applicare le modifiche agli utenti effettuate nella pagina corrente. Se devi modificare utenti in altre pagine, naviga fino a quelle pagine. Puoi anche utilizzare il menu a discesa nell'angolo in alto a destra per filtrare gli utenti.

Ecco un esempio della finestra di dialogo che appare quando clicchi su `Modifica Utenti` nel menu "demo2". In questo esempio, l'utente "admin" è applicato alla strategia "default"; L'utente "user1" è applicato alla strategia "demo2"; L'utente "user2" è applicato alla strategia "demo3".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

### Modificare Gruppi di Dispositivi

Quando clicchi sul menu `Modifica Gruppo di Dispositivi`, si aprirà una finestra di dialogo di modifica che mostra tutti i gruppi di dispositivi. Puoi modificare lo stato di selezione delle caselle di controllo e quindi cliccare sul pulsante `Salva` per applicare le modifiche ai gruppi di dispositivi effettuate nella pagina corrente. Se devi modificare gruppi di dispositivi in altre pagine, naviga fino a quelle pagine. Puoi anche utilizzare il menu a discesa nell'angolo in alto a destra per filtrare i gruppi di dispositivi.

Ecco un esempio della finestra di dialogo che appare quando clicchi su `Modifica Gruppo di Dispositivi` nel menu "demo1". In questo esempio, il gruppo di dispositivi "device_group1" è applicato alla strategia "demo1"; Il gruppo di dispositivi "group2" è applicato alla strategia "demo2"; Il gruppo di dispositivi "group3" è applicato alla strategia "default".

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

### Sincronizzazione Strategia

Ogni dispositivo può essere gestito da una sola strategia, e se quella strategia è disabilitata, il dispositivo non sarà gestito da nessuna strategia. Durante la sincronizzazione delle strategie, RustDesk registra i timestamp della strategia locale e del server per determinare se è necessaria la sincronizzazione. Cioè, dopo che la sincronizzazione della strategia è completata:

* Se l'utente modifica alcune opzioni, il client utilizzerà le opzioni dell'utente.
* Se l'amministratore modifica il contenuto della strategia, le opzioni del client verranno sincronizzate.
* Se l'amministratore modifica la strategia a cui appartiene il dispositivo, le opzioni del client verranno sincronizzate.

### Modificare Strategie

Nella parte inferiore della strategia, clicca su `Modifica`, effettua le modifiche e clicca su `Invia`. La strategia verrà sincronizzata con i dispositivi entro 30 secondi.