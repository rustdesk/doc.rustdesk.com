---
title: Synologie DSM 6
weight: 22
---

Deze handleiding is gebaseerd op de nieuwste DSM v6.

### Installeer Docker

Open pakketbeheer en installeer docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](images/package-manager.png) | ![](images/docker.png)


### Installeer RustDesk Server

| Zoek rustdesk-server in het Docker-register en installeer door te dubbelklikken |   Het rustdesk-server image is aangemaakt, dubbelklik om een rustdesk-server container te maken.                                    |
| --------------- | -------------------------------------------------------- |
![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png)


### Maak hbbs container aan

Zoals hierboven vermeld, dubbelklik op de rustdesk-server image om een nieuwe container aan te maken, geef hem de naam `hbbs`.
![](images/hbbs.png) 

Klik op "Geavanceerde instellingen".

- Schakel auto-herstart in
![](images/auto-restart.png) 

- Schakel "Gebruik hetzelfde netwerk als Docker host" in, voor meer over host net, zie [check](/docs/en/self-host/install/#net-host)
![](images/host-net.png) 

- Maak een host map (bijv. `Gedeeld/test/`) aan in `/root`, hbbs zal een aantal bestanden (waaronder het `sleutel` bestand) in deze map genereren.
| Maak | Bestanden gegenereerd in de host map |
|-- | -- |
![](images/mount.png?width=500px) | ![](images/mounted-dir.png?width=300px) 

- Instellen commando
{{% notice note %}}
Het OS van Synology is gebaseerd op Debian, dus host net (--net=host) werkt prima, we hoeven geen poorten in kaart te brengen met de `-p` optie.

`192.168.16.98` is een intranet ip dat hier alleen ter demonstratie wordt gebruikt, stel het in op een publiek ip wanneer u het in gebruik neemt.

{{% /notice %}}

![](images/hbbs-cmd.png?v3) 

- Klaar
  
![](images/hbbs-config.png) 

### Maak hbbr container

Herhaal bovenstaande `hbbs` stappen, maar verander de containernaam in `hbbr` en het commando in `hbbr`.

![](images/hbbr-config.png) 

### hbbr/hbbs containers

![](images/containers.png?width=500px)


| Dubbelklik op de container en controleer het logbestand | Dubbele bevestiging van hbbs/hbbr met behulp van het host-netwerk |
|-- | -- |
![](images/log.png?width=500px) | ![](images/network-types.png?width=500px)
