---
title: Windows Portable-Erhöhung
weight: 49
---

Portable Windows-Programme haben keine Administratorrechte, was zu den folgenden Problemen führen kann:

- Der Bildschirm kann nicht übertragen werden, wenn das UAC-Fenster (Benutzerkontensteuerung) angezeigt wird.
- Wenn ein übergeordnetes Fenster, z. B. der Task-Manager, geöffnet wird, reagiert die Maus nicht mehr.

Durch die Erhöhung der Berechtigungen kann RustDesk während des Starts oder in einer Sitzung einen Prozess mit Administratorrechten erstellen, der Bildschirmfotos und Mausoperationen ausführen kann, wodurch die oben genannten Probleme vermieden werden.

## Erhöhen beim Starten

Auf diese Weise müssen entfernte Benutzer bei der Verbindung keine Berechtigungsanfrage stellen. Es gibt zwei Methoden:

* Methode 1: Ändern Sie den Namen des tragbaren Programms so, dass er `-qs-` enthält (Versionen 1.2.0, 1.2.1, 1.2.2, 1.2.3 enden mit `qs.exe`). Klicken Sie mit der linken Maustaste auf `Ausführen` und im UAC-Fenster auf `Akzeptieren`.

* Methode 2: Klicken Sie mit der rechten Maustaste und führen Sie das Programm als Administrator aus.

## Erhöhen auf der Steuerungsseite

Die kontrollierte Seite kann direkt auf `Akzeptieren und Erhöhen` klicken, wenn eine Verbindung hergestellt wird, oder auf `Erhöhen`, wenn bereits eine Verbindung besteht.

| Verbinden | Verbunden |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Anfrage der Erhöhung auf der Steuerungsseite

Nach der Auswahl von `Erhöhte Rechte anfordern` aus dem Aktionsmenü wird das folgende Dialogfeld angezeigt. Wenn Sie `Den entfernten Benutzer zur Authentifizierung auffordern` wählen, müssen Sie keinen Benutzernamen und kein Passwort eingeben, aber der Benutzer auf dem entfernten Computer muss über Administratorrechte verfügen. Wenn Sie `Benutzernamen und Passwort des Administrators übertragen` wählen, muss der Benutzer auf dem entfernten Computer nur im UAC-Fenster zustimmen. Nachdem Sie die Anfrage gesendet haben, warten Sie bitte, bis der Benutzer auf der anderen Seite das UAC-Fenster akzeptiert hat. Nach der Bestätigung wird eine Erfolgsmeldung angezeigt. Beachten Sie, dass es **bei beiden Methoden erforderlich ist, dass jemand auf der kontrollierten Seite das UAC-Fenster akzeptiert**. Wenn also auf der anderen Seite niemand verfügbar ist, sollte auf der Steuerungsseite keine Aufschaltung beantragt werden.

| Menü | Dialog |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Warten** | **Erfolg** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

## Wie Sie wählen

| Szenario | Methode |
| :---: | :---: |
| Keine Erhöhung erforderlich | Das Programm installieren |
| Kein Benutzer auf der kontrollierten Seite verfügbar | Umbenennen<br/>*oder*<br/> Als Administrator ausführen |
| Benutzer am kontrollierten Ende verfügbar<br/>*und*<br/> Sofortige Erhöhung beim Verbinden<br/>*und*<br/> Akzeptieren-via-Klick-Verbindung | Klicken Sie auf `Akzeptieren und Erhöhen`, wenn Sie die Verbindung auf der kontrollierten Seite erhalten. |
| Benutzer am kontrollierten Ende verfügbar<br/>*und*<br/> Erhöhung nach Bedarf | Klicken Sie im Fenster für die Verbindungsverwaltung am kontrollierten Ende auf `Erhöhen`.<br/>*oder*<br/> Abfrage der Erhöhung auf der kontrollierten Seite |
