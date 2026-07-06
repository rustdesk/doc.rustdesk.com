---
title: RustDesk 서버 프로
description: "RustDesk Server Pro의 완벽한 가이드 - 프리미엄 자체 호스팅 원격 데스크톱 솔루션입니다. 엔터프라이즈 인증(OIDC, LDAP, 2FA), 웹 콘솔, API 액세스 및 전문적인 배포를 위한 고급 보안 제어 기능을 제공합니다."
keywords: ["rustdesk server pro", "rustdesk pro server", "remote desktop server", "enterprise remote access", "rustdesk professional", "self-hosted rdp", "rustdesk enterprise", "remote desktop solution", "rustdesk licensing", "rustdesk web console"]
aliases:
  - /en/self-host/pro/
  - /self-host/pro/
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro는 중앙 집중식 관리, 신원 통합 및 RustDesk 서버 코어를 기반으로 한 고급 제어 기능이 필요한 팀을 위한 상용 자체 호스팅 배포 옵션입니다.

## RustDesk Server Pro 빠른 답변

- 중앙 집중식 관리 기능, 신원 통합 또는 정책 제어가 필요할 때 Pro를 선택하세요.
- 가장 빠르고 쉬운 배포를 위해 [Docker](/docs/ko/self-host/rustdesk-server-pro/installscript/docker/)로 시작하세요.
- `systemd`와 스크립트된 Linux 설정을 원한다면 [install.sh](/docs/ko/self-host/rustdesk-server-pro/installscript/script/)를 사용하세요.
- [Windows install path](/docs/ko/self-host/rustdesk-server-pro/installscript/windows/)는 이전 버전으로 간주하세요.
- 서버가 시작된 직후 HTTPS, 라이선스 및 클라이언트 구성에 대해 계획을 세우세요.

## RustDesk Server Pro를 선택하는 경우

RustDesk Server OSS만으로 부족하고 다음이 필요할 때 RustDesk Server Pro를 선택하세요:

- 계정
- [Web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- 주소록
- 로그 관리(연결, 파일 전송, 알람 등)
- 디바이스 관리
- [Security Settings sync](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Access control](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Multiple relay servers](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)(가장 가까운 릴레이를 자동으로 선택함)
- [Custom client generator](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- 웹소켓
- 웹 클라이언트 자체 호스팅

{{% notice note %}}
집이나 사무실에서 자체 서버를 구축하고 공개 IP/도메인을 통해 연결할 수 없는 경우, [this article](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/)를 확인해 주세요.
{{% /notice %}}

{{% notice note %}}
계속하기 전에 먼저 이 내용을 읽어보시는 것을 권장합니다, [How does self-hosted server work?](/docs/ko/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## 하드웨어 요구사항

가장 낮은 수준의 VPS만으로도 사용 사례에 충분합니다. 서버 소프트웨어는 CPU와 메모리 집약적이지 않습니다. 2코어/4GB Vultr 서버에 호스팅된 당사의 공개 ID 서버는 100만 개 이상의 엔드포인트를 지원합니다. 각 릴레이 연결은 초당 평균 180kb를 소비합니다. 1개의 CPU 코어와 1G RAM만으로도 1000개의 릴레이 동시 연결을 지원할 수 있습니다.

## 기사 튜토리얼
[Step-by-Step Guide: Self-Host RustDesk Server Pro on Cloud via Docker for Secure Remote Access](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## 동영상 튜토리얼

[Beginner's Guide: Self-Host RustDesk Server Pro for Novice Linux User](https://www.youtube.com/watch?v=MclmfYR3frk)

[Quick Guide: Self-Host RustDesk Server Pro for Adavanced Linux User](https://youtu.be/gMKFEziajmo)

## 라이선스

라이선스는 https://rustdesk.com/pricing.html에서 받을 수 있으며, 자세한 내용은 [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) 페이지를 확인하십시오.

## 시작하기
### 1. 설치

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

자세한 내용은 [Docker](/docs/ko/self-host/rustdesk-server-pro/installscript/docker/)를 확인하십시오.

### 2. 필요한 포트

`21114`-`21119` TCP 및 `21116` UDP 포트를 열어야 하며, 방화벽 규칙과 Docker 포트 매핑을 설정할 때 이들 포트가 정확히 설정되었는지 확인하십시오.

이 포트에 대한 자세한 정보는 [here](/docs/ko/self-host/rustdesk-server-oss/install/#ports)를 확인하십시오.

### 3. 라이선스 설정

`http://<server ip>:21114`, [log in](/docs/ko/self-host/rustdesk-server-pro/console/#log-in)에 기본 자격 증명 admin/test1234를 사용해 웹 콘솔을 엽니다. `admin`/`test1234`도 동일합니다. [this guide](/docs/ko/self-host/rustdesk-server-pro/license/#set-license)를 따라 라이선스를 설정하십시오.

### 4. 웹 콘솔용 HTTPS 설정

> 체험 기간 동안 HTTPS를 사용하지 않으려면 이 단계를 건너뛸 수 있지만, HTTPS를 설정한 후 클라이언트의 API 주소를 변경하는 것을 잊지 마세요.

다음은 [manual HTTPS setup](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)에 대한 간단한 자습서입니다.

### 5. 자체 호스팅 서버를 사용하도록 클라이언트 구성하기

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. WebSocket 설정하기

웹 클라이언트나 [desktop / mobile client](/docs/ko/self-host/client-configuration/advanced-settings/#allow-websocket)가 WebSocket을 통해 제대로 작동하려면 리버스 프록시 구성에 다음 설정을 추가해야 합니다.

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

## 서버 업그레이드

이 [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade)는 낮은 버전에서 RustDesk Server Pro로 업그레이드하는 방법을 다루며, 다양한 설치 방식을 설명합니다.

## 새 호스트로 이전 및 백업/복원

다음은 상세한 [tutorial](https://github.com/rustdesk/rustdesk-server-pro/discussions/184)입니다.

## 라이선스 이전

이 [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration)를 따르십시오.

## 라이선스 업그레이드

[this guide](/docs/ko/self-host/rustdesk-server-pro/license/#renewupgrade-license)를 따라 언제든지 더 많은 사용자와 장치를 위한 라이선스를 업그레이드하십시오.

## 보안 정보

https://github.com/rustdesk/rustdesk/discussions/9835