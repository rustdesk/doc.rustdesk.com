---
publishDate: 2026-07-06T08:31:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: 'RustDesk Connected Waiting for Image: Der komplette Leitfaden zur Fehlerbehebung'
excerpt: 'RustDesk meldet „Connected, waiting for image“? Prüfen Sie Display, Aufnahmeberechtigungen, Codecs, GPU-Treiber, Wayland-Builds und die Relay-Verbindung.'
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp
category: 'Fehlerbehebung'
tags: ['RustDesk', 'Fehlerbehebung']
author: 'RustDesk Team'
slug: 'rustdesk-connected-waiting-for-image-der-komplette-leitfaden-zur'
faq:
  - question: 'Warum zeigt RustDesk „Connected, waiting for image“ an?'
    answer: 'Die Sitzung ist verbunden, aber es kommt kein Bild an. Die am häufigsten gemeldete Ursache: Der Remote-Rechner hat nichts zu erfassen – kein Monitor, ein Display im Ruhezustand oder eine fehlende Berechtigung zur Bildschirmaufnahme. Schließen Sie einen Monitor, einen HDMI-Dummy-Stecker oder ein virtuelles Display an, wecken Sie den Bildschirm auf, erteilen Sie die Berechtigung und probieren Sie dann einen anderen Codec wie VP9.'
  - question: 'Wie behebe ich „waiting for image“ bei RustDesk auf einem Headless-Rechner?'
    answer: 'Geben Sie dem Headless-Rechner ein Display, das RustDesk erfassen kann. Schließen Sie einen Monitor oder einen günstigen HDMI-Dummy-Stecker an, der die GPU so arbeiten lässt, als sei ein Display verbunden, oder richten Sie ein virtuelles Display ein. Halten Sie das Display danach wach, prüfen Sie die Berechtigung zur Bildschirmaufnahme und wechseln Sie zu einem Software-Codec wie VP9, falls das Bild weiterhin ausbleibt.'
  - question: 'Behebt ein Wechsel des Video-Codecs den schwarzen Bildschirm?'
    answer: 'Oft ja. In der Symbolleiste der Remote-Sitzung oder in den Einstellungen können Sie den Codec wechseln – VP8, VP9, AV1 oder, sofern die Hardware es unterstützt, H.264/H.265. Ein Codec, den die Remote-Hardware nicht kodieren kann, zeigt ein leeres oder eingefrorenes Bild, und ein Wechsel zurück zu einem Software-Codec wie VP9 stellt das Bild meist wieder her.'
  - question: 'RustDesk zeigt das Bild auf einem PC, auf einem anderen aber nicht. Woran liegt das?'
    answer: 'Ein Unterschied zwischen zwei PCs deutet auf etwas Lokales auf dem betroffenen Rechner hin: ein schlafendes oder fehlendes Display, eine fehlende Berechtigung zur Bildschirmaufnahme unter macOS, ein veralteter GPU-Treiber, ein Konflikt bei der Hardwarebeschleunigung oder ein Codec, den die Hardware nicht verarbeiten kann. Wenden Sie die ursachenspezifischen Lösungen auf dem Rechner an, der nicht funktioniert, nicht auf dem, der funktioniert.'
  - question: 'Kann mein selbst gehosteter Server „waiting for image“ verursachen?'
    answer: 'Meist nicht. Wenn RustDesk „Connected, waiting for image“ anzeigt, hat der ID-Server seine Aufgabe bereits erledigt. Ein blockierter Relay-Port oder ein überlastetes Relay kann den Videostream aber trotzdem ins Stocken bringen. Erlauben Sie auf einem selbst gehosteten Server TCP 21115-21117 und UDP 21116, und TCP 21118-21119 nur, wenn Sie WebSocket-Clients nutzen.'

metadata:
  description: '„RustDesk connected, waiting for image“? Schwarzen Bildschirm beheben: Headless-Displays, Ruhezustand/Sperre, Codecs, GPU-Treiber, Wayland und Firewall-Ports.'
  keywords: 'RustDesk connected waiting for image, RustDesk schwarzer Bildschirm, RustDesk waiting for image beheben, RustDesk kein Bild, RustDesk HDMI Dummy Stecker, RustDesk Video-Codec, RustDesk Hardwarebeschleunigung'
---

Wenn RustDesk **„Connected, waiting for image“** anzeigt (im deutschen Client: „Verbindung hergestellt. Warte auf anderen Bildschirm …“) und danach nur ein schwarzer Bildschirm erscheint, hat der schwierige Teil bereits funktioniert: Beide Seiten haben sich gefunden, und die Sitzung steht. Was fehlt, ist das _Bild_. Meist hat der Remote-Rechner nichts, was sich erfassen ließe; seltener bringen ein Codec, ein GPU-Treiber oder der Relay-Pfad den Stream ins Stocken. Dieser Leitfaden geht jede Ursache durch, von der am häufigsten gemeldeten bis zu den Randfällen, jeweils mit einer konkreten Lösung.

## Kurz gesagt

Die Sitzung ist verbunden, aber es kommt kein Bild an. Die am häufigsten gemeldete Ursache ist ein Remote-Rechner, der nichts zu erfassen hat: **kein Monitor, ein Display im Ruhezustand oder eine fehlende Berechtigung zur Bildschirmaufnahme**. Geben Sie RustDesk ein echtes, aktives Display (einen Monitor, einen HDMI-Dummy-Stecker oder ein virtuelles Display) und die passende Berechtigung, und wechseln Sie dann zu einem anderen Codec wie VP9, falls das Bild weiterhin ausbleibt. Bleibt es danach immer noch schwarz, aktualisieren Sie den GPU-Treiber und prüfen Sie, ob die Relay-Ports erreichbar sind.

## Zuerst prüfen: Gibt es überhaupt etwas zu erfassen?

Die am häufigsten gemeldete Ursache ist ein **Headless-Rechner** – etwa ein Server, Mini-PC oder eine Workstation –, der ganz ohne angeschlossenen Monitor läuft oder dessen Display sich im Ruhezustand befindet. Ohne aktives Display gibt es oft keinen Framebuffer, den RustDesk erfassen könnte; die Verbindung steht, aber es gibt nichts zu senden. Dieses Muster taucht im RustDesk-Issue-Tracker immer wieder auf, unter anderem in [Berichten über schwarze Bildschirme speziell dann, wenn der Monitor des Zielgeräts ausgeschaltet ist](https://github.com/rustdesk/rustdesk/issues/9884) sowie im langjährigen [„Connected, waiting for image“-Thread](https://github.com/rustdesk/rustdesk/issues/222).

Es gibt zwei Wege, um etwas zum Erfassen bereitzustellen:

- **Einen Monitor anschließen** und sicherstellen, dass er eingeschaltet und aktiv ist.
- **Einen HDMI- (oder DisplayPort-)Dummy-Stecker verwenden.** Diese günstigen Adapter gaukeln der GPU vor, dass ein Display angeschlossen ist, sodass sie weiterhin einen Framebuffer rendert, den RustDesk abgreifen kann. Das ist die Standardlösung für Headless-Desktops und Heimserver.

Ist _tatsächlich_ ein Monitor angeschlossen, liegt der nächste Verdacht nahe: Er ist in den Ruhezustand gegangen.

## Lösung nach Ursache

| Ursache                              | Anzeichen                                      | Lösung                                                                                                                                                                     |
| ------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / kein Display              | Schwarzer Bildschirm bei Server oder Mini-PC   | Monitor anschließen oder HDMI-Dummy-Stecker verwenden                                                                                                                      |
| Bildschirm im Ruhezustand / gesperrt | Hat vorher funktioniert, nach Leerlauf schwarz | Bildschirm aufwecken; Display während der Zugriffszeiten wach halten; passwortgeschützte Sperre aktiviert lassen                                                           |
| Fehlende Berechtigung (macOS)        | Verbindet, aber dauerhaft schwarz              | Bildschirmaufnahme unter „Datenschutz & Sicherheit“ erlauben; Helper für den Anmeldebildschirm installieren                                                                |
| Codec-Konflikt                       | Leeres oder eingefrorenes Bild                 | Codec wechseln (VP8 / VP9 / AV1 / H.264 / H.265); auf Software-Codec ausweichen                                                                                            |
| Konflikt bei Hardwarebeschleunigung  | Schwarz bei bestimmten GPUs                    | Hardware-Codec in der Sitzungs-Symbolleiste oder den Einstellungen deaktivieren, oder Codec wechseln                                                                       |
| Veralteter GPU-Treiber               | Schwarz nach einem Treiber-/OS-Update          | GPU-Treiber aktualisieren (besonders bei NVIDIA)                                                                                                                           |
| Wayland-Sitzung (Linux)              | Keine Zustimmungsabfrage, leeres Bild          | PipeWire-/Portal-Abfrage bestätigen und prüfen, ob das Desktop-Portal installiert ist; eine X11-Sitzung funktioniert ebenfalls, sofern die Distribution sie noch anbietet |
| Netzwerk-/Relay-Stau                 | Bleibt bei „waiting for image“ hängen          | TCP 21115-21117 und UDP 21116 zulassen; TCP 21118-21119 für WebSocket-Clients ergänzen                                                                                     |

### Ruhezustand, Sperre und Bildschirmschoner

Hat es vorher funktioniert und wurde der Bildschirm schwarz, nachdem der Rechner eine Weile im Leerlauf war, ist das Display in den Ruhezustand gegangen.

- **Windows:** Stellen Sie den Energiesparplan so ein, dass Display und Rechner während der Stunden, in denen Sie Fernzugriff benötigen, aktiv bleiben. Ist RustDesk als Dienst installiert, können Sie sich auch am Sperrbildschirm verbinden – lassen Sie die passwortgeschützte Sperre also aktiviert.
- **macOS:** Verhindern Sie, dass das Display während der benötigten Zugriffszeiten in den Ruhezustand geht – stellen Sie dies unter **Systemeinstellungen → Displays** ein (oder unter Sperrbildschirm-/Energieeinstellungen), und betreiben Sie den Mac am Netzteil, da sich der Ruhezustand im Akkubetrieb anders verhält.
- **Android:** Der Bildschirm muss eingeschaltet sein, damit er freigegeben werden kann. Berühren Sie das Display also vor dem Verbinden, um es aufzuwecken. Eine Verbindung von iOS zu einem dösenden Android-Gerät mit ausgeschaltetem Bildschirm ist ein [bekannter „waiting for image“-Fall](https://github.com/rustdesk/rustdesk/issues/11479) – wecken Sie das Zielgerät zuerst auf.

### macOS-Berechtigungen

macOS lässt keine App den Bildschirm aufnehmen, ohne dass ausdrücklich zugestimmt wurde. Verbindet sich RustDesk auf einem Mac, bleibt der Bildschirm aber schwarz, öffnen Sie **Systemeinstellungen → Datenschutz & Sicherheit → Bildschirmaufnahme** und aktivieren Sie RustDesk, dann starten Sie die App neu. Ein schwarzer Bildschirm speziell _am Anmeldefenster_ bedeutet, dass der RustDesk-Dienst bzw. -Helper nicht so installiert ist, dass er schon vor der Benutzeranmeldung läuft – installieren Sie ihn für die Erfassung vor der Anmeldung.

### Video-Codec-Konflikt

RustDesk kann den Stream auf mehrere Arten kodieren, und die Standardeinstellung passt nicht immer zur Hardware des Remote-Geräts. Wechseln Sie in der Sitzungs-Symbolleiste (oder in den Einstellungen) den Codec – **VP8, VP9, AV1 oder, sofern die Hardware es unterstützt, H.264/H.265** – und prüfen Sie, ob das Bild erscheint. Erzeugt ein Hardware-Codec auf einer bestimmten GPU ein leeres Bild, ist der Wechsel zurück zu einem Software-Codec wie VP9 die zuverlässige Lösung.

### Hardwarebeschleunigung und GPU-Treiber

Manche GPUs – am häufigsten betrifft es NVIDIA-Konfigurationen – vertragen sich nicht mit den hardwarebeschleunigten Erfassungs- und Render-Pfaden von RustDesk. Zwei Stellschrauben helfen:

- **Hardware-Codec deaktivieren.** Schalten Sie in der Sitzungs-Symbolleiste oder in den Einstellungen den **Hardware-Codec** aus (englische Oberfläche: „Use hardware codec“), sodass die Kodierung auf einen Software-Pfad zurückfällt – das behebt den schwarzen Bildschirm bei vielen problematischen GPUs.
- **GPU-Treiber aktualisieren.** Ein schwarzer Bildschirm, der nach einem Treiber- oder Betriebssystem-Update auftritt, lässt sich häufig durch einen aktuellen Treiber beheben, besonders bei NVIDIA-Hardware.

### Linux und Wayland

Unter Linux erfassen die Standard-Builds von RustDesk Wayland-Desktops, seit 1.4.3 auch mit mehreren Monitoren, über **PipeWire und das `xdg-desktop-portal`** in einer angemeldeten Sitzung. Das Portal fragt, welches Display freigegeben werden soll, und ab Portal-Version 4 kann es sich die Auswahl merken. Erhalten Sie unter Wayland ein leeres Bild, bestätigen Sie die Freigabeabfrage des Portals und prüfen Sie, ob `xdg-desktop-portal` und PipeWire installiert sind und laufen. Auch die Anmeldung in einer X11-/Xorg-Sitzung umgeht den Portal-Pfad, sofern eine Distribution sie noch anbietet. Ein schwarzer Bildschirm am Anmeldebildschirm (Greeter) ist bei den Standard-Builds zu erwarten, da sie die angemeldete Sitzung erfassen; die separate [Wayland-Preview für unbeaufsichtigten Zugriff](/de/blog/unattended-remote-access-wayland-de) für **x86_64-Systeme auf Basis von Debian/Ubuntu** ergänzt unbeaufsichtigten Zugriff und Zugriff auf den Anmeldebildschirm nach einem Neustart.

### Netzwerk und Relay

Da die Meldung das Wort „connected“ enthält, ist die Sitzung in der Regel bereits aufgebaut – aber das _Video_ kann trotzdem stocken, wenn das Relay überlastet oder ein Relay-Port blockiert ist. Stellen Sie beim Standard-Serverpfad sicher, dass **TCP 21115-21117 und UDP 21116** durchgängig erreichbar sind. Öffnen Sie **TCP 21118-21119 nur, wenn Sie WebSocket-Clients verwenden**. Der öffentliche Demo-Server wird gemeinsam genutzt, und sein Durchsatz ist nicht garantiert. Wenn Sie täglich auf RustDesk angewiesen sind, verschafft Ihnen ein selbst gehostetes Relay die Kontrolle über Kapazität und Monitoring. Bricht die Sitzung selbst ab oder kommt sie gar nicht erst zustande, handelt es sich um ein anderes Problem – siehe die [FAQ zu RustDesk Server Pro](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/faq/).

## Alles aktuell halten

Alte Builds schleppen alte Erfassungsfehler mit sich. Aktualisieren Sie **sowohl** den steuernden als auch den gesteuerten Client auf die neueste Version, und wenn Sie selbst hosten, auch den Server. Viele Berichte über schwarze Bildschirme erledigen sich einfach, nachdem beide Seiten aktualisiert wurden.

## Der Open-Source-Vorteil

Wenn ein schwarzer Bildschirm sich allen Checklisten-Punkten widersetzt, bietet RustDesk etwas, das Closed-Source-Tools nicht haben: den tatsächlichen Erfassungscode unter einer AGPL-Lizenz. Sie (oder ein Dienstleister) können genau nachvollziehen, wie die Erfassung auf Ihrer Plattform funktioniert, das Problem reproduzieren und einen präzisen Bericht im öffentlichen Repository einreichen – statt in der Support-Warteschlange eines Anbieters zu warten.

## Weniger Variablen, wenn der Server Ihnen gehört

Betreiben Sie [Ihren eigenen Relay- und ID-Server](/de/blog/warum-sie-ihre-remote-desktop-software-selbst-hosten-sollten), dann fällt die gemeinsam genutzte öffentliche Infrastruktur aus der Gleichung – eine Unbekannte weniger, wenn Sie einem Erfassungsproblem auf der Spur sind, und volle Kontrolle über die Teile, die Sie anpassen können. Das ist ein stiller Bonus, zusätzlich zur Kontrolle über Ihre Daten.
