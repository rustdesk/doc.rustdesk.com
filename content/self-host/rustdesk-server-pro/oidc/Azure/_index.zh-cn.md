---
title: Azure
weight: 16
---

## 配置

1. 登录 [Azure 门户](portal.azure.com)。
2. 查找并选择 **Microsoft Entra ID**。
3. 选择左侧菜单的 [**应用注册**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)，点击 **新注册**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/1-Azure-NewRegistration.png)
4. 输入 **名称** ，选择 **受支持的帐户类型** 。输入 **重定向 URI**。在 **重定向 URI** 部分, 请将 `hbbs host` 和 `port` 替换为你自己的，如 `localhost:8000`。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/2-Azure-Register.png)
5. 打开 RustDesk Pro 控制台，进入 **设置** 页，点击 **OIDC** 模块，点击 **New auth provider**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/3-RustDesk-NewAuthProvider.png)
6. 在 Azure 中，选择你想使用的应用，点击 **概要**，拷贝 **应用程序(客户端) ID**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/images/4-Azure-ClientID.png)
7. 在 RustDesk Pro 中，复制 **Client id** 。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/5-RustDesk-ClientID.png)
8. 在 Azure 中， **证书和密码** ，新建或选择 **客户端密码**，一般是新建。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/6-Azure-NewOrSelectClientSecret.png)
9. 在 Azure 中，复制出客户端密码的值。**注**：只有刚注册时，这个值才是可见的，离开页面后不再可见，请妥善保管这个值。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/7-Azure-CopySecretValue.png)
10. 在 RustDesk Pro 中，粘贴客户端密码的值。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/8-RustDesk-FillClientSecret.png)
11. 在 RustDesk Pro 中，填入 **Issuer** 字段，`https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`。请将 `Directory (tenant) ID` 替换为您的 **目录(租户) ID**。**目录(租户) ID** 在 Azure 的应用 **概要** 面板中。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/10-Azure-TenantID.png)
12. 在 Azure 中， 选择 **身份验证** 菜单，设置授权，选择 **ID 令牌(用于隐式流和混合流)** 。
![](/docs/en/self-host/rustdesk-server-pro/oidc/Azure/11-Azure-Auth.png)


## 故障排除


## 参考

- [openid-settings](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [v2-protocols-oidc](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

