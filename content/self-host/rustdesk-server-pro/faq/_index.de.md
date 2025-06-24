---
title: FAQ
weight: 600
---

## Wie installiere ich mit dem einfachen Installationsskript?
1. Holen Sie sich Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.
2. Richten Sie einen VPS, einen physischen Server oder eine Linux-VM ein.
3. Wenn Sie DNS und SSL verwenden möchten, legen Sie einen DNS-Namen an, z. B. `trustdesk.ihredomain.de`.
4. Gehen Sie zu [dieser Seite](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/#installation).
5. Kopieren Sie den Befehl und fügen Sie ihn in Ihr Linux-Terminal ein.
6. Folgen Sie den Aufforderungen, die Sie durch die Installation führen.
7. Sobald die Installation abgeschlossen ist, gehen Sie zu `https://rustdesk.ihredomain.com` oder `http://ihreipadresse:21114`.
8. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
9. Geben Sie Ihren in Schritt 1 erworbenen Lizenzcode ein.

## Wie kann ich von RustDesk Server zu RustDesk Server Pro konvertieren?
1. Holen Sie sich Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.
2. Öffnen Sie den TCP-Port 21114.
3. Melden Sie sich bei Ihrem RustDesk-Server an.
4. Wenn Sie noch kein DNS verwenden und SSL nutzen wollen, erstellen Sie einen DNS-Namen, z. B. `rustdesk.ihredomain.com`.
5. Gehen Sie zu [dieser Seite](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/#konvertierung-von-open-source).
6. Kopieren Sie den Befehl und fügen Sie ihn in Ihr Linux-Terminal ein.
7. Folgen Sie den Aufforderungen, die Sie durch die Installation führen.
8. Sobald die Installation abgeschlossen ist, gehen Sie zu `https://rustdesk.ihredomain.com` oder `http://ihreipadresse:21114`.
9. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
10. Geben Sie Ihren in Schritt 1 erworbenen Lizenzcode ein.

## Es gibt eine neue Version von RustDesk Server Pro, wie kann ich ein Upgrade durchführen?
Sie sollten zuerst Ihre Datendateien (sqlite3-Dateien usw.) sichern, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Wenn Sie mit dem Skript installiert haben (`install.sh`)
Bitte führen Sie [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade) aus.
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Dies hängt jedoch von Ihrer Docker-Version ab. Weitere Informationen finden Sie [hier](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
## Sie können auch <CONTAINER NAME> verwenden, z. B. `hbbs` und `hbbr`, wenn Sie unserer Anleitung folgen.
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # Gleicher Befehl wie bei der Installation
```

z. B.

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

Weitere Details finden Sie [hier](https://www.cherryservers.com/blog/how-to-update-docker-image).

## Ich habe mit dem Skript installiert, wie kann ich Dienste starten und stoppen?
Die Dienste verwenden systemd und können mit `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` gestartet und gestoppt werden, z. B. `sudo systemctl restart rustdesk-hbbs`.

## Ich habe mit dem Skript installiert, wie kann ich die Linux-Protokolle einsehen?
Die Protokolle werden in `/var/log/rustdesk-server` gespeichert, Sie können sie mit `cat /var/log/rustdesk-server/hbbs.log` oder `cat /var/log/rustdesk-server/hbbs.error` einsehen.

## Ich habe mit dem Skript installiert, wie kann ich den Status der RustDesk-Dienste überprüfen?
Der Status kann mit `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` überprüft werden, z. B. `sudo systemctl status rustdesk-hbbs`.

## Wie ändere ich das Administrator-Passwort?
1. Gehen Sie zu `https://rustdesk.ihredomain.com` oder `http://ihreipadresse:21114`.
2. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
3. Klicken Sie oben rechts auf `admin`.
4. Klicken Sie auf `Einstellungen`.
5. Geben Sie Ihr neues Passwort in die vorgesehenen Felder ein.

## Wie kann ich meine Lizenz auf einen neuen Server übertragen?
Bitte sehen Sie [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/#rechnungen-und-migration).

## E-Mails funktionieren nicht von meinem VPS
Viele VPS-Anbieter blockieren die Ports 465 und 25.

Eine einfache Möglichkeit zur Überprüfung ist die Verwendung von Telnet. Geben Sie zum Testen im Linux-Terminal `telnet ihr.mailserver.com 25` ein. Unter Windows verwenden Sie PowerShell mit `Test-NetConnection -ComputerName ihr.mailserver.com -Port 25`.

Ihr Mailserver verwendet möglicherweise nicht den Port 25. Bitte stellen Sie sicher, dass Sie die richtigen Ports verwenden.

## Kann ich RustDesk mit PowerShell oder ähnlichem bereitstellen?
Sicher, Sie finden Skripte zur Unterstützung der Bereitstellung [hier](https://rustdesk.com/docs/de/self-host/client-deployment/).

## Ich habe RustDesk Server Pro manuell installiert, aber die API-Webkonsole ist nicht SSL-verschlüsselt, wie kann ich diese sichern?
Verwenden Sie einen Proxy wie Nginx, das einfache Installationsskript enthält einen, es ist wirklich einfach. [So machen wir es](https://github.com/rustdesk/rustdesk-server-pro/blob/493ad90daf8815c3052ff4d0d4aa9cc07e411efa/install.sh#L252).

Ähnliche Konfigurationen sollten mit Traefik v2, HAProxy, Apache Proxy und Cloudflare Tunnel funktionieren.

## Wie kann ich einen Fehlerbericht einreichen?
Bitte über [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues) einreichen.

## Warum ist das Programm nicht kostenlos und quelloffen, wenn ich es selbst hosten kann?
1. RustDesk ist für eine Reihe von Menschen zu einem Vollzeitjob geworden, sie haben ein Leben, Ehefrauen, Jobs und Kinder, was alles Aufmerksamkeit erfordert und Geld kostet!
2. Wir wollen auch in den kommenden Jahren hier sein und große Fortschritte machen.
3. Die Open-Source-Version wird weiterhin quelloffen bleiben und wir ermutigen andere, Entwicklungen im Einklang mit der AGPL-Lizenz vorzunehmen.

## Ich kann mich nicht mit Geräten in verschiedenen Gruppen verbinden, woran liegt das?
Das lässt sich leicht beheben, Sie müssen nur den gruppenübergreifenden Zugriff erlauben.
1. Fügen Sie neue Gruppen hinzu.
2. Klicken Sie auf `Bearbeiten`.
3. Wählen Sie die entsprechenden Gruppen aus, auf die Sie zugreifen möchten. Sie werden automatisch der entsprechenden Gruppe hinzugefügt.

## Wie kann ich Konfigurationen automatisch erstellen lassen?
Die Konfigurationen werden automatisch erstellt.
1. Laden Sie die neuesten Clients von [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) herunter.
2. Klicken Sie auf der Hauptseite der Webkonsole auf `Windows EXE`.
3. Geben Sie den Host und die API ein, falls sie sich von Ihrer Konfiguration unterscheiden.
4. Klicken Sie auf `Senden`.
5. Scannen Sie den QR-Code auf Ihrem Android-Gerät und benennen Sie die .exe-Datei in den Namen um, der erzeugt wurde.

## Bieten Sie Hosting für RustDesk Server Pro an?
Bitte setzen Sie sich mit unserem [Verkaufsteam](mailto://sales@rustdesk.com) in Verbindung.

## Kann ich irgendwo Videoanleitungen zur Inbetriebnahme ansehen?
Ja! Wir haben einen [YouTube-Kanal](https://youtube.com/@RustDesk).

## Warum sind meine Protokolle / Gerätenamen leer?
Stellen Sie sicher, dass API sowohl auf dem zu steuernden Gerät als auch auf der steuernden Maschine korrekt eingestellt ist, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Wie kann ich RustDesk Server Pro deinstallieren?
Führen Sie die folgenden Befehle aus:
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
Wenn das Skript Nginx installiert hat, entfernen Sie es mit:
```sh
sudo apt remove nginx
```

## Wie kann ich Geräte aus der Geräteliste in der Webkonsole entfernen?
Deaktivieren und anschließend löschen ist nun möglich.

## Wie kann ich RustDesk mit PowerShell aktualisieren?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver ist die neueste Version."
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

## Fehler `Key mismatch`
Bitte konfigurieren Sie Ihren Client mit dem [richtigen Schlüssel](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/relay/).

## Fehler `Failed to connect to relay server`
Bitte stellen Sie sicher, dass `hbbr` läuft. Mehr Informationen über `hbbr` finden Sie [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/).
Wenn Ihr `hbbr` nicht auf dem gleichen Rechner wie `hbbs` läuft, oder Sie mehrere Relay-Server haben, oder Sie es nicht auf dem Standard-Port `21117` laufen lassen, müssen Sie es explizit bei `hbbs` mitteilen. Bitte lesen Sie [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/relay/) nach.

## MFA für Admin-Konto zurücksetzen
https://github.com/rustdesk/rustdesk/discussions/6576

## HTTPS für die Webkonsole manuell einrichten

### 1. Kaufen Sie einen Domänennamen und lösen Sie ihn in die IP-Adresse Ihres Servers auf.
* Kaufen Sie einen Domänennamen bei einer Domänenregistrierungsstelle wie GoDaddy, Namecheap oder Namesilo.
* Lösen Sie den Domänennamen mit einer der folgenden Methoden in die IP-Adresse Ihres Servers auf:
- Das Bedienfeld Ihrer Domain-Registrierungsstelle (empfohlen)
- [DNS-Provider](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Wenn Sie z. B. den Domänennamen `example.com` von `Namesilo` kaufen und die IP-Adresse Ihres Servers `123.123.123.123` lautet, möchten Sie die Subdomain `rustdesk.example.com` als Adresse Ihrer HTTPS-Webkonsole verwenden. Öffnen Sie den [Link](https://www.namesilo.com/account_domains.php), klicken Sie auf die Schaltfläche mit dem Tooltipp `Manage dns for the domain`, fügen Sie einen `A`-Eintrag mit dem Hostnamen `rustdesk` und der IP-Adresse Ihres Servers hinzu.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Es dauert einige Zeit, bis DNS wirksam wird. Rufen Sie https://www.whatsmydns.net auf und prüfen Sie, ob der Domänenname in die IP-Adresse Ihres Servers aufgelöst wurde. Schritt 6 hängt vom korrekten Auflösungsergebnis ab. Ersetzen Sie in den folgenden Schritten `<IHRE_DOMAIN>` durch Ihre Subdomain, z. B. `rustdesk.example.com`.

### 2. Nginx installieren
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` oder `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

Führen Sie `nginx -h` aus, um zu überprüfen, ob es erfolgreich installiert wurde.

### 3. Certbot installieren
* Methode 1: Wenn `snap` installiert ist, führen Sie `sudo snap install certbot --classic` aus.
* Methode 2: Verwenden Sie stattdessen `python3-certbot-nginx`, z. B. `sudo apt-get install python3-certbot-nginx` für Ubuntu.
* Methode 3: Wenn die beiden obigen Methoden fehlgeschlagen sind, versuchen Sie `certbot-nginx` zu installieren, z. B. `sudo yum install certbot-nginx` für CentOS 7.

Führen Sie `certbot -h` aus, um zu überprüfen, ob es erfolgreich installiert wurde.

### 4. Nginx konfigurieren
Es gibt zwei Möglichkeiten:
* Wenn die Verzeichnisse `/etc/nginx/sites-available` und `/etc/nginx/sites-enabled` vorhanden sind, ersetzen Sie `<IHRE_DOMAIN>` des folgenden Befehls durch Ihren Domainnamen und führen Sie ihn aus.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
server_name <IHRE_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Dann führen Sie `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf` aus.

Führen Sie `cat /etc/nginx/sites-available/rustdesk.conf` aus, um sicherzustellen, dass der Inhalt korrekt ist.

* Wenn die Verzeichnisse `/etc/nginx/sites-available` und `/etc/nginx/sites-enabled` nicht existieren und das Verzeichnis `/etc/nginx/conf.d` vorhanden ist, ersetzen Sie `<IHRE_DOMAIN>` des folgenden Befehls durch Ihren Domänennamen und führen Sie ihn aus.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
server_name <IHRE_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Führen Sie `cat /etc/nginx/conf.d/rustdesk.conf` aus, um sicherzustellen, dass der Inhalt korrekt ist.

### 5. Firewallregeln für die Domäne aktivieren
Führen Sie die folgenden Befehle aus:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. SSL-Zertifikat generieren
Ersetzen Sie `$IHRE_DOMAIN` durch Ihren Domänennamen und führen Sie dann
`sudo certbot --nginx --cert-name $IHRE_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $IHRE_DOMAIN` aus.

Wenn Sie die Aufforderung `Enter email address (used for urgent renewal and security notices)` erhalten, geben Sie Ihre E-Mail-Adresse ein.

Schließlich sollte der Inhalt der Datei `rustdesk.conf` wie folgt aussehen:
```
server {
server_name <IHRE_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<IHRE_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<IHRE_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = <IHRE_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

server_name <IHRE_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot

}
```

Hier sind einige häufig auftretende Fehler:

* Die Konsole gibt `Successfully deployed certificate for <IHRE_DOMAIN> to /etc/nginx/.../default` aus und nicht `Successfully deployed certificate for <IHRE_DOMAIN> to /etc/nginx/.../rustdesk.conf`.

Der Grund könnte sein, dass Certbot die Datei `rustdesk.conf` nicht findet. Sie können eine der folgenden Lösungen versuchen:
- Überprüfen Sie das Ergebnis von Schritt 5, indem Sie `sudo service nginx restart` ausführen.
- Kopieren Sie die Serverkonfigurationen `server{...}`, die `<IHRE_DOMAIN>` enthalten, in die Datei `rustdesk.conf`, und ändern Sie `location{...}` in den folgenden Inhalt.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Lösung: Fügen Sie einen anderen Domänennamen zu DNS hinzu und ändern Sie `<IHRE_DOMAIN>` in diesen, z. B.: `rustdesk2.example.com`. Dann wiederholen Sie die Schritte 1, 4 und 6.

* `Error getting validation data`

Lösung: Möglicherweise liegt es an der Firewall, bitte lesen Sie https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/#firewall nach.

Hinweis: Führen Sie `sudo service nginx restart` aus, wenn Sie die `rustdesk.conf` manuell ändern.

### 7. Anmeldung auf der Webseite
* Öffnen Sie `https://<IHRE_DOMAIN>` im Browser, melden Sie sich mit dem Standard-Benutzernamen "admin" und dem Passwort "test1234" an und ändern Sie dann das Passwort in Ihr eigenes.

### 8. WebSocket Secure (WSS) Unterstützung für den ID-Server und Relay-Server hinzufügen, um sichere Kommunikation für alle Plattformen zu ermöglichen

Fügen Sie die folgende Konfiguration zum ersten `server`-Abschnitt der Datei `/etc/nginx/.../rustdesk.conf` hinzu und starten Sie dann den `Nginx`-Dienst neu. 
Der Web-Client kann über `https://YOUR_DOMAIN/web` aufgerufen werden. Benutzerdefinierte Clients können WebSocket verwenden, indem sie in den erweiterten Optionen `allow-websocket=Y` einstellen. Wenn der benutzerdefinierte Client mit aktiviertem WebSocket verwendet wird, wird er kein TCP/UDP nutzen und kann nur über ein Relais (außer bei direkten IP-Verbindungen) verbunden werden. Wenn nur dieser WebSocket-aktivierte Client verwendet wird, kann der Server die Ports 21114 bis 21119 schließen und nur Port 443 offen halten.

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

Die vollständige Konfiguration lautet:

```
server {
    server_name YOUR_DOMAIN;
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
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Wenn Sie zuvor für Web-Clients bereitgestellt haben und es auf allen Plattformen verwenden möchten, müssen Sie `proxy_read_timeout` hinzufügen.
{{% /notice %}}

### 9. CORS-Umgehung bei Verwendung des RustDesk öffentlichen Web-Clients `https://rustdesk.com/web`

Sie müssen Folgendes im `location /`-Abschnitt der Datei `/etc/nginx/.../rustdesk.conf` hinzufügen, um die CORS-Beschränkungen der Browser zu umgehen. Überspringen Sie diesen Schritt, wenn Sie Ihren eigenen Web-Client verwenden.

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

Wenn bei der Installation die Meldung `Waiting for RustDesk Relay service to become active...` erscheint, kann dies durch SELinux verursacht werden. Sie können die folgenden Befehle ausprobieren:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall

### Firewall der Cloud
Wenn Sie die Cloud von AWS, Azure, Google oder DigitalOcean nutzen, öffnen Sie bitte die eingehenden Ports 21116 (UDP) und 21114-21119 (TCP) im Dashboard des Cloud-Anbieters.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Firewall des lokalen Servers
RustDesk setzt die Firewall mit `ufw`. Es kann sein, dass es auf einigen Distributionen wie CentOS 9 nicht funktioniert. Sie können es mit `firewall-cmd` versuchen:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

Wenn Sie IP verwenden:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Wenn Sie DNS/Domain verwenden:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Danach führen Sie `sudo firewall-cmd --reload` aus, um die Firewall neu zu laden.

## Nach dem Ändern des Administrator-Passworts in der Webkonsole kann ich mich nicht anmelden. Gibt es eine einfache Möglichkeit, das Passwort zurückzusetzen?
1. Stellen Sie sicher, dass Sie `rustdesk-utils` installiert haben. Wenn nicht, können Sie es [hier](https://github.com/rustdesk/rustdesk-server-pro) erhalten. Außerdem müssen Sie den Befehl aus dem Ordner ausführen, in dem sich die Datenbank befindet, d.h. `/var/lib/rustdesk-server`.
2. Der Befehl lautet `rustdesk-utils set_password username password`. Wenn es funktioniert, wird *Done* angezeigt.

Sie haben auch die folgenden anderen Befehle `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` und `reset_2fa_verification`, die mit `rustdesk-utils` verwendet werden können.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Root-CA-Zertifikat in Docker-Container hinzufügen (für TLS-Fehler mit SMTP, OIDC usw.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
