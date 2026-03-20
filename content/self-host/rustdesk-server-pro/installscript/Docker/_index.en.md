---
title: Docker
weight: 3
description: "Install RustDesk Server Pro with Docker Compose using host networking for licensing. Use this guide to deploy hbbs, hbbr, and the Pro web console with the provided compose file."
keywords: ["rustdesk server pro docker", "rustdesk pro docker compose", "rustdesk pro host network", "rustdesk hbbs hbbr docker", "rustdesk self-host pro docker"]
---

Use this guide to install RustDesk Server Pro with Docker Compose and the required host networking configuration.

## What is the recommended Docker setup for RustDesk Server Pro?

Docker Compose with `network_mode: "host"` is the recommended setup for most Linux-based RustDesk Server Pro deployments. It keeps `hbbs` and `hbbr` together in one reproducible configuration and avoids licensing issues that can appear when host networking is not used.

## RustDesk Server Pro Docker checklist

1. Install Docker.
2. Create a persistent `data` directory for RustDesk files such as keys and the database.
3. Start `hbbs` and `hbbr` with Docker Compose.
4. Open the required RustDesk ports, especially `21114` if you use the web console directly.
5. Add HTTPS separately if you want the web console behind a domain.

## When should you use Compose instead of raw `docker run`?

Use Docker Compose for long-lived production deployments and upgrades. Use raw `docker run` commands mainly for testing, debugging, or environments where you want fully manual control over each container.

## Docker Compose (Recommended)

With Docker Compose you HAVE to use `network_mode: "host"` to ensure licensing works. Install Docker using this [guide](https://docs.docker.com/engine/install) to ensure its the most up to date!

Copy the below into `compose.yml`.

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

Then run `sudo docker compose up -d` or `podman-compose up -d`

> `sudo apt install podman-compose` for `podman-compose` installation

{{% notice note %}}
How to [Set up HTTPS for web console manually](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

## Docker Commands

Install Docker with this [guide](https://docs.docker.com/engine/install) to ensure its the most up to date!

Or you can install docker with this single command.

```
bash <(wget -qO- https://get.docker.com)
```

Run the following commands (s6 image may need `./data:/data` instead of `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
The above example uses `sudo` and `--net=host`, this will not work on Windows please remove these commands, if you remove `--net=host` please check below.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
How to [Set up HTTPS for web console manually](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}


> If you have problem with SELinux on Fedora, please check this [issue](https://github.com/rustdesk/rustdesk-server/issues/230).
