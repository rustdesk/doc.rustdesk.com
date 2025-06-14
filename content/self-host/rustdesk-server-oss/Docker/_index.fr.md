---
title: Docker
weight: 7
---

> Voici un autre bon tutoriel : [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

### Installez votre propre serveur avec Docker

#### Exigences
Vous devez avoir Docker/Podman installé pour exécuter un rustdesk-server en tant que conteneur Docker. En cas de doute, installez Docker avec ce [guide](https://docs.docker.com/engine/install) pour vous assurer qu'il soit le plus à jour possible !

Assurez-vous d'ouvrir ces ports dans le pare-feu :
- `hbbs`:
  - `21114` (TCP): utilisé pour la console web, disponible uniquement dans la version `Pro`.
  - `21115` (TCP): utilisé pour le test de type NAT.
  - `21116` (TCP/UDP): **Veuillez noter que `21116` doit être activé à la fois pour TCP et UDP.** `21116/UDP` est utilisé pour le service d'enregistrement d'ID et de battement de cœur. `21116/TCP` est utilisé pour le TCP hole punching et le service de connexion.
  - `21118` (TCP): utilisé pour prendre en charge les clients web.
- `hbbr`:
  - `21117` (TCP): utilisé pour les services de Relais.
  - `21119` (TCP): utilisé pour prendre en charge les clients web.

*Si vous n'avez pas besoin du support client web, les ports correspondants `21118`, `21119` peuvent être désactivés.*

#### Exemples Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` ne fonctionne que sur **Linux**, ce qui fait que `hbbs`/`hbbr` voient la vraie adresse IP entrante plutôt que l'IP du conteneur (172.17.0.1).
Si `--net=host` fonctionne bien, les options `-p` ne sont pas utilisées. Si sur Windows, omettez `sudo` et `--net=host`.

**Veuillez supprimer `--net=host` si vous rencontrez des problèmes de connexion sur votre plateforme.**
{{% /notice %}}

{{% notice note %}}
Si vous ne pouvez pas voir les logs avec `-td`, vous pouvez voir les logs via `docker logs hbbs`. Ou vous pouvez exécuter avec `-it`, `hbbs/hbbr` ne s'exécuteront pas en mode daemon.
{{% /notice %}}

#### Exemples Docker Compose
Pour exécuter les fichiers Docker avec le `compose.yml` comme décrit ici, vous devez avoir [Docker Compose](https://docs.docker.com/compose/) installé.

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

Si vous devez apporter des modifications de configuration, par exemple définir ALWAYS_USE_RELAY=Y, vous pouvez utiliser environment dans le docker-compose.yml

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

#### Exemples Podman Quadlet

Si vous souhaitez exécuter les conteneurs avec Podman en tant que service systemd, vous pouvez utiliser ces exemples de configurations Podman Quadlet :

```ini
[Container]
AutoUpdate=registry
Image=ghcr.io/rustdesk/rustdesk-server:latest
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
Image=ghcr.io/rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```