---
publishDate: 2026-07-02T14:43:00Z
lang: 'de'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'Was zählt als verwaltetes Gerät bei RustDesk?'
excerpt: 'In den Standard-Tarifen von RustDesk zählt jedes Gerät, das Sie für den Zugriff einrichten, einmal. Customized V2 zählt nur Geräte, die einer Gruppe oder einem Benutzer zugewiesen sind; Ad-hoc-Geräte werden nicht gezählt.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.png
category: 'Preise'
tags: ['RustDesk', 'Preise', 'Lizenzierung']
author: 'RustDesk Team'
slug: 'was-zahlt-als-verwaltetes-gerat-bei-rustdesk'
faq:
  - question: 'Wie zählt RustDesk verwaltete Geräte?'
    answer: 'In den Standard-Tarifen zählt jedes Gerät, das Sie für den Zugriff einrichten, einmalig als ein verwaltetes Gerät – ob betreut (attended) oder unbeaufsichtigt (unattended), ob Sie sich einmal oder tausendmal verbinden. Customized V2 zählt anders: Nur Geräte, die einer Gerätegruppe oder einem Benutzer zugewiesen sind, zählen zu Ihrer lizenzierten Geräteanzahl.'
  - question: 'Wie werden Ad-hoc-Geräte für einmalige Support-Einsätze gezählt?'
    answer: 'Im Tarif Customized V2 zählen nur Geräte, die einer Gerätegruppe oder einem Benutzer zugewiesen sind, als verwaltete Geräte. Eine Maschine, mit der Sie sich einmalig für spontanen Support verbinden – und die Sie nie zuweisen – zählt nicht zu Ihrer lizenzierten Geräteanzahl und wird nicht deaktiviert. Für überwiegend ad-hoc geprägte Arbeit macht das Customized V2 zur besseren Wahl, als jeden Endpunkt zu zählen.'

metadata:
  description: 'Wie RustDesk verwaltete Geräte zählt: Standard-Tarife zählen jedes erreichbare Gerät einmal; Customized V2 zählt nur Geräte, die einer Gruppe oder einem Benutzer zugewiesen sind.'
  keywords: 'was zählt als verwaltetes gerät, rustdesk geräte zählen, rustdesk vs teamviewer lizenzierung, unbeaufsichtigte vs betreute geräte lizenz, rustdesk ad-hoc support, msp remote-support-lizenzierung'
---

Wenn Sie von TeamViewers Lizenzmodell pro Sitzplatz kommen, ist die Zählregel in RustDesks Standard-Tarifen angenehm einfach: **Jedes Gerät, auf das Sie zugreifen möchten, zählt als ein verwaltetes Gerät, einmalig gezählt.** Der Tarif **[Customized V2](https://rustdesk.com/pricing#custom2)** zählt anders – nur Geräte, die Sie einer Gruppe oder einem Benutzer zuweisen, zählen –, was ihn zur passenden Wahl für intensiven Ad-hoc-Support macht.

## Die kurze Antwort

In den Standard-Tarifen ist ein „verwaltetes Gerät“ jede Maschine, auf die Sie zugreifen können möchten, und der Server zählt jede davon ein einziges Mal. Dabei spielt es keine Rolle:

- ob das Gerät **betreut** ist (jemand sitzt davor) oder **unbeaufsichtigt** (ein Server ohne Bildschirm, ein Kiosk-System oder eine dauerhaft laufende Workstation),
- ob Sie sich **einmal** oder **mehrfach** verbinden,
- wie oft Sie darauf zugreifen.

Wenn Ihre Arbeit überwiegend aus spontanem Einmal-Support besteht, ist die weiter unten beschriebene, engere Zählweise von **[Customized V2](https://rustdesk.com/pricing#custom2)** genau für diesen Fall gemacht.

## Im Detail

Was die Sache tatsächlich verändert, ist der Tarif. Im Tarif **[Customized V2](https://rustdesk.com/pricing#custom2)** ist die Definition eines verwalteten Geräts enger gefasst: Nur die Geräte, die Sie **einer Gerätegruppe oder einem Benutzer zuweisen**, zählen zu Ihrer lizenzierten Geräteanzahl. Maschinen, auf die Sie nur für spontanen Einmal-Support zugreifen – und die Sie nie zuweisen –, werden nicht gezählt und auch nicht deaktiviert. Wenn Sie lieber möchten, dass diese nicht zugewiesenen Geräte gar nicht erst in der Konsole erscheinen, steuert das die [`register-device`-Client-Einstellung](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device); sie greift, sobald die lizenzierte Anzahl gleichzeitiger Verbindungen 2 oder mehr beträgt. In der Praxis zeigt eine solche Schnell-Support-Sitzung nur eine ID und ein Einmalpasswort für eine einzelne betreute Verbindung, sodass eine echte einmalige Interaktion nie einen dauerhaften Platz in Ihrer Geräteflotte benötigt. Wenn ein Großteil Ihrer Arbeit so aussieht, ist Customized V2 in der Regel die bessere Wahl – schreiben Sie mit Ihrem Szenario eine E-Mail an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die aktuellen Konditionen zu erfahren, oder prüfen Sie [rustdesk.com/pricing](https://rustdesk.com/pricing).

Stellen Sie sich zum Beispiel einen [MSP](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool) mit 20 Technikern vor, der rund 1.000 Kundenmaschinen betreut: Er müsste **beide** Lizenzdimensionen erfüllen – genug Login-Benutzer für alle 20 Techniker und genug verwaltete Geräte für die dauerhaft erreichbar gehaltenen Maschinen. Für Endpunkte, bei denen es sich wirklich um einmalige Support-Anrufe handelt, gilt die oben beschriebene Customized-V2-Regel; die aktuellen Kontingente finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Wer stellt diese Frage

Jeder, der eine TeamViewer- oder AnyDesk-Sitzplatzanzahl in RustDesk-Einheiten übersetzen will, stößt zuerst auf diese Definition, denn die Lizenzeinheiten lassen sich nicht eins zu eins übertragen. RustDesks kostenpflichtige Tarife erfordern Kapazität sowohl für die Personen, die sich anmelden, als auch für die Geräte, die verwaltet werden.

## Verwandte Fragen

- Lizenzierung pro Benutzer vs. pro Gerät, gleichzeitige Verbindungen und Gerätezählung für Server Pro: siehe [RustDesk-Preise](https://rustdesk.com/pricing).
- [Sie kommen von TeamViewer – wie schneidet RustDesks Preisgestaltung für MSPs im Vergleich ab?](/de/blog/rustdesk-vs-teamviewer-die-selbst-gehostete-alternative)

Sie planen die Größe Ihrer Geräteflotte und sind sich nicht sicher, ob einmalige Support-Anrufe in Ihre Gerätezahl einfließen sollen? Prüfen Sie die aktuellen Konditionen unter [rustdesk.com/pricing](https://rustdesk.com/pricing) oder fragen Sie das Team, bevor Sie kaufen.
