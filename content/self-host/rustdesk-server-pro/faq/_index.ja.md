---
title: FAQ
weight: 600
---

## シンプルインストールスクリプトでインストールするには？
1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)からライセンスを取得し、詳細については[ライセンス](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)ページを確認してください。
2. VPS、ベアメタル、またはLinux VMを起動します。
3. DNSとSSLを使用したい場合は、`rustdesk.yourdomain.com`のようなDNS名を作成します。
4. [このページ](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install)。
5. Linuxターミナルにコマンドをコピー＆ペーストします。
6. インストールを案内するプロンプトに従います。
7. インストールが完了したら`https://rustdesk.yourdomain.com`または`http://youripaddress:21114`にアクセスします。
8. ユーザー名`admin`とパスワード`test1234`でログインします。
9. ステップ1で購入したライセンスコードを入力します。

## RustDesk Server オープンソースからRustDesk Server Proに変換するには？
1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)からライセンスを取得し、詳細については[ライセンス](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)ページを確認してください。
2. TCPポート21114を開放します。
3. RustDesk Serverにログインします。
4. まだDNSを使用しておらず、SSLを使用したい場合は、`rustdesk.yourdomain.com`のようなDNS名を作成します。
5. [このページ](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source)。
6. Linuxターミナルにコマンドをコピー＆ペーストします。
7. インストールを案内するプロンプトに従います。
8. インストールが完了したら`https://rustdesk.yourdomain.com`または`http://youripaddress:21114`にアクセスします。
9. ユーザー名`admin`とパスワード`test1234`でログインします。
10. ステップ1で購入したライセンスコードを入力します。

## RustDesk Server Proの新バージョンが出ました。アップグレードするには？
まずデータファイル（sqlite3ファイルなど）をバックアップすることをお勧めします、https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375。
- ### スクリプト（`install.sh`）でインストールした場合
[update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade)を実行してください。
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
- ### Docker
```
sudo docker ps
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # 以前にインストールしたのと同じ
```

## スクリプトでインストールしました。サービスを開始・停止するには？
サービスはsystemdを使用するため、`sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr`例：`sudo systemctl restart rustdesk-hbbs`で開始・停止できます。

## スクリプトでインストールしました。Linuxログを表示するには？
ログは`/var/log/rustdesk-server`に保存されています。`tail /var/log/rustdesk-server/hbbs.log`または`tail /var/log/rustdesk-server/hbbs.error`で表示できます。

## スクリプトでインストールしました。RustDeskサービスのステータスを確認するには？
ステータスを確認するには`sudo systemctl status rustdesk-hbbs|rustdesk-hbbr`例：`sudo systemctl status rustdesk-hbbs`。

## 管理者パスワードを変更するには？
1. `https://rustdesk.yourdomain.com`または`http://youripaddress:21114`にアクセスします。
2. ユーザー名`admin`とパスワード`test1234`でログインします。
3. 右上角の`admin`をクリックします。
4. `設定`をクリックします。
5. 提供されたボックスに新しいパスワードを入力します。

## ライセンスを新しいサーバーに移動するには？
[こちら](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration)をご覧ください。

## VPSからメールが機能しません
多くのVPSプロバイダーはポート465と25をブロックしています。

簡単な確認方法はtelnetを使用することです。Linuxターミナルでテストするには`telnet your.mailserver.com 25`と入力します。WindowsではPowerShellで`Test-NetConnection -ComputerName your.mailserver.com -Port 25`を使用します。

## PowerShellなどを使用してRustDeskをデプロイできますか？
もちろんです。デプロイを支援するスクリプトを[こちら](https://rustdesk.com/docs/en/self-host/client-deployment/)で見つけることができます。

## バグレポートを提出するには？
[GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues)経由で提出してください。

## セルフホスティングなのに無料でオープンソースではないのはなぜ？
1. RustDeskは多くの人々にとってフルタイムの仕事となり、彼らには生活、妻、仕事、子供があり、これらすべてに注意とお金が必要です！
2. 私たちは今後数年間ここにいて、素晴らしい進歩を続けたいと思っています。
3. オープンソース版は引き続きオープンソースであり、AGPLライセンスに従った開発を他の人々に奨励します。

## 異なるグループのデバイスに接続できません。なぜですか？
これは簡単に解決できます。グループ間アクセスを許可する必要があります。
1. 新しいグループを追加します。
2. `編集`をクリックします。
3. アクセスしたい関連グループを選択します（対応するグループに自動的に追加されます）。

## 設定を自動的に取得するには？
設定は自動的に生成されます。
1. [GitHub](https://github.com/rustdesk/rustdesk/releases/latest)から最新のクライアントをダウンロードします。
2. Webコンソールのメインページで`Windows EXE`をクリックします。
3. ホストとAPI（設定と異なる場合）を入力します。
4. `送信`をクリックします。
5. AndroidでQRコードをスキャンし、生成されたものにexeをリネームします。

## RustDesk Server Proのホスティングサービスを提供していますか？
[営業](mailto://sales@rustdesk.com)チームにお問い合わせください。

## ビデオ設定ガイドを見ることができる場所はありますか？
はい！[YouTubeチャンネル](https://youtube.com/@RustDesk)があります。

## ログ/デバイス名が空なのはなぜですか？
制御されるデバイスでAPIが正しく設定されていることを確認してください、https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750。

## RustDesk Server Proをアンインストールするには？
以下のコマンドを実行します：
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```

## Webコンソールのデバイスリストからデバイスを削除するには？
無効にしてから削除が利用可能になります。

## PowerShellでRustDeskを更新するには？
```ps
$ErrorActionPreference= 'silentlycontinue'
$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)
if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}
if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}
cd C:\Temp
Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## `Key mismatch`エラー
[正しいキー](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)でクライアントを設定してください。

## `Failed to connect to relay server`エラー
`hbbr`が実行されていることを確認してください。`hbbr`についての詳細情報は[こちら](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)で見つけることができます。

## 管理者アカウントのMFAをリセット
https://github.com/rustdesk/rustdesk/discussions/6576

## Webコンソール用にHTTPSを手動設定
ドメイン設定、Nginx、Certbot、SSL証明書の詳細な手順については完全なドキュメントを参照してください。

## SELinux
インストール時に`Waiting for RustDesk Relay service to become active...`が表示される場合、SELinuxが原因の可能性があります：

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## ファイアウォール
### クラウドファイアウォール
AWS/Azure/Google/DigitalOceanクラウドで実行している場合、クラウドベンダーのダッシュボードでUDP（21116）とTCP（21114-21119）の受信ポートを開いてください。

### オンプレミスサーバーファイアウォール
```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
sudo firewall-cmd --reload
```

## Webコンソールで管理者パスワードを変更後、ログインできません。パスワードをリセットする簡単な方法はありますか？
1. `rustdesk-utils`がインストールされていることを確認してください。ない場合は[こちら](https://github.com/rustdesk/rustdesk-server-pro)で入手できます。
2. コマンドは`rustdesk-utils set_password username password`です。成功すると*Done*と表示されます。

## DockerコンテナにルートCA証明書を追加（SMTP、OIDCなどのTLS障害用）
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703