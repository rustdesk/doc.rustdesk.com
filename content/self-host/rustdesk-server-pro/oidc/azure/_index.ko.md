---
title: Azure
weight: 16
description: "RustDesk 서버 프로용 OpenID Connect 제공자로 Microsoft Entra ID(Azure)를 구성하십시오. Azure Portal에서 앱 등록 및 OIDC 설정 단계를 따르십시오."
keywords: ["rustdesk azure oidc", "rustdesk entra id", "rustdesk azure sso", "rustdesk oidc azure", "rustdesk server pro azure"]
---

이 안내서를 사용하여 RustDesk Server Pro를 OpenID Connect로 Microsoft Entra ID에 연결하십시오.

## Azure OIDC 설정은 무엇을 하나요?

이 설정을 통해 사용자는 OpenID Connect를 이용해 Microsoft Entra ID 계정으로 RustDesk Server Pro에 로그인할 수 있습니다. 실제로는 Azure에서 RustDesk를 애플리케이션으로 등록하고, 클라이언트 자격 증명을 RustDesk Pro에 복사한 다음, RustDesk Pro를 Entra 테넌트 발급자 URL로 지정하면 됩니다.

## Azure OIDC 체크리스트

- 사용하려는 최종 콜백 원점을 통해 RustDesk Pro 웹 콘솔을 엽니다.
- Microsoft Entra ID에서 앱 등록을 생성합니다.
- Azure에서 `Client ID`를 RustDesk Pro로 복사합니다.
- 클라이언트 시크릿을 생성하고 즉시 시크릿 값을 저장하세요.
- 귀하의 `Directory (tenant) ID`를 사용해 발급자 URL을 구성하세요.
- Azure 인증 설정에서 `ID tokens`를 활성화하세요.

## RustDesk Pro에 입력해야 하는 Azure 값은 무엇인가요?

| RustDesk Pro 필드 | Azure 소스 |
| --- | --- |
| 콜백 URL | RustDesk Pro OIDC 설정 페이지에서 복사 |
| 클라이언트 ID | Azure 앱 개요의 `Application (client) ID` |
| 클라이언트 비밀번호 | `Certificates & secrets` 아래에 생성된 Secret `Value` |
| 발급자 | `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` |

## 동영상 자습서

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## 구성

1. [Azure portal](https://portal.azure.com)에 로그인하세요.
2. **Microsoft Entra ID**를 검색하고 선택하세요.
3. 왼쪽 메뉴에서 [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)를 선택하고, **새로운 등록**을 클릭하세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. RustDesk Pro 콘솔을 열고, **설정** 페이지에서 **OIDC** 모듈을 클릭하세요. 그런 다음 **콜백 URL**을 복사하세요. **노트**: **콜백 URL**은 수정할 수 없으며, `Path` 부분은 `api/oidc/callback`로 고정되어 있고, `Protocol://Host:Port` 부분은 현재 웹페이지의 원본입니다. 만약 `http://localhost:8000/<path>` 주소를 통해 열면, **콜백 URL**은 `http://localhost:8000/api/oidc/callback`가 됩니다. 만약 `https://192.168.0.1:8000/<path>` 주소를 통해 열면, **콜백 URL**은 `https://192.168.0.1:8000/api/oidc/callback`가 됩니다. Azure는 반드시 `https://` 또는 `http://localhost`를 사용해야 하므로, 적절한 주소를 선택하여 RustDesk Pro 콘솔을 열어주세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. **이름**을 입력하고, **지원되는 계정 유형**을 선택한 후, RustDesk Pro에서 **리디렉션 URI**를 붙여넣으세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. RustDesk Pro에서 **새 인증 제공자**를 클릭하세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. Azure에서 사용하려는 애플리케이션을 선택하고, **개요**를 클릭한 후, **애플리케이션(클라이언트) ID**를 복사하세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. RustDesk Pro에서 **클라이언트 ID**를 붙여넣으세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. Azure에서 **인증서 및 비밀번호**, 새 비밀번호를 생성하거나 기존 비밀번호를 선택하세요. 보통 새 비밀번호를 생성합니다.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. Azure에서 클라이언트 비밀번호의 값을 복사하세요. **노트**: 이 값은 처음 등록할 때만 보입니다. 페이지를 떠나면 더 이상 보이지 않습니다. 이 값을 잘 보관해 주세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. RustDesk Pro에서 클라이언트 비밀번호의 값을 붙여넣으세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. RustDesk Pro에서 **발급자** 필드에 `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`를 입력하세요. `Directory (tenant) ID`를 귀하의 **디렉터리(테넌트) ID**로 바꿔주세요. **디렉터리(테넌트) ID**는 Azure의 애플리케이션 **개요** 패널에 있습니다.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. Azure에서 **인증** 메뉴를 선택하세요. 그런 다음 **ID 토큰(암시적 및 하이브리드 플로우에 사용)**을 선택하여 권한 부여를 설정하세요.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## 참고문헌

- [Set up an OpenID Connect provider with Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)