---
title: 常見問題
description: "RustDesk Server Pro 安裝、配置、授權、故障排除和移轉的常見問題。取得常見設定問題、SSL配置、資料庫管理和升級程序的答案。"
keywords: ["rustdesk server pro 常見問題", "rustdesk pro 幫助", "rustdesk 安裝幫助", "rustdesk 故障排除", "rustdesk 伺服器設定", "rustdesk 授權問題", "rustdesk ssl配置", "rustdesk 移轉指南", "rustdesk pro 支援", "rustdesk 伺服器問題"]
weight: 600
---

## 如何使用簡單安裝腳本安裝？
1. 從 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 獲取您的許可證，請查看[許可證](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)頁面了解更多詳情。
2. 啟動 VPS、裸機或 Linux VM。
3. 如果您想使用 DNS 和 SSL，請創建 DNS 名稱，例如 `rustdesk.yourdomain.com`。
4. [此頁面](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install)。
5. 複製並粘貼命令到您的 Linux 終端。
6. 按照提示指導您完成安裝。
7. 安裝完成後訪問 `https://rustdesk.yourdomain.com` 或 `http://youripaddress:21114`。
8. 使用用戶名 `admin` 和密碼 `test1234` 登錄。
9. 輸入您在步驟 1 中購買的許可證代碼。

## 如何從 RustDesk Server 開源版轉換為 RustDesk Server Pro？
1. 從 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 獲取您的許可證，請查看[許可證](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)頁面了解更多詳情。
2. 開放 TCP 端口 21114。
3. 登錄到您的 RustDesk Server。
4. 如果您還沒有使用 DNS 並想使用 SSL，請創建 DNS 名稱，例如 `rustdesk.yourdomain.com`。
5. [此頁面](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source)。
6. 複製並粘貼命令到您的 Linux 終端。
7. 按照提示指導您完成安裝。
8. 安裝完成後訪問 `https://rustdesk.yourdomain.com` 或 `http://youripaddress:21114`。
9. 使用用戶名 `admin` 和密碼 `test1234` 登錄。
10. 輸入您在步驟 1 中購買的許可證代碼。

## 有新版本的 RustDesk Server Pro 推出，如何升級？
您最好先備份數據文件（sqlite3 文件等），https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375。
- ### 如果您使用腳本安裝（`install.sh`）
請運行 [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade)。
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
但這取決於您的 docker 版本，更多討論請查看[此處](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository)。
- ### Docker
```
sudo docker ps
## 您也可以使用 <容器名稱>，例如 `hbbs` 和 `hbbr`（如果您按照我們的手冊操作）。
sudo docker stop <容器ID>
sudo docker rm <容器ID>
sudo docker rmi <映像ID>
sudo docker run ..... # 與您之前安裝時相同
```

例如

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

更多詳情，請查看[此處](https://www.cherryservers.com/blog/how-to-update-docker-image)。

## 我使用腳本安裝，如何啟動和停止服務？
服務使用 systemd，可以使用 `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` 啟動和停止，例如 `sudo systemctl restart rustdesk-hbbs`。

## 我使用腳本安裝，如何查看 Linux 日誌？
日誌存儲在 `/var/log/rustdesk-server` 中，您可以使用 `tail /var/log/rustdesk-server/hbbs.log` 或 `tail /var/log/rustdesk-server/hbbs.error` 查看它們。

## 我使用腳本安裝，如何檢查 RustDesk 服務的狀態？
要檢查狀態，使用 `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr`，例如 `sudo systemctl status rustdesk-hbbs`。

## 如何更改管理員密碼？
1. 訪問 `https://rustdesk.yourdomain.com` 或 `http://youripaddress:21114`。
2. 使用用戶名 `admin` 和密碼 `test1234` 登錄。
3. 點擊右上角的 `admin`。
4. 點擊 `設置`。
5. 在提供的框中輸入您的新密碼。

## 如何將我的許可證移動到新服務器？
請查看[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration)。

## 我的 VPS 電子郵件無法正常工作
許多 VPS 提供商阻止端口 465 和 25。

一個簡單的檢查方法是使用 telnet。在 Linux 終端中測試輸入 `telnet your.mailserver.com 25`。在 Windows 上使用 PowerShell 輸入 `Test-NetConnection -ComputerName your.mailserver.com -Port 25`。

您的郵件服務器可能不使用端口 25。請確保您使用正確的端口。

## 我可以使用 PowerShell 或類似工具部署 RustDesk 嗎？
當然可以，您可以在[這裡](https://rustdesk.com/docs/en/self-host/client-deployment/)找到幫助部署的腳本。

## 如何提交錯誤報告？
請通過 [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues) 提交。

## 為什麼如果我自己托管，這不是免費和開源的？
1. RustDesk 已成為許多人的全職工作，他們有生活、妻子、工作和孩子，這些都需要關注並花費金錢！
2. 我們希望在未來幾年中繼續存在並取得巨大進展。
3. 開源版本將繼續開源，我們鼓勵其他人根據 AGPL 許可證進行開發。

## 我無法連接到不同組中的設備，為什麼？
這很容易解決，您需要允許跨組訪問。
1. 添加新組。
2. 點擊 `編輯`。
3. 選擇您想要訪問的相關組（它會自動將它們添加到相應的組中）。

## 如何自動獲取配置？
配置會自動生成。
1. 從 [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) 下載最新的客戶端。
2. 在 Web 控制台的主頁上點擊 `Windows EXE`。
3. 填入主機和 API（如果與您的配置不同）。
4. 點擊 `Submit`。
5. 在 Android 上掃描 QR 碼，並將 exe 重命名為生成的名稱。

## 您為 RustDesk Server Pro 提供托管服務嗎？
請聯繫我們的[銷售](mailto://sales@rustdesk.com)團隊。

## 有地方可以看視頻設置指南嗎？
是的！我們有一個 [YouTube 頻道](https://youtube.com/@RustDesk)。

## 為什麼我的日誌/設備名稱是空的？
確保在被控制的設備上正確設置了 API，https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750。

## 如何卸載 RustDesk Server Pro？
運行以下命令：
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
如果腳本安裝了 Nginx，則使用以下命令移除：
```sh
sudo apt remove nginx
```

## 如何從 Web 控制台的設備列表中移除設備？
禁用後，刪除選項將變為可用。

## 如何使用 PowerShell 更新 RustDesk？
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

## `密鑰不匹配`錯誤
請使用[正確的密鑰](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)配置您的客戶端。

## `連接到中繼服務器失敗`錯誤
請確保 `hbbr` 正在運行。有關 `hbbr` 的更多信息，您可以在[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)找到。
如果您的 `hbbr` 不在與 `hbbs` 相同的機器上運行，或者您有多個中繼服務器，或者您不在默認端口 `21117` 上運行，您必須明確告知 `hbbs`。請檢查[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)。

## 重置管理員帳戶的 MFA
https://github.com/rustdesk/rustdesk/discussions/6576

## 手動為 Web 控制台設置 HTTPS

### 1. 購買域名並將其解析到您的服務器 IP 地址。
* 從 GoDaddy、Namecheap 或 Namesilo 等域名註冊商購買域名。
* 使用以下之一將域名解析到您的服務器 IP 地址：
    - 您的域名註冊商的控制面板（推薦）
    - [DNS 提供商](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

例如，如果您從 `Namesilo` 購買域名 `example.com`，而您的服務器 IP 地址是 `123.123.123.123`，您想使用 `rustdesk.example.com` 子域作為您的 HTTPS Web 控制台地址。您需要打開[鏈接](https://www.namesilo.com/account_domains.php)，點擊帶有提示 `Manage dns for the domain` 的按鈕，添加一個主機名為 `rustdesk` 和您服務器 IP 地址的 `A` 記錄。
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* DNS 生效需要一些時間，https://www.whatsmydns.net 檢查域名是否已解析到您的服務器 IP 地址。步驟 6 取決於正確的解析結果。在以下步驟中，將 `YOUR_DOMAIN` 替換為您的子域，例如 `rustdesk.example.com`。

### 2. 安裝 Nginx
* Debian/Ubuntu：`sudo apt-get install nginx`
* Fedora/CentOS：`sudo dnf install nginx` 或 `sudo yum install nginx`
* Arch：`sudo pacman -S install nginx`
* openSUSE：`sudo zypper install nginx`
* Gentoo：`sudo emerge -av nginx`
* Alpine：`sudo apk add --no-cache nginx`

運行 `nginx -h` 檢查是否安裝成功。

### 3. 安裝 Certbot
* 方法 1：如果安裝了 `snap`，運行 `sudo snap install certbot --classic`。
* 方法 2：使用 `python3-certbot-nginx`，例如 Ubuntu 使用 `sudo apt-get install python3-certbot-nginx`。
* 方法 3：如果上述兩種方法失敗，嘗試安裝 `certbot-nginx`，例如 CentOS 7 使用 `sudo yum install certbot-nginx`。

運行 `certbot -h` 檢查是否安裝成功。

### 4. 配置 Nginx
有兩種方法：
* 如果目錄 `/etc/nginx/sites-available` 和 `/etc/nginx/sites-enabled` 存在，將以下命令中的 `YOUR_DOMAIN` 替換為您的域名並運行。
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
然後運行 `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`。

運行 `cat /etc/nginx/sites-available/rustdesk.conf` 確保其內容正確。

* 如果目錄 `/etc/nginx/sites-available` 和 `/etc/nginx/sites-enabled` 不存在且目錄 `/etc/nginx/conf.d` 存在，將以下命令中的 `YOUR_DOMAIN` 替換為您的域名並運行。
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
運行 `cat /etc/nginx/conf.d/rustdesk.conf` 確保其內容正確。

### 5. 為域名啟用防火牆規則
運行以下命令：

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. 生成 SSL 證書
將 `$YOUR_DOMAIN` 替換為您的域名，然後運行
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`。

如果提示 `Enter email address (used for urgent renewal and security notices)`，輸入您的電子郵件地址。

最終，`rustdesk.conf` 的內容應該是這樣的：
```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

以下是一些常見錯誤：

* 控制台打印 `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default` 而不是 `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../rustdesk.conf`。

原因可能是 Certbot 沒有找到 `rustdesk.conf` 文件，您可以嘗試以下解決方案之一：
- 檢查步驟 5 的結果，運行 `sudo service nginx restart`。
- 將包含 `YOUR_DOMAIN` 的服務器配置 `server{...}` 復制到 `rustdesk.conf`，並將 `location{...}` 更改為以下內容。

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

解決方案：向 DNS 添加另一個域名並將 `YOUR_DOMAIN` 更改為它，例如 `rustdesk2.example.com`。然後重複步驟 1、4、6。

* `Error getting validation data`

解決方案：可能是防火牆引起的，請參考 https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

注意：如果您手動更改 `rustdesk.conf`，請運行 `sudo service nginx restart`。

### 7. 登錄到網頁
* 在瀏覽器中打開 `https://YOUR_DOMAIN`，使用默認用戶名 "admin" 和密碼 "test1234" 登錄，然後將密碼更改為您自己的。

### 8. 為 ID 服務器和中繼服務器添加 WebSocket Secure (WSS) 支持，以啟用所有平台的安全通信。

將以下配置添加到 `/etc/nginx/.../rustdesk.conf` 文件的第一個 `server` 部分，然後重啟 `Nginx` 服務。
Web 客戶端可以通過 `https://YOUR_DOMAIN/web` 訪問。自定義客戶端可以通過在高級選項中設置 `allow-websocket=Y` 來使用 WebSocket。如果使用啟用 WebSocket 的自定義客戶端，它將不會使用 TCP/UDP，只能通過中繼連接（直接 IP 連接除外）。如果只使用這種啟用 WebSocket 的客戶端，服務器可以關閉端口 21114 到 21119，只保持端口 443 開放。

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

完整配置是

```
server {
    server_name YOUR_DOMAIN;
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
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
如果您之前為 Web 客戶端部署並希望在所有平台上使用它，您需要添加 `proxy_read_timeout`。
{{% /notice %}}

### 9. 如果使用 RustDesk 公共 Web 客戶端 `https://rustdesk.com/web` 則繞過 CORS

您需要在 `/etc/nginx/.../rustdesk.conf` 的 `location /` 部分中添加以下內容以繞過瀏覽器的 CORS 限制。如果您使用自己的 Web 客戶端，請跳過此步驟。

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

如果安裝時出現 `Waiting for RustDesk Relay service to become active...`，可能是 SELinux 引起的。您可以嘗試以下命令：

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## 防火牆

### 雲防火牆
如果您在 AWS/Azure/Google/DigitalOcean 雲上運行，請在雲供應商的儀表板上開放 UDP（21116）和 TCP（21114-21119）入站端口。

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### 本地服務器防火牆
RustDesk 使用 `ufw` 設置防火牆。在某些發行版（如 CentOS 9）上可能無法工作，您可以嘗試使用 `firewall-cmd`：

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

如果您使用 IP：

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

如果您使用 DNS/域名：

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

執行以上命令後，運行 `sudo firewall-cmd --reload` 重新加載防火牆。

## 在 Web 控制台中更改管理員密碼後無法登錄。有簡單的方法重置密碼嗎？
1. 確保您已安裝 `rustdesk-utils`。如果沒有，您可以在[這裡](https://github.com/rustdesk/rustdesk-server-pro)獲取。您還需要從數據庫所在的文件夾執行命令，即 `/var/lib/rustdesk-server`。
2. 命令是 `rustdesk-utils set_password username password`。如果成功，它會顯示 *Done*。

您還有以下其他命令 `genkeypair`、`validatekeypair [public key] [secret key]`、`doctor [rustdesk-server]`、`reset_email_verification` 和 `reset_2fa_verification`，可以與 `rustdesk-utils` 一起使用。

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## 將根 CA 證書添加到 Docker 容器中（用於 SMTP、OIDC 等的 TLS 故障）
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
