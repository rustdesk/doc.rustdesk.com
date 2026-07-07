---
title: 빌드
weight: 1
description: "소스에서 RustDesk를 빌드하고 패키지하십시오. 지원되는 데스크톱 플랫폼 전반에 걸친 기여자 지향 빌드 안내는 여기에서 시작하십시오."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

설치
플랫폼
버전

이 빌드 가이드는 데스크톱 플랫폼용 RustDesk를 소스에서 컴파일하거나 패키징하려는 경우에 사용하세요. 데스크톱 버전의 패키징은 [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py)를 확인해주세요.

## 빌드 섹션에서는 무엇을 다루나요?

빌드 섹션에서는 Linux, Windows 및 macOS용 데스크톱 기여자 설정을 다룹니다. 플랫폼별 가이드를 이용해 의존성 설치, `vcpkg` 설정, Rust 툴체인 준비 및 최종 빌드 또는 패키징 명령을 수행하세요.

## 어떤 빌드 가이드를 선택해야 하나요?

| 플랫폼 | 가이드 |
| --- | --- |
| Linux | [Linux](/docs/ko/dev/build/linux/) |
| Windows | [Windows](/docs/ko/dev/build/windows/) |
| macOS | [macOS](/docs/ko/dev/build/osx/) |
| Windows 문제 해결 | [FAQ for Windows](/docs/ko/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}