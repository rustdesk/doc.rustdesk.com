---
title: Webkonsole
weight: 10
---

Funktionen:

- Hinzufügen/Ändern von Benutzern und Benutzergruppen
- Ändern von Gerätezugriffsberechtigungen
- Durchsuchen von Geräteverbindungs- und anderen Protokollen
- Einstellungen aktualisieren
- Verwalten von Strategien zur Synchronisierung von Client-Einstellungen

## Anmelden

Wie bereits erwähnt, ist der Standardport der Webkonsole 21114. Geben Sie `http://<hbbs host>:21114` in den Browser ein, um die Konsolenseite aufzurufen, wie in der folgenden Abbildung zu sehen (hbbs läuft auf dem Server mit der IP 192.168.1.143):
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Wenn Sie https-Unterstützung benötigen, installieren Sie bitte einen Webserver wie z. B. `Nginx`.

Der Standard-Benutzername und das Standard-Passwort des Administrators lautet admin/test1234. Bitte ändern Sie das Passwort nach dem Anmelden, indem Sie im Kontomenü oben rechts "Einstellungen" wählen, um die Seite zur Änderung des Passworts aufzurufen, wie in der folgenden Abbildung dargestellt. Sie können auch ein anderes Administratorkonto erstellen und dieses löschen. Aktivieren Sie besser die E-Mail-Anmeldebestätigung.
<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Nicht-Administrator-Benutzer können sich auch anmelden, um ihr Gerät und ihre Protokolle zu durchsuchen und ihre Benutzereinstellungen zu ändern.

## Windows EXE

Bei Windows-Clients können Sie die benutzerdefinierte Serverkonfiguration weglassen und stattdessen die Konfigurationsinformationen in den Dateinamen `rustdesk.exe` aufnehmen. Wie oben gezeigt, gehen Sie bitte auf die Startseite der Konsole und klicken Sie auf `Windows EXE`. **`Client >= 1.1.9 erforderlich`**。
