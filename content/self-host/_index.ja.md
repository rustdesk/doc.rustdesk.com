---
title: セルフホスト
description: "独自の RustDesk サーバーをセルフホストする方法を学びましょう。安全なリモートデスクトップアクセスのための RustDesk サーバーインフラストラクチャのインストール、設定、デプロイメントを網羅した完全ガイド。"
keywords: ["rustdesk セルフホスト", "rustdesk サーバー", "リモートデスクトップサーバー", "セルフホストガイド", "rustdesk インストール", "hbbs hbbr", "rustdesk プロサーバー"]
weight: 5
pre: "<b>2. </b>"
---

RustDesk を使用している場合は、独自の RustDesk サーバーを持つべきです。これらのドキュメントは、あなたの RustDesk の旅に役立ちます。

OSS については [Discord](https://discord.com/invite/nDceKgxnkV) で、Pro については[メール](mailto:support@rustdesk.com)でサポートを利用できます。

## セルフホストサーバーはどのように動作しますか？

技術的には2つの実行可能ファイル（サーバー）があります：

- `hbbs` - RustDesk ID（ランデブー / シグナリング）サーバー、TCP（`21114` - Pro のみの http、`21115`、`21116`、`21118` Web ソケット用）および UDP（`21116`）でリッスン
- `hbbr` - RustDesk リレーサーバー、TCP（`21117`、`21119` Web ソケット用）でリッスン

インストールスクリプト / docker compose / deb でインストールすると、両方のサービスがインストールされます。

RustDesk クライアントが `hbbr` / `hbbs` とどのように通信するかの[図解](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F)はこちらです。

RustDesk がマシン上で実行されている限り、マシンは常に ID サーバー（`hbbs`）に ping して、現在の IP アドレスとポートを知らせます。

コンピューター A からコンピューター B への接続を開始すると、コンピューター A は ID サーバーに連絡し、コンピューター B との通信を要求します。

ID サーバーは、ホールパンチングを使用して A と B を直接接続しようとします。

ホールパンチングが失敗した場合、A はリレーサーバー（`hbbr`）を介して B と通信します。

ほとんどの場合、ホールパンチングは成功し、リレーサーバーは使用されません。

[rustdesk サーバーをセルフホストすべきか？](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)についての議論はこちらです

## 必要なポート

RustDesk サーバーのセルフホスティングに必要なポートは、主に環境と RustDesk で何をしたいかによって大きく異なります。ドキュメント全体で示されている例では、一般的にすべてのポートを開くことが推奨されています。

コアポート：\
TCP `21114-21119` \
UDP `21116`

上記の `21115-21117` は RustDesk が動作するために必要な最小ポートで、これらはシグナルとリレーポートおよび NAT トラバーサルを処理します。

TCP ポート `21118` と `21119` は [RustDesk Web クライアント](https://rustdesk.com/web/)の WebSocket ポートで、HTTPS をサポートするにはリバースプロキシが必要です。この[サンプル Nginx 設定](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client)を参照してください。

SSL プロキシなしの Pro ユーザーの場合、API が動作するように TCP ポート `21114` を開く必要があります。または、SSL プロキシを使用して TCP ポート `443` を開いてください。

{{% children depth="4" showhidden="true" %}}