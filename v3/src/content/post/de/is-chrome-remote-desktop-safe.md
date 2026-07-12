---
publishDate: 2026-07-05T18:49:00Z
lang: 'de'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Ist Chrome Remote Desktop sicher? Eine ehrliche Bewertung'
excerpt: 'Ist Chrome Remote Desktop sicher? Ein fairer Blick auf Verschlüsselung, PIN- und Google-Konto-Modell, die tatsächlichen Risiken und wo Self-Hosting einen Unterschied macht.'
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.png'
category: 'Sicherheit'
tags: ['Chrome Remote Desktop', 'Sicherheit']
author: 'RustDesk Team'
slug: 'ist-chrome-remote-desktop-sicher-eine-ehrliche-bewertung'
faq:
  - question: 'Ist die Nutzung von Chrome Remote Desktop sicher?'
    answer: 'Für den gelegentlichen privaten Gebrauch ist Chrome Remote Desktop einigermaßen sicher. Google gibt an, dass alle Remote-Desktop-Sitzungen vollständig verschlüsselt sind, der Zugriff eine PIN erfordert und Sitzungen für Remote-Support einmalige Zugriffscodes verwenden. Die größten Risiken sind schwache PINs, die Kompromittierung des zugehörigen Google-Kontos und – wie bei jedem Remote-Tool – Betrüger, die Nutzer dazu bringen, ihnen Zugriff zu gewähren. Die administrative Kontrolle ist begrenzt, und der Dienst läuft vollständig in der Cloud von Google.'
  - question: 'Ist Chrome Remote Desktop verschlüsselt?'
    answer: 'Ja. Die Support-Dokumentation von Google gibt an, dass alle Chrome-Remote-Desktop-Sitzungen vollständig verschlüsselt sind, und unabhängige Tests beschreiben den Einsatz gängiger Web-Transportsicherheit. Google veröffentlicht auf seinen Support-Seiten für Endnutzer keine detaillierte Aufschlüsselung des Protokolls. Für alles, was über den gelegentlichen Gebrauch hinausgeht, sollte man die Verschlüsselung daher als angemessen, aber nicht unabhängig überprüfbar betrachten.'
  - question: 'Welche Sicherheitsrisiken birgt Chrome Remote Desktop?'
    answer: 'Die drei praktischen Risiken sind eine schwache oder leicht zu erratende PIN (das Minimum sind sechs Ziffern), die Kompromittierung des zugehörigen Google-Kontos sowie Social-Engineering-Betrug, bei dem ein Opfer dazu gebracht wird, die Software zu installieren und einen Zugriffscode weiterzugeben. Wer die Zwei-Faktor-Authentifizierung für sein Google-Konto aktiviert und niemals einen Code an jemanden weitergibt, der einen selbst kontaktiert hat, beseitigt den Großteil der realen Gefahr.'
  - question: 'Kann ich Chrome Remote Desktop selbst hosten?'
    answer: 'Nein. Chrome Remote Desktop wird vollständig über die Infrastruktur von Google vermittelt und ist an Ihr Google-Konto gebunden; es gibt keine Möglichkeit, den Verbindungsdienst auf einem eigenen Server zu betreiben oder den Client-Code zu überprüfen. Wenn Ihnen Self-Hosting und einsehbarer Code wichtig sind, bietet eine Open-Source-Alternative ein anderes Vertrauensmodell.'
metadata:
  description: 'Ist Chrome Remote Desktop sicher? Was Google zur CRD-Verschlüsselung, zum PIN-Schutz, zu den praktischen Risiken und zum Vertrauensmodell rund um das Google-Konto dokumentiert.'
  keywords: 'ist Chrome Remote Desktop sicher, Chrome Remote Desktop Sicherheit, Chrome Remote Desktop Verschlüsselung, Chrome Remote Desktop PIN, Chrome Remote Desktop Risiken, CRD sicher'
---

Kurz gesagt: Für den gelegentlichen privaten Gebrauch ist Chrome Remote Desktop (CRD) einigermaßen sicher. Es ist ein kostenloses, schnörkelloses Tool von Google, das Ihre Sitzung verschlüsselt und den Zugriff hinter einer PIN und Ihrem Google-Konto absichert. Die ehrlichen Einschränkungen: Es ist Closed Source, wird vollständig über die Google-Cloud vermittelt, bietet Ihnen nur wenig administrative Kontrolle und kann – wie jedes Remote-Tool – von Betrügern gegen Sie eingesetzt werden. Hier folgt die faire, quellenbasierte Analyse.

## Die kurze Antwort

CRD ist sicher genug für die Aufgabe, für die es entwickelt wurde: den Zugriff auf den eigenen Rechner oder die Unterstützung eines Familienmitglieds über eine Verbindung, die Google für Sie absichert. Laut [der offiziellen Support-Dokumentation von Google](https://support.google.com/chrome/answer/1649523) sind alle Remote-Desktop-Sitzungen vollständig verschlüsselt, der unbeaufsichtigte Zugriff erfordert eine PIN, und einmalige Support-Sitzungen verwenden einen Zugriffscode, der nur ein einziges Mal funktioniert. Das ist eine vernünftige Basis für den privaten Gebrauch.

Vorsicht ist geboten, sobald es über den gelegentlichen Gebrauch hinausgeht. CRD ist an Ihr Google-Konto gebunden und läuft auf der Infrastruktur von Google mit begrenzten Verwaltungsmöglichkeiten. Die praktischen Schwachstellen sind eine erratbare PIN, ein kompromittiertes Google-Konto und Social Engineering. Nichts davon macht die Installation gefährlich – es bestimmt lediglich, wie sehr Sie sich darauf verlassen sollten.

## Wie Chrome Remote Desktop eine Sitzung schützt

Drei Mechanismen leisten die eigentliche Arbeit, alle dokumentiert auf den [Hilfeseiten von Google](https://support.google.com/chrome/answer/1649523):

- **Verschlüsselung.** Google gibt an, dass „alle Remote-Desktop-Sitzungen vollständig verschlüsselt“ seien. Unabhängige Analysen beschreiben die Verbindung in der Regel als Nutzung gängiger Web-Transportsicherheit (TLS mit AES). Da Google auf seinen Endnutzer-Seiten keine detaillierte Aufschlüsselung des Protokolls veröffentlicht, sollten Sie die Verschlüsselung als angemessen, aber nicht unabhängig überprüfbar betrachten.
- **PIN für unbeaufsichtigten Zugriff.** Um auf einen Computer zuzugreifen, den Sie für dauerhaften Fernzugriff eingerichtet haben, geben Sie eine PIN ein. Sie verhindert, dass sich eine beliebige Person mit Zugriff auf Ihre Google-Sitzung unbemerkt verbindet.
- **Einmalige Zugriffscodes für den Support.** Wenn Sie jemandem in Echtzeit helfen, erzeugt der Host einen Code, der laut Google nur einmal funktioniert. Für eine fortgesetzte Freigabe ist in regelmäßigen Abständen eine erneute Bestätigung erforderlich.

Darüber hinaus kommt das Google-Konto selbst ins Spiel, das durch Zwei-Faktor-Authentifizierung geschützt werden kann – und für den Fernzugriff unbedingt geschützt werden sollte. Für den privaten Gebrauch in einem vertrauenswürdigen Netzwerk reicht diese Kombination an Schutzmaßnahmen wirklich aus.

## Wo die eigentlichen Risiken liegen

Die Schwachstellen von CRD sind nicht exotisch. Es sind genau die drei, die sich unmittelbar aus seinem Design ergeben.

**Schwache PINs.** Die PIN ist das Schloss für den unbeaufsichtigten Zugriff, und das Minimum bei Google sind lediglich sechs Ziffern. Sechs Ziffern reichen aus, um einen einzelnen Rateversuch eines Fremden abzuwehren, aber Menschen wählen vorhersehbare Zahlen – Geburtstage, Wiederholungen, Zahlenfolgen –, wodurch der tatsächliche Suchraum weit kleiner ausfällt, als die Ziffernzahl vermuten lässt. Bei einem Rechner, der rund um die Uhr erreichbar bleibt, ist eine nachlässig gewählte PIN das wahrscheinlichste Einfallstor. Wählen Sie etwas, das nicht naheliegend ist.

**Kompromittierung des Google-Kontos.** Da unbeaufsichtigtes CRD an Ihr Google-Konto gebunden ist, _ist_ genau dieses Konto die Schutzgrenze. Wenn jemand Ihr Google-Passwort per Phishing erbeutet und Sie keine Zwei-Faktor-Authentifizierung aktiviert haben, gehört Ihr Remote-Desktop zu dem, was der Angreifer mit übernimmt. Das ist weniger ein Fehler von CRD als vielmehr eine Folge davon, alles auf die Karte Google-Konto zu setzen – genau deshalb ist die Aktivierung von 2FA für dieses Konto nicht verhandelbar, wenn Sie CRD nutzen.

**Betrug.** Wie bei jedem Remote-Tool ist der größte reale Schaden kein kryptografischer Bruch, sondern Social Engineering. Das [FBI warnt](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software) davor, dass Tech-Support-Betrüger Opfer routinemäßig dazu bringen, Remote-Desktop-Software zu installieren und den Zugriff freizugeben, um anschließend deren Konten zu plündern. Die einmaligen Codes von CRD lassen sich einem angeblich „hilfsbereiten Techniker“ am Telefon leicht vorlesen – genau das ist das Problem. Fairerweise ist dies ein Risiko der Nutzung und keine Schwachstelle von CRD: Derselbe Trick funktioniert genauso mit [AnyDesk](/de/blog/ist-anydesk-sicher-verschlusselung-der-sicherheitsvorfall-2024-und), TeamViewer oder RustDesk. Die defensiven Verhaltensweisen behandeln wir in [Wie man Remote-Desktop-Betrug vermeidet](/de/blog/remote-desktop-betrug-so-erkennen-und-vermeiden-sie-ihn).

## Was CRD Ihnen nicht bietet

CRD ist bewusst minimalistisch gehalten, und genau das macht für viele Menschen den Reiz aus. Es lohnt sich jedoch, die Kompromisse klar zu benennen, besonders wenn Sie es für mehr als den privaten Gebrauch in Betracht ziehen.

Sie können es nicht selbst hosten. Jede CRD-Verbindung wird über die Cloud von Google vermittelt und ist an ein Google-Konto gebunden; es gibt keine Möglichkeit, den Vermittlungsdienst auf einem eigenen Server zu betreiben, und keinen Quellcode, den man überprüfen könnte – Sie müssen Google darauf vertrauen, dass sich der Host wie beschrieben verhält. Auch bei Team-Administration, zentraler Richtlinienverwaltung, Zugriffskontrolllisten, Sitzungsprotokollierung oder Geräte-Gruppierung bietet CRD nur wenig. Das ist keine Kritik an Google; dafür ist CRD einfach nicht gedacht. Wenn Sie das benötigen, sind Sie über den Rahmen von CRD hinausgewachsen, und ein [leistungsfähigeres kostenloses Remote-Desktop-Tool](/de/blog/die-beste-kostenlose-remote-desktop-software-fur-unternehmen-2026) oder eine [spezielle Chrome-Remote-Desktop-Alternative](/de/blog/alternative-zu-chrome-remote-desktop-selbst-gehostetes-rustdesk) ist dann der ehrliche nächste Schritt.

Genau hier bietet ein Open-Source-Modell mit Self-Hosting eine andere _Art_ von Sicherheit, statt nur mehr Funktionen. CRD verlangt von Ihnen, seine Verschlüsselung als angemessen hinzunehmen, ohne ein veröffentlichtes Protokoll, das Sie prüfen könnten; RustDesk ist stattdessen [Open Source unter der AGPL](https://github.com/rustdesk/rustdesk), sodass der Client und seine Kryptografie zur Prüfung bereitstehen, statt auf Vertrauen angewiesen zu sein. Und wo CRD Ihr Google-Konto zur Schutzgrenze macht, legt [Self-Hosting](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) die ID-/Vermittlungs- und Relay-Server auf Ihren eigenen Rechner oder VPS – sodass Vermittlung und Zugriffsrichtlinien auf einer Infrastruktur liegen, die Sie selbst kontrollieren, und nicht hinter einem einzigen Cloud-Login – was sich direkt auf Bedenken zu [Datensouveränität und DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) auswirkt.

Diese Offenheit wirkt in beide Richtungen, um das klarzustellen: Weil der Code öffentlich ist, sind es auch die eigenen Schwachstellen von RustDesk – behalten Sie daher die [aktuellen Releases](https://github.com/rustdesk/rustdesk/releases) und die Offenlegungen im Blick. Und Self-Hosting ersetzt lediglich eine Art von Wartungsaufwand durch eine andere – aus der Konto- und PIN-Hygiene, die CRD braucht, wird ein Server, den Sie patchen, und ein Datenverkehr, der weiterhin direkt zwischen den Endpunkten läuft. Ein anderes Sicherheitsmodell, kein leichteres.

## Das Fazit

Ist Chrome Remote Desktop sicher? Für den gelegentlichen privaten Gebrauch – den Zugriff auf den eigenen PC, die Unterstützung eines Verwandten – ja, es ist einigermaßen sicher sowie einfach und kostengünstig. Bewerten Sie es entsprechend. Aktivieren Sie die Zwei-Faktor-Authentifizierung für Ihr Google-Konto, wählen Sie eine PIN, die nicht Ihr Geburtstag ist, und lesen Sie niemals einen Zugriffscode jemandem vor, der Sie zuerst kontaktiert hat – dann haben Sie die Risiken im Griff, die wirklich zählen.

An seine Grenzen stößt CRD bei Kontrolle und Skalierung: Es ist Closed Source, wird über die Google-Cloud vermittelt und bietet nur dünne Verwaltungsmöglichkeiten. Wenn Sie den Code überprüfen müssen, die Vermittlung auf eigener Infrastruktur behalten oder mehr als ein paar Rechner verwalten möchten, ist das der Punkt, an dem sich eine Open-Source-Lösung mit Self-Hosting lohnt – nicht weil CRD unsicher ist, sondern weil es nie versucht hat, dieses Tool zu sein.
