---
title: Docker
weight: 3
---

### Docker Compose (Recomendado)

Com Docker Compose você DEVE usar `network_mode: "host"` para garantir que o licenciamento funcione. Instale o Docker usando este [guia](https://docs.docker.com/engine/install) para garantir que esteja atualizado!

Copie o conteúdo abaixo para `compose.yml`.

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

Em seguida execute `sudo docker compose up -d` ou `podman-compose up -d`

> `sudo apt install podman-compose` para instalação do `podman-compose`

{{% notice note %}}
Como [configurar HTTPS para o console web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

### Comandos Docker

Instale o Docker com este [guia](https://docs.docker.com/engine/install) para garantir que esteja atualizado!

Ou você pode instalar o docker com este único comando.

```
bash <(wget -qO- https://get.docker.com)
```

Execute os seguintes comandos (a imagem s6 pode precisar de `./data:/data` em vez de `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
O exemplo acima usa `sudo` e `--net=host`, isso não funcionará no Windows, remova estes comandos, se remover `--net=host` verifique abaixo.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Como [configurar HTTPS para o console web manualmente](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}


> Se você tiver problemas com SELinux no Fedora, verifique este [problema](https://github.com/rustdesk/rustdesk-server/issues/230).