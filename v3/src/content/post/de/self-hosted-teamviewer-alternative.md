---
publishDate: 2026-06-30T15:11:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: self-hosted-teamviewer-alternative
draft: false
title: 'Eine selbst gehostete Alternative zu TeamViewer und AnyDesk: RustDesk'
excerpt: 'RustDesk als Alternative zu TeamViewer oder AnyDesk bewerten: offener Client, kostenloser Server OSS, kommerzielle Pro-Verwaltung und ein schrittweiser Migrationsplan.'
image: ~/assets/images/blog/self-hosted-teamviewer-alternative-og.webp
category: 'Alternativen'
tags: ['RustDesk', 'TeamViewer', 'AnyDesk', 'Alternative', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'die-beste-selbst-gehostete-teamviewer-alternative'
faq:
  - question: 'Ist RustDesk eine gute selbst gehostete Alternative zu TeamViewer und AnyDesk?'
    answer: 'Ja. RustDesk kombiniert einen AGPL-Client und RustDesk Server OSS (den kostenlosen Community-Server) mit der kommerziellen Verwaltung von Server Pro, alles selbst gehostet, und die Standardpläne von Pro enthalten unbegrenzte gleichzeitige Verbindungen. Rendezvous, Relay, Konsole und gespeicherte Verwaltungsdaten betreiben Sie selbst. AnyDesk bietet auch Ultimate On-Premises an; vergleichen Sie daher neben dem Hosting auch Quellcode-Transparenz, Lizenzierung und Arbeitsabläufe.'
  - question: 'Kann ich eine Alternative zu TeamViewer oder AnyDesk auf meinen eigenen Servern selbst hosten?'
    answer: 'Ja. Mit RustDesk Server OSS (dem kostenlosen Community-Server) oder Server Pro hosten Sie die Server selbst, vor Ort oder auf einem VPS, und Server OSS kommt ohne Lizenzgebühr und ohne Ablaufdatum aus. Jemand in Ihrem Team stellt den Host bereit, öffnet die Ports, richtet TLS ein und hält das System gepatcht.'
  - question: 'Wie schneidet die RustDesk-Lizenzierung gegenüber einem Abonnement pro Platz oder pro Plan ab?'
    answer: 'RustDesk Server Pro lizenziert Login-Benutzer plus verwaltete Geräte, mit unbegrenzten gleichzeitigen Verbindungen in den Standardplänen; nur Customized V2 lizenziert eine feste Anzahl. Ein Upgrade ist jederzeit möglich: Es verlängert die Laufzeit der Lizenz auf ein volles Jahr ab dem Upgrade-Datum und rechnet den verbleibenden bezahlten Wert der aktuellen Lizenz an. Kalkulieren Sie Benutzer, Geräte und Gleichzeitigkeit anhand der aktuellen Preisseite.'
  - question: 'Markiert RustDesk kommerzielle Nutzung so wie AnyDesk?'
    answer: 'Nein. RustDesk Server OSS (der kostenlose Community-Server) hat keine Erkennung kommerzieller Nutzung wie die kostenlose Version von AnyDesk; die geschäftliche Nutzung von Server OSS wird also weder markiert noch unterbrochen. RustDesk Server Pro ist ein kommerzielles Produkt, dessen Grenzen der gekaufte Plan festlegt: die Anzahl der lizenzierten Login-Benutzer und verwalteten Geräte.'
  - question: 'Eignet sich RustDesk für MSPs und größere IT-Abteilungen?'
    answer: 'Ja. RustDesk Server Pro ergänzt eine selbst gehostete Konsole, Gerätegruppen, gemeinsame Adressbücher und eine Zugriffskontrolle pro Benutzer und Gerätegruppe; der Generator für individuelle Clients und LDAP/OIDC-SSO sind ab Basic enthalten, und die Standardpläne bieten unbegrenzte gleichzeitige Verbindungen. RustDesk veröffentlicht Planungshilfen für große Geräteflotten; prüfen Sie die Kapazität für sehr große Bestände mit Ihrer eigenen Last.'
  - question: 'Hilft Self-Hosting, meine Daten im Land zu halten und die DSGVO-Umsetzung zu unterstützen?'
    answer: 'Ja, als Kontrolle über die Bereitstellung. Mit selbst gehostetem RustDesk entscheiden Sie, wer Rendezvous, Relay, Konsole und gespeicherte Gerätedaten betreibt und wo sie laufen. Eine Compliance-Zertifizierung ist das nicht: Direktverbindungen laufen weiterhin zwischen den Endpunkten, daher hängen Datenverkehr im Inland und DSGVO-Pflichten auch davon ab, wie Sie die Bereitstellung routen und betreiben.'

metadata:
  description: 'RustDesk als selbst gehostete Alternative zu TeamViewer oder AnyDesk: AGPL-Client und Server OSS, kommerzielles Server Pro, Lizenzierung und Migrationsschritte.'
  keywords: 'selbst gehostete TeamViewer-Alternative, selbst gehostete AnyDesk-Alternative, TeamViewer Ersatz, AnyDesk Ersatz, Open-Source-Alternative für Remote-Desktop'
---

Die Suche nach einer **selbst gehosteten Alternative zu TeamViewer oder AnyDesk** beginnt meist gleich: Ein Verlängerungsangebot passt nicht mehr zu den Arbeitsabläufen, die Sie tatsächlich nutzen, und das Produkt vermittelt Ihre Sitzungen weiterhin über eine Infrastruktur, die Sie nicht kontrollieren. RustDesk ist eine selbst gehostete Alternative zu beiden: Sie betreiben den ID-/Rendezvous- und den Relay-Server selbst, zunächst mit RustDesk Server OSS (dem kostenlosen Community-Server), und ergänzen das kommerzielle Server Pro, sobald Sie eine zentrale Verwaltung brauchen.

## Warum Teams TeamViewer und AnyDesk verlassen

Zwei Entscheidungsfaktoren tauchen immer wieder auf.

**Kosten.** Die Summe bei der Verlängerung kann unabhängig von der tatsächlichen Nutzung steigen – Tarifpakete, Zusatzoptionen und Preisänderungen wirken sich alle auf den Betrag aus. Vergleichen Sie das aktuelle Angebot mit Alternativen anhand identischer Anforderungen.

**Kontrolle.** Bei vom Anbieter gehosteten Diensten betreibt in der Regel der Anbieter die Verbindungskoordination und die Verwaltungsdaten; Sitzungsmedien können direkt oder über ein Relay laufen. Der Standarddienst von TeamViewer folgt diesem Modell, während AnyDesk zusätzlich die Appliance Ultimate On-Premises anbietet.

**Client und Server OSS von RustDesk stehen unter der AGPL** und lassen sich unabhängig prüfen und bauen. Server OSS stellt den ID-/Rendezvous- und den Relay-Dienst ohne Lizenzgebühr und ohne Ablaufdatum bereit. **Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**, und ergänzt eine zentrale Verwaltung auf Ihrer Infrastruktur. In beiden Fällen bestimmen Sie, wo die Server laufen und wer sie betreibt.

Ein Vorbehalt: Direkte Sitzungen laufen zwischen den Endpunkten (weitergeleitete Sitzungen nutzen Ihr Relay), daher ist Self-Hosting eine Kontrolle über die Bereitstellung und keine Compliance-Zertifizierung – ob der Datenverkehr im Inland bleibt und die DSGVO-Pflichten erfüllt sind, hängt weiterhin davon ab, wie Sie die Bereitstellung routen und betreiben.

## RustDesk vs. TeamViewer und AnyDesk im Überblick

|                                                            | TeamViewer / AnyDesk (Cloud)                                         | RustDesk (selbst gehostet)                                                                                     |
| ---------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Verbindungskoordination                                    | In den Standard-Cloud-Plänen vom Anbieter betrieben                  | Ihr ID-/Rendezvous-Server                                                                                      |
| Pfad der Sitzungsmedien                                    | Direkt oder über ein Relay des Anbieters, je nach Produkt und Netzwerk | Direkt zwischen den Endpunkten oder über Ihr konfiguriertes Relay                                            |
| Quellcode                                                  | Proprietäre Clients                                                  | AGPL-Client und Server OSS; proprietäre Verwaltung in Server Pro                                               |
| Lizenzmodell                                               | Abonnement pro Platz / pro Plan                                      | [Pro Login-Benutzer + pro verwaltetem Gerät](https://rustdesk.com/pricing)                                     |
| [Gleichzeitige Verbindungen](https://rustdesk.com/pricing) | Abhängig vom Plan                                                    | Unbegrenzt in Standardplänen; begrenzt bei [Customized V2](https://rustdesk.com/pricing#custom2)               |
| Standort der serverseitigen Daten                          | Vom Anbieter kontrolliert                                            | Von Ihnen gewählt und betrieben; die Wege zwischen den Endpunkten zählen weiterhin                            |
| Vor dem Kauf testen                                        | Testversion des Anbieters (siehe Anbieterseite)                      | Server OSS sofort kostenlos oder Pro-Evaluierung über [sales@rustdesk.com](mailto:sales@rustdesk.com)          |

_Die Details der Mitbewerber variieren je nach Plan – bestätigen Sie die aktuellen TeamViewer- oder AnyDesk-Konditionen beim Anbieter. [RustDesk-Preise ansehen](https://rustdesk.com/pricing)._

## Lizenzierung nach Login-Benutzern, Geräten und planabhängiger Gleichzeitigkeit

RustDesk lizenziert pro Login-Benutzer plus pro verwaltetem Gerät. **Die Standardpläne (Individual, Basic, Customized) enthalten unbegrenzte gleichzeitige Verbindungen; nur Customized V2 lizenziert eine feste Anzahl gleichzeitiger Verbindungen.** Gezählt werden dabei aktive steuernde Geräte: Ein Technikerrechner mit fünf Sitzungs-Tabs ist eine Verbindung. Ein [Upgrade](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es) können Sie jederzeit im Self-Service-Portal kaufen: Es verlängert die Laufzeit der Lizenz auf ein volles Jahr ab dem Upgrade-Datum und rechnet den verbleibenden bezahlten Wert Ihrer aktuellen Lizenz an. Kalkulieren Sie alle drei Werte anhand der aktuellen Preisseite.

Das bildet sauber ab, wie Support-Teams tatsächlich wachsen. Für sehr große Bestände veröffentlicht RustDesk eine [Planungshilfe für große Geräteflotten](/de/blog/skaliert-rustdesk-auf-200-000-gerate), die 200.000 Online-Geräte als Planungsziel behandelt – zu validieren mit Ihrer eigenen Caching-, Datenbank- und Relay-Last.

## Gebaut für MSPs und IT-Teams

Server Pro bietet eine selbst gehostete Konsole, Gerätegruppen, gemeinsame Adressbücher, eine [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) pro Benutzer und Gerätegruppe sowie [Kontrollrollen](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) für Aktionen innerhalb der Sitzung, dazu ab dem Basic-Plan einen Generator für individuelle Clients und [LDAP/OIDC-SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/). Jedes Gerät gehört zu einer Gerätegruppe, und die Zugriffsberechtigungen aus Benutzergruppen und Gerätegruppen addieren sich.

## Was bei einer TeamViewer-Migration zu berücksichtigen ist

In TeamViewer-Bereitstellungen sammeln sich Funktionen an, die eine reine Eins-zu-eins-Checkliste übersehen kann. Erfassen Sie diese daher, bevor Sie einen Plan wählen – und bestätigen Sie die aktuellen Konditionen und die Verfügbarkeit von Funktionen bei jedem Anbieter, da sich beides im Laufe der Zeit ändert:

- **Tarifspezifische Funktionen.** Enterprise-Tarife wie **TeamViewer Tensor** ergänzen Kontrollen wie bedingten Zugriff, Massenbereitstellung und SSO-/Verzeichnis-Provisionierung, die sich möglicherweise nicht eins zu eins abbilden lassen; listen Sie die Funktionen auf, auf die Sie tatsächlich angewiesen sind. Falls Sie **TeamViewer Frontline** (die AR-/Industrie-Suite) nutzen, behandeln Sie diese als eigenes Produkt außerhalb einer Remote-Desktop-Migration.
- **Bedingter Zugriff und Geräterichtlinien.** Wenn Sie mit den regelbasierten Zugriffs- und ausgerollten Richtlinieneinstellungen von TeamViewer festlegen, wer sich mit welchen Rechnern verbinden darf, planen Sie, wie sich diese Regeln auf RustDesk-Gerätegruppen, ein gemeinsames Adressbuch und Zugriffsregeln nach dem Prinzip der geringsten Rechte übertragen lassen.
- **Management-Konsole und Gruppenstruktur.** TeamViewer organisiert Geräte, gemeinsame Gruppen sowie Benutzer- oder Firmenprofile in seiner Management-Konsole; erfassen Sie diese Hierarchie, damit sich die entsprechende Gruppierung und Zuständigkeit in der selbst gehosteten Konsole nachbauen lässt.
- **Abrechnung pro Gerät statt pro Platz.** TeamViewer und RustDesk zählen Lizenzen unterschiedlich. Bilden Sie die tatsächliche Nutzung – lizenzierte Benutzer, verwaltete Geräte und gleichzeitige Sitzungen – deshalb im RustDesk-Modell pro Login-Benutzer plus pro verwaltetem Gerät neu ab, statt anzunehmen, dass sich eine Platzanzahl einfach übertragen lässt.
- **Zu prüfende Funktionsparität.** Wenn Remote-Druck, Sitzungsaufzeichnung, mobile Unterstützung, Wake-on-LAN oder bestimmte Integrationen in Ihrem TeamViewer-Workflow zwingend erforderlich sind, bestätigen Sie jede einzelne davon während des Pilotbetriebs auf RustDesk, statt Parität vorauszusetzen.

## Was ein Wechsel speziell von AnyDesk verändert

Einige Punkte betreffen speziell den Umstieg von AnyDesk statt von TeamViewer:

- **Keine Erkennung kommerzieller Nutzung.** Die kostenlose Version von AnyDesk kann Konten markieren, deren Nutzung sie als [kommerziell](/de/blog/anydesk-kommerzielle-nutzung-erkannt-so-beheben-sie-es) einstuft; RustDesk Server OSS hat keine solche Erkennung, und bei Server Pro gelten die Grenzen der gekauften Lizenz.
- **Keine Gleichzeitigkeitsgrenze je Plan-Stufe in den Standardplänen.** Die Standardpläne von RustDesk Pro enthalten unbegrenzte gleichzeitige Verbindungen, und nur Customized V2 lizenziert eine feste Anzahl; bei AnyDesk hängen die Kontingente vom Plan ab. Beziehen Sie Login-Benutzer und Geräte in das Kostenmodell ein, und sehen Sie sich die [Upgrade-Berechnung](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es) an, bevor Sie Kapazität hinzufügen.
- **Adressbuch, Aliase und unbeaufsichtigten Zugriff neu aufbauen.** Erfassen Sie die AnyDesk-Aliase, Adressbucheinträge und Passwörter für den unbeaufsichtigten Zugriff, auf die Sie angewiesen sind, und bilden Sie sie auf RustDesk-Login-Benutzer, Gerätegruppen und das gemeinsame Adressbuch ab.
- **Benutzerdefinierter Namespace oder gebrandeter Client.** Wenn Sie AnyDesk mit einem benutzerdefinierten Namespace oder gebrandeten Client betreiben, planen Sie den entsprechenden individuell gebrandeten RustDesk-Client, damit Endnutzer weiterhin ein einheitliches Tool sehen.

## Migrationsplan

Sind diese Funktionen erst einmal erfasst, migrieren Sie schrittweise:

1. Richten Sie RustDesk in einer Nicht-Produktionsumgebung ein und testen Sie sowohl Direkt- als auch Relay-Verbindungen.
2. Bilden Sie Benutzer, Gruppen und Adressbuch-Zuständigkeiten auf RustDesk-Zugriffsregeln nach dem Prinzip der geringsten Rechte ab.
3. Testen Sie repräsentative Windows-, macOS-, Linux- und Mobilgeräte in einem Pilotprojekt, einschließlich Rechteerhöhung und unbeaufsichtigtem Zugriff.
4. Validieren Sie Updates, Schlüssel-Backups, Zertifikatserneuerung, Logging, Monitoring und Disaster Recovery.
5. Betreiben Sie Ihr aktuelles Tool und RustDesk für eine definierte Gruppe parallel, mit einem dokumentierten Rollback-Pfad.
6. Entfernen Sie den alten Agenten erst, nachdem der neue Dienst die Abnahmekriterien erfüllt hat und das Support-Personal geschult ist.

Diese Reihenfolge verhindert, dass aus einer Lizenzentscheidung eine ungetestete Infrastruktur-Umstellung wird.

## Testen Sie den Wechsel auf Ihrer eigenen Infrastruktur

Um loszulegen, müssen Sie mit niemandem sprechen: Server OSS lässt sich auf Ihrer eigenen Hardware installieren und ist kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum. Um die Pro-Funktionen anhand des oben beschriebenen Migrationsplans zu testen, erfragen Sie unter [sales@rustdesk.com](mailto:sales@rustdesk.com) die aktuellen Evaluierungskonditionen; die Preise der Standardpläne finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing). Wenn Sie es zuerst in Aktion sehen möchten, zeigt die [Video-Demo](https://www.youtube.com/@rustdesk) eine komplette Sitzung von Anfang bis Ende.

Der schnellste Weg herauszufinden, ob Self-Hosting bei Kosten und Kontrolle liefert, ist ein kurzer Proof of Concept auf Ihrer eigenen Hardware.
