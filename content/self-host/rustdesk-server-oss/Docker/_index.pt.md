---
title: Docker
weight: 7
---

> Aqui está outro bom tutorial: [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Instale seu próprio servidor com Docker

### Requisitos
Você precisa ter Docker/Podman instalado para executar um rustdesk-server como um contêiner Docker. Se estiver em dúvida, instale o Docker com este [guia](https://docs.docker.com/engine/install) para garantir que esteja o mais atualizado possível!

Certifique-se de abrir essas portas no firewall:
- `hbbs`:
  - `21114` (TCP): usado para console web, disponível apenas na versão `Pro`.
  - `21115` (TCP): usado para o teste de tipo NAT.
  - `21116` (TCP/UDP): **Observe que `21116` deve ser habilitado tanto para TCP quanto para UDP.** `21116/UDP` é usado para o serviço de registro de ID e heartbeat. `21116/TCP` é usado para TCP hole punching e serviço de conexão.
  - `21118` (TCP): usado para suportar clientes web.
- `hbbr`:
  - `21117` (TCP): usado para os serviços de Retransmissão.
  - `21119` (TCP): usado para suportar clientes web.

*Se você não precisar de suporte para cliente web, as portas correspondentes `21118`, `21119` podem ser desabilitadas.*

### Exemplos Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funciona apenas no **Linux**, o que faz `hbbs`/`hbbr` ver o endereço IP real de entrada em vez do IP do contêiner (172.17.0.1).
Se `--net=host` funcionar bem, as opções `-p` não são usadas. Se no Windows, remova `sudo` e `--net=host`.

**Por favor, remova `--net=host` se você estiver tendo problemas de conexão na sua plataforma.**
{{% /notice %}}

{{% notice note %}}
Se você não conseguir ver logs com `-td`, pode ver logs via `docker logs hbbs`. Ou pode executar com `-it`, `hbbs/hbbr` não executará como modo daemon.
{{% /notice %}}

### Exemplos Docker Compose
Para executar os arquivos Docker com o `compose.yml` conforme descrito aqui, você precisa ter o [Docker Compose](https://docs.docker.com/compose/) instalado.

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

Se você precisar fazer mudanças de configuração, por exemplo, definir ALWAYS_USE_RELAY=Y, pode usar environment no docker-compose.yml

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

### Exemplos Podman Quadlet

Se você quiser executar os contêineres com Podman como um serviço systemd, pode usar essas configurações exemplo do Podman Quadlet:

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

ou

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