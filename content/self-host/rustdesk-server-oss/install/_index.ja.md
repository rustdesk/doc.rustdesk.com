---
title: インストール
weight: 1
---

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
