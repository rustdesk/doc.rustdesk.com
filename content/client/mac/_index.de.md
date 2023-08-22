---
title: Mac
weight: 3
---

### Installation

Öffnen Sie die .dmg-Datei und ziehen Sie `RustDesk` zu `Applications`, wie unten dargestellt.

![](images/dmg.png)

Stellen Sie sicher, dass Sie alle laufenden RustDesk beendet haben. Stellen Sie außerdem sicher, dass Sie den RustDesk-Dienst in der Taskleiste beendet haben.

![](images/tray.png)

### Ausführen von RustDesk zulassen

| Zum Ändern entsperren | Klicken Sie auf „App Store und identifizierte Entwickler“ |
| ---- | ---- |
| ![](images/allow2.png) | ![](images/allow.png) |

### Berechtigungen aktivieren

{{% notice note %}}
Aufgrund einer Änderung der macOS-Sicherheitspolitik funktioniert unsere API, die Eingaben auf der lokalen Seite erfasst, nicht mehr.
Sie müssen die Berechtigung "Eingabeüberwachung" auf der lokalen Mac-Seite aktivieren.
Bitte befolgen Sie dies
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

Es scheint keine schnelle Lösung zu sein, wir müssen das zusammen mit unserer Flutter-Version beheben.
{{% /notice %}}

Um den Bildschirm aufzunehmen, müssen Sie `RustDesk` die Berechtigungen **Zugriff** und **Bildschirmaufnahme** erteilen. RustDesk führt Sie zum Einstellungsfenster.

| RustDesk-Fenster | Einstellungsfenster |
| ---- | ---- |
| ![](images/acc.png) | ![](images/acc3.png?v2) |

Wenn Sie es in den Einstellungen aktiviert haben, warnt RustDesk dennoch. Bitte entfernen Sie RustDesk aus dem Einstellungsfenster über die Schaltfläche `-` und klicken Sie auf die Schaltfläche `+`, um RustDesk unter `/Applications` auszuwählen.

| Schaltfläche `+` und `-` | RustDesk auswählen |
| ---- | ---- |
| ![](images/acc2.png) | ![](images/add.png?v2) |

Bitte kopieren Sie die obigen Schritte für die Berechtigung zur **Bildschirmaufnahme**.

![](images/screen.png?v2)
