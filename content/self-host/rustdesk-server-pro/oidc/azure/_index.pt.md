---
title: Azure
weight: 16
---

### Configuração

1. Faça login no [portal do Azure](https://portal.azure.com).
2. Procure e selecione **Microsoft Entra ID**.
3. No menu à esquerda, selecione [Registros de aplicativo](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), clique em **Novo registro**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Abra o console do RustDesk Pro, na página de **Configurações**, clique no módulo **OIDC**. Em seguida, copie a **URL de retorno**. **Observação**: A **URL de retorno** não é editável, a parte `Caminho` é fixada em `api/oidc/callback`, e a parte `Protocol://Host:Port` é a origem da página web atual. Se você abri-lo através do endereço `http://localhost:8000/<caminho>`, então a **URL de retorno** é `http://localhost:8000/api/oidc/callback`. Se for aberto através do endereço `https://192.168.0.1:8000/<caminho>`, então a **URL de retorno** é `https://192.168.0.1:8000/api/oidc/callback`. Como o Azure deve usar `https://` ou `http://localhost`, selecione o endereço apropriado para abrir o console do RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Insira o **Nome**, selecione os **Tipos de conta suportados** e cole o **URI de redirecionamento** do RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. No RustDesk Pro, clique em **Novo provedor de autenticação**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. No Azure, selecione o aplicativo que deseja usar, clique em **Visão geral** e copie a **ID do aplicativo (cliente)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. No RustDesk Pro, cole a **ID do cliente**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. No Azure, em **Certificados e segredos**, crie um novo segredo de cliente ou selecione um existente, geralmente Novo.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. No Azure, copie o valor do segredo do cliente. **Observação**: Esse valor só é visível quando você registra pela primeira vez. Ele não fica mais visível depois que você sai da página. Por favor, mantenha este valor em segurança.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. No RustDesk Pro, cole o valor do segredo do cliente.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. No RustDesk Pro, preencha o campo **Emissor** com `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Substitua `<ID do diretório (locatário)>` pela sua `ID do diretório (locatário)`. A **ID do diretório (locatário)** está no painel Visão geral do aplicativo do Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. No Azure, selecione o menu **Autenticação**. Em seguida, configure a autorização escolhendo **Tokens de ID (usados para fluxos implícitos e híbridos)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

### Referências

- [Configurar um provedor OpenID Connect com o Azure AD](https://learn.microsoft.com/pt-br/power-pages/security/authentication/openid-settings)
- [OpenID Connect na plataforma de identidade da Microsoft](https://learn.microsoft.com/pt-br/entra/identity-platform/v2-protocols-oidc)
