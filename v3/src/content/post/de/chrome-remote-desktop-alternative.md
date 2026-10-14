---
publishDate: 2026-07-01T08:14:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: chrome-remote-desktop-alternative
draft: false
title: 'Alternative zu Chrome Remote Desktop: selbst gehostetes RustDesk'
excerpt: 'Googles Chrome Remote Desktop im Vergleich mit RustDesk: selbst gehostete Rendezvous- und Relay-Server, offener Client, kostenloses Server OSS und Teamverwaltung mit Pro.'
image: ~/assets/images/blog/chrome-remote-desktop-alternative-og.webp
category: 'Alternativen'
tags: ['RustDesk', 'Chrome Remote Desktop', 'Alternative', 'Selbst-Hosting']
author: RustDesk Team
slug: 'alternative-zu-chrome-remote-desktop-selbst-gehostetes-rustdesk'
faq:
  - question: 'Gibt es eine Alternative zu Chrome Remote Desktop, die kein Google-Konto erfordert?'
    answer: 'Ja. RustDesk-Clients, die auf Ihren selbst gehosteten Server zeigen, verbinden sich per Geräte-ID und Passwort, ganz ohne Google- oder sonstiges Drittanbieterkonto. Server Pro kann lokal verwaltete Konten oder Ihren eigenen Identitätsanbieter ergänzen. Nur der öffentliche RustDesk-Demo-Server verlangt auf der steuernden Seite eine kostenlose Anmeldung. Chrome Remote Desktop nutzt die Google-Identität und eine von Google betriebene Koordination.'
  - question: 'Unterstützt Chrome Remote Desktop Dateiübertragung?'
    answer: 'Ja, allerdings nur einfaches Hoch- und Herunterladen. Eine Übertragung per Drag-and-Drop bietet Chrome Remote Desktop nicht. RustDesk enthält neben der Fernsteuerung eine integrierte Dateiübertragung in beide Richtungen, sodass ein Techniker Dateien hin und her bewegen kann, ohne die Sitzung zu verlassen oder zu einem anderen Tool zu wechseln.'
  - question: 'Kann Chrome Remote Desktop unbeaufsichtigten Zugriff bieten?'
    answer: 'Ja. Chrome Remote Desktop unterstützt kontobasierten, PIN-geschützten unbeaufsichtigten Zugriff, solange das Zielgerät online ist. RustDesk nutzt ein permanentes Passwort, das die Standardeinstellungen akzeptieren, wobei der RustDesk-Dienst auf dem Host laufen muss; Server Pro ergänzt die zentrale Verwaltung dieser Geräte. Keines der beiden Tools weckt einen ausgeschalteten Rechner von sich aus auf.'
  - question: 'Ist RustDesk genau wie Chrome Remote Desktop kostenlos?'
    answer: 'Ja. Der RustDesk-Client und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der AGPL und sind kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum; Hosting und Bandbreite stellen Sie selbst. Das kommerzielle, proprietäre Server Pro ergänzt eine selbst gehostete Teamverwaltung mit Web-Konsole, Gerätegruppen und LDAP/OIDC-SSO; siehe rustdesk.com/pricing.'
metadata:
  description: 'Chrome Remote Desktop ist kostenlos und einfach, bindet aber an Google und hat Funktionslücken. Im Vergleich: RustDesk, selbst gehostet und Open Source.'
  keywords: 'Chrome Remote Desktop Alternative, selbst gehostete Chrome Remote Desktop Alternative, Remotedesktop ohne Google-Konto, RustDesk vs Chrome Remote Desktop'
---

Die selbst gehostete Open-Source-Alternative zu Chrome Remote Desktop ist RustDesk: Mit RustDesk Server OSS (dem kostenlosen Community-Server) betreiben Sie die ID-/Rendezvous- und Relay-Server selbst und können den Quellcode des Clients lesen, statt den Zugriff an ein Google-Konto und eine von Google betriebene Koordination zu binden. Das kommerzielle Server Pro ergänzt die Teamverwaltung auf derselben selbst gehosteten Grundlage.

## Warum nach einer Alternative zu Chrome Remote Desktop suchen

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) ist Googles kostenloses, browserbasiertes Tool für den Fernzugriff. Es ist einfach und schnell: Installieren Sie einen kleinen Host, melden Sie sich an, und schon erreichen Sie Ihren Rechner innerhalb weniger Minuten von einem anderen Gerät aus – genau das, was der gelegentliche private Gebrauch verlangt.

Doch sobald Ihre Anforderungen über „meinem eigenen Laptop vom Sofa aus helfen“ hinauswachsen, zeigen sich die Grenzen: Sie sind an Googles Identität und Signaling gebunden, einige für Support-Teams wichtige Funktionen fehlen, und die Steuerungsebene lässt sich nicht selbst hosten. Googles [Netzwerkleitfaden](https://support.google.com/chrome/a/answer/16364503) erklärt die Grenze: Verbindungen werden über Google-Dienste ausgehandelt, während der eigentliche Sitzungsverkehr direkte, STUN- oder TURN-/Relay-Pfade nutzt; nur TURN-/Relay-Pakete laufen durch Google-Rechenzentren.

## Was Chrome Remote Desktop gut macht

Anerkennung, wo sie angebracht ist. [TechRadars Testbericht](https://www.techradar.com/reviews/chrome-remote-desktop-review) bezeichnet es als „völlig kostenlos, ohne Abonnements oder Premium-Stufen“, einfach einzurichten und gut geeignet für den privaten Gebrauch. Es läuft unter Windows, macOS und Linux, erfordert keine Lizenzverhandlung, und es gibt nichts zu hosten. Wer vom Smartphone aus kurz nach dem heimischen PC sehen will, kommt mit CRD nahezu ohne Aufwand aus.

Diese Einfachheit ist das Produkt. Die Probleme beginnen, sobald man von ihm verlangt, was ein Support-Team oder ein Setup mit mehreren Rechnern tatsächlich braucht.

## Wo Chrome Remote Desktop an seine Grenzen stößt

### Fehlende Funktionen: selbst gehostete Steuerung, Geräteverwaltung und Team-Workflows

Googles Hilfeseiten dokumentieren den Fernzugriff auf Dateien und Anwendungen und erlauben Administratoren, Zugriff und Netzwerkverhalten zu steuern – doch sie beschreiben nach wie vor einen Dienst, der auf einem Google-Konto basiert und von Google koordiniert wird, mit der in der Einleitung erläuterten Aufteilung von Signaling und Relay. Mit anderen Worten: CRD eignet sich gut für einfachen Zugriff, ist aber keine selbst gehostete Support-Konsole mit Gerätegruppen oder individuellem Branding wie bei RustDesk.

### Unbeaufsichtigter Zugriff und Rechner im Ruhezustand

CRD unterstützt PIN-geschützten unbeaufsichtigten Zugriff, doch das Zielgerät muss eingeschaltet, online und mit demselben Google-Konto verknüpft sein. Auch RustDesk braucht einen Host, der online ist, auf dem der Dienst läuft und dem die Plattformberechtigungen erteilt wurden. Keines der beiden Tools weckt einen ausgeschalteten Rechner von sich aus; laut RustDesk-Dokumentation kann Wake-on-LAN nach der Geräteerkennung im LAN funktionieren, sofern es lokal unterstützt wird.

### Benutzerverwaltung und die Pflicht zum Google-Konto

Jeder Teilnehmer benötigt ein Google-Konto, und bei gemeinsamen (nicht unbeaufsichtigten) Sitzungen muss jemand anwesend sein, um den Zugriff freizugeben. Google-Workspace-Administratoren können [CRD aktivieren oder deaktivieren und die Firewall-Durchquerung einschränken](https://support.google.com/chrome/a/answer/2799701), doch das ist nicht dasselbe wie eine selbst gehostete Support-Konsole mit Gerätegruppen und abgestuftem Techniker-Zugriff – und Google bleibt Teil von Identität und Sitzungsaufbau, wie in der Einleitung beschrieben. (Zum Sicherheitsaspekt im Speziellen siehe [Ist Chrome Remote Desktop sicher?](/de/blog/ist-chrome-remote-desktop-sicher-eine-ehrliche-bewertung))

## Chrome Remote Desktop vs. RustDesk im Überblick

|                                                                                                    | Chrome Remote Desktop                                                                                                                                       | RustDesk                                                                                                                                           |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kosten                                                                                             | Kostenlos                                                                                                                                                   | Client und Server OSS kostenlos; Server Pro kostenpflichtig                                                                                        |
| Steuerungsebene und Datenverkehr                                                                   | Google-Identität/Signaling; direkte, STUN- oder über Google weitergeleitete Medien                                                                          | [Selbst gehostete](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) Serverrollen; direkte oder selbst weitergeleitete Medien |
| Quellcode                                                                                          | [Öffentliche Chromium-Remoting-Komponenten](https://chromium.googlesource.com/chromium/src/+/main/remoting/); Google bietet den Dienst nicht zum Self-Hosting an | AGPL-Client und Server OSS; proprietäre Verwaltung in Server Pro                                                                                   |
| Benötigtes Konto                                                                                   | Google-Konto auf beiden Seiten                                                                                                                              | Eigene ID; kein Konto eines Drittanbieters erforderlich                                                                                            |
| Dateiübertragung / Übertragungs-Workflows                                                          | Nur Hoch-/Herunterladen (kein Drag-and-Drop)                                                                                                                | Integriert                                                                                                                                         |
| [Unbeaufsichtigter Zugriff](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung) | Konto-/PIN-basiert; Zielgerät muss online sein                                                                                                              | Permanentes Passwort; Dienst läuft, Betriebssystemberechtigungen erteilt; Zielgerät muss online sein                                               |
| Zentrale Verwaltung                                                                                | Google-Admin-Richtlinien; kein vom Kunden betriebener CRD-Steuerungsdienst                                                                                  | Server-Pro-Konsole, Zugriffskontrolle, Gerätegruppen und gemeinsame Adressbücher                                                                   |
| Individuelles Branding                                                                             | Nein                                                                                                                                                        | Generator für individuell gebrandete Clients (ab dem Basic-Plan)                                                                                   |
| Plattformen                                                                                        | Win/macOS/Linux (in Chrome)                                                                                                                                 | Win/macOS/[Linux](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop)/Android; iOS-Controller-App                                          |

## Wo RustDesk punktet: selbst gehostet und Open Source

Was RustDesk unterscheidet, ist ein **Serverpfad, den Sie selbst bereitstellen und betreiben können**. [Chromium veröffentlicht den Remoting-Quellcode von CRD](https://chromium.googlesource.com/chromium/src/+/main/remoting/), doch Googles Koordinationsdienst lässt sich nicht selbst hosten; bei RustDesk betreiben Sie Server OSS oder Server Pro selbst.

Der **RustDesk-Client und Server OSS stehen unter der AGPL** und lassen sich unabhängig prüfen und bauen. Server OSS stellt selbst gehostete ID-/Rendezvous- und Relay-Dienste ohne Lizenzgebühr und ohne Ablaufdatum bereit. **Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**, und ergänzt die Verwaltung auf Ihrer Infrastruktur. Direkte Sitzungen verlaufen zwischen den Endpunkten; Relay-Sitzungen nutzen Ihr Relay. Prüfen Sie die [Auswirkungen auf die Datensouveränität](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) zusammen mit dem Serverstandort.

Server Pro ergänzt die Team-Funktionen, die CRD fehlen: eine selbst gehostete Web-Konsole, Gerätegruppen, gemeinsame Adressbücher und [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) pro Benutzer und Gerätegruppe, dazu ab dem Basic-Plan die Generierung individueller Clients und LDAP/OIDC-SSO. Unbeaufsichtigter Zugriff per permanentem Passwort funktioniert auf Windows-, macOS- und Linux-Hosts, sobald der Dienst läuft und die Betriebssystemberechtigungen erteilt sind. Android-Hosts brauchen zusätzlich die Zustimmung zur Bildschirmaufnahme und die Eingabeberechtigung und unterliegen den Hintergrundbeschränkungen des Geräteherstellers; die iOS-App ist ausschließlich ein Controller.

## Weg von Googles Cloud, hin zu Ihrer eigenen

Der Schritt über Chrome Remote Desktop hinaus heißt Kontrolle: Vermittlung, Zugriffsrichtlinien und Verwaltungsdaten wandern von Googles Servern auf Server, die Sie betreiben, mit einem Client, den Sie prüfen können. Mit dieser Kontrolle übernehmen Sie auch die Verantwortung für Patches, Verfügbarkeit und Wiederherstellung.

## Testen ohne Verkaufsgespräch

Sie können RustDesk zu Ihren eigenen Bedingungen testen, ganz ohne Google-Konto. Server OSS lässt sich kostenlos betreiben, ohne Lizenzgebühr und ohne Ablaufdatum; sobald die Team-Funktionen von Pro wichtig werden, nennt Ihnen [sales@rustdesk.com](mailto:sales@rustdesk.com) die aktuellen Evaluierungsbedingungen, und [rustdesk.com/pricing](https://rustdesk.com/pricing) listet die Preise der Pläne auf.

Lesen Sie den Code selbst auf [GitHub](https://github.com/rustdesk/rustdesk), richten Sie ein paar Geräte auf Ihren eigenen Server aus und entscheiden Sie, ob die Kompromisse zu Ihnen passen, bevor Sie sich auf irgendetwas festlegen.
