---
title: Installation unter Windows
weight: 2
---

{{% notice note %}}
Die Sicherheitsrichtlinien von Windows sind knifflig. Wenn diese Anleitung bei Ihnen nicht funktioniert oder Sie eine instabile Verbindung feststellen, wechseln Sie bitte zu einem Linux-Server.
{{% /notice %}}

### Installation

1. Holen Sie sich Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.
2. Laden Sie das Windows-Installationsprogramm von [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest) herunter.
3. Entpacken Sie das Windows-Installationsprogramm.
4. Führen Sie das Installationsprogramm aus und folgen Sie den Anweisungen auf dem Bildschirm. Oder Sie installieren manuell mit [PM2 oder NSSM](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/windows/).
5. Öffnen Sie anschließend RustDesk Server.
6. Folgen Sie den Aufforderungen, die Sie durch die Installation führen.
7. Klicken Sie auf `Dienste` und dann auf `Start`.
8. Sobald die Installation abgeschlossen ist, gehen Sie zu `http://ihreipadresse:21114`.
9. Melden Sie sich mit dem Benutzernamen `admin` und dem Passwort `test1234` an.
10. Geben Sie Ihren in Schritt 1 erworbenen Lizenzcode ein.

### IIS als Proxy verwenden

Bitte stellen Sie sicher, dass die `Dynamische Inhaltskomprimierung` installiert ist. Dies ist eine IIS-Funktion, die mit Server-Rollen installiert werden kann.

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
3. Erstellen Sie eine neue Reverse-Proxy-Regel.
4. Einrichten der lokalen Adresse (die Adresse 21114) \
Eingehende Regel - die interne Adresse 21114 von RustDesk \
Ausgehende Regeln - `Von` ist die interne RustDesk-Adresse 21114 und `An` ist die externe Adresse. \
Hinweis: Regeln ohne http/https vor den Adressen werden automatisch verarbeitet. Stellen Sie außerdem sicher, dass alle Adressen sowohl intern als auch extern zugänglich sind.

### Komprimierung

1. Deaktivieren Sie "Dynamische Inhaltskomprimierung".

### Fehlersuche

Wenn Sie einen Fehler 500.52 haben, fügen Sie die genannten Variablen hinzu: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Möglicherweise müssen Sie Ihre SSL-Einstellungen auf "SSL erforderlich → Ignorieren" ändern.
