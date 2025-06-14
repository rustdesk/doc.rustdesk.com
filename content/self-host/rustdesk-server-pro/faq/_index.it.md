---
title: FAQ
weight: 600
---

## Come posso installare con il script di installazione semplice?
1. Ottieni la tua licenza da [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), controlla la pagina [licenza](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) per maggiori dettagli.
2. Avvia un VPS, bare metal o VM Linux.
3. Se vuoi usare DNS e SSL, crea un nome DNS come `rustdesk.yourdomain.com`.
4. [Questa pagina](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copia e incolla il comando nel tuo terminale Linux.
6. Segui i prompt che ti guidano attraverso l'installazione.
7. Una volta completata l'installazione vai su `https://rustdesk.yourdomain.com` o `http://youripaddress:21114`.
8. Accedi con nome utente `admin` e password `test1234`.
9. Inserisci il tuo codice licenza acquistato al passaggio 1.

## Come posso convertire da RustDesk Server Open Source a RustDesk Server Pro?
1. Ottieni la tua licenza da [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), controlla la pagina [licenza](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) per maggiori dettagli.
2. Apri la porta TCP 21114.
3. Accedi al tuo RustDesk Server.
4. Se non usi già DNS e vuoi usare SSL, crea un nome DNS come `rustdesk.yourdomain.com`.
5. [Questa pagina](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copia e incolla il comando nel tuo terminale Linux.
7. Segui i prompt che ti guidano attraverso l'installazione.
8. Una volta completata l'installazione vai su `https://rustdesk.yourdomain.com` o `http://youripaddress:21114`.
9. Accedi con nome utente `admin` e password `test1234`.
10. Inserisci il tuo codice licenza acquistato al passaggio 1.

## C'è una nuova versione di RustDesk Server Pro, come posso aggiornare?
È meglio fare prima il backup dei file di dati (file sqlite3 ecc.), https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Se hai installato con script (`install.sh`)
Esegui [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
- ### Docker
```
sudo docker ps
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # uguale a come l'hai installato prima
```

## Ho installato con lo script, come posso avviare e fermare i servizi?
I servizi usano systemd quindi possono essere avviati e fermati usando `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` es. `sudo systemctl restart rustdesk-hbbs`.

## Ho installato con lo script, come posso visualizzare i log di Linux?
I log sono memorizzati in `/var/log/rustdesk-server`, puoi visualizzarli usando `tail /var/log/rustdesk-server/hbbs.log` o `tail /var/log/rustdesk-server/hbbs.error`.

## Ho installato con lo script, come posso controllare lo stato dei servizi RustDesk?
Per controllare lo stato `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` es. `sudo systemctl status rustdesk-hbbs`.

## Come posso cambiare la password admin?
1. Vai su `https://rustdesk.yourdomain.com` o `http://youripaddress:21114`.
2. Accedi con nome utente `admin` e password `test1234`.
3. Clicca su `admin` nell'angolo in alto a destra.
4. Clicca su `Impostazioni`.
5. Inserisci la tua nuova password nelle caselle fornite.

## Come posso spostare la mia licenza su un nuovo server?
Vedi [qui](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## Le email non funzionano dal mio VPS
Molti provider VPS bloccano le porte 465 e 25.

Un modo semplice per controllare è usare telnet. Per testare nel terminale Linux digita `telnet your.mailserver.com 25`. Su Windows usa PowerShell con `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

## Posso distribuire RustDesk usando PowerShell o simili?
Certo, puoi trovare script per aiutare la distribuzione [qui](https://rustdesk.com/docs/en/self-host/client-deployment/).

## Come posso segnalare un bug?
Segnala tramite [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## Perché se sto auto-ospitando questo non è gratuito e open source?
1. RustDesk è diventato un lavoro a tempo pieno per diverse persone, hanno vite, mogli, lavori e figli che richiedono attenzione e costano denaro!
2. Vogliamo essere qui e continuare a fare grandi progressi negli anni a venire.
3. La versione open source continuerà ad essere open source e incoraggiamo altri a fare sviluppi in linea con la licenza AGPL.

## Non riesco a connettermi ai dispositivi in gruppi diversi, perché?
Questo è facilmente risolto, devi permettere l'accesso cross-group.
1. Aggiungi nuovi gruppi.
2. Clicca `Modifica`.
3. Seleziona i gruppi rilevanti a cui vuoi accesso (li aggiunge automaticamente nel gruppo corrispondente).

## Come posso ottenere configurazioni automaticamente?
Le configurazioni sono generate automaticamente.
1. Scarica i client più recenti da [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. Nella pagina principale della console web clicca su `Windows EXE`.
3. Compila host e API (se diverso dalla tua configurazione).
4. Clicca `Invia`.
5. Scansiona il codice QR su Android e rinomina l'exe con quello che è stato generato.

## Offrite hosting per RustDesk Server Pro?
Contatta il nostro team [vendite](mailto://sales@rustdesk.com).

## C'è un posto dove posso vedere guide video di configurazione?
Sì! Abbiamo un [Canale YouTube](https://youtube.com/@RustDesk).

## Perché i miei log / nomi dispositivo sono vuoti?
Assicurati che l'API sia impostata correttamente sul dispositivo controllato, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Come posso disinstallare RustDesk Server Pro?
Esegui i seguenti comandi:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```

## Come posso rimuovere dispositivi dalla lista dispositivi nella console web?
Disabilita e poi elimina sarà disponibile.

## Come posso aggiornare RustDesk con PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'
$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)
if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}
if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}
cd C:\Temp
Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Errore `Key mismatch`
Configura il tuo client con la [chiave corretta](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Errore `Failed to connect to relay server`
Assicurati che `hbbr` sia in esecuzione. Più informazioni su `hbbr`, puoi trovarle [qui](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).

## Resetta MFA per account Admin
https://github.com/rustdesk/rustdesk/discussions/6576

## Impostare HTTPS per console web manualmente
Consulta la documentazione completa per istruzioni dettagliate su configurazione dominio, Nginx, Certbot e certificati SSL.

## SELinux
Se `Waiting for RustDesk Relay service to become active...` appare durante l'installazione, potrebbe essere causato da SELinux:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall
### Firewall cloud
Se esegui su AWS/Azure/Google/DigitalOcean cloud, apri le porte UDP (21116) e TCP (21114-21119) in entrata sul dashboard del provider cloud.

### Firewall server on-premise
```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
sudo firewall-cmd --reload
```

## Dopo aver cambiato la password admin nella console web non riesco ad accedere. C'è un modo semplice per resettare la password?
1. Assicurati di avere `rustdesk-utils` installato. Se non ce l'hai puoi ottenerlo [qui](https://github.com/rustdesk/rustdesk-server-pro).
2. Il comando è `rustdesk-utils set_password username password`. Se funziona dirà *Done*.

## Aggiungere certificato CA radice nel container Docker (per fallimento TLS con SMTP, OIDC ecc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
