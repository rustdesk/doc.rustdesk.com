---
title: Selbst-Host
description: "Lernen Sie, wie Sie Ihren eigenen RustDesk-Server selbst hosten. Vollständige Anleitung zur Installation, Konfiguration und Bereitstellung der RustDesk-Server-Infrastruktur für sicheren Remote-Desktop-Zugriff."
keywords: ["rustdesk selbst-host", "rustdesk server", "remote desktop server", "selbst-hosting anleitung", "rustdesk installation", "hbbs hbbr", "rustdesk pro server"]
weight: 5
pre: "<b>2. </b>"
---

Wenn Sie RustDesk verwenden, sollten Sie Ihren eigenen RustDesk-Server haben. Diese Dokumente werden Ihnen auf Ihrer RustDesk-Reise helfen.

Support ist über unser [Discord](https://discord.com/invite/nDceKgxnkV) für OSS und per [E-Mail](mailto:support@rustdesk.com) für Pro verfügbar.

## Wie funktioniert ein selbst-gehosteter Server?

Es gibt technisch gesehen zwei ausführbare Dateien (Server):

- `hbbs` - RustDesk ID (Rendezvous / Signalisierungs) Server, hört auf TCP (`21114` - nur für HTTP in Pro, `21115`, `21116`, `21118` für WebSocket) und UDP (`21116`)
- `hbbr` - RustDesk Relay-Server, hört auf TCP (`21117`, `21119` für WebSocket)

Wenn Sie über Installationsskript / Docker Compose / deb installieren, werden beide Dienste installiert.

Hier sind [Illustrationen](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F), wie der RustDesk-Client mit `hbbr` / `hbbs` kommuniziert.

Solange RustDesk auf einem Rechner läuft, pingt der Rechner ständig den ID-Server (`hbbs`), um seine aktuelle IP-Adresse und Port bekannt zu machen.

Wenn Sie eine Verbindung von Computer A zu Computer B starten, kontaktiert Computer A den ID-Server und fordert die Kommunikation mit Computer B an.

Der ID-Server versucht dann, A und B direkt miteinander zu verbinden, indem er Hole Punching verwendet.

Wenn Hole Punching fehlschlägt, kommuniziert A mit B über den Relay-Server (`hbbr`).

In den meisten Fällen ist Hole Punching erfolgreich und der Relay-Server wird nie verwendet.

Hier ist eine Diskussion über [Sollten Sie einen RustDesk-Server selbst hosten?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Erforderliche Ports

Die für das Selbst-Hosten des RustDesk-Servers erforderlichen Ports hängen weitgehend von Ihrer Umgebung und davon ab, was Sie mit RustDesk machen möchten. Die in der Dokumentation gezeigten Beispiele haben in der Regel alle empfohlenen Ports geöffnet.

Kern-Ports: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: Wird für den HTTP-API-Server in RustDesk Server Pro verwendet.
- TCP `21115`: Wird für den NAT-Typ-Test verwendet.
- UDP `21116`: Wird für die Geräteregistrierung verwendet.
- TCP `21116`: Wird für die Geräteregistrierung und NAT-Hole-Punching verwendet.
- TCP `21117`: Wird für Relay-Kommunikation verwendet.
- TCP `21118`: Wird für WebSocket-Kommunikation verwendet.
- TCP `21119`: Wird für WebSocket-Kommunikation verwendet.

Ports `21115`-`21117` sind die mindestens erforderlichen Ports, damit RustDesk funktioniert. Diese verwalten Signalisierung, Relay und NAT-Traversierung.

Bei einer WSS-Konfiguration müssen TCP `21118` und TCP `21119` in der Regel nicht extern freigegeben werden, da sie intern vom Reverse-Proxy, z. B. Nginx, verwendet werden. Wenn Sie WebSocket nicht verwenden, müssen diese Ports nicht freigegeben werden. Bitte beachten Sie diese [Beispiel-Nginx-Konfiguration](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Für Pro-Benutzer ohne SSL-Proxy müssen Sie TCP-Port `21114` öffnen, damit die API funktioniert. Wenn HTTPS (`443`) für den Server konfiguriert ist, muss TCP `21114` nicht im Internet freigegeben werden.

RustDesk unterstützt auch einen Bereitstellungsmodus, bei dem nur TCP `443` freigegeben ist und alle anderen Ports geschlossen sind. Mit dieser Konfiguration kann die Kommunikation nur über WSS-Relay funktionieren, und direkte Peer-to-Peer-Verbindungen sind nicht verfügbar.

{{% children depth="4" showhidden="true" %}}
