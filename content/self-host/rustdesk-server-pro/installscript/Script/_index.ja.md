---
title: install.sh
weight: 4
---

{{% notice note %}}
[https://rustdesk.com/pricing/](https://rustdesk.com/pricing/)からライセンスを取得することをお忘れなく、詳細については[ライセンス](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)ページをご確認ください。

この簡単インストールを行う前に、まず[OSSインストール](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)をお読みください。そこでより多くの基礎的な詳細を知ることができます。
{{% /notice %}}

### インストール

RustDesk Server Proをインストールするために、上記のコマンドをLinuxターミナルにコピーして貼り付けてください。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
[Dockerイメージ](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose)の使用をお勧めします。ソリューションのデプロイや更新のプロセスが大幅に簡略化されます。リソース消費も非常に低いです。

書き込み権限のないディレクトリではなく、ホームディレクトリで上記を実行してください。
{{% /notice %}}

作業内容：

- 一部の依存関係をインストール
- 利用可能な場合、UFWファイアウォールを設定
- 作業ディレクトリ`/var/lib/rustdesk-server`とログディレクトリ`/var/log/rustdesk-server`を作成
- 実行ファイルを`/usr/bin`にインストール
- RustDesk Proサービスを上記フォルダにダウンロードして展開
- hbbsとhbbr用のsystemdサービスを作成（サービス名は`rustdesk-hbbs.service`と`rustdesk-hbbr.service`）
- ドメインを選択した場合、NginxとCertbotをインストールし、APIをポート`443`（HTTPS）で利用可能にし、ポート`80`でSSL証明書を取得し、自動更新されます。httpsの準備が整ったら、`https://あなたのドメイン.com:21114`ではなく`https://あなたのドメイン.com`でアクセスしてください。

{{% notice note %}}
[Webコンソール用のHTTPSを手動で設定する方法](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

{{% notice note %}}
systemdサービスの開始に失敗した場合、おそらくSELinuxに関連しています。[こちら](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux)をご確認ください。
{{% /notice %}}

{{% notice note %}}
クライアントがサーバーに接続できない、またはWebコンソールにアクセスできない場合は、[こちら](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall)をご確認ください。
{{% /notice %}}

### アップグレード

既存のRustDesk Server Proインストールをアップグレードするために、上記のコマンドをLinuxターミナルにコピーして貼り付けてください。これはローカルに保存してcronでスケジュールすることもできます。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
このスクリプトで問題が発生した場合、スクリプトを確認して手動で一つずつステップを実行することをお勧めします。

書き込み権限のないディレクトリではなく、ホームディレクトリで上記を実行してください。
{{% /notice %}}

作業内容：

- RustDesk Server Proの新しいバージョンを確認
- 新しいバージョンが見つかった場合、APIファイルを削除し、新しい実行ファイルとAPIファイルをダウンロード

### オープンソースからの変換

RustDesk ServerからRustDesk Server Proに変換するために、上記のコマンドをLinuxターミナルにコピーして貼り付けてください。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
ファイアウォールにTCPポート`21114`を追加してください。これはWebコンソールとRustDeskクライアントのユーザーログイン用の追加ポートです。
{{% /notice %}}

{{% notice note %}}
このスクリプトで問題が発生した場合、Dockerインストールに切り替えることをお勧めします。または、スクリプトを確認して手動で一つずつステップを実行することもできます。
{{% /notice %}}

作業内容：

- 古いサービスを無効化して削除
- 一部の依存関係をインストール
- 利用可能な場合、UFWファイアウォールを設定
- フォルダ`/var/lib/rustdesk-server`を作成し、証明書をコピー
- `/var/log/rustdesk`を削除し、`/var/log/rustdesk-server`を作成
- RustDesk Proサービスを上記フォルダにダウンロードして展開
- hbbsとhbbr用のsystemdサービスを作成（サービス名はrustdesk-hbbs.serviceとrustdesk-hbbr.service）
- ドメインを選択した場合、NginxとCertbotをインストールし、APIをポート443（HTTPS）で利用可能にし、ポート80でSSL証明書を取得し、自動更新されます