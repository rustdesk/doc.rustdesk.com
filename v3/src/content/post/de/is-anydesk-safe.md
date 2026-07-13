---
publishDate: 2026-06-30T17:26:00Z
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
    answer: 'Bei legitimer Nutzung ist AnyDesk ein ausgereiftes, grundsätzlich sicheres kommerzielles Remote-Desktop-Tool. Die Software verschlüsselt Sitzungen mit gängiger Transportsicherheit und bietet Zwei-Faktor-Authentifizierung sowie Zugriffskontrolllisten. Zwei Punkte sollte man im Hinterkopf behalten: Erstens ist AnyDesk closed source, und die Verbindungen werden standardmäßig über die Cloud des Anbieters vermittelt. Zweitens geht die größte reale Gefahr nicht von einer Software-Schwachstelle aus, sondern von Tech-Support-Betrügern, die Opfer dazu überreden, die Software zu installieren.'
  - question: 'Wurde AnyDesk gehackt?'
    answer: 'Anfang 2024 machte AnyDesk einen Sicherheitsvorfall in seinen Produktivsystemen öffentlich, bei dem Angreifer Quellcode und Material zur Code-Signierung erbeuteten. AnyDesk widerrief Zertifikate, veröffentlichte einen neu signierten Client und setzte die Passwörter des Web-Portals zurück. Das Unternehmen erklärte, dass keine Endnutzergeräte betroffen gewesen seien. Den genauen Umfang und die Daten sollte man anhand der offiziellen Mitteilungen von AnyDesk und neutraler Berichterstattung überprüfen.'
  - question: 'Warum nutzen Betrüger AnyDesk?'
    answer: 'Weil es kostenlos ist, sich schnell installieren lässt und die Person, die ferngesteuert wird, kein Konto benötigt, ist AnyDesk ein beliebtes Werkzeug für Tech-Support-Betrüger, die Opfer anrufen oder anschreiben und sie dazu bewegen, Fernzugriff zu gewähren. Das ist ein Nutzungsrisiko und keine Schwachstelle von AnyDesk – derselbe Social-Engineering-Trick funktioniert mit jedem Remote-Desktop-Tool, auch mit RustDesk.'
  - question: 'Ist die Verschlüsselung von AnyDesk sicher?'
    answer: 'Laut Sicherheitsdokumentation von AnyDesk kommen TLS 1.2 mit AEAD, ein asymmetrischer Schlüsselaustausch mit RSA-2048 sowie eine 256-Bit-AES-Transportverschlüsselung zum Einsatz, ergänzt durch Perfect Forward Secrecy. Das sind branchenübliche Schutzmaßnahmen. Der Vorbehalt: Man vertraut einem Closed-Source-Client und standardmäßig der Cloud von AnyDesk, über die die Verbindung vermittelt wird. Man verlässt sich also auf die operative Sicherheit des Anbieters, statt den Code selbst prüfen zu können.'
metadata:
  description: 'Ist AnyDesk sicher? Eine quellenbasierte Analyse der TLS/AES-Verschlüsselung, des Sicherheitsvorfalls 2024 in den Produktivsystemen, des Missbrauchs durch Betrüger und der Kompromisse durch Closed Source.'
  keywords: 'ist AnyDesk sicher, AnyDesk Sicherheit, AnyDesk Sicherheitsvorfall 2024, AnyDesk Betrug, AnyDesk Verschlüsselung, AnyDesk sicher nutzen, AnyDesk gehackt'
---

Die kurze Antwort: Ja, AnyDesk ist ein legitimes, grundsätzlich sicheres kommerzielles Remote-Desktop-Produkt für alle, die es bewusst einsetzen. Die Risiken, die man kennen sollte, bestehen nicht darin, dass AnyDesk Malware wäre – das ist es nicht –, sondern darin, dass die Software closed source ist, Verbindungen standardmäßig über die Cloud vermittelt werden, es 2024 einen nennenswerten Sicherheitsvorfall gab und AnyDesk zu den Tools zählt, die Betrüger am liebsten missbrauchen. Im Folgenden liefern wir das faire, quellenbasierte Bild.

## Die kurze Antwort

AnyDesk sichert seine Sitzungen mit gängiger, anerkannter Verschlüsselung ab und bietet die Kontoschutzmaßnahmen, die man erwarten würde. Helpdesks und Unternehmen nutzen die Software täglich, ohne dass es zu Zwischenfällen kommt. Für Ihre Entscheidung sind zwei Vorbehalte wichtig: Erstens vertrauen Sie einem proprietären Client und standardmäßig der eigenen Cloud von AnyDesk, über die Verbindungen vermittelt werden – Sie können den Code also nicht prüfen und übernehmen die operative Sicherheit des Anbieters als Ihre eigene. Spätestens [2024](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/) war das alles andere als abstrakt. Zweitens – und das betrifft normale Nutzer eher – ist AnyDesk ein beliebtes Requisit bei Remote-Access-Betrugsmaschen. Keiner dieser Punkte macht die _Installation_ unsicher; beide bestimmen jedoch, wie Sie die Software _nutzen_ sollten.

## Wie AnyDesk Ihre Sitzungen absichert

Laut [AnyDesks eigener Sicherheitsdokumentation](https://anydesk.com/en/security) werden Sitzungen mit TLS 1.2 unter Verwendung von AEAD, einem asymmetrischen RSA-2048-Schlüsselaustausch zur Verifizierung der Endpunkte und zum Schutz vor Man-in-the-Middle-Angriffen sowie einer 256-Bit-AES-Transportverschlüsselung abgesichert, ergänzt durch Perfect Forward Secrecy dank eines ephemeren Schlüsselaustauschs. Auf Kontoebene unterstützt AnyDesk Zwei-Faktor-Authentifizierung (TOTP) für unbeaufsichtigten Zugriff, eine Zugriffskontrollliste bzw. Allowlist zur Einschränkung, wer sich verbinden darf, sowie gesalzenes Passwort-Hashing. (Einige Materialien von AnyDesk verweisen auf neuere TLS-Versionen; maßgeblich ist die jeweils aktuelle Seite, auf der Sie die Details überprüfen sollten.)

Das sind solide, branchenübliche Schutzmaßnahmen – vergleichbar mit dem, was jeder ernstzunehmende Wettbewerber einsetzt. Auf der Transportebene gibt es hier nichts Beunruhigendes. Die interessanten Fragen betreffen das _Vertrauensmodell_ und das _menschliche Verhalten_, nicht die Cipher-Suites.

## Der AnyDesk-Sicherheitsvorfall 2024: Was tatsächlich geschah

Anfang 2024 machte AnyDesk einen Sicherheitsvorfall in seinen **Produktivsystemen** öffentlich. Laut [Infosecurity Magazine](https://www.infosecurity-magazine.com/news/anydesk-hit-cyberattack-customer/) und Sicherheitsanalysten von [Akamai](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations) verschafften sich Angreifer Zugang zur internen Infrastruktur und erbeuteten Quellcode sowie Material zur Code-Signierung. Die Reaktion von AnyDesk umfasste nach eigenen Angaben die Hinzuziehung externer Forensiker, den Widerruf und Austausch sicherheitsrelevanter Zertifikate, die Veröffentlichung eines neu signierten Client-Builds sowie das vorsorgliche Zurücksetzen der Passwörter für das Web-Portal.

Fairerweise muss man AnyDesk zugutehalten, dass das Unternehmen erklärte, es seien **keine Endnutzergeräte betroffen** gewesen und die Systeme seien so konzipiert, dass sie keine privaten Schlüssel, Tokens oder Passwörter speichern, mit denen sich ein Angreifer mit Kundenrechnern verbinden könnte. Genaue Daten und Zahlen wurden damals unterschiedlich berichtet; prüfen Sie die Details daher anhand der offiziellen Mitteilungen von AnyDesk und neutraler Berichterstattung – und nicht anhand einer einzelnen Zusammenfassung, auch nicht dieser hier.

Die ehrliche Erkenntnis lautet nicht „AnyDesk ist in besonderer Weise unsicher“. Jeder große Anbieter von Remote-Access-Software hat eine Geschichte von Sicherheitsvorfällen. Es geht vielmehr um das **Risiko der Anbieterkonzentration**: Wenn ein Drittanbieter die Infrastruktur betreibt, die Ihre Sitzungen vermittelt und Ihre Kontodaten speichert, dann ist eine Kompromittierung dort eine Kompromittierung, die Sie sich nicht ausgesucht haben und nicht verhindern konnten.

## Das größere Risiko ist kein Programmfehler – es sind Betrugsmaschen

Für die meisten Privatpersonen hat die größte AnyDesk-bezogene Gefahr nichts mit einer CVE zu tun. Es ist Social Engineering. Das [FBI hat davor gewarnt](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software), dass Tech-Support-Betrüger Opfer routinemäßig dazu bringen, Remote-Desktop-Software zu installieren, um den erlangten Zugriff anschließend zum Leerräumen von Finanzkonten zu nutzen. AnyDesk taucht in diesen Maschen ständig auf, und AnyDesk selbst veröffentlicht [Hinweise zur Missbrauchsprävention](https://anydesk.com/en/abuse-prevention) – gerade weil die Software so häufig als Waffe eingesetzt wird.

Warum ausgerechnet AnyDesk? Der Download ist kostenlos, die Installation dauert nur Sekunden, und – entscheidend – die Person, die _ferngesteuert_ wird, muss kein Konto anlegen. Diese geringe Einstiegshürde ist ein Vorteil für legitimen Support und ein Geschenk für Betrüger, die ihr Ziel anrufen oder anschreiben, ein dringendes „Problem“ erfinden und es Schritt für Schritt dazu bringen, die volle Fernsteuerung zu gewähren.

Das ist der faire Punkt, der in reißerischen Schlagzeilen oft untergeht: **Das ist ein Nutzungsrisiko, keine Schwachstelle von AnyDesk.** Genau derselbe Trick funktioniert mit TeamViewer, Chrome Remote Desktop oder RustDesk. Keine noch so starke AES-Verschlüsselung schützt Sie, wenn Sie einem Fremden am Telefon freiwillig die Schlüssel übergeben. Die Abwehrstrategie haben wir separat aufgeschrieben: [Wie Sie Remote-Desktop-Betrug vermeiden](/de/blog/remote-desktop-betrug-so-erkennen-und-vermeiden-sie-ihn). Dieselbe Überlegung gilt auch für die Frage, [ob Chrome Remote Desktop sicher ist](/de/blog/ist-chrome-remote-desktop-sicher-eine-ehrliche-bewertung).

## Closed Source und Cloud-Vermittlung: die Vertrauensfrage

Hier trennen sich die Wege der Modelle von AnyDesk und RustDesk – nicht bei der Frage, ob die Verschlüsselung gut ist, sondern bei der Frage, _was Sie einfach glauben müssen._

AnyDesk ist proprietär. Sie können den Quellcode des Clients nicht einsehen, ihn nicht selbst kompilieren und nicht unabhängig überprüfen, was er tut; Sie vertrauen darauf, dass sich die Binärdatei so verhält, wie AnyDesk es verspricht. Und standardmäßig werden Ihre Sitzungen über die Cloud von AnyDesk vermittelt, sodass Verfügbarkeit und Sicherheit dieser Infrastruktur in der Verantwortung des Anbieters liegen – wie sich 2024 gezeigt hat. Die höheren Tarifstufen von AnyDesk bieten eine On-Premises-Appliance an, die diese Lücke für zahlende Kunden verkleinert.

RustDesk setzt bei beiden Annahmen an der entgegengesetzten Seite an. Weil es [Open Source unter der AGPL](https://github.com/rustdesk/rustdesk) ist, ist der Client überprüfbar und selbst kompilierbar – Sie müssen einer proprietären Binärdatei also nicht blind vertrauen. Und weil Sie den ID-/Rendezvous-Server und das Relay [selbst hosten](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) können, gehört die Infrastruktur, die Ihre Sitzungen vermittelt, Ihnen und nicht einem Dritten – genau die Anbieterkonzentration, die 2024 konkret wurde. Das kann außerdem ein [Data-Sovereignty-Konzept](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) unterstützen, wobei Endpunkt-Standorte, Aufbewahrungsfristen und rechtliche Pflichten weiterhin bewertet werden müssen.

Um ebenso fair zu bleiben: Das verlagert das Vertrauen, statt es zu beseitigen. Weil der Code offen ist, sind auch die eigenen Schwachstellen von RustDesk öffentlich – verfolgen Sie daher die [aktuellen Releases](https://github.com/rustdesk/rustdesk/releases) und die Schwachstellenmeldungen. Und überprüfbare, selbst gehostete Infrastruktur ist ein Ausgangspunkt, keine Garantie: Der Sitzungsverkehr fließt weiterhin direkt zwischen den Endpunkten, und Sie sind selbst für das Patchen des Servers verantwortlich.

## Ist AnyDesk also sicher?

Für bewusste, legitime Nutzung: ja – es handelt sich um ein ausgereiftes Produkt mit branchenüblicher Verschlüsselung und sinnvollen Kontrollmechanismen für Konten, das täglich in großem Maßstab sicher eingesetzt wird. Betrachten Sie es als hinreichend sicher, denn genau das belegen die vorliegenden Fakten.

Die Einschränkungen sind der ehrliche Teil. Das standardmäßig cloud-vermittelte Closed-Source-Modell bedeutet, dass Sie der operativen Sicherheit von AnyDesk vertrauen – die 2024 einen echten Dämpfer erlitten hat. Und der häufigste reale Schaden entsteht dadurch, dass Betrüger ausnutzen, wie leicht sich die Software installieren lässt – ein menschliches Problem, kein kryptografisches. Wenn Ihnen diese Kompromisse nicht behagen, ändert eine [Open-Source-Alternative zum Selbsthosten](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative) die Vertrauensbasis: überprüfbarer Code und eine Vermittlung, die Sie selbst kontrollieren – auf Kosten des eigenen Serverbetriebs.

Für welches Tool Sie sich auch entscheiden: Die Regel, die den größten Schaden verhindert, ist zugleich die einfachste: Installieren Sie niemals Remote-Access-Software, nur weil jemand, der _Sie_ kontaktiert hat, Sie darum bittet.
