---
title: MSI
weight: 49
description: "Windows에서 MSI 패키지와 명령줄 매개변수를 사용해 RustDesk를 설치하기. msiexec를 통해 설치 폴더, 바로가기, 프린터 지원 및 업그레이드 옵션을 설정하는 방법을 알아보세요."
keywords: ["rustdesk msi", "rustdesk silent install", "rustdesk msiexec", "rustdesk windows msi", "rustdesk installfolder", "rustdesk printer install"]
---

`msiexec` 및 설치 매개변수를 사용하여 Windows의 무음 배포가 필요한 경우 RustDesk MSI 패키지를 사용하십시오.

MSI 패키지는 무음 설치를 위한 명령줄 매개변수를 지원합니다.

## MSI 패키지를 언제 사용해야 하나요?

`msiexec`, 관리형 패키징 도구 또는 무음 설치 워크플로우를 통해 표준 Windows 소프트웨어 배포가 필요한 경우 MSI 패키지를 사용하십시오. 이미 MSI 기반 롤아웃 및 업그레이드 프로세스를 사용하고 있는 기업 환경에 가장 적합합니다.

## MSI 빠른 답변

- MSI는 Windows의 무음 배포에 최적입니다.
- 매개변수를 통해 설치 경로, 바로가기 동작 및 프린터 설치를 설정할 수 있습니다.
- 업그레이드 시 이전 설치 설정을 재사용할 수 있습니다.
- `2024-08-05` 이전 버전은 무음 설치 및 복구 문제를 겪을 수 있습니다.
- 상세한 설치 로그가 필요한 경우 `/l*v install.log`를 사용하십시오.

## 매개변수

## INSTALLFOLDER

설치 폴더입니다.

**기본값**: `[ProgramFiles6432Folder]\[app name]`, 보통 `C:\Program Files\[app name]`입니다.

## CREATESTARTMENUSHORTCUTS

시작 메뉴 바로가기를 생성할지 여부입니다.

**기본값**:
1. 설치하기. 기본값은 `1`입니다.
2. 업그레이드. 마지막으로 설치된 옵션을 기본값으로 합니다.

| 번호 | 값 | 설명 |
| :---: | :---: | :---: |
| 1 | `1` | 예 |
| 2 | `0` | 아니요 |
| 3 | `Y` | 예, `1`와 동일 |
| 4 | `N` | 아니요, `0`와 동일 |

## CREATEDESKTOPSHORTCUTS

데스크톱 바로가기를 생성할지 여부입니다.

**기본값**:
1. 설치하기. 기본값은 `1`입니다.
2. 업그레이드. 기본값은 마지막으로 설치된 옵션입니다.

| 번호 | 값 | 설명 |
| :---: | :---: | :---: |
| 1 | `1` | 예 |
| 2 | `0` | 아니요 |
| 3 | `Y` | 예, `1`와 동일 |
| 4 | `N` | 아니요, `0`와 동일 |

## 설치프린터

프린터를 설치할지 여부입니다. 프린터는 제어되는 측의 인쇄 작업을 로컬에서 실행하는 데 사용됩니다.

버전 `1.3.9`부터.

**기본값**:
1. 설치하기. 기본값은 `1`입니다.
2. 업그레이드하기. 기본값은 마지막으로 설치된 옵션입니다.

| 번호 | 값 | 설명 |
| :---: | :---: | :---: |
| 1 | `1` | 예 |
| 2 | `0` | 아니요 |
| 3 | `Y` | 예, `1`와 동일 |
| 4 | `N` | 아니요, `0`와 동일 |

# 예제

**주의**: `2024-08-05` 이전 버전의 경우, 무인 설치 및 무인 복구에 문제가 있습니다. 먼저 설치 제거한 후 설치해 주세요.

## 설치 매개변수를 사용한 설치

무인 설치, 설치 경로 설정, 데스크탑 바로가기 생성 안 함, 시작 메뉴 바로가기 생성.

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="D:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="Y" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```

**노트**: `/l*v install.log`는 실행 로그를 `install.log`에 출력하는 것을 의미합니다.

## 매개변수 없이 업그레이드

이전 설치 경로와 설치 옵션을 사용하여 업그레이드하십시오.

```
msiexec /i RustDesk-2.msi /qn /l*v install.log
```

## 업그레이드, 설치 옵션 수정

```
msiexec /i RustDesk-1.msi /qn INSTALLFOLDER="C:\Program Files\RustDesk" CREATESTARTMENUSHORTCUTS="N" CREATEDESKTOPSHORTCUTS="N" INSTALLPRINTER="N" /l*v install.log
```