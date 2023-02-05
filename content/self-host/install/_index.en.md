---
title: Installation 
weight: 10
---

## Install your own server using a simple to run install script
Script is hosted on https://github.com/dinger1986/rustdeskinstall and supported on our [Discord](https://discord.com/invite/nDceKgxnkV).

Currently the script will download and setup the Relay and Signal Servers (hbbr and hbbs), generate configs and host them on a password protected web page for simple deployment to clients.

### Requirements
You need to have linux installed, script is tested working with CentOS Linux 7/8, Ubuntu 18/20 and Debian. A server with 1 CPU, 1 GB and 10 GB disk is plenty to run RustDesk.

#### How to Install the server
Please setup your firewall on your server prior to running the script.

Make sure you have got access via ssh or otherwise setup prior setting up the firewall. The example commands for UFW (Debian based) are:
```
ufw allow proto tcp from YOURIP to any port 22
```

#### If you have UFW installed use the following commands to configure the firewall:
```
ufw allow 21115:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

#### Run the following commands:
```
wget https://raw.githubusercontent.com/dinger1986/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```


## Install your own server with docker(-compose)

### Requirements
You need to have Docker/Podman installed to run a rustdesk-server as a docker container

### Docker examples
#### Linux/amd64
```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr 
```
#### Linux/arm64v8
```bash
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbr 
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` only works on **Linux**, which makes `hbbs`/`hbbr` see the real incoming IP Address rather than the Container IP (172.17.0.1).
If `--net=host` works fine, the `-p` options are not used. If on Windows, leave out `sudo` and `--net=host`.

**Please remove `--net=host` if you are having connection problems on your platform.**
{{% /notice %}}

### Docker-Compose examples
For running the docker files with the docker-compose.yml as described here you need to have [**docker-compose**](https://docs.docker.com/compose/) installed.
#### Linux/amd64
```yaml
version: '3'

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r example.com:21117
    volumes:
      - ./hbbs:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./hbbr:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```
#### Linux/arm64v8
```yaml
version: '3'

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest-arm64v8
    command: hbbs -r example.com:21117
    volumes:
      - ./hbbs:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest-arm64v8
    command: hbbr
    volumes:
      - ./hbbr:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```


## Set up your own server instance without using Docker

### STEP 1 : Download server-side software programs

[Download](https://github.com/rustdesk/rustdesk-server/).

Platform versions provided:

- Linux
- Windows

The tutorial below is based on Linux build.

There are two executables and a folder:

- `hbbs` - RustDesk ID/Rendezvous server
- `hbbr` - RustDesk relay server

They are built on CentOS Linux 7, tested on CentOS Linux 7/8 and Ubuntu 18/20.

#### Server Requirements

The hardware requirements are very low; the minimum configuration of a basic cloud server is enough, and the CPU and memory requirements are minimal. You can also use a Raspberry Pi or something similar. Regarding the network size, if the TCP hole punching direct connection fails, the relay traffic will be consumed. The traffic of a relay connection is between 30k-3M/s (1920x1080 screen) depending on the resolution settings and screen update. If it is only for office work demand, the traffic is around 100K/s.

### STEP 2 : Run hbbs and hbbr on your server

#### Option 1
Run hbbs/hbbr on your server (CentOS or Ubuntu). We suggest you use [pm2](https://pm2.keymetrics.io/) for managing your service.

```bash
./hbbs -r <relay-server-ip[:port]> 
./hbbr 
```

#### Option 2 - pm2
Run hbbs/hbbr with pm2

```bash
pm2 start hbbs -- -r <relay-server-ip[:port]> 
pm2 start hbbr 
```

<a name="demo"></a>
{{% notice note %}}
pm2 requires NodeJS v16+, if you fail to run pm2 (e.g. you can not see `hbbs`/`hbbr` in `pm2 list`), please download and install the NodeJS LTS version from https://nodejs.org. If you want to make `hbbs`/`hbbr` auto-run after reboot, please check out `pm2 save` and `pm2 startup`. More about [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Another good tool for your logs is [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

The `-r` parameter of `hbbs` is not mandatory, it is just convenient for you not to specify a relay server on the controlled client side. You do not need to specify port if you are using default 21117 port. The relay server specified by the client has a higher priority than this.
{{% /notice %}}

By default, `hbbs` listens on 21115 (TCP) and 21116 (TCP/UDP), 21118 (TCP), and `hbbr` listens on 21117 (TCP), 21119 (TCP). Be sure to open these ports in the firewall. **Please note that 21116 should be enabled both for TCP and UDP**. 21115 is used for the NAT type test, 21116/UDP is used for the ID registration and heartbeat service, 21116/TCP is used for TCP hole punching and connection service, 21117 is used for the Relay services, and 21118 and 21119 are used to support web clients. *If you do not need web client (21118, 21119) support, the corresponding ports can be disabled.*

- TCP (**21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

Please run with the `-h` option to see help if you want to choose your own port.

### STEP 3 : Set hbbs/hbbr address on client-side

Click on the Menu button [ &#8942; ] on the right side of ID as shown below, and choose "ID/Relay Server".

![](/docs/en/self-host/install/images/server-set-menu.png)

Enter the `hbbs` host or IP Address in the **ID Server** input box (local side + remote side). The other two addresses can be left blank, RustDesk will automatically deduce (if not specially set), and the Relay Server refers to `hbbr` (port 21117).

e.g.

```nolang
hbbs.example.com
```

or

```nolang
hbbs.example.com:21116
```

![](/docs/en/self-host/install/images/server-set-window.png)

#### Put config in rustdesk.exe file name (Windows only)

Change `rustdesk.exe` to rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, e.g. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. You can see the config result in the About Window below.

<a name="invalidchar"></a>
{{% notice note %}}
You need to set both `host` and `key`, missing either one will not work.

If there are invalid characters in the key which can not be used in a Windows file name, please remove the
`id_ed25519` file from your server and restart `hbbs`/`hbbr`. This will cause the `id_ed25519.pub` file to regenerate. You may need to
repeat this process until you get valid characters.
{{% /notice %}}

| Menu | About Page |
| -- | -- |
![](/docs/en/self-host/install/images/aboutmenu.png) | ![](/docs/en/self-host/install/images/lic.png) |

## Key

Different from the old version, the key in this version is mandatory, but you don't need to set it yourself. When `hbbs` runs for the first time, it will automatically generate a pair of encrypted private and public keys (respectively located in the `id_ed25519` and `id_ed25519.pub` files in the running directory), whose main purpose is for communication encryption.

If you did not fill in the `Key:` (the content in the public key file `id_ed25519.pub`) in the previous step, it does not affect the connection, but the connection cannot be encrypted.

```bash
cat ./id_ed25519.pub
````

If you want to prohibit users without the key from establishing non-encrypted connections, please add the `-k _` parameter when running `hbbs` and `hbbr`, for example:

```bash
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
```

If you want to change the key, remove the `id_ed25519` and `id_ed25519.pub` files and restart `hbbs`/`hbbr`，`hbbs` will generate a new key pair.

{{% notice note %}}
If you are using docker-compose and keys don't exist, the start of containers will create differents keys in hbbs and hbbr folders.

You could create keys manually in hbbs and copy them to hbbr before starting the containers.

Or you could stop the hbbr container and copy the keys from hbbs to the hbbr folder, and then restart the container.
{{% /notice %}}
