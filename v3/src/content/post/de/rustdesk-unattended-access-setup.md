---
publishDate: 2026-07-08T11:04:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'Unbeaufsichtigter Zugriff mit RustDesk: Einrichtungsanleitung'
excerpt: 'Unbeaufsichtigten Zugriff mit RustDesk richtig einrichten: permanentes Passwort, Betrieb als Dienst mit Start beim Booten und Rollout mit einem vorkonfigurierten Client.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.webp
category: 'Bereitstellung'
tags: ['RustDesk', 'Bereitstellung', 'Unbeaufsichtigter Zugriff']
author: RustDesk Team
slug: 'unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung'
faq:
  - question: 'Wie richte ich unbeaufsichtigten Zugriff in RustDesk ein?'
    answer: 'In zwei Schritten: Legen Sie unter Einstellungen → Sicherheit ein permanentes Passwort fest, und installieren Sie RustDesk so, dass der Systemdienst mit dem Rechner startet. Der standardmäßige Bestätigungsmodus akzeptiert das permanente Passwort bereits; unter macOS sind zusätzlich die Berechtigungen für Bildschirmaufnahme und Bedienungshilfen nötig. Danach erreichen Sie den eingeschalteten Rechner jederzeit, auch am Windows-Anmeldebildschirm, ohne dass jemand vor Ort ist.'
  - question: 'Warum bricht meine RustDesk-Verbindung ab, wenn sich der Benutzer abmeldet?'
    answer: 'Weil RustDesk als portable ausführbare Datei läuft statt als installierter Dienst. Ein portabler Prozess lebt in der Benutzersitzung, endet also bei der Abmeldung, und ohne erhöhte Rechte kann er den sicheren UAC-Desktop von Windows nicht bedienen. Installieren Sie RustDesk und lassen Sie den Systemdienst aktiviert; er läuft unabhängig von angemeldeten Benutzern. Für beaufsichtigten Windows-Support bleibt die portable Rechteerhöhung verfügbar.'
  - question: 'Ist unbeaufsichtigter Zugriff mit einem permanenten Passwort sicher?'
    answer: 'Ja, wenn er gut konfiguriert ist. Verwenden Sie ein langes, einzigartiges permanentes Passwort, das sich vom Anmeldepasswort des Betriebssystems unterscheidet, aktivieren Sie die Verbindungs-2FA auf dem gesteuerten Gerät, und schränken Sie per IP- oder ID-Whitelist und, in Server Pro, per Zugriffskontrolle ein, wer sich verbinden darf. Halten Sie Clients aktuell und prüfen Sie die Protokolle. Mit Self-Hosting laufen Rendezvous, Relay und Konsole auf Servern, die Sie betreiben.'
  - question: 'Kann ich unbeaufsichtigten Zugriff mit RustDesk auf vielen Computern gleichzeitig einrichten?'
    answer: 'Ja. In den selbst gehosteten Plänen ab Basic erstellt der Custom Client Generator ein vorkonfiguriertes Installationsprogramm mit fest hinterlegter Serveradresse, Schlüssel und Einstellungen, sodass Endanwender nichts eingeben müssen. Verteilen Sie es mit Ihren vorhandenen Bereitstellungswerkzeugen, und jedes Gerät installiert den Dienst und registriert sich automatisch bei Ihrem Server.'
  - question: 'Funktioniert unbeaufsichtigter Zugriff am Windows-Anmeldebildschirm?'
    answer: 'Ja, sobald RustDesk als Dienst installiert ist. Der installierte Dienst startet mit dem System, noch bevor sich ein Benutzer anmeldet. So können Sie sich mit dem Anmeldebildschirm verbinden, sich authentifizieren und sogar einen Neustart auslösen und danach wieder verbinden. Die portable ausführbare Datei kann das nicht, da sie nur innerhalb einer Benutzersitzung existiert.'

metadata:
  description: 'Unbeaufsichtigten Zugriff mit RustDesk einrichten: permanentes Passwort, Dienst mit Start beim Booten, Hinweise zu Windows/macOS/Linux, Rollout in der Flotte.'
  keywords: 'RustDesk unbeaufsichtigter Zugriff, RustDesk permanentes Passwort, RustDesk Start beim Booten, RustDesk Dienst installieren, RustDesk unbeaufsichtigte Einrichtung, RustDesk Rollout im großen Maßstab, unbeaufsichtigter Fernzugriff'
---

Unbeaufsichtigter Zugriff bedeutet, einen Computer zu erreichen, vor dem niemand sitzt – ein Server im Rack, ein Kiosk-Terminal, der PC eines Familienmitglieds am anderen Ende des Landes. RustDesk leistet das zuverlässig, sobald zwei Dinge eingerichtet sind: ein **permanentes Passwort**, damit niemand jede Verbindung bestätigen muss, und RustDesk **als Dienst**, damit es schon vor der Anmeldung und auch nach der Abmeldung verfügbar ist. Diese Anleitung behandelt beides, die Berechtigungen je Plattform und den Rollout über eine ganze Geräteflotte.

## Die kurze Antwort

Legen Sie ein **permanentes Passwort** fest (Einstellungen → Sicherheit) und **installieren Sie RustDesk als Systemdienst**, der mit dem Rechner startet. Der standardmäßige Bestätigungsmodus akzeptiert das permanente Passwort bereits, sodass niemand auf „Annehmen“ klicken muss; der Dienst läuft unabhängig von angemeldeten Benutzern, sodass Sie sich jederzeit verbinden können, auch am Windows-Anmeldebildschirm. Unter macOS sind zusätzlich die Berechtigungen für Bildschirmaufnahme und Bedienungshilfen nötig. Für einen Rollout im großen Maßstab erzeugen Sie einen vorkonfigurierten Client, damit sich jeder Rechner selbst bei Ihrem Server einrichtet.

## Schritt 1: Ein permanentes Passwort festlegen

Standardmäßig zeigt RustDesk ein wechselndes Einmalpasswort an, das Ihnen eine Person am anderen Ende vorlesen würde. Für unbeaufsichtigten Zugriff ersetzen Sie dieses durch feste Zugangsdaten:

1. Öffnen Sie RustDesk auf dem Rechner, den Sie erreichen möchten.
2. Gehen Sie zu **Einstellungen → Sicherheit** (in älteren Versionen: der Passwortbereich auf dem Hauptbildschirm).
3. Wählen Sie **Permanentes Passwort festlegen** und geben Sie einen starken, einzigartigen Wert ein.

Die Standardeinstellungen akzeptieren dieses Passwort bereits: Sitzungen werden per Passwort und per Klick angenommen, und beide Passworttypen sind erlaubt. Hat jemand den Bestätigungsmodus auf reinen Klick oder den Passworttyp auf ausschließlich Einmalpasswort umgestellt, wählen Sie wieder **Sitzung mit Passwort bestätigen** (oder **Sitzung mit Klick und Passwort bestätigen**) und **Permanentes Passwort verwenden** (oder **Beide Passwörter verwenden**). Für verwaltete Bereitstellungen heißen die passenden [Konfigurationsschlüssel](https://rustdesk.com/docs/de/self-host/client-configuration/advanced-settings/#approve-mode) `approve-mode` (Standard `password-click`) und `verification-method` (Standard `use-both-passwords`).

Die [RustDesk-Client-Dokumentation](https://rustdesk.com/docs/de/client/) beschreibt dies als Kern des unbeaufsichtigten Zugriffs. Eine Regel verdient besondere Betonung: **Verwenden Sie nicht das Anmeldepasswort des Betriebssystems erneut.** Nutzen Sie für RustDesk ein eigenes Passwort mit hoher Entropie, damit ein durchgesickertes Passwort nicht auch das andere kompromittiert.

## Schritt 2: Als Dienst installieren und beim Booten starten

Diesen Schritt übersehen viele. Eine portable `.exe` oder `.app` läuft innerhalb der Benutzersitzung, endet also, wenn sich der Benutzer abmeldet, und unter Windows kann sie ohne erhöhte Rechte den sicheren UAC-Desktop nicht bedienen (für beaufsichtigten Support gibt es die [portable Rechteerhöhung](https://rustdesk.com/docs/de/client/windows/windows-portable-elevation/)). Für echten unbeaufsichtigten Zugriff muss RustDesk als **Systemdienst** im Hintergrund laufen.

- Führen Sie das RustDesk-**Installationsprogramm** aus (nicht die portable Version) und schließen Sie die Installation ab.
- Stellen Sie unter **Einstellungen → Allgemein** sicher, dass der **Vermittlungsdienst** (Service) läuft – klicken Sie auf **Starten**, falls er als gestoppt angezeigt wird. Nach der Installation startet der Dienst automatisch mit dem Rechner.

Sobald RustDesk als Dienst läuft, wird es geladen, bevor sich jemand anmeldet. Deshalb können Sie sich mit dem **Anmeldebildschirm** verbinden, sich aus der Ferne authentifizieren und sogar neu starten und sich wieder verbinden, ohne dass jemand vor Ort ist. macOS und Linux bringen eigene Anforderungen an Bildschirmaufnahme und Anzeigesitzung mit; sie sind unten beschrieben.

## Plattformspezifische Hinweise

| Plattform | Was zu tun ist                                                         | Worauf zu achten ist                                                                                                                                                                         |
| --------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows   | Installieren; Dienst laufen lassen (startet mit dem Rechner)           | Eine portable EXE endet bei der Abmeldung und kann UAC-Abfragen ohne erhöhte Rechte nicht bedienen; verwenden Sie das Installationsprogramm                                                  |
| macOS     | Installieren, permanentes Passwort festlegen, Berechtigungen erteilen  | Bildschirmaufnahme und Bedienungshilfen müssen erteilt werden; Erfassung am Anmeldebildschirm erfordert den installierten Helper                                                             |
| Linux     | Das Dienstpaket installieren                                           | Standard-Wayland-Builds erfassen die angemeldete Sitzung; die [Preview für unbeaufsichtigten Zugriff](/de/blog/unattended-remote-access-wayland-de) ergänzt den Anmeldebildschirm (x86_64 Debian/Ubuntu) |
| Android   | Permanentes Passwort festlegen; Erfassung aktivieren                   | Bildschirm muss aktiv sein; Zustimmung zur Bildschirmaufnahme (MediaProjection) und Eingabeberechtigung erteilen                                                                             |

### Windows

Der sauberste Weg. Installieren, den Dienst einschalten, das permanente Passwort festlegen – fertig. Da der Dienst beim Booten startet, funktionieren unbeaufsichtigter Zugriff auf den Anmeldebildschirm und Zugriff über Neustarts hinweg wie erwartet.

### macOS

macOS setzt für Bildschirmaufnahme und Eingabe Berechtigungen voraus. Öffnen Sie nach der Installation **Systemeinstellungen → Datenschutz & Sicherheit** und erteilen Sie RustDesk sowohl **Bildschirmaufnahme** als auch **Bedienungshilfen**. Für den Zugriff auf das _Anmeldefenster_ (bevor sich ein Benutzer anmeldet) muss der RustDesk-Dienst/-Helper installiert sein, damit bereits vor der Anmeldung erfasst werden kann – andernfalls erscheint dort ein schwarzer Bildschirm, dasselbe [Erfassungsproblem, das unser Leitfaden zum schwarzen Bildschirm behandelt](/de/blog/rustdesk-connected-waiting-for-image-der-komplette-leitfaden-zur).

### Linux

Installieren Sie RustDesk so, dass der Dienst beim Booten startet. Die Standard-Builds von RustDesk erfassen Wayland-Desktops, seit 1.4.3 auch mit mehreren Monitoren, über PipeWire und `xdg-desktop-portal` in einer angemeldeten Sitzung. Für einen Rechner, der am Anmeldebildschirm (Greeter) steht, ergänzt die separate [Wayland-Preview für unbeaufsichtigten Zugriff](/de/blog/unattended-remote-access-wayland-de) für **x86_64-Systeme auf Basis von Debian/Ubuntu** unbeaufsichtigten Zugriff und Zugriff auf den Anmeldebildschirm nach einem Neustart. Wo eine Distribution noch einen X11-Anmeldebildschirm anbietet, ist das eine weitere Option; auf einem Headless-Rechner ergänzen Sie einen Dummy-Stecker oder ein virtuelles Display. Details finden Sie unter [RustDesk für Linux](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop).

## Schritt 3: Rollout im großen Maßstab mit einem vorkonfigurierten Client

Einen einzelnen Rechner von Hand zu konfigurieren ist kein Problem. Fünfzig sind es schon. In den **selbst gehosteten Plänen ab Basic** erstellt der **Custom Client Generator** in der Web-Konsole ein Installationsprogramm mit fest hinterlegter **Serveradresse, öffentlichem Schlüssel und Einstellungen**, sodass Endanwender nichts eingeben müssen. Zusammen mit Ihrem vorhandenen Verteilungswerkzeug (Gruppenrichtlinien, Intune, ein MSP-RMM, ein Shell-Skript) installiert jedes Gerät beim ersten Start den Dienst und registriert sich bei _Ihrem_ Server.

Hier zahlt sich Self-Hosting für Teams aus: Die gesamte Flotte registriert sich bei ID-/Rendezvous- und Relay-Servern, die Sie betreiben (siehe [RustDesk für MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool)). Server-Pro-Pläne lizenzieren **Login-Benutzer und verwaltete Geräte**. Die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen; nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine feste Anzahl gleichzeitiger Verbindungen. Planen Sie das Budget nach der Zahl Ihrer Rechner und Administratoren – siehe [Was zählt als verwaltetes Gerät bei RustDesk?](/de/blog/was-zahlt-als-verwaltetes-gerat-bei-rustdesk). Stellen Sie die Web-Konsole hinter einem Reverse-Proxy [über HTTPS](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/#https-für-die-webkonsole-manuell-einrichten) bereit.

## Zugriff absichern

Unbeaufsichtigter Zugriff ist eine dauerhaft offene Tür zu einem Rechner – behandeln Sie die Zugangsdaten dementsprechend ernst:

- **Ein starkes, einzigartiges permanentes Passwort**, das Sie regelmäßig wechseln.
- **Verbindungs-2FA** auf dem gesteuerten Gerät und, in Server Pro, die [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/), die über Regeln für Benutzer und Gerätegruppen festlegt, wer welche Geräte erreicht (die Berechtigungen aus Benutzergruppen und Gerätegruppen addieren sich). Das gemeinsame Adressbuch ordnet nur Einträge; es ist keine Zugriffsgrenze. Die [Kontrollrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) begrenzt, was ein Techniker innerhalb einer Sitzung tun darf.
- **Hosten Sie den Server selbst**, damit Rendezvous, Relay, Konsole und gespeicherte Verwaltungsdaten auf einer Infrastruktur Ihrer Wahl laufen. Der RustDesk-Client und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der AGPL, ihr Authentifizierungscode lässt sich also prüfen; Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten.

## Unbeaufsichtigter Zugriff, den Sie wirklich kontrollieren

Richten Sie eine dauerhaft aktive Geräteflotte auf einen Server aus, den Sie selbst betreiben – dann bleibt der dauerhafte Zugriff auf diese Rechner über Hardware vermittelt, die Ihnen gehört, und nicht über eine gemietete Cloud. Für dauerhaften Zugriff lohnt sich der kurze Einrichtungsaufwand, um diesen Weg in der eigenen Hand zu behalten.
