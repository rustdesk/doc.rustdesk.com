---
title: Android
weight: 4
---

## Controllo remoto

Inserisci l'ID del dispositivo remoto nella pagina iniziale o seleziona un dispositivo storico per verificare.
Dopo la verifica riuscita, puoi controllare il dispositivo remoto.

| Home | Connesso con successo |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Il controllo input offre due modalità: `Modalità mouse` e `Modalità touch`, che possono essere commutate tramite la barra degli strumenti inferiore.

| Impostazioni mouse | Selezione modalità |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
In `Modalità mouse`, puoi anche attivare il `Clic destro` del dispositivo remoto con un `Tocco a due dita`
{{% /notice %}}

## Trasferimento file (Android)

> Richiede RustDesk ≥ 1.1.9

Seleziona il dispositivo nell'elenco dei dispositivi nella pagina iniziale.

Tieni premuto o tocca il menu a destra per selezionare `Trasferimento file`.

| Home | Connesso con successo |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- La directory iniziale è la directory home del dispositivo, puoi cliccare su <i class="fas fa-home"></i> per tornare rapidamente alla home.
- Sotto la barra del titolo c'è il livello della directory, puoi cliccare sulla cartella corrispondente per saltare rapidamente.
- Clicca su <i class="fas fa-arrow-up"></i> per accedere alla directory parent.
- Il percorso assoluto corrente e le statistiche del progetto saranno visualizzati in fondo alla lista.
- Clicca su `Locale` / `Remoto` nella barra del titolo per cambiare pagina.

### Come trasferire i file?

1. **Tieni premuto** un file o cartella nella lista per entrare rapidamente in **modalità selezione multipla**, che può selezionare più elementi.
2. Dopo aver selezionato il/i file, cambia la pagina `Locale` / `Remoto`. Dopo il cambio, vedrai il prompt `Incolla qui?` in fondo allo schermo.
3. Clicca sull'icona incolla file nell'immagine per trasferire gli elementi selezionati alla directory di destinazione.

| Modalità selezione multipla | Incolla file |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## Imposta server ID/Relay

1. Clicca su `Impostazioni` nella barra di navigazione inferiore.
2. Clicca su `Server ID/Relay`.
3. Inserisci il nome host/indirizzo IP del tuo server ID nel campo `Server ID`. Lascia `Server Relay` e `Server API` vuoti, e inserisci la tua chiave pubblica (opzionale, richiesta per la crittografia) nel campo `Chiave`. Premi **OK** per salvare le impostazioni. Passerà automaticamente al server specificato.

Puoi anche configurarlo scansionando un codice QR. Per generare il codice QR, usa il seguente formato (cambia i valori `host` e `key` con i tuoi):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Poi vai su un [Generatore di codice QR online](https://www.qr-code-generator.com/) e incolla il codice sopra.

L'immagine sotto è uno screenshot di Android. Se è iOS, controlla il menu in alto a destra nella pagina iniziale.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## Condividi schermo/file del tuo telefono Android

A partire dalla versione 1.1.9, il client Android ha aggiunto le funzioni di condivisione dello schermo del telefono e di condivisione del file system del telefono.

- Android 6 e superiore è richiesto per la condivisione dello schermo
- Android 10 o superiore è richiesto per condividere l'audio interno del sistema del telefono cellulare
- iOS non supporta ancora la condivisione dello schermo

### Richiedi permessi e avvia servizi

Clicca su `Condividi schermo` nella barra di navigazione inferiore.

Configura vari permessi secondo necessità. Ogni volta che avvii RustDesk, devi richiedere nuovamente i permessi "Cattura schermo" e "Controllo input".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Permesso | Descrizione |
| --- | --- |
| Cattura schermo | Se abilitare il permesso di condivisione cattura schermo, il servizio di monitoraggio sarà abilitato contemporaneamente all'avvio |
| Controllo input* | Se permettere al controller di controllare l'input del telefono, come operazioni touchscreen virtuali con il mouse |
| Trasferimento file* | Se abilitare il permesso di trasferimento file, dopo l'avvio, puoi controllare remotamente il file system di questo telefono |
| Cattura audio | Se condividere la musica di sistema interna del telefono (non input microfono) |

{{% notice note %}}
Il * sopra rappresenta permessi speciali. Per ottenere tali permessi, devi saltare alla pagina delle impostazioni del sistema Android per ottenerli manualmente. I dettagli sono i seguenti
{{% /notice %}}

### Richiesta permesso speciale - File

| Richiedere permessi file Android salterà automaticamente alla pagina delle impostazioni di sistema |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### Richiesta permesso speciale - input mouse
| Passo 1: Trova "Servizi installati" | Passo 2: Avvia RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
La pagina delle impostazioni di sistema di diversi fornitori può essere diversa, regolala secondo la tua pagina di sistema.
{{% /notice %}}

| Scorciatoie controllo mouse remoto | Descrizione |
| --- | --- |
| Clic destro del mouse | Indietro |
| Clic rotella del mouse | Home |
| Pressione lunga rotella del mouse | App aperte di recente |
| Scorrimento rotella del mouse | Simula scorrimento verticale |

### Avvia servizio

Dopo aver ottenuto il permesso `Cattura schermo`, il servizio sarà avviato automaticamente. Puoi anche cliccare sul pulsante `Avvia servizio` per avviare il servizio. Una volta avviato il servizio, può accettare richieste di controllo desktop da altri dispositivi.

Se il permesso `Trasferimento file` è abilitato, può anche accettare richieste di controllo file da altri dispositivi.

Dopo aver avviato il servizio, un ID unico e una password casuale saranno automaticamente ottenuti per questo dispositivo. Altri dispositivi possono controllare il telefono tramite ID e password, o confermare manualmente quando ricevono una nuova richiesta.

| Prima di avviare il servizio | Dopo aver avviato il servizio |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Cliccare su `Avvia servizio` abiliterà il permesso `Cattura schermo` per default.
2. Quando il permesso `Cattura schermo` non è ottenuto, altri dispositivi non possono emettere richieste di controllo.
3. Eccetto per il permesso `Cattura schermo`, il cambio di altri permessi influenzerà solo le nuove connessioni e non influenzerà la connessione stabilita. Se devi cambiare permessi per una connessione stabilita, chiudi prima la connessione corrente, modifica i permessi e poi ricevi una richiesta di controllo.
{{% /notice %}}

#### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### Terminale mobile

| Puoi fermare il servizio o chiudere la connessione specificata in qualsiasi momento | Puoi ricevere o iniziare chat |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |