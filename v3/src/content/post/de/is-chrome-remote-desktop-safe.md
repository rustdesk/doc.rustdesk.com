---
publishDate: 2026-07-05T18:49:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Ist Chrome Remote Desktop sicher? Sicherheit und Einsatzgrenzen'
excerpt: 'Ist Chrome Remote Desktop sicher? Ein fairer Blick auf Verschlüsselung, PIN- und Google-Konto-Modell, die tatsächlichen Risiken und worin sich Self-Hosting unterscheidet.'
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: 'Sicherheit'
tags: ['Chrome Remote Desktop', 'Sicherheit']
author: 'RustDesk Team'
slug: 'ist-chrome-remote-desktop-sicher-eine-ehrliche-bewertung'
faq:
  - question: 'Ist die Nutzung von Chrome Remote Desktop sicher?'
    answer: 'Ja, für den privaten Gebrauch. Google dokumentiert vollständig verschlüsselte Sitzungen in Chrome Remote Desktop, eine PIN für den unbeaufsichtigten Zugriff und einmalige Zugriffscodes für Support-Sitzungen. Die wichtigsten Risiken sind eine schwache PIN, ein kompromittiertes Google-Konto und Betrüger, die Opfer zur Weitergabe eines Codes überreden. Aktivieren Sie die Zwei-Faktor-Authentifizierung für das Google-Konto und wählen Sie eine nicht naheliegende PIN.'
  - question: 'Ist Chrome Remote Desktop verschlüsselt?'
    answer: 'Ja. Google gibt an, dass alle Sitzungen in Chrome Remote Desktop vollständig verschlüsselt sind. Der Netzwerkleitfaden für Unternehmen beschreibt WebRTC-/ICE-Verbindungen, die nach Möglichkeit direkt zwischen den Computern und andernfalls über ein TURN-Relay laufen, und Chromium veröffentlicht den Remoting-Quellcode, sodass sich Host-, Client- und Protokollkomponenten prüfen lassen.'
  - question: 'Welche Sicherheitsrisiken birgt Chrome Remote Desktop?'
    answer: 'Die drei praktischen Risiken sind eine schwache oder leicht zu erratende PIN (das Minimum sind sechs Ziffern), die Kompromittierung des Google-Kontos, an das der Host gebunden ist, und Social-Engineering-Betrug, bei dem jemand ein Opfer zur Weitergabe eines Zugriffscodes überredet. Zwei-Faktor-Authentifizierung für das Google-Konto, eine nicht naheliegende PIN und die Regel, niemals einen Code an jemanden weiterzugeben, der Sie kontaktiert hat, bannen den Großteil der realen Gefahr.'
  - question: 'Kann ich Chrome Remote Desktop selbst hosten?'
    answer: 'Nein. Chromium veröffentlicht den Remoting-Quellcode von Chrome Remote Desktop, doch Googles Koordinationsdienst lässt sich nicht selbst hosten, sodass jede Verbindung über Google aufgebaut wird. RustDesk ist eine Alternative, die Sie selbst hosten können: RustDesk Server OSS, der kostenlose Community-Server, betreibt Ihre eigenen ID-/Rendezvous- und Relay-Dienste, und RustDesk Server Pro ergänzt eine Web-Konsole, Zugriffskontrolle und gebrandete Clients.'
metadata:
  description: 'Ist Chrome Remote Desktop sicher? Was Google zu Verschlüsselung und PIN-Schutz dokumentiert, praktische Risiken und das Vertrauensmodell des Google-Kontos.'
  keywords: 'ist Chrome Remote Desktop sicher, Chrome Remote Desktop Sicherheit, Chrome Remote Desktop Verschlüsselung, Chrome Remote Desktop PIN, Chrome Remote Desktop Risiken, CRD sicher'
---

Kurz gesagt: Für den privaten Gebrauch ist Chrome Remote Desktop (CRD) recht sicher. Es ist ein kostenloses, schnörkelloses Tool von Google, das Sitzungen verschlüsselt und den Zugriff mit einer PIN und Ihrem Google-Konto absichert. Die Einschränkungen: Google betreibt den Koordinationsdienst, die Verwaltung läuft über Googles Unternehmensrichtlinien statt über eine Support-Konsole, und wie jedes Remote-Tool kann CRD von Betrügern gegen Sie eingesetzt werden. Hier folgt die Analyse mit Quellen.

## Die kurze Antwort

Ja, für den privaten Gebrauch. CRD ist sicher genug für die Aufgabe, für die es gebaut wurde: den Zugriff auf den eigenen Rechner oder die Unterstützung eines Familienmitglieds über eine Verbindung, die Google für Sie absichert. Laut [der offiziellen Support-Dokumentation von Google](https://support.google.com/chrome/answer/1649523) sind alle Remote-Desktop-Sitzungen vollständig verschlüsselt, der unbeaufsichtigte Zugriff erfordert eine PIN, und einmalige Support-Sitzungen verwenden einen Zugriffscode, der nur ein einziges Mal funktioniert. Das ist eine vernünftige Basis für den privaten Gebrauch.

Für den Einsatz in Organisationen lässt sich mit Googles [Unternehmensrichtlinien](https://support.google.com/chrome/a/answer/2799701) und dem [Netzwerkleitfaden](https://support.google.com/chrome/a/answer/16364503) einschränken, wer CRD nutzen darf und wie es Verbindungen aufbaut; den Koordinationsdienst betreibt weiterhin Google.

## Wie Chrome Remote Desktop eine Sitzung schützt

Drei Mechanismen leisten die eigentliche Arbeit, alle dokumentiert auf den [Hilfeseiten von Google](https://support.google.com/chrome/answer/1649523):

- **Verschlüsselung und Routing.** Google gibt an, dass Sitzungen vollständig verschlüsselt sind. Der [Netzwerkleitfaden](https://support.google.com/chrome/a/answer/16364503) beschreibt ICE-/WebRTC-Verbindungen, die direkt, STUN-gestützt oder über ein TURN-Relay laufen können. Die Koordination nutzt Google-Dienste; die Sitzungsdaten laufen nicht immer über ein Google-Relay.
- **PIN für unbeaufsichtigten Zugriff.** Um auf einen Computer zuzugreifen, den Sie für dauerhaften Fernzugriff eingerichtet haben, geben Sie eine PIN ein. Sie verhindert, dass sich eine beliebige Person mit Zugriff auf Ihre Google-Sitzung unbemerkt verbindet.
- **Einmalige Zugriffscodes für den Support.** Wenn Sie jemandem in Echtzeit helfen, erzeugt der Host einen Code, der laut Google nur einmal funktioniert. Für eine fortgesetzte Freigabe ist in regelmäßigen Abständen eine erneute Bestätigung erforderlich.

Hinzu kommt das Google-Konto selbst, das sich mit Zwei-Faktor-Authentifizierung schützen lässt – und für den Fernzugriff unbedingt geschützt werden sollte. Für den privaten Gebrauch in einem vertrauenswürdigen Netzwerk reicht diese Kombination an Schutzmaßnahmen wirklich aus.

## Wo die eigentlichen Risiken liegen

Die Schwachstellen von CRD sind nicht exotisch. Es sind genau die drei, die sich unmittelbar aus seinem Design ergeben.

**Schwache PINs.** Die PIN ist das Schloss für den unbeaufsichtigten Zugriff, und das Minimum bei Google sind lediglich sechs Ziffern. Sechs Ziffern reichen aus, um einen einzelnen Rateversuch eines Fremden abzuwehren, aber Menschen wählen vorhersehbare Zahlen – Geburtstage, Wiederholungen, Zahlenfolgen –, wodurch der tatsächliche Suchraum weit kleiner ausfällt, als die Ziffernzahl vermuten lässt. Bei einem Rechner, der rund um die Uhr erreichbar bleibt, ist eine nachlässig gewählte PIN das wahrscheinlichste Einfallstor. Wählen Sie etwas, das nicht naheliegend ist.

**Kompromittierung des Google-Kontos.** Das Google-Konto ist Teil der Zugriffsgrenze von CRD: Erbeutet jemand Ihr Passwort per Phishing und haben Sie keine Zwei-Faktor-Authentifizierung aktiviert, gehört Ihre Liste der Remote-Desktops zu dem, was der Angreifer übernimmt. Schützen Sie das Konto mit 2FA, prüfen Sie die angemeldeten Geräte und widerrufen Sie Zugriffe, die Sie nicht mehr brauchen. Für den unbeaufsichtigten Zugriff ist zusätzlich die PIN des Hosts nötig, sodass das Kontopasswort allein nicht jeden Host öffnet.

**Betrug.** Ein Anrufer kann ein Opfer überreden, einen Zugriffscode weiterzugeben und eine Sitzung zu bestätigen. Das [FBI warnt vor dem Missbrauch von Fernzugriffssoftware](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software). Prüfen Sie Support-Anfragen unabhängig; keine Verschlüsselung schützt eine Sitzung, die bewusst für einen Betrüger freigegeben wurde. Siehe [Remote-Desktop-Betrug: So erkennen und vermeiden Sie ihn](/de/blog/remote-desktop-betrug-so-erkennen-und-vermeiden-sie-ihn).

## Was CRD Ihnen nicht bietet

CRD ist bewusst minimalistisch gehalten, und genau das macht für viele Menschen den Reiz aus. Es lohnt sich jedoch, die Kompromisse klar zu benennen, besonders wenn Sie es für mehr als den privaten Gebrauch in Betracht ziehen.

[Chromium veröffentlicht den Remoting-Quellcode von CRD](https://chromium.googlesource.com/chromium/src/+/main/remoting/), einschließlich Host-, Client- und Protokollkomponenten, doch Googles Koordinationsdienst lässt sich nicht selbst hosten. Googles [Unternehmensrichtlinien](https://support.google.com/chrome/a/answer/2799701) steuern, wer CRD nutzen darf; eine vom Kunden betriebene Support-Konsole mit Gerätegruppen, Zugriffsregeln pro Benutzer und gebrandeten Clients machen sie daraus nicht. Das ist keine Kritik an Google; dafür ist CRD schlicht nicht gedacht. Wenn Sie das brauchen, ist eine [Alternative zu Chrome Remote Desktop](/de/blog/alternative-zu-chrome-remote-desktop-selbst-gehostetes-rustdesk) der nächste Schritt.

Der **RustDesk-Client und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der [AGPL](https://github.com/rustdesk/rustdesk)**; **Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**. Server OSS betreibt Ihre eigenen ID-/Rendezvous- und Relay-Dienste, und Server Pro ergänzt eine Web-Konsole, Zugriffskontrolle pro Benutzer und Gerätegruppe sowie gebrandete Clients. So liegen Koordination und Zugriffsrichtlinien auf einer Infrastruktur, die Sie kontrollieren, statt hinter einem einzigen Cloud-Login. Das passt zu Anforderungen an [Datensouveränität und DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting).

Diese Offenheit wirkt in beide Richtungen, um das klarzustellen: Weil der Code öffentlich ist, sind es auch die eigenen Schwachstellen von RustDesk – behalten Sie daher die [aktuellen Releases](https://github.com/rustdesk/rustdesk/releases) und die Offenlegungen im Blick. Und Self-Hosting ersetzt lediglich eine Art von Wartungsaufwand durch eine andere – aus der Konto- und PIN-Hygiene, die CRD braucht, wird ein Server, den Sie patchen, und ein Datenverkehr, der weiterhin direkt zwischen den Endpunkten läuft. Ein anderes Sicherheitsmodell, kein leichteres.

## Das Fazit

Ist Chrome Remote Desktop sicher? Ja, für den privaten Gebrauch: den Zugriff auf den eigenen PC oder die Hilfe für einen Verwandten. CRD verschlüsselt Sitzungen, sichert den unbeaufsichtigten Zugriff mit einer PIN ab und nutzt für den Support einmalige Codes. Aktivieren Sie die Zwei-Faktor-Authentifizierung für Ihr Google-Konto, wählen Sie eine PIN, die nicht Ihr Geburtstag ist, und lesen Sie niemals einen Zugriffscode jemandem vor, der Sie zuerst kontaktiert hat – dann haben Sie die Risiken im Griff, die wirklich zählen.

An seine Grenzen stößt CRD bei Kontrolle und Skalierung: Google betreibt den Koordinationsdienst, und die Verwaltung läuft über Googles Unternehmensrichtlinien statt über eine Support-Konsole. Wenn Sie die Koordination auf eigener Infrastruktur behalten, Techniker auf Gerätegruppen beschränken oder eine Flotte aus einer Konsole verwalten müssen, lohnt sich ein Blick auf selbst gehostetes RustDesk – nicht weil CRD unsicher wäre, sondern weil es nie dieses Tool sein wollte.
