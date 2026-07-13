---
publishDate: 2026-07-01T08:14:00Z
lang: 'de'
translationKey: chrome-remote-desktop-alternative
draft: false
title: 'Alternative zu Chrome Remote Desktop: selbst gehostetes RustDesk'
excerpt: 'Chrome Remote Desktop ist kostenlos und einfach, bindet Sie aber an Google und lässt wichtige Funktionen vermissen. Hier ist eine selbst gehostete Open-Source-Alternative, die Sie vollständig kontrollieren.'
image: ~/assets/images/blog/chrome-remote-desktop-alternative-og.webp
category: 'Alternativen'
tags: ['RustDesk', 'Chrome Remote Desktop', 'Alternative', 'Selbst-Hosting']
author: RustDesk Team
slug: 'alternative-zu-chrome-remote-desktop-selbst-gehostetes-rustdesk'
faq:
  - question: 'Gibt es eine Alternative zu Chrome Remote Desktop, die kein Google-Konto erfordert?'
    answer: 'Ja. Selbst gehostetes RustDesk benötigt überhaupt kein Konto eines Drittanbieters (der öffentliche Demo-Server erfordert eine kostenlose Controller-Anmeldung) und nutzt statt eines Google-Kontos eigene ID-/Rendezvous- und Relay-Server – diese können Sie selbst hosten, sodass keine Drittanbieter-Cloud dazwischengeschaltet ist. Chrome Remote Desktop hingegen benötigt sowohl auf dem Host als auch auf dem Client ein Google-Konto.'
  - question: 'Unterstützt Chrome Remote Desktop Dateiübertragung?'
    answer: 'Chrome Remote Desktop bietet einfaches Hoch- und Herunterladen von Dateien, aber keine Drag-and-Drop-Übertragung. RustDesk enthält neben der Fernsteuerung eine integrierte Dateiübertragung.'
  - question: 'Kann Chrome Remote Desktop unbeaufsichtigten Zugriff bieten?'
    answer: 'Ja, aber der Zielrechner muss eingeschaltet und beim selben Google-Konto angemeldet sein, und Chrome Remote Desktop kann einen Computer im Ruhezustand nicht aufwecken. RustDesk unterstützt unbeaufsichtigten Zugriff per dauerhaftem Passwort auf eine Geräteflotte, die Sie über Ihre eigene Konsole verwalten.'
  - question: 'Ist RustDesk genau wie Chrome Remote Desktop kostenlos?'
    answer: 'RustDesk ist Open Source unter der AGPL, und Sie können den kostenlosen Community-Server zeitlich unbegrenzt und ohne Kosten betreiben. Der kommerzielle Server Pro ergänzt Team-Funktionen und wird ebenfalls selbst gehostet; die aktuellen Konditionen finden Sie unter rustdesk.com/pricing.'
metadata:
  description: 'Chrome Remote Desktop ist kostenlos und einfach, bindet Sie aber an Google und es fehlen wichtige Funktionen. Vergleichen Sie es mit RustDesk, einer selbst gehosteten Open-Source-Alternative.'
  keywords: 'Chrome Remote Desktop Alternative, selbst gehostete Chrome Remote Desktop Alternative, Remotedesktop ohne Google-Konto, RustDesk vs Chrome Remote Desktop'
---

Die selbst gehostete Open-Source-Antwort auf Chrome Remote Desktop heißt RustDesk: Sie hosten die Vermittlung und können den Quellcode des Clients einsehen – statt jede Sitzung über Googles Cloud zu leiten und den Zugriff an ein Google-Konto zu binden.

## Warum nach einer Alternative zu Chrome Remote Desktop suchen

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) ist Googles kostenloses, browserbasiertes Tool für den Fernzugriff. Es ist einfach und schnell: Installieren Sie einen kleinen Host, melden Sie sich an, und schon können Sie Ihren Rechner innerhalb weniger Minuten von einem anderen Gerät aus erreichen – genau das, was für den gelegentlichen privaten Gebrauch nötig ist.

Doch sobald Ihre Anforderungen über „meinem eigenen Laptop vom Sofa aus helfen“ hinauswachsen, zeigen sich die Nähte. Sie sind an Googles Identitäts- und Signaling-Infrastruktur gebunden, einige für Support-Teams wichtige Funktionen fehlen, und die Steuerungsebene lässt sich nicht selbst hosten. Googles [Netzwerkleitfaden](https://support.google.com/chrome/a/answer/16364503) erklärt die Grenze: Verbindungen werden zunächst über Google-Dienste ausgehandelt, während der eigentliche WebRTC-Datenverkehr direkte Pfade, STUN oder TURN/Relay nutzt. Nur TURN/Relay-Sitzungspakete werden über Google-Rechenzentren weitergeleitet. Wenn Sie schon an diese Kompromisse gestoßen sind, zeigt diese Seite, wie eine selbst gehostete Open-Source-Alternative aussieht.

## Was Chrome Remote Desktop gut macht

Anerkennung, wo sie angebracht ist. [TechRadars Testbericht](https://www.techradar.com/reviews/chrome-remote-desktop-review) bezeichnet es als „völlig kostenlos, ohne Abonnements oder Premium-Stufen“, einfach einzurichten und gut geeignet für den privaten Gebrauch. Es läuft unter Windows, macOS und Linux, erfordert keine Lizenzverhandlung, und es gibt nichts zu hosten. Wer von unterwegs kurz nach dem heimischen PC sehen will, kommt mit CRD nahezu ohne Aufwand aus.

Diese Einfachheit ist das Produkt. Die Probleme beginnen, sobald man von ihm verlangt, was ein Support-Team oder ein Setup mit mehreren Rechnern tatsächlich braucht.

## Wo Chrome Remote Desktop an seine Grenzen stößt

### Fehlende Funktionen: selbst gehostete Steuerung, Geräteverwaltung und Team-Workflows

Googles Hilfeseiten dokumentieren den Fernzugriff auf Dateien und Anwendungen und ermöglichen es Administratoren, Zugriff und Netzwerkverhalten zu steuern – doch sie beschreiben nach wie vor einen Dienst, der auf einem Google-Konto basiert und von Google koordiniert wird, mit der bereits in der Einleitung erläuterten Aufteilung von Signaling und Relay. Mit anderen Worten: CRD eignet sich gut für einfachen Zugriff, ist aber keine selbst gehostete Support-Konsole mit Gerätegruppen oder individuellem Branding wie bei RustDesk.

### Unbeaufsichtigter Zugriff und Rechner im Ruhezustand

CRD kann unbeaufsichtigten Zugriff bieten, doch das Zielgerät muss dafür weiterhin **eingeschaltet und online** sowie beim **selben Google-Konto** angemeldet sein. Google dokumentiert PIN-basierten Fernzugriff, keinen Ersatz für Wake-on-LAN. Ist der Rechner im Ruhezustand oder offline, gibt es für CRD nichts, womit es sich verbinden könnte. Für eine Flotte entfernter Endgeräte ist das eine echte betriebliche Einschränkung.

### Benutzerverwaltung und die Pflicht zum Google-Konto

Jeder Teilnehmer benötigt ein Google-Konto, und bei gemeinsamen (nicht unbeaufsichtigten) Sitzungen muss jemand anwesend sein, um den Zugriff freizugeben. Google-Workspace-Administratoren können [CRD aktivieren oder deaktivieren und die Firewall-Durchquerung einschränken](https://support.google.com/chrome/a/answer/2799701), doch das ist nicht dasselbe wie eine selbst gehostete Support-Konsole mit Gerätegruppen und abgestuftem Techniker-Zugriff – und Google bleibt weiterhin Teil des Identitäts- und Sitzungsaufbaus, wie bereits in der Einleitung beschrieben. (Zum Sicherheitsaspekt im Speziellen siehe [Ist Chrome Remote Desktop sicher?](/de/blog/ist-chrome-remote-desktop-sicher-eine-ehrliche-bewertung))

## Chrome Remote Desktop vs. RustDesk im Überblick

|                                                                                                    | Chrome Remote Desktop                                                              | RustDesk                                                                                                                                           |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kosten                                                                                             | Kostenlos                                                                          | Open Source (AGPL); kostenloser Community-Server; kostenpflichtiger Server Pro                                                                     |
| Steuerungsebene und Datenverkehr                                                                   | Google-Identität/Signaling; direkte, STUN- oder über Google weitergeleitete Medien | [Selbst gehostete](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) Serverrollen; direkte oder selbst weitergeleitete Medien |
| Quellcode                                                                                          | Proprietär                                                                         | Open Source ([AGPL](https://github.com/rustdesk/rustdesk)), auditierbar                                                                            |
| Benötigtes Konto                                                                                   | Google-Konto auf beiden Seiten                                                     | Eigene ID; kein Konto eines Drittanbieters erforderlich                                                                                            |
| Dateiübertragung / Übertragungs-Workflows                                                          | Nur Hoch-/Herunterladen (kein Drag-and-Drop)                                       | Integriert                                                                                                                                         |
| [Unbeaufsichtigter Zugriff](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung) | Gleiches Google-Konto, Rechner muss wach sein                                      | Zugriff per dauerhaftem Passwort auf eine von Ihnen verwaltete Geräteflotte                                                                        |
| Zentrale Verwaltung                                                                                | Google-Admin-Richtlinien; keine selbst gehostete Support-Konsole                   | Web-Konsole, [Gerätegruppen, gemeinsames Adressbuch](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/)                      |
| Individuelles Branding                                                                             | Nein                                                                               | Generator für individuell gebrandete Clients (ab Plan Basic)                                                                                       |
| Plattformen                                                                                        | Win/macOS/Linux (in Chrome)                                                        | Win/macOS/[Linux](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop)/Android; iOS-Controller-App                                          |

## Wo RustDesk punktet: selbst gehostet und Open Source

RustDesk ist um genau die zwei Dinge herum aufgebaut, die CRD strukturell nicht bieten kann: **Sie hosten die Infrastruktur, und Sie können den Code lesen.**

RustDesk ist Open Source unter der **[AGPL](https://github.com/rustdesk/rustdesk)** – Sie können genau prüfen, was auf Ihren Rechnern läuft, es selbst bauen und den **kostenlosen Community-Server zeitlich unbegrenzt** betreiben. Steigen Sie auf Server Pro um, ist dieser **[von Haus aus selbst gehostet](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten)**: Die ID-/Rendezvous- und Relay-Server laufen auf Ihrem eigenen Rechner oder einem gemieteten VPS, sodass keine Google-Cloud (oder die eines anderen Anbieters) dazwischengeschaltet ist. Eine Nuance für die Compliance-Planung: Direktverbindungen laufen weiterhin zwischen den Endpunkten, und weitergeleiteter Datenverkehr nutzt Ihr Relay – prüfen Sie daher die [Auswirkungen auf die Datensouveränität](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting), statt anzunehmen, dass der Serverstandort jedes Datenpaket kontrolliert.

Auf diesem selbst gehosteten Kern baut RustDesk die Team-Funktionen auf, die CRD fehlen: eine [selbst gehostete Web-Konsole](https://rustdesk.com/docs), einen Generator für individuell gebrandete Clients, [Gerätegruppen und ein gemeinsames Adressbuch](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) für abgestuften Zugriff sowie [LDAP/AD und OIDC-SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/) ab dem Plan Basic. Echte Dateiübertragung und [unbeaufsichtigter Zugriff](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung) per dauerhaftem Passwort sind auf Windows-, macOS-, Linux- und Android-Hosts serienmäßig enthalten; die iOS-App dient ausschließlich als Controller.

## Weg von Googles Cloud, hin zu Ihrer eigenen

Der Schritt über Chrome Remote Desktop hinaus bedeutet Kontrolle: Vermittlung, Zugriffsrichtlinien und Sitzungsdaten wandern von Googles Servern auf einen Server, den Sie selbst betreiben und prüfen können. Für alle, die einen Fernzugriff wollen, der niemandem außer ihnen selbst Rechenschaft schuldet, ist genau das der Gewinn.

## Testen ohne Verkaufsgespräch

Sie können RustDesk zu Ihren eigenen Bedingungen testen, ganz ohne Google-Konto im Spiel. Der Open-Source-Community-Server lässt sich kostenlos betreiben, solange Sie möchten; sobald die Team-Funktionen von Pro relevant werden, nennt Ihnen [sales@rustdesk.com](mailto:sales@rustdesk.com) die aktuellen Testkonditionen, und [rustdesk.com/pricing](https://rustdesk.com/pricing) listet die Preise der einzelnen Pläne auf.

Lesen Sie den Code selbst auf [GitHub](https://github.com/rustdesk/rustdesk), richten Sie ein paar Geräte auf Ihren eigenen Server aus und entscheiden Sie, ob die Kompromisse zu Ihnen passen, bevor Sie sich auf irgendetwas festlegen.
