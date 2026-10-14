---
publishDate: 2026-07-07T18:21:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'why-self-host-remote-desktop-software'
draft: false
title: 'Warum Sie Ihre Remote-Desktop-Software selbst hosten sollten'
excerpt: 'Warum Teams nach TeamViewer und AnyDesk ihre Remote-Desktop-Software selbst hosten: Sie bestimmen, wo die Server laufen, wer sie betreibt und wofür Sie zahlen.'
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: 'Anleitungen'
tags: ['RustDesk', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten'
faq:
  - question: 'Was bedeutet es, Remote-Desktop-Software selbst zu hosten?'
    answer: 'Remote-Desktop-Software selbst zu hosten heißt, den Verbindungsserver (bei RustDesk den ID-/Rendezvous-Dienst) und das Ausweich-Relay auf Infrastruktur zu betreiben, die Sie kontrollieren, statt in der Cloud eines Anbieters. Mit RustDesk Server Pro liegen dort auch die Web-Konsole und die Gerätedaten; direkte Sitzungen laufen weiterhin von Endpunkt zu Endpunkt.'
  - question: 'Was bedeutet der Betrieb eines selbst gehosteten RustDesk-Servers konkret?'
    answer: 'Ein kleiner Linux-Host, einige offene Ports und routinemäßige Pflege. Stellen Sie eine VM bereit, öffnen Sie TCP 21115-21117 und UDP 21116 für native RustDesk-Clients, legen Sie Konsole und API von Server Pro hinter HTTPS auf Port 443, und planen Sie Backups, deren Wiederherstellung Sie getestet haben. Danach besteht die laufende Arbeit aus Patches, Monitoring, Relay-Kapazität und Zertifikatserneuerung.'
  - question: 'Hilft Self-Hosting bei Datenstandort und DSGVO-Konformität?'
    answer: 'Ja. Wenn Sie RustDesk selbst hosten, bestimmen Sie, wo ID-/Rendezvous-Server, Relay, Konsole und Gerätedaten laufen und wer sie betreibt – genau die Kontrolle, nach der Vorgaben zum Datenstandort fragen. Es ist eine Kontrolle über die Bereitstellung, keine Compliance-Zertifizierung: Direkte Sitzungen laufen weiterhin zwischen den Endpunkten, daher hängt die DSGVO-Konformität auch von Routing, Aufbewahrung und Ihrem gesamten Datenschutzprogramm ab.'
  - question: 'Ist Self-Hosting für jedes Team die richtige Wahl?'
    answer: 'Nein, aber es passt zu den meisten Teams, die bereits eigene Infrastruktur betreiben und die Kontrolle über ihre Fernzugriffsserver wollen. RustDesk Server OSS, der kostenlose Community-Server, kostet keine Lizenzgebühr, und RustDesk Server Pro ergänzt Web-Konsole, Zugriffskontrolle und SSO. Teams, die überhaupt keinen Server betreiben wollen, sind mit einem verwalteten Dienst besser bedient.'

metadata:
  description: 'Was für selbst gehostete Remote-Desktop-Software spricht: Sie bestimmen, wo die Server laufen und wer sie betreibt. Am Beispiel von Server OSS und Server Pro.'
  keywords: 'warum Remote-Desktop selbst hosten, Vorteile von selbst gehostetem Remote-Desktop, On-Premise-Fernzugriff, Remote-Desktop ohne Cloud eines Anbieters'
---

Die meisten Remote-Desktop-Tools werden auf eine einzige Weise verkauft: als Cloud-Abonnement, bei dem die Server des Anbieters Sitzungen koordinieren und weiterleiten, wenn kein direkter Weg möglich ist. Self-Hosting verlagert diese Rollen auf Infrastruktur, die Sie kontrollieren: Clients koordinieren sich über Ihren ID-/Rendezvous-Server, verbinden sich nach Möglichkeit direkt und weichen sonst auf Ihr Relay aus. Dieser Artikel legt dar, was dafür spricht – am konkreten Beispiel von RustDesk Server OSS (dem kostenlosen Community-Server) und Server Pro.

## Was „Remote-Desktop selbst hosten“ tatsächlich bedeutet

Der Preis der reinen Cloud-Bequemlichkeit ist, dass Ihre Geräteliste, Ihre Verbindungsmetadaten und manchmal auch Ihr Sitzungsverkehr über einen Dritten laufen – abhängig von dessen Verfügbarkeit, dessen Preisgestaltung und dessen Sicherheitsniveau.

Self-Hosting kehrt dieses Verhältnis um. Mit RustDesk betreibt Ihr Team den ID-/Rendezvous- und den Relay-Dienst, und Server Pro legt zusätzlich die Web-Konsole und die gespeicherten Gerätedaten auf Ihre Infrastruktur. Direkte Sitzungen fließen zwischen den Endpunkten; weitergeleitete Sitzungen nutzen Ihr Relay. **Client und Server OSS von RustDesk stehen unter der [AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**.

## Nur-Cloud vs. selbst gehostet im Überblick

|                                               | Typisches Nur-Cloud-Tool                                           | Selbst gehostet (RustDesk Server Pro)                                                                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wo Sitzungen vermittelt werden                | Cloud des Anbieters                                                | Ihr eigener Server vor Ort oder ein VPS                                                                                                                                                 |
| Datenstandort                                 | Vom Anbieter kontrolliert                                          | Serverseitige Dienste laufen auf Infrastruktur, die Sie kontrollieren; [Endpunkt-Routen spielen weiterhin eine Rolle](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) |
| Lizenzierte gleichzeitige Verbindungen/Kanäle | Kontingent je nach Plan                                            | Unbegrenzt in Standardplänen; Customized V2 mit lizenziertem Kontingent                                                                                                                 |
| Preismodell                                   | Produktspezifische Benutzer-, Endpunkt- und Verbindungskontingente | [Login-Benutzer plus verwaltete Geräte](https://rustdesk.com/pricing); Customized V2 lizenziert zusätzlich Gleichzeitigkeit                                                             |
| Quellcode                                     | Je nach Produkt, meist proprietär                                  | Auditierbarer AGPL-Client                                                                                                                                                               |
| Abhängigkeit bei Ausfällen                    | Verfügbarkeit des Anbieters                                        | Ihr eigener Betrieb                                                                                                                                                                     |
| Wer betreibt den Server                       | Anbieter                                                           | Sie                                                                                                                                                                                     |

Self-Hosting kostet Sie keine Funktionen. Für [MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool) und die interne IT ergänzt Server Pro eine selbst gehostete Web-Konsole mit [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) pro Benutzer und Gerätegruppe, dazu ab dem Basic-Plan einen Generator für individuelle Clients und [LDAP/OIDC-SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/). Es kostet Sie auch keine Skalierbarkeit: Der öffentliche RustDesk-Server verzeichnete am 7. Juli 2026 mehr als zwei Millionen Online-Endpunkte auf einem einzigen Host mit 12 Kernen und 32 GB (interne Telemetrie), und der [Planungsleitfaden für große Geräteflotten](/de/blog/skaliert-rustdesk-auf-200-000-gerate) beschreibt, was Sie für Server Pro validieren sollten.

## Was der Betrieb des Servers tatsächlich bedeutet

Diese Kontrolle bringt Betriebsaufwand mit sich: eine einmalige Einrichtung, danach routinemäßige Pflege. Hier die konkrete Liste:

- **Einen Host bereitstellen.** Die Hardwareanforderungen von RustDesk sind gering, sodass eine bescheidene Linux-VM – vor Ort oder ein preiswerter VPS – die ID-/Rendezvous- und Relay-Dienste betreiben kann. Dimensionieren Sie sie nach Ihrer Geräteanzahl und danach, wie viel Datenverkehr über das Relay statt Peer-to-Peer läuft.
- **Nur die benötigten Ports öffnen.** Native RustDesk-Clients benötigen **TCP 21115-21117 und UDP 21116** für NAT-Tests, Verbindungsdienste, Registrierung, Heartbeat und Relay. Geben Sie nicht den gesamten Bereich 21114-21119 frei. TCP 21118-21119 sind WebSocket-Backends, und TCP 21114 ist das Backend der Pro-HTTP-API/Konsole. Wenn ein HTTPS/WSS-Reverse-Proxy der Pro-API und den WebSocket-Diensten vorgeschaltet ist, geben Sie für diesen Datenverkehr öffentlich nur TCP 443 frei und halten Sie 21114 sowie 21118-21119 intern. Öffentliches 443 ersetzt nicht die Kern-Ports der nativen Clients, wenn sich auch native Clients verbinden. Siehe die [offizielle Port-Referenz](https://rustdesk.com/docs/de/self-host/).
- **TLS einrichten.** Terminieren Sie HTTPS und WSS am Reverse-Proxy, sodass Zugangsdaten, API-Aufrufe und der Datenverkehr des Browser-Clients über das öffentliche TCP 443 laufen, statt die Konsole/API im Klartext-HTTP oder die rohen WebSocket-Backends offenzulegen.
- **Backups anlegen.** Der Server enthält Ihr Geräteinventar, Benutzerkonten, das Adressbuch und die Zugriffsregeln. Planen Sie regelmäßige Backups – und testen Sie tatsächlich, dass Sie daraus wiederherstellen können.
- **Einen Patch-Rhythmus einhalten.** Im Laufe der Zeit erscheinen neue Server-Builds, und das darunterliegende Betriebssystem liegt in Ihrer Verantwortung. Legen Sie fest, wer Updates einspielt und wie oft.
- **Den Server überwachen.** Der koordinierende Dienst gehört jetzt Ihnen, also überwachen Sie Verfügbarkeit, Speicherplatz und Relay-Durchsatz und verantworten Alarmierung und Wiederherstellung selbst.

Für ein Team, das bereits Linux-Server betreibt, ist nichts davon exotisch. Legen Sie eine verantwortliche Person und einen Zeitplan für Updates, Backups, Zertifikatserneuerung und Wiederherstellungstests fest, dann läuft der Server als gewöhnliche Infrastruktur.

## So bewerten Sie Self-Hosting

- **Beginnen Sie mit Server OSS.** Setzen Sie ihn noch heute Nachmittag auf, prüfen Sie den Code und betreiben Sie ihn, so lange Sie möchten: Es gibt keine Lizenzgebühr und kein Ablaufdatum, nur Ihr eigenes Hosting und Ihre Bandbreite.
- **Brauchen Sie den Funktionsumfang von Pro?** Die aktuellen Preise finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing), und [sales@rustdesk.com](mailto:sales@rustdesk.com) sagt Ihnen, welche Evaluierungsoptionen es derzeit gibt.
- **Lieber erst zuschauen statt installieren?** Es gibt eine vollständige Video-Demo auf dem [RustDesk-YouTube-Kanal](https://www.youtube.com/@rustdesk).

Wenn Preisänderungen, geschlossener Code oder die Cloud eines Anbieters Sie auf die Suche geschickt haben, ist Self-Hosting die strukturelle Lösung, kein Rabatt: Sie bestimmen, wo die Server laufen und wer sie betreibt. Für ein Team, das bereits Infrastruktur betreibt, ist das ein nächster Schritt, kein Sprung: Starten Sie ein Pilotprojekt mit Server OSS, dimensionieren Sie das Relay für Ihre Spitzenlast an Sitzungen, und ziehen Sie die Flotte um, sobald der Arbeitsablauf trägt.
