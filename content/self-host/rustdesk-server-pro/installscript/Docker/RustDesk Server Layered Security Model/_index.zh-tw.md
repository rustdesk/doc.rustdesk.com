---
title: RustDesk 伺服器分層安全模型
weight: 100
---

由 [@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot) 精心編寫。

### 層級
- [RustDesk](https://github.com/rustdesk/rustdesk) 遠端支援工具
- [NPM](https://nginxproxymanager.com/) 代理管理工具
- [Docker](https://www.docker.com) 容器化工具
- 防火牆工具

#### 假設
這個範例是一個僅用於代管 RustDesk 服務的一體化解決方案。可以通過將 NPM 拆分為獨立的 Docker Compose 來擴展為更靈活的解決方案。
- DMZ 網路：192.168.1.0/24
  - NPM（外部）：192.168.1.250
- LAN 網路：10.0.0.0/24
- RSBackend 網路：192.168.254.0/29
  - NPM（內部）：192.168.254.1
  - HBBS：192.168.254.2
  - HBBR：192.168.254.3
- Docker 主機：Linux
  - 每個應用程式在 `/opt/` 中都有一個專用資料夾。
- 主機名：uniquehostname（請更改此值）
- DNS 名稱：rustdesk.example.com

請根據需要修改範例。

### 準備 Docker
您必須已安裝 Docker，本指南不涉及具體安裝細節。

您需要為 RustDesk 伺服器後端和 DMZ 建立一個網路。
對於與 NPM（Nginx 代理管理器）一起使用的每個應用程式，您應該擁有一個專用的後端網路來隔離它。

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

### 設置防火牆
配置以下連接埠轉發/NAT 連接埠，從您的公共 IP 到 NPM 伺服器。
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # 如果您想使用 SSL

### 設置 Docker Compose
這將啟動一個包含 NPM 和正確網路的容器。

將以下內容複製到 docker-compose.yaml 中。

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
    hostname: uniquehostname   # 請更改此值
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

### 設置 NPM
為以下連接埠配置串流主機：
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # 捕獲本地流量

配置代理主機：
- 域名：rustdesk.example.com
- 方案：http
- 轉發主機名 / IP：192.168.254.2
- 轉發連接埠：21114
- 阻止常見漏洞：已勾選
- 可選：配置 SSL **（不要強制 - 客戶端需要能夠在不使用 SSL 的情況下通信。）**

### 設置 RustDesk 伺服器
連接到伺服器界面 http://rustdesk.example.com 或 https://rustdesk.example.com（如果您已為 Web 界面配置了 SSL）。

### 設置 RustDesk 客戶端
配置客戶端：
- ID 伺服器：rustdesk.example.com
- 中繼伺服器：rustdesk.example.com
- API 伺服器：http://rustdesk.example.com（如果您已配置 SSL，請使用 HTTPS）
- 密鑰：{伺服器密鑰在此處}

### 最終結果
您的解決方案將可通過代理管理器在外部訪問。您將實現 RustDesk 伺服器與其他系統的隔離。特別是如果您使用分離配置系統並在公共 NPM 後面有其他應用程式/站點。