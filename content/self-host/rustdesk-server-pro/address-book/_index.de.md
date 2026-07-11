---
title: Adressbuch
weight: 201
description: "Verwenden Sie das Adressbuch in RustDesk Server Pro, um Remote-Geräte zu speichern, Gerätelisten freizugeben, Geräte mit Tags zu organisieren und im RustDesk-Client mit freigegebenen Passwörtern zu verbinden."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

Das Adressbuch ermöglicht Benutzern, RustDesk-Geräte-IDs zu speichern, sie mit Tags zu organisieren, Gerätelisten freizugeben und im RustDesk-Client mit gespeicherten Passwörtern zu verbinden.

## Kurze Antwort

- **Mein Adressbuch** ist privat für den angemeldeten Benutzer. Gemerkte, manuell eingegebene Passwörter werden in **Mein Adressbuch** gespeichert und können zwischen den Geräten des Benutzers synchronisiert werden.
- **Freigegebene** Adressbücher können für bestimmte Benutzer, Benutzergruppen oder alle Benutzer freigegeben werden.
- Ein freigegebenes Adressbuch kann ein Passwort auf Adressbuchebene speichern, und jeder Geräteeintrag kann ein Passwort auf Geräteebene speichern. Wenn kein Passwort auf Geräteebene festgelegt ist, wird das Passwort auf Adressbuchebene verwendet.
- Tags können verwendet werden, um Geräte in der Web-Konsole und im RustDesk-Client zu filtern.

## Ein-Klick-Verbindung mit einem freigegebenen Adressbuch

Verwenden Sie ein freigegebenes Adressbuch, wenn Benutzer verbinden müssen, ohne jedes Mal das Remote-Passwort manuell einzugeben.

1. Erstellen oder öffnen Sie ein freigegebenes Adressbuch. Optional können Sie ein **Passwort auf Adressbuchebene** für das Adressbuch festlegen.

2. Klicken Sie auf den Namen des Adressbuchs, um die Geräteseite zu öffnen. Klicken Sie auf **Importieren**, wählen Sie die Geräte aus, die in das Adressbuch importiert werden sollen, und klicken Sie unten auf **Speichern**, um die ausgewählten Geräte zu speichern. Oder klicken Sie auf **Hinzufügen**, um ein Gerät per ID hinzuzufügen; für direkten IP-Zugriff können Sie eine IP-Adresse als ID verwenden. Optional können Sie für einzelne Geräteeinträge ein **Passwort auf Geräteebene** festlegen.

3. Geben Sie das Adressbuch für bestimmte Benutzer, Benutzergruppen oder alle Benutzer frei.

4. Der Benutzer meldet sich im RustDesk-Client an und öffnet den Tab **Adressbuch**.

5. Der Benutzer wählt das freigegebene Adressbuch aus und klickt auf die Gerätekarte.

![Gerätekarte eines freigegebenen Adressbuchs im Client anklicken](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
Das freigegebene Passwort wird nur verwendet, wenn die Verbindung aus dem entsprechenden freigegebenen Adressbuch hergestellt wird, entweder durch Klicken auf die Gerätekarte oder über deren Dropdown-Menü. Es wird nicht von einem anderen Geräte-Tab, über die Schaltfläche **Verbinden** neben dem ID-Eingabefeld oder aus einem anderen freigegebenen Adressbuch verwendet.
{{% /notice %}}

## Berechtigungen für freigegebene Adressbücher

| Berechtigung | Was Benutzer tun können |
| --- | --- |
| **Nur Lesen** | Kann Geräte und Tags anzeigen und das Passwort verwenden. |
| **Lesen/Schreiben** | Kann Geräte und Tags bearbeiten. |
| **Vollzugriff** | Kann das Adressbuch erneut freigeben, löschen oder umbenennen. |

Wenn mehrere Regeln auf denselben Benutzer zutreffen, gilt folgende Priorität:

1. Benutzer
2. Gruppe
3. Alle

Wenn beispielsweise **Alle** Nur Lesen haben, ein bestimmter Benutzer aber Vollzugriff hat, erhält dieser Benutzer Vollzugriff.

![Berechtigungen zum Freigeben des Adressbuchs](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Berechtigung eines freigegebenen Adressbuchs in der Web-Konsole](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Web-Konsole

### Freigegebenes Adressbuch erstellen oder bearbeiten

Erstellen Sie unter **Adressbuch > Freigegeben** ein freigegebenes Adressbuch mit einem Namen, einer optionalen Notiz und einem optionalen **Standardpasswort für die Freigabe**. Dies ist das Passwort auf Adressbuchebene.

![Freigegebenes Adressbuch mit Standardpasswort für die Freigabe erstellen](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Geräte und Passwörter hinzufügen

Geräte können manuell per ID hinzugefügt oder aus der Server-Pro-Geräteliste importiert werden. Für jeden Eintrag können Sie einen Alias, Tags, eine Notiz und bei freigegebenen Adressbüchern ein Passwort auf Geräteebene festlegen.

![Gerät zu einem freigegebenen Adressbuch hinzufügen](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Geräte](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Gerät in einem freigegebenen Adressbuch bearbeiten](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tags und Filterung

Tags organisieren und filtern Geräte. `Ohne Tag` filtert Geräte ohne Tags. Wenn **Nach Schnittpunkt filtern** aktiviert ist, werden nur Geräte angezeigt, die allen ausgewählten Tags entsprechen.

### Papierkorb

Das Löschen eines Geräts aus einem Adressbuch verschiebt den Eintrag in den Papierkorb dieses Adressbuchs. Das Gerät wird dadurch nicht aus RustDesk Server Pro gelöscht.

## Verhalten freigegebener Passwörter

| Passwortebene | Priorität |
| --- | --- |
| Passwort auf Geräteebene | Wird zuerst verwendet, wenn der Geräteeintrag ein Passwort hat. |
| Passwort auf Adressbuchebene | Wird verwendet, wenn der Geräteeintrag kein Passwort hat. |

Wenn keines der beiden Passwörter festgelegt ist, verbindet sich der Benutzer normal und muss das Passwort möglicherweise manuell eingeben. In der Web-Konsole zeigen Passwortspalten nur an, ob ein Passwort festgelegt ist.

## RustDesk-Client

Nach der Anmeldung können Sie mit der Adressbuchauswahl zwischen **Mein Adressbuch** und freigegebenen Adressbüchern wechseln. Bei freigegebenen Adressbüchern zeigt der Client die Berechtigung des aktuellen Benutzers an.

![Adressbuchauswahl im RustDesk-Client](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Adressbuch mit Nur-Lesen-Berechtigung](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Im Client bearbeiten

Benutzer mit Schreibberechtigung können IDs hinzufügen, Tags hinzufügen, Aliase bearbeiten, Tags bearbeiten, Notizen bearbeiten, freigegebene Passwörter festlegen oder Einträge entfernen.

![Adressbuch-Gerätemenü 1 im RustDesk-Client](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![ID im RustDesk-Client hinzufügen](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Adressbuch-Gerätemenü 2 im RustDesk-Client](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Passwort im RustDesk-Client ändern](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Bereitstellungsvorgaben

Die RustDesk-Client-Konfiguration kann die Adressbuchzuweisung voreinstellen:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` und `preset-address-book-note` erfordern RustDesk-Client 1.4.3 oder höher und RustDesk Server Pro 1.6.6 oder höher.

Weitere Details finden Sie in der [erweiterten Client-Konfiguration](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Zugehörige Einstellungen

| Einstellung | Ort | Wirkung |
| --- | --- | --- |
| **Nicht-Admins erlauben, Adressbücher für andere Gruppen freizugeben** | **Einstellungen > Sonstiges** | Erlaubt Benutzern ohne Adminrechte, Adressbücher für andere Benutzergruppen freizugeben. |
| **Adressbuch deaktivieren** | **Benutzerdefinierter Client** | Blendet das Adressbuch im erzeugten benutzerdefinierten Client aus oder deaktiviert es. |

## Fehlerbehebung

### Falsches Passwort

Das in einem freigegebenen Adressbuch gespeicherte Passwort wird vom steuernden RustDesk-Client verwendet. Es wird nicht auf dem gesteuerten Gerät festgelegt. Legen Sie das Passwort des gesteuerten Geräts auf diesem Gerät unter **Einstellungen > Sicherheit > Passwort** fest.

Um das freigegebene Passwort zu verwenden, verbinden Sie aus dem entsprechenden freigegebenen Adressbuch, indem Sie auf die Gerätekarte klicken. Eine Verbindung aus einem anderen Adressbuch, einem anderen Geräte-Tab oder über die Schaltfläche **Verbinden** neben dem ID-Eingabefeld verwendet das freigegebene Passwort dieses Adressbuchs nicht.
