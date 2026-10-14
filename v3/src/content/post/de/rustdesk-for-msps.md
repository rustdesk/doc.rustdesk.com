---
publishDate: 2026-07-05T19:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: rustdesk-for-msps
draft: false
title: 'RustDesk für MSPs: Ein einziges selbst gehostetes White-Label-Tool'
excerpt: 'Vergleichen Sie die Konsolidierung von TeamViewer, AnyDesk und ScreenConnect zu einer einzigen selbst gehosteten Remote-Support-Plattform mit eigenem Branding.'
image: ~/assets/images/blog/rustdesk-for-msps-og.webp
category: 'Anleitungen'
tags: ['RustDesk', 'MSP', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool'
faq:
  - question: 'Kann RustDesk mehrere Remote-Support-Tools für MSPs konsolidieren?'
    answer: 'Ja, für Fernsteuerung und Support. RustDesk Server Pro gibt einem MSP eine selbst gehostete Konsole, gebrandete Clients ab dem Basic-Plan, eine Zugriffskontrolle pro Benutzer und Gerätegruppe und unbegrenzte gleichzeitige Verbindungen in den Standardplänen – statt getrennter Konsolen und Verträge. Testen Sie die PSA-/RMM-Integrationen, auf die Sie angewiesen sind, zuerst in einem Pilotprojekt.'
  - question: 'Wie funktioniert die Lizenzierung von RustDesk für MSPs?'
    answer: 'Sie zahlen pro Login-Benutzer (Ihre Techniker) und pro verwaltetem Gerät (die Rechner, die Sie betreuen), und die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen, sodass mehrere Techniker gleichzeitig Sitzungen führen können, ohne Kanäle zu kaufen. Nur Customized V2 lizenziert eine feste Anzahl gleichzeitiger Verbindungen; siehe rustdesk.com/pricing.'
  - question: 'Kann ich den RustDesk-Client als White-Label-Lösung anbieten oder mit meinem eigenen Branding versehen?'
    answer: 'Ja. RustDesk Server Pro enthält ab dem Basic-Plan einen Generator für individuelle Clients, der einen Client mit Ihrem eigenen Namen, Logo, Symbol und Ihrer Serverkonfiguration erstellt. Ihre Kunden installieren ein Tool, das Ihre Marke trägt und sich mit Ihrem Server verbindet, statt eines Downloads mit dem Branding des Anbieters.'
  - question: 'Ist RustDesk selbst gehostet, und wer betreibt den Server?'
    answer: 'Ja. RustDesk Server Pro ist selbst gehostet: Der MSP betreibt ID-/Rendezvous-Server, Relay, Web-Konsole und gespeicherte Verwaltungsdaten auf einem eigenen Host vor Ort oder einem VPS und ist für Patches, Monitoring, Backups und Zertifikate verantwortlich. RustDesk Server OSS, der kostenlose Community-Server, stellt ID/Rendezvous und Relay ohne die Pro-Verwaltung bereit.'
  - question: 'Wie sollte ein MSP mit der Evaluierung von RustDesk beginnen?'
    answer: 'Beginnen Sie mit RustDesk Server OSS, dem kostenlosen Community-Server, auf einer Test-VM: Er hat keine Lizenzgebühr und kein Ablaufdatum, sodass Techniker einen repräsentativen Support-Ablauf validieren können, bevor Sie etwas bezahlen. Ergänzen Sie Server Pro, wenn das Team die Web-Konsole, gebrandete Clients oder die Zugriffskontrolle braucht, und erfragen Sie die aktuellen Evaluierungskonditionen über sales@rustdesk.com.'

metadata:
  description: 'RustDesk für MSPs: die selbst gehostete ScreenConnect-/TeamViewer-Alternative mit Branding, Zugriffskontrolle und unbegrenzten Verbindungen im Standardplan.'
  keywords: 'RustDesk für MSPs, selbst gehostete Fernwartung für MSPs, White-Label-Fernwartung für MSPs, Remote-Support-Tool für MSPs, Remote-Desktop-Lizenzierung pro Techniker'
---

Die meisten MSPs suchen nicht nach einem weiteren Remote-Support-Tool. Sie suchen nach _weniger_ davon: hier ein Platz für Cloud-Remote-Support, dort ein Tool pro Techniker, dazu ein eigenständiges Quick-Support-Programm für Einzeleinsätze – jedes mit eigener Konsole, eigenem Vertrag und eigener Verlängerung. RustDesk ersetzt diesen Stapel durch eine einzige selbst gehostete Plattform mit eigenem Branding; testen Sie die PSA-/RMM-Integrationen und Endpunkt-Abläufe, auf die sich Ihre Techniker verlassen, in einem Pilotprojekt, bevor Sie etwas abschalten.

Dieser Leitfaden behandelt den offenen Client von RustDesk, die selbst gehosteten Serveroptionen, die kommerzielle Pro-Verwaltung sowie Branding und Lizenzierung für MSP-Abläufe.

## Die Fernzugriffsdienste selbst betreiben

RustDesk Server Pro ist **selbst gehostet**: Ihr Team betreibt ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Verwaltungsdaten. Der Client von RustDesk und RustDesk Server OSS (der kostenlose Community-Server) stehen **[unter der AGPL](https://github.com/rustdesk/rustdesk)**; Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten. Wenn das Sicherheits-Audit eines Kunden fragt: „Was macht dieser Agent auf unseren Endpunkten?“, können Sie auf den Quellcode des Clients verweisen statt auf ein geschlossenes Binary, und Sie bestimmen, wo die serverseitigen Dienste laufen.

So schneidet eine einzige selbst gehostete Plattform gegen den Stapel an Tools ab, den MSPs bei einer Konsolidierung hinter sich lassen:

|                                               | Separate Cloud-Remote-Support-Tools | RustDesk Server Pro                                                                                          |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Zu verwaltende Konsolen                       | Eine pro Tool                       | Eine einzige selbst gehostete Konsole                                                                        |
| Client-Branding                               | Je nach Produkt und Plan            | Generator für individuell gebrandete Clients ab Basic                                                        |
| Hosting                                       | Anbieter-Cloud                      | Selbst gehostet (vor Ort oder Ihr VPS)                                                                       |
| Quellcode                                     | Je nach Produkt, meist proprietär   | Auditierbarer AGPL-Client                                                                                    |
| Lizenzierte gleichzeitige Verbindungen/Kanäle | Kontingent je nach Plan             | Unbegrenzt in Standardplänen; [Customized V2](https://rustdesk.com/pricing#custom2) mit lizenziertem Kontingent |
| Lizenzierungsbasis                            | Pro Platz / pro Kanal               | [Pro Login-Benutzer + pro verwaltetem Gerät](https://rustdesk.com/pricing)                                   |

Die genauen Plan-Stufen und aktuellen Preise finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Planabhängige gleichzeitige Verbindungen

Sie zahlen für berechtigte Login-Benutzer (in der Regel Techniker) und verwaltete Geräte. Die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen: Wenn während eines Ausfalls drei Techniker gleichzeitig an drei verschiedenen Kundenstandorten arbeiten, ist das ganz normaler Alltag und kein abrechnungspflichtiges Ereignis. Wenn Sie bisher gleichzeitige Sitzungen rationiert oder Ihr Team nach einer Kanalzahl getaktet haben, entfällt diese Einschränkung in den Standardplänen.

Nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine feste Anzahl gleichzeitiger Verbindungen. Nach der [Definition von RustDesk](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections) ist eine gleichzeitige Verbindung ein aktives steuerndes Gerät, ein „Kanal“: Ein Technikerrechner mit fünf Sitzungs-Tabs belegt einen Kanal, drei gleichzeitig aktive Technikerrechner belegen drei. Customized V2 zählt außerdem nur Geräte als verwaltete Geräte, die einem Benutzer oder einer Gerätegruppe zugewiesen sind; Rechner aus einmaligen Support-Einsätzen werden also weder gezählt noch deaktiviert – siehe [Was zählt als verwaltetes Gerät bei RustDesk?](/de/blog/was-zahlt-als-verwaltetes-gerat-bei-rustdesk)

## Mit eigenem Branding und Zugriffskontrolle ausstatten

Server Pro gibt einem MSP eine selbst gehostete Web-Konsole und drei getrennte Steuerungsebenen. Die [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) legt über Regeln für Benutzer und Gerätegruppen fest, welche Techniker welche Geräte erreichen; jedes Gerät gehört zu einer Gerätegruppe, und die Berechtigungen aus Benutzergruppen und Gerätegruppen addieren sich. Das gemeinsame Adressbuch ordnet Einträge für Techniker; es ist keine Zugriffsgrenze. Die [Kontrollrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) begrenzt, was ein Techniker innerhalb einer Sitzung tun darf. Der Generator für individuelle Clients und LDAP/OIDC-SSO sind ab dem Basic-Plan verfügbar.

Der gebrandete Client ist wichtig, weil Ihre Kunden ein Tool mit Ihrem Namen, Ihrem Logo und Ihren Servereinstellungen installieren, nicht mit denen eines Anbieters. Mit der Zugriffskontrolle beschränken Sie jeden Techniker auf die Gerätegruppen der Kundenstandorte, die er betreut.

## Kontrolle über den Speicherort serverseitiger Daten

Mit Self-Hosting bestimmt ein MSP, wo ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Gerätedaten laufen und wer sie betreibt – für regulierte Kunden oft der entscheidende Punkt. Es ist eine Kontrolle über die Bereitstellung, keine Compliance-Zertifizierung: Direkte Sitzungen laufen weiterhin zwischen den Endpunkten; erfassen Sie daher Endpunktstandorte und Routing, wie in [Remote-Desktop-Datensouveränität & DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) beschrieben.

## Testen Sie es zu Ihren eigenen Bedingungen

Sie können RustDesk noch heute evaluieren, ganz ohne gebuchten Termin:

- **Richten Sie Server OSS auf einer freien VM ein.** Er hat keine Lizenzgebühr und kein Ablaufdatum, sodass Sie einen echten Kunden-Workflow validieren können, bevor Sie etwas ausgeben.
- **Sobald Branding und Zugriffskontrolle ins Spiel kommen,** vergleichen Sie die Stufen unter [rustdesk.com/pricing](https://rustdesk.com/pricing) und fragen Sie [sales@rustdesk.com](mailto:sales@rustdesk.com) nach den aktuell geltenden Evaluierungskonditionen.
- **Wenig Zeit für ein eigenes Testlabor?** Erleben Sie RustDesk zunächst in Aktion oder stöbern Sie in den Video-Anleitungen auf dem [RustDesk-YouTube-Kanal](https://www.youtube.com/@rustdesk).

Sie können **[jederzeit upgraden](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es)**, wenn Ihr Kundenstamm wächst: Das Upgrade verlängert Ihre Lizenz auf ein volles Jahr ab dem Upgrade-Datum und rechnet den verbleibenden bezahlten Wert an. Starten Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).
