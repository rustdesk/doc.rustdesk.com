---
publishDate: 2026-06-30T17:26:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: is-anydesk-safe
draft: false
title: 'Ist AnyDesk sicher? Verschlüsselung, der Sicherheitsvorfall 2024 und Betrugsmaschen'
excerpt: 'Ist AnyDesk sicher? Ein fairer Blick auf die Verschlüsselung, den Sicherheitsvorfall 2024 in den Produktivsystemen und warum Betrüger die Software missbrauchen – dazu ein Vergleich mit Open Source.'
image: ~/assets/images/blog/is-anydesk-safe-og.webp
category: 'Sicherheit'
tags: ['AnyDesk', 'Sicherheit']
author: RustDesk Team
slug: 'ist-anydesk-sicher-verschlusselung-der-sicherheitsvorfall-2024-und'
faq:
  - question: 'Ist die Nutzung von AnyDesk sicher?'
    answer: 'Ja, für den legitimen Einsatz. AnyDesk ist ein ausgereiftes kommerzielles Tool und dokumentiert TLS 1.2 mit 256-Bit-AES-Transportverschlüsselung, Zwei-Faktor-Authentifizierung für den unbeaufsichtigten Zugriff und Zugriffskontrolllisten. Die wichtigsten Risiken sind der Einbruch in die Produktivsysteme vom 2. Februar 2024, die standardmäßige Koordination über die eigene Cloud von AnyDesk (On-Premises gibt es bei Ultimate) und Betrüger, die Opfer zur Installation überreden.'
  - question: 'Wurde AnyDesk gehackt?'
    answer: 'Ja. AnyDesk hat am 2. Februar 2024 kompromittierte Produktivsysteme öffentlich gemacht. Die offizielle Erklärung beschreibt den Austausch von Zertifikaten, die Bereinigung der Systeme und vorsorgliche Passwort-Resets für my.anydesk.com und nennt keine Hinweise darauf, dass Endgeräte von Nutzern betroffen waren. Sicherheitsforscher von Akamai erörterten unabhängig davon gemeldete Risiken für Quellcode und Code-Signierung.'
  - question: 'Warum nutzen Betrüger AnyDesk?'
    answer: 'Weil AnyDesk kostenlos ist, sich in Sekunden installieren lässt und auf der gesteuerten Seite kein Konto braucht, rufen Tech-Support-Betrüger Opfer an oder schreiben ihnen und überreden sie, es zu installieren und die Kontrolle zu gewähren. Das ist ein Nutzungsrisiko, keine Schwachstelle von AnyDesk: Derselbe Trick funktioniert mit jedem Remote-Desktop-Tool, auch mit RustDesk. AnyDesk veröffentlicht Hinweise zur Missbrauchsprävention.'
  - question: 'Ist die Verschlüsselung von AnyDesk sicher?'
    answer: 'Laut Sicherheitsdokumentation von AnyDesk kommen TLS 1.2 mit AEAD, ein asymmetrischer Schlüsselaustausch mit RSA-2048 und 256-Bit-AES-Transportverschlüsselung zum Einsatz, ergänzt durch Perfect Forward Secrecy. Das sind branchenübliche Schutzmaßnahmen. Der Vorbehalt: Sie vertrauen einem Closed-Source-Client und standardmäßig der Cloud von AnyDesk, über die die Verbindung vermittelt wird. Sie verlassen sich also auf die operative Sicherheit des Anbieters, statt den Code selbst prüfen zu können.'
metadata:
  description: 'Ist AnyDesk sicher? Analyse mit Quellen: TLS/AES-Verschlüsselung, der Sicherheitsvorfall 2024, Missbrauch durch Betrüger und Kompromisse von Closed Source.'
  keywords: 'ist AnyDesk sicher, AnyDesk Sicherheit, AnyDesk Sicherheitsvorfall 2024, AnyDesk Betrug, AnyDesk Verschlüsselung, AnyDesk sicher nutzen, AnyDesk gehackt'
---

Die kurze Antwort: AnyDesk ist für den legitimen Einsatz sicher. Es ist ein ausgereiftes kommerzielles Remote-Desktop-Produkt mit Verschlüsselung nach gängigem Standard, keine Malware. Kennen sollten Sie diese Risiken: Die Software ist Closed Source und wird standardmäßig über die Cloud von AnyDesk koordiniert, AnyDesk hat im Februar 2024 einen Einbruch in seine Produktivsysteme gemeldet, und Betrüger missbrauchen das Tool massiv. Hier ist das Gesamtbild mit Quellen.

## Die kurze Antwort

Ja, für den bewussten, legitimen Einsatz. AnyDesk dokumentiert TLS 1.2 mit 256-Bit-AES-Transportverschlüsselung, Zwei-Faktor-Authentifizierung für den unbeaufsichtigten Zugriff und Zugriffskontrolllisten. Drei Dinge bestimmen, wie Sie es einsetzen sollten: der [Einbruch in die Produktivsysteme vom 2. Februar 2024](https://anydesk.com/en/public-statement-2-2-2024), die standardmäßige Koordination über die eigene Cloud von AnyDesk (bei Ultimate gibt es eine On-Premises-Appliance) und Tech-Support-Betrüger, die Opfer zur Installation überreden. Keiner dieser Punkte macht die _Installation_ unsicher; alle bestimmen, wie Sie die Software _nutzen_.

## Wie AnyDesk Ihre Sitzungen absichert

Laut [AnyDesks eigener Sicherheitsdokumentation](https://anydesk.com/en/security) werden Sitzungen mit TLS 1.2 unter Verwendung von AEAD, einem asymmetrischen RSA-2048-Schlüsselaustausch zur Verifizierung der Endpunkte und zum Schutz vor Man-in-the-Middle-Angriffen sowie einer 256-Bit-AES-Transportverschlüsselung abgesichert, ergänzt durch Perfect Forward Secrecy dank eines ephemeren Schlüsselaustauschs. Auf Kontoebene unterstützt AnyDesk Zwei-Faktor-Authentifizierung (TOTP) für den unbeaufsichtigten Zugriff, eine Zugriffskontrollliste bzw. Allowlist, mit der Sie festlegen, wer sich verbinden darf, sowie gesalzenes Passwort-Hashing. (Einige Materialien von AnyDesk nennen neuere TLS-Versionen; maßgeblich ist die oben verlinkte Sicherheitsseite.)

Das sind solide, branchenübliche Schutzmaßnahmen – vergleichbar mit dem, was jeder ernstzunehmende Wettbewerber einsetzt. Auf der Transportebene gibt es hier nichts Beunruhigendes. Die interessanten Fragen betreffen das _Vertrauensmodell_ und das _menschliche Verhalten_, nicht die Cipher-Suites.

## Der AnyDesk-Sicherheitsvorfall 2024: Was tatsächlich geschah

Am **2. Februar 2024** [meldete AnyDesk kompromittierte Produktivsysteme](https://anydesk.com/en/public-statement-2-2-2024). Die Erklärung beschreibt die Incident Response mit CrowdStrike, Widerruf und Austausch von Zertifikaten, die Bereinigung der Systeme und vorsorgliche Passwort-Resets für das Web-Portal. [Akamais Analyse](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) erörtert gemeldete Risiken für Quellcode und Code-Signierung getrennt von der öffentlichen Erklärung des Herstellers.

[AnyDesk erklärte, **keine Hinweise auf betroffene Endgeräte von Nutzern** zu haben](https://anydesk.com/en/public-statement-2-2-2024) und keine Zugangsdaten zu speichern, mit denen sich Verbindungen zu diesen Geräten herstellen ließen.

Die Lehre daraus ist nicht, dass AnyDesk besonders unsicher wäre. Es geht um das **Konzentrationsrisiko beim Anbieter**: Wenn ein Dritter die Infrastruktur betreibt, die Ihre Sitzungen koordiniert und Ihre Kontodaten speichert, ist eine Kompromittierung dort eine, die Sie weder gewählt haben noch verhindern konnten.

## Social-Engineering-Betrug ist ein eigenes Risiko

Für die meisten Privatpersonen ist die größte Gefahr im Zusammenhang mit AnyDesk Social Engineering, keine CVE. Das [FBI warnt, dass Tech-Support-Betrüger Opfer anweisen, Fernzugriffssoftware zu installieren](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software), und den gewährten Zugriff anschließend missbrauchen; AnyDesk veröffentlicht genau aus diesem Grund [Hinweise zur Missbrauchsprävention](https://anydesk.com/en/abuse-prevention). Das Risiko liegt darin, wer zur Verbindung berechtigt wird, nicht in der Stärke der Sitzungsverschlüsselung.

Warum ausgerechnet AnyDesk? Der Download ist kostenlos, die Installation dauert nur Sekunden, und – entscheidend – die Person, die _ferngesteuert_ wird, muss kein Konto anlegen. Diese geringe Einstiegshürde ist ein Vorteil für legitimen Support und ein Geschenk für Betrüger, die ihr Ziel anrufen oder anschreiben, ein dringendes „Problem“ erfinden und es Schritt für Schritt dazu bringen, die volle Fernsteuerung zu gewähren.

Das ist der faire Punkt, der in reißerischen Schlagzeilen oft untergeht: **Das ist ein Nutzungsrisiko, keine Schwachstelle von AnyDesk.** Genau derselbe Trick funktioniert mit TeamViewer, Chrome Remote Desktop oder RustDesk. Keine noch so starke AES-Verschlüsselung schützt Sie, wenn Sie einem Fremden am Telefon freiwillig die Schlüssel übergeben. Die Abwehrstrategie haben wir separat aufgeschrieben: [Wie Sie Remote-Desktop-Betrug vermeiden](/de/blog/remote-desktop-betrug-so-erkennen-und-vermeiden-sie-ihn). Dieselbe Überlegung gilt auch für die Frage, [ob Chrome Remote Desktop sicher ist](/de/blog/ist-chrome-remote-desktop-sicher-eine-ehrliche-bewertung).

## Closed Source und Cloud-Vermittlung: die Vertrauensfrage

Hier trennen sich die Wege der Modelle von AnyDesk und RustDesk – nicht bei der Frage, ob die Verschlüsselung gut ist, sondern bei der Frage, _was Sie einfach glauben müssen._

AnyDesk ist proprietär. Sie können den Quellcode des Clients nicht einsehen, ihn nicht selbst kompilieren und nicht unabhängig überprüfen, was er tut; Sie vertrauen darauf, dass sich die Binärdatei so verhält, wie AnyDesk es verspricht. Und standardmäßig werden Ihre Sitzungen über die Cloud von AnyDesk vermittelt, sodass Verfügbarkeit und Sicherheit dieser Infrastruktur in der Verantwortung des Anbieters liegen – wie sich 2024 gezeigt hat. AnyDesk Ultimate bietet eine On-Premises-Appliance, die diese Lücke für Kunden dieser Stufe verkleinert.

RustDesk setzt bei beiden Punkten auf der Gegenseite an. Der Client von RustDesk und RustDesk Server OSS (der kostenlose Community-Server) stehen [als Open Source unter der AGPL](https://github.com/rustdesk/rustdesk); Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten. Der Client ist überprüfbar und selbst kompilierbar – Sie müssen einer proprietären Binärdatei also nicht blind vertrauen. Und weil Sie den ID-/Rendezvous-Server und das Relay [selbst hosten](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) können, gehört die Infrastruktur, die Ihre Sitzungen vermittelt, Ihnen statt einem Dritten – genau die Anbieterkonzentration, die 2024 greifbar wurde. Das unterstützt auch ein [Konzept für Datensouveränität](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting).

Um ebenso fair zu bleiben: Das verlagert das Vertrauen, statt es zu beseitigen. Weil der Code offen ist, sind auch die eigenen Schwachstellen von RustDesk öffentlich – verfolgen Sie daher die [aktuellen Releases](https://github.com/rustdesk/rustdesk/releases) und die Schwachstellenmeldungen. Und überprüfbare, selbst gehostete Infrastruktur ist ein Ausgangspunkt, keine Garantie: Der Sitzungsverkehr fließt weiterhin direkt zwischen den Endpunkten, und für das Patchen des Servers sind Sie selbst verantwortlich.

## Ist AnyDesk also sicher?

Für den bewussten, legitimen Einsatz: ja. AnyDesk ist ein ausgereiftes Produkt mit Verschlüsselung nach gängigem Standard und sinnvollen Kontoschutzfunktionen. Halten Sie es aktuell, schützen Sie den unbeaufsichtigten Zugriff mit Zwei-Faktor-Authentifizierung, beschränken Sie eingehende Verbindungen mit der Zugriffskontrollliste und prüfen Sie jede Support-Anfrage.

Die Einschränkungen betreffen das Vertrauen, nicht die Verschlüsselung. Das standardmäßige Closed-Source-Modell mit Koordination über die Cloud bedeutet, dass Sie sich auf die operative Sicherheit von AnyDesk verlassen – die 2024 einen echten Dämpfer erlitten hat; Ultimate On-Premises verkleinert diese Lücke. Wenn Ihnen dieser Kompromiss nicht behagt, ändert [eine selbst gehostete TeamViewer- und AnyDesk-Alternative](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative) die Vertrauensbasis: prüfbarer Code und eine Koordination, die Sie selbst kontrollieren – auf Kosten des eigenen Serverbetriebs.

Für welches Tool Sie sich auch entscheiden: Die Regel, die den größten Schaden verhindert, ist zugleich die einfachste: Installieren Sie niemals Fernzugriffssoftware, nur weil jemand, der _Sie_ kontaktiert hat, Sie darum bittet.
