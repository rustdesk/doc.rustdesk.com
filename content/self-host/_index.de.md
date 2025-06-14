---
title: Selbst-Host
weight: 5
pre: "<b>2. </b>"
---

Wenn Sie RustDesk verwenden, sollten Sie Ihren eigenen RustDesk-Server haben. Diese Dokumente werden Ihnen auf Ihrer RustDesk-Reise helfen.

Support ist über unser [Discord](https://discord.com/invite/nDceKgxnkV) für OSS und per [E-Mail](mailto:support@rustdesk.com) für Pro verfügbar.

## Grundlegende Einrichtung

[Richten Sie Ihre eigene Serverinstanz manuell ein.](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/#richten-sie-ihre-eigene-serverinstanz-manuell-ein)

## Erforderliche Ports

Die für das Selbst-Hosten des RustDesk-Servers erforderlichen Ports hängen weitgehend von Ihrer Umgebung und den Anforderungen ab, die Sie an RustDesk stellen. In den Beispielen, die in der Dokumentation gezeigt werden, sind in der Regel alle vorgeschlagenen Ports geöffnet.

Grundlegende Ports: \
TCP `21114-21119` \
UDP `21116`

`21114-21117` sind die mindestens erforderlichen Ports, damit RustDesk funktionieren kann. Sie sind für die Signal- und Relais-Ports sowie für NAT-Traversal zuständig.

Zusätzlich können die TCP-Ports `21118` und `21119` geöffnet werden, wenn Sie den [RustDesk-Webclient](https://rustdesk.com/docs/de/dev/build/web/) verwenden möchten.

Für Pro-Benutzer ohne SSL-Proxy müssen Sie den TCP-Port `21114` öffnen, damit die API funktioniert. Alternativ können Sie mit einem SSL-Proxy den TCP-Port `443` öffnen.

## Geöffnete Ports testen

Um zu überprüfen, ob die Ports geöffnet sind und funktionieren, können Sie `test-netconnection domain.com -p 21115` mit PowerShell oder [CanYouSeeMe.org](https://canyouseeme.org/) verwenden.

{{% children depth="3" showhidden="true" %}}
