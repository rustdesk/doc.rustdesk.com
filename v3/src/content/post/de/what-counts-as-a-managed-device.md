---
publishDate: 2026-07-02T14:43:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'Was zählt als verwaltetes Gerät bei RustDesk?'
excerpt: 'In den Standardplänen von RustDesk Server Pro zählt jedes Gerät, das Sie erreichen wollen, einmal. Customized V2 zählt nur Geräte, die einer Gruppe oder einem Benutzer zugewiesen sind; Ad-hoc-Geräte zählen nicht.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: 'Preise'
tags: ['RustDesk', 'Preise', 'Lizenzierung']
author: 'RustDesk Team'
slug: 'was-zahlt-als-verwaltetes-gerat-bei-rustdesk'
faq:
  - question: 'Wie zählt RustDesk verwaltete Geräte?'
    answer: 'In den Standardplänen zählt jedes Gerät, das Sie für den Zugriff einrichten, einmalig als ein verwaltetes Gerät – ob beaufsichtigt oder unbeaufsichtigt und ob Sie sich einmal oder tausendmal verbinden. Customized V2 zählt anders: Nur Geräte, die einer Gerätegruppe oder einem Benutzer zugewiesen sind, zählen zu Ihrer lizenzierten Geräteanzahl.'
  - question: 'Wie werden Ad-hoc-Geräte für einmalige Support-Einsätze gezählt?'
    answer: 'Im Plan Customized V2 zählen nur Geräte, die einer Gerätegruppe oder einem Benutzer zugewiesen sind, als verwaltete Geräte. Ein Rechner, mit dem Sie sich einmalig für spontanen Support verbinden und den Sie nie zuweisen, zählt nicht zu Ihrer lizenzierten Geräteanzahl und wird nicht deaktiviert. Für überwiegend spontane Support-Arbeit passt Customized V2 daher besser als ein Modell, das jeden Endpunkt zählt.'

metadata:
  description: 'Verwaltete Geräte bei RustDesk: Standardpläne zählen jedes erreichbare Gerät einmal, Customized V2 nur einer Gruppe oder einem Benutzer zugewiesene Geräte.'
  keywords: 'was zählt als verwaltetes gerät, rustdesk geräte zählen, rustdesk vs teamviewer lizenzierung, unbeaufsichtigte vs beaufsichtigte geräte lizenz, rustdesk ad-hoc support, msp remote-support-lizenzierung'
---

RustDesk Server Pro zählt berechtigte Login-Benutzer und verwaltete Geräte. In den Standardplänen gilt: **Jedes Gerät, auf das Sie zugreifen möchten, zählt als ein verwaltetes Gerät, und zwar einmal.** Der Plan **[Customized V2](https://rustdesk.com/pricing#custom2)** zählt anders – nur Geräte, die Sie einer Gruppe oder einem Benutzer zuweisen –, und eignet sich deshalb für umfangreichen Ad-hoc-Support.

## Die kurze Antwort

In den Standardplänen ist ein „verwaltetes Gerät“ jeder Rechner, den Sie erreichen können möchten, und der Server zählt jeden davon ein einziges Mal. Dabei spielt es keine Rolle,

- ob das Gerät **beaufsichtigt** ist (jemand sitzt davor) oder **unbeaufsichtigt** (ein Server ohne Bildschirm, ein Kiosk-System oder eine dauerhaft laufende Workstation),
- ob Sie sich **einmal** oder **mehrfach** verbinden,
- wie oft Sie darauf zugreifen.

Wenn Ihre Arbeit überwiegend aus spontanem Einmal-Support besteht, ist die weiter unten beschriebene, engere Zählweise von **[Customized V2](https://rustdesk.com/pricing#custom2)** genau für diesen Fall gemacht.

## Im Detail

Was die Zählung verändert, ist der Plan. Im Plan **[Customized V2](https://rustdesk.com/pricing#custom2)** ist die Definition eines verwalteten Geräts enger gefasst: Nur die Geräte, die Sie **einer Gerätegruppe oder einem Benutzer zuweisen**, zählen zu Ihrer lizenzierten Geräteanzahl. Rechner, auf die Sie nur für spontanen Einmal-Support zugreifen – und die Sie nie zuweisen –, werden nicht gezählt und auch nicht deaktiviert. Wenn diese nicht zugewiesenen Geräte gar nicht erst in der Konsole erscheinen sollen, steuert das die [Client-Einstellung `register-device`](https://rustdesk.com/docs/de/self-host/client-configuration/advanced-settings/#register-device); sie greift, sobald die lizenzierte Anzahl gleichzeitiger Verbindungen 2 oder mehr beträgt. In der Praxis zeigt eine solche Schnell-Support-Sitzung nur eine ID und ein Einmalpasswort für eine einzelne beaufsichtigte Verbindung, sodass eine echte einmalige Interaktion nie einen dauerhaften Platz in Ihrer Geräteflotte braucht. Wenn ein Großteil Ihrer Arbeit so aussieht, ist Customized V2 in der Regel die bessere Wahl – schreiben Sie mit Ihrem Szenario an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die aktuellen Konditionen zu erfahren, oder prüfen Sie [rustdesk.com/pricing](https://rustdesk.com/pricing).

Stellen Sie sich zum Beispiel einen [MSP](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool) mit 20 Technikern vor, der rund 1.000 Kundenrechner betreut: Er müsste **beide** Lizenzdimensionen erfüllen – genug Login-Benutzer für alle 20 Techniker und genug verwaltete Geräte für die dauerhaft erreichbar gehaltenen Rechner. Für Endpunkte, bei denen es sich wirklich um einmalige Support-Anrufe handelt, gilt die oben beschriebene Customized-V2-Regel; die aktuellen Kontingente finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Gleichzeitige Verbindungen sind eine eigene Lizenzeinheit

Die Standardpläne von Server Pro (Individual, Basic, Customized) enthalten unbegrenzte gleichzeitige Verbindungen; nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine feste Anzahl. Nach der [Definition von RustDesk](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections) ist eine gleichzeitige Verbindung ein aktives steuerndes Gerät, ein „Kanal“, und nicht jeder einzelne ausgehende Sitzungs-Tab: Ein Technikerrechner mit fünf Sitzungs-Tabs belegt einen Kanal, drei gleichzeitig aktive steuernde Rechner belegen drei. Bei Customized V2 dimensionieren Sie Login-Benutzer, verwaltete Geräte und Kanäle getrennt.

## Wer stellt diese Frage

Jeder, der eine Platzanzahl von TeamViewer oder AnyDesk in RustDesk-Einheiten übersetzen will, stößt zuerst auf diese Definition, denn die Lizenzeinheiten lassen sich nicht eins zu eins übertragen. Die kostenpflichtigen Pläne von RustDesk erfordern Kapazität sowohl für die Personen, die sich anmelden, als auch für die Geräte, die verwaltet werden.

## Verwandte Fragen

- Lizenzierung pro Benutzer vs. pro Gerät, gleichzeitige Verbindungen und Gerätezählung für Server Pro: siehe [RustDesk-Preise](https://rustdesk.com/pricing).
- [Sie kommen von TeamViewer – wie schneidet die Preisgestaltung von RustDesk für MSPs ab?](/de/blog/rustdesk-vs-teamviewer-die-selbst-gehostete-alternative)

Sie planen die Größe Ihrer Geräteflotte und sind sich nicht sicher, ob einmalige Support-Anrufe in Ihre Gerätezahl einfließen? Prüfen Sie die aktuellen Konditionen unter [rustdesk.com/pricing](https://rustdesk.com/pricing) oder fragen Sie das Team, bevor Sie kaufen.
