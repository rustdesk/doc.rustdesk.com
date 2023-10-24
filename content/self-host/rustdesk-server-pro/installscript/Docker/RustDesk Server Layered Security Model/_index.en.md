---
title: RustDesk Server Layered Security Model
weight: 100
---

Kindly written up by [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

### Layers
- [RustDesk](https://github.com/rustdesk/rustdesk) Remote Support Tool
- [NPM](https://nginxproxymanager.com/) Proxy Manager Tool
- [Docker](https://www.docker.com) Containerization Tool
- Firewall Tool

#### Assumptions
This example is an All in One for hosting just RustDesk services only. This can be expanded to a more flexible solution by splitting the NPM into it's own Docker Compose.
- DMZ Network: 192.168.1.0/24
  - NPM (External): 192.168.1.250
- LAN Network: 10.0.0.0/24
- RSBackend Network: 192.168.254.0/29
  - NPM (Internal): 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Docker Host: Linux
  - Each application has a dedicated folder in `/opt/`.
- Hostname: uniquehostname  (Change This)
- DNS Name: rustdesk.example.com

Make modifications to the examples as needed.

### Prepare Docker
You must have Docker already installed this guide does not go into the specifics of that.

You will need to create a network for the RustDesk Server Backend and the DMZ.
For each application you use with the NPM (Nginx Proxy Manager) you should have a dedicated backend network to isolate it.

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

### Setup Firewall
Configure the following Port forwarding/NAT ports from your public IP to the NPM Server.
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # If you want to use SSL

### Setup Docker Compose
This will start a container with NPM and the correct networks.

Copy the below into docker-compose.yaml.

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
Configure Stream Hosts for the following Ports:
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # catches local traffic

Configure Proxy Host:
- Domain Name: rustdesk.example.com
- Scheme: http
- Forward Hostname / IP: 192.168.254.2
- Forward Port: 21114
- Block Common Exploits: Checked
- Optional: Configure SSL **(DO NOT REQUIRE - Client needs to be able to communicate without SSL.)**

### Setup RustDesk Server
Connect to Server interface http://rustdesk.example.com or https://rustdesk.example.com if you have configured SSL for web interface.

### Setup RustDesk Client
Configure the client:
- ID Server: rustdesk.example.com
- Relay Server: rustdesk.example.com
- API Server: http://rustdesk.example.com (use HTTPS if you have configured SSL)
- Key: {Server Key Here}

### End Result
Your solution will be accessible externally through the Proxy manager. You will have isolation of your RustDesk Servers from other systems. Especially if you use a split configuration system and have other applications / sites behind a common NPM.
