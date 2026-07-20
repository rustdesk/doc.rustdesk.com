---
title: Installation
weight: 1
description: "Install RustDesk Server OSS with Docker, systemd scripts, or Debian packages. Review server requirements, firewall rules, and the client configuration steps required after deployment."
keywords: ["rustdesk server install", "install rustdesk server oss", "rustdesk docker install", "rustdesk server firewall ports", "rustdesk hbbs hbbr install", "rustdesk self-host install"]
---

Use this guide to install RustDesk Server OSS, open the required firewall ports, and connect clients to the new self-hosted server.

## What is the recommended way to install RustDesk Server OSS?

For most deployments, Docker is the recommended installation method because it is the easiest to reproduce, upgrade, and move between servers. If you prefer native services on Linux, a systemd install script or Debian packages can also work well.

## Which installation method should you choose?

| Method | Best for | Why you would use it |
| --- | --- | --- |
| Docker | Most self-hosted deployments | Simplest upgrades, predictable setup, and easy rollback |
| install script | Linux admins who want systemd services quickly | Sets up `hbbs`, `hbbr`, and a client config flow with less manual work |
| Debian package | Debian-based systems using package tooling | Keeps installation closer to native package management |

## Video tutorials
There are many video tutorials on YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Server Requirements
The hardware requirements are very low; the minimum configuration of a basic cloud server is enough, and the CPU and memory requirements are minimal. You can also use a Raspberry Pi or something similar. Regarding the network size, if the TCP hole punching direct connection fails, the relay traffic will be consumed. The traffic of a relay connection is between 30 K/s and 3 M/s (1920x1080 screen) depending on the resolution settings and screen update. If it is only for office work demand, the traffic is around 100 K/s.

## Firewall
If you have UFW installed use the following commands to configure the firewall:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

{{% notice warning %}}
When WebSocket is enabled (ports `21118`/`21119` are open for the [web client](https://rustdesk.com/web/)), `hbbs`/`hbbr` trust the `X-Real-IP` / `X-Forwarded-For` headers of incoming WebSocket connections to determine the real client IP, so that the client IP is preserved when the WebSocket traffic goes through a reverse proxy ([WSS](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms)). These headers are not validated, so anyone who can reach `21118`/`21119` directly can spoof an arbitrary IP address with forged headers, bypassing IP-based rate limiting and blocking, and falsifying the IP addresses recorded in logs.

If you use the web client, expose the WebSocket ports only through a reverse proxy that sets `X-Real-IP` itself, and restrict `21118`/`21119` with firewall rules so that only the reverse proxy can connect to them. If you do not use the web client, keep ports `21118` and `21119` closed.
{{% /notice %}}

## Install
### Method 1: Docker (Recommended)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

For more details, please check [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Method 2: Install your own server as systemd service using a simple to run install script
Script is hosted on [Techahold](https://github.com/techahold/rustdeskinstall) and supported on our [Discord](https://discord.com/invite/nDceKgxnkV).

Currently the script will download and setup the Relay and Signal Servers (hbbr and hbbs), generate configs and host them on a password protected web page for simple deployment to clients.

Run the following commands:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

There is also an update script on [Techahold's](https://github.com/techahold/rustdeskinstall) repository.

From there, note down the IP/DNS and Key shown at the end of the install and insert those into your client Settings > Network > ID/Relay server `ID server` and `Key` fields, respectively, leaving the other fields blank (see note below).

### Method 3: Install your own server as systemd service using deb file for debian distros

Please [Download](https://github.com/rustdesk/rustdesk-server/releases/latest) deb files yourself and install with `apt-get -f install <filename>.deb` or `dpkg -i <filename>.deb`.

## What do clients need after server installation?

After the server is running, clients usually need the `ID Server` address and the server public `Key`. If you are configuring RustDesk Server Pro clients, you may also need the `API Server`. Please check [this](/docs/en/self-host/client-configuration/#2-manual-config).
