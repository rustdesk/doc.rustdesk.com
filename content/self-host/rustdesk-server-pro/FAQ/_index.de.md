---
title: FAQ
weight: 600
---

### Wie installiere ich mit dem einfachen Installationsskript?
1. Holen Sie sich Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.
2. Richten Sie einen VPS, einen physischen Server oder eine Linux-VM ein.
3. Wenn Sie DNS und SSL verwenden möchten, legen Sie einen DNS-Namen an, z. B. `trustdesk.ihredomain.de`.
4. Gehen Sie zu [dieser Seite](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/#installation).
5. Kopieren Sie den Befehl und fügen Sie ihn in Ihr Linux-Terminal ein.
6. Folgen Sie den Aufforderungen, die Sie durch die Installation führen.
7. Sobald die Installation abgeschlossen ist, gehen Sie zu `https://rustdesk.ihredomain.com` oder `http://ihreipadresse:21114`.
8. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
9. Geben Sie Ihren in Schritt 1 erworbenen Lizenzcode ein.

### Wie kann ich von RustDesk Server zu RustDesk Server Pro konvertieren?
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

### Es gibt eine neue Version von RustDesk Server Pro, wie kann ich ein Upgrade durchführen?
1. Gehen Sie zu [dieser Seite](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/#upgrade).
2. Kopieren Sie den Befehl und fügen Sie ihn in Ihr Linux-Terminal ein.
3. Folgen Sie den Aufforderungen, die Sie durch das Upgrade führen.

### Ich habe mit dem Skript installiert, wie kann ich Dienste starten und stoppen?
Die Dienste verwenden systemd und können mit `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` gestartet und gestoppt werden, z. B. `sudo systemctl restart rustdesk-hbbs`.

### Ich habe mit dem Skript installiert, wie kann ich die Linux-Protokolle einsehen?
Die Protokolle werden in `/var/log/rustdesk-server` gespeichert, Sie können sie mit `cat /var/log/rustdesk-server/hbbs.log` oder `cat /var/log/rustdesk-server/hbbs.error` einsehen.

### Ich habe mit dem Skript installiert, wie kann ich den Status der RustDesk-Dienste überprüfen?
Der Status kann mit `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` überprüft werden, z. B. `sudo systemctl status rustdesk-hbbs`.

### Wie ändere ich das Administrator-Passwort?
1. Gehen Sie zu `https://rustdesk.ihredomain.com` oder `http://ihreipadresse:21114`.
2. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
3. Klicken Sie oben rechts auf `admin`.
4. Klicken Sie auf `Einstellungen`.
5. Geben Sie Ihr neues Passwort in die vorgesehenen Felder ein.

### Wie kann ich meine Lizenz auf einen neuen Server übertragen?
Bitte sehen Sie [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/#rechnungen-und-migration).

### E-Mails funktionieren nicht von meinem VPS
Viele VPS-Anbieter blockieren die Ports 465 und 25.

Eine einfache Möglichkeit zur Überprüfung ist die Verwendung von Telnet. Geben Sie zum Testen im Linux-Terminal `telnet ihr.mailserver.com 25` ein. Unter Windows verwenden Sie PowerShell mit `Test-NetConnection -ComputerName ihr.mailserver.com -Port 25`.

Ihr Mailserver verwendet möglicherweise nicht den Port 25. Bitte stellen Sie sicher, dass Sie die richtigen Ports verwenden.

### Kann ich RustDesk mit PowerShell oder ähnlichem bereitstellen?
Sicher, Sie finden Skripte zur Unterstützung der Bereitstellung [hier](https://rustdesk.com/docs/de/self-host/client-deployment/).

### Ich habe RustDesk Server Pro manuell installiert, aber die API-Webkonsole ist nicht SSL-verschlüsselt, wie kann ich diese sichern?
Verwenden Sie einen Proxy wie Nginx, das einfache Installationsskript enthält einen, es ist wirklich einfach. [So machen wir es](https://github.com/rustdesk/rustdesk-server-pro/blob/493ad90daf8815c3052ff4d0d4aa9cc07e411efa/install.sh#L252).

Ähnliche Konfigurationen sollten mit Traefik v2, HAProxy, Apache Proxy und Cloudflare Tunnel funktionieren.

### Wie kann ich einen Fehlerbericht einreichen?
Bitte über [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues) einreichen.

### Warum ist das Programm nicht kostenlos und quelloffen, wenn ich es selbst hosten kann?
1. RustDesk ist für eine Reihe von Menschen zu einem Vollzeitjob geworden, sie haben ein Leben, Ehefrauen, Jobs und Kinder, was alles Aufmerksamkeit erfordert und Geld kostet!
2. Wir wollen auch in den kommenden Jahren hier sein und große Fortschritte machen.
3. Die Open-Source-Version wird weiterhin quelloffen bleiben und wir ermutigen andere, Entwicklungen im Einklang mit der AGPL-Lizenz vorzunehmen.

### Ich kann mich nicht mit Geräten in verschiedenen Gruppen verbinden, woran liegt das?
Das lässt sich leicht beheben, Sie müssen nur den gruppenübergreifenden Zugriff erlauben.
1. Fügen Sie neue Gruppen hinzu.
2. Klicken Sie auf `Bearbeiten`.
3. Wählen Sie die entsprechenden Gruppen aus, auf die Sie zugreifen möchten. Sie werden automatisch der entsprechenden Gruppe hinzugefügt.

### Wie kann ich Konfigurationen automatisch erstellen lassen?
Die Konfigurationen werden automatisch erstellt.
1. Laden Sie die neuesten Clients von [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) herunter.
2. Klicken Sie auf der Hauptseite der Webkonsole auf `Windows EXE`.
3. Geben Sie den Host und die API ein, falls sie sich von Ihrer Konfiguration unterscheiden.
4. Klicken Sie auf `Senden`.
5. Scannen Sie den QR-Code auf Ihrem Android-Gerät und benennen Sie die .exe-Datei in den Namen um, der erzeugt wurde.

### Bieten Sie Hosting für RustDesk Server Pro an?
Bitte setzen Sie sich mit unserem [Verkaufsteam](mailto://sales@rustdesk.com) in Verbindung.

### Kann ich irgendwo Videoanleitungen zur Inbetriebnahme ansehen?
Ja! Wir haben einen [YouTube-Kanal](https://youtube.com/@RustDesk).

### Warum sind meine Protokolle leer?
Stellen Sie sicher, dass API sowohl auf dem zu steuernden Gerät als auch auf der steuernden Maschine eingestellt ist.
Klicken Sie auf der linken Seite auf `Logs`.

### Wie kann ich RustDesk Server Pro deinstallieren?
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

### Wie kann ich Geräte aus der Geräteliste in der Webkonsole entfernen?
Deaktivieren und anschließend löschen ist nun möglich.

### Wie kann ich RustDesk mit PowerShell aktualisieren?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.3")
{
    Write-Output "RustDesk $rdver ist die neueste Version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.3/rustdesk-1.2.3-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

### Fehler `Key mismatch`
Bitte konfigurieren Sie Ihren Client mit dem [richtigen Schlüssel](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/relay/).

### Fehler `Failed to connect to relay server`
Bitte stellen Sie sicher, dass `hbbr` läuft. Mehr Informationen über `hbbr` finden Sie [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/).
Wenn Ihr `hbbr` nicht auf dem gleichen Rechner wie `hbbs` läuft, oder Sie mehrere Relay-Server haben, oder Sie es nicht auf dem Standard-Port `21117` laufen lassen, müssen Sie es explizit bei `hbbs` mitteilen. Bitte lesen Sie [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/relay/) nach.

### MFA für Admin-Konto zurücksetzen
https://github.com/rustdesk/rustdesk/discussions/6576
