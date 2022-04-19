---
title: Installation 
weight: 10
---

## Set up your own cloud by following simple steps
-----------

### STEP-1 : Download server-side software programs

[Download](https://github.com/rustdesk/rustdesk-server/) or use docker rustdesk/rustdesk-server.

<!-- **Note:** You need [buy license](https://rustdesk.com/server/) When using this software -->

Platform versions provided:
  - Linux
  - Windows

Below tutorial is based on Linux build.

There are two executables and a folder:
   - hbbs - RustDesk ID/Rendezvous server
   - hbbr - RustDesk relay server
   - static - this folder contains all web console files

They are built on Centos7, tested on Centos7/8, Ubuntu 18/20.

#### Server Requirements
The hardware requirements are very low, the minimum configuration of the cloud server is enough, and the CPU and memory requirements are the minimum. Regarding the network size, if the TCP hole punching direct connection fails, the relay traffic will be consumed. The traffic of a relay connection is between 30k-3M/s (1920x1080 screen), depending on the resolution settings and screen update。 If it is only for office work demand, the traffic is around 100K/s.


### STEP-2 : Run hbbs and hbbr on server

Run hbbs/hbbr on your server (Centos or Ubuntu). We suggust you use [pm2](https://pm2.keymetrics.io/) managing your service.

```
./hbbs -r <relay-server-ip> -m <registered_email>
./hbbr -m <registered_email>
```

{{% notice note %}}
**Please input `demo` for <registered_email> for trial.**
{{% /notice %}}

{{% notice note %}}
The -r parameter of hhbs is not necessary, it is just convenient for you not to specify a relay server on the client side. The relay server specified by the client has a higher priority than this.
{{% /notice %}}

By default, hbbs listens on 21114(tcp), 21115(tcp) and 21116(tcp/udp), 21118(tcp), hbbr listens on 21117(tcp), 21119(tcp). Be sure to open these ports in the firewall. **Please note that 21116 should be enabled both for TCP and UDP**. 21114 is for web console + API, 21115 is used for NAT type test, 21116/UDP is used for ID registration and heartbeat service, 21116/TCP is used for TCP hole punching and connection service, 21117 is used for Relay services, 21118 and 21119 are used to support web clients. If you do not need web console + API (21114) or web client (21118, 21119) support, the corresponding ports can be disabled.

- TCP(21114, 21115, 21116, 21117, 21118, 21119)
- UDP(21116)

Please run with "-h" option to see help if you wanna choose your own port.

#### Docker example

##### Linux/amd64
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip> -m <registered_email>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --rm rustdesk/rustdesk-server hbbr -m <registered_email>
```

##### Linux/arm64v8
```
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --rm rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip> -m <registered_email>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --rm rustdesk/rustdesk-server:latest-arm64v8 hbbr -m <registered_email>
```


### STEP-3 : Set hbbs/hbbr address on client-side

{{% notice note %}}
For Windows clients, you can choose the [Windows EXE](/docs/en/self-host/console/#windows-exe) solution to avoid filling in custom server configuration.
{{% /notice %}}

Click on menu button on the right side of ID as below, choose "ID/Relay Server".

![](/docs/en/self-host/install/images/server-set-menu.png)

Enter the hbbs host or ip address in the ID server input box (local side + remote side), the other two addresses can be left blank, RustDesk will automatically deduce (if not specially set), and the relay server refers to hbbr ( 21116 port), the API server refers to above web console + API (21114) port.

{{% notice note %}}
The Key in the picture does not refer to the registered email address, the [next section](#key) will explain in detail.
{{% /notice %}}

e.g.

```
hbbs.yourhost.com
```

or

```
hbbs.yourhost.com:21116
```

![](/docs/en/self-host/install/images/server-set-window.png)

## Key
-----------
Different from the old version, the Key in this version is mandatory. When hbbs runs for the first time, it will automatically generate a pair of encrypted private key and public key (respectively located in the `id_ed25519` and `id_ed25519.pub` files in the running directory), its main purpose is for communication encryption, if you did not fill in the Key in the previous step (the content in the public key file `id_ed25519.pub`),

````
cat ./id_ed25519.pub
````

does not affect the connection, but the connection cannot be encrypted. If you prohibit users without keys from establishing non-encrypted connections, please add the `-k _` parameter when running hbbs and hbbr, for example:
````
./hbbs -r <address of the host where hbbr is running> -k _
./hbbr -k _
````

{{% notice note %}}
Key can also be seen on the [console](/docs/en/self-host/console/) welcome page (Click on Windows EXE).
{{% /notice %}}
