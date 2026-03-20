---
title: Mac
weight: 3
description: "RustDesk-Dokumentation zu Mac. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## Was benotigt RustDesk unter macOS?

Unter macOS reicht es nicht, RustDesk nur zu installieren. Fur die vollstandige Fernsteuerung eines anderen Macs mussen Sie die App in `Applications` verschieben, ihre Ausfuhrung erlauben und `Accessibility`, `Screen Recording` und in manchen Fallen auch `Input Monitoring` freigeben.

## macOS-Kurzantworten

- Installieren Sie RustDesk aus der `.dmg` in `Applications`.
- Wenn Gatekeeper die App blockiert, erlauben Sie sie in den macOS-Sicherheitseinstellungen.
- Gewahren Sie `Accessibility` und `Screen Recording` fur die Fernsteuerung.
- Wenn Tastatur- oder Maussteuerung weiterhin nicht funktioniert, gewahren Sie zusatzlich `Input Monitoring`.
- Wenn Berechtigungs-Resets nicht greifen, starten Sie den Mac neu.

## Welche macOS-Berechtigungen sind wichtig?

| Berechtigung | Zweck |
| --- | --- |
| Accessibility | Erlaubt RustDesk, Tastatur- und Mauseingaben zu steuern |
| Screen Recording | Erlaubt RustDesk, den lokalen Bildschirm aufzuzeichnen |
| Input Monitoring | Wird auf neueren macOS-Versionen benotigt, wenn lokale Eingaben sonst nicht erfasst werden |

## Installation

Öffnen Sie die DMG-Datei und ziehen Sie `RustDesk` zu `Applications`, wie unten dargestellt.

![](/docs/en/client/mac/images/dmg.png)

Stellen Sie sicher, dass Sie alle laufenden RustDesk beendet haben. Stellen Sie außerdem sicher, dass Sie den RustDesk-Dienst in der Taskleiste beendet haben.

![](/docs/en/client/mac/images/tray.png)

## Ausführen von RustDesk zulassen

| Zum Ändern entsperren | Klicken Sie auf `App Store und identifizierte Entwickler` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Berechtigungen aktivieren

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
