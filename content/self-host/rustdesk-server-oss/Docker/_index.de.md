---
title: Docker
weight: 7
---

> Hier ist ein weiteres gutes Tutorial: [Erstellen Sie Ihre eigene Remote-Desktop-Lösung: RustDesk Self-Hosted in der Cloud mit Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Installieren Sie Ihren eigenen Server mit Docker

### Anforderungen
Sie müssen Docker/Podman installiert haben, um einen rustdesk-server als Docker-Container auszuführen. Im Zweifelsfall installieren Sie Docker mit dieser [Anleitung](https://docs.docker.com/engine/install), um sicherzustellen, dass es auf dem neuesten Stand ist!

Stellen Sie sicher, dass Sie diese Ports in der Firewall öffnen:
- `hbbs`:
  - `21114` (TCP): für die Webkonsole verwendet, nur in der `Pro`-Version verfügbar.
  - `21115` (TCP): für den NAT-Typ-Test verwendet.
  - `21116` (TCP/UDP): **Bitte beachten Sie, dass `21116` sowohl für TCP als auch für UDP aktiviert sein sollte.** `21116/UDP` wird für die ID-Registrierung und den Heartbeat-Dienst verwendet. `21116/TCP` wird für das TCP-Hole-Punching und den Verbindungsdienst verwendet.
  - `21118` (TCP): zur Unterstützung von Webclients verwendet.
- `hbbr`:
  - `21117` (TCP): für die Relay-Dienste verwendet.
  - `21119` (TCP): zur Unterstützung von Webclients verwendet.

*Wenn Sie keine Webclient-Unterstützung benötigen, können die entsprechenden Ports `21118`, `21119` deaktiviert werden.*

### Docker-Beispiele

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funktioniert nur unter **Linux**, wodurch `hbbs`/`hbbr` die tatsächliche eingehende IP-Adresse anstelle der Container-IP (172.17.0.1) sehen.
Wenn `--net=host` gut funktioniert, werden die `-p`-Optionen nicht verwendet. Wenn Sie unter Windows arbeiten, lassen Sie `sudo` und `--net=host` weg.

**Bitte entfernen Sie `--net=host`, wenn Sie Verbindungsprobleme auf Ihrer Plattform haben.**
{{% /notice %}}

{{% notice note %}}
Wenn Sie mit `-td` keine Logs sehen können, können Sie Logs über `docker logs hbbs` anzeigen. Oder Sie können mit `-it` ausführen, dann laufen `hbbs/hbbr` nicht im Daemon-Modus.
{{% /notice %}}

### Docker Compose-Beispiele
Um die Docker-Dateien mit der hier beschriebenen `compose.yml` auszuführen, müssen Sie [Docker Compose](https://docs.docker.com/compose/) installiert haben.

```yaml
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

Wenn Sie Konfigurationsänderungen vornehmen müssen, z.B. ALWAYS_USE_RELAY=Y setzen, können Sie environment in der docker-compose.yml verwenden

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    environment:
      - ALWAYS_USE_RELAY=Y
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

### Podman Quadlet-Beispiele

Wenn Sie die Container mit Podman als systemd-Dienst ausführen möchten, können Sie diese Beispiel-Podman-Quadlet-Konfigurationen verwenden:

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

oder

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```