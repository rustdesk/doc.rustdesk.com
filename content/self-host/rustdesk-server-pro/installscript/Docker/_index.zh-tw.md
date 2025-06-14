---
title: Docker
weight: 3
---

### Docker Compose（推薦）

使用 Docker Compose 時，必須使用 `network_mode: "host"` 來確保授權正常工作。請使用此[指南](https://docs.docker.com/engine/install)安裝 Docker，以確保它是最新版本！

將以下內容複製到 `compose.yml` 中。

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

然後運行 `sudo docker compose up -d` 或 `podman-compose up -d`

> `sudo apt install podman-compose` 安裝 `podman-compose`

{{% notice note %}}
如何[手動為 Web 控制台設置 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

### Docker 指令

使用此[指南](https://docs.docker.com/engine/install)安裝 Docker，以確保它是最新版本！

或者您可以使用這個單一指令安裝 docker。

```
bash <(wget -qO- https://get.docker.com)
```

運行以下指令（s6 鏡像可能需要 `./data:/data` 而不是 `./data:/root`）：

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
上面的範例使用 `sudo` 和 `--net=host`，這在 Windows 上不起作用，請刪除這些指令，如果刪除 `--net=host`，請查看下面的內容。
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
如何[手動為 Web 控制台設置 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}


> 如果您在 Fedora 上遇到 SELinux 問題，請查看此[問題](https://github.com/rustdesk/rustdesk-server/issues/230)。