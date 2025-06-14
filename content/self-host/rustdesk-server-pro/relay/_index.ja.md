---
title: リレーサーバーの設定
weight: 17
---

### RustDesk Pro - dockerを使用してジオロケーション付きの追加リレーサーバーをインストール

{{% notice note %}}
[シンプルインストール](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/)は、同じマシン上に暗黙的にリレーサーバー（`hbbr`プロセス）を作成します。リレーサーバーを明示的に指定する必要はありません。

別のマシン上に追加のリレーサーバーを明示的に作成したい場合は、[OSS インストール](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)に従って`hbbr`を実行してください。`hbbr`は`rustdesk-server-linux-amd64.tar.gz`、`rustdesk-server-hbbr_<version>-<arch>.deb`、`rustdesk-server-windows-x86_64.tar.gz`、または`docker`（`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`）で見つけることができます。

`hbbr`はライセンスを必要とせず、オープンソース版と同じです。
{{% /notice %}}

世界中で複数のリレーサーバーを実行し、ジオロケーションを自動的に活用して最寄りのリレーサーバーを使用することで、リモートコンピューターへの接続時により高速な体験を得ることができます。`hbbs`は数秒ごとに自動的にこれらのリレーサーバーがオンラインかどうかを確認し、オンラインのリレーサーバーのみを選択します。

{{% notice note %}}
既知の問題: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> 秘密鍵ペア`id_ed25519`と`id_ed25519.pub`が必要です。

1 - dockerがすでにインストールされている場合、SSH経由でサーバーに接続し、hbbr用のボリュームを作成します。

```
# docker volume create hbbr
```

hbbrボリュームは`/var/lib/docker/volumes/hbbr/_data`に配置される必要があります。

2 - 秘密鍵ペアをボリュームの場所にコピーします。この場合、SCPを使用してファイルをコピーします。

コマンドの構文は`scp <パス/ファイル名> ユーザー名@サーバー:</宛先/パス>`です。

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - 以前に作成したボリュームを使用してhbbrコンテナをデプロイします。このボリュームには、プライベートリレーサーバーを実行するために必要な秘密鍵ペアが含まれています。

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - 実行ログを確認して、hbbrが鍵ペアを使用して実行されていることを確認します。

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

OSによっては、ファイアウォールを使用してIPをブロック/許可したい場合があります。

我々の場合、Ubuntuを実行して、ポート21117と21119へのTCP接続を許可したいと思います。

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**ファイアウォールを有効にする**
```
# sudo ufw enable
```

**ステータスを確認する**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

### Webコンソールを使用してジオロケーション用にRustDesk Proを設定

#### GeoLite2 Cityデータベースファイルの登録とダウンロード

ジオロケーションを使用するには、hbbsがMaxMind GeoLite2 Cityデータベースにアクセスする必要があります。データベースは無料で、登録してファイルをダウンロードし、APIキーを取得できます。

[ウェブサイト](https://www.maxmind.com/en/account/login)にアクセスしてアカウントを作成します（まだない場合）。
`Download Databases`に移動してGeoLite2 Cityをダウンロードし、gzipファイルを選択すると、解凍時に`mmdb`ファイルが得られます。

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Linuxマシンでインストールスクリプトを使用してRustDesk Proをインストールした場合、`mmdb`ファイルは`/var/lib/rustdesk-server/`に移動する必要があります。

Dockerインストールの場合、ファイルは`/root`にマップされたコンテナをデプロイする際にマップしたボリューム内にある必要があります。

#### プロセスを自動化するためのAPIキーの取得 - Linuxサーバー

このファイルを定期的に更新する必要があり、cronjobを使用できます。無料のダウンロードリンクにアクセスするためのAPIキーが必要です。

`Manage License Keys`に移動して新しいライセンスキーを生成します。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

[ダウンロードプロセス](https://dev.maxmind.com/geoip/updating-databases)をいくつかの方法で自動化できますが、前のステップで取得したAPIキーで{Your Access Key}を置き換えて、以下のコマンドをcrontabに追加してください。

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

#### RustDesk Pro Webコンソールで設定を変更

リレーサーバーのIPアドレスまたはDNS名（DNSはバージョン1.1.11以降でサポート）を`リレーサーバー`に追加します。**ポートは必要ありません。`21117`ポートが明示的に使用されます。** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

サーバーのIPアドレスとサーバーが配置されている座標を追加してジオオーバーライドを追加します。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

`Reload Geo`をクリックすると、リストは以下のようになります。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

結果を確認するには、`Reload Geo`をクリックした際のhbbsログを確認してください。リレーサーバーのIPアドレスとその座標を示すメッセージが表示されます。

> LinuxマシンでRustDesk Proを実行している場合は、コマンド`RUST_LOG=debug ./hbbs`を使用してログを表示します。Dockerコンテナで実行している場合は`docker logs hbbs`を使用します。

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

コンテナログを確認することで、hbbrインスタンスでリレー要求を直接確認することもできます。

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```