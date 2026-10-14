---
publishDate: 2026-07-06T10:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'rustdesk-vs-splashtop'
draft: false
title: 'Selbst gehostete Splashtop-Alternative: Was Sie zuerst bewerten sollten'
excerpt: 'Ein Leitfaden zur Bewertung einer selbst gehosteten Splashtop-Alternative: Lizenzierung, Infrastruktur, Zuverlässigkeitsnachweise, Workflow-Tests und Migrationsrisiken.'
image: '~/assets/images/blog/rustdesk-vs-splashtop-og.webp'
category: 'Vergleiche'
tags: ['RustDesk', 'Splashtop', 'Vergleich']
author: 'RustDesk Team'
slug: 'selbst-gehostete-splashtop-alternative-was-sie-zuerst-bewerten-sollten'
faq:
  - question: 'Können sowohl RustDesk als auch Splashtop selbst gehostet werden?'
    answer: 'Ja, allerdings über unterschiedliche Produktmodelle. RustDesk Server OSS (der kostenlose Community-Server) und das kommerzielle Server Pro sind beide für das Self-Hosting gebaut. Splashtop bietet neben seinen gängigen, vom Anbieter betriebenen SaaS-Plänen ein separat lizenziertes, proprietäres On-Prem-Produkt mit einem vom Kunden betriebenen Gateway an.'
  - question: 'Welche Infrastruktur benötigt Splashtop On-Prem?'
    answer: 'Splashtop On-Prem nutzt ein vom Kunden betriebenes Splashtop Gateway, das in einer DMZ oder hinter der Unternehmens-Firewall installiert wird. Das Unternehmen plant Serverkapazität, Netzwerk, TLS, Monitoring, Backups, Upgrades und Verfügbarkeit selbst, und Splashtop veröffentlicht Systemanforderungen zu Betriebssystemen, Hardware-Dimensionierung und Ports des Gateways.'
  - question: 'Sollte ich selbst hosten oder einen vom Anbieter betriebenen Dienst nutzen?'
    answer: 'Hosten Sie selbst, wenn Ihr Team die serverseitigen Dienste betreiben will und Updates, Monitoring, Backups und Wiederherstellung übernehmen kann. Bei RustDesk ist das der Standard – mit einem AGPL-Client, dem kostenlosen RustDesk Server OSS und der kommerziellen Verwaltung in Server Pro; Splashtop verkauft es als separates On-Prem-Produkt. Wählen Sie einen vom Anbieter betriebenen SaaS-Dienst, wenn jemand anderes den Dienst betreiben soll.'
  - question: 'Wie sollte ein IT-Team einen Splashtop-Ersatz testen?'
    answer: 'Führen Sie einen parallelen Pilotbetrieb mit repräsentativen Benutzern, Endgeräten, Netzwerken und Support-Workflows durch. Definieren Sie Abnahmekriterien für Verbindungszuverlässigkeit, Remote-Audio, Monitor-Zuordnung, mobilen Zugriff, Administration und Sicherheitskontrollen, und lassen Sie das bisherige System mit einem dokumentierten Rollback-Pfad weiterlaufen, bis der Ersatz diese Kriterien erfüllt.'
metadata:
  description: 'Selbst gehostete Splashtop-Alternative bewerten: Lizenzierung, Infrastruktur, Workflow-Kompatibilität, Sicherheitskontrollen, Pilotdesign und Migrationsrisiko.'
  keywords: 'selbst gehostete Splashtop-Alternative, Splashtop-Ersatz, von Splashtop migrieren, RustDesk vs. Splashtop, Splashtop-Alternative für IT-Teams'
---

Eine selbst gehostete Splashtop-Alternative lohnt eine Bewertung, wenn Ihr IT-Team die Kontrolle über serverseitige Dienste, prüfbaren Quellcode oder ein Lizenzmodell braucht, das zu seinen Benutzern, Geräten und gleichzeitigen Sitzungen passt. RustDesk ist genau für diese Anforderungen gebaut. Die Bewertung bleibt trotzdem wichtig, denn eine Migration kann Workflow-Lücken offenlegen, die eine Feature-Matrix übersieht.

Entscheidend ist: **Es gibt drei Betriebsmodelle, nicht nur „Cloud oder Self-Hosting“.** Splashtop verkauft verwaltete SaaS-Pläne _und_ ein separat lizenziertes **On-Prem**-Produkt; RustDesk macht Self-Hosting mit RustDesk Server OSS (dem kostenlosen Community-Server) und Server Pro zum zentralen Bereitstellungsmodell.

## Die kurze Antwort

| Entscheidungsfaktor     | RustDesk                                                                                                                                                                                  | Splashtop SaaS                                                    | Splashtop On-Prem                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Serverbetrieb           | Server OSS oder Server Pro, vom Kunden betrieben                                                                                                                                          | Vom Anbieter betrieben                                            | Vom Kunden betriebenes Splashtop On-Prem Gateway                                                                                      |
| Quellcode-Modell        | Client und Server OSS: AGPL; Server Pro: proprietär                                                                                                                                       | Proprietär                                                        | Proprietär                                                                                                                            |
| Lizenzierung            | Server-Pro-Pläne lizenzieren Login-Benutzer plus verwaltete Geräte; [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert zusätzlich eine festgelegte Anzahl gleichzeitiger Verbindungen | Abhängig vom Plan (Remote Access, Remote Support oder Enterprise) | Separat lizenziert, Verkauf über den Vertrieb; schriftliches Angebot bestätigen lassen                                               |
| Gleichzeitige Sitzungen | In den Standardplänen unbegrenzt; bei Customized V2 ein festgelegtes Kontingent                                                                                                           | Planabhängig                                                      | Lizenzabhängig                                                                                                                        |
| Governance              | Web-Konsole von Server Pro, Zugriffskontrolle pro Benutzer und Gerätegruppe und gemeinsame Adressbücher; LDAP/OIDC-SSO ab dem Basic-Plan                                                 | Enterprise-Kontrollen sind planabhängig                           | Benutzer-/Gruppenberechtigungen, Active-Directory-Integration, IP-Beschränkungen und weitere Funktionen sind editionsabhängig         |
| Infrastrukturaufwand    | Ihr Team verantwortet Bereitstellung, TLS, Netzwerkexposition, Monitoring, Backups, Upgrades und Verfügbarkeit                                                                            | Der Anbieter verantwortet die Dienstinfrastruktur                 | Ihr Team verantwortet die Dimensionierung des Gateways, die Netzwerkplatzierung, TLS, Monitoring, Backups, Upgrades und Verfügbarkeit |
| Bester Einstiegspunkt   | Server OSS (kostenlos) für eine grundlegende Bewertung; Evaluierung von Server Pro über [sales@rustdesk.com](mailto:sales@rustdesk.com) für die Verwaltungsfunktionen                     | SaaS-Testversion für Teams, die einen verwalteten Dienst wünschen | Direktvertrieb und eine klar abgegrenzte Infrastrukturbewertung                                                                       |

Legen Sie das Betriebsmodell fest, bevor Sie einzelne Funktionen vergleichen. Soll ein Anbieter den Dienst betreiben, wägen Sie den Aufwand für den eigenen Betrieb von RustDesk gegen Splashtop SaaS ab. Ist Infrastrukturkontrolle Pflicht, vergleichen Sie RustDesk Server Pro mit Splashtop On-Prem – nicht mit der SaaS-Testversion, die über On-Prem wenig aussagt.

## Das richtige Splashtop-Produkt vergleichen

Die Standardpläne Remote Access und Remote Support von Splashtop werden vom Anbieter betrieben. Die [Preisseite](https://www.splashtop.com/pricing) führt eine On-Prem-Option unter den Enterprise-Angeboten auf, und die [On-Prem-Produktseite](https://www.splashtop.com/products/on-prem) beschreibt die Installation eines **Splashtop On-Prem Gateway** in einer DMZ oder hinter der Unternehmens-Firewall, mit eigenen [Systemanforderungen](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements) für Betriebssysteme, Hardware-Dimensionierung und Ports.

On-Prem gibt es also tatsächlich – aber als separates, proprietäres Produkt mit Direktvertrieb und kundenseitiger Infrastruktur, nicht als Standard hinter jedem Splashtop-Abonnement. RustDesk setzt am anderen Ende an: Server OSS und Server Pro werden standardmäßig selbst gehostet. Bei Server Pro laufen ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Bereitstellungsdaten auf einer Infrastruktur, die Sie kontrollieren, während direkte Sitzungen weiterhin zwischen den Endgeräten fließen.

## Open Source und das Vertrauensmodell

Der **Client und Server OSS von RustDesk stehen unter der AGPL**. Ein Sicherheits- oder Entwicklungsteam kann den Code lesen, den Client bauen und Server OSS betreiben, ohne vorher eine kommerzielle Lizenz zu kaufen; **Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**, und ergänzt darauf aufbauend eine zentrale Verwaltung. Splashtop SaaS und On-Prem sind beide proprietär – On-Prem ändert, _wo_ der Server läuft, nicht, ob der Code offen ist. Zwei getrennte Fragen entscheiden darüber:

1. Müssen serverseitige Dienste auf einer Infrastruktur laufen, die wir kontrollieren? _(On-Prem und RustDesk beantworten dies beide mit Ja.)_
2. Brauchen wir Einsicht in den Quellcode und die Möglichkeit, den Client selbst zu bauen? _(Nur RustDesk beantwortet dies mit Ja.)_

## Lizenzierung und Kosten

Die Standardpläne von RustDesk Server Pro bemessen sich nach **Login-Benutzern plus verwalteten Geräten** und enthalten unbegrenzte gleichzeitige Verbindungen; nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine festgelegte Anzahl gleichzeitiger Verbindungen. Die Preise von Splashtop hängen davon ab, ob Sie Remote Access, Remote Support, Enterprise SaaS oder On-Prem benötigen; Enterprise und On-Prem laufen über den Vertrieb.

Vergleichen Sie auf beiden Seiten dieselben Größen – Techniker oder Login-Benutzer, verwaltete Endgeräte, gleichzeitige Sitzungen, die tatsächlich benötigten Identitäts-, Audit- und Aufzeichnungsfunktionen sowie den Serverbetrieb – anhand datierter schriftlicher Konditionen, und kalkulieren Sie mit dem Verlängerungspreis statt mit dem Preis des ersten Jahres. Ein niedrigerer Einstiegspreis oder das historische Angebot eines anderen Kunden sagt nichts über die Kosten der Bereitstellung aus, die Sie brauchen. Aktuelle RustDesk-Preise finden Sie auf der [RustDesk-Preisseite](https://rustdesk.com/pricing).

## Zuverlässigkeitsberichte: Hinweise, keine Häufigkeitsangaben

Öffentliche Diskussionen zeigen ein gemischtes Bild. Ein Thread von 2025 in der [Splashtop-Community](https://www.reddit.com/r/Splashtop_Official/comments/1ltgest/constant_crashing_on_local_win10_computer/) dokumentiert Abstürze des Windows-Clients; eine [Atera-Diskussion](https://www.reddit.com/r/atera/comments/1qucbx3/is_splashtop_just_terrible_for_you_guys/) von 2026 enthält sowohl Beschwerden als auch Berichte von Administratoren über jahrelangen stabilen Betrieb – teils mit Splashtop, das über eine RMM-Integration statt als eigenständiges Produkt bereitgestellt wurde. Betrachten Sie diese Berichte als Szenarien, die Sie in Ihrem eigenen Pilotbetrieb nachstellen – mit Ihrer Endgerätemischung, Ihren Netzwerken, Ihrer RMM-Paketierung und Ihren Betriebssystemversionen –, nicht als Beleg dafür, wie verbreitet ein Problem in der gesamten installierten Basis ist.

## Was Sie wirklich testen sollten

Überspringen Sie die generische Feature-Checkliste und testen Sie, was in der Praxis über eine Splashtop-Migration entscheidet:

- **Remote-Audio** und Mikrofon-Passthrough, einschließlich des Verhaltens der Audiogeräte nach einem erneuten Verbindungsaufbau.
- **Multi-Monitor**-Layouts und ob die Monitor-Zuordnung zwischen Sitzungen erhalten bleibt.
- **Mobiler und browserbasierter** Zugriff – prüfen Sie, welche Plattformen _steuern_ und welche nur _gesteuert werden_ können, und validieren Sie Browser-/WebSocket-Sitzungen getrennt von nativen Clients.
- **RMM-Paketierung** und unbeaufsichtigte Bereitstellung auf den Betriebssystemversionen, die Sie produktiv einsetzen.
- **Direktverbindung und Relay-Fallback** sowie das Verhalten beim erneuten Verbinden in Netzwerken mit hoher Latenz oder Einschränkungen.
- **Governance** – SSO- oder Verzeichnisintegration, 2FA für gesteuerte Geräte, Audit-Protokolle, Gerätegruppen und die Bestätigung, dass die Kenntnis einer Geräte-ID Ihr Autorisierungsmodell nicht umgeht. Web-Konsole, Zugriffskontrolle und [LDAP/SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/) sind Funktionen von Server Pro; testen Sie Governance daher mit einer Server-Pro-Evaluierung, nicht mit Server OSS.

Führen Sie das als **parallelen Pilotbetrieb** mit einem repräsentativen Ausschnitt an Technikern, Endgeräten und Netzwerken durch, lassen Sie das bisherige System laufen, bis der Ersatz die erforderlichen Workflows besteht, und dokumentieren Sie einen Rollback-Auslöser, bevor Sie den Rollout ausweiten.

## Wann RustDesk der stärkere Kandidat ist

RustDesk ist der stärkere Kandidat, wenn:

- **Self-Hosting der Standard sein soll.** Server OSS und Server Pro laufen beide auf einer Infrastruktur Ihrer Wahl; das Gegenstück bei Splashtop ist das separat lizenzierte On-Prem-Produkt.
- **Gleichzeitigkeit nicht die Rechnung bestimmen soll.** Die Standardpläne von Server Pro lizenzieren Login-Benutzer und verwaltete Geräte und enthalten unbegrenzte gleichzeitige Verbindungen.
- **Die Anmeldung über ein Verzeichnis wichtig ist.** LDAP/Active Directory und OIDC-SSO gibt es ab dem Basic-Plan.
- **Sie kostenlos pilotieren und den Client prüfen wollen.** Server OSS hat keine Lizenzgebühr und kein Ablaufdatum, und der Client lässt sich lesen und aus dem Quellcode bauen.

Eine Einschränkung gilt für RustDesk wie für Splashtop On-Prem: Ihr Team stellt den Server bereit, härtet und überwacht ihn, erstellt Backups und spielt Updates ein.

## RustDesk bewerten, ohne sich auf die gesamte Flotte festzulegen

Beginnen Sie mit Server OSS für die grundlegende Konnektivität und evaluieren Sie anschließend Server Pro, wenn Sie zentrale Governance benötigen – mit denselben Endgeräten, Netzwerken, Techniker-Workflows und Abnahmekriterien, die Sie auch bei Splashtop anlegen würden. Die aktuellen Evaluierungsbedingungen für Server Pro erhalten Sie über [sales@rustdesk.com](mailto:sales@rustdesk.com), die Preise auf der [RustDesk-Preisseite](https://rustdesk.com/pricing).
