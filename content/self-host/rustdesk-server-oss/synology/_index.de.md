---
title: Synology
weight: 22
---

> Eine alternative aktuelle Anleitung von Dritten ist [hier](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Diese Anleitung basiert auf dem aktuellen DSM v6 und v7.

### Docker installieren

| Paketzentrum öffnen | Docker installieren |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/docker.png) |

### RustDesk-Server installieren

| RustDesk-Server im Docker-Register suchen und per Doppelklick installieren | RustDesk-Server-Image ist installiert, Doppelklick zum Erstellen des RustDesk-Server-Containers |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/rustdesk-server-installed.png) |

### hbbs-Container erstellen

Wie oben erwähnt, doppelklicken Sie auf das RustDesk-Server-Image, um einen neuen Container zu erstellen, und geben Sie ihm den Namen `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbs.png)

Klicken Sie auf `Erweiterte Einstellungen`.

- Automatischen Neustart aktivieren
![](/docs/en/self-host/rustdesk-server-oss/synology/images/auto-restart.png)

- Aktivieren Sie `Use the same network as Docker Host`. Mehr Infos über das Hostnetz siehe [hier](/docs/de/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/images/host-net.png)

- Binden Sie ein Host-Verzeichnis (z. B. `/home/rustdesk/`) als `/root` ein, hbbs wird einige Dateien (Datenbank- und `key`-Dateien) in diesem Verzeichnis erzeugen, die über Neustarts hinweg erhalten bleiben müssen.
| Einbinden | Im Host-Verzeichnis erzeugte Dateien |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/mounted-dir.png) |

- Befehl einstellen
{{% notice note %}}
Das Betriebssystem von Synology basiert auf Debian, daher funktioniert das Hostnetz (--net=host) einwandfrei, wir müssen keine Ports mit der Option `-p` zuordnen.

`192.168.16.98` ist eine interne IP, die hier nur zu Demonstrationszwecken verwendet wird. Bitte setzen Sie sie bei der Bereitstellung auf eine öffentliche IP. Oder Sie verwenden Ihre DDNS-Adresse, wenn Sie eine in "Systemsteuerung → Verbindungen → DDNS" konfiguriert haben. Vergessen Sie nicht, die Ports auf Ihrem Router und Ihrer Synology-Firewall zu öffnen, wenn diese in "Systemsteuerung → Verbindungen → Firewall" aktiviert ist!

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbs-cmd.png?v2)

- Fertig

![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbs-config.png)

### hbbr-Container erstellen

Bitte wiederholen Sie die obigen Schritte für `hbbs`, nennen aber den Container `hbbr` und der Befehl (für den Schritt Befehl einstellen) sollte `hbbr -k_` sein.

![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbr-config.png)

### hbbr/hbbs-Container

![](/docs/en/self-host/rustdesk-server-oss/synology/images/containers.png)


| Doppelklicken Sie auf den Container und prüfen Sie das Protokoll | Bestätigen Sie hbbs/hbbr über das Host-Netzwerk doppelt |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/network-types.png) |

### Ihren Schlüssel abrufen

Navigieren Sie zu dem Ordner, der vor der Verwendung der Dateistation eingerichtet wurde, laden Sie die Datei `id_ed25519.pub` herunter und öffnen Sie sie mit einem Texteditor, um Ihren Schlüssel zu übertragen.
