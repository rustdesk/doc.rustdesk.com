---
title: Einfache Installation
weight: 10
---

{{% notice note %}}
Vergessen Sie nicht, Ihre Lizenz unter [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) zu erwerben, auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.

Bitte lesen Sie zuerst die [OSS-Installation](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/), bevor Sie diese einfache Installation durchführen. Dort erfahren Sie mehr über die zugrunde liegenden Details.
{{% /notice %}}

### Installation

Kopieren Sie den obigen Befehl und fügen Sie ihn in Ihr Linux-Terminal ein, um RustDesk Server Pro zu installieren.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Was es bewirkt:

- Installiert einige Abhängigkeiten
- Richtet die UFW-Firewall ein, falls vorhanden
- Erstellt den Arbeitsordner `/var/lib/rustdesk-server` und den Protokollordner `/var/log/rustdesk-server`
- Installiert die ausführbaren Dateien in `/usr/bin`
- Lädt RustDesk Pro Services herunter und entpackt sie in den oben genannten Ordner
- Erstellt systemd-Dienste für hbbs und hbbr (Die Dienstnamen lauten rustdesk-hbbs.service und rustdesk-hbbr.service)
- Wenn Sie Domain gewählt haben, werden Nginx und Certbot installiert, sodass die API auf Port 443 (HTTPS) verfügbar ist und ein SSL-Zertifikat über Port 80 abgerufen werden kann, das automatisch erneuert wird

{{% notice note %}}
So können Sie [HTTPS für die Webkonsole manuell einrichten](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/#https-für-die-webkonsole-manuell-einrichten).
{{% /notice %}}

{{% notice note %}}
Wenn der systemd-Dienst nicht gestartet werden kann, hängt es wahrscheinlich mit SELinux zusammen, überprüfen Sie dies [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Wenn Ihr Client keine Verbindung zu Ihrem Server herstellen kann oder Sie keinen Zugriff auf die Webkonsole haben, überprüfen Sie dies [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

### Upgrade

Kopieren Sie den obigen Befehl und fügen Sie ihn in Ihr Linux-Terminal ein, um Ihre bestehende RustDesk Server Pro-Installation zu aktualisieren. Dies kann auch lokal gespeichert und mit cron geplant werden.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

Was es bewirkt:

- Überprüft auf neue Versionen von RustDesk Server Pro
- Wenn eine neue Version gefunden wird, werden die API-Dateien entfernt und neue ausführbare Dateien und API-Dateien heruntergeladen

### Konvertierung von Open Source

Kopieren Sie den obigen Befehl und fügen Sie ihn in Ihr Linux-Terminal ein, um von RustDesk Server zu RustDesk Server Pro zu konvertieren.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

{{% notice note %}}
Bitte fügen Sie den TCP-Port `21114` zu Ihrer Firewall hinzu. Dies ist ein zusätzlicher Port für die Webkonsole und die Benutzeranmeldung im RustDesk-Client.
{{% /notice %}}

Was es bewirkt:

- Deaktiviert und entfernt die alten Dienste
- Installiert einige Abhängigkeiten
- Richtet die UFW-Firewall ein, falls vorhanden
- Erstellt den Ordner `/var/lib/rustdesk-server` und kopiert die Zertifikate dorthin
- Löscht `/var/log/rustdesk` und erstellt `/var/log/rustdesk-server`
- Lädt RustDesk Pro Services herunter und entpackt sie in den oben genannten Ordner
- Erstellt systemd-Dienste für hbbs und hbbr (Die Dienstnamen lauten rustdesk-hbbs.service und rustdesk-hbbr.service)
- Wenn Sie Domain gewählt haben, werden Nginx und Certbot installiert, sodass die API auf Port 443 (HTTPS) verfügbar ist und ein SSL-Zertifikat über Port 80 abgerufen werden kann, das automatisch erneuert wird

### Sicherung/Wiederherstellung

Um das Leben einfach zu machen, haben wir ein Sicherungs- und Wiederherstellungsskript erstellt, das die Schlüssel, die gesamte Konfiguration und die Datenbank übernimmt und eine TAR-Datei erstellt, die an einem anderen Ort gespeichert werden kann.

Um das Sicherungsskript auf Ihrem RustDesk-Server einzurichten, gehen Sie wie folgt vor:
```
wget https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/backup.sh
chmod +x backup.sh
```
Sie haben nun die Wahl.

Führen Sie das Sicherungsskript `./backup.sh` aus, um eine einmalige Sicherung zu erstellen.

Oder führen Sie das Sicherungsskript `./backup.sh --schedule` aus. Dadurch wird das Backup-Skript so geplant, dass es jede Nacht ausgeführt wird und sich automatisch aktualisiert.

Zur Wiederherstellung gehen Sie wie folgt vor:
```
wget https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/restore.sh
chmod +x restore.sh
```
Kopieren Sie die Sicherungsdatei in denselben Ordner wie die Datei restore.sh und führen Sie dann `./restore.sh` aus.

Sie müssen Ihre [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) widerrufen, um sie auf den wiederhergestellten Server zu übertragen.
