---
title: Installation
weight: 2
description: "Install RustDesk Server Pro with Docker, Linux install scripts, or the legacy Windows method. Start here to choose the right deployment path for your environment."
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

Start here to choose the best RustDesk Server Pro installation method for your environment, with Docker as the recommended option.

## What is the best way to install RustDesk Server Pro?

For most teams, Docker is the best way to install RustDesk Server Pro because updates are simpler and the deployment is easier to reproduce. The `install.sh` path is useful when you want native systemd services on Linux. Converting from OSS is the right path when you already run RustDesk Server and want to keep moving to Pro.

## What do you need before you start?

- A RustDesk Server Pro license
- A Linux server or VM, or a host where Docker is already available
- Required RustDesk ports open in your firewall, plus `21114` or `443` if you need the web console and API
- An optional DNS name if you want HTTPS on a domain

## Which installation method should you choose?

| Method | Best for | Why you would use it |
| --- | --- | --- |
| Docker | Most new Pro deployments | Easiest upgrades, simpler rollback, and consistent setup |
| `install.sh` | Linux admins who want native services | Creates systemd services and can optionally set up Nginx and Certbot |
| Convert from open source | Existing OSS deployments | Moves an existing RustDesk Server install to Pro without starting from zero |

## Method 1: Docker (Recommended)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

For more details, please check [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Method 2: install.sh

If you are proficient in Linux, please use the script below. Otherwise, you may encounter significant issues if it fails, and it could be difficult to determine why it isn’t working.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

For more details, please check [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Convert from open source

### Docker
If you install the open-source version using Docker, there is no direct way to convert it. Instead, you’ll need to run a new container with the Pro image. Before doing this, please back up your private key (the `id_ed25519` file, not `id_ed25519.pub`). Once the new container is set up, copy the old `id_ed25519` private key file to the working directory of the new container, then restart the container.

### install.sh
If you install the open-source version using install.sh, please follow [this](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).
