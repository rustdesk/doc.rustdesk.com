---
title: Docker
weight: 3
description: "Установка RustDesk Server Pro с помощью Docker Compose с сетью хоста для работы лицензии. Развёртывание hbbs, hbbr и веб-консоли Pro с готовым файлом compose."
keywords: ["rustdesk server pro docker", "rustdesk pro docker compose", "rustdesk pro host network", "rustdesk hbbs hbbr docker", "rustdesk self-host pro docker"]
---

В этом руководстве описано, как установить RustDesk Server Pro с помощью Docker Compose и обязательной настройки сети хоста.

## Как лучше всего развернуть RustDesk Server Pro в Docker?

Для большинства развёртываний RustDesk Server Pro на Linux рекомендуется Docker Compose с `network_mode: "host"`. Так `hbbs` и `hbbr` описаны в одной воспроизводимой конфигурации, и не возникает проблем с лицензией, которые бывают без сети хоста.

## Порядок развёртывания RustDesk Server Pro в Docker

1. Установите Docker.
2. Создайте постоянную папку `data` для файлов RustDesk, например ключей и базы данных.
3. Запустите `hbbs` и `hbbr` с помощью Docker Compose.
4. Откройте нужные порты RustDesk, особенно `21114`, если обращаетесь к веб-консоли напрямую.
5. Если веб-консоль должна работать на домене, отдельно настройте HTTPS.

## Когда использовать Compose, а когда `docker run`?

Для долговременных рабочих развёртываний и обновлений используйте Docker Compose. Команды `docker run` подходят в основном для тестирования, отладки или случаев, когда нужен полный ручной контроль над каждым контейнером.

## Docker Compose (рекомендуется) {#docker-compose}

С Docker Compose ОБЯЗАТЕЛЬНО используйте `network_mode: "host"`, иначе лицензия не будет работать. Установите Docker по этому [руководству](https://docs.docker.com/engine/install), чтобы получить самую свежую версию!

Скопируйте следующее в `compose.yml`.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

Затем выполните `sudo docker compose up -d` или `podman-compose up -d`

> `podman-compose` устанавливается командой `sudo apt install podman-compose`

{{% notice note %}}
Как [настроить HTTPS для веб-консоли вручную](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

## Команды Docker

Установите Docker по этому [руководству](https://docs.docker.com/engine/install), чтобы получить самую свежую версию!

Или установите Docker одной командой.

```
bash <(wget -qO- https://get.docker.com)
```

Выполните следующие команды (для образа s6 может понадобиться `./data:/data` вместо `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
В примере выше используются `sudo` и `--net=host`, которые не работают в Windows, — уберите их. Если вы убираете `--net=host`, см. ниже.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Как [настроить HTTPS для веб-консоли вручную](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}


> Если в Fedora возникают проблемы с SELinux, см. это [обсуждение](https://github.com/rustdesk/rustdesk-server/issues/230).
