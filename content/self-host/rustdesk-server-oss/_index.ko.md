---
title: RustDesk 서버 OSS
description: "무료이고 오픈소스인 자체 호스팅 백엔드를 사용해 나만의 RustDesk 서버 OSS 배포를 실행하세요. 무엇이 포함되어 있는지, 언제 OSS를 선택해야 하는지, 그리고 RustDesk ID 및 릴레이 서비스를 설치하는 방법에 대해 알아보세요."
keywords: ["rustdesk server oss", "rustdesk open source server", "self-hosted rustdesk server", "rustdesk hbbs", "rustdesk hbbr", "rustdesk docker", "rustdesk server install", "rustdesk relay server", "rustdesk id server", "rustdesk community self-hosting"]
weight: 100
pre: "<b>2.1. </b>"
---

RustDesk Server OSS는 RustDesk용 무료 및 오픈소스 자체 호스팅 백엔드입니다. 이를 통해 자체 ID 및 릴레이 서비스를 실행하고, 제어하는 인프라 내에서 원격 접속 트래픽을 유지하며, 자신의 클라우드 또는 온프레미스 환경에 RustDesk를 배포할 수 있습니다.

핵심 자체 호스팅 기능을 원하고 배포, 네트워킹 및 업그레이드를 직접 관리하는 데 익숙한 경우 RustDesk Server OSS를 사용하세요. 웹 콘솔, API 접근, OIDC, LDAP, 2FA, 디바이스 관리 또는 기타 중앙 집중식 관리 기능이 필요하다면 [RustDesk Server Pro](/docs/ko/self-host/rustdesk-server-pro/)와 비교해 보세요.

## RustDesk Server OSS에는 무엇이 포함되나요?

- RustDesk ID, 렌더베스, 신호 전달을 위한 `hbbs`.
- 직접 피어투피어 연결이 불가능한 경우 릴레이 트래픽을 처리하기 위한 `hbbr`.
- 문서 및 [Discord](https://discord.com/invite/nDceKgxnkV)를 통한 커뮤니티 지원과 배포 안내.

## RustDesk Server OSS 시작하기

- 표준 배포 경로는 [Installation](/docs/ko/self-host/rustdesk-server-oss/install/) 가이드를 참고하세요.
- 컨테이너 기반 설정을 원하시면 [Docker](/docs/ko/self-host/rustdesk-server-oss/docker/) 가이드를 사용하세요.
- Windows 호스트용은 [Windows & PM2 or NSSM](/docs/ko/self-host/rustdesk-server-oss/windows/)를 사용하세요.
- NAS 배포용은 [Synology](/docs/ko/self-host/rustdesk-server-oss/synology/) 가이드를 사용하세요.

{{% notice note %}}
집이나 사무실에서 자체 서버를 구축하고 공개 IP/도메인을 통해 연결할 수 없는 경우, [this article](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/)를 확인해 주세요.
{{% /notice %}}

{{% children depth="3" showhidden="true" %}}