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

### 1. Acquistare un nome di dominio e risolverlo all'indirizzo IP del tuo server.
* Acquista un nome di dominio da un registrar come GoDaddy, Namecheap o Namesilo.
* Risolvi il nome di dominio all'indirizzo IP del tuo server con uno dei seguenti:
    - Il pannello di controllo del tuo registrar di domini (consigliato)
    - [Provider DNS](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Ad esempio, se acquisti un nome di dominio `example.com` da `Namesilo` e l'indirizzo IP del tuo server è `123.123.123.123`, vuoi usare il sottodominio `rustdesk.example.com` come indirizzo della console web HTTPS. Devi aprire [link](https://www.namesilo.com/account_domains.php), fare clic sul pulsante con tooltip `Manage dns for the domain`, aggiungere un record `A` con il nome host `rustdesk` e l'indirizzo IP del tuo server.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Ci vuole del tempo perché il DNS abbia effetto, https://www.whatsmydns.net e verifica se il nome di dominio è stato risolto all'indirizzo IP del tuo server. Il passaggio 6 dipende dal risultato corretto della risoluzione. Nei passaggi seguenti, sostituisci `<YOUR_DOMAIN>` con il tuo sottodominio, ad es. `rustdesk.example.com`.

### 2. Installare Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` o `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

Esegui `nginx -h` per verificare se è stato installato correttamente.

### 3. Installare Certbot
* Metodo 1: Se `snap` è installato, esegui `sudo snap install certbot --classic`.
* Metodo 2: Usando `python3-certbot-nginx` invece, ad es. `sudo apt-get install python3-certbot-nginx` per Ubuntu.
* Metodo 3: Se i due metodi precedenti sono falliti, prova a installare `certbot-nginx`, ad es. `sudo yum install certbot-nginx` per CentOS 7.

Esegui `certbot -h` per verificare se è stato installato correttamente.

### 4. Configurare Nginx
Ci sono due modi:
* Se esistono le directory `/etc/nginx/sites-available` e `/etc/nginx/sites-enabled`, sostituisci `<YOUR_DOMAIN>` del seguente comando con il tuo nome di dominio ed eseguilo.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Quindi esegui `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Esegui `cat /etc/nginx/sites-available/rustdesk.conf` per assicurarti che il suo contenuto sia corretto.

* Se le directory `/etc/nginx/sites-available` e `/etc/nginx/sites-enabled` non esistono e la directory `/etc/nginx/conf.d` esiste, sostituisci `<YOUR_DOMAIN>` del seguente comando con il tuo nome di dominio ed eseguilo.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Esegui `cat /etc/nginx/conf.d/rustdesk.conf` per assicurarti che il suo contenuto sia corretto.

### 5. Abilitare le regole del firewall per il dominio
Esegui i seguenti comandi:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Generare certificato SSL
Sostituisci `$YOUR_DOMAIN` con il tuo nome di dominio, quindi esegui
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

Se richiede `Enter email address (used for urgent renewal and security notices)`, inserisci il tuo indirizzo email.

Infine, il contenuto di `rustdesk.conf` dovrebbe essere così:
```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

Ecco alcuni errori comuni:

* La console stampa `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../default` invece di `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../rustdesk.conf`.

Il motivo potrebbe essere che Certbot non trova il file `rustdesk.conf`, puoi provare una delle seguenti soluzioni:
- Controlla il risultato del passaggio 5, esegui `sudo service nginx restart`.
- Copia le configurazioni del server `server{...}` che contengono `<YOUR_DOMAIN>` in `rustdesk.conf`, e cambia `location{...}` nel contenuto seguente.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Soluzione: Aggiungi un altro nome di dominio al DNS e cambia `<YOUR_DOMAIN>` con esso, ad es. `rustdesk2.example.com`. Quindi ripeti i passaggi 1, 4, 6.

* `Error getting validation data`

Soluzione: potrebbe essere causato dal firewall, consulta https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

Avviso: Esegui `sudo service nginx restart` se modifichi `rustdesk.conf` manualmente.

### 7. Accedere alla pagina web
* Apri `https://<YOUR_DOMAIN>` nel browser, accedi usando il nome utente predefinito "admin" e la password "test1234", quindi cambia la password con la tua.

### 8. Aggiungere supporto WebSocket Secure (WSS) per il server ID e il server relay per abilitare la comunicazione sicura su tutte le piattaforme.

Aggiungi la seguente configurazione alla prima sezione `server` del file `/etc/nginx/.../rustdesk.conf`, quindi riavvia il servizio `Nginx`.
Il client web può essere accessibile tramite `https://<YOUR_DOMAIN>/web`. I client personalizzati possono utilizzare WebSocket impostando `allow-websocket=Y` nelle opzioni avanzate. Se viene utilizzato il client personalizzato con WebSocket abilitato, non utilizzerà TCP/UDP e potrà connettersi solo tramite relay (tranne che per le connessioni IP dirette). Se viene utilizzato solo questo client con WebSocket abilitato, il server può chiudere le porte da 21114 a 21119 e mantenere aperta solo la porta 443.




```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

La configurazione completa è

```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Se hai distribuito precedentemente per i client web e vuoi usarlo su tutte le piattaforme, devi aggiungere `proxy_read_timeout`.
{{% /notice %}}

### 9. Bypassare CORS se usi il client web pubblico di RustDesk `https://rustdesk.com/web`

Devi aggiungere quanto segue nella sezione `location /` del `/etc/nginx/.../rustdesk.conf` per bypassare la limitazione CORS dei browser. Salta questo passaggio se stai usando il tuo client web.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

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
Ma questo dipende dalla tua versione di docker, per maggiori discussioni, controlla [questo](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
## puoi anche usare <CONTAINER NAME>, es. `hbbs` e `hbbr` se segui il nostro manuale.
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # uguale a come l'hai installato prima
```

es.

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Per maggiori dettagli, controlla [questo](https://www.cherryservers.com/blog/how-to-update-docker-image).

Il tuo server mail potrebbe non usare la porta 25. Assicurati di usare le porte corrette.

Se il tuo `hbbr` non gira sulla stessa macchina di `hbbs`, o hai più server relay, o non lo esegui sulla porta predefinita `21117`, devi dirlo esplicitamente a `hbbs`. Controlla [qui](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

Hai anche i seguenti altri comandi `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` e `reset_2fa_verification` che possono essere usati con `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

RustDesk imposta il firewall con `ufw`. Potrebbe non funzionare su alcune distribuzioni come CentOS 9, puoi provare con `firewall-cmd`:

Se usi IP:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Se usi DNS/Dominio:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Dopo quanto sopra, esegui `sudo firewall-cmd --reload` per ricaricare il firewall.

## Dopo aver cambiato la password admin nella console web non riesco ad accedere. C'è un modo semplice per reimpostare la password?
1. Assicurati di avere `rustdesk-utils` installato. Se non ce l'hai puoi ottenerlo [qui](https://github.com/rustdesk/rustdesk-server-pro). Inoltre devi eseguire il comando dalla cartella dove si trova il database, cioè `/var/lib/rustdesk-server`.
2. Il comando è `rustdesk-utils set_password username password`. Se funziona dirà *Done*.

Hai anche i seguenti altri comandi `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` e `reset_2fa_verification` che possono essere usati con `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Aggiungere certificato CA radice nel contenitore Docker (per errore TLS con SMTP, OIDC ecc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
