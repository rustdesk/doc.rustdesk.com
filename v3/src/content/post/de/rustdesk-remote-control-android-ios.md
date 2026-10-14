---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: de
translationKey: rustdesk-remote-control-android-ios
draft: false
title: 'RustDesk Fernsteuerung für Android & iOS: Was funktioniert'
excerpt: 'RustDesk steuert Android-Smartphones aus der Ferne und macht Android, iPhone und iPad zu Steuergeräten für Ihre Computer. Die iOS-App dient nur zum Steuern.'
image: ~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp
category: 'Anleitungen'
tags: ['RustDesk', 'Mobil']
author: RustDesk Team
slug: 'rustdesk-fernsteuerung-fur-android-and-ios-was-funktioniert'
faq:
  - question: 'Kann ich ein Android-Smartphone mit RustDesk fernsteuern?'
    answer: 'Ja. Auf dem Android-Gerät starten Sie den Bildschirmaufnahme-Dienst von RustDesk (der eine Bestätigung auf dem Bildschirm erfordert) und aktivieren den Bedienungshilfen-Dienst „RustDesk Input“, damit Tipp- und Wischgesten aus der Ferne eingespielt werden können. Für die Bildschirmfreigabe ist mindestens Android 6 erforderlich, für die Freigabe des internen Systemtons mindestens Android 10. Manche Hersteller schränken die Bedienungshilfen für per Sideloading installierte Apps ein; dann müssen Sie zunächst eingeschränkte Einstellungen zulassen.'
  - question: 'Kann RustDesk ein iPhone oder iPad steuern?'
    answer: 'Nein. Die RustDesk-App für iOS/iPadOS dient nur zum Steuern: Mit einem iPhone oder iPad steuern Sie Windows-, macOS-, Linux- und Android-Geräte. RustDesk implementiert unter iOS weder Hosting noch Bildschirmfreigabe noch Ferneingabe. Einige andere Anbieter bieten eine beaufsichtigte iOS-Bildschirmansicht an, und Apple bietet in FaceTime-Anrufen eine zustimmungsbasierte Fernsteuerung.'
  - question: 'Kann ich mein Smartphone nutzen, um meinen Computer zu steuern?'
    answer: 'Ja. Die RustDesk-Apps für Android und iOS sind vollwertige Steuergeräte: Verbinden Sie sich über die ID mit einem Windows-, macOS- oder Linux-Rechner und steuern Sie ihn per Touchpad- oder Mausmodus auf dem Bildschirm und mit einer Software-Tastatur. Manche Abläufe bei Zwischenablage, Dateiübertragung und Sondertasten unterscheiden sich je nach mobilem Betriebssystem. Einen Computer vom Smartphone aus zu steuern, ist der zuverlässigste mobile Anwendungsfall.'
  - question: 'Sind die mobilen RustDesk-Apps quelloffen?'
    answer: 'Ja. Die mobilen Clients nutzen dieselbe quelloffene AGPL-Codebasis wie der Desktop-Client. Android-Builds stehen über die offiziellen RustDesk-GitHub-Releases und F-Droid als com.carriez.flutter_hbb zur Verfügung; die iOS-App zum Steuern gibt es im Apple App Store. Über Google Play wird RustDesk derzeit nicht vertrieben.'
  - question: 'Kann ich ein Android-Gerät dauerhaft für unbeaufsichtigten Zugriff einrichten?'
    answer: 'Nur teilweise. RustDesk kann seinen Aufnahmedienst über eine Vordergrund-Benachrichtigung am Leben halten und ihn nach einem Neustart automatisch wieder starten. Die erforderliche Bestätigung für die Bildschirmaufnahme, die blockierte Tastatur auf dem Sperrbildschirm und die manuelle Entsperrung nach einem Neustart machen echten unbeaufsichtigten Zugriff auf Android jedoch unzuverlässig. Betrachten Sie die Android-Steuerung als beaufsichtigten Support, nicht als Zugriff nach dem Prinzip „einrichten und vergessen“.'
metadata:
  description: 'RustDesk unter Android und iOS: Android fernsteuern, mit beiden mobilen Apps Ihre Desktops bedienen – und warum die App für iPhone und iPad nur steuert.'
  keywords: 'RustDesk Android iOS Fernsteuerung, Smartphone fernsteuern mit RustDesk, RustDesk Android Host, Android aus der Ferne steuern, RustDesk iOS, iPhone fernsteuern, RustDesk mobile App'
---

RustDesk kann ein Android-Gerät tatsächlich fernsteuern, sobald sein Besitzer die Berechtigungen für Bildschirmaufnahme und Eingabe erteilt, und beide mobilen Apps eignen sich hervorragend als _Steuergeräte_ für Ihre Computer. Die iOS-App dient nur zum Steuern: RustDesk implementiert unter iOS weder Hosting noch Bildschirmfreigabe, Sie können sich mit RustDesk also nicht auf ein iPhone oder iPad aufschalten. Dieser Leitfaden erklärt, was funktioniert, was nicht und warum – damit Sie mit den tatsächlichen Möglichkeiten planen können.

Beide mobilen Apps teilen sich die AGPL-lizenzierte Codebasis des RustDesk-Clients; auch RustDesk Server OSS (der kostenlose Community-Server) steht unter der AGPL, während Server Pro kommerzielle, proprietäre Serversoftware ist, die Sie selbst hosten. Android-Builds sind über die [offiziellen RustDesk-GitHub-Releases](https://github.com/rustdesk/rustdesk/releases) und [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) als `com.carriez.flutter_hbb` erhältlich, mit breiter Geräteabdeckung – arm64-, arm32- und x86_64-Builds sowie eine universelle APK; die iOS-App zum Steuern gibt es im App Store. RustDesk wird [derzeit nicht über Google Play vertrieben](/de/blog/rustdesk-und-remote-access-betrug-was-wir-tun): Die Android-App wurde als Reaktion auf Betrugsmissbrauch freiwillig aus dem Store genommen. Gleiche Codebasis, gleicher überprüfbarer Kern.

## Die Zusammenfassung in einer Tabelle

| Szenario                                                  | Unterstützt? | Hinweise                                                               |
| --------------------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| Windows-/macOS-/Linux-PC **von** Android aus steuern      | Ja           | Vollwertiges Steuergerät; Touchpad- oder Mausmodus                     |
| PC **von** iPhone/iPad aus steuern                        | Ja           | Vollwertiges Steuergerät; Touchpad- oder Mausmodus                     |
| **Ein Android-Gerät** steuern (als Host)                  | Ja           | Erfordert Bestätigung der Bildschirmaufnahme + Bedienungshilfen-Dienst |
| **Ein iOS-Gerät** mit RustDesk steuern                    | **Nein**     | RustDesk für iOS ist eine App zum Steuern                              |
| Einen iOS-Bildschirm mit RustDesk aus der Ferne betrachten | **Nein**    | Eingehende Bildschirmansicht ist in RustDesk nicht implementiert       |

Der Rest des Artikels liefert lediglich die Details zu jeder Zeile.

## Das Smartphone als Steuergerät nutzen (der einfache Teil)

Das ist der Anwendungsfall, der einfach „funktioniert“. Installieren Sie RustDesk auf Ihrem Android- oder iOS-Gerät, und es wird zu einem vollwertigen Steuergerät für jeden RustDesk-Host – Ihren Windows-Desktop, Ihren [Mac](https://rustdesk.com/docs/de/client/mac/), Ihren [Linux-Rechner](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop). Geben Sie die Ziel-ID und das Passwort ein, und Sie erhalten den entfernten Bildschirm mit einem Touchpad auf dem Display, einem Mausmodus und einer Software-Tastatur. Manche Abläufe bei Zwischenablage, Dateien und Sondertasten unterscheiden sich je nach mobilem Betriebssystem. Auf dem Smartphone ist dafür nichts Besonderes nötig, da Sie die Steuerung nur _senden_ und nicht selbst gesteuert werden.

Wenn Ihre Aufgabe lautet „einen Computer reparieren, egal wo ich gerade bin“, ist ein Smartphone mit RustDesk ein wirklich gutes Werkzeug.

## Ein Android-Gerät steuern (als Host)

RustDesk kann ein Android-Smartphone oder -Tablet in einen steuerbaren Host verwandeln. Bildschirmaufnahme und Ferneingabe nutzen getrennte Android-Dienste, und beide müssen eingerichtet werden.

**Bildschirmaufnahme.** RustDesk nutzt Androids `MediaProjection`-API, um den Bildschirminhalt zu erfassen. Wenn Sie in der App auf **Vermittlungsdienst starten** (Start Service) tippen, zeigt Android eine Abfrage an, die um Erlaubnis zur Bildschirmaufnahme bittet – dieser Dialog ist zwingend und lässt sich nicht stillschweigend umgehen. Für die Bildschirmfreigabe ist mindestens **Android 6** nötig; für die Erfassung des **internen Systemtons** des Smartphones mindestens **Android 10**. Solange diese Aufnahmeberechtigung nicht erteilt ist, kann keine eingehende Verbindung irgendetwas sehen.

**Ferneingabe.** Den Bildschirm zu sehen ist nicht dasselbe wie ihn zu steuern. Um Tipp-, Wisch- und Tastenereignisse einzuspielen, registriert RustDesk einen [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms) namens **RustDesk Input**, den Sie unter **Einstellungen → Bedienungshilfen** aktivieren. Er übersetzt entfernte Maus- und Gestenereignisse in Android-Gesten und kann Systemaktionen wie Zurück, Home und Übersicht (Recents) auslösen.

**Am Leben halten.** RustDesk hält eine Vordergrunddienst-Benachrichtigung und optional ein schwebendes Overlay-Fenster aufrecht, damit Android den Aufnahmeprozess nicht beendet, und kann den Dienst nach einem Neustart automatisch wieder starten.

Nun zu den Einschränkungen, denn Androids Sicherheitsmodell bringt echte mit sich:

- **Für den Start der Aufnahme ist eine Bestätigung nötig.** Jemand (oder eine vorherige Genehmigung) muss die Abfrage zur Bildschirmaufnahme akzeptieren.
- **Der Sperrbildschirm blockiert Eingaben.** Android erlaubt es einem Bedienungshilfen-Dienst nicht, auf dem gesicherten Sperrbildschirm zu tippen. Ist das Gerät gesperrt, können Sie den Entsperrcode in der Regel nicht aus der Ferne eingeben – eine Einschränkung, die auch [Anwender aus eigener Praxis dokumentiert haben](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html).
- **Nach einem Neustart ist eine manuelle Entsperrung nötig.** Nach einem Neustart muss das Gerät in der Regel vor Ort entsperrt werden, bevor die Steuerung wieder funktioniert.
- **Einschränkungen durch Hersteller.** Bei manchen Herstellern ist der Schalter für die Bedienungshilfe **RustDesk Input** bei per Sideloading installierten Apps ausgegraut, bis Sie „Eingeschränkte Einstellungen“ zulassen (App-Symbol lange gedrückt halten → App-Info → eingeschränkte Einstellungen zulassen). Aggressive Akku-Manager mancher Hersteller können den Hintergrunddienst zudem beenden.

Die praktische Erkenntnis: Die Android-Steuerung eignet sich hervorragend für **beaufsichtigten Support** – also für die Hilfe bei jemandem, der sein Smartphone gerade in der Hand hält –, während **unbeaufsichtigter Zugriff nach dem Prinzip „einrichten und vergessen“** eine Aufgabe ist, die der Desktop-Host am besten erledigt, da mobile Betriebssysteme dauerhaften Hintergrundzugriff einschränken. Wählen Sie die Plattform passend zur Aufgabe. (Für Desktops behandelt der [Leitfaden zur Einrichtung des unbeaufsichtigten Zugriffs](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung) die eigentliche Umsetzung.)

## iOS: RustDesk als Steuergerät, Bildschirmansicht und Eingabesteuerung

**RustDesk für iOS ist ein Steuergerät, kein Host.** Damit steuern Sie unterstützte Computer oder Android-Geräte. Eingehende iOS-Bildschirmansicht und Eingabesteuerung sind in RustDesk nicht implementiert, wie in der [Funktionsanfrage für einen iOS-Host](https://github.com/rustdesk/rustdesk/discussions/4839) diskutiert.

Andere Anbieter gehen einen anderen Weg. Apples Broadcast-APIs erlauben eine vom Benutzer gestartete Bildschirmfreigabe, und [AnyDesk dokumentiert eingehende Fernansicht unter iOS/iPadOS 12 und neuer](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos), ohne Ferneingabe. Wenn ein Techniker einen Bildschirm betrachtet, während dessen Besitzer tippt, ist das ein anderer Arbeitsablauf, als das Gerät zu steuern.

Apple bietet außerdem eine [zustimmungsbasierte Fernsteuerung in FaceTime](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios), abhängig von Geräte-, Regions- und Betriebssystemvoraussetzungen. Wenn Ihr Support-Ablauf die Ansicht eines iPhone-Bildschirms erfordert, verwenden Sie ein Tool, das genau diesen Ablauf implementiert; um Computer von einem iPhone oder iPad aus zu steuern, ist die RustDesk-App die richtige Wahl.

## Ein Hinweis zu Datenschutz und Self-Hosting

Da die mobilen Apps quelloffen sind und dasselbe Protokoll wie der Desktop-Client sprechen, können Sie sie statt auf das öffentliche Netzwerk auf Ihren eigenen [selbst gehosteten RustDesk-Server](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten) ausrichten – mobile Sitzungen werden dann über eine Infrastruktur vermittelt, die Sie selbst kontrollieren, ID inklusive. Für Remote-Support-Abläufe, die persönliche Geräte betreffen, wiegt dieser Aspekt der Datenhoheit besonders schwer.

Der Kompromiss ist wie immer derselbe: Sie betreiben und sichern diesen Server selbst – einschließlich Updates, Monitoring, Backups und Kapazitätsplanung –, und für viele Teams lohnt es sich sehr, die Sitzungsdaten auf eigenem Terrain zu behalten.

## Erste Schritte

Laden Sie Android-Builds von den [offiziellen GitHub-Releases](https://github.com/rustdesk/rustdesk/releases) herunter oder installieren Sie das Paket über [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/). RustDesk wird [derzeit nicht über Google Play vertrieben](/de/blog/rustdesk-und-remote-access-betrug-was-wir-tun); die iOS-App zum Steuern bleibt im Apple App Store erhältlich. Um ein Smartphone zu steuern, muss dieses ein Android-Gerät sein – akzeptieren Sie die Abfrage zur Bildschirmaufnahme und aktivieren Sie den Bedienungshilfen-Dienst RustDesk Input. Um Ihre Computer von einem Smartphone aus zu steuern, ist jede der beiden mobilen Apps sofort einsatzbereit. Die aktuellen Pläne finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing), und [sales@rustdesk.com](mailto:sales@rustdesk.com) hilft Ihnen gerne bei Server Pro weiter. Möchten Sie es sich zuerst ansehen? [RustDesk in Aktion erleben](https://www.youtube.com/@rustdesk).
