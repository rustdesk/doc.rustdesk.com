---
publishDate: 2026-07-09T18:44:00Z
lang: 'ko'
translationKey: 'rustdesk-vs-vnc'
draft: false
title: 'RustDesk와 VNC 비교: NAT 통과, 코덱, 암호화'
excerpt: '실전에서 비교하는 RustDesk와 VNC: 포트 포워딩 없는 NAT 통과, 최신 코덱, 기본 내장 암호화, 그리고 팀들이 VNC에서 RustDesk로 전환하는 이유.'
image: ~/assets/images/blog/rustdesk-vs-vnc-og.png
category: '비교'
tags: ['RustDesk', 'VNC', '비교', '오픈 소스']
author: 'RustDesk Team'
slug: 'rustdesk-vs-vnc-ko'
faq:
  - question: 'RustDesk는 VNC를 기반으로 하나요?'
    answer: '아닙니다. VNC는 픽셀 업데이트를 전송하기 위해 RFB(Remote Framebuffer) 프로토콜을 사용합니다. RustDesk는 독자적인 랑데부/릴레이 아키텍처, 최신 비디오 코덱, 종단 간 암호화를 갖춘 별도의 오픈소스(AGPL) 애플리케이션입니다. VNC 클라이언트나 서버가 아닙니다.'
  - question: 'VNC는 포트 포워딩 없이 인터넷을 통해 작동하나요?'
    answer: '그 자체로는 작동하지 않습니다. 기본 VNC/RFB 프로토콜에는 NAT 통과 기능이 없으므로, 벤더의 클라우드 브로커링 서비스를 사용하지 않는 한 인터넷을 통해 사용하려면 일반적으로 TCP 5900 포트 포워딩, VPN, 또는 SSH 터널이 필요합니다. RustDesk는 ID 서버와 릴레이를 통해 연결을 중개하므로 이런 과정 없이도 NAT를 통과합니다.'
  - question: 'VNC는 암호화되나요?'
    answer: '구현체마다 다릅니다. RealVNC는 상용 제품에서 AES 암호화를 제공하는 반면, TightVNC는 화면 데이터를 암호화 없이 전송하며 SSH를 통해 터널링하는 것을 전제로 합니다. RustDesk는 모든 연결에 기본적으로 종단 간 암호화(NaCl)를 적용합니다.'
  - question: 'LAN 환경의 홈랩에는 RustDesk와 VNC 중 어느 쪽이 더 나은가요?'
    answer: '신뢰할 수 있는 LAN 환경에서는 VNC가 매우 간단하고 표준화되어 있으며 거의 모든 OS는 물론 Raspberry Pi에서도 널리 사용할 수 있습니다. RustDesk는 LAN을 벗어나거나 여러 OS를 혼합해 원격 접속해야 할 때 더 중요해지는 NAT 통과, 최신 코덱, 기본 암호화를 제공합니다.'
metadata:
  description: 'RustDesk와 VNC를 항목별로 비교합니다: NAT 통과, 최신 코덱, 기본 내장 암호화, 셀프 호스팅, 그리고 VNC의 단순함과 보급성이 여전히 우위를 점하는 부분까지 다룹니다.'
  keywords: 'RustDesk와 VNC 비교, RustDesk와 RealVNC 비교, VNC NAT 통과, VNC 암호화 비교'
---

VNC는 다른 컴퓨터를 제어하는 가장 오래되고 널리 쓰이는 방식 중 하나입니다. 진정한 의미의 개방형 표준이며 거의 모든 곳에서 동작하고, LAN 환경이라면 단순함에서 이를 능가하기 어렵습니다. RustDesk는 같은 핵심 과제를 다루지만 NAT, 방화벽, 여러 운영체제가 뒤섞인 세상을 염두에 두고 설계되었습니다. 두 방식의 차이는 결국 네트워크를 어떻게 넘나드는가, 그리고 안전하게 만들기 위해 얼마나 많은 것을 추가로 덧붙여야 하는가로 귀결됩니다.

이 비교글은 하드웨어와 회선 환경에 좌우되는 벤치마크가 아니라, 지속적이고 검증 가능한 사실에 초점을 맞춥니다.

## VNC의 실체

"VNC"는 하나의 프로그램이 아니라 **RFB(Remote Framebuffer) 프로토콜**([Wikipedia](<https://en.wikipedia.org/wiki/RFB_(protocol)>))을 사용하는 구현체들의 집합입니다 — RealVNC, TightVNC, TigerVNC, UltraVNC 등이 그 예입니다. RFB는 근본적으로 **픽셀 기반**입니다. 서버가 프레임버퍼 업데이트를 뷰어로 전송하는 방식이죠. 이런 설계는 매우 단순하고 이식성이 뛰어나며, 바로 이 점 때문에 VNC는 엔터프라이즈 서버부터 Raspberry Pi에 이르기까지 거의 모든 곳에서 사용됩니다.

라이선스 방식은 제각각입니다. TigerVNC는 GNU GPL로 배포되고 TightVNC는 커뮤니티 주도의 오픈 포크인 반면, RealVNC의 뷰어는 상업적으로 유지 관리되는 독점 제품입니다. 따라서 "VNC는 오픈소스다"라는 말은 _일부_ 구현체에는 해당되지만 전체에 해당되는 것은 아닙니다.

## RustDesk의 실체

RustDesk는 독자적인 아키텍처를 갖춘 **단일 오픈소스 애플리케이션(AGPL)**입니다. 클라이언트는 ID/랑데부 서버로 아웃바운드 연결을 맺고, 이 서버가 P2P 또는 릴레이 세션을 중개합니다. [RustDesk 문서](https://rustdesk.com/docs/en/)에 따르면 트래픽은 (NaCl 기반의) 종단 간 암호화가 적용되며, 비디오는 원시 픽셀 사각형이 아닌 최신 코덱 — 소프트웨어에서는 VP8, VP9, AV1을, 하드웨어 경로에서는 H.264/H.265를 — 사용합니다. 모든 클라이언트는 공개 인프라, 자체 셀프 호스팅 서버, 또는 직접 작성한 랑데부/릴레이 서버 중 무엇에든 연결해 사용할 수 있습니다.

## 인터넷 문제: NAT 통과

가장 뚜렷한 차이가 바로 여기에 있습니다. 기본 VNC 프로토콜에는 **NAT 통과 기능이 없습니다**. [VNC 문서](https://en.wikipedia.org/wiki/Virtual_Network_Computing)에 따르면, 인터넷을 통해 컴퓨터에 접속하려면 "네트워크 주소 변환(NAT) 라우터 뒤에 있는 경우, 사용자가 로컬 방화벽에서 해당 포트를 열고 TCP 포트 5900을 포워딩하도록 포트 포워딩을 설정해야 한다"고 합니다. 흔히 쓰이는 우회 방법은 "SSH(Secure Shell)를 통해 VNC를 터널링하는 것"이며, 이는 일반 VNC에 없는 암호화도 함께 제공합니다. 일부 상용 VNC 제품(예: RealVNC의 클라우드 서비스)은 이를 피하기 위해 자체 브로커링 기능을 추가하지만, 이는 프로토콜 자체의 기능이 아니라 그 위에 얹힌 벤더 고유 기능일 뿐입니다.

RustDesk는 정반대 방식으로 설계되었습니다. 엔드포인트 클라이언트가 랑데부 서버로 **아웃바운드** 연결을 맺고, 직접 경로가 실패하면 릴레이로 폴백하기 때문에 RustDesk는 **엔드포인트별 포트 포워딩, VPN, SSH 터널 없이도 NAT와 방화벽을 통과**합니다. 엔드포인트에는 인바운드 리스닝 포트가 필요 없지만, 셀프 호스팅한 ID/랑데부 및 릴레이 서버는 문서화된 서비스 포트에서 인바운드 트래픽을 수신할 수 있어야 합니다. 이는 [Chrome Remote Desktop이나 다른 무료 도구의 대안](/ko/blog/best-free-remote-desktop-software-ko)으로서 원격 및 여러 OS 혼합 환경에서 실용적으로 쓰일 수 있게 하는 것과 동일한 NAT 통과 방식입니다.

## 암호화: 기본 제공 vs 경우에 따라 다름

VNC에서 암호화는 구현체에 따라 달라지는 세부 사항입니다. RealVNC는 상용 패키지에서 AES 암호화를 제공하지만, 이와 대조적으로 [VNC 문서](https://en.wikipedia.org/wiki/Virtual_Network_Computing)에 따르면 "TightVNC는 화면 데이터를 암호화 없이 전송하므로 안전하지 않으며" "SSH 연결을 통해 터널링해야 한다"고 명시되어 있습니다. 즉 VNC 세션의 보안 수준은 전적으로 어떤 서버를 선택했는지, 그리고 어떻게 설정했는지에 달려 있습니다.

RustDesk는 셀프 호스팅 여부와 관계없이 모든 연결에 **기본적으로 종단 간 암호화**를 적용하므로, SSH 터널을 따로 설정해야 한다는 사실을 기억할 필요조차 없습니다.

## RustDesk와 VNC 한눈에 비교하기

|                   | RustDesk                                                                | VNC (RFB)                                                                                                     |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 정체              | AGPL 앱 하나 + 랑데부/릴레이                                            | RFB 프로토콜, 다양한 구현체                                                                                   |
| 소스 코드         | 오픈소스(AGPL)                                                          | 혼합: GPL/오픈(TigerVNC, TightVNC), 독점(RealVNC)                                                             |
| 크로스 플랫폼     | Windows, macOS, Linux, Android; iOS(컨트롤러 전용)                      | Raspberry Pi를 포함해 매우 폭넓음                                                                             |
| NAT 통과          | 기본 내장(랑데부 + 릴레이)                                              | 기본 프로토콜에는 없음 — [포트 포워딩/VPN/SSH 필요](https://en.wikipedia.org/wiki/Virtual_Network_Computing)  |
| 암호화            | 기본적으로 종단 간(NaCl) 암호화 ([문서](https://rustdesk.com/docs/en/)) | 상이함: AES(RealVNC)부터 [암호화 없음(TightVNC)](https://en.wikipedia.org/wiki/Virtual_Network_Computing)까지 |
| 영상 전송         | 최신 코덱(VP8/VP9/AV1, H.264/H.265)                                     | 픽셀 기반 RFB 인코딩                                                                                          |
| 셀프 호스팅       | 가능 — 자체 ID/릴레이 서버                                              | 오픈 구현체는 가능(내장 브로커 없음)                                                                          |
| LAN 설정          | 간단함                                                                  | 매우 간단함                                                                                                   |
| 표준화된 프로토콜 | RustDesk 자체 방식                                                      | 오래되고 개방된 RFB 표준                                                                                      |

최신 RustDesk 요금제 정보는 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하세요.

## RustDesk가 앞서는 지점

RustDesk의 설계상 이점은 LAN을 벗어나거나 여러 팀과 플랫폼에서 일관성이 필요해지는 순간 바로 드러납니다.

- **번거로운 설정 없이 인터넷 접속.** NAT 통과와 릴레이 폴백 덕분에 엔드포인트마다 포트 포워딩, VPN, SSH 터널을 설정할 필요가 없습니다.
- **직접 설정할 필요 없는 암호화.** 검증해야 할 구현체가 아니라 기본적으로 종단 간 암호화가 적용됩니다.
- **최신 코덱.** VP8/VP9/AV1과 하드웨어 H.264/H.265는 대역폭이 제한적이거나 지연 시간이 큰 회선에서 원시 픽셀 인코딩보다 더 안정적으로 동작하는 경향이 있습니다.
- **감사 가능한 앱 하나와 셀프 호스팅 서버 하나.** 오픈소스(AGPL) 소프트웨어와 셀프 호스팅한 ID/릴레이를 함께 사용하면 코드와 세션 데이터 모두를 직접 통제하는 인프라 위에 둘 수 있습니다.

다만 트레이드오프도 있습니다. RustDesk를 셀프 호스팅한다는 것은 **누군가는 서버를 운영해야 한다**는 뜻입니다 — 프로비저닝, TLS, 포트 관리, 그리고 시간이 지남에 따른 패치 작업까지 말이죠. LAN 전용 VNC 구성은 이 과정을 완전히 생략할 수 있습니다. 이것이 진짜 트레이드오프입니다.

## 그렇다면 무엇을 써야 할까?

신뢰할 수 있는 LAN, 물리적으로 격리된(air-gapped) 세그먼트, 또는 Raspberry Pi 환경이라면 VNC의 단순함과 표준화는 정말이지 따라가기 어려운 장점입니다. 반면 인터넷을 안전하게 넘나들어야 하거나, 암호화가 기본으로 켜져 있기를 원하거나, 하나의 도구로 Windows, macOS, Linux, Android, iOS를 모두 지원해야 한다면 RustDesk의 아키텍처가 더 많은 부분을 대신 처리해 줍니다. 이미 Windows 기본 도구를 저울질하고 있다면, [RustDesk와 RDP 비교](/ko/blog/rustdesk-vs-rdp-ko) 글에서 그 갈림길도 함께 다루고 있습니다.

## 지금 시작해 보세요

이 비교글로 SSH 터널을 마침내 은퇴시킬 마음이 든다면, 무료 커뮤니티 서버로 시작해 보세요 — 오픈소스이고, 만료 기한이 없으며, NAT 통과도 기본 포함되어 있습니다. Pro 평가판 조건이 궁금하다면 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하시고, 최신 요금제는 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하세요.
