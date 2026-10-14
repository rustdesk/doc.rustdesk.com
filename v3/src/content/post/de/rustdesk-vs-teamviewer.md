---
publishDate: 2026-06-30T13:17:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'rustdesk-vs-teamviewer'
draft: false
title: 'RustDesk vs. TeamViewer: Die selbst gehostete Alternative'
excerpt: 'RustDesk und TeamViewer im Vergleich: Funktionen, Plattformrollen, Sicherheit, Lizenzen – offene Clients, selbst gehostete Serverdienste, Gleichzeitigkeit im Standardplan.'
image: ~/assets/images/blog/rustdesk-vs-teamviewer-og.webp
category: 'Vergleiche'
tags: ['RustDesk', 'TeamViewer', 'Vergleich']
author: 'RustDesk Team'
slug: 'rustdesk-vs-teamviewer-die-selbst-gehostete-alternative'
faq:
  - question: 'Ist RustDesk eine kostenlose Alternative zu TeamViewer?'
    answer: 'Ja. Der RustDesk-Client und RustDesk Server OSS (der kostenlose Community-Server) sind Open Source unter der AGPL, und Server OSS lässt sich ohne Lizenzgebühr und ohne Ablaufdatum selbst hosten. Die kostenpflichtigen Server-Pro-Pläne ergänzen zentrales Management wie eine Web-Konsole und LDAP/OIDC-SSO und werden nach Login-Benutzern und verwalteten Geräten lizenziert; die aktuellen Preise stehen unter rustdesk.com/pricing.'
  - question: 'Funktioniert RustDesk weiter, wenn ich nicht mehr zahle – wie bei einer alten unbefristeten TeamViewer-Lizenz?'
    answer: 'Ja, mit Server OSS. RustDesk Server OSS (der kostenlose Community-Server) läuft ohne Lizenz und ohne Ablaufdatum. Server Pro ist ein jährlich lizenziertes kommerzielles Produkt und braucht für den Weiterbetrieb eine gültige Lizenz. Wenn Sie Pro nicht verlängern wollen, planen und testen Sie daher eine Migration zu Server OSS, statt von einem automatischen Downgrade auszugehen.'
  - question: 'Lässt sich RustDesk im Gegensatz zu TeamViewer selbst hosten?'
    answer: 'Ja. RustDesk Server OSS betreibt den ID-/Rendezvous- und den Relay-Dienst auf Ihrer eigenen Infrastruktur, und Server Pro ergänzt eine selbst gehostete Web-Konsole samt gespeicherter Verwaltungsdaten. Der verwaltete Standarddienst von TeamViewer nutzt eine vom Anbieter betriebene Verbindungsvermittlung. In beiden Modellen können direkte Sitzungsdaten zwischen den Endpunkten fließen.'
  - question: 'Begrenzt RustDesk gleichzeitige Sitzungen wie die TeamViewer-Pläne?'
    answer: 'Nein, nicht in den Standardplänen. Die Standardpläne von RustDesk Server Pro enthalten unbegrenzte gleichzeitige Verbindungen. Nur Customized V2 lizenziert eine feste Anzahl gleichzeitiger Verbindungen, gezählt als aktive steuernde Geräte: Ein Technikerrechner mit fünf Sitzungs-Tabs ist eine Verbindung. Bei TeamViewer legen Plan und Add-ons fest, wie viele Sitzungen gleichzeitig möglich sind.'
metadata:
  description: 'RustDesk vs. TeamViewer: Funktionen, Plattformrollen, Sicherheit, Self-Hosting und kommerzielle Lizenzierung, inkl. Abgrenzung von Server OSS und Server Pro.'
  keywords: 'RustDesk vs TeamViewer, TeamViewer Vergleich, TeamViewer vs RustDesk, RustDesk TeamViewer Vergleich'
---

RustDesk und TeamViewer lösen dasselbe Fernzugriffsproblem mit gegensätzlichen Modellen: hier ein selbst gehosteter Stack mit Open-Source-Client, dort ein verwalteter Cloud-Dienst im Abonnement.

TeamViewer ist eine kommerzielle Plattform für Fernzugriff mit einem umfangreichen Katalog an Integrationen. Dies ist ein detaillierter Vergleich: was jedes Produkt ausmacht, wie sich Funktionen und Plattformunterstützung gegenüberstehen, wie sich die Sicherheits- und Lizenzmodelle unterscheiden und wo – und warum – Teams stattdessen zu RustDesk wechseln. Wo wir eine Aussage über TeamViewer treffen, belegen wir sie mit einer Quelle, und alle Angaben sind datiert, da sich Preise und Paketierung im Bereich Fernzugriff häufig ändern.

## Inhaltsverzeichnis

- [RustDesk und TeamViewer im Überblick](#rustdesk-und-teamviewer-im-überblick)
- [Funktionsvergleich](#funktionsvergleich)
- [Unterstützte Betriebssysteme und Plattformen](#unterstützte-betriebssysteme-und-plattformen)
- [Sicherheit und Identität](#sicherheit-und-identität)
- [Lizenzierung und Preismodelle](#lizenzierung-und-preismodelle)
- [Vor- und Nachteile](#vor--und-nachteile)
- [Warum Teams trotzdem zu RustDesk wechseln](#warum-teams-trotzdem-zu-rustdesk-wechseln)
- [RustDesk selbst ausprobieren](#rustdesk-selbst-ausprobieren)
- [Weiterführende Artikel](#weiterführende-artikel)

## RustDesk und TeamViewer im Überblick

**TeamViewer** ist eine kommerzielle Plattform für Fernzugriff und Remote-Support von TeamViewer SE, die seit 2005 am Markt ist und zu den am weitesten verbreiteten Tools ihrer Art zählt. Sie wird als verwalteter, Cloud-vermittelter SaaS-Dienst bereitgestellt: TeamViewer betreibt die Verbindungsinfrastruktur, Sie installieren einen Client, und Sitzungen werden über TeamViewers eigenes Routing-Netzwerk vermittelt. Die Software ist Closed Source, wird über Jahresabonnements verkauft, und die höheren Stufen (unter der Marke **TeamViewer Tensor**) bieten Enterprise-Funktionen wie Single Sign-on, Conditional Access, Massenverteilung sowie einen umfangreichen Katalog an Integrationen mit Tools wie ServiceNow, Jira und Microsoft Intune. ([TeamViewer Tensor / Integrationen](https://www.teamviewer.com/en/integrations/))

**RustDesk** baut auf einer anderen Grundannahme auf: Sie können die gesamte Lösung selbst betreiben. **Der Client und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der AGPL**, lassen sich also auditieren und aus dem Quellcode bauen, und Server OSS stellt den ID-/Rendezvous- und den Relay-Dienst ohne Lizenzgebühr und ohne Ablaufdatum auf Ihren eigenen Servern bereit. **Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie ebenfalls selbst hosten.** Sie ergänzt eine zentrale Verwaltung: eine Web-Konsole, Gerätegruppen, ein gemeinsames Adressbuch und ab dem Basic-Plan LDAP/OIDC-SSO sowie einen Generator für individuell gebrandete Clients. Sie entscheiden, wo die Server und die gespeicherten Verwaltungsdaten laufen; direkte Sitzungen fließen zwischen den Endpunkten. Pro-Pläne zählen Login-Benutzer und verwaltete Geräte, und die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen. Wenn sich Ihr Vorbehalt gegenüber TeamViewer im Kern um _Kontrolle_ dreht – über Daten, über Kosten, über die Software selbst –, dann ist das genau die Achse, auf der sich die beiden Produkte am stärksten unterscheiden.

Der Rest dieses Artikels schlüsselt den Vergleich Funktion für Funktion auf.

## Funktionsvergleich

Die folgende Tabelle vergleicht die Alltagsfunktionen, nach denen die meisten Teams fragen. Die RustDesk-Spalte spiegelt die für das Produkt dokumentierten Funktionen wider, und auf der TeamViewer-Seite ist jedes „Ja“ mit einer Quelle auf TeamViewers eigenen Seiten belegt. Prüfen Sie alles, worauf Sie sich verlassen, anhand der aktuellen Dokumentation.

| Funktion                            | RustDesk                                                                                          | TeamViewer                                                                                                                                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fernsteuerung (Kernsitzung)         | Ja – das ist der Kern-Client                                                                      | Ja ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                  |
| Unbeaufsichtigter Zugriff           | Ja – permanentes Passwort, das die Standardeinstellungen akzeptieren; läuft als Systemdienst      | Ja ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                  |
| Mobiler Zugriff                     | Ja – Android; iOS nur als steuerndes Gerät                                                        | Ja, über mobile Apps ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                |
| Dateiübertragung                    | Ja (in beide Richtungen)                                                                          | Ja ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                  |
| Chat während der Sitzung            | Ja – Text-Chat                                                                                    | Ja, Echtzeit-Chat; VoIP/Video/Chat sind für kostenlose Nutzer deaktiviert ([Support](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/remote-control/remote-session-toolbar/)) |
| Sitzungsaufzeichnung                | Ja (eingehende/ausgehende Sitzungen können automatisch aufgezeichnet werden)                      | Ja ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                  |
| Remote-Druck                        | Ja – Remote-Drucker für eingehende Verbindungen (Windows)                                         | Ja ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                                                  |
| Multi-Monitor-Unterstützung         | Ja – mehrere Monitore                                                                             | Ja – 4K-Multi-Monitor ([Funktionen](https://www.teamviewer.com/en-us/products/remote/features/))                                                                                                               |
| Obergrenze gleichzeitiger Sitzungen | Unbegrenzt in Standardplänen; begrenzt bei [Customized V2](https://rustdesk.com/pricing#custom2)  | Begrenzt je nach Plan-Stufe (siehe [Lizenzierung](#lizenzierung-und-preismodelle))                                                                                                                             |

Eine Zeile verdient besondere Aufmerksamkeit: die **Frage der Funktionsparität.** Beide Produkte decken die alltäglichen Arbeitsabläufe ab, in denen sich die meisten Support- und Admin-Teams bewegen – Fernsteuerung, unbeaufsichtigter Zugriff, Dateiübertragung, Sitzungsaufzeichnung, Remote-Druck und mehrere Monitore. Verlassen Sie sich nicht blind auf irgendeine Tabelle, sondern testen Sie RustDesk an Ihren tatsächlichen Aufgaben; deshalb verweisen wir Interessenten für Evaluierungskonditionen an [sales@rustdesk.com](mailto:sales@rustdesk.com) statt an einen unterschriebenen Vertrag.

## Unterstützte Betriebssysteme und Plattformen

Beide Tools decken die wichtigsten Desktop- und Mobilplattformen ab; im Detail gibt es Unterschiede an den Rändern, besonders bei Linux und eingebetteten Geräten.

| Plattform       | RustDesk                                                                                                                                                                                | TeamViewer                                                                                                                                                                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows         | Ja – x64, ARM64, 32-Bit                                                                                                                                                                 | Ja, inkl. Windows Server 2016/2019/2022 ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                                            |
| macOS           | Ja – Apple Silicon & Intel                                                                                                                                                              | Ja, macOS 13 (Ventura) und neuer ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                                                  |
| Linux           | Ja – x86_64, ARM64 & ARM32; X11 und Wayland (unbeaufsichtigter Zugriff und Zugriff auf den Anmeldebildschirm unter Wayland in der [Preview](/de/blog/unattended-remote-access-wayland-de)) | Ja, über TeamViewer Classic (Debian, Ubuntu, Fedora, RHEL, openSUSE); Wayland experimentell, X11 für eingehende Sitzungen empfohlen ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/)) |
| Android         | Ja – arm64, arm32, x64 (Host & steuerndes Gerät)                                                                                                                                        | Ja, Android 8+ ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                                                                     |
| iOS / iPadOS    | Nur als steuerndes Gerät; RustDesk implementiert unter iOS weder Hosting noch Bildschirmfreigabe                                                                                        | Apps Remote Control und QuickSupport, iOS/iPadOS 17 oder neuer ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                     |
| ChromeOS        | Nicht verfügbar (kein ChromeOS-Client)                                                                                                                                                  | Ja, aber nur Bildschirmfreigabe – vollständige Fernsteuerung wird offiziell nicht unterstützt ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                      |
| Raspberry Pi OS | Ja – offizielle ARM64/ARM32-Linux-Builds                                                                                                                                                | Ja, über TeamViewer Classic; nur 64-Bit-Raspberry-Pi-OS ([unterstützte Betriebssysteme](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-remote/download-and-installation/supported-operating-systems-for-teamviewer-remote/))                                                                           |

Die Kernaussage: Beide Produkte laufen unter Windows, macOS, Linux, Android und iOS, sodass für die überwältigende Mehrheit der Support-Arbeit in gemischten Geräteflotten jedes der beiden Tools die benötigten Endpunkte erreicht. TeamViewer bietet zusätzlich ChromeOS-Bildschirmfreigabe, während seine Linux- und Raspberry-Pi-Unterstützung über den älteren Classic-Client läuft und 32-Bit-ARM ausschließt; RustDesk deckt den Pi einschließlich ARM32 mit seinen Standard-Linux-Builds ab. Wenn exotische Endpunkte für Sie wichtig sind, prüfen Sie das konkrete Gerät anhand der aktuellen Liste des jeweiligen Anbieters.

## Sicherheit und Identität

Hier verkörpern die beiden Produkte tatsächlich unterschiedliche Philosophien, weshalb es sich lohnt, „Sicherheitsfunktionen“ von „Sicherheitsmodell“ zu unterscheiden.

**Die Sicherheitsfunktionen von TeamViewer** sind stark und gut dokumentiert. Laut der [Sicherheitserklärung](https://www.teamviewer.com/en/global/support/knowledge-base/teamviewer-remote/security/security-statement/) nutzen Sitzungen einen RSA-4096-Schlüsselaustausch (Public/Private Key) und AES-256-Bit-Sitzungsverschlüsselung, und dank Ende-zu-Ende-Verschlüsselung können TeamViewers Routing-Server den Sitzungsverkehr nicht entschlüsseln. Der Kontozugang lässt sich mit TOTP-basierter Zwei-Faktor-Authentifizierung schützen, und das [Trust Center](https://www.teamviewer.com/en/resources/trust-center/) führt ISO-Zertifizierungen und SOC-Berichte auf. Die Erklärungen zu HIPAA/HITECH und DSGVO beschreiben, wie TeamViewer Kunden bei ihren eigenen Compliance-Pflichten unterstützt.

Neben diesen Funktionen ist jedoch ein Punkt zum Sicherheitsmodell erwähnenswert. Die eigene Infrastruktur jedes zentralisierten Anbieters ist selbst ein hochwertiges Angriffsziel, und kein Anbieter ist gegen diese Art von Angriff immun – genau dieses Risikoprofil verändert ein selbst gehostetes Modell.

**Das Sicherheitsmodell von RustDesk** setzt an einer anderen Stelle an: Der Client lässt sich unabhängig auditieren und aus dem Quellcode bauen, und ID-/Rendezvous-Server, Relay, Konsole und gespeicherte Bereitstellungsdaten betreiben Sie selbst. ID-basierte Sitzungen sind Ende-zu-Ende-verschlüsselt, wenn die Clients mit dem öffentlichen Schlüssel Ihres Servers konfiguriert sind, und direkte Sitzungen fließen zwischen den Endpunkten. Open Source macht Schwachstellen zudem öffentlich; verfolgen Sie deshalb die [aktuellen Releases](https://github.com/rustdesk/rustdesk/releases) und Schwachstellenmeldungen, und setzen Sie Zugriffsregeln konsequent durch.

Zum Thema **Identität** eine Klarstellung, die für die Planung wichtig ist: RustDesk unterstützt LDAP/Active Directory und SSO über OIDC, und zwar **ab dem Basic-Plan**. Die Funktion ist also nicht der höchsten Stufe vorbehalten, aber Pläne unterhalb von Basic enthalten sie nicht – gleichen Sie das mit dem konkreten Plan ab, den Sie kaufen wollen. Die vollständige Einrichtung beschreibt die [LDAP-Dokumentation von RustDesk Server Pro](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/). Server Pro ergänzt eine [Zugriffskontrolle](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/permissions/) pro Benutzer und Gerätegruppe sowie [Kontrollrollen](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/control-role/) für Aktionen innerhalb der Sitzung, und der Generator für individuelle Clients bringt ab Basic Ihr eigenes Branding mit.

Wenn es Ihnen vor allem darum geht, selbst zu bestimmen, wo Ihre Server und Verwaltungsdaten liegen, finden Sie die ausführliche Betrachtung unter [Remote-Desktop-Datensouveränität & DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting) und [Warum Sie Ihre Remote-Desktop-Software selbst hosten sollten](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten).

## Lizenzierung und Preismodelle

Preise sind der mit Abstand volatilste Teil jedes Fernzugriffs-Vergleichs; deshalb beschreiben wir **Modelle** im Detail und behandeln **Zahlen** als datierte Momentaufnahmen, nicht als dauerhafte Fakten. Grundsätzlich nennen wir außerdem keinen festen RustDesk-Preis im Fließtext – die aktuelle Zahl finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing), damit sie immer stimmt.

**TeamViewers Modell** basiert auf Abonnements und ist um benannte Stufen sowie Obergrenzen für gleichzeitige Sitzungen organisiert. Paketierung und Preise variieren je nach Region und Laufzeit; nutzen Sie daher TeamViewers aktuelle Preisseite und Ihr schriftliches Angebot statt historischer Zahlen von Dritten oder privater Kundenrechnungen.

**Ein Hinweis zu TeamViewers älteren „Lifetime“-Lizenzen.** Viele Teams haben TeamViewer ursprünglich mit einer **unbefristeten Lizenz** eingeführt – einem Einmalkauf, der an eine bestimmte Hauptversion gebunden war. TeamViewer verkauft keine unbefristeten Lizenzen mehr; das Unternehmen setzt inzwischen ausschließlich auf Abonnements, und eine alte unbefristete Lizenz bleibt nur für die Version nutzbar, für die sie ursprünglich galt, vorbehaltlich TeamViewers Richtlinie zum Produktlebenszyklus. In der Praxis kann ein älterer unbefristet lizenzierter Client also irgendwann keine Verbindung mehr herstellen, sobald die Version, an die er gebunden ist, ausläuft – ein unbefristeter Kauf garantiert nicht, dass eine ausgemusterte Version verbindungsfähig bleibt. RustDesks eigenes Modell ist anders: Server OSS ist kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum, während das kommerzielle Server Pro jährlich lizenziert wird statt als lebenslanger Einmalkauf. ([TeamViewer-Abo-FAQ](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-classic/licensing/subscription/all-about-subscription/))

**RustDesks Modell** unterscheidet sich in zwei Punkten. Erstens zählen die kommerziellen Pläne **Login-Benutzer plus verwaltete Geräte**. Die Standardpläne (Individual, Basic, Customized) enthalten unbegrenzte gleichzeitige Verbindungen; nur Customized V2 lizenziert eine feste Anzahl gleichzeitiger Verbindungen. Ein [Upgrade](/de/blog/rustdesk-lizenz-wahrend-des-abonnements-upgraden-so-funktioniert-es) können Sie jederzeit im Self-Service-Portal kaufen: Es verlängert die Laufzeit der Lizenz auf ein volles Jahr ab dem Upgrade-Datum und rechnet den verbleibenden bezahlten Wert Ihrer aktuellen Lizenz an. Zweitens fällt für Server OSS keine Lizenzgebühr an, während Server Pro die kommerzielle Option für zentrale Verwaltungsfunktionen ist. Für Server Pro gibt es keine Self-Service-Testversion; schreiben Sie an [sales@rustdesk.com](mailto:sales@rustdesk.com), um Evaluierungskonditionen zu erfragen, bevor Sie einen Proof of Concept planen. Die Zahlungsabwicklung beschreibt die [RustDesk-Preisseite](https://rustdesk.com/pricing).

Wenn Ihr Ausgangspunkt die Kosten von TeamViewer sind, vergleichen Sie aktuelle Angebote für denselben Umfang.

Es gibt außerdem eine Besonderheit bei der kostenlosen Stufe. TeamViewers kostenlose Stufe ist für die persönliche, nicht-kommerzielle Nutzung gedacht, und ein Verdacht auf kommerzielle Nutzung kann Sitzungen einschränken. TeamViewer veröffentlicht keine Schwellenwert-Formel, auf die sich Nutzer verlassen können. Ein echter Fehlalarm gehört in den offiziellen Rücksetzungsprozess; tatsächliche geschäftliche Nutzung erfordert kommerzielle Konditionen. ([TeamViewer: Verdacht auf kommerzielle Nutzung](https://www.teamviewer.com/en-us/global/support/knowledge-base/teamviewer-classic/licensing/personal-use/commercial-use-suspected/)) Den gezielten Ablauf beschreibt [TeamViewer meldet „Kommerzielle Nutzung festgestellt“](/de/blog/teamviewer-meldet-kommerzielle-nutzung-festgestellt-so-beheben-sie-das).

## Vor- und Nachteile

**RustDesk**

_Vorteile_

- Server Pro zählt Login-Benutzer und verwaltete Geräte; die Standardpläne enthalten unbegrenzte gleichzeitige Verbindungen
- Keine Markierungen wegen vermuteter „kommerzieller Nutzung“ im kostenlosen Tarif, die Sitzungen unterbrechen, und keine unbefristete Lizenz, die keine Verbindung mehr herstellt, sobald ihre Version ausläuft
- Auditierbarer Client, den Sie aus dem Quellcode bauen können, dazu Server OSS ohne Lizenzgebühr und ohne Ablaufdatum
- Selbst gehostetes Server Pro: ID-/Rendezvous- und Relay-Server laufen auf Ihrer eigenen Maschine oder einem eigenen VPS, sodass die Sitzungsvermittlung innerhalb Ihres Perimeters bleibt
- LDAP/Active Directory und OIDC-SSO ab dem Basic-Plan
- Selbst gehostete Web-Konsole, Gerätegruppen, gemeinsames Adressbuch und ein Generator für individuell gebrandete Clients; Planungshilfen für große Geräteflotten

_Nachteile_

- Self-Hosting bedeutet, dass Sie den Server selbst betreiben, patchen und aktualisieren

**TeamViewer**

_Vorteile_

- Ende-zu-Ende-Verschlüsselung mit RSA-4096-Schlüsselaustausch und AES-256-Bit-Sitzungsverschlüsselung, dazu optionale TOTP-Zwei-Faktor-Authentifizierung für das Konto
- Veröffentlichte ISO-Zertifizierungen und SOC-Berichte sowie Dokumentation zur Compliance-Unterstützung
- Native Integrationen mit ServiceNow, Jira, Intune und weiteren über Tensor
- Vollständig verwaltetes SaaS – kein eigener Server zu betreiben

_Nachteile_

- Closed Source; Sie vertrauen der Infrastruktur des Anbieters und dessen Umgang mit Ihren Sitzungsmetadaten
- Die Zahl gleichzeitiger Sitzungen ist durch Plan und Add-ons begrenzt
- Wiederkehrendes Jahresabonnement ohne Option auf eine unbefristete Lizenz
- Die kostenlose Stufe ist nur für die private Nutzung bestimmt und kann Nutzer bei Verdacht auf „kommerzielle Nutzung“ markieren, was Sitzungen unterbricht
- Zentralisiertes Cloud-Modell – die eigene Infrastruktur des Anbieters ist selbst ein hochwertiges Angriffsziel, ein Risikoprofil, das Self-Hosting verändert

## Warum Teams trotzdem zu RustDesk wechseln

Alles bisher Genannte ist der neutrale Teil. Dieser Abschnitt macht unmissverständlich deutlich, was für RustDesk spricht.

**Sie wollen Gleichzeitigkeit, die keine Plan-Stufe ist.** TeamViewer begrenzt gleichzeitige Sitzungen über Plan und Add-ons. Die Standardpläne von RustDesk Server Pro enthalten unbegrenzte gleichzeitige Verbindungen, und LDAP/Active Directory sowie OIDC-SSO gibt es ab dem Basic-Plan – Wachstum heißt also, Login-Benutzer und Geräte hinzuzufügen, nicht Sitzungskapazität einzukaufen. Siehe die [aktuellen Preise](https://rustdesk.com/pricing) und die [Planungshilfe für große Geräteflotten](/de/blog/skaliert-rustdesk-auf-200-000-gerate).

**Sie wollen kostenlos einsteigen.** Server OSS hat keine Lizenzgebühr, kein Ablaufdatum und keine Erkennung kommerzieller Nutzung; ein Pilotprojekt kostet nur den Server, auf dem es läuft.

**Sie wollen Kontrolle über den serverseitigen Datenpfad.** Wer den ID-/Rendezvous- und den Relay-Dienst selbst betreibt, entscheidet, wer diese Dienste und die gespeicherten Metadaten betreibt und wo. Siehe [Warum Sie Ihre Remote-Desktop-Software selbst hosten sollten](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) und [Remote-Desktop-Datensouveränität & DSGVO](/de/blog/remote-desktop-datensouveranitat-and-dsgvo-self-hosting).

**Sie wollen den Code lesen können.** Für sicherheitsbewusste Käufer ist „wir können es überprüfen“ ein anderes Maß an Gewissheit als „der Anbieter sagt, es ist in Ordnung“.

**Sie sind MSPs oder Unternehmen, die ein einziges, individuell gebrandetes, selbst gehostetes Tool wollen.** Der individuell gebrandete Client macht aus RustDesk eine White-Label-Support-Plattform – siehe [RustDesk für MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool) und, für Organisationen, die AD/LDAP und Raum zum Wachsen brauchen, [RustDesk für Unternehmen](/de/blog/rustdesk-fur-unternehmen-self-hosted-skalierbar-ad-bereit).

Vergleichen Sie auch andere Optionen? Siehe [RustDesk vs. AnyDesk](/de/blog/rustdesk-vs-anydesk-selbst-gehostete-open-source-remotedesktop-software), [RustDesk vs. ScreenConnect](/de/blog/rustdesk-vs-screenconnect-selbst-gehosteter-remote-support) und [Eine selbst gehostete Alternative zu TeamViewer und AnyDesk](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative).

## RustDesk selbst ausprobieren

Server OSS können Sie kostenlos selbst hosten, ohne Lizenzgebühr und ohne Ablaufdatum. Sie wollen die Pro-Funktionen? Fragen Sie [sales@rustdesk.com](mailto:sales@rustdesk.com) nach den Evaluierungskonditionen, oder schauen Sie für die Plan-Preise auf [rustdesk.com/pricing](https://rustdesk.com/pricing) vorbei – und es gibt eine vollständige [Video-Anleitung](https://www.youtube.com/@rustdesk), falls Sie es sich lieber erst in Aktion ansehen möchten.

## Weiterführende Artikel

- [RustDesk vs. AnyDesk](/de/blog/rustdesk-vs-anydesk-selbst-gehostete-open-source-remotedesktop-software)
- [RustDesk vs. ScreenConnect](/de/blog/rustdesk-vs-screenconnect-selbst-gehosteter-remote-support)
- [Eine selbst gehostete Alternative zu TeamViewer und AnyDesk: RustDesk](/de/blog/die-beste-selbst-gehostete-teamviewer-alternative)
- [TeamViewer vs. AnyDesk für MSPs](/de/blog/teamviewer-vs-anydesk-fur-msps-eine-selbst-gehostete-dritte-option)
- [TeamViewer vs. Splashtop](/de/blog/teamviewer-vs-splashtop-preise-performance-and-self-hosting)
- [TeamViewer meldet „Kommerzielle Nutzung festgestellt“](/de/blog/teamviewer-meldet-kommerzielle-nutzung-festgestellt-so-beheben-sie-das)
