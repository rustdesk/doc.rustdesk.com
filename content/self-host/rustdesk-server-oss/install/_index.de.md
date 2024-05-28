---
title: Installation
weight: 1
---

### Installieren Sie Ihren eigenen Server als Dienst systemd mit einem einfach auszuführenden Installationsskript
Das Skript wird auf [Techahold](https://github.com/techahold/rustdeskinstall) gehostet und auf unserem [Discord](https://discord.com/invite/nDceKgxnkV) unterstützt.

Derzeit lädt das Skript die Relay- und Signal-Server (hbbr und hbbs) herunter und richtet sie ein, generiert Konfigurationen und hostet sie auf einer passwortgeschützten Webseite für die einfache Bereitstellung an Clients.

#### Anforderungen
Sie müssen Linux installiert haben, das Skript wurde mit CentOS Linux 7/8, Ubuntu 18/20 und Debian getestet. Ein Server mit 1 CPU, 1 GB RAM und 10 GB Festplattenspeicher ist ausreichend, um RustDesk zu betreiben.

##### So installieren Sie den Server
Bitte richten Sie Ihre Firewall auf Ihrem Server ein, bevor Sie das Skript ausführen.

Stellen Sie sicher, dass Sie über SSH oder auf andere Weise Zugang haben, bevor Sie die Firewall einrichten. Die Beispielbefehle für UFW (Debian-basiert) lauten:
```
ufw allow proto tcp from YOURIP to any port 22
```

Wenn Sie UFW installiert haben, verwenden Sie die folgenden Befehle, um die Firewall zu konfigurieren (Port 8000 wird nur benötigt, wenn Sie die automatisch generierten Installationsdateien verwenden möchten):
```
ufw allow 21114:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

Führen Sie die folgenden Befehle aus:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```
Es gibt auch ein Update-Skript auf [Techaholds](https://github.com/techahold/rustdeskinstall) Repository.

### Installieren Sie Ihren eigenen Server als Dienst systemd mit einer .deb-Datei für Debian-Distributionen

Bitte laden Sie die [.deb-Dateien](https://github.com/rustdesk/rustdesk-server/releases/latest) selbst herunter und installieren Sie sie mit `apt-get -f install <Dateiname>.deb` oder `dpkg -i <Dateiname>.deb`.

### Richten Sie Ihre eigene Serverinstanz manuell ein.

#### Schritt 1: Server-Software herunterladen

[Herunterladen](https://github.com/rustdesk/rustdesk-server/releases/latest)

Verfügbare Plattformversionen:

- Linux
- Windows

Die folgende Anleitung basiert auf einem Linux-Build.

Es gibt zwei ausführbare Dateien und einen Ordner:

- `hbbs` - RustDesk ID/Rendezvous-Server
- `hbbr` - RustDesk Relay-Server

Sie wurden auf CentOS Linux 7 erstellt und auf CentOS Linux 7/8 sowie Ubuntu 18/20 getestet.

##### Server-Anforderungen

Die Hardwareanforderungen sind sehr gering. Die Mindestkonfiguration eines einfachen Cloud-Servers reicht aus und die CPU- und Speicheranforderungen sind minimal. Sie können auch einen Raspberry Pi oder etwas Ähnliches verwenden. Was die Netzauslastung anbelangt, so wird bei einem Ausfall der "TCP Hole Punching"-Direktverbindung der Relay-Verkehr in Anspruch genommen. Der Datenverkehr einer Relay-Verbindung liegt zwischen 30 K/s und 3 M/s (1920x1080-Bildschirm), abhängig von den Auflösungseinstellungen und der Bildschirmaktualisierung. Wenn es sich nur um eine Büroverbindung handelt, beträgt der Datenverkehr etwa 100 K/s.

#### Schritt 2: hbbs und hbbr auf dem Server ausführen

Wir empfehlen Ihnen die Verwendung von [PM2](https://pm2.keymetrics.io/) für die Verwaltung Ihres Dienstes.

##### Option 1
Starten Sie hbbs/hbbr ohne PM2.

```sh
./hbbs -r <relay-server-ip[:port]>
./hbbr
```

##### Option 2
Starten Sie hbbs/hbbr mit PM2.

```sh
pm2 start hbbs -- -r <relay-server-ip[:port]>
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
PM2 benötigt Node.js v16+. Wenn Sie PM2 nicht starten können (z. B. können Sie `hbbs`/`hbbr` nicht in `pm2 list` sehen), laden Sie bitte die Node.js-LTS-Version von https://nodejs.org herunter und installieren Sie sie. Wenn Sie `hbbs`/`hbbr` nach einem Neustart automatisch ausführen lassen wollen, schauen Sie sich bitte `pm2 save` und `pm2 startup` an. Mehr über [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/). Ein weiteres gutes Werkzeug für Ihre Logs ist [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

Der Parameter `-r` von `hbbs` ist nicht zwingend erforderlich. Es ist nur praktisch, wenn Sie auf der kontrollierten Client-Seite keinen Relay-Server angeben müssen. Sie müssen den Port nicht angeben, wenn Sie den Standardport 21117 verwenden. Der vom Client angegebene Relay-Server hat eine höhere Priorität als dieser.
{{% /notice %}}

Standardmäßig lauscht `hbbs` auf 21114 (TCP für die Webkonsole, nur in der Pro-Version verfügbar), 21115 (TCP), 21116 (TCP/UDP) und 21118 (TCP), `hbbr` lauscht auf 21117 (TCP) und 21119 (TCP). Diese Ports müssen in der Firewall geöffnet sein. **Bitte beachten Sie, dass 21116 sowohl für TCP als auch für UDP aktiviert sein muss.** 21115 wird für den NAT-Typ-Test verwendet, 21116/UDP wird für die ID-Registrierung und den Heartbeat-Dienst verwendet, 21116/TCP wird für das TCP-Hole-Punching und den Verbindungsdienst verwendet, 21117 wird für die Relay-Dienste verwendet und 21118 sowie 21119 werden zur Unterstützung von Webclients verwendet. *Wenn Sie die Webclient-Unterstützung (21118, 21119) nicht benötigen, können die entsprechenden Ports deaktiviert werden.*

- TCP (**21114, 21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

Wenn Sie einen eigenen Port auswählen möchten, geben Sie bitte die Option `-h` ein, um die Hilfe anzuzeigen.

#### Schritt 3: [hbbs/hbbr-Adresse auf der Client-Seite einstellen](/docs/de/self-host/client-configuration/)

### Schlüssel

Der Schlüssel ist obligatorisch, aber Sie brauchen ihn nicht selbst zu setzen. Wenn `hbbs` zum ersten Mal ausgeführt wird, erzeugt es automatisch ein Paar verschlüsselter privater und öffentlicher Schlüssel (die sich jeweils in den Dateien `id_ed25519` und `id_ed25519.pub` im aktuellen Ordner befinden), deren Hauptzweck in der Verschlüsselung der Kommunikation besteht.

Wenn Sie `Key:` (mit dem Inhalt der öffentlichen Schlüsseldatei `id_ed25519.pub`) im vorherigen Schritt nicht ausgefüllt haben, hat dies keine Auswirkungen auf die Verbindung, aber diese kann nicht verschlüsselt werden.

```sh
cat ./id_ed25519.pub
```

Wenn Sie den Schlüssel ändern wollen, entfernen Sie die Dateien `id_ed25519` und `id_ed25519.pub` und starten Sie `hbbs`/`hbbr`, `hbbs` wird ein neues Schlüsselpaar erzeugen.

{{% notice note %}}
Wenn Sie Docker Compose verwenden und die Schlüssel nicht vorhanden sind, werden beim Start der Container unterschiedliche Schlüssel in den Ordnern hbbs und hbbr erstellt.

Sie können die Schlüssel manuell in hbbs erstellen und vor dem Start der Container nach hbbr kopieren.

Oder Sie halten den Container hbbr an, kopieren die Schlüssel von hbbs in den Ordner hbbr und starten dann den Container neu.
{{% /notice %}}
