---
publishDate: 2026-07-06T08:31:00Z
lang: 'de'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: 'RustDesk Connected Waiting for Image: Der komplette Leitfaden zur Fehlerbehebung'
excerpt: '„Connected, waiting for image" bedeutet, dass der Bildschirm des Remote-Rechners nicht erfasst wird. Hier finden Sie jede Ursache – Headless-Rechner, Ruhezustand, Codecs, Treiber – und die passende Lösung.'
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.png
category: 'Fehlerbehebung'
tags: ['RustDesk', 'Fehlerbehebung']
author: 'RustDesk Team'
slug: 'rustdesk-connected-waiting-for-image-der-komplette-leitfaden-zur'
faq:
  - question: 'Warum zeigt RustDesk „Connected, waiting for image" an?'
    answer: 'Die Sitzung wurde erfolgreich aufgebaut, aber der Remote-Rechner erzeugt kein Bildschirmbild, das gesendet werden könnte. Der häufigste Grund ist ein fehlendes aktives Display zum Erfassen – etwa ein Headless-Server ohne Monitor, ein Bildschirm im Ruhezustand oder gesperrt, oder ein Display, das das Betriebssystem RustDesk nicht aufzeichnen lässt. Beheben Sie die Erfassungsquelle, und das Bild erscheint.'
  - question: 'Wie behebe ich „waiting for image" bei RustDesk auf einem Headless-Rechner?'
    answer: 'Ein Rechner ohne Monitor hat keinen Framebuffer, den man erfassen könnte, sodass RustDesk nichts zu senden hat. Schließen Sie einen echten Monitor an, stecken Sie einen günstigen HDMI-Dummy-Stecker ein, der die GPU glauben lässt, ein Display sei angeschlossen, oder nutzen Sie unter Linux das dokumentierte Headless-Setup (github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Das Aufwecken oder dauerhafte Wachhalten des Displays löst die meisten Fälle.'
  - question: 'Behebt ein Wechsel des Video-Codecs den schwarzen Bildschirm?'
    answer: 'Oft ja. In der Symbolleiste der Remote-Sitzung oder in den Einstellungen können Sie den Codec wechseln – VP8, VP9, AV1 oder, sofern die Hardware es unterstützt, H.264/H.265. Ein Codec, den die Remote-Hardware nicht kodieren kann, zeigt ein leeres oder eingefrorenes Bild, und ein Wechsel zurück zu einem Software-Codec wie VP9 stellt das Bild meist wieder her.'
  - question: 'RustDesk zeigt das Bild auf einem PC, auf einem anderen aber nicht. Woran liegt das?'
    answer: 'Das deutet auf etwas Lokales auf dem betroffenen Rechner hin – ein schlafendes oder fehlendes Display, eine fehlende Bildschirmaufnahme-Berechtigung unter macOS, ein veralteter GPU-Treiber, ein Konflikt bei der Hardwarebeschleunigung oder ein Codec, den die Hardware nicht verarbeiten kann. Gehen Sie die ursachenspezifischen Lösungen in diesem Leitfaden auf dem Rechner durch, der nicht funktioniert – nicht auf dem, der funktioniert.'
  - question: 'Kann mein selbst gehosteter Server „waiting for image" verursachen?'
    answer: 'In der Regel ist die Sitzung bereits verbunden, wenn diese Meldung erscheint – der Server erfüllt also seine Aufgabe. Ein überlastetes öffentliches Relay oder ein blockierter Relay-Port kann den Videostream jedoch ins Stocken bringen. Erlauben Sie beim Standard-Serverpfad TCP 21115-21117 und UDP 21116; öffnen Sie TCP 21118-21119 nur, wenn Sie WebSocket-Clients verwenden. Erwägen Sie, das Relay selbst zu hosten, um einen gleichmäßigeren Durchsatz zu erzielen.'

metadata:
  description: '„RustDesk connected, waiting for image"? So beheben Sie den schwarzen Bildschirm: Headless-Displays, Ruhezustand/Sperre, Video-Codecs, GPU-Treiber, Wayland und Firewall-Ports.'
  keywords: 'RustDesk connected waiting for image, RustDesk schwarzer Bildschirm, RustDesk waiting for image beheben, RustDesk kein Bild, RustDesk HDMI Dummy Stecker, RustDesk Video-Codec, RustDesk Hardwarebeschleunigung'
---

Wenn RustDesk **„Connected, waiting for image“** anzeigt und danach nur ein schwarzer Bildschirm erscheint, ist die gute Nachricht: Der schwierige Teil ist bereits erledigt – beide Seiten haben sich gefunden, und die Sitzung ist aufgebaut. Was fehlt, ist das _Bild_. Auf dem Remote-Rechner wird einfach kein Bildschirminhalt erzeugt, der gesendet werden könnte. Dieser Leitfaden geht jede bekannte Ursache durch, von der mit Abstand häufigsten bis zu den Randfällen, jeweils mit einer konkreten Lösung.

## Kurz gesagt

Die Sitzung ist verbunden, aber es gibt keinen Framebuffer, den RustDesk erfassen könnte. Bei einem Remote-Rechner **ohne Monitor, mit einem Bildschirm im Ruhezustand oder gesperrt, oder einem Display, das das Betriebssystem RustDesk nicht aufzeichnen lässt**, hat der Videostream schlicht nichts zu kodieren. Geben Sie RustDesk ein echtes, aktives Display zum Erfassen – einen Monitor, einen HDMI-Dummy-Stecker, die richtige Berechtigung oder einen kompatiblen Codec – und das Bild erscheint.

## Zuerst prüfen: Gibt es überhaupt etwas zu erfassen?

Mit Abstand die am häufigsten gemeldete Ursache ist ein **Headless-Rechner** – etwa ein Server, Mini-PC oder eine Workstation –, der ganz ohne angeschlossenen Monitor läuft oder dessen Display sich im Ruhezustand befindet. Ohne aktives Display erzeugt die GPU keinen Framebuffer, sodass RustDesk zwar eine Verbindung herstellt, aber nichts zu senden hat. Dieses Muster taucht im RustDesk-Issue-Tracker immer wieder auf, unter anderem in [Berichten über schwarze Bildschirme speziell dann, wenn der Monitor des Zielgeräts ausgeschaltet ist](https://github.com/rustdesk/rustdesk/issues/9884) sowie im langjährigen [„Connected, waiting for image“-Thread](https://github.com/rustdesk/rustdesk/issues/222).

Es gibt drei Wege, um etwas zum Erfassen bereitzustellen:

- **Einen Monitor anschließen** und sicherstellen, dass er eingeschaltet und aktiv ist.
- **Einen HDMI- (oder DisplayPort-)Dummy-Stecker verwenden.** Diese günstigen Adapter gaukeln der GPU vor, dass ein Display angeschlossen ist, sodass sie weiterhin einen Framebuffer rendert, den RustDesk abgreifen kann. Das ist die Standardlösung für Headless-Desktops und Heimserver.
- **Unter Linux den dokumentierten Headless-Weg nutzen.** RustDesk unterstützt Headless-Setups unter Linux, wobei sich die Konfiguration von einer normalen Desktop-Sitzung unterscheidet – siehe das [Wiki „Headless Linux Support“](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support).

Ist _tatsächlich_ ein Monitor angeschlossen, liegt der nächste Verdacht nahe: Er ist in den Ruhezustand gegangen.

## Lösung nach Ursache

| Ursache                              | Anzeichen                                      | Lösung                                                                                                                                                                     |
| ------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / kein Display              | Schwarzer Bildschirm bei Server oder Mini-PC   | Monitor anschließen, HDMI-Dummy-Stecker verwenden oder den Linux-Headless-Weg nutzen                                                                                       |
| Bildschirm im Ruhezustand / gesperrt | Hat vorher funktioniert, nach Leerlauf schwarz | Bildschirm aufwecken; Ruhezustand/Bildschirmschoner deaktivieren; unter macOS den Ruhezustand des Displays in den Einstellungen ausschalten                                |
| Fehlende Berechtigung (macOS)        | Verbindet, aber dauerhaft schwarz              | Bildschirmaufnahme unter „Datenschutz & Sicherheit“ erlauben; Helper für den Anmeldebildschirm installieren                                                                |
| Codec-Konflikt                       | Leeres oder eingefrorenes Bild                 | Codec wechseln (VP8 / VP9 / AV1 / H.264 / H.265); auf Software-Codec ausweichen                                                                                            |
| Konflikt bei Hardwarebeschleunigung  | Schwarz bei bestimmten GPUs                    | Hardware-Codec in der Sitzungs-Symbolleiste oder den Einstellungen deaktivieren, oder Codec wechseln                                                                       |
| Veralteter GPU-Treiber               | Schwarz nach einem Treiber-/OS-Update          | GPU-Treiber aktualisieren (besonders bei NVIDIA)                                                                                                                           |
| Wayland-Sitzung (Linux)              | Keine Zustimmungsabfrage, leeres Bild          | PipeWire-/Portal-Anfrage bestätigen und prüfen, ob das Desktop-Portal installiert ist; eine X11-Sitzung funktioniert ebenfalls, sofern eine Distribution sie noch anbietet |
| Netzwerk-/Relay-Stau                 | Bleibt bei „waiting for image“ hängen          | TCP 21115-21117 und UDP 21116 zulassen; TCP 21118-21119 für WebSocket-Clients ergänzen                                                                                     |

### Ruhezustand, Sperre und Bildschirmschoner

Hat es vorher funktioniert und wurde der Bildschirm schwarz, nachdem der Rechner eine Weile im Leerlauf war, ist das Display in den Ruhezustand gegangen.

- **Windows:** Stellen Sie den Energiesparplan so ein, dass Display und Rechner während der Stunden, in denen Sie Remote-Zugriff benötigen, nie in den Ruhezustand wechseln, und deaktivieren Sie den Bildschirmschoner (oder konfigurieren Sie ihn so, dass während der Sitzung kein Passwort erforderlich ist).
- **macOS:** Verhindern Sie, dass das Display während der benötigten Zugriffszeiten in den Ruhezustand geht – stellen Sie dies unter **Systemeinstellungen → Displays** ein (oder unter Sperrbildschirm-/Energieeinstellungen), und betreiben Sie den Mac am Netzteil, da sich der Ruhezustand im Akkubetrieb anders verhält.
- **Android:** Der Bildschirm muss eingeschaltet sein, damit er freigegeben werden kann. Berühren Sie das Display also vor dem Verbinden, um es aufzuwecken. Eine Verbindung von iOS zu einem dösenden Android-Gerät mit ausgeschaltetem Bildschirm ist ein [bekannter „waiting for image“-Fall](https://github.com/rustdesk/rustdesk/issues/11479) – wecken Sie das Zielgerät zuerst auf.

### macOS-Berechtigungen

macOS lässt keine App den Bildschirm aufnehmen, ohne dass ausdrücklich zugestimmt wurde. Verbindet sich RustDesk auf einem Mac, bleibt der Bildschirm aber schwarz, öffnen Sie **Systemeinstellungen → Datenschutz & Sicherheit → Bildschirmaufnahme** und aktivieren Sie RustDesk, dann starten Sie die App neu. Ein schwarzer Bildschirm speziell _am Anmeldefenster_ bedeutet, dass der RustDesk-Dienst bzw. -Helper nicht so installiert ist, dass er schon vor der Benutzeranmeldung läuft – installieren Sie ihn für die Erfassung vor der Anmeldung.

### Video-Codec-Konflikt

RustDesk kann den Stream auf mehrere Arten kodieren, und die Standardeinstellung passt nicht immer zur Hardware des Remote-Geräts. Wechseln Sie in der Sitzungs-Symbolleiste (oder in den Einstellungen) den Codec – **VP8, VP9, AV1 oder, sofern die Hardware es unterstützt, H.264/H.265** – und prüfen Sie, ob das Bild erscheint. Erzeugt ein Hardware-Codec auf einer bestimmten GPU ein leeres Bild, ist der Wechsel zurück zu einem Software-Codec wie VP9 meist die zuverlässige Lösung.

### Hardwarebeschleunigung und GPU-Treiber

Manche GPUs – am häufigsten betrifft es NVIDIA-Konfigurationen – vertragen sich nicht mit den hardwarebeschleunigten Erfassungs- und Render-Pfaden von RustDesk. Zwei Stellschrauben helfen dabei:

- **Hardware-Codec deaktivieren.** Schalten Sie in der Sitzungs-Symbolleiste (oder in den Einstellungen) **Hardware-Codec verwenden** aus, sodass die Kodierung auf einen Software-Pfad zurückfällt – das behebt den schwarzen Bildschirm bei vielen problematischen GPUs.
- **GPU-Treiber aktualisieren.** Ein schwarzer Bildschirm, der nach einem Treiber- oder Betriebssystem-Update auftritt, lässt sich häufig durch die Installation eines aktuellen Treibers beheben, besonders bei NVIDIA-Hardware.

### Linux und Wayland

Unter Linux **läuft die Wayland-Bildschirmerfassung über PipeWire und das `xdg-desktop-portal`**: Beim ersten Mal erscheint eine Zustimmungsabfrage zur Auswahl eines Displays – in den meisten Fällen wird die Wahl gespeichert, sodass die Abfrage danach nicht mehr erscheint – und funktioniert innerhalb einer aktiven Anmeldesitzung. Das ist ein Sicherheitskonzept von Wayland, das für sich genommen weder den Greeter (Anmeldebildschirm) noch ein System ganz ohne Display abdeckt – die unbeaufsichtigte Erfassung unter Wayland befindet sich jedoch in aktiver Entwicklung ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Erhalten Sie unter Wayland ein leeres Bild, besteht die Lösung meist darin, die Bildschirmfreigabe-Abfrage des Portals zu bestätigen und zu prüfen, ob `xdg-desktop-portal` und PipeWire installiert sind und laufen; auf einem Rechner ganz ohne Display nutzen Sie die dokumentierte [Headless-Konfiguration](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Die Anmeldung in einer X11-/Xorg-Sitzung umgeht den Portal-Pfad ebenfalls, sofern eine Distribution diese Option noch anbietet – da jedoch immer mehr Distributionen ausschließlich auf Wayland setzen, ist die Behebung des Portal-/PipeWire-Pfads der zukunftssicherere Ansatz.

### Netzwerk und Relay

Da die Meldung das Wort „connected“ enthält, ist die Sitzung in der Regel bereits aufgebaut – aber das _Video_ kann trotzdem stocken, wenn das Relay überlastet oder ein Relay-Port blockiert ist. Stellen Sie beim Standard-Serverpfad sicher, dass **TCP 21115-21117 und UDP 21116** durchgängig erreichbar sind. Öffnen Sie **TCP 21118-21119 nur, wenn Sie WebSocket-Clients verwenden**. Der öffentliche Demo-Server wird gemeinsam genutzt, und sein Durchsatz ist nicht garantiert. Wenn Sie RustDesk täglich nutzen, sorgt ein selbst gehostetes Relay für deutlich gleichmäßigeres Verhalten. Bricht die Sitzung selbst ab oder kommt sie gar nicht erst zustande, handelt es sich um ein anderes Problem – siehe die [RustDesk Server Pro FAQ](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/).

## Alles aktuell halten

Alte Builds schleppen alte Erfassungsfehler mit sich. Aktualisieren Sie **sowohl** den steuernden als auch den gesteuerten Client auf die neueste Version, und aktualisieren Sie bei einer Selbst-Hosting-Lösung auch den Server. Viele Berichte über schwarze Bildschirme verschwinden einfach, nachdem beide Seiten aktualisiert wurden.

## Der Open-Source-Vorteil

Wenn ein schwarzer Bildschirm sich allen Checklisten-Punkten widersetzt, bietet RustDesk etwas, das Closed-Source-Tools nicht haben: den tatsächlichen Erfassungscode unter einer AGPL-Lizenz. Sie (oder ein Dienstleister) können genau nachvollziehen, wie die Erfassung auf Ihrer Plattform funktioniert, das Problem reproduzieren und einen präzisen Bericht im öffentlichen Repository einreichen – statt in der Support-Warteschlange eines Anbieters zu warten.

## Weniger Variablen, wenn der Server Ihnen gehört

Betreiben Sie [Ihren eigenen Relay- und ID-Server](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten), dann fällt die gemeinsam genutzte öffentliche Infrastruktur aus der Gleichung – eine Unbekannte weniger, wenn Sie einem Erfassungsproblem auf der Spur sind, und volle Kontrolle über alle Stellschrauben, die Sie anpassen können. Das ist ein stiller Bonus obendrauf, zusätzlich dazu, dass Ihre Daten bei Ihnen bleiben.
