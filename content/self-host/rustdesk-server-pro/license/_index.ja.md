---
title: ライセンス
weight: 15
---

### ライセンスの購入

[https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)からライセンスを取得し、Stripeチェックアウトページで有効なメールアドレスを入力してください。支払いが成功裏に完了すると、ライセンス（および別メールで請求書）があなたのメールに送信されます。

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

### ライセンスの設定

Webコンソール（`http://<rustdesk-server-pro-ip>:21114`）でライセンスを入力するか、後でライセンスを変更する必要があります。

| ライセンス設定 | ライセンス変更 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

### ライセンスの更新/アップグレード

ライセンスの更新/アップグレードは、以下に説明する[セルフサービスライセンスポータル](https://rustdesk.com/self-host/account/)から見つけることができます。上の図のようにライセンスの購入に使用したメールでログインしてください。

| 更新/アップグレードアクション付きライセンスページ | アップグレードウィンドウ |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

支払い後、アクティベートするために[以下のように](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license)ライセンスを更新してください。

#### ライセンスの更新
支払い後、以下のようにWebコンソールに進んで手動でアクティベートする必要があります。`編集`をクリックし、次に`OK`をクリックするだけで、ライセンスキーは同じのままなので何も編集する必要はありません。

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

### 請求書、ライセンス取得および移行

ライセンスは1台のマシンでのみ使用できます（hbbsのみ、hbbrはライセンス不要）。他のマシンに移行したい、ライセンスを取得したい、または請求書をダウンロードしたい場合は、[https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/)に移動してください。Stripeチョックアウトに使用したメールアドレスでログインし、以下のように移行元の古いマシンのバインドを解除し、新しいサーバーのWebコンソールでライセンスを設定すると、ライセンスが割り当てられ、コンソールに自動的に登録されます。

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

### プロキシ
サーバーがインターネットに直接アクセスしてライセンスを確認できない場合、プロキシを追加できます。例：`proxy=http://username:password@example.com:8080 ./hbbs`。

または、作業ディレクトリ（`id_ed25519` / `db.sqlite3`ファイルがある場所）の`.env`ファイルに`proxy=http://username:password@example.com:8080`を追加することもできます。

`http`は`https`または`socks5`に置き換えることができます。`username` / `password` / `port`がない場合は、`proxy=http://example.com`でも構いません。