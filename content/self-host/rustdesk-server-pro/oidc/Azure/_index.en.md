---
title: Azure
weight: 16
---

## Configuration

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Search for and select **Microsoft Entra ID**.
3. In the left menu, select [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), click **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/1-Azure-NewRegistration.png)
4. Open the RustDesk Pro console, in the **Settings** page, click the **OIDC** module. Then copy the **Callback URL**. **Note**: The **Callback URL** is not editable, the `Path` part is fixed to `api/oidc/callback`, and the `Protocol://Host:Port` part is the origin of the current web page. If you open it through the address `http://localhost:8000/<path>`, then the **Callback URL** is `http://localhost:8000/api/oidc/callback`. If you open it through the address `https://192.168.0.1:8000/<path>` is opened, then the **Callback URL** is `https://192.168.0.1:8000/api/oidc/callback`. Because Azure must use `https://` or `http://localhost`, please select the appropriate address to open your RustDesk Pro console.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Input the **Name**, select the **Supported account types**, and paste the **Redirect URI** from RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/2-Azure-Register.png)
6. In RustDesk Pro, click **New auth provider**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/3-RustDesk-NewAuthProvider.png)
7. In Azure, select the application you want to use, click **Overview**, and copy the **Application (client) ID**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/4-Azure-ClientID.png)
8. In RustDesk Pro, paste the **Client ID**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/5-RustDesk-ClientID.png)
9. In Azure, **Certificates & secrets**, create a new or select a client secret, usually New.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/6-Azure-NewOrSelectClientSecret.png)
10. In Azure, copy the value of the client secret. **Note**: This value is only visible when you first register. It is no longer visible after you leave the page. Please keep this value properly.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/7-Azure-CopySecretValue.png)
11. In RustDesk Pro, paste the value for the client secret.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/8-RustDesk-FillClientSecret.png)
12. In RustDesk Pro, fill in the **Issuer** field with `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Please replace `Directory (tenant) ID` with your **Directory (tenant) ID**. The **Directory (tenant) ID** is in Azure's app **Overview** panel.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/10-Azure-TenantID.png)
13. In Azure, select **Authentication** menu. Then set up authorization, by choosing **ID tokens (used for implicit and hybrid flows)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/11-Azure-Auth.png)

## Troubleshooting

## References

- [Set up an OpenID Connect provider with Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
