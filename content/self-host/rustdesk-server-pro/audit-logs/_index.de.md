---
title: Audit-Protokolle
weight: 19
description: "Verwenden Sie Audit-Protokolle in der RustDesk-Server-Pro-Webkonsole, um Verbindungs-, Dateiübertragungs-, Konsolen- und Alarmereignisse zu prüfen."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Audit-Protokolle in der RustDesk-Server-Pro-Webkonsole helfen Administratoren dabei, Remote-Zugriffe, Dateiübertragungen, administrative Änderungen und Sicherheitsalarme zu prüfen.

Öffnen Sie die Webkonsole und gehen Sie im linken Menü zu **Protokolle**. Der Bereich Protokolle enthält:

- **Verbindung**
- **Datei**
- **Konsole**
- **Alarm**

## Verbindungsprotokolle

Gehen Sie zu **Protokolle > Verbindung**, um Remote-Sitzungen und die zugehörigen Verbindungstypen zu prüfen.

Verbindungsprotokolle zeigen:

- **Typ**: Fernzugriff, Dateiübertragung, Portweiterleitung, Kamera anzeigen, Terminal oder Nicht angemeldet. **Nicht angemeldet** bedeutet, dass die Authentifizierung fehlgeschlagen ist.
- **Gesteuertes Gerät**: ID und Name des Zielgeräts.
- **Steuernde Seite**: Der steuernde Benutzer, wenn die steuernde Seite angemeldet ist, plus steuerndes Gerät, Gerätename und IP-Adresse.
- **Startzeit**, **Endzeit** und **Dauer**.
- **Authentifizierung**: Primäre Authentifizierungsmethode, optional gefolgt von 2FA-Informationen.
- **Notiz**.

![Seite mit Verbindungsprotokollen](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Unterstützte Werte für die primäre Authentifizierung:

- Klickbestätigung
- Einmalpasswort
- Permanentes Passwort
- Seiten wechseln

Unterstützte 2FA-Werte:

- 2FA-Code
- Vertrauenswürdiges Gerät

### Verbindungsnotizen

Die steuernde Seite kann einer Verbindung auf zwei Arten eine Notiz hinzufügen:

- Während einer Remote-Sitzung kann die Aktion **Notiz** im Remote-Menü verwendet werden, um die Verbindungsnotiz hinzuzufügen oder zu aktualisieren.

![Feld für Verbindungsnotiz](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- Aktivieren Sie am Ende einer Remote-Sitzung auf der steuernden Seite **Einstellungen > Allgemein > Sonstiges > Am Ende der Verbindung nach Notiz fragen**, wenn RustDesk beim Sitzungsende nach einer Notiz fragen soll.

![Notizfeld beim Schließen der Verbindung](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

Die Notiz wird in der Spalte **Notiz** unter **Protokolle > Verbindung** angezeigt. Benutzer, die das Verbindungsprotokoll anzeigen können, können auch über die Schaltfläche zum Bearbeiten in der Spalte **Notiz** die Notiz in der Webkonsole aktualisieren.

### Laufende Verbindung trennen

Wenn eine Verbindung noch aktiv ist und Ihr Konto die Berechtigung zum Bearbeiten dieses Audit-Eintrags hat, zeigt die Spalte **Aktion** die Option **Verbindung trennen**. Klicken Sie darauf und bestätigen Sie den Vorgang, um die laufende Verbindung zu beenden.

![Bestätigung zum Trennen](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Nachdem die Verbindung über die Webkonsole getrennt wurde, sieht die steuernde Seite eine Meldung, dass die Verbindung über die Webkonsole getrennt wurde.

![Von der Konsole getrennt](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Dateiübertragungsprotokolle

Gehen Sie zu **Protokolle > Datei**, um Dateiübertragungen zu prüfen.

![Seite mit Dateiübertragungsprotokollen](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Dateiübertragungsprotokolle enthalten Dateioperationen aus dedizierten **Dateiübertragung**-Sitzungen sowie Kopieren/Einfügen von Dateien während **Fernzugriff**-Sitzungen.

Dateiübertragungsprotokolle zeigen:

- **Gesteuertes Gerät**.
- **Steuernde Seite**: Das steuernde Gerät und, falls verfügbar, der steuernde Benutzer.
- **Zeit**.
- **Richtung**:
  - Gesteuertes Gerät -> Steuernde Seite
  - Steuernde Seite -> Gesteuertes Gerät
- **Datei**: Der Pfad auf dem gesteuerten Gerät.
- **Details**: Dateigröße bei einer einzelnen Datei oder Dateianzahl bei Übertragungen mit mehreren Dateien.

Klicken Sie bei Übertragungen mit mehreren Dateien auf die Dateianzahl in der Spalte **Details**, um den Detailbereich zu öffnen. Wenn die Übertragung mehr Dateien enthält, als der Bereich auflistet, zeigt der Bereich die 10 größten Dateien nach Größe an.

![Details zur Dateiübertragung](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Alarmprotokolle

Gehen Sie zu **Protokolle > Alarm**, um sicherheitsbezogene Ereignisse zu prüfen.

![Seite mit Alarmprotokollen](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Alarmprotokolle zeigen:

- **Typ**.
- **Von**: Bei Alarmen für Anmeldekonten ist dies das Anmeldegerät. Bei Alarmen für Remote-Verbindungen ist dies die steuernde Seite.
- **Ziel**: Bei Alarmen für Anmeldekonten ist dies das Anmeldekonto. Bei Alarmen für Remote-Verbindungen ist dies das gesteuerte Gerät.
- **Ereigniszeit**.

Alarmtypen für Remote-Verbindungen:

- Zugriffsversuch von einer IP außerhalb der Whitelist
- Mehr als 30 aufeinanderfolgende Zugriffsversuche
- Mehrere Zugriffsversuche innerhalb einer Minute
- Zu viele aufeinanderfolgende Zugriffsversuche von einem einzelnen IPv6-Präfix
- Mehrere fehlgeschlagene Anmeldeversuche im Terminal (als Administrator ausführen) (falscher Benutzername/falsches Passwort)
- Mehrere gleichzeitige Terminal-Anmeldeversuche (als Administrator ausführen)
- Verstoß gegen den Sitzungsumfang

Alarmtypen für Anmeldekonten:

- Mehr als 30 aufeinanderfolgende Anmeldeversuche
- Mehrere Anmeldeversuche innerhalb einer Minute
- Mehrere Anmeldeversuche innerhalb einer Stunde

## Konsolenprotokolle

Gehen Sie zu **Protokolle > Konsole**, um Aktionen zu prüfen, die in der Webkonsole ausgeführt wurden.

![Seite mit Konsolenprotokollen](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Konsolenprotokolle zeigen:

- **Typ**.
- **Benutzer**: Der Webkonsolenbenutzer, der den Vorgang ausgeführt hat.
- **Operation**: Die konkrete Aktion.
- **Zeit**.
- **Details**: Zusätzliche Felder, die für den Vorgang aufgezeichnet wurden.

Typen:

- Gruppenverwaltung
- Benutzerverwaltung
- Geräteverwaltung
- Adressbuchverwaltung
- Admin-Rollenverwaltung
- Kontrollrollenverwaltung

Aufgezeichnete Vorgänge umfassen Benutzeranmeldung, Änderungen an Benutzern und Geräten, Trennen eines Geräts, Adressbuchänderungen, 2FA-Änderungen, Passwortzurücksetzung, Änderungen an Admin-/Kontrollrollen und mehr.

## Sichtbarkeit und Aufbewahrung von Protokollen

Die Sichtbarkeit von Protokollen hängt davon ab, ob der Benutzer Administrator ist, ob der Benutzer eine [Admin-Rolle](/docs/de/self-host/rustdesk-server-pro/admin-role/) mit Audit-Protokoll-Berechtigungen hat und welche Einstellung unter **Einstellungen > Sonstiges** gesetzt ist.

| Benutzertyp oder Einstellung | Sichtbarkeit von Protokollen |
| --- | --- |
| Administrator | Kann alle Audit-Protokolle anzeigen. |
| Admin-Rolle mit **Global > Audit Logs-View** | Kann alle Audit-Protokolle anzeigen, auch wenn **Nur Admin kann auf Protokolle zugreifen** aktiviert ist. |
| Admin-Rolle mit **Individual > Audit Logs-View** | Kann persönliche Audit-Protokolle anzeigen, auch wenn **Nur Admin kann auf Protokolle zugreifen** aktiviert ist. Dies gewährt denselben persönlichen Protokollumfang wie bei einem normalen Nicht-Admin-Benutzer, wird aber nicht durch diese Einstellung blockiert. |
| Nicht-Admin-Benutzer ohne Audit-Protokoll-Berechtigungen | Kann persönliche Audit-Protokolle nur anzeigen, wenn **Nur Admin kann auf Protokolle zugreifen** deaktiviert ist. |
| **Einstellungen > Sonstiges > Nur Admin kann auf Protokolle zugreifen** aktiviert | Nicht-Admin-Benutzer ohne Audit-Protokoll-Berechtigungen können nicht auf Audit-Protokolle zugreifen. |

Persönliche Protokolle enthalten Verbindungs- und Dateiübertragungseinträge, bei denen ein aktuell dem Benutzer zugewiesenes Gerät das gesteuerte oder steuernde Gerät ist, sowie Einträge, bei denen der Benutzer der Controller ist. Bei Alarmprotokollen enthalten persönliche Protokolle Einträge für Geräte, die dem Benutzer zugewiesen sind, oder für das Anmeldekonto des Benutzers. Bei Konsolenprotokollen enthalten persönliche Protokolle Einträge, bei denen der Benutzer der Operator ist.

Verwenden Sie **Einstellungen > Sonstiges > Protokollaufbewahrung (Tage)**, um festzulegen, wie lange Audit-Protokolle gespeichert bleiben. Geben Sie `0` ein, um alle Protokolle unbegrenzt aufzubewahren. Geben Sie eine Zahl größer als `0` ein, um Protokolle automatisch zu löschen, die älter als die angegebene Anzahl von Tagen sind. Die Bereinigung läuft einmal pro Stunde.

## Audit-Protokolle exportieren

Jede Protokollseite hat **Als CSV exportieren** in der Werkzeugleiste. Die exportierte Datei folgt den aktuellen Filtern auf der Seite und verwendet dieselben Zeitwerte, die in der Webkonsole angezeigt werden. Jeder Export enthält bis zu 1000 Einträge, aber Sie können den Filter **Startzeit** verwenden, um alle Protokolle stapelweise zu exportieren.

Sie können Audit-Protokolle auch mit einem [API-Token](/docs/de/self-host/rustdesk-server-pro/console/#prüfprotokolle-auditspy) über `audits.py` abfragen.
