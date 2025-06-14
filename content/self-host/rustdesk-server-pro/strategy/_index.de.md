---
title: Strategie
weight: 200
---

Strategie ist ein Werkzeug für RustDesk-Administratoren, um die Sicherheitsoptionen der Client-Einstellungsseiten in großem Umfang zu aktualisieren. Administratoren können verschiedene Strategien erstellen und diese auf verschiedene Geräte anwenden.

## Strategien erstellen

Sie können eine neue Strategie erstellen, indem Sie auf die Schaltfläche `+` klicken und verschiedene Aktionen an der Strategie ausführen, indem Sie mit der Maus darüber fahren und auf das Menü klicken.

Im Popup-Menü können Sie die Strategie `Aktivieren` oder `Deaktivieren`, `Umbenennen`, `Duplizieren` oder `Löschen`. Zusätzlich können Sie auf `Geräte bearbeiten` klicken, um die auf diese Strategie angewendeten Geräte zu ändern, oder auf `Benutzer bearbeiten` klicken, um die auf diese Strategie angewendeten Benutzer zu ändern.

Auf der rechten Seite des Strategie-Menüs können Sie die Anzahl der tatsächlich auf die Strategie angewendeten Geräte sehen, unter Berücksichtigung der Priorität der Strategie.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

# Geräte-, Benutzer- und Gerätegruppen-Strategie

Strategien werden in der folgenden Prioritätsreihenfolge angewendet:
1. Geräte-Strategie (Höchste Priorität)
2. Benutzer-Strategie
3. Gerätegruppen-Strategie (Niedrigste Priorität)

Jedes Gerät kann nur von einer Strategie gleichzeitig verwaltet werden. Das Prioritätssystem funktioniert wie folgt:
- Geräte-Strategien haben Vorrang vor Benutzer- und Gerätegruppen-Strategien
- Benutzer-Strategien haben Vorrang vor Gerätegruppen-Strategien
- Gerätegruppen-Strategien gelten für alle Geräte in der Gruppe, die keine Geräte- oder Benutzer-Strategie zugewiesen haben

## Geräte bearbeiten

Wenn Sie auf das Menü `Geräte bearbeiten` klicken, öffnet sich ein Bearbeitungsdialog, der alle Geräte anzeigt. Sie können den Auswahlstatus der Kontrollkästchen ändern und dann auf die Schaltfläche `Speichern` klicken, um die auf der aktuellen Seite vorgenommenen Geräteänderungen anzuwenden. Wenn Sie Geräte auf anderen Seiten ändern müssen, navigieren Sie zu diesen Seiten. Sie können auch das Dropdown-Menü in der oberen rechten Ecke verwenden, um Geräte zu filtern.

Format der Strategie-Spalte: Geräte-Strategie/Benutzer-Strategie/Gerätegruppen-Strategie, oder "-" für die Standardstrategie.

Hier ist ein Beispiel des Dialogs, der erscheint, wenn Sie auf `Geräte bearbeiten` im Menü "demo1" klicken. In diesem Beispiel wird das Gerät "1981241962" auf die Strategie "demo3" angewendet; Das Gerät "1279471875" wird auf die Strategie "demo2" angewendet; Das Gerät "a123456" wird auf die Strategie "demo1" angewendet; Das Gerät "1227624460" wird auf die Standardstrategie angewendet.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

## Benutzer bearbeiten

Wenn Sie auf das Menü `Benutzer bearbeiten` klicken, öffnet sich ein Bearbeitungsdialog, der alle Benutzer anzeigt. Sie können den Auswahlstatus der Kontrollkästchen ändern und dann auf die Schaltfläche `Speichern` klicken, um die auf der aktuellen Seite vorgenommenen Benutzeränderungen anzuwenden. Wenn Sie Benutzer auf anderen Seiten ändern müssen, navigieren Sie zu diesen Seiten. Sie können auch das Dropdown-Menü in der oberen rechten Ecke verwenden, um Benutzer zu filtern.

Hier ist ein Beispiel des Dialogs, der erscheint, wenn Sie auf `Benutzer bearbeiten` im Menü "demo2" klicken. In diesem Beispiel wird der Benutzer "admin" auf die Strategie "default" angewendet; Der Benutzer "user1" wird auf die Strategie "demo2" angewendet; Der Benutzer "user2" wird auf die Strategie "demo3" angewendet.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

## Gerätegruppen bearbeiten

Wenn Sie auf das Menü `Gerätegruppe bearbeiten` klicken, öffnet sich ein Bearbeitungsdialog, der alle Gerätegruppen anzeigt. Sie können den Auswahlstatus der Kontrollkästchen ändern und dann auf die Schaltfläche `Speichern` klicken, um die auf der aktuellen Seite vorgenommenen Gerätegruppen-Änderungen anzuwenden. Wenn Sie Gerätegruppen auf anderen Seiten ändern müssen, navigieren Sie zu diesen Seiten. Sie können auch das Dropdown-Menü in der oberen rechten Ecke verwenden, um Gerätegruppen zu filtern.

Hier ist ein Beispiel des Dialogs, der erscheint, wenn Sie auf `Gerätegruppe bearbeiten` im Menü "demo1" klicken. In diesem Beispiel wird die Gerätegruppe "device_group1" auf die Strategie "demo1" angewendet; Die Gerätegruppe "group2" wird auf die Strategie "demo2" angewendet; Die Gerätegruppe "group3" wird auf die Strategie "default" angewendet.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

## Strategie-Synchronisation

Jedes Gerät kann nur von einer Strategie verwaltet werden, und wenn diese Strategie deaktiviert ist, wird das Gerät von keiner Strategie verwaltet. Bei der Synchronisierung von Strategien zeichnet RustDesk die Zeitstempel der lokalen und Server-Strategie auf, um zu bestimmen, ob eine Synchronisierung erforderlich ist. Das heißt, nach Abschluss der Strategie-Synchronisation:

* Wenn der Benutzer einige Optionen ändert, verwendet der Client die Optionen des Benutzers.
* Wenn der Administrator den Inhalt der Strategie ändert, werden die Optionen des Clients synchronisiert.
* Wenn der Administrator die Strategie ändert, zu der das Gerät gehört, werden die Optionen des Clients synchronisiert.

## Strategien bearbeiten

Klicken Sie am unteren Rand der Strategie auf `Bearbeiten`, nehmen Sie die Änderungen vor und klicken Sie auf `Senden`. Die Strategie wird innerhalb von 30 Sekunden mit den Geräten synchronisiert.
