---
publishDate: 2026-07-05T19:40:00Z
lang: 'de'
translationKey: rustdesk-for-msps
draft: false
title: 'RustDesk für MSPs: Ein einziges selbst gehostetes White-Label-Tool'
excerpt: 'Vergleichen Sie die Konsolidierung von TeamViewer, AnyDesk und ScreenConnect zu einer einzigen selbst gehosteten Remote-Support-Plattform mit eigenem Branding.'
image: ~/assets/images/blog/rustdesk-for-msps-og.png
category: 'Anleitungen'
tags: ['RustDesk', 'MSP', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool'
faq:
  - question: 'Kann RustDesk mehrere Remote-Support-Tools für MSPs konsolidieren?'
    answer: 'Ja. RustDesk hat zum Ziel, eine ganze Ansammlung einzelner Tools durch eine einzige selbst gehostete, quelloffene White-Label-Plattform zu ersetzen – mit einer zentralen Konsole, einem Generator für Clients mit eigenem Branding und nutzerbasierter Zugriffskontrolle statt separater Konsolen und Verträge.'
  - question: 'Wie funktioniert die Lizenzierung von RustDesk für MSPs?'
    answer: 'Sie zahlen pro Login-Benutzer (Ihre Techniker) und pro verwaltetem Gerät (die Rechner, die Sie betreuen). Die Standardpläne beinhalten unbegrenzte gleichzeitige Verbindungen, sodass mehrere Techniker gleichzeitig Sitzungen ausführen können, ohne zusätzliche Kanäle kaufen zu müssen. Customized V2 begrenzt die Gleichzeitigkeit und bepreist sie separat; siehe rustdesk.com/pricing.'
  - question: 'Kann ich den RustDesk-Client als White-Label-Lösung anbieten oder mit meinem eigenen Branding versehen?'
    answer: 'Ja. RustDesk enthält einen Generator für Clients mit eigenem Branding, sodass Ihre Kunden ein Tool installieren, das für Ihren Service konfiguriert ist. Die Client-Generierung und Identitätsfunktionen stehen ab dem Basic-Plan zur Verfügung – prüfen Sie daher die aktuelle Plan-Matrix, bevor Sie sich darauf verlassen.'
  - question: 'Ist RustDesk selbst gehostet, und wer betreibt den Server?'
    answer: 'RustDesk Server Pro ist selbst gehostet: Der ID-/Rendezvous-Server, das Relay, die Konsole und die gespeicherten Bereitstellungsdaten laufen auf einer Infrastruktur, die Sie selbst kontrollieren. Jemand auf Ihrer Seite richtet den Host ein, öffnet die Ports, konfiguriert TLS und spielt Patches ein – Routinearbeit für die Infrastruktur eines MSP, die nach der Einrichtung nur noch wenig Aufwand macht.'
  - question: 'Wie sollte ein MSP mit der Evaluierung von RustDesk beginnen?'
    answer: 'Ein üblicher Weg ist, mit dem kostenlosen Community-Server auf einer Test-VM oder einem kleinen internen Host zu beginnen, einen repräsentativen Client-Workflow zu validieren und dann zu entscheiden, ob sich die Pro-Funktionen lohnen. Sie können auch eine E-Mail an sales@rustdesk.com senden, um sich nach den aktuellen Evaluierungsbedingungen zu erkundigen.'

metadata:
  description: 'RustDesk für MSPs: eine selbst gehostete Alternative zu ScreenConnect/TeamViewer – konsolidieren Sie Remote-Support mit eigenem Branding, Zugriffskontrolle und planabhängiger Gleichzeitigkeit.'
  keywords: 'RustDesk für MSPs, selbst gehostete Fernwartung für MSPs, White-Label-Fernwartung für MSPs, Remote-Support-Tool für MSPs, Remote-Desktop-Lizenzierung pro Techniker'
---

Die meisten MSPs suchen nicht nach einem weiteren Remote-Support-Tool. Sie suchen nach _weniger_ davon. Der Tool-Stack wächst aus strukturellen Gründen, nicht aus Vorliebe: hier ein Cloud-Remote-Support-Seat, dort ein Tool pro Techniker, dazu ein eigenständiges Quick-Support-Tool für Einzeleinsätze – unterschiedliche Anbieter und immer dieselben drei Beschwerden über Kosten, die stetig steigen, Lizenzbedingungen, die Ihre Arbeitsweise einschränken, und Kontrolle, die Sie eigentlich nie wirklich hatten.

Dies ist ein Leitfaden zu **RustDesk für MSPs**: wie ein einziges selbst gehostetes, quelloffenes und individuell brandbares Tool diesen Wildwuchs ersetzen kann – und, ebenso wichtig, wo die Kompromisse liegen.

## Der entscheidende Unterschied: Sie hosten es, Ihnen gehört es

RustDesk Server Pro ist **selbst gehostet**: Der ID-/Rendezvous-Server, das Relay, die Konsole und die gespeicherten Gerätedaten laufen auf einer Infrastruktur, die Sie kontrollieren, und nicht auf der eines Anbieters ([warum Self-Hosting für MSPs wichtig ist](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten)). Und weil der Kern **[quelloffen (AGPL)](https://github.com/rustdesk/rustdesk)** ist, können Sie, wenn das Sicherheits-Audit eines Kunden fragt „Was macht dieser Agent eigentlich auf unseren Endpunkten?“, auf den Quellcode verweisen statt auf eine Closed-Source-Software.

So schneidet eine einzige selbst gehostete Plattform gegen den Wust an Tools ab, den MSPs bei einer Konsolidierung abschaffen:

|                         | Separate Cloud-Fernsupport-Tools  | RustDesk Server Pro                                                                               |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| Zu verwaltende Konsolen | Eine pro Tool                     | Eine einzige selbst gehostete Konsole                                                             |
| Branding                | Zusatzoption oder nicht verfügbar | Generator für Clients mit eigenem Branding (ab dem Basic-Plan)                                    |
| Hosting                 | Anbieter-Cloud                    | Selbst gehostet (On-Premises oder eigener VPS)                                                    |
| Quellcode               | Geschlossen                       | Quelloffener (AGPL) Kern                                                                          |
| Gleichzeitige Sitzungen | Häufig gedeckelt / pro Kanal      | Unbegrenzt bei Standardplänen; begrenzt bei [Customized V2](https://rustdesk.com/pricing#custom2) |
| Lizenzierungsbasis      | Pro Sitzplatz / pro Kanal         | [Pro Login-Benutzer + pro verwaltetem Gerät](https://rustdesk.com/pricing)                        |

Die genauen Plan-Stufen und aktuellen Preise finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Planabhängige gleichzeitige Verbindungen

Sie zahlen pro Login-Benutzer (Ihre Techniker) und pro verwaltetem Gerät (die Rechner, die Sie betreuen), und die Standardpläne beinhalten unbegrenzte [gleichzeitige Verbindungen](https://rustdesk.com/pricing) – mehrere Techniker können gleichzeitig Sitzungen ausführen, ohne zusätzliche „Kanäle“ kaufen zu müssen, während Customized V2 diese begrenzt und separat bepreist. Wenn während eines Ausfalls drei Techniker gleichzeitig bei drei verschiedenen Kunden vor Ort im Einsatz sind, ist das schlicht Alltag – kein abrechnungspflichtiges Sonderereignis. Wenn Sie bislang gleichzeitige Sitzungen rationieren oder Ihr Team nach einer Kanal-Obergrenze takten mussten, entfällt diese Einschränkung.

## Mit eigenem Branding und Zugriffskontrolle ausstatten

RustDesk liefert genau die Bausteine, die ein MSP für den Betrieb im großen Maßstab wirklich braucht: eine selbst gehostete **[Web-Konsole](https://rustdesk.com/docs)**, einen **Generator für Clients mit eigenem Branding** sowie **[Gerätegruppen plus ein gemeinsames Adressbuch](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/)** für nutzerbasierte Zugriffskontrolle. **[LDAP/SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/) (OIDC) ist ab dem Basic-Plan verfügbar.**

Der gebrandete Client ist deshalb wichtig, weil Ihre Kunden auf dem installierten Tool Ihre eigene Marke sehen – nicht die eines Anbieters. Die Zugriffskontrolle kann Techniker auf zugewiesene Gerätegruppen beschränken. Prüfen Sie die aktuelle Plan-Matrix, bevor Sie sich auf diese Funktionen verlassen.

## Kontrolle über den Speicherort serverseitiger Daten

Self-Hosting gibt einem MSP Kontrolle über den Speicherort serverseitiger Daten. Es garantiert weder, dass direkter Endpunkt-Traffic in einem einzigen Land verbleibt, noch stellt es allein schon die DSGVO-Konformität her; kartieren Sie Endpunktstandorte, Routing, Aufbewahrungsfristen und rechtliche Verpflichtungen.

## Testen Sie es zu Ihren eigenen Bedingungen

Sie können RustDesk noch heute evaluieren, ganz ohne gebuchten Termin:

- **Richten Sie den kostenlosen Community-Server auf einer freien VM ein.** Er ist quelloffen und läuft nie ab, sodass Sie einen echten Client-Workflow validieren können, bevor Sie auch nur einen Cent ausgeben.
- **Sobald Branding und Zugriffskontrolle ins Spiel kommen,** vergleichen Sie die Stufen unter [rustdesk.com/pricing](https://rustdesk.com/pricing) und fragen Sie [sales@rustdesk.com](mailto:sales@rustdesk.com) nach den aktuell geltenden Evaluierungsbedingungen.
- **Wenig Zeit für ein eigenes Testlabor?** Erleben Sie RustDesk zunächst in Aktion oder stöbern Sie in den Video-Anleitungen auf dem [RustDesk-YouTube-Kanal](https://www.youtube.com/@rustdesk).

Sie können **[jederzeit upgraden](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es) (anteilig berechnet)**, wenn Ihr Kundenstamm wächst – starten Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).
