---
title: Docker
weight: 3
---

### Docker Compose（推奨）

Docker Composeでは、ライセンスが正常に動作するように `network_mode: "host"` を使用する必要があります。最新版であることを確実にするために、この[ガイド](https://docs.docker.com/engine/install)を使用してDockerをインストールしてください！

以下を `compose.yml` にコピーしてください。

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

そして `sudo docker compose up -d` または `podman-compose up -d` を実行してください

> `podman-compose` のインストールには `sudo apt install podman-compose`

{{% notice note %}}
[Webコンソール用のHTTPSを手動で設定する方法](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

### Dockerコマンド

最新版であることを確実にするために、この[ガイド](https://docs.docker.com/engine/install)でDockerをインストールしてください！

または、この単一コマンドでdockerをインストールできます。

```
bash <(wget -qO- https://get.docker.com)
```

以下のコマンドを実行してください（s6イメージは `./data:/root` ではなく `./data:/data` が必要な場合があります）：

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
上記の例では `sudo` と `--net=host` を使用していますが、これはWindowsでは動作しませんので、これらのコマンドを削除してください。`--net=host` を削除する場合は、以下を確認してください。
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
[Webコンソール用のHTTPSを手動で設定する方法](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}


> FedoraでSELinuxの問題がある場合は、この[問題](https://github.com/rustdesk/rustdesk-server/issues/230)を確認してください。