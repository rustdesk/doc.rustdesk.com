---
publishDate: 2026-07-06T10:09:00Z
lang: 'de'
translationKey: 'rustdesk-vs-splashtop'
draft: false
title: 'Selbst gehostete Splashtop-Alternative: Was Sie zuerst bewerten sollten'
excerpt: 'Ein Leitfaden zur Bewertung einer selbst gehosteten Splashtop-Alternative: Lizenzierung, Infrastruktur, Zuverlässigkeitsnachweise, Workflow-Tests und Migrationsrisiken.'
image: '~/assets/images/blog/rustdesk-vs-splashtop-og.png'
category: 'Vergleiche'
tags: ['RustDesk', 'Splashtop', 'Vergleich']
author: 'RustDesk Team'
slug: 'selbst-gehostete-splashtop-alternative-was-sie-zuerst-bewerten-sollten'
faq:
  - question: 'Können sowohl RustDesk als auch Splashtop selbst gehostet werden?'
    answer: 'Ja, allerdings über unterschiedliche Produktmodelle. RustDesk bietet einen kostenlosen Open-Source-Server sowie kommerzielle Server-Pro-Pläne, die auf Self-Hosting ausgelegt sind. Splashtop bietet zusätzlich zu seinen gängigen SaaS-Plänen ein separat lizenziertes, proprietäres On-Prem-Produkt an.'
  - question: 'Welche Infrastruktur benötigt Splashtop On-Prem?'
    answer: 'Splashtop On-Prem nutzt ein vom Kunden betriebenes Splashtop Gateway. Das Unternehmen muss Serverkapazität, Netzwerk, TLS, Monitoring, Backups, Upgrades und Verfügbarkeit entsprechend seinen Bereitstellungsanforderungen selbst planen.'
  - question: 'Sollte ich selbst hosten oder einen vom Anbieter betriebenen Dienst nutzen?'
    answer: 'Hosten Sie selbst, wenn Sie die Kontrolle über die serverseitigen Dienste, Open-Source-Software oder eine Lizenzierung auf Basis Ihrer eigenen Nutzer und Geräte wünschen. Ein vom Anbieter betriebener SaaS-Dienst ist die Alternative, wenn Sie ausdrücklich möchten, dass jemand anderes den Dienst betreibt. Testen Sie die erforderlichen Workflows und vergleichen Sie die aktuellen schriftlichen Vertragsbedingungen, bevor Sie sich entscheiden.'
  - question: 'Wie sollte ein IT-Team einen Splashtop-Ersatz testen?'
    answer: 'Führen Sie einen parallelen Pilotversuch mit repräsentativen Nutzern, Endgeräten, Netzwerken und Support-Workflows durch. Definieren Sie Abnahmekriterien für Verbindungszuverlässigkeit, Remote-Audio, Monitor-Zuordnung, mobilen Zugriff, Administration und Sicherheitskontrollen, und halten Sie einen dokumentierten Rollback-Pfad bereit, bis der Ersatz diese Kriterien erfüllt.'
metadata:
  description: 'Bewerten Sie eine selbst gehostete Splashtop-Alternative anhand von Lizenzierung, Infrastruktur, Workflow-Kompatibilität, Sicherheitskontrollen, Pilotdesign und Migrationsrisiko.'
  keywords: 'selbst gehostete Splashtop-Alternative, Splashtop-Ersatz, von Splashtop migrieren, RustDesk vs. Splashtop, Splashtop-Alternative für IT-Teams'
---

Eine selbst gehostete Splashtop-Alternative ist eine Bewertung wert, wenn Ihr IT-Team die Kontrolle über serverseitige Dienste, Open-Source-Software oder ein Lizenzmodell benötigt, das zu seinen Nutzern, Geräten und gleichzeitigen Sitzungen passt. Das ist nicht automatisch der richtige Schritt: Ein Wechsel verlagert auch Infrastrukturarbeit auf Ihr Team und kann Workflow-Lücken offenlegen, die eine reine Feature-Matrix übersieht.

Entscheidend ist die Unterscheidung zwischen **drei Betriebsmodellen, nicht „Cloud versus Self-Hosting“.** Splashtop verkauft verwaltete SaaS-Pläne _und_ ein separat lizenziertes **On-Prem**-Produkt; RustDesk macht Self-Hosting durch seinen kostenlosen Community-Server und Server Pro zum zentralen Bereitstellungsmodell.

## Die kurze Antwort

| Entscheidungsfaktor     | RustDesk                                                                                                                                                                            | Splashtop SaaS                                                    | Splashtop On-Prem                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Serverbetrieb           | Vom Kunden betriebener Community-Server oder Server Pro                                                                                                                             | Vom Anbieter betrieben                                            | Vom Kunden betriebenes Splashtop-On-Prem-Gateway                                                                                      |
| Quellcode-Modell        | Kern-Client und Community-Server sind Open Source unter der AGPL                                                                                                                    | Proprietär                                                        | Proprietär                                                                                                                            |
| Lizenzierung            | Die Standard-Server-Pro-Pläne basieren auf Login-Nutzern plus verwalteten Geräten; [Customized V2](https://rustdesk.com/pricing#custom2) misst zusätzlich die gleichzeitige Nutzung | Abhängig vom Plan (Remote Access, Remote Support oder Enterprise) | Separat lizenziert und vertriebsgesteuert; schriftliches Angebot bestätigen lassen                                                    |
| Gleichzeitige Sitzungen | Bei Standardplänen unbegrenzt; bei Customized V2 ein festgelegtes Kontingent                                                                                                        | Abhängig vom Plan                                                 | Abhängig von der Lizenz                                                                                                               |
| Governance              | Server-Pro-Funktionen sind planabhängig; SSO, 2FA, Audit, Zugriffskontrolle, Adressbücher und Geräteverwaltung vergleichen                                                          | Enterprise-Kontrollen sind planabhängig                           | Benutzer-/Gruppenberechtigungen, Active-Directory-Integration, IP-Beschränkungen und weitere Funktionen sind editionsabhängig         |
| Infrastrukturaufwand    | Ihr Team verantwortet Bereitstellung, TLS, Netzwerkexposition, Monitoring, Backups, Upgrades und Verfügbarkeit                                                                      | Der Anbieter verantwortet die Dienstinfrastruktur                 | Ihr Team verantwortet die Dimensionierung des Gateways, die Netzwerkplatzierung, TLS, Monitoring, Backups, Upgrades und Verfügbarkeit |
| Bester Einstiegspunkt   | Kostenloser Community-Server für eine grundlegende Bewertung; Server-Pro-Evaluierung über [sales@rustdesk.com](mailto:sales@rustdesk.com) für Management-Funktionen                 | SaaS-Testversion für Teams, die einen verwalteten Dienst wünschen | Direktvertrieb und eine abgegrenzte Infrastrukturbewertung                                                                            |

Wählen Sie zunächst das Betriebsmodell, bevor Sie einzelne Funktionen vergleichen. Wenn Sie möchten, dass ein Anbieter den Dienst betreibt, wägen Sie den Aufwand für den eigenen Betrieb von RustDesk gegen Splashtop SaaS ab. Wenn Infrastrukturkontrolle zwingend erforderlich ist, vergleichen Sie RustDesk Server Pro mit Splashtop On-Prem – nicht mit der SaaS-Testversion, die über On-Prem kaum etwas aussagt.

## Das richtige Splashtop-Produkt vergleichen

Splashtops Standardpläne Remote Access und Remote Support werden vom Anbieter betrieben. Auf der [Preisseite](https://www.splashtop.com/pricing) wird eine On-Prem-Option unter den Enterprise-Angeboten aufgeführt, und die [On-Prem-Produktseite](https://www.splashtop.com/products/on-prem) beschreibt die Installation eines **Splashtop On-Prem Gateway** in einer DMZ oder hinter der Unternehmens-Firewall, mit eigenen [Systemanforderungen](https://support-splashtoponprem.splashtop.com/hc/en-us/articles/360035393074-Splashtop-On-Prem-System-Requirements) für Betriebssysteme, Hardware-Dimensionierung und Ports.

On-Prem gibt es also tatsächlich – aber es ist ein separates, proprietäres Produkt mit Direktvertrieb und kundenseitiger Infrastruktur, nicht der Standard hinter jedem Splashtop-Abonnement. RustDesk setzt am entgegengesetzten Ende an: Der Community-Server und Server Pro sind standardmäßig selbst gehostet. Bei Server Pro laufen ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Bereitstellungsdaten auf Infrastruktur, die Sie kontrollieren, während direkte Sitzungen weiterhin zwischen den Endgeräten fließen.

## Open Source und das Vertrauensmodell

RustDesks Kern-Client und Community-Server sind unter der **AGPL** verfügbar. Ein Security- oder Engineering-Team kann den Code lesen, den Client selbst kompilieren und den kostenlosen Server betreiben, ohne zuvor eine kommerzielle Lizenz erwerben zu müssen; Server Pro fügt proprietäres Management obendrauf hinzu. Splashtop SaaS und On-Prem sind beide proprietär – On-Prem ändert, _wo_ der Server läuft, nicht ob der Code offen ist. Zwei getrennte Fragen entscheiden darüber:

1. Müssen serverseitige Dienste auf von uns kontrollierter Infrastruktur laufen? _(On-Prem und RustDesk beantworten dies beide mit Ja.)_
2. Benötigen wir Einsicht in den Quellcode und die Möglichkeit, den Client selbst zu kompilieren? _(Nur RustDesk beantwortet dies mit Ja.)_

## Lizenzierung und Kosten

Die Standard-Server-Pro-Pläne von RustDesk werden anhand von **Login-Nutzern plus verwalteten Geräten** bemessen und beinhalten unbegrenzte gleichzeitige Verbindungen; [Customized V2](https://rustdesk.com/pricing#custom2) misst stattdessen die gleichzeitige Nutzung. Die Preise von Splashtop hängen davon ab, ob der Bedarf Remote Access, Remote Support, Enterprise SaaS oder On-Prem betrifft, wobei Enterprise und On-Prem vertriebsgesteuert sind.

Vergleichen Sie auf beiden Seiten dieselben Größen – Techniker oder Login-Nutzer, verwaltete Endgeräte, gleichzeitige Sitzungen, die tatsächlich benötigten Identitäts-/Audit-/Aufzeichnungsfunktionen sowie den Serverbetrieb – anhand datierter schriftlicher Vertragsbedingungen, und kalkulieren Sie mit dem Verlängerungspreis statt mit dem Preis des ersten Jahres. Ein niedrigerer Einstiegspreis oder das historische Angebot eines anderen Kunden sagt nichts über die Kosten der von Ihnen benötigten Bereitstellung aus. Aktuelle RustDesk-Preise finden Sie unter [RustDesk-Preisen](https://rustdesk.com/pricing).

## Zuverlässigkeitsberichte: Hinweise, keine Häufigkeitsangaben

Öffentliche Diskussionen zeigen ein gemischtes Bild. Ein Thread von 2025 in der [Splashtop-Community](https://www.reddit.com/r/Splashtop_Official/comments/1ltgest/constant_crashing_on_local_win10_computer/) dokumentiert Abstürze des Windows-Clients; eine [Atera-Diskussion](https://www.reddit.com/r/atera/comments/1qucbx3/is_splashtop_just_terrible_for_you_guys/) von 2026 enthält sowohl Beschwerden als auch Berichte von Administratoren über jahrelangen stabilen Betrieb – teils mit Splashtop, das über eine RMM-Integration statt als eigenständiges Produkt bereitgestellt wurde. Betrachten Sie dies als Szenarien, die Sie in Ihrem eigenen Pilotversuch nachstellen sollten – mit Ihrer eigenen Endgerätemischung, Ihren Netzwerken, Ihrer RMM-Paketierung und Ihren Betriebssystemversionen –, nicht als Beleg dafür, wie verbreitet ein Problem in der gesamten installierten Basis ist.

## Was Sie wirklich testen sollten

Überspringen Sie die generische Feature-Matrix-Checkliste und testen Sie die Dinge, die in der Praxis über eine Splashtop-Migration entscheiden:

- **Remote-Audio** und Mikrofon-Passthrough, einschließlich des Verhaltens der Audiogeräte nach einer erneuten Verbindung.
- **Multi-Monitor**-Layouts und ob die Monitor-Zuordnung zwischen Sitzungen erhalten bleibt.
- **Mobiler und browserbasierter** Zugriff – prüfen Sie, welche Plattformen _steuern_ können und welche nur _gesteuert werden_ können, und validieren Sie Browser-/WebSocket-Sitzungen getrennt von nativen Clients.
- **RMM-Paketierung** und unbeaufsichtigte Bereitstellung auf den Betriebssystemversionen, die Sie produktiv einsetzen.
- **Direktverbindung und Relay-Fallback** sowie das Verhalten bei erneuter Verbindung in Netzwerken mit hoher Latenz oder Einschränkungen.
- **Governance** – SSO- oder Verzeichnisintegration, 2FA für gesteuerte Geräte, Audit-Protokolle, Gerätegruppen sowie die Bestätigung, dass die Kenntnis einer Geräte-ID Ihr Autorisierungsmodell nicht umgeht. Der kostenlose Community-Server enthält nicht jede Governance-Funktion von Server Pro. Prüfen Sie diese daher anhand der aktuellen Server-Pro-Matrix und der [LDAP/SSO-Dokumentation](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/), statt sie vom kostenlosen Server abzuleiten.

Führen Sie dies als **parallelen Pilotversuch** über einen repräsentativen Ausschnitt von Technikern, Endgeräten und Netzwerken durch; behalten Sie das bestehende System aktiv bei, bis der Ersatz die erforderlichen Workflows erfüllt; und dokumentieren Sie einen Rollback-Auslöser, bevor Sie den Rollout ausweiten.

## Wann RustDesk der stärkere Kandidat ist

RustDesk verdient eine Bewertung, wenn Sie Self-Hosting als normales Bereitstellungsmodell wünschen, Open-Source-Software, die Sie prüfen und selbst kompilieren können, einen kostenlosen Community-Server-Pfad oder eine Lizenzierung auf Basis von Login-Nutzern und verwalteten Geräten. Eine Einschränkung gilt sowohl für RustDesk als auch für Splashtop On-Prem: Ihr Team stellt den Server bereit, sichert ihn ab, überwacht ihn, erstellt Backups und aktualisiert ihn. Infrastrukturkontrolle lohnt sich nur, wenn Sie auch bereit sind, sie zu betreiben.

## RustDesk bewerten, ohne sich auf die gesamte Flotte festzulegen

Beginnen Sie mit dem kostenlosen Community-Server für die grundlegende Konnektivität und bewerten Sie anschließend Server Pro, wenn Sie zentralisierte Governance benötigen – anhand derselben Endgeräte, Netzwerke, Techniker-Workflows und Abnahmekriterien, die Sie auch bei Splashtop anwenden würden. Schreiben Sie eine E-Mail an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die aktuellen Bedingungen für die Server-Pro-Evaluierung zu erhalten, oder informieren Sie sich unter [RustDesk-Preisen](https://rustdesk.com/pricing).
