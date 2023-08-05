---
title: Pro
weight: 100
---

Self-host Pro has more features compared to the open source version.

- OIDC, LDAP, 2FA (email verification)
- Address book
- Rename
- Log management
- Device management
- Settings sync
- Permission control
- Multiple relay servers (automatically selects your closest relay)

{{% notice note %}}
RustDesk client >= 1.2.0 required
{{% /notice %}}

## Download

[https://github.com/rustdesk/rustdesk-server-pro/releases/latest](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)

## Installation

### Simple Install

To make life easy, we have developed scripts which take care of everything (install/upgrade/convert from open source) [Simple Install Script](https://rustdesk.com/docs/en/self-host/pro/installscript/).

{{% notice note %}}
Don't forget to get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
{{% /notice %}}

### Manual Installation

Almost as the same as [the open source version](/docs/en/self-host/install/), but you do not need to run hbbs/hbbr with any arguments, all can be set later in web console.

- `-k _` is set by default
- `-r <server:host>` is not needed any more if the relay server runs on the same machine with hbbs, and you can set multiple relay servers in the web console

### One more port (or use a proxy)

One more TCP port `21114` is added for web console, please also add this port when you set firewall rules and docker port mapping.

### Docker

Install Docker with (this)[https://docs.docker.com/engine/install/] guide.

Run the following commands:
```bash
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v `pwd`:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v `pwd`:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```
{{% notice note %}}
The above example uses `sudo` and `--net=host`, this will not work on windows please remove these commands, if you remove `--net=host` please check below.
{{% /notice %}}

```bash
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
```

### Docker Compose

With Docker Compose you HAVE to use `network_mode: "host"`. Install using (this)[https://docs.docker.com/engine/install/] guide.

Copy the below into docker-compose.yml

```yaml
version: '3'

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

The run `docker compose up -d`
