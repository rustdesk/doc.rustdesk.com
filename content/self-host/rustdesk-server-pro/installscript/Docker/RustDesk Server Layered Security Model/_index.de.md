---
title: RustDesk Servers mehrschichtiges Sicherheitsmodell
weight: 100
---

Freundlicherweise aufgeschrieben von [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

### Schichten
- [RustDesk](https://github.com/rustdesk/rustdesk) Werkzeug zur Fernunterstützung
- [NPM](https://nginxproxymanager.com/) Proxy-Manager-Werkzeug
- [Docker](https://www.docker.com) Werkzeug zur Containerisierung
- Firewall Tool

#### Voraussetzungen
Bei diesem Beispiel handelt es sich um eine All-in-one-Lösung, die nur die RustDesk-Dienste hostet. Dies kann zu einer flexibleren Lösung erweitert werden, indem der NPM in eine eigene Docker Compose aufgeteilt wird.
- DMZ-Netzwerk: 192.168.1.0/24
  - NPM (extern): 192.168.1.250
- LAN-Netzwerk: 10.0.0.0/24
- RSBackend-Netzwerk: 192.168.254.0/29
  - NPM (intern): 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Docker-Host: Linux
  - Jede Anwendung hat einen eigenen Ordner in `/opt/`.
- Hostname: uniquehostname (dies ändern)
- DNS-Name: rustdesk.example.com

Ändern Sie die Beispiele nach Bedarf ab.

### Docker vorbereiten
Sie müssen Docker bereits installiert haben. Diese Anleitung geht nicht auf die Einzelheiten ein.

Sie müssen ein Netzwerk für das RustDesk Server-Backend und die DMZ erstellen.
Für jede Anwendung, die Sie mit dem NPM (Nginx Proxy Manager) verwenden, sollten Sie ein eigenes Backend-Netzwerk haben, um sie zu isolieren.

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

### Firewall einrichten
Konfigurieren Sie die folgenden Portweiterleitungen/NAT-Ports von Ihrer öffentlichen IP-Adresse zum NPM-Server.
- 21114 → 8080 TCP
- 21115 → 21115 TCP
- 21116 → 21116 TCP/UDP
- 21117 → 21117 TCP
- 21118 → 21118 TCP
- 21119 → 21119 TCP
- 443 → 443 TCP  # Wenn Sie SSL verwenden möchten

### Docker Compose einrichten
Dadurch wird ein Container mit NPM und den richtigen Netzwerken gestartet.

Kopieren Sie den folgenden Text in die Datei docker-compose.yaml.

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
    hostname: uniquehostname   # dies ändern
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

### NPM einrichten
Stream Hosts für die folgenden Ports konfigurieren:
- 21115 → 192.168.254.2:21115 TCP
- 21116 → 192.168.254.2:21116 TCP / UDP
- 21117 → 192.168.254.3:21117 TCP
- 21118 → 192.168.254.2:21118 TCP
- 21119 → 192.168.254.3:21119 TCP
- 80 → 127.0.0.1:8080 TCP # erfasst den lokalen Verkehr

Proxy-Host konfigurieren:
- Domainname: rustdesk.example.com
- Schema: http
- Weiterleitung des Hostnamens / IP: 192.168.254.2
- Weiterleitungsport: 21114
- Verbreitete Exploits blockieren: überprüft
- Optional: SSL konfigurieren **(NICHT ERFORDERLICH - Der Client muss in der Lage sein, ohne SSL zu kommunizieren.)**

### RustDesk Server einrichten
Verbinden Sie sich mit der Server-Schnittstelle http://rustdesk.example.com oder https://rustdesk.example.com, wenn Sie SSL für die Web-Schnittstelle konfiguriert haben.

### RustDesk-Client einrichten
Den Client konfigurieren:
- ID-Server: rustdesk.example.com
- Relay-Server: rustdesk.example.com
- API-Server: http://rustdesk.example.com (HTTPS verwenden, wenn Sie SSL konfiguriert haben)
- Key: {Serverschlüssel hier}

### Endergebnis
Ihre Lösung wird von außen über den Proxy-Manager erreichbar sein. Sie können Ihre RustDesk-Server von anderen Systemen isolieren. Insbesondere, wenn Sie ein geteiltes Konfigurationssystem verwenden und andere Anwendungen bzw. Sites hinter einem gemeinsamen NPM haben.
