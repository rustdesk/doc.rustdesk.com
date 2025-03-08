---
title: Modelo de Segurança em Camadas do Servidor RustDesk
weight: 100
---

Gentilmente escrito por [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

### Camadas
- [RustDesk](https://github.com/rustdesk/rustdesk) Ferramenta de Suporte Remoto
- [NPM](https://nginxproxymanager.com/) Ferramenta de Gerenciamento de Proxy
- [Docker](https://www.docker.com) Ferramenta de Container
- Ferramenta de Firewall

#### Pressupostos
Este exemplo é um "Tudo em Um" para hospedar apenas serviços RustDesk. Ele pode ser expandido para uma solução mais flexível dividindo o NPM em seu próprio Docker Compose.
- DMZ Network: 192.168.1.0/24
  - NPM (Externo): 192.168.1.250
- LAN Network: 10.0.0.0/24
- RSBackend Network: 192.168.254.0/29
  - NPM (Interno): 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Docker Host: Linux
  - Cada aplicativo tem uma pasta dedicada em  `/opt/`.
- Nome do Host: uniquehostname  (Mude Isso)
- Nome DNS: rustdesk.example.com

Faça modificações nos exemplos conforme necessário.

### Preparar o Docker
Você deve ter o Docker já instalado, este guia não entra nos detalhes específicos disso.

Você precisará criar uma rede para o Backend do Servidor RustDesk e a DMZ.
Para cada aplicação que você usar com o NPM (Nginx Proxy Manager), você deve ter uma rede de backend dedicada para isolá-la.

```
 docker network create \
   --driver=bridge  \
   --subnet=192.168.254.0/29 RSBackend

 docker network create \
   --driver=ipvlan --subnet=192.168.1.0/24 \
   --gateway=192.168.1.1 \
   -o ipvlan_mode=l2 \
   -o parent=eth0 DMZ
```

### Configurar o Firewall
Configure o encaminhamento de portas/NAT a seguir do seu IP público para o Servidor NPM.
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # Se você quiser usar SSL

### Configurar o Docker Compose
Isso iniciará um contêiner com NPM e as redes corretas.

Copie o código abaixo para docker-compose.yaml.

```
version: '3.5'
services:
  NPM:
    image: jlesage/nginx-proxy-manager:latest
    container_name: proxy-manager
    volumes:
      - /opt/proxy-manager/config:/config
    restart: 'unless-stopped'
    networks:
      DMZ:
        ipv4_address: 192.168.1.250
      RSBackend:
        ipv4_address: 192.168.254.1

  hbbs:
    container_name: rustdesk_hbbs
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbs -k _
    hostname: uniquehostname   # Change This
    volumes:
      - /opt/rustdeskserver:/root
    networks:
      RSBackend:
        ipv4_address: 192.168.254.2
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: rustdesk_hbbr
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbr -k _
    volumes:
      - /opt/rustdeskserver:/root
    networks:
      RSBackend:
        ipv4_address: 192.168.254.3
    restart: unless-stopped

networks:
  DMZ:
    external: true
  RSBackend:
    external: true
```

### Setup NPM
Configure os Stream Hosts para as seguintes Portas:
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # captura o tráfego local

Configure o Proxy Host:
- Nome de Domínio: rustdesk.example.com
- Esquema: http
- Encaminhar Nome do Host / IP: 192.168.254.2
- Porta de Encaminhamento: 21114
- Bloquear Explorações Comuns: Marcado
- Opcional: Configurar SSL **(NÃO EXIGIR - O cliente precisa ser capaz de se comunicar sem SSL.)**

### Configurar o Servidor RustDesk
Conecte-se à interface do servidor http://rustdesk.example.com ou https://rustdesk.example.com se você configurou SSL para a interface web.

### Configurar o Cliente RustDesk
Configure o cliente:
- Servidor de ID: rustdesk.example.com
- Servidor de Relay: rustdesk.example.com
- Servidor de API: http://rustdesk.example.com (use HTTPS if you have configured SSL)
- Key: {Chave do Servidor Aqui}

### Resultado Final
Sua solução estará acessível externamente através do Proxy Manager. Você terá isolamento de seus Servidores RustDesk de outros sistemas. Especialmente se você usar um sistema de configuração dividida e tiver outras aplicações / sites atrás de um NPM comum.
