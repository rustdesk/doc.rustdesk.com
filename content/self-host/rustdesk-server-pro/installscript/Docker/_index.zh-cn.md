---
title: Docker
weight: 3
---

## Docker Compose（推荐）

使用 Docker Compose 时，必须使用 `network_mode: "host"` 来确保许可证正常工作。请使用此[指南](https://docs.docker.com/engine/install)安装 Docker，以确保它是最新版本！

将以下内容复制到 `compose.yml` 中。

```yaml
services:
  hbbs:
    container_name: hbbs
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

然后运行 `sudo docker compose up -d` 或 `podman-compose up -d`

> `sudo apt install podman-compose` 安装 `podman-compose`

{{% notice note %}}
如何[手动为 Web 控制台设置 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

## Docker 命令

使用此[指南](https://docs.docker.com/engine/install)安装 Docker，以确保它是最新版本！

或者您可以使用这个单一命令安装 docker。

```
bash <(wget -qO- https://get.docker.com)
```

运行以下命令（s6 镜像可能需要 `./data:/data` 而不是 `./data:/root`）：

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
上面的示例使用 `sudo` 和 `--net=host`，这在 Windows 上不起作用，请删除这些命令，如果删除 `--net=host`，请查看下面的内容。
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
如何[手动为 Web 控制台设置 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}


> 如果您在 Fedora 上遇到 SELinux 问题，请查看此[问题](https://github.com/rustdesk/rustdesk-server/issues/230)。