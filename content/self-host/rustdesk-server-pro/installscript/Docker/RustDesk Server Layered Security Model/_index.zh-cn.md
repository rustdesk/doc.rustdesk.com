---
title: RustDesk 服务器分层安全模型
weight: 100
---

由 [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot) 精心编写。

### 层级
- [RustDesk](https://github.com/rustdesk/rustdesk) 远程支持工具
- [NPM](https://nginxproxymanager.com/) 代理管理工具
- [Docker](https://www.docker.com) 容器化工具
- 防火墙工具

#### 假设
这个示例是一个仅用于托管 RustDesk 服务的一体化解决方案。可以通过将 NPM 拆分为独立的 Docker Compose 来扩展为更灵活的解决方案。
- DMZ 网络：192.168.1.0/24
  - NPM（外部）：192.168.1.250
- LAN 网络：10.0.0.0/24
- RSBackend 网络：192.168.254.0/29
  - NPM（内部）：192.168.254.1
  - HBBS：192.168.254.2
  - HBBR：192.168.254.3
- Docker 主机：Linux
  - 每个应用程序在 `/opt/` 中都有一个专用文件夹。
- 主机名：uniquehostname（请更改此值）
- DNS 名称：rustdesk.example.com

请根据需要修改示例。

### 准备 Docker
您必须已安装 Docker，本指南不涉及具体安装细节。

您需要为 RustDesk 服务器后端和 DMZ 创建一个网络。
对于与 NPM（Nginx 代理管理器）一起使用的每个应用程序，您应该拥有一个专用的后端网络来隔离它。

```
 docker network create \
   --driver=bridge  \
   --subnet=192.168.254.0/29 RSBackend

 docker network create \
   --driver=ipvlan --subnet=192.168.1.0/24 \
   --gateway=192.168.1.1 \
   -o ipvlan_mode=l2 \
   -o parent=eth0 DMZ
```

### 设置防火墙
配置以下端口转发/NAT 端口，从您的公共 IP 到 NPM 服务器。
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # 如果您想使用 SSL

### 设置 Docker Compose
这将启动一个包含 NPM 和正确网络的容器。

将以下内容复制到 docker-compose.yaml 中。

```
version: '3.5'
services:
  NPM:
    image: jlesage/nginx-proxy-manager:latest
    container_name: proxy-manager
    volumes:
      - /opt/proxy-manager/config:/config
    restart: 'unless-stopped'
    networks:
      DMZ:
        ipv4_address: 192.168.1.250
      RSBackend:
        ipv4_address: 192.168.254.1

  hbbs:
    container_name: rustdesk_hbbs
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbs -k _
    hostname: uniquehostname   # 请更改此值
    volumes:
      - /opt/rustdeskserver:/root
    networks:
      RSBackend:
        ipv4_address: 192.168.254.2
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: rustdesk_hbbr
    image: rustdesk/rustdesk-server-pro:latest
    command: hbbr -k _
    volumes:
      - /opt/rustdeskserver:/root
    networks:
      RSBackend:
        ipv4_address: 192.168.254.3
    restart: unless-stopped

networks:
  DMZ:
    external: true
  RSBackend:
    external: true
```

### 设置 NPM
为以下端口配置流主机：
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # 捕获本地流量

配置代理主机：
- 域名：rustdesk.example.com
- 方案：http
- 转发主机名 / IP：192.168.254.2
- 转发端口：21114
- 阻止常见漏洞：已勾选
- 可选：配置 SSL **（不要强制 - 客户端需要能够在不使用 SSL 的情况下通信。）**

### 设置 RustDesk 服务器
连接到服务器界面 http://rustdesk.example.com 或 https://rustdesk.example.com（如果您已为 Web 界面配置了 SSL）。

### 设置 RustDesk 客户端
配置客户端：
- ID 服务器：rustdesk.example.com
- 中继服务器：rustdesk.example.com
- API 服务器：http://rustdesk.example.com（如果您已配置 SSL，请使用 HTTPS）
- 密钥：{服务器密钥在此处}

### 最终结果
您的解决方案将可通过代理管理器在外部访问。您将实现 RustDesk 服务器与其他系统的隔离。特别是如果您使用分离配置系统并在公共 NPM 后面有其他应用程序/站点。