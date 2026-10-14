---
publishDate: 2026-07-08T18:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-vs-anydesk'
draft: false
title: 'RustDesk vs AnyDesk: 자체 호스팅, 오픈소스 원격 데스크톱'
excerpt: 'RustDesk와 AnyDesk를 기능, OS 지원, 보안, 가격 모델, 그리고 자체 호스팅과 오픈소스의 득실까지 빠짐없이 비교합니다.'
image: '~/assets/images/blog/rustdesk-vs-anydesk-og.webp'
category: '비교'
tags: ['RustDesk', 'AnyDesk', '비교']
author: 'RustDesk Team'
slug: 'rustdesk-vs-anydesk-ko'
faq:
  - question: 'RustDesk는 AnyDesk의 무료 오픈소스 대안인가요?'
    answer: '네. RustDesk 클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 AGPL 라이선스이며, Server OSS는 라이선스 비용이나 만료 기한 없이 무료로 쓸 수 있습니다. 호스팅은 직접 마련합니다. 상용 독점 소프트웨어인 Server Pro는 웹 콘솔, 기기 그룹, LDAP/OIDC SSO 같은 중앙 관리 기능을 더하며, 로그인 사용자와 관리 대상 기기를 기준으로 라이선스가 산정됩니다.'
  - question: 'AnyDesk와 달리 RustDesk는 완전히 자체 호스팅할 수 있나요?'
    answer: '네. RustDesk Server OSS와 Server Pro 모두 ID/랑데부 서비스와 릴레이 서비스를 여러분의 머신이나 VPS에서 실행하며, Server Pro는 여기에 자체 호스팅 웹 콘솔을 더합니다. AnyDesk도 클라우드 전용은 아닙니다. Ultimate 요금제는 독점 On-Premises 어플라이언스를 제공하지만, Solo, Standard, Advanced 요금제는 AnyDesk 클라우드를 통해 연결을 중개합니다.'
  - question: 'RustDesk의 가격은 AnyDesk와 비교해 어떤가요?'
    answer: 'RustDesk Server Pro는 로그인 사용자와 관리 대상 기기를 기준으로 라이선스가 산정되며, 표준 요금제에는 무제한 동시 연결이 포함됩니다. 정해진 수의 동시 연결을 라이선스하는 요금제는 Customized V2뿐입니다. AnyDesk는 동시 연결 수가 요금제에 묶여 있어 Solo와 Standard는 1개, Advanced는 2개이며, Standard와 Advanced에서는 추가 옵션을 구매할 수 있습니다. 자체 서버 운영 비용까지 포함해, 같은 범위로 받은 날짜가 명시된 서면 견적을 비교하세요.'
  - question: 'RustDesk도 AnyDesk처럼 SSO와 LDAP를 지원하나요?'
    answer: '네. RustDesk Server Pro는 Basic 요금제부터 LDAP/Active Directory와 OIDC SSO를 포함하므로, 디렉터리 로그인을 쓰기 위해 최상위 요금제를 살 필요가 없습니다. 2026년 7월 7일에 확인한 AnyDesk 공식 가격 페이지에는 맞춤 견적으로 제공되는 최상위 요금제인 Ultimate에 SSO가 표시되어 있습니다.'
metadata:
  description: 'RustDesk와 AnyDesk를 기능, OS 지원, 보안, 가격 모델 측면에서 심층 비교하고, 두 제품의 장단점을 명확하게 정리합니다.'
  keywords: 'RustDesk vs AnyDesk, AnyDesk vs RustDesk, RustDesk AnyDesk 비교, 자체 호스팅 AnyDesk 비교'
---

RustDesk와 AnyDesk는 원격 데스크톱에 정반대 방향에서 접근합니다. AnyDesk는 기본적으로 벤더 클라우드를 통해 연결을 중개하는 독점 제품이며, Ultimate 요금제에서는 독점 On-Premises 어플라이언스를 제공합니다. RustDesk는 RustDesk Server OSS(무료 커뮤니티 서버)부터 상용 Server Pro까지 여러분이 통제하는 서버에서 실행되도록 설계되었고, 클라이언트 소스 코드를 직접 읽어 볼 수 있습니다. 누가 인프라를 호스팅하고 누가 코드를 읽을 수 있는가라는 이 차이는 보안 모델부터 동시 연결 과금 방식까지 이 비교 전반을 관통합니다.

## 목차

- [개요](#개요)
- [한눈에 보는 기능 비교](#한눈에-보는-기능-비교)
- [OS 및 플랫폼 지원](#os-및-플랫폼-지원)
- [보안 및 인증](#보안-및-인증)
- [라이선스 및 가격 모델](#라이선스-및-가격-모델)
- [장단점](#장단점)
- [그럼에도 팀들이 RustDesk로 전환하는 이유](#그럼에도-팀들이-rustdesk로-전환하는-이유)
- [RustDesk 사용해 보기](#rustdesk-사용해-보기)
- [관련 글](#관련-글)
- [출처](#출처)

## 개요

**AnyDesk**는 2014년 독일 슈투트가르트에서 설립된 AnyDesk Software GmbH(구 philandro Software GmbH)의 독점 상용 원격 데스크톱 제품입니다. 가벼운 클라이언트와 저지연 독자 코덱(DeskRT)으로 명성을 쌓았으며, 오늘날에는 개인 기술자, 헬프데스크, 기업에 이르기까지 폭넓게 쓰이는 도구입니다. AnyDesk는 클로즈드소스 소프트웨어로, 기본적으로 AnyDesk의 클라우드 인프라를 통해 연결하며, 상위 요금제에서는 온프레미스 어플라이언스 옵션이 추가됩니다. 즉, AnyDesk가 운영하는 네트워크에 대한 접근 권한을 빌려 쓰는 관리형 서비스입니다.

**RustDesk**는 이러한 기본값을 뒤집습니다. 벤더 네트워크에 대한 접근 권한을 빌리는 대신, ID/랑데부 서비스와 릴레이 서비스를 여러분의 머신이나 VPS에서 직접 운영합니다. **클라이언트와 Server OSS는 AGPL 라이선스**이므로 감사하고 소스에서 빌드할 수 있으며, Server OSS는 라이선스 비용이나 만료 기한 없이 무료입니다. **Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어**로, 웹 콘솔, 기기 그룹, 공유 주소록을 더하고 Basic 요금제부터는 LDAP/OIDC SSO와 커스텀 브랜딩 클라이언트 생성기도 제공합니다. 이 서비스들과 저장된 관리 데이터를 어디에서 실행할지는 여러분이 정합니다. 직접 연결 세션은 엔드포인트 사이를 바로 오가고, 릴레이 세션은 여러분이 운영하는 hbbr 릴레이를 거칩니다. 소유권을 원하고 서버 운영에 부담이 없는 팀에 잘 맞습니다.

이 글의 나머지 부분에서는 두 제품을 기능별로 비교한 뒤, 표로는 다 담을 수 없는 의사 결정 요소를 다룹니다.

## 한눈에 보는 기능 비교

두 제품 모두 원격 지원의 핵심 워크플로를 지원합니다. 차이는 "기능 X가 있는가"보다 그 기능을 _어떻게_ 얻는가에 있습니다. 호스팅형인가 자체 호스팅형인가, 요금제 등급으로 라이선스하는가 사용자·기기 단위로 라이선스하는가, 최상위 요금제에서만 열리는가 입문 요금제부터 제공되는가의 차이입니다. 파일 전송 같은 클라이언트 기능과 REST API 같은 Server Pro 관리 기능은 서로 구분해서 보아야 합니다.

| 기능                   | RustDesk                                                                           | AnyDesk                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 원격 보기 및 제어      | 지원                                                                               | 지원                                                                                        |
| 무인 접속              | 지원(영구 비밀번호 / 관리 대상 기기)                                               | 지원                                                                                        |
| 파일 전송              | 지원(양방향)                                                                       | 지원(파일 브라우저 모드)                                                                    |
| 세션 내 텍스트 채팅    | 지원                                                                               | 지원                                                                                        |
| 세션 녹화              | 지원(수신/발신 세션 자동 녹화 가능)                                                | 지원(로컬 저장, 양쪽 모두)                                                                  |
| 원격 인쇄              | 지원 — 수신 연결용 원격 프린터(Windows)                                            | 지원(AnyDesk 프린터)                                                                        |
| 모바일 클라이언트      | Android, iOS는 컨트롤러 전용                                                       | Android, iOS/iPadOS는 발신 제어와 수신 화면 보기 지원(원격 입력 제어 불가)                  |
| 자체 호스팅 서버       | 지원 — Server OSS 또는 Server Pro                                                  | Ultimate의 독점 On-Premises 어플라이언스                                                    |
| 오픈소스               | 클라이언트와 Server OSS: AGPL, Server Pro: 독점                                    | 독점                                                                                        |
| 브랜드 맞춤 클라이언트 | 지원 — Server Pro 생성기, Basic 요금제 이상                                        | Standard부터 브랜드 맞춤 앱, 네임스페이스는 Standard/Advanced 추가 옵션이며 Ultimate에 포함 |
| REST API               | 지원 — Server Pro 관리 API                                                         | 요금제에 따라 my.anydesk API 제공                                                           |
| 동시 연결 한도         | 표준 요금제는 무제한, [Customized V2](https://rustdesk.com/pricing#custom2)는 제한 | 요금제 등급에 따라 결정(가격 섹션 참조)                                                     |

위 표의 RustDesk 항목은 RustDesk 공식 문서를 기준으로 확인했으며, AnyDesk 항목은 AnyDesk의 지원 문서와 기능 소개 페이지를 참고했습니다.

## OS 및 플랫폼 지원

두 제품 모두 데스크톱에서는 명실상부한 크로스 플랫폼입니다. 의미 있는 차이는 모바일과 비교적 드문 데스크톱 대상 플랫폼에서 나타납니다.

| 플랫폼          | RustDesk                                                                                                                                     | AnyDesk                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Windows         | 지원 — x64, ARM64, 32비트                                                                                                                    | 지원(XP SP2 이상)                                                     |
| macOS           | 지원 — Apple Silicon 및 Intel                                                                                                                | 지원(11 Big Sur 이상)                                                 |
| Linux           | 지원 — x86_64, ARM64, ARM32. X11과 Wayland 지원(Wayland 무인 접속/로그인 화면 접속은 [프리뷰](/ko/blog/unattended-remote-access-wayland-ko)) | 지원 — 지원 배포판, 수신 세션에는 Xorg 필요                           |
| Android         | 지원 — arm64, arm32, x64(호스트 및 컨트롤러)                                                                                                 | 지원(제어 플러그인 필요)                                              |
| iOS / iPadOS    | 컨트롤러 전용. RustDesk는 iOS 호스팅이나 화면 공유를 구현하지 않음                                                                           | 발신 제어, iOS/iPadOS 12 이상에서 수신 화면 보기(원격 입력 제어 불가) |
| Raspberry Pi    | 지원 — 공식 ARM64/ARM32 Linux 빌드                                                                                                           | 지원(Raspberry Pi OS 12 이상)                                         |
| Chrome OS       | — (ChromeOS 클라이언트 없음. Android 빌드는 Google Play가 아닌 GitHub 릴리스/F-Droid로 배포)                                                 | 보기 전용(제어 미지원)                                                |
| tvOS / Apple TV | 제공하지 않음                                                                                                                                | 발신 전용(파일 전송/녹화 제한적)                                      |

RustDesk는 Windows, macOS, Linux, Android, iOS를 공식 지원 플랫폼으로 명시하며, 공식 Linux ARM 빌드로 Raspberry Pi도 지원합니다. AnyDesk는 ChromeOS 보기와 tvOS 클라이언트라는 두 가지 틈새 대상을 추가로 문서화하고 있으며, [iOS/iPadOS 12 이상에서 화면 보기 세션을 수신할 수 있습니다](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos). 다만 이 기기들에는 원격 입력을 보낼 수 없고, 해당 기기에 연결하려면 유료 AnyDesk 라이선스가 필요합니다. RustDesk iOS 앱은 컨트롤러 전용입니다.

## 보안 및 인증

이 섹션은 두 제품이 단순한 체크리스트 항목 하나가 아니라 철학적으로 갈라지는 지점입니다.

**AnyDesk의 보안 모델.** AnyDesk는 TLS 1.2(AEAD), RSA-2048 비대칭 키 교환, 256비트 AES 전송 암호화, 그리고 임시(ephemeral) Diffie-Hellman 핸드셰이크를 통한 완전 순방향 비밀성(Perfect Forward Secrecy)으로 세션을 보호합니다. 무인 접속용 2단계 인증(TOTP), 접속할 수 있는 대상을 제한하는 접근 제어 목록/허용 목록, 솔트(salt)를 적용한 해시 비밀번호 저장 방식도 제공합니다. 모두 업계 표준 수준의 견고한 보호 장치입니다. 다만 결국 클로즈드소스 벤더를 신뢰해야 하고, 기본적으로는 그 벤더의 클라우드가 연결을 중개합니다. 코드를 직접 감사할 수 없고, AnyDesk 자체의 운영 보안에 의존할 수밖에 없습니다.

이 마지막 지점은 벤더가 운영하는 모든 서비스가 안고 있는 구조적 트레이드오프입니다. 제3자가 여러분의 연결을 중개하면 그 벤더의 운영 보안이 곧 여러분 공격 표면의 일부가 되며, 수많은 고객을 위해 원격 접속 인프라를 운영하는 제공업체는 그 자체로 가치가 높은 공격 표적입니다. 이러한 집중 위험은 여러분이 들여다볼 수도, 통제할 수도 없습니다.

**RustDesk의 보안 모델.** 이러한 집중 위험을 줄이는 방법은 중개 역할을 외부에 맡기지 않는 것입니다. RustDesk에서는 랑데부 서비스와 릴레이 서비스(Server Pro라면 콘솔까지)를 여러분이 직접 운영하므로 공유 벤더 클라우드가 연결 경로에 끼어들지 않고, 배포하는 클라이언트도 직접 감사할 수 있습니다. ID 기반 세션은 클라이언트에 여러분 서버의 공개 키가 설정되어 있으면 종단 간 암호화됩니다. 자체 호스팅이 엔드포인트, 자격 증명, 소프트웨어 취약점 위험까지 없애 주지는 않으므로, [최신 RustDesk 릴리스](https://github.com/rustdesk/rustdesk/releases)를 꾸준히 확인하고 배포 전에 접근 규칙을 검증하세요.

**인증 및 디렉터리 연동.** Active Directory나 OIDC ID 공급자를 중심으로 운영하는 팀이라면 LDAP와 SSO가 중요합니다. RustDesk는 **Basic 요금제부터 LDAP와 SSO(OIDC)를 제공**합니다. 2026년 7월 7일에 확인한 AnyDesk [공식 가격 페이지](https://anydesk.com/en/pricing)에는 SSO가 Ultimate 요금제에 표시되어 있습니다. 싱글 사인온이 필수라면 이 요금제 차이가 예산을 좌우할 수 있습니다. 구성 방법은 RustDesk의 [LDAP 및 Active Directory 설정 가이드](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/ldap/)에서 안내합니다.

데이터 상주(data residency)가 검토의 핵심 이유인 팀이라면 [원격 데스크톱 데이터 주권과 GDPR](/ko/blog/remote-desktop-data-sovereignty-gdpr-ko) 글에서 이 글보다 더 깊이 다루며, [GitHub의 RustDesk 소스 코드](https://github.com/rustdesk/rustdesk)는 누구나 살펴볼 수 있습니다.

## 라이선스 및 가격 모델

가격은 수시로 바뀌므로, 이 섹션에서는 정확한 금액이 아니라 *가격 모델*을 비교합니다. 아래 AnyDesk 요금제 한도는 2026년 7월 7일에 확인한 [AnyDesk 공식 가격 페이지](https://anydesk.com/en/pricing)를 근거로 합니다.

**AnyDesk**는 요금제 등급 모델로 라이선스를 부여하며, 안내된 모든 요금제가 연간 결제라고 명시하고 있습니다.

- **Solo** — 라이선스 사용자 1명, 확장할 수 없는 동시 연결 1개, 등록 발신 기기 3대, 관리 대상 기기 100대
- **Standard** — 사용자 최대 20명, 기본 포함 동시 연결 1개, 연결 추가 옵션 최대 20개, 관리 대상 기기 500대
- **Advanced** — 사용자 최대 100명, 기본 포함 동시 연결 2개, 연결 추가 옵션 최대 50개, 관리 대상 기기 1,000대
- **Ultimate** — 클라우드 또는 온프레미스 호스팅을 맞춤 견적으로 제공. 라이선스 사용자 5명, 관리 대상 기기 2,000대부터 시작하며, 사용자 수와 동시 연결 용량은 견적에서 정함

이 모델에서 꼭 기억할 두 가지는 연간 결제, 그리고 요금제별로 정해진 동시 연결 용량입니다. 동시 연결을 늘리려면 추가 옵션을 사거나 상위 요금제로 옮겨야 합니다. 공개된 요금 구성은 이 글의 확인 시점 이후 바뀔 수 있으므로, 예산은 날짜가 명시된 서면 견적을 기준으로 세우세요.

**RustDesk Server Pro** 요금제는 **로그인 사용자와 관리 대상 기기**를 기준으로 산정됩니다. 표준 요금제(Individual, Basic, Customized)에는 무제한 동시 연결이 포함되며, 정해진 수의 동시 연결을 라이선스하는 요금제는 Customized V2뿐입니다. [업그레이드](/ko/blog/upgrade-rustdesk-license-mid-subscription-ko)는 셀프 서비스 포털에서 언제든 구매할 수 있으며, 라이선스 만료일이 업그레이드한 날로부터 1년 뒤로 연장되고 현재 라이선스의 남은 결제 금액은 업그레이드 비용에서 차감됩니다. 사용자, 엔드포인트, 기능, 동시 연결 요구 사항을 똑같이 맞춘 상태에서 라이선스, 인프라, 운영 비용을 비교하세요. [현재 가격](https://rustdesk.com/pricing)을 확인하세요.

RustDesk의 가격 역시 바뀔 수 있기 때문에 이 글에서는 일부러 RustDesk의 구체적인 금액을 적지 않았습니다. 최신 가격은 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인할 수 있습니다.

## 장단점

**RustDesk**

_장점:_

- Server Pro 요금제는 로그인 사용자와 관리 대상 기기를 기준으로 산정되며, 표준 요금제에는 무제한 동시 연결 포함
- 자체 호스팅 ID/랑데부 서비스와 릴레이 서비스로 연결 조정과 릴레이 트래픽을 직접 통제(직접 연결 트래픽은 엔드포인트 사이를 오감)
- 소스를 읽고 직접 빌드할 수 있는 감사 가능한 클라이언트
- Basic 요금제부터 LDAP/SSO 지원(최상위 요금제 전용이 아님)
- 커스텀 브랜딩 클라이언트 생성기, 자체 호스팅 웹 콘솔, 기기 그룹, 공유 주소록
- Server OSS는 라이선스 비용이나 만료 기한 없이 무료

_단점:_

- 서버 운영, 패치, 업데이트를 직접 해야 함
- Server Pro는 셀프 서비스 무료 체험이 없음(평가 조건은 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의)

**AnyDesk**

_장점:_

- 클라우드 중개 방식: 하위 요금제에서는 자체 호스팅할 것 없이 클라이언트만 설치하면 바로 연결
- Chrome OS 보기 및 tvOS 클라이언트를 공식 문서화
- RMM/ITSM 연동 및 REST API 제공
- 표준 암호화(TLS 1.2, AES-256) 및 TOTP 2단계 인증

_단점:_

- 클로즈드소스 — 클라이언트를 직접 감사할 수 없음
- 기본적으로 AnyDesk 클라우드에 의존. On-Premises 어플라이언스는 Ultimate에서 제공
- 동시 세션 수가 요금제 등급에 묶여 있음. 연간 선불 결제
- 2026년 7월 7일 가격 페이지 확인 기준, SSO는 Ultimate에 표시

## 그럼에도 팀들이 RustDesk로 전환하는 이유

지금까지는 중립적인 비교였습니다. 이 섹션에서는 RustDesk를 선택할 이유를 분명하게 이야기합니다. 그 점을 감안해 읽어 주세요.

**최상위 요금제 없이도 동시 연결과 SSO.** AnyDesk는 Solo와 Standard에 동시 연결 1개, Advanced에 2개를 포함하고 요금제마다 추가 옵션에 상한을 두며, SSO는 Ultimate에 표시합니다. RustDesk Server Pro 표준 요금제에는 무제한 동시 연결이 포함되고, LDAP/Active Directory와 OIDC SSO는 Basic 요금제부터 제공됩니다. [라이선스 모델](#라이선스-및-가격-모델)상 기술자를 한 명 늘릴 때는 연결 용량을 사는 것이 아니라 로그인 사용자를 하나 추가하면 됩니다.

**원하는 서버에서 무료로 시범 운영.** Server OSS는 라이선스 비용이나 만료 기한이 없으므로, 무엇이든 구매하기 전에 여러분의 네트워크에서 연결성, 릴레이 성능, 클라이언트를 검증할 수 있습니다. ID/랑데부 서버, 릴레이, 콘솔, 저장된 관리 데이터를 누가 어디에서 운영할지도 여러분이 결정합니다. [원격 데스크톱 소프트웨어를 자체 호스팅해야 하는 이유](/ko/blog/why-self-host-remote-desktop-software-ko)를 참고하세요.

**오픈소스는 검증 가능한 신뢰입니다.** 클라이언트가 실제로 무엇을 하는지 벤더의 말을 그저 _믿을_ 필요가 없습니다. 코드를 직접 읽고, 빌드하고, 검증할 수 있습니다.

**전환을 고려하는 바로 그 사람들을 위해 만들었습니다.** MSP는 자체 호스팅과 브랜딩이 가능한 단일 도구를 얻고([MSP를 위한 RustDesk](/ko/blog/rustdesk-for-msps-ko)), 기업은 자체 호스팅이 가능하고 AD 연동이 준비된 플랫폼([기업용 RustDesk](/ko/blog/rustdesk-for-enterprise-ko))과 더 큰 환경을 위한 [대규모 기기 운영 계획 가이드](/ko/blog/rustdesk-scale-50000-200000-devices-ko)를 얻습니다. AnyDesk 가격 변경 때문에 이 글을 찾으셨다면 [AnyDesk 가격 인상: 팀을 위한 대안](/ko/blog/anydesk-price-increase-alternatives-ko)과 [자체 호스팅 TeamViewer·AnyDesk 대안](/ko/blog/self-hosted-teamviewer-alternative-ko)이 바로 그런 상황을 위해 쓴 글입니다.

한 가지 유의할 점이 있습니다. ChromeOS나 Apple TV 클라이언트가 필요하다면, AnyDesk는 이를 문서화해 제공하지만 RustDesk는 제공하지 않습니다.

## RustDesk 사용해 보기

Server OSS를 띄우고 기기 몇 대를 연결해 보세요. 라이선스 비용도, 영업 상담도 필요 없습니다. Pro 기능은 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 현재 평가 조건을 문의하거나 [rustdesk.com/pricing](https://rustdesk.com/pricing)을 확인하세요. 먼저 영상으로 보고 싶다면 RustDesk 유튜브 채널의 [영상 안내](https://www.youtube.com/@rustdesk)를 참고하세요.

## 관련 글

- [RustDesk vs TeamViewer](/ko/blog/rustdesk-vs-teamviewer-ko)
- [RustDesk vs ScreenConnect](/ko/blog/rustdesk-vs-screenconnect-ko)
- [자체 호스팅 TeamViewer·AnyDesk 대안: RustDesk](/ko/blog/self-hosted-teamviewer-alternative-ko)
- [MSP를 위한 TeamViewer vs AnyDesk](/ko/blog/teamviewer-vs-anydesk-for-msps-ko)
- [AnyDesk 가격 인상: 팀을 위한 대안](/ko/blog/anydesk-price-increase-alternatives-ko)
- [AnyDesk는 안전한가요?](/ko/blog/is-anydesk-safe-ko)

## 출처

- [AnyDesk 가격 정보](https://anydesk.com/en/pricing) — 공식 요금제 한도, 연간 결제, 동시 연결, 관리 대상 기기, 클라우드/온프레미스 제공 여부. 2026년 7월 7일 확인.
- [AnyDesk 클라이언트 설정](https://support.anydesk.com/docs/settings) — 직접 연결, 공용 네트워크 릴레이 폴백, 무인 접속, 접근 제어.
