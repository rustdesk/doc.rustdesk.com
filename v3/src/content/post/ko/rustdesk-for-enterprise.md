---
publishDate: 2026-06-29T16:16:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-for-enterprise'
draft: false
title: '기업용 RustDesk: 자체 호스팅, 확장성, AD 연동'
excerpt: '기업 IT 팀이 RustDesk를 선택하는 이유를 정리합니다. 자체 호스팅 기반 데이터 통제, AD/LDAP, 기기 그룹 기반 접근 제어, 대규모 기기 환경에서도 예측 가능한 가격이 핵심입니다.'
image: '~/assets/images/blog/rustdesk-for-enterprise-og.webp'
category: '가이드'
tags: ['RustDesk', '엔터프라이즈', '셀프 호스팅']
author: 'RustDesk Team'
slug: 'rustdesk-for-enterprise-ko'
faq:
  - question: 'RustDesk를 기업의 기기 전체에 대량 배포할 수 있나요?'
    answer: '네. RustDesk는 msiexec로 무인 자동 설치를 할 수 있는 Windows MSI를 제공하며, 그룹 정책(GPO), Microsoft Intune, RMM, 패키징 도구로 배포할 수 있습니다. 또한 커스텀 클라이언트 생성기(Basic 플랜 이상)를 사용하면 자체 서버에 맞게 미리 구성된 클라이언트를 배포할 수 있습니다.'
  - question: 'RustDesk는 REST API를 제공하나요?'
    answer: '네. RustDesk Server Pro는 웹 콘솔에서 만든 API 토큰으로 인증하는 REST API와 Python CLI 관리 도구를 제공합니다. 웹 콘솔만 쓰는 대신 스크립트로 기기를 등록, 조회, 할당, 삭제하고 사용자, 그룹, 주소록, 감사 로그를 일괄 관리할 수 있습니다.'
  - question: 'RustDesk는 기업 ID 관리를 위한 Active Directory와 SSO를 지원하나요?'
    answer: '네. RustDesk Server Pro는 Basic 플랜부터 LDAP/Active Directory와 OIDC SSO를 포함하므로, 기술자는 별도 사용자 목록이 아니라 기존 ID 소스로 인증합니다. Individual 플랜에는 LDAP/AD와 OIDC SSO가 포함되지 않습니다.'
  - question: '기업이 RustDesk 데이터를 자체 인프라에 둘 수 있나요?'
    answer: '네, 그것이 RustDesk Server Pro의 핵심 모델입니다. ID/랑데부 서버, 릴레이, 웹 콘솔, 저장된 기기 데이터를 직접 운영하는 인프라에서 자체 호스팅합니다. 직접 세션은 엔드포인트 사이를 오가고 릴레이 세션은 자체 릴레이를 사용하므로, 서버 배치와 함께 엔드포인트 간 경로도 문서화하세요.'
  - question: '대규모 기기 환경에서 RustDesk 가격은 어떻게 산정되나요?'
    answer: 'RustDesk Server Pro는 로그인 사용자와 관리 대상 기기를 기준으로 라이선스가 산정되며, 표준 플랜에는 무제한 동시 연결이 포함되고 Customized V2만 정해진 수의 동시 연결을 라이선스로 제공합니다. 업그레이드는 언제든 구매할 수 있으며, 라이선스가 업그레이드한 날로부터 1년 뒤로 연장되고 남은 결제 금액은 크레딧으로 반영됩니다. 두 수치는 rustdesk.com/pricing에서 산정하세요.'
metadata:
  description: '기업용 RustDesk를 소개합니다. 자체 호스팅 ID·릴레이·콘솔, LDAP/AD와 OIDC SSO, 기기 그룹 접근 제어, MSI 대량 배포, 무제한 동시 연결을 다룹니다.'
  keywords: 'RustDesk 기업용, RustDesk 기업 도입, AD 연동 원격 지원, RustDesk 엔터프라이즈 아키텍처'
---

## 직접 통제하는 인프라에서 원격 접속을 운영하세요

RustDesk Server Pro는 ID/랑데부, 릴레이, 웹 콘솔, 기기 데이터를 사내 네트워크 경계 안에서 실행하며, Basic 플랜부터 LDAP/AD와 OIDC SSO를 제공하고 표준 플랜에는 무제한 동시 연결이 포함됩니다. 기업의 제품 평가에서 흔히 핵심이 되는 인프라 통제, ID 관리, 접근 정책, 감사 가능성, 확장성, 예측 가능한 라이선스를 모두 다룹니다.

RustDesk 클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 AGPL 라이선스이며, Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어입니다.

## 핵심 차이: 직접 호스팅하므로 직접 통제합니다

RustDesk Server Pro는 **자체 호스팅** 방식입니다. 공급사가 아니라 사내 팀이 서버를 운영합니다([팀들이 자체 호스팅을 선택하는 이유](/ko/blog/why-self-host-remote-desktop-software-ko)). 이 하나의 아키텍처적 사실이 아래 설명할 이점 대부분을 만들어 내며, **[AGPL 라이선스 클라이언트](https://github.com/rustdesk/rustdesk)** 를 단순한 홍보 문구 이상으로 만듭니다. 프로덕션 엔드포인트에 설치하는 모든 에이전트를 정당화해야 하는 보안팀은 소스를 읽고 클라이언트를 직접 빌드할 수 있으므로, "실행되는 코드를 정확히 감사할 수 있다"는 조달 요건을 실제로 충족할 수 있습니다.

## 가장 먼저 답해야 할 기업 아키텍처 질문

기능 비교표를 보기 전에 배포 설계를 명확히 하세요.

| 결정 사항       | 설계 문서에 명시해야 할 내용                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| ID 관리         | OIDC 또는 LDAP 소스, MFA 정책, 비상 접근(break-glass), 계정 수명 주기                                          |
| 권한 부여       | 기기 그룹 소유권, 기술자 역할, 외주 인력 접근 범위, 승인 방식                                                   |
| 네트워크        | ID 서버와 릴레이 배치, 직접 연결 대 릴레이 정책, 노출 포트, 지역별 라우팅                                       |
| 가용성          | 용량 산정 기준, 모니터링, 백업, 복구 목표, 다중 릴레이 설계                                                     |
| 엔드포인트 관리 | 지원 OS 버전, 클라이언트 패키징, 구성 강제 적용, 업데이트 SLA                                                   |
| 보안 운영       | 로깅, 보존 기간, 알림, 취약점 대응, 인시던트 책임 소재                                                          |
| 라이선스        | 필요한 로그인 사용자 수, 관리 대상 기기 수, [Customized V2](https://rustdesk.com/pricing#custom2) 동시 연결 허용량 |

RustDesk는 원격 접속 구성 요소와 기업용 통제 기능을 제공하며, 이것이 조직의 가용성, 컴플라이언스, 운영 요건을 충족하는지는 아키텍처 설계에 달려 있습니다.

## 데이터 통제와 컴플라이언스

자체 호스팅을 하면 랑데부, 릴레이, 콘솔, 저장된 기기 데이터의 위치와 운영 주체를 직접 정할 수 있습니다. 직접 세션은 여전히 엔드포인트 사이를 오가므로, 서버 위치만으로 트래픽의 국내 유지나 GDPR 준수가 보장되지는 않습니다. [전체 데이터 흐름과 컴플라이언스 통제](/ko/blog/remote-desktop-data-sovereignty-gdpr-ko)를 문서화하세요.

Server Pro는 연결, 파일 전송, 경보, 콘솔 작업에 대한 [감사 로그](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/audit-logs/)를 기록합니다. **설정 > 기타 > 로그 보존 기간(일)** 에 양수를 입력하면 그보다 오래된 로그가 자동으로 삭제되며(정리는 1시간마다 실행), `0`을 입력하면 로그를 무기한 보관합니다. 삭제 요청에 대응해야 할 때는 콘솔이나 API로 사용자와 기기를 비활성화하거나 삭제할 수 있습니다. 계획해 둘 외부 통신은 Pro 라이선스 검증, 커스텀 클라이언트 빌드 서비스, 클라이언트 업데이트, 연동한 외부 ID 공급자입니다.

비용 때문에 마이그레이션이 일어나는 잘 드러나지 않는 이유도 여기에 있습니다. 많은 기업 팀은 단지 가격이 불만인 것이 아니라, 다 쓰지도 않는 클라우드 서비스와 기능 묶음에 비용을 내고 있습니다. 자체 호스팅은 이 구조를 뒤집습니다. 필요한 만큼만 준비하면 되고, 반드시 거쳐야 하는 중간자로서 남의 데이터센터를 빌릴 필요가 없습니다.

## 확장성과 동시 연결 라이선스

기업 배포는 두 가지 축에서 한계에 부딪힙니다. 기술적 한계와 가격 한계입니다. RustDesk는 두 가지를 모두 해결합니다.

기술 측면에서 RustDesk 퍼블릭 서버는 2026년 7월 7일 12코어, 32GB 호스트 한 대에서 200만 개가 넘는 온라인 엔드포인트를 기록했습니다(감사를 거친 벤치마크나 Server Pro 성능 보장이 아닌 내부 원격 측정 데이터). Server Pro의 경우 [200,000대 기기 계획 가이드](/ko/blog/rustdesk-scale-50000-200000-devices-ko)에서 파일럿으로 검증해야 할 데이터베이스, 콘솔, 릴레이 부하를 다룹니다.

RustDesk는 **로그인 사용자와 관리 대상 기기**를 기준으로 비용이 산정됩니다. 표준 플랜에는 무제한 동시 연결이 포함되며, [Customized V2](https://rustdesk.com/pricing#custom2)만 정해진 수를 라이선스로 제공합니다. [구독 중 업그레이드](/ko/blog/upgrade-rustdesk-license-mid-subscription-ko)는 언제든 할 수 있으며, 라이선스가 업그레이드한 날로부터 1년 뒤로 연장되고 현재 라이선스의 남은 결제 금액은 크레딧으로 반영됩니다.

## 관리자가 기대하는 AD/LDAP와 접근 제어

기업용 원격 접속은 "누가 어떤 머신에 접속할 수 있고, 이를 증명할 수 있는가"라는 질문에 답해야 합니다. RustDesk 유료 플랜에는 **Basic 플랜부터 제공되는 LDAP/SSO(OIDC)** 가 포함되어 있어, 별도 사용자 목록을 관리하지 않고 이미 운영 중인 ID 소스를 기준으로 기술자 접근 권한을 부여할 수 있습니다.

[접근 제어](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/permissions/)는 사용자 할당, 기기 그룹, 그룹 간 규칙으로 누가 어떤 기기에 접속할 수 있는지 결정합니다. 각 기기는 하나의 기기 그룹에 속하며, 사용자 그룹과 기기 그룹 권한은 누적됩니다. 공유 주소록은 기술자를 위해 기기 항목을 정리할 뿐 접근 경계가 아닙니다. [제어 역할](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/control-role/)은 기술자가 세션 안에서 할 수 있는 작업을 제한합니다. 커스텀 클라이언트 생성기도 Basic부터 제공됩니다. [플랜별 기능표](https://rustdesk.com/pricing)를 확인하세요.

## 대량 배포와 자동화

수천 대의 엔드포인트에 원격 접속을 수작업으로 배포하는 것은 불가능하므로, RustDesk는 기업의 표준 배포 경로를 지원합니다. Windows에서는 `msiexec /qn`으로 무인 자동 설치를 할 수 있는 **MSI 패키지**를 제공하며, 이를 **그룹 정책(GPO), Microsoft Intune, RMM, 기타 패키징 도구**로 배포할 수 있고, 설치 위치, 바로 가기, 옵션을 지정하는 명령줄 매개변수도 제공합니다. 여기에 [커스텀 클라이언트 생성기](https://rustdesk.com/docs/ko/self-host/client-configuration/#1-사용자-지정-클라이언트-생성기-pro-전용-기본-플랜-또는-사용자-지정-플랜)를 함께 쓰면, 기기마다 따로 설정할 필요 없이 배포하는 클라이언트가 처음부터 자체 서버와 설정으로 구성되어 있습니다.

기기 운영에는 [Windows MSI 문서](https://rustdesk.com/docs/ko/client/windows/msi/), [클라이언트 배포 가이드](https://rustdesk.com/docs/ko/self-host/client-deployment/), [Server Pro API/CLI 도구](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/console/#python-cli-관리-도구)를 활용하세요. 관리 도구는 사용자, 기기, 그룹, 주소록, 정책, 감사를 다룹니다. API 토큰 권한은 작업에 필요한 범위로 제한하고, 등록, 비활성화, 삭제를 파일럿에서 테스트하세요.

## 롤아웃 전 승인 점검

롤아웃 전에 의도한 사용자-기기 접근 매트릭스, ID 복구, 무인 접속, 클라이언트 업데이트, 최대 릴레이 용량, 로그 보존, 백업 복원을 검증하세요. 이러한 승인 점검을 거쳐야 자체 호스팅 인프라 통제가 실제로 운영 가능한 기업 배포가 됩니다.

## 원하는 방식대로 실현하는 기업용 통제

기업 규모에서 결론은 간단합니다. ID/릴레이, 콘솔, 저장된 데이터가 모두 사내 네트워크 경계 안에 있고, 사내 ID 시스템과 접근 정책에 연결되며, 핵심 부분을 공급사가 운영하지 않습니다. 조달팀과 보안팀이 요구하는 바로 그 태세이며, RustDesk Server Pro는 이를 제공하도록 만들어졌습니다.

## 결정하기 전에 먼저 시험해 보세요

**[영업 상담 없이도](https://www.youtube.com/@rustdesk)** 평가할 수 있습니다. 방법은 두 가지입니다.

- **Server OSS로 아키텍처를 검증하세요.** 라이선스 비용이나 만료 없이 무료이며 자체 네트워크에서 실행되므로, 보안팀에 자체 호스팅 모델을 부담 없이 입증할 수 있습니다.
- **ID 관리, 접근 제어, 클라이언트 생성 같은 Pro 기능은** [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 현재 플랜을 확인한 뒤 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 조직에 맞는 평가 조건을 문의하세요.

어느 쪽이든 실제 환경에 맞춰 서버를 구축하고, 도입을 확정하기 전에 검증하세요.
