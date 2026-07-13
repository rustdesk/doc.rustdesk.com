---
publishDate: 2026-07-06T12:36:00Z
lang: 'de'
translationKey: rustdesk-and-remote-access-scams
draft: false
title: 'RustDesk und Remote-Access-Betrug: Was wir tun'
excerpt: 'Warum RustDesk Google Play verlassen hat, Warnhinweise und eine Login-Pflicht für den öffentlichen Server eingeführt hat und wie Nutzer gesteuerte Geräte mit Passwörtern, 2FA und IP-Allowlists absichern können.'
image: ~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp
category: 'Sicherheit'
tags: ['RustDesk', 'Sicherheit', 'Betrug']
author: 'RustDesk Team'
slug: 'rustdesk-und-remote-access-betrug-was-wir-tun'
faq:
  - question: 'Ist RustDesk ein Betrug?'
    answer: 'Nein. RustDesk ist eine legitime Open-Source-Software für den Fernzugriff. Wie andere Remote-Desktop-Tools kann sie jedoch missbraucht werden, wenn ein Betrüger jemanden dazu überredet, sie zu installieren, den Dienst zu starten und Zugriff zu gewähren. RustDesk veröffentlicht Betrugswarnungen und hat Einschränkungen bei der Distribution und beim öffentlichen Server eingeführt, um diesen Missbrauch zu verringern. Aber kein Fernzugriffsprodukt kann Social Engineering unmöglich machen.'
  - question: 'Warum ist RustDesk nicht bei Google Play verfügbar?'
    answer: 'RustDesk hat seine Android-App im September 2023 freiwillig aus Google Play entfernt, um weitere Betrugsversuche gegen Nutzer zu verhindern. Android-Builds sind weiterhin über die offiziellen RustDesk-GitHub-Releases und F-Droid verfügbar. Laden Sie die App nur von Quellen herunter, die Sie selbst unabhängig geprüft haben – nicht von einem Link, den Ihnen ein unaufgeforderter Anrufer geschickt hat.'
  - question: 'Warum verlangt der öffentliche RustDesk-Server eine Anmeldung?'
    answer: 'RustDesk gibt an, dass die Anmeldung für Controller auf dem öffentlichen Server derzeit aufgrund anhaltenden Betrugs- und Botnet-Missbrauchs erforderlich ist. Die Anmeldung ist über unterstützte Drittanbieter-Identitätsdienste kostenlos. Der öffentliche Server ist für Demonstrations- und Testzwecke gedacht, nicht für den Produktivbetrieb oder sensible Aufgaben. Self-Hosting bleibt für Organisationen verfügbar, die ihre eigene Infrastruktur betreiben und eigene Richtlinien festlegen müssen.'
  - question: 'Wie sollte ich ein Gerät schützen, das RustDesk-Verbindungen akzeptiert?'
    answer: 'Legen Sie auf dem gesteuerten Gerät ein starkes, einzigartiges permanentes Passwort fest, aktivieren Sie die TOTP-2FA für Verbindungen im Client, und nutzen Sie die IP-Allowlist, wenn Ihre Controller-Adressen oder CIDR-Bereiche vorhersehbar sind. Halten Sie Ausnahmen für vertrauenswürdige Geräte eng gefasst. Diese Schutzebenen verringern das Risiko durch Passwörter und den Verbindungsursprung, können aber niemanden schützen, der einem Betrüger absichtlich das Passwort, den aktuellen 2FA-Code oder eine manuelle Freigabe mitteilt.'
metadata:
  description: 'Wie RustDesk auf Remote-Access-Betrug reagiert: öffentliche Warnhinweise, Rückzug aus Google Play, Login-Pflicht für den öffentlichen Server, 2FA für gesteuerte Geräte und CIDR-IP-Allowlists.'
  keywords: 'RustDesk Betrug, ist RustDesk Betrug, RustDesk Google Play, RustDesk Login erforderlich, RustDesk 2FA, RustDesk IP-Whitelist, Schutz vor Remote-Access-Betrug'
---

RustDesk ist eine legitime Open-Source-Software für den Fernzugriff, aber auch legitime Software kann missbraucht werden. Ein Betrüger kann ein Opfer anrufen, ein dringendes Problem erfinden und die Person dazu überreden, ein Fernsteuerungs-Tool zu installieren und Zugriff zu gewähren. RustDesk ist von diesem Risiko nicht ausgenommen, und Verschlüsselung ändert nichts daran, wenn eine Zustimmung durch Täuschung erschlichen wurde.

Unsere Antwort darauf war, an mehreren Punkten dieses Ablaufs Warnhinweise und Reibungspunkte einzubauen: auf unserer Website, im Ablauf für gesteuerte Android-Geräte, bei einem wichtigen Vertriebskanal und auf dem öffentlichen Server. Diese Maßnahmen erschweren auch legitimen Nutzern die Nutzung. Dieser Artikel dokumentiert, was wir getan haben, warum wir es getan haben und wo die Grenzen dieser Maßnahmen liegen.

## Was hat RustDesk gegen Remote-Access-Betrug unternommen?

| Maßnahme                                    | Worauf sie abzielt                                                                       | Kosten oder Einschränkung                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Warnhinweise auf Website und im Client      | Eine Person, die von einem unbekannten Anrufer angewiesen wird, RustDesk zu installieren | Eine Warnung kann trotzdem ignoriert werden                                                   |
| Freiwilliger Rückzug aus Google Play        | Einfache, betrugsgetriebene Installation über einen vertrauten App Store                 | Legitime Android-Nutzer verlieren die Auffindbarkeit im Store und automatische Play-Updates   |
| Login auf dem öffentlichen Server           | Anonyme Nutzung gemeinsamer Infrastruktur für Betrug und Botnetze                        | Legitime Nutzer müssen sich anmelden, und manche bestehenden Abläufe werden gestört           |
| Sicherheitskontrollen für gesteuerte Geräte | Passwortdiebstahl, breite Netzwerkexposition und Risiken beim unbeaufsichtigten Zugriff  | Sie müssen korrekt konfiguriert werden und können eine freiwillige Preisgabe nicht verhindern |

Dies sind Maßnahmen zur Risikominderung, keine Behauptung, dass RustDesk betrugssicher ist.

## Warnhinweise dort, wo ein potenzielles Opfer sie sehen kann

Die [RustDesk-Support-Seite](https://rustdesk.com/support) beginnt mit einer direkten Betrugswarnung. Sie fordert Personen, die gerade mit jemandem telefonieren, den sie nicht kennen und dem sie nicht vertrauen, und die aufgefordert wurden, RustDesk zu installieren, auf, das Gespräch abzubrechen. Auch das [RustDesk-GitHub-Repository](https://github.com/rustdesk/rustdesk) enthält einen Hinweis zum Missbrauch, der sich gegen unbefugten Zugriff, unbefugte Steuerung und Verletzung der Privatsphäre richtet.

Die Warnung befindet sich auch im offiziellen Android-Client, der über [GitHub Releases](https://github.com/rustdesk/rustdesk/releases) verteilt wird. Tippt man auf einem noch nicht angemeldeten Android-Gerät, das gesteuert werden soll, auf **Dienst starten**, öffnet sich eine Warnung, bevor der Bildschirmaufnahme-Dienst startet. Die Warnung fordert einen Nutzer, der von einem unbekannten und nicht vertrauenswürdigen Anrufer dazu angewiesen wurde, auf, aufzulegen und abzubrechen. Offizielle Builds erzwingen einen Countdown, bevor der Nutzer fortfahren kann. Sowohl der [aktuelle Ablauf auf der gesteuerten Seite](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421) als auch der [englische Warntext](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194) sind im Open-Source-Repository einsehbar.

Diese Platzierung ist wichtig. Eine allgemeine Sicherheitsseite erreicht vielleicht jemanden, der sich über ein Produkt informiert; eine Warnung bei **Dienst starten** erreicht die Person genau in dem Moment, in dem eine eingehende Android-Sitzung möglich zu werden droht. Sie kann diese Person aber trotzdem nicht dazu zwingen, einem überzeugenden Anrufer zu misstrauen.

## Warum RustDesk nicht bei Google Play ist

Am 3. September 2023 erklärte der offizielle RustDesk-X-Account: [„Wir haben RustDesk vorübergehend aus Google Play entfernt, um weitere Betrugsversuche gegen Nutzer zu verhindern.“](https://x.com/rustdesk/status/1698372220379349421) Der Link und der Text sind auch in der beantworteten [GitHub-Diskussion #5660](https://github.com/rustdesk/rustdesk/discussions/5660) erhalten, und die aktuelle RustDesk-[FAQ besagt, dass das Projekt sich wegen Betrugsfällen selbst aus Google Play zurückgezogen hat](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store).

RustDesk wird daher **derzeit nicht über Google Play vertrieben**. Das war keine Behauptung, dass der Android-Client Malware sei oder dass jede Person, die ihn installiert, gefährdet sei. Es war eine Vertriebsentscheidung, mit der ein häufig in Betrugsanleitungen genutzter Weg eingeschränkt werden sollte.

Dieser Kompromiss ist real: Der Rückzug aus Google Play verringert für legitime Nutzer die Auffindbarkeit, die vertraute Installation und die automatischen Store-Updates. Aktuelle Android-Builds sind über die [offiziellen RustDesk-GitHub-Releases](https://github.com/rustdesk/rustdesk/releases) und [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) verfügbar. Prüfen Sie das Ziel selbst. Installieren Sie keine APK von einem Download-Link, den Ihnen ein unaufgeforderter Support-Anrufer geschickt hat. Unser [Leitfaden zu Android und iOS](/de/blog/rustdesk-fernsteuerung-fur-android-and-ios-was-funktioniert) listet die aktuellen mobilen Funktionen und Installationsquellen auf.

## Warum der öffentliche Server eine Anmeldung erfordert

Der aktuelle [Leitfaden zur Anmeldung auf dem öffentlichen Server](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server) von RustDesk besagt, dass die Anmeldung für Controller wegen anhaltender Betrugs- und Botnet-Angriffe erforderlich ist. Die Anmeldung ist kostenlos und erfolgt über einen unterstützten Drittanbieter-Identitätsdienst wie Google oder GitHub; ein separater Benutzername und ein separates Passwort werden auf dem öffentlichen Server nicht angeboten. Der Leitfaden besagt derzeit, dass nur Controller sich anmelden müssen.

Dadurch kommt ein Identitätsschritt hinzu, und ein Teil des anonymen Zugriffs auf die Infrastruktur, die RustDesk für Demonstrations- und Testzwecke betreibt, entfällt. Für einen privaten RustDesk-Server gilt dies nicht, und es kann einen Betrüger nicht aufhalten, der andere Infrastruktur nutzt oder eine neue Identität anlegt.

Das führte auch zu Störungen. In einer [Reddit-Diskussion über den neuen Anmeldefehler](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/) berichteten einige legitime Nutzer, dass sie ihre Heim- oder Familiengeräte nicht erreichen konnten, bis sie den Anmeldeschritt verstanden und abgeschlossen hatten. Andere lehnten es ab, eine Drittanbieter-Identität zu verknüpfen. Diese Kommentare belegen nicht, ob die Einschränkung gegen Betrüger wirkt oder nicht, aber sie dokumentieren ihre betrieblichen Kosten. Maßnahmen gegen Missbrauch, die Reibung erzeugen, sollten diese Kosten offen benennen.

## Wie sichern Sie ein gesteuertes RustDesk-Gerät ab?

Einschränkungen auf Plattformebene sind nur eine Schutzebene. Der Besitzer oder Administrator eines gesteuerten Geräts sollte zusätzlich einschränken, wer sich verbinden kann, und begrenzen, was gestohlene Zugangsdaten ermöglichen.

### 1. Ein starkes, einzigartiges permanentes Passwort festlegen

Legen Sie für den [unbeaufsichtigten Zugriff](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung) in den RustDesk-Sicherheitseinstellungen des gesteuerten Geräts ein **starkes, einzigartiges permanentes Passwort** fest. Verwenden Sie nicht erneut das Betriebssystem-Login, das E-Mail-Passwort oder ein Passwort, das Sie bereits bei einem anderen Dienst nutzen. Ändern Sie es sofort, wenn es möglicherweise offengelegt wurde.

Bevorzugen Sie für beaufsichtigten Support, wo praktikabel, ein temporäres Einmalpasswort oder eine ausdrückliche Freigabe per Klick. Ein starkes permanentes Passwort verringert das Risiko durch Erraten, Credential Stuffing und Passwort-Wiederverwendung. Es hilft jedoch nicht, wenn ein Opfer dieses Passwort einem Anrufer vorliest.

### 2. 2FA auf dem gesteuerten Gerät aktivieren

RustDesk bietet TOTP-2FA für eingehende Verbindungen zu einem gesteuerten Gerät. Öffnen Sie auf dem Gerät, das Verbindungen entgegennehmen soll, die Sicherheitseinstellungen, aktivieren Sie **2FA**, scannen Sie den QR-Code mit einer Authenticator-App und bestätigen Sie die Einrichtung mit dem sechsstelligen Code.

Ist 2FA aktiviert, genügt das normale Verbindungspasswort allein nicht mehr: Der Controller muss zusätzlich den aktuellen sechsstelligen TOTP-Code angeben, bevor das gesteuerte Gerät die Sitzung autorisiert. Die Funktion wurde ausdrücklich als [2FA für unbeaufsichtigten Zugriff](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b) eingeführt, und ihre [TOTP-Implementierung ist öffentlich einsehbar](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs).

RustDesk kann optional einem Controller-Gerät vertrauen und spätere 2FA-Abfragen überspringen. Lassen Sie diese Umgehung deaktiviert, wenn Sie das strengste Verhalten wünschen. Falls Sie sie nutzen, überprüfen Sie die Liste vertrauenswürdiger Geräte und entfernen Sie Geräte, die verloren gegangen, ersetzt worden, gemeinsam genutzt oder nicht mehr autorisiert sind.

2FA schützt vor einem Passwort, das erraten, wiederverwendet oder offengelegt wurde. Es kann niemanden schützen, der einem Betrüger sowohl das Passwort als auch den aktuellen Authenticator-Code mitteilt.

### 3. Eingehende Verbindungen mit einer IP-Allowlist einschränken

In der RustDesk-Oberfläche heißt diese Funktion **IP Whitelisting**. Erklärt bedeutet das: Es handelt sich um eine IP-Allowlist. Das gesteuerte Gerät weist eine Verbindung, deren Quelladresse außerhalb der konfigurierten Liste liegt, bereits vor der Passwort- und 2FA-Autorisierung ab.

Konfigurieren Sie sie hier:

- **Gesteuertes Desktop-Gerät:** **Einstellungen → Sicherheit → Sicherheit → IP Whitelisting verwenden**
- **Gesteuertes Mobilgerät:** **Einstellungen → Bildschirm freigeben → IP Whitelisting verwenden**

Die Einstellung akzeptiert einzelne IPv4- oder IPv6-Adressen sowie CIDR-Bereiche. CIDR kombiniert eine Netzwerkadresse mit einer Präfixlänge. Das Präfix gibt an, wie viele führende Bits fest vorgegeben sind: Ein größeres Präfix bedeutet einen kleineren zulässigen Bereich.

- `203.0.113.10` oder `203.0.113.10/32`: eine einzelne IPv4-Adresse.
- `203.0.113.0/24`: 256 IPv4-Adressen, von `203.0.113.0` bis `203.0.113.255`.
- `2001:db8::10/128`: eine einzelne IPv6-Adresse.
- `2001:db8:1234::/64`: ein IPv6-Subnetz.

Dies sind ausschließlich Beispielbereiche zu Dokumentationszwecken; übernehmen Sie sie nicht unverändert. Tragen Sie Ihre tatsächlichen Controller-Adressen oder -Netzwerke ein. Mehrere Einträge können durch Kommas, Semikolons, Leerzeichen oder Zeilenumbrüche getrennt werden. RustDesk dokumentiert diese Einstellung in der [Referenz zur erweiterten Client-Konfiguration](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#whitelist), und die [Durchsetzung auf der Seite des gesteuerten Geräts ist im Quellcode einsehbar](https://github.com/rustdesk/rustdesk/blob/master/src/server/connection.rs#L1347-L1374).

Verwenden Sie die kleinstmöglichen praktikablen Bereiche. Feste Ausgangsadressen aus dem Büro und bekannte VPN-Bereiche sind gute Kandidaten. Dynamische private Adressen und Controller mit wechselndem Standort sind es nicht. Prüfen Sie, welche Quelladresse RustDesk in Ihrer NAT-, VPN-, Direkt- oder Relay-Topologie sieht, und testen Sie die neue Regel aus einer weiteren Sitzung heraus, bevor Sie die aktuell laufende Sitzung schließen. Eine falsche Adresse oder ein falsches CIDR kann legitimes Support-Personal aussperren.

Eine Allowlist schränkt ein, von wo aus eine Verbindung ausgehen darf. Sie ersetzt weder Passwort noch 2FA und kann einen böswilligen Controller, der bereits aus einem zugelassenen Netzwerk heraus agiert, nicht aufhalten.

## Was diese Maßnahmen nicht leisten können

Warnhinweise, der Rückzug aus dem Store, Anmeldepflichten, starke Passwörter, 2FA und IP-Allowlists nehmen einem Angreifer jeweils einen Teil seiner Möglichkeiten. Keine dieser Maßnahmen beseitigt das zentrale Risiko des Social Engineering: Eine Person kann weiterhin dazu überredet werden, Zugriff zu genehmigen oder jeden einzelnen Faktor preiszugeben.

Auch Self-Hosting macht Missbrauch nicht unmöglich. Es gibt einer Organisation die Kontrolle über ihren eigenen RustDesk-Server und ihre Richtlinien, aber auch ein Betrüger kann private Infrastruktur betreiben oder einen modifizierten Client verbreiten. Die Einschränkungen des öffentlichen RustDesk-Servers sollten nicht mit einem Schutz verwechselt werden, der sich automatisch auf jede selbst gehostete Bereitstellung erstreckt.

Wenn ein unbekannter Anrufer Sie auffordert, RustDesk zu installieren, den Dienst zu starten, ein Passwort weiterzugeben, einen 2FA-Code preiszugeben oder eine Online-Banking-Seite zu öffnen, brechen Sie ab. Unser herstellerneutraler Leitfaden zum [Erkennen, Verhindern und Beheben von Remote-Desktop-Betrug](/de/blog/remote-desktop-betrug-so-erkennen-und-vermeiden-sie-ihn) erklärt die Warnzeichen und was zu tun ist, wenn bereits Zugriff gewährt wurde.

Verantwortung bedeutet hier nicht eine einzelne Einstellung oder eine Absichtserklärung. Es ist die fortlaufende Arbeit, Nutzer zu warnen, Reibung dort in Kauf zu nehmen, wo Missbrauch sie erfordert, technische Kontrollen bereitzustellen, deren Grenzen zu dokumentieren und die eigene Antwort anzupassen, wenn Angreifer ihre Methoden ändern.
