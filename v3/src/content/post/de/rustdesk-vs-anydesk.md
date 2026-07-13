---
publishDate: 2026-07-08T18:00:00Z
lang: 'de'
translationKey: 'rustdesk-vs-anydesk'
draft: false
title: 'RustDesk vs AnyDesk: Selbst gehostete Open-Source-Remotedesktop-Software'
excerpt: 'Ein umfassender Vergleich von RustDesk und AnyDesk: Funktionen, Betriebssystem-Unterstützung, Sicherheit, Preismodelle und die Kompromisse von Self-Hosting und Open Source.'
image: ~/assets/images/blog/rustdesk-vs-anydesk-og.webp
category: 'Vergleiche'
tags: ['RustDesk', 'AnyDesk', 'Vergleich']
author: 'RustDesk Team'
slug: 'rustdesk-vs-anydesk-selbst-gehostete-open-source-remotedesktop-software'
faq:
  - question: 'Ist RustDesk eine kostenlose Open-Source-Alternative zu AnyDesk?'
    answer: 'Ja. RustDesk ist Open Source unter der AGPL-Lizenz, und der Community-Server lässt sich kostenlos und ohne Ablaufdatum selbst hosten. Das kostenpflichtige Server Pro ergänzt eine zentrale Verwaltung und wird nach Login-Nutzern und verwalteten Geräten lizenziert.'
  - question: 'Lässt sich RustDesk im Gegensatz zu AnyDesk vollständig selbst hosten?'
    answer: 'Ja — Self-Hosting ist der Kern von RustDesk: Der ID-/Rendezvous-Server und der Relay-Server laufen auf Ihrer eigenen Maschine oder einem VPS. AnyDesk vermittelt Verbindungen standardmäßig über die eigene Cloud und bietet eine On-Premises-Appliance nur in der höchsten Tarifstufe an.'
  - question: 'Wie schneidet die Preisgestaltung von RustDesk im Vergleich zu AnyDesk ab?'
    answer: 'AnyDesk lizenziert nach Tarifstufe mit tarifspezifischen gleichzeitigen Verbindungen; RustDesk lizenziert nach Login-Nutzern plus verwalteten Geräten, mit unbegrenzter Gleichzeitigkeit in den Standardtarifen (nur Customized V2 begrenzt und bepreist sie separat). Vergleichen Sie aktuelle schriftliche Angebote für denselben Leistungsumfang, einschließlich der Kosten für den Betrieb Ihres eigenen Servers.'
  - question: 'Unterstützt RustDesk wie AnyDesk SSO und LDAP?'
    answer: 'RustDesk enthält LDAP und OIDC-SSO ab dem Basic-Tarif. AnyDesk listet SSO laut Preisprüfung vom 7. Juli 2026 in seiner Ultimate-Stufe; bestätigen Sie die Verzeichnisanforderungen in einem schriftlichen Angebot.'
metadata:
  description: 'RustDesk und AnyDesk im ausführlichen Vergleich: Funktionen, Betriebssystem-Unterstützung, Sicherheit, Preismodelle sowie klare Vor- und Nachteile.'
  keywords: 'RustDesk vs AnyDesk, AnyDesk vs RustDesk, RustDesk AnyDesk Vergleich, selbst gehostete AnyDesk Alternative'
---

RustDesk und AnyDesk nähern sich dem Thema Remotedesktop von entgegengesetzten Seiten: AnyDesk ist ein proprietäres Produkt, dessen Verbindungen über die Cloud des Anbieters vermittelt werden, während RustDesk Open Source ist und dafür konzipiert wurde, auf einem Server zu laufen, den Sie selbst kontrollieren. Dieser Unterschied — wer die Infrastruktur hostet und wer den Code lesen kann — zieht sich durch den gesamten weiteren Vergleich, vom Sicherheitsmodell bis zur Frage, wie Gleichzeitigkeit bepreist wird.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Funktionsvergleich auf einen Blick](#funktionsvergleich-auf-einen-blick)
- [Betriebssystem- und Plattformunterstützung](#betriebssystem--und-plattformunterstützung)
- [Sicherheit und Identität](#sicherheit-und-identität)
- [Lizenz- und Preismodelle](#lizenz--und-preismodelle)
- [Vor- und Nachteile](#vor--und-nachteile)
- [Warum Teams trotzdem zu RustDesk wechseln](#warum-teams-trotzdem-zu-rustdesk-wechseln)
- [RustDesk ausprobieren](#rustdesk-ausprobieren)
- [Weiterführende Artikel](#weiterführende-artikel)
- [Quellen](#quellen)

## Überblick

**AnyDesk** ist ein proprietäres, kommerzielles Remotedesktop-Produkt der AnyDesk Software GmbH (ehemals philandro Software GmbH) mit Sitz in Stuttgart, gegründet 2014. Seinen Ruf hat sich das Unternehmen mit einem schlanken Client und einem latenzarmen, proprietären Codec (DeskRT) erarbeitet; heute ist es ein weitverbreitetes Tool, das von einzelnen Technikern, Helpdesks und Unternehmen eingesetzt wird. AnyDesk ist Closed Source: Standardmäßig verbinden Sie sich über die Cloud-Infrastruktur von AnyDesk, und die höheren Tarife bieten zusätzlich eine On-Premises-Appliance-Option. Es handelt sich um ein verwaltetes Angebot — Sie mieten Zugang zu dem Netzwerk, das AnyDesk betreibt.

**RustDesk** kehrt diese Standardvorgaben um. Es ist eine Open-Source-Plattform unter der AGPL: Statt Zugang zu einem von AnyDesk betriebenen Netzwerk zu mieten, betreiben Sie den ID-/Rendezvous-Server und den Relay-Server selbst auf _Ihrer eigenen_ Maschine oder einem VPS — Sitzungsvermittlung und Datenverkehr bleiben auf einer Infrastruktur, die Sie selbst kontrollieren, und der Client kann geprüft und aus dem Quellcode gebaut werden. Ein Kontrast zu AnyDesk sticht hervor: Es gibt einen kostenlosen Community-Server, der zeitlich unbegrenzt und kostenlos läuft. RustDesk Pro ergänzt dies um eine selbst gehostete Web-Konsole, einen Generator für individuell gebrandete Clients, Gerätegruppen und ein gemeinsames Adressbuch. Es richtet sich an Teams, die Eigentum und Datenhoheit wollen und den Betrieb eines eigenen Servers nicht scheuen — das ist zugleich die größte Stärke und der wichtigste Punkt, den man vor der Entscheidung abwägen sollte.

Der Rest dieses Artikels vergleicht beide Produkte Funktion für Funktion und beleuchtet anschließend die Aspekte der Entscheidung, die sich nicht in eine Tabelle pressen lassen.

## Funktionsvergleich auf einen Blick

Beide Tools decken den grundlegenden Remote-Support-Workflow ab. Die Unterschiede liegen weniger darin, „ob Funktion X vorhanden ist“, sondern vielmehr darin, _wie_ man sie bekommt — gehostet vs selbst gehostet, pro Sitzplatz vs pro Nutzer und Gerät, hinter einer Tarifstufe verborgen vs frei im offenen Client verfügbar.

| Funktion                               | RustDesk                                                                                              | AnyDesk                                                     |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Remote-Ansicht und -Steuerung          | Ja                                                                                                    | Ja                                                          |
| Unbeaufsichtigter Zugriff              | Ja (dauerhaftes Passwort/verwaltete Geräte)                                                           | Ja                                                          |
| Dateiübertragung                       | Ja (in beide Richtungen)                                                                              | Ja (Dateibrowser-Modus)                                     |
| Text-Chat während der Sitzung          | Ja                                                                                                    | Ja                                                          |
| Sitzungsaufzeichnung                   | Ja (automatische Aufzeichnung eingehender/ausgehender Sitzungen möglich)                              | Ja (lokal gespeichert; auf beiden Seiten)                   |
| Remote-Druck                           | Ja — Remote-Drucker für eingehende Verbindungen (Windows)                                             | Ja (AnyDesk-Drucker)                                        |
| Mobile Clients                         | Android; iOS nur als Steuerungsgerät                                                                  | Android; iOS/iPadOS nur ausgehend                           |
| Selbst gehosteter Server               | Ja — Kernbestandteil des Produkts (Server Pro)                                                        | Appliance nur in der höchsten Tarifstufe verfügbar          |
| Open Source                            | Ja (AGPL)                                                                                             | Nein (proprietär)                                           |
| Individuell gebrandeter Client         | Ja (integrierter Generator, ab Basic-Tarif)                                                           | Ja (Anpassung/eigener Namespace in der höchsten Tarifstufe) |
| REST-API                               | Ja                                                                                                    | Ja (my.anydesk-Konsole)                                     |
| Obergrenze gleichzeitiger Verbindungen | Unbegrenzt in den Standardtarifen; begrenzt bei [Customized V2](https://rustdesk.com/pricing#custom2) | Abhängig von der Tarifstufe (siehe Preise)                  |

Die RustDesk-Zeilen oben wurden anhand der offiziellen RustDesk-Dokumentation bestätigt; die AnyDesk-Zeilen stammen aus den Support-Dokumenten und Funktionsseiten von AnyDesk.

## Betriebssystem- und Plattformunterstützung

Beide Produkte sind auf dem Desktop wirklich plattformübergreifend einsetzbar. Die relevanten Lücken zeigen sich bei mobilen Geräten und bei weniger verbreiteten Desktop-Zielplattformen.

| Plattform     | RustDesk                                                                                                            | AnyDesk                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Windows       | Ja — x64, ARM64, 32-Bit                                                                                             | Ja (XP SP2 und höher)                                                                        |
| macOS         | Ja — Apple Silicon und Intel                                                                                        | Ja (11 Big Sur und höher)                                                                    |
| Linux         | Ja — x86_64, ARM64 und ARM32; starke Wayland-Unterstützung                                                          | Ja (Ubuntu/Debian/RHEL/SUSE/Mint)                                                            |
| Android       | Ja — arm64, arm32, x64 (Host und Steuerungsgerät)                                                                   | Ja (Steuerungs-Plug-in erforderlich)                                                         |
| iOS/iPadOS    | Nur als Steuerungsgerät (kein Host, aufgrund von Apple-Beschränkungen)                                              | Nur als Steuerungsgerät (kann nicht ferngesteuert werden, aufgrund von Apple-Beschränkungen) |
| Raspberry Pi  | Ja — offizielle ARM64-/ARM32-Linux-Builds                                                                           | Ja (Raspberry Pi OS 12+)                                                                     |
| Chrome OS     | — (kein ChromeOS-Client; Android-Builds werden über GitHub Releases/F-Droid bereitgestellt, nicht über Google Play) | Nur Ansicht (Steuerung nicht unterstützt)                                                    |
| tvOS/Apple TV | Nicht verfügbar                                                                                                     | Nur ausgehend (eingeschränkte Dateiübertragung/Aufzeichnung)                                 |

RustDesk führt offiziell Windows, macOS, Linux, Android und iOS auf. Die Dokumentation zu unterstützten Betriebssystemen von AnyDesk deckt zusätzlich ein paar Nischen-Zielplattformen ab (Chrome-OS-Ansicht, tvOS), unterliegt dabei aber derselben von Apple auferlegten Einschränkung, die alle betrifft: Auf iOS/iPadOS können Sie eine andere Maschine steuern, aber nicht vollständig von einer anderen aus gesteuert werden. Raspberry-Pi-Geräte werden auf RustDesk-Seite durch die offiziellen ARM64/ARM32-Linux-Builds abgedeckt; wenn Sie speziell einen Chrome-OS- oder Apple-TV-Client benötigen, prüfen Sie vor Ihrer Entscheidung den aktuellen Stand auf der Seite des jeweiligen Anbieters — diese Zielplattformen ändern sich.

## Sicherheit und Identität

Dies ist der Abschnitt, in dem sich die beiden Produkte nicht nur bei einzelnen Checkbox-Punkten, sondern grundsätzlich unterscheiden.

**Das Sicherheitsmodell von AnyDesk.** AnyDesk sichert Sitzungen mit TLS 1.2 (AEAD), einem asymmetrischen RSA-2048-Schlüsselaustausch, 256-Bit-AES-Transportverschlüsselung und Perfect Forward Secrecy durch einen ephemeren Diffie-Hellman-Handshake. Es bietet Zwei-Faktor-Authentifizierung (TOTP) für unbeaufsichtigten Zugriff, eine Zugriffskontrollliste / Allowlist zur Beschränkung, wer sich verbinden darf, sowie eine gesalzene Hash-Speicherung von Passwörtern. Das sind solide, branchenübliche Schutzmaßnahmen. Der Haken dabei: Sie vertrauen einem Closed-Source-Anbieter und standardmäßig dessen Cloud bei der Vermittlung Ihrer Verbindungen — Sie können den Code nicht prüfen und sind auf die eigene betriebliche Sicherheit von AnyDesk angewiesen.

Dieser letzte Punkt ist der strukturelle Kompromiss jedes anbieterbetriebenen Dienstes: Wenn ein Dritter Ihre Verbindungen vermittelt, wird dessen betriebliche Sicherheit Teil Ihrer eigenen Angriffsfläche, und ein Anbieter, der Fernzugriffs-Infrastruktur für viele Kunden betreibt, ist selbst ein hochwertiges Ziel. Dieses Konzentrationsrisiko können Sie weder prüfen noch kontrollieren.

**Das Sicherheitsmodell von RustDesk.** Um dieses Konzentrationsrisiko zu verringern, hören Sie auf, die Vermittlung auszulagern. RustDesk ist Open Source unter der AGPL, und mit Server Pro betreiben Sie Rendezvous-Server, Relay-Server und Konsole selbst — so ist die geschlossene Anbieter-Cloud, auf die AnyDesk standardmäßig setzt, schlicht nicht im Pfad. Das beseitigt keine Risiken durch Endpunkte, Zugangsdaten, Konfiguration oder Software-Schwachstellen; prüfen Sie im Rahmen der Härtung Ihrer Bereitstellung die [aktuellen RustDesk-Releases](https://github.com/rustdesk/rustdesk/releases) und öffentliche Schwachstellendatenbanken.

**Identitäts- und Verzeichnisintegration.** Für Teams, die in Active Directory oder bei einem OIDC-Identitätsanbieter zu Hause sind, spielen LDAP und SSO eine wichtige Rolle. RustDesk bietet **LDAP und SSO (OIDC) ab dem Basic-Tarif**. Die [offizielle Preisseite von AnyDesk](https://anydesk.com/en/pricing), geprüft am 7. Juli 2026, führt SSO in der Stufe Ultimate auf; bestätigen Sie die Verzeichnisanforderungen in einem schriftlichen Angebot. Wenn Single Sign-on zwingend erforderlich ist, achten Sie darauf, welche Tarifstufe der jeweilige Anbieter dafür voraussetzt, statt Identität als generischen Haken auf einer Liste zu behandeln. Die [Anleitung von RustDesk zur Einrichtung von LDAP und Active Directory](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/) beschreibt die Konfiguration im Detail.

Für Teams, deren gesamter Beweggrund darin besteht, Sitzungsdaten innerhalb der eigenen Landesgrenzen zu behalten, geht [Remotedesktop und Datenhoheit unter der DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) tiefer ins Detail, als wir es hier können, und der [RustDesk-Quellcode auf GitHub](https://github.com/rustdesk/rustdesk) steht zur Einsicht offen.

## Lizenz- und Preismodelle

Preise ändern sich ständig, daher vergleicht dieser Abschnitt _Modelle_ und keine genauen Dollarbeträge. Die unten aufgeführten Tarifgrenzen stammen von der [offiziellen Preisseite von AnyDesk](https://anydesk.com/en/pricing), geprüft am 7. Juli 2026; betrachten Sie sie nicht als dauerhaft gültig.

**AnyDesk** lizenziert nach einem Tarifstufenmodell und gibt an, dass alle aufgeführten Tarife jährlich abgerechnet werden:

- **Solo** — ein lizenzierter Nutzer, eine nicht skalierbare gleichzeitige Verbindung, drei registrierte ausgehende Geräte und 100 verwaltete Geräte.
- **Standard** — bis zu 20 Nutzer, eine enthaltene gleichzeitige Verbindung, Verbindungs-Add-ons bis zu 20 und 500 verwaltete Geräte.
- **Advanced** — bis zu 100 Nutzer, zwei enthaltene gleichzeitige Verbindungen, Verbindungs-Add-ons bis zu 50 und 1.000 verwaltete Geräte.
- **Ultimate** — individuell angebotenes Cloud- oder On-Premises-Hosting, beginnend bei fünf lizenzierten Nutzern und 2.000 verwalteten Geräten, wobei Nutzer- und Gleichzeitigkeitskapazität im Angebot festgelegt werden.

Zwei Dinge sollte man sich bei diesem Modell merken: die jährliche Abrechnung und die tarifspezifische Kapazität an gleichzeitigen Verbindungen. Um gleichzeitige Verbindungen zu skalieren, können Add-ons oder ein anderer Tarif nötig sein. Prüfen Sie vor der Budgetplanung die aktuelle Seite sowie ein datiertes schriftliches Angebot, da sich das öffentliche Angebotspaket nach dem Prüfdatum dieses Artikels ändern kann.

**RustDesk** lizenziert nach **Login-Nutzern plus verwalteten Geräten**, mit anteiligen Upgrades. Die Standardtarife beinhalten unbegrenzte gleichzeitige Verbindungen, während Customized V2 diese begrenzt und separat bepreist. Da sich Ihre Kosten aus Infrastruktur plus einer Lizenz, die Sie selbst kontrollieren, zusammensetzen — statt aus einer Cloud-Verlängerung pro Sitzplatz —, vergleichen Sie aktuelle Angebote für dieselben Anforderungen an Nutzer, Geräte, Funktionen und Gleichzeitigkeit, um zu sehen, wie sich das für Ihre Flotte auswirkt. Siehe [RustDesk-Pro-Preise](https://rustdesk.com/pricing).

Da sich die Preise von RustDesk selbst ändern, nennt dieser Artikel bewusst keine konkreten RustDesk-Dollarbeträge — die aktuellen Zahlen finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Vor- und Nachteile

**RustDesk**

_Vorteile:_

- Lizenzierung pro Nutzer + pro Gerät mit anteiligen Upgrades statt Paketierung nach Tarifstufe
- Selbst gehosteter ID-/Rendezvous- und Relay-Server halten Sitzungsvermittlung und Datenverkehr auf der eigenen Infrastruktur, nicht in einer Anbieter-Cloud
- Open Source (AGPL) — prüfbar und kompilierbar, keine Closed-Source-Blackbox
- LDAP/SSO ab dem Basic-Tarif (nicht nur in der höchsten Stufe)
- Generator für individuell gebrandete Clients, selbst gehostete Web-Konsole, Gerätegruppen, gemeinsames Adressbuch
- Kostenloser Community-Server läuft zeitlich unbegrenzt

_Nachteile:_

- Sie betreiben, patchen und aktualisieren den Server selbst
- Kein vollständig kostenloser Test von Server Pro (für eine Testlizenz E-Mail an [sales@rustdesk.com](mailto:sales@rustdesk.com))

**AnyDesk**

_Vorteile:_

- Cloud-vermittelt: In den unteren Tarifen muss nichts selbst gehostet werden — Client installieren und verbinden
- Dokumentierte Chrome-OS-Ansicht und tvOS-Clients
- RMM-/ITSM-Integrationen und eine REST-API
- Standardverschlüsselung (TLS 1.2, AES-256) und TOTP-2FA

_Nachteile:_

- Closed Source — der Client lässt sich nicht prüfen
- Standardmäßige Abhängigkeit von der Cloud von AnyDesk; On-Premises-Appliance nur in der höchsten Tarifstufe
- Gleichzeitige Sitzungen durch die Tarifstufe begrenzt; jährliche Vorababrechnung
- SSO laut Preisseiten-Prüfung vom 7. Juli 2026 nur in der Stufe Ultimate aufgeführt

## Warum Teams trotzdem zu RustDesk wechseln

Alles bisher Genannte war der neutrale Vergleich. In diesem Abschnitt wird das Argument für RustDesk unverblümt vorgetragen — lesen Sie ihn entsprechend.

Teams, die nach der Evaluierung von AnyDesk zu RustDesk wechseln, nennen tendenziell dieselbe Handvoll Gründe: **Self-Hosting, Individualisierbarkeit sowie ein Fokus auf Sicherheit und Datenschutz.**

**Datenhoheit ist der Kernpunkt.** Für regulierte Umgebungen und alle, die unter der DSGVO tätig sind, ist es häufig die gesamte Anforderung und kein „Nice-to-have“, Sitzungsdaten auf einer Infrastruktur zu behalten, die Sie selbst kontrollieren. Die vollständige Argumentation finden Sie unter [warum Sie Ihre Remotedesktop-Software selbst hosten sollten](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten).

**Open Source bedeutet überprüfbares Vertrauen.** Sie müssen dem Anbieter nicht einfach _glauben_, was der Client tut — Sie können ihn lesen, selbst kompilieren und verifizieren.

**Flottengrenzen müssen dennoch dimensioniert werden.** Das [Lizenzmodell](#lizenz--und-preismodelle) zählt Login-Nutzer und verwaltete Geräte; bei großen Gerätebeständen veröffentlicht RustDesk [Planungshinweise für große Geräteflotten](/de/blog/skaliert-rustdesk-auf-200-000-gerate), doch die Kapazität muss weiterhin anhand des tatsächlichen Rollouts überprüft werden.

**Es ist für genau die Menschen gemacht, die den Wechsel vollziehen würden.** MSPs erhalten ein einziges, selbst gehostetes und brandingfähiges Tool ([RustDesk für MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool)); Unternehmen erhalten eine selbst gehostete, AD-fähige Plattform ([RustDesk für Unternehmen](/de/blog/rustdesk-fur-unternehmen-self-hosted-skalierbar-ad-bereit)). Wenn Sie speziell deshalb hier gelandet sind, weil sich die Preise von AnyDesk geändert haben, sind [AnyDesk-Preiserhöhung: Alternativen für Teams](/de/blog/anydesk-preiserhohung-alternativen-fur-teams) und [die beste AnyDesk-Alternative 2026](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative) genau für diesen Moment geschrieben.

## RustDesk ausprobieren

Richten Sie den kostenlosen Community-Server ein und verbinden Sie ein paar Geräte damit — ohne Kosten, ohne Verkaufsgespräch. Für die Pro-Funktionen schreiben Sie eine E-Mail an [sales@rustdesk.com](mailto:sales@rustdesk.com), um die aktuellen Testbedingungen zu erfahren, oder besuchen Sie [rustdesk.com/pricing](https://rustdesk.com/pricing). Möchten Sie sich lieber erst einen Eindruck verschaffen? Auf dem RustDesk-YouTube-Kanal gibt es eine [Video-Anleitung](https://www.youtube.com/@rustdesk).

## Weiterführende Artikel

- [RustDesk vs TeamViewer](/de/blog/rustdesk-vs-teamviewer-die-selbst-gehostete-alternative)
- [RustDesk vs ScreenConnect](/de/blog/rustdesk-vs-screenconnect-selbst-gehosteter-remote-support)
- [Beste AnyDesk-Alternative: selbst gehostetes RustDesk](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative)
- [TeamViewer vs AnyDesk für MSPs](/de/blog/teamviewer-vs-anydesk-fur-msps-eine-selbst-gehostete-dritte-option)
- [AnyDesk-Preiserhöhung: Alternativen für Teams](/de/blog/anydesk-preiserhohung-alternativen-fur-teams)
- [Ist AnyDesk sicher?](/de/blog/ist-anydesk-sicher-verschlusselung-der-sicherheitsvorfall-2024-und)

## Quellen

- [AnyDesk-Preise](https://anydesk.com/en/pricing) — offizielle Tarifgrenzen, jährliche Abrechnung, gleichzeitige Verbindungen, verwaltete Geräte sowie Cloud-/On-Premises-Verfügbarkeit; geprüft am 7. Juli 2026.
- [AnyDesk-Client-Einstellungen](https://support.anydesk.com/docs/settings) — direkte Verbindungen, Relay-Fallback über öffentliche Netzwerke, unbeaufsichtigter Zugriff und Zugriffskontrollen.
