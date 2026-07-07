---
title: Synology DSM 7.2
weight: 20
description: "Container Manager를 사용하여 Synology DSM 7.2에 RustDesk 서버 OSS를 설치하기. 최신 Synology Docker 워크플로우, 지원 모델 참고사항 및 컨테이너 설정 단계를 따르세요."
keywords: ["rustdesk synology dsm 7.2", "rustdesk container manager", "rustdesk synology nas", "rustdesk synology docker", "rustdesk self-host synology"]
---

<!-- 번역가용: "버튼"과 같은 요소를 번역할 때는 단순히 번역하지 말고, 해당 인터페이스의 실제 명칭을 참고해 주세요. -->
이 안내서를 사용하여 Synology DSM 7.2에서 Container Manager와 함께 RustDesk Server OSS를 설치하세요.

DSM 7.2 업데이트 이후 Synology는 기존의 'Docker' 패키지를 'Container Manager'로 이름을 변경했습니다. 이는 새로운 GUI를 제공하며, GUI 내에 'docker-compose'가 포함되어 있어 Docker를 보다 쉽게 생성할 수 있게 해줍니다.

## 언제 DSM 7.2 가이드를 사용해야 하나요?

Synology NAS가 DSM 7.2를 실행하고 있으며 Synology Container Manager를 통해 RustDesk 서버를 배포하려는 경우 이 가이드를 사용하세요. 이는 현재 Synology의 권장 방식이며, 이전 DSM 6 Docker 워크플로우보다 유지보수가 더 용이합니다.

## DSM 7.2 배포 체크리스트

- NAS 모델이 Container Manager를 지원하는지 확인하세요.
- 패키지 센터에서 `Container Manager`를 설치하세요.
- RustDesk 데이터를 위한 영구 공유 폴더를 생성하세요.
- `hbbs`와 `hbbr`를 하나의 compose 프로젝트에 배포하세요.
- `id_ed25519.pub`를 가져오고 클라이언트를 구성하세요.
- 라우터에서 필요한 RustDesk 포트를 포워딩하세요.

## 지원되는 모델 및 요구사항

컨테이너 관리자는 J 시리즈와 같은 일부 저가형 모델에 대한 ARM64 지원을 제공합니다. 지원되는 모델의 자세한 목록은 [Synology website](https://www.synology.com/en-us/dsm/packages/ContainerManager)를 확인하십시오.
대부분의 경우 Docker와 RustDesk 서버를 설치하기 위해 추가 RAM을 설치할 필요가 없습니다.

## 1. 컨테이너 관리자(Docker) 설치하기

"패키지 센터"를 열고, "컨테이너 관리자"를 검색하여 설치하세요.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. 폴더 만들기

"컨테이너 관리자"를 설치한 후, `docker`라는 공유 폴더가 생성됩니다. 여기에 우리 서버의 데이터를 저장합시다.

파일 스테이션을 열고 `rustdesk-server`(또는 원하는 이름)이라는 폴더를 만드세요. 그런 다음 그 안에 그림과 같이 `data`라는 폴더를 생성하세요.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. 컨테이너 생성

컨테이너 관리자를 열고 프로젝트로 이동한 후 생성을 클릭하세요.

프로젝트 이름을 `rustdesk-server`로 입력하고 소스를 "업로드 compose.yml"에서 "compose.yml 생성"으로 변경한 뒤, 다음 내용을 상자에 복사하세요.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Please change this to rustdesk/rustdesk-server-pro:latest if you want to install Pro.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Please change this to rustdesk/rustdesk-server-pro:latest if you want to install Pro.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Because using docker host mode
# Just in case you forgot the ports:
# 21114 TCP for web console, only available in Pro version
# 21115 TCP for NAT type test
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/ID server
# 21117 TCP relay
```

`Web portal settings`를 건너뛰기 후 완료하십시오.

## 4. 작동하는지 확인하세요

파일 스테이션을 열면 `docker/rustdesk-server/data` 폴더에 `id_ed25519`, `id_ed25519.pub`가 표시됩니다. 이를 다운로드한 후 어떤 텍스트 편집기에서든 열거나 [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor)를 사용할 수 있습니다. 이는 RustDesk 클라이언트에 필요한 공개 키입니다.

공개 키는 다음과 같이 보입니다:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

클라이언트를 설정하려면 [here](/docs/ko/client)를 확인하세요. `ID server`와 `Key`만 필요합니다. `Relay server`는 필요하지 않습니다. 왜냐하면 이미 `hbbs`에 설정해 놓았기 때문입니다. `hbbs`는 이 정보를 자동으로 제공합니다.

## 5. 라우터에서 포트 포워딩 설정하기

라우터의 관리자 웹페이지로 이동하여 `Port forwarding`와 관련된 항목을 찾으세요. `WAN` 또는 `Firewall` 설정에 나타나야 합니다.

아직 설정을 찾지 못했다면, Google에서 `{Router brand} + port forwarding` 또는 `{Router model} + port forwarding`를 검색해보세요. 이 장치가 ISP에서 제공한 것이라면 해당 업체에 문의하세요.

다음과 같은 필수 포트를 열어주세요:
  * 웹 콘솔용 `21114` TCP, 프로 버전에서만 사용 가능
  * NAT 유형 테스트용 `21115` TCP
  * TCP 홀 펀칭용 `21116` TCP
  * 심장 박동/ID 서버용 `21116` UDP
  * 릴레이용 `21117` TCP