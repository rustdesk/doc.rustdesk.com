---
title: Docker
weight: 7
---

> Aquí hay otro buen tutorial: [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Instale su propio servidor con Docker

### Requisitos
Necesita tener Docker/Podman instalado para ejecutar un rustdesk-server como contenedor Docker. Si tiene dudas, instale Docker con esta [guía](https://docs.docker.com/engine/install) para asegurar que esté lo más actualizado posible.

Asegúrese de abrir estos puertos en el firewall:
- `hbbs`:
  - `21114` (TCP): usado para consola web, solo disponible en la versión `Pro`.
  - `21115` (TCP): usado para la prueba de tipo NAT.
  - `21116` (TCP/UDP): **Tenga en cuenta que `21116` debe habilitarse tanto para TCP como para UDP.** `21116/UDP` se usa para el servicio de registro de ID y latido. `21116/TCP` se usa para TCP hole punching y servicio de conexión.
  - `21118` (TCP): usado para soportar clientes web.
- `hbbr`:
  - `21117` (TCP): usado para los servicios de Relay.
  - `21119` (TCP): usado para soportar clientes web.

*Si no necesita soporte para cliente web, los puertos correspondientes `21118`, `21119` pueden deshabilitarse.*

### Ejemplos Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` solo funciona en **Linux**, lo que hace que `hbbs`/`hbbr` vean la dirección IP real entrante en lugar de la IP del contenedor (172.17.0.1).
Si `--net=host` funciona bien, las opciones `-p` no se usan. Si en Windows, omita `sudo` y `--net=host`.

**Por favor, elimine `--net=host` si está teniendo problemas de conexión en su plataforma.**
{{% /notice %}}

{{% notice note %}}
Si no puede ver logs con `-td`, puede ver logs a través de `docker logs hbbs`. O puede ejecutar con `-it`, `hbbs/hbbr` no se ejecutará como modo daemon.
{{% /notice %}}

### Ejemplos Docker Compose
Para ejecutar los archivos Docker con el `compose.yml` como se describe aquí, necesita tener [Docker Compose](https://docs.docker.com/compose/) instalado.

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

Si necesita hacer cambios de configuración, por ejemplo, establecer ALWAYS_USE_RELAY=Y, puede usar environment en el docker-compose.yml

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

### Ejemplos Podman Quadlet

Si desea ejecutar los contenedores con Podman como servicio systemd, puede usar estas configuraciones de ejemplo de Podman Quadlet:

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

o

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