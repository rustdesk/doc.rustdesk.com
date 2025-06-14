---
title: Modello di Sicurezza a Livelli del Server RustDesk
weight: 100
---

Gentilmente scritto da [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

### Livelli
- [RustDesk](https://github.com/rustdesk/rustdesk) Strumento di Supporto Remoto
- [NPM](https://nginxproxymanager.com/) Strumento di Gestione Proxy
- [Docker](https://www.docker.com) Strumento di Containerizzazione
- Strumento Firewall

#### Assunzioni
Questo esempio è un Tutto-in-Uno per ospitare solo servizi RustDesk. Questo può essere espanso a una soluzione più flessibile dividendo l'NPM nel proprio Docker Compose.
- Rete DMZ: 192.168.1.0/24
  - NPM (Esterno): 192.168.1.250
- Rete LAN: 10.0.0.0/24
- Rete RSBackend: 192.168.254.0/29
  - NPM (Interno): 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Host Docker: Linux
  - Ogni applicazione ha una cartella dedicata in `/opt/`.
- Nome host: uniquehostname (Cambia Questo)
- Nome DNS: rustdesk.example.com

Apporta modifiche agli esempi secondo necessità.

### Preparare Docker
Devi avere Docker già installato, questa guida non entra nei dettagli specifici di questo.

Dovrai creare una rete per il Backend del Server RustDesk e la DMZ.
Per ogni applicazione che usi con l'NPM (Nginx Proxy Manager) dovresti avere una rete backend dedicata per isolarla.

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

### Configurare Firewall
Configura i seguenti inoltri porta/NAT porte dal tuo IP pubblico al Server NPM.
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # Se vuoi usare SSL

### Configurare Docker Compose
Questo avvierà un container con NPM e le reti corrette.

Copia quanto segue in docker-compose.yaml.

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
    hostname: uniquehostname   # Cambia Questo
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

### Configurare NPM
Configura Host Stream per le seguenti Porte:
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # cattura traffico locale

Configura Host Proxy:
- Nome Dominio: rustdesk.example.com
- Schema: http
- Nome Host / IP di Inoltro: 192.168.254.2
- Porta di Inoltro: 21114
- Blocca Exploit Comuni: Spuntato
- Opzionale: Configura SSL **(NON RICHIEDERE - Il client deve essere in grado di comunicare senza SSL.)**

### Configurare Server RustDesk
Collegati all'interfaccia server http://rustdesk.example.com o https://rustdesk.example.com se hai configurato SSL per l'interfaccia web.

### Configurare Client RustDesk
Configura il client:
- Server ID: rustdesk.example.com
- Server Relay: rustdesk.example.com
- Server API: http://rustdesk.example.com (usa HTTPS se hai configurato SSL)
- Chiave: {Chiave Server Qui}

### Risultato Finale
La tua soluzione sarà accessibile esternamente attraverso il gestory proxy. Avrai l'isolamento dei tuoi Server RustDesk da altri sistemi. Specialmente se usi un sistema di configurazione divisa e hai altre applicazioni / siti dietro un NPM comune.