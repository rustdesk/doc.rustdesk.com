---
publishDate: 2026-07-08T11:04:00Z
lang: 'de'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'Unbeaufsichtigter Zugriff mit RustDesk: Einrichtungsanleitung'
excerpt: 'Richten Sie den unbeaufsichtigten Zugriff mit RustDesk richtig ein: ein dauerhaftes Passwort, Ausführung als Dienst für den Start beim Booten und Rollout im großen Maßstab mit einem vorkonfigurierten Client.'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.webp
category: 'Bereitstellung'
tags: ['RustDesk', 'Bereitstellung', 'Unbeaufsichtigter Zugriff']
author: RustDesk Team
slug: 'unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung'
faq:
  - question: 'Wie richte ich unbeaufsichtigten Zugriff in RustDesk ein?'
    answer: 'Zwei Dinge sind erforderlich: Legen Sie unter Einstellungen, Sicherheit ein dauerhaftes Passwort fest, damit nicht jedes Mal jemand die Verbindung bestätigen muss, und installieren Sie RustDesk als Systemdienst, damit es bereits vor der Anmeldung läuft und eine Abmeldung übersteht. Mit beidem eingerichtet erreichen Sie den Rechner jederzeit, auch am Anmeldebildschirm, ohne dass jemand anwesend sein muss.'
  - question: 'Warum bricht meine RustDesk-Verbindung ab, wenn sich der Benutzer abmeldet?'
    answer: 'Das passiert, wenn RustDesk als portable ausführbare Datei anstatt als installierter Dienst ausgeführt wird. Eine portable Sitzung endet, sobald sich der Benutzer abmeldet oder eine UAC-Eingabeaufforderung erscheint. Installieren Sie RustDesk (anstatt die portable Version auszuführen) und lassen Sie den Dienst aktiviert – der installierte Dienst startet mit dem System –, sodass er im Hintergrund unabhängig von einem angemeldeten Benutzer läuft. Das macht den unbeaufsichtigten Zugriff zuverlässig.'
  - question: 'Ist unbeaufsichtigter Zugriff mit einem dauerhaften Passwort sicher?'
    answer: 'Bei guter Konfiguration lässt er sich sicher einsetzen. Verwenden Sie ein langes, einzigartiges dauerhaftes Passwort, schränken Sie ein, wer sich verbinden darf, aktivieren Sie verfügbare Identitäts- und Zugriffskontrollen, halten Sie Clients aktuell und prüfen Sie regelmäßig die Protokolle. Self-Hosting gibt Ihnen die Kontrolle über serverseitige Dienste und gespeicherte Bereitstellungsdaten; der Endpunkt selbst schützt weiterhin seine lokalen Zugangsdaten.'
  - question: 'Kann ich unbeaufsichtigten Zugriff mit RustDesk auf vielen Computern gleichzeitig einrichten?'
    answer: 'Ja. In den Self-Hosted-Plänen Basic und höher erstellt der Custom Client Generator ein vorkonfiguriertes Installationsprogramm mit fest hinterlegter Serveradresse, Schlüssel und Einstellungen, sodass Endanwender nichts eingeben müssen. Verteilen Sie es mit Ihrem vorhandenen Deployment-Tool, und jedes Gerät installiert den Dienst und registriert sich automatisch bei Ihrem Server.'
  - question: 'Funktioniert unbeaufsichtigter Zugriff am Windows-Anmeldebildschirm?'
    answer: 'Ja, sobald RustDesk als Dienst installiert ist. Der installierte Dienst startet mit dem System, noch bevor sich ein Benutzer anmeldet. So können Sie sich mit dem Anmeldebildschirm verbinden, sich authentifizieren und sogar einen Neustart auslösen und danach wieder verbinden. Die portable ausführbare Datei kann das nicht, da sie nur innerhalb einer Benutzersitzung existiert.'

metadata:
  description: 'Unbeaufsichtigten Zugriff mit RustDesk einrichten: dauerhaftes Passwort, Ausführung als Dienst für den Start beim Booten, plattformspezifische Hinweise für Windows/macOS/Linux und Rollout in der gesamten Geräteflotte.'
  keywords: 'RustDesk unbeaufsichtigter Zugriff, RustDesk dauerhaftes Passwort, RustDesk Start beim Booten, RustDesk Dienst installieren, RustDesk unbeaufsichtigte Einrichtung, RustDesk Rollout im großen Maßstab, unbeaufsichtigter Fernzugriff'
---

Unbeaufsichtigter Zugriff bedeutet, einen Computer zu erreichen, vor dem niemand sitzt – ein Server im Rack, ein Kiosk-Terminal, der PC eines Familienmitglieds am anderen Ende des Landes. RustDesk erledigt das zuverlässig, aber nur, wenn Sie zwei Dinge richtig konfigurieren: ein **dauerhaftes Passwort**, damit niemand jede Verbindung erst bestätigen muss, und RustDesk **als Dienst** ausgeführt, damit es schon vor der Anmeldung und auch nach dem Abmelden verfügbar ist. Diese Anleitung behandelt beides – sowie den Rollout über eine ganze Geräteflotte hinweg.

## Die kurze Antwort

Legen Sie ein **dauerhaftes Passwort** fest (Einstellungen → Sicherheit) und **installieren Sie RustDesk als Systemdienst** – der installierte Dienst startet mit dem Rechner. Das Passwort macht es überflüssig, dass ein Mensch die Anfrage bestätigt; der Dienst sorgt dafür, dass RustDesk unabhängig von einem angemeldeten Benutzer läuft, sodass Sie sich jederzeit verbinden können – auch am Anmeldebildschirm. Für den Rollout im großen Maßstab erzeugen Sie einen vorkonfigurierten Client, sodass sich jeder Rechner automatisch selbst bei Ihrem Server registriert.

## Schritt 1: Ein dauerhaftes Passwort festlegen

Standardmäßig zeigt RustDesk ein rotierendes Einmalpasswort an, das Ihnen eine Person am anderen Ende vorlesen würde. Für unbeaufsichtigten Zugriff ersetzen Sie dieses durch feste Zugangsdaten:

1. Öffnen Sie RustDesk auf dem Rechner, den Sie erreichen möchten.
2. Gehen Sie zu **Einstellungen → Sicherheit** (in älteren Versionen: der Passwortbereich auf dem Hauptbildschirm).
3. Wählen Sie **Dauerhaftes Passwort festlegen** und geben Sie einen starken, einzigartigen Wert ein.

Die [RustDesk-Client-Dokumentation](https://rustdesk.com/docs/en/client/) beschreibt dies als das Herzstück des unbeaufsichtigten Zugriffs. Eine Regel verdient besondere Betonung: **Verwenden Sie nicht erneut das Anmeldepasswort des Betriebssystems.** Nutzen Sie für RustDesk ein eigenes, hochentropisches Passwort, damit ein durchgesickertes Passwort nicht auch das jeweils andere kompromittiert.

## Schritt 2: Als Dienst installieren und beim Booten starten

Das ist der Schritt, den viele übersehen. Wenn Sie nur die portable `.exe`- oder `.app`-Datei ausführen, **endet die Sitzung in dem Moment, in dem sich der Benutzer abmeldet oder eine UAC-/Berechtigungsabfrage erscheint** – weil dieser Prozess nur innerhalb der Benutzersitzung existiert. Um wirklich unbeaufsichtigt zu funktionieren, muss RustDesk als **Systemdienst** im Hintergrund laufen.

- Führen Sie das RustDesk-**Installationsprogramm** aus (nicht die portable Version) und schließen Sie die Installation ab.
- Stellen Sie unter **Einstellungen → Allgemein** sicher, dass der **Dienst** läuft – klicken Sie auf **Starten**, falls er als gestoppt angezeigt wird. Nach der Installation startet der Dienst automatisch mit dem Rechner.

Sobald RustDesk als Dienst läuft, wird es geladen, bevor sich überhaupt jemand anmeldet. Genau das ermöglicht die Verbindung zum **Anmeldebildschirm**, die Remote-Authentifizierung und sogar einen Neustart mit anschließender Wiederverbindung, ohne dass jemand vor Ort sein muss. Community-Beiträge zur [korrekten Einrichtung des Windows-Diensts](https://www.smolkin.org/blog/2026/03/rustdesk-unattended-service-windows.html) betonen denselben Unterschied: portabel bedeutet nur beaufsichtigt nutzbar, installierter Dienst bedeutet unbeaufsichtigt nutzbar.

## Plattformspezifische Hinweise

| Plattform | Was zu tun ist                                                        | Worauf zu achten ist                                                                                                                                                          |
| --------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows   | Installieren; Dienst aktiv halten (startet mit dem Rechner)           | Portable EXE bricht bei Abmeldung/UAC ab; Installationsprogramm verwenden                                                                                                     |
| macOS     | Installieren, dauerhaftes Passwort festlegen, Berechtigungen erteilen | Bildschirmaufnahme und Bedienungshilfen müssen erteilt werden; Erfassung am Anmeldebildschirm erfordert den installierten Helper                                              |
| Linux     | Das Dienstpaket installieren                                          | Wayland benötigt eine aktive Sitzung; für den Zugriff vor der Anmeldung die Headless-Virtual-Display-Einrichtung nutzen, oder X11, sofern eine Distribution das noch anbietet |
| Android   | Dauerhaftes Passwort festlegen; Erfassung aktivieren                  | Bildschirm muss aktiv sein; Zustimmung zur Bildschirmerfassung (MediaProjection) und Eingabeberechtigung erteilen                                                             |

### Windows

Der sauberste Weg. Installieren, den Dienst aktivieren, das dauerhafte Passwort festlegen – fertig. Da der Dienst beim Booten startet, funktionieren unbeaufsichtigter Zugriff auf den Anmeldebildschirm und über Neustarts hinweg wie erwartet.

### macOS

macOS setzt für Bildschirmaufnahme und Eingabe Berechtigungen voraus. Öffnen Sie nach der Installation **Systemeinstellungen → Datenschutz & Sicherheit** und erteilen Sie RustDesk sowohl **Bildschirmaufnahme** als auch **Bedienungshilfen**. Für den Zugriff auf das _Anmeldefenster_ (bevor sich ein Benutzer anmeldet) muss der RustDesk-Dienst/-Helper installiert sein, damit bereits vor der Anmeldung erfasst werden kann – andernfalls erscheint dort ein schwarzer Bildschirm, dasselbe [Erfassungsproblem, das unser Leitfaden zum schwarzen Bildschirm behandelt](/de/blog/rustdesk-connected-waiting-for-image-der-komplette-leitfaden-zur).

### Linux

Installieren Sie RustDesk so, dass die Dienstkomponente beim Booten startet. Bei einem Rechner, der am Login-Greeter steht, kann Wayland den Greeter noch nicht erfassen – eine Einschränkung des Wayland-Designs (keine Beschränkung von RustDesk), an deren Behebung RustDesk aktiv arbeitet ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Bei einer Headless-Maschine nutzen Sie die Virtual-Display-Konfiguration; auf einem Desktop übernimmt das weiterhin eine X11/Xorg-Sitzung, sofern eine Distribution eine solche noch anbietet – auch wenn mehrere inzwischen ausschließlich auf Wayland setzen. Details finden Sie unter [RustDesk für Linux](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop).

## Schritt 3: Rollout im großen Maßstab mit einem vorkonfigurierten Client

Einen einzelnen Rechner von Hand zu konfigurieren ist kein Problem. Fünfzig sind es schon. In den **Self-Hosted-Plänen Basic und höher** erstellt der **Custom Client Generator** in der Web-Konsole ein Installationsprogramm mit fest hinterlegter **Serveradresse, öffentlichem Schlüssel und Einstellungen**, sodass Endanwender nichts eingeben müssen. Kombiniert mit Ihrem vorhandenen Deployment-Tool (Group Policy, Intune, ein MSP-RMM, ein Shell-Skript) installiert jedes Gerät beim ersten Start den Dienst und registriert sich bei _Ihrem_ Server.

Genau hier zahlt sich Self-Hosting für Teams aus: Sie erhalten eine [vollständig von Ihnen kontrollierte, unbeaufsichtigte Geräteflotte](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool), ohne dass eine Cloud-Abrechnung pro Sitzplatz darüber entscheidet, wie viele Endpunkte Sie „erreichen dürfen“. Richten Sie den Generator über die [Web-Konsole auf Port 21114](https://rustdesk.com/docs) ein. Beachten Sie, dass RustDesk pro **Login-Benutzer und verwaltetem Gerät** lizenziert wird und nicht pro gleichzeitiger Sitzung – kalkulieren Sie also anhand der Anzahl Ihrer Rechner und Administratoren. Siehe [was als verwaltetes Gerät zählt](/de/blog/was-zahlt-als-verwaltetes-gerat-bei-rustdesk).

## Zugriff absichern

Unbeaufsichtigter Zugriff ist eine dauerhaft offene Tür zu einem Rechner – behandeln Sie die Zugangsdaten dementsprechend ernst:

- **Ein starkes, einzigartiges dauerhaftes Passwort**, das Sie regelmäßig wechseln.
- **Zwei-Faktor-Authentifizierung** und, in Pro, **Zugriffskontrollen**, damit sich nur autorisierte Konten verbinden können. Unser Beitrag zu [benutzerbezogener Zugriffskontrolle und Gerätegruppen](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) beschreibt, wie Sie festlegen, wer worauf zugreifen darf.
- **Hosten Sie die serverseitigen Dienste selbst**, wenn Sie die Kontrolle über Rendezvous, Relay, Konsole und gespeicherte Bereitstellungsdaten benötigen. Für die Zugangsdaten der Endpunkte bleibt weiterhin die Endpoint-Sicherheit verantwortlich. Da RustDesk unter der AGPL Open Source ist, lässt sich die Implementierung der Authentifizierung überprüfen.

## Unbeaufsichtigter Zugriff, den Sie wirklich kontrollieren

Richten Sie eine dauerhaft aktive Geräteflotte auf einen Server aus, den Sie selbst betreiben – dann bleibt der dauerhafte Zugriff auf diese Rechner über Hardware vermittelt, die Ihnen gehört, und nicht über eine gemietete Cloud. Für dauerhaften Zugriff lohnt sich der kurze Einrichtungsaufwand, um diesen Weg in der eigenen Hand zu behalten.
