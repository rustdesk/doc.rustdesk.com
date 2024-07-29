---
title: Docker
weight: 6
---

### Docker

Instale o Docker seguindo este [guia](https://docs.docker.com/engine/install/) (em inglês) para garantir que esteja com a versão mais atualizada!

Execute os seguintes comandos (a imagem s6 pode precisar de `./data:/data` em vez de `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
O exemplo acima usa `sudo` e `--net=host`, isso não funcionará no Windows, remova esses comandos. Se você remover `--net=host`, verifique abaixo.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

### Docker Compose

Com Docker Compose, você **PRECISA** usar `network_mode: "host"` para garantir que o licenciamento funcione. Instale o Docker usando este [guia](https://docs.docker.com/engine/install) para garantir que esteja com a versão mais atualizada!

Copie o seguinte conteúdo para o arquivo `compose.yml`.

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

E execute `docker compose up -d`.

> Se você está enfrentando problemas com o SELinux no Fedora, por favor, verifique essa discussão no [GitHub](https://github.com/rustdesk/rustdesk-server/issues/230).

{{% notice note %}}
Disponível um guia sobre como [Configurar manualmente o HTTPS para o console web](https://rustdesk.com/docs/pt/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

Aqui está um [Guia Passo a Passo](https://h3x0r.tech/setting-up-a-rustdesk-server-with-docker) (em inglês). Por favor, adicione a porta `21114` e modifique para `rustdesk-server-pro` de acordo.
{{% /notice %}}
