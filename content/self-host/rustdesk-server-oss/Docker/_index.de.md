---
title: Docker
weight: 7
---

### Installieren Sie Ihren eigenen Server mit Docker

#### Anforderungen
Sie müssen Docker/Podman installiert haben, um einen RustDesk-Server als Docker-Container zu betreiben. Im Zweifelsfall installieren Sie Docker mit dieser [Anleitung](https://docs.docker.com/engine/install), um sicherzustellen, dass es auf dem neuesten Stand ist!

Standardmäßig lauscht `hbbs` auf 21115 (TCP), 21116 (TCP/UDP) und 21118 (TCP), `hbbr` lauscht auf 21117 (TCP) und 21119 (TCP). Diese Ports müssen in der Firewall geöffnet sein. **Bitte beachten Sie, dass 21116 sowohl für TCP als auch für UDP aktiviert sein muss.** 21115 wird für den NAT-Typ-Test verwendet, 21116/UDP wird für die ID-Registrierung und den Heartbeat-Dienst verwendet, 21116/TCP wird für das TCP-Hole-Punching und den Verbindungsdienst verwendet, 21117 wird für die Relay-Dienste verwendet und 21118 sowie 21119 werden zur Unterstützung von Webclients verwendet. *Wenn Sie die Webclient-Unterstützung (21118, 21119) nicht benötigen, können die entsprechenden Ports deaktiviert werden.*

- TCP (**21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

#### Docker-Beispiele

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]>
sudo docker run --name hbbr -v ./data:/root -td --net=host rustdesk/rustdesk-server hbbr
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

#### Docker Compose-Beispiele
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
