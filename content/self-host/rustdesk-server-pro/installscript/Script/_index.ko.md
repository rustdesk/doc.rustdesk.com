---
title: install.sh
weight: 4
description: "라이선스를 받은 후 install.sh 스크립트를 사용하여 Linux에 RustDesk 서버 Pro를 설치하기 바랍니다. 이 방법은 Pro 서버 구성 요소의 간단한 스크립트 설정에 사용됩니다."
keywords: ["rustdesk server pro install.sh", "rustdesk pro linux install", "rustdesk pro script install", "rustdesk self-host pro linux", "rustdesk server pro setup"]
---

자신만의 서비스 설정을 처음부터 작성하지 않고 간단한 Linux 기반 RustDesk Server Pro 설치를 원할 때는 `install.sh` 방법을 사용하세요.

{{% notice note %}}
[https://rustdesk.com/pricing/](https://rustdesk.com/pricing/)에서 라이선스를 받는 것을 잊지 마세요. 더 자세한 내용은 [license](/docs/ko/self-host/rustdesk-server-pro/license/) 페이지를 확인해 주세요.

이 간단한 설치를 하기 전에 먼저 [OSS installation](/docs/ko/self-host/rustdesk-server-oss/install/)를 읽어보시기 바랍니다. 여기서 더 깊이 있는 세부 정보를 알 수 있습니다.
{{% /notice %}}

## install.sh는 언제 사용해야 하나요?

`systemd`가 있는 Linux 호스트에 RustDesk Server Pro를 가장 빠르게 배포하려면 `install.sh`를 사용하세요. 스크립트가 종속성 설치, 바이너리 배치, 서비스 생성을 수행하고, 선택적으로 웹 콘솔용 HTTPS를 준비하기를 원하는 간단한 단일 서버 설정에 가장 적합합니다.

## install.sh 빠른 답변

- `systemd`를 사용한 간단한 Linux 배포에는 이 방법을 사용하십시오.
- 더 쉬운 업그레이드, 롤백 및 컨테이너 기반 운영을 원하시면 대신 [Docker](/docs/ko/self-host/rustdesk-server-pro/installscript/docker/#docker-compose권장)를 사용하십시오.
- 시작하기 전에 Pro 라이선스를 준비해 두십시오.
- 도메인을 사용하는 경우 스크립트가 HTTPS를 위해 `nginx`와 `certbot`도 설정할 수 있습니다.
- 첫 번째 설치 후 업그레이드에는 `update.sh`를 사용하십시오.

## 설치하기

위의 명령어를 복사하여 Linux 터미널에 붙여넣어 RustDesk 서버 프로를 설치하세요.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
[the Docker image](/docs/ko/self-host/rustdesk-server-pro/installscript/docker/#docker-compose권장) 사용을 권장합니다. 솔루션 배포와 업데이트 과정이 크게 간소화됩니다. 리소스 소비량도 매우 낮습니다.

또한, 위의 명령어는 쓰기 권한이 없는 디렉터리가 아닌 홈 디렉터리에서 실행해 주세요.
{{% /notice %}}

이것이 하는 일:

- 일부 종속성 설치하기
- 사용 가능한 경우 UFW 방화벽 설정하기
- 작업 디렉터리 `/var/lib/rustdesk-server`와 로그 디렉터리 `/var/log/rustdesk-server` 생성하기
- 실행 파일을 `/usr/bin`에 설치하기
- RustDesk Pro 서비스를 다운로드하고 위 폴더에 압축 해제하기
- hbbs 및 hbbr용 systemd 서비스 생성하기(서비스 이름은 `rustdesk-hbbs.service` 및 `rustdesk-hbbr.service`)
- 도메인을 선택하면 Nginx와 Certbot이 설치되어 API가 포트 `443`(HTTP)에서 이용 가능하며, 포트 `80`를 통해 SSL 인증서를 받게 됩니다. 이 인증서는 자동으로 갱신됩니다. HTTPS가 준비되면, `https://yourdomain.com:21114` 대신 `https://yourdomain.com`로 접속해 주세요.

{{% notice note %}}
[Set up HTTPS for web console manually](/docs/ko/self-host/rustdesk-server-pro/faq/#웹-콘솔용-https-수동-설정)를 사용하는 방법.
{{% /notice %}}

{{% notice note %}}
systemd 서비스가 시작되지 않으면, 아마도 SELinux와 관련이 있을 수 있으니 [this](/docs/ko/self-host/rustdesk-server-pro/faq/#selinux)를 확인해 보세요.
{{% /notice %}}

{{% notice note %}}
클라이언트가 서버에 연결되지 않거나 웹 콘솔에 접근할 수 없는 경우, [this](/docs/ko/self-host/rustdesk-server-pro/faq/#방화벽)를 확인해 보세요.
{{% /notice %}}

## 업그레이드

위의 명령어를 복사하여 Linux 터미널에 붙여넣어 기존 RustDesk Server Pro 설치를 업그레이드하세요. 이 명령어는 로컬에 저장하여 cron으로 예약할 수도 있습니다.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
이 스크립트에서 문제가 발생하면, 스크립트를 하나씩 직접 실행해 보시기를 권장합니다.

또한 홈 디렉터리에서 위 명령어를 실행해 주세요. 쓰기 권한이 없는 디렉터리에서는 실행하지 마세요.
{{% /notice %}}

이것이 하는 일:

- RustDesk Server Pro의 새로운 버전을 확인합니다.
- 새로운 버전이 발견되면 API 파일을 제거하고 새 실행파일과 API 파일을 다운로드합니다.

## 오픈소스에서 변환하기

위의 명령어를 복사하여 Linux 터미널에 붙여넣어 RustDesk Server를 RustDesk Server Pro로 변환하세요.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
방화벽에 `21114` TCP 포트를 추가해 주세요. 이는 RustDesk 클라이언트의 웹 콘솔 및 사용자 로그인을 위한 추가 포트입니다.
{{% /notice %}}

{{% notice note %}}
이 스크립트와 관련된 문제가 발생하면 Docker 설치로 전환하는 것을 권장합니다. 또는 스크립트를 직접 살펴보고 단계별로 수동으로 실행할 수도 있습니다.
{{% /notice %}}

기능:

- 이전 서비스를 비활성화하고 제거합니다.
- 일부 종속성을 설치합니다.
- 사용 가능한 경우 UFW 방화벽을 설정합니다.
- `/var/lib/rustdesk-server` 폴더를 생성하고 여기에 인증서를 복사합니다.
- `/var/log/rustdesk`를 삭제하고 `/var/log/rustdesk-server`를 생성합니다.
- RustDesk Pro 서비스를 다운로드하여 위 폴더에 압축 해제합니다.
- hbbs 및 hbbr용 systemd 서비스를 생성합니다(서비스 이름은 rustdesk-hbbs.service 및 rustdesk-hbbr.service입니다).
- 도메인을 선택하면 Nginx와 Certbot이 설치되어 API가 포트 443(HTTP)에서 이용 가능하며, 포트 80을 통해 SSL 인증서를 받고 자동으로 갱신됩니다.