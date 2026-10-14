---
publishDate: 2026-07-03T09:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'upgrade-rustdesk-license-mid-subscription'
draft: false
title: '구독 중간에 RustDesk 라이선스 업그레이드하기: 작동 방식'
excerpt: '계약 기간 중에 RustDesk Server Pro 사용자나 기기를 추가할 때 새로 정해지는 1년 만료일, 남은 결제 금액의 크레딧 반영, 새 한도를 적용하는 라이선스 새로 고침 방법을 정리합니다.'
image: ~/assets/images/blog/upgrade-rustdesk-license-mid-subscription-og.webp
category: '가격'
tags: ['RustDesk', '가격', '라이선스']
author: 'RustDesk Team'
slug: 'upgrade-rustdesk-license-mid-subscription-ko'
faq:
  - question: '구독 중간에 RustDesk 라이선스를 업그레이드할 수 있나요?'
    answer: '네. 셀프 서비스 포털에서 언제든 사용자나 관리 대상 기기를 업그레이드할 수 있습니다. 업그레이드하면 만료일이 업그레이드한 날로부터 1년 뒤로 연장되고, 현재 라이선스의 남은 결제 금액은 크레딧으로 반영됩니다. 새 한도를 바로 적용하려면 웹 콘솔에서 같은 라이선스를 새로 고침하세요. 새로 고침하지 않아도 약 24시간 안에 자동으로 적용됩니다.'
  - question: 'RustDesk 라이선스 업그레이드 비용은 어떻게 계산되나요?'
    answer: 'RustDesk Server Pro 업그레이드는 라이선스를 업그레이드한 날로부터 1년 뒤로 연장하고, 현재 라이선스의 남은 결제 금액을 크레딧으로 반영합니다. 새로 추가한 사용자나 기기는 1년치가 청구되고, 기존 용량은 원래 만료일 이후로 연장되는 기간만큼만 청구됩니다. 공식 Wiki FAQ에 계산 예시가 있으며, 셀프 서비스 포털에서 결제 전에 총액을 확인할 수 있습니다.'
  - question: '라이선스를 업그레이드했는데 왜 새 기기가 표시되지 않나요?'
    answer: '새 한도는 Server Pro가 다음에 라이선스를 확인할 때, 약 24시간 안에 자동으로 적용됩니다. 바로 적용하려면 Server Pro 웹 콘솔에서 라이선스를 새로 고침하세요. Edit를 클릭한 뒤 키를 바꾸지 않고 OK를 클릭하면 됩니다. 새로 고침하면 업데이트된 사용 권한을 즉시 가져오며, 라이선스 키는 그대로 유지됩니다.'
  - question: '웹 콘솔에서 라이선스를 어떻게 새로 고침하나요?'
    answer: '결제한 뒤 Server Pro 웹 콘솔에서 라이선스 설정을 열고, Edit를 클릭한 다음 키를 바꾸지 않고 OK를 클릭하세요. 그러면 업데이트된 사용 권한을 가져오며, 라이선스 키는 그대로 유지됩니다. 새로 고침하지 않으면 다음 주기적 라이선스 확인 때, 약 24시간 안에 새 한도가 자동으로 적용됩니다.'
  - question: '업그레이드 구매나 라이선스 갱신은 어디서 하나요?'
    answer: 'rustdesk.com/self-host/account/의 셀프 서비스 라이선스 포털을 이용하세요. 라이선스를 구매할 때 결제 페이지에서 입력한 이메일 주소로 로그인하며, 어떤 이메일이었는지 모르겠다면 support@rustdesk.com으로 문의하세요. 포털에서는 청구서와 갱신 내역도 확인할 수 있습니다.'
  - question: '구독 중간에 다운그레이드하거나 좌석 수를 줄일 수 있나요?'
    answer: 'RustDesk Server Pro 라이선스의 다운그레이드와 좌석 수 축소는 RustDesk 팀을 통해 처리됩니다. 라이선스 이메일과 필요한 변경 사항을 적어 sales@rustdesk.com으로 보내세요. rustdesk.com/self-host/account/의 셀프 서비스 포털에서는 언제든 구매할 수 있는 업그레이드와 함께 갱신과 청구서를 처리합니다.'

metadata:
  description: '계약 기간 중 RustDesk Server Pro를 업그레이드할 때의 새 1년 만료일, 남은 결제 금액의 크레딧 반영, 공식 계산 예시, 라이선스 새로 고침 방법을 정리합니다.'
  keywords: 'RustDesk 라이선스 업그레이드, 구독 중 라이선스 업그레이드, RustDesk 기기 추가, RustDesk 라이선스 업그레이드 비용, RustDesk 관리 대상 기기 늘리기, 웹 콘솔 라이선스 새로 고침, RustDesk 사용자별 기기별 라이선스'
---

구독 기간 중에도 RustDesk Server Pro 라이선스를 업그레이드해 [관리 대상 기기](/ko/blog/what-counts-as-a-managed-device-ko)나 로그인 사용자를 추가할 수 있습니다. [공식 업그레이드 규칙](https://github.com/rustdesk/rustdesk/wiki/FAQ#renew--upgrade-license)에 따라 만료일은 업그레이드한 날로부터 1년 뒤로 연장됩니다. 계산 시 현재 라이선스의 남은 결제 금액은 크레딧으로 반영됩니다. 새로 추가한 용량은 12개월치가 청구되고, 기존 용량은 원래 만료일 이후 늘어나는 기간만큼 청구됩니다. 추가한 사용자나 기기에 대해 남은 일수만큼만 청구하는 방식이 아닙니다.

## 업그레이드 방법

업그레이드는 [셀프 서비스 라이선스 포털](https://rustdesk.com/self-host/account/)에서 진행합니다. 처음 라이선스를 구매할 때 결제 페이지에서 입력한 이메일로 로그인하세요. 어떤 이메일이었는지 모르겠다면 [support@rustdesk.com](mailto:support@rustdesk.com)으로 문의하세요. 같은 포털에서 갱신과 청구서 다운로드도 할 수 있습니다.

결제한 뒤 [웹 콘솔](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/license/#라이선스-새로-고침)에서 라이선스를 새로 고침하세요. **Edit**를 클릭한 뒤 키를 바꾸지 않고 **OK**를 클릭하면 됩니다. 새 한도가 즉시 적용되며, 새로 고침하지 않으면 다음 주기적 라이선스 확인 때, 약 24시간 안에 자동으로 적용됩니다. 기존 라이선스 키는 그대로 유지됩니다.

예를 들어 [공식 계산 예시](https://github.com/rustdesk/rustdesk/wiki/FAQ#is-it-over-charge-in-upgrade)는 2026년 3월 12일에 만료될 예정이던 라이선스를 2025년 8월 14일에 업그레이드하는 경우를 설명합니다. 기기 100대를 추가하면 만료일이 2026년 8월 14일로 바뀌며, 새 기기는 1년치가 청구되고 기존 사용자 10명과 기기 800대는 약 5개월 연장분이 청구됩니다. 이 예시는 계산 방식을 설명할 뿐 현재 요금이 아니므로, 실제 구매에는 포털에 표시되는 총액과 [현재 가격](https://rustdesk.com/pricing)을 기준으로 삼으세요.

## 누가 이런 질문을 하나요

계기는 대개 성장입니다. 당시 규모에 맞춰 라이선스를 산정했던 관리자나 [MSP](/ko/blog/rustdesk-for-msps-ko)가 한 해 도중에 새 엔드포인트, 직원, 고객 사이트를 추가하게 되는 경우입니다. 이때의 걱정은 대개 두 가지입니다. 계약 기간 중에 규모를 늘릴 수 있는지, 그리고 그 비용이 공정하게 청구되는지입니다.

## 관련 질문

- [RustDesk가 사용자와 관리 대상 기기를 계산하는 방식, 사용자 단위 대 기기 단위 라이선스](/ko/blog/what-counts-as-a-managed-device-ko)
- 웹 콘솔에서 라이선스 새로 고침하기: [RustDesk 문서](https://rustdesk.com/docs/ko/)를 참고하세요.

배포 규모가 커지고 있나요? 팀에 더 많은 용량이 필요할 때 언제든 [셀프 서비스 포털](https://rustdesk.com/self-host/account/)에서 업그레이드하세요.
