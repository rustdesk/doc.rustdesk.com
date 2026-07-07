---
title: 맥
description: "macOS에 RustDesk를 설치하고 원격 제어에 필요한 권한을 구성하세요. 앱 허용 방법, 접근성 활성화 방법 및 화면 녹화 접근 권한 부여 방법을 알아보세요."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
weight: 3
---

맥OS 가이드를 사용하여 RustDesk를 설치하고, 앱이 실행되도록 허용하며, 화면 캡처와 입력 제어에 필요한 권한을 부여하십시오.

## macOS에서 RustDesk는 무엇이 필요합니까?

macOS에서 RustDesk는 앱 설치 자체 이상의 추가 작업이 필요합니다. 다른 Mac을 올바르게 제어하려면 일반적으로 앱을 `Applications`로 이동하고, 실행을 허용한 다음, `Accessibility`, `Screen Recording`, 경우에 따라 `Input Monitoring` 권한을 부여해야 합니다.

## macOS 빠른 답변

- `.dmg`에서 `Applications`로 RustDesk를 설치하기.
- Gatekeeper가 차단하는 경우 macOS 보안 설정에서 앱을 허용하세요.
- 원격 제어를 위해 `Accessibility`와 `Screen Recording`를 부여하세요.
- 키보드 또는 마우스 입력이 여전히 작동하지 않는 경우 `Input Monitoring`를 부여하세요.
- 권한 재설정이 즉시 적용되지 않으면 재부팅하세요.

## 설치

.dmg 파일을 열고 아래와 같이 `RustDesk`를 `Applications`로 드래그하세요.

![](/docs/en/client/mac/images/dmg.png)

실행 중인 모든 RustDesk를 종료했는지 확인하세요. 또한 트레이에 표시된 RustDesk 서비스도 종료했는지 확인하세요.

![](/docs/en/client/mac/images/tray.png)

## RustDesk 실행 허용

| 변경 해제 | `App Store and identified developers` 클릭 |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## 어떤 macOS 권한이 중요합니까?

| 권한 | 왜 중요한가요? |
| --- | --- |
| 접근성 | RustDesk가 키보드 및 마우스 입력을 제어할 수 있도록 합니다 |
| 녹화 | RustDesk가 로컬 디스플레이를 캡처하도록 합니다 |
| 입력 모니터링 | 최신 macOS 버전에서는 로컬 입력 캡처가 여전히 실패하는 경우 필요합니다 |

## 권한 활성화

{{% notice note %}}
macOS 보안 정책 변경으로 인해 로컬 측에서 입력을 캡처하는 당사의 API가 더 이상 작동하지 않습니다. 로컬 Mac 측에서 '입력 모니터링' 권한을 활성화해야 합니다.
이를 따르십시오
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

버전 1.2.4에서는 툴바의 키보드 아이콘을 클릭하여 확인할 수 있는 `Input source 2`를 사용해 볼 수 있습니다.
{{% /notice %}}

화면을 캡처하려면 RustDesk에 **접근성** 권한과 **화면 녹화** 권한을 부여해야 합니다. RustDesk가 설정 창으로 안내해 드립니다.

| RustDesk 창 | 설정 창 |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

설정 창에서 이를 활성화했지만 RustDesk가 여전히 경고하는 경우, `-` 버튼으로 설정 창에서 `RustDesk`를 제거한 다음, `+` 버튼을 클릭하고 `Applications`에서 `RustDesk`를 선택하세요.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
기타 무력한 시도: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
재부팅이 여전히 필요합니다.
{{% /notice %}}

| `-` 및 `+` 버튼 | `RustDesk` 선택 |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

**화면 녹화** 권한에 대한 위의 단계를 복사해 주세요.

![](/docs/en/client/mac/images/screen.png?v2)