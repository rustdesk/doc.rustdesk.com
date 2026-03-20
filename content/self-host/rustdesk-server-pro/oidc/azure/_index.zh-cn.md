---
title: Azure
weight: 16
description: "RustDesk 的Azure文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk azure oidc", "rustdesk entra id", "rustdesk azure sso", "rustdesk oidc azure", "rustdesk server pro azure"]
---

# 配置

## Azure OIDC 设置是做什么的？

本配置让用户通过 Microsoft Entra ID 账户使用 OpenID Connect 登录 RustDesk Server Pro。实际操作是：在 Azure 中注册 RustDesk 应用，把客户端凭据填入 RustDesk Pro，并把 RustDesk Pro 指向你的 Entra 租户 issuer URL。

## Azure OIDC 检查清单

- 通过最终回调 origin 打开 RustDesk Pro Web 控制台。
- 在 Microsoft Entra ID 中创建应用注册。
- 将 Azure 的 `Client ID` 复制到 RustDesk Pro。
- 创建 client secret 并立即保存 secret value。
- 用 `Directory (tenant) ID` 生成 issuer URL。
- 在 Azure 身份验证设置里启用 `ID tokens`。

## Azure 中哪些值要填到 RustDesk Pro？

| RustDesk Pro 字段 | Azure 来源 |
| --- | --- |
| Callback URL | 从 RustDesk Pro 的 OIDC 设置页复制 |
| Client ID | Azure 应用概览中的 `Application (client) ID` |
| Client secret | `Certificates & secrets` 中创建的 secret `Value` |
| Issuer | `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` |

1. 登录 [Azure 门户](portal.azure.com)。
2. 查找并选择 **Microsoft Entra ID**。
3. 选择左侧菜单的 [**应用注册**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)，点击 **新注册**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. 打开 RustDesk Pro 控制台，进入 **设置** 页，点击 **OIDC** 模块，复制 **Callback url** 。**注**：**Callback url** 是不可编辑的，`Path`部分固定是`api/oidc/callback`，`Protocol://Host:Port` 部分是当前网页的值。如您是通过地址 `http://localhost:8000/<path>` 打开的，那么 **Callback url** 就是 `http://localhost:8000/api/oidc/callback` ，如果您是通过地址 `https://192.168.0.1:8000/<path>` 打开的，那么 **Callback url** 就是 `https://192.168.0.1:8000/api/oidc/callback` 。因为 Azure 必须用 `https://` 或者 `http://localhost` ，请选择合适的地址打开您的 RustDesk Pro 控制台。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. 输入 **名称** ，选择 **受支持的帐户类型** ，粘贴刚才复制的 **重定向 URI**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. 在 RustDesk Pro 中，点击 **New auth provider**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. 在 Azure 中，选择你想使用的应用，点击 **概要**，拷贝 **应用程序(客户端) ID**。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. 在 RustDesk Pro 中，粘贴 **Client id** 。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. 在 Azure 中， **证书和密码** ，新建或选择 **客户端密码**，一般是新建。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. 在 Azure 中，复制出客户端密码的值。**注**：只有刚注册时，这个值才是可见的，离开页面后不再可见，请妥善保管这个值。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. 在 RustDesk Pro 中，粘贴客户端密码的值。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. 在 RustDesk Pro 中，填入 **Issuer** 字段，`https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`。请将 `Directory (tenant) ID` 替换为您的 **目录(租户) ID**。**目录(租户) ID** 在 Azure 的应用 **概要** 面板中。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. 在 Azure 中， 选择 **身份验证** 菜单，设置授权，选择 **ID 令牌(用于隐式流和混合流)** 。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)


# 故障排除

# 参考

- [openid-settings](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [v2-protocols-oidc](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

