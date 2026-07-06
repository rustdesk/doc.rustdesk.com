---
title: 2FA
weight: 16
description: "RustDesk 서버 프로에서 이메일 인증 또는 Authy, Microsoft Authenticator, Google Authenticator와 같은 TOTP 앱을 사용해 2단계 인증을 활성화하십시오."
keywords: ["rustdesk 2fa", "rustdesk totp", "rustdesk email verification", "rustdesk authenticator", "rustdesk server pro 2fa"]
---

이 안내서를 사용하여 RustDesk Server Pro에서 더 강력한 계정 보안을 위해 2FA를 활성화하십시오.

계정에 로그인할 때 2FA 인증을 켜면 계정 보안을 향상시킬 수 있습니다.

## 어떤 2FA 방법을 선택해야 하나요?

| 방법 | 최적의 사용 사례 | 사용하는 이유 |
| --- | --- | --- |
| 이메일 인증 | 이미 SMTP에 의존하는 간편한 배포 | 사용자가 이미 인증 앱을 사용하지 않는 경우 가장 쉽게 도입 가능 |
| TOTP | 강력한 일상적인 계정 보안 | 장기적인 관리자 및 운영자 계정에 더 안전하고 표준화된 방식 |

## 2FA 빠른 답변

- RustDesk Server Pro는 이메일 인증과 TOTP를 지원합니다.
- TOTP가 활성화되면 이메일 로그인 인증은 더 이상 사용되지 않습니다.
- TOTP 설정 시 6개의 백업 코드가 생성됩니다.
- 백업 코드는 한 번만 사용할 수 있습니다.
- 만료된 2FA는 여전히 작동할 수 있지만, 다시 활성화하면 비밀번호가 새로 생성되어 보안이 강화됩니다.

현재 당사 웹 콘솔은 두 가지 종류의 2FA를 지원합니다:

1. 이메일 인증
2. TOTP. 인증 코드를 생성하려면 [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) 및 [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)와 같은 타사 인증 앱이 필요합니다.

먼저 계정 설정 페이지로 이동해야 합니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## 이메일 인증

로그인을 위한 이메일 인증을 활성화하려면 다음이 필요합니다:

1. 이메일을 설정하세요.
2. `Enable email login verification` 옵션을 활성화하세요.
3. `Submit`를 클릭하세요.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

다음에 로그인할 때 RustDesk는 인증 코드 이메일을 보내며, 웹 페이지도 인증 페이지로 이동합니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP는 널리 사용되는 2FA 방법이므로, RustDesk 서버 프로의 웹 콘솔에서 2FA는 TOTP 인증을 의미합니다.

### 인증 앱 준비하기

먼저 인증 앱을 준비해야 합니다.
[Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) 및 [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) 인증 앱 중에서 선택할 수 있습니다.

### 2FA 활성화

설정 페이지에 `Enable 2FA` 버튼이 표시되면 현재 2FA가 활성화되지 않은 것입니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

버튼을 클릭하면 2FA를 활성화할 수 있는 양식이 나타납니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

인증 앱을 열고 QR코드를 스캔하여 계정을 추가하세요.

QR코드 스캔이 불편한 경우, 여기에 직접 코드를 입력할 수도 있습니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

인증 앱에서 계정을 추가한 후, 인증 앱에서 인증 코드를 입력하여 2FA를 켜세요.

2FA가 성공적으로 켜진 후, RustDesk Server Pro는 6개의 **백업 코드**와도 연결됩니다. 따라서 인증 앱을 사용할 수 없는 경우에도 이 **백업 코드**를 사용해 인증을 통과할 수 있습니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. 이 백업 코드는 한 번만 사용할 수 있습니다.

2. 백업 코드를 안전한 곳에 보관해 주세요.
{{% /notice %}}

### 로그인 인증

2FA가 활성화되면 이메일 로그인 인증은 더 이상 사용되지 않습니다. 대신 2FA 로그인 인증을 사용하게 됩니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

로그인 시 인증 페이지로 리디렉션됩니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### 설정 수정

2FA가 활성화된 경우 계정 설정을 수정하려면 추가적인 2FA 인증이 필요합니다.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### 2FA 상태

2FA는 총 3가지 상태를 가집니다: 비활성화, 활성화 및 만료됨.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA는 만료된 후에도 정상적으로 사용할 수 있습니다. 다만 오랜 기간 동안 2FA 설정이 변경되지 않았다는 의미입니다(기본값 180일). 보안을 위해 2FA를 다시 활성화하는 것이 좋습니다. 이렇게 하면 비밀 데이터가 업데이트될 수 있습니다.
{{% /notice %}}