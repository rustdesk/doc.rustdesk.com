---
publishDate: 2026-07-04T17:05:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Remote-Desktop-Datensouveränität & DSGVO: Self-Hosting'
excerpt: 'Wie Self-Hosting regulierten Teams die Kontrolle über Rendezvous-, Relay- und Gerätedaten gibt – und welche DSGVO- und Compliance-Fragen offen bleiben.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.webp'
category: 'Sicherheit'
tags: ['RustDesk', 'Sicherheit', 'GDPR', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'remote-desktop-datensouveranitat-and-dsgvo-self-hosting'
faq:
  - question: 'Ist RustDesk ISO-27001-, SOC-2- oder HIPAA-konform?'
    answer: 'Selbst gehostetes RustDesk wird innerhalb Ihres eigenen Compliance-Programms bewertet: ID-/Rendezvous-Server, Relay-Server und Konsole laufen auf einer Infrastruktur, die Sie betreiben, und fallen damit wie der Rest Ihrer Umgebung unter Ihren ISO-27001-Geltungsbereich, Ihre SOC-2-Kontrollen oder Ihre HIPAA-Schutzmaßnahmen. Self-Hosting ist eine Bereitstellungsentscheidung, keine Zertifizierung. Nach verfügbaren Herstellerberichten, einem BAA, einem AVV oder anderen Nachweisen für den Einkauf fragen Sie sales@rustdesk.com.'
  - question: 'Hilft das Self-Hosting von RustDesk bei der DSGVO-Compliance?'
    answer: 'Ja – es verschafft Ihnen genau die Kontrolle, um die es bei der DSGVO meist geht: Sie entscheiden, wo ID-/Rendezvous-Server, Relay, Konsole und Gerätedaten liegen, und können sie in der Region auf einer Infrastruktur halten, die Sie selbst betreiben. Das ist ein solides Fundament, aber keine automatische Garantie, denn DSGVO-Compliance ist ein Programm: Rechtsgrundlage, Rollen von Verantwortlichem und Auftragsverarbeiter, Aufbewahrung, Zugriffskontrolle, Endpunktstandorte und Vorfallreaktion legen weiterhin Sie fest, und die Verantwortung bleibt beim Verantwortlichen.'
  - question: 'Wohin gehen die Sitzungsdaten von RustDesk tatsächlich?'
    answer: 'RustDesk versucht zuerst eine direkte Peer-to-Peer-Verbindung; schlägt sie fehl, läuft der Datenverkehr über Ihr konfiguriertes Relay. Self-Hosting entfernt einen vom Anbieter betriebenen Rendezvous- und Relay-Dienst aus dem Pfad, doch eine Sitzung zwischen Endpunkten in verschiedenen Ländern durchquert weiterhin deren Netze – der Serverstandort allein beschränkt den Datenverkehr nicht auf einen einzigen Rechtsraum.'
  - question: 'Kann ich Remote-Desktop-Daten mit RustDesk innerhalb der EU halten?'
    answer: 'Ja. Sie können ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Gerätedaten in einem EU-Rechenzentrum betreiben. Um auch den Sitzungsverkehr einzugrenzen, müssen sich beide Endpunkte innerhalb dieser Grenze befinden, und eine Richtlinie muss den Datenverkehr über Ihr genehmigtes Relay erzwingen; dokumentieren Sie Endpunktstandorte und Routing zusammen mit dem Serverstandort.'
  - question: 'Welche RustDesk-Funktionen unterstützen die Einhaltung der DSGVO?'
    answer: 'RustDesk Server Pro bietet Audit-Protokolle mit konfigurierbarer Aufbewahrung (Einstellungen > Sonstiges > Protokollaufbewahrung (Tage); 0 bewahrt Protokolle unbegrenzt auf), Zugriffskontrolle und Kontrollrollen für das Prinzip der geringsten Rechte, LDAP/OIDC-SSO, eine Zustimmung je Verbindung, den Datenschutzmodus unter Windows und macOS sowie das Löschen von Benutzern und Geräten über Konsole oder API für Löschanfragen. Mit Self-Hosting bestimmen Sie, wo all das läuft.'
metadata:
  description: 'Remote-Desktop-Datensouveränität & DSGVO: was Self-Hosting kontrolliert, direkte vs. Relay-Sitzungen und warum Compliance mehr als den Serverstandort braucht.'
  keywords: 'Datensouveränität Remote Desktop, DSGVO Fernzugriff, Datenresidenz Remote Desktop, Compliance selbst gehosteter Fernzugriff'
---

Wenn Ihr Unternehmen der DSGVO unterliegt, Datenschutzregeln im Gesundheitswesen einhalten muss oder im öffentlichen Sektor an die Vorgabe „Unsere Daten bleiben auf unserer eigenen Infrastruktur“ gebunden ist, entscheidet eine einzige Frage darüber, welche Remote-Desktop-Tools überhaupt in die engere Auswahl kommen: **Wohin gehen die Sitzungsdaten eigentlich?**

Bei einem vom Anbieter gehosteten Dienst betreibt in der Regel der Anbieter die Verbindungskoordination und speichert Verwaltungs- und Kontodaten. Die Sitzungsdaten selbst können direkt zwischen den Endpunkten fließen oder über ein Relay laufen. Eine Datenflussanalyse muss diese Pfade unterscheiden: „Über die Cloud vermittelt“ heißt nicht, dass jedes Bildschirmpaket die Cloud durchquert.

In diesem Leitfaden geht es um **Datensouveränität bei Remote-Desktop-Lösungen**: was sie bedeutet, warum sie für regulierte und europäische Käufer wichtig ist und welche Teile einer Fernzugriffsbereitstellung Sie durch Self-Hosting kontrollieren können. Als Praxisbeispiel dient RustDesk.

## Was „Datensouveränität“ beim Fernzugriff bedeutet

Datensouveränität ist das Prinzip, dass Daten den Gesetzen des Landes unterliegen, in dem sie physisch gespeichert und verarbeitet werden. Beim Remote-Support sind die sensiblen Daten nicht nur die übertragenen Dateien – es ist die Sitzung selbst: was auf dem Bildschirm zu sehen ist, die Liste der verwalteten Geräte, die Verbindungsmetadaten und häufig auch das Routing der Pixel in Echtzeit.

Die zentralen Fragen lauten: **Welche Systeme speichern Metadaten, welche Systeme leiten den Datenverkehr weiter, und wo befinden sich beide Endpunkte?** Self-Hosting kann einen vom Anbieter betriebenen Rendezvous- oder Relay-Dienst aus dem Pfad entfernen, aber nicht garantieren, dass eine Sitzung zwischen Endpunkten in verschiedenen Ländern in einem einzigen Rechtsraum bleibt.

## Der entscheidende Unterschied: Anbieter-Cloud vs. eigene Infrastruktur

Hier entscheidet die Architektur – nicht das Marketing – über das Ergebnis.

**RustDesk Server Pro wird selbst gehostet.** ID-/Rendezvous-Server, Relay-Server, Web-Konsole und die Daten der verwalteten Geräte laufen auf einer Infrastruktur, die Sie selbst wählen. RustDesk versucht zunächst, per Hole-Punching eine direkte Peer-to-Peer-Verbindung herzustellen; schlägt das fehl, läuft der Sitzungsverkehr über Ihr konfiguriertes Relay. Damit kontrollieren Sie die Rendezvous-/Relay-Ebene und die gespeicherten Gerätedaten; wohin direkter Datenverkehr fließt, bestimmen aber weiterhin die Endpunkte und ihre Netzwerkrouten.

|                                    | Anbieter-Cloud-Tools              | Selbst gehostetes RustDesk                                                                                  |
| ---------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Wo Sitzungen koordiniert werden    | Cloud des Anbieters               | Ihr ID-/Rendezvous-Server                                                                                   |
| Wo der Sitzungsverkehr verläuft    | Vom Anbieter festgelegtes Routing | Wenn möglich direkt zwischen den Endpunkten, andernfalls über Ihr Relay                                     |
| Wer die Datenresidenz kontrolliert | Der Anbieter                      | Sie wählen den serverseitigen Standort und die Relay-Richtlinie; die Endpunkte spielen weiterhin eine Rolle |
| Prüfbarkeit des Clients            | Meist Closed Source               | [Open Source (AGPL)](https://github.com/rustdesk/rustdesk) – selbst lesen und bauen                         |
| Wer den Server betreibt            | Der Anbieter                      | Ihr Team                                                                                                    |

Teams, die Self-Hosting evaluieren, nennen diese Kontrolle oft zuerst: Standort und Betreiber der Rendezvous-, Relay- und Verwaltungssysteme selbst zu wählen.

## Vorteil 1: Sie kontrollieren den serverseitigen Datenstandort

Platzieren Sie die ID-, Relay- und Verwaltungsdienste in einem deutschen Rechenzentrum, können Sie genau dokumentieren, wo diese Dienste und ihre gespeicherten Daten liegen. Halten Sie zudem beide Endpunkte innerhalb der geforderten Grenze und erzwingen Sie den Datenverkehr über das genehmigte Relay, lässt sich auch die Route der Sitzung eingrenzen.

## Vorteil 2: Dank Open Source können Sie den Client überprüfen

Der **Client und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der [AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**. Ihr Sicherheitsteam kann den Client-Code lesen, prüfen, was er auf einem Endpunkt tut, und ihn selbst bauen. Beim Fernzugriff ist das wichtiger als sonst: Der Software wird die vollständige Kontrolle über einen Rechner anvertraut, und Käufer in regulierten Branchen wollen zunehmend selbst überprüfen, was ein Client tut, statt sich auf das Wort des Anbieters zu verlassen.

## Vorteil 3: Ein anderes Lizenzmodell für den Server

Die Standardpläne von RustDesk werden **pro Login-Benutzer plus pro verwaltetem Gerät** lizenziert und enthalten unbegrenzte gleichzeitige Verbindungen; nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine festgelegte Anzahl gleichzeitiger Verbindungen. Sie können [eine Lizenz jederzeit upgraden](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es), wenn sich Ihre Anforderungen ändern.

Das Modell wächst mit Ihrem Gerätebestand: Der [Planungsleitfaden für große Geräteflotten](/de/blog/skaliert-rustdesk-auf-200-000-gerate) behandelt Bereitstellungen mit bis zu 200.000 Geräten. Server Pro ergänzt [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) pro Benutzer und Gerätegruppe sowie ab dem Basic-Plan LDAP/OIDC-SSO und die Generierung individueller Clients.

## Wie RustDesk zu ISO-27001-, SOC-2- oder HIPAA-Anforderungen passt

Einkaufs- und Gesundheitsteams in Unternehmen fragen fast immer, wie sich ein Fernzugriffstool auf ISO 27001, SOC 2 oder HIPAA abbilden lässt. Bei einem Cloud-Produkt sind Sie auf die Zertifizierung angewiesen, die der Anbieter für seine eigene Infrastruktur vorweist, und auf seine Regeln zur geteilten Verantwortung. Selbst gehostetes RustDesk funktioniert umgekehrt: ID-/Rendezvous-Server, Relay und Konsole laufen auf einer Infrastruktur, die Ihr Programm bereits abdeckt. Sie bewerten sie also im Rahmen Ihres eigenen ISO-27001-Geltungsbereichs, Ihrer SOC-2-Kontrollen oder Ihrer HIPAA-Schutzmaßnahmen, und Ihr Sicherheitsteam kann dabei den Quellcode des Clients einsehen. Self-Hosting ist eine Bereitstellungsentscheidung, keine Zertifizierung; erst die Bewertung holt sie in den Geltungsbereich.

Ein paar praktische Hinweise:

- Mit Self-Hosting wählen Sie Standort und Betreiber von Rendezvous-Server, Relay, Konsole und gespeicherten Verwaltungsdaten. Dokumentieren Sie zusätzlich Endpunkt-Routing, Backups und Administratorzugriff.
- Verlangt Ihr Einkauf ausdrücklich einen SOC-2-Bericht des Anbieters, ein unterzeichnetes Business Associate Agreement (BAA), einen Auftragsverarbeitungsvertrag (AVV) oder ausgefüllte Sicherheitsfragebögen, fragen Sie das RustDesk-Team unter [sales@rustdesk.com](mailto:sales@rustdesk.com), was für Ihr Szenario derzeit verfügbar ist.
- Weil der Client Open Source ist, beantwortet sich die Frage „Woher wissen wir, was er tut?“ durch Einsicht in den Code; Prüfberichte von Anbietern beantworten eine andere Frage des Einkaufs.

Kurz gesagt: Self-Hosting bindet den Fernzugriff in das Compliance-Programm ein, das Sie bereits betreiben. Für ein reguliertes Team ist das oft eine stärkere Position, als sich auf die Zertifizierung einer Infrastruktur zu verlassen, die Sie nicht einsehen können.

## Kontrollen, die ein selbst gehostetes DSGVO-Programm unterstützen

Self-Hosting ist das Fundament; darauf aufbauend bietet RustDesk konkrete Kontrollen, auf die sich selbst hostende Teams in einem DSGVO-Programm stützen:

- **Serverdaten bleiben dort, wo Sie sie platzieren – mit einer kurzen Liste ausgehender Abläufe.** Selbst gehostete ID-/Rendezvous-, Relay- und Pro-Verwaltungsdienste verarbeiten ihre Bereitstellungsdaten dort, wo Sie sie betreiben. Zu dokumentieren sind folgende ausgehende Abläufe: die Lizenzvalidierung von Pro (HTTPS zu rustdesk.com etwa einmal täglich), der Build-Dienst für individuelle Clients, Client-Updates, SMTP, falls Sie einen externen Mailserver konfigurieren, und jeder externe Identitätsanbieter, den Sie anbinden. Siehe den [Leitfaden zum Offline- und Air-Gapped-Betrieb von Server Pro](/de/blog/kann-rustdesk-server-pro-offline-oder-air-gapped-betrieben-werden).
- **Konfigurierbare Aufbewahrung der Audit-Protokolle.** Die [Audit-Protokolle von Server Pro](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/audit-logs/#sichtbarkeit-und-aufbewahrung-von-protokollen) erfassen Verbindungen, Dateiübertragungen, Alarme und Konsolenvorgänge. Unter **Einstellungen → Sonstiges → Protokollaufbewahrung (Tage)** bewahrt `0` alle Protokolle unbegrenzt auf; ein positiver Wert löscht ältere Protokolle, und die Bereinigung läuft einmal pro Stunde. Legen Sie die Aufbewahrung für Exporte und Backups gesondert fest.
- **Granularer, klar abgegrenzter Zugriff.** Die [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) legt über Zuweisungen pro Benutzer, Gerätegruppen und gruppenübergreifende Regeln fest, wer welche Geräte erreichen kann (Berechtigungen aus Benutzer- und Gerätegruppen addieren sich). Das gemeinsame Adressbuch ordnet nur Einträge; es ist keine Zugriffsgrenze. Die [Kontrollrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) begrenzt, was ein Techniker in der Sitzung tun darf – Tastatur/Maus, Zwischenablage, Dateiübertragung, Audio, Kamera, Terminal, Drucken, Aufzeichnung und mehr. Zusammen mit SSO/LDAP und 2FA auf gesteuerten Geräten setzen sie das Prinzip der geringsten Rechte und die Zweckbindung durch.
- **Datenschutzmodus und Zustimmung je Verbindung.** Die gesteuerte Seite kann für jede eingehende Verbindung eine Bestätigung verlangen, und der Datenschutzmodus (unter Windows und macOS) schwärzt während einer Sitzung den lokalen Bildschirm, sodass personenbezogene Daten auf dem Bildschirm seltener nebenbei sichtbar werden.
- **Löschung nach Ihren Vorgaben.** Da die Daten auf Ihrem Server liegen, können Sie Benutzer deaktivieren oder entfernen, Geräte und Datensätze löschen – auch über die REST-API – und Lösch- sowie Aufbewahrungsanfragen direkt bearbeiten.
- **Regionale, selbst betriebene Infrastruktur.** ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Daten laufen dort, wo Sie sie platzieren – auf Hardware, die Sie kontrollieren.
- **Builds individueller Clients sind kurzlebig.** Das Generieren eines gebrandeten Clients ist der einzige Schritt, der den Build-Dienst von RustDesk nutzt, und er ist bewusst kurzlebig: Die übermittelte Build-Konfiguration wird gelöscht, sobald der Build abgeschlossen ist, und der erzeugte Installer wird nach etwa einem Tag automatisch entfernt. Laden Sie ihn also herunter und legen Sie ihn in Ihrem eigenen freigegebenen Repository ab.

Das sind Hebel, die ein DSGVO-Programm tatsächlich betätigen kann: Sie müssen sie weiterhin dokumentieren und betreiben, warten aber nicht darauf, dass ein Anbieter auf die Anfrage einer betroffenen Person reagiert.

## Souveränität, auf die Sie verweisen können

Wenn Sie Rendezvous-Server, Relay, Konsole und gespeicherte Daten selbst hosten, erhält Ihr Compliance-Programm etwas Konkretes: Infrastruktur, die Sie platzieren, betreiben und prüfen. Das ist ein Fundament, keine Ziellinie – aber genau der Teil, auf dem alles andere aufbaut.

## Checkliste für eine DSGVO- und souveränitätsgerechte Bereitstellung

Self-Hosting eröffnet Ihnen Wahlmöglichkeiten; die Bereitstellung muss daraus konkrete Kontrollen machen:

- Dokumentieren Sie, wo sich ID-Server, Relay, Konsole, Backups, Protokolle und Administratoren befinden.
- Erfassen Sie direkte Peer-to-Peer-Routen getrennt von Routen über das Relay. Ein Server in Deutschland hält eine direkte Sitzung zwischen Deutschland und einem anderen Land nicht innerhalb Deutschlands.
- Legen Sie fest, wann das Relay erzwungen werden muss, weil das Routing über einen kontrollierten Standort wichtiger ist als die Peer-to-Peer-Performance.
- Halten Sie Zweck, Aufbewahrungsdauer und Zugriffsrichtlinie für Geräte-, Konto-, Audit- und Verbindungsmetadaten fest.
- Setzen Sie Gerätegruppen nach dem Prinzip der geringsten Rechte, MFA/SSO (sofern verfügbar) und einen Joiner-Mover-Leaver-Prozess für Techniker ein.
- Stellen Sie die Web-Konsole hinter HTTPS, schränken Sie den administrativen Netzwerkzugriff ein und testen Sie die Wiederherstellung von Backups.
- Führen Sie je nach Anwendungsfall die passende rechtliche Bewertung durch – etwa ein Verzeichnis von Verarbeitungstätigkeiten, eine Prüfung der Auftragsverarbeiter, eine Transferfolgenabschätzung und eine Datenschutz-Folgenabschätzung (DSFA).

RustDesk kann eine Souveränitätsarchitektur unterstützen, doch die Verantwortung für die Architektur und ihre Rechtsgrundlage liegt weiterhin beim Verantwortlichen.

## Evaluieren Sie innerhalb Ihres eigenen Perimeters

Sie können zu Ihren eigenen Bedingungen evaluieren. Hosten Sie Server OSS noch heute selbst, oder schreiben Sie an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die aktuellen Evaluierungsbedingungen für die Pro-Funktionen zu erfahren. Aktuelle Pläne und genaue Funktionen finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing). Lieber erst zuschauen? Auf dem [RustDesk-YouTube-Kanal](https://www.youtube.com/@rustdesk) gibt es eine vollständige Video-Anleitung.
