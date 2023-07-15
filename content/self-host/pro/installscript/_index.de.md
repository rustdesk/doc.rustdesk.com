---
title: Einfache Installation
weight: 10
---

{{% notice note %}}
Vergessen Sie nicht, Ihre Lizenz unter [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) zu erwerben, weitere Informationen finden Sie auf der [Lizenzseite](/docs/de/self-host/pro/license).
{{% /notice %}}

## Installation

Kopieren Sie den obigen Befehl und fügen Sie ihn in Ihr Linux-Terminal ein, um RustDesk Server Pro zu installieren.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Was es bewirkt:

- Installiert einige Abhängigkeiten
- Richtet die UFW-Firewall ein, falls vorhanden
- Erstellt den Arbeitsordner /var/lib/rustdesk-server und den Protokollordner /var/log/rustdesk-server
- Installiert die ausführbaren Dateien in /usr/bin
- Lädt RustDesk Pro Services herunter und entpackt sie in den oben genannten Ordner (Die Dienstnamen lauten rustdesk-hbbs.service und rustdesk-hbbr.service)
- Erstellt systemd-Dienste für hbbs und hbbr
- Wenn Sie Domain gewählt haben, werden Nginx und Certbot installiert, sodass die API auf Port 443 (https) verfügbar ist und ein SSL-Zertifikat über Port 80 abgerufen werden kann, das automatisch erneuert wird

## Upgrade

Kopieren Sie den obigen Befehl und fügen Sie ihn in Ihr Linux-Terminal ein, um Ihre bestehende RustDesk Server Pro-Installation zu aktualisieren. Dies kann auch lokal gespeichert und mit cron geplant werden.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

Was es bewirkt:

- Überprüft auf neue Versionen von RustDesk Server Pro
- Wenn eine neue Version gefunden wird, werden die API-Dateien entfernt und neue ausführbare Dateien und API-Dateien heruntergeladen

## Konvertierung von Open Source

Kopieren Sie den obigen Befehl und fügen Sie ihn in Ihr Linux-Terminal ein, um von RustDesk Server zu RustDesk Server Pro zu konvertieren.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

Was es bewirkt:

- Deaktiviert und entfernt die alten Dienste
- Installiert einige Abhängigkeiten
- Richtet die UFW-Firewall ein, falls vorhanden
- Erstellt den Ordner /var/lib/rustdesk-server und kopiert die Zertifikate dorthin
- Löscht /var/log/rustdesk und erstellt /var/log/rustdesk-server
- Lädt RustDesk Pro Services herunter und entpackt sie in den oben genannten Ordner (Die Dienstnamen lauten rustdesk-hbbs.service und rustdesk-hbbr.service)
- Erstellt systemd-Dienste für hbbs und hbbr
- Wenn Sie Domain gewählt haben, werden Nginx und Certbot installiert, sodass die API auf Port 443 (https) verfügbar ist und ein SSL-Zertifikat über Port 80 abgerufen werden kann, das automatisch erneuert wird

## FAQ für Skripte

F - Wie kann ich Dienste starten und stoppen?
A - Die Dienste verwenden systemd und können mit `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` gestartet und gestoppt werden, z. B. `sudo systemctl restart rustdesk-hbbs`.

F - Wie kann ich die Linux-Protokolle einsehen?
A - Die Protokolle werden in `/var/log/rustdesk-server/` gespeichert, Sie können sie mit `cat /var/log/rustdesk-server/hbbs.log` oder `cat /var/log/rustdesk-server/hbbs.error` einsehen.

F - Wie kann ich den Status der RustDesk-Dienste überprüfen?
A - Der Status kann mit `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` überprüft werden, z. B. `sudo systemctl status rustdesk-hbbs`.
