---
title: OIDC
weight: 16
description: "RustDesk Server Pro에서 OpenID Connect를 구성하여 사용자가 Google, Okta, Azure, GitHub, GitLab 등과 같은 ID 제공업체로 로그인할 수 있도록 하세요."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

RustDesk Server Pro에서 OpenID Connect를 사용하여 사용자가 별도의 로컬 자격 증명 대신 기존 ID 제공자로 로그인하도록 하세요.

- 기존의 `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab` 등의 계정을 사용하여 손쉽게 `RustDesk Pro` 계정을 생성하고 로그인하세요.
- 사양에 대해서는 [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html)을 참조하십시오.

## RustDesk Server Pro에서 OIDC란 무엇인가요?

OIDC를 사용하면 RustDesk Server Pro가 로그인을 외부 ID 제공자에게 위임할 수 있습니다. 별도의 RustDesk 비밀번호를 관리하는 대신, 사용자는 이미 신원 확인, 접근 제어 및 계정 라이프사이클에 사용하고 있는 제공자와 인증됩니다.

## 로컬 계정 대신 OIDC를 사용해야 하는 경우는 언제인가요?

- 이미 Azure, Okta, GitHub, GitLab, Google 또는 다른 OIDC 지원 제공자를 사용하고 있음
- 중앙 집중식 비밀번호 정책과 싱글 사인온을 원함
- 하나의 ID 시스템에서 사용자의 접근 권한을 비활성화하거나 해지하고 싶음
- RustDesk 계정 생성 및 로그인이 기존 조직의 신원과 연계되기를 원함

## OIDC 설정 체크리스트

1. ID 제공자에서 애플리케이션을 생성하세요.
2. 클라이언트 ID, 클라이언트 비밀번호, 발급자 URL 및 제공자별 특정 엔드포인트를 수집하세요.
3. 제공자 설정을 RustDesk Server Pro에 추가하세요.
4. 광범위하게 배포하기 전에 비관리자 계정으로 로그인을 테스트하세요.

## 제공자 예시
{{% children depth="4" showhidden="true" %}}