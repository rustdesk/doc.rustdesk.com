---
title: 설치
weight: 1
description: "Docker, systemd 스크립트 또는 Debian 패키지를 사용해 RustDesk 서버 OSS를 설치하기. 서버 요구 사항, 방화벽 규칙 및 배포 후 필요한 클라이언트 구성 단계를 검토하세요."
keywords: ["rustdesk server install", "install rustdesk server oss", "rustdesk docker install", "rustdesk server firewall ports", "rustdesk hbbs hbbr install", "rustdesk self-host install"]
---

이 안내서를 사용하여 RustDesk 서버 OSS를 설치하고, 필요한 방화벽 포트를 열고, 클라이언트를 새 자체 호스팅 서버에 연결하십시오.

## RustDesk 서버 OSS를 설치하는 데 권장되는 방법은 무엇인가요?

대부분의 배포에서는 Docker가 가장 쉬운 설치 방법입니다. 이는 재현, 업그레이드 및 서버 간 이동이 가장 용이하기 때문입니다. Linux에서 기본 제공 서비스를 선호한다면 systemd 설치 스크립트나 Debian 패키지도 잘 작동할 수 있습니다.

## 어떤 설치 방법을 선택해야 하나요?

| 방법 | 가장 적합한 경우 | 사용하는 이유 |
| --- | --- | --- |
| Docker | 대부분의 자체 호스팅 배포 | 가장 간단한 업그레이드, 예측 가능한 설정 및 손쉬운 롤백 |
| 설치 스크립트 | systemd 서비스를 빠르게 원하는 Linux 관리자 | 더 적은 수작업으로 `hbbs`, `hbbr` 및 클라이언트 구성 흐름을 설정함 |
| Debian 패키지 | 패키지 도구를 사용하는 Debian 기반 시스템 | 설치를 기본 패키지 관리에 가깝게 유지함 |

## 동영상 자습서
YouTube에는 많은 동영상 자습서가 있습니다. https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## 서버 요구사항
하드웨어 요구사항은 매우 낮습니다. 기본 클라우드 서버의 최소 구성만으로 충분하며, CPU와 메모리 요구사항도 최소입니다. 라즈베리 파이와 같은 장치를 사용할 수도 있습니다. 네트워크 크기에 관해 말씀드리자면, TCP 홀 펀칭 직접 연결이 실패하면 릴레이 트래픽이 소모됩니다. 릴레이 연결의 트래픽은 해상도 설정과 화면 업데이트에 따라 초당 30K에서 3M 사이입니다(1920x1080 화면). 사무용으로만 사용한다면 트래픽은 약 100K/s 정도입니다.

## 방화벽
UFW가 설치되어 있다면 다음 명령어를 사용해 방화벽을 구성하세요:

```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

{{% notice warning %}}
WebSocket이 활성화된 경우([웹 클라이언트](https://rustdesk.com/web/)를 위해 포트 `21118`/`21119`가 열려 있는 경우), `hbbs`/`hbbr`는 WebSocket 트래픽이 리버스 프록시([WSS](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms))를 거칠 때 클라이언트의 실제 IP가 유지되도록, 수신되는 WebSocket 연결의 `X-Real-IP` / `X-Forwarded-For` 헤더를 신뢰하여 클라이언트의 실제 IP를 판단합니다. 이 헤더는 검증되지 않으므로, `21118`/`21119`에 직접 접근할 수 있는 사람은 위조된 헤더로 임의의 IP 주소를 사칭하여 IP 기반 속도 제한과 차단을 우회하고 로그에 기록되는 IP 주소를 위조할 수 있습니다.

웹 클라이언트를 사용하는 경우, `X-Real-IP`를 직접 설정하는 리버스 프록시를 통해서만 WebSocket 포트를 노출하고, 방화벽 규칙으로 `21118`/`21119`에는 리버스 프록시만 연결할 수 있도록 제한하세요. 웹 클라이언트를 사용하지 않는 경우, 포트 `21118`, `21119`를 닫아 두세요.
{{% /notice %}}

## 설치하기
### 방법 1: Docker (권장)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

더 자세한 내용은 [Docker](/docs/ko/self-host/rustdesk-server-oss/docker/)를 확인해 주세요.

### 방법 2: 간단하게 실행할 수 있는 설치 스크립트를 사용하여 자체 서버를 systemd 서비스로 설치하기
스크립트는 [Techahold](https://github.com/techahold/rustdeskinstall)에 호스팅되어 있으며, 저희 [Discord](https://discord.com/invite/nDceKgxnkV)에서 지원됩니다.

현재 스크립트는 릴레이 및 신호 서버(hbbr 및 hbbs)를 다운로드하고 설정하며, 구성 파일을 생성하고 비밀번호 보호된 웹페이지에 호스팅하여 클라이언트에 간편하게 배포합니다.

다음 명령어를 실행하세요:

```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

[Techahold's](https://github.com/techahold/rustdeskinstall) 리포지토리에도 업데이트 스크립트가 있습니다.

거기에서 설치 끝에 표시된 IP/DNS와 키를 메모해 두고 이를 각각 클라이언트 설정 > 네트워크 > ID/릴레이 서버 `ID server` 및 `Key` 필드에 삽입하세요. 다른 필드는 비워두세요(아래 노트 참조).

### 방법 3: Debian 배포판용 deb 파일을 사용하여 자체 서버를 systemd 서비스로 설치하기

[Download](https://github.com/rustdesk/rustdesk-server/releases/latest) deb 파일을 직접 다운로드하여 `apt-get -f install <filename>.deb` 또는 `dpkg -i <filename>.deb`로 설치해 주세요.

## 서버 설치 후 클라이언트는 무엇이 필요합니까?

서버가 실행된 후, 클라이언트는 보통 `ID Server` 주소와 서버 공개 `Key`를 필요로 합니다. RustDesk Server Pro 클라이언트를 구성하는 경우, `API Server`도 필요할 수 있습니다. [this](/docs/ko/self-host/client-configuration/#2-수동-구성)를 확인해 주세요.