---
title: Docker
weight: 3
---

## Docker Compose (zalecane)

W przypadku Docker Compose MUSISZ użyć `network_mode: "host"`, aby zapewnić prawidłowe działanie licencji. Zainstaluj Docker, korzystając z tego [przewodnika](https://docs.docker.com/engine/install), aby mieć pewność, że będzie to najnowsza wersja!

Skopiuj poniższy tekst do pliku `compose.yml`.

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

Następnie uruchom `sudo docker compose up -d` lub `podman-compose up -d`

> `sudo apt install podman-compose` w celu zainstalowania `podman-compose`

{{% notice note %}}
[Jak ręcznie skonfigurować protokół HTTPS dla konsoli internetowej](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

## Polecenia Dockera

Zainstaluj Docker zgodnie z tym [przewodnikiem](https://docs.docker.com/engine/install), aby mieć pewność, że jest on w najnowszej wersji!

Możesz też zainstalować Docker za pomocą tego polecenia.

```
bash <(wget -qO- https://get.docker.com)
```

Uruchom następujące polecenia (obraz s6 może wymagać `./data:/data` zamiast `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
W powyższym przykładzie użyto poleceń `sudo` i `--net=host`. Nie będą one działać w systemie Windows. Proszę usunąć te polecenia. Jeśli usuniesz `--net=host`, sprawdź poniższe informacje.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
[Jak ręcznie skonfigurować protokół HTTPS dla konsoli internetowej](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}


> Jeśli masz problem z SELinux w systemie Fedora, sprawdź tę [kwestię](https://github.com/rustdesk/rustdesk-server/issues/230).
