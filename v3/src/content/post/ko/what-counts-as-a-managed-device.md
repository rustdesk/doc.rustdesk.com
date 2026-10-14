---
publishDate: 2026-07-02T14:43:00Z
updateDate: 2026-10-14T00:00:00Z
lang: ko
translationKey: what-counts-as-a-managed-device
draft: false
title: 'RustDesk에서 관리 대상 기기는 어떻게 계산될까요?'
excerpt: 'RustDesk Server Pro 표준 플랜에서는 접속하도록 설정한 모든 기기가 한 번씩 계산됩니다. Customized V2는 그룹이나 사용자에 할당된 기기만 계산하며, 임시 지원 기기는 계산하지 않습니다.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: '가격'
tags: ['RustDesk', '가격', '라이선스']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-ko'
faq:
  - question: 'RustDesk는 관리 대상 기기를 어떻게 계산하나요?'
    answer: '표준 플랜에서는 접속하도록 설정한 모든 기기가 관리 대상 기기 1대로 한 번만 계산됩니다. 사용자가 자리에 있든 없든, 한 번 접속하든 천 번 접속하든 마찬가지입니다. Customized V2는 계산 방식이 다릅니다. 기기 그룹이나 사용자에 할당된 기기만 라이선스 기기 수에 포함됩니다.'
  - question: '임시로 한 번만 지원하는 기기는 어떻게 계산되나요?'
    answer: 'Customized V2 플랜에서는 기기 그룹이나 사용자에 할당된 기기만 관리 대상 기기로 계산됩니다. 즉석 지원을 위해 한 번 접속했을 뿐 할당하지 않은 기기는 라이선스 기기 수에 포함되지 않으며 비활성화되지도 않습니다. 업무 대부분이 임시 지원이라면, 모든 엔드포인트를 계산하는 방식보다 Customized V2가 더 적합합니다.'

metadata:
  description: 'RustDesk의 관리 대상 기기 계산 방식을 설명합니다. 표준 플랜은 접속 가능한 모든 기기를 한 번씩 계산하고, Customized V2는 그룹이나 사용자에 할당된 기기만 계산합니다.'
  keywords: '관리 대상 기기 계산 기준, RustDesk 기기 계산, RustDesk TeamViewer 라이선스 비교, 무인 유인 기기 라이선스, RustDesk 임시 지원, MSP 원격 지원 라이선스'
---

RustDesk Server Pro는 승인된 로그인 사용자와 관리 대상 기기를 셉니다. 표준 플랜에서는 **접속하려는 모든 기기가 관리 대상 기기 1대로, 한 번만 계산됩니다.** **[Customized V2](https://rustdesk.com/pricing#custom2)** 플랜은 계산 방식이 다릅니다. 그룹이나 사용자에 할당한 기기만 계산하므로, 임시 지원이 많은 업무에 적합합니다.

## 짧은 답변

표준 플랜에서 "관리 대상 기기"란 접속할 수 있어야 하는 모든 기기를 말하며, 서버는 각 기기를 한 번만 계산합니다. 다음은 계산에 영향을 주지 않습니다.

- 기기가 **유인**(누군가 앞에 앉아 있음)인지 **무인**(헤드리스 서버, 키오스크, 상시 가동 워크스테이션)인지,
- **한 번** 접속할지 **여러 번** 접속할지,
- 얼마나 자주 접속하는지.

업무 대부분이 즉석에서 한 번만 하는 지원이라면, 아래에서 다룰 더 좁은 범위의 **[Customized V2](https://rustdesk.com/pricing#custom2)** 계산 방식이 바로 그런 경우를 위해 설계되었습니다.

## 자세히 살펴보기

계산 방식을 바꾸는 것은 플랜입니다. **[Customized V2](https://rustdesk.com/pricing#custom2)** 플랜에서는 관리 대상 기기의 정의가 더 좁습니다. **기기 그룹이나 사용자에 할당한** 기기만 라이선스 기기 수에 포함됩니다. 임시로 한 번 지원하기 위해 접속했을 뿐 할당하지 않은 기기는 계산되지 않으며 비활성화되지도 않습니다. 할당되지 않은 기기를 콘솔에 아예 표시하고 싶지 않다면 [`register-device` 클라이언트 설정](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device)으로 제어할 수 있으며, 이 설정은 라이선스로 제공되는 동시 연결 수가 2 이상일 때 적용됩니다. 실제로 이런 빠른 지원 세션에는 사용자가 자리에 있는 단일 연결을 위한 ID와 일회용 비밀번호만 표시되므로, 진짜 일회성 지원은 보유 기기 목록에 영구적인 자리를 차지할 필요가 없습니다. 업무의 상당 부분이 이런 형태라면 대개 Customized V2가 더 적합합니다. 현재 조건은 시나리오와 함께 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하거나 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하세요.

예를 들어 기술자 20명이 고객 기기 약 1,000대를 지원하는 [MSP](/ko/blog/rustdesk-for-msps-ko)를 생각해 보겠습니다. 이 MSP는 **두 가지** 라이선스 기준을 모두 충족해야 합니다. 기술자 20명 전원을 위한 로그인 사용자 수와, 접속 가능한 상태로 유지할 기기를 위한 관리 대상 기기 수입니다. 정말 한 번뿐인 지원 요청에 해당하는 엔드포인트에는 위의 Customized V2 규칙이 적용되며, 현재 허용량은 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인할 수 있습니다.

## 동시 연결은 별도의 라이선스 단위입니다

표준 Server Pro 플랜(Individual, Basic, Customized)에는 무제한 동시 연결이 포함되며, [Customized V2](https://rustdesk.com/pricing#custom2)만 정해진 수를 라이선스로 제공합니다. RustDesk의 [동시 연결 정의](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)에 따르면 동시 연결은 발신 세션 탭 하나하나가 아니라 활성 상태인 제어 기기, 즉 "채널"입니다. 기술자 PC 한 대에서 세션 탭 다섯 개를 열면 채널 하나를 쓰고, 제어 기기 세 대가 동시에 활성 상태이면 채널 세 개를 씁니다. Customized V2에서는 로그인 사용자, 관리 대상 기기, 채널을 각각 따로 산정하세요.

## 이런 질문을 하는 사람은?

TeamViewer나 AnyDesk의 좌석 수를 RustDesk 단위로 환산하려는 사람은 누구나 가장 먼저 이 정의를 마주합니다. 라이선스 단위가 일대일로 대응하지 않기 때문입니다. RustDesk 유료 플랜에는 로그인하는 사람과 관리 대상으로 유지하는 기기 모두에 대한 용량이 필요합니다.

## 관련 질문

- 사용자 단위 대 기기 단위 라이선스, 동시 연결, Server Pro 기기 수 계산: [RustDesk 가격](https://rustdesk.com/pricing)을 참고하세요.
- [TeamViewer에서 넘어오는 경우, MSP 관점에서 RustDesk 가격은 어떻게 비교되나요?](/ko/blog/rustdesk-vs-teamviewer-ko)

보유 기기 규모를 산정 중인데 일회성 지원 요청을 기기 수에 포함해야 할지 확실하지 않으신가요? 구매 전에 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 현재 조건을 확인하거나 팀에 문의하세요.
