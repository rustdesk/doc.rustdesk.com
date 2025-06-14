---
title: RustDeskサーバー層化セキュリティモデル
weight: 100
---

[@I-Am-Skoot](https://github.com/I-Am-Skoot/RustDeskNPMDocker/commits?author=I-Am-Skoot)によって親切に作成されました。

## レイヤー
- [RustDesk](https://github.com/rustdesk/rustdesk) リモートサポートツール
- [NPM](https://nginxproxymanager.com/) プロキシ管理ツール
- [Docker](https://www.docker.com) コンテナ化ツール
- ファイアウォールツール

### 前提
この例はRustDeskサービスのみをホストするためのオールインワンです。NPMを独自のDocker Composeに分割することで、より柔軟なソリューションに拡張できます。
- DMZネットワーク: 192.168.1.0/24
  - NPM（外部）: 192.168.1.250
- LANネットワーク: 10.0.0.0/24
- RSBackendネットワーク: 192.168.254.0/29
  - NPM（内部）: 192.168.254.1
  - HBBS: 192.168.254.2
  - HBBR: 192.168.254.3
- Dockerホスト: Linux
  - 各アプリケーションは`/opt/`に専用フォルダーを持っています。
- ホスト名: uniquehostname（これを変更してください）
- DNS名: rustdesk.example.com

必要に応じて例を修正してください。

## Dockerの準備
Dockerが既にインストールされている必要があります。このガイドではその詳細には触れません。

RustDeskサーバーバックエンドとDMZ用のネットワークを作成する必要があります。
NPM（Nginx Proxy Manager）と使用する各アプリケーションには、それを分離するための専用バックエンドネットワークが必要です。

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

## ファイアウォールの設定
パブリックIPからNPMサーバーへの次のポート転送/NATポートを設定してください。
- 21114 => 8080 TCP
- 21115 => 21115 TCP
- 21116 => 21116 TCP/UDP
- 21117 => 21117 TCP
- 21118 => 21118 TCP
- 21119 => 21119 TCP
- 443 => 443 TCP  # SSLを使用したい場合

## Docker Composeの設定
これはNPMと正しいネットワークでコンテナを開始します。

以下をdocker-compose.yamlにコピーしてください。

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
    hostname: uniquehostname   # これを変更してください
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

## NPMの設定
次のポートのストリームホストを設定してください:
- 21115 => 192.168.254.2:21115 TCP
- 21116 => 192.168.254.2:21116 TCP / UDP
- 21117 => 192.168.254.3:21117 TCP
- 21118 => 192.168.254.2:21118 TCP
- 21119 => 192.168.254.3:21119 TCP
- 80 => 127.0.0.1:8080 TCP # ローカルトラフィックをキャッチ

プロキシホストを設定してください:
- ドメイン名: rustdesk.example.com
- スキーム: http
- 転送ホスト名 / IP: 192.168.254.2
- 転送ポート: 21114
- 一般的な攻撃をブロック: チェック済み
- オプション: SSLを設定 **（必須にしないでください - クライアントはSSLなしで通信できる必要があります。）**

## RustDeskサーバーの設定
サーバーインターフェース http://rustdesk.example.com または https://rustdesk.example.com（Webインターフェース用にSSLを設定した場合）に接続してください。

## RustDeskクライアントの設定
クライアントを設定してください:
- IDサーバー: rustdesk.example.com
- リレーサーバー: rustdesk.example.com
- APIサーバー: http://rustdesk.example.com（SSLを設定した場合はHTTPSを使用）
- キー: {サーバーキーをここに}

## 最終結果
あなたのソリューションはプロキシマネージャーを通じて外部からアクセス可能になります。RustDeskサーバーを他のシステムから分離できます。特に分離設定システムを使用し、共通のNPMの背後に他のアプリケーション/サイトがある場合に特に有効です。