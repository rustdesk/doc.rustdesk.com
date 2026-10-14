---
publishDate: 2026-07-05T18:49:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: is-chrome-remote-desktop-safe
draft: false
title: 'Chrome Remote Desktop, 안전할까요? 보안과 배포상의 한계'
excerpt: 'Chrome Remote Desktop은 안전할까요? 암호화 방식, PIN과 Google 계정 기반 모델, 실제 위험 요소, 그리고 자체 호스팅과의 차이를 공정하게 살펴봅니다.'
image: ~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp
category: '보안'
tags: ['Chrome Remote Desktop', '보안']
author: 'RustDesk Team'
slug: 'is-chrome-remote-desktop-safe-ko'
faq:
  - question: 'Chrome Remote Desktop을 사용해도 안전한가요?'
    answer: '네, 개인 용도라면 안전합니다. Google은 Chrome Remote Desktop 세션이 완전히 암호화되며, 무인 접속에는 PIN을, 지원 세션에는 일회용 액세스 코드를 사용한다고 문서화하고 있습니다. 주요 위험은 약한 PIN, 탈취된 Google 계정, 그리고 피해자를 속여 코드를 공유하게 만드는 사기범입니다. Google 계정에 2단계 인증을 켜고 쉽게 추측할 수 없는 PIN을 고르세요.'
  - question: 'Chrome Remote Desktop은 암호화되나요?'
    answer: '네. Google은 모든 Chrome Remote Desktop 세션이 완전히 암호화된다고 밝힙니다. 기업용 네트워크 가이드에 따르면 WebRTC/ICE 연결은 가능하면 컴퓨터 사이에서 직접 이루어지고, 그렇지 않으면 TURN 릴레이를 거칩니다. Chromium이 remoting 소스 코드를 공개하므로 호스트, 클라이언트, 프로토콜 구성 요소를 직접 검토할 수 있습니다.'
  - question: 'Chrome Remote Desktop의 보안 위험 요소는 무엇인가요?'
    answer: '실질적인 위험은 세 가지입니다. 약하거나 추측하기 쉬운 PIN(최소 6자리), 호스트가 연결된 Google 계정의 탈취, 그리고 피해자를 속여 액세스 코드를 공유하게 만드는 사회공학적 사기입니다. Google 계정의 2단계 인증, 쉽게 추측할 수 없는 PIN, 그리고 먼저 연락해 온 사람에게 절대 코드를 알려 주지 않는 습관만으로 실제 위험의 대부분을 막을 수 있습니다.'
  - question: 'Chrome Remote Desktop을 자체 호스팅할 수 있나요?'
    answer: '아니요. Chromium은 Chrome Remote Desktop의 remoting 소스를 공개하지만 Google의 연결 조정 서비스는 자체 호스팅할 수 없으므로, 모든 연결은 Google을 통해 설정됩니다. RustDesk는 자체 호스팅이 가능한 대안입니다. 무료 커뮤니티 서버인 RustDesk Server OSS로 ID/랑데부 서버와 릴레이를 직접 운영하고, RustDesk Server Pro는 웹 콘솔, 접근 제어, 브랜드 맞춤 클라이언트를 더합니다.'
metadata:
  description: 'Chrome Remote Desktop은 안전할까요? Google이 공식 문서에서 밝힌 CRD의 암호화와 PIN 보호, 실질적인 위험 요소, Google 계정 기반 신뢰 모델을 살펴봅니다.'
  keywords: 'Chrome Remote Desktop 안전, Chrome Remote Desktop 보안, Chrome Remote Desktop 암호화, Chrome Remote Desktop PIN, Chrome Remote Desktop 위험, CRD 안전'
---

간단히 말하면, 개인 용도라면 Chrome Remote Desktop(CRD)은 상당히 안전합니다. Google이 제공하는 무료의 단순한 도구로, 세션을 암호화하고 PIN과 Google 계정으로 접근을 보호합니다. 단서는 연결 조정 서비스를 Google이 운영한다는 점, 관리 기능이 지원 콘솔이 아니라 Google의 기업용 정책으로 이루어진다는 점, 그리고 다른 모든 원격 도구처럼 사기범에게 악용될 수 있다는 점입니다. 출처를 바탕으로 하나씩 살펴보겠습니다.

## 짧은 답변

네, 개인 용도라면 안전합니다. CRD는 원래 목적, 즉 자신의 기기에 접속하거나 가족을 도와주는 일을 Google이 보호하는 연결로 처리하기에 충분히 안전합니다. [Google 공식 지원 문서](https://support.google.com/chrome/answer/1649523)에 따르면 모든 원격 데스크톱 세션은 완전히 암호화되며, 무인 접속에는 PIN이 필요하고, 일회성 지원 세션에는 한 번만 쓸 수 있는 일회용 액세스 코드가 사용됩니다. 개인 용도라면 합리적인 기본 수준입니다.

조직에서 사용할 때는 Google의 [기업 관리 정책](https://support.google.com/chrome/a/answer/2799701)과 [네트워크 가이드](https://support.google.com/chrome/a/answer/16364503)로 관리자가 CRD를 사용할 수 있는 사람과 연결 방식을 제한할 수 있습니다. 연결 조정 서비스는 여전히 Google이 운영합니다.

## Chrome Remote Desktop이 세션을 보호하는 방식

실제로 보호를 담당하는 장치는 세 가지이며, 모두 [Google 도움말 페이지](https://support.google.com/chrome/answer/1649523)에 문서화되어 있습니다.

- **암호화와 라우팅.** Google은 세션이 완전히 암호화된다고 밝힙니다. [네트워크 가이드](https://support.google.com/chrome/a/answer/16364503)는 직접 연결, STUN 보조 연결, TURN 릴레이 연결이 모두 가능한 ICE/WebRTC 연결을 설명합니다. 연결 조정에는 Google 서비스를 사용하지만, 세션 미디어가 항상 Google 릴레이를 거치는 것은 아닙니다.
- **무인 접속을 위한 PIN.** 계속 원격으로 접속하도록 설정해 둔 컴퓨터에 접속하려면 PIN을 입력해야 합니다. 여러분의 Google 세션에 접근한 임의의 사람이 몰래 연결하는 것을 막아 주는 장치입니다.
- **지원용 일회용 액세스 코드.** 실시간으로 누군가를 도와줄 때 호스트가 생성하는 코드는 Google에 따르면 한 번만 쓸 수 있으며, 공유를 계속하려면 주기적으로 다시 확인해야 합니다.

그 위에 Google 계정 자체가 한 겹 더 얹히며, 이 계정은 2단계 인증으로 보호할 수 있고 원격 접속 용도라면 반드시 그렇게 해야 합니다. 신뢰할 수 있는 네트워크에서 개인적으로 쓴다면 이 보호 체계는 정말로 충분합니다.

## 실제 위험이 존재하는 지점

CRD의 약점은 특별한 것이 아닙니다. 설계에서 자연스럽게 따라 나오는 세 가지입니다.

**취약한 PIN.** PIN은 무인 접속을 잠그는 자물쇠이며, Google이 요구하는 최소 자릿수는 6자리뿐입니다. 낯선 사람이 한 번 추측해 보는 정도라면 6자리로도 충분하지만, 사람들은 생일, 반복되는 숫자, 연속된 숫자처럼 예측 가능한 번호를 고르는 경향이 있어 실제 탐색 범위가 자릿수가 암시하는 것보다 훨씬 좁아집니다. 하루 24시간 접속할 수 있게 열어 둔 기기라면 허술한 PIN이 가장 유력한 침입 경로입니다. 예측하기 어려운 PIN을 고르세요.

**Google 계정 탈취.** Google 계정은 CRD 접근 경계의 일부입니다. 누군가 피싱으로 비밀번호를 알아냈는데 2단계 인증이 없다면, 원격 데스크톱 목록도 함께 넘어갑니다. 계정을 2FA로 보호하고, 로그인된 기기를 검토하고, 더 이상 필요 없는 접근 권한은 취소하세요. 무인 접속에는 호스트 PIN도 필요하므로 계정 비밀번호만으로 모든 호스트가 열리지는 않습니다.

**사기.** 전화를 건 사람이 피해자를 설득해 액세스 코드를 공유하고 세션을 승인하게 만들 수 있습니다. [FBI는 원격 접속 소프트웨어 악용을 경고](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software)합니다. 지원 요청은 독립적으로 확인하세요. 사기범에게 의도적으로 허락한 세션은 암호화로 보호할 수 없습니다. [원격 데스크톱 사기를 피하는 방법](/ko/blog/avoid-remote-desktop-scams-ko)을 참고하세요.

## CRD가 제공하지 않는 것

CRD는 의도적으로 최소한의 기능만 담고 있으며, 많은 사람에게는 바로 그 점이 매력입니다. 하지만 개인 용도를 넘어서는 사용을 고려한다면 그에 따르는 트레이드오프를 분명히 짚어 둘 필요가 있습니다.

[Chromium은 CRD의 remoting 소스를 공개](https://chromium.googlesource.com/chromium/src/+/main/remoting/)하며 여기에는 호스트, 클라이언트, 프로토콜 구성 요소가 포함되지만, Google의 연결 조정 서비스는 자체 호스팅할 수 없습니다. Google의 [기업 정책](https://support.google.com/chrome/a/answer/2799701)은 CRD를 쓸 수 있는 사람을 제어할 뿐, CRD를 기기 그룹, 사용자별 접근 규칙, 브랜드 맞춤 클라이언트를 갖춘 고객 운영형 지원 콘솔로 바꿔 주지는 않습니다. Google을 깎아내리려는 것이 아니라, 원래 CRD가 그런 용도가 아니라는 뜻입니다. 이런 기능이 필요하다면 [Chrome Remote Desktop 대안](/ko/blog/chrome-remote-desktop-alternative-ko)이 다음 단계입니다.

RustDesk의 **클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 [AGPL 라이선스](https://github.com/rustdesk/rustdesk)를 따르며**, **Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어**입니다. Server OSS로 ID/랑데부 서버와 릴레이를 직접 운영하고, Server Pro는 웹 콘솔, 사용자·기기 그룹 단위 접근 제어, 브랜드 맞춤 클라이언트를 더합니다. 따라서 연결 조정과 접근 정책이 하나의 클라우드 로그인 뒤가 아니라 여러분이 통제하는 인프라에 놓입니다. 이는 [데이터 주권과 GDPR](/ko/blog/remote-desktop-data-sovereignty-gdpr-ko) 요구 사항과도 맞닿아 있습니다.

분명히 해 둘 점은, 이런 개방성은 양날의 검이라는 것입니다. 코드가 공개되어 있다는 것은 RustDesk 자체의 취약점도 공개된다는 뜻이므로, [최신 릴리스](https://github.com/rustdesk/rustdesk/releases)와 취약점 공개 기록을 꾸준히 확인하세요. 또한 자체 호스팅은 한 종류의 관리 부담을 다른 종류로 바꿀 뿐입니다. CRD에 필요한 계정과 PIN 관리가, 여러분이 직접 패치해야 하는 서버와 여전히 엔드포인트 사이를 직접 오가는 트래픽으로 바뀝니다. 부담이 가벼워지는 것이 아니라 보증 모델이 달라지는 것입니다.

## 결론

Chrome Remote Desktop은 안전할까요? 자신의 PC에 접속하거나 가족을 도와주는 개인 용도라면, 네. CRD는 세션을 암호화하고, 무인 접속을 PIN으로 보호하며, 지원에는 일회용 코드를 사용합니다. Google 계정에 2단계 인증을 켜고, 생일이 아닌 PIN을 고르고, 먼저 연락해 온 사람에게는 절대 액세스 코드를 읽어 주지 마세요. 그러면 중요한 위험은 대부분 다룬 셈입니다.

CRD가 한계에 부딪히는 지점은 통제와 규모입니다. 연결 조정 서비스는 Google이 운영하고, 관리 기능은 지원 콘솔이 아니라 Google의 기업용 정책으로 이루어집니다. 연결 조정을 여러분의 인프라에 두거나, 기술자의 접근 범위를 기기 그룹으로 한정하거나, 하나의 콘솔에서 많은 기기를 관리해야 한다면, 그때가 자체 호스팅 RustDesk를 검토할 시점입니다. CRD가 위험해서가 아니라, CRD는 애초에 그런 도구를 지향하지 않았기 때문입니다.
