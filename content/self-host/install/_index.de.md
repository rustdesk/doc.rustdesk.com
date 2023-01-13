---
title: Installation 
weight: 10
---

## Installieren Sie Ihren eigenen Server mit einem einfach auszuführenden Installationsskript
Das Skript wird auf https://github.com/dinger1986/rustdeskinstall gehostet und auf unserem [Discord](https://discord.com/invite/nDceKgxnkV) unterstützt.

Derzeit lädt das Skript die Relay- und Signal-Server (hbbr und hbbs) herunter und richtet sie ein, generiert Konfigurationen und hostet sie auf einer passwortgeschützten Webseite für die einfache Bereitstellung an Clients.

### Anforderungen
Sie müssen Linux installiert haben, das Skript wurde mit CentOS Linux 7/8, Ubuntu 18/20 und Debian getestet. Ein Server mit 1 CPU, 1 GB und 10 GB Festplattenspeicher ist ausreichend, um RustDesk zu betreiben.

#### So installieren Sie den Server
Bitte richten Sie Ihre Firewall auf Ihrem Server ein, bevor Sie das Skript ausführen.

Stellen Sie sicher, dass Sie über ssh oder auf andere Weise Zugang haben, bevor Sie die Firewall einrichten. Die Beispielbefehle für UFW (Debian-basiert) lauten:
```
ufw allow proto tcp from YOURIP to any port 22
```

#### Wenn Sie UFW installiert haben, verwenden Sie die folgenden Befehle, um die Firewall zu konfigurieren:
```
ufw allow 21115:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

#### Führen Sie die folgenden Befehle aus:
```
wget https://raw.githubusercontent.com/dinger1986/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```


## Installieren Sie Ihren eigenen Server mit Docker (Compose)

### Anforderungen
Sie müssen Docker/Podman installiert haben, um einen RustDesk-Server als Docker-Container zu betreiben

### Docker-Beispiele
#### Linux/amd64
```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr 
```
#### Linux/arm64v8
```bash
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbr 
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funktioniert nur unter **Linux**, was dazu führt, dass `hbbs`/`hbbr` die tatsächliche eingehende IP-Adresse sehen und nicht die Container-IP (172.17.0.1).
Wenn `--net=host` gut funktioniert, werden die Optionen `-p` nicht verwendet. Wenn Sie unter Windows arbeiten, lassen Sie `sudo` und `--net=host` weg.

**Bitte entfernen Sie `--net=host`, wenn Sie Verbindungsprobleme auf Ihrer Plattform haben.**
{{% /notice %}}

### Docker Compose-Beispiele
Um die Dockerdateien mit der docker-compose.yml wie hier beschrieben ausführen zu können, müssen Sie [**Docker Compose**](https://docs.docker.com/compose/) installiert haben.
#### Linux/amd64
```yaml
version: '3'

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r example.com:21117
    volumes:
      - ./hbbs:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./hbbr:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```
#### Linux/arm64v8
```yaml
version: '3'

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest-arm64v8
    command: hbbs -r example.com:21117
    volumes:
      - ./hbbs:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest-arm64v8
    command: hbbr
    volumes:
      - ./hbbr:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```


## Richten Sie Ihre eigene Serverinstanz ein, ohne Docker zu verwenden

### Schritt 1: Server-Software herunterladen

[Herunterladen](https://github.com/rustdesk/rustdesk-server/)

Verfügbare Plattformversionen:

- Linux
- Windows

Die folgende Anleitung basiert auf einem Linux-Build.

Es gibt zwei ausführbare Dateien und einen Ordner:

- `hbbs` - RustDesk ID/Rendezvous-Server
- `hbbr` - RustDesk Relay-Server

Sie wurden auf CentOS Linux 7 erstellt und auf CentOS Linux 7/8 sowie Ubuntu 18/20 getestet.

#### Server-Anforderungen

Die Hardwareanforderungen sind sehr gering. Die Mindestkonfiguration eines einfachen Cloud-Servers reicht aus und die CPU- und Speicheranforderungen sind minimal. Sie können auch einen Raspberry Pi oder etwas Ähnliches verwenden. Was die Netzauslastung anbelangt, so wird bei einem Ausfall der "TCP Hole Punching"-Direktverbindung der Relay-Verkehr in Anspruch genommen. Der Datenverkehr einer Relay-Verbindung liegt zwischen 30 K/s und 3 M/s (1920x1080-Bildschirm), abhängig von den Auflösungseinstellungen und der Bildschirmaktualisierung. Wenn es sich nur um eine Büroverbindung handelt, beträgt der Datenverkehr etwa 100 K/s.

### Schritt 2: hbbs und hbbr auf dem Server ausführen

#### Option 1
Starten Sie hbbs/hbbr auf Ihrem Server (CentOS oder Ubuntu). Wir empfehlen Ihnen die Verwendung von [pm2](https://pm2.keymetrics.io/) für die Verwaltung Ihres Dienstes.

```bash
./hbbs -r <relay-server-ip[:port]>
./hbbr
```

#### Option 2 - pm2
Starten Sie hbbs/hbbr mit pm2.

```bash
pm2 start hbbs -- -r <relay-server-ip[:port]>
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
pm2 benötigt NodeJS v16+. Wenn Sie pm2 nicht starten können (z. B. können Sie `hbbs`/`hbbr` nicht in `pm2 list` sehen), laden Sie bitte die NodeJS-LTS-Version von https://nodejs.org herunter und installieren Sie sie. Wenn Sie `hbbs`/`hbbr` nach einem Neustart automatisch ausführen lassen wollen, schauen Sie sich bitte `pm2 save` und `pm2 startup` an. Mehr über [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Ein weiteres gutes Werkzeug für Ihre Logs ist [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

Der Parameter `-r` von `hbbs` ist nicht zwingend erforderlich, es ist nur praktisch, wenn Sie auf der kontrollierten Client-Seite keinen Relay-Server angeben müssen. Sie brauchen den Port nicht anzugeben, wenn Sie den Standardport 21117 verwenden. Der vom Client angegebene Relay-Server hat eine höhere Priorität als dieser.
{{% /notice %}}

Standardmäßig lauscht `hbbs` auf 21115 (TCP), 21116 (TCP/UDP) und 21118 (TCP), `hbbr` lauscht auf 21117 (TCP) und 21119 (TCP). Diese Ports müssen in der Firewall geöffnet sein. **Bitte beachten Sie, dass 21116 sowohl für TCP als auch für UDP aktiviert sein muss.** 21115 wird für den NAT-Typ-Test verwendet, 21116/UDP wird für die ID-Registrierung und den Heartbeat-Dienst verwendet, 21116/TCP wird für das TCP-Hole-Punching und den Verbindungsdienst verwendet, 21117 wird für die Relay-Dienste verwendet und 21118 sowie 21119 werden zur Unterstützung von Webclients verwendet. *Wenn Sie die Webclient-Unterstützung (21118, 21119) nicht benötigen, können die entsprechenden Ports deaktiviert werden.*

- TCP (**21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

Wenn Sie einen eigenen Port auswählen möchten, geben Sie bitte die Option `-h` ein, um die Hilfe anzuzeigen.

<a name="net-host"></a>

{{% notice note %}}
`--net=host` funktioniert nur unter **Linux**, was dazu führt, dass `hbbs`/`hbbr` die tatsächliche eingehende IP-Adresse sehen und nicht die Container-IP (172.17.0.1).
Wenn `--net=host` gut funktioniert, werden die Optionen `-p` nicht verwendet. Wenn Sie unter Windows arbeiten, lassen Sie `sudo` und `--net=host` weg.

**Bitte entfernen Sie `--net=host`, wenn Sie Verbindungsprobleme auf Ihrer Plattform haben.**
{{% /notice %}}


### Schritt 3: hbbs/hbbr-Adresse auf der Client-Seite einstellen

Klicken Sie auf die Menü-Schaltfläche [ &#8942; ] rechts neben ID, wie unten gezeigt, und wählen Sie "ID/Relay-Server".

![](/docs/en/self-host/install/images/server-set-menu.png)

Geben Sie in das Eingabefeld **ID-Server** den `hbbs`-Host oder die IP-Adresse ein (lokale Seite und entfernte Seite). Die anderen beiden Adressen und Key können leer bleiben, RustDesk wird sie automatisch ableiten (falls nicht speziell eingestellt). Der Relay-Server verweist auf `hbbr` (Port 21117).

z. B.

```nolang
hbbs.example.com
```

oder

```nolang
hbbs.example.com:21116
```

![](/docs/en/self-host/install/images/server-set-window.png)

### Konfiguration in den Dateinamen von rustdesk.exe einfügen (nur Windows)

Ändern Sie `rustdesk.exe` in rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, z. B. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. Das Ergebnis der Konfiguration können Sie im untenstehenden Über-Fenster sehen.

<a name="invalidchar"></a>
{{% notice note %}}
Sie müssen sowohl `host` als auch `key` setzen, das Fehlen eines der beiden wird nicht funktionieren.

Wenn der Schlüssel ungültige Zeichen enthält, die nicht in einem Windows-Dateinamen verwendet werden können, entfernen Sie
bitte die Datei `id_ed25519` von Ihrem Server und starten Sie `hbbs`/`hbbr` neu. Dadurch wird die Datei `id_ed25519.pub` neu generiert.
Möglicherweise müssen Sie diesen Vorgang wiederholen, bis Sie gültige Zeichen erhalten.
{{% /notice %}}

| Menü | Über-Seite |
| -- | -- |
![](/docs/en/self-host/install/images/aboutmenu.png) | ![](/docs/en/self-host/install/images/lic.png) |

### Schlüssel

Anders als in der alten Version ist der Schlüssel in dieser Version obligatorisch, aber Sie brauchen ihn nicht selbst zu setzen. Wenn `hbbs` zum ersten Mal ausgeführt wird, erzeugt es automatisch ein Paar verschlüsselter privater und öffentlicher Schlüssel (die sich jeweils in den Dateien `id_ed25519` und `id_ed25519.pub` im aktuellen Verzeichnis befinden), deren Hauptzweck in der Verschlüsselung der Kommunikation besteht.

Wenn Sie `Key:` (mit dem Inhalt der öffentlichen Schlüsseldatei `id_ed25519.pub`) im vorherigen Schritt nicht ausgefüllt haben, hat dies keine Auswirkungen auf die Verbindung, aber diese kann nicht verschlüsselt werden.

```bash
cat ./id_ed25519.pub
````

Wenn Sie Benutzern ohne den Schlüssel den Aufbau unverschlüsselter Verbindungen verbieten wollen, fügen Sie bitte den Parameter `-k _` hinzu, wenn Sie z. B. `hbbs` und `hbbr` ausführen:

```bash
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
```

Wenn Sie den Schlüssel ändern wollen, entfernen Sie die Dateien `id_ed25519` und `id_ed25519.pub` und starten Sie `hbbs`/`hbbr`，`hbbs` wird ein neues Schlüsselpaar erzeugen.

{{% notice note %}}
Wenn Sie Docker Compose verwenden und die Schlüssel nicht vorhanden sind, werden beim Start der Container unterschiedliche Schlüssel in den Ordnern hbbs und hbbr erstellt.

Sie können die Schlüssel manuell in hbbs erstellen und vor dem Start der Container nach hbbr kopieren.

Oder Sie halten den Container hbbr an, kopieren die Schlüssel von hbbs in den Ordner hbbr und starten dann den Container neu.
{{% /notice %}}
