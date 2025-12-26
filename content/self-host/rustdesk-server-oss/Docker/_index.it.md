---
title: Docker
weight: 7
---

> Ecco un altro buon tutorial: [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Installa il tuo server con Docker

### Requisiti
Devi avere Docker/Podman installato per eseguire un rustdesk-server come contenitore Docker. In caso di dubbi, installa Docker con questa [guida](https://docs.docker.com/engine/install) per assicurarti che sia il più aggiornato possibile!

Assicurati di aprire queste porte nel firewall:
- `hbbs`:
  - `21114` (TCP): usato per la console web, disponibile solo nella versione `Pro`.
  - `21115` (TCP): usato per il test del tipo NAT.
  - `21116` (TCP/UDP): **Si prega di notare che `21116` dovrebbe essere abilitato sia per TCP che per UDP.** `21116/UDP` è usato per il servizio di registrazione ID e heartbeat. `21116/TCP` è usato per TCP hole punching e servizio di connessione.
  - `21118` (TCP): usato per supportare i client web.
- `hbbr`:
  - `21117` (TCP): usato per i servizi di Relay.
  - `21119` (TCP): usato per supportare i client web.

*Se non hai bisogno del supporto client web, le porte corrispondenti `21118`, `21119` possono essere disabilitate.*

### Esempi Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funziona solo su **Linux**, il che fa sì che `hbbs`/`hbbr` vedano il vero indirizzo IP in arrivo invece dell'IP del contenitore (172.17.0.1).
Se `--net=host` funziona bene, le opzioni `-p` non vengono utilizzate. Se su Windows, ometti `sudo` e `--net=host`.

**Si prega di rimuovere `--net=host` se stai avendo problemi di connessione sulla tua piattaforma.**
{{% /notice %}}

{{% notice note %}}
Se non riesci a vedere i log con `-td`, puoi vedere i log tramite `docker logs hbbs`. Oppure puoi eseguire con `-it`, `hbbs/hbbr` non verranno eseguiti come modalità daemon.
{{% /notice %}}

### Esempi Docker Compose
Per eseguire i file Docker con il `compose.yml` come descritto qui, devi avere [Docker Compose](https://docs.docker.com/compose/) installato.

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

Se devi apportare modifiche alla configurazione, ad esempio impostare ALWAYS_USE_RELAY=Y, puoi usare environment nel docker-compose.yml

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

### Esempi Podman Quadlet

Se vuoi eseguire i contenitori con Podman come servizio systemd, puoi usare queste configurazioni di esempio di Podman Quadlet:

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