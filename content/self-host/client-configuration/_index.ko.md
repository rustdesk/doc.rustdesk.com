---
title: 클라이언트 구성
description: "셀프 호스팅 서버용 RustDesk 클라이언트를 구성하세요. 브랜드 앱에 로고를 포함한 사용자 지정 클라이언트(Custom Client) 생성기(Pro), 수동 구성, 설정 가져오기/내보내기 및 기업용 배포 전략과 같은 기능을 제공합니다."
keywords: ["rustdesk client configuration", "custom client generator", "rustdesk branded client", "rustdesk white label", "rustdesk enterprise deployment", "rustdesk client setup", "custom rustdesk app", "rustdesk pro client", "rustdesk configuration management", "rustdesk corporate branding"]
weight: 300
pre: "<b>2.3. </b>"
---

## 자체 호스팅 서버용 RustDesk 클라이언트를 구성하는 가장 좋은 방법은 무엇인가요?

최적의 구성 방법은 관리하는 디바이스 수와 RustDesk Server Pro를 사용하는지 여부에 따라 다릅니다. Pro 배포의 경우, 사용자 지정 클라이언트 생성기가 일반적으로 최선의 옵션입니다. 이는 서버 설정과 브랜딩을 미리 로드하기 때문입니다. 소규모 또는 오픈소스 배포의 경우, 수동 구성, 가져오기/내보내기 또는 스크립트 기반 배포가 일반적으로 더 빠릅니다.

## 어떤 클라이언트 구성 방법을 선택해야 하나요?

| 방법 | 최적의 사용처 | 사용하는 이유 |
| --- | --- | --- |
| 사용자 지정 클라이언트 생성기 | RustDesk Server Pro 팀 | 서버 설정, 브랜딩 및 서명 워크플로우가 포함된 사전 구성된 클라이언트를 생성합니다 |
| 수동 구성 | 테스트 및 소규모 배포 | 몇몇 클라이언트를 자체 호스팅 서버에 연결하는 가장 빠른 방법 |
| 가져오기 또는 내보내기 | 이미 검증된 설정 재사용 | 동일한 서버 설정을 한 클라이언트에서 다른 클라이언트로 복사합니다 |
| 배포 스크립트 | RMM, Intune 또는 대규모 롤아웃 | RustDesk를 설치하고 설정을 자동으로 대규모로 적용합니다 |
| `--config` 명령줄 | 관리형 설치 및 자동화 | 스크립트 기반 설정 중 비대화형으로 설정 문자열을 적용합니다 |

## 대부분의 클라이언트가 필요로 하는 값은 무엇인가요?

대부분의 자체 호스팅 RustDesk 클라이언트는 몇 가지 값만 필요합니다:

- `ID Server`: 필수, 보통 귀하의 `hbbs` 호스트 또는 IP
- `Key`: 자체 호스팅 서버와의 암호화된 연결에 필요
- `API Server`: Pro 계정 로그인 및 웹 콘솔 기능에 필요
- `Relay Server`: 종종 선택적입니다. RustDesk가 이를 추론할 수 있기 때문이며, 명시적으로 설정하고자 하는 경우를 제외하면 말이죠

## 1. 사용자 지정 클라이언트 생성기 (Pro 전용, 기본 플랜 또는 사용자 지정 플랜)

고유한 이름, 로고, 아이콘, 구성 등을 설정하고 서명할 수 있습니다.

현재 Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64가 지원됩니다.

[Video](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. 수동 구성

메인 RustDesk 클라이언트 홈에서 ID 옆에 있는 메뉴 버튼 [ &#8942; ]을 클릭한 다음 네트워크를 클릭하세요. 이제 상승된 권한을 사용해 설정을 잠금 해제하고 `ID`, `Relay`, `API` 및 `Key`를 설정할 수 있습니다. 이 `Key`는 연결 암호화에 사용되는 공개 키이며, Pro 버전 구매 시 제공되는 라이선스 키와는 구분된다는 점에 유의하세요.

![](/docs/en/self-host/client-configuration/images/network-config.png)

**ID 서버** 입력 상자에 `hbbs` 호스트 또는 IP 주소를 입력하세요(로컬 쪽 + 원격 쪽). 다른 두 주소는 비워둘 수 있으며, RustDesk가 자동으로 파악합니다(특별히 설정되지 않은 경우). 릴레이 서버는 `hbbr`(포트 21117)를 가리킵니다.

예:

```nolang
hbbs.example.com
```

또는

```nolang
hbbs.example.com:21116
```

### `Key` 설정

자가 호스팅 서버에 암호화된 연결을 설정하려면 공개 키를 입력해야 합니다. 이 키는 일반적으로 `hbbs`를 처음 실행할 때 생성되며, 작업 디렉터리/데이터 폴더의 `id_ed25519.pub` 파일에서 확인할 수 있습니다.

`Pro` 사용자로서, [web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)에서 `Key`를 추가로 가져올 수 있습니다.

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### `API Server` 설정

이것은 `Pro` 사용자만을 위한 것입니다. 웹 콘솔에서는 로그인할 수 있지만 RustDesk 클라이언트에서는 로그인에 실패하는 경우, 아마도 `API Server`를 올바르게 설정하지 않았을 가능성이 있습니다.

API 서버가 기본 `21114` 포트에서 실행되지 않는 경우(오픈소스 버전에서 온 경우 방화벽에 이 포트를 추가하지 않을 수 있음), `API Server`를 명시적으로 지정하십시오.
예: API 서버가 기본 HTTPS 포트에서 실행되는 경우, `API Server`를 `https://hbbs.example.com`와 함께 지정하십시오.

`API Server`의 값을 여전히 확인할 수 없는 경우, 웹 콘솔의 환영 페이지로 이동하세요. 위 그림에 `API Server`가 표시되어 있습니다(라벨이 `API:`인 입력 상자).

## 3. 가져오기 또는 내보내기를 사용한 설정

1. [above](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) 단계를 사용하여 디바이스에 RustDesk 클라이언트를 구성하십시오.
2. 위의 기계를 사용해 설정으로 이동한 다음 네트워크로 이동하고 잠금을 해제하십시오.
3. `Export Server Config`를 클릭하십시오.
4. 복사된 문자열을 메모장 또는 유사한 프로그램에 붙여넣으십시오.
5. 새 클라이언트로 이동하여 위의 내용을 클립보드에 복사하십시오.
6. RustDesk 클라이언트에서 설정으로 이동한 다음 네트워크로 이동하고 잠금을 해제한 후 `Import Server Config`를 클릭하십시오.
7. 설정이 자동으로 붙여넣어집니다.
8. `Apply`를 클릭하십시오.

## 4. 자동 구성

자동으로 설정하는 가장 쉬운 방법은 [here](https://rustdesk.com/docs/en/self-host/client-deployment/)에서 찾을 수 있는 배포 스크립트를 사용하는 것입니다.

## 5. 클립보드를 통해 `Pro`에서 구성 가져오기

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. 명령줄 `--config` 사용
`rustdesk.exe --config <config-string>`

웹 콘솔에서 구성 문자열을 얻을 수 있습니다(위 그림에서 확인할 수 있음) 또는 RustDesk 클라이언트의 "설정 → 네트워크"에서 얻을 수 있습니다([here](https://github.com/rustdesk/rustdesk/discussions/7118)는 이에 대한 논의입니다).