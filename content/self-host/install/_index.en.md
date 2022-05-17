---
title: Installation 
weight: 10
---

## Set up your own cloud by following simple steps
-----------

### STEP-1 : Download server-side software programs

[Download](https://github.com/rustdesk/rustdesk-server/) or use docker [rustdesk/rustdesk-server](https://hub.docker.com/r/rustdesk/rustdesk-server/tags).

Platform versions provided:
  - Linux
  - Windows

Below tutorial is based on Linux build.

There are two executables and a folder:
   - hbbs - RustDesk ID/Rendezvous server
   - hbbr - RustDesk relay server

They are built on Centos7, tested on Centos7/8, Ubuntu 18/20.

#### Server Requirements
The hardware requirements are very low, the minimum configuration of the cloud server is enough, and the CPU and memory requirements are the minimum. Regarding the network size, if the TCP hole punching direct connection fails, the relay traffic will be consumed. The traffic of a relay connection is between 30k-3M/s (1920x1080 screen), depending on the resolution settings and screen update。 If it is only for office work demand, the traffic is around 100K/s.


### STEP-2 : Run hbbs and hbbr on server

Run hbbs/hbbr on your server (Centos or Ubuntu). We suggust you use [pm2](https://pm2.keymetrics.io/) managing your service.

```
./hbbs -r <relay-server-ip[:port]> 
./hbbr 
```

or run hbbs/hbbr with pm2

```
pm2 start hbbs -- -r <relay-server-ip[:port]> 
pm2 start hbbr 
```

<a name="demo"></a>
{{% notice note %}}
pm2 requires nodejs v16+, if you fail to run pm2 (e.g. you can not see hbbs/hbbr in `pm2 list`), please download and install LTS version nodejs from https://nodejs.org. If you wanna make hbbs/hbbr auto-run after reboot, please check out `pm2 save` and `pm2 startup`. More about [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Another good tool for you log is [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

The `-r` parameter of hhbs is not mandatory, it is just convenient for you not to specify a relay server on the controlled client side, you do not need to specify port if you are using default 21117 port. The relay server specified by the client has a higher priority than this. **For RustDesk controlled client >= 1.1.9, you do not need to specify relay server address on client side either, if the relay server does not run on different host or port.**
{{% /notice %}}

By default, hbbs listens on 21115(tcp) and 21116(tcp/udp), 21118(tcp), hbbr listens on 21117(tcp), 21119(tcp). Be sure to open these ports in the firewall. **Please note that 21116 should be enabled both for TCP and UDP**. 21115 is used for NAT type test, 21116/UDP is used for ID registration and heartbeat service, 21116/TCP is used for TCP hole punching and connection service, 21117 is used for Relay services, 21118 and 21119 are used to support web clients. If you do not need web client (21118, 21119) support, the corresponding ports can be disabled.

- TCP(**21115, 21116, 21117, 21118, 21119**)
- UDP(**21116**)

Please run with "-h" option to see help if you wanna choose your own port.

#### Docker example

##### Linux/amd64
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbr 
```

##### Linux/arm64v8
```
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server:latest-arm64v8 hbbr 
```

<a name="net-host"></a>

{{% notice note %}}
--net=host only works on Linux so far as I know, which make hbbs/hbbr can see the real incomming ip rather than container ip (172.17.0.1).
If --net=host works fine, -p options are useless.

**Please remove --net=host if see connection problem on your platform**
{{% /notice %}}


### STEP-3 : Set hbbs/hbbr address on client-side

Click on menu button on the right side of ID as below, choose "ID/Relay Server".

![](/docs/en/self-host/install/images/server-set-menu.png)

Enter the hbbs host or ip address in the ID server input box (local side + remote side), the other two addresses can be left blank, RustDesk will automatically deduce (if not specially set), and the relay server refers to hbbr ( 21116 port).

e.g.

```
hbbs.yourhost.com
```

or

```
hbbs.yourhost.com:21116
```

![](/docs/en/self-host/install/images/server-set-window.png)

![](/docs/en/self-host/install/images/lic.png)

## Key
-----------
Different from the old version, the key in this version is mandatory, but you don't need to set it yourself. When hbbs runs for the first time, it will automatically generate a pair of encrypted private key and public key (respectively located in the `id_ed25519` and `id_ed25519.pub` files in the running directory), the main purpose is for communication encryption.

If you did not fill in the `Key:` (the content in the public key file `id_ed25519.pub`) in the previous step, it does not affect the connection, but the connection cannot be encrypted. 

````
cat ./id_ed25519.pub
````

If you wanna prohibit users without key from establishing non-encrypted connections, please add the `-k _` parameter when running hbbs and hbbr, for example:
````
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
````

If you wanna change key, please remove `id_ed25519` and `id_ed25519.pub` files and restart hbbs/hbbr，hbbs will generate new key pair.
