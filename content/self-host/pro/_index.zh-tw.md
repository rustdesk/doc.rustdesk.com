---
title: 專業版
weight: 100
---

自架專業版比開源版本提供更多功能。

- OIDC, ldap, 2FA (電子郵件驗證)
- 通訊錄
- 重新命名
- 記錄管理
- 裝置管理
- 設定同步
- 權限控制
- 多台中繼伺服器 (自動選擇離您最近的中繼伺服器)

{{% notice note %}}
需要 RustDesk 客戶端 1.2.0 以上版本
{{% /notice %}}

## 下載

[https://github.com/rustdesk/rustdesk-server-pro/releases/tag/1.1.8](https://github.com/rustdesk/rustdesk-server-pro/releases/tag/1.1.8)

## 安裝

### 簡易安裝

為了使過程輕鬆點，我們開發的腳本能幫您搞定一切 (安裝/升級/從開源版本轉換) [簡易安裝腳本](https://rustdesk.com/docs/en/self-host/pro/installscript/)

{{% notice note %}}
別忘記從 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 取得授權，查閱[授權](/docs/zh-tw/self-host/pro/license)頁面以了解詳情。
{{% /notice %}}

### 手動安裝

幾乎與[開源版本](/docs/zh-tw/self-host/install/)相同，但您在執行 hbbs/hbbr 時不需加上任何參數，全部都能在網頁控制台中設定。

- `-k _` 預設設定
- `-r <server:host>` 如果中繼伺服器跟 hbbs 在同一台伺服器執行，便不需要加上此參數。且您可以在網頁控制台設置多台中繼伺服器。

### 額外連接埠 (或使用 Proxy)

新增一個用於網頁控制台的 tcp 連接埠 `21114`，請在設定防火牆規則和 Docker 連接埠對應時新增此連接埠。
