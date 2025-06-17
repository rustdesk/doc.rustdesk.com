---
title: install.sh 
weight: 4
---

{{% notice note %}}
別忘了從 [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/) 取得授權，查閱[授權](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)頁面以了解詳情。

請在進行這個簡單安裝之前先閱讀[OSS安裝](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)。您可以在那裡了解更多底層細節。
{{% /notice %}}

## 安裝

複製並在您的 Linux 終端機中貼上下列指令以安裝 RustDesk 伺服器專業版。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
我建議使用[Docker映像](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose)；它極大地簡化了部署解決方案以及更新的過程。資源消耗非常低。

並且請在您的主目錄下執行上述命令，而不是在您沒有寫權限的目錄。
{{% /notice %}}

它做了什麼：

- 安裝一些依賴項
- 在可用情況下設定 UFW 防火牆
- 創建工作目錄 `/var/lib/rustdesk-server` 和日誌目錄 `/var/log/rustdesk-server`
- 將可執行檔案安裝到 `/usr/bin`
- 下載並解壓 RustDesk Pro 服務到上述資料夾
- 為 hbbs 和 hbbr 創建 systemd 服務（服務名稱為 `rustdesk-hbbs.service` 和 `rustdesk-hbbr.service`）
- 如果您選擇了網域，它將安裝 Nginx 和 Certbot，讓 API 能夠在連接埠 `443` (HTTPS) 上存取，並透過連接埠 `80` 獲取 SSL 證書，它會自動續期。當 https 準備就緒後，請使用 `https://yourdomain.com` 存取，而不是 `https://yourdomain.com:21114`。

{{% notice note %}}
如何[手動為 Web 控制台設定 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

{{% notice note %}}
如果 systemd 服務啟動失敗，可能與 SELinux 有關，請查看[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux)。
{{% /notice %}}

{{% notice note %}}
如果您的客戶端無法連接到您的伺服器或您無法存取 Web 控制台，請查看[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall)。
{{% /notice %}}

## 升級

複製並在您的 Linux 終端機中貼上下列指令以升級現有的 RustDesk 伺服器專業版安裝。您可以使用 cron 定期執行此指令。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
如果您在使用此腳本時遇到問題，我建議您瀏覽腳本並逐步手動執行步驟。

並且請在您的主目錄下執行上述命令，而不是在您沒有寫權限的目錄。
{{% /notice %}}

它做了什麼：

- 檢查 RustDesk-Server-Pro 的新版本
- 如果找到新版本，移除 API 檔案並下載新執行檔和 API 檔案

## 從開源版本轉換

複製並在您的 Linux 終端機中貼上下列指令以從 RustDesk 伺服器轉換至 RustDesk 伺服器專業版。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
請將 `21114` TCP 連接埠加入到您的防火牆，這是 Web 控制台和 RustDesk 客戶端中使用者登入的額外連接埠。
{{% /notice %}}

{{% notice note %}}
如果您在使用此腳本時遇到問題，我建議切換到 Docker 安裝。或者，您可以瀏覽腳本並逐步手動執行步驟。
{{% /notice %}}

它做了什麼：

- 停用並移除舊服務
- 安裝依賴套件
- 在可用情況下設定 UFW 防火牆
- 創建資料夾 `/var/lib/rustdesk-server` 並將證書複製到這裡
- 刪除 `/var/log/rustdesk` 並創建 `/var/log/rustdesk-server`
- 下載並解壓 RustDesk Pro 服務到上述資料夾
- 為 hbbs 和 hbbr 創建 systemd 服務（服務名稱為 `rustdesk-hbbs.service` 和 `rustdesk-hbbr.service`）
- 如果您選擇了網域，它將安裝 Nginx 和 Certbot，讓 API 能夠在連接埠 `443` (HTTPS) 上存取，並透過連接埠 `80` 獲取 SSL 證書，它會自動續期。當 https 準備就緒後，請使用 `https://yourdomain.com` 存取，而不是 `https://yourdomain.com:21114`。

{{% notice note %}}
如何[手動為 Web 控制台設定 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

{{% notice note %}}
如果 systemd 服務啟動失敗，可能與 SELinux 有關，請查看[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux)。
{{% /notice %}}

{{% notice note %}}
如果您的客戶端無法連接到您的伺服器或您無法存取 Web 控制台，請查看[這裡](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall)。
{{% /notice %}}
