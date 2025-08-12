---
title: 自建伺服器專業版
description: "RustDesk Server Pro 完整指南 - 高級自架遠端桌面解決方案。提供企業級身份驗證（OIDC、LDAP、2FA）、Web控制台、API存取和高級安全控制，適用於專業部署。"
keywords: ["rustdesk server pro", "rustdesk 專業版伺服器", "遠端桌面伺服器", "企業遠端存取", "rustdesk 專業版", "自架rdp", "rustdesk 企業版", "遠端桌面解決方案", "rustdesk 授權", "rustdesk web控制台"]
weight: 200
pre: "<b>2.2. </b>"
---

自建伺服器專業版與開源版本相比具有更多功能。

- 帳戶
- [網頁控制台](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/)、[LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/)、[2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- 通訊錄
- 日誌管理（連線、檔案傳輸、警報等）
- 設備管理
- [安全性設定同步](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [存取控制](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [多個中繼伺服器](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)（自動選擇最近的中繼伺服器）
- [自訂客戶端生成器](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- 網頁客戶端自架

{{% notice note %}}
如果您在家中/辦公室建立自己的伺服器，且無法透過公共 IP/網域連線，請查看[這篇文章](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/)。
{{% /notice %}}

{{% notice note %}}
我們建議在繼續之前先閱讀這篇文章，[自架伺服器如何運作？](/docs/en/self-host/#how-does-self-hosted-server-work)。
{{% /notice %}}

## 硬體需求

最低規格的 VPS 就足以滿足您的使用需求。伺服器軟體不會密集使用 CPU 和記憶體。我們的公共 ID 伺服器託管在一台 2 CPU/4 GB 的 Vultr 伺服器上，服務 100 萬個以上的端點。每個中繼連線平均消耗每秒 180kb。1 個 CPU 核心和 1G 記憶體足以支援 1000 個並發中繼連線。

## 文章教學
[逐步指南：在雲端透過 Docker 自架 RustDesk Server Pro 以實現安全遠端存取](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## 影片教學

[初學者指南：為 Linux 新手自架 RustDesk Server Pro](https://www.youtube.com/watch?v=MclmfYR3frk)

[快速指南：為進階 Linux 使用者自架 RustDesk Server Pro](https://youtu.be/gMKFEziajmo)


## 授權

您可以從 https://rustdesk.com/pricing.html 取得授權，詳情請查看[授權](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)頁面。

## 開始使用
### 1. 安裝

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

更多詳情，請查看 [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/)。

### 2. 所需連接埠

您需要開放 `21114`-`21119` TCP 和 `21116` UDP 連接埠，請確保在設定防火牆規則和 Docker 連接埠對應時設定這些連接埠。

有關這些連接埠的更多資訊，請查看[這裡](/docs/en/self-host/rustdesk-server-oss/install/#ports)。

### 3. 設定授權

透過存取 `http://<伺服器 ip>:21114` 開啟您的網頁控制台，使用預設認證 admin/test1234 `admin`/`test1234` [登入](/docs/en/self-host/rustdesk-server-pro/console/#log-in)。按照[這個指南](/docs/en/self-host/rustdesk-server-pro/license/#set-license)設定授權。

### 4. 為網頁控制台設定 HTTPS

> 如果您在試用期間不想使用 HTTPS，可以跳過此步驟，但請記住在設定 HTTPS 後更改客戶端的 API 位址

這裡有一個[手動設定 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually) 的簡單教學。

### 5. 設定客戶端使用自架伺服器

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. 設定 WebSocket

要啟用網頁客戶端或[桌面/行動客戶端](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket)使用 WebSocket 正常運作，您需要將以下設定加入您的反向代理設定中。

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

### 6. 設定 WebSocket

要啟用網頁客戶端或[桌面/行動客戶端](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket)使用 WebSocket 正常運作，您需要將以下設定加入您的反向代理設定中。

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## 升級伺服器

這個[指南](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade)說明如何從較低版本升級 RustDesk Server Pro，涵蓋不同的安裝方法。

## 遷移到新主機和備份/還原

這裡有詳細的[教學](https://github.com/rustdesk/rustdesk-server-pro/discussions/184)。

## 遷移授權

請按照這個[指南](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration)。

## 升級授權

按照[這個指南](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license)隨時為更多使用者和設備升級您的授權。

## 關於安全性

https://github.com/rustdesk/rustdesk/discussions/9835
