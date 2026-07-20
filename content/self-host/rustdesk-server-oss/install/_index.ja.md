---
title: インストール
weight: 1
description: "RustDesk のインストールに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk server install", "install rustdesk server oss", "rustdesk docker install", "rustdesk server firewall ports", "rustdesk hbbs hbbr install", "rustdesk self-host install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## クイックアンサー

新規の RustDesk Server OSS 導入では、ほとんどの場合 Docker が最も速い方法です。ネイティブの Linux インストールは、systemd サービスや手動管理のホスト構成を明確に求める場合だけ選んでください。

## 重要なポイント

- クライアントには `ID Server` の値が必要です
- クライアントにはサーバーの公開 `Key` が必要です
- `API Server` は Pro 機能を使う場合にのみ必要です

<!-- GEO-LOCALIZED-INTRO:END -->

## ビデオチュートリアル
YouTubeには多くのビデオチュートリアルがあります、https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials。

## サーバー要件
ハードウェア要件は非常に低く、基本的なクラウドサーバーの最小構成で十分で、CPUとメモリの要件は最小限です。Raspberry Piや同様のものも使用できます。ネットワークサイズに関しては、TCPホールパンチング直接接続が失敗した場合、リレートラフィックが消費されます。リレー接続のトラフィックは、解像度設定と画面更新に応じて30 K/sから3 M/s（1920x1080画面）の間です。オフィス作業の需要のみの場合、トラフィックは約100 K/sです。

## ファイアウォール
UFWをインストールしている場合は、次のコマンドを使用してファイアウォールを設定してください：
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

{{% notice warning %}}
WebSocket を有効にしている場合（[ウェブクライアント](https://rustdesk.com/web/)用にポート `21118`/`21119` を開放している場合）、`hbbs`/`hbbr` は、WebSocket トラフィックがリバースプロキシ（[WSS](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms)）を経由してもクライアントの実 IP が失われないように、受信した WebSocket 接続の `X-Real-IP` / `X-Forwarded-For` ヘッダーを信頼してクライアントの実 IP を判定します。これらのヘッダーは検証されないため、`21118`/`21119` に直接アクセスできる者は、偽造ヘッダーで任意の IP アドレスを偽装でき、IP ベースのレート制限やブロックを回避したり、ログに記録される IP アドレスを偽ったりできます。

ウェブクライアントを使用する場合は、`X-Real-IP` を自ら設定するリバースプロキシ経由でのみ WebSocket ポートを公開し、ファイアウォールルールで `21118`/`21119` への接続をリバースプロキシからのみに制限してください。ウェブクライアントを使用しない場合は、ポート `21118`、`21119` を閉じたままにしてください。
{{% /notice %}}

## インストール
### 方法1：Docker（推奨）

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

詳細については、[Docker](/docs/en/self-host/rustdesk-server-oss/docker/)をご確認ください。

### 方法2：シンプルなインストールスクリプトを使用してsystemdサービスとして独自のサーバーをインストール
スクリプトは[Techahold](https://github.com/techahold/rustdeskinstall)でホストされており、私たちの[Discord](https://discord.com/invite/nDceKgxnkV)でサポートされています。

現在、スクリプトはリレーおよびシグナルサーバー（hbbrとhbbs）をダウンロードしてセットアップし、設定を生成し、クライアントへの簡単なデプロイのためにパスワード保護されたWebページでホストします。

次のコマンドを実行してください：
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

[Techahold](https://github.com/techahold/rustdeskinstall)のリポジトリには更新スクリプトもあります。

そこから、インストールの最後に表示されるIP/DNSとキーをメモし、それらをクライアントの設定 > ネットワーク > ID/リレーサーバーの`IDサーバー`と`キー`フィールドにそれぞれ挿入し、他のフィールドは空白のままにしてください（下記の注を参照）。

### 方法3：Debianディストリビューション用のdebファイルを使用してsystemdサービスとして独自のサーバーをインストール

[ダウンロード](https://github.com/rustdesk/rustdesk-server/releases/latest)からdebファイルを自分でダウンロードし、`apt-get -f install <filename>.deb`または`dpkg -i <filename>.deb`でインストールしてください。

## クライアントの設定
[こちら](/docs/en/self-host/client-configuration/#2-manual-config)をご確認ください。
