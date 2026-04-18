---
title: Microsoft 365
weight: 16
description: "Configure SMTP OAuth2 (Microsoft 365) no RustDesk Server Pro para enviar e-mails pelo Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Use este guia para configurar o RustDesk Server Pro para enviar e-mails pelo Microsoft 365 Exchange Online com OAuth2.

Esta configuracao e adequada para e-mails de convite, e-mails de verificacao de login e notificacoes de alerta de conexao.

Para a configuracao SMTP geral, consulte [SMTP](../).

## Quais Valores Inserir no RustDesk Pro?

| Campo do RustDesk Pro | O que inserir |
| --- | --- |
| From | O endereco do remetente exibido nos e-mails enviados. |
| Mail Account | O endereco da caixa de correio que o RustDesk usa como nome de usuario XOAUTH2 SMTP. |
| OAuth2 Tenant ID | `Directory (tenant) ID` na visao geral do aplicativo |
| OAuth2 Client ID | `Application (client) ID` na visao geral do aplicativo |
| OAuth2 Client secret | O `Value` do secret criado em `Certificates & secrets` |

Esta captura mostra onde esses valores sao inseridos no RustDesk:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Configuracao

Antes de iniciar esta configuracao, verifique se voce tem:

- RustDesk Server Pro `1.8.1` ou posterior
- Uma caixa de correio Microsoft 365 existente, ou uma que voce pretende criar para envio, por exemplo `no-reply@contoso.com`
- Uma conta de administrador do Microsoft 365 que possa conceder admin consent no Microsoft Entra e gerenciar service principals do Exchange Online

Esta configuracao tem tres partes:

- Configurar no Azure o registro do aplicativo, o client secret, a permissao de API e o admin consent
- Configurar no PowerShell o service principal do Exchange Online, a caixa de correio e as permissoes
- Configurar SMTP OAuth2 no RustDesk e enviar um e-mail de teste

### 1. Configuracao no Azure

1. Entre no [portal do Azure](https://portal.azure.com).
1. Procure e selecione **App registrations**.
1. No menu esquerdo, selecione [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) e clique em **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/1-Azure-AppRegistrations.png)
1. Crie o registro do aplicativo.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/3-Azure-RegisterAnApp.png)
1. Anote `Directory (tenant) ID` e `Application (client) ID`. Voce os informara depois no RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/4-Azure-NewApp-Overview.png)
1. Abra **Certificates & secrets** e crie um novo client secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/5-Azure-NewClientSecret.png)
1. Copie imediatamente o `Value` do secret. A Microsoft mostra esse valor apenas uma vez.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/6-Azure-Secret.png)
1. Abra **API permissions** e adicione a permissao de aplicativo SMTP do Microsoft 365 Exchange Online.
1. Selecione **Add a permission**.
1. Selecione **APIs my organization uses** e procure **Office 365 Exchange Online**.
1. Selecione **Application permissions**.
1. Selecione **SMTP.SendAsApp** e salve a alteracao.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/9-Azure-SMTP-Send.png)
1. Conceda admin consent para a permissao que voce acabou de adicionar.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/11-Azure-ApiPermissions.png)

### 2. Configuracao no PowerShell

Nesta parte, voce vai se conectar ao Exchange Online, criar o service principal, preparar a caixa de correio e conceder as permissoes.

1. Abra o PowerShell como administrador local.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/12-Powershell-RunAsAdmin.png)
1. Instale o modulo do Exchange Online e conecte-se com a conta de administrador do tenant.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Se quiser especificar explicitamente a conta de administrador, voce tambem pode usar:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. Em Microsoft Entra **Enterprise applications**, encontre o aplicativo e anote o `Object ID`. Voce precisara dele ao criar o service principal do Exchange Online.

{{% notice note %}}
O `OBJECT_ID` aqui deve ser o object ID do aplicativo em **Enterprise applications**, e nao o object ID mostrado na pagina de visao geral de **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/15-Powershell-Get-ObjectId.png)

1. Execute este comando para criar o service principal do Exchange Online para o registro do aplicativo. A documentacao da Microsoft descreve esta etapa como o registro do service principal de um aplicativo do Microsoft Entra no Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Se este comando falhar mesmo com a conexao ao Exchange funcionando, verifique se a conta de administrador tem permissao para gerenciar service principals do Exchange Online.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. Confirme que o Exchange criou o service principal e anote o valor `Identity` para as proximas etapas.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Use o valor `Identity` retornado aqui como `<SERVICE_PRINCIPAL_ID>` nos dois comandos de permissao seguintes.

1. Se a caixa de correio de envio ainda nao existir, voce pode criar primeiro uma shared mailbox, por exemplo:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Se voce ja tiver uma caixa de correio para envio, pode pular esta etapa.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/17-Powershell-New-Mailbox.png)

1. Verifique se `Authenticated SMTP` esta habilitado para o tenant e para a caixa de correio de envio.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Se nao estiver habilitado, os e-mails de teste podem falhar com este erro:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Para a configuracao no nivel da caixa de correio, execute isto se necessario:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Se a configuracao no nivel do tenant retornar `True`, decida de acordo com a politica da sua organizacao se deve executar:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Se as configuracoes do tenant e da caixa de correio parecerem corretas, mas o mesmo erro `535 5.7.139` continuar, verifique tambem se o tenant usa Microsoft Entra `Security defaults`. O Microsoft Learn informa que o SMTP AUTH fica desabilitado no Exchange Online quando `Security defaults` esta habilitado.

Para detalhes dos comandos, consulte Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Conceda ao service principal do Exchange `FullAccess` a caixa de correio que o RustDesk usara para enviar e-mails.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Use aqui a caixa de correio que voce pretende informar em `Mail Account` no RustDesk.

Se este comando retornar um erro como este:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

isso significa que o valor passado para `-Identity` nao foi resolvido como um objeto real de caixa de correio no Exchange Online.

Primeiro confirme se a caixa de correio realmente existe no Exchange Online:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Se nenhuma caixa de correio for retornada, crie ou confirme essa caixa primeiro. Para um endereco remetente `no-reply`, voce pode criar uma shared mailbox, por exemplo:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Se a caixa de correio ja existir, verifique se o valor usado em `Add-MailboxPermission -Identity ...` e o endereco real da caixa, o alias ou outra mailbox identity que o Exchange consiga resolver.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. Conceda ao mesmo service principal a permissao `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Esta etapa tambem faz parte da configuracao oficial de SMTP app-only da Microsoft.

### 3. Configuracao no RustDesk

Neste ponto, voce ja deve ter:

- o endereco remetente que usara em `From`
- o endereco da caixa de correio que usara em `Mail Account`
- o `Directory (tenant) ID`
- o `Application (client) ID`
- o `Value` do client secret
- um service principal do Exchange Online confirmado, que ja tenha `FullAccess` e `SendAs` sobre a caixa de correio usada em `Mail Account`

O RustDesk nao solicita a `Identity` do service principal do Exchange, mas as etapas de permissao acima ja precisam estar concluidas antes de testar o envio.

1. Na [console web](../../console/) do RustDesk, acesse **Settings** -> **SMTP**.
1. Ative OAuth2 e selecione **Microsoft 365** como provedor.
1. Preencha estes campos:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Clique em **Check** para salvar a configuracao e enviar um e-mail de teste.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

Se o e-mail de teste ainda falhar, volte para a secao do PowerShell e confira novamente o service principal do Exchange Online, `Authenticated SMTP` e as permissoes da caixa de correio usada em `Mail Account`.

## Referencias

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Usado para as etapas de permissao de aplicativo do Exchange Online e de service principal.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Usado para verificar e habilitar `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Usado para criar uma shared mailbox.
