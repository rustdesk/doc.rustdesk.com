---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro はオープンソース版と比較してより多くの機能を持っています。

- アカウント
- [Webコンソール](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/)、[LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/)、[2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- アドレス帳
- ログ管理（接続、ファイル転送、アラームなど）
- デバイス管理
- [セキュリティ設定の同期](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [アクセス制御](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [複数のリレーサーバー](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)（最も近いリレーを自動選択）
- [カスタムクライアントジェネレーター](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Webクライアントのセルフホスト

{{% notice note %}}
ご自宅/オフィスで独自のサーバーを構築し、パブリック IP/ドメインを通じて接続できない場合は、[この記事](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/)をご確認ください。
{{% /notice %}}

{{% notice note %}}
続行する前に、まずこれを読むことをお勧めします：[セルフホストサーバーはどのように動作するか？](/docs/en/self-host/#how-does-self-hosted-server-work)
{{% /notice %}}

## ハードウェア要件

最低レベルのVPSで使用ケースには十分です。サーバーソフトウェアはCPUとメモリを集約的に使用しません。2 CPU/4 GB Vultrサーバーでホストされている私たちのパブリックIDサーバーは、100万以上のエンドポイントにサービスを提供しています。各リレー接続は平均毎秒180kbを消費します。1つのCPUコアと1GのRAMで1000の同時リレー接続をサポートするのに十分です。

## 記事チュートリアル
[ステップバイステップガイド：セキュアなリモートアクセスのためのDockerを使用したクラウドでのRustDesk Server Proのセルフホスト](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## ビデオチュートリアル

[初心者ガイド：Linux初心者ユーザー向けRustDesk Server Proのセルフホスト](https://www.youtube.com/watch?v=MclmfYR3frk)

[クイックガイド：上級Linuxユーザー向けRustDesk Server Proのセルフホスト](https://youtu.be/gMKFEziajmo)


## ライセンス

https://rustdesk.com/pricing.html からライセンスを取得できます。詳細については[ライセンス](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)ページをご確認ください。

## 開始方法
### 1. インストール

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

詳細については、[Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/)をご確認ください。

### 2. 必要なポート

`21114`-`21119` TCPと`21116` UDPポートを開く必要があります。ファイアウォールルールとDockerポートマッピングを設定する際に、これらのポートが設定されていることを確認してください。

これらのポートに関する詳細情報については、[こちら](/docs/en/self-host/rustdesk-server-oss/install/#ports)をご確認ください。

### 3. ライセンスの設定

`http://<サーバーIP>:21114`にアクセスしてWebコンソールを開き、デフォルトの認証情報admin/test1234 `admin`/`test1234`を使用して[ログイン](/docs/en/self-host/rustdesk-server-pro/console/#log-in)します。[このガイド](/docs/en/self-host/rustdesk-server-pro/license/#set-license)に従ってライセンスを設定してください。

### 4. WebコンソールのHTTPS設定

> 試用中にHTTPSを使用したくない場合はこのステップをスキップできますが、HTTPS設定後にクライアントのAPIアドレスを変更することを忘れないでください

こちらは簡単な[手動HTTPS設定](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)のチュートリアルです。

### 5. セルフホストサーバーを使用するためのクライアント設定

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. WebSocketの設定

Webクライアントまたは[デスクトップ/モバイルクライアント](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket)がWebSocketで適切に動作するように有効にするには、リバースプロキシ設定に以下の設定を追加する必要があります。

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## サーバーのアップグレード

この[ガイド](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade)では、RustDesk Server Proを低いバージョンからアップグレードする方法を、異なるインストール方法に対応してカバーしています。

## 新しいホストへの移行とバックアップ/復元

詳細な[チュートリアル](https://github.com/rustdesk/rustdesk-server-pro/discussions/184)がこちらにあります。

## ライセンスの移行

この[ガイド](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration)に従ってください。

## ライセンスのアップグレード

[このガイド](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license)に従って、いつでもより多くのユーザーとデバイス用にライセンスをアップグレードできます。

## セキュリティについて

https://github.com/rustdesk/rustdesk/discussions/9835