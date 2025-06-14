---
title: Azure
weight: 16
---

## 視頻教程

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## 配置

1. 登錄到 [Azure 門戶](https://portal.azure.com)。
2. 搜索並選擇 **Microsoft Entra ID**。
3. 在左側菜單中，選擇 [**應用程式註冊**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)，點擊 **新建註冊**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. 打開 RustDesk Pro 控制台，在 **設置** 頁面中，點擊 **OIDC** 模組。然後複製 **回調 URL**。**注意**：**回調 URL** 不可編輯，`Path` 部分固定為 `api/oidc/callback`，而 `Protocol://Host:Port` 部分是目前網頁的來源。如果您通過地址 `http://localhost:8000/<path>` 打開，那麼 **回調 URL** 就是 `http://localhost:8000/api/oidc/callback`。如果您通過地址 `https://192.168.0.1:8000/<path>` 打開，那麼 **回調 URL** 就是 `https://192.168.0.1:8000/api/oidc/callback`。由於 Azure 必須使用 `https://` 或 `http://localhost`，請選擇適當的地址來打開您的 RustDesk Pro 控制台。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. 輸入 **名稱**，選擇 **支援的帳戶類型**，並從 RustDesk Pro 貼上 **重定向 URI**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. 在 RustDesk Pro 中，點擊 **新增認證提供者**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. 在 Azure 中，選擇您要使用的應用程式，點擊 **概述**，並複製 **應用程式（客戶端）ID**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. 在 RustDesk Pro 中，貼上 **客戶端 ID**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. 在 Azure 中，**憑證和機密**，建立新的或選擇客戶端機密，通常是新建。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. 在 Azure 中，複製客戶端機密的值。**注意**：此值只有在您首次註冊時才可見。離開頁面後就不再可見。請妥善保管此值。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. 在 RustDesk Pro 中，貼上客戶端機密的值。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. 在 RustDesk Pro 中，在 **發行者** 欄位中填入 `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`。請用您的 **目錄（租戶）ID** 替換 `Directory (tenant) ID`。**目錄（租戶）ID** 在 Azure 應用程式的 **概述** 面板中。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. 在 Azure 中，選擇 **驗證** 菜單。然後透過選擇 **ID 令牌（用於隱式和混合流）** 來設置授權。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## 參考資料

- [使用 Azure AD 設置 OpenID Connect 提供者](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [Microsoft 身份平台上的 OpenID Connect](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)