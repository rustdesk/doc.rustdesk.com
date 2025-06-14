---
title: Azure
weight: 16
---

## Tutorial em vídeo

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Configuração

1. Faça login no [portal do Azure](https://portal.azure.com).
2. Pesquise e selecione **Microsoft Entra ID**.
3. No menu esquerdo, selecione [**Registros de aplicativo**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), clique em **Novo registro**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Abra o console RustDesk Pro, na página **Configurações**, clique no módulo **OIDC**. Em seguida, copie a **URL de retorno de chamada**. **Nota**: A **URL de retorno de chamada** não é editável, a parte `Path` é fixa como `api/oidc/callback`, e a parte `Protocol://Host:Port` é a origem da página web atual. Se você abrir através do endereço `http://localhost:8000/<path>`, então a **URL de retorno de chamada** é `http://localhost:8000/api/oidc/callback`. Se você abrir através do endereço `https://192.168.0.1:8000/<path>`, então a **URL de retorno de chamada** é `https://192.168.0.1:8000/api/oidc/callback`. Como o Azure deve usar `https://` ou `http://localhost`, selecione o endereço apropriado para abrir seu console RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Digite o **Nome**, selecione os **Tipos de conta suportados**, e cole o **URI de redirecionamento** do RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. No RustDesk Pro, clique em **Novo provedor de autenticação**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. No Azure, selecione o aplicativo que você deseja usar, clique em **Visão geral**, e copie o **ID do aplicativo (cliente)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. No RustDesk Pro, cole o **ID do cliente**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. No Azure, **Certificados e segredos**, crie um novo segredo do cliente ou selecione um, geralmente Novo.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. No Azure, copie o valor do segredo do cliente. **Nota**: Este valor só é visível quando você registra pela primeira vez. Não é mais visível depois que você sai da página. Mantenha este valor adequadamente.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. No RustDesk Pro, cole o valor para o segredo do cliente.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. No RustDesk Pro, preencha o campo **Emissor** com `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Substitua `Directory (tenant) ID` pelo seu **ID do diretório (locatário)**. O **ID do diretório (locatário)** está no painel **Visão geral** do aplicativo Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. No Azure, selecione o menu **Autenticação**. Em seguida, configure a autorização, escolhendo **Tokens de ID (usados para fluxos implícitos e híbridos)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## Referências

- [Configurar um provedor OpenID Connect com Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect na plataforma de identidade da Microsoft](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)