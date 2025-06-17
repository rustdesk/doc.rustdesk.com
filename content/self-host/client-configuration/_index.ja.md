---
title: クライアント設定
weight: 300
pre: "<b>2.3. </b>"
---

## 概要

RustDesk クライアントを自己ホスト型サーバーを使用するように設定する方法はいくつかあります。以下でその一部を説明します。

## 1. カスタムクライアントジェネレーター（Pro版のみ、基本プランまたはカスタムプラン）

独自の名前、ロゴ、アイコン、設定、署名などを持つことができます。

現在、Windows X64、Mac Arm64 / X64、[Linux](https://twitter.com/rustdesk/status/1788905463678951787)、Android Arm 64がサポートされています。

[動画](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. 手動設定

RustDesk クライアントのメインホームで、ID の横にあるメニューボタン [ &#8942; ] をクリックし、次にネットワークをクリックします。これで昇格した権限を使用して設定のロックを解除し、`ID`、`リレー`、`API`、`キー` を設定できます。この `キー` は接続暗号化に使用される公開鍵であり、Pro版購入時に提供されるライセンスキーとは異なることに注意することが重要です。

![](/docs/en/self-host/client-configuration//docs/en/self-host/client-configuration/images/network-config.png)

**ID サーバー** 入力ボックスに `hbbs` ホストまたは IP アドレス（ローカル側 + リモート側）を入力します。他の2つのアドレスは空白のままにできます。RustDesk が自動的に推定します（特別に設定されていない場合）。リレーサーバーは `hbbr`（ポート21117）を指します。

例

```nolang
hbbs.example.com
```

または

```nolang
hbbs.example.com:21116
```

### `キー` の設定

自己ホスト型サーバーとの暗号化された接続を確立するには、その公開鍵を入力する必要があります。キーは通常 `hbbs` の初回実行時に生成され、作業ディレクトリ/データフォルダの `id_ed25519.pub` ファイルで見つけることができます。

`Pro` ユーザーとして、[Web コンソール](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)から `キー` を取得することもできます。

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

### `API サーバー` の設定

これは `Pro` ユーザー専用です。Web コンソールにログインできるが、RustDesk クライアントでのログインに失敗する場合、おそらく `API サーバー` を正しく設定していません。

API サーバーがデフォルトの `21114` ポートで動作していない場合（オープンソース版から来た場合、このポートをファイアウォールに追加していない可能性があります）、`API サーバー` を明示的に指定してください。
例：API サーバーがデフォルトの HTTPS ポートで動作している場合、`https://hbbs.example.com` で `API サーバー` を指定してください。

まだ `API サーバー` の値を確認できない場合は、Web コンソールのウェルカムページに移動してください。`API サーバー` は上の画像に表示されています（`API:` ラベル付きの入力ボックス）。

## 3. インポートまたはエクスポートを使用した設定

1. [上記](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config)の手順を使用してデバイス上で RustDesk クライアントを設定します。
2. 上記のマシンを使用して設定に移動し、次にネットワークに移動してロックを解除します。
3. `サーバー設定をエクスポート` をクリックします。
4. コピーした文字列をメモ帳などに貼り付けます。
5. 新しいクライアントに移動し、上記をクリップボードにコピーします。
6. RustDesk クライアントで設定、次にネットワークに移動し、ロックを解除して `サーバー設定をインポート` をクリックします。
7. 自動的に設定が貼り付けられます。
8. `適用` をクリックします。

## 4. 自動設定

自動設定の最も簡単な方法は、[こちら](https://rustdesk.com/docs/en/self-host/client-deployment/)にあるデプロイメントスクリプトを使用することです。

## 5. `Pro` からクリップボード経由で設定をインポート

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. コマンドライン `--config` の使用
`rustdesk.exe --config <設定文字列>`

設定文字列は Web コンソール（上の画像で確認できます）または RustDesk クライアントの「設定 → ネットワーク」から取得できます（[こちら](https://github.com/rustdesk/rustdesk/discussions/7118)にこれに関する議論があります）。