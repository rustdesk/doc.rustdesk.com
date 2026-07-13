---
publishDate: 2026-07-07T17:09:00Z
lang: de
translationKey: rustdesk-remote-control-android-ios
draft: false
title: 'RustDesk Fernsteuerung für Android & iOS: Was funktioniert'
excerpt: 'Wie RustDesk Android-Smartphones fernsteuert, iPhones und iPads in Steuergeräte verwandelt – und warum kein Anbieter iOS fernsteuern kann.'
image: ~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp
category: 'Anleitungen'
tags: ['RustDesk', 'Mobil']
author: RustDesk Team
slug: 'rustdesk-fernsteuerung-fur-android-and-ios-was-funktioniert'
faq:
  - question: 'Kann ich ein Android-Smartphone mit RustDesk fernsteuern?'
    answer: 'Ja. Auf dem Android-Gerät starten Sie den Bildschirmaufnahme-Dienst von RustDesk (der eine Bestätigung auf dem Bildschirm erfordert) und aktivieren den Bedienungshilfen-Dienst „RustDesk Input", damit Tipp- und Wischgesten aus der Ferne eingespielt werden können. Für die Bildschirmfreigabe ist mindestens Android 6 erforderlich, für die Freigabe des internen Systemtons mindestens Android 10. Manche Hersteller schränken die Bedienungshilfen für seitengeladene (sideloaded) Apps ein, sodass Sie zunächst „Eingeschränkte Einstellungen zulassen" aktivieren müssen.'
  - question: 'Kann RustDesk ein iPhone oder iPad steuern?'
    answer: 'Mit keiner Remote-Desktop-App – das ist eine Einschränkung der iOS-Plattform, keine von RustDesk. Apples Beschränkungen bei Bildschirmaufnahme und Hintergrundausführung erlauben es keiner App eines Drittanbieters, als Host ferngesteuert zu werden, weshalb kein Anbieter eine echte Fernsteuerung eines iPhones oder iPads anbietet. Was die iOS-/iPadOS-App von RustDesk hingegen sehr gut kann: als Steuergerät fungieren – nutzen Sie ein iPhone oder iPad, um Ihre Windows-, macOS-, Linux- und Android-Geräte zu steuern.'
  - question: 'Kann ich mein Smartphone nutzen, um meinen Computer zu steuern?'
    answer: 'Ja. Die RustDesk-Apps für Android und iOS funktionieren als vollwertige Steuerungs-Clients. Von beiden aus können Sie sich mit einem Windows-, macOS- oder Linux-Rechner verbinden und ihn per Touchpad-Anzeige oder Mausmodus steuern. Das ist der zuverlässigste mobile Anwendungsfall und funktioniert genauso wie beim Desktop-Client.'
  - question: 'Sind die mobilen RustDesk-Apps quelloffen?'
    answer: 'Ja. Die mobilen Clients nutzen dieselbe quelloffene AGPL-Codebasis wie der Desktop-Client. Android-Builds stehen über die offiziellen RustDesk-GitHub-Releases und F-Droid als com.carriez.flutter_hbb zur Verfügung; das iOS-Steuergerät gibt es im Apple App Store. Über Google Play wird RustDesk derzeit nicht vertrieben.'
  - question: 'Kann ich ein Android-Gerät dauerhaft für unbeaufsichtigten Zugriff einrichten?'
    answer: 'Nur teilweise. RustDesk kann seinen Aufnahmedienst über eine Vordergrund-Benachrichtigung am Leben halten und ihn nach einem Neustart automatisch wieder starten. Die erforderliche Bestätigung für die Bildschirmaufnahme, die blockierte Tastatur auf dem Sperrbildschirm sowie die Notwendigkeit, das Gerät nach einem Neustart manuell zu entsperren, machen echten unbeaufsichtigten Zugriff auf Android jedoch unzuverlässig. Betrachten Sie die Android-Steuerung eher als betreuten Support denn als „einrichten und vergessen"-Zugriff.'
metadata:
  description: 'RustDesk unter Android und iOS: Android-Geräte aus der Ferne steuern, mit beiden mobilen Apps Ihre Desktops bedienen – und was Apple auf iPhone und iPad erlaubt.'
  keywords: 'RustDesk Android iOS Fernsteuerung, Smartphone fernsteuern mit RustDesk, RustDesk Android Host, Android aus der Ferne steuern, RustDesk iOS, iPhone fernsteuern, RustDesk mobile App'
---

„Kann ich mich per Fernzugriff auf ein Smartphone verbinden?“ ist eine der häufigsten Fragen, die RustDesk erreicht – und sie verdient eine ehrliche statt einer werblichen Antwort. Kurz gesagt: RustDesk kann ein Android-Gerät tatsächlich fernsteuern, beide mobilen Apps eignen sich hervorragend als _Steuergeräte_ für Ihre Computer – und, was viele nicht hören wollen: Auf ein iPhone oder iPad können Sie sich derzeit nicht per Fernzugriff verbinden. Dieser Leitfaden erklärt genau, was funktioniert, was nicht, und warum – damit Sie mit den tatsächlichen Möglichkeiten planen können statt mit Annahmen.

Wie der Rest von RustDesk sind auch beide mobilen Apps quelloffen und unterliegen der AGPL. Android-Builds sind über die [offiziellen RustDesk-GitHub-Releases](https://github.com/rustdesk/rustdesk/releases) und [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) als `com.carriez.flutter_hbb` erhältlich, mit breiter Geräteabdeckung – arm64-, arm32- und x86_64-Builds sowie eine universelle APK; das iOS-Steuergerät gibt es im App Store. RustDesk wird [derzeit nicht über Google Play vertrieben](/de/blog/rustdesk-und-remote-access-betrug-was-wir-tun): Die Android-App wurde als Reaktion auf Betrugsmissbrauch freiwillig aus dem Store genommen. Gleiche Codebasis, gleicher überprüfbarer Kern.

## Die Zusammenfassung in einer Tabelle

| Szenario                                             | Unterstützt? | Hinweise                                                               |
| ---------------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| Windows-/macOS-/Linux-PC **von** Android aus steuern | Ja           | Vollwertiges Steuergerät; Touchpad- oder Mausmodus                     |
| PC **von** iPhone/iPad aus steuern                   | Ja           | Vollwertiges Steuergerät                                               |
| **Ein Android-Gerät** steuern (als Host)             | Ja           | Erfordert Bestätigung der Bildschirmaufnahme + Bedienungshilfen-Dienst |
| **Ein iOS-Gerät** steuern (iPhone/iPad als Host)     | **Nein**     | Apple-Einschränkungen; nicht implementiert                             |
| Einen iOS-Bildschirm aus der Ferne betrachten        | **Nein**     | Derzeit nicht unterstützt                                              |

Der Rest des Artikels liefert lediglich die Details zu jeder Zeile.

## Das Smartphone als Steuergerät nutzen (der einfache Teil)

Das ist der Anwendungsfall, der einfach „funktioniert“. Installieren Sie RustDesk auf Ihrem Android- oder iOS-Gerät, und es wird zu einem vollwertigen Steuergerät für jeden RustDesk-Host – Ihren Windows-Desktop, Ihren [Mac](https://rustdesk.com/docs/de/client/mac/), Ihren [Linux-Rechner](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop). Geben Sie die Ziel-ID und das Passwort ein, und Sie erhalten den entfernten Bildschirm mit einem Touchpad auf dem Display, einem Mausmodus, einer Software-Tastatur und Dateiübertragung. Auf dem Smartphone ist dafür nichts Besonderes nötig, da Sie die Steuerung nur _senden_ und nicht selbst gesteuert werden.

Wenn Ihre Aufgabe lautet „einen Computer reparieren, egal wo ich gerade bin“, ist ein Smartphone mit RustDesk ein wirklich gutes Werkzeug – und es verhält sich genauso wie der Desktop-Client.

## Ein Android-Gerät steuern (als Host)

Hier gelingt RustDesk etwas, das die meisten Remote-Tools nicht können: Ein Android-Smartphone oder -Tablet wird zu einem steuerbaren Host. Zwei Android-Subsysteme machen das möglich, und beide erfordern eine explizite Einrichtung.

**Bildschirmaufnahme.** RustDesk nutzt Androids `MediaProjection`-API, um den Bildschirminhalt zu erfassen. Wenn Sie in der App auf **Dienst starten** tippen, zeigt Android eine Bestätigungsabfrage an, die um Erlaubnis zur Bildschirmaufnahme bittet – dieser Dialog ist zwingend erforderlich und kann nicht stillschweigend umgangen werden. Für die Bildschirmfreigabe ist mindestens **Android 6** nötig; für die Erfassung des **internen Systemtons** des Smartphones mindestens **Android 10**. Solange diese Aufnahmeberechtigung nicht erteilt ist, kann keine eingehende Verbindung irgendetwas sehen.

**Ferneingabe.** Den Bildschirm zu sehen ist nicht dasselbe wie ihn zu steuern. Um Tipp-, Wisch- und Tastenereignisse einzuspielen, registriert RustDesk einen [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) namens **RustDesk Input**, den Sie unter **Einstellungen → Bedienungshilfen** aktivieren. Er übersetzt entfernte Maus- und Gestenereignisse in Android-Gesten und kann Systemaktionen wie Zurück, Home und Übersicht (Recents) auslösen.

**Am Leben halten.** RustDesk hält eine Vordergrunddienst-Benachrichtigung und optional ein schwebendes Overlay-Fenster aufrecht, damit Android den Aufnahmeprozess nicht beendet, und kann den Dienst nach einem Neustart automatisch wieder starten.

Nun zu den Einschränkungen, denn Androids Sicherheitsmodell bringt echte mit sich:

- **Für den Start der Aufnahme ist eine Bestätigung nötig.** Jemand (oder eine vorherige Genehmigung) muss die Bildschirmaufnahme-Abfrage akzeptieren.
- **Der Sperrbildschirm blockiert Eingaben.** Android erlaubt es einem Bedienungshilfen-Dienst nicht, auf dem gesicherten Sperrbildschirm zu tippen. Ist das Gerät gesperrt, können Sie den Entsperrcode in der Regel nicht aus der Ferne eingeben – eine Einschränkung, die auch [von erfahrenen Anwendern dokumentiert wurde](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Nach einem Neustart ist eine manuelle Entsperrung nötig.** Nach einem Neustart muss das Gerät in der Regel persönlich entsperrt werden, bevor die Steuerung wieder funktioniert.
- **Einschränkungen durch OEMs.** Bei manchen Herstellern ist der Schalter für die Bedienungshilfe **RustDesk Input** bei seitengeladenen Apps ausgegraut, bis Sie „Eingeschränkte Einstellungen“ zulassen (App-Symbol lange gedrückt halten → App-Info → eingeschränkte Einstellungen zulassen). Aggressive Akku-Manager mancher Hersteller können den Hintergrunddienst zudem beenden.

Die praktische Erkenntnis: Die Android-Steuerung eignet sich hervorragend für **betreuten Support** – also für die Hilfe bei jemandem, der sein Smartphone gerade in der Hand hält –, während **unbeaufsichtigter „einrichten und vergessen“-Zugriff** eine Aufgabe ist, die der Desktop-Host am besten erledigt, da mobile Betriebssysteme dauerhaften Hintergrundzugriff einschränken. Wählen Sie die Plattform passend zur Aufgabe. (Für Desktops behandelt der [Leitfaden zur Einrichtung des unbeaufsichtigten Zugriffs](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung) die eigentliche Umsetzung.)

## Ein iOS-Gerät steuern: Was Apple erlaubt

Das ist der Teil, nach dem ständig gefragt wird und der anderswo nur vage beantwortet wird – deshalb werden wir hier direkt: **Keine Remote-Desktop-App kann ein iPhone oder iPad fernsteuern – RustDesk eingeschlossen.** Unter iOS ist die RustDesk-App ein leistungsfähiges Steuergerät – sie verbindet sich _nach außen_, um Ihre Computer zu steuern –, aber Apple erlaubt es keiner App eines Drittanbieters, unter iOS als ferngesteuerter Host zu fungieren.

Der Grund liegt bei Apple. iOS schränkt Hintergrundausführung, Bildschirmaufnahme und jede Form von synthetischer Eingabeinjektion stark ein – deshalb bietet keine App eines Drittanbieters echte Fern*steuerung* eines iPhones. Das ist weniger ein Versäumnis von RustDesk als vielmehr eine Mauer auf Plattformebene – die Unterstützung von iOS als Host ist ein wiederholt [auf GitHub angefragtes Feature](https://github.com/rustdesk/rustdesk/discussions/4839), das nach wie vor nicht umgesetzt ist. Apples Broadcast-APIs (ReplayKit) können einen Bildschirm zwar grundsätzlich streamen, aber das ist eine von der App selbst initiierte Übertragung – kein Abruf durch eine entfernte Gegenstelle. Daher bleibt die Fernanzeige von iOS-Bildschirmen durch Drittanbieter-Apps unmöglich, und eine vollständige Fernsteuerung von iOS durch ein anderes Gerät ist etwas, das das Betriebssystem Drittanbietern nicht gestattet.

Wenn Ihre Anforderung also konkret lautet „per Fernzugriff auf ein iPhone verbinden“, kann das derzeit kein Remote-Desktop-Tool leisten – das ist eine iOS-Plattformgrenze, an die jeder Anbieter stößt, keine Lücke bei RustDesk, wie auch in unserem Vergleich [RustDesk vs. AnyDesk](/de/blog/rustdesk-vs-anydesk-selbst-gehostete-open-source-remotedesktop-software) erläutert. Das sagen wir Ihnen lieber gleich zu Beginn, als dass Sie es erst nach der Einrichtung entdecken.

## Ein Hinweis zu Datenschutz und Self-Hosting

Da die mobilen Apps quelloffen sind und dasselbe Protokoll wie der Desktop-Client sprechen, können Sie sie statt auf das öffentliche Netzwerk auf Ihren eigenen [selbst gehosteten RustDesk-Server](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) ausrichten – mobile Sitzungen werden dann über eine Infrastruktur vermittelt, die Sie selbst kontrollieren, ID inklusive. Für Remote-Support-Workflows, die persönliche Geräte betreffen, wiegt dieser Aspekt der Datenhoheit besonders schwer.

Der Kompromiss ist wie immer derselbe: Sie betreiben und sichern diesen Server selbst – angesichts der geringen Anforderungen eine überschaubare Aufgabe –, und für viele Teams lohnt es sich sehr, die Sitzungsdaten auf eigenem Terrain zu behalten.

## Erste Schritte

Laden Sie Android-Builds von den [offiziellen GitHub-Releases](https://github.com/rustdesk/rustdesk/releases) herunter oder installieren Sie das Paket über [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk wird [derzeit nicht über Google Play vertrieben](/de/blog/rustdesk-und-remote-access-betrug-was-wir-tun); das iOS-Steuergerät bleibt weiterhin im Apple App Store erhältlich. Um ein Smartphone zu steuern, muss dieses ein Android-Gerät sein – akzeptieren Sie die Bildschirmaufnahme-Abfrage und aktivieren Sie den Bedienungshilfen-Dienst RustDesk Input. Um Ihre Computer von einem Smartphone aus zu steuern, funktioniert jede der beiden mobilen Apps sofort einsatzbereit. Die aktuellen Tarife finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing), und [sales@rustdesk.com](mailto:sales@rustdesk.com) hilft Ihnen gerne bei Server Pro weiter. Möchten Sie es sich zuerst ansehen? [RustDesk in Aktion erleben](https://www.youtube.com/@rustdesk).
