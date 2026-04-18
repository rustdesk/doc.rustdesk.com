---
title: Microsoft 365
weight: 16
description: "在 RustDesk Server Pro 中設定 SMTP OAuth2（Microsoft 365），透過 Exchange Online 傳送郵件。"
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

使用本指南為 RustDesk Server Pro 設定透過 Microsoft 365 Exchange Online 傳送 OAuth2 郵件。

此設定適用於邀請郵件、登入驗證郵件和連線警報通知。

一般 SMTP 設定可參考 [SMTP](../)。

## RustDesk Pro 中要填哪些值？

| RustDesk Pro 欄位 | 填寫內容 |
| --- | --- |
| From | 外寄郵件中顯示的寄件者位址。 |
| Mail Account | RustDesk 用作 XOAUTH2 SMTP 使用者名稱的信箱位址。 |
| OAuth2 Tenant ID | 應用程式總覽中的 `Directory (tenant) ID` |
| OAuth2 Client ID | 應用程式總覽中的 `Application (client) ID` |
| OAuth2 Client secret | `Certificates & secrets` 中建立的 secret `Value` |

下圖可幫助你直接對應 RustDesk 中這些欄位的位置：
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## 設定

開始這項設定前，請先確認你已具備：

- RustDesk Server Pro `1.8.1` 或更高版本
- 一個現有的，或準備建立用於傳送郵件的 Microsoft 365 信箱，例如 `no-reply@contoso.com`
- 一個可在 Microsoft Entra 中授與管理員同意，並管理 Exchange Online service principal 的 Microsoft 365 管理員帳號

本設定分為三個部分：

- 在 Azure 中完成應用程式註冊、client secret、API 權限和管理員同意
- 在 PowerShell 中完成 Exchange Online service principal、信箱和權限設定
- 在 RustDesk 中填寫 SMTP OAuth2 設定並傳送測試郵件

### 1. 在 Azure 中設定

1. 登入 [Azure 入口網站](https://portal.azure.com)。
1. 搜尋並選擇 **App registrations**。
1. 在左側選單中選擇 [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)，然後點擊 **New registration**。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/1-Azure-AppRegistrations.png)
1. 建立應用程式註冊。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/3-Azure-RegisterAnApp.png)
1. 記錄 `Directory (tenant) ID` 和 `Application (client) ID`，稍後要填入 RustDesk。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/4-Azure-NewApp-Overview.png)
1. 開啟 **Certificates & secrets**，建立新的 client secret。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/5-Azure-NewClientSecret.png)
1. 立即複製 client secret 的 `Value`。Microsoft 只會顯示一次。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/6-Azure-Secret.png)
1. 開啟 **API permissions**，新增 Microsoft 365 Exchange Online 的 SMTP 應用程式權限。
1. 選擇 **Add a permission**。
1. 選擇 **APIs my organization uses**，搜尋 **Office 365 Exchange Online**。
1. 選擇 **Application permissions**。
1. 選擇 **SMTP.SendAsApp** 並儲存變更。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/9-Azure-SMTP-Send.png)
1. 為剛剛新增的權限授與管理員同意。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/11-Azure-ApiPermissions.png)

### 2. 在 PowerShell 中設定

這一部分連線 Exchange Online，建立 service principal，準備寄信用信箱並授與權限。

1. 以本機管理員權限開啟 PowerShell。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/12-Powershell-RunAsAdmin.png)
1. 安裝 Exchange Online 模組，並使用租戶管理員帳號連線。

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

如需指定管理員帳號，也可以使用：

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. 在 Microsoft Entra 的 **Enterprise applications** 中找到該應用程式，記錄它的 `Object ID`。後面建立 Exchange Online service principal 時會用到這個值。

{{% notice note %}}
這裡使用的 `OBJECT_ID` 必須來自 **Enterprise applications**，而不是 **App registrations** 總覽頁中的 object ID。
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/15-Powershell-Get-ObjectId.png)

1. 執行以下命令，為該應用程式註冊建立 Exchange Online service principal。Microsoft 官方文件將這一步稱為「Registration of a Microsoft Entra application's service principal in Exchange Online」。

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

如果 Exchange 連線成功但這個命令仍失敗，請檢查目前管理員帳號是否有權限管理 Exchange Online 的 service principal。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. 確認 Exchange 已建立該 service principal，並記錄它的 `Identity` 值，後面會用到。

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

後面兩個權限命令中的 `<SERVICE_PRINCIPAL_ID>`，就使用這裡回傳的 `Identity` 值。

1. 如果寄信用信箱還不存在，可以先建立一個 shared mailbox，例如：

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

如果你已經有現成的寄信用信箱，可以跳過這一步。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/17-Powershell-New-Mailbox.png)

1. 檢查租戶和寄信用信箱是否已啟用 `Authenticated SMTP`。

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

如果沒有啟用，測試郵件時可能遇到以下錯誤：

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

對信箱層級設定，可按需執行：

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

如果租戶層級回傳 `True`，再依組織政策決定是否執行：

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

如果上面的租戶層級和信箱層級設定看起來都正確，但仍持續出現同一個 `535 5.7.139` 錯誤，也請檢查租戶是否啟用了 Microsoft Entra `Security defaults`。Microsoft Learn 明確說明，啟用 `Security defaults` 時，Exchange Online 中的 SMTP AUTH 會被停用。

命令詳情可參考 Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)。

1. 為 RustDesk 將要用來寄信的信箱授予該 Exchange service principal `FullAccess` 權限。

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

這裡請使用你準備在 RustDesk 的 `Mail Account` 中填寫的信箱。

如果這個命令回傳類似錯誤：

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

通常表示 `-Identity` 指定的值沒有在 Exchange Online 中解析到實際信箱物件。

先確認該信箱是否真的存在於 Exchange Online：

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

如果查不到結果，請先建立或確認這個信箱。對於 `no-reply` 這類寄件地址，可以建立 shared mailbox，例如：

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

如果信箱已經存在，請確認你在 `Add-MailboxPermission -Identity ...` 中使用的是該信箱的實際地址、別名，或其他可解析的 mailbox identity。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. 再授予同一個 service principal `SendAs` 權限。

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

這一步同樣是 Microsoft 官方 app-only SMTP 設定的一部分。

### 3. 在 RustDesk 中設定

到這一步，你應已經準備好：

- 準備用於 `From` 的寄件者地址
- 準備用於 `Mail Account` 的信箱地址
- `Directory (tenant) ID`
- `Application (client) ID`
- client secret 的 `Value`
- 一個已確認存在且已對 `Mail Account` 所用信箱授予 `FullAccess` 和 `SendAs` 的 Exchange Online service principal

RustDesk 不需要填寫 Exchange service principal 的 `Identity`，但在測試寄信前，上述權限步驟必須已經完成。

1. 在 RustDesk [Web 控制台](../../console/) 中，進入 **Settings** -> **SMTP**。
1. 啟用 OAuth2，並選擇 **Microsoft 365** 作為提供者。
1. 填寫以下欄位：

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. 點擊 **Check** 儲存設定並傳送測試郵件。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

如果測試郵件仍然失敗，請回到上面的 PowerShell 部分，重新檢查 Exchange Online service principal、`Authenticated SMTP` 設定，以及 `Mail Account` 對應信箱的權限設定。

## 參考資料

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth)。用於 Exchange Online 應用程式權限和 service principal 相關步驟。
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)。用於檢查和啟用 `Authenticated SMTP`。
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes)。用於建立 shared mailbox。
