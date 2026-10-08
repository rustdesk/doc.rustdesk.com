---
title: Webkonsole
weight: 10
description: "RustDesk-Dokumentation zu Webkonsole. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["rustdesk web console", "rustdesk server pro console", "rustdesk port 21114", "rustdesk device management", "rustdesk admin console"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Kurze Antwort

Die RustDesk-Server-Pro-Webkonsole ist der zentrale Ort für Benutzer, Geräte, Gruppen, Lizenzen, Konfigurationen, Relay-Server, Logs und API-Tokens. Neue Admins sollten mit Login, Lizenz, E-Mail und Zugriffseinstellungen beginnen, bevor sie größere Änderungen ausrollen.

## Wichtige Punkte

- Zuerst Login und Lizenz prüfen
- Danach Benutzer, Geräte, Gruppen und Strategien sichten
- E-Mail, Relays und API-Tokens erst aufsetzen, wenn der Basiszugriff funktioniert

<!-- GEO-LOCALIZED-INTRO:END -->

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

Sie können dies in Verbindung mit der [Client-Konfiguration](https://rustdesk.com/docs/de/self-host/client-configuration/) und den [Bereitstellungsskripten](https://rustdesk.com/docs/de/self-host/client-deployment/) zur Einrichtung Ihrer Clients verwenden.

## Neuen Benutzer erstellen, der nicht der Standardbenutzer `admin` ist

{{% notice note %}}
The `Individual` plan does not have this feature.
{{% /notice %}}

1. Klicken Sie im linken Menü auf `Benutzer`.
2. Erstellen Sie ein weiteres Konto mit der Berechtigung `Administrator`.
3. Melden Sie sich mit dem neuen Administratorkonto an.
4. Löschen Sie den `admin` auf der Seite `Benutzer`.

## Neuen Benutzer erstellen
1. Klicken Sie im linken Menü auf `Benutzer`.
2. Erstellen Sie einen neuen Benutzer.
3. Wählen Sie aus, in welcher Gruppe er sein soll. Wenn Sie neue Gruppen hinzufügen müssen, lesen Sie bitte weiter.

## Neue Gruppe hinzufügen
1. Klicken Sie im linken Menü auf `Gruppen`.
2. Erstellen Sie eine neue Gruppe.
3. Sobald Sie eine Gruppe erstellt haben, können Sie ihr den Zugriff auf andere Gruppen erlauben, indem Sie auf `Bearbeiten` klicken.
4. Wählen Sie die entsprechenden Gruppen aus, auf die Sie zugreifen möchten. Sie werden automatisch der entsprechenden Gruppe hinzugefügt.

## Mehrere Relay-Server einrichten
1. Gehen Sie zu `Einstellungen` im Menü auf der linken Seite.
2. Klicken Sie im Untermenü auf `Relay`.
3. Klicken Sie neben `Relay-Server` auf `+`.
4. Geben Sie die DNS- oder IP-Adresse des Relay-Servers in das nun angezeigte Feld ein und drücken Sie <kbd>Enter</kbd>.
5. Wenn Sie mehr als einen Relay-Server haben, können Sie weiterhin auf `+` klicken und die Geo-Einstellungen anpassen (speichern und kopieren Sie Ihren Schlüssel auf die anderen Server).

## Lizenz einstellen oder ändern
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

## Gerätebenutzer/Strategien/Gerätegruppen Geräten über die Webkonsole zuweisen

Der Benutzer ist der RustDesk-Benutzer, der auf dem Gerät angemeldet ist oder dem Gerät durch Klicken auf **Bearbeiten (Edit)** neben dem Gerät zugewiesen wurde.  
Klicke in das **Benutzer (User)**-Feld und wähle deinen Benutzer aus dem Dropdown-Menü.  
Du kannst auch mehrere Geräte einem Benutzer zuweisen, indem du in der **Benutzerliste (User List)** auf **Mehr → Geräte zuweisen (Assign Devices)** klickst.

Um ein Gerät einer Gerätegruppe hinzuzufügen, klicke in der **Geräteliste (Device List)** auf **Bearbeiten (Edit)** neben dem Gerät und ändere die **Gruppe (Group)**, oder gehe zur Liste **Gerätegruppen (Device Groups)**, klicke auf den Namen einer Gruppe und passe die darin enthaltenen Geräte an.

Um eine Strategie einem Gerät zuzuweisen, bewege die Maus auf die rechte Seite der **Strategieliste (Strategy List)** und klicke im Menü auf **Geräte bearbeiten (Edit Devices)**, **Benutzer bearbeiten (Edit Users)** oder **Gerätegruppen bearbeiten (Edit Device Groups)**, um die entsprechenden Geräte, Benutzergeräte oder Gerätegruppengeräte zur ausgewählten Strategie hinzuzufügen.

---

## API-Token

Zuerst musst du zu **Settings → Tokens → Create** gehen und ein Token mit den erforderlichen Berechtigungen erstellen:  
**Device, Audit Log, User, Group, Strategy, Address Book, Admin Role, Control Role**.

Nach der Erstellung kannst du diese Tokens über die **Befehlszeile (Command Line)** oder das **Python CLI** verwenden, um Aktionen mit den entsprechenden Berechtigungen auszuführen.

### Zuweisung über Token in der Befehlszeile

Du kannst auch die RustDesk-Programmdatei mit dem Parameter `--assign` verwenden, um Zuweisungen vorzunehmen.  
Damit kannst du Benutzer, Strategien, Adressbücher oder Gerätegruppen direkt über die Befehlszeile einem Gerät zuweisen.

**Beispiel:**  

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

---

Unterstützte Parameter  

| Parameter                               | Beschreibung                                       | RustDesk Server Pro | RustDesk Client |
| --------------------------------------- | -------------------------------------------------- | ------------------- | --------------- |
| `--user_name <username>`                | Weist dem Gerät einen Benutzer zu                  |                     |                 |
| `--strategy_name <strategyname>`        | Weist dem Gerät eine Strategie zu                  |                     |                 |
| `--address_book_name <addressbookname>` | Weist das Gerät einem Adressbuch zu                |                     |                 |
| `--address_book_tag <addressbooktag>`   | Weist über Adressbuch-Tag zu                       |                     |                 |
| `--address_book_alias <alias>`          | Weist über Adressbuch-Alias zu                     | 1.5.8               | 1.4.1           |
| `--address_book_password <password>`    | Setzt das Passwort für den Adressbucheintrag       | 1.6.6               | 1.4.3           |
| `--address_book_note <note>`            | Fügt eine Notiz für den Adressbucheintrag hinzu    | 1.6.6               | 1.4.3           |
| `--device_group_name <devicegroupname>` | Weist das Gerät einer Gerätegruppe zu              |                     |                 |
| `--note <note>`                         | Fügt dem Gerät eine Notiz hinzu                    | 1.6.6               | 1.4.3           |
| `--device_username <device_username>`   | Legt den Gerätenutzernamen fest                    | 1.6.6               | 1.4.3           |
| `--device_name <device_name>`           | Legt den Gerätenamen fest                          | 1.6.6               | 1.4.3           |
| [`--deploy`](/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) | Registriert ein neues Gerät, wenn **Bereitstellung für neue Geräte erforderlich** aktiviert ist. Erfordert ein API-Token mit der Berechtigung **Geräte** auf **Lesen und schreiben**. | 1.8.3 | 1.4.7 |

In der Windows-Befehlszeile wird standardmäßig keine Ausgabe angezeigt.  
Um eine Ausgabe zu erhalten, führe den Befehl wie folgt aus:  
`"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more`  
oder  
`"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`  
(siehe [hier](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)).

---

### Python CLI Verwaltungstools

#### Benutzerverwaltung (`users.py`)

**Hilfe anzeigen:**  
`./users.py -h`

**Benutzer anzeigen:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filter:**
- `--name`: Benutzername (unscharfe Suche)
- `--group_name`: Benutzergruppe (exakte Übereinstimmung)

**Beispiel:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Grundlegende Operationen:**

- **Benutzer deaktivieren:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Benutzer aktivieren:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Benutzer löschen:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Benutzererstellung und Einladung:**

- **Neuen Benutzer erstellen:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "Notiz"]`
  
  Erforderlich: `--name`, `--password`, `--group_name`  
  Optional: `--email`, `--note`

- **Benutzer per E-Mail einladen:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "Notiz"]`
  
  Erforderlich: `--email`, `--name`, `--group_name`  
  Optional: `--note`

**2FA und Sicherheitsoperationen:**

- **2FA-Erzwingung aktivieren:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Erforderlich: `--web-console-url`

- **2FA-Erzwingung deaktivieren:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Optional: `--web-console-url`

- **2FA zurücksetzen:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **E-Mail-Verifizierung deaktivieren:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Erzwungenes Abmelden:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Hinweise:**
- Bei Operationen auf mehrere Benutzer (durch Filter übereinstimmend) wird eine Bestätigung angefordert
- Wenn keine Benutzer übereinstimmen, wird "Found 0 users" angezeigt

---

#### Benutzergruppenverwaltung (`user-groups.py`)

**Hilfe anzeigen:**  
`./user-groups.py -h`

**Benutzergruppen anzeigen:**  
`./user-groups.py --url <url> --token <token> view [--name <group_name>]`

**Beispiel:**  
`./user-groups.py --url https://example.com --token <token> view --name "Vertriebsteam"`

**Gruppenoperationen:**

- **Benutzergruppe erstellen:**  
  `./user-groups.py --url <url> --token <token> add --name "Gruppenname" [--note "Beschreibung"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Beispiel mit Zugriffskontrolle:  
  `./user-groups.py --url <url> --token <token> add --name "Engineering" --accessed-from '[{"type":0,"name":"Manager"}]' --access-to '[{"type":1,"name":"Dev-Server"}]'`

- **Benutzergruppe aktualisieren:**  
  `./user-groups.py --url <url> --token <token> update --name "Gruppenname" [--new-name "Neuer Name"] [--note "Neue Notiz"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Benutzergruppe löschen:**  
  `./user-groups.py --url <url> --token <token> delete --name "Gruppenname"`
  
  Unterstützt kommagetrennte Namen: `--name "Gruppe1,Gruppe2,Gruppe3"`

**Benutzerverwaltung in Gruppen:**

- **Benutzer in Gruppe anzeigen:**  
  `./user-groups.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filter:
  - `--name`: Gruppenname (exakte Übereinstimmung, optional)
  - `--user-name`: Benutzername (unscharfe Suche, optional)
  
  Beispiel:  
  `./user-groups.py --url <url> --token <token> view-users --name Default --user-name john`

- **Benutzer zur Gruppe hinzufügen:**  
  `./user-groups.py --url <url> --token <token> add-users --name "Gruppenname" --users "user1,user2,user3"`

**Zugriffskontrollparameter:**

- `--accessed-from`: JSON-Array, das definiert, wer auf diese Benutzergruppe zugreifen kann
  - Type 0 = Benutzergruppe (z.B. `[{"type":0,"name":"Admins"}]`)
  - Type 2 = Benutzer (z.B. `[{"type":2,"name":"john"}]`)

- `--access-to`: JSON-Array, das definiert, worauf diese Benutzergruppe zugreifen kann
  - Type 0 = Benutzergruppe (z.B. `[{"type":0,"name":"Support"}]`)
  - Type 1 = Gerätegruppe (z.B. `[{"type":1,"name":"Server"}]`)

**Hinweis:** Verwenden Sie einfache Anführungszeichen um JSON-Arrays, um Shell-Parsing-Probleme zu vermeiden.

**Berechtigungsanforderungen:**
- `view/add/update/delete/add-users` Befehle benötigen **Benutzergruppen-Berechtigung**
- `view-users` Befehl benötigt **Benutzerberechtigung**

---

#### Verwaltung von Admin-Rollen (`admin-roles.py`)

Das Token muss zu einem vollständigen Administrator gehören und für **Admin Role** Lese- oder Lese-/Schreibberechtigung besitzen. Befehle zum Auflösen von Benutzernamen oder Auflisten von Rollenmitgliedern benötigen außerdem Leseberechtigung für **User**.

**Rollen anzeigen:**

```bash
./admin-roles.py --url <url> --token <token> view [--name <rollenname>] [--type global|individual|group]
./admin-roles.py --url <url> --token <token> view --guid <rollen-guid>
```

**Rolle erstellen:**

```bash
./admin-roles.py --url <url> --token <token> add \
  --name "Support Admin" --type global \
  --permissions "users.view,devices.view,audits.view" --note "Nur-Lese-Support"

./admin-roles.py --url <url> --token <token> add \
  --name "Support Scope" --type group \
  --permissions "users.view,devices.view,devices.enable_disable" \
  --user-groups "Support" --device-groups "Servers" --unassigned
```

Der Rollentyp kann nach der Erstellung nicht geändert werden. `--permissions` akzeptiert kommagetrennte Berechtigungsnamen, Dezimal-IDs oder IDs mit dem Präfix `0x`; die Formate können gemischt werden. Beispielsweise entspricht `users.view,513,0x0203` dem Wert `257,513,515`. Der Server lehnt Berechtigungen ab, die für den gewählten Rollentyp ungültig sind.

Der Befehl `view` wandelt bekannte Berechtigungs-IDs zurück in die Namen der folgenden Tabelle. Eine dem Skript unbekannte ID bleibt als Zahl erhalten, damit von einem neueren Server hinzugefügte Berechtigungen nicht verborgen werden.

| Bereich | Berechtigungen | Gültige Rollentypen |
| --- | --- | --- |
| Benutzer | `users.view` (`257`); `users.create` (`259`); `users.invite` (`260`); `users.delete` (`261`); `users.enable_disable` (`262`); `users.edit_email` (`263`); `users.edit_password` (`264`); `users.edit_note` (`265`); `users.manage_2fa` (`266`); `users.force_logout` (`267`); `users.change_strategy` (`269`); `users.change_control_role` (`270`); `users.edit_display_name` (`271`) | `global`, `group` |
| Benutzer | `users.change_group` (`268`) | `global` |
| Geräte | `devices.view` (`513`) | `global`, `group` |
| Geräte | `devices.enable_disable` (`515`); `devices.delete` (`516`); `devices.edit_info` (`517`); `devices.change_strategy` (`520`) | `global`, `individual`, `group` |
| Geräte | `devices.assign_to_user` (`518`); `devices.change_group` (`519`) | `global` |
| Benutzergruppen | `user_groups.view` (`769`); `user_groups.edit` (`770`) | `global` |
| Gerätegruppen | `device_groups.view` (`1025`); `device_groups.edit` (`1026`); `device_groups.change_strategy` (`1027`) | `global` |
| Prüfprotokolle | `audits.view` (`1281`); `audits.edit` (`1282`) | `global`, `individual` |
| Strategien | `strategies.view` (`1537`); `strategies.edit` (`1538`) | `global` |
| Benutzerdefinierte Clients | `custom_clients.view` (`1793`); `custom_clients.edit` (`1794`) | `global` |
| Steuerungsrollen | `control_roles.view` (`2049`); `control_roles.edit` (`2050`) | `global` |

**Rolle aktualisieren oder löschen:**

```bash
./admin-roles.py --url <url> --token <token> update --name "Support Admin" \
  [--new-name "Helpdesk Admin"] [--note "neue Notiz"] [--permissions "users.view,devices.view"] \
  [--user-groups "Support"] [--device-groups "Servers"] [--unassigned|--no-unassigned]

./admin-roles.py --url <url> --token <token> delete --name "Support Admin"
```

Mit einem leeren Wert für `--note`, `--permissions`, `--user-groups` oder `--device-groups` wird das jeweilige Feld geleert, zum Beispiel mit `--permissions ""`.

**Rollenmitglieder verwalten:**

```bash
./admin-roles.py --url <url> --token <token> view-users --name "Support Admin"
./admin-roles.py --url <url> --token <token> add-users --name "Support Admin" --users "user1,user2"
./admin-roles.py --url <url> --token <token> remove-users --name "Support Admin" --users "user1,user2"
```

Rollen und Benutzer können auch per GUID angegeben werden. In `--users` dürfen Benutzernamen und GUIDs gemischt werden.

---

#### Verwaltung von Steuerungsrollen (`control-roles.py`)

Das Token benötigt für **Control Role** Lese- oder Lese-/Schreibberechtigung. Befehle zum Auflösen von Benutzernamen oder Auflisten von Rollenmitgliedern benötigen außerdem Leseberechtigung für **User**.

**Rollen anzeigen:**

```bash
./control-roles.py --url <url> --token <token> view [--name <rollenname>] [--status enabled|disabled]
./control-roles.py --url <url> --token <token> view --guid <rollen-guid>
```

**Rolle erstellen, aktualisieren, löschen, aktivieren oder deaktivieren:**

```bash
./control-roles.py --url <url> --token <token> add --name "Contractors" [--note "Eingeschränkter Zugriff"]
./control-roles.py --url <url> --token <token> update --name "Contractors" [--new-name "Vendors"] [--note "neue Notiz"]
./control-roles.py --url <url> --token <token> delete --name "Contractors"
./control-roles.py --url <url> --token <token> enable --name "Contractors"
./control-roles.py --url <url> --token <token> disable --name "Contractors"
```

Neue Rollen, die mit diesem Skript erstellt werden, enthalten keine Steuerungsberechtigungen. Konfigurieren Sie diese in der Webkonsole, bevor Sie Benutzer zuweisen. Steuerungsberechtigungen werden von diesem Skript weder verwaltet noch angezeigt.

**Rollenmitglieder verwalten:**

```bash
./control-roles.py --url <url> --token <token> view-users --name "Contractors"
./control-roles.py --url <url> --token <token> assign-users --name "Contractors" --users "user1,user2"
./control-roles.py --url <url> --token <token> remove-users --users "user1,user2"
```

Rollen und Benutzer können auch per GUID angegeben werden. `remove-users` entfernt die aktuelle Steuerungsrolle jedes Benutzers und verwendet daher weder `--name` noch `--guid`. Bei der reservierten Rolle `Default` zeigt `view-users` nur explizite Zuweisungen; Benutzer ohne zugewiesene Steuerungsrolle erben ebenfalls `Default`. Die Rolle `Not Logged` kann Benutzern nicht zugewiesen werden. Reservierte Rollen können nicht umbenannt, mit einer Notiz versehen oder gelöscht werden.

---

#### Gerätegruppenverwaltung (`device-groups.py`)

**Hilfe anzeigen:**  
`./device-groups.py -h`

**Gerätegruppen anzeigen:**  
`./device-groups.py --url <url> --token <token> view [--name <group_name>]`

**Beispiel:**  
`./device-groups.py --url https://example.com --token <token> view`

**Gruppenoperationen:**

- **Gerätegruppe erstellen:**  
  `./device-groups.py --url <url> --token <token> add --name "Gruppenname" [--note "Beschreibung"] [--accessed-from '<json>']`
  
  Beispiel:  
  `./device-groups.py --url <url> --token <token> add --name "Produktion" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Gerätegruppe aktualisieren:**  
  `./device-groups.py --url <url> --token <token> update --name "Gruppenname" [--new-name "Neuer Name"] [--note "Neue Notiz"] [--accessed-from '<json>']`

- **Gerätegruppe löschen:**  
  `./device-groups.py --url <url> --token <token> delete --name "Gruppenname"`
  
  Unterstützt kommagetrennte Namen: `--name "Gruppe1,Gruppe2,Gruppe3"`

**Geräteverwaltung in Gruppen:**

- **Geräte in Gruppe anzeigen:**  
  `./device-groups.py --url <url> --token <token> view-devices [Filter]`
  
  Verfügbare Filter:
  - `--name`: Gerätegruppenname (exakte Übereinstimmung)
  - `--id`: Geräte-ID (unscharfe Suche)
  - `--device-name`: Gerätename (unscharfe Suche)
  - `--user-name`: Benutzername/Besitzer (unscharfe Suche)
  - `--device-username`: Am Gerät angemeldeter Benutzername (unscharfe Suche)
  
  Beispiele:  
  ```bash
  # Alle Geräte in einer Gruppe anzeigen
  ./device-groups.py --url <url> --token <token> view-devices --name Produktion
  
  # Nach Gerätename suchen
  ./device-groups.py --url <url> --token <token> view-devices --device-name server
  
  # Filter kombinieren
  ./device-groups.py --url <url> --token <token> view-devices --name Produktion --user-name john
  ```


- **Geräte zur Gruppe hinzufügen:**  
  `./device-groups.py --url <url> --token <token> add-devices --name "Gruppenname" --ids "deviceid1,deviceid2"`

- **Geräte aus Gruppe entfernen:**  
  `./device-groups.py --url <url> --token <token> remove-devices --name "Gruppenname" --ids "deviceid1,deviceid2"`

**Zugriffskontrollparameter:**

- `--accessed-from`: JSON-Array, das definiert, wer auf diese Gerätegruppe zugreifen kann
  - Type 0 = Benutzergruppe (z.B. `[{"type":0,"name":"Engineers"}]`)
  - Type 2 = Benutzer (z.B. `[{"type":2,"name":"admin"}]`)

**Berechtigungsanforderungen:**
- `view/add/update/delete/add-devices/remove-devices` Befehle benötigen **Gerätegruppen-Berechtigung**
- `view-devices` Befehl benötigt **Geräteberechtigung**

---

#### Geräteverwaltung (`devices.py`)

**Hilfe anzeigen:**  
    ./devices.py -h

**Geräte anzeigen:**  
    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filter:**  
`--id`: Geräte-ID  
`--device_name`: Gerätename  
`--user_name`: Zugewiesener Benutzer  
`--group_name`: Benutzergruppe  
`--device_group_name`: Gerätegruppe  
`--offline_days`: Offline-Tage

**Beispiel:**  
    ./devices.py --url https://example.com --token <token> view --user_name mike

**Operationen:**  
`view` kann durch `enable`, `disable`, `delete` oder `assign` ersetzt werden.

**Beispiel (Gerät zuweisen):**  
    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Adressbuchverwaltung (`ab.py`)

**Hilfe anzeigen:**  
    ./ab.py -h

**Freigegebene Adressbücher anzeigen:**  
    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Persönliche Adressbuch-GUID abrufen:**  
    ./ab.py --url <url> --token <token> get-personal-ab

**Ein freigegebenes Adressbuch hinzufügen:**  
    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Ein freigegebenes Adressbuch aktualisieren oder löschen:**  
    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]  
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Peers in einem Adressbuch anzeigen:**  
    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Peer hinzufügen, aktualisieren oder löschen:**  
    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]  
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]  
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Tag-Verwaltung:**  
    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>  
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]  
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000  
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Zugriffsregelverwaltung:**  
    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>  
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full  
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw  
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Beispiel (Lesezugriff für Benutzer „mike“ hinzufügen):**  
    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Strategieverwaltung (`strategies.py`)

**Hilfe anzeigen:**  
`./strategies.py -h`

**Alle Strategien auflisten:**  
`./strategies.py --url <url> --token <token> list`

**Spezifische Strategie anzeigen:**  
```bash
# Nach Name
./strategies.py --url <url> --token <token> view --name "Default"

# Nach GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Strategie aktivieren oder deaktivieren:**  
```bash
./strategies.py --url <url> --token <token> enable --name "StrategieName"
./strategies.py --url <url> --token <token> disable --name "StrategieName"
```

**Strategie Geräten, Benutzern oder Gerätegruppen zuweisen:**  
```bash
# Geräten zuweisen (nach Geräte-ID)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Benutzern zuweisen (nach Benutzername)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Gerätegruppen zuweisen (nach Gruppenname)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Gemischte Zuweisung
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Strategie-Zuweisung aufheben:**  
```bash
# Von Geräten aufheben
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Von Benutzern aufheben
./strategies.py --url <url> --token <token> unassign --users "admin"

# Von Gerätegruppen aufheben
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Hinweise:**
- Das Skript unterstützt sowohl Namen als auch GUIDs für Benutzer und Gerätegruppen
- Geräte-IDs werden automatisch in GUIDs konvertiert
- Alle assign/unassign-Operationen können mehrere Ziele gleichzeitig bearbeiten

**Berechtigungsanforderungen:**
- `list/view/enable/disable/assign/unassign` Befehle benötigen **Strategie-Berechtigung**
- `--peers` benötigt **Geräte-Berechtigung:r** (für ID zu GUID Lookup)
- `--users` benötigt **Benutzer-Berechtigung:r** (für Benutzername zu GUID Lookup)
- `--device-groups` benötigt **Gerätegruppen-Berechtigung:r** (für Gruppenname zu GUID Lookup)

---


#### Prüfprotokolle (`audits.py`)

**Hilfe anzeigen:**  
    ./audits.py -h

**Verbindungsprotokolle anzeigen:**  
    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Dateiübertragungsprotokolle anzeigen:**  
    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Alarmprotokolle anzeigen:**  
    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Konsolenprotokolle anzeigen:**  
    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filter:**  
`--remote`: Peer-ID (für Verbindungs- oder Dateiübertragungsprotokolle)  
`--conn-type`: 0=Remote Desktop, 1=Dateiübertragung, 2=Portweiterleitung, 3=Kamera anzeigen, 4=Terminal  
`--device`: Geräte-ID (für Alarmprotokolle)  
`--operator`: Benutzername des Operators (für Konsolenprotokolle)  
`--created-at`: Zeitfilter, z. B. "2025-09-16 14:15:57"  
`--days-ago`: Filtert Datensätze, die neuer als die angegebene Anzahl von Tagen sind  
`--page-size` / `--current`: Seitengröße / Aktuelle Seite

**Beispiel:**  
    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7


## Suche nach einem Gerät
1. Gehen Sie zu Geräte.
2. Geben Sie im Suchfeld für den Gerätenamen den Namen ein und klicken Sie auf `Abfrage` oder drücken Sie <kbd>Enter</kbd>.
3. Um einen Platzhalter zu verwenden, fügen Sie `%` am Anfang, am Ende oder an beiden Enden des Suchbegriffs ein.
