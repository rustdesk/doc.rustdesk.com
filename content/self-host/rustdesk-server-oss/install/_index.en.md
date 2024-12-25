---
title: Installation
weight: 1
---

### Video tutorials
There are many video tutorials on YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

### Install your own server as systemd service using a simple to run install script
Script is hosted on [Techahold](https://github.com/techahold/rustdeskinstall) and supported on our [Discord](https://discord.com/invite/nDceKgxnkV).

Currently the script will download and setup the Relay and Signal Servers (hbbr and hbbs), generate configs and host them on a password protected web page for simple deployment to clients.

#### Requirements
You need to have Linux installed, script is tested working with CentOS Linux 7/8, Ubuntu 18/20/22/24, and Debian. A server with 1 CPU, 1 GB RAM, and 10 GB disk is plenty to run RustDesk.

##### How to Install the server
Please setup your firewall on your server prior to running the script.

Make sure you have access via SSH, or otherwise, set up prior to enabling the firewall. The example commands for UFW (Debian based) are:
```
ufw allow proto tcp from YOURIP to any port 22
```

When hosting locally, like on a Raspberry Pi, `YOURIP` will be the LAN IP of the machine used to SSH into the server. If the machine doesn't have a static IP, you may also declare a subnet with something like `192.168.0.0/24`.

If you have UFW installed use the following commands to configure the firewall (port 8000 is only needed if you want to use the auto generated install files):
```
ufw allow 21114:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

Run the following commands:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

There is also an update script on [Techahold's](https://github.com/techahold/rustdeskinstall) repository.

From there, note down the IP/DNS and Key shown at the end of the install and insert those into your client Settings > Network > ID/Relay server `ID server` and `Key` fields, respectively, leaving the other fields blank.
If the server is on your LAN, use it's LAN IP in the `ID server` field and use the WAN IP/DNS for machines outside of the LAN.

### Install your own server as systemd service using deb file for debian distros

Please [Download](https://github.com/rustdesk/rustdesk-server/releases/latest) deb files yourself and install with `apt-get -f install <filename>.deb` or `dpkg -i <filename>.deb`.

### Set up your own server instance manually

#### STEP 1: Download server-side software programs

[Download](https://github.com/rustdesk/rustdesk-server/releases/latest).

Platform versions provided:

- Linux
- Windows

The tutorial below is based on Linux build.

There are two executables and a folder:

- `hbbs` - RustDesk ID/Rendezvous server
- `hbbr` - RustDesk Relay server

They are built on CentOS Linux 7, tested on CentOS Linux 7/8 and Ubuntu 18/20.

##### Server Requirements

The hardware requirements are very low; the minimum configuration of a basic cloud server is enough, and the CPU and memory requirements are minimal. You can also use a Raspberry Pi or something similar. Regarding the network size, if the TCP hole punching direct connection fails, the relay traffic will be consumed. The traffic of a relay connection is between 30 K/s and 3 M/s (1920x1080 screen) depending on the resolution settings and screen update. If it is only for office work demand, the traffic is around 100 K/s.

#### STEP 2: Run hbbs and hbbr on your server

We suggest you use [PM2](https://pm2.keymetrics.io/) for managing your service.

##### Option 1
Run hbbs/hbbr without PM2.

```sh
./hbbs
./hbbr
```

##### Option 2
Run hbbs/hbbr with PM2.

```sh
pm2 start hbbs
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
PM2 requires Node.js v16+, if you fail to run PM2 (e.g. you can not see `hbbs`/`hbbr` in `pm2 list`), please download and install the Node.js LTS version from https://nodejs.org. If you want to make `hbbs`/`hbbr` auto-run after reboot, please check out `pm2 save` and `pm2 startup`. More about [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/). Another good tool for your logs is [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).
{{% /notice %}}

#### Ports

By default, `hbbs` listens on 21114 (TCP, for web console, only available in Pro version), 21115 (TCP), 21116 (TCP/UDP) and 21118 (TCP), `hbbr` listens on 21117 (TCP) and 21119 (TCP). Be sure to open these ports in the firewall. **Please note that 21116 should be enabled both for TCP and UDP.** 21115 is used for the NAT type test and online status query, 21116/UDP is used for the ID registration and heartbeat service, 21116/TCP is used for TCP hole punching and connection service, 21117 is used for the Relay services, and 21118 and 21119 are used to support web clients, please refer this [sample Nginx configuration](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client) if you want to use web client. *If you do not need web client (21118, 21119) support, the corresponding ports can be disabled.*

- TCP (**21114, 21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

Please run with the `-h` option to see help if you want to choose your own port.

#### STEP 3: [Set hbbs/hbbr address on client-side](/docs/en/self-host/client-configuration/)

### Key

The key is mandatory, but you don't need to set it yourself. When `hbbs` runs for the first time, it will automatically generate a pair of encrypted private and public keys (respectively located in the `id_ed25519` and `id_ed25519.pub` files in the running directory), whose main purpose is for communication encryption.

If you did not fill in the `Key:` (the content in the public key file `id_ed25519.pub`) in the previous step, it does not affect the connection, but the connection cannot be encrypted.

```sh
cat ./id_ed25519.pub
```

If you want to change the key, remove the `id_ed25519` and `id_ed25519.pub` files and restart `hbbs`/`hbbr`, `hbbs` will generate a new key pair.

{{% notice note %}}
If you are using docker-compose and keys don't exist, the start of containers will create different keys in hbbs and hbbr folders.

You could create keys manually in hbbs and copy them to hbbr before starting the containers.

Or you could stop the hbbr container and copy the keys from hbbs to the hbbr folder, and then restart the container.
{{% /notice %}}

