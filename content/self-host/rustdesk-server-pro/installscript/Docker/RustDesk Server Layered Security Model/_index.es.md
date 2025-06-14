---
title: Modelo de Seguridad por Capas del Servidor RustDesk
weight: 100
---

Amablemente escrito por [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot).

### Capas
- [RustDesk](https://github.com/rustdesk/rustdesk) Herramienta de Soporte Remoto
- [NPM](https://nginxproxymanager.com/) Herramienta de Gestión de Proxy
- [Docker](https://www.docker.com) Herramienta de Contenedorización
- Herramienta de Firewall

#### Suposiciones
Este ejemplo es un Todo en Uno para alojar solo servicios RustDesk. Esto puede expandirse a una solución más flexible dividiendo el NPM en su propio Docker Compose.
- Red DMZ: 192.168.1.0/24
  - NPM (Externo): 192.168.1.250
- Red LAN: 10.0.0.0/24
- Red RSBackend: 192.168.254.0/29
  - NPM (Interno): 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Host Docker: Linux
  - Cada aplicación tiene una carpeta dedicada en `/opt/`.
- Nombre de host: uniquehostname (Cambia Esto)
- Nombre DNS: rustdesk.example.com

Realiza modificaciones a los ejemplos según sea necesario.

### Preparar Docker
Debes tener Docker ya instalado, esta guía no entra en los detalles específicos de eso.

Necesitarás crear una red para el Backend del Servidor RustDesk y la DMZ.
Para cada aplicación que uses con el NPM (Nginx Proxy Manager) deberías tener una red backend dedicada para aislarla.

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

### Configurar Firewall
Configura los siguientes puertos de reenvío/NAT desde tu IP pública al Servidor NPM.
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # Si quieres usar SSL

### Configurar Docker Compose
Esto iniciará un contenedor con NPM y las redes correctas.

Copia lo siguiente en docker-compose.yaml.

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
    hostname: uniquehostname   # Cambia Esto
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

### Configurar NPM
Configura Hosts de Stream para los siguientes Puertos:
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # captura tráfico local

Configura Host Proxy:
- Nombre de Dominio: rustdesk.example.com
- Esquema: http
- Nombre de Host / IP de Reenvío: 192.168.254.2
- Puerto de Reenvío: 21114
- Bloquear Exploits Comunes: Marcado
- Opcional: Configurar SSL **(NO REQUERIR - El cliente necesita poder comunicarse sin SSL.)**

### Configurar Servidor RustDesk
Conéctate a la interfaz del servidor http://rustdesk.example.com o https://rustdesk.example.com si has configurado SSL para la interfaz web.

### Configurar Cliente RustDesk
Configura el cliente:
- Servidor ID: rustdesk.example.com
- Servidor Relay: rustdesk.example.com
- Servidor API: http://rustdesk.example.com (usa HTTPS si has configurado SSL)
- Clave: {Clave del Servidor Aquí}

### Resultado Final
Tu solución será accesible externamente a través del gestor de proxy. Tendrás aislamiento de tus Servidores RustDesk de otros sistemas. Especialmente si usas un sistema de configuración dividida y tienes otras aplicaciones / sitios detrás de un NPM común.