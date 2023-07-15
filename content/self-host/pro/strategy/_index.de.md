---
title: Strategy
weight: 200
---

## Strategy

Strategy ist ein Werkzeug für RustDesk-Administratoren, um die Sicherheitsoptionen der Client-Einstellungsseiten in großen Mengen zu aktualisieren. Administratoren können verschiedene Strategien erstellen und sie auf verschiedene Geräte anwenden. RustDesk bietet eine Standardstrategie und Administratoren können benutzerdefinierte Strategien erstellen.

### Strategien erstellen und duplizieren

RustDesk bietet eine Standardstrategie, die Administratoren ändern können. Oder sie können eine neue Strategie erstellen bzw. eine vorhandene Strategie duplizieren. Bei der Erstellung einer neuen Strategie können Administratoren Geräte `Umbenennen`, `Löschen` oder `Bearbeiten`. Beim Duplizieren einer Strategie können die Administratoren diese auf der Grundlage der vorhandenen Strategie ändern.

| Standardstrategie | Andere Strategien |
| :--------------: | :------------: |
| ![](/docs/en/self-host/pro/strategy/images/default_strategy.png) | ![](/docs/en/self-host/pro/strategy/images/other_strategy.png) |

### Strategien aktivieren und deaktivieren

Administratoren können je nach Bedarf verschiedene Strategien `Aktivieren` oder `Deaktivieren`. Standardmäßig verwenden alle Geräte die Standardstrategie. Wenn Administratoren eine andere Strategie verwenden möchten, können sie diese in den Strategieoptionen aktivieren.

### Geräte verwalten

Jedes Gerät kann nur mit einer Strategie verwaltet werden. Administratoren können die Verwaltungsstrategie eines Geräts über die Option `Geräte bearbeiten` ändern. Standardmäßig verwenden alle Geräte die Standardstrategie. Administratoren können Geräte hinzufügen oder löschen und deren Verwaltungsstrategien ändern. Wenn ein Gerät gelöscht wird, wird es wieder mit der Standardstrategie verwaltet.

In der Schnittstelle zur Geräteverwaltung wird der linke Bereich zum Filtern von Geräten verwendet. Die in der rechten Spalte ausgewählten Geräte werden von der aktuellen Strategie verwaltet. Geräte, die nicht angemeldet sind, werden in der Gruppe `-` angezeigt.

| Benutzergruppe | Ungebundene Geräte |
| :--------------: | :------------: |
| ![](/docs/en/self-host/pro/strategy/images/edit_devices_group.png) | ![](/docs/en/self-host/pro/strategy/images/edit_devices_unbinded.png) |

### Strategie-Synchronisation

Jedes Gerät kann nur von einer Strategie verwaltet werden. Wenn diese Strategie deaktiviert ist, wird das Gerät von keiner anderen Strategie verwaltet. Bei der Synchronisierung von Strategien zeichnet RustDesk die Zeitstempel der lokalen und der Serverstrategie auf, um festzustellen, ob eine Synchronisierung erforderlich ist. Das heißt, die Strategie-Synchronisation ist abgeschlossen:

* Wenn der Benutzer einige Optionen ändert, verwendet der Client die Optionen des Benutzers.
* Wenn der Administrator den Inhalt der Strategie ändert, werden die Optionen des Clients synchronisiert.
* Wenn der Administrator die Strategie ändert, zu der das Gerät gehört, werden die Optionen des Clients synchronisiert.

### Strategien bearbeiten

Klicken Sie unten in der Strategie auf `Bearbeiten`, nehmen Sie Änderungen vor und klicken Sie auf `Senden`. Die Strategie wird innerhalb von 30 Sekunden mit den Geräten synchronisiert.
