---
title: 客戶端配置
weight: 300
pre: "<b>2.3. </b>"
---

## 概述

有多種方式可以配置 RustDesk 客戶端使用您自己的自託管伺服器，我們將在下面介紹一些方法。

## 1. 自定義客戶端生成器（僅限 Pro 版本，基礎計劃或自定義計劃）

您可以擁有自己的名稱、徽標、圖示、配置、簽名等。

目前支援 Windows X64、Mac Arm64 / X64、[Linux](https://twitter.com/rustdesk/status/1788905463678951787)、Android Arm 64。

[視頻](https://twitter.com/rustdesk/status/1769171628426944539)

![](images/custom-client-qs.png)
![](images/web_console_custom_client_config.jpeg)

## 2. 手動配置

在 RustDesk 客戶端主介面，點擊 ID 旁邊的選單按鈕 [ &#8942; ]，然後點擊網路，您現在可以使用提升的權限解鎖設定並設定您的 `ID`、`中繼`、`API` 和 `金鑰`。需要注意的是，這個 `金鑰` 是用於連接加密的公鑰，與您購買 Pro 版本時提供的許可證金鑰不同。

![](/docs/en/self-host/client-configuration/images/network-config.png)

在 **ID 伺服器** 輸入框中輸入 `hbbs` 主機或 IP 地址（本地端 + 遠端）。其他兩個地址可以留空，RustDesk 會自動推導（如果未特別設定），中繼伺服器指的是 `hbbr`（埠 21117）。

例如：

```nolang
hbbs.example.com
```

或

```nolang
hbbs.example.com:21116
```

### 設定 `金鑰`

為了與您的自託管伺服器建立加密連接，您需要輸入其公鑰。金鑰通常在 `hbbs` 首次執行時產生，可以在工作目錄/資料資料夾中的 `id_ed25519.pub` 檔案中找到。

作為 `Pro` 使用者，您還可以從 [Web 控制台](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/) 取得 `金鑰`。

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### 設定 `API 伺服器`

這僅適用於 `Pro` 使用者。當您可以在 Web 控制台上登入，但無法在 RustDesk 客戶端上登入時，可能是您沒有正確設定 `API 伺服器`。

如果您的 API 伺服器不在預設的 `21114` 埠上執行（如果您來自開源版本，可能沒有將此埠新增到防火牆），請明確指定 `API 伺服器`。
例如，如果您的 API 伺服器在預設的 HTTPS 埠上執行，請使用 `https://hbbs.example.com` 指定 `API 伺服器`。

如果您仍然無法確認 `API 伺服器` 的值，請造訪 Web 控制台的歡迎頁面，`API 伺服器` 顯示在上圖中（帶有 `API:` 標籤的輸入框）。

## 3. 使用匯入或匯出設定

1. 使用[上述](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config)步驟在裝置上配置 RustDesk 客戶端。
2. 使用上述機器轉到設定，然後網路並解鎖。
3. 點擊 `匯出伺服器配置`。
4. 將複製的字串貼上到記事本或類似軟體中。
5. 轉到新客戶端，將上述內容複製到剪貼簿。
6. 在 RustDesk 客戶端中轉到設定，然後網路，解鎖並點擊 `匯入伺服器配置`。
7. 它會自動貼上設定。
8. 點擊 `套用`。

## 4. 自動配置

最簡單的自動設定方法是使用[此處](https://rustdesk.com/docs/en/self-host/client-deployment/)的部署腳本。

## 5. 從 `Pro` 透過剪貼簿匯入配置

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. 使用命令列 `--config`
`rustdesk.exe --config <配置字串>`

您可以從 Web 控制台取得配置字串（您可以在上圖中看到）或從 RustDesk 客戶端「設定 → 網路」（[這裡](https://github.com/rustdesk/rustdesk/discussions/7118)有相關討論）。