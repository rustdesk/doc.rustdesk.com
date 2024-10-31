---
title: Docker
weight: 7
---

### Instale seu próprio servidor com Docker

#### Requisitos
Você precisa ter o Docker/Podman instalado para executar um rustdesk-server como um contêiner Docker. Se estiver em dúvida, instale o Docker com este [guia](https://docs.docker.com/engine/install/)! (em inglês)

Por padrão, o `hbbs` escuta nas portas 21114 (TCP, para console web, disponível apenas na versão Pro), 21115 (TCP), 21116 (TCP/UDP) e 21118 (TCP). O `hbbr` escuta nas portas 21117 (TCP) e 21119 (TCP). Certifique-se de abrir essas portas no firewall. **Observe que a porta 21116 deve estar habilitada para TCP e UDP.**

- TCP (**21114, 21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

#### Detalhes das portas

- A porta 21115 é usada para o teste de tipo NAT.
- A porta 21116/UDP é usada para o serviço de registro de ID e pulsação.
- A porta 21116/TCP é usada para o serviço de conexão e perfuração de tunelamento TCP.
- A porta 21117 é usada para os serviços de retransmissão.
- As portas 21118 e 21119 são usadas para oferecer suporte a clientes web. Se você não precisa de suporte a cliente web (21118, 21119), as portas correspondentes podem ser desabilitadas.

#### Exemplos de Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
A opção `--net=host` funciona apenas no **Linux**. Com ela, os contêineres `hbbs` e `hbbr` conseguem ver o endereço IP real de entrada, em vez do endereço IP do contêiner (172.17.0.1).
Se a opção `--net=host` funcionar bem, as opções `-p` não são necessárias. Caso esteja usando Windows, deixe de fora o `sudo` e `--net=host`.

**⚠️Importante: Remova `--net=host` se estiver enfrentando problemas de conexão na sua plataforma.⚠️**
{{% /notice %}}

{{% notice note %}}
Se não conseguir visualizar os logs com `-td`, você pode vê-los através de `docker logs hbbs`.  Você também pode executar com `-it`, mas `hbbs/hbbr` não será executado em modo daemon.
{{% /notice %}}

####Exemplos de Docker Compose

Para executar os arquivos Docker usando o `compose.yml` conforme descrito aqui, você precisa ter o [Docker Compose](https://docs.docker.com/compose/) instalado.

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
