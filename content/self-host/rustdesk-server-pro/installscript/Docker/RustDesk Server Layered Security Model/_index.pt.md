---
title: Modelo de Segurança em Camadas do Servidor RustDesk
weight: 100
---

Gentilmente escrito por [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

## Camadas
- [RustDesk](https://github.com/rustdesk/rustdesk) Ferramenta de Suporte Remoto
- [NPM](https://nginxproxymanager.com/) Ferramenta de Gerenciamento de Proxy
- [Docker](https://www.docker.com) Ferramenta de Containerização
- Ferramenta de Firewall

### Suposições
Este exemplo é um Tudo-em-Um para hospedar apenas serviços RustDesk. Isso pode ser expandido para uma solução mais flexível dividindo o NPM em seu próprio Docker Compose.
- Rede DMZ: 192.168.1.0/24
  - NPM (Externo): 192.168.1.250
- Rede LAN: 10.0.0.0/24
- Rede RSBackend: 192.168.254.0/29
  - NPM (Interno): 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Host Docker: Linux
  - Cada aplicação tem uma pasta dedicada em `/opt/`.
- Nome do host: uniquehostname (Altere Isso)
- Nome DNS: rustdesk.example.com

Faça modificações nos exemplos conforme necessário.

## Preparar Docker
Você deve ter o Docker já instalado, este guia não entra nos detalhes específicos disso.

Você precisará criar uma rede para o Backend do Servidor RustDesk e a DMZ.
Para cada aplicação que você usa com o NPM (Nginx Proxy Manager), você deve ter uma rede backend dedicada para isolá-la.

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

## Configurar Firewall
Configure os seguintes redirecionamentos de porta/NAT do seu IP público para o Servidor NPM.
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # Se você quiser usar SSL

## Configurar Docker Compose
Isso iniciará um container com NPM e as redes corretas.

Copie o seguinte para docker-compose.yaml.

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
    hostname: uniquehostname   # Altere Isso
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

## Configurar NPM
Configure Hosts de Stream para as seguintes Portas:
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # captura tráfego local

Configure Host Proxy:
- Nome de Domínio: rustdesk.example.com
- Esquema: http
- Nome do Host / IP de Encaminhamento: 192.168.254.2
- Porta de Encaminhamento: 21114
- Bloquear Exploits Comuns: Marcado
- Opcional: Configurar SSL **(NÃO EXIGIR - O cliente precisa conseguir se comunicar sem SSL.)**

## Configurar Servidor RustDesk
Conecte-se à interface do servidor http://rustdesk.example.com ou https://rustdesk.example.com se você configurou SSL para a interface web.

## Configurar Cliente RustDesk
Configure o cliente:
- Servidor ID: rustdesk.example.com
- Servidor Relay: rustdesk.example.com
- Servidor API: http://rustdesk.example.com (use HTTPS se você configurou SSL)
- Chave: {Chave do Servidor Aqui}

## Resultado Final
Sua solução será acessível externamente através do gerenciador de proxy. Você terá isolamento de seus Servidores RustDesk de outros sistemas. Especialmente se você usar um sistema de configuração dividida e tiver outras aplicações / sites atrás de um NPM comum.