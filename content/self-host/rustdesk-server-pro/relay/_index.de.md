---
title: Relay-Server konfigurieren
weight: 17
---

## RustDesk Pro - Zusätzliche Relais-Server mit Geo-Standort mit Docker installieren

{{% notice note %}}
[Die einfache Installation](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/) erstellt implizit einen Relay-Server (den Prozess `hbbr`) auf demselben Rechner. Sie müssen den Relay-Server nicht explizit angeben.

Wenn Sie einen zusätzlichen Relay-Server explizit auf einem anderen Rechner einrichten wollen, führen Sie bitte `hbbr` aus, indem Sie der [OSS-Installation](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/) folgen. Sie finden `hbbr` in `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` oder in `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` benötigt keine Lizenz und ist die gleiche wie die Open-Source-Version.
{{% /notice %}}

Sie können mehrere Relay-Server auf der ganzen Welt betreiben und GeoLocation nutzen, um den nächstgelegenen Relay-Server zu verwenden, sodass Sie eine schnellere Verbindung zu entfernten Computern herstellen können.

> Sie benötigen das private Schlüsselpaar `id_ed25519` und `id_ed25519.pub`.

1 - Wenn Docker bereits installiert ist, verbinden Sie sich über SSH mit Ihrem Server und erstellen Sie ein Volume für hbbr.

```
# docker volume create hbbr
```

Das Volume hbbr sollte sich in `/var/lib/docker/volumes/hbbr/_data` befinden.

2 - Kopieren Sie das private Schlüsselpaar an den Speicherort des Volumes, in diesem Fall verwenden wir SCP, um die Dateien zu kopieren.

Die Befehlssyntax lautet: `scp <path/filename> username@server:</destination/path>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Stellen Sie den hbbr-Container unter Verwendung des zuvor erstellten Volumes bereit. Dieses Volume enthält das private Schlüsselpaar, das für die Ausführung Ihres privaten Relay-Servers benötigt wird.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Überprüfen Sie in den Logs, ob hbbr mit Ihrem Schlüsselpaar läuft.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

Je nach Betriebssystem können Sie IPs mithilfe einer Firewall blockieren oder zulassen.

In unserem Fall mit Ubuntu wollen wir alle TCP-Verbindungen zu den Ports 21117 und 21119 zulassen.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Firewall aktivieren**
```
# sudo ufw enable
```

**Status prüfen**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## RustDesk Pro für Geolocation über die Webkonsole konfigurieren

### GeoLite2 City-Datenbankdatei registrieren und herunterladen

Um Geolocation zu nutzen, benötigt hbbs Zugriff auf die MaxMind GeoLite2 City-Datenbank. Die Datenbank ist kostenlos und Sie können sich registrieren, um die Datei herunterzuladen und einen API-Schlüssel zu erhalten.

Erstellen Sie zunächst ein Konto (falls Sie noch keines haben), indem Sie die [Website](https://www.maxmind.com/en/account/login) aufrufen.
Gehen Sie zu `Download Databases`, wählen Sie die gzip-Datei und laden Sie GeoLite2 City herunter. Nach dem Dekomprimieren sollten Sie die Datei `mmdb` haben.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Wenn Sie RustDesk Pro mit Hilfe des Installationsskripts auf einem Linux-Rechner installiert haben, muss die Datei `mmdb` nach `/var/lib/rustdesk-server/` verschoben werden.

Bei Docker-Installationen sollte sich die Datei in dem Volume befinden, das Sie bei der Bereitstellung des Containers auf `/root` zugeordnet haben.

### Einen API-Schlüssel erhalten, um den Prozess zu automatisieren - Linux-Server

Sie müssen diese Datei regelmäßig aktualisieren und wir können einen Cronjob dafür verwenden. Für den Zugriff auf den kostenlosen Download-Link benötigen Sie einen API-Schlüssel.

Gehen Sie zu `Manage License Keys` und erzeugen Sie einen neuen Lizenzschlüssel. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

Sie können den [Download-Prozess](https://dev.maxmind.com/geoip/updating-databases) auf verschiedene Weise automatisieren. Fügen Sie den folgenden Befehl zu Ihrer crontab hinzu und ersetzen Sie {Your Access Key} durch den API-Schlüssel, den Sie im vorherigen Schritt erhalten haben.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Einstellungen in der RustDesk Pro Webkonsole ändern

Fügen Sie die IP-Adressen oder DNS-Namen Ihrer Relay-Server (DNS wird ab Version 1.1.11 unterstützt) zu den `Relay-Servern` hinzu. **Der Port ist nicht erforderlich, der Port `21117` wird explizit verwendet.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Fügen Sie einen Geo-Override hinzu, indem Sie die IP-Adresse des Servers und die Koordinaten des Serverstandorts angeben. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Klicken Sie auf `Reload Geo` und Ihre Liste sollte in etwa so aussehen. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Um die Ergebnisse zu bestätigen, überprüfen Sie Ihre hbbs-Protokolle, wenn Sie auf `Reload Geo` klicken. Sie sollten eine Meldung mit den IP-Adressen der Relay-Server und deren Koordinaten sehen.

> Wenn Sie RustDesk Pro auf einem Linux-Rechner ausführen, verwenden Sie den Befehl `RUST_LOG=debug ./hbbs`, um die Protokolle einzusehen. Wenn Sie auf einem Docker-Container arbeiten, verwenden Sie `docker logs hbbs`.

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

Sie können die Relay-Anfragen auch direkt auf Ihren hbbr-Instanzen bestätigen, indem Sie einfach die Containerprotokolle überprüfen.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
