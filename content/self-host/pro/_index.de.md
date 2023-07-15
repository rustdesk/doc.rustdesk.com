---
title: Pro
weight: 100
---

Selbst-Host Pro basiert auf der Open-Source-Version, verfügt aber über mehr Funktionen.

- OIDC, LDAP, 2FA (E-Mail-Verifizierung)
- Adressbuch
- Umbenennen
- Protokollverwaltung
- Geräteverwaltung
- Einstellungen synchronisieren
- Berechtigungskontrolle
- Mehrere Relay-Server (wählt automatisch das nächstgelegene Relay aus)

{{% notice note %}}
RustDesk-Client >= 1.2.0 erforderlich
{{% /notice %}}

## Herunterladen

[https://github.com/rustdesk/rustdesk-server-pro/releases/latest](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)

## Installation

### Einfache Installation

Um das Leben einfach zu machen, haben wir ein [einfaches Installationsskript](https://rustdesk.com/docs/de/self-host/pro/installscript/) entwickelt, die sich um alles kümmern (Installation/Upgrade/Konvertierung von Open Source).

{{% notice note %}}
Vergessen Sie nicht, Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) zu beziehen, auf der Seite [Lizenz](https://rustdesk.com/docs/de/self-host/pro/license/) finden Sie weitere Informationen.
{{% /notice %}}

### Manuelle Installation

Fast dasselbe wie [die Open-Source-Version](/docs/en/self-host/install/), aber Sie müssen hbbs/hbbr nicht mit irgendwelchen Argumenten ausführen, alles kann später in der Webkonsole eingestellt werden.

- `-k _` ist standardmäßig eingestellt
- `-r <server:host>` wird nicht mehr benötigt, wenn der Relay-Server auf demselben Rechner wie hbbs läuft. Sie können in der Webkonsole mehrere Relay-Server einstellen.

### Ein weiterer Port (oder Sie verwenden einen Proxy)

Der TCP-Port `21114` wurde für die Webkonsole hinzugefügt. Bitte fügen Sie diesen Port ebenfalls hinzu, wenn Sie Firewallregeln und Docker-Port-Mapping festlegen.
