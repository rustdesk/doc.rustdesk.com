---
title: Docker
weight: 7
---

> 这里有另一个很好的教程：[Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

### 使用 Docker 安装您自己的服务器

#### 要求
您需要安装 Docker/Podman 才能将 rustdesk-server 作为 Docker 容器运行。如有疑问，请使用此[指南](https://docs.docker.com/engine/install)安装 Docker，以确保它是最新的！

确保在防火墙中打开这些端口：
- `hbbs`:
  - `21114` (TCP): 用于网页控制台，仅在 `Pro` 版本中可用。
  - `21115` (TCP): 用于 NAT 类型测试。
  - `21116` (TCP/UDP): **请注意 `21116` 应该同时为 TCP 和 UDP 启用。** `21116/UDP` 用于 ID 注册和心跳服务。`21116/TCP` 用于 TCP 打洞和连接服务。
  - `21118` (TCP): 用于支持网页客户端。
- `hbbr`:
  - `21117` (TCP): 用于中继服务。
  - `21119` (TCP): 用于支持网页客户端。

*如果您不需要网页客户端支持，可以禁用相应的端口 `21118`、`21119`。*

#### Docker 示例

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` 仅在 **Linux** 上有效，这使得 `hbbs`/`hbbr` 看到真实的传入 IP 地址而不是容器 IP (172.17.0.1)。
如果 `--net=host` 工作正常，则不使用 `-p` 选项。如果在 Windows 上，请省略 `sudo` 和 `--net=host`。

**如果您在您的平台上遇到连接问题，请移除 `--net=host`。**
{{% /notice %}}

{{% notice note %}}
如果您无法使用 `-td` 看到日志，可以通过 `docker logs hbbs` 查看日志。或者您可以使用 `-it` 运行，`hbbs/hbbr` 不会作为守护进程模式运行。
{{% /notice %}}

#### Docker Compose 示例
要使用这里描述的 `compose.yml` 运行 Docker 文件，您需要安装 [Docker Compose](https://docs.docker.com/compose/)。

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

如果您需要进行配置更改，例如设置 ALWAYS_USE_RELAY=Y，可以在 docker-compose.yml 中使用 environment

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

#### Podman Quadlet 示例

如果您想使用 Podman 作为 systemd 服务运行容器，可以使用这些示例 Podman Quadlet 配置：

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