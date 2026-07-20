---
title: Docker
weight: 7
description: "Docker, Docker Compose 또는 Podman을 사용하여 RustDesk 서버 OSS를 셀프호스팅하십시오. 필요한 포트, 호스트 네트워킹 참고사항 및 hbbs 및 hbbr에 대한 샘플 컨테이너 정의를 검토하십시오."
keywords: ["rustdesk docker", "rustdesk docker compose", "rustdesk server docker", "rustdesk hbbs hbbr docker", "rustdesk podman", "rustdesk self-host docker"]
---

이 안내서를 사용하여 Docker, Docker Compose 또는 Podman을 통해 RustDesk Server OSS를 자체 호스팅하고 `hbbs` 및 `hbbr`에 대한 올바른 포트를 열어보세요.

## Docker에서 RustDesk Server OSS를 실행하는 가장 좋은 방법은 무엇인가요?

대부분의 Linux 배포에서는 `network_mode: "host"`와 함께 Docker Compose를 사용하는 것이 가장 간단하고 신뢰할 수 있는 옵션입니다. 이 방법은 설정을 반복 가능하게 유지하고 업그레이드를 쉽게 만들어 주며, 호스트 네트워킹이 가능할 경우 추가적인 포트 매핑 복잡성을 피할 수 있습니다.

## Docker 배포 체크리스트

1. Docker 또는 Podman을 설치하기.
2. `hbbs` 및 `hbbr`용 지속적 데이터 디렉터리 또는 볼륨 생성하기.
3. 방화벽에서 필요한 RustDesk 포트를 열기.
4. Docker Compose, `docker run` 또는 Podman Quadlet을 사용해 `hbbs` 및 `hbbr` 시작하기.
5. 클라이언트를 새 자체 호스팅 서버로 지정하고 등록 및 릴레이 트래픽을 확인하기.

## 어떤 컨테이너 설정을 선택해야 하나요?

| 방법 | 최적의 사용처 | 사용하는 이유 |
| --- | --- | --- |
| Docker Compose | 대부분의 Linux 서버 | 반복 가능한 설정 및 보다 쉬운 지속적인 유지보수 |
| `docker run` | 빠른 수동 테스트 | 간단한 컨테이너 쌍을 시작하는 가장 빠른 방법 |
| Podman Quadlet | Podman 플러스 systemd 환경 | 네이티브 systemd 스타일 서비스 관리 |

> 여기 또 다른 좋은 튜토리얼이 있습니다: [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Docker를 사용해 자체 서버 설치하기

### 요구사항
Docker/Podman이 설치되어 있어야만 rustdesk-server를 Docker 컨테이너로 실행할 수 있습니다. 의심스러운 경우, 이 [guide](https://docs.docker.com/engine/install)를 통해 Docker를 설치하여 최신 버전인지 확인하세요!

방화벽에서 다음 포트를 반드시 열어주세요:
- `hbbs`:
  - `21114` (TCP): 웹 콘솔용으로 사용되며, `Pro` 버전에서만 사용 가능합니다.
  - `21115` (TCP): NAT 유형 테스트에 사용됩니다.
  - `21116` (TCP/UDP): **`21116`는 TCP와 UDP 모두 활성화되어야 함을 참고해 주세요.** `21116/UDP`는 ID 등록 및 핑 서비스에 사용됩니다. `21116/TCP`는 TCP 홀 펀칭 및 연결 서비스에 사용됩니다.
  - `21118` (TCP): 웹 클라이언트 지원에 사용됩니다.
- `hbbr`:
  - `21117` (TCP): 릴레이 서비스에 사용됩니다.
  - `21119` (TCP): 웹 클라이언트 지원에 사용됩니다.

*웹 클라이언트 지원이 필요하지 않은 경우, 해당 포트 `21118`, `21119`를 비활성화할 수 있습니다.*

{{% notice warning %}}
WebSocket이 활성화된 경우([웹 클라이언트](https://rustdesk.com/web/)를 위해 포트 `21118`/`21119`가 열려 있는 경우), `hbbs`/`hbbr`는 WebSocket 트래픽이 리버스 프록시([WSS](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms))를 거칠 때 클라이언트의 실제 IP가 유지되도록, 수신되는 WebSocket 연결의 `X-Real-IP` / `X-Forwarded-For` 헤더를 신뢰하여 클라이언트의 실제 IP를 판단합니다. 이 헤더는 검증되지 않으므로, `21118`/`21119`에 직접 접근할 수 있는 사람은 위조된 헤더로 임의의 IP 주소를 사칭하여 IP 기반 속도 제한과 차단을 우회하고 로그에 기록되는 IP 주소를 위조할 수 있습니다.

웹 클라이언트를 사용하는 경우, `X-Real-IP`를 직접 설정하는 리버스 프록시를 통해서만 WebSocket 포트를 노출하고, 방화벽 규칙으로 `21118`/`21119`에는 리버스 프록시만 연결할 수 있도록 제한하세요. 웹 클라이언트를 사용하지 않는 경우, 포트 `21118`, `21119`를 닫아 두세요.
{{% /notice %}}

### Docker 예제

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```

<a name="net-host"></a>

{{% notice note %}}
`--net=host`는 오직 **Linux**에서만 작동하며, 이로 인해 `hbbs`/`hbbr`는 컨테이너 IP(172.17.0.1)가 아닌 실제 수신 IP 주소를 볼 수 있습니다.
`--net=host`가 잘 작동한다면 `-p` 옵션은 사용되지 않습니다. Windows에서는 `sudo`와 `--net=host`를 생략하세요.

**플랫폼에서 연결 문제가 발생하는 경우 `--net=host`를 제거해 주세요.**
{{% /notice %}}

{{% notice note %}}
`-td`로 로그를 볼 수 없는 경우, `docker logs hbbs`를 통해 로그를 볼 수 있습니다. 또는 `-it`로 실행할 수 있으며, `hbbs/hbbr`는 데몬 모드로 실행되지 않습니다.
{{% /notice %}}

### Docker Compose 예제
여기서 설명한 대로 `compose.yml`와 함께 Docker 파일을 실행하려면 [Docker Compose](https://docs.docker.com/compose/)가 설치되어 있어야 합니다.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

config 변경이 필요한 경우, 예를 들어 ALWAYS_USE_RELAY=Y를 설정하려면 docker-compose.yml의 환경을 사용할 수 있습니다.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    environment:
      - ALWAYS_USE_RELAY=Y
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

### Podman Quadlet 예제

Podman을 systemd 서비스로 사용하여 컨테이너를 실행하고 싶다면 다음의 Podman Quadlet 구성 샘플을 사용할 수 있습니다:

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

또는

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```