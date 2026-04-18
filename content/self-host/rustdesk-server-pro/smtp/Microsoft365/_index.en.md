---
title: Microsoft 365
weight: 16
description: "Configure SMTP OAuth2 (Microsoft 365) in RustDesk Server Pro to send email through Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Use this guide to configure RustDesk Server Pro to send email through Microsoft 365 Exchange Online with OAuth2.

This setup is suitable for invitation emails, login verification emails, and connection alarm notifications.

For general SMTP setup, see [SMTP](../).

## Which Values Go Into RustDesk Pro?

| RustDesk Pro field | What to enter |
| --- | --- |
| From | The sender address shown in outgoing mail. |
| Mail Account | The mailbox address RustDesk uses as the XOAUTH2 SMTP username. |
| OAuth2 Tenant ID | `Directory (tenant) ID` from the app overview |
| OAuth2 Client ID | `Application (client) ID` from the app overview |
| OAuth2 Client secret | The secret `Value` created under `Certificates & secrets` |

This screenshot shows where these values are entered in RustDesk:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Configuration

Before you start this configuration, make sure you have:

- RustDesk Server Pro `1.8.1` or later
- An existing Microsoft 365 mailbox, or one you plan to create for sending mail, for example `no-reply@contoso.com`
- A Microsoft 365 administrator account that can grant admin consent in Microsoft Entra and manage Exchange Online service principals

This configuration has three parts:

- Configure the app registration, client secret, API permission, and admin consent in Azure
- Configure the Exchange Online service principal, mailbox, and permissions in PowerShell
- Configure SMTP OAuth2 in RustDesk and send a test email

### 1. Configure in Azure

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **App registrations**.
1. In the left menu, select [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), then click **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/1-Azure-AppRegistrations.png)
1. Create the app registration.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/3-Azure-RegisterAnApp.png)
1. Record the `Directory (tenant) ID` and `Application (client) ID`. You will enter these later in RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/4-Azure-NewApp-Overview.png)
1. Open **Certificates & secrets**, then create a new client secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/5-Azure-NewClientSecret.png)
1. Copy the client secret `Value` immediately. Microsoft shows this value only once.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/6-Azure-Secret.png)
1. Open **API permissions** and add the Microsoft 365 Exchange Online SMTP application permission.
1. Select **Add a permission**.
1. Select **APIs my organization uses** and search for **Office 365 Exchange Online**.
1. Select **Application permissions**.
1. Select **SMTP.SendAsApp** and save the change.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/9-Azure-SMTP-Send.png)
1. Grant admin consent for the permission you just added.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/11-Azure-ApiPermissions.png)
### 2. Configure in PowerShell

In this part, connect to Exchange Online, create the service principal, prepare the mailbox, and grant permissions.

1. Open PowerShell as a local administrator.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/12-Powershell-RunAsAdmin.png)
1. Install the Exchange Online module and connect with your tenant administrator account.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

If you want to specify the administrator account explicitly, you can also use:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. In Microsoft Entra **Enterprise applications**, find the app and record its `Object ID`. You will need it when creating the Exchange Online service principal.

{{% notice note %}}
The `OBJECT_ID` here must be the app's object ID in **Enterprise applications**, not the object ID shown on the **App registrations** overview page.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/15-Powershell-Get-ObjectId.png)

1. Run this command to create the Exchange Online service principal for the app registration. Microsoft describes this step as the registration of a Microsoft Entra application's service principal in Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

If this command fails even though the Exchange connection succeeded, verify that the administrator account has permission to manage Exchange Online service principals.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. Confirm that Exchange created the service principal and record its `Identity` value for the next steps.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Use the `Identity` value returned here as `<SERVICE_PRINCIPAL_ID>` in the next two permission commands.

1. If the sending mailbox does not exist yet, you can create a shared mailbox first, for example:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

If you already have a mailbox for sending mail, you can skip this step.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/17-Powershell-New-Mailbox.png)

1. Check whether `Authenticated SMTP` is enabled for the tenant and the sending mailbox.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

If it is not enabled, test emails may fail with this error:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

For the mailbox-level setting, run this if needed:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

If the tenant-level setting returns `True`, decide according to your organization policy whether to run:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

If both settings above look correct but the same `535 5.7.139` error continues, also check whether the tenant uses Microsoft Entra `Security defaults`. Microsoft Learn states that SMTP AUTH is disabled in Exchange Online when `Security defaults` is enabled.

For command details, see Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Grant the Exchange service principal `FullAccess` to the mailbox that RustDesk will use for sending mail.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Use the mailbox that you plan to enter in RustDesk `Mail Account`.

If this command returns an error like this:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

the value passed to `-Identity` did not resolve to an actual mailbox object in Exchange Online.

First confirm that the mailbox really exists in Exchange Online:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

If no mailbox is returned, create or confirm that mailbox first. For a `no-reply` sender address, you can create a shared mailbox, for example:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

If the mailbox already exists, make sure the value you use in `Add-MailboxPermission -Identity ...` is the mailbox's actual address, alias, or another resolvable mailbox identity.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. Grant the same service principal the `SendAs` permission.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

This step is also part of Microsoft's official app-only SMTP configuration.

### 3. Configure in RustDesk

At this point, you should already have:

- the sender address you will use in `From`
- the mailbox address you will use in `Mail Account`
- the `Directory (tenant) ID`
- the `Application (client) ID`
- the client secret `Value`
- a confirmed Exchange Online service principal that already has `FullAccess` and `SendAs` on the mailbox used for `Mail Account`

RustDesk does not ask for the Exchange service principal `Identity`, but the permission steps above must already be complete before you test email.

1. In the RustDesk [web console](../../console/), go to **Settings** -> **SMTP**.
1. Enable OAuth2 and select **Microsoft 365** as the provider.
1. Fill in these fields:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Click **Check** to save the configuration and send a test email.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

If the test email still fails, go back to the PowerShell section and re-check the Exchange Online service principal, `Authenticated SMTP`, and mailbox permissions for the mailbox used in `Mail Account`.

## References

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Used for the Exchange Online app permission and service principal steps.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Used for checking and enabling `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Used for creating a shared mailbox.
