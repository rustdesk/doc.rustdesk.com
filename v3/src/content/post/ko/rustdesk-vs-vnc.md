---
publishDate: 2026-07-09T18:44:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-vs-vnc'
draft: false
title: 'RustDesk와 VNC 비교: NAT 통과, 코덱, 암호화'
excerpt: 'RustDesk와 VNC를 실제 사용 관점에서 비교합니다. 포트 포워딩 없는 NAT 통과, 최신 코덱, 기본 내장 암호화, 그리고 팀들이 VNC에서 RustDesk로 옮기는 이유를 살펴봅니다.'
image: ~/assets/images/blog/rustdesk-vs-vnc-og.webp
category: '비교'
tags: ['RustDesk', 'VNC', '비교', '오픈 소스']
author: 'RustDesk Team'
slug: 'rustdesk-vs-vnc-ko'
faq:
  - question: 'RustDesk는 VNC를 기반으로 하나요?'
    answer: '아니요. VNC는 RFB(Remote Framebuffer) 프로토콜로 픽셀 업데이트를 전송합니다. RustDesk는 오픈소스(AGPL) 클라이언트, 자체 랑데부/릴레이 아키텍처, VP8/VP9/AV1 비디오 코덱, 종단 간 암호화되는 ID 기반 세션을 갖춘 별도의 애플리케이션입니다. RustDesk는 VNC 클라이언트도 VNC 서버도 아닙니다.'
  - question: 'VNC는 포트 포워딩 없이 인터넷에서 작동하나요?'
    answer: '아니요, VNC만으로는 안 됩니다. 기본 VNC/RFB 프로토콜에는 NAT 통과 기능이 없으므로, 공급사의 클라우드 중개 서비스를 쓰지 않는 한 인터넷에서 쓰려면 보통 TCP 5900 포트 포워딩, VPN, SSH 터널이 필요합니다. RustDesk는 ID 서버와 릴레이로 연결을 중개하므로 이런 설정 없이 NAT를 통과합니다.'
  - question: 'VNC는 암호화되나요?'
    answer: '일부 구현체에서만 그렇습니다. TigerVNC는 TLS/X509 보안을 지원하고, RealVNC는 AES 암호화를 제공하며, TightVNC는 신뢰할 수 없는 네트워크에서 SSH 터널링을 권장합니다. RustDesk는 클라이언트에 올바른 서버 공개 키를 설정하면 ID로 중개되는 세션을 종단 간 암호화합니다. RustDesk의 직접 IP 액세스는 암호화되지 않는 별도 모드이므로 VPN 뒤에서 쓰는 것이 좋습니다.'
  - question: 'LAN 홈랩에는 RustDesk와 VNC 중 어느 쪽이 더 나은가요?'
    answer: '신뢰할 수 있는 LAN에서는 VNC가 더 간단한 선택인 경우가 많습니다. 표준화되어 있고, 빠르게 배포할 수 있으며, Raspberry Pi를 포함한 거의 모든 OS에서 쓸 수 있습니다. LAN을 벗어나거나 여러 OS를 원격으로 접속해야 한다면 RustDesk가 더 적합합니다. NAT 통과, 최신 비디오 코덱, 종단 간 암호화되는 ID 기반 세션을 제공하기 때문입니다.'
metadata:
  description: 'RustDesk와 VNC를 항목별로 비교합니다. NAT 통과, 최신 코덱, 기본 내장 암호화, 자체 호스팅, 그리고 VNC의 단순함과 보급성이 여전히 앞서는 부분을 다룹니다.'
  keywords: 'RustDesk와 VNC 비교, RustDesk와 RealVNC 비교, VNC NAT 통과, VNC 암호화 비교'
---

VNC는 다른 컴퓨터를 제어하는 가장 오래되고 널리 쓰이는 방식 중 하나입니다. 진정한 개방형 표준이고, 거의 모든 곳에서 실행되며, LAN에서는 단순함으로 이기기 어렵습니다. RustDesk는 같은 핵심 작업을 다루지만 NAT, 방화벽, 여러 운영체제가 뒤섞인 환경을 위해 설계되었습니다. 차이는 결국 각각이 네트워크를 어떻게 넘나드는지, 그리고 안전하게 쓰려면 무엇을 얼마나 덧붙여야 하는지에 있습니다.

이 비교는 하드웨어와 회선에 따라 달라지는 벤치마크가 아니라, 시간이 지나도 유효하고 검증 가능한 사실에 집중합니다.

## VNC의 실체

"VNC"는 RealVNC, TightVNC, TigerVNC, UltraVNC 등 **RFB(Remote Framebuffer) 프로토콜**을 사용하는 구현체들의 집합입니다. RFB는 협상된 인코딩으로 프레임버퍼 업데이트를 보내며, 인코딩에 따라 이미지를 압축하거나 비디오를 쓸 수도 있습니다. 예를 들어 [TigerVNC는 Tight, JPEG, ZRLE, Hextile, H.264, Raw 인코딩을 지원합니다](https://tigervnc.org/doc/vncviewer.html). 따라서 성능은 RFB 자체가 아니라 구현체와 인코딩에 따라 달라집니다.

라이선스는 제각각입니다. TigerVNC는 GNU GPL로 배포되고 TightVNC는 커뮤니티 주도의 오픈 포크인 반면, RealVNC의 뷰어는 상업적으로 유지 관리되는 독점 제품입니다. 따라서 "VNC는 오픈소스다"라는 말은 _일부_ 구현체에만 해당합니다.

## RustDesk의 실체

RustDesk 클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 **AGPL 라이선스**이며, Server Pro는 중앙 관리 기능을 더하는 상용 독점 자체 호스팅 서버 소프트웨어입니다. RustDesk는 ID/랑데부 서버와 릴레이로 구성된 아키텍처를 사용합니다. 클라이언트가 ID 서버로 아웃바운드 연결을 맺으면, ID 서버가 피어 투 피어 직접 세션이나 릴레이 세션을 조정합니다. [클라이언트는 VP8, VP9, AV1 소프트웨어 코덱과 H.264/H.265 하드웨어 코덱을 지원합니다](https://rustdesk.com/docs/ko/). 엔드포인트마다 VPN이나 SSH 터널을 따로 구성하지 않고도 자체 서버로 연결 조정과 릴레이를 처리할 수 있습니다.

## 인터넷 문제: NAT 통과

기본 RFB 프로토콜은 NAT 통과를 제공하지 않습니다. VNC를 직접 배포하려면 대개 VPN, SSH 터널, 포워딩된 포트 같은 접근 가능한 네트워크 경로가 필요합니다. [TightVNC는 포트 포워딩과 SSH 옵션을 문서화하고 있습니다](https://www.tightvnc.com/faq.php). 일부 VNC 제품은 클라우드 중개 기능을 추가하지만, 이는 제품 기능이지 RFB의 요건이 아닙니다.

RustDesk는 반대 방식으로 만들어졌습니다. 엔드포인트 클라이언트가 랑데부 서버로 **아웃바운드** 연결을 맺고 직접 경로가 실패하면 릴레이로 전환하므로, RustDesk는 **엔드포인트별 포트 포워딩, VPN, SSH 터널 없이 NAT와 방화벽을 통과**합니다. 엔드포인트에는 인바운드 수신 포트가 필요 없지만, 자체 호스팅 ID/랑데부 서버와 릴레이 서버는 문서에 나온 서비스 포트로 인바운드 트래픽을 받아야 합니다. 이 NAT 통과 방식 덕분에 RustDesk는 원격 접속과 여러 OS가 섞인 환경에서 실용적인 [업무용 무료 원격 데스크톱 선택지](/ko/blog/best-free-remote-desktop-software-ko)가 됩니다.

## 암호화: 기본 제공 vs 구현체에 따라 다름

VNC 보안은 구현체마다 다릅니다. [TigerVNC는 TLS와 X509 보안 유형을 지원](https://tigervnc.org/doc/vncviewer.html)하는 반면, [TightVNC는 세션 트래픽이 암호화되지 않는다고 경고하며 신뢰할 수 없는 네트워크에서는 SSH 터널링을 권장합니다](https://www.tightvnc.com/faq.php). VNC 세션이 암호화되는지는 실제로 쓰는 서버, 뷰어, 설정한 보안 유형이 결정합니다.

RustDesk는 협상된 경로가 직접 연결이든 릴레이든 **종단 간 암호화되는 ID 중개 세션**을 지원합니다. 자체 호스팅 환경의 클라이언트에는 [올바른 서버 공개 키](https://rustdesk.com/docs/ko/self-host/client-configuration/)가 필요합니다. ID 대신 IP 주소를 입력하는 **직접 IP 액세스**는 [암호화되지 않는](https://github.com/rustdesk/rustdesk/wiki/FAQ#i-only-use-rustdesk-for-a-few-devices-on-my-local-network-with-no-internet-connectivity-can-i-still-use-rustdesk-with-direct-ip-access) 별도 모드이므로, 이 경로는 VPN으로 보호하세요.

## RustDesk와 VNC 한눈에 비교하기

|                   | RustDesk                                                                  | VNC (RFB)                                                                               |
| ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 정체              | 앱 하나 + 랑데부/릴레이 서버                                              | RFB 프로토콜, 다양한 구현체                                                             |
| 소스 코드         | 클라이언트와 Server OSS: AGPL, Server Pro: 독점                           | 혼합: GPL/오픈(TigerVNC, TightVNC), 독점(RealVNC)                                       |
| 크로스플랫폼      | Windows, macOS, Linux, Android, iOS(제어 전용)                            | Raspberry Pi를 포함해 매우 폭넓음                                                       |
| NAT 통과          | 랑데부와 릴레이 기본 내장                                                 | 기본 RFB에는 없음. 제품별 중개 서비스나 VPN/SSH 경로로 접속 가능                        |
| 암호화            | 올바른 키 설정 시 ID 중개 세션 암호화. 직접 IP 액세스는 암호화되지 않음   | 구현체에 따라 다름. TigerVNC는 TLS/X509, RealVNC는 AES, TightVNC는 SSH 권장             |
| 영상 전송         | VP8/VP9/AV1, 선택적 하드웨어 H.264/H.265                                  | 구현체마다 RFB 인코딩이 다름. 압축 이미지나 비디오 경로를 쓸 수 있는 경우도 있음         |
| 자체 호스팅       | 가능 — 자체 ID/릴레이 서버                                                | 오픈 구현체는 가능(내장 중개 서버 없음)                                                 |
| LAN 설정          | 간단함                                                                    | 매우 간단함                                                                             |
| 표준화된 프로토콜 | RustDesk 고유 방식                                                        | 오래된 개방형 RFB 표준                                                                  |

최신 RustDesk 플랜 정보는 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하세요.

## RustDesk가 앞서는 지점

RustDesk의 설계상 이점은 LAN을 벗어나거나 여러 팀과 플랫폼에서 일관성이 필요해지는 순간 드러납니다.

- **번거로운 설정 없는 인터넷 접속.** NAT 통과와 릴레이 전환 덕분에 엔드포인트마다 포트 포워딩, VPN, SSH 터널을 둘 필요가 없습니다.
- **ID 경로의 암호화.** 클라이언트에 자체 서버의 공개 키를 설정하면 ID 기반 세션은 직접 연결이든 릴레이든 종단 간 암호화됩니다.
- **코덱 선택.** 소프트웨어 VP8, VP9, AV1에 더해, 기기가 지원하면 H.264/H.265 하드웨어 코덱도 쓸 수 있습니다.
- **공개된 클라이언트와 직접 배포할 수 있는 서버.** 클라이언트와 Server OSS를 직접 검토하고 빌드할 수 있으며, 자체 ID 서비스와 릴레이 서비스가 연결을 조정하고 릴레이 트래픽을 전달합니다.

트레이드오프도 있습니다. RustDesk를 자체 호스팅하려면 **누군가 서버를 운영해야** 합니다. 프로비저닝, TLS, 포트 관리, 지속적인 패치가 필요합니다. LAN 전용 VNC 구성은 이 과정이 전혀 필요 없습니다.

## 그렇다면 무엇을 써야 할까?

신뢰할 수 있는 LAN, 물리적으로 격리된(에어갭) 네트워크 구간, Raspberry Pi라면 VNC의 단순함과 표준화를 따라가기 어렵습니다. 인터넷 너머로 안전하게 접속해야 하거나, 암호화가 기본으로 켜져 있기를 원하거나, 도구 하나로 Windows, macOS, Linux, Android, iOS를 모두 지원해야 한다면 RustDesk의 아키텍처가 더 많은 일을 대신해 줍니다. Windows 기본 도구도 함께 검토하고 있다면 [RustDesk vs RDP](/ko/blog/rustdesk-vs-rdp-ko) 비교에서 그 갈림길도 다룹니다.

## 직접 사용해 보기

이 비교를 계기로 SSH 터널을 정리하기로 했다면 Server OSS로 시작하세요. 라이선스 비용이나 만료 없이 무료이며 NAT 통과도 포함되어 있습니다. Pro 평가 조건이 필요하면 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하세요. 최신 플랜 요금은 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인할 수 있습니다.
