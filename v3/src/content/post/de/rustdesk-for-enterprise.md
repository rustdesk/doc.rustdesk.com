---
publishDate: 2026-06-29T16:16:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: rustdesk-for-enterprise
draft: false
title: 'RustDesk für Unternehmen: Self-Hosted, skalierbar, AD-bereit'
excerpt: 'Warum Unternehmens-IT-Teams RustDesk wählen: selbst gehostete Datenkontrolle, AD/LDAP, Zugriffskontrolle über Gerätegruppen und planbare Preise für große Flotten.'
image: ~/assets/images/blog/rustdesk-for-enterprise-og.webp
category: 'Anleitungen'
tags: ['RustDesk', 'Unternehmen', 'Selbst-Hosting']
author: RustDesk Team
slug: 'rustdesk-fur-unternehmen-self-hosted-skalierbar-ad-bereit'
faq:
  - question: 'Lässt sich RustDesk in der gesamten Unternehmensflotte massenhaft bereitstellen?'
    answer: 'Ja. RustDesk stellt ein Windows-MSI-Paket für die stille, unbeaufsichtigte Installation per msiexec bereit, das sich über Gruppenrichtlinien (GPO), Microsoft Intune, ein RMM oder Paketierungstools verteilen lässt. Der Generator für individuelle Clients (ab dem Basic-Plan) liefert zudem einen Client, der bereits auf Ihren eigenen Server vorkonfiguriert ist.'
  - question: 'Verfügt RustDesk über eine REST-API?'
    answer: 'Ja. RustDesk Server Pro stellt eine REST-API bereit, die über in der Web-Konsole erstellte API-Tokens autorisiert wird, dazu Python-CLI-Verwaltungstools. Skripte können Geräte aufnehmen, auflisten, zuweisen und entfernen sowie Benutzer, Gruppen, Adressbücher und Audit-Logs in großer Zahl verwalten, statt alles nur über die Web-Konsole zu erledigen.'
  - question: 'Unterstützt RustDesk Active Directory und SSO für die Identitätsverwaltung im Unternehmen?'
    answer: 'Ja. RustDesk Server Pro enthält ab dem Basic-Plan LDAP/Active Directory und OIDC-SSO, sodass sich Techniker an Ihrer bestehenden Identitätsquelle authentifizieren statt an einer separaten Benutzerliste. Der Individual-Plan enthält weder LDAP/AD noch OIDC-SSO.'
  - question: 'Können Unternehmen RustDesk-Daten auf ihrer eigenen Infrastruktur behalten?'
    answer: 'Ja, das ist das Kernmodell von RustDesk Server Pro. Sie hosten ID-/Rendezvous-Server, Relay, Web-Konsole und gespeicherte Gerätedaten selbst auf Infrastruktur, die Sie betreiben. Direkte Sitzungen laufen zwischen den Endpunkten, weitergeleitete Sitzungen über Ihr eigenes Relay; dokumentieren Sie daher das Routing der Endpunkte zusammen mit der Platzierung der Server.'
  - question: 'Wie funktioniert die RustDesk-Preisgestaltung für große Flotten?'
    answer: 'RustDesk Server Pro lizenziert Login-Benutzer und verwaltete Geräte, und die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen; nur Customized V2 lizenziert eine feste Anzahl gleichzeitiger Verbindungen. Upgrades sind jederzeit möglich: Sie verlängern die Lizenz auf ein volles Jahr ab dem Upgrade-Datum und rechnen den verbleibenden bezahlten Wert an. Ermitteln Sie beide Mengen unter rustdesk.com/pricing.'
metadata:
  description: 'RustDesk für Unternehmen: ID, Relay und Konsole selbst hosten, LDAP/AD und OIDC-SSO, Zugriffskontrolle per Gerätegruppe, MSI-Rollout, unbegrenzte Verbindungen.'
  keywords: 'RustDesk für Unternehmen, RustDesk Unternehmenseinsatz, AD-integrierter Remote-Support, RustDesk Unternehmensarchitektur'
---

## Fernzugriff auf Infrastruktur, die Sie kontrollieren

RustDesk Server Pro betreibt ID-/Rendezvous-Server, Relay, Web-Konsole und Gerätedaten innerhalb Ihres Perimeters, mit LDAP/AD und OIDC-SSO ab dem Basic-Plan und unbegrenzten gleichzeitigen Verbindungen in den Standardplänen. Damit sind die Punkte abgedeckt, um die sich Evaluierungen im Unternehmen meist drehen: Infrastrukturkontrolle, Identität, Zugriffsrichtlinien, Nachvollziehbarkeit, Skalierung und planbare Lizenzkosten.

Der Client von RustDesk und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der AGPL; Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten.

## Der entscheidende Unterschied: Sie hosten es, also kontrollieren Sie es

RustDesk Server Pro ist **selbst gehostet**: Ihr Team betreibt die Server, nicht ein Anbieter ([warum Teams sich für Self-Hosting entscheiden](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten)). Diese eine architektonische Tatsache ist die Grundlage für die meisten der folgenden Vorteile, und sie macht den **[AGPL-lizenzierten Client](https://github.com/rustdesk/rustdesk)** zu mehr als einem Verkaufsargument: Ein Sicherheitsteam, das jeden Agenten auf einem Produktions-Endpunkt rechtfertigen muss, kann den Quellcode lesen und den Client selbst bauen. „Wir können genau prüfen, was läuft“ wird so zu einem Punkt, den Sie in der Beschaffung tatsächlich abhaken können.

## Architekturfragen, die Unternehmen zuerst klären sollten

Bevor Sie Funktionsmatrizen vergleichen, legen Sie das Bereitstellungsdesign ausdrücklich fest:

| Entscheidung       | Was das Design festlegen muss                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identität          | OIDC- oder LDAP-Quelle, MFA-Richtlinie, Break-Glass-Zugriff und Lebenszyklus der Konten                                                                  |
| Autorisierung      | Zuständigkeit für Gerätegruppen, Technikerrollen, Grenzen für externe Dienstleister und Freigabemodell                                                   |
| Netzwerk           | Platzierung von ID- und Relay-Server, Richtlinie direkt vs. Relay, offene Ports und regionales Routing                                                   |
| Verfügbarkeit      | Kapazitätsannahmen, Monitoring, Backups, Wiederherstellungsziele und Multi-Relay-Design                                                                  |
| Endpunktverwaltung | Unterstützte Betriebssystemversionen, Client-Paketierung, Durchsetzung der Konfiguration und Update-SLA                                                  |
| Sicherheitsbetrieb | Logging, Aufbewahrung, Alarmierung, Reaktion auf Schwachstellen und Verantwortung für Vorfälle                                                           |
| Lizenzierung       | Benötigte Login-Benutzer, verwaltete Geräte und ein eventuelles Kontingent gleichzeitiger Verbindungen für [Customized V2](https://rustdesk.com/pricing#custom2) |

RustDesk liefert die Fernzugriffskomponenten und die Unternehmenskontrollen; Ihre Architektur entscheidet, ob diese die Anforderungen der Organisation an Verfügbarkeit, Compliance und Betrieb erfüllen.

## Datenkontrolle und Compliance

Self-Hosting ermöglicht es Ihnen, Standort und Betreiber von Rendezvous-Server, Relay, Konsole und gespeicherten Gerätedaten selbst zu bestimmen. Direkte Sitzungen laufen weiterhin zwischen den Endpunkten, sodass der Serverstandort allein weder Datenverkehr im Inland noch DSGVO-Konformität garantiert. Dokumentieren Sie den vollständigen [Datenfluss und die Compliance-Kontrollen](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting).

Server Pro zeichnet [Audit-Protokolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/audit-logs/) für Verbindungen, Dateiübertragungen, Alarme und Konsolenaktionen auf. Setzen Sie **Einstellungen > Sonstiges > Protokollaufbewahrung (Tage)** auf einen positiven Wert, damit ältere Protokolle automatisch gelöscht werden (die Bereinigung läuft stündlich); `0` bewahrt Protokolle unbegrenzt auf. Benutzer und Geräte lassen sich in der Konsole oder über die API deaktivieren oder löschen, um Löschanfragen zu bearbeiten. Als ausgehende Abläufe sollten Sie die Lizenzprüfung von Pro, den Build-Dienst für individuelle Clients, Client-Updates und jeden angebundenen externen Identitätsanbieter einplanen.

Das ist auch ein stiller Grund für kostengetriebene Migrationen. Viele Unternehmensteams sind nicht nur vom Preis frustriert; sie bezahlen für einen Cloud-Dienst und ein Funktionspaket, das sie gar nicht vollständig nutzen. Self-Hosting kehrt dieses Verhältnis um: Sie stellen genau das bereit, was Sie brauchen, und mieten nicht das Rechenzentrum eines anderen als verpflichtenden Mittelsmann.

## Skalierung und Lizenzierung gleichzeitiger Verbindungen

Unternehmensbereitstellungen scheitern auf zwei Achsen: an der technischen Obergrenze und an der Preisobergrenze. RustDesk adressiert beide.

Auf der technischen Seite verzeichnete der öffentliche RustDesk-Server am 7. Juli 2026 mehr als zwei Millionen Online-Endpunkte auf einem einzigen Host mit 12 Kernen und 32 GB (interne Telemetrie, kein geprüfter Benchmark und keine Garantie für Server Pro). Für Server Pro beschreibt der [Planungsleitfaden für 200.000 Geräte](/de/blog/skaliert-rustdesk-auf-200-000-gerate) die Datenbank-, Konsolen- und Relay-Last, die Sie in einem Pilotprojekt validieren sollten.

RustDesk berechnet **pro Login-Benutzer und pro verwaltetem Gerät**. Die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen; nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine feste Anzahl. Ein [Upgrade während der Laufzeit](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es) ist jederzeit möglich: Es verlängert die Lizenz auf ein volles Jahr ab dem Upgrade-Datum und rechnet den verbleibenden bezahlten Wert der aktuellen Lizenz an.

## AD/LDAP und die Zugriffskontrolle, die Ihre Administratoren erwarten

Fernzugriff im Unternehmen muss die Frage beantworten: „Wer kann auf welche Maschinen zugreifen, und können wir das nachweisen?“ Die kostenpflichtigen RustDesk-Pläne bieten **LDAP/SSO (OIDC) ab dem Basic-Plan**, sodass Sie den Technikerzugriff über die Identitätsquelle vergeben, die Sie ohnehin betreiben, statt eine parallele Benutzerliste zu pflegen.

Die [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) legt über Benutzerzuweisungen, Gerätegruppen und gruppenübergreifende Regeln fest, wer welche Geräte erreicht. Ein Gerät gehört zu einer Gerätegruppe, und die Berechtigungen aus Benutzergruppen und Gerätegruppen addieren sich. Das gemeinsame Adressbuch ordnet Geräteeinträge für Techniker; es ist keine Zugriffsgrenze. Die [Kontrollrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) begrenzt, was ein Techniker innerhalb einer Sitzung tun darf. Auch der Generator für individuelle Clients ist ab Basic verfügbar; [siehe die Plan-Matrix](https://rustdesk.com/pricing).

## Massenbereitstellung und Automatisierung

Fernzugriff manuell auf Tausenden Endpunkten auszurollen, ist von vornherein keine Option. Deshalb unterstützt RustDesk die gängigen Bereitstellungswege im Unternehmen. Unter Windows liefert es ein **MSI-Paket** für die stille, unbeaufsichtigte Installation per `msiexec /qn`, das Sie über **Gruppenrichtlinien (GPO), Microsoft Intune, ein RMM oder ein beliebiges Paketierungstool** verteilen können, mit Kommandozeilenparametern für Installationsort, Verknüpfungen und weitere Optionen. Kombinieren Sie das mit dem [Generator für individuelle Clients](https://rustdesk.com/docs/de/self-host/client-configuration/#1-benutzerdefinierter-client-generator-nur-pro-basisplan-oder-benutzerdefinierter-plan), sodass der verteilte Client von Haus aus auf Ihren eigenen Server und Ihre Einstellungen vorkonfiguriert ist, statt eine Einrichtung pro Rechner zu erfordern.

Für den Flottenbetrieb nutzen Sie die [Windows-MSI-Referenz](https://rustdesk.com/docs/de/client/windows/msi/), den [Leitfaden zur Client-Bereitstellung](https://rustdesk.com/docs/de/self-host/client-deployment/) und die [API- und CLI-Werkzeuge von Server Pro](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/console/#python-cli-verwaltungstools). Die Verwaltungswerkzeuge decken Benutzer, Geräte, Gruppen, Adressbücher, Richtlinien und Audits ab. Beschränken Sie die Berechtigungen von API-Tokens auf die jeweilige Aufgabe, und testen Sie Onboarding, Deaktivierung und Löschung in einem Pilotprojekt.

## Abnahmeprüfungen vor dem Rollout

Prüfen Sie vor dem Rollout die vorgesehene Zugriffsmatrix von Benutzern zu Geräten, die Wiederherstellung von Identitäten, den unbeaufsichtigten Zugriff, Client-Updates, die Relay-Kapazität zu Spitzenzeiten, die Protokollaufbewahrung und die Wiederherstellung aus Backups. Erst diese Abnahmeprüfungen machen aus der Kontrolle über selbst gehostete Infrastruktur eine betriebsfähige Unternehmensbereitstellung.

## Unternehmenskontrolle zu Ihren Bedingungen

Im Unternehmensmaßstab ist die Sache eindeutig: ID-/Relay-Server, Konsole und gespeicherte Daten liegen innerhalb Ihres Perimeters, angebunden an Ihr Identitätssystem und Ihre Zugriffsrichtlinien, ohne dass ein Anbieter den Kern betreibt. Genau diese Aufstellung fordern Einkaufs- und Sicherheitsteams, und RustDesk Server Pro ist dafür gebaut.

## Testen, bevor Sie sich festlegen

Sie können RustDesk **[ohne Vertriebsgespräch](https://www.youtube.com/@rustdesk)** evaluieren. Es gibt zwei Wege:

- **Validieren Sie die Architektur mit Server OSS.** Er ist kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum, und läuft in Ihrem eigenen Netzwerk – eine risikoarme Möglichkeit, Ihrem Sicherheitsteam das selbst gehostete Modell zu belegen.
- **Für die Pro-Funktionen – Identität, Zugriffskontrolle, Client-Generierung –** sehen Sie sich die aktuellen Pläne unter [rustdesk.com/pricing](https://rustdesk.com/pricing) an und schreiben Sie anschließend an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die für Ihre Organisation verfügbaren Evaluierungskonditionen zu erfahren.

In jedem Fall gilt: Stellen Sie einen Server in Ihrer eigenen Umgebung auf und validieren Sie ihn, bevor Sie sich festlegen.
