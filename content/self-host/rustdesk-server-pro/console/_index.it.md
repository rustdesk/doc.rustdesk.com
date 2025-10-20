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

## Accedere

La porta predefinita della console web è 21114. Inserisci `http://<ip del server>:21114` nel browser per accedere alla pagina della console, come mostrato nella figura seguente. Il nome utente/password predefinito dell'amministratore è `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Se hai bisogno del supporto HTTPS, installa un server web come `Nginx` o usa `IIS` per Windows.

Dopo aver effettuato l'accesso, assicurati di cambiare la password, seleziona `Impostazioni` nel menu dell'account nell'angolo in alto a destra per accedere alla pagina di modifica della password, come mostrato nella figura seguente. Puoi anche creare un altro account amministratore e eliminare questo. È meglio abilitare la verifica dell'accesso via email.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Anche gli utenti non amministratori possono accedere per sfogliare i loro dispositivi e log, modificare le loro impostazioni utente.

## Configurazioni Automatiche
Cliccando su `Windows EXE` sarai in grado di ottenere le configurazioni per il tuo RustDesk Server Pro, questo aiuterà a configurare i tuoi client.

Per i client Windows, puoi omettere la configurazione personalizzata del server e mettere le informazioni di configurazione nel nome del file `rustdesk.exe` invece. Come mostrato sopra, vai alla pagina di benvenuto della console e clicca su `Windows EXE`. **Client ≥ 1.1.9 richiesto.**

Puoi usare questo insieme alla [configurazione del client](https://rustdesk.com/docs/en/self-host/client-configuration/) e agli [script di distribuzione](https://rustdesk.com/docs/en/self-host/client-deployment/) per configurare i tuoi client.

## Creare un nuovo utente diverso dall'utente predefinito `admin`

{{% notice note %}}
Il piano `Individual` non ha questa caratteristica.
{{% /notice %}}

1. Clicca su `Utenti` nel menu a sinistra.
2. Crea un altro account con `amministratore` abilitato.
3. Accedi con il nuovo account amministrativo.
4. Elimina l'`admin` nella pagina `Utenti`.

## Creare un nuovo utente
1. Clicca su `Utenti` nel menu a sinistra.
2. Crea un nuovo utente.
3. Seleziona in quale gruppo dovrebbero essere (se devi aggiungere nuovi gruppi continua a leggere).

## Aggiungere un nuovo Gruppo
1. Clicca su `Gruppi` nel menu a sinistra.
2. Crea un nuovo gruppo.
3. Una volta creato puoi permettere ai gruppi di accedere l'uno all'altro, clicca `Modifica`.
4. Seleziona i gruppi rilevanti a cui vuoi accesso (li aggiunge automaticamente nel gruppo corrispondente).

## Configurare più server relay
1. Vai su `Impostazioni` nel menu a sinistra.
2. Clicca su `Relay` nel sottomenu.
3. Clicca `+` accanto a `Server Relay`.
4. Inserisci l'indirizzo DNS o l'indirizzo IP del server relay nella casella che ora appare e premi <kbd>Invio</kbd>.
5. Se hai più di un server relay puoi continuare a cliccare `+` e adattare le impostazioni geografiche se necessario (ricorda e copia la tua chiave agli altri server).

## Impostare o cambiare la licenza
1. Vai su `Impostazioni` nel menu a sinistra.
2. Clicca su `Licenza` nel sottomenu.
3. Clicca `Modifica` e incolla il tuo codice licenza.
4. Clicca `OK`.

## Visualizzare i Log
Sul lato sinistro clicca su `Log`.

## Configurare le Email
Gmail in questo esempio

1. Vai su `Impostazioni` nel menu a sinistra.
2. Clicca su `SMTP` nel sottomenu.
3. Inserisci l'indirizzo SMTP `smtp.gmail.com`.
4. Inserisci la Porta 587 in `Porta SMTP`.
5. Inserisci l'account Gmail cioè `myrustdeskserver@gmail.com` in `Account Mail`.
6. Inserisci la tua password (potresti aver bisogno di una password dell'app).
7. Inserisci il tuo account Gmail cioè `myrustdeskserver@gmail.com` in `Da`.
8. Clicca `Controlla` per salvare.

## Assegnazione di Utenti/Strategie/Gruppi di Dispositivi ai Dispositivi tramite Console Web

L’Utente è l’utente RustDesk connesso al dispositivo o assegnato al dispositivo cliccando su **Modifica** accanto al dispositivo, cliccando nella casella **Utente** e selezionando il proprio utente dal menu a discesa.  
È anche possibile assegnare dispositivi in blocco a un utente cliccando su **Altro → Assegna Dispositivi** nella **Lista Utenti**.

Per aggiungere un dispositivo a un gruppo di dispositivi, è possibile cliccare su **Modifica** accanto al dispositivo nella **Lista Dispositivi** e cambiare il **Gruppo**, oppure andare nella lista dei **Gruppi di Dispositivi**, cliccare sul nome di un gruppo e regolare i dispositivi in quel gruppo.

Per assegnare una strategia a un dispositivo, passare il mouse sul lato destro della lista **Strategia** e cliccare su **Modifica Dispositivi**, **Modifica Utenti** o **Modifica Gruppi di Dispositivi** nel menu per aggiungere i dispositivi corrispondenti, i dispositivi degli utenti o i dispositivi del gruppo alla strategia selezionata.

---

## Token API

È necessario prima andare su **Impostazioni → Token → Crea** e creare un token con le autorizzazioni richieste: **Dispositivo, Registro Audit, Utente, Gruppo, Strategia, Rubrica**.

Una volta creato, è possibile utilizzare questi token tramite **linea di comando** o **Python CLI** per eseguire azioni con le autorizzazioni corrispondenti.

### Assegnazione tramite Token dalla Linea di Comando

È anche possibile eseguire assegnazioni utilizzando l’eseguibile RustDesk con il parametro `--assign`.  
Questo permette di assegnare utenti, strategie, rubriche o gruppi di dispositivi a un dispositivo direttamente dalla linea di comando.

**Esempio:**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

Parametri supportati

| Parametro                               | Descrizione                               | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ----------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | Assegna un utente al dispositivo          |                   |                 | 
| `--strategy_name <strategyname>`        | Assegna una strategia al dispositivo      |                   |                 | 
| `--address_book_name <addressbookname>` | Assegna il dispositivo a una rubrica      |                   |                 | 
| `--address_book_tag <addressbooktag>`   | Assegna con tag della rubrica             |                   |                 | 
| `--address_book_alias <alias>`          | Assegna con alias della rubrica           | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | Imposta la password per la voce           | 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | Imposta una nota per la voce              | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | Assegna il dispositivo a un gruppo        |                   |                 | 
| `--note <note>`                         | Aggiunge una nota al dispositivo          | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | Imposta il nome utente del dispositivo    | 1.6.6             | 1.4.3           | 
| `--device_name <device_name>`           | Imposta il nome del dispositivo           | 1.6.6             | 1.4.3           | 

La linea di comando su Windows non produce output per default. Per ottenere output, eseguire:

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

vedi [qui](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Strumenti di Gestione Python CLI

#### Gestione Utenti (`users.py`)

**Mostra aiuto:**

    ./users.py -h

**Visualizza utenti:**

    ./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]

**Filtri:**

    --name : nome utente
    --group_name : gruppo utenti

**Esempio:**

    ./users.py --url https://example.com --token <token> view --group_name admins

**Operazioni:**

`view` può essere sostituito con `enable`, `disable`, o `delete`.

**Esempio (disabilitare utente):**

    ./users.py --url https://example.com --token <token> disable --name testuser

---

#### Gestione Dispositivi (`devices.py`)

**Mostra aiuto:**

    ./devices.py -h

**Visualizza dispositivi:**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filtri:**

    --id : ID dispositivo
    --device_name : nome dispositivo
    --user_name : utente assegnato
    --group_name : gruppo utenti
    --device_group_name : gruppo dispositivi
    --offline_days : giorni offline

**Esempio:**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**Operazioni:**

`view` può essere sostituito con `enable`, `disable`, `delete`, o `assign`.

**Esempio (assegnare dispositivo):**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Gestione Rubrica (`ab.py`)

**Mostra aiuto:**

    ./ab.py -h

**Visualizza rubriche condivise:**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Ottieni GUID rubrica personale:**

    ./ab.py --url <url> --token <token> get-personal-ab

**Aggiungi rubrica condivisa:**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Aggiorna o elimina rubrica condivisa:**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Visualizza peer in una rubrica:**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Aggiungi, aggiorna o elimina un peer:**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Gestione tag:**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Gestione regole di accesso:**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Esempio (aggiungi regola sola lettura per l’utente "mike"):**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Audit (`audits.py`)

**Mostra aiuto:**

    ./audits.py -h

**Visualizza audit di connessione:**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Visualizza audit file:**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Visualizza audit allarmi:**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Visualizza audit console:**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filtri:**

    --remote : ID peer (per audit di connessione o file)
    --conn-type : 0=Desktop Remoto, 1=Trasferimento File, 2=Trasferimento Porte, 3=Visualizza Telecamera, 4=Terminale
    --device : ID dispositivo (per audit allarmi)
    --operator : nome operatore (per audit console)
    --created-at : filtro orario locale, es. "2025-09-16 14:15:57"
    --days-ago : filtra record più recenti di n giorni
    --page-size / --current : paginazione

**Esempio:**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## Cercare un dispositivo
1. Vai su Dispositivi.
2. Nel Campo di Ricerca Nome Dispositivo digita il nome e clicca `Query` o premi <kbd>Invio</kbd>.
3. Per usare un carattere jolly aggiungi `%` all'inizio, alla fine o a entrambi del termine di ricerca.