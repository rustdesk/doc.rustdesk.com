---
publishDate: 2026-07-02T14:43:00Z
lang: ko
translationKey: what-counts-as-a-managed-device
draft: false
title: 'RustDesk에서 관리 기기는 어떻게 계산될까요?'
excerpt: 'RustDesk 표준 플랜에서는 접속하도록 설정한 모든 기기가 한 번만 계산됩니다. Customized V2는 그룹이나 사용자에 할당된 기기만 계산하며, 임시(ad-hoc) 기기는 계산에 포함되지 않습니다.'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: '가격'
tags: ['RustDesk', '가격', '라이선스']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-ko'
faq:
  - question: 'RustDesk는 관리 기기를 어떻게 계산하나요?'
    answer: '표준 플랜에서는 접속하도록 설정한 모든 기기가 유인(attended)이든 무인(unattended)이든, 한 번을 접속하든 천 번을 접속하든 관계없이 관리 기기 1대로 단 한 번만 계산됩니다. Customized V2는 계산 방식이 다릅니다. 기기 그룹이나 사용자에 할당된 기기만 라이선스 기기 수에 포함됩니다.'
  - question: '임시(ad-hoc) 단발성 지원 기기는 어떻게 계산되나요?'
    answer: 'Customized V2 플랜에서는 기기 그룹이나 사용자에 할당된 기기만 관리 기기로 계산됩니다. 즉흥적인 지원을 위해 한 번 접속했을 뿐 할당하지 않은 기기는 라이선스 기기 수에 포함되지 않으며 비활성화되지도 않습니다. 업무 대부분이 임시 지원인 경우, 모든 엔드포인트를 계산하는 방식보다 Customized V2가 더 적합합니다.'

metadata:
  description: 'RustDesk가 관리 기기를 계산하는 방식: 표준 플랜은 접속 가능한 모든 기기를 한 번씩 계산하며, Customized V2는 그룹이나 사용자에 할당된 기기만 계산합니다.'
  keywords: '관리 기기 계산 기준, 러스트데스크 기기 계산, 러스트데스크 팀뷰어 라이선스 비교, 무인 유인 기기 라이선스, 러스트데스크 임시 지원, MSP 원격 지원 라이선스'
---

TeamViewer의 좌석(seat) 단위 과금 모델에 익숙하다면, RustDesk 표준 플랜의 계산 규칙은 놀랄 만큼 단순합니다. **접속하고자 하는 모든 기기는 관리 기기 1대로, 단 한 번만 계산됩니다.** **[Customized V2](https://rustdesk.com/pricing#custom2)** 플랜은 계산 방식이 다릅니다. 그룹이나 사용자에 할당한 기기만 계산되며, 이 때문에 임시 지원 업무가 많은 경우에 특히 적합합니다.

## 짧은 답변

표준 플랜에서 '관리 기기'란 접속할 수 있어야 하는 모든 기기를 의미하며, 서버는 각 기기를 단 한 번만 계산합니다. 다음 사항은 계산에 영향을 주지 않습니다.

- 기기가 **유인(attended)**(누군가 앞에 앉아 있는 상태)인지 **무인(unattended)**(헤드리스 서버, 키오스크, 상시 가동 워크스테이션 등)인지,
- **한 번**만 접속할지 **여러 번** 접속할지,
- 얼마나 자주 접속하는지.

업무 대부분이 즉흥적인 단발성 지원이라면, 아래에서 다룰 더 좁은 범위의 **[Customized V2](https://rustdesk.com/pricing#custom2)** 계산 방식이 바로 그런 경우를 위해 설계되었습니다.

## 자세히 살펴보기

실제로 계산 방식을 바꾸는 것은 플랜입니다. **[Customized V2](https://rustdesk.com/pricing#custom2)** 플랜에서는 관리 기기의 정의가 더 좁습니다. **기기 그룹이나 사용자에 할당한** 기기만 라이선스 기기 수에 포함됩니다. 임시로 단발성 지원을 위해 접속했을 뿐 할당하지 않은 기기는 계산되지 않으며 비활성화되지도 않습니다. 이렇게 할당되지 않은 기기가 콘솔에 아예 표시되지 않기를 원한다면 [`register-device` 클라이언트 설정](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device)으로 제어할 수 있으며, 이는 라이선스된 동시 연결 수가 2 이상일 때 적용됩니다. 실제로 이러한 빠른 지원 세션에서는 단일 유인 연결에 대한 ID와 일회용 비밀번호만 표시되므로, 진짜 단발성 상호작용은 보유 기기 목록에 영구적인 자리를 차지할 필요가 없습니다. 업무의 상당 부분이 이런 형태라면 대체로 Customized V2가 더 적합하며, 현재 조건은 시나리오와 함께 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하거나 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하시기 바랍니다.

예를 들어 기술자 20명이 약 1,000대의 고객 기기를 지원하는 [MSP](/ko/blog/rustdesk-for-msps-ko)를 생각해 보겠습니다. 이 경우 **두 가지** 라이선스 기준을 모두 충족해야 합니다. 20명의 기술자 전원을 위한 충분한 로그인 사용자 수와, 접속 가능한 상태로 유지할 기기를 위한 충분한 관리 기기 수입니다. 정말로 단발성 지원 호출에 해당하는 엔드포인트에는 위의 Customized V2 규칙이 적용되며, 현재 제공량은 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인할 수 있습니다.

## 이런 질문을 하는 사람은?

TeamViewer나 AnyDesk의 좌석 수를 RustDesk 단위로 환산하려는 사람이라면 누구나 가장 먼저 이 정의를 마주하게 됩니다. 라이선스 단위가 1대1로 매핑되지 않기 때문입니다. RustDesk 유료 플랜은 로그인하는 사람과 관리 대상으로 유지되는 기기 모두에 대한 용량을 필요로 합니다.

## 관련 질문

- 사용자 단위 대 기기 단위 라이선스, 동시 연결, Server Pro의 기기 수 계산: [RustDesk 가격](https://rustdesk.com/pricing)을 참조하세요.
- [TeamViewer에서 넘어오는 경우 — MSP를 위한 RustDesk 가격은 어떻게 비교되나요?](/ko/blog/rustdesk-vs-teamviewer-ko)

보유 기기 규모를 산정하는 중인데 단발성 지원 호출을 기기 수에 포함해야 할지 확실하지 않으신가요? [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 현재 조건을 확인하시거나, 구매 전에 팀에 문의해 보세요.
