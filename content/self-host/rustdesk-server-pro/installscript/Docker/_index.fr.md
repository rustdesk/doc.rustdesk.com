---
title: Docker
weight: 3
---

## Docker Compose (Recommandé)

Avec Docker Compose, vous DEVEZ utiliser `network_mode: "host"` pour garantir que les licences fonctionnent. Installez Docker en utilisant ce [guide](https://docs.docker.com/engine/install) pour vous assurer qu'il est à jour !

Copiez le contenu ci-dessous dans `compose.yml`.

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

Ensuite, exécutez `sudo docker compose up -d` ou `podman-compose up -d`

> `sudo apt install podman-compose` pour l'installation de `podman-compose`

{{% notice note %}}
Comment [configurer HTTPS pour la console web manuellement](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

## Commandes Docker

Installez Docker avec ce [guide](https://docs.docker.com/engine/install) pour vous assurer qu'il est à jour !

Ou vous pouvez installer docker avec cette commande unique.

```
bash <(wget -qO- https://get.docker.com)
```

Exécutez les commandes suivantes (l'image s6 peut nécessiter `./data:/data` au lieu de `./data:/root`) :

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
L'exemple ci-dessus utilise `sudo` et `--net=host`, cela ne fonctionne pas sur Windows, veuillez supprimer ces commandes, si vous supprimez `--net=host`, veuillez vérifier ci-dessous.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Comment [configurer HTTPS pour la console web manuellement](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}


> Si vous avez un problème avec SELinux sur Fedora, veuillez vérifier ce [problème](https://github.com/rustdesk/rustdesk-server/issues/230).