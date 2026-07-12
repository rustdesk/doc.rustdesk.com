---
publishDate: 2026-07-04T17:05:00Z
lang: 'de'
translationKey: 'remote-desktop-data-sovereignty-gdpr'
draft: false
title: 'Remote-Desktop-Datensouveränität & DSGVO: Self-Hosting'
excerpt: 'Wie Self-Hosting regulierten Teams die Kontrolle über Rendezvous-, Relay- und Gerätedaten gibt – und welche DSGVO- und Compliance-Fragen offen bleiben.'
image: '~/assets/images/blog/remote-desktop-data-sovereignty-gdpr-og.png'
category: 'Sicherheit'
tags: ['RustDesk', 'Sicherheit', 'GDPR', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'remote-desktop-datensouveranitat-and-dsgvo-self-hosting'
faq:
  - question: 'Ist RustDesk ISO-27001-, SOC-2- oder HIPAA-konform?'
    answer: 'RustDesk wird selbst gehostet, weshalb Compliance vor allem von Ihrer eigenen Umgebung abhängt: Sie betreiben Remote-Access innerhalb Ihres eigenen ISO-27001- oder HIPAA-Geltungsbereichs und Ihrer bestehenden Kontrollen, und die Open-Source-Software lässt sich direkt prüfen, statt ihr blind vertrauen zu müssen. Falls Sie ausdrücklich einen SOC-2-Bericht des Anbieters, eine unterzeichnete BAA, eine DPA oder ausgefüllte Sicherheitsfragebögen benötigen, erfragen Sie bei sales@rustdesk.com, was für Ihr Szenario verfügbar ist.'
  - question: 'Hilft das Self-Hosting von RustDesk bei der DSGVO-Compliance?'
    answer: 'Ja – es gibt Ihnen genau die Kontrolle, um die es bei der DSGVO in der Regel geht: Sie entscheiden, wo ID/Rendezvous, Relay, Konsole und Gerätedaten liegen, und können diese regional auf einer von Ihnen betriebenen Infrastruktur halten. Das ist ein solides Fundament, aber keine automatische Garantie, denn die DSGVO ist ein fortlaufendes Programm – Rechtsgrundlage, Rollen von Verantwortlichem und Auftragsverarbeiter, Aufbewahrung, Zugriffskontrolle, Standorte der Endpunkte und Vorfallreaktion müssen weiterhin von Ihnen definiert werden, wobei die Verantwortung weiterhin beim Verantwortlichen liegt.'
  - question: 'Wohin gehen die Sitzungsdaten von RustDesk tatsächlich?'
    answer: 'RustDesk versucht zunächst eine direkte Peer-to-Peer-Verbindung; schlägt dies fehl, läuft der Datenverkehr über Ihr konfiguriertes Relay. Self-Hosting entfernt einen vom Anbieter betriebenen Rendezvous- und Relay-Dienst aus dem Datenpfad, aber eine Sitzung zwischen Endpunkten in unterschiedlichen Ländern durchquert weiterhin deren Netzwerke – der Serverstandort allein begrenzt den Datenverkehr nicht auf einen einzigen Rechtsraum.'
  - question: 'Kann ich Remote-Desktop-Daten mit RustDesk innerhalb der EU halten?'
    answer: 'Sie können ID/Rendezvous, Relay, Konsole und gespeicherte Gerätedaten in einem EU-Rechenzentrum platzieren. Um auch den Sitzungsverkehr einzugrenzen, müssen sich beide Endpunkte innerhalb dieser Grenze befinden, und eine Richtlinie muss den Datenverkehr über Ihr genehmigtes Relay erzwingen; dokumentieren Sie die Standorte der Endpunkte und das Routing zusätzlich zum Serverstandort.'
  - question: 'Welche RustDesk-Funktionen unterstützen die Einhaltung der DSGVO?'
    answer: 'Self-Hosting hält Daten auf einer Infrastruktur, die Sie kontrollieren: Die Nutzungstelemetrie, die der gehostete RustDesk-Dienst sonst verarbeiten würde, verbleibt beim Self-Hosting auf Ihrem eigenen Server, und über die Lizenzprüfung von Server Pro hinaus muss kaum etwas anderes rustdesk.com erreichen. Server Pro ergänzt dies um integrierte Audit-Logs mit Log-Rotation, granulare Zugriffskontrolle und eine Control Role, SSO/LDAP sowie 2FA für gesteuerte Geräte, einen Datenschutzmodus mit Zustimmung je Verbindung sowie die direkte Löschung von Benutzern, Geräten und Datensätzen (auch über die REST-API) für Lösch- und Aufbewahrungsanfragen.'
metadata:
  description: 'Datensouveränität bei Remote-Desktop & DSGVO: Was Self-Hosting kontrolliert, wie sich direkte und weitergeleitete Sitzungen unterscheiden und warum Compliance mehr braucht als nur den Serverstandort.'
  keywords: 'Datensouveränität Remote Desktop, DSGVO Fernzugriff, Datenresidenz Remote Desktop, Compliance selbst gehosteter Fernzugriff'
---

Wenn Ihr Unternehmen der DSGVO unterliegt, branchenspezifische Datenschutzregeln im Gesundheitswesen einhalten muss oder im öffentlichen Sektor an die Vorgabe „Unsere Daten bleiben auf unserer eigenen Infrastruktur“ gebunden ist, entscheidet eine einzige Frage darüber, welche Remote-Desktop-Tools überhaupt in die engere Auswahl kommen: **Wohin gehen die Sitzungsdaten eigentlich?**

Bei den meisten gängigen Remote-Access-Produkten lautet die Antwort: „über die Cloud des Anbieters“. Ihr Techniker verbindet sich, Ihr Endpunkt verbindet sich, und der Datenverkehr wird über Server vermittelt, die Ihnen nicht gehören – in einem Rechtsraum, den Sie möglicherweise nicht kontrollieren. Für viele Käufer ist das kein Problem. Für regulierte Teams ist es dagegen ein Compliance-Problem, noch bevor überhaupt ein Bildschirm geteilt wurde.

In diesem Leitfaden geht es um **Datensouveränität bei Remote-Desktop-Lösungen**: was sie bedeutet, warum sie für regulierte und europäische Käufer wichtig ist, und welche Teile eines Remote-Access-Deployments Sie durch Self-Hosting kontrollieren können. Als praktisches Beispiel verwenden wir RustDesk.

## Was „Datensouveränität“ bei Remote-Access bedeutet

Datensouveränität ist das Prinzip, dass Daten den Gesetzen des Landes unterliegen, in dem sie physisch gespeichert und verarbeitet werden. Beim Remote-Support sind die sensiblen Daten nicht nur die übertragenen Dateien – es ist die Sitzung selbst: das, was auf dem Bildschirm zu sehen ist, die Liste der verwalteten Geräte, die Verbindungsmetadaten und häufig auch das Routing der Pixel in Echtzeit.

Die zentralen Fragen lauten: **Welche Systeme speichern Metadaten, welche Systeme leiten den Datenverkehr weiter, und wo befinden sich beide Endpunkte?** Self-Hosting kann einen vom Anbieter betriebenen Rendezvous- oder Relay-Dienst aus dem Datenpfad entfernen, kann aber nicht garantieren, dass eine Sitzung zwischen Endpunkten in unterschiedlichen Ländern innerhalb eines einzigen Rechtsraums bleibt.

## Der entscheidende Unterschied: Anbieter-Cloud vs. eigene Infrastruktur

Hier entscheidet die Architektur – nicht das Marketing – über das Ergebnis.

**RustDesk Server Pro wird selbst gehostet.** Der ID-/Rendezvous-Server, der Relay-Server, die Web-Konsole und die Daten der verwalteten Geräte laufen auf einer Infrastruktur, die Sie selbst wählen. RustDesk versucht zunächst, per Hole-Punching eine direkte Peer-to-Peer-Verbindung herzustellen; schlägt dies fehl, läuft der Sitzungsverkehr über Ihr konfiguriertes Relay. Das gibt Ihnen die Kontrolle über die Rendezvous-/Relay-Ebene und die gespeicherten Gerätedaten, aber die Endpunkte und ihre Netzwerkrouten bestimmen weiterhin, wohin direkter Datenverkehr fließt.

|                                    | Anbieter-Cloud-Tools              | Selbst gehostetes RustDesk                                                                                  |
| ---------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Wo Sitzungen koordiniert werden    | Cloud des Anbieters               | Ihr ID-/Rendezvous-Server                                                                                   |
| Wo der Sitzungsverkehr verläuft    | Vom Anbieter festgelegtes Routing | Direkt zwischen den Endpunkten, wenn möglich; andernfalls über Ihr Relay                                    |
| Wer die Datenresidenz kontrolliert | Der Anbieter                      | Sie wählen den serverseitigen Standort und die Relay-Richtlinie; die Endpunkte spielen weiterhin eine Rolle |
| Prüfbarkeit des Clients            | Meist Closed Source               | [Open Source (AGPL)](https://github.com/rustdesk/rustdesk) – selbst lesen und kompilieren                   |
| Wer den Server betreibt            | Anbieter                          | Ihr Team                                                                                                    |

Teams, die Self-Hosting evaluieren, nennen häufig die Möglichkeit, Standort und Betreiber der Rendezvous-, Relay- und Verwaltungssysteme selbst zu wählen. Das ist eine wichtige Kontrollmöglichkeit, muss aber zusammen mit den Standorten der Endpunkte und dem Routing-Verhalten dokumentiert werden.

## Vorteil 1: Sie kontrollieren den serverseitigen Datenstandort

Wenn Sie die ID-, Relay- und Verwaltungsdienste in einem deutschen Rechenzentrum platzieren, können Sie dokumentieren, wo diese Dienste und ihre gespeicherten Daten liegen. Befinden sich zusätzlich beide Endpunkte innerhalb der geforderten Grenze und erzwingt eine Richtlinie den Datenverkehr über ein genehmigtes Relay, lässt sich eine stärker eingegrenzte Route gestalten. Ohne diese zusätzlichen Kontrollen stellt der Serverstandort allein noch nicht sicher, dass der gesamte Sitzungsverkehr in Deutschland bleibt.

## Vorteil 2: Open Source bedeutet, Sie können es beweisen – nicht nur glauben

Bei Datensouveränität geht es nicht nur um den Standort – es geht darum, zu wissen, was die Software tut. Der Kern von RustDesk ist **Open Source unter der AGPL**. Sie (oder Ihr Sicherheitsteam) können den Code lesen, genau prüfen, was der Client tut, ihn selbst kompilieren und den kostenlosen Community-Server unbegrenzt betreiben. Diese Prüfbarkeit ist beim Remote-Access wichtiger als sonst: Weil der Software zugetraut wird, einen Rechner vollständig zu steuern, wollen Käufer in regulierten Branchen zunehmend selbst überprüfen, was ein Client tut, statt sich auf das Wort des Anbieters zu verlassen. Den Client selbst untersuchen zu können, ist eine konkrete Antwort auf die Frage „Woher wissen wir das?“

## Vorteil 3: Souveränität ohne Lizenzaufschlag

Die Standard-Pläne von RustDesk werden **pro Login-Benutzer plus pro verwaltetem Gerät** lizenziert und beinhalten unbegrenzt viele gleichzeitige Verbindungen; [Customized V2](https://rustdesk.com/pricing#custom2) begrenzt und bepreist gleichzeitige Verbindungen dagegen separat. Sie können [eine Lizenz upgraden](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es), wenn sich Ihre Anforderungen ändern. Prüfen Sie vor dem Kauf die aktuelle Plan-Matrix.

Die Architektur skaliert zudem mit Ihrem Gerätebestand: RustDesk veröffentlicht [Planungshinweise für große Flotten](/de/blog/skaliert-rustdesk-auf-200-000-gerate) für Teams, die größere Deployments evaluieren. Für [benutzerbezogene Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) umfassen selbst gehostete Deployments eine [Web-Konsole](https://rustdesk.com/docs), einen Generator für individuell gebrandete Clients, Gerätegruppen mit gemeinsamem Adressbuch sowie [LDAP/SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/) (OIDC), verfügbar ab dem Basic-Plan.

## Wie RustDesk zu ISO-27001-, SOC-2- oder HIPAA-Anforderungen passt

Beschaffungsteams in Unternehmen und im Gesundheitswesen fragen fast immer, wie sich ein Remote-Access-Tool in ISO 27001, SOC 2 oder HIPAA einordnet. Bei einem Cloud-Produkt übernehmen Sie die Zertifizierung der Infrastruktur _des Anbieters_ – und sind davon abhängig. Das Modell von RustDesk ist anders, und für regulierte Teams wirkt sich dieser Unterschied meist positiv aus: Weil Sie **selbst hosten**, läuft der Remote-Access innerhalb der Umgebung, die Sie bereits kontrollieren und prüfen – er fällt also unter _Ihren_ ISO-27001- oder HIPAA-Geltungsbereich und _Ihre_ bestehenden Kontrollen, nicht unter die eines Dritten. Sie platzieren ID, Relay und Konsole auf einer Infrastruktur, die Ihr Programm bereits abdeckt, und – weil RustDesk [Open Source](https://github.com/rustdesk/rustdesk) ist – kann Ihr Sicherheitsteam im Rahmen einer Bewertung genau lesen und verifizieren, was die Software tut, anstatt einer Closed-Source-Binärdatei vertrauen zu müssen.

Ein paar praktische Hinweise:

- Self-Hosting hält die sensiblen Systeme – Rendezvous, Relay, Konsole und Gerätedaten – auf Hardware, die Ihnen gehört, was genau das ist, was eine Kontrolle zur Datenresidenz oder zu HIPAA in der Regel sicherstellen soll. Die weiter unten stehende Deployment-Checkliste macht daraus dokumentierte Kontrollen.
- Wenn Ihr Einkauf ausdrücklich einen SOC-2-Bericht des Anbieters, eine unterzeichnete Business Associate Agreement (BAA), eine DPA oder ausgefüllte Sicherheitsfragebögen benötigt, wenden Sie sich an das RustDesk-Team unter [sales@rustdesk.com](mailto:sales@rustdesk.com) und erfragen Sie, was für Ihr Szenario aktuell verfügbar ist.
- Da RustDesk Open Source ist, wird die Frage „Woher wissen wir, was die Software tut?“ durch eigene Prüfung beantwortet – nicht durch ein Zertifikat, dem Sie blind vertrauen müssen.

Kurz gesagt: Self-Hosting erlaubt es Ihnen, Remote-Access in das Compliance-Programm einzubetten, das Sie bereits betreiben – für ein reguliertes Team häufig eine stärkere Position, als eine zertifizierte Black Box zu mieten.

## Kontrollen, die ein selbst gehostetes DSGVO-Programm unterstützen

Self-Hosting ist das Fundament, und darauf aufbauend bietet RustDesk konkrete Kontrollen, auf die sich selbst hostende Teams verlassen, um die DSGVO in der Praxis zu erfüllen:

- **Telemetrie geht an Ihren Server, nicht an RustDesk.** Die in der Datenschutzerklärung von RustDesk beschriebenen Nutzungsdaten – App-Start, IP-Adresse, grundlegende Gerätestatistiken, Sitzungszeiten und RustDesk-IDs – werden vom **öffentlichen gehosteten Dienst** von RustDesk verarbeitet; wenn Sie Ihre eigenen ID-/Rendezvous- und Relay-Server betreiben, verbleiben diese Daten stattdessen auf **Ihrer** Infrastruktur. Über die Lizenzprüfung von Server Pro hinaus muss kaum etwas anderes rustdesk.com erreichen – prüfen Sie die genauen ausgehenden Verbindungen für den jeweiligen Client-Build und die Einstellungen, die Sie einsetzen. Dadurch bleiben Sitzungs- und Nutzungsdaten standardmäßig auf einer Infrastruktur, die Sie kontrollieren – eine starke Grundhaltung zur Datenminimierung.
- **Integrierte Audit-Log-Rotation und Aufbewahrung.** Die Audit-Logs von Server Pro gliedern sich in vier Kategorien – Verbindung, Dateiübertragung, Alarm und Konsolenbedienung – mit **integrierter Log-Rotation**, sodass Audit-Daten nicht unbegrenzt aufbewahrt werden (Speicherbegrenzung), und Sie können sie über die Web-Konsole oder die REST-API für Ihr Verzeichnis von Verarbeitungstätigkeiten exportieren.
- **Granularer, klar abgegrenzter Zugriff.** Zuweisungen pro Benutzer, Gerätegruppen, gruppenübergreifende Regeln und eine Control Role (was ein Techniker während einer Sitzung tun darf – Tastatur/Maus, Zwischenablage, Dateiübertragung, Audio, Kamera, Terminal, Drucken, Aufzeichnung und mehr) setzen das Prinzip der geringsten Rechte und die Zweckbindung durch, unterstützt durch SSO/LDAP und 2FA für gesteuerte Geräte.
- **Datenschutzmodus und Zustimmung je Verbindung.** Die gesteuerte Seite kann eine Bestätigung für eingehende Verbindungen verlangen und ihren Bildschirm während einer Sitzung schwärzen (Datenschutzmodus, unterstützt unter Windows und macOS), wodurch die unbeabsichtigte Sichtbarkeit personenbezogener Daten auf dem Bildschirm eingeschränkt wird.
- **Löschung nach Ihren Vorgaben.** Da die Daten auf Ihrem Server liegen, können Sie Benutzer deaktivieren oder entfernen, Geräte und Datensätze löschen – auch über die REST-API – und Lösch- sowie Aufbewahrungsanfragen direkt bearbeiten.
- **Regionale, selbst betriebene Infrastruktur.** ID/Rendezvous, Relay, Konsole und gespeicherte Daten laufen dort, wo Sie sie platzieren – auf Hardware, die Sie kontrollieren.
- **Selbst individuelle Client-Builds hinterlassen keine Daten.** Das Erzeugen eines individuell gebrandeten Clients ist der einzige Schritt, der den Build-Dienst von RustDesk nutzt, und er ist bewusst so konzipiert, dass nichts dauerhaft gespeichert bleibt: Die von Ihnen übermittelte Build-Konfiguration wird auf dem Build-Server von RustDesk nicht dauerhaft gespeichert (sie wird nach Abschluss des Builds gelöscht), und der erzeugte Installer wird nach etwa einem Tag automatisch entfernt, sodass Sie ihn selbst herunterladen und aufbewahren müssen.

Das sind Hebel, die ein DSGVO-Programm tatsächlich betätigen kann: Sie müssen sie weiterhin dokumentieren und betreiben, warten aber nicht darauf, dass ein Anbieter auf eine Anfrage einer betroffenen Person reagiert.

## Souveränität, auf die Sie verweisen können

Wenn Sie Rendezvous, Relay, Konsole und gespeicherte Daten selbst hosten, erhält Ihr Compliance-Programm etwas Konkretes: Infrastruktur, die Sie platzieren, betreiben und prüfen. Das ist ein Fundament, keine Ziellinie – aber genau der Teil, auf dem alles andere aufbaut.

## Checkliste für DSGVO- und Souveränitäts-Deployments

Self-Hosting eröffnet Ihnen Wahlmöglichkeiten; das Deployment muss diese Wahlmöglichkeiten in konkrete Kontrollen umsetzen:

- Dokumentieren Sie, wo sich ID-Server, Relay, Konsole, Backups, Logs und Administratoren befinden.
- Erfassen Sie direkte Peer-to-Peer-Routen getrennt von Routen über das Relay. Ein Server in Deutschland hält eine direkte Sitzung zwischen Deutschland und einem anderen Land nicht automatisch innerhalb Deutschlands.
- Legen Sie fest, wann das Relay erzwungen werden muss, weil das Routing über einen kontrollierten Standort wichtiger ist als die Peer-to-Peer-Performance.
- Halten Sie Zweck, Aufbewahrungsdauer und Zugriffsrichtlinie für Geräte-, Konto-, Audit- und Verbindungsmetadaten fest.
- Setzen Sie Gerätegruppen nach dem Prinzip der geringsten Rechte, MFA/SSO (sofern verfügbar) und einen Joiner-Mover-Leaver-Prozess für Techniker ein.
- Stellen Sie die Web-Konsole hinter HTTPS, schränken Sie den administrativen Netzwerkzugriff ein und testen Sie die Wiederherstellung von Backups.
- Führen Sie je nach Anwendungsfall die passende rechtliche Bewertung durch – etwa ein Verzeichnis von Verarbeitungstätigkeiten, eine Prüfung der Auftragsverarbeiter, eine Transfer-Folgenabschätzung und eine Datenschutz-Folgenabschätzung (DSFA).

RustDesk kann eine Souveränitätsarchitektur unterstützen, doch die Verantwortung für die Architektur und ihre Rechtsgrundlage liegt weiterhin beim Verantwortlichen.

## Testen Sie es innerhalb Ihres eigenen Perimeters

Sie können ganz nach Ihren eigenen Bedingungen testen. Hosten Sie noch heute den kostenlosen Open-Source-Community-Server selbst, oder schreiben Sie eine E-Mail an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die aktuellen Testbedingungen für die Pro-Funktionen zu erfahren. Die aktuellen Pläne und genauen Funktionen finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing). Sie möchten sich lieber zuerst einen Überblick verschaffen? Auf dem [RustDesk-YouTube-Kanal](https://www.youtube.com/@rustdesk) gibt es eine vollständige Video-Anleitung.
