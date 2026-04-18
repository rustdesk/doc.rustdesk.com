---
title: Microsoft 365
weight: 16
description: "Konfigurieren Sie SMTP OAuth2 (Microsoft 365) in RustDesk Server Pro, um E-Mails uber Exchange Online zu senden."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Verwenden Sie diese Anleitung, um RustDesk Server Pro fur den E-Mail-Versand uber Microsoft 365 Exchange Online mit OAuth2 zu konfigurieren.

Diese Konfiguration eignet sich fur Einladungs-E-Mails, E-Mail-Anmeldebestatigungen und Verbindungswarnungen.

Allgemeine SMTP-Einstellungen finden Sie unter [SMTP](../).

## Welche Werte Tragen Sie in RustDesk Pro Ein?

| RustDesk Pro-Feld | Einzutragender Wert |
| --- | --- |
| From | Die Absenderadresse, die in ausgehenden E-Mails angezeigt wird. |
| Mail Account | Die Postfachadresse, die RustDesk als XOAUTH2-SMTP-Benutzernamen verwendet. |
| OAuth2 Tenant ID | `Directory (tenant) ID` aus der App-Ubersicht |
| OAuth2 Client ID | `Application (client) ID` aus der App-Ubersicht |
| OAuth2 Client secret | Der unter `Certificates & secrets` erstellte Secret-`Value` |

Dieser Screenshot zeigt, wo diese Werte in RustDesk eingetragen werden:
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Konfiguration

Bevor Sie mit der Konfiguration beginnen, stellen Sie sicher, dass Folgendes vorhanden ist:

- RustDesk Server Pro `1.8.1` oder neuer
- Ein vorhandenes Microsoft 365-Postfach oder ein Postfach, das Sie fur den Versand erstellen mochten, z. B. `no-reply@contoso.com`
- Ein Microsoft 365-Administratorkonto, das Admin Consent in Microsoft Entra erteilen und Exchange Online-Service Principals verwalten kann

Diese Konfiguration hat drei Teile:

- Appregistrierung, Client Secret, API-Berechtigung und Admin Consent in Azure konfigurieren
- Exchange Online-Service Principal, Postfach und Berechtigungen in PowerShell konfigurieren
- SMTP OAuth2 in RustDesk konfigurieren und eine Test-E-Mail senden

### 1. In Azure Konfigurieren

1. Melden Sie sich im [Azure-Portal](https://portal.azure.com) an.
1. Suchen Sie nach **App registrations** und offnen Sie den Eintrag.
1. Wahlen Sie im linken Menu [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) und klicken Sie dann auf **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/1-Azure-AppRegistrations.png)
1. Erstellen Sie die Appregistrierung.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/3-Azure-RegisterAnApp.png)
1. Notieren Sie `Directory (tenant) ID` und `Application (client) ID`. Diese Werte tragen Sie spater in RustDesk ein.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/4-Azure-NewApp-Overview.png)
1. Offnen Sie **Certificates & secrets** und erstellen Sie ein neues Client Secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/5-Azure-NewClientSecret.png)
1. Kopieren Sie den Secret-`Value` sofort. Microsoft zeigt diesen Wert nur einmal an.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/6-Azure-Secret.png)
1. Offnen Sie **API permissions** und fugen Sie die Microsoft 365 Exchange Online SMTP-Anwendungsberechtigung hinzu.
1. Wahlen Sie **Add a permission**.
1. Wahlen Sie **APIs my organization uses** und suchen Sie nach **Office 365 Exchange Online**.
1. Wahlen Sie **Application permissions**.
1. Wahlen Sie **SMTP.SendAsApp** und speichern Sie die Anderung.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/9-Azure-SMTP-Send.png)
1. Erteilen Sie Admin Consent fur die gerade hinzugefugte Berechtigung.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/11-Azure-ApiPermissions.png)

### 2. In PowerShell Konfigurieren

In diesem Teil verbinden Sie sich mit Exchange Online, erstellen den Service Principal, bereiten das Postfach vor und vergeben die Berechtigungen.

1. Offnen Sie PowerShell als lokaler Administrator.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/12-Powershell-RunAsAdmin.png)
1. Installieren Sie das Exchange Online-Modul und verbinden Sie sich mit Ihrem Mandanten-Administratorkonto.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Wenn Sie das Administratorkonto explizit angeben mochten, konnen Sie auch Folgendes verwenden:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. Suchen Sie in Microsoft Entra unter **Enterprise applications** die App und notieren Sie deren `Object ID`. Dieser Wert wird beim Erstellen des Exchange Online-Service Principals benotigt.

{{% notice note %}}
Die `OBJECT_ID` muss hier die Objekt-ID der App unter **Enterprise applications** sein, nicht die Objekt-ID aus der Ubersicht unter **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/15-Powershell-Get-ObjectId.png)

1. Fuhren Sie diesen Befehl aus, um den Exchange Online-Service Principal fur die Appregistrierung zu erstellen. Microsoft beschreibt diesen Schritt als Registrierung des Service Principals einer Microsoft Entra-Anwendung in Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Wenn dieser Befehl trotz erfolgreicher Exchange-Verbindung fehlschlagt, prufen Sie, ob das Administratorkonto Exchange Online-Service Principals verwalten darf.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. Bestatigen Sie, dass Exchange den Service Principal erstellt hat, und notieren Sie seinen `Identity`-Wert fur die nachsten Schritte.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Verwenden Sie den hier zuruckgegebenen `Identity`-Wert in den nachsten beiden Berechtigungsbefehlen als `<SERVICE_PRINCIPAL_ID>`.

1. Wenn das Absenderpostfach noch nicht existiert, konnen Sie zuerst ein Shared Mailbox-Postfach erstellen, zum Beispiel:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Wenn Sie bereits ein Postfach fur den Versand haben, konnen Sie diesen Schritt uberspringen.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/17-Powershell-New-Mailbox.png)

1. Prufen Sie, ob `Authenticated SMTP` fur den Mandanten und das Absenderpostfach aktiviert ist.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Wenn dies nicht aktiviert ist, konnen Test-E-Mails mit folgendem Fehler fehlschlagen:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Fur die Postfachebene konnen Sie bei Bedarf Folgendes ausfuhren:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Wenn die Mandantenebene `True` zuruckgibt, entscheiden Sie gemaB Ihrer Organisationsrichtlinie, ob Sie Folgendes ausfuhren:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Wenn die beiden Einstellungen oben korrekt aussehen, der gleiche Fehler `535 5.7.139` aber weiterhin auftritt, prufen Sie auch, ob der Mandant Microsoft Entra `Security defaults` verwendet. Laut Microsoft Learn ist SMTP AUTH in Exchange Online deaktiviert, wenn `Security defaults` aktiviert ist.

Details zu den Befehlen finden Sie in Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Gewahren Sie dem Exchange-Service Principal `FullAccess` fur das Postfach, das RustDesk zum Senden verwenden soll.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Verwenden Sie hier das Postfach, das Sie in RustDesk bei `Mail Account` eintragen mochten.

Wenn dieser Befehl einen Fehler wie den folgenden zuruckgibt:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

dann wurde der an `-Identity` ubergebene Wert in Exchange Online nicht zu einem tatsachlichen Postfachobjekt aufgelost.

Prufen Sie zuerst, ob das Postfach in Exchange Online wirklich existiert:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Wenn kein Postfach zuruckgegeben wird, erstellen oder bestatigen Sie dieses Postfach zuerst. Fur eine `no-reply`-Absenderadresse konnen Sie z. B. ein Shared Mailbox-Postfach erstellen:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Wenn das Postfach bereits existiert, stellen Sie sicher, dass der in `Add-MailboxPermission -Identity ...` verwendete Wert die tatsachliche Adresse, der Alias oder eine andere auflosbare Mailbox-Identity ist.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. Gewahren Sie demselben Service Principal zusatzlich die Berechtigung `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Auch dieser Schritt gehort zur offiziellen app-only SMTP-Konfiguration von Microsoft.

### 3. In RustDesk Konfigurieren

Zu diesem Zeitpunkt sollten Sie bereits Folgendes haben:

- die Absenderadresse fur `From`
- die Postfachadresse fur `Mail Account`
- die `Directory (tenant) ID`
- die `Application (client) ID`
- den Secret-`Value`
- einen bestatigten Exchange Online-Service Principal, der bereits `FullAccess` und `SendAs` fur das unter `Mail Account` verwendete Postfach hat

RustDesk fragt nicht nach der `Identity` des Exchange-Service Principals, aber die oben genannten Berechtigungsschritte mussen vor dem E-Mail-Test abgeschlossen sein.

1. Offnen Sie in der RustDesk-[Web-Konsole](../../console/) **Settings** -> **SMTP**.
1. Aktivieren Sie OAuth2 und wahlen Sie **Microsoft 365** als Anbieter.
1. Fullen Sie diese Felder aus:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Klicken Sie auf **Check**, um die Konfiguration zu speichern und eine Test-E-Mail zu senden.
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

Wenn der E-Mail-Test weiterhin fehlschlagt, gehen Sie zum PowerShell-Abschnitt zuruck und prufen Sie den Exchange Online-Service Principal, `Authenticated SMTP` und die Postfachberechtigungen fur das in `Mail Account` verwendete Postfach erneut.

## Referenzen

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Verwendet fur die Schritte zu Exchange Online-Appberechtigungen und Service Principals.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Verwendet zum Prufen und Aktivieren von `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Verwendet zum Erstellen eines Shared Mailbox-Postfachs.
