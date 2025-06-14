---
title: Configurare server di relay
weight: 17
---

## RustDesk Pro - Installare server di relay aggiuntivi con geolocalizzazione usando docker

{{% notice note %}}
[L'installazione semplice](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/) crea un server di relay (il processo `hbbr`) implicitamente sulla stessa macchina, non è necessario specificare il server di relay esplicitamente.

Se vuoi creare un server di relay aggiuntivo esplicitamente su un'altra macchina, esegui `hbbr` seguendo l'[installazione OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/). Puoi trovare `hbbr` in `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` o in `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` non richiede una licenza ed è uguale alla versione open source.
{{% /notice %}}

Puoi avere diversi server di relay in esecuzione in tutto il mondo e sfruttare la geolocalizzazione automaticamente per utilizzare il server di relay più vicino, dandoti un'esperienza più veloce quando ti connetti a computer remoti. `hbbs` controlla automaticamente se questi server di relay sono online ogni pochi secondi, sceglie solo server di relay online.

{{% notice note %}}
Problema noto: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Avrai bisogno della coppia di chiavi private `id_ed25519` e `id_ed25519.pub`.

1 - Se docker è già installato, connettiti al tuo server via SSH e crea un volume per hbbr.

```
# docker volume create hbbr
```

Il volume hbbr dovrebbe essere posizionato in `/var/lib/docker/volumes/hbbr/_data`.

2 - Copia la coppia di chiavi private nella posizione del volume, in questo caso useremo SCP per copiare i file.

La sintassi del comando è `scp <percorso/nome_file> username@server:</percorso/destinazione>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Distribuisci il container hbbr usando il volume creato precedentemente. Questo volume ha la coppia di chiavi private necessaria per eseguire il tuo server di relay privato.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Controlla i log di esecuzione per verificare che hbbr sia in esecuzione usando la tua coppia di chiavi.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

A seconda del tuo OS, potresti voler bloccare/consentire IP usando un firewall.

Nel nostro caso, eseguendo Ubuntu vogliamo consentire qualsiasi connessione TCP, alle porte 21117 e 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Abilita il firewall**
```
# sudo ufw enable
```

**Controlla lo stato**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Configurare RustDesk Pro per la geolocalizzazione usando la console web

### Registrarsi e scaricare il file del database GeoLite2 City

Per utilizzare la geolocalizzazione, hbbs ha bisogno di accesso al database MaxMind GeoLite2 City. Il database è gratuito e puoi registrarti per scaricare il file e ottenere una chiave API.

Inizia creando un account (se non ne hai uno) andando al [sito web](https://www.maxmind.com/en/account/login).
Vai su `Download Databases` e scarica GeoLite2 City, scegli il file gzip e dovresti ottenere il file `mmdb` quando lo decomprimi.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Se hai installato RustDesk Pro usando lo script di installazione su una macchina Linux, il file `mmdb` deve essere spostato in `/var/lib/rustdesk-server/`.

Per le installazioni Docker il file dovrebbe essere nel volume che hai mappato quando hai distribuito il container mappato su `/root`.

### Ottenere una chiave API per automatizzare il processo - server Linux

Devi aggiornare questo file regolarmente e possiamo usare un cronjob per farlo. Avrai bisogno di una chiave API per accedere al link di download che è gratuito.

Vai su `Manage License Keys` e genera una nuova chiave di licenza. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

Puoi automatizzare il [processo di download](https://dev.maxmind.com/geoip/updating-databases) in alcuni modi, ma aggiungi il seguente comando al tuo crontab sostituendo {Your Access Key} con la chiave API che hai ottenuto dal passaggio precedente.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Modificare le impostazioni nella console web RustDesk Pro

Aggiungi i tuoi indirizzi IP o nomi DNS dei server di relay (DNS è supportato dalla versione 1.1.11) ai `Server di relay`. **La porta non è richiesta, la porta `21117` è utilizzata esplicitamente.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Aggiungi un override geografico aggiungendo l'indirizzo IP del server e le coordinate dove si trova il server. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Clicca su `Reload Geo` e la tua lista dovrebbe assomigliare a questa. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Per confermare i risultati, controlla i tuoi log hbbs quando clicchi su `Reload Geo`, dovresti vedere un messaggio che mostra gli indirizzi IP dei server di relay e le loro coordinate.

> Se stai eseguendo RustDesk Pro su una macchina Linux usa il comando `RUST_LOG=debug ./hbbs` per visualizzare i log. Se stai eseguendo su un container Docker usa `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

Puoi anche confermare le richieste di relay direttamente sulle tue istanze hbbr, semplicemente controllando i log del container.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```