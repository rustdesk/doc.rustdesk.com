---
title: Admin-Rolle
weight: 17
---

Die Admin-Rolle ermöglicht es Administratoren, Teilverwaltungsrechte an Nicht-Administratoren zu delegieren. Sie können Berechtigungen für globale Ressourcen (wie Strategien, Kontrollrollen und benutzerdefinierte Clients) sowie für Benutzer und Geräte innerhalb unterschiedlicher Geltungsbereiche definieren.

Sobald einem Benutzer eine Admin-Rolle zugewiesen wird, sieht er im Web-Console die entsprechenden Seiten und Menüs basierend auf den gewährten Berechtigungen.

## Administratoren vs. Admin-Rollen

- Nur Administratoren können Admin-Rollen bearbeiten und Admin-Rollen Benutzern zuweisen.
- Administratoren unterliegen keinen Einschränkungen durch Admin-Rollen, auch wenn ihnen Admin-Rollen zugewiesen werden können.
- Nicht-Admin-Benutzer können keine Administrator-Konten bearbeiten, selbst wenn globale Benutzerberechtigungen gewährt wurden.

## Rollentypen

Admin-Rollen gibt es in drei Typen, jeweils mit unterschiedlichem Geltungsbereich und verfügbaren Berechtigungen.

| Typ | Beschreibung |
|------|-------------|
| **Global** | Kann alle Ressourcen im gesamten Team verwalten |
| **Individuell** | Kann nur die eigenen Geräte und Audit-Logs des Benutzers verwalten |
| **Gruppenbezogen** | Kann Benutzer und Geräte innerhalb festgelegter Gruppen verwalten |

### Über gruppenbezogene Rollen

| Ausgewählte Berechtigungen | Angewendet auf |
|-------|-------------|
| **Benutzerberechtigungen** | Gelten für Benutzer innerhalb der ausgewählten Benutzergruppen |
| **Geräteberechtigungen** | Gelten für Geräte aus: <ul><li>Ausgewählten Gerätegruppen</li><li>Geräten, die Benutzern innerhalb der ausgewählten Benutzergruppen zugewiesen sind</li><li>Nicht zugewiesenen Geräten (falls aktiviert)</li></ul> |

## Berechtigungsregeln

### Jede Bearbeitungsberechtigung beinhaltet die entsprechende Anzeigeberechtigung

Jede Bearbeitungsberechtigung beinhaltet automatisch die entsprechende Anzeigeberechtigung.
Zum Beispiel beinhaltet die Berechtigung „Geräte aktivieren/deaktivieren" auch die Berechtigung „Geräte anzeigen".

### Bearbeitungsberechtigung beinhaltet keine Zuweisung

Bearbeitungsberechtigungen für Ressourcen (Benutzergruppen, Gerätegruppen, Strategien, Kontrollrollen) erlauben nur das Bearbeiten der Ressourcen selbst, nicht jedoch deren Zuweisung an Benutzer oder Geräte.

Zum Beispiel erlaubt die Berechtigung „Gerätegruppen bearbeiten" das Erstellen und Ändern von Gerätegruppen, aber um Geräte zu Gruppen hinzuzufügen oder daraus zu entfernen, ist die Berechtigung „Geräte Gruppen aktualisieren" erforderlich.

### Anzeigeberechtigung beinhaltet keine Mitglieder

Anzeigeberechtigungen für Ressourcen (Benutzergruppen, Gerätegruppen, Strategien, Kontrollrollen) erlauben nur das Anzeigen der Ressourcen selbst, nicht jedoch das Anzeigen der darin enthaltenen Mitglieder.

Zum Beispiel erlaubt die Berechtigung „Gerätegruppen anzeigen“ das Anzeigen der Liste von Gerätegruppen. Um jedoch die Geräte innerhalb einer Gruppe zu sehen, ist die Berechtigung „Geräte anzeigen“ oder eine entsprechende Geräte-Bearbeitungsberechtigung erforderlich.  
Ist die Geräteberechtigung global, können alle Geräte der Gruppe gesehen werden; ist sie gruppenbezogen oder individuell, sind nur Geräte innerhalb des erlaubten Geltungsbereichs sichtbar.

{{% notice note %}}
Das Lesen von Geräten für Adressbücher wird nicht durch Admin-Rollen beeinflusst. Der Tab für zugängliche Geräte im Client wird nur durch **Einstellungen → Sonstiges → Abrufen zugänglicher Geräte deaktivieren** in der Konsole gesteuert und ist ebenfalls nicht durch Admin-Rollen eingeschränkt.
{{% /notice %}}

## Console-Bedienung

### Rolle erstellen

1. Navigieren Sie zur Seite **Admin-Rollen** und klicken Sie auf **Erstellen**
2. Geben Sie einen **Namen** für die Rolle ein
3. Wählen Sie einen **Typ** (bei **Gruppenbezogen** zusätzlich den Geltungsbereich konfigurieren)
4. Wählen Sie die zu gewährenden **Berechtigungen**

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Rollen zuweisen

Es gibt zwei Möglichkeiten, Admin-Rollen Benutzern zuzuweisen:

1. **Benutzer-Seite** → **Bearbeiten** bei einem Benutzer → Rollen im Feld **Admin-Rollen** auswählen
2. **Admin-Rollen-Seite** → Auf die **Benutzeranzahl** oder **Benutzer zuweisen** klicken → Benutzer zur Rolle hinzufügen oder entfernen

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Ein Benutzer kann mehrere Admin-Rollen haben. Die Berechtigungen aller zugewiesenen Rollen werden kombiniert (Vereinigung aller Berechtigungen).
{{% /notice %}}

## Berechtigungsreferenz

### Globale Berechtigungen

| Berechtigung | Beschreibung |
|------------|-------------|
| Users-View | Listeninformationen aller Benutzer anzeigen. |
| Users-Create | Nicht-Administrator-Benutzer direkt erstellen. |
| Users-Invite | Benutzer per E-Mail einladen. |
| Users-Delete | Jeden Nicht-Administrator-Benutzer löschen. Benutzer müssen vor dem Löschen deaktiviert werden. |
| Users-Enable/Disable | Jeden Nicht-Administrator-Benutzer aktivieren oder deaktivieren. |
| Users-Edit Email | E-Mail-Adresse jedes Nicht-Administrator-Benutzers ändern. |
| Users-Edit Password | Passwort jedes Nicht-Administrator-Benutzers ändern. |
| Users-Edit Note | Notiz jedes Nicht-Administrator-Benutzers ändern. |
| Users-Manage 2FA | Login-Verifizierung für jeden Nicht-Administrator-Benutzer verwalten. Beinhaltet Aktivieren/Deaktivieren der 2FA-Pflicht, Zurücksetzen der 2FA-Konfiguration und Deaktivieren der E-Mail-Anmeldeverifizierung. |
| Users-Force Logout | Jeden Nicht-Administrator-Benutzer von allen Geräten abmelden. |
| Users-Update Group | Benutzergruppe jedes Nicht-Administrator-Benutzers ändern. |
| Users-Update Strategy | Strategie jedes Nicht-Administrator-Benutzers ändern. |
| Users-Update Control Role | Kontrollrolle jedes Nicht-Administrator-Benutzers ändern. |
| Devices-View | Listeninformationen aller Geräte anzeigen. |
| Devices-Enable/Disable | Jedes Gerät aktivieren oder deaktivieren. |
| Devices-Delete | Jedes Gerät löschen. Geräte müssen vor dem Löschen deaktiviert werden. |
| Devices-Edit Info | Gerätenamen, Gerätenutzername (Systembenutzername des Geräts, nicht der RustDesk-Benutzer) und Notiz für jedes Gerät bearbeiten. |
| Devices-Assign to User | Jedes Gerät einem beliebigen Benutzer zuweisen. |
| Devices-Update Group | Gerätegruppe jedes Geräts ändern. |
| Devices-Update Strategy | Strategie jedes Geräts ändern. |
| User Groups-View | Listeninformationen aller Benutzergruppen anzeigen. Mit der Berechtigung „Users-View“ können Gruppenmitglieder angezeigt werden. Mit der Berechtigung „Users-Update Group“ können Benutzergruppen hier stapelweise aktualisiert werden. |
| User Groups-Edit | Benutzergruppen erstellen, bearbeiten und löschen, ohne Gruppenmitglieder zu aktualisieren. |
| Device Groups-View | Listeninformationen aller Gerätegruppen anzeigen. Mit der Berechtigung „Devices-View“ können Gruppenmitglieder angezeigt werden. Mit der Berechtigung „Devices-Update Group“ können Gerätegruppen hier stapelweise aktualisiert werden. |
| Device Groups-Edit | Gerätegruppen erstellen, bearbeiten und löschen, ohne Gruppenmitglieder zu aktualisieren. Beinhaltet die Berechtigung „Strategie aktualisieren“. |
| Device Groups-Update Strategy | Strategie jeder Gerätegruppe ändern. |
| Audit Logs-View | Alle Logs anzeigen. Notizen können bearbeitet werden. Auch wenn die Option „Nur Administratoren dürfen auf Logs zugreifen“ aktiviert ist. |
| Audit Logs-Edit | Jede aktive Verbindung trennen. |
| Strategies-View | Jede Strategie anzeigen. Mit den Berechtigungen „Users-View“, „Devices-View“ und „Device Groups-View“ können Strategien für Benutzer, Geräte und Gerätegruppen angezeigt werden. Mit den entsprechenden Update-Berechtigungen können Strategien hier stapelweise aktualisiert werden. |
| Strategies-Edit | Strategien erstellen, bearbeiten und löschen, ohne sie Benutzern, Geräten oder Gerätegruppen zuzuweisen. |
| Control Roles-View | Jede Kontrollrolle anzeigen. Mit der Berechtigung „Users-View“ können Kontrollrollen von Benutzern angezeigt werden. Mit der Berechtigung „Users-Update Control Role“ können Kontrollrollen hier stapelweise aktualisiert werden. |
| Control Roles-Edit | Kontrollrollen erstellen, bearbeiten und löschen, ohne sie Benutzern zuzuweisen. |
| Custom Clients-View | Liste der benutzerdefinierten Clients anzeigen. Kompilierte benutzerdefinierte Clients können heruntergeladen werden. Die detaillierte Konfiguration kann nicht eingesehen werden. |
| Custom Clients-Edit | Benutzerdefinierte Clients erstellen, bearbeiten und löschen. |

### Individuelle Berechtigungen

| Berechtigung | Beschreibung |
|------------|-------------|
| Devices-View | Listeninformationen der eigenen Geräte anzeigen. |
| Devices-Enable/Disable | Eigene Geräte aktivieren oder deaktivieren. |
| Devices-Delete | Eigene Geräte löschen. Geräte müssen vor dem Löschen deaktiviert werden. |
| Devices-Edit Info | Gerätenamen, Gerätenutzername (Systembenutzername des Geräts, nicht der RustDesk-Benutzer) und Notiz für eigene Geräte bearbeiten. |
| Devices-Update Strategy | Strategie der eigenen Geräte ändern. |
| Audit Logs-View | Eigene Logs anzeigen. Notizen können bearbeitet werden. Auch wenn die Option „Nur Administratoren dürfen auf Logs zugreifen“ aktiviert ist. |
| Audit Logs-Edit | Eigene aktive Verbindungen trennen. |

### Gruppenbezogene Berechtigungen

| Berechtigung | Beschreibung |
|------------|-------------|
| Users-View | Listeninformationen von Benutzern innerhalb der ausgewählten Benutzergruppen anzeigen. |
| Users-Create | Nicht-Administrator-Benutzer innerhalb der ausgewählten Benutzergruppen erstellen. |
| Users-Invite | Benutzer innerhalb der ausgewählten Benutzergruppen per E-Mail einladen. |
| Users-Delete | Nicht-Administrator-Benutzer innerhalb der ausgewählten Benutzergruppen löschen. Benutzer müssen vor dem Löschen deaktiviert werden. |
| Users-Enable/Disable | Nicht-Administrator-Benutzer innerhalb der ausgewählten Benutzergruppen aktivieren oder deaktivieren. |
| Users-Edit Email | E-Mail-Adresse von Nicht-Administrator-Benutzern innerhalb der ausgewählten Benutzergruppen ändern. |
| Users-Edit Password | Passwort von Nicht-Administrator-Benutzern innerhalb der ausgewählten Benutzergruppen ändern. |
| Users-Edit Note | Notiz von Nicht-Administrator-Benutzern innerhalb der ausgewählten Benutzergruppen ändern. |
| Users-Manage 2FA | Login-Verifizierung für Nicht-Administrator-Benutzer innerhalb der ausgewählten Benutzergruppen verwalten. Beinhaltet Aktivieren/Deaktivieren der 2FA-Pflicht, Zurücksetzen der 2FA-Konfiguration und Deaktivieren der E-Mail-Anmeldeverifizierung. |
| Users-Force Logout | Nicht-Administrator-Benutzer innerhalb der ausgewählten Benutzergruppen von allen Geräten abmelden. |
| Users-Update Strategy | Strategie von Nicht-Administrator-Benutzern innerhalb der ausgewählten Benutzergruppen ändern. |
| Users-Update Control Role | Kontrollrolle von Nicht-Administrator-Benutzern innerhalb der ausgewählten Benutzergruppen ändern. |
| Devices-View | Listeninformationen der vom aktuellen Rolle verwalteten Geräte anzeigen. |
| Devices-Enable/Disable | Vom aktuellen Rolle verwaltete Geräte aktivieren oder deaktivieren. |
| Devices-Delete | Vom aktuellen Rolle verwaltete Geräte löschen. Geräte müssen vor dem Löschen deaktiviert werden. |
| Devices-Edit Info | Gerätenamen, Gerätenutzername (Systembenutzername des Geräts, nicht der RustDesk-Benutzer) und Notiz für vom aktuellen Rolle verwaltete Geräte bearbeiten. |
| Devices-Update Strategy | Strategie der vom aktuellen Rolle verwalteten Geräte ändern. |
