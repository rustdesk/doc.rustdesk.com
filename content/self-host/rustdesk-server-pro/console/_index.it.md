---
title: Console Web
weight: 10
---

La console web è integrata in RustDesk Server Pro, servita dalla porta `21114`.

Caratteristiche:

- Sfogliare i dispositivi
- Aggiungere/modificare utenti e gruppi di utenti
- Modificare i permessi di accesso ai dispositivi
- Sfogliare i log di connessione dei dispositivi e altri log
- Aggiornare le impostazioni
- Gestire le strategie di sincronizzazione delle impostazioni del client
- Gestire le rubriche condivise
- Generare build personalizzate del client

### Accedere

La porta predefinita della console web è 21114. Inserisci `http://<ip del server>:21114` nel browser per accedere alla pagina della console, come mostrato nella figura seguente. Il nome utente/password predefinito dell'amministratore è `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Se hai bisogno del supporto HTTPS, installa un server web come `Nginx` o usa `IIS` per Windows.

Dopo aver effettuato l'accesso, assicurati di cambiare la password, seleziona `Impostazioni` nel menu dell'account nell'angolo in alto a destra per accedere alla pagina di modifica della password, come mostrato nella figura seguente. Puoi anche creare un altro account amministratore e eliminare questo. È meglio abilitare la verifica dell'accesso via email.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Anche gli utenti non amministratori possono accedere per sfogliare i loro dispositivi e log, modificare le loro impostazioni utente.

### Configurazioni Automatiche
Cliccando su `Windows EXE` sarai in grado di ottenere le configurazioni per il tuo RustDesk Server Pro, questo aiuterà a configurare i tuoi client.

Per i client Windows, puoi omettere la configurazione personalizzata del server e mettere le informazioni di configurazione nel nome del file `rustdesk.exe` invece. Come mostrato sopra, vai alla pagina di benvenuto della console e clicca su `Windows EXE`. **Client ≥ 1.1.9 richiesto.**

Puoi usare questo insieme alla [configurazione del client](https://rustdesk.com/docs/en/self-host/client-configuration/) e agli [script di distribuzione](https://rustdesk.com/docs/en/self-host/client-deployment/) per configurare i tuoi client.

### Creare un nuovo utente diverso dall'utente predefinito `admin`

{{% notice note %}}
Il piano `Individual` non ha questa caratteristica.
{{% /notice %}}

1. Clicca su `Utenti` nel menu a sinistra.
2. Crea un altro account con `amministratore` abilitato.
3. Accedi con il nuovo account amministrativo.
4. Elimina l'`admin` nella pagina `Utenti`.

### Creare un nuovo utente
1. Clicca su `Utenti` nel menu a sinistra.
2. Crea un nuovo utente.
3. Seleziona in quale gruppo dovrebbero essere (se devi aggiungere nuovi gruppi continua a leggere).

### Aggiungere un nuovo Gruppo
1. Clicca su `Gruppi` nel menu a sinistra.
2. Crea un nuovo gruppo.
3. Una volta creato puoi permettere ai gruppi di accedere l'uno all'altro, clicca `Modifica`.
4. Seleziona i gruppi rilevanti a cui vuoi accesso (li aggiunge automaticamente nel gruppo corrispondente).

### Configurare più server relay
1. Vai su `Impostazioni` nel menu a sinistra.
2. Clicca su `Relay` nel sottomenu.
3. Clicca `+` accanto a `Server Relay`.
4. Inserisci l'indirizzo DNS o l'indirizzo IP del server relay nella casella che ora appare e premi <kbd>Invio</kbd>.
5. Se hai più di un server relay puoi continuare a cliccare `+` e adattare le impostazioni geografiche se necessario (ricorda e copia la tua chiave agli altri server).

### Impostare o cambiare la licenza
1. Vai su `Impostazioni` nel menu a sinistra.
2. Clicca su `Licenza` nel sottomenu.
3. Clicca `Modifica` e incolla il tuo codice licenza.
4. Clicca `OK`.

### Visualizzare i Log
Sul lato sinistro clicca su `Log`.

### Configurare le Email
Gmail in questo esempio

1. Vai su `Impostazioni` nel menu a sinistra.
2. Clicca su `SMTP` nel sottomenu.
3. Inserisci l'indirizzo SMTP `smtp.gmail.com`.
4. Inserisci la Porta 587 in `Porta SMTP`.
5. Inserisci l'account Gmail cioè `myrustdeskserver@gmail.com` in `Account Mail`.
6. Inserisci la tua password (potresti aver bisogno di una password dell'app).
7. Inserisci il tuo account Gmail cioè `myrustdeskserver@gmail.com` in `Da`.
8. Clicca `Controlla` per salvare.

### Assegnare Utenti/Gruppi/Strategie/GruppoDispositivo Dispositivo ai Dispositivi
L'Utente è l'Utente RustDesk connesso al dispositivo o assegnato al dispositivo cliccando `Modifica` accanto al dispositivo, clicca nella casella `Utente` e seleziona dal menu a tendina per selezionare il tuo utente, questo assegnerà automaticamente il gruppo basato sul gruppo a cui è stato assegnato l'utente.

Questo può anche essere fatto tramite API a riga di comando durante la distribuzione o successivamente chiamando l'eseguibile RustDesk seguito da `--assign --token <token generato> --user_name <nome utente>`. Devi andare su `Impostazioni → Token → Crea` e creare un token con permessi Dispositivo prima di farlo. Un esempio di questo su Windows sarebbe `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <token generato> --user_name <nuovo utente>`.

Puoi anche assegnare strategia in questo modo, ad esempio `--assign --token <token generato> --strategy_name <nome strategia>`.

Puoi anche assegnare rubrica in questo modo, ad esempio `--assign --token <token generato> --address_book_name <nome rubrica>` o `--assign --token <token generato> --address_book_name <nome rubrica> --address_book_tag <tag rubrica> --address_book_alias <alias>`. `--address_book_alias` richiede RustDesk Server Pro ≥1.5.8 e client ≥1.4.1.

Puoi anche assegnare nome gruppo dispositivo in questo modo, ad esempio `--assign --token <token generato> --device_group_name <nome gruppo dispositivo>`.

La riga di comando su Windows non ha output per impostazione predefinita. Per ottenere output, esegui così, `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` o `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, vedi [qui](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Cercare un dispositivo
1. Vai su Dispositivi.
2. Nel Campo di Ricerca Nome Dispositivo digita il nome e clicca `Query` o premi <kbd>Invio</kbd>.
3. Per usare un carattere jolly aggiungi `%` all'inizio, alla fine o a entrambi del termine di ricerca.