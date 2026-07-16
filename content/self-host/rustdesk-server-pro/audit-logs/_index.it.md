---
title: Log di audit
weight: 19
description: "Usa i log di audit nella console web di RustDesk Server Pro per esaminare eventi di connessione, trasferimento file, operazioni della console e allarmi."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

I log di audit nella console web di RustDesk Server Pro aiutano gli amministratori a esaminare attività di accesso remoto, trasferimenti file, modifiche amministrative e allarmi di sicurezza.

Apri la console web, quindi vai a **Log** nel menu a sinistra. La sezione Log include:

- **Connessione**
- **File**
- **Console**
- **Allarme**

## Log connessioni

Vai a **Log > Connessione** per esaminare le sessioni remote e i relativi tipi di connessione.

I log connessioni mostrano:

- **Tipo**: Desktop remoto, Trasferimento file, Inoltro porta, Visualizza webcam, Terminale o Non connesso. **Non connesso** significa che l’autenticazione non è riuscita.
- **Dispositivo controllato**: ID e nome del dispositivo di destinazione.
- **Lato controllore**: l’utente controllore quando il lato controllore ha effettuato l’accesso, più dispositivo controllore, nome dispositivo e indirizzo IP.
- **Ora di inizio**, **Ora di fine** e **Durata**.
- **Autenticazione**: metodo di autenticazione primario, eventualmente seguito da informazioni 2FA.
- **Note**.

![Pagina log connessioni](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

I valori di autenticazione primaria supportati includono:

- Conferma con clic
- Password monouso
- Password permanente
- Scambia lati

I valori 2FA supportati includono:

- Codice 2FA
- Dispositivo attendibile

### Note di connessione

Il lato controllore può aggiungere una nota a una connessione in due modi:

- Durante una sessione remota, usa l’azione **Note** nel menu remoto per aggiungere o aggiornare la nota della connessione.

![Riquadro nota connessione](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- Al termine di una sessione remota, abilita **Impostazioni > Generale > Altro > Chiedi nota al termine della connessione** sul lato controllore se vuoi che RustDesk chieda una nota quando la sessione termina.

![Riquadro nota alla chiusura della connessione](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

La nota viene mostrata nella colonna **Note** in **Log > Connessione**. Gli utenti che possono visualizzare il log connessione possono anche usare il pulsante di modifica nella colonna **Note** per aggiornare la nota dalla console web.

### Disconnettere una connessione in corso

Se una connessione è ancora attiva e il tuo account ha il permesso di modificare quell’elemento di audit, la colonna **Azione** mostra **Disconnetti**. Fai clic e conferma l’operazione per terminare la connessione in corso.

![Conferma disconnessione](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Dopo che la connessione è stata disconnessa dalla console web, il lato controllore vede un messaggio che indica che la connessione è stata disconnessa dalla console web.

![Messaggio disconnesso dalla console](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Log trasferimento file

Vai a **Log > File** per esaminare l’attività di trasferimento file.

![Pagina log trasferimento file](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

I log trasferimento file includono operazioni sui file da sessioni dedicate di **Trasferimento file** e copia/incolla di file durante sessioni di **Desktop remoto**.

I log trasferimento file mostrano:

- **Dispositivo controllato**.
- **Lato controllore**: il dispositivo controllore e l’utente controllore, quando disponibile.
- **Tempo**.
- **Direzione**:
  - Dispositivo controllato -> Lato controllore
  - Lato controllore -> Dispositivo controllato
- **File**: il percorso sul dispositivo controllato.
- **Dettagli**: dimensione per un singolo file o numero di file per trasferimenti multi-file.

Per trasferimenti multi-file, fai clic sul numero di file nella colonna **Dettagli** per aprire il pannello dei dettagli. Quando il trasferimento contiene più file di quelli elencati dal pannello, vengono mostrati i 10 file più grandi per dimensione.

![Dettagli trasferimento file](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Log allarmi

Vai a **Log > Allarme** per esaminare eventi relativi alla sicurezza.

![Pagina log allarmi](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

I log allarmi mostrano:

- **Tipo**.
- **Da**: per gli allarmi dell’account di login, è il dispositivo di login. Per gli allarmi di connessione remota, è il lato controllore.
- **Destinazione**: per gli allarmi dell’account di login, è l’account di login. Per gli allarmi di connessione remota, è il dispositivo controllato.
- **Ora evento**.

I tipi di allarme di connessione remota includono:

- Tentativo di accesso da IP non in whitelist
- Oltre 30 tentativi di accesso consecutivi
- Molteplici tentativi di accesso entro un minuto
- Troppi tentativi di accesso consecutivi da un singolo prefisso IPv6
- Più tentativi di accesso non riusciti in Terminale (esegui come amministratore) (nome utente/password errati)
- Più tentativi di accesso simultanei in Terminale (esegui come amministratore)
- Violazione dell’ambito della sessione

I tipi di allarme dell’account di login includono:

- Oltre 30 tentativi di login consecutivi
- Molteplici tentativi di login entro un minuto
- Molteplici tentativi di login entro un’ora

## Log operazioni console

Vai a **Log > Console** per esaminare le azioni eseguite nella console web.

![Pagina log operazioni console](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

I log console mostrano:

- **Tipo**.
- **Utente**: l’utente della console web che ha eseguito l’operazione.
- **Operazione**: l’azione specifica.
- **Tempo**.
- **Dettagli**: campi extra registrati per l’operazione.

I tipi includono:

- Gestione gruppi
- Gestione utenti
- Gestione dispositivi
- Gestione rubriche
- Gestione ruoli admin
- Gestione ruoli di controllo

Le operazioni tracciate includono login utente, modifiche a utenti e dispositivi, disconnessione di un dispositivo, modifiche alla rubrica, modifiche 2FA, reset password, modifiche ai ruoli admin/controllo e così via.

## Visibilità e conservazione dei log

La visibilità dei log dipende dal fatto che l’utente sia amministratore, che abbia un [ruolo admin](/docs/it/self-host/rustdesk-server-pro/admin-role/) con permessi per i log di audit, e dall’impostazione in **Impostazioni > Altro**.

| Tipo di utente o impostazione | Visibilità log |
| --- | --- |
| Amministratore | Può visualizzare tutti i log di audit. |
| Ruolo admin con **Global > Audit Logs-View** | Può visualizzare tutti i log di audit, anche quando **Solo l’amministratore può accedere ai log** è abilitato. |
| Ruolo admin con **Individual > Audit Logs-View** | Può visualizzare i log di audit personali, anche quando **Solo l’amministratore può accedere ai log** è abilitato. Concede lo stesso ambito di log personali di un normale utente non amministratore, ma non viene bloccato da quell’impostazione. |
| Utente non amministratore senza permessi per i log di audit | Può visualizzare i log di audit personali solo quando **Solo l’amministratore può accedere ai log** è disabilitato. |
| **Impostazioni > Altro > Solo l’amministratore può accedere ai log** abilitato | Gli utenti non amministratori senza permessi per i log di audit non possono accedere ai log di audit. |

I log personali includono record di connessione e trasferimento file in cui un dispositivo attualmente assegnato all’utente è il dispositivo controllato o controllore, e record in cui l’utente è il controllore. Per i log allarmi, i log personali includono record per dispositivi assegnati all’utente o per l’account di login dell’utente. Per i log operazioni console, i log personali includono record in cui l’utente è l’operatore.

Usa **Impostazioni > Altro > Conservazione log (giorni)** per controllare per quanto tempo vengono conservati i log di audit. Inserisci `0` per conservare tutti i log indefinitamente. Inserisci un numero maggiore di `0` per eliminare automaticamente i log più vecchi del numero di giorni specificato. La pulizia viene eseguita una volta all’ora.

## Esportare i log di audit

Ogni pagina log ha **Esporta come CSV** nella barra degli strumenti. Il file esportato segue i filtri correnti della pagina e usa gli stessi valori temporali mostrati nella console web. Ogni esportazione include fino a 1000 record, ma puoi usare il filtro **Ora di inizio** per esportare tutti i log in batch.

Puoi anche usare un [token API](/docs/it/self-host/rustdesk-server-pro/console/#audit-auditspy) con `audits.py` per interrogare i log di audit.
