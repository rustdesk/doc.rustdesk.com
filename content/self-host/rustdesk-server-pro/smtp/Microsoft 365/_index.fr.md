---
title: Microsoft 365
weight: 16
description: "Configurez SMTP OAuth2 (Microsoft 365) dans RustDesk Server Pro pour envoyer des e-mails via Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Utilisez ce guide pour configurer RustDesk Server Pro afin d'envoyer des e-mails via Microsoft 365 Exchange Online avec OAuth2.

Cette configuration convient aux e-mails d'invitation, aux e-mails de verification de connexion et aux notifications d'alerte de connexion.

Pour la configuration SMTP generale, consultez [SMTP](../).

## Quelles Valeurs Saisir Dans RustDesk Pro ?

| Champ RustDesk Pro | Valeur a saisir |
| --- | --- |
| From | L'adresse de l'expediteur affichee dans les e-mails sortants. |
| Mail Account | L'adresse de la boite aux lettres que RustDesk utilise comme nom d'utilisateur XOAUTH2 SMTP. |
| OAuth2 Tenant ID | `Directory (tenant) ID` dans la vue d'ensemble de l'application |
| OAuth2 Client ID | `Application (client) ID` dans la vue d'ensemble de l'application |
| OAuth2 Client secret | La `Value` du secret cree sous `Certificates & secrets` |

Cette capture montre ou saisir ces valeurs dans RustDesk :
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Configuration

Avant de commencer cette configuration, assurez-vous d'avoir :

- RustDesk Server Pro `1.8.1` ou version ulterieure
- Une boite aux lettres Microsoft 365 existante, ou une boite que vous prevoyez de creer pour l'envoi, par exemple `no-reply@contoso.com`
- Un compte administrateur Microsoft 365 capable d'accorder l'admin consent dans Microsoft Entra et de gerer les service principals Exchange Online

Cette configuration comporte trois parties :

- Configurer dans Azure l'enregistrement de l'application, le client secret, l'autorisation API et l'admin consent
- Configurer dans PowerShell le service principal Exchange Online, la boite aux lettres et les autorisations
- Configurer SMTP OAuth2 dans RustDesk et envoyer un e-mail de test

### 1. Configurer Dans Azure

1. Connectez-vous au [portail Azure](https://portal.azure.com).
1. Recherchez **App registrations** et ouvrez cet element.
1. Dans le menu de gauche, selectionnez [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), puis cliquez sur **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/1-Azure-AppRegistrations.png)
1. Creez l'enregistrement de l'application.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/3-Azure-RegisterAnApp.png)
1. Notez `Directory (tenant) ID` et `Application (client) ID`. Vous les saisirez plus tard dans RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/4-Azure-NewApp-Overview.png)
1. Ouvrez **Certificates & secrets**, puis creez un nouveau client secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/5-Azure-NewClientSecret.png)
1. Copiez immediatement la `Value` du secret. Microsoft n'affiche cette valeur qu'une seule fois.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/6-Azure-Secret.png)
1. Ouvrez **API permissions** et ajoutez l'autorisation applicative SMTP de Microsoft 365 Exchange Online.
1. Selectionnez **Add a permission**.
1. Selectionnez **APIs my organization uses** et recherchez **Office 365 Exchange Online**.
1. Selectionnez **Application permissions**.
1. Selectionnez **SMTP.SendAsApp** et enregistrez la modification.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/9-Azure-SMTP-Send.png)
1. Accordez l'admin consent a l'autorisation que vous venez d'ajouter.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/11-Azure-ApiPermissions.png)

### 2. Configurer Dans PowerShell

Dans cette partie, vous vous connectez a Exchange Online, creez le service principal, preparez la boite aux lettres et accordez les autorisations.

1. Ouvrez PowerShell en tant qu'administrateur local.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/12-Powershell-RunAsAdmin.png)
1. Installez le module Exchange Online et connectez-vous avec votre compte administrateur du tenant.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Si vous souhaitez specifier explicitement le compte administrateur, vous pouvez aussi utiliser :

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. Dans Microsoft Entra **Enterprise applications**, recherchez l'application et relevez son `Object ID`. Vous en aurez besoin lors de la creation du service principal Exchange Online.

{{% notice note %}}
L'`OBJECT_ID` utilise ici doit etre l'object ID de l'application dans **Enterprise applications**, et non l'object ID affiche dans la vue d'ensemble de **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/15-Powershell-Get-ObjectId.png)

1. Executez cette commande pour creer le service principal Exchange Online pour l'enregistrement de l'application. La documentation Microsoft decrit cette etape comme l'enregistrement du service principal d'une application Microsoft Entra dans Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Si cette commande echoue alors que la connexion a Exchange a reussi, verifiez que le compte administrateur est autorise a gerer les service principals Exchange Online.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/16-Powershell-New-ServicePrincipal.png)

1. Verifiez qu'Exchange a bien cree le service principal et relevez sa valeur `Identity` pour les etapes suivantes.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Utilisez la valeur `Identity` renvoyee ici comme `<SERVICE_PRINCIPAL_ID>` dans les deux commandes d'autorisation suivantes.

1. Si la boite aux lettres d'envoi n'existe pas encore, vous pouvez d'abord creer une shared mailbox, par exemple :

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Si vous disposez deja d'une boite aux lettres pour l'envoi, vous pouvez ignorer cette etape.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/17-Powershell-New-Mailbox.png)

1. Verifiez si `Authenticated SMTP` est active pour le tenant et pour la boite aux lettres d'envoi.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Si ce n'est pas active, les e-mails de test peuvent echouer avec l'erreur suivante :

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Pour le parametre au niveau de la boite aux lettres, executez ceci si necessaire :

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Si le parametre au niveau du tenant renvoie `True`, decidez selon la politique de votre organisation s'il faut executer :

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Si les parametres du tenant et de la boite aux lettres semblent corrects mais que la meme erreur `535 5.7.139` persiste, verifiez aussi si le tenant utilise Microsoft Entra `Security defaults`. Microsoft Learn indique que SMTP AUTH est desactive dans Exchange Online lorsque `Security defaults` est active.

Pour le detail des commandes, consultez Microsoft Learn : [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Accordez au service principal Exchange le droit `FullAccess` sur la boite aux lettres que RustDesk utilisera pour envoyer les e-mails.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Utilisez ici la boite aux lettres que vous prevoyez de saisir dans `Mail Account` de RustDesk.

Si cette commande renvoie une erreur comme celle-ci :

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

cela signifie que la valeur fournie a `-Identity` n'a pas ete resolue en un veritable objet de boite aux lettres dans Exchange Online.

Verifiez d'abord que la boite aux lettres existe bien dans Exchange Online :

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Si aucune boite aux lettres n'est renvoyee, creez ou confirmez d'abord cette boite. Pour une adresse d'expedition `no-reply`, vous pouvez creer une shared mailbox, par exemple :

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Si la boite aux lettres existe deja, assurez-vous que la valeur utilisee dans `Add-MailboxPermission -Identity ...` est bien l'adresse reelle de la boite, son alias, ou une autre identity de mailbox qu'Exchange peut resoudre.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/18-Powershell-Add-MailboxPermission.png)

1. Accordez ensuite au meme service principal l'autorisation `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Cette etape fait aussi partie de la configuration SMTP app-only officielle de Microsoft.

### 3. Configurer Dans RustDesk

A ce stade, vous devriez deja avoir :

- l'adresse d'expediteur pour `From`
- l'adresse de boite aux lettres pour `Mail Account`
- la `Directory (tenant) ID`
- l'`Application (client) ID`
- la `Value` du client secret
- un service principal Exchange Online confirme, qui dispose deja de `FullAccess` et `SendAs` sur la boite aux lettres utilisee dans `Mail Account`

RustDesk ne demande pas l'`Identity` du service principal Exchange, mais les etapes d'autorisation ci-dessus doivent etre terminees avant le test d'envoi.

1. Dans la [console web](../../console/) RustDesk, ouvrez **Settings** -> **SMTP**.
1. Activez OAuth2 et choisissez **Microsoft 365** comme fournisseur.
1. Renseignez ces champs :

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Cliquez sur **Check** pour enregistrer la configuration et envoyer un e-mail de test.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/21-RustDesk-SMTP-OAuth2-2.png)

Si l'e-mail de test echoue encore, revenez a la section PowerShell et verifiez de nouveau le service principal Exchange Online, `Authenticated SMTP` et les autorisations de la boite aux lettres utilisee dans `Mail Account`.

## Sources

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Utilise pour les etapes relatives aux autorisations d'application Exchange Online et aux service principals.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Utilise pour verifier et activer `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Utilise pour creer une shared mailbox.
