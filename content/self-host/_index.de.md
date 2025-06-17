---
title: Selbst-Host
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

Die oben genannten `21115-21117` sind die mindestens erforderlichen Ports, damit RustDesk funktioniert. Diese verwalten die Signal- und Relay-Ports sowie die NAT-Traversierung.

Die TCP-Ports `21118` und `21119` sind die WebSocket-Ports für den [RustDesk Web-Client](https://rustdesk.com/web/). Sie benötigen einen Reverse-Proxy, um HTTPS zu unterstützen. Bitte beachten Sie diese [Beispiel-Nginx-Konfiguration](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client).

Für Pro-Benutzer ohne SSL-Proxy müssen Sie den TCP-Port `21114` öffnen, damit die API funktioniert. Alternativ können Sie mit einem SSL-Proxy den TCP-Port `443` öffnen.

{{% children depth="4" showhidden="true" %}}
