---
title: 설치
weight: 2
description: "Docker, Linux 설치 스크립트 또는 이전 Windows 방법을 사용해 RustDesk 서버 Pro를 설치하기. 여기에서 시작하여 환경에 맞는 올바른 배포 경로를 선택하세요."
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

환경에 가장 적합한 RustDesk Server Pro 설치 방법을 선택하려면 여기에서 시작하세요. 권장 옵션은 Docker입니다.

## RustDesk Server Pro를 설치하는 가장 좋은 방법은 무엇인가요?

대부분의 팀에서는 Docker가 RustDesk Server Pro를 설치하는 가장 좋은 방법입니다. 업데이트가 간편하고 배포 과정이 재현하기 쉽기 때문입니다. `install.sh` 경로는 Linux에서 네이티브 systemd 서비스를 원할 때 유용합니다. 이미 RustDesk 서버를 운영 중이고 Pro로 계속 이동하고자 한다면 OSS에서 변환하는 것이 적합한 경로입니다.

## 시작하기 전에 무엇이 필요하나요?

- RustDesk Server Pro 라이선스
- Linux 서버 또는 VM, 또는 이미 Docker가 설치된 호스트
- 방화벽에서 필요한 RustDesk 포트가 열려 있어야 하며, 웹 콘솔과 API가 필요하다면 `21114` 또는 `443`도 열려 있어야 합니다.
- 도메인에 HTTPS를 적용하려면 선택적 DNS 이름이 필요합니다.

## 어떤 설치 방법을 선택해야 하나요?

| 방법 | 최적의 사용처 | 사용하는 이유 |
| --- | --- | --- |
| Docker | 대부분의 새로운 Pro 배포 | 가장 쉬운 업그레이드, 간편한 롤백 및 일관된 설정 |
| `install.sh` | 기본 서비스를 원하는 Linux 관리자 | systemd 서비스를 생성하고 선택적으로 Nginx와 Certbot을 설정할 수 있음 |
| 오픈소스에서 변환 | 기존 OSS 배포 | 기존 RustDesk 서버 설치를 제로부터 시작하지 않고 Pro로 이동함 |

## 방법 1: Docker (권장)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

자세한 내용은 [Docker](/docs/ko/self-host/rustdesk-server-pro/installscript/docker/)를 확인하십시오.

## 방법 2: install.sh

Linux에 능숙하다면 아래 스크립트를 사용하십시오. 그렇지 않으면 실패할 경우 심각한 문제가 발생할 수 있으며, 왜 작동하지 않는지 파악하기 어려울 수 있습니다.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

자세한 내용은 [install.sh](/docs/ko/self-host/rustdesk-server-pro/installscript/script/)를 확인하십시오.

## 오픈소스에서 변환하기

### Docker
Docker를 사용해 오픈소스 버전을 설치한 경우, 이를 직접 변환할 수 있는 방법은 없습니다. 대신 Pro 이미지로 새 컨테이너를 실행해야 합니다. 이를 수행하기 전에 개인 키(파일명 `id_ed25519`, `id_ed25519.pub`가 아님)를 백업해 두십시오. 새 컨테이너가 설정되면 기존의 `id_ed25519` 개인 키 파일을 새 컨테이너의 작업 디렉터리로 복사한 다음, 컨테이너를 다시 시작하십시오.

### install.sh
install.sh를 사용해 오픈소스 버전을 설치한 경우, [this](/docs/ko/self-host/rustdesk-server-pro/installscript/script/#오픈소스에서-변환하기)를 따르십시오.