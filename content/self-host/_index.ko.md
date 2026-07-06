---
title: 셀프호스팅
description: "자신만의 RustDesk 서버를 자체 호스팅하는 방법을 알아보세요. 안전한 원격 데스크톱 접속을 위한 RustDesk 서버 인프라의 설치, 구성 및 배포를 다룬 완벽한 가이드입니다."
keywords: ["rustdesk self-host", "rustdesk server", "remote desktop server", "self-hosting guide", "rustdesk installation", "hbbs hbbr", "rustdesk pro server"]
weight: 5
pre: "<b>2. </b>"
---

RustDesk를 셀프호스팅하면 자신의 ID와 릴레이 인프라를 제어하고, 관리하는 시스템에 배포 데이터를 유지하며, 네트워크 및 규정 준수 요구사항에 맞게 원격 접속을 최적화할 수 있습니다.

지원은 OSS용 [Discord](https://discord.com/invite/nDceKgxnkV) 및 Pro용 [email](mailto:support@rustdesk.com)를 통해 제공됩니다.

## 어떤 RustDesk 서버를 선택해야 하나요?

| 옵션 | 가장 적합한 사용자 | 제공되는 내용 |
| --- | --- | --- |
| [RustDesk Server OSS](/docs/ko/self-host/rustdesk-server-oss/) | 무료 오픈소스 셀프호스팅 백엔드를 원하는 개인 및 팀 | `hbbs` 및 `hbbr`, 커뮤니티 지원, 수동 배포 및 구성 |
| [RustDesk Server Pro](/docs/ko/self-host/rustdesk-server-pro/) | 중앙 집중식 관리와 엔터프라이즈 기능이 필요한 기업 | 웹 콘솔, API, OIDC, LDAP, 2FA, 디바이스 관리, 접근 제어 및 멀티 릴레이 관리 |

## 자체 호스팅 서버는 어떻게 작동하나요?

기술적으로 두 개의 실행 파일(서버)이 있습니다:

- `hbbs` - RustDesk ID(랜드버스/신호) 서버, TCP(`21114` - Pro 전용 HTTP용, `21115`, `21116`, `21118` 웹소켓용) 및 UDP(`21116`)에서 수신 대기
- `hbbr` - RustDesk 릴레이 서버, TCP(`21117`, `21119` 웹소켓용)에서 수신 대기

설치 스크립트 / Docker 컴포즈 / deb를 통해 설치할 경우, 두 서비스가 모두 설치됩니다.

다음은 [그림](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F)으로 RustDesk 클라이언트가 `hbbr` / `hbbs`와 어떻게 통신하는지 보여줍니다.

RustDesk가 컴퓨터에서 실행되는 한, 해당 컴퓨터는 지속적으로 ID 서버(`hbbs`)에 핑을 보내 현재 IP 주소와 포트를 알려줍니다.

컴퓨터 A에서 컴퓨터 B로 연결을 시작하면, 컴퓨터 A는 ID 서버에 접속해 컴퓨터 B와의 통신을 요청합니다.

이후 ID 서버는 홀 펀칭을 사용해 A와 B를 직접 연결하려고 시도합니다.

홀 펀칭이 실패하면 A는 릴레이 서버(`hbbr`)를 통해 B와 통신합니다.

대부분의 경우 홀 펀칭은 성공하며, 릴레이 서버는 전혀 사용되지 않습니다.

다음은 [Should you self-host a rustdesk server?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)에 대한 논의입니다.

## 필요 포트

RustDesk 서버 자체 호스팅에 필요한 포트는 주로 귀하의 환경과 RustDesk로 하고자 하는 작업에 따라 달라집니다. 문서 전반에 걸쳐 표시된 예제에서는 일반적으로 모든 포트가 열리는 것이 권장됩니다.

핵심 포트: \
TCP `21114-21119` \
UDP `21116`

위의 `21115-21117`는 RustDesk가 작동하는 데 필요한 최소한의 포트이며, 이들은 신호 및 릴레이 포트와 NAT 트래버스를 처리합니다.

TCP 포트 `21118` 및 `21119`는 [RustDesk Web Client](https://rustdesk.com/web/)의 웹소켓 포트이며, HTTPS를 지원하려면 역방향 프록시가 필요합니다. 이 [sample Nginx configuration](/docs/ko/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client)를 참조하십시오.

SSL 프록시가 없는 Pro 사용자의 경우 API가 작동하려면 TCP 포트 `21114`를 열어야 하며, 대신 SSL 프록시를 사용하여 TCP 포트 `443`를 열어야 합니다.

{{% children depth="4" showhidden="true" %}}