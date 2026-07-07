---
title: LDAP
weight: 17
description: "RustDesk 서버 프로에서 LDAP 인증을 구성하려면 서버 호스트, 포트, 기본 DN, 범위 및 관련 디렉터리 매핑 옵션을 설정하세요."
keywords: ["rustdesk ldap", "rustdesk server pro ldap", "rustdesk ldap authentication", "rustdesk base dn", "rustdesk ldaps"]
---

이 안내서를 사용하여 RustDesk Server Pro를 LDAP 디렉터리에 연결하여 중앙 집중식 인증 및 사용자 조회를 수행하십시오.

## RustDesk Server Pro에서 LDAP는 어떤 역할을 하나요?

LDAP를 사용하면 RustDesk Server Pro가 각 계정의 별도 로컬 자격 증명을 관리하는 대신 디렉터리 서비스를 기반으로 사용자를 인증할 수 있습니다. 첫 번째 성공적인 로그인 시, RustDesk는 LDAP 신원을 기반으로 사용자를 자동으로 생성합니다.

## LDAP 설정 체크리스트

1. LDAP 호스트, 포트 및 암호화 모드(`389`, `636` 또는 StartTLS)를 확인하십시오.
2. 유효한 바인딩 DN과 비밀번호를 가진 서비스 계정을 선택하십시오.
3. 올바른 기본 DN, 범위 및 사용자 필터를 설정하십시오.
4. 올바른 사용자 이름 속성을 설정하십시오. 예: `uid` 또는 `sAMAccountName`.
5. 배포하기 전에 RustDesk 웹 콘솔에서 구성 내용을 테스트하십시오.

## LDAP 빠른 답변

- RustDesk는 첫 번째 성공적인 LDAP 로그인 시 사용자를 생성합니다.
- 콘솔은 구성 내용을 제출할 때 LDAP 연결을 검증합니다.
- 현재 로컬 사용자를 LDAP 사용자로 변환하는 것은 지원되지 않습니다.
- LDAP 그룹은 아직 지원되지 않습니다.

## 구성
아래와 같이 `LDAP` 설정 페이지로 이동하십시오.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **LDAP 호스트:** 이는 LDAP 서버의 호스트명 또는 IP 주소입니다. 예를 들어, `ldap.example.com` 또는 `192.0.2.1`입니다.

- **LDAP 포트:** 이는 LDAP 서버가 수신 대기하는 포트 번호입니다. LDAP의 기본 포트는 `389`이며, LDAPS(SSL을 통한 LDAP)의 경우 `636`입니다.

- **기본 DN:** 이는 LDAP 검색의 시작 지점입니다. 예를 들어, dc=example,dc=com입니다.

- **범위:** 이는 LDAP 디렉터리에서 검색의 범위를 결정합니다. 하나(기본 DN 바로 아래의 항목들) 또는 하위(기본 DN 바로 아래의 항목들)로 설정할 수 있습니다.

- **바인딩 DN / 비밀번호:** 서비스 계정의 관리자 사용자 이름과 비밀번호입니다. 이 계정은 다른 사용자를 인증하기 위해 LDAP에 바인딩하는 데 사용됩니다. 일반적으로 `cn=admin,dc=example,dc=com`와 같은 사용자 DN입니다.

- **필터:** 이는 LDAP 쿼리의 검색 필터입니다. 예를 들어, `(objectClass=person)` 또는 `(&(age=28)(!(name=Bob)))`입니다.

- **사용자 이름 속성:** 이는 사용자 이름이 포함된 속성입니다. 예를 들어 `uid` 또는 `sAMAccountName`입니다. 기본적으로 `uid`와 `cn`를 사용합니다. 여기에 이에 대한 [discussion](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393)가 있습니다.

- **StartTLS:** 이는 연결을 보안 연결로 업그레이드하기 위해 StartTLS를 사용할지 여부를 결정합니다.

- **NoTLSVerify:** 이는 TLS 인증서 확인을 건너뛸지 여부를 결정합니다. 확실히 알고 있는 경우가 아니라면 이 설정을 false(즉, 인증서 확인 수행)로 유지하는 것이 좋습니다.

## 작동 방식은 어떻게 되나요?
- LDAP 로그인은 어떻게 작동하나요? 예를 들어, 먼저 새 사용자를 생성해야 하나요? RustDesk가 첫 로그인 시 사용자를 생성하나요 등등?
  > RustDesk는 첫 로그인 시 사용자를 생성합니다.
- LDAP가 제대로 작동하는지 확인하려면 어떻게 해야 하나요(이상적으로는 RustDesk에 전달해 발견된 사용자를 반환하도록 할 수 있는 명령어가 있으면 좋겠네요)?
  > 구성 정보를 제출하면, 입력한 binddn과 비밀번호로 LDAP 서버에 연결하고 작동 여부를 확인합니다.
- 로컬 사용자를 LDAP 사용자로 변경하려면 어떻게 해야 하나요?
  > 아직 지원되지 않습니다.
- LDAP 그룹을 지원하나요?
  > 아직 지원되지 않습니다.