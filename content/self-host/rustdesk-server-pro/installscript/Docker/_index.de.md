---
title: Docker
weight: 6
---

### Docker

Installieren Sie Docker mit dieser [Anleitung](https://docs.docker.com/engine/install), um sicherzustellen, dass es auf dem neuesten Stand ist!

Führen Sie die folgenden Befehle aus (S6-Image benötigt möglicherweise `./data:/data` anstelle von `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Das obige Beispiel verwendet `sudo` und `--net=host`, dies wird unter Windows nicht funktionieren. Bitte entfernen Sie diese Befehle. Wenn Sie `--net=host` entfernen, dann prüfen Sie bitte unten.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

### Docker Compose

Mit Docker Compose MÜSSEN Sie `network_mode: "host"` verwenden, um sicherzustellen, dass die Lizenzierung funktioniert. Installieren Sie Docker mit dieser [Anleitung](https://docs.docker.com/engine/install), um sicherzustellen, dass es auf dem neuesten Stand ist!

Kopieren Sie den folgenden Text in die Datei `docker-compose.yml`.

```yaml

services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped


  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

Der Aufruf lautet `docker compose up -d`.

> Wenn Sie Schwierigkeiten mit seLinux unter Fedora haben, überprüfen Sie bitte dieses [Problem](https://github.com/rustdesk/rustdesk-server/issues/230).
