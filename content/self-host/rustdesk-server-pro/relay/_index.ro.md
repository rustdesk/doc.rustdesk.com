---
title: Configurare servere Relay
weight: 17
---

## RustDesk Pro - Instalare servere relay adiționale cu Geo Location folosind Docker

{{% notice note %}}
[Instalarea simplă](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/) creează implicit un server relay (procesul `hbbr`) pe aceeași mașină; nu trebuie să specificați explicit un server relay.

Dacă doriți să creați explicit un server relay adițional pe o altă mașină, rulați `hbbr` urmând [instalarea OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/). Veți găsi `hbbr` în `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` sau în `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` nu necesită licență și este identic cu versiunea open source.
{{% /notice %}}

Puteți rula mai multe servere relay distribuite geografic și folosi GeoLocation pentru a selecta automat serverul relay cel mai apropiat, oferind o experiență mai rapidă la conectarea la computere remote. `hbbs` verifică automat dacă aceste servere relay sunt online la fiecare câteva secunde și folosește doar cele online.

{{% notice note %}}
Problemă cunoscută: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Veți avea nevoie de perechea de chei private `id_ed25519` și `id_ed25519.pub`.

1 - Dacă Docker este deja instalat, conectați‑vă la server prin SSH și creați un volume pentru `hbbr`.

```
# docker volume create hbbr
```

Volume‑ul `hbbr` va fi localizat în `/var/lib/docker/volumes/hbbr/_data`.

2 - Copiați perechea de chei private în locația volume‑ului; în acest exemplu folosim SCP pentru a copia fișierele.

Sintaxa comenzii este `scp <path/filename> username@server:</destination/path>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Desfășurați containerul `hbbr` folosind volumul creat anterior. Acest volume conține perechea de chei private necesară pentru a rula serverul relay privat.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Verificați jurnalele pentru a confirma că `hbbr` rulează folosind perechea de chei.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

În funcție de sistemul de operare, s‑ar putea să doriți să blocați/permiteți IP‑uri folosind un firewall.

În exemplul nostru (Ubuntu) dorim să permitem conexiuni TCP către porturile 21117 și 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Activați firewall‑ul**
```
# sudo ufw enable
```

**Verificați starea**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Configurare RustDesk Pro pentru Geo Location folosind consola web

### Înregistrare și descărcare a bazei de date GeoLite2 City

Pentru a folosi geo location, `hbbs` are nevoie de fișierul bazei de date MaxMind GeoLite2 City. Baza de date este gratuită: înregistrați‑vă pentru a descărca fișierul și a obține o cheie API.

Începeți prin a crea un cont (dacă nu aveți) la [site‑ul MaxMind](https://www.maxmind.com/en/account/login).
Accesați `Download Databases` și descărcați GeoLite2 City; alegeți fișierul gzip și veți obține fișierul `mmdb` după decomprimare.

![](https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5)

Dacă ați instalat RustDesk Pro folosind scriptul de instalare pe o mașină Linux, fișierul `mmdb` trebuie mutat în `/var/lib/rustdesk-server/`.

Pentru instalările Docker, fișierul ar trebui să se afle în volumul mapat la `/root`.

### Obțineți o cheie API pentru automatizare - servere Linux

Trebuie să actualizați acest fișier în mod regulat, și putem folosi un cronjob pentru asta. Veți avea nevoie de o cheie API pentru a accesa link‑ul de descărcare, care este gratuit.

Accesați `Manage License Keys` și generați o cheie nouă.
<br>
![](https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9)
<br>
![](https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad)

Puteți automatiza [procesul de descărcare](https://dev.maxmind.com/geoip/updating-databases) în mai multe feluri; adăugați următoarea comandă în crontab, înlocuind {Your Access Key} cu cheia API obținută anterior.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Modificați setările în consola web RustDesk Pro

Adăugați adresele IP sau numele DNS ale serverelor relay (DNS este suportat începând cu versiunea 1.1.11) la `Relay Servers`. **Portul nu este necesar, portul `21117` este folosit implicit.**
<br>
![](https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c)

Adăugați un Geo Override introducând adresa IP a serverului și coordonatele unde este localizat serverul.
<br>
![](https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369)

Faceți clic pe `Reload Geo` și lista dvs. ar trebui să arate similar.
<br>
![](https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7)

Pentru a confirma rezultatele, verificați jurnalele `hbbs` când faceți clic pe `Reload Geo`; ar trebui să vedeți un mesaj care afișează adresele IP ale serverelor relay și coordonatele acestora.

> Dacă rulați RustDesk Pro pe o mașină Linux folosiți comanda `RUST_LOG=debug ./hbbs` pentru a vedea jurnalele. Dacă rulați într‑un container Docker folosiți `docker logs hbbs`.

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

De asemenea, puteți confirma cererile relay direct pe instanțele `hbbr`, verificând pur și simplu jurnalele containerelor.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```