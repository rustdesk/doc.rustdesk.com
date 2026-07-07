---
title: Android
description: "Android에서 RustDesk를 사용하여 원격 제어, 파일 전송, ID 및 릴레이 서버 설정, 화면 공유를 수행하세요. 어떤 권한이 필요한지와 Android 서비스를 시작하는 방법을 알아보세요."
keywords: ["rustdesk android", "rustdesk android remote control", "rustdesk android file transfer", "rustdesk android screen share", "rustdesk android id relay server", "rustdesk android permissions"]
weight: 4
---

이 Android 가이드를 사용하여 원격 장치를 제어하고, 파일을 전송하며, ID 및 릴레이 서버를 구성하고, Android 휴대폰의 화면이나 파일 시스템을 공유하십시오.

## 원격 제어

홈 페이지에서 원격 장치의 ID를 입력하거나 이전 기록된 장치를 선택하여 확인하십시오.
확인이 성공한 후에는 원격 장치를 제어할 수 있습니다.

| 홈 | 성공적으로 연결됨 |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

입력 제어는 `Mouse mode`와 `Touch mode`의 두 가지 모드를 제공하며, 하단 도구모음에서 전환할 수 있습니다.

| 마우스 설정 | 모드 선택 |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
`Mouse mode`에서는 `Two-Finger Tap`를 사용해 원격 장치의 `Right Mouse`를 트리거할 수도 있습니다.
{{% /notice %}}

## 파일 전송(Android)

> RustDesk ≥ 1.1.9 필요

홈 페이지의 장치 목록에서 장치를 선택하세요.

오른쪽 메뉴를 길게 누르거나 탭하여 `File Transfer`를 선택하세요.

| 홈 | 성공적으로 연결됨 |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- 초기 디렉터리는 기기의 홈 디렉터리이며, <i class="fas fa-home"></i>를 클릭하여 빠르게 홈으로 돌아갈 수 있습니다.
- 제목 표시줄 아래에는 디렉터리 레벨이 표시되며, 해당 폴더를 클릭하면 빠르게 이동할 수 있습니다.
- <i class="fas fa-arrow-up"></i>를 클릭하여 상위 디렉터리에 접근할 수 있습니다.
- 현재 절대 경로와 프로젝트 통계는 목록 하단에 표시됩니다.
- 제목 표시줄에서 `Local` / `Remote`를 클릭하여 페이지를 전환할 수 있습니다.

### 파일을 어떻게 전송하나요?

1. 목록에서 파일 또는 폴더를 **길게 누르면** 빠르게 **다중 선택 모드**로 들어가며, 이를 통해 여러 항목을 선택할 수 있습니다.
2. 파일을 선택한 후 `Local` / `Remote` 페이지로 전환하세요. 전환한 후 화면 하단에 `Paste here?` 프롬프트가 표시됩니다.
3. 그림의 붙여넣기 파일 아이콘을 클릭하여 선택된 항목을 대상 디렉터리로 전송하세요.

| 다중 선택 모드 | 파일 붙여넣기 |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## ID/릴레이 서버 설정

1. 하단 탐색 막대에서 `Settings`를 클릭하세요.
2. `ID/Relay Server`를 클릭하세요.
3. `ID Server` 필드에 ID 서버 호스트명/IP 주소를 입력하세요. `Relay Server`와 `API Server`는 비워두고, 공개 키를 `Key` 필드에 입력하세요(선택사항이며 암호화에 필요함). **확인**을 눌러 설정을 저장하세요. 그러면 지정된 서버로 자동으로 전환됩니다.

QR 코드를 스캔하여 구성할 수도 있습니다. QR 코드를 생성하려면 다음 형식을 사용하세요(값 `host` 및 `key`는 사용자 고유의 값으로 변경하세요):

```nolang
config={"host": "xxx", "key": "xxx"}
```

그런 다음 [Online QR Code Generator](https://www.qr-code-generator.com/)로 이동하여 위의 코드를 붙여넣으세요.

아래 그림은 Android의 스크린샷입니다. iOS인 경우, 홈 페이지의 오른쪽 상단 메뉴를 확인해 주세요.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## Android 휴대폰의 화면/파일 공유하기

버전 1.1.9부터 Android 클라이언트는 휴대폰 화면 공유 및 휴대폰 파일 시스템 공유 기능을 추가했습니다.

- 화면 공유를 위해서는 Android 6 이상이 필요합니다.
- 휴대폰 시스템 내부 오디오를 공유하려면 Android 10 이상이 필요합니다.
- iOS는 아직 화면 공유를 지원하지 않습니다.

### 권한 요청 및 서비스 시작

하단 탐색바에서 `Share Screen`를 클릭하세요.

필요에 따라 다양한 권한을 구성하세요. RustDesk를 시작할 때마다 "화면 캡처"와 "입력 제어" 권한을 다시 요청해야 합니다.

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| 권한 | 설명 |
| --- | --- |
| 화면 캡처 | 화면 캡처 공유 권한을 허용할지 여부, 모니터링 서비스는 시작과 동시에 활성화됩니다 |
| 입력 제어* | 컨트롤러가 휴대폰의 입력을 제어하도록 허용할지 여부, 예: 마우스를 사용한 가상 터치스크린 조작 |
| 파일 전송* | 파일 전송 권한을 허용할지 여부, 시작 후 이 휴대폰의 파일 시스템을 원격으로 제어할 수 있습니다 |
| 오디오 캡처  | 휴대폰 내부의 시스템 음악을 공유할지 여부(마이크 입력은 아님) |

	
{{% notice note %}}
위의 *는 특별한 권한을 나타냅니다. 이러한 권한을 얻으려면 Android 시스템 설정 페이지로 이동해 수동으로 획득해야 합니다. 자세한 내용은 다음과 같습니다.
{{% /notice %}}

### 특별 권한 요청 - 파일

| Android 파일 권한 요청 시 자동으로 시스템 설정 페이지로 이동합니다 |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### 특별 권한 요청 - 마우스 입력

| 1단계: 설치된 서비스 찾기 | 2단계: RustDesk 입력 시작 |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
다양한 벤더의 시스템 설정 페이지는 다를 수 있으니, 귀하의 시스템 페이지에 맞게 조정해주세요.
{{% /notice %}}

| 원격 마우스 제어 단축키 | 설명 |
| --- | --- |
| 오른쪽 마우스 클릭 | 뒤로 가기 |
| 마우스 휠 클릭 | 홈 |
| 마우스 휠 길게 누르기 | 최근에 열었던 앱 |
| 마우스 휠 스크롤링 | 수직 슬라이딩 시뮬레이션 |

### 서비스 시작

`Screen Capture` 권한을 획득한 후, 서비스가 자동으로 시작됩니다. `Start Service` 버튼을 클릭하여 서비스를 시작할 수도 있습니다. 서비스가 시작된 후에는 다른 기기로부터 데스크톱 제어 요청을 수락할 수 있습니다.

`File Transfer` 권한이 활성화된 경우, 다른 기기로부터 파일 제어 요청도 수락할 수 있습니다.

서비스가 시작된 후, 이 기기에 고유한 ID와 임의의 비밀번호가 자동으로 생성됩니다. 다른 기기들은 ID와 비밀번호를 통해 휴대폰을 제어하거나, 새로운 요청이 수신될 때 수동으로 확인할 수 있습니다.

| 서비스 시작 전 | 서비스 시작 후 |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. `Start Service`를 클릭하면 기본적으로 `Screen Capture` 권한이 활성화됩니다.
2. `Screen Capture` 권한을 획득하지 않은 경우, 기타 장치는 제어 요청을 발행할 수 없습니다.
3. `Screen Capture` 권한을 제외한 기타 권한의 전환은 새 연결에만 영향을 미치며, 연결됨 상태의 연결에는 영향을 주지 않습니다. 연결됨 상태의 연결에 대한 권한을 전환하려면 먼저 현재 연결을 종료하고 권한을 수정한 후 제어 요청을 받으십시오.
{{% /notice %}}

#### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### 모바일 터미널

| 언제든지 서비스를 중지하거나 지정된 연결을 닫을 수 있습니다 | 채팅을 받거나 시작할 수 있습니다 |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |