---
publishDate: 2026-07-05T19:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-for-msps'
draft: false
title: 'MSP를 위한 RustDesk: 자체 호스팅, 브랜딩 가능한 단일 도구'
excerpt: 'TeamViewer, AnyDesk, ScreenConnect를 브랜딩 가능한 자체 호스팅 원격 지원 플랫폼 하나로 통합하는 방안을 비교합니다.'
image: '~/assets/images/blog/rustdesk-for-msps-og.webp'
category: '가이드'
tags: ['RustDesk', 'MSP', '셀프 호스팅']
author: 'RustDesk Team'
slug: 'rustdesk-for-msps-ko'
faq:
  - question: 'RustDesk로 여러 MSP 원격 지원 도구를 하나로 통합할 수 있나요?'
    answer: '네, 원격 제어와 원격 지원이라면 가능합니다. RustDesk Server Pro는 개별 콘솔과 계약 대신 자체 호스팅 콘솔 하나, Basic 플랜부터 제공되는 브랜드 클라이언트, 사용자별·기기 그룹별 접근 제어, 표준 플랜의 무제한 동시 연결을 MSP에 제공합니다. 의존하고 있는 PSA/RMM 연동은 먼저 파일럿으로 확인하세요.'
  - question: 'MSP용 RustDesk 라이선스는 어떻게 산정되나요?'
    answer: '로그인 사용자(기술자)와 관리 대상 기기(지원하는 컴퓨터)를 기준으로 비용을 냅니다. 표준 플랜에는 무제한 동시 연결이 포함되므로 채널을 구매하지 않아도 여러 기술자가 동시에 세션을 진행할 수 있습니다. Customized V2만 정해진 수의 동시 연결을 라이선스로 제공합니다. 자세한 내용은 rustdesk.com/pricing을 참고하세요.'
  - question: 'RustDesk 클라이언트를 화이트 라벨로 만들거나 브랜딩할 수 있나요?'
    answer: '네. RustDesk Server Pro에는 Basic 플랜부터 제공되는 커스텀 클라이언트 생성기가 있어, 자사 이름, 로고, 아이콘, 서버 설정을 담은 클라이언트를 빌드할 수 있습니다. 고객은 공급사 브랜드의 다운로드 파일이 아니라 귀사 브랜드가 붙고 귀사 서버에 연결되는 도구를 설치합니다.'
  - question: 'RustDesk는 자체 호스팅인가요? 서버는 누가 운영하나요?'
    answer: '네. RustDesk Server Pro는 자체 호스팅 제품입니다. MSP가 ID/랑데부 서버, 릴레이, 웹 콘솔, 저장된 관리 데이터를 자체 온프레미스 호스트나 VPS에서 운영하며, 패치, 모니터링, 백업, 인증서도 직접 관리합니다. 무료 커뮤니티 서버인 RustDesk Server OSS는 Pro 관리 기능 없이 ID/랑데부와 릴레이를 제공합니다.'
  - question: 'MSP는 RustDesk 평가를 어떻게 시작해야 하나요?'
    answer: '테스트용 VM에 무료 커뮤니티 서버인 RustDesk Server OSS를 설치해 시작하세요. 라이선스 비용이나 만료가 없으므로 기술자가 비용을 내기 전에 대표적인 지원 워크플로를 검증할 수 있습니다. 웹 콘솔, 브랜드 클라이언트, 접근 제어가 필요해지면 Server Pro를 추가하고, 현재 평가 조건은 sales@rustdesk.com으로 문의하세요.'

metadata:
  description: 'MSP를 위한 RustDesk를 소개합니다. 브랜드 클라이언트, 접근 제어, 표준 플랜의 무제한 동시 연결을 갖춘 자체 호스팅 ScreenConnect/TeamViewer 대안입니다.'
  keywords: 'MSP를 위한 RustDesk, MSP 자체 호스팅 원격 지원, MSP 화이트 라벨 원격 데스크톱, MSP 원격 지원 도구, 기술자별 원격 데스크톱 라이선스'
---

대부분의 MSP가 찾는 것은 또 하나의 원격 지원 도구가 아닙니다. 도구를 _줄이는_ 것입니다. 여기에는 클라우드 원격 지원 좌석, 저기에는 기술자별 도구, 일회성 작업용 퀵 지원 유틸리티까지, 각자 콘솔과 계약과 갱신 일정이 따로 있습니다. RustDesk는 이 도구 더미를 브랜딩 가능한 자체 호스팅 플랫폼 하나로 대체합니다. 기존 도구를 정리하기 전에 기술자가 의존하는 PSA/RMM 연동과 엔드포인트 워크플로를 파일럿으로 확인하세요.

이 가이드에서는 MSP 워크플로 관점에서 RustDesk의 공개 클라이언트, 자체 호스팅 서버 옵션, 상용 Pro 관리 기능, 브랜딩, 라이선스를 다룹니다.

## 원격 접속 서비스를 직접 운영하세요

RustDesk Server Pro는 **자체 호스팅** 제품입니다. ID/랑데부, 릴레이, 콘솔, 저장된 관리 데이터를 사내 팀이 운영합니다. RustDesk 클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 **[AGPL 라이선스](https://github.com/rustdesk/rustdesk)** 이며, Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어입니다. 고객사 보안 검토에서 "이 에이전트가 우리 엔드포인트에서 무엇을 하느냐"고 물으면 비공개 바이너리 대신 클라이언트 소스를 보여 줄 수 있고, 서버 측 서비스를 어디서 실행할지도 직접 정합니다.

자체 호스팅 플랫폼 하나가 MSP가 정리하려는 여러 도구와 어떻게 비교되는지는 다음과 같습니다.

|                         | 개별 클라우드 원격 지원 도구  | RustDesk Server Pro                                                                                      |
| ----------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| 관리해야 할 콘솔        | 도구마다 하나씩               | 자체 호스팅 단일 콘솔                                                                                    |
| 클라이언트 브랜딩       | 제품과 플랜에 따라 다름       | Basic 플랜부터 커스텀 브랜딩 클라이언트 생성기 제공                                                      |
| 호스팅                  | 공급사 클라우드               | 자체 호스팅(온프레미스 또는 자체 VPS)                                                                    |
| 소스                    | 제품마다 다르며 대개 독점     | 감사 가능한 AGPL 클라이언트                                                                              |
| 라이선스 동시 연결/채널 | 플랜별 허용량                 | 표준 플랜은 무제한. [Customized V2](https://rustdesk.com/pricing#custom2)는 라이선스로 정한 허용량       |
| 라이선스 기준           | 좌석당 / 채널당               | [로그인 사용자 + 관리 대상 기기 기준](https://rustdesk.com/pricing)                                      |

정확한 플랜 등급과 최신 가격은 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하세요.

## 플랜에 따라 달라지는 동시 연결

비용은 승인된 로그인 사용자(대개 기술자)와 관리 대상 기기를 기준으로 냅니다. 표준 플랜에는 무제한 동시 연결이 포함되므로, 장애 대응 중 엔지니어 세 명이 동시에 서로 다른 고객 현장 세 곳에서 작업해도 일상적인 업무일 뿐 과금 대상이 아닙니다. 지금까지 동시 세션 수를 아껴 쓰거나 채널 수에 맞춰 팀 일정을 짜 왔다면, 표준 플랜에서는 그 제약이 사라집니다.

정해진 수의 동시 연결을 라이선스로 제공하는 플랜은 [Customized V2](https://rustdesk.com/pricing#custom2)뿐입니다. RustDesk의 [동시 연결 정의](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)에 따르면 동시 연결은 활성 상태인 제어 기기, 즉 "채널"입니다. 기술자 PC 한 대에서 세션 탭 다섯 개를 열면 채널 하나를 쓰고, 기술자 PC 세 대가 동시에 활성 상태이면 채널 세 개를 씁니다. Customized V2는 사용자나 기기 그룹에 할당된 기기만 관리 대상 기기로 계산하므로, 일회성 지원 기기는 계산되지도 비활성화되지도 않습니다. [관리 대상 기기로 계산되는 기준](/ko/blog/what-counts-as-a-managed-device-ko)을 참고하세요.

## 브랜딩하고 접근 제어를 적용하세요

Server Pro는 MSP에 자체 호스팅 웹 콘솔과 세 가지 서로 다른 통제 수단을 제공합니다. [접근 제어](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/permissions/)는 사용자 및 기기 그룹 규칙으로 어떤 기술자가 어떤 기기에 접속할 수 있는지 결정합니다. 각 기기는 하나의 기기 그룹에 속하며, 사용자 그룹과 기기 그룹 권한은 누적됩니다. 공유 주소록은 기술자를 위해 항목을 정리할 뿐 접근 경계가 아닙니다. [제어 역할](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/control-role/)은 기술자가 세션 안에서 할 수 있는 작업을 제한합니다. 커스텀 클라이언트 생성기와 LDAP/OIDC SSO는 Basic 플랜부터 제공됩니다.

브랜드 클라이언트가 중요한 이유는 고객이 공급사 브랜드가 아니라 귀사의 이름, 로고, 서버 설정이 담긴 도구를 설치하기 때문입니다. 접근 제어를 쓰면 각 기술자가 담당하는 고객 현장의 기기 그룹으로만 접근 범위를 한정할 수 있습니다.

## 서버 측 데이터 위치에 대한 통제권

자체 호스팅을 하면 MSP가 ID/랑데부, 릴레이, 콘솔, 저장된 기기 데이터를 어디서 실행하고 누가 운영할지 직접 정할 수 있으며, 규제 산업 고객에게는 이것이 결정적인 요소가 되는 경우가 많습니다. 다만 이는 배포를 통제하는 수단이지 컴플라이언스 인증이 아닙니다. 직접 세션은 여전히 엔드포인트 사이를 오가므로, [원격 데스크톱 데이터 주권과 GDPR](/ko/blog/remote-desktop-data-sovereignty-gdpr-ko)에서 설명하는 대로 엔드포인트 위치와 라우팅을 정리하세요.

## 원하는 방식으로 직접 테스트해 보세요

미팅을 예약하지 않고도 오늘 바로 RustDesk를 평가할 수 있습니다.

- **남는 VM에 Server OSS를 설치하세요.** 라이선스 비용이나 만료가 없으므로, 비용을 쓰기 전에 실제 고객 지원 워크플로를 검증할 수 있습니다.
- **브랜딩과 접근 제어가 필요해지면** [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 플랜 등급을 비교하고, [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 현재 평가 조건을 문의하세요.
- **테스트할 시간이 부족하신가요?** 먼저 RustDesk가 작동하는 모습을 보거나 [RustDesk YouTube 채널](https://www.youtube.com/@rustdesk)의 안내 영상을 살펴보세요.

고객이 늘어나면 **[언제든 업그레이드](/ko/blog/upgrade-rustdesk-license-mid-subscription-ko)** 할 수 있습니다. 업그레이드하면 라이선스가 업그레이드한 날로부터 1년 뒤로 연장되고 남은 결제 금액은 크레딧으로 반영됩니다. [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 시작하세요.
