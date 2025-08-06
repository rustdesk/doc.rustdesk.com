---
title: Windows 安裝 (deprecated)
weight: 5
---

{{% notice note %}}
Windows 安全政策比較複雜，如果此教學對您不適用，或者您遇到不穩定的連接，請避移到 Linux 伺服器。
{{% /notice %}}

{{% notice note %}}
GUI 版本 `RustDeskServer.setup.exe` 已不再維護，不推薦使用。
{{% /notice %}}

## 安裝

在 Windows 上運行 rustdesk 需要 Microsoft Visual C++ Redistributable。您可以在[這裡](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)下載。

1. 從 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 獲取您的授權證，更多詳情請查看[授權證](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)頁面。
2. 從 [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest) 下載 Windows 安裝程式。
3. 解壓 Windows 安裝程式。
4. 運行安裝程式並按照螢幕上的步驟進行。或者手動安裝 [PM2 或 NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/)。
5. 完成後打開 RustDesk Server。
6. 按照提示進行安裝。
7. 點擊 `Services` 然後點擊 `Start`。
8. 安裝完成後訪問 `http://youripaddress:21114`。
9. 使用用戶名 `admin` 和密碼 `test1234` 登入。
10. 輸入您在第 1 步中購買的授權證代碼。

## 使用 IIS 作為代理

請確保已安裝 `Dynamic Content Compression`（這是一個 IIS 功能，可以通過伺服器角色安裝）。
1. 打開 IIS（或安裝它）。
2. 為 RustDesk 建立一個新網站，設置繫定（理想情況下為 443）和相關證書。基本設置應該指向一個空白資料夾。（如果您使用預設站點，請確保資料夾中沒有其他檔案）。
3. 在 IIS 上，安裝 [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) 和 [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module)。

## 應用程式要求路由

1. 在 IIS 伺服器主機下打開應用程式要求路由。
2. 轉到 Server Proxy Settings。
3. 啟用代理，所有設置都會出現，您可以保持預設值。
4. 保存設置，然後我們可以進入下一步：URL Rewrite。

## URL Rewrite

1. 在左側面板中打開 IIS 上的站點，雙擊 URL Rewrite。
2. 點擊 `Add rules`。
3. 設置一個新的反向代理規則。
4. 設置本地地址（RustDesk 內部 21114 地址）\
Inbound Rule – RustDesk 內部 21114 地址\
Outbound Rules – `From` 是 RustDesk 內部 21114 地址，`To` 是外部地址。\
注意：地址前不要有 http / https – 它們會被自動處理。另外，確保所有地址在內部和外部都可以訪問。

## 壓縮

1. 禁用 `Dynamic Content Compression`。

## 故障排除

如果您遇到 500.52 錯誤，請添加提到的變量：[IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259)。

您可能需要將 SSL 設置更改為 “Require SSL → Ignore”。
