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

Der Standardport der Webkonsole ist 21114. Geben Sie `http://<hbbs host>:21114` in den Browser ein, um die Konsolenseite aufzurufen, wie in der folgenden Abbildung zu sehen. Der Standard-Benutzername und das Standard-Passwort des Administrators lauten admin/test1234:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Wenn Sie HTTPS-Unterstützung benötigen, installieren Sie bitte einen Webserver wie `Nginx` oder verwenden Sie `IIS` für Windows.

Bitte ändern Sie nach dem Anmelden unbedingt das Passwort, indem Sie im Kontomenü oben rechts `Einstellungen` wählen, um die Seite zur Änderung des Passworts aufzurufen, wie in der folgenden Abbildung dargestellt. Sie können auch ein anderes Administratorkonto erstellen und dieses löschen. Aktivieren Sie besser die E-Mail-Anmeldebestätigung.
<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Nicht-Administrator-Benutzer können sich auch anmelden, um ihr Gerät und ihre Protokolle zu durchsuchen und ihre Benutzereinstellungen zu ändern.

## Automatische Konfiguration
Wenn Sie auf `Windows EXE` klicken, erhalten Sie die Konfigurationen für Ihren eigenen RustDesk Server Pro, die Ihnen bei der Konfiguration Ihrer Clients helfen.

Bei Windows-Clients können Sie die benutzerdefinierte Serverkonfiguration weglassen und stattdessen die Konfigurationsinformationen in den Dateinamen `rustdesk.exe` aufnehmen. Wie oben gezeigt, gehen Sie bitte auf die Startseite der Konsole und klicken Sie auf `Windows EXE`. **Client ≥ 1.1.9 erforderlich.**

Sie können dies in Verbindung mit der [Client-Konfiguration](https://rustdesk.com/docs/en/self-host/client-configuration/) und den [Bereitstellungsskripten](https://rustdesk.com/docs/en/self-host/client-deployment/) zur Einrichtung Ihrer Clients verwenden.

## Erstellen eines neuen Benutzers, der nicht der Standardbenutzer `admin` ist
1. Erstellen Sie ein weiteres Konto mit der Berechtigung `Administrator`.
2. Melden Sie sich mit dem neuen Administratorkonto an.
3. Löschen Sie den `admin` auf der Seite `Benutzer`.

## Einrichten mehrerer Relay-Server
1. Gehen Sie zu `Einstellungen` im Menü auf der linken Seite.
2. Klicken Sie im Untermenü auf `Relay`.
3. Klicken Sie neben `Relay-Server` auf `+`.
4. Geben Sie die DNS- oder IP-Adresse des Relay-Servers in das nun angezeigte Feld ein und drücken Sie <kbd>Enter</kbd>.
5. Wenn Sie mehr als einen Relay-Server haben, können Sie weiterhin auf `+` klicken und die Geo-Einstellungen anpassen (speichern und kopieren Sie Ihren Schlüssel auf die anderen Server).

## Einstellen oder Ändern der Lizenz
1. Gehen Sie zu `Einstellungen` im Menü auf der linken Seite.
2. Klicken Sie im Untermenü auf `License`.
3. Klicken Sie auf `Bearbeiten` und fügen Sie Ihren Lizenzcode ein.
4. Klicken Sie auf `OK`.

## Protokolle anzeigen
Klicken Sie auf der linken Seite auf `Logs`.

## E-Mails einrichten
Gmail in diesem Beispiel

1. Gehen Sie zu `Einstellungen` im Menü auf der linken Seite.
2. Klicken Sie im Untermenü auf `SMTP`.
3. Geben Sie die SMTP-Adresse `smtp.gmail.com` ein.
4. Geben Sie unter `SMTP-Port` den Port 587 ein.
5. Geben Sie unter `Mail-Konto` das Gmail-Konto ein, d. h. `myrustdeskserver@gmail.com`.
6. Geben Sie Ihr Passwort ein. Möglicherweise benötigen Sie ein App-Passwort.
7. Geben Sie  in `Von` Ihr Gmail-Konto ein, z. B. `myrustdeskserver@gmail.com`.
8. Klicken Sie zum Speichern auf `Check`.

## Suche nach einem Gerät
1. Gehen Sie zu Geräte.
2. Geben Sie im Suchfeld für den Gerätenamen den Namen ein und klicken Sie auf `Abfrage` oder drücken Sie <kbd>Enter</kbd>.
3. Um einen Platzhalter zu verwenden, fügen Sie `%` am Anfang, am Ende oder an beiden Enden des Suchbegriffs ein.
