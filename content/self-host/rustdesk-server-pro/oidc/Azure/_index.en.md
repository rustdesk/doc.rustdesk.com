---
title: Azure
weight: 16
---

## Configuration

1. Sign in to the [Azure portal](portal.azure.com).
2. Search for and select **Microsoft Entra ID**.
3. In the left menu, select [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), click **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/1-Azure-NewRegistration.png)
4. Enter the **Name** and select the **Supported account types**. Enter **Redirect URI**. In the **Redirect URI** section, replace `hbbs host` and `port` with your own, such as `localhost:8000`.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/2-Azure-Register.png)
5. Open the RustDesk Pro console, in the **Settings** page, click the **OIDC** module, and click **New auth provider**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/3-RustDesk-NewAuthProvider.png)
6. In Azure, select the application you want to use, click **Overview**, and copy the **Application (client) ID**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/4-Azure-ClientID.png)
7. In RustDesk Pro, copy the **Client id**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/5-RustDesk-ClientID.png)
8. In Azure, **Certificates & secrets**, create a new or select a client secret, usually New.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/6-Azure-NewOrSelectClientSecret.png)
9. In Azure, copy out the value of the client secret. **Note**: This value is only visible when you first register. It is no longer visible after you leave the page. Please keep this value properly.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/7-Azure-CopySecretValue.png)
10. In RustDesk Pro, paste the value for the client secret.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/8-RustDesk-FillClientSecret.png)
11. In RustDesk Pro, fill in the **Issuer** field, `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Please replace `Directory (tenant) ID` with your **Directory (tenant) ID**. The **Directory (tenant) ID** is in Azure's app **Overview** panel.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/10-Azure-TenantID.png)
12. In Azure, select "Authentication" menu. Then set up authorization, by choosing **ID tokens (used for implicit and hybrid flows)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/11-Azure-Auth.png)


## Troubleshootings

## Refs

- [openid-settings](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [v2-protocols-oidc](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
