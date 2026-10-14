---
publishDate: 2026-07-09T13:01:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'rustdesk-vs-screenconnect'
draft: false
title: 'RustDesk vs. ScreenConnect: Selbst gehosteter Remote-Support'
excerpt: 'Ein umfassender Vergleich von RustDesk und ScreenConnect: Funktionen, Betriebssystem-Unterstützung, Sicherheit, Preismodelle und der Kompromiss beim Self-Hosting.'
image: '~/assets/images/blog/rustdesk-vs-screenconnect-og.webp'
category: 'Vergleiche'
tags: ['RustDesk', 'ScreenConnect', 'Vergleich']
author: 'RustDesk Team'
slug: 'rustdesk-vs-screenconnect-selbst-gehosteter-remote-support'
faq:
  - question: 'Ist RustDesk eine selbst gehostete Alternative zu ScreenConnect?'
    answer: 'Ja. RustDesk Server OSS (der kostenlose Community-Server) und Server Pro betreiben die ID-/Rendezvous- und Relay-Dienste auf Ihrer eigenen Infrastruktur, und der RustDesk-Client sowie Server OSS stehen unter der AGPL. Das kommerzielle Server Pro ergänzt eine zentrale Verwaltung, darunter ab dem Basic-Plan einen Generator für gebrandete Clients. ScreenConnect verkauft neben seinem Cloud-Dienst eine proprietäre On-Premise-Edition.'
  - question: 'Wie schneidet die Preisgestaltung von RustDesk im Vergleich zu ScreenConnect ab?'
    answer: 'RustDesk Server Pro wird nach Login-Benutzern und verwalteten Geräten lizenziert, mit unbegrenzten gleichzeitigen Verbindungen in den Standardplänen; nur Customized V2 lizenziert eine festgelegte Anzahl. ScreenConnect lizenziert gleichzeitige Techniker und begrenzt die gleichzeitigen Sitzungen pro Techniker auf 1 bei One, bis zu 3 bei Standard und bis zu 10 bei Premium (Stand 14. Oktober 2026). Vergleichen Sie schriftliche Angebote für dieselben Techniker, Endpunkte und Funktionen.'
  - question: 'Unterstützt RustDesk SSO und LDAP wie ScreenConnect?'
    answer: 'Ja. RustDesk Server Pro unterstützt LDAP/Active Directory und OIDC-SSO ab dem Basic-Plan. ScreenConnect führt auf seiner Preisseite Integrationen für LDAP sowie SAML- und OAuth-SSO auf. Ist die Anmeldung über ein Verzeichnis Pflicht, lassen Sie sich die genaue Stufe, die jedes Produkt dafür voraussetzt, in einem schriftlichen Angebot bestätigen.'
metadata:
  description: 'RustDesk im Detailvergleich mit ScreenConnect: Funktionen, Betriebssystem-Unterstützung, Sicherheit, Preismodelle sowie klare Vor- und Nachteile für MSPs.'
  keywords: 'RustDesk vs ScreenConnect, RustDesk vs ConnectWise Control, ScreenConnect Vergleich'
---

RustDesk und ScreenConnect zielen beide auf den Remote-Support-Workflow von MSPs; der Unterschied liegt bei Eigentum und Lizenzierung. ScreenConnect ist proprietäre Software, die pro gleichzeitigem Techniker lizenziert wird. RustDesk ist für das Self-Hosting gebaut – mit einem Open-Source-Client, RustDesk Server OSS (dem kostenlosen Community-Server) und der kommerziellen Verwaltung in Server Pro, lizenziert nach Benutzern und Geräten statt nach Techniker-Sitzungen.

ScreenConnect (früher ConnectWise Control) ist eine kommerzielle Remote-Access-Plattform mit großer installierter Basis im MSP-Markt. Im Folgenden vergleichen wir beide Lösungen Abschnitt für Abschnitt und zeigen, warum MSPs zu RustDesk wechseln.

## Inhalt

- [Überblick: RustDesk und ScreenConnect auf einen Blick](#überblick-rustdesk-und-screenconnect-auf-einen-blick)
- [Funktionsvergleich](#funktionsvergleich)
- [Betriebssysteme und Plattformen](#betriebssysteme-und-plattformen)
- [Sicherheit und Identität](#sicherheit-und-identität)
- [Lizenzierung und Preismodelle](#lizenzierung-und-preismodelle)
- [Vorteile und Nachteile](#vorteile-und-nachteile)
- [Warum MSPs trotzdem zu RustDesk wechseln](#warum-msps-trotzdem-zu-rustdesk-wechseln)
- [RustDesk selbst ausprobieren](#rustdesk-selbst-ausprobieren)
- [Weiterführende Artikel](#weiterführende-artikel)
- [Quellen](#quellen)

## Überblick: RustDesk und ScreenConnect auf einen Blick

**ScreenConnect** ist das Remote-Access- und Remote-Support-Produkt von ConnectWise, das heute unter dem Namen ScreenConnect verkauft wird (mehrere Jahre lang hieß es ConnectWise Control). Es richtet sich vor allem an Managed Service Provider und interne IT-Teams. Sie können es als verwalteten Cloud-Dienst auf der Infrastruktur von ConnectWise nutzen oder eine On-Premise-Edition lizenzieren, die Sie selbst hosten. Es bietet Sitzungsaufzeichnung, Hintergrundadministration über „Backstage“, eine Remote-Kommandozeile, Remote-Druck, VoIP-Audio sowie die Integration in die übrige ConnectWise-Suite (PSA-Ticketing, Automate/RMM). Wer bereits in der ConnectWise-Welt zu Hause ist, in die sich ScreenConnect nahtlos einfügen soll, findet hier ein vertrautes Umfeld.

**RustDesk** deckt denselben MSP-Bedarf ab, ohne Bindung an ein Ökosystem. Mit Server OSS oder Server Pro betreiben Sie die ID-/Rendezvous- und Relay-Dienste selbst. **Client und Server OSS stehen unter der AGPL**; **Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten**, und ergänzt eine zentrale Verwaltung. Wo ScreenConnect gleichzeitige Techniker lizenziert, enthalten die Standardpläne von Server Pro unbegrenzte gleichzeitige Verbindungen; nur [Customized V2](https://rustdesk.com/pricing#custom2) lizenziert eine festgelegte Anzahl. Individuelle Clients lassen sich ab dem Basic-Plan generieren – nützlich, wenn das Tool, das Ihre Kunden sehen, Ihre Marke tragen soll und nicht die von ConnectWise.

Kurz gesagt: ScreenConnect ist eine kommerzielle Plattform mit einem MSP-Ökosystem drumherum; RustDesk ist selbst gehostete Software mit prüfbarem Client und ohne Sitzungslimit pro Techniker in den Standardplänen.

## Funktionsvergleich

Die folgende Tabelle deckt die alltäglichen Remote-Support-Funktionen ab. Zur Methodik: Die Einträge in der Spalte **ScreenConnect** stammen von den Funktions- und Preisseiten von ConnectWise, Stand unserer Recherche im Juli 2026 (Quellen am Ende). Die Spalte **RustDesk** gibt die für das Produkt dokumentierten Funktionen wieder. Prüfen Sie die aktuelle RustDesk-Dokumentation, um Details für Ihren Build zu bestätigen.

| Funktion                                        | RustDesk (selbst gehostetes Server Pro)                                                                                    | ScreenConnect (ConnectWise Control)                                                                                   |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Remote-Ansicht und -Steuerung                   | Ja – Hosts unter Windows, macOS, Linux und Android; iOS nur als Controller                                                 | Ja – Multi-Monitor-Remote-Support in allen Stufen                                                                     |
| Unbeaufsichtigter Zugriff auf verwaltete Geräte | Ja – verwaltete Geräte über Ihren selbst gehosteten Server, organisiert mit Gerätegruppen und einem gemeinsamen Adressbuch | Ja – unbeaufsichtigte Agenten (10 in der Einstiegsstufe; unbegrenzt in höheren Stufen)                                |
| Mobiler Zugriff                                 | Android kann steuern oder gesteuert werden; iOS nur als Controller                                                         | Ja – Techniker-Apps für iOS und Android; mobiler Gast-Client ab Standard                                              |
| Sitzungsaufzeichnung                            | Ja (eingehende/ausgehende Sitzungen lassen sich automatisch aufzeichnen)                                                   | Ja – ab der Stufe Standard enthalten                                                                                  |
| Dateiübertragung                                | Ja (in beide Richtungen)                                                                                                   | Ja – in allen Stufen enthalten                                                                                        |
| Chat während der Sitzung                        | Ja – Text-Chat                                                                                                             | Ja – Chat während der Sitzung                                                                                         |
| Remote-Druck                                    | Ja – Remote-Drucker für eingehende Verbindungen (Windows)                                                                  | Ja – Drucken vom Remote-Rechner auf einen lokalen Drucker                                                             |
| Limit für gleichzeitige Verbindungen            | Unbegrenzt in den Standardplänen; begrenzt bei Customized V2                                                               | Pro gleichzeitigem Techniker lizenziert; 1 / bis zu 3 / bis zu 10 Sitzungen pro Techniker bei One / Standard / Premium |

Gleichzeitigkeit bestimmt beide Kostenmodelle. ScreenConnect lizenziert gleichzeitige Techniker und begrenzt die gleichzeitigen Sitzungen, die jeder von ihnen führen kann: eine bei One, bis zu drei bei Standard und bis zu zehn bei Premium, laut [Preisseite](https://www.screenconnect.com/pricing) mit Stand 14. Oktober 2026. Die Standardpläne von RustDesk enthalten unbegrenzte gleichzeitige Verbindungen; nur Customized V2 lizenziert eine festgelegte Anzahl. Siehe die [RustDesk-Preisseite](https://rustdesk.com/pricing).

## Betriebssysteme und Plattformen

Beide Tools sind plattformübergreifend, mit einem strukturellen Unterschied, den man kennen sollte: ScreenConnect unterscheidet zwischen der **Host**-Seite (dem Techniker) und der **Gast**-Seite (dem betreuten Rechner), und die Plattformunterstützung weicht zwischen beiden leicht ab.

| Plattform                  | RustDesk                                                                                                                                                                                  | ScreenConnect                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Windows                    | Ja – x64, ARM64, 32-Bit                                                                                                                                                                   | Ja – Host und Gast (Windows 10/11, Server 2016–2025)         |
| macOS                      | Ja – Apple Silicon und Intel                                                                                                                                                              | Ja – Host und Gast (aktuelle und die zwei vorherigen Versionen) |
| Linux                      | Ja – x86_64, ARM64 und ARM32; X11 und Wayland (unbeaufsichtigter Zugriff und Zugriff auf den Anmeldebildschirm unter Wayland in der [Preview](/de/blog/unattended-remote-access-wayland-de)) | Ja – Host und Gast (x86_64, glibc 2.17+)                     |
| Android                    | Ja – arm64, arm32, x64 (Host und Controller)                                                                                                                                              | Gast-Unterstützung; Android-Techniker-App                    |
| iOS                        | Nur Controller; RustDesk implementiert unter iOS weder Hosting noch Bildschirmfreigabe                                                                                                    | Gast-Bildschirmfreigabe nur zur Ansicht; iOS-Techniker-App   |
| Steuerung über den Browser | Browser-Client zum Steuern (öffentlicher Web-Client oder ab einer bestimmten Plangröße selbst gehostet); um gesteuert zu werden, ist der native Client nötig                              | Ja – Host über Chrome, Firefox, Safari, Edge                 |

Ein paar Klarstellungen, damit niemand in die Irre geführt wird. Die Kompatibilitätsseite von ConnectWise führt nach unserer Recherche Windows/macOS/Linux für Host und Gast sowie Mobil-Apps für iOS und Android auf. Einige Berichte Dritter erwähnen außerdem Clients für ChromeOS und Raspberry Pi; das konnten wir auf der offiziellen ConnectWise-Seite nicht verifizieren und haben es daher weggelassen. Unabhängig davon: Wenn Teams bei einer RustDesk-Evaluierung vom Raspberry Pi sprechen, meinen sie meist das Self-Hosting des _RustDesk-Servers_ auf kleiner Hardware – das betrifft die serverseitige Bereitstellung, nicht die unterstützten Client-Plattformen.

## Sicherheit und Identität

Dieser Abschnitt behandelt die Sicherheits- und Compliance-Fragen, die eine Evaluierung meist bestimmen.

**Das Sicherheitsmodell von ScreenConnect.** Die aktuelle Preisseite von ConnectWise nennt AES-256-Verschlüsselung, Zwei-Faktor-Authentifizierung, Brute-Force-Schutz, granulares Zugriffsmanagement sowie Integrationen mit LDAP, SAML, OAuth und anderen SSO-Anbietern. Die Produktseite der On-Premise-Variante nennt Multi-Faktor-Authentifizierung und rollenbasierte Zugriffskontrollen und beschreibt Konfigurationen, die Anforderungen aus SOC 2, PCI, CJIS und HIPAA unterstützen sollen. Dabei handelt es sich um Herstellerangaben zur Unterstützung von Compliance-Anforderungen; die Originalseiten sind unter [Quellen](#quellen) verlinkt.

**Patchen ist eine Frage der Betriebsverantwortung.** Bei einem vom Anbieter gehosteten Dienst bestimmt der Anbieter den Patch-Zeitplan; wer selbst hostet, aktualisiert seine Server selbst. Sicherheitspatches, Zertifikatsrotationen und ähnliche Ereignisse landen in _Ihrem_ Änderungskalender, nicht in dem des Anbieters – und genau diese Verantwortung bringt auch das Self-Hosting von RustDesk mit sich.

**Das Sicherheitsmodell von RustDesk.** Weil der Client Open Source ist, lässt sich der Code unabhängig prüfen und aus dem Quellcode bauen, statt dass Sie ihm einfach vertrauen müssen – das kann ein proprietäres Produkt nicht bieten. Sie entscheiden, wo Rendezvous-Server, Relay-Server, Konsole und gespeicherte Bereitstellungsdaten laufen; direkte Sitzungen verlaufen zwischen den Endpunkten, und ID-basierte Sitzungen sind Ende-zu-Ende-verschlüsselt, wenn die Clients mit dem öffentlichen Schlüssel Ihres Servers konfiguriert sind. Server Pro unterstützt LDAP und OIDC-SSO ab dem Basic-Plan, dazu [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) pro Benutzer und Gerätegruppe sowie Berechtigungen per [Kontrollrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) für Aktionen innerhalb der Sitzung.

Open Source macht Software nicht unverwundbar; verfolgen Sie daher die [aktuellen Releases](https://github.com/rustdesk/rustdesk/releases) von RustDesk und öffentliche Schwachstellenmeldungen. Zu den Grenzen von Routing und Datenresidenz siehe [Remote-Desktop-Datensouveränität und DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting).

## Lizenzierung und Preismodelle

Preise ändern sich häufig. Statt eine Zahl als dauerhafte Tatsache zu behandeln, vergleichen wir daher die beiden _Modelle_ und versehen die Angaben mit Datum.

**ScreenConnect** bündelt Technikerlizenzen, gleichzeitige Sitzungen pro Techniker, unbeaufsichtigte Agenten und Funktionen nach Stufe. Laut [Preisseite](https://www.screenconnect.com/pricing) mit Stand 14. Oktober 2026 sind pro Techniker eine gleichzeitige Sitzung bei One, bis zu drei bei Standard und bis zu zehn bei Premium möglich. Da sich Preise ändern, holen Sie ein schriftliches Angebot für dieselbe Anzahl an Technikern, gleichzeitigen Sitzungen und unbeaufsichtigten Endpunkten sowie für dieselben Sicherheitskontrollen und Supportanforderungen ein.

**RustDesk** bepreist Login-Benutzer und verwaltete Geräte. Die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen; nur Customized V2 lizenziert eine festgelegte Anzahl gleichzeitiger Verbindungen. Ein reiner Vergleich der Listenpreise führt in die Irre; bemessen Sie beide Produkte deshalb an den tatsächlichen Anforderungen an Benutzer, Geräte, Gleichzeitigkeit, Funktionen und Support. Die aktuellen RustDesk-Preise finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Vorteile und Nachteile

**RustDesk**

_Vorteile_

- Unbegrenzte gleichzeitige Verbindungen in den Standardplänen von Pro, ohne Sitzungslimit pro Techniker (nur Customized V2 lizenziert eine festgelegte Anzahl)
- Der Generator für individuell gebrandete Clients liefert ein White-Label-Tool unter Ihrem Namen, nicht unter dem von ConnectWise
- Selbst gehostetes Server Pro betreibt Vermittlung und Relay auf einer Infrastruktur Ihrer Wahl
- Prüfbarer Client, den Sie lesen und aus dem Quellcode bauen können
- Server OSS ist kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum
- Skaliert vom Proof-of-Concept-Rechner bis zu großen Geräteflotten (mehr dazu unten)

_Nachteile_

- Sie betreiben, patchen und aktualisieren den Server selbst
- Keine Self-Service-Testversion von Server Pro; Testlizenzen auf Anfrage über [sales@rustdesk.com](mailto:sales@rustdesk.com)
- Manche Komfortfunktionen (LDAP/SSO) gibt es erst ab dem Basic-Plan, nicht im Einstiegsplan

**ScreenConnect**

_Vorteile_

- Integration in das PSA-/RMM-Ökosystem von ConnectWise
- Verwaltete Cloud-Option mit automatischem Patching
- Funktionsumfang inklusive Sitzungsaufzeichnung, Backstage, VoIP und Diagnose
- Große installierte Basis bei MSPs – Dokumentation und erfahrene Techniker sind leicht zu finden
- Identitätskontrollen auf Enterprise-Niveau (2FA, SSO/SAML/OAuth, LDAP und rollenbasierte Zugriffskontrollen)

_Nachteile_

- Proprietär und Closed Source – der Code lässt sich nicht prüfen
- Lizenzen pro gleichzeitigem Techniker, begrenzt auf 1 / bis zu 3 / bis zu 10 gleichzeitige Sitzungen pro Techniker bei One / Standard / Premium
- Erweiterte Funktionen sind höheren Stufen vorbehalten; manche Funktionen sind eigene, kostenpflichtige Produktlinien

## Warum MSPs trotzdem zu RustDesk wechseln

Alles bisher Gesagte ist der neutrale Vergleich. Jetzt folgt der Teil, in dem wir offen für RustDesk argumentieren.

**Unbegrenzte Gleichzeitigkeit in den Standardplänen.** ScreenConnect begrenzt jeden Techniker auf eine gleichzeitige Sitzung bei One, drei bei Standard und zehn bei Premium. Die Standardpläne von RustDesk Server Pro enthalten unbegrenzte gleichzeitige Verbindungen – Techniker, die mehrere Kunden parallel betreuen, zwingen Sie also nicht in eine höhere Stufe.

**Ihre Marke ab dem Basic-Plan.** Der Generator für individuelle Clients liefert einen White-Label-Client unter Ihrem Namen, nicht unter dem von ConnectWise.

**Ein kostenloser Pilot vor dem Kauf.** Server OSS hat keine Lizenzgebühr und kein Ablaufdatum. So können Sie Konnektivität und Relay-Performance an einem echten Kundenstandort auf bescheidener Hardware nachweisen, bevor Sie Server Pro kaufen.

**Ein Client, den Sie prüfen können.** Den Client, den Ihre Kunden installieren, können Sie lesen und selbst bauen, statt sich auf das Wort eines Anbieters verlassen zu müssen.

Auch mit ScreenConnect On-Premise können Sie den Server selbst hosten; RustDesk bietet darüber hinaus den offenen Client, den kostenlosen Einstieg und Standardpläne ohne Sitzungslimit pro Techniker. Eine Einschränkung: Wenn Ihr Servicedesk auf Integrationen mit ConnectWise PSA und Automate aufbaut, testen Sie diese Workflows im Pilotprojekt.

Wenn Sie speziell als MSP evaluieren, ist unser Artikel [RustDesk für MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool) genau für Ihre Situation geschrieben; Unternehmen beginnen am besten mit [RustDesk für Unternehmen](/de/blog/rustdesk-fur-unternehmen-self-hosted-skalierbar-ad-bereit). Siehe auch [Remote-Desktop-Datensouveränität und DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) und [Skaliert RustDesk auf 200.000 Geräte?](/de/blog/skaliert-rustdesk-auf-200-000-gerate).

## RustDesk selbst ausprobieren

Am unverbindlichsten evaluieren Sie RustDesk mit einem repräsentativen Proof of Concept. Setzen Sie Server OSS auf und verbinden Sie ein paar Endpunkte damit – ohne Lizenzgebühr, ohne Verkaufsgespräch. Zu den aktuellen Evaluierungsbedingungen für die Pro-Funktionen fragen Sie [sales@rustdesk.com](mailto:sales@rustdesk.com) oder besuchen [rustdesk.com/pricing](https://rustdesk.com/pricing); außerdem gibt es eine [Video-Anleitung](https://www.youtube.com/@rustdesk), falls Sie lieber erst zuschauen möchten.

## Weiterführende Artikel

- [RustDesk für MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool)
- [RustDesk vs. AnyDesk](/de/blog/rustdesk-vs-anydesk-selbst-gehostete-open-source-remotedesktop-software)

## Quellen

Die Produktdetails von ScreenConnect wurden am 7. Juli 2026 anhand dieser Originalseiten von ConnectWise geprüft; die Sitzungslimits pro Techniker wurden am 14. Oktober 2026 auf der Preisseite erneut geprüft. Funktionen, Plattformunterstützung, Paketierung und Preise können sich ändern; prüfen Sie vor dem Kauf die aktuellen Seiten und ein schriftliches Angebot.

- [ScreenConnect-Preispläne](https://www.screenconnect.com/pricing) – aktuelle Stufen, Limits für gleichzeitige Sitzungen, unbeaufsichtigte Agenten, Remote-Support-Funktionen, Sicherheitskontrollen, Identitätsintegrationen und ConnectWise-Integrationen.
- [ScreenConnect On-Premise](https://www.screenconnect.com/on-premise) – Self-Hosting, Backstage, Sitzungsaufzeichnung, Kompatibilität, Sicherheit und vom Anbieter angegebene Compliance-Fähigkeiten.
- [Anforderungen an den ScreenConnect-Host-Client](https://docs.connectwise.com/ScreenConnect_Documentation/Get_started/Host_client/Host_client_requirements) – Betriebssystemanforderungen auf Techniker-Seite.
- [Anforderungen an den ScreenConnect-Gast-Client](https://docs.connectwise.com/ScreenConnect_Documentation/Get_started/Guest_client/Guest_client_requirements) – Betriebssystemanforderungen für betreute Geräte.
- [Anforderungen an die ScreenConnect-iOS-App](https://docs.connectwise.com/ScreenConnect_Documentation/Mobile_apps/iOS/iOS_app_requirements) – aktuelle Anforderungen der iOS-App und Einschränkungen des Herstellers.
