---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro hat im Vergleich zur Open-Source-Version mehr Funktionen.

- OIDC, LDAP, 2FA (E-Mail-Verifizierung)
- Adressbuch
- Umbenennen
- Protokollverwaltung (Verbindung, Dateiübertragung, Alarm usw.)
- Geräteverwaltung
- Einstellungen synchronisieren
- Zugriffskontrolle
- Mehrere Relay-Server (wählt automatisch das nächstgelegene Relay aus)

{{% notice note %}}
RustDesk-Client ≥ 1.2.0 erforderlich
{{% /notice %}}

### Herunterladen

[https://github.com/rustdesk/rustdesk-server-pro/releases/latest](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)

### Installation

#### Einfache Installation

Um das Leben einfach zu machen, haben wir [einfache Installationsskripte](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/) entwickelt, die sich um alles kümmern (Installation/Upgrade/Konvertierung von Open Source).

{{% notice note %}}
Vergessen Sie nicht, Ihre Lizenz unter [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) zu erwerben. Auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/license/) finden Sie weitere Informationen.
{{% /notice %}}

#### Manuelle Installation

Fast dasselbe wie die [Open-Source-Version](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/install/), aber Sie müssen hbbs/hbbr nicht mit irgendwelchen Argumenten ausführen. Diese können später in der Webkonsole eingestellt werden.

- `-k _` ist standardmäßig eingestellt
- `-r <server:host>` wird nicht mehr benötigt, wenn der Relay-Server auf demselben Rechner wie hbbs läuft. Sie können in der Webkonsole mehrere Relay-Server einstellen.

#### Erforderliche Ports

Sie müssen die TCP-Ports 21114-21119 und UDP-Port 21116 öffnen. Stellen Sie sicher, dass diese Ports eingerichtet sind, wenn Sie Firewallregeln und Docker-Port-Mapping festlegen.

{{% notice note %}}
Sie sollten einen Proxy wie Nginx verwenden, um diese über HTTPS zu übertragen, wobei Port 443 geöffnet sein muss.
{{% /notice %}}
