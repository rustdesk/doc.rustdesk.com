---
title: Microsoft 365
weight: 16
description: "RustDesk 서버 Pro에서 SMTP OAuth2(Microsoft 365)를 구성하여 Exchange Online을 통해 이메일을 보내기 바랍니다."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

이 가이드를 사용하여 RustDesk Server Pro가 OAuth2를 통해 Microsoft 365 Exchange Online를 통해 이메일을 보내도록 구성하십시오.

이 설정은 초대 이메일, 로그인 인증 이메일 및 연결 알람 알림에 적합합니다.

일반 SMTP 설정에 대해서는 [SMTP](../)를 참조하십시오.

## 어떤 값들이 RustDesk Pro에 들어가나요?

| RustDesk Pro 필드 | 입력할 내용 |
| --- | --- |
| 보낸 사람 | 발신 메일에 표시되는 발신자 주소입니다. |
| 메일 계정 | RustDesk가 XOAUTH2 SMTP 사용자 이름으로 사용하는 사서함 주소입니다. |
| OAuth2 테넌트 ID | 앱 개요에서 `Directory (tenant) ID` |
| OAuth2 클라이언트 ID | 앱 개요에서 `Application (client) ID` |
| OAuth2 클라이언트 비밀번호 | `Certificates & secrets` 아래에서 생성된 비밀번호 `Value` |

이 스크린샷은 이러한 값들이 RustDesk에서 어디에 입력되는지 보여줍니다:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

## 구성

이 구성 작업을 시작하기 전에 다음 사항을 확인하세요:

- RustDesk Server Pro `1.8.1` 이상
- 기존의 Microsoft 365 사서함 또는 메일을 보내기 위해 생성할 계획인 사서함, 예를 들어 `no-reply@contoso.com`
- Microsoft Entra에서 관리자 동의를 부여하고 Exchange Online 서비스 원칙을 관리할 수 있는 Microsoft 365 관리자 계정

이 구성에는 세 가지 부분이 있습니다:

- Azure에서 앱 등록, 클라이언트 시크릿, API 권한 및 관리자 동의를 구성하기
- PowerShell에서 Exchange Online 서비스 원칙, 사서함 및 권한을 구성하기
- RustDesk에서 SMTP OAuth2를 구성하고 테스트 이메일을 보내기

### 1. Azure에서 구성하기

1. [Azure portal](https://portal.azure.com)에 로그인하세요.
1. **앱 등록**을 검색하고 선택하세요.
1. 왼쪽 메뉴에서 [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)를 선택한 다음, **새로운 등록**을 클릭하세요.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/1-Azure-AppRegistrations.png)
1. 앱 등록을 생성하세요.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/3-Azure-RegisterAnApp.png)
1. `Directory (tenant) ID`와 `Application (client) ID`를 기록해 두세요. 나중에 RustDesk에서 이 값을 입력하게 됩니다.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/4-Azure-NewApp-Overview.png)
1. **인증서 및 비밀번호**를 열고 새 클라이언트 비밀번호를 생성하세요.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/5-Azure-NewClientSecret.png)
1. 클라이언트 비밀번호 `Value`를 즉시 복사하세요. Microsoft는 이 값을 한 번만 표시합니다.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/6-Azure-Secret.png)
1. **API 권한**을 열고 Microsoft 365 Exchange Online SMTP 애플리케이션 권한을 추가하세요.
1. **권한 추가**를 선택하세요.
1. **내 조직에서 사용하는 API**를 선택하고 **Office 365 Exchange Online**을 검색하세요.
1. **애플리케이션 권한**을 선택하세요.
1. **SMTP.SendAsApp**을 선택하고 변경 사항을 저장하세요.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/9-Azure-SMTP-Send.png)
1. 방금 추가한 권한에 대해 관리자 동의를 부여하세요.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/11-Azure-ApiPermissions.png)
### 2. PowerShell에서 구성하기

이 부분에서는 Exchange Online에 연결하고, 서비스 주체를 생성하며, 사서함을 준비하고, 권한을 부여합니다.

1. 로컬 관리자로 PowerShell을 엽니다.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/12-Powershell-RunAsAdmin.png)
1. Exchange Online 모듈을 설치하고 테넌트 관리자 계정으로 연결하세요.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

관리자 계정을 명시적으로 지정하려면 다음을 사용할 수도 있습니다:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. Microsoft Entra **기업용 애플리케이션**에서 앱을 찾아 해당 `Object ID`를 기록해 두세요. Exchange Online 서비스 원칙을 생성할 때 필요합니다.

{{% notice note %}}
여기서 `OBJECT_ID`는 **기업용 애플리케이션**에 있는 앱의 객체 ID여야 하며, **앱 등록** 개요 페이지에 표시된 객체 ID가 아닙니다.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/15-Powershell-Get-ObjectId.png)

1. 이 명령을 실행하여 앱 등록에 대한 Exchange Online 서비스 원칙을 생성하세요. Microsoft는 이 단계를 Exchange Online에서 Microsoft Entra 애플리케이션의 서비스 원칙을 등록하는 과정이라고 설명합니다.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

이 명령어가 Exchange 연결은 성공했음에도 불구하고 실패하는 경우, 관리자 계정에 Exchange Online 서비스 원칙을 관리할 수 있는 권한이 있는지 확인하십시오.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/16-Powershell-New-ServicePrincipal.png)

1. Exchange가 서비스 원칙을 생성했는지 확인하고 다음 단계를 위해 해당 `Identity` 값을 기록해 두십시오.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

여기서 반환된 `Identity` 값을 다음 두 권한 명령에서 `<SERVICE_PRINCIPAL_ID>`로 사용하십시오.

1. 보낼 메일함이 아직 존재하지 않는 경우, 먼저 공유 메일함을 생성할 수 있습니다. 예를 들어:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

이미 메일을 보내는 사서함이 있는 경우 이 단계를 건너뛸 수 있습니다.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/17-Powershell-New-Mailbox.png)

1. 테넌트와 발송 사서함에 대해 `Authenticated SMTP`가 활성화되었는지 확인하십시오.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

	
활성화되지 않은 경우, 테스트 이메일이 이 오류와 함께 실패할 수 있습니다:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

사서함 수준 설정을 위해 필요할 경우 다음을 실행하십시오:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

세입자 수준 설정이 `True`를 반환하는 경우, 귀하의 조직 정책에 따라 실행 여부를 결정하십시오:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

	
위의 두 설정이 모두 올바르게 보이지만 동일한 `535 5.7.139` 오류가 계속 발생하는 경우, 테넌트가 Microsoft Entra `Security defaults`를 사용하는지 확인하십시오. Microsoft Learn에 따르면 `Security defaults`가 활성화된 경우 Exchange Online에서 SMTP AUTH가 비활성화됩니다.

명령어 세부 정보는 Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission)를 참조하십시오.

1. RustDesk가 메일을 보내는 데 사용할 메일함에 Exchange 서비스 주체 `FullAccess`를 부여합니다.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

RustDesk `Mail Account`에 입력하려는 사서함을 사용하세요.

이 명령어가 다음과 같은 오류를 반환한다면:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

`-Identity`에 전달된 값이 Exchange Online의 실제 사서함 객체로 해결되지 않았습니다.

먼저 사서함이 실제로 Exchange Online에 존재하는지 확인하십시오:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

사서함이 반환되지 않으면 먼저 사서함을 생성하거나 확인하십시오. `no-reply` 발신자 주소의 경우, 예를 들어 공유 사서함을 생성할 수 있습니다:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

이미 존재합니다
서비스
서버
별명

  

사서함이 이미 존재하는 경우, `Add-MailboxPermission -Identity ...`에서 사용하는 값이 사서함의 실제 주소, 별명 또는 다른 해결 가능한 사서함 식별자인지 확인하십시오.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/18-Powershell-Add-MailboxPermission.png)

1. 동일한 서비스 원칙에 SendAs 권한을 부여하십시오.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

이 단계는 Microsoft의 공식 앱 전용 SMTP 구성의 일부이기도 합니다.

### 3. RustDesk에서 구성

이 시점에서 이미 다음을 보유하고 있어야 합니다:

- `From`에서 사용할 발신자 주소
- `Mail Account`에서 사용할 사서함 주소
- `Directory (tenant) ID`
- `Application (client) ID`
- 클라이언트 시크릿 `Value`
- 이미 확인된 Exchange Online 서비스 원칙으로, `Mail Account`에 사용된 사서함에 `FullAccess`와 `SendAs`가 이미 설정되어 있습니다

RustDesk는 Exchange 서비스 주체 `Identity`를 요청하지 않지만, 이메일을 테스트하기 전에 위의 권한 단계가 이미 완료되어야 합니다.

1. RustDesk [web console](../../console/)에서 **설정** -> **SMTP**로 이동하세요.
1. OAuth2를 활성화하고 제공자로 **Microsoft 365**를 선택하세요.
1. 다음 필드를 입력하세요:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. **확인**을 클릭하여 구성 내용을 저장하고 테스트 이메일을 보내기 바랍니다.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

테스트 이메일이 여전히 실패하는 경우, PowerShell 섹션으로 돌아가서 Exchange Online 서비스 주체, `Authenticated SMTP` 및 `Mail Account`에 사용된 사서함의 사서함 권한을 다시 확인하십시오.

## 참고 자료

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Exchange Online 앱 권한 및 서비스 주체 단계에 사용됩니다.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). `Authenticated SMTP` 확인 및 활성화에 사용됩니다.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). 공유 사서함을 생성하는 데 사용됩니다.