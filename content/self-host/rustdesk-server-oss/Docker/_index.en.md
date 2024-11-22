---
title: Docker
weight: 7
---

### Install your own server with Docker

#### Requirements
You need to have Docker/Podman installed to run a rustdesk-server as a Docker container. If in doubt, install Docker with this [guide](https://docs.docker.com/engine/install) to ensure it's the most up to date!

Be sure to open these ports in the firewall:
- `hbbs`:
  - `21114` (TCP): used for web console, only available in Pro version.
  - `21115` (TCP): used for the NAT type test.
  - `21116` (TCP/UDP): **Please note that 21116 should be enabled both for TCP and UDP.** 21116/UDP is used for the ID registration and heartbeat service. 21116/TCP is used for TCP hole punching and connection service.
  - `21118` (TCP): used to support web clients.
- `hbbr`:
  - `21117` (TCP): used for the Relay services.
  - `21119` (TCP): used to support web clients.

*If you do not need web client support, the corresponding ports 21118, 21119 can be disabled.*

#### Docker examples

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` only works on **Linux**, which makes `hbbs`/`hbbr` see the real incoming IP Address rather than the Container IP (172.17.0.1).
If `--net=host` works fine, the `-p` options are not used. If on Windows, leave out `sudo` and `--net=host`.

**Please remove `--net=host` if you are having connection problems on your platform.**
{{% /notice %}}

{{% notice note %}}
If you cannot see logs with `-td`, you can see logs via `docker logs hbbs`. Or you can run with `-it`, `hbbs/hbbr` will not run as daemon mode.
{{% /notice %}}

#### Docker Compose examples
For running the Docker files with the `compose.yml` as described here you need to have [Docker Compose](https://docs.docker.com/compose/) installed.

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

If you need to make config changes e.g. set ALWAYS_USE_RELAY=Y you can use environment in the docker-compose.yml

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
