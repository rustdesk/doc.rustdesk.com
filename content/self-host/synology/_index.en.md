---
title: Synology
weight: 22
---

This tutorial is based on latest DSM v6.

### Install Docker

Open package manager and install docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synology/images/package-manager.png) | ![](/docs/en/self-host/synology/images/docker.png)


### Install RustDesk Server

| Search rustdesk-server in Docker's registery and install by double click  |   Installed rustdesk-server image, double click to create rustdesk-server container                                    |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synology/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synology/images/rustdesk-server-installed.png)


### Create hbbs container

As mentioned above, double click on rustdesk-server image to create new container, set it name to `hbbs`.
![](/docs/en/self-host/synology/images/hbbs.png) 

Click on above "Advanced Settings".

- Enable auto-restart
![](/docs/en/self-host/synology/images/auto-restart.png) 

- Enable "Use the same network as Docker host", for more about host net, please [check](/docs/en/self-host/install/#net-host)
![](/docs/en/self-host/synology/images/host-net.png) 

- Mount a host directory (e.g. `Shared/test/`) to `/root`, hbbs will generate some files (including the `key` file) in this directory
| Mount | Files generated in the host directory |
|-- | -- |
![](/docs/en/self-host/synology/images/mount.png?width=500px) | ![](/docs/en/self-host/synology/images/mounted-dir.png?width=300px) 

- Set command
{{% notice note %}}
Synology's OS is Debian based, so host net (--net=host) works fine, we do not need to map ports with `-p` option.

`192.168.16.98` is an intranet ip used here for demonstration only, please set it to a public ip when you deploy.

{{% /notice %}}

![](/docs/en/self-host/synology/images/hbbs-cmd.png?v2) 

- Done
  
![](/docs/en/self-host/synology/images/hbbs-config.png) 

### Create hbbr container

Please repeat above `hbbs` steps, but change container name to `hbbr` and command to `hbbr`.

![](/docs/en/self-host/synology/images/hbbr-config.png) 

### hbbr/hbbs containers

![](/docs/en/self-host/synology/images/containers.png?width=500px)


| Double click on container and check log | Double confirm hbbs/hbbr using host network |
|-- | -- |
![](/docs/en/self-host/synology/images/log.png?width=500px) | ![](/docs/en/self-host/synology/images/network-types.png?width=500px)
