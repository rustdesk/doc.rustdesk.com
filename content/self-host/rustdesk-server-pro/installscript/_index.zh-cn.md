---
title: Installation
weight: 2
---

## 方法1：Docker (Recommended)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

For more details, please check [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## 方法 2：install.sh

If you are proficient in Linux, please use the script below. Otherwise, you may encounter significant issues if it fails, and it could be difficult to determine why it isn’t working.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

For more details, please check [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Convert from open source

### Docker
If you install the open-source version using Docker, there is no direct way to convert it. Instead, you’ll need to run a new container with the Pro image. Before doing this, please back up your private key (the `id_ed25519` file, not `id_ed25519.pub`). Once the new container is set up, copy the old `id_ed25519` private key file to the working directory of the new container, then restart the container.

### install.sh
If you install the open-source version using install.sh, please follow [this](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).
