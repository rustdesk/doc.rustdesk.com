---
title: Synology DSM 6
weight: 22
---

> An alternative up-to-date tutorial from third-party is [here](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

This tutorial is based on latest DSM v6 and v7.

{{% notice note %}}
After DSM 7.2 update, the Docker is upgraded to new "Container Manager", please check [this article](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7) instead.
{{% /notice %}}

## Install Docker

| Open Package Center | Install Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Install RustDesk Server

| Search rustdesk-server in Docker's registry and install by double click | Installed rustdesk-server image, double click to create rustdesk-server container |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Create hbbs container

As mentioned above, double click on rustdesk-server image to create new container, set it name to `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Click on above `Advanced Settings`.

- Enable `Enable auto-restart`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Enable `Use the same network as Docker Host`. For more about host net, please [check](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Mount a host directory (e.g. `/home/rustdesk/`) to `/root`, hbbs will generate some files (database and `key` files) in this directory which need to be persistent over reboots.

| Mount | Files generated in the host directory |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Set command
{{% notice note %}}
Synology's OS is Debian based, so host net (--net=host) works fine, we do not need to map ports with `-p` option.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Done

## Create hbbr container

Please repeat above `hbbs` steps, but name the container `hbbr` and command (for Set Command Step) should be `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## hbbr/hbbs containers

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Double click on container and check log | Double confirm hbbs/hbbr using host network |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Retrieve your Key

Browse to the folder setup before using File Station, download `id_ed25519.pub` and open with a text editor to via your key.
