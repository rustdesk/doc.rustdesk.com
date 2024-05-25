---
title: Docker
weight: 6
---

### Docker

Install Docker with this [guide](https://docs.docker.com/engine/install) to ensure its the most up to date!

Run the following commands (s6 image may need `./data:/data` instead of `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
The above example uses `sudo` and `--net=host`, this will not work on Windows please remove these commands, if you remove `--net=host` please check below.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

### Docker Compose

With Docker Compose you HAVE to use `network_mode: "host"` to ensure licensing works. Install Docker using this [guide](https://docs.docker.com/engine/install) to ensure its the most up to date!

Copy the below into `compose.yml`.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

The run `docker compose up -d`.

> If you have problem with seLinux on Fedora, please check this [issue](https://github.com/rustdesk/rustdesk-server/issues/230).

{{% notice note %}}
How to [Set up HTTPS for web console manually](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}
