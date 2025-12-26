---
title: Docker
weight: 7
---

> こちらもう一つの良いチュートリアルです：[Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Docker で独自のサーバーをインストール

### 要件
rustdesk-server を Docker コンテナとして実行するには、Docker/Podman がインストールされている必要があります。疑問がある場合は、この[ガイド](https://docs.docker.com/engine/install)で Docker をインストールして、最新であることを確認してください！

ファイアウォールでこれらのポートを開いてください：
- `hbbs`:
  - `21114` (TCP): ウェブコンソール用、`Pro` バージョンでのみ利用可能。
  - `21115` (TCP): NAT タイプテスト用。
  - `21116` (TCP/UDP): **`21116` は TCP と UDP の両方で有効にする必要があることに注意してください。** `21116/UDP` は ID 登録とハートビートサービスに使用されます。`21116/TCP` は TCP ホールパンチングと接続サービスに使用されます。
  - `21118` (TCP): ウェブクライアントのサポート用。
- `hbbr`:
  - `21117` (TCP): リレーサービス用。
  - `21119` (TCP): ウェブクライアントのサポート用。

*ウェブクライアントサポートが不要な場合、対応するポート `21118`、`21119` は無効にできます。*

### Docker の例

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` は **Linux** でのみ動作し、`hbbs`/`hbbr` がコンテナ IP (172.17.0.1) ではなく実際の着信 IP アドレスを見ることができます。
`--net=host` が正常に動作する場合、`-p` オプションは使用されません。Windows の場合、`sudo` と `--net=host` を省略してください。

**プラットフォームで接続問題が発生している場合は、`--net=host` を削除してください。**
{{% /notice %}}

{{% notice note %}}
`-td` でログが見えない場合は、`docker logs hbbs` でログを確認できます。または `-it` で実行すると、`hbbs/hbbr` はデーモンモードで実行されません。
{{% /notice %}}

### Docker Compose の例
ここで説明されている `compose.yml` で Docker ファイルを実行するには、[Docker Compose](https://docs.docker.com/compose/) がインストールされている必要があります。

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

設定変更が必要な場合、例えば ALWAYS_USE_RELAY=Y を設定する場合、docker-compose.yml で environment を使用できます

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    environment:
      - ALWAYS_USE_RELAY=Y
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

### Podman Quadlet の例

systemd サービスとして Podman でコンテナを実行したい場合は、これらのサンプル Podman Quadlet 設定を使用できます：

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

または

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```