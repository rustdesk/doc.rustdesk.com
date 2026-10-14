---
publishDate: 2026-07-09T18:44:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: rustdesk-vs-vnc
draft: false
title: 'RustDesk vs. VNC: NAT-Traversal, Codecs, Verschlüsselung'
excerpt: 'RustDesk vs. VNC im Praxisvergleich: NAT-Traversal ohne Portweiterleitung, moderne Codecs, integrierte Verschlüsselung und warum Teams von VNC zu RustDesk wechseln.'
image: '~/assets/images/blog/rustdesk-vs-vnc-og.webp'
category: 'Vergleiche'
tags: ['RustDesk', 'VNC', 'Vergleich', 'Open Source']
author: 'RustDesk Team'
slug: 'rustdesk-vs-vnc-nat-traversal-codecs-verschlusselung'
faq:
  - question: 'Basiert RustDesk auf VNC?'
    answer: 'Nein. VNC nutzt das RFB-Protokoll (Remote Framebuffer), um Pixel-Updates zu übertragen. RustDesk ist eine eigenständige Anwendung mit einem Open-Source-Client (AGPL), einer eigenen Rendezvous-/Relay-Architektur, den Video-Codecs VP8/VP9/AV1 und Ende-zu-Ende-verschlüsselten ID-basierten Sitzungen. RustDesk ist weder ein VNC-Client noch ein VNC-Server.'
  - question: 'Funktioniert VNC ohne Portweiterleitung über das Internet?'
    answer: 'Nein, nicht von allein. Das VNC/RFB-Basisprotokoll bietet kein NAT-Traversal, weshalb die Nutzung über das Internet in der Regel eine Portweiterleitung für TCP 5900, ein VPN oder einen SSH-Tunnel erfordert – es sei denn, man nutzt den Cloud-Vermittlungsdienst eines Anbieters. RustDesk vermittelt die Verbindung über einen ID-Server und ein Relay und überwindet NAT damit ganz ohne diese Hilfsmittel.'
  - question: 'Ist VNC verschlüsselt?'
    answer: 'Nur in manchen Implementierungen. TigerVNC unterstützt TLS/X509-Sicherheit, RealVNC bietet AES-Verschlüsselung, und TightVNC empfiehlt in nicht vertrauenswürdigen Netzen einen SSH-Tunnel. RustDesk verschlüsselt ID-vermittelte Sitzungen Ende-zu-Ende, wenn die Clients mit dem korrekten öffentlichen Serverschlüssel konfiguriert sind. Direct IP Access ist bei RustDesk ein separater, unverschlüsselter Modus, der am besten hinter einem VPN bleibt.'
  - question: 'Ist RustDesk oder VNC besser für ein Homelab im LAN geeignet?'
    answer: 'In einem vertrauenswürdigen LAN ist VNC oft die einfachere Wahl: standardisiert, schnell eingerichtet und auf fast jedem Betriebssystem verfügbar, auch auf dem Raspberry Pi. RustDesk passt besser, sobald Sie das LAN verlassen oder Fernzugriff über verschiedene Betriebssysteme brauchen, denn es ergänzt NAT-Traversal, moderne Video-Codecs und Ende-zu-Ende-verschlüsselte ID-basierte Sitzungen.'
metadata:
  description: 'RustDesk vs. VNC Punkt für Punkt: NAT-Traversal, moderne Codecs, integrierte Verschlüsselung, Self-Hosting – und wo VNC mit Einfachheit und Verbreitung punktet.'
  keywords: 'RustDesk vs. VNC, RustDesk vs. RealVNC, VNC NAT-Traversal, VNC Verschlüsselungsvergleich'
---

VNC ist eine der ältesten und am weitesten verbreiteten Methoden, um einen anderen Computer fernzusteuern. Es handelt sich um einen echten offenen Standard, der nahezu überall läuft, und im LAN ist er in puncto Einfachheit kaum zu schlagen. RustDesk verfolgt dieselbe Kernaufgabe, wurde jedoch für eine Welt aus NAT, Firewalls und gemischten Betriebssystemen entwickelt. Die Unterschiede liegen letztlich darin, wie sich beide über ein Netzwerk hinweg bewegen – und wie viel man nachrüsten muss, um sie sicher zu machen.

Dieser Vergleich stützt sich auf dauerhafte, überprüfbare Fakten statt auf Benchmarks, die von Ihrer Hardware und Verbindung abhängen.

## Was VNC eigentlich ist

„VNC“ ist eine Familie von Implementierungen – RealVNC, TightVNC, TigerVNC, UltraVNC und weitere –, die das **RFB-Protokoll (Remote Framebuffer)** sprechen. RFB überträgt Framebuffer-Updates mit ausgehandelten Kodierungen, die Bilder komprimieren oder Video nutzen können. So [unterstützt TigerVNC die Kodierungen Tight, JPEG, ZRLE, Hextile, H.264 und Raw](https://tigervnc.org/doc/vncviewer.html). Die Leistung hängt daher von Implementierung und Kodierung ab, nicht von RFB selbst.

Die Lizenzierung ist uneinheitlich. TigerVNC wird unter der GNU GPL vertrieben und TightVNC ist ein community-getriebener offener Fork, während der Viewer von RealVNC ein proprietäres, kommerziell gepflegtes Produkt ist. „VNC ist Open Source“ trifft also nur auf _manche_ Implementierungen zu, nicht auf alle.

## Was RustDesk ist

Der Client von RustDesk und RustDesk Server OSS (der kostenlose Community-Server) stehen **unter der AGPL**; Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten und die eine zentrale Verwaltung ergänzt. RustDesk nutzt eine Architektur aus ID-/Rendezvous- und Relay-Server. Clients verbinden sich ausgehend mit dem ID-Server, der direkte Peer-to-Peer- oder über ein Relay geleitete Sitzungen koordiniert. Der [Client unterstützt die Software-Codecs VP8, VP9 und AV1 sowie die Hardware-Codecs H.264/H.265](https://rustdesk.com/docs/de/). Sie können Ihren eigenen Server für Koordination und Relay nutzen, ohne pro Endpunkt ein separates VPN oder einen SSH-Tunnel bereitzustellen.

## Das Internetproblem: NAT-Traversal

Das RFB-Basisprotokoll bietet kein NAT-Traversal. Eine direkte VNC-Bereitstellung braucht daher in der Regel einen erreichbaren Netzwerkweg, etwa ein VPN, einen SSH-Tunnel oder einen weitergeleiteten Port. [TightVNC dokumentiert seine Optionen für Portweiterleitung und SSH](https://www.tightvnc.com/faq.php). Manche VNC-Produkte ergänzen eine Cloud-Vermittlung; das ist eine Produktfunktion und keine Eigenschaft von RFB.

RustDesk wurde genau andersherum konzipiert. Da die Endpunkt-Clients **ausgehende** Verbindungen zu einem Rendezvous-Server aufbauen und bei fehlgeschlagenem direktem Pfad auf ein Relay ausweichen, **überwindet RustDesk NAT und Firewalls, ohne pro Endpunkt eine Portweiterleitung, ein VPN oder einen SSH-Tunnel zu benötigen**. Die Endpunkte brauchen keine eingehenden Listening-Ports, aber ein selbst gehosteter ID-/Rendezvous- und Relay-Server muss eingehenden Datenverkehr auf seinen dokumentierten Dienstports annehmen. Dasselbe NAT-Traversal macht RustDesk zu einer praktischen [kostenlosen Remote-Desktop-Option für Unternehmen](/de/blog/die-beste-kostenlose-remote-desktop-software-fur-unternehmen-2026) für Fernzugriff und gemischte Betriebssysteme.

## Verschlüsselung: Standard vs. „kommt darauf an“

Die Sicherheit von VNC hängt von der Implementierung ab. [TigerVNC unterstützt die Sicherheitstypen TLS und X509](https://tigervnc.org/doc/vncviewer.html), während [TightVNC warnt, dass der Sitzungsverkehr unverschlüsselt ist, und in nicht vertrauenswürdigen Netzen einen SSH-Tunnel empfiehlt](https://www.tightvnc.com/faq.php). Ob eine VNC-Sitzung verschlüsselt ist, entscheiden der konkrete Server, der Viewer und der konfigurierte Sicherheitstyp.

RustDesk unterstützt **Ende-zu-Ende-verschlüsselte, ID-vermittelte Sitzungen**, unabhängig davon, ob der ausgehandelte Weg direkt oder über ein Relay verläuft. Clients für einen selbst gehosteten Server benötigen den [korrekten öffentlichen Serverschlüssel](https://rustdesk.com/docs/de/self-host/client-configuration/). **Direct IP Access** – die Eingabe einer IP-Adresse statt einer ID – ist ein anderer, [unverschlüsselter Modus](https://github.com/rustdesk/rustdesk/wiki/FAQ#i-only-use-rustdesk-for-a-few-devices-on-my-local-network-with-no-internet-connectivity-can-i-still-use-rustdesk-with-direct-ip-access); schützen Sie diesen Weg mit einem VPN.

## RustDesk vs. VNC auf einen Blick

|                            | RustDesk                                                                                     | VNC (RFB)                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Was es ist                 | Eine App + Rendezvous-/Relay-Server                                                          | RFB-Protokoll, viele Implementierungen                                                                          |
| Quellcode                  | Client und Server OSS: AGPL; Server Pro: proprietär                                          | Gemischt: GPL/offen (TigerVNC, TightVNC), proprietär (RealVNC)                                                  |
| Plattformübergreifend      | Windows, macOS, Linux, Android; iOS (nur zum Steuern)                                        | Sehr breit, einschließlich Raspberry Pi                                                                         |
| NAT-Traversal              | Integriertes Rendezvous und Relay                                                            | Nicht Teil des RFB-Basisprotokolls; produktspezifische Vermittler oder VPN-/SSH-Wege können Zugriff ermöglichen |
| Verschlüsselung            | ID-vermittelte Sitzungen mit korrektem Schlüssel verschlüsselt; Direct IP Access unverschlüsselt | Je nach Implementierung; TLS/X509 bei TigerVNC, AES bei RealVNC, SSH empfohlen bei TightVNC                 |
| Videoübertragung           | VP8/VP9/AV1, optional Hardware-H.264/H.265                                                   | RFB-Kodierungen je nach Implementierung; komprimierte Bild- und Videopfade können verfügbar sein                |
| Self-Hosting               | Ja – eigener ID-/Relay-Server                                                                | Ja bei offenen Implementierungen (kein integrierter Vermittler)                                                 |
| Einrichtung im LAN         | Einfach                                                                                      | Sehr einfach                                                                                                    |
| Standardisiertes Protokoll | RustDesk-spezifisch                                                                          | Offener, langjähriger RFB-Standard                                                                              |

Aktuelle Details zu den RustDesk-Plänen finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Wo RustDesk die Nase vorn hat

Die konstruktiven Vorteile von RustDesk zeigen sich, sobald man das LAN verlässt oder Konsistenz über Teams und Plattformen hinweg benötigt:

- **Internetreichweite ohne Bastelarbeit.** NAT-Traversal und Relay-Fallback bedeuten: keine Portweiterleitung, kein VPN und kein SSH-Tunnel pro Endpunkt.
- **Verschlüsselung auf dem ID-Weg.** ID-basierte Sitzungen sind Ende-zu-Ende-verschlüsselt, direkt oder über ein Relay, sobald die Clients den öffentlichen Schlüssel Ihres Servers haben.
- **Eine Auswahl an Codecs.** VP8, VP9 und AV1 in Software, dazu H.264/H.265-Hardware-Codecs, wo das Gerät sie unterstützt.
- **Ein offener Client und ein selbst betreibbarer Server.** Client und Server OSS können Sie selbst prüfen und bauen; Ihre eigenen ID- und Relay-Dienste koordinieren die Verbindungen und übertragen den weitergeleiteten Datenverkehr.

Der Preis dafür: Self-Hosting von RustDesk bedeutet, dass **jemand den Server betreibt** – Bereitstellung, TLS, Ports und laufende Patches. Ein reines LAN-VNC-Setup umgeht das vollständig.

## Was sollten Sie also verwenden?

Für ein vertrauenswürdiges LAN, ein abgeschottetes Segment oder einen Raspberry Pi sind die Einfachheit und Standardisierung von VNC wirklich kaum zu schlagen. Sobald Sie das Internet sicher überbrücken müssen, Verschlüsselung standardmäßig wünschen oder eine Mischung aus Windows, macOS, Linux, Android und iOS mit einem einzigen Tool abdecken müssen, nimmt Ihnen die Architektur von RustDesk mehr Arbeit ab. Und falls Sie ohnehin native Windows-Tools in Betracht ziehen, deckt unser Vergleich [RustDesk vs. RDP](/de/blog/rustdesk-vs-rdp-plattformubergreifend-vs-windows-nativ) diese Weggabelung ebenfalls ab.

## Jetzt ausprobieren

Wenn dieser Vergleich der Anstoß ist, Ihren SSH-Tunnel endlich in Rente zu schicken: Starten Sie mit Server OSS – kostenlos, ohne Lizenzgebühr und ohne Ablaufdatum, NAT-Traversal inklusive. Schreiben Sie an [sales@rustdesk.com](mailto:sales@rustdesk.com), wenn Sie Konditionen für eine Pro-Evaluierung wünschen; die aktuellen Plan-Preise finden Sie unter [rustdesk.com/pricing](https://rustdesk.com/pricing).
