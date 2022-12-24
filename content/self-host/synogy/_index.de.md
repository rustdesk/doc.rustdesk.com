---
title: Synology
weight: 22
---

Diese Anleitung basiert auf der letzten Version des DSM v6.

### Installation mittels Docker

Öffne den Paketmanager und installiere docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/package-manager.png) | ![](/docs/en/self-host/synogy/images/docker.png)


### Installation des RustDesk Servers

| Suche nach rustdesk-server in Dockers Registery und installiere es durch Doppelklick  |   Ist das rustdesk-server Image installiert, doppelklicke es um einen rustdesk-server Container zu erstellen                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synogy/images/rustdesk-server-installed.png)


### Erzeuge den hbbs Container

Wie oben erwähnt, doppelklicke auf das rustdesk-server Image um einen neuen Container zu erzeugen. Setze als Namen `hbbs`.
![](/docs/en/self-host/synogy/images/hbbs.png) 

Klicke auf "Advanced Settings".

- Aktiviere auto-restart
![](/docs/en/self-host/synogy/images/auto-restart.png) 

- Aktiviere "Use the same network as Docker host". Für mehr Infos über host net, schaue bitte [hier](/docs/en/self-host/install/#net-host)
![](/docs/en/self-host/synogy/images/host-net.png) 

- Binde ein Verzeichnis des Hosts (z.B. `Shared/test/`) auf `/root` ein. hbbs wird dort einige Dateien generieren (insbesondere die `key` Datei) 
| Mount | Dort generierte Dateien |
|-- | -- |
![](/docs/en/self-host/synogy/images/mount.png?width=500px) | ![](/docs/en/self-host/synogy/images/mounted-dir.png?width=300px) 

- Setze den Befehl
{{% notice note %}}
Synogys Betriebssystem basiert auf Debian, deshalb funktioniert host net (--net=host) gut und es müssen keine Ports mittels `-p` zugewiesen werden.

`192.168.16.98` ist eine Intranet-IP, welche nur zu Demonstrationszwecken genutzt wurde. Bitte setze es auf eine öffentliche IP bei der Einrichtung.

{{% /notice %}}

![](/docs/en/self-host/synogy/images/hbbs-cmd.png?v2) 

- Fertig
  
![](/docs/en/self-host/synogy/images/hbbs-config.png) 

### Erzeuge den hbbr Container

Bitte wiederhole die Schritte von unter `hbbs`, ändere dabei den Containernamen zu `hbbr` und den Befehl zu `hbbr`.

![](/docs/en/self-host/synogy/images/hbbr-config.png) 

### hbbr/hbbs Container

![](/docs/en/self-host/synogy/images/containers.png?width=500px)


| Doppelklicke auf die Container und beachte das Log | Verifizere, dass hbbs/hbbr das host Netzwerk nutzen |
|-- | -- |
![](/docs/en/self-host/synogy/images/log.png?width=500px) | ![](/docs/en/self-host/synogy/images/network-types.png?width=500px)



[English](/docs/en/self-host/synogy)
