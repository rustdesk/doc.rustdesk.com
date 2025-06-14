---
title: Docker
weight: 7
---

> 這裡有另一個很好的教學：[Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

### 使用 Docker 安裝您自己的伺服器

#### 要求
您需要安裝 Docker/Podman 才能將 rustdesk-server 作為 Docker 容器執行。如有疑問，請使用此[指南](https://docs.docker.com/engine/install)安裝 Docker，以確保它是最新的！

確保在防火牆中開啟這些埠口：
- `hbbs`:
  - `21114` (TCP): 用於網頁控制台，僅在 `Pro` 版本中可用。
  - `21115` (TCP): 用於 NAT 類型測試。
  - `21116` (TCP/UDP): **請注意 `21116` 應該同時為 TCP 和 UDP 啟用。** `21116/UDP` 用於 ID 註冊和心跳服務。`21116/TCP` 用於 TCP 打洞和連接服務。
  - `21118` (TCP): 用於支援網頁客戶端。
- `hbbr`:
  - `21117` (TCP): 用於中繼服務。
  - `21119` (TCP): 用於支援網頁客戶端。

*如果您不需要網頁客戶端支援，可以停用相應的埠口 `21118`、`21119`。*

#### Docker 範例

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` 僅在 **Linux** 上有效，這使得 `hbbs`/`hbbr` 看到真實的傳入 IP 位址而不是容器 IP (172.17.0.1)。
如果 `--net=host` 工作正常，則不使用 `-p` 選項。如果在 Windows 上，請省略 `sudo` 和 `--net=host`。

**如果您在您的平台上遇到連接問題，請移除 `--net=host`。**
{{% /notice %}}

{{% notice note %}}
如果您無法使用 `-td` 看到日誌，可以透過 `docker logs hbbs` 查看日誌。或者您可以使用 `-it` 執行，`hbbs/hbbr` 不會作為守護進程模式執行。
{{% /notice %}}

#### Docker Compose 範例
要使用這裡描述的 `compose.yml` 執行 Docker 檔案，您需要安裝 [Docker Compose](https://docs.docker.com/compose/)。

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

如果您需要進行配置更改，例如設定 ALWAYS_USE_RELAY=Y，可以在 docker-compose.yml 中使用 environment

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

#### Podman Quadlet 範例

如果您想使用 Podman 作為 systemd 服務執行容器，可以使用這些範例 Podman Quadlet 配置：

```ini
[Container]
AutoUpdate=registry
Image=ghcr.io/rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

或者

```ini
[Container]
AutoUpdate=registry
Image=ghcr.io/rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```