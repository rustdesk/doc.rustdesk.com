---
title: Synology DSM 6
weight: 22
description: "Docker를 사용하여 Synology DSM 6에서 RustDesk 서버 OSS를 설치하기. 이전 Synology 시스템에서 컨테이너 설정, 포트 매핑 및 영구 데이터를 위한 DSM 6 워크플로우를 따르세요."
keywords: ["rustdesk synology dsm 6", "rustdesk synology docker", "rustdesk nas dsm 6", "rustdesk self-host synology"]
---

이 안내서를 사용하여 구형 NAS 시스템에서 Docker를 사용해 Synology DSM 6에 RustDesk 서버 OSS를 설치하세요.

> 타사에서 제공하는 최신 대체 자습서는 [here](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/)입니다.

이 자습서는 최신 DSM v6 및 v7을 기반으로 합니다.

{{% notice note %}}
DSM 7.2 업데이트 이후 Docker가 새로운 "컨테이너 관리자"로 업그레이드되었으니, 대신 [this article](/docs/ko/self-host/rustdesk-server-oss/synology/dsm-7)를 확인해 주세요.
{{% /notice %}}

## 언제 DSM 6 가이드를 사용해야 하나요?

Synology NAS가 여전히 DSM 6에 있고, 이전 버전의 Docker 패키지를 통해 RustDesk 서버 OSS를 배포하는 경우에만 이 가이드를 사용하세요. NAS가 이미 DSM 7.2에 있다면 대신 컨테이너 관리자 가이드를 사용하세요.

## DSM 6 배포 체크리스트

- NAS가 여전히 DSM 6을 실행하고 있는지 확인하세요.
- 패키지 센터에서 Synology `Docker` 패키지를 설치하세요.
- RustDesk 데이터와 키를 위한 영구적인 호스트 폴더를 생성하세요.
- 호스트 네트워킹과 자동 재시작이 활성화된 상태로 `hbbs`와 `hbbr`를 모두 실행하세요.
- 컨테이너가 시작된 후 `id_ed25519.pub`를 가져오세요.

## Docker 설치하기

| 패키지 센터 열기 | Docker 설치하기 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## RustDesk 서버 설치하기

| Docker의 레지스트리에서 rustdesk-server를 검색하고 더블클릭하여 설치하기 | 설치된 rustdesk-server 이미지, 더블클릭하여 rustdesk-server 컨테이너 생성 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## hbbs 컨테이너 생성

위에서 언급한 대로, rustdesk-server 이미지를 두 번 클릭하여 새 컨테이너를 생성하고 이름을 `hbbs`로 설정합니다.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

위의 `Advanced Settings`를 클릭하세요.

- `Enable auto-restart`를 활성화하세요.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- `Use the same network as Docker Host`를 활성화하세요. 호스트 네트에 대한 자세한 내용은 [check](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host)를 참조하십시오.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- 호스트 디렉터리를 `/root`에 마운트하고(예: `/home/rustdesk/`), hbbs는 이 디렉터리에 일부 파일(데이터베이스 및 `key` 파일)을 생성하며, 이 파일들은 재부팅 후에도 지속되어야 합니다.

| 마운트 | 호스트 디렉터리에 생성된 파일 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- 명령 설정
{{% notice note %}}
Synology의 OS는 Debian 기반으로, 호스트 네트워크(--net=host)가 잘 작동하므로 `-p` 옵션으로 포트를 매핑할 필요가 없습니다.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- 완료

## hbbr 컨테이너 생성

위의 `hbbs` 단계를 반복하되, 컨테이너 이름을 `hbbr`로 하고 명령어(설정 명령 단계용)는 `hbbr`로 지정하십시오.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## hbbr/hbbs 컨테이너

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| 컨테이너를 두 번 클릭하고 로그 확인 | 호스트 네트워크를 사용하여 hbbs/hbbr를 이중 확인 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## 키를 가져오세요

파일 스테이션을 사용하기 전에 폴더 설정으로 이동하여 `id_ed25519.pub`를 다운로드하고 텍스트 편집기로 열어 키를 통해 확인하세요.