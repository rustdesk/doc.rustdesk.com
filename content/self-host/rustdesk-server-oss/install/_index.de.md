---
title: Installation
weight: 1
---

## Video-Tutorials
Es gibt viele Video-Tutorials auf YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Server-Anforderungen
Die Hardware-Anforderungen sind sehr niedrig; die Mindestkonfiguration eines einfachen Cloud-Servers reicht aus, und die CPU- und Speicheranforderungen sind minimal. Sie können auch einen Raspberry Pi oder etwas Ähnliches verwenden. Bezüglich der Netzwerkgröße wird bei einem Fehlschlag der direkten TCP-Lochbohrverbindung der Relay-Verkehr verbraucht. Der Datenverkehr einer Relay-Verbindung liegt je nach Auflösungseinstellungen und Bildschirmaktualisierung zwischen 30 K/s und 3 M/s (1920x1080 Bildschirm). Wenn es nur für Büroarbeiten benötigt wird, liegt der Datenverkehr bei etwa 100 K/s.

## Firewall
Wenn Sie UFW installiert haben, verwenden Sie die folgenden Befehle zur Konfiguration der Firewall:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## Installation
### Methode 1: Docker (Empfohlen)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Für weitere Details schauen Sie bitte unter [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Methode 2: Installieren Sie Ihren eigenen Server als systemd-Dienst mit einem einfachen Installationsskript
Das Skript wird auf [Techahold](https://github.com/techahold/rustdeskinstall) gehostet und auf unserem [Discord](https://discord.com/invite/nDceKgxnkV) unterstützt.

Derzeit lädt das Skript die Relay- und Signal-Server (hbbr und hbbs) herunter und richtet sie ein, generiert Konfigurationen und hostet sie auf einer passwortgeschützten Webseite für eine einfache Bereitstellung auf Clients.

Führen Sie die folgenden Befehle aus:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

Es gibt auch ein Update-Skript im Repository von [Techahold](https://github.com/techahold/rustdeskinstall).

Notieren Sie sich von dort die IP/DNS und den Schlüssel, die am Ende der Installation angezeigt werden, und fügen Sie diese in die Client-Einstellungen > Netzwerk > ID/Relay-Server in die Felder `ID-Server` und `Schlüssel` ein, wobei Sie die anderen Felder leer lassen (siehe Hinweis unten).

### Methode 3: Installieren Sie Ihren eigenen Server als systemd-Dienst mit deb-Datei für Debian-Distributionen

Bitte [laden Sie](https://github.com/rustdesk/rustdesk-server/releases/latest) die deb-Dateien selbst herunter und installieren Sie sie mit `apt-get -f install <filename>.deb` oder `dpkg -i <filename>.deb`.

## Client konfigurieren
Bitte schauen Sie [hier](/docs/en/self-host/client-configuration/#2-manual-config).