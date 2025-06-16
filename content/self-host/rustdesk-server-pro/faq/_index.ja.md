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

### 1. ドメイン名を購入し、サーバーのIPアドレスに解決する。
* GoDaddy、Namecheap、Namesiloなどのドメインレジストラからドメイン名を購入します。
* 以下のいずれかを使用してドメイン名をサーバーのIPアドレスに解決します：
    - ドメインレジストラのコントロールパネル（推奨）
    - [DNSプロバイダー](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

例えば、`Namesilo`から`example.com`というドメイン名を購入し、サーバーのIPアドレスが`123.123.123.123`の場合、`rustdesk.example.com`サブドメインをHTTPSウェブコンソールアドレスとして使用したいとします。[link](https://www.namesilo.com/account_domains.php)を開き、ツールチップ`Manage dns for the domain`のボタンをクリックし、ホスト名`rustdesk`とサーバーのIPアドレスで`A`レコードを追加する必要があります。
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* DNSが有効になるまでには時間がかかります。https://www.whatsmydns.net でドメイン名がサーバーのIPアドレスに解決されたかどうかを確認してください。ステップ6は正しい解決結果に依存します。以下の手順では、`<YOUR_DOMAIN>`をあなたのサブドメインに置き換えてください。例：`rustdesk.example.com`。

### 2. Nginxをインストール
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` または `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

`nginx -h`を実行して、正常にインストールされたかどうかを確認します。

### 3. Certbotをインストール
* 方法1：`snap`がインストールされている場合、`sudo snap install certbot --classic`を実行します。
* 方法2：代わりに`python3-certbot-nginx`を使用します。例：Ubuntuの場合`sudo apt-get install python3-certbot-nginx`。
* 方法3：上記の2つの方法が失敗した場合、`certbot-nginx`をインストールしてみます。例：CentOS 7の場合`sudo yum install certbot-nginx`。

`certbot -h`を実行して、正常にインストールされたかどうかを確認します。

### 4. Nginxを設定
2つの方法があります：
* `/etc/nginx/sites-available`と`/etc/nginx/sites-enabled`ディレクトリが存在する場合、次のコマンドの`<YOUR_DOMAIN>`をあなたのドメイン名に置き換えて実行します。
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
その後、`sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`を実行します。

`cat /etc/nginx/sites-available/rustdesk.conf`を実行して、内容が正しいことを確認します。

* `/etc/nginx/sites-available`と`/etc/nginx/sites-enabled`ディレクトリが存在せず、`/etc/nginx/conf.d`ディレクトリが存在する場合、次のコマンドの`<YOUR_DOMAIN>`をあなたのドメイン名に置き換えて実行します。
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
`cat /etc/nginx/conf.d/rustdesk.conf`を実行して、内容が正しいことを確認します。

### 5. ドメインのファイアウォールルールを有効にする
次のコマンドを実行します：

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. SSL証明書を生成
`$YOUR_DOMAIN`をあなたのドメイン名に置き換えて、次を実行します
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`。

`Enter email address (used for urgent renewal and security notices)`というプロンプトが表示されたら、メールアドレスを入力します。

最終的に、`rustdesk.conf`の内容は次のようになるはずです：
```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

よくあるエラー：

* コンソールに`Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../default`と表示されるが、`Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../rustdesk.conf`ではない。

理由はCertbotが`rustdesk.conf`ファイルを見つけられないことかもしれません。次のいずれかの解決策を試してください：
- ステップ5の結果を確認し、`sudo service nginx restart`を実行します。
- `<YOUR_DOMAIN>`を含む`server{...}`のサーバー設定を`rustdesk.conf`にコピーし、`location{...}`を以下の内容に変更します。

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

解決策：DNSに別のドメイン名を追加し、`<YOUR_DOMAIN>`をそれに変更します。例：`rustdesk2.example.com`。その後、ステップ1、4、6を繰り返します。

* `Error getting validation data`

解決策：ファイアウォールが原因の可能性があります。https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall を参照してください。

注意：`rustdesk.conf`を手動で変更した場合は、`sudo service nginx restart`を実行してください。

### 7. ウェブページにログイン
* ブラウザで`https://<YOUR_DOMAIN>`を開き、デフォルトのユーザー名「admin」とパスワード「test1234」を使用してログインし、パスワードを自分のものに変更します。

### 8. すべてのプラットフォームで安全な通信を有効にするために、IDサーバーとリレーサーバーにWebSocket Secure（WSS）サポートを追加する。

`/etc/nginx/.../rustdesk.conf`ファイルの最初の`server`セクションに以下の設定を追加し、`Nginx`サービスを再起動します。
ウェブクライアントは`https://<YOUR_DOMAIN>/web`経由でアクセスできます。カスタムクライアントは、詳細オプションで`allow-websocket=Y`を設定することでWebSocketを使用できます。WebSocketが有効になったカスタムクライアントを使用する場合、TCP/UDPを使用せず、リレー経由でのみ接続できます（直接IP接続を除く）。このWebSocket対応クライアントのみを使用する場合、サーバーはポート21114から21119を閉じて、ポート443のみを開いたままにすることができます。




```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

完全な設定は

```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
以前にウェブクライアント用にデプロイしていて、すべてのプラットフォームで使用したい場合は、`proxy_read_timeout`を追加する必要があります。
{{% /notice %}}

### 9. RustDeskの公開ウェブクライアント`https://rustdesk.com/web`を使用する場合のCORSバイパス

ブラウザのCORS制限をバイパスするには、`/etc/nginx/.../rustdesk.conf`の`location /`セクションに以下を追加する必要があります。独自のウェブクライアントを使用している場合は、このステップをスキップしてください。

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }

        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

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
