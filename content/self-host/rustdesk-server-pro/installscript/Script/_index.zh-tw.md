---
title: install.sh 
weight: 4
---

{{% notice note %}}
別忘了從 https://rustdesk.com/pricing.html 取得授權，查閱[授權](/docs/en/self-host/rustdesk-server-pro/license)頁面以了解詳情。
{{% /notice %}}

## 安裝

複製並在您的 Linux 終端機中貼上下列指令以安裝 RustDesk 伺服器專業版。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

流程：

- 安裝依賴套件
- 在可用情況下設定 ufw 防火牆
- 建立資料夾 /var/lib/rustdesk-server 和 /var/log/rustdesk-server
- 在 /usr/bin 安裝執行檔
- 下載 RustDesk 專業版服務並解壓縮到上述資料夾
- 為 hbbs 和 hbbr 建立 systemd 服務
- 如果您選擇了 Domain，將安裝 Nginx 和 certbot，讓 API 能夠在連接埠 443 (https) 存取，並透過連接埠 80 取得 SSL 證書，這將自動更新

## 升級

複製並在您的 Linux 終端機中貼上下列指令以升級現有的 RustDesk 伺服器專業版安裝。您可以使用 cron 定期執行此指令。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

流程：

- 檢查 RustDesk-Server-Pro 的新版本
- 如果找到新版本，移除 API 檔案並下載新執行檔和 API 檔案

## 從開源版本轉換

複製並在您的 Linux 終端機中貼上下列指令以從 RustDesk 伺服器轉換至 RustDesk 伺服器專業版。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

流程：

- 停用並移除舊服務
- 安裝依賴套件
- 在可用情況下設定 ufw 防火牆
- 建立資料夾 /var/lib/rustdesk-server 並將證書複製到該資料夾
- 刪除 /var/log/rustdesk 並建立 /var/log/rustdesk-server
- 下載 RustDesk 專業版服務並解壓縮到上述資料夾
- 為 hbbs 和 hbbr 建立 systemd 服務
- 如果您選擇了 Domain，將安裝 Nginx 和 certbot，讓 API 能夠在連接埠 443 (https) 存取，並透過連接埠 80 取得 SSL 證書，這將自動更新
