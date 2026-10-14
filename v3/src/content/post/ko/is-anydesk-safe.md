---
publishDate: 2026-06-30T17:26:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'is-anydesk-safe'
draft: false
title: 'AnyDesk, 안전할까요? 암호화, 2024년 보안 사고, 사기 수법'
excerpt: 'AnyDesk는 안전할까요? 암호화 방식과 2024년 프로덕션 시스템 보안 사고, 사기범들이 AnyDesk를 악용하는 이유를 공정하게 살펴보고, 오픈소스와 비교해 봅니다.'
image: '~/assets/images/blog/is-anydesk-safe-og.webp'
category: '보안'
tags: ['AnyDesk', '보안']
author: 'RustDesk Team'
slug: 'is-anydesk-safe-ko'
faq:
  - question: 'AnyDesk는 사용하기에 안전한가요?'
    answer: '네, 정당한 용도라면 안전합니다. AnyDesk는 256비트 AES 전송 암호화를 적용한 TLS 1.2, 무인 접속용 2단계 인증, 접근 제어 목록을 문서화한 성숙한 상용 도구입니다. 주요 위험은 2024년 2월 2일의 프로덕션 시스템 침해, 기본적으로 AnyDesk 자체 클라우드를 통한 연결 조정(Ultimate에서는 On-Premises 제공), 그리고 피해자를 꾀어 AnyDesk를 설치하게 만드는 사기범입니다.'
  - question: 'AnyDesk가 해킹당한 적이 있나요?'
    answer: '네. AnyDesk는 2024년 2월 2일 프로덕션 시스템이 침해되었다고 공개했습니다. 공식 성명은 인증서 교체, 시스템 복구, 예방 차원의 my.anydesk.com 비밀번호 재설정을 설명했으며, 최종 사용자 기기가 영향을 받았다는 증거는 없다고 밝혔습니다. Akamai의 보안 연구진은 이와 별도로, 보도된 소스 코드 및 코드 서명 자료 노출을 다뤘습니다.'
  - question: '사기범들은 왜 AnyDesk를 사용하나요?'
    answer: 'AnyDesk는 무료이고 몇 초 만에 설치되며 제어받는 쪽에 계정이 필요 없기 때문에, 기술 지원 사기범들은 전화나 이메일로 피해자에게 접근해 AnyDesk를 설치하고 제어권을 넘기도록 유도합니다. 이는 AnyDesk의 취약점이 아니라 사용상의 위험입니다. 같은 수법은 RustDesk를 포함한 모든 원격 데스크톱 도구에서 통합니다. AnyDesk는 악용 방지 안내를 게시하고 있습니다.'
  - question: 'AnyDesk의 암호화는 안전한가요?'
    answer: 'AnyDesk의 보안 문서에 따르면 AEAD를 적용한 TLS 1.2, RSA-2048 비대칭 키 교환, 256비트 AES 전송 암호화, 그리고 완전 순방향 비밀성(PFS)을 사용합니다. 이는 업계 표준 수준의 보호 조치입니다. 다만 클로즈드소스 클라이언트를 신뢰해야 하고, 기본적으로 연결 중개를 AnyDesk 클라우드에 맡긴다는 점에 유의하세요. 코드를 직접 감사할 수 없으므로 벤더의 운영 보안에 의존하게 됩니다.'
metadata:
  description: 'AnyDesk는 안전할까요? TLS/AES 암호화, 2024년 프로덕션 시스템 보안 사고, 사기 악용 사례, 클로즈드소스의 트레이드오프를 출처를 바탕으로 검토합니다.'
  keywords: 'AnyDesk 안전한가요, AnyDesk 보안, AnyDesk 침해 사고 2024, AnyDesk 사기, AnyDesk 암호화, AnyDesk 사용해도 안전한가요, AnyDesk 해킹'
---

간단히 답하면, AnyDesk는 정당한 용도로 쓰기에 안전합니다. 표준 수준의 암호화를 갖춘 성숙한 상용 원격 데스크톱 제품이며, 악성코드가 아닙니다. 이해해 둘 만한 위험은 클로즈드소스이고 기본적으로 AnyDesk 클라우드를 통해 연결을 조정한다는 점, 2024년 2월 프로덕션 시스템 침해를 공개했다는 점, 그리고 사기범들이 이를 심하게 악용한다는 점입니다. 출처를 바탕으로 정리하면 다음과 같습니다.

## 짧은 답변

네, 의도적이고 정당한 용도라면 안전합니다. AnyDesk는 256비트 AES 전송 암호화를 적용한 TLS 1.2, 무인 접속용 2단계 인증, 접근 제어 목록을 문서화하고 있습니다. 사용 방식을 좌우하는 요소는 세 가지입니다. [2024년 2월 2일 프로덕션 시스템 침해](https://anydesk.com/en/public-statement-2-2-2024), 기본적으로 AnyDesk 자체 클라우드를 통한 연결 조정(Ultimate에서는 On-Premises 어플라이언스 제공), 그리고 피해자를 꾀어 AnyDesk를 설치하게 만드는 기술 지원 사기범입니다. 이 중 어느 것도 AnyDesk를 *설치*하는 것 자체를 위험하게 만들지는 않지만, 모두 AnyDesk를 *사용*하는 방식에 영향을 줍니다.

## AnyDesk가 세션을 보호하는 방법

[AnyDesk의 공식 보안 문서](https://anydesk.com/en/security)에 따르면 세션은 AEAD를 적용한 TLS 1.2로 보호되며, 엔드포인트를 검증하고 중간자 공격을 막는 RSA-2048 비대칭 키 교환과 256비트 AES 전송 암호화를 사용합니다. 임시 키 교환을 통한 완전 순방향 비밀성(Perfect Forward Secrecy, PFS)도 제공됩니다. 계정 측면에서는 무인 접속을 위한 2단계 인증(TOTP), 연결할 수 있는 대상을 제한하는 접근 제어 목록/허용 목록(allowlist), 솔트를 적용한 비밀번호 해싱을 지원합니다. (AnyDesk의 일부 자료는 더 새로운 TLS 버전을 언급하기도 하지만, 현재 기준은 위에 링크한 보안 페이지입니다.)

이는 견고하고 업계 표준에 부합하는 보호 조치로, 진지한 경쟁 제품들이 쓰는 수준과 본질적으로 같은 종류입니다. 전송 계층에서는 우려할 부분이 없습니다. 정작 흥미로운 질문은 암호 스위트가 아니라 *신뢰 모델*과 *사람의 행동*에 관한 것입니다.

## 2024년 AnyDesk 보안 사고: 실제로 무슨 일이 있었나

**2024년 2월 2일**, [AnyDesk는 프로덕션 시스템 침해를 공개](https://anydesk.com/en/public-statement-2-2-2024)했습니다. 성명은 CrowdStrike와 함께한 사고 대응, 인증서 폐기·교체, 시스템 복구, 예방 차원의 웹 포털 비밀번호 재설정을 설명했습니다. [Akamai의 분석](https://www.akamai.com/blog/security-research/anydesk-breach-what-to-know-mitigations-and-recommendations)은 벤더의 공식 공개와 별도로, 보도된 소스 코드 및 코드 서명 자료 노출을 다룹니다.

[AnyDesk는 **최종 사용자 기기가 영향을 받았다는 증거는 없다**고 밝혔으며](https://anydesk.com/en/public-statement-2-2-2024), 기기에 연결하는 데 쓸 수 있는 자격 증명은 저장하지 않았다고 설명했습니다.

여기서 얻을 교훈은 AnyDesk가 유독 취약하다는 것이 아닙니다. 핵심은 **벤더 집중 위험**입니다. 세션을 조정하고 계정 데이터를 보관하는 인프라를 제3자가 운영한다면, 그곳에서 일어난 침해는 여러분이 선택하지도, 막을 수도 없었던 일입니다.

## 사회공학적 사기는 별개의 위험입니다

대부분의 개인에게 AnyDesk와 관련된 가장 큰 위험은 CVE가 아니라 사회공학적 수법입니다. [FBI는 기술 지원 사기범이 피해자에게 원격 접속 소프트웨어를 설치하게 한 뒤 넘겨받은 권한을 악용한다고 경고](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software)하며, AnyDesk가 [악용 방지 안내](https://anydesk.com/en/abuse-prevention)를 게시하는 것도 바로 이 때문입니다. 위험의 핵심은 세션 암호화의 강도가 아니라 누구에게 접속 권한을 주느냐입니다.

왜 하필 AnyDesk일까요? 무료로 내려받을 수 있고, 몇 초 만에 설치되며, 결정적으로 _제어받는_ 쪽은 계정을 만들 필요가 없기 때문입니다. 이런 낮은 진입 장벽은 정당한 지원 업무에는 장점이지만 사기범에게는 더없이 좋은 선물입니다. 이들은 표적에게 전화나 이메일로 접근해 긴급한 "문제"를 지어낸 뒤, 전체 원격 제어 권한을 넘기도록 단계별로 유도합니다.

자극적인 헤드라인 속에서 흔히 놓치는 공정한 지적은 바로 이것입니다. **이는 사용상의 위험이지, AnyDesk의 취약점이 아닙니다.** 똑같은 수법이 TeamViewer, Chrome Remote Desktop, RustDesk에서도 통합니다. 전화기 너머의 낯선 사람에게 스스로 열쇠를 넘겨준다면 어떤 AES도 여러분을 지켜 주지 못합니다. 방어 전략은 [원격 데스크톱 사기를 피하는 방법](/ko/blog/avoid-remote-desktop-scams-ko)에서 따로 정리했으며, 같은 논리가 [Chrome Remote Desktop의 안전성](/ko/blog/is-chrome-remote-desktop-safe-ko)에도 그대로 적용됩니다.

## 클로즈드소스와 클라우드 중개: 신뢰의 문제

바로 이 지점에서 AnyDesk와 RustDesk의 방식이 갈립니다. 암호화가 훌륭한지가 아니라 _무엇을 그대로 믿어야 하는가_ 하는 문제에서입니다.

AnyDesk는 독점 소프트웨어입니다. 클라이언트의 소스 코드를 읽거나, 직접 빌드하거나, 동작을 독립적으로 검증할 수 없습니다. 바이너리가 광고된 대로 동작한다는 것을 AnyDesk를 믿고 받아들여야 합니다. 또한 기본적으로 세션이 AnyDesk 클라우드를 통해 중개되므로, 그 인프라의 가용성과 보안은 벤더가 관리할 몫입니다. 2024년 사고가 이를 보여 주었습니다. AnyDesk Ultimate는 온프레미스 어플라이언스를 제공하므로, 이를 도입하는 고객에게는 이 격차가 줄어듭니다.

RustDesk는 이 두 가지 전제 모두에서 정반대 편에서 출발합니다. RustDesk 클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 [AGPL 라이선스의 오픈소스](https://github.com/rustdesk/rustdesk)이고, Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어입니다. 클라이언트를 감사하고 직접 빌드할 수 있으므로 독점 바이너리를 그대로 믿을 필요가 없습니다. 또한 ID/랑데부 서버와 릴레이를 [자체 호스팅](/ko/blog/why-self-host-remote-desktop-software-ko)할 수 있으므로, 세션을 중개하는 인프라가 제3자가 아니라 여러분의 것이 됩니다. 2024년 사고가 구체적으로 드러낸 벤더 집중 위험에서 벗어나는 것입니다. 이는 [데이터 주권 설계](/ko/blog/remote-desktop-data-sovereignty-gdpr-ko)도 뒷받침합니다.

공정을 기하자면, 이는 신뢰를 없애는 것이 아니라 그 대상을 옮기는 것입니다. 코드가 공개되어 있으므로 RustDesk 자체의 결함도 공개적으로 드러나니, [최신 릴리스](https://github.com/rustdesk/rustdesk/releases)와 취약점 기록을 꾸준히 확인하세요. 그리고 감사 가능한 자체 호스팅 인프라는 출발점일 뿐 보장은 아닙니다. 세션은 여전히 엔드포인트 사이를 직접 오가며, 서버 패치는 여러분의 몫입니다.

## 그래서, AnyDesk는 안전한가요?

의도적이고 정당한 용도라면, 네. AnyDesk는 표준 수준의 암호화와 합리적인 계정 제어를 갖춘 성숙한 제품입니다. 최신 상태로 업데이트하고, 무인 접속은 2단계 인증으로 보호하고, 접근 제어 목록으로 들어오는 연결을 제한하고, 모든 지원 요청이 진짜인지 확인하세요.

단서는 암호화가 아니라 신뢰에 관한 것입니다. 기본값인 클로즈드소스, 클라우드 조정 방식은 AnyDesk의 운영 보안에 의존한다는 뜻이며, 그 운영 보안은 2024년에 실제로 타격을 입었습니다. Ultimate On-Premises는 이 격차를 줄여 줍니다. 이 트레이드오프가 마음에 걸린다면 [자체 호스팅 TeamViewer·AnyDesk 대안](/ko/blog/self-hosted-teamviewer-alternative-ko)이 신뢰의 근거를 바꿔 줍니다. 서버를 직접 운영하는 대가로 감사 가능한 코드와 직접 통제하는 연결 조정을 얻는 것입니다.

어떤 도구를 선택하든 가장 큰 피해를 막아 주는 규칙은 가장 비용이 들지 않는 규칙입니다. _여러분에게_ 먼저 연락해 온 사람이 요청했다는 이유로 원격 접속 소프트웨어를 설치하지 마세요.
