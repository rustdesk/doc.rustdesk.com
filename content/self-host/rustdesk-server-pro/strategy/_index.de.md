---
title: Strategy
weight: 200
---

## Strategy

Strategy ist ein Werkzeug für RustDesk-Administratoren, um die Sicherheitsoptionen der Client-Einstellungsseiten in großen Mengen zu aktualisieren. Administratoren können verschiedene Strategien erstellen und sie auf verschiedene Geräte anwenden.

### Strategien erstellen

Sie können eine neue Strategie erstellen, indem Sie auf die Schaltfläche `+` klicken und verschiedene Aktionen auf der Strategie ausführen, indem Sie darüber schweben und auf das Menü klicken. 

Im Popup-Menü können Sie wählen, die Strategie zu `aktivieren` oder `deaktivieren`, sie `umbenennen`, `duplizieren` oder `löschen`.Zusätzlich können Sie auf `Geräte bearbeiten` klicken, um die auf diese Strategie angewendeten Geräte zu ändern, oder auf `Benutzer bearbeiten`, um die auf diese Strategie angewendeten Benutzer zu ändern.

Auf der rechten Seite des Strategiemenus können Sie die Anzahl der tatsächlich auf die Strategie angewendeten Geräte sehen, unter Berücksichtigung der Priorität der Strategie.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

### Gerätestrategie und Benutzerstrategie

Jedes Gerät kann nur von einer Strategie verwaltet werden, wobei Gerätestrategien Vorrang vor Benutzerstrategien haben. Benutzerstrategien sind dafür verantwortlich, alle Geräte unter dem Benutzer zu verwalten, denen keine spezifische Strategie zugewiesen ist.

### Geräte bearbeiten

Wenn Sie auf das Menü `Geräte bearbeiten` klicken, öffnet sich ein Bearbeitungsdialogfeld, das alle Geräte anzeigt. Sie können den Auswahlstatus der Kontrollkästchen ändern und dann auf die Schaltfläche `Save` klicken, um die auf der aktuellen Seite vorgenommenen Geräteänderungen anzuwenden. Wenn Sie Geräte auf anderen Seiten ändern möchten, navigieren Sie bitte zu diesen Seiten. Sie können auch das Dropdown-Menü in der oberen rechten Ecke verwenden, um Geräte zu filtern.

Hier ist ein Beispiel für das Dialogfeld, das angezeigt wird, wenn Sie auf dem Demo2-Menü auf `Geräte bearbeiten` klicken. In diesem Beispiel ist das Gerät "362587269" der "Demo2" -Strategie zugeordnet. Das Gerät "157333666" war ursprünglich der Standardstrategie zugeordnet, wird aber nach dem Klicken auf `Save` der "Demo2" -Strategie zugewiesen. Das Gerät "232026634" verfügt über eine Gerätestrategie für "Demo1" und eine Benutzerstrategie für "Demo2". Da die Gerätestrategie Vorrang hat, wird dieses Gerät der "Demo1" -Strategie zugewiesen.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)


### Benutzer bearbeiten

Wenn Sie auf das Menü `Benutzer bearbeiten` klicken, öffnet sich ein Bearbeitungsdialogfeld, das alle Benutzer anzeigt. Sie können den Auswahlstatus der Kontrollkästchen ändern und dann auf die Schaltfläche `Save` klicken, um die auf der aktuellen Seite vorgenommenen Benutzeränderungen anzuwenden. Wenn Sie Benutzer auf anderen Seiten ändern möchten, navigieren Sie bitte zu diesen Seiten. Sie können auch das Dropdown-Menü in der oberen rechten Ecke verwenden, um Benutzer zu filtern.

Hier ist ein Beispiel für das Dialogfeld, das angezeigt wird, wenn Sie auf dem "Demo2"-Menü auf `Benutzer bearbeiten` klicken. In diesem Beispiel war der Benutzer "user2" ursprünglich der Standardstrategie zugeordnet und wird nach dem Klicken auf `Save` der "Demo2"-Strategie zugewiesen. Der Benutzer "user1" ist der Standardstrategie zugeordnet und der Benutzer "admin" ist der "Demo2"-Strategie zugeordnet.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

### Strategie-Synchronisation

Jedes Gerät kann nur von einer Strategie verwaltet werden. Wenn diese Strategie deaktiviert ist, wird das Gerät von keiner anderen Strategie verwaltet. Bei der Synchronisierung von Strategien zeichnet RustDesk die Zeitstempel der lokalen und der Serverstrategie auf, um festzustellen, ob eine Synchronisierung erforderlich ist. Das heißt, die Strategie-Synchronisation ist abgeschlossen:

* Wenn der Benutzer einige Optionen ändert, verwendet der Client die Optionen des Benutzers.
* Wenn der Administrator den Inhalt der Strategie ändert, werden die Optionen des Clients synchronisiert.
* Wenn der Administrator die Strategie ändert, zu der das Gerät gehört, werden die Optionen des Clients synchronisiert.

### Strategien bearbeiten

Klicken Sie unten in der Strategie auf `Bearbeiten`, nehmen Sie Änderungen vor und klicken Sie auf `Senden`. Die Strategie wird innerhalb von 30 Sekunden mit den Geräten synchronisiert.
