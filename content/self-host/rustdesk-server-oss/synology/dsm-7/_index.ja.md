---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
DSM 7.2 アップデート後、Synology は「Docker」パッケージを「Container Manager」に名前変更しました。新しい GUI を提供し、GUI 内に「docker-compose」が含まれており、Docker をより簡単に作成できます。

### サポートされるモデルと要件

Container Manager は J シリーズなどの一部のローエンドモデルに ARM64 サポートをもたらします。サポートされるモデルの詳細なリストについては、[Synology ウェブサイト](https://www.synology.com/en-us/dsm/packages/ContainerManager)をご確認ください。
ほとんどの場合、Docker と RustDesk Server をインストールするために追加の RAM をインストールする必要はありません。

### 1. Container Manager（Docker）をインストール

「パッケージセンター」を開き、「Container Manager」を検索してインストールします。

![](images/dsm7_install_container_manager_though_package_center.png)

### 2. フォルダを作成

「Container Manager」をインストールすると、`docker` という共有フォルダが作成されます。ここにサーバーのデータを置きましょう。

File Station を開き、`rustdesk-server`（またはお好みの名前）という名前のフォルダを作成します。次に、画像のようにその中に `data` という名前のフォルダを作成します。

![](images/dsm7_create_required_folders.png)

### 3. コンテナを作成

Container Manager を開き、プロジェクトに移動して作成をクリックします。

プロジェクト名 `rustdesk-server` を入力し、ソースを「compose.yml をアップロード」から「compose.yml を作成」に変更し、以下の内容をボックスにコピーします。

![](images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Pro をインストールしたい場合は、これを rustdesk/rustdesk-server-pro:latest に変更してください。
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Pro をインストールしたい場合は、これを rustdesk/rustdesk-server-pro:latest に変更してください。
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# docker host モードを使用するため
# ポートを忘れた場合に備えて：
# 21114 TCP ウェブコンソール用、Pro バージョンでのみ利用可能
# 21115 TCP NAT タイプテスト用
# 21116 TCP TCP ホールパンチング
# 21116 UDP ハートビート/ID サーバー
# 21117 TCP リレー
```

「ウェブポータル設定」をスキップして完了してください。

### 4. 動作確認

File Station を開くと、`docker/rustdesk-server/data` フォルダに `id_ed25519`、`id_ed25519.pub` が表示されるはずです。これをダウンロードして、任意のテキストエディタまたは [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor) で開くことができます。これは RustDesk クライアントに必要な公開キーです。

公開キーは次のようになります：

![](images/dsm7_viewing_public_key_though_syno_text_editor.png)

クライアントの設定については[こちら](/docs/en/client)をご確認ください。`ID サーバー` と `キー` のみが必要です。`hbbs` で設定しているため `リレーサーバー` は不要で、`hbbs` がこの情報を自動的に提供します。

### 5. ルーターでポート転送を設定

ルーターの管理ウェブページに移動し、「ポート転送」に関連するものを見つけます。これは「WAN」または「ファイアウォール」設定に表示されるはずです。

まだ設定が見つからない場合は、Google で `{ルーターブランド} + ポート転送` または `{ルーターモデル} + ポート転送` を検索してください。このデバイスが ISP からのものである場合は、彼らにお尋ねください。

これらの必要なポートを開いてください：
  * `21114` TCP ウェブコンソール用、Pro バージョンでのみ利用可能
  * `21115` TCP NAT タイプテスト用
  * `21116` TCP TCP ホールパンチング
  * `21116` UDP ハートビート/ID サーバー
  * `21117` TCP リレー