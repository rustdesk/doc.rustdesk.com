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
3. Melden Sie sich bei Ihrem RustDesk Server an.
4. Wenn Sie noch kein DNS verwenden und SSL nutzen wollen, erstellen Sie einen DNS-Namen, z. B. `rustdesk.ihredomain.com`.
5. Gehen Sie zu [dieser Seite](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/#konvertierung-von-open-source).
6. Kopieren Sie den Befehl und fügen Sie ihn in Ihr Linux-Terminal ein.
7. Folgen Sie den Aufforderungen, die Sie durch die Installation führen.
8. Sobald die Installation abgeschlossen ist, gehen Sie zu `https://rustdesk.ihredomain.com` oder `http://ihreipadresse:21114`.
9. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
10. Geben Sie Ihren in Schritt 1 erworbenen Lizenzcode ein.

## Es gibt eine neue Version von RustDesk Server Pro, wie kann ich ein Upgrade durchführen?
1. Gehen Sie zu [dieser Seite](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/#upgrade).
2. Kopieren Sie den Befehl und fügen Sie ihn in Ihr Linux-Terminal ein.
3. Folgen Sie den Aufforderungen, die Sie durch das Upgrade führen.

## Ich habe mit dem Skript installiert, wie kann ich Dienste starten und stoppen?
Die Dienste verwenden systemd und können mit `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` gestartet und gestoppt werden, z. B. `sudo systemctl restart rustdesk-hbbs`.

## Ich habe mit dem Skript installiert, wie kann ich die Linux-Protokolle einsehen?
Die Protokolle werden in `/var/log/rustdesk-server` gespeichert, Sie können sie mit `cat /var/log/rustdesk-server/hbbs.log` oder `cat /var/log/rustdesk-server/hbbs.error` einsehen.

## Ich habe mit dem Skript installiert, wie kann ich den Status der RustDesk-Dienste überprüfen?
Der Status kann mit `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` überprüft werden, z. B. `sudo systemctl status rustdesk-hbbs`.

## Wie installiere ich RustDesk Server Pro unter Windows?
1. Holen Sie sich Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.
2. Laden Sie das Windows-Installationsprogramm von [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest) herunter.
3. Entpacken Sie das Windows-Installationsprogramm.
4. Führen Sie das Installationsprogramm aus und folgen Sie den Anweisungen auf dem Bildschirm.
5. Öffnen Sie anschließend RustDesk Server.
6. Folgen Sie den Aufforderungen, die Sie durch die Installation führen.
7. Klicken Sie auf `Dienste` und dann auf `Start`.
8. Sobald die Installation abgeschlossen ist, gehen Sie zu `http://ihreipadresse:21114`.
9. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
10. Geben Sie Ihren in Schritt 1 erworbenen Lizenzcode ein.

## Kann ich IIS als Reverse-Proxy verwenden?
1. Öffnen Sie IIS (oder installieren Sie es).
2. Erstellen Sie eine neue Website für RustDesk mit den Verbindungen (idealerweise 443) und dem entsprechenden Zertifikat. In den Grundeinstellungen sollte diese auf einen leeren Ordner verweisen. (Wenn Sie die Standardseite verwenden, stellen Sie sicher, dass sich keine anderen Dateien in dem Ordner befinden).
3. Installieren Sie [Anwendungsanforderungsrouting](https://www.iis.net/downloads/microsoft/application-request-routing) auf IIS und [URL-Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

### Anwendungsanforderungsrouting
1. Öffnen Sie auf dem IIS-Server-Host Anwendungsanforderungsrouting:
2. Gehen Sie zu den Server-Proxy-Einstellungen.
3. Aktivieren Sie den Proxy und alle Einstellungen werden angezeigt. Sie können sie als Standardwerte beibehalten.
4. Speichern Sie die Einstellungen und wir können zum nächsten Schritt übergehen: URL-Rewrite.

### URL-Rewrite
1. Öffnen Sie die Website im IIS auf der linken Seite und doppelklicken Sie auf URL-Rewrite.
2. Klicken Sie auf `Regeln hinzufügen`.
3. Deaktivieren Sie die dynamische Komprimierung unter Komprimierung.
4. Erstellen Sie eine neue Reverse-Proxy-Regel.
5. Einrichten der lokalen Adresse (die Adresse 21114) \
	Eingehende Regel - die interne Adresse 21114 von RustDesk \
	Ausgehende Regeln - Von ist die interne RustDesk-Adresse 21114 und An ist die externe Adresse. \
Hinweis: Regeln ohne http/https vor den Adressen werden automatisch verarbeitet. Stellen Sie außerdem sicher, dass alle Adressen sowohl intern als auch extern zugänglich sind.

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

## Kann ich RustDesk mit PowerShell bereitstellen?
Sicher, dieses Skript kann helfen, ersetzen Sie `youraddress` und `yourkey` mit Ihrer Adresse und Ihrem Schlüssel für Ihren RustDesk Server Pro.
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq "1.2.1")
{
write-output "RustDesk $rdver is the newest version"

exit
}

If (!(Test-Path C:\Temp)) {
  New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

powershell Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.1/rustdesk-1.2.1-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Start-Sleep -seconds 20
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}
net stop rustdesk

$username = ((Get-WMIObject -ClassName Win32_ComputerSystem).Username).Split('\')[1]
Remove-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'youraddress' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'youraddress'`nkey = 'yourkey'`nrelay-server = 'youraddress'`napi-server = 'https://youraddress'"
Remove-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'youraddress' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'youraddress'`nkey = 'yourkey'`nrelay-server = 'youraddress'`napi-server = 'https://youraddress'"

net start rustdesk
```

## Wie kann ich die RustDesk-IDs von Agenten in meinem Netzwerk oder in einem RMM-System abrufen?
Unter Windows können Sie das folgende PowerShell-Skript verwenden:
```ps
$ErrorActionPreference= 'silentlycontinue'

Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" --get-id
sleep 2
$rustdesk_id = (get-clipboard)
Write-Output $rustdesk_id
```

## Wie kann ich ein dauerhaftes Kennwort für einen Agenten in meinem Netzwerk oder in einem RMM-System festlegen?
Unter Windows können Sie das folgende PowerShell-Skript verwenden:
```ps
$ErrorActionPreference = 'silentlycontinue'

net stop rustdesk > null
$ProcessActive = Get-Process rustdesk -ErrorAction SilentlyContinue
if($ProcessActive -ne $null)
{
stop-process -ProcessName rustdesk -Force
}

$rustdesk_pw = (-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))
Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" "--password $rustdesk_pw" -wait
Write-Output $rustdesk_pw

net start rustdesk > null
```

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

## Warum sind meine Protokolle leer?
Stellen Sie sicher, dass API sowohl auf dem zu steuernden Gerät als auch auf der steuernden Maschine eingestellt ist.
Klicken Sie auf der linken Seite auf `Logs`.

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

if($rdver -eq "1.2.2")
{
write-output "RustDesk $rdver ist die neueste Version."

exit
}

If (!(Test-Path C:\Temp)) {
  New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

powershell Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```
