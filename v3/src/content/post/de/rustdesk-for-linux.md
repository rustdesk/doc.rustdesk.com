---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk für Linux: Der Open-Source-Remote-Desktop'
excerpt: 'RustDesk unter Linux installieren und betreiben: .deb, .rpm, Flatpak und AppImage, X11 vs. Wayland, Headless- und unbeaufsichtigter Zugriff sowie Self-Hosting des Servers.'
image: ~/assets/images/blog/rustdesk-for-linux-og.webp
category: 'Anleitungen'
tags: ['RustDesk', 'Linux', 'Selbst-Hosting']
author: RustDesk Team
slug: 'rustdesk-fur-linux-der-open-source-remote-desktop'
faq:
  - question: 'Funktioniert RustDesk unter Wayland?'
    answer: 'Ja. Die Standard-Builds von RustDesk erfassen Wayland-Desktops in einer angemeldeten Sitzung über PipeWire und xdg-desktop-portal, seit Version 1.4.3 auch mit mehreren Monitoren. Das Portal fragt nach der Zustimmung zur Bildschirmfreigabe; ab Portal-Version 4 kann es die Auswahl speichern. Ein separater Preview-Build ergänzt unbeaufsichtigten Zugriff und Zugriff auf den Anmeldebildschirm nach einem Neustart. Die Preview richtet sich an x86_64-Systeme auf Basis von Debian/Ubuntu.'
  - question: 'Welches Paket sollte ich unter Linux installieren?'
    answer: 'Nutzen Sie das .deb-Paket unter Debian, Ubuntu und Linux Mint, das .rpm-Paket unter Fedora, RHEL und openSUSE, das Flatpak von Flathub für einen breit kompatiblen Build in der Sandbox oder das portable AppImage als Einzeldatei-Notlösung. Die .deb- und .rpm-Pakete registrieren und starten einen systemd-Dienst, sodass RustDesk Neustarts übersteht; Flatpak und AppImage tun das standardmäßig nicht.'
  - question: 'Warum zeigt mein Headless-Linux-Rechner einen schwarzen Bildschirm?'
    answer: 'Meist, weil der Headless-Linux-Rechner kein aktives Display hat, das RustDesk erfassen könnte. Ohne Monitor stellt der Grafikstack oft keine Ausgabe bereit, sodass die Sitzung zwar zustande kommt, aber einen schwarzen Bildschirm oder die Meldung zum Warten auf das Bild zeigt. Stecken Sie einen HDMI- oder DisplayPort-Dummy-Stecker an oder richten Sie ein virtuelles Display wie xserver-xorg-video-dummy unter X11 ein, und verbinden Sie sich dann erneut.'
  - question: 'Kann ich den RustDesk-Server unter Linux selbst hosten?'
    answer: 'Ja. Der RustDesk-Server (die Prozesse hbbs für ID/Rendezvous und hbbr für das Relay) ist für Linux gebaut, und Linux ist der Standardweg, ihn zu betreiben. RustDesk Server OSS (der kostenlose Community-Server) hat keine Lizenzgebühr und kein Ablaufdatum, und Server Pro ergänzt darauf eine Web-Konsole, Gerätegruppen und einen Generator für individuelle Clients. Beide lassen sich auf einer gewöhnlichen Linux-VM oder Bare-Metal-Hardware installieren.'
metadata:
  description: 'RustDesk unter Linux von A bis Z: Pakete für jede Distribution und jedes ARM-Board, Wayland- und X11-Erfassung, Headless-Setup und der eigene Server.'
  keywords: 'RustDesk für Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux installieren'
---

RustDesk ist ein Open-Source-Remote-Desktop für Linux. Der Client und RustDesk Server OSS (der kostenlose Community-Server) stehen unter der AGPL, native Pakete decken die wichtigen Distributionen ab, und Sie können jeden Client auf ID-/Rendezvous- und Relay-Dienste ausrichten, die Sie selbst hosten. Server Pro ist eine kommerzielle, proprietäre Serversoftware, die Sie selbst hosten, und ergänzt eine Web-Konsole und eine zentrale Verwaltung. Prüfbarer Code, ein nativer Linux-Client und selbst hostbare Infrastruktur – deshalb ist RustDesk eine häufige Antwort, wenn jemand nach einem Open-Source-Remote-Desktop für Linux fragt.

Dieser Leitfaden zeigt, wie Sie RustDesk installieren, erklärt den einen Punkt, über den alle stolpern (X11 versus Wayland), wie Sie unbeaufsichtigten und Headless-Zugriff zum Laufen bringen und wo der Server ins Spiel kommt.

## RustDesk unter Linux installieren

RustDesk liefert Pakete für jedes gängige Linux-Paketformat, sodass Sie so gut wie nie aus dem Quellcode bauen müssen. Laden Sie die aktuelle Version von der [RustDesk-Releases-Seite auf GitHub](https://github.com/rustdesk/rustdesk/releases) oder über die [Linux-Installationsdokumentation](https://rustdesk.com/docs/de/client/linux/) herunter und wählen Sie das zu Ihrer Distribution passende Format.

| Format   | Am besten für                         | Startet automatisch einen Dienst? | Hinweise                                                                                                    |
| -------- | ------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint            | Ja (systemd)                      | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE         | Ja (systemd)                      | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Beliebige Distribution, in der Sandbox | Nein                              | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Beliebige Distribution, portabel      | Nein                              | Benötigt auf aktuellen Ubuntu-Versionen eventuell `libfuse2`; danach `chmod +x` und ausführen               |
| AUR      | Arch, Manjaro                         | Abhängig vom Paket                | Von der Community gepflegt (`rustdesk-bin`, `rustdesk-appimage`)                                            |

Die Pakete `.deb` und `.rpm` sind die richtige Wahl, wenn RustDesk als Hintergrunddienst laufen soll, der Neustarts übersteht – beide registrieren und starten automatisch eine systemd-Unit. Das Flatpak (`com.rustdesk.RustDesk` auf [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) ist ein Build in der Sandbox, der sich gut für den Desktop-Einsatz eignet, aber standardmäßig keinen Systemdienst installiert. Für eine Distribution, die RustDesk nicht direkt paketiert, greifen Sie zuerst zum **Flatpak** – da es seine eigene Laufzeitumgebung mitbringt, ist es meist am breitesten kompatibel. Das AppImage ist eine portable Einzeldatei-Alternative, deren Kompatibilität in der Praxis aber eher durchwachsen ist (unter aktuellem Ubuntu wird beispielsweise gelegentlich `libfuse2` benötigt).

In der Praxis wird RustDesk unter Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch und NixOS eingesetzt, mit Builds für **x86_64, ARM64 (aarch64) und ARM32 (ARMv7)** – es läuft also ebenso auf ARM-Boards und Servern wie auf gewöhnlichen PCs.

## X11 vs. Wayland: der entscheidende Punkt

Das ist der wichtigste Punkt, den Sie über RustDesk unter Linux verstehen sollten, denn er entscheidet, ob die Fernsteuerung sofort „einfach funktioniert“ oder erst eine kleine Einstellung braucht.

**X11 (Xorg): der direkteste Weg zur Bildschirmerfassung, sofern Ihre Distribution ihn noch anbietet.** Unter X11 liest RustDesk den Framebuffer direkt aus und injiziert Eingaben ebenso direkt, sodass Bildschirmerfassung sowie Maus- und Tastatursteuerung so unmittelbar wie möglich ablaufen und Monitoränderungen dynamisch erkannt werden. Viele Display-Manager lassen Sie beim Login über ein Zahnrad-Menü weiterhin „Xorg“/„X11“ auswählen. Bedenken Sie aber, dass mehrere Distributionen auf reinen Wayland-Betrieb umstellen und die X11-Sitzung abschaffen – betrachten Sie X11 also als praktische Option, wo sie gerade verfügbar ist, nicht als Grundlage für die Planung Ihrer Bereitstellung.

**Wayland: in den Standard-Builds unterstützt, mit einer Preview für unbeaufsichtigten Zugriff.** Da Wayland-Compositors keinen direkten Framebuffer-Zugriff erlauben, erfassen die Standard-Builds von RustDesk den Bildschirm in der angemeldeten Sitzung über `xdg-desktop-portal` und [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) und injizieren Eingaben über das Kernel-Modul `uinput`. RustDesk 1.4.3 (Oktober 2025) hat [Multi-Monitor-Sharing für Wayland hinzugefügt](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Eine separate [Preview für unbeaufsichtigten Wayland-Zugriff](/de/blog/unattended-remote-access-wayland-de) ergänzt unbeaufsichtigten Zugriff und Zugriff auf den Anmeldebildschirm nach einem Neustart; sie richtet sich an **x86_64-Systeme auf Basis von Debian/Ubuntu**.

- **Zustimmung beim Start der Freigabe.** Das Portal zeigt einen Dialog, in dem Sie auswählen, welcher Bildschirm freigegeben wird. Das ist eine Sicherheitsfunktion von Wayland, kein Fehler von RustDesk: Eine Hintergrundanwendung kann nicht unbemerkt eine Bildschirmaufnahme starten. Portal v4 und neuer unterstützen ein „Restore Token“, sodass Sie nicht bei jeder Verbindung erneut gefragt werden.
- **Zugriff auf den Anmeldebildschirm.** Die Standard-Builds erfassen die angemeldete Sitzung. Für den Anmeldebildschirm nach einem Neustart nutzen Sie die Preview für unbeaufsichtigten Zugriff auf x86_64-Systemen auf Basis von Debian/Ubuntu oder einen X11-Anmeldebildschirm, wo Ihre Distribution ihn noch anbietet.

Wenn Sie sich mit einem Standard-Build zu einem Wayland-System verbinden und einen schwarzen Bildschirm sehen, ist meist der Portal-/PipeWire-Pfad nicht erfüllt: Die Abfrage wurde nicht bestätigt, oder `xdg-desktop-portal` bzw. PipeWire laufen nicht. Unser Leitfaden zu [RustDesk „Connected, waiting for image“](/de/blog/rustdesk-connected-waiting-for-image-der-komplette-leitfaden-zur) geht den Wayland-Fall Schritt für Schritt durch.

## Unbeaufsichtigter Zugriff unter Linux

Unbeaufsichtigter Zugriff bedeutet, sich mit einem Rechner zu verbinden, vor dem niemand sitzt – das klassische Remote-Support-Szenario. Unter Linux sieht das Rezept so aus:

1. Installieren Sie über `.deb` oder `.rpm`, damit der systemd-Dienst registriert wird, oder klicken Sie in der App auf **Vermittlungsdienst aktivieren**.
2. Legen Sie unter **Einstellungen → Sicherheit** ein starkes **permanentes Passwort** fest. Der Standard-Bestätigungsmodus akzeptiert es bereits; als zweiten Faktor ergänzen Sie die Zwei-Faktor-Authentifizierung für Verbindungen zum gesteuerten Gerät. Siehe die [Anleitung zur Einrichtung des unbeaufsichtigten Zugriffs](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung).
3. Für den Zugriff vor der Anmeldung unter Wayland nutzen Sie die [Preview für unbeaufsichtigten Wayland-Zugriff](/de/blog/unattended-remote-access-wayland-de) auf x86_64-Systemen auf Basis von Debian/Ubuntu, oder Sie konfigurieren den Anmeldebildschirm des Display-Managers für X11, sofern unterstützt. Die Wahl einer X11-Desktop-Sitzung allein wirkt sich nur auf die Sitzung nach der Anmeldung aus.

## Headless-Linux: Server ohne Monitor

Ein häufiger Linux-Anwendungsfall ist ein Rechner ganz ohne angeschlossenes Display: ein Heimserver, ein Laborrechner, eine VM. Ohne Monitor stellt der Grafikstack oft keine aktive Ausgabe bereit; dann gibt es kein Bild zu erfassen, und Sie sehen einen schwarzen Bildschirm.

Zwei Möglichkeiten, ihm etwas zum Rendern zu geben:

- **Ein Dummy-Stecker** – ein günstiger physischer HDMI-/DisplayPort-„Headless“-Dongle, der die GPU glauben lässt, es sei ein Monitor angeschlossen.
- **Ein virtueller Display-Treiber** – `xserver-xorg-video-dummy` unter X11 oder eine Option auf Kernel-Ebene wie VKMS.

## Den RustDesk-Server unter Linux selbst hosten

Alles bisher Beschriebene betrifft den _Client_. Die andere Hälfte der Linux-Geschichte von RustDesk: Der **Server** – der `hbbs`-ID-/Rendezvous-Dienst und das `hbbr`-Relay – ist eine Linux-native Anwendung, und Linux ist sein natürliches Zuhause. Dadurch können Sie Sitzungsvermittlung und weitergeleiteten Datenverkehr auf Ihrer eigenen Infrastruktur behalten, statt sie über die Cloud eines Anbieters zu leiten.

Sie haben zwei Optionen. **Server OSS** ist kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum, und deckt die grundlegende Verbindungs- und Relay-Funktion ab. **RustDesk Server Pro** ergänzt eine selbst gehostete Web-Konsole, Gerätegruppen und ein gemeinsames Adressbuch sowie ab dem Basic-Plan einen Generator für individuell gebrandete Clients und [LDAP/Active Directory und OIDC-SSO](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/ldap/). Docker ist keine Pflicht – siehe [Server Pro ohne Docker betreiben](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/) für eine Installation auf einer gewöhnlichen VM oder Bare-Metal-Hardware.

Ein Hinweis zum Self-Hosting: Betrieb, Patches und Absicherung von Server OSS und Server Pro liegen bei Ihnen. Die [Hardware-Anforderungen sind sehr gering](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/) (für Server OSS genügt ein einfacher Cloud-Server oder sogar ein Raspberry Pi); dimensionieren Sie nach der Zahl Ihrer Online-Geräte und dem Relay-Verkehr, und legen Sie fest, wer sich um Updates, Monitoring und Backups kümmert. Die kostenpflichtigen Pläne enthalten Support. (Server Pro prüft seine Lizenz außerdem etwa einmal täglich über ausgehendes HTTPS und braucht daher einen Weg zu rustdesk.com.)

## Erste Schritte

Installieren Sie das passende Paket für Ihre Distribution, legen Sie ein permanentes Passwort für den unbeaufsichtigten Zugriff fest und richten Sie – falls Datensouveränität Ihr Beweggrund ist – Server OSS ein. Verbindliche Angaben zu den aktuellen Plänen finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing), und [sales@rustdesk.com](mailto:sales@rustdesk.com) berät Sie zu Server Pro. Möchten Sie es erst in Aktion sehen? [RustDesk in Aktion erleben](https://www.youtube.com/@rustdesk).
