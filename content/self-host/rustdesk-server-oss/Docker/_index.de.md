---
title: Docker
weight: 7
---

## Installieren Sie Ihren eigenen Server mit Docker

### Anforderungen
Sie müssen Docker/Podman installiert haben, um einen RustDesk-Server als Docker-Container zu betreiben. Im Zweifelsfall installieren Sie Docker mit dieser [Anleitung](https://docs.docker.com/engine/install), um sicherzustellen, dass es auf dem neuesten Stand ist!

By default, `hbbs` listens on 21115 (TCP) and 21116 (TCP/UDP), 21118 (TCP), and `hbbr` listens on 21117 (TCP), 21119 (TCP). Be sure to open these ports in the firewall. **Please note that 21116 should be enabled both for TCP and UDP**. 21115 is used for the NAT type test, 21116/UDP is used for the ID registration and heartbeat service, 21116/TCP is used for TCP hole punching and connection service, 21117 is used for the Relay services, and 21118 and 21119 are used to support web clients. *If you do not need web client (21118, 21119) support, the corresponding ports can be disabled.*

- TCP (**21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

### Docker-Beispiele
```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]>
sudo docker run --name hbbr -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funktioniert nur unter **Linux**, was dazu führt, dass `hbbs`/`hbbr` die tatsächliche, eingehende IP-Adresse sehen und nicht die Container-IP (172.17.0.1).
Wenn `--net=host` gut funktioniert, wird die Option `-p` nicht verwendet. Wenn Sie unter Windows arbeiten, lassen Sie `sudo` und `--net=host` weg.

**Bitte entfernen Sie `--net=host`, wenn Sie Verbindungsprobleme auf Ihrer Plattform haben.**
{{% /notice %}}

{{% notice note %}}
Sie können die Protokolle mit `docker logs hbbs` ansehen, wenn sie mit `-td` nicht zu sehen sind. Oder Sie können mit `-it` arbeiten, `hbbs/hbbr` wird nicht im Daemon-Modus laufen.
{{% /notice %}}

### Docker Compose-Beispiele
Um die Dockerdateien mit `docker-compose.yml` wie hier beschrieben ausführen zu können, müssen Sie [Docker Compose](https://docs.docker.com/compose/) installiert haben.
```yaml
version: '3'

services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped


  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```
