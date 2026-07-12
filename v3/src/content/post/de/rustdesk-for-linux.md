---
publishDate: 2026-07-09T08:32:00Z
lang: 'de'
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk für Linux: Der Open-Source-Remote-Desktop'
excerpt: 'RustDesk unter Linux installieren und betreiben: .deb, .rpm, Flatpak und AppImage, X11 vs. Wayland, Headless- und unbeaufsichtigter Zugriff sowie Self-Hosting des Servers.'
image: ~/assets/images/blog/rustdesk-for-linux-og.png
category: 'Anleitungen'
tags: ['RustDesk', 'Linux', 'Selbst-Hosting']
author: RustDesk Team
slug: 'rustdesk-fur-linux-der-open-source-remote-desktop'
faq:
  - question: 'Funktioniert RustDesk unter Wayland?'
    answer: 'Ja — RustDesk bietet eine der stärksten Wayland-Unterstützungen aller Remote-Desktop-Tools, einschließlich des in 1.4.3 hinzugefügten Multi-Monitor-Sharings. Unter Wayland erfasst RustDesk den Bildschirm über PipeWire und das XDG-Desktop-Portal, das einen Zustimmungsdialog zur Auswahl eines Displays anzeigt — in den meisten Fällen wird die Wahl gespeichert, sodass Sie nicht erneut gefragt werden — und arbeitet innerhalb der aktiven, angemeldeten Sitzung. Dieser Zustimmungsschritt ist ein Sicherheitskonzept von Wayland, das für jede Screensharing-App gilt. Für den Zugriff vor dem Login oder auf vollständig unbeaufsichtigten Rechnern nutzen Sie derzeit das Headless-Setup mit virtuellem Display (oder eine X11-Sitzung, sofern eine Distribution noch eine anbietet, da mehrere zu einem reinen Wayland-Betrieb wechseln); die vollständig unbeaufsichtigte Wayland-Erfassung befindet sich in aktiver Entwicklung (siehe github.com/rustdesk/rustdesk/pull/15420).'
  - question: 'Welches Paket sollte ich unter Linux installieren?'
    answer: 'Nutzen Sie das .deb-Paket unter Debian, Ubuntu und Linux Mint, das .rpm-Paket unter Fedora, RHEL und openSUSE, das Flatpak von Flathub für einen sandboxed, breit kompatiblen Build oder das portable AppImage als Einzeldatei-Fallback. Die .deb- und .rpm-Pakete registrieren und starten einen systemd-Dienst, sodass RustDesk Neustarts übersteht; Flatpak und AppImage tun dies standardmäßig nicht.'
  - question: 'Warum zeigt mein Headless-Linux-Rechner einen schwarzen Bildschirm?'
    answer: 'Ohne angeschlossenen Monitor legen weder X noch Wayland jemals einen Framebuffer an, sodass es für RustDesk nichts zu erfassen gibt und der Viewer einen schwarzen Bildschirm oder die Meldung „Warten auf Bild“ anzeigt. Schließen Sie einen Dummy-HDMI-/DisplayPort-Stecker an, richten Sie ein virtuelles Display wie xserver-xorg-video-dummy oder VKMS ein, oder aktivieren Sie den optionalen Headless-Modus von RustDesk unter Linux, damit automatisch ein virtuelles Display für Sie erstellt wird.'
  - question: 'Kann ich den RustDesk-Server unter Linux selbst hosten?'
    answer: 'Ja. Der RustDesk-Server (die Prozesse hbbs für ID/Rendezvous und hbbr für das Relay) ist für Linux gebaut, und das ist der Standardweg, ihn zu betreiben. Der kostenlose Open-Source-Community-Server läuft unbegrenzt kostenlos, und Server Pro ergänzt zusätzlich eine Web-Konsole, Gerätegruppen und einen Generator für individuelle Clients. Beide lassen sich auf einer gewöhnlichen Linux-VM oder Bare-Metal-Hardware installieren.'
metadata:
  description: 'RustDesk unter Linux, von A bis Z: Paketwahl für jede Distribution und jedes ARM-Board, Wayland- und X11-Erfassung, Headless-Setup und der Betrieb eines eigenen Servers.'
  keywords: 'RustDesk für Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux installieren'
---

Linux-Nutzer hatten nie eine große Auswahl an guten Remote-Desktop-Tools, und die wenigen, die es gibt, sind meist entweder Closed-Source-Kommerzprodukte oder in die Jahre gekommene VNC-Stacks. RustDesk positioniert sich anders: Es ist ein Open-Source-Remote-Desktop-Client unter AGPL-Lizenz, läuft nativ auf allen wichtigen Distributionen, und Sie können ihn mit einem selbst gehosteten Server verbinden. Diese Kombination – auditierbarer Code, nativer Linux-Client und selbst hostbare Infrastruktur – macht RustDesk zu einer der ersten Adressen, wenn jemand nach einem Open-Source-Remote-Desktop für Linux fragt.

Dieser Leitfaden zeigt, wie Sie RustDesk installieren, erklärt den einen Punkt, über den alle stolpern (X11 versus Wayland), wie Sie unbeaufsichtigten und Headless-Zugriff zum Laufen bringen, und wo der Server ins Spiel kommt.

## RustDesk unter Linux installieren

RustDesk liefert Pakete für jedes gängige Linux-Paketformat, sodass Sie so gut wie nie aus dem Quellcode bauen müssen. Laden Sie die aktuelle Version von der [RustDesk-Releases-Seite auf GitHub](https://github.com/rustdesk/rustdesk/releases) oder aus der [Linux-Installationsdokumentation](https://rustdesk.com/docs/en/client/linux/) herunter und wählen Sie das zu Ihrer Distribution passende Format.

| Format   | Am besten für                     | Startet automatisch einen Dienst? | Hinweise                                                                                                    |
| -------- | --------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint        | Ja (systemd)                      | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE     | Ja (systemd)                      | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Beliebige Distribution, sandboxed | Nein                              | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Beliebige Distribution, portabel  | Nein                              | Benötigt auf aktuellen Ubuntu-Versionen eventuell `libfuse2`; danach `chmod +x` und ausführen               |
| AUR      | Arch, Manjaro                     | Abhängig vom Paket                | Community-gepflegt (`rustdesk-bin`, `rustdesk-appimage`)                                                    |

Die Pakete `.deb` und `.rpm` sind die richtige Wahl, wenn RustDesk als Hintergrunddienst laufen soll, der Neustarts übersteht – beide registrieren und starten automatisch eine systemd-Unit. Das Flatpak (`com.rustdesk.RustDesk` auf [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) ist ein sandboxed Build, der sich gut für den Desktop-Einsatz eignet, aber standardmäßig keinen Systemdienst installiert. Für eine Distribution, die RustDesk nicht direkt paketiert, greifen Sie zuerst zum **Flatpak** – da es seine eigene Laufzeitumgebung mitbringt, ist es meist am breitesten kompatibel. Das AppImage ist eine portable Einzeldatei-Alternative, deren Kompatibilität in der Praxis aber eher durchwachsen ist (unter aktuellem Ubuntu wird beispielsweise gelegentlich `libfuse2` benötigt).

In der Praxis wird RustDesk unter Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch und NixOS eingesetzt, mit Builds für **x86_64, ARM64 (aarch64) und ARM32 (ARMv7)** – es läuft also ebenso auf ARM-Boards und Servern wie auf gewöhnlichen PCs.

## X11 vs. Wayland: der entscheidende Punkt

Das ist der wichtigste Punkt, den Sie über RustDesk unter Linux verstehen sollten, denn er entscheidet, ob die Fernsteuerung sofort „einfach funktioniert“ oder erst eine kleine Einstellung braucht.

**X11 (Xorg): der direkteste Weg zur Bildschirmerfassung, sofern Ihre Distribution ihn noch anbietet.** Unter X11 liest RustDesk den Framebuffer direkt aus und injiziert Eingaben ebenso direkt, sodass Bildschirmerfassung sowie Maus- und Tastatursteuerung so unmittelbar wie möglich ablaufen und Monitoränderungen dynamisch erkannt werden. Viele Display-Manager lassen Sie beim Login über ein Zahnrad-Menü weiterhin „Xorg“/„X11“ auswählen. Bedenken Sie aber, dass mehrere Distributionen zu einem reinen Wayland-Betrieb wechseln und die X11-Sitzung einstellen – behandeln Sie X11 also als praktische Option, wo sie zufällig verfügbar ist, nicht als Grundlage für Ihre Deployment-Planung.

**Wayland: RustDesk bietet wohl die stärkste Unterstützung aller Remote-Desktop-Tools.** RustDesk unterstützt Wayland seit Version 1.2.0 und baut diese Unterstützung stetig aus. Da Wayland-Compositors keinen direkten Framebuffer-Zugriff erlauben, erfasst RustDesk den Bildschirm über den Dienst `xdg-desktop-portal` und [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) und injiziert Eingaben über das Kernel-Modul `uinput`. Aus dem Design von Wayland selbst ergeben sich zwei Konsequenzen – sie gelten für jedes Wayland-Screensharing-Tool, nicht nur für RustDesk:

- **Zustimmung pro Verbindung.** Das Portal zeigt einen Dialog, in dem Sie auswählen, welcher Bildschirm freigegeben wird. Das ist eine bewusste Sicherheitsfunktion von Wayland, kein Fehler von RustDesk – eine Hintergrundanwendung kann nicht klammheimlich die Bildschirmaufnahme starten. Portal v4 und neuer unterstützen ein „Restore Token“, sodass Sie nicht jedes Mal erneut gefragt werden, aber die erste Freigabe erfordert einen Klick auf dem Bildschirm.
- **Nur aktive Sitzung.** Die Wayland-Erfassung ist an die angemeldete grafische Sitzung gebunden. Die Erfassung des Wayland-Login-Greeters wird noch nicht unterstützt – sie befindet sich in aktiver Entwicklung ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Für den Zugriff vor dem Login nutzen Sie derzeit die weiter unten beschriebene Headless-/virtuelle-Display-Konfiguration oder eine X11-Sitzung auf Distributionen, die noch eine anbieten.

Die Wayland-Unterstützung wird laufend verbessert – RustDesk 1.4.3 (Oktober 2025) hat beispielsweise [Multi-Monitor-Sharing für Wayland hinzugefügt](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Wenn Sie sich jedoch verbinden und auf einem Wayland-System einen schwarzen Bildschirm sehen, liegt das fast immer daran, dass der Portal-/PipeWire-Pfad nicht erfüllt ist. Unser ausführlicher Beitrag [RustDesk verbunden, aber wartet auf Bild](/de/blog/rustdesk-connected-waiting-for-image-der-komplette-leitfaden-zur) geht speziell auf den Fall des schwarzen Bildschirms unter Wayland ein.

## Unbeaufsichtigter Zugriff unter Linux

Unbeaufsichtigter Zugriff bedeutet, sich mit einem Rechner zu verbinden, vor dem niemand sitzt – das klassische Remote-Support-Szenario. Unter Linux sieht das Rezept so aus:

1. Installieren Sie über `.deb` oder `.rpm`, damit der systemd-Dienst registriert wird, oder klicken Sie in der App auf **Dienst aktivieren**.
2. Legen Sie in RustDesk unter den Verbindungseinstellungen ein starkes **dauerhaftes Passwort** fest (und aktivieren Sie idealerweise die Zwei-Faktor-Authentifizierung).
3. Für den Zugriff vor oder unabhängig von Benutzeranmeldungen nutzen Sie die weiter unten beschriebene Headless-Konfiguration mit virtuellem Display (die oben erwähnte Lücke beim Wayland-Greeter gilt auch hier).

Eine Wayland-Realität, die Sie einplanen sollten: Das im Wayland-Abschnitt beschriebene zustimmungsbasierte Portal macht eine vollständig unbeaufsichtigte Erfassung schwieriger als unter X11 – zumindest bis die in Entwicklung befindliche Unterstützung für unbeaufsichtigten Zugriff verfügbar ist. Planen Sie deshalb für Rechner ohne Aufsicht mit dem Headless-Setup mit virtuellem Display.

## Headless-Linux: Server ohne Monitor

Ein sehr häufiger Linux-Anwendungsfall ist ein Rechner ganz ohne angeschlossenes Display – ein Heimserver, eine Labormaschine, eine VM. Hier liegt das Problem nicht bei RustDesk, sondern beim Grafik-Stack: Ohne angeschlossenen Monitor legen weder X noch Wayland jemals einen Framebuffer an, sodass es buchstäblich kein Bild zu erfassen gibt und Sie einen schwarzen Bildschirm sehen.

Drei Möglichkeiten, ihm etwas zum Rendern zu geben:

- **Ein Dummy-Stecker** – ein günstiger physischer HDMI-/DisplayPort-„Headless“-Dongle, der die GPU glauben lässt, es sei ein Monitor angeschlossen.
- **Ein virtueller Display-Treiber** – `xserver-xorg-video-dummy` unter X11 oder eine Option auf Kernel-Ebene wie VKMS.
- **Der optionale Headless-Modus von RustDesk** – aktivieren Sie ihn mit `sudo rustdesk --option allow-linux-headless Y`. Laut dem [Wiki zur Headless-Linux-Unterstützung](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) ist er standardmäßig deaktiviert, wird vor allem unter Ubuntu mit GNOME getestet und setzt Pakete wie `xserver-xorg-video-dummy` und `lightdm` voraus. Die ID des Rechners können Sie mit `sudo rustdesk --get-id` abrufen und ein Passwort mit `sudo rustdesk --password <password>` festlegen.

Der Headless-Modus hat noch Ecken und Kanten – betrachten Sie ihn eher als „funktioniert, mit Sorgfalt“ denn als schlüsselfertige Lösung.

## Den RustDesk-Server unter Linux selbst hosten

Alles bisher Beschriebene betrifft den _Client_. Die andere Hälfte der Linux-Geschichte von RustDesk ist, dass der **Server** – der `hbbs`-ID-/Rendezvous-Dienst und das `hbbr`-Relay – eine Linux-native Anwendung ist und Linux sein natürliches Zuhause ist. Dadurch können Sie Session-Vermittlung und weitergeleiteten Datenverkehr auf Ihrer eigenen Infrastruktur behalten, statt sie über die Cloud eines Anbieters zu leiten.

Sie haben zwei Optionen. Der kostenlose, quelloffene **Community-Server** läuft unbegrenzt kostenlos und deckt die grundlegende Verbindungs- und Relay-Funktion ab. **RustDesk Server Pro** ergänzt das um eine selbst gehostete Web-Konsole, Gerätegruppen, ein gemeinsames Adressbuch, einen Generator für individuell gebrandete Clients sowie [LDAP/Active Directory und OIDC-SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/). Auch Docker ist keine Pflicht – siehe [Server Pro ohne Docker betreiben](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/) für eine Installation auf einer gewöhnlichen VM oder Bare-Metal-Hardware. Wenn Sie die Hardware für eine große Flotte dimensionieren, planen Sie die Kapazität anhand Ihres tatsächlichen Gleichzeitigkeits- und Relay-Profils, bevor Sie sich festlegen.

Ein Hinweis zum Self-Hosting: Sowohl der kostenlose Community-Server als auch Server Pro liegen in Ihrer Verantwortung – Betrieb, Patches und Absicherung übernehmen Sie selbst. Die Hardware-Anforderungen sind gering, und ist der Server einmal eingerichtet, ist der laufende Aufwand überschaubar – und bei Fragen hilft der RustDesk-Support. Genau diese Eigenverantwortung ist der springende Punkt. (Die Lizenz von Server Pro benötigt außerdem eine ausgehende Verbindung zu rustdesk.com, um aktiviert zu werden und lizenziert zu bleiben.)

## Erste Schritte

Installieren Sie das passende Paket für Ihre Distribution, legen Sie ein dauerhaftes Passwort für den unbeaufsichtigten Zugriff fest, und richten Sie – falls Datenhoheit Ihr Beweggrund ist – den kostenlosen Community-Server ein. Aktuelle Angaben zu den Plänen finden Sie verbindlich unter [rustdesk.com/pricing](https://rustdesk.com/pricing), und [sales@rustdesk.com](mailto:sales@rustdesk.com) berät Sie gerne zu Server Pro. Möchten Sie es sich erst in Aktion ansehen? [RustDesk in Aktion erleben](https://www.youtube.com/@rustdesk).
