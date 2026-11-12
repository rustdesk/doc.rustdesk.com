---
title: Microsoft 365
weight: 16
description: "Настройка SMTP OAuth2 (Microsoft 365) в RustDesk Server Pro для отправки почты через Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

В этом руководстве описано, как настроить RustDesk Server Pro на отправку почты через Microsoft 365 Exchange Online с OAuth2.

Такая настройка подходит для писем с приглашениями, писем с подтверждением входа и уведомлений о тревогах при подключениях.

Об общей настройке SMTP см. [SMTP](../).

## Какие значения вводить в RustDesk Pro?

| Поле в RustDesk Pro | Что ввести |
| --- | --- |
| From | Адрес отправителя, который виден в исходящих письмах. |
| Mail Account | Адрес почтового ящика, который RustDesk использует как имя пользователя SMTP для XOAUTH2. |
| OAuth2 Tenant ID | `Directory (tenant) ID` из обзора приложения |
| OAuth2 Client ID | `Application (client) ID` из обзора приложения |
| OAuth2 Client secret | `Value` секрета, созданного в разделе `Certificates & secrets` |

На этом снимке экрана показано, где эти значения вводятся в RustDesk:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Настройка

Перед началом убедитесь, что у вас есть:

- RustDesk Server Pro `1.8.1` или новее
- Существующий почтовый ящик Microsoft 365 или ящик, который вы собираетесь создать для отправки почты, например `no-reply@contoso.com`
- Учётная запись администратора Microsoft 365, которая может давать согласие администратора в Microsoft Entra и управлять субъектами-службами Exchange Online

Настройка состоит из трёх частей:

- Настройка регистрации приложения, секрета клиента, разрешения API и согласия администратора в Azure
- Настройка субъекта-службы Exchange Online, почтового ящика и разрешений в PowerShell
- Настройка SMTP OAuth2 в RustDesk и отправка тестового письма

### 1. Настройка в Azure

1. Войдите на [портал Azure](https://portal.azure.com).
1. Найдите и выберите **App registrations** (регистрация приложений).
1. В меню слева выберите [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) и нажмите **New registration** (новая регистрация).
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/1-Azure-AppRegistrations.png)
1. Создайте регистрацию приложения.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/3-Azure-RegisterAnApp.png)
1. Запишите `Directory (tenant) ID` и `Application (client) ID` — позже вы введёте их в RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/4-Azure-NewApp-Overview.png)
1. Откройте **Certificates & secrets** и создайте новый секрет клиента.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/5-Azure-NewClientSecret.png)
1. Сразу скопируйте `Value` секрета клиента. Microsoft показывает это значение только один раз.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/6-Azure-Secret.png)
1. Откройте **API permissions** и добавьте разрешение приложения SMTP для Microsoft 365 Exchange Online.
1. Выберите **Add a permission**.
1. Выберите **APIs my organization uses** и найдите **Office 365 Exchange Online**.
1. Выберите **Application permissions**.
1. Выберите **SMTP.SendAsApp** и сохраните изменение.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/9-Azure-SMTP-Send.png)
1. Дайте согласие администратора на только что добавленное разрешение.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/11-Azure-ApiPermissions.png)
### 2. Настройка в PowerShell

В этой части нужно подключиться к Exchange Online, создать субъект-службу, подготовить почтовый ящик и выдать разрешения.

1. Откройте PowerShell от имени локального администратора.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/12-Powershell-RunAsAdmin.png)
1. Установите модуль Exchange Online и подключитесь с учётной записью администратора клиента (tenant).

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Если нужно явно указать учётную запись администратора, можно также использовать:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. В разделе **Enterprise applications** (корпоративные приложения) Microsoft Entra найдите приложение и запишите его `Object ID`. Он понадобится при создании субъекта-службы Exchange Online.

{{% notice note %}}
Здесь `OBJECT_ID` — это идентификатор объекта приложения в **Enterprise applications**, а не идентификатор объекта, показанный на странице обзора в **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/15-Powershell-Get-ObjectId.png)

1. Выполните эту команду, чтобы создать субъект-службу Exchange Online для регистрации приложения. Microsoft описывает этот шаг как регистрацию субъекта-службы приложения Microsoft Entra в Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Если команда завершается ошибкой, хотя подключение к Exchange прошло успешно, проверьте, есть ли у учётной записи администратора права на управление субъектами-службами Exchange Online.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/16-Powershell-New-ServicePrincipal.png)

1. Убедитесь, что Exchange создал субъект-службу, и запишите его значение `Identity` для следующих шагов.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Используйте полученное здесь значение `Identity` вместо `<SERVICE_PRINCIPAL_ID>` в двух следующих командах выдачи разрешений.

1. Если почтового ящика для отправки ещё нет, можно сначала создать общий почтовый ящик, например:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Если почтовый ящик для отправки уже есть, этот шаг можно пропустить.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/17-Powershell-New-Mailbox.png)

1. Проверьте, включён ли `Authenticated SMTP` (SMTP с проверкой подлинности) для клиента (tenant) и почтового ящика отправителя.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Если он не включён, тестовые письма могут не отправляться с такой ошибкой:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Для настройки на уровне почтового ящика при необходимости выполните:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Если настройка на уровне клиента (tenant) возвращает `True`, решите в соответствии с политикой вашей организации, выполнять ли:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Если обе настройки выше в порядке, но ошибка `535 5.7.139` не исчезает, проверьте также, не включены ли в клиенте (tenant) `Security defaults` (параметры безопасности по умолчанию) Microsoft Entra. Согласно Microsoft Learn, при включённых `Security defaults` SMTP AUTH в Exchange Online отключён.

Подробнее о командах см. Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Выдайте субъекту-службе Exchange разрешение `FullAccess` на почтовый ящик, с которого RustDesk будет отправлять почту.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Укажите почтовый ящик, который вы собираетесь ввести в поле `Mail Account` в RustDesk.

Если команда возвращает примерно такую ошибку:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

значит, значение, переданное в `-Identity`, не соответствует реальному объекту почтового ящика в Exchange Online.

Сначала убедитесь, что почтовый ящик действительно существует в Exchange Online:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Если почтовый ящик не найден, сначала создайте его или проверьте. Для адреса отправителя `no-reply` можно создать общий почтовый ящик, например:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Если почтовый ящик уже существует, убедитесь, что в `Add-MailboxPermission -Identity ...` указан его реальный адрес, псевдоним или другой распознаваемый идентификатор почтового ящика.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/18-Powershell-Add-MailboxPermission.png)

1. Выдайте тому же субъекту-службе разрешение `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Этот шаг тоже входит в официальную настройку SMTP только для приложения (app-only) от Microsoft.

### 3. Настройка в RustDesk

К этому моменту у вас уже должны быть:

- адрес отправителя для поля `From`
- адрес почтового ящика для поля `Mail Account`
- `Directory (tenant) ID`
- `Application (client) ID`
- `Value` секрета клиента
- проверенный субъект-служба Exchange Online с разрешениями `FullAccess` и `SendAs` на почтовый ящик из поля `Mail Account`

RustDesk не запрашивает `Identity` субъекта-службы Exchange, но перед отправкой тестового письма шаги по выдаче разрешений выше уже должны быть выполнены.

1. В [веб-консоли](../../console/) RustDesk откройте **Settings** -> **SMTP**.
1. Включите OAuth2 и выберите поставщика **Microsoft 365**.
1. Заполните поля:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Нажмите **Check**, чтобы сохранить настройки и отправить тестовое письмо.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

Если тестовое письмо по-прежнему не отправляется, вернитесь к разделу о PowerShell и ещё раз проверьте субъект-службу Exchange Online, `Authenticated SMTP` и разрешения почтового ящика из поля `Mail Account`.

## Справочные материалы

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Использовано для шагов с разрешением приложения Exchange Online и субъектом-службой.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Использовано для проверки и включения `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Использовано для создания общего почтового ящика.
