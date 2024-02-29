---
title: Synology DSM 6
weight: 22
---

> Eine alternative aktuelle Anleitung von Dritten ist [hier](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Diese Anleitung basiert auf dem aktuellen DSM v6 und v7.

### Docker installieren

| Paketzentrum öffnen | Docker installieren |
| --- | --- |
| ![](images/package-manager.png) | ![](images/docker.png) |

### RustDesk-Server installieren

| RustDesk-Server im Docker-Register suchen und per Doppelklick installieren | RustDesk-Server-Image ist installiert, Doppelklick zum Erstellen des RustDesk-Server-Containers |
| --- | --- |
| ![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png) |

### hbbs-Container erstellen

Wie oben erwähnt, doppelklicken Sie auf das RustDesk-Server-Image, um einen neuen Container zu erstellen, und geben Sie ihm den Namen `hbbs`.
![](images/hbbs.png)

Klicken Sie auf `Erweiterte Einstellungen`.

- Automatischen Neustart aktivieren
![](images/auto-restart.png)

- Aktivieren Sie `Use the same network as Docker Host`. Mehr Infos über das Hostnetz siehe [hier](https://rustdesk.com/docs/de/self-host/rustdesk-server-oss/docker/#net-host).
![](images/host-net.png)

- Binden Sie ein Host-Verzeichnis (z. B. `/home/rustdesk/`) als `/root` ein, hbbs wird einige Dateien (Datenbank- und `key`-Dateien) in diesem Verzeichnis erzeugen, die über Neustarts hinweg erhalten bleiben müssen.
| Einbinden | Im Host-Verzeichnis erzeugte Dateien |
| --- | --- |
| ![](images/mount.png) | ![](images/mounted-dir.png) |

- Befehl einstellen
{{% notice note %}}
Das Betriebssystem von Synology basiert auf Debian, daher funktioniert das Hostnetz (--net=host) einwandfrei, wir müssen keine Ports mit der Option `-p` zuordnen.

`192.168.16.98` ist eine interne IP, die hier nur zu Demonstrationszwecken verwendet wird. Bitte setzen Sie sie bei der Bereitstellung auf eine öffentliche IP. Oder Sie verwenden Ihre DDNS-Adresse, wenn Sie eine in "Systemsteuerung → Verbindungen → DDNS" konfiguriert haben. Vergessen Sie nicht, die Ports auf Ihrem Router und Ihrer Synology-Firewall zu öffnen, wenn diese in "Systemsteuerung → Verbindungen → Firewall" aktiviert ist!

{{% /notice %}}

![](images/hbbs-cmd.png?v2)

- Fertig

![](images/hbbs-config.png)

### hbbr-Container erstellen

Bitte wiederholen Sie die obigen Schritte für `hbbs`, nennen aber den Container `hbbr` und der Befehl (für den Schritt Befehl einstellen) sollte `hbbr -k_` sein.

![](images/hbbr-config.png)

### hbbr/hbbs-Container

![](images/containers.png)


| Doppelklicken Sie auf den Container und prüfen Sie das Protokoll | Bestätigen Sie hbbs/hbbr über das Host-Netzwerk doppelt |
| --- | --- |
| ![](images/log.png) | ![](images/network-types.png) |

### Ihren Schlüssel abrufen

Navigieren Sie zu dem Ordner, der vor der Verwendung der Dateistation eingerichtet wurde, laden Sie die Datei `id_ed25519.pub` herunter und öffnen Sie sie mit einem Texteditor, um Ihren Schlüssel zu übertragen.
