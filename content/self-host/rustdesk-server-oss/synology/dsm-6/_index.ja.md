---
title: Synology DSM 6
weight: 22
---

このチュートリアルは最新のDSM v6を使用しています。

### Docker のインストール

パッケージマネージャを開き、dockerをインストールします

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](images/package-manager.png) | ![](images/docker.png)


### RustDeskサーバーのインストール

| Dockerのレジストリからrustdesk-serverを検索しダブルクリックでインストールします | rustdesk-server イメージをインストールしダブルクリックで rustdesk-server コンテナを作成します |
| --------------- | -------------------------------------------------------- |
![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png)


### hbbsコンテナの作成

上記のように rustdesk-server イメージをダブルクリックして新しいコンテナを作成し名前を `hbbs` にします。
![](images/hbbs.png) 

"Advanced Settings" をクリックします。

- 自動再起動を有効にする
![](images/auto-restart.png) 

- "Use the same network as Docker host" を有効にします。 ホストの詳細については [こちら](/docs/en/self-host/install/#net-host) を確認してください
![](images/host-net.png) 

- コンテナ内のホームディレクトリ `/root` をホストディレクトリ (例: `Shared/test/`) に配置するとhbbsはこのディレクトリにいくつかのファイル (`鍵`ファイルを含む) を生成します
| 配置 | ホームディレクトリに生成されるファイル |
|-- | -- |
![](images/mount.png?width=500px) | ![](images/mounted-dir.png?width=300px) 

- コマンドの設定
{{% notice note %}}
Synology の OS は Debian ベースなのでホストネット (--net=host) は問題なく動作するので `-p` オプションでポートをマッピングする必要はありません。

`192.168.16.98` はプライベートネットワークのIPでここではデモのために使用しています。デプロイ時にはパブリックIPに設定してください。

{{% /notice %}}

![](images/hbbs-cmd.png?v2) 

- 完了
  
![](images/hbbs-config.png) 

### hbbr コンテナの作成

上記の `hbbs` の手順を繰り返してください。ただしコンテナ名を `hbbr` にコマンドを `hbbr` に変更してください。

![](images/hbbr-config.png) 

### hbbr/hbbs コンテナ

![](images/containers.png?width=500px)


| コンテナをダブルクリックしログを確認する | ホストネットワークを使用したhbbs/hbbrの二重確認 |
|-- | -- |
![](images/log.png?width=500px) | ![](images/network-types.png?width=500px)

