---
title: Modèle de Sécurité à Couches du Serveur RustDesk
weight: 100
---

Aimablement rédigé par [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

### Couches
- [RustDesk](https://github.com/rustdesk/rustdesk) Outil de Support à Distance
- [NPM](https://nginxproxymanager.com/) Outil de Gestion de Proxy
- [Docker](https://www.docker.com) Outil de Conteneurisation
- Outil de Pare-feu

#### Hypothèses
Cet exemple est un Tout-en-Un pour héberger uniquement les services RustDesk. Cela peut être étendu à une solution plus flexible en séparant le NPM dans son propre Docker Compose.
- Réseau DMZ : 192.168.1.0/24
  - NPM (Externe) : 192.168.1.250
- Réseau LAN : 10.0.0.0/24
- Réseau RSBackend : 192.168.254.0/29
  - NPM (Interne) : 192.168.254.1
  - HBBS : 192.168.254.2
  - HBBR : 192.168.254.3
- Hôte Docker : Linux
  - Chaque application a un dossier dédié dans `/opt/`.
- Nom d'hôte : uniquehostname (Changez Ceci)
- Nom DNS : rustdesk.example.com

Apportez des modifications aux exemples selon vos besoins.

### Préparer Docker
Vous devez avoir Docker déjà installé, ce guide n'entre pas dans les spécificités de cela.

Vous devrez créer un réseau pour le Backend du Serveur RustDesk et la DMZ.
Pour chaque application que vous utilisez avec le NPM (Nginx Proxy Manager), vous devriez avoir un réseau backend dédié pour l'isoler.

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

### Configurer le Pare-feu
Configurez les ports de redirection/NAT suivants de votre IP publique vers le serveur NPM.
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # Si vous voulez utiliser SSL

### Configurer Docker Compose
Cela démarrera un conteneur avec NPM et les réseaux corrects.

Copiez le contenu ci-dessous dans docker-compose.yaml.

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
    hostname: uniquehostname   # Changez Ceci
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

### Configurer NPM
Configurez les Hôtes de Flux pour les Ports suivants :
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # capture le trafic local

Configurez l'Hôte Proxy :
- Nom de Domaine : rustdesk.example.com
- Schéma : http
- Nom d'hôte / IP de Redirection : 192.168.254.2
- Port de Redirection : 21114
- Bloquer les Exploits Communs : Coché
- Optionnel : Configurer SSL **(NE PAS EXIGER - Le client doit pouvoir communiquer sans SSL.)**

### Configurer le Serveur RustDesk
Connectez-vous à l'interface serveur http://rustdesk.example.com ou https://rustdesk.example.com si vous avez configuré SSL pour l'interface web.

### Configurer le Client RustDesk
Configurez le client :
- Serveur ID : rustdesk.example.com
- Serveur Relais : rustdesk.example.com
- Serveur API : http://rustdesk.example.com (utilisez HTTPS si vous avez configuré SSL)
- Clé : {Clé Serveur Ici}

### Résultat Final
Votre solution sera accessible de l'extérieur par le gestionnaire de proxy. Vous aurez l'isolement de vos serveurs RustDesk des autres systèmes. Surtout si vous utilisez un système de configuration divisée et avez d'autres applications / sites derrière un NPM commun.