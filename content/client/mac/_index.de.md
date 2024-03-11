---
title: Mac
weight: 3
---

### Installation

Öffnen Sie die DMG-Datei und ziehen Sie `RustDesk` zu `Applications`, wie unten dargestellt.

![](/docs/en/client/mac/images/dmg.png)

Stellen Sie sicher, dass Sie alle laufenden RustDesk beendet haben. Stellen Sie außerdem sicher, dass Sie den RustDesk-Dienst in der Taskleiste beendet haben.

![](/docs/en/client/mac/images/tray.png)

### Ausführen von RustDesk zulassen

| Zum Ändern entsperren | Klicken Sie auf `App Store und identifizierte Entwickler` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

### Berechtigungen aktivieren

{{% notice note %}}
Aufgrund einer Änderung der macOS-Sicherheitspolitik funktioniert unsere API, die Eingaben auf der lokalen Seite erfasst, nicht mehr.
Sie müssen die Berechtigung "Eingabeüberwachung" auf der lokalen Mac-Seite aktivieren.
Bitte befolgen Sie dies
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

In Version 1.2.4 können Sie die `Eingabequelle 2` ausprobieren, die durch Klicken auf das Tastatursymbol in der Symbolleiste angezeigt wird.
{{% /notice %}}

Um den Bildschirm aufzunehmen, müssen Sie `RustDesk` die Berechtigungen **Zugriff** und **Bildschirmaufnahme** erteilen. RustDesk führt Sie zum Einstellungsfenster.

| RustDesk-Fenster | Einstellungsfenster |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Wenn Sie es in den Einstellungen aktiviert haben, warnt RustDesk dennoch. Bitte entfernen Sie `RustDesk` aus dem Einstellungsfenster über die Schaltfläche `-` und klicken Sie auf die Schaltfläche `+`, um `RustDesk` unter `Applications` auszuwählen.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Weitere hilflose Versuche: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Ein Neustart ist weiterhin erforderlich.
{{% /notice %}}

| Schaltfläche `+` und `-` | `RustDesk` auswählen |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Bitte kopieren Sie die obigen Schritte für die Berechtigung zur **Bildschirmaufnahme**.

![](/docs/en/client/mac/images/screen.png?v2)
