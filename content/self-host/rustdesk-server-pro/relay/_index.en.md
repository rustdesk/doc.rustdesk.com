---
title: Configure Relay Servers
weight: 17
---

## RustDesk Pro - Install Additional Relay Servers with Geo Location using docker

You can have several relay servers running across the globe and leverage GeoLocation to use the closest relay server, giving you a faster experience when connecting to remote computers.

> You will need the private key pair `id_ed25519` and `id_ed25519.pub`.

1 - If docker is already installed, connect to your server via SSH and create a volume for hbbr.

```
# docker volume create hbbr
```

The volume hbbr should be located in `/var/lib/docker/volumes/hbbr/_data`.

2 - Copy the private key pair to the volume location, in this case we will use SCP to copy the files.

The command syntax is: `scp <path/filename> username@server:</destination/path>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Deploy the hbbr container using the volume previously created. This volume has the private key pair needed to run your private relay server.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Check the running logs to verify that hbbr is running using your key pair.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

Depending on your OS, you might want to block/allow IPs using a firewall.

In our case, running Ubuntu we want to allow any TCP connections, to ports 21117 and 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Enable the firewall**
```
# sudo ufw enable
```

**Check the status**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Configure RustDesk Pro for Geo Location using Web Console

### Register and Download the GeoLite2 City database file

To use geo location, hbbs needs access to the MaxMind GeoLite2 City database. The database is free and you can register to download the file and get an API key.

Start by creating an account (if you don’t have one) by going to the [website](https://www.maxmind.com/en/account/login).
Go to `Download Databases` and download the GeoLite2 City, choose the gzip file and you should have the `mmdb` file when decompressing it.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

If you installed RustDesk Pro using the installation script on a Linux machine, the `mmdb` file needs to be moved to `/var/lib/rustdesk-server/`.

For Docker installations the file should be in the volume you mapped when deploying the container mapped to `/root`.

#### Get an API key to automate the process - Linux servers

You need to update this file regularly and we can use a cronjob to do that. You will need an API key to access the download link which is free.

Go to `Manage License Keys` and generate a new license key. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

You can automate the [download process](https://dev.maxmind.com/geoip/updating-databases) in a few ways, but you add the following command to your crontab replacing {Your Access Key} with the API key you got from the previous step.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Change settings in RustDesk Pro Web Console

Add your relay server IP addresses to the the Relay Server List, using just the IP address. **Do not add the port.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Add a Geo Override but adding the server IP address and the coordinates where the server is located. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Click `Reload Geo` and your list should look similar to this. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

To confirm the results, check your hbbs logs when clicking `Reload Geo`, you should see a message showing the relay server IP addresses and their coordinates.

> If you are running RustDesk Pro on a Linux machine use the command `RUST_LOG=debug ./hbbs` to view the logs. If you are running on a Docker container user `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

You can also confirm the relay requests directly on your hbbr instances, simply by checking the container logs.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
