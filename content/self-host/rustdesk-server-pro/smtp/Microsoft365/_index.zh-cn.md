---
title: Microsoft 365
weight: 16
description: "在 RustDesk Server Pro 中配置 SMTP OAuth2（Microsoft 365），通过 Exchange Online 发送邮件。"
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

使用本指南为 RustDesk Server Pro 配置通过 Microsoft 365 Exchange Online 发送 OAuth2 邮件。

该配置适用于邀请邮件、登录验证邮件和连接告警通知。

通用 SMTP 配置可参考 [SMTP](../)。

## RustDesk Pro 中要填写哪些值？

| RustDesk Pro 字段 | 填写内容 |
| --- | --- |
| From | 出站邮件中显示的发件人地址。 |
| Mail Account | RustDesk 用作 XOAUTH2 SMTP 用户名的邮箱地址。 |
| OAuth2 Tenant ID | 应用概览中的 `Directory (tenant) ID` |
| OAuth2 Client ID | 应用概览中的 `Application (client) ID` |
| OAuth2 Client secret | `Certificates & secrets` 中创建的 secret `Value` |

下图可帮助你直接对应 RustDesk 中这些字段的位置：
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## 配置

开始前，请先确认你已具备：

- RustDesk Server Pro `1.8.1` 或更高版本
- 一个现有的，或准备创建用于发送邮件的 Microsoft 365 邮箱，例如 `no-reply@contoso.com`
- 一个可在 Microsoft Entra 中授予管理员同意、并管理 Exchange Online service principal 的 Microsoft 365 管理员账号

本配置分为三个部分：

- 在 Azure 中完成应用注册、client secret、API 权限和管理员同意
- 在 PowerShell 中完成 Exchange Online service principal、邮箱和权限配置
- 在 RustDesk 中填写 SMTP OAuth2 配置并发送测试邮件

### 1. 在 Azure 中配置

1. 登录 [Azure 门户](https://portal.azure.com)。
1. 搜索并选择 **App registrations**。
1. 在左侧菜单中选择 [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)，然后点击 **New registration**。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/1-Azure-AppRegistrations.png)
1. 创建应用注册。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/3-Azure-RegisterAnApp.png)
1. 记录 `Directory (tenant) ID` 和 `Application (client) ID`，稍后要填写到 RustDesk 中。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/4-Azure-NewApp-Overview.png)
1. 打开 **Certificates & secrets**，创建一个新的 client secret。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/5-Azure-NewClientSecret.png)
1. 立即复制 client secret 的 `Value`。Microsoft 只显示一次该值。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/6-Azure-Secret.png)
1. 打开 **API permissions**，添加 Microsoft 365 Exchange Online 的 SMTP 应用权限。
1. 选择 **Add a permission**。
1. 选择 **APIs my organization uses**，搜索 **Office 365 Exchange Online**。
1. 选择 **Application permissions**。
1. 选择 **SMTP.SendAsApp** 并保存更改。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/9-Azure-SMTP-Send.png)
1. 为刚刚添加的权限授予管理员同意。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/11-Azure-ApiPermissions.png)
### 2. 在 PowerShell 中配置

这一部分连接 Exchange Online，创建 service principal，准备发信邮箱并授予权限。

1. 以本地管理员权限打开 PowerShell。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/12-Powershell-RunAsAdmin.png)
1. 安装 Exchange Online 模块，并使用租户管理员账号连接 Exchange Online。

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

如需指定管理员账号，也可以使用：

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. 在 Microsoft Entra 的 **Enterprise applications** 中找到该应用，记录它的 `Object ID`。后面创建 Exchange Online service principal 时会用到这个值。

{{% notice note %}}
这里使用的 `OBJECT_ID` 必须来自该应用在 **Enterprise applications** 中的 object ID，而不是 **App registrations** 概览页里的 object ID。
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/15-Powershell-Get-ObjectId.png)

1. 运行以下命令，为该应用注册创建 Exchange Online service principal。Microsoft 官方文档将这一步称为 “Registration of a Microsoft Entra application's service principal in Exchange Online”。

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

如果 Exchange 连接成功但此命令仍失败，请检查当前管理员账号是否有权限管理 Exchange Online 的 service principal。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. 确认 Exchange 已创建该 service principal，并记录它的 `Identity` 值，后面会用到。

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

后面两个权限命令中的 `<SERVICE_PRINCIPAL_ID>`，就使用这里返回的 `Identity` 值。

1. 如果发信邮箱还不存在，可以先创建一个 shared mailbox，例如：

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

如果你已经有现成的发信邮箱，可以跳过这一步。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/17-Powershell-New-Mailbox.png)

1. 检查租户和发信邮箱是否启用了 `Authenticated SMTP`。

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

如果这一项没有启用，测试邮件时可能遇到以下错误：

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

对邮箱级设置，可按需执行：

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

如果租户级返回 `True`，再根据组织策略决定是否执行：

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

如果上面的租户级和邮箱级设置看起来都正确，但仍持续出现同一个 `535 5.7.139` 错误，也请检查租户是否启用了 Microsoft Entra `Security defaults`。Microsoft Learn 明确说明，启用 `Security defaults` 时，Exchange Online 中的 SMTP AUTH 会被禁用。

命令详情可参考 Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)。

1. 为 RustDesk 将要用来发信的邮箱授予该 Exchange service principal `FullAccess` 权限。

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

这里请使用你计划在 RustDesk 的 `Mail Account` 中填写的邮箱。

如果这个命令返回类似错误：

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

通常表示 `-Identity` 指定的值没有在 Exchange Online 中解析到实际邮箱对象。

先确认该邮箱是否真实存在于 Exchange Online：

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

如果查询不到结果，请先创建或确认这个邮箱。对于 `no-reply` 一类发信地址，可以创建 shared mailbox，例如：

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

如果邮箱已经存在，请确认你在 `Add-MailboxPermission -Identity ...` 中使用的是该邮箱的实际地址、别名或其他可解析的 mailbox identity。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. 再授予同一个 service principal `SendAs` 权限。

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

这一步同样是 Microsoft 官方 app-only SMTP 配置的一部分。

### 3. 在 RustDesk 中配置

到这一步，你应已经准备好：

- 准备用于 `From` 的发件人地址
- 准备用于 `Mail Account` 的邮箱地址
- `Directory (tenant) ID`
- `Application (client) ID`
- client secret 的 `Value`
- 一个已确认存在且已对 `Mail Account` 所用邮箱授予 `FullAccess` 和 `SendAs` 的 Exchange Online service principal

RustDesk 不需要填写 Exchange service principal 的 `Identity`，但在测试发信前，上述权限步骤必须已经完成。

1. 在 RustDesk [Web 控制台](../../console/) 中，进入 **Settings** -> **SMTP**。
1. 启用 OAuth2，并选择 **Microsoft 365** 作为提供商。
1. 填写以下字段：

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. 点击 **Check** 保存配置并发送测试邮件。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

如果测试邮件仍失败，请回到上面的 PowerShell 部分，重新检查 Exchange Online service principal、`Authenticated SMTP` 设置，以及 `Mail Account` 对应邮箱的权限配置。

## 参考

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth)。用于 Exchange Online 应用权限和 service principal 相关步骤。
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)。用于检查和启用 `Authenticated SMTP`。
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes)。用于创建 shared mailbox。
