---
title: Synology
weight: 22
description: "Synology NAS에 RustDesk 서버 OSS를 셀프호스팅하세요. DSM 6 또는 DSM 7.2 컨테이너 관리자를 위한 올바른 가이드를 선택하고, 지원되는 Synology 모델에서 Docker를 사용해 배포하세요."
keywords: ["rustdesk synology", "rustdesk nas", "rustdesk synology docker", "rustdesk dsm 7.2", "rustdesk synology container manager"]
---

이 Synology 가이드를 사용하여 DSM 6 또는 DSM 7.2 Container Manager가 실행되는 NAS에서 RustDesk Server OSS를 자체 호스팅하십시오.

Synology에는 "Docker"와 "Container Manager"의 두 가지 유형의 Docker가 있습니다. DSM 7.2 이상을 사용하는 경우 DSM 7.2용 가이드를 따르고, 이전 시스템을 사용하는 경우 DSM 6 가이드를 따르십시오.

## 어떤 Synology 가이드를 선택해야 하나요?

| Platform version | Best guide |
| --- | --- |
| DSM 7.2 and later | [Synology DSM 7.2](/docs/ko/self-host/rustdesk-server-oss/synology/dsm-7/) |
| Older Synology systems using the old Docker package | [Synology DSM 6](/docs/ko/self-host/rustdesk-server-oss/synology/dsm-6/) |

## Synology 배포 체크리스트

1. NAS가 DSM 6 또는 DSM 7.2+를 실행하는지 확인하세요.
2. 해당 DSM 버전에 맞는 Docker 또는 Container Manager 패키지를 설치하세요.
3. 해당 패키지에 맞는 RustDesk 배포 가이드를 따르세요.
4. 필요한 RustDesk 포트를 열고 컨테이너 데이터의 지속적 저장소를 확인하세요.

Portainer와 함께 Synology를 사용하는 경우, [this tutorial](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/)를 참조해 주세요.

{{% children depth="3" showhidden="true" %}}