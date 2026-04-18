---
title: Microsoft 365
weight: 16
description: "Configure SMTP OAuth2 (Microsoft 365) en RustDesk Server Pro para enviar correo a traves de Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Use esta guia para configurar RustDesk Server Pro para enviar correo mediante Microsoft 365 Exchange Online con OAuth2.

Esta configuracion es adecuada para correos de invitacion, verificacion de inicio de sesion por correo y notificaciones de alarma de conexion.

Para la configuracion SMTP general, consulte [SMTP](../).

## Que Valores Van en RustDesk Pro?

| Campo de RustDesk Pro | Que introducir |
| --- | --- |
| From | La direccion del remitente que se muestra en los correos salientes. |
| Mail Account | La direccion del buzon que RustDesk usa como nombre de usuario XOAUTH2 SMTP. |
| OAuth2 Tenant ID | `Directory (tenant) ID` de la vista general de la aplicacion |
| OAuth2 Client ID | `Application (client) ID` de la vista general de la aplicacion |
| OAuth2 Client secret | El `Value` del secreto creado en `Certificates & secrets` |

Esta captura muestra donde se introducen estos valores en RustDesk:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Configuracion

Antes de empezar esta configuracion, asegurese de tener:

- RustDesk Server Pro `1.8.1` o posterior
- Un buzon de Microsoft 365 existente, o uno que piense crear para enviar correo, por ejemplo `no-reply@contoso.com`
- Una cuenta de administrador de Microsoft 365 que pueda conceder admin consent en Microsoft Entra y administrar service principals de Exchange Online

Esta configuracion tiene tres partes:

- Configurar en Azure el registro de la aplicacion, el client secret, el permiso de API y el admin consent
- Configurar en PowerShell el service principal de Exchange Online, el buzon y los permisos
- Configurar SMTP OAuth2 en RustDesk y enviar un correo de prueba

### 1. Configurar en Azure

1. Inicie sesion en el [portal de Azure](https://portal.azure.com).
1. Busque y seleccione **App registrations**.
1. En el menu izquierdo, seleccione [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) y luego haga clic en **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/1-Azure-AppRegistrations.png)
1. Cree el registro de aplicacion.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/3-Azure-RegisterAnApp.png)
1. Anote `Directory (tenant) ID` y `Application (client) ID`. Los introducira mas tarde en RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/4-Azure-NewApp-Overview.png)
1. Abra **Certificates & secrets** y cree un nuevo client secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/5-Azure-NewClientSecret.png)
1. Copie inmediatamente el `Value` del secreto. Microsoft solo lo muestra una vez.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/6-Azure-Secret.png)
1. Abra **API permissions** y agregue el permiso de aplicacion SMTP de Microsoft 365 Exchange Online.
1. Seleccione **Add a permission**.
1. Seleccione **APIs my organization uses** y busque **Office 365 Exchange Online**.
1. Seleccione **Application permissions**.
1. Seleccione **SMTP.SendAsApp** y guarde el cambio.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/9-Azure-SMTP-Send.png)
1. Conceda admin consent al permiso que acaba de agregar.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/11-Azure-ApiPermissions.png)

### 2. Configurar en PowerShell

En esta parte se conectara a Exchange Online, creara el service principal, preparara el buzon y concedera los permisos.

1. Abra PowerShell como administrador local.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/12-Powershell-RunAsAdmin.png)
1. Instale el modulo de Exchange Online y conectese con la cuenta de administrador del inquilino.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Si desea especificar la cuenta de administrador de forma explicita, tambien puede usar:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. En Microsoft Entra **Enterprise applications**, busque la aplicacion y anote su `Object ID`. Lo necesitara al crear el service principal de Exchange Online.

{{% notice note %}}
El `OBJECT_ID` aqui debe ser el object ID de la aplicacion en **Enterprise applications**, no el object ID que aparece en la pagina de informacion general de **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/15-Powershell-Get-ObjectId.png)

1. Ejecute este comando para crear el service principal de Exchange Online para el registro de la aplicacion. La documentacion de Microsoft describe este paso como el registro del service principal de una aplicacion de Microsoft Entra en Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Si este comando falla aunque la conexion a Exchange haya funcionado, verifique que la cuenta de administrador tenga permiso para administrar service principals de Exchange Online.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/16-Powershell-New-ServicePrincipal.png)

1. Confirme que Exchange ha creado el service principal y anote su valor `Identity` para los pasos siguientes.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Use el valor `Identity` devuelto aqui como `<SERVICE_PRINCIPAL_ID>` en los dos comandos de permisos siguientes.

1. Si el buzon de envio todavia no existe, puede crear primero un shared mailbox, por ejemplo:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Si ya tiene un buzon para el envio de correo, puede omitir este paso.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/17-Powershell-New-Mailbox.png)

1. Compruebe si `Authenticated SMTP` esta habilitado para el inquilino y para el buzon de envio.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Si no esta habilitado, los correos de prueba pueden fallar con este error:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Para la configuracion a nivel de buzon, ejecute esto si es necesario:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Si la configuracion a nivel de inquilino devuelve `True`, decida segun la politica de su organizacion si debe ejecutar:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Si la configuracion del inquilino y del buzon parece correcta pero el mismo error `535 5.7.139` continua, compruebe tambien si el inquilino usa Microsoft Entra `Security defaults`. Microsoft Learn indica que SMTP AUTH esta deshabilitado en Exchange Online cuando `Security defaults` esta habilitado.

Para los detalles de los comandos, consulte Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Conceda al service principal de Exchange `FullAccess` al buzon que RustDesk usara para enviar correo.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Use aqui el buzon que piensa introducir en `Mail Account` de RustDesk.

Si este comando devuelve un error como este:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

significa que el valor pasado a `-Identity` no se resolvio como un objeto de buzon real en Exchange Online.

Primero confirme que el buzon realmente existe en Exchange Online:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Si no se devuelve ningun buzon, cree o confirme primero ese buzon. Para una direccion de remitente `no-reply`, puede crear un shared mailbox, por ejemplo:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Si el buzon ya existe, asegurese de que el valor usado en `Add-MailboxPermission -Identity ...` sea la direccion real del buzon, su alias u otra identidad de buzon que Exchange pueda resolver.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/18-Powershell-Add-MailboxPermission.png)

1. Conceda al mismo service principal el permiso `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Este paso tambien forma parte de la configuracion oficial de SMTP app-only de Microsoft.

### 3. Configurar en RustDesk

En este punto ya deberia tener:

- la direccion del remitente que usara en `From`
- la direccion del buzon que usara en `Mail Account`
- el `Directory (tenant) ID`
- el `Application (client) ID`
- el `Value` del client secret
- un service principal de Exchange Online confirmado que ya tenga `FullAccess` y `SendAs` sobre el buzon usado en `Mail Account`

RustDesk no solicita la `Identity` del service principal de Exchange, pero los pasos de permisos anteriores deben completarse antes de probar el correo.

1. En la [consola web](../../console/) de RustDesk, vaya a **Settings** -> **SMTP**.
1. Habilite OAuth2 y seleccione **Microsoft 365** como proveedor.
1. Rellene estos campos:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Haga clic en **Check** para guardar la configuracion y enviar un correo de prueba.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft365/images/21-RustDesk-SMTP-OAuth2-2.png)

Si la prueba de correo sigue fallando, vuelva a la seccion de PowerShell y revise otra vez el service principal de Exchange Online, `Authenticated SMTP` y los permisos del buzon usado en `Mail Account`.

## Referencias

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Se usa para los pasos de permisos de aplicacion y service principal de Exchange Online.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Se usa para comprobar y habilitar `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Se usa para crear un shared mailbox.
