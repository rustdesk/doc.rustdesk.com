---
publishDate: 2026-07-09T10:47:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'rustdesk-scale-50000-200000-devices'
draft: false
title: 'Skaliert RustDesk auf 200.000 Geräte?'
excerpt: 'Betrieblicher Kontext von RustDesk aus erster Hand für die Planung großer Geräteflotten: was die Beobachtung am öffentlichen Server zeigt und was ein selbst gehosteter Rollout noch validieren muss.'
image: '~/assets/images/blog/rustdesk-scale-50000-200000-devices-og.webp'
category: 'Bereitstellung'
tags: ['RustDesk', 'Bereitstellung', 'Unternehmen']
author: 'RustDesk Team'
slug: 'skaliert-rustdesk-auf-200-000-gerate'
faq:
  - question: 'Wie viele Geräte kann ein selbst gehosteter RustDesk-Server verwalten?'
    answer: 'Der öffentliche Server von RustDesk verzeichnete am 7. Juli 2026 mehr als zwei Millionen Online-Endpunkte auf einem einzigen Host mit 12 Kernen und 32 GB RAM (interne Telemetrie, kein geprüfter Benchmark). Für RustDesk Server Pro betrachten Sie 200.000 Geräte als Planungsziel und validieren Datenbank-, Konsolen- und Relay-Last in einem Pilotbetrieb.'
  - question: 'Was muss angepasst werden, um 200.000 Geräte zu erreichen?'
    answer: 'Bei 200.000 Geräten zählen vor allem Datenbank-Schreibvorgänge, Relay-Kapazität und Konsolenlast. Testen Sie RustDesk Server Pro stufenweise unter Last: Statuswechsel der Online-Geräte, gleichzeitige Remote-Sitzungen, Relay-Bandbreite, Caching, Schreibleistung der Datenbank und Aktivität in der Verwaltungskonsole – mit Ihrem eigenen Workload statt nur anhand der Endpunktpräsenz.'
  - question: 'Unterstützt RustDesk Server Pro Hochverfügbarkeit oder Lastverteilung?'
    answer: 'Ja, für Relays: RustDesk Server Pro unterstützt mehrere Relay-Server, die sich regional platzieren lassen, und hbbr-Relays benötigen keine Lizenz. Eine Pro-Lizenz ist an einen hbbs-Server (ID/Rendezvous) gebunden; Hochverfügbarkeit für ID-Server und Datenbank ist daher eine Designaufgabe. Planen Sie Failover und Wiederherstellung vor dem Rollout gemeinsam mit RustDesk.'

metadata:
  description: 'RustDesk-Betriebsdaten aus erster Hand für die Planung von 200.000 Geräten und die Workload-Faktoren, die ein selbst gehostetes Server Pro validieren muss.'
  keywords: 'rustdesk skalierung 200000 geräte, rustdesk 50000 geräte, rustdesk selbst gehostete server-skalierbarkeit, rustdesk enterprise deployment, rustdesk server pro kapazität, remote desktop für große geräteflotten'
---

Die interne Telemetrie von RustDesk verzeichnete am 7. Juli 2026 **mehr als zwei Millionen Online-Endpunkte** auf einem einzigen Host des öffentlichen Servers mit **12-Kern-CPU und 32 GB RAM**.

Zwei Einschränkungen bestimmen, was diese Zahl aussagt. Erstens bedeutet „Online-Endpunkte“ Geräte, die zu diesem Zeitpunkt als online gemeldet waren – nicht zwei Millionen gleichzeitige Fernsteuerungssitzungen. Zweitens handelt es sich um eine interne Beobachtung aus dem Produktivbetrieb, nicht um einen unabhängig geprüften Benchmark oder eine Garantie für Server Pro: Eine Server-Pro-Bereitstellung bringt zusätzlich Datenbank-Schreibvorgänge, Audit-Aktivität, Konsolennutzung, Richtlinienverarbeitung und Relay-Verkehr mit sich.

## Die kurze Antwort

**200.000 Online-Geräte sind für Server Pro ein realistisches Planungsziel.** Die obige Beobachtung am öffentlichen Server liegt auf einem einzigen Host mit 12 Kernen und 32 GB eine Größenordnung höher. In einem Pilotbetrieb validieren Sie die Last, die Server Pro über die reine Endpunktpräsenz hinaus erzeugt: Statuswechsel der Geräte, Richtlinien, Audit-Schreibvorgänge, Konsolennutzung und gleichzeitige Relay-Sitzungen.

## Im Detail

Fragen zur Skalierung gehören zu den häufigsten, die wir von IT-Teams hören, die von TeamViewer oder AnyDesk migrieren – besonders von solchen, die Geräteflotten im Zehntausender- oder Hunderttausender-Bereich planen. Die Antwort hängt davon ab, wie viele Geräte online bleiben, wie häufig sich ihr Status ändert, wie viele Remote-Sitzungen gleichzeitig laufen und wie viel Datenverkehr über das Relay geht.

Validieren Sie bei einem Server-Pro-Rollout die Aspekte, die die Kennzahl des öffentlichen Servers nicht abdeckt. Caching und die Schreibleistung der Datenbank sind relevant, wenn Geräte kommen und gehen. Relay-Bandbreite und CPU-Auslastung hängen von Anzahl, Dauer, Auflösung und Codec der gleichzeitig über das Relay laufenden Sitzungen ab. Konsolenabfragen, Audit-Aufbewahrung, Gerätegruppen, Richtlinien und Integrationen erzeugen zusätzliche Last, die die Endpunktpräsenz allein nicht erfasst. Bilden Sie die geplante Zahl der Online-Geräte, die Verbindungsfluktuation, gleichzeitige direkte und über das Relay laufende Sitzungen, die Aufbewahrung in der Datenbank und die administrative Aktivität in einem repräsentativen Lasttest ab.

Für einen reproduzierbaren Server-Pro-Pilotbetrieb dokumentieren Sie Client- und Serverversionen, Hardware sowie die Platzierung von Datenbank und Relays. Erhöhen Sie Online-Präsenz und Statuswechsel der Geräte stufenweise, während Sie die erwarteten Konsolenabfragen, Richtlinienänderungen und Audit-Schreibvorgänge ausführen. Messen Sie den Erfolg von Registrierung und Wiederverbindung, die Dauer des Verbindungsaufbaus, Datenbanklatenz, CPU/RAM, Speicherwachstum und Relay-Durchsatz. Beziehen Sie Spitzenwerte gleichzeitiger Sitzungen und eine Wiederherstellungsübung ein; halten Sie diese Messungen getrennt von der Zahl der Online-Endpunkte.

Hochverfügbarkeit und Lastverteilung verdienen dieselbe Sorgfalt. Relays skalieren horizontal: Sie können mehrere betreiben und regional platzieren, und hbbr-Relays benötigen keine Lizenz. Eine Pro-Lizenz ist an einen hbbs-Server gebunden; planen Sie das Failover von ID-Server und Datenbank daher ausdrücklich und prüfen Sie es bei sehr großen Flotten gemeinsam mit RustDesk.

Dimensionieren Sie anschließend die Lizenzierung: Server Pro lizenziert Login-Benutzer und verwaltete Geräte, und die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen. Den passenden Plan für Ihre Flotte finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Wer stellt diese Frage

Für Architekten großer Geräteflotten, die mehrjährige Rollouts planen – in Unternehmen, bei großen [MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool) und in IT-Programmen des öffentlichen Sektors –, steht diese Frage ganz oben auf der Prüfliste. Diese Käufer verlassen meist ein kommerzielles Tool aus Kosten- oder Souveränitätsgründen und brauchen die Gewissheit, dass eine selbst gehostete Plattform mit ihnen mitwächst, statt mitten im Vertrag an eine Grenze zu stoßen.

## Verwandte Fragen

- Limits gleichzeitiger Verbindungen und Lizenzierung für große Gerätezahlen: siehe [RustDesk-Preise](https://rustdesk.com/pricing).
- [Kann ich eine bestehende TeamViewer- oder AnyDesk-Geräteflotte zu RustDesk migrieren?](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative)

Planen Sie einen Rollout im großen Maßstab? Wenden Sie sich an das [RustDesk-Team](mailto:sales@rustdesk.com), um eine selbst gehostete Bereitstellung für Ihre Geräteanzahl, Ihre Leistungsanforderungen und Ihren Wachstumszeitplan zu dimensionieren.
