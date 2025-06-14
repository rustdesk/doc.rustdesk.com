---
title: Synology DSM 6
weight: 22
---

> サードパーティによる代替の最新チュートリアルは[こちら](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/)にあります。

このチュートリアルは最新の DSM v6 と v7 に基づいています。

{{% notice note %}}
DSM 7.2 アップデート後、Docker は新しい「Container Manager」にアップグレードされました。代わりに[この記事](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7)をご確認ください。
{{% /notice %}}

## Docker をインストール

| パッケージセンターを開く | Docker をインストール |
| --- | --- |
| ![](images/package-manager.png) | ![](images/docker.png) |

## RustDesk Server をインストール

| Docker のレジストリで rustdesk-server を検索し、ダブルクリックでインストール | インストールされた rustdesk-server イメージ、ダブルクリックで rustdesk-server コンテナを作成 |
| --- | --- |
| ![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png) |

## hbbs コンテナを作成

上記の通り、rustdesk-server イメージをダブルクリックして新しいコンテナを作成し、名前を `hbbs` に設定します。
![](images/hbbs.png)

上記の `詳細設定` をクリックします。

- `自動再起動を有効にする` を有効にします。
![](images/auto-restart.png)

- `Docker ホストと同じネットワークを使用する` を有効にします。ホストネットについて詳しくは、[こちら](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host)をご確認ください。
![](images/host-net.png)

- ホストディレクトリ（例：`/home/rustdesk/`）を `/root` にマウントします。hbbs はこのディレクトリにいくつかのファイル（データベースと `key` ファイル）を生成し、これらは再起動後も永続化される必要があります。

| マウント | ホストディレクトリに生成されるファイル |
| --- | --- |
| ![](images/mount.png) | ![](images/mounted-dir.png) |

- コマンドを設定
{{% notice note %}}
Synology の OS は Debian ベースなので、ホストネット（--net=host）は正常に動作します。`-p` オプションでポートをマップする必要はありません。

{{% /notice %}}

![](images/hbbs-cmd.png?v3)

- 完了

## hbbr コンテナを作成

上記の `hbbs` の手順を繰り返しますが、コンテナ名を `hbbr` にし、コマンド（コマンド設定ステップ）は `hbbr` にしてください。

![](images/hbbr-config.png)

## hbbr/hbbs コンテナ

![](images/containers.png)

| コンテナをダブルクリックしてログを確認 | hbbs/hbbr がホストネットワークを使用していることを再確認 |
| --- | --- |
| ![](images/log.png) | ![](images/network-types.png) |

## キーを取得

File Station を使用して以前に設定したフォルダを参照し、`id_ed25519.pub` をダウンロードしてテキストエディタで開いてキーを確認します。