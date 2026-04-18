---
title: Microsoft 365
weight: 16
description: "Configureaza SMTP OAuth2 (Microsoft 365) in RustDesk Server Pro pentru a trimite e-mailuri prin Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Foloseste acest ghid pentru a configura RustDesk Server Pro sa trimita e-mailuri prin Microsoft 365 Exchange Online cu OAuth2.

Aceasta configuratie este potrivita pentru e-mailuri de invitatie, e-mailuri de verificare a autentificarii si notificari de alarma pentru conexiuni.

Pentru configurarea SMTP generala, vezi [SMTP](../).

## Ce Valori Se Introduc in RustDesk Pro?

| Camp RustDesk Pro | Ce se introduce |
| --- | --- |
| From | Adresa expeditorului afisata in e-mailurile trimise. |
| Mail Account | Adresa casutei postale pe care RustDesk o foloseste ca nume de utilizator XOAUTH2 SMTP. |
| OAuth2 Tenant ID | `Directory (tenant) ID` din pagina de prezentare a aplicatiei |
| OAuth2 Client ID | `Application (client) ID` din pagina de prezentare a aplicatiei |
| OAuth2 Client secret | `Value` al secretului creat in `Certificates & secrets` |

Aceasta captura arata unde se introduc aceste valori in RustDesk:
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Configurare

Inainte sa incepi aceasta configurare, asigura-te ca ai:

- RustDesk Server Pro `1.8.1` sau mai nou
- O casuta postala Microsoft 365 existenta, sau una pe care intentionezi sa o creezi pentru trimitere, de exemplu `no-reply@contoso.com`
- Un cont de administrator Microsoft 365 care poate acorda admin consent in Microsoft Entra si poate administra service principal in Exchange Online

Aceasta configurare are trei parti:

- Configurarea in Azure a inregistrarii aplicatiei, a client secret, a permisiunii API si a admin consent
- Configurarea in PowerShell a service principal Exchange Online, a casutei postale si a permisiunilor
- Configurarea SMTP OAuth2 in RustDesk si trimiterea unui e-mail de test

### 1. Configurare in Azure

1. Autentifica-te in [portalul Azure](https://portal.azure.com).
1. Cauta si selecteaza **App registrations**.
1. In meniul din stanga, selecteaza [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), apoi fa clic pe **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/1-Azure-AppRegistrations.png)
1. Creeaza inregistrarea aplicatiei.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/3-Azure-RegisterAnApp.png)
1. Noteaza `Directory (tenant) ID` si `Application (client) ID`. Le vei introduce mai tarziu in RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/4-Azure-NewApp-Overview.png)
1. Deschide **Certificates & secrets** si creeaza un nou client secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/5-Azure-NewClientSecret.png)
1. Copiaza imediat `Value` al secretului. Microsoft afiseaza aceasta valoare o singura data.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/6-Azure-Secret.png)
1. Deschide **API permissions** si adauga permisiunea de aplicatie SMTP pentru Microsoft 365 Exchange Online.
1. Selecteaza **Add a permission**.
1. Selecteaza **APIs my organization uses** si cauta **Office 365 Exchange Online**.
1. Selecteaza **Application permissions**.
1. Selecteaza **SMTP.SendAsApp** si salveaza modificarea.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/9-Azure-SMTP-Send.png)
1. Acorda admin consent pentru permisiunea pe care tocmai ai adaugat-o.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/11-Azure-ApiPermissions.png)

### 2. Configurare in PowerShell

In aceasta parte te conectezi la Exchange Online, creezi service principal, pregatesti casuta postala si acorzi permisiunile.

1. Deschide PowerShell ca administrator local.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/12-Powershell-RunAsAdmin.png)
1. Instaleaza modulul Exchange Online si conecteaza-te cu contul de administrator al tenantului.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Daca vrei sa specifici explicit contul de administrator, poti folosi si:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. In Microsoft Entra **Enterprise applications**, gaseste aplicatia si noteaza `Object ID`. Vei avea nevoie de el cand creezi service principal Exchange Online.

{{% notice note %}}
`OBJECT_ID` folosit aici trebuie sa fie object ID al aplicatiei din **Enterprise applications**, nu object ID afisat in pagina de prezentare din **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/15-Powershell-Get-ObjectId.png)

1. Ruleaza aceasta comanda pentru a crea service principal Exchange Online pentru inregistrarea aplicatiei. Documentatia Microsoft descrie acest pas ca inregistrarea service principal al unei aplicatii Microsoft Entra in Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Daca aceasta comanda esueaza chiar daca conexiunea la Exchange a reusit, verifica daca acel cont de administrator are permisiunea de a administra service principal in Exchange Online.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. Confirma ca Exchange a creat service principal si noteaza valoarea `Identity` pentru pasii urmatori.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Foloseste valoarea `Identity` returnata aici ca `<SERVICE_PRINCIPAL_ID>` in urmatoarele doua comenzi de acordare a permisiunilor.

1. Daca mailbox-ul de trimitere nu exista inca, poti crea mai intai un shared mailbox, de exemplu:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Daca ai deja un mailbox pentru trimitere, poti sari peste acest pas.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/17-Powershell-New-Mailbox.png)

1. Verifica daca `Authenticated SMTP` este activat pentru tenant si pentru mailbox-ul de trimitere.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Daca nu este activat, e-mailurile de test pot esua cu aceasta eroare:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Pentru setarea la nivel de mailbox, ruleaza aceasta comanda daca este necesar:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Daca setarea la nivel de tenant returneaza `True`, decide conform politicii organizatiei tale daca trebuie sa rulezi:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Daca setarile de la nivelul tenantului si al mailbox-ului par corecte, dar aceeasi eroare `535 5.7.139` continua sa apara, verifica si daca tenantul foloseste Microsoft Entra `Security defaults`. Microsoft Learn spune ca SMTP AUTH este dezactivat in Exchange Online atunci cand `Security defaults` este activat.

Pentru detaliile comenzilor, vezi Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Acorda service principal Exchange dreptul `FullAccess` asupra mailbox-ului pe care RustDesk il va folosi pentru trimiterea mesajelor.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Foloseste aici mailbox-ul pe care intentionezi sa il introduci in `Mail Account` in RustDesk.

Daca aceasta comanda returneaza o eroare ca aceasta:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

inseamna ca valoarea transmisa catre `-Identity` nu s-a rezolvat la un obiect real de mailbox in Exchange Online.

Mai intai confirma ca mailbox-ul exista cu adevarat in Exchange Online:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Daca nu este returnat niciun mailbox, creeaza mai intai acel mailbox sau confirma existenta lui. Pentru o adresa de expeditor `no-reply`, poti crea un shared mailbox, de exemplu:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Daca mailbox-ul exista deja, asigura-te ca valoarea folosita in `Add-MailboxPermission -Identity ...` este adresa reala a mailbox-ului, aliasul lui sau o alta mailbox identity pe care Exchange o poate rezolva.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. Acorda aceluiasi service principal si permisiunea `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Acest pas face parte si el din configuratia oficiala SMTP app-only a Microsoft.

### 3. Configurare in RustDesk

In acest punct ar trebui sa ai deja:

- adresa de expeditor pentru `From`
- adresa mailbox-ului pentru `Mail Account`
- `Directory (tenant) ID`
- `Application (client) ID`
- `Value` al client secret
- un service principal Exchange Online confirmat, care are deja `FullAccess` si `SendAs` asupra mailbox-ului folosit in `Mail Account`

RustDesk nu cere `Identity` pentru service principal Exchange, dar pasii de acordare a permisiunilor de mai sus trebuie sa fie deja finalizati inainte de testarea trimiterii.

1. In [consola web](../../console/) RustDesk, mergi la **Settings** -> **SMTP**.
1. Activeaza OAuth2 si selecteaza **Microsoft 365** ca provider.
1. Completeaza aceste campuri:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Fa clic pe **Check** pentru a salva configuratia si a trimite un e-mail de test.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

Daca e-mailul de test tot esueaza, intoarce-te la sectiunea PowerShell si verifica din nou service principal Exchange Online, `Authenticated SMTP` si permisiunile mailbox-ului folosit in `Mail Account`.

## Referinte

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Folosit pentru pasii privind permisiunile aplicatiei Exchange Online si service principal.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Folosit pentru verificarea si activarea `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Folosit pentru crearea unui shared mailbox.
