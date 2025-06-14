---
title: Docker
weight: 3
---

## Docker Compose (Recomendado)

Con Docker Compose DEBES usar `network_mode: "host"` para asegurar que las licencias funcionen. Instala Docker usando esta [guía](https://docs.docker.com/engine/install) para asegurar que esté actualizado!

Copia lo siguiente en `compose.yml`.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

Luego ejecuta `sudo docker compose up -d` o `podman-compose up -d`

> `sudo apt install podman-compose` para la instalación de `podman-compose`

{{% notice note %}}
Cómo [configurar HTTPS para la consola web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

## Comandos Docker

Instala Docker con esta [guía](https://docs.docker.com/engine/install) para asegurar que esté actualizado!

O puedes instalar docker con este único comando.

```
bash <(wget -qO- https://get.docker.com)
```

Ejecuta los siguientes comandos (la imagen s6 puede necesitar `./data:/data` en lugar de `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
El ejemplo anterior usa `sudo` y `--net=host`, esto no funcionará en Windows, por favor elimina estos comandos, si eliminas `--net=host` por favor revisa abajo.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Cómo [configurar HTTPS para la consola web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}


> Si tienes problemas con SELinux en Fedora, por favor revisa este [problema](https://github.com/rustdesk/rustdesk-server/issues/230).