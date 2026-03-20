---
title: Windowsインストール (deprecated)
weight: 5
description: "RustDesk のWindowsインストール (deprecated)に関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk server pro windows", "rustdesk pro windows install", "rustdesk self-host pro windows", "rustdesk windows install deprecated", "rustdesk pro license windows"]
---

## Windows インストール経路を使うべきですか？

このガイドは、RustDesk Server Pro のホストをどうしても Windows のままにする必要がある場合だけ使ってください。新規導入では、自動化、更新、安定運用のしやすさから Linux または [Docker](/docs/ja/self-host/rustdesk-server-pro/installscript/docker/) のほうが依然として標準的な選択です。

## Windows インストールのクイック回答

- これは旧方式であり、推奨導入方法ではありません。
- 開始前に Microsoft Visual C++ Redistributable を入れてください。
- 旧 GUI インストーラーはすでに保守されていません。
- 長期的に安定運用したいなら、可能なら Linux または Docker へ移行してください。
- Windows を使い続ける場合は、サービスの実行方法と Web コンソールのプロキシを事前に設計してください。

{{% notice note %}}
Windowsのセキュリティポリシーは複雑です。このチュートリアルがうまくいかない、または不安定な接続が発生する場合は、Linuxサーバーに移行してください。
{{% /notice %}}

{{% notice note %}}
GUI版の`RustDeskServer.setup.exe`はもうメンテナンスされておらず、推奨されません。
{{% /notice %}}

## インストール

Windowsでrustdeskを実行するにはMicrosoft Visual C++ Redistributableが必要です。[こちら](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)からダウンロードできます。

1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)からライセンスを取得し、詳細については[ライセンス](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)ページを確認してください。
2. [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)からWindowsインストーラーをダウンロードしてください。
3. Windowsインストーラーを解凍してください。
4. インストーラーを実行し、画面の指示に従ってください。または[PM2またはNSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/)で手動インストールしてください。
5. 完了したらRustDesk Serverを開いてください。
6. インストールをガイドするプロンプトに従ってください。
7. `Services`をクリックし、次に`Start`をクリックしてください。
8. インストールが完了したら`http://youripaddress:21114`にアクセスしてください。
9. ユーザー名`admin`、パスワード`test1234`でログインしてください。
10. ステップ1で購入したライセンスコードを入力してください。

## IISをプロキシとして使用

`Dynamic Content Compression`がインストールされていることを確認してください（これはサーバー役割でインストールできるIIS機能です）。
1. IISを開く（またはインストールする）。
2. RustDesk用の新しいウェブサイトをバインディング（理想的には443）と関連証明書で作成してください。基本設定は空のフォルダーを指す必要があります。（デフォルトサイトを使用する場合は、フォルダーに他のファイルがないことを確認してください）。
3. IISで[Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing)と[URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module)をインストールしてください。

## Application Request Routing

1. IISサーバーホストの下でApplication Request Routingを開いてください。
2. Server Proxy Settingsに移動してください。
3. プロキシを有効にすると、すべての設定が表示されます。デフォルトのままにしておくことができます。
4. 設定を保存し、次のステップにURL Rewriteに進みます。

## URL Rewrite

1. 左ペインでIISのサイトを開き、URL Rewriteをダブルクリックしてください。
2. `Add rules`をクリックしてください。
3. 新しいリバースプロキシルールを設定してください。
4. ローカルアドレス（21114アドレス）を設定してください\
Inbound Rule – RustDesk内部 21114アドレス\
Outbound Rules – `From`はRustDesk内部 21114アドレス、`To`は外部アドレスです。\
注意：アドレスの前にhttp / httpsは付けないでください – 自動的に処理されます。また、すべてのアドレスが内部および外部の両方からアクセス可能であることを確認してください。

## 圧縮

1. `Dynamic Content Compression`を無効にしてください。

## トラブルシューティング

500.52エラーが発生した場合は、記載されている変数を追加してください：[IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259)。

SSL設定を「Require SSL → Ignore」に変更する必要があるかもしれません。
