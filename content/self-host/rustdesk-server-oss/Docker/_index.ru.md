---
title: Docker
weight: 7
description: "Развёртывание RustDesk Server OSS с помощью Docker, Docker Compose или Podman. Нужные порты, особенности сети хоста и примеры определений контейнеров для hbbs и hbbr."
keywords: ["rustdesk docker", "rustdesk docker compose", "rustdesk server docker", "rustdesk hbbs hbbr docker", "rustdesk podman", "rustdesk self-host docker"]
---

В этом руководстве описано, как развернуть RustDesk Server OSS с помощью Docker, Docker Compose или Podman и какие порты открыть для `hbbs` и `hbbr`.

## Как лучше всего запускать RustDesk Server OSS в Docker?

Для большинства развёртываний на Linux проще и надёжнее всего Docker Compose с `network_mode: "host"`. Такую настройку легко повторить, обновления проходят проще, а при доступной сети хоста не нужно возиться с пробросом портов.

## Порядок развёртывания в Docker

1. Установите Docker или Podman.
2. Создайте постоянную папку или том для данных `hbbs` и `hbbr`.
3. Откройте нужные порты RustDesk в брандмауэре.
4. Запустите `hbbs` и `hbbr` с помощью Docker Compose, `docker run` или Podman Quadlet.
5. Укажите клиентам новый собственный сервер и проверьте регистрацию и работу ретранслятора.

## Какую схему с контейнерами выбрать?

| Способ | Кому подходит | Зачем его использовать |
| --- | --- | --- |
| Docker Compose | Большинству серверов на Linux | Повторяемая настройка и более простое обслуживание |
| `docker run` | Для быстрой проверки вручную | Самый быстрый способ запустить пару простых контейнеров |
| Podman Quadlet | Окружениям с Podman и systemd | Управление службами в стиле systemd |

> Ещё одно хорошее руководство (на английском языке): [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Установка собственного сервера с Docker

### Требования
Чтобы запустить rustdesk-server в контейнере Docker, нужен установленный Docker или Podman. Если сомневаетесь, установите Docker по этому [руководству](https://docs.docker.com/engine/install), чтобы получить самую свежую версию!

Обязательно откройте в брандмауэре следующие порты:
- `hbbs`:
  - `21114` (TCP): веб-консоль, доступна только в версии `Pro`.
  - `21115` (TCP): проверка типа NAT.
  - `21116` (TCP/UDP): **обратите внимание, что `21116` нужно открыть и для TCP, и для UDP.** `21116/UDP` используется для регистрации ID и служебных сигналов (heartbeat). `21116/TCP` используется для пробивки NAT через TCP и установления соединений.
  - `21118` (TCP): поддержка веб-клиентов.
- `hbbr`:
  - `21117` (TCP): службы ретрансляции.
  - `21119` (TCP): поддержка веб-клиентов.

*Если поддержка веб-клиента не нужна, соответствующие порты `21118` и `21119` можно закрыть.*

{{% notice warning %}}
Когда включён WebSocket (порты `21118`/`21119` открыты для [веб-клиента](https://rustdesk.com/web/)), `hbbs`/`hbbr` доверяют заголовкам `X-Real-IP` / `X-Forwarded-For` входящих WebSocket-соединений, чтобы определить настоящий IP-адрес клиента, — так IP-адрес клиента сохраняется, когда трафик WebSocket проходит через обратный прокси ([WSS](/docs/ru/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms)). Эти заголовки не проверяются, поэтому любой, кто может напрямую подключиться к `21118`/`21119`, может подделать заголовки и выдать себя за произвольный IP-адрес. Это позволяет обойти ограничения частоты запросов и блокировки по IP и подменить IP-адреса в журналах.

Если вы используете веб-клиент, открывайте порты WebSocket только через обратный прокси, который сам устанавливает `X-Real-IP`, и ограничьте доступ к `21118`/`21119` правилами брандмауэра так, чтобы к ним мог подключаться только обратный прокси. Если вы не используете веб-клиент, держите порты `21118` и `21119` закрытыми.
{{% /notice %}}

### Примеры для Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` работает только в **Linux**: с ним `hbbs`/`hbbr` видят настоящий IP-адрес входящих соединений, а не IP-адрес контейнера (172.17.0.1).
Если `--net=host` работает нормально, параметры `-p` не используются. В Windows уберите `sudo` и `--net=host`.

**Если на вашей платформе возникают проблемы с подключением, уберите `--net=host`.**
{{% /notice %}}

{{% notice note %}}
Если с `-td` не видно журналов, их можно посмотреть командой `docker logs hbbs`. Или запустите с `-it`, тогда `hbbs/hbbr` не будут работать в фоновом режиме.
{{% /notice %}}

### Примеры для Docker Compose
Чтобы запускать контейнеры с файлом `compose.yml`, как описано здесь, нужен установленный [Docker Compose](https://docs.docker.com/compose/).

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

Если нужно изменить настройки, например задать ALWAYS_USE_RELAY=Y, используйте раздел environment в docker-compose.yml

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

### Примеры для Podman Quadlet

Если вы хотите запускать контейнеры с Podman как службу systemd, используйте эти примеры конфигураций Podman Quadlet:

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

или

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
