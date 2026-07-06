---
title: SMTP
weight: 16
description: "RustDesk Server Pro에서 SMTP를 구성하여 자체 호스팅 서버에서 초대장, 로그인 인증 이메일 및 연결 알람을 보내세요."
keywords: ["rustdesk smtp", "rustdesk email notifications", "rustdesk login verification email", "rustdesk invitation email", "rustdesk server pro smtp"]
---

이 안내서를 사용하여 SMTP를 통해 RustDesk Server Pro의 발신 이메일을 구성하십시오.

SMTP 설정은 사용자 초대, 로그인 인증, 연결 알람과 같은 이메일 알림을 서버에서 보내도록 합니다.

## RustDesk Server Pro에서 SMTP는 어떤 용도로 사용되나요?

SMTP는 RustDesk Server Pro 배포에서 발신 이메일에 사용됩니다. 실제로 이는 일반적으로 초대 이메일, 로그인 인증 코드 및 연결 알람 알림을 의미합니다.

## SMTP 설정 체크리스트

1. 호스팅 환경에서 발신 메일을 허용하는 SMTP 서버를 선택하세요.
2. 호스트, 포트, 사용자 이름, 비밀번호 및 보낸 사람 주소를 수집하세요.
3. 이러한 설정을 RustDesk Server Pro 웹 콘솔에 추가하세요.
4. 사용자에게 이메일 기반 흐름을 활성화하기 전에 콘솔에서 테스트를 실행하세요.

## 이메일이 작동하지 않는 경우 가장 먼저 확인해야 할 사항은 무엇인가요?

- VPS 제공업체가 `25`, `465` 또는 `587`와 같은 포트를 차단하고 있는지 여부
- 메일 제공업체가 앱 비밀번호 또는 릴레이 전용 자격 증명을 요구하는지 여부
- `From` 주소가 메일 제공업체에서 허용되는지 여부
- TLS와 선택된 SMTP 포트가 메일 제공업체의 요구사항과 일치하는지 여부

Microsoft 365 OAuth2 설정에 대해서는 [Microsoft 365](microsoft-365/)를 참조하십시오.

[Video Tutorial](https://youtu.be/0LyQY1JS4Uc)