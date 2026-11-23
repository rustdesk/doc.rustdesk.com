---
title: Windows Portable-Erhöhung
weight: 49
description: "RustDesk-Dokumentation zu Windows Portable-Erhöhung. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Kurze Antwort

Portable Elevation ist sinnvoll, wenn Sie den portablen RustDesk-Client nutzen, aber für bestimmte Aufgaben oder Aktionen am Zielgerät trotzdem Administratorrechte brauchen. Das hilft besonders, wenn der volle Client nicht installiert wird, aber dennoch erweiterter Remote-Support nötig ist.

## Wichtige Punkte

- Entscheiden Sie, ob die Elevation schon beim Start oder erst in der Sitzung nötig ist
- Testen Sie sowohl die Eingabeaufforderung am Zielgerät als auch am steuernden Gerät
- Erklären Sie Support-Mitarbeitern den Elevation-Ablauf vor dem Rollout

<!-- GEO-LOCALIZED-INTRO:END -->

Portable Windows-Programme haben keine Administratorrechte, was zu den folgenden Problemen führen kann:

- Der Bildschirm kann nicht übertragen werden, wenn das UAC-Fenster (Benutzerkontensteuerung) angezeigt wird.
- Wenn ein übergeordnetes Fenster, z. B. der Task-Manager, geöffnet wird, reagiert die Maus nicht mehr.

Durch die Erhöhung der Berechtigungen kann RustDesk während des Starts oder in einer Sitzung einen Prozess mit Administratorrechten erstellen, der Bildschirmfotos und Mausoperationen ausführen kann, wodurch die oben genannten Probleme vermieden werden.

## Erhöhen beim Starten

Auf diese Weise müssen entfernte Benutzer bei der Verbindung keine Berechtigungsanfrage stellen. Es gibt zwei Methoden:

* Methode 1: Ändern Sie den Namen des tragbaren Programms so, dass er `-qs-` oder `-qs.exe` oder `_qs.exe` enthält (>= 1.4.6), oder mit `qs.exe` endet (1.2.0 ~ 1.4.5). Klicken Sie mit der linken Maustaste auf `Ausführen` und im UAC-Fenster auf `Akzeptieren`.

* Methode 2: Klicken Sie mit der rechten Maustaste und führen Sie das Programm als Administrator aus.

## Erhöhen auf der Steuerungsseite

Die kontrollierte Seite kann direkt auf `Akzeptieren und Erhöhen` klicken, wenn eine Verbindung hergestellt wird, oder auf `Erhöhen`, wenn bereits eine Verbindung besteht.

| Verbinden | Verbunden |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Anfrage der Erhöhung auf der Steuerungsseite

Wählen Sie im Aktionsmenü `Erhöhte Rechte anfordern`. Hat der Benutzer am entfernten Computer Administratorrechte, wählen Sie `Den entfernten Benutzer zur Authentifizierung auffordern`. Verwendet er ein Windows-Standardkonto, wählen Sie `Benutzernamen und Passwort des Administrators übertragen` und geben Sie die Administratoranmeldedaten am steuernden Computer ein. Das ist direkt nach dem Verbindungsaufbau möglich, bevor Sie eine Anwendung als Administrator starten. **Bei beiden Optionen muss jemand am entfernten Computer auf die UAC-Abfrage für RustDesk reagieren.**

| Menü | Dialog |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Warten** | **Erfolg** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### UAC-Abfragen für Anwendungen und RustDesk

Beim Start einer Anwendung als Administrator und beim Anfordern erhöhter Rechte für RustDesk erscheint jeweils eine eigene UAC-Abfrage. Ist die Abfrage der Anwendung bereits geöffnet, wenn Sie erhöhte Rechte für RustDesk anfordern, bitten Sie den Benutzer am entfernten Computer, zuerst auf diese Abfrage zu reagieren.

1. Klicken Sie in der **Abfrage der Anwendung** (z. B. **Windows-Befehlsprozessor**) auf **Ja**, um die Anwendung als Administrator zu starten, oder auf **Nein**, um den Start abzubrechen.
2. Klicken Sie in der **Abfrage für `rustdesk.exe`** auf **Ja**, um RustDesk erhöhte Rechte zu gewähren. Geben Sie zuerst die Administratoranmeldedaten ein, falls Windows danach fragt.

Sobald RustDesk erhöhte Rechte hat, können Sie vom steuernden Computer aus UAC-Abfragen beantworten und Schaltflächen bedienen, die Administratorrechte erfordern. Hat der Benutzer den Start der Anwendung abgebrochen, können Sie sie jetzt erneut als Administrator starten.

### Wenn die UAC-Abfrage für RustDesk erneut Anmeldedaten verlangt

RustDesk startet mit den übermittelten Anmeldedaten einen Hilfsprozess unter dem Administratorkonto. Wenn dieser Prozess erhöhte Rechte anfordert, wendet Windows die Richtlinie **Benutzerkontensteuerung: Verhalten der Benutzeraufforderung mit erhöhten Rechten für Administratoren im Administratorbestätigungsmodus** an. Sie finden sie in den Gruppenrichtlinien unter **Computerkonfiguration → Richtlinien → Windows-Einstellungen → Sicherheitseinstellungen → Lokale Richtlinien → Sicherheitsoptionen**.

Bei der Einstellung **Eingabeaufforderung zu Anmeldeinformationen auf dem sicheren Desktop** muss jemand am entfernten Computer die Administratoranmeldedaten in die UAC-Abfrage für `rustdesk.exe` eingeben, auch wenn Sie sie bereits vom steuernden Computer gesendet haben. Das gilt auch, wenn Sie erhöhte Rechte für RustDesk anfordern, bevor Sie eine andere Anwendung öffnen. [Microsoft-Dokumentation zu UAC-Richtlinien](https://learn.microsoft.com/de-de/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## Wie Sie wählen

| Szenario | Methode |
| :---: | :---: |
| Keine Erhöhung erforderlich | Das Programm installieren |
| Kein Benutzer auf der kontrollierten Seite verfügbar | Umbenennen<br/>*oder*<br/> Als Administrator ausführen |
| Benutzer am kontrollierten Ende verfügbar<br/>*und*<br/> Sofortige Erhöhung beim Verbinden<br/>*und*<br/> Akzeptieren-via-Klick-Verbindung | Klicken Sie auf `Akzeptieren und Erhöhen`, wenn Sie die Verbindung auf der kontrollierten Seite erhalten. |
| Benutzer am kontrollierten Ende verfügbar<br/>*und*<br/> Erhöhung nach Bedarf | Klicken Sie im Fenster für die Verbindungsverwaltung am kontrollierten Ende auf `Erhöhen`.<br/>*oder*<br/> Abfrage der Erhöhung auf der kontrollierten Seite |
