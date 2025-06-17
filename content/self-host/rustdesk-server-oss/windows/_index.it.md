---
title: Windows & PM2 o NSSM
weight: 20
---

{{% notice note %}}
La politica di sicurezza di Windows è complessa. Se questo tutorial non funziona per te o riscontri connessioni instabili, ti consigliamo di migrare a un server Linux.
{{% /notice %}}

{{% notice note %}}
La versione GUI, `RustDeskServer.setup.exe`, non è più mantenuta e non è raccomandata.
{{% /notice %}}

## Un bivio
Ora hai due scelte: puoi usare PM2 (più facile) o NSSM (un po' più difficile) per avviare il server RustDesk.
Ci sono alcuni vantaggi nell'usare NSSM:
- Compatibilità con versioni precedenti di Windows (Windows Server 2008 R2/Windows 7 e precedenti, anche se non testato).
- Ideale per Windows Server
- Avvio automatico all'accensione senza login (L'utente che ha creato la voce di avvio non deve effettuare l'accesso per avviarla).
- Esecuzione di entrambi i binari come servizi.
- Autonomo (nessuna dipendenza da Node.js)

Mentre i vantaggi di PM2 includono:
- Buona idea se esegui il server sullo stesso computer del tuo computer di lavoro principale
- Effettui regolarmente l'accesso all'utente che ha creato la voce di avvio di RustDesk
- Più user-friendly

## Installazione usando NSSM

### Installazione di NSSM
Per favore [scarica](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) ed estrai NSSM, seleziona l'architettura appropriata per il tuo sistema Windows (se x86 usa il contenuto della cartella win32, se x64 usa il contenuto della cartella win64). È anche buona prassi spostare il binario di NSSM nella directory `Program Files\NSSM` (NSSM una volta avviato come servizio, non può essere spostato dalla directory in cui è stato posizionato, quindi è meglio riporlo in `Program Files`) del tuo drive di installazione (solitamente il drive C:). È anche consigliabile aggiungere il percorso (come `C:\Program Files\NSSM`) alla variabile path.

### Verifica se NSSM è installato correttamente
Se hai fatto tutto correttamente, la cartella `C:\Program Files\NSSM` (in questo esempio uso il drive C: ma puoi usare qualsiasi drive dove hai installato Windows o qualsiasi percorso desideri) dovrebbe contenere solo il file `nssm.exe`.

Useremo `C:\Program Files\NSSM` in questo esempio.

Apri il prompt dei comandi ed esegui `nssm`, se vedi una pagina di aiuto sei pronto per passare al passo successivo.

### Eseguire hbbr e hbbs
Scarica la versione Windows di [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases).
Decomprimi il programma in `C:\Program Files\RustDesk Server` (o dove preferisci, assicurati solo che non cambi dopo l'installazione del servizio). Ora torna al prompt dei comandi.

Useremo `C:\Program Files\RustDesk Server` in questo esempio.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Nota:**
- Puoi cambiare `RustDesk hbbs service` con qualsiasi nome desideri per il servizio hbbs
- Puoi cambiare `RustDesk hbbr service` con qualsiasi nome desideri per il servizio hbbr
- Puoi cambiare `C:\Program Files\RustDesk Server\hbbs.exe` con il percorso dove hai posizionato i binari di RustDesk
- Puoi cambiare `C:\Program Files\RustDesk Server\hbbr.exe` con il percorso dove hai posizionato i binari di RustDesk

**Template dei comandi:**

Il template del comando nel caso tu voglia solo copiare, incollare e modificare.

```cmd
nssm install <Nome servizio hbbs desiderato> <Percorso binario RustDesk hbbs> <Argomenti RustDesk hbbs>
nssm install <Nome servizio hbbr desiderato> <Percorso binario RustDesk hbbr> <Argomenti RustDesk hbbr>
```

**Avviare i servizi**

Dopo l'installazione riuscita dei servizi, devono essere avviati.
```cmd
nssm start <Nome servizio hbbs desiderato>
nssm start <Nome servizio hbbr desiderato>
```

**Fatto!**

(Il metodo sopra è stato testato su Windows Server Core 2022 Standard).

## oppure

## Installazione usando PM2

### Installa Node.js

Per favore [scarica](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) e installa Node.js.
Node.js è l'ambiente di runtime di PM2, quindi devi installare prima Node.js.

### Installa PM2

Inserisci i seguenti comandi in `cmd.exe`, premi il tasto <kbd>Invio</kbd> per ogni riga ed eseguili riga per riga.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Eseguire hbbr e hbbs

Scarica la versione Windows di [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases). Decomprimi il programma nel drive C:. Esegui i seguenti quattro comandi:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Visualizzare il log

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Tutorial alternativi
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat