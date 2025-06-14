---
title: インストール
weight: 2
---

## 方法1: Docker（推奨）

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

詳細は[Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/)をご確認ください。

## 方法2: install.sh

Linuxに精通している場合は、以下のスクリプトを使用してください。そうでない場合、失敗したときに重大な問題が発生し、なぜ動作しないのかを特定するのが困難になる場合があります。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

詳細は[install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/)をご確認ください。

## オープンソースからの変換

### Docker
Dockerを使用してオープンソース版をインストールした場合、直接変換する方法はありません。代わりに、Proイメージで新しいコンテナを実行する必要があります。これを行う前に、秘密鍵（`id_ed25519`ファイル、`id_ed25519.pub`ではない）をバックアップしてください。新しいコンテナが設定されたら、古い`id_ed25519`秘密鍵ファイルを新しいコンテナの作業ディレクトリにコピーし、コンテナを再起動してください。

### install.sh
install.shを使用してオープンソース版をインストールした場合は、[ここ](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source)に従ってください。