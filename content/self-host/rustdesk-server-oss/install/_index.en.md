---
title: Installation
weight: 1
---

### Video tutorials
There are many video tutorials on YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

### Server Requirements
The hardware requirements are very low; the minimum configuration of a basic cloud server is enough, and the CPU and memory requirements are minimal. You can also use a Raspberry Pi or something similar. Regarding the network size, if the TCP hole punching direct connection fails, the relay traffic will be consumed. The traffic of a relay connection is between 30 K/s and 3 M/s (1920x1080 screen) depending on the resolution settings and screen update. If it is only for office work demand, the traffic is around 100 K/s.

### Firewall
If you have UFW installed use the following commands to configure the firewall:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

### Install
#### Method 1: Docker (Recommended)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

For more details, please check [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

#### Method 2: Install your own server as systemd service using a simple to run install script
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

#### Method 3: Install your own server as systemd service using deb file for debian distros

Please [Download](https://github.com/rustdesk/rustdesk-server/releases/latest) deb files yourself and install with `apt-get -f install <filename>.deb` or `dpkg -i <filename>.deb`.

### Configure client
Please check [this](/docs/en/self-host/client-configuration/#2-manual-config).
