---
title: インストール
weight: 10
---

## 簡単に自分専用のサーバーを構築できます
-----------

### STEP-1 : サーバーサイドソフトウェアのダウンロード

[ダウンロード](https://github.com/rustdesk/rustdesk-server/) もしくはDocker [rustdesk/rustdesk-server](https://hub.docker.com/r/rustdesk/rustdesk-server/tags) からダウンロードします。

対応するプラットフォーム:
  - Linux
  - Windows

このドキュメントではLinux用ビルドを使用して構築します。

ビルドには2つの実行ファイルとフォルダがあります:
   - hbbs - RustDesk ID/Rendezvous サーバー
   - hbbr - RustDesk リレーサーバー

Centos7 でビルドされ Centos7/8, Ubuntu18/20 で動作確認されています。

#### サーバーの要件
ハードウェアの要件は非常に低くクラウドサーバーの最小構成で十分でありCPUとメモリは必要最低限で済みます。ネットワーク帯域については、TCPホールパンチングへのダイレクト接続に失敗した場合に中継トラフィックを使用します。中継トラフィックは解像度設定や画面更新速度にもよりますが 30K-3M/s (1920x1080画面) ほどです。 オフィスワーク需要のみであれば、100K/s程度のトラフィックになります。


### STEP-2 : サーバ上でhbbsとhbbrを実行します

あなたのサーバー (Centos または Ubuntu) でhbbs/hbbrを実行します。[pm2](https://pm2.keymetrics.io/) を使用してサービスを管理することを推奨します。

```
./hbbs -r <relay-server-ip[:port]> 
./hbbr 
```

もしくは hbbs/hbbr を pm2 を使用して実行します

```
pm2 start hbbs -- -r <relay-server-ip[:port]> 
pm2 start hbbr 
```

<a name="demo"></a>
{{% notice note %}}
pm2 を動作させるには nodejs v16+ が必要です。pm2 を実行できない場合 (例えば `pm2 list` に hbbs/hbbr が表示されない時) はLTS版の node.js を https://nodejs.org からダウンロードしインストールしてください。もし hbbs/hbbr を再起動後に自動実行させたいなら `pm2 save` と `pm2 startup` を確認してみてください。 詳しくは [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) から確認できます。 ログを記録するのは [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) を使うのがオススメです。

hhbsの `-r` パラメータは必須ではなくサーバー側で指定するとクライアント側で中継サーバを指定せず済むので便利です。またデフォルトの 21117 ポートを使う場合はポートを指定する必要はありません。クライアント側が指定するリレーサーバーはこれよりも優先度が高いです。 **RustDeskコントロールクライアント 1.1.9 以降では中継サーバーが別のホストやポートで動作していない場合、クライアント側でも中継サーバーのアドレスを指定する必要はありません。**
{{% /notice %}}

デフォルトでは hbbs は 21115(tcp) と 21116(tcp/udp) と 21118(tcp) を使用し hbbr は 21117(tcp) と 21119(tcp) を使用します。ファイアウォールでこれらのポートを必ず開放してください。**21116はTCPとUDPの両方で開放する必要があることに注意してください。** 21115 はNATタイプの確認、21116/UDP はTCPホールパンチング,コネクションサービス、21117はリレーサービス、21118 と 21119 はWebクライアントのサポートに使用します。ウェブクライアント(21118, 21119) のサポートが不要な場合は該当するポートを無効にしても良いです。

- TCP(**21115, 21116, 21117, 21118, 21119**)
- UDP(**21116**)

また "-h" オプションをつけて実行するとヘルプが表示されますのでお好みのポートを指定してください。

#### Dockerの例

##### Linux/amd64
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr 
```

##### Linux/arm64v8
```
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbr 
```

<a name="net-host"></a>

{{% notice note %}}
--net=host は私の知る限り Linux のみで動作し hbbs/hbbr はコンテナのip (172.17.0.1) ではなく実際の接続ipを参照します
もし --net=host がうまく動けば -p オプションは使用しません。

**お使いのプラットフォームで接続に問題がある場合は --net=host を削除してください**
{{% /notice %}}


### STEP-3 : クライアント側でhbbs/hbbrのアドレスを設定する

IDの右側にあるメニューボタンをクリックし "ID/Relay Server" を選択します。

![](/docs/en/self-host/install/images/server-set-menu.png)

IDサーバ入力欄にhbbsのホストまたはipアドレスを入力します（ローカル側＋リモート側）他の2つのアドレスは空白でも構いません。特に設定しない場合はRustDeskが自動的に入力します。中継サーバーはhbbr (21117ポート) を参照します。

例:

```
hbbs.example.com
```

または

```
hbbs.example.com:21116
```

![](/docs/en/self-host/install/images/server-set-window.png)

#### rustdesk.exe のファイル名を変更して設定する (Windowsのみ)

`rustdesk.exe` を rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe に変更します。例: rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe 設定情報は about ウィンドウに以下のように表示されます。

{{% notice note %}}
`host` と `key` の両方を設定する必要がありどちらか片方でも欠けていると動作しません。
{{% /notice %}}

| メニュー | About ページ |
| -- | -- |
![](/docs/en/self-host/install/images/aboutmenu.png) | ![](/docs/en/self-host/install/images/lic.png) |

## 鍵
-----------
古いバージョンとは異なりこのバージョンでは鍵が必須ですが自分で設定する必要はありません。hbbs が初めて起動された時に暗号化された秘密鍵と公開鍵のペアが自動的に生成されます (それぞれ実行ディレクトリの `id_ed25519` と `id_ed25519.pub` ファイルにあります)

前のステップで `Key:` (公開鍵ファイル `id_ed25519.pub` の内容) を記入しなかった場合接続には影響しませんが接続は暗号化されません。

````
cat ./id_ed25519.pub
````

もし鍵のないユーザが暗号化されていない接続を確立することを禁止したい場合は、hbbs と hbbr を実行する際に `-k _` パラメータを追加してください。
````
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
````

鍵を変更したい場合は `id_ed25519` と `id_ed25519.pub` を削除し hbbs/hbbr を再起動すると新しい鍵ペアが生成されます。
