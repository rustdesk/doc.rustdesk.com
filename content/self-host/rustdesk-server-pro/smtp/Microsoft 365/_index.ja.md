---
title: Microsoft 365
weight: 16
description: "RustDesk Server Pro で SMTP OAuth2（Microsoft 365）を設定し、Exchange Online 経由でメールを送信します。"
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

このガイドでは、RustDesk Server Pro から Microsoft 365 Exchange Online を使って OAuth2 でメールを送信するための設定を説明します。

この構成は、招待メール、ログイン確認メール、接続アラーム通知に適しています。

一般的な SMTP 設定については [SMTP](../) を参照してください。

## RustDesk Pro に入力する値

| RustDesk Pro の項目 | 入力する値 |
| --- | --- |
| From | 送信メールに表示される送信元アドレス。 |
| Mail Account | RustDesk が XOAUTH2 SMTP のユーザー名として使用するメールボックスのアドレス。 |
| OAuth2 Tenant ID | アプリの概要にある `Directory (tenant) ID` |
| OAuth2 Client ID | アプリの概要にある `Application (client) ID` |
| OAuth2 Client secret | `Certificates & secrets` で作成した secret の `Value` |

次のスクリーンショットは、RustDesk でこれらの値をどこに入力するかを示しています。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/21-RustDesk-SMTP-OAuth2-2.png)

## 設定

この設定を始める前に、次を用意してください。

- RustDesk Server Pro `1.8.1` 以降
- 既存の Microsoft 365 メールボックス、または送信用にこれから作成するメールボックス。例: `no-reply@contoso.com`
- Microsoft Entra で管理者同意を付与でき、Exchange Online の service principal を管理できる Microsoft 365 管理者アカウント

この設定は 3 つのパートに分かれます。

- Azure でアプリ登録、client secret、API 権限、管理者同意を設定する
- PowerShell で Exchange Online service principal、メールボックス、権限を設定する
- RustDesk で SMTP OAuth2 を設定し、テストメールを送信する

### 1. Azure で設定

1. [Azure portal](https://portal.azure.com) にサインインします。
1. **App registrations** を検索して選択します。
1. 左側メニューで [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) を選択し、**New registration** をクリックします。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/1-Azure-AppRegistrations.png)
1. アプリ登録を作成します。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/3-Azure-RegisterAnApp.png)
1. `Directory (tenant) ID` と `Application (client) ID` を控えます。これらは後で RustDesk に入力します。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/4-Azure-NewApp-Overview.png)
1. **Certificates & secrets** を開き、新しい client secret を作成します。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/5-Azure-NewClientSecret.png)
1. secret の `Value` をすぐにコピーします。Microsoft はこの値を 1 回しか表示しません。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/6-Azure-Secret.png)
1. **API permissions** を開き、Microsoft 365 Exchange Online の SMTP アプリケーション権限を追加します。
1. **Add a permission** を選択します。
1. **APIs my organization uses** を選択し、**Office 365 Exchange Online** を検索します。
1. **Application permissions** を選択します。
1. **SMTP.SendAsApp** を選択して変更を保存します。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/9-Azure-SMTP-Send.png)
1. 追加した権限に対して管理者同意を付与します。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/11-Azure-ApiPermissions.png)

### 2. PowerShell で設定

このパートでは、Exchange Online に接続し、service principal を作成し、送信メールボックスを準備して権限を付与します。

1. PowerShell をローカル管理者として開きます。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/12-Powershell-RunAsAdmin.png)
1. Exchange Online モジュールをインストールし、テナント管理者アカウントで接続します。

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

管理者アカウントを明示したい場合は、次のようにも実行できます。

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. Microsoft Entra の **Enterprise applications** で対象アプリを探し、その `Object ID` を控えます。これは Exchange Online service principal の作成時に必要です。

{{% notice note %}}
ここで使う `OBJECT_ID` は **Enterprise applications** に表示される object ID であり、**App registrations** の概要ページに表示される object ID ではありません。
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/15-Powershell-Get-ObjectId.png)

1. 次のコマンドを実行して、アプリ登録用の Exchange Online service principal を作成します。Microsoft はこの手順を "Registration of a Microsoft Entra application's service principal in Exchange Online" と説明しています。

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Exchange への接続が成功しているのにこのコマンドが失敗する場合は、管理者アカウントに Exchange Online service principal を管理する権限があるか確認してください。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/16-Powershell-New-ServicePrincipal.png)

1. Exchange で service principal が作成されたことを確認し、次の手順で使う `Identity` の値を控えます。

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

後続の 2 つの権限コマンドで使う `<SERVICE_PRINCIPAL_ID>` には、ここで返された `Identity` の値を使ってください。

1. 送信用メールボックスがまだ存在しない場合は、先に shared mailbox を作成できます。例:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

すでに送信用メールボックスがある場合は、この手順は省略できます。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/17-Powershell-New-Mailbox.png)

1. テナントと送信メールボックスで `Authenticated SMTP` が有効か確認します。

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

有効になっていない場合、テストメールは次のエラーで失敗することがあります。

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

メールボックス単位の設定が必要な場合は、次を実行します。

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

テナント単位の設定が `True` を返した場合は、組織のポリシーに従って次を実行するか判断してください。

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

上記のテナント側とメールボックス側の設定が正しそうなのに同じ `535 5.7.139` エラーが続く場合は、テナントで Microsoft Entra `Security defaults` を使っているかも確認してください。Microsoft Learn では、`Security defaults` が有効なとき Exchange Online の SMTP AUTH は無効になると説明されています。

コマンドの詳細は Microsoft Learn の [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission) を参照してください。

1. RustDesk が送信に使うメールボックスに対して、Exchange service principal に `FullAccess` を付与します。

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

ここでは、RustDesk の `Mail Account` に入力する予定のメールボックスを指定してください。

このコマンドが次のようなエラーを返す場合:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

`-Identity` に渡した値が Exchange Online で実際のメールボックス オブジェクトとして解決されていません。

まず、そのメールボックスが Exchange Online に本当に存在するか確認してください。

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

何も返らない場合は、先にそのメールボックスを作成するか、存在を確認してください。`no-reply` のような送信用アドレスには、例えば次のように shared mailbox を作成できます。

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

すでにメールボックスが存在する場合は、`Add-MailboxPermission -Identity ...` に指定した値が、そのメールボックスの実際のアドレス、エイリアス、または Exchange が解決できる別の mailbox identity であることを確認してください。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/18-Powershell-Add-MailboxPermission.png)

1. 同じ service principal に `SendAs` 権限も付与します。

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

この手順も、Microsoft の公式 app-only SMTP 構成の一部です。

### 3. RustDesk で設定

この時点で、次がそろっているはずです。

- `From` に使う送信元アドレス
- `Mail Account` に使うメールボックスのアドレス
- `Directory (tenant) ID`
- `Application (client) ID`
- client secret の `Value`
- `Mail Account` に使うメールボックスに対して、すでに `FullAccess` と `SendAs` が付与されていることを確認済みの Exchange Online service principal

RustDesk には Exchange service principal の `Identity` を入力しませんが、メールテストの前に上記の権限設定は完了している必要があります。

1. RustDesk の [Web コンソール](../../console/) で **Settings** -> **SMTP** を開きます。
1. OAuth2 を有効にし、プロバイダーとして **Microsoft 365** を選択します。
1. 次の項目を入力します。

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. **Check** をクリックして設定を保存し、テストメールを送信します。
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/Microsoft 365/images/21-RustDesk-SMTP-OAuth2-2.png)

テストメールがまだ失敗する場合は、PowerShell のセクションに戻り、Exchange Online service principal、`Authenticated SMTP`、および `Mail Account` に使うメールボックスの権限をもう一度確認してください。

## 参考資料

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Exchange Online のアプリ権限と service principal の手順に使用。
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). `Authenticated SMTP` の確認と有効化に使用。
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). shared mailbox の作成に使用。
