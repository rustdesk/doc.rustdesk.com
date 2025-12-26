---
title: Docker
weight: 7
---

> Tutaj jest inny dobry poradnik: [Tworzenie własnego rozwiązania zdalnego pulpitu: RustDesk hostowany samodzielnie w chmurze za pomocą Dockera (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Zainstaluj twój własny serwer za pomocą Dockera

### Wymagania

Potrzebujesz zainstalowanego Dockera/Podmana aby uruchomić rustdesk-server jako kontener Dockerowy. W razie wątpliwości, zainstaluj Dockera przy użyciu tego [poradnika](https://docs.docker.com/engine/install) aby upewnić się, że wszystko jest aktulane.

Upewnij się, że zezwoliłeś na te porty w zaporze:
- `hbbs`:
  - `21114` (TCP): używany do konsoli webowej, dostępnej wyłącznie w wersji `Pro`.
  - `21115` (TCP): używany do testowania typu NAT.
  - `21116` (TCP/UDP): **Zwróć uwagę, że `21116` powinien być zezwolony zarówno dla TCP jak i UDP.** `21116/UDP` jest używany do rejestracji ID i usługi heartbeat. `21116/TCP` jest używany do przebijania się przez NAT (TCP) i usługi połączeniowej.
  - `21118` (TCP): używany do obsługi klientów webowych.
- `hbbr`:
  - `21117` (TCP): używany do usług serwera przekaźnikowego.
  - `21119` (TCP): używany do obsługi klientów webowych.

*Jeżeli nie potrzebujesz obsługi klientów webowych, porty `21118` i `21119` mogą zostać zablokowane.*

### Przykłady z Dockerem

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` działa wyłącznie na **Linuxie** i sprawia, że `hbbs`/`hbbr` widzi prawdziwy przychodzący adres IP, a nie adres kontenera (172.17.0.1). 
Jeżeli `--net=host` działa poprawnie, parametry `-p` nie są używany. Jeżeli działasz na Windowsie, nie używaj `sudo` ani `--net=host`.

**Usuń `--net=host` jeżeli masz problemy z połączeniem na twojej platformie.**
{{% /notice %}}

{{% notice note %}}
Jeżeli nie widzisz logów używając `-td`, możesz podejrzeć logi za pomocą `docker logs hbbs`. Możesz także uruchomić kontenery za pomocą `-it`, wtedy `hbbs/hbbr` nie zostaną uruchomione w trybie daemona.
{{% /notice %}}

### Przykłady z Docker Composem
Aby uruchomić pliki Docker z plikiem `compose.yml` zgodnie z opisem tutaj, musisz mieć zainstalowany [Docker Compose](https://docs.docker.com/compose/).

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

Jeśli chcesz wprowadzić zmiany w konfiguracji, np. ustawić ALWAYS_USE_RELAY=Y, możesz ustawić zmienne środowiskowe w pliku docker-compose.yml.

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

### Przykłady z Podmanem Quadlet

Jeśli chcesz uruchomić kontenery za pomocą Podman jako usługę systemd, możesz skorzystać z poniższych przykładowych konfiguracji Podman Quadlet:

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

or

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
