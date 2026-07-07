---
title: 고급 설정
weight: 49
description: "RustDesk 사용자 지정 클라이언트에서 사용 가능한 고급 설정을 참조하세요. 여기에는 권한 수준과 재정의, 기본값, 사용자 및 하드코딩된 설정 간의 옵션 동작이 포함됩니다."
keywords: ["rustdesk advanced settings", "rustdesk custom client settings", "rustdesk privilege levels", "rustdesk override settings", "rustdesk default settings"]
---

RustDesk의 고급 사용자 지정 클라이언트 설정과 각 설정이 서로 다른 권한 수준에서 어떻게 동작하는지 이해하려면 이 참조를 사용하세요.

사용자 지정 클라이언트의 모든 고급 설정이 여기에 포함되어 있습니다.

## RustDesk 사용자 지정 클라이언트의 고급 설정이란 무엇인가요?

고급 설정은 RustDesk 사용자 지정 클라이언트, 사용자 설정 및 서버 측 정책을 통해 제어할 수 있는 저수준 클라이언트 옵션입니다. 여러 클라이언트 간에 반복 가능한 동작이 필요하거나 보안, 권한 및 UX 기본값에 대해 더 엄격한 제어를 원할 때 유용합니다.

## 설정 우선순위는 어떻게 작동하나요?

| 소스 | 우선순위 |
| --- | --- |
| 덮어쓰기 | 최고 |
| 전략 | 높음 |
| 사용자 | 보통 |
| 기본값 | 가장 낮음 |

## 고급 설정 빠른 답변

- 재정의 설정은 다른 모든 소스보다 우선합니다.
- 전략(Strategy) 설정은 사용자 및 기본 설정을 재정의할 수 있습니다.
- 사용자 설정은 더 높은 우선순위의 소스가 이를 재정의하지 않는 경우에만 적용됩니다.
- 기본 설정은 백업 레이어입니다.
- 이 페이지는 정확한 설정 키, 값, 기본값 및 예제에 대한 참고 자료입니다.

## 설정에 대한 권한 수준

설정에는 네 가지 유형이 있습니다:

1. 설정 덮어쓰기, `Web Console` → `Custom Clients`
2. 기본 설정, `Web Console` → `Custom Clients`
3. 사용자 설정, RustDesk 클라이언트에서
4. 전략 설정, `Web Console` → `Strategies`

이 설정의 권한 계층은 다음과 같습니다: `Override > Strategy > User > Default`.

## 보안 설정

### access-mode

수신 연결에 대한 접근 모드(권한)를 설정합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### 키보드

수신 연결에 대한 키보드/마우스 입력을 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 키보드 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### 클립보드 허용

수신 연결에 대한 복사 및 붙여넣기를 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 클립보드 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### 파일 전송 허용

수신 연결에 대해 파일 복사 및 붙여넣기 또는 파일 전송(세션)을 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 파일 전송 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### 카메라 허용

수신 연결에 대한 카메라 허용을 활성화합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 카메라 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### 터미널 허용

수신 연결에 대한 터미널 허용을 활성화합니다.

**위치**:

**데스크톱** 설정 → 보안 → 권한 → 터미널 허용

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### 원격 프린터 허용

수신 연결에 대해 원격 프린터를 허용합니다.

**위치**:

1. **Windows** 설정 → 보안 → 권한 → 원격 프린터 허용

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### 오디오 허용

오디오 녹음 및 피어로 전송을 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 오디오 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### 터널링 활성화

TCP 터널링을 활성화합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → TCP 터널링 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### 원격 재시작 허용

제어 측에서 재시작을 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 원격 재시작 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### 세션 녹화 허용

세션이 녹화되도록 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 세션 녹화 허용
2. **모바일** 설정 → 화면 공유 → 세션 녹화 허용

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

제어 측에서 다른 사용자의 입력을 차단하도록 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 사용자 입력 차단 허용(Windows만 해당)
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### 개인정보 보호 모드 사용함

제어되는 측에서 제어하는 측이 개인정보 보호 모드를 사용하도록 허용하는지 여부를 제어합니다.

이는 [`privacy-mode`](#privacy-mode)와 다릅니다: 해당 설정은 첫 번째 연결 이후 각 피어에 대한 기본 개인정보 보호 모드 동작을 제어하는 반면, `enable-privacy-mode`는 개인정보 보호 모드가 허용되는지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 개인정보 보호 모드 사용함

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-privacy-mode=Y` |

### 원격 구성 수정 허용

제어 측에서 제어되는 RustDesk UI의 설정을 변경할 수 있도록 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 권한 → 원격 구성 수정 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### LAN 검색 거부 활성화

LAN 피어가 나를 발견하도록 허용합니다.

LAN 검색 후, 로컬에서 지원된다면 [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN)가 작동할 수 있습니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 보안 → LAN 검색 거부
2. **모바일** 설정 → 화면 공유 → LAN 검색 거부

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### 직접 서버

직접 IP 액세스 허용.

**위치**:

1. **데스크톱** 설정 → 보안 → 보안 → 직접 IP 액세스 허용
2. **모바일** 설정 → 화면 공유 → 직접 IP 연결

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### 직접-액세스-포트

직접 IP 액세스 포트.

**위치**:

1. **데스크톱** 설정 → 보안 → 보안 → 직접 IP 액세스 포트 (직접 IP 액세스 허용이 체크된 경우 표시)
2. **모바일** 설정 → 화면 공유 → 직접 IP 연결

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### 화이트리스트

IP 화이트리스트 사용.

**위치**:

1. **데스크톱** 설정 → 보안 → 보안 → IP 화이트리스트 사용
2. **모바일** 설정 → 화면 공유 → IP 화이트리스트 사용

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | `,` or `<ip1>,<ip2>,<ip3>` | `,` means no filter | `whitelist=,` |

### 허용-자동 연결 해제 및 자동 연결 해제 시간 초과

사용자 비활성 상태가 지속된 후 수신 세션을 자동으로 종료합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 보안 → 사용자 비활성 상태에서 수신 세션 자동 종료
2. **모바일** 설정 → 화면 공유 → 사용자 비활성 상태에서 수신 세션 자동 종료

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minutes | 10 | `auto-disconnect-timeout=10` |

### 허용-연결-창-열림

RustDesk 창이 열려 있는 경우에만 연결을 허용합니다.

**위치**:

1. **데스크톱** 설정 → 보안 → 보안 → RustDesk 창이 열려 있는 경우에만 연결 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### 승인 모드

비밀번호를 통해 수신 연결을 수락하거나 수동으로 클릭하십시오.

**위치**:

1. **데스크톱** 설정 → 보안 → 비밀번호 → 드롭다운 상자
2. **모바일** 화면 공유 → 오른쪽 상단 모서리의 드롭다운 메뉴

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### 인증 방법

사용할 수 있는 비밀번호 유형은 무엇이며, `temporary password`는 일회성 임의 비밀번호를 의미합니다.

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### 일회용 비밀번호 길이

1. **데스크톱** 설정 → 보안 → 비밀번호 → 일회용 비밀번호 길이
2. **모바일** 화면 공유 → 오른쪽 상단 모서리의 드롭다운 메뉴 → 일회용 비밀번호 길이

임시 비밀번호의 길이.

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | `temporary-password-length=6` |

### 프록시-URL

프록시 URL입니다.

현재 `http` 및 `socks5`를 지원합니다.

**위치**:

1. **데스크톱** 설정 → 네트워크 → 프록시 → Socks5/Http(s) 프록시
2. **모바일**

예제:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### 프록시-사용자 이름 & 프록시-비밀번호

프록시 사용자 이름과 비밀번호입니다.

**위치**:

1. **데스크톱** 설정 → 네트워크 → 프록시 → Socks5/Http(s) 프록시
2. **모바일**

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## 일반 설정

### 테마

RustDesk 클라이언트의 UI 테마를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 테마
2. **모바일** 설정 → 설정 → 테마

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

RustDesk 클라이언트의 언어를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 언어
2. **모바일** 설정 → 설정 → 언어

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

현재 사용 가능한 언어는 다음과 같습니다:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

최신 언어 목록은 코드에서 [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45)를 확인할 수 있습니다.

### allow-auto-record-incoming

수신 세션 자동 녹화.

**위치**:

1. **데스크톱** 설정 → 일반 → 녹화 → 수신 세션 자동 녹화
2. **모바일** 설정 → 녹화 → 수신 세션 자동 녹화

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

발신 세션 자동 녹화.

**위치**:

1. **데스크톱** 설정 → 일반 → 녹화 → 발신 세션 자동 녹화
2. **모바일** 설정 → 녹화 → 발신 세션 자동 녹화

| Install required | Values | Default | Example | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### 비디오 저장 디렉터리

녹화된 동영상을 저장할 디렉터리입니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 녹화 → 비디오 저장 디렉터리
2. **모바일** 설정 → 녹화

기본값:

1. **macOS** ~/Movies/**앱_이름**
2. **Linux** ~/Videos/**앱_이름**
3. **Windows** %USERPROFILE%\Videos\\**앱_이름**
4. **Android** /Storage/emulated/0/**앱_이름**/ScreenRecord

**노트**: **앱_이름**을 현재 앱 이름으로 대체하십시오.

### 자동 업데이트 허용

자동 업데이트를 허용합니다. 이 옵션을 활성화하면, 새로운 버전이 출시되면 클라이언트가 GitHub 공식 릴리스에서 최신 버전을 자동으로 다운로드하고 설치합니다.

이 설정은 연결 유형이 양방향 또는 수신으로 설정된 경우에만 Windows에서 적용됩니다. 발신에는 적용되지 않습니다.

**위치**:

1. **Windows** 설정 → 일반 → 기타 → 자동 업데이트

| Install required | Values | Default | Example | Version |
| :------: | :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-auto-update=Y` | >= 1.4.6 |

### enable-confirm-closing-tabs

모든 원격 탭을 닫기 전에 확인 대화상자를 표시할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 기타 → 여러 탭을 닫기 전에 확인
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

적응형 비트레이트를 활성화합니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 기타 → 적응형 비트레이트
2. **모바일** 설정 → 화면 공유 → 적응형 비트레이트 (베타)

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### 허용-벽지제거

수신 세션 동안 벽지를 제거합니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 기타 → 수신 세션 동안 벽지 제거
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### 새 탭에서 연결 열기 활성화

새 연결을 열 때 새 탭을 사용할지 새 창을 사용할지 제어합니다.

**위치**:

1. **데스크톱** 설정 → 일반 → 기타 → 새 탭에서 연결 열기
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

항상 소프트웨어 렌더링 사용.

**위치**:

1. **데스크톱** 설정 → 일반 → 기타 → 항상 소프트웨어 렌더링 사용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

디스플레이 없음일 경우 수신 연결을 허용합니다.

이 옵션은 데스크톱 환경, Xorg 서버 및 GDM을 필요로 하며, [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902)를 참조하십시오.

**위치**:

1. **데스크톱** 설정 → 일반 → 기타 → Linux headless 허용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

하드웨어 인코딩을 활성화하여 그림을 더 부드럽게 만듭니다.

**위치**:

1. **데스크톱**
2. **모바일** 설정 → 하드웨어 코덱

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

피어 카드의 뷰를 제어하며, "큰 타일", "작은 타일" 및 "목록"을 포함합니다.

**위치**:

1. **데스크톱** 홈 → 피어 패널 → 오른쪽 상단 그리드 아이콘
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** 큰 타일  
**1** 작은 타일  
**2** 목록

### 피어 정렬

피어 카드의 순서를 제어합니다.

**위치**:

1. **데스크톱** 홈 → 피어 패널 → 오른쪽 상단 정렬 아이콘
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### 주소록과 최근 세션 동기화

주소록을 최근 세션과 동기화할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 홈 → 피어 패널 → 주소록 → 태그 → 드롭다운 메뉴 → 최근 세션과 동기화
2. **모바일** 홈 → 피어 패널 → 주소록 → 태그 → 드롭다운 메뉴 → 최근 세션과 동기화

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

주소록 태그를 정렬할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 홈 → 피어 패널 → 주소록 → 태그 → 드롭다운 메뉴 → 태그 정렬
2. **모바일** 홈 → 피어 패널 → 주소록 → 태그 → 드롭다운 메뉴 → 태그 정렬

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### 교차해서 필터링

태그 교차를 통해 주소록을 필터링합니다.

**미리보기**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**위치**:

1. **데스크톱** 홈 → 피어 패널 → 주소록 → 태그 → 드롭다운 메뉴 → 교차해서 필터링
2. **모바일** 홈 → 피어 패널 → 주소록 → 태그 → 드롭다운 메뉴 → 교차해서 필터링

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### 텍스처 렌더링 사용

**위치**:

**데스크톱** 설정 → 일반 → 기타 → 텍스처 렌더링 사용

텍스처 렌더링을 사용하여 이미지를 더 부드럽게 만듭니다. 렌더링 문제가 발생하면 이 옵션을 비활성화해 보세요. 데스크톱에서만 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### UDP 홀 펀칭 사용

**위치**:

**데스크톱** 설정 → 일반 → 기타 → UDP 홀 펀칭 사용  
**모바일** 설정 → UDP 홀 펀칭 사용

RustDesk 1.4.1, RustDesk Server Pro 1.6.2부터 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### IPv6 P2P 연결 사용

**위치**:

**데스크톱** 설정 → 일반 → 기타 → IPv6 P2P 연결 사용  
**모바일** 설정 → 일반 → 기타 → IPv6 P2P 연결 사용  

RustDesk 1.4.1, RustDesk Server Pro 1.6.2부터 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | selfhost:N, otherwise:Y | `enable-ipv6-punch=N` |

## 디스플레이 설정

### 보기 전용

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "보기 전용" 옵션을 설정합니다.

그런 다음 각 피어의 설정에서 "보기 전용" 옵션이 연결이 보기 전용인지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 보기 모드
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 보기 모드

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

도구 모음에 모니터를 표시할지 여부를 제어합니다.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 도구 모음에 모니터 표시
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### 도구 모음 접기

원격 도구 모음이 연결된 후 접히는지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 도구 모음 접기
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### 원격 커서 표시

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "원격 커서 표시" 옵션을 설정합니다.

그런 다음 각 피어의 설정에서 "원격 커서 표시" 옵션이 원격 제어 페이지에 원격 커서가 표시되는지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 원격 커서 표시
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 원격 커서 표시

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### 원격 커서 따라가기

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "원격 커서 따라가기" 옵션을 설정합니다.

그런 다음 각 피어의 설정에서 "원격 커서 따라가기" 옵션이 원격 커서를 따라갈지 여부를 제어합니다.

**미리보기**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 원격 커서 따라가기
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 원격 커서 따라가기

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### 원격 창 초점 따라가기

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "원격 창 초점 따라가기" 옵션을 설정합니다.

그런 다음 각 피어의 설정에서 "원격 창 초점 따라가기" 옵션이 원격 창을 따라갈지 여부를 제어합니다.

**미리보기**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 원격 창 초점 따라가기
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 원격 창 초점 따라가기

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### 커서 확대/축소

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "커서 확대/축소" 옵션을 설정합니다.

각 피어의 설정에서 "커서 확대/축소" 옵션은 현재 이미지 배율에 따라 커서가 스케일링되는지를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 커서 확대/축소
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### 품질 모니터 표시

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "품질 모니터 표시" 옵션을 설정합니다.

그러면 각 피어의 설정에서 "품질 모니터 표시" 옵션이 품질 모니터를 표시할지 여부를 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 품질 모니터 표시
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 품질 모니터 표시

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### 음소거

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "음소거" 옵션을 설정합니다.

그러면 각 피어의 설정에 있는 "음소거" 옵션이 사운드 재생 여부를 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 음소거
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 음소거

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### 파일 복사 및 붙여넣기 허용

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "파일 복사 및 붙여넣기 허용" 옵션을 설정합니다.

그러면 각 피어의 설정에 있는 "파일 복사 및 붙여넣기 허용" 옵션이 연결 시 파일 복사 및 붙여넣기 허용 여부를 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 파일 복사 및 붙여넣기 허용 (Windows만 해당)
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### 클립보드 사용 안 함

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "클립보드 사용 안 함" 옵션을 설정합니다.

각 피어의 설정에서 "클립보드 사용 안 함" 옵션은 텍스트 복사 및 붙여넣기 기능을 활성화할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 클립보드 사용 안 함
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 클립보드 사용 안 함

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### 세션 종료 후 잠금

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "세션 종료 후 잠금" 옵션을 설정합니다.

그러면 각 피어의 설정에 있는 "세션 종료 후 잠금" 옵션이 세션 종료 후 피어 컴퓨터를 잠금 상태로 설정할지 여부를 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 세션 종료 후 잠금
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 세션 종료 후 잠금

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### 개인정보 보호 모드

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "개인정보 보호 모드" 옵션을 설정합니다.

그러면 각 피어의 설정에 있는 "개인정보 보호 모드" 옵션이 연결 후 개인정보 보호 모드를 사용할지 여부를 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 개인정보 보호 모드
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 개인정보 보호 모드

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "i444" 옵션을 설정합니다.

각 피어의 설정에서 "i444" 옵션은 실제 색상을 사용할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 진짜 색상 (4:4:4)
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 진짜 색상 (4:4:4)

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### 마우스 휠 반전

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "마우스 휠 반전" 옵션을 설정합니다.

각 피어의 설정에서 "마우스 휠 반전" 옵션은 마우스 휠을 반전할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 마우스 휠 반전
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 마우스 휠 반전

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### 마우스 왼쪽 버튼과 오른쪽 버튼 교체

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "마우스 왼쪽 버튼과 오른쪽 버튼 교체" 옵션을 설정합니다.

그러면 각 피어의 설정에서 "마우스 왼쪽 버튼과 오른쪽 버튼 교체" 옵션이 왼쪽-오른쪽 마우스 버튼 교체 여부를 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 마우스 왼쪽 버튼과 오른쪽 버튼 교체
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 마우스 왼쪽 버튼과 오른쪽 버튼 교체

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "디스플레이를 개별 창으로 표시" 옵션을 설정합니다.

그러면 각 피어의 설정에서 "디스플레이를 개별 창으로 표시" 옵션이 디스플레이를 개별 창으로 표시할지 여부를 제어하게 됩니다.

**미리보기**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 디스플레이를 개별 창으로 표시
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### 원격 세션에 내 모든 디스플레이 사용

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "원격 세션에 내 모든 디스플레이 사용" 옵션을 설정합니다.

각 피어의 설정에서 "원격 세션에 내 모든 디스플레이 사용" 옵션은 원격 세션에 내 모든 디스플레이를 사용할지 여부를 제어하게 됩니다.

**미리보기**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 원격 세션에 내 모든 디스플레이 사용
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### 보기 스타일

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "보기 스타일" 옵션을 설정합니다.

그런 다음 각 피어의 설정에 있는 "보기 스타일" 옵션이 보기 스타일을 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 보기 스타일
2. **모바일** 설정 → 디스플레이 설정 → 기본 보기 스타일

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### 스크롤 스타일

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "스크롤 스타일" 옵션을 설정합니다.

그런 다음 각 피어의 설정에서 "스크롤 스타일" 옵션이 스크롤 스타일을 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 스크롤 스타일
2. **모바일**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar, scrolledge | scrollauto | `scroll-style=scrollauto` |

**노트**: `scrolledge` 옵션은 RustDesk 1.4.4부터 사용 가능합니다.

### edge-scroll-edge-thickness

이 옵션은 `scroll-style`가 `scrolledge`로 설정되었을 때 가장자리 두께를 제어합니다. 가장자리 두께는 화면 가장자리에서 스크롤 가능한 영역의 크기를 결정합니다.

이 옵션은 `scroll-style=scrolledge`일 때만 효과적입니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 가장자리 스크롤 가장자리 두께

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | 20-150 | 100 | `edge-scroll-edge-thickness=100` |

**노트**: 이 옵션은 RustDesk 1.4.4부터 사용 가능합니다.

### 이미지 품질

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "이미지 품질" 옵션을 설정합니다.

그러면 각 피어의 설정에 있는 "이미지 품질" 옵션이 이미지 품질을 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 이미지 품질
2. **모바일** 설정 → 디스플레이 설정 → 기본 이미지 품질

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### 사용자 지정 이미지 품질

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "사용자 지정 이미지 품질" 옵션을 설정합니다.

각 피어의 설정에서 "사용자 지정 이미지 품질" 옵션이 "이미지 품질"을 사용자 지정으로 설정한 경우 이미지 품질을 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 이미지 품질 → 사용자 지정
2. **모바일** 설정 → 디스플레이 설정 → 기본 이미지 품질 → 사용자 지정

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "custom-fps" 옵션을 설정합니다.

각 피어의 설정에서 "custom-fps" 옵션이 "image-quality"를 사용자 지정으로 설정한 경우 fps를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 이미지 품질 → 사용자 지정
2. **모바일** 설정 → 디스플레이 설정 → 기본 이미지 품질 → 사용자 지정

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### 코덱 선호도

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "코덱 선호도" 옵션을 설정합니다.

각 피어의 설정에서 "코덱 선호도" 옵션은 이미지에 대한 코덱을 제어하게 됩니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 코덱
2. **모바일** 설정 → 디스플레이 설정 → 기본 코덱

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**주의**: "vp8" 및 "vp9" 이외의 옵션은 작동하지 않을 수 있습니다. 이는 사용자의 기기가 지원하는 사항에 따라 달라집니다.

### 터미널 지속성

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "터미널 지속성" 옵션을 설정합니다.

각 피어의 설정에서 "터미널 지속성" 옵션은 연결 해제 시 터미널 세션을 유지할지 여부를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기타 기본 옵션 → 연결이 끊어져도 터미널 세션 유지
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 연결이 끊어져도 터미널 세션 유지

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### 트랙패드 속도

이 옵션은 첫 번째 연결 이후 모든 피어에 대해 "트랙패드 속도" 옵션을 설정합니다.

각 피어의 설정에서 "트랙패드 속도" 옵션이 사용자 지정으로 설정된 경우, 해당 옵션이 fps를 제어합니다.

**위치**:

1. **데스크톱** 설정 → 디스플레이 → 기본 트랙패드 속도
2. **모바일** 설정 → 디스플레이 설정 → 기본 트랙패드 속도

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## 기타

### 사전 설정 주소록 이름 & 사전 설정 주소록 태그 & 사전 설정 주소록 별명 & 사전 설정 주소록 비밀번호 & 사전 설정 주소록 노트

사전 설정 주소록 이름, 기기 태그, 기기 별명, 기기 비밀번호, 기기 노트, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
태그를 설정하고 싶지 않은 경우에만 사전 설정 주소록 이름을 설정할 수 있습니다.
웹 콘솔의 주소록 페이지에서 유효한 주소록 이름과 태그를 사용하십시오.

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<address book name>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<address book tag name>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<device alias>` |
| preset-address-book-password | N | | | `preset-address-book-password=<device password>` |
| preset-address-book-note | N | | | `preset-address-book-note=<device note>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note는 RustDesk 클라이언트 >=1.4.3, 프로 >= 1.6.6에서 사용할 수 있습니다.

### disable-group-panel

RustDesk 클라이언트에서 그룹 패널을 비활성화하세요(주소록 패널 옆에 있으며, 1.3.8부터는 "액세스 가능한 장치"라고 명명됨). https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### 사전 권한 상승 서비스

Windows 휴대용에 대한 실행 시 자동 권한 상승, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### 플로팅 창 비활성화

Android 서비스가 시작되면 플로팅 창이 표시되며, 이는 시스템이 RustDesk 서비스를 종료하는 것을 방지하는 데 도움이 됩니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### 플로팅 창 크기

Android 서비스가 시작되면 플로팅 창이 표시되며, 이는 시스템에서 RustDesk 서비스를 종료하는 것을 방지하는 데 도움이 됩니다. 크기가 120보다 작으면 플로팅 창을 클릭하기 어려워집니다. 매우 작은 크기는 일부 기기에서 백그라운드 서비스를 유지할 수 없을 수도 있습니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### 플로팅 창-터치 불가

기본적으로 플로팅 창을 클릭하면 메뉴가 표시됩니다. '터치 불가'로 설정한 후에는 클릭하거나 스와이프해도 플로팅 창을 통과해 아래에 있는 창으로 전달됩니다. '터치 불가'로 설정된 후에는 플로팅 창의 위치를 변경할 수 없으며, 시스템에서 자동으로 플로팅 창을 반투명으로 설정할 수 있습니다. 그러나 일부 애플리케이션에서는 이 기능이 작동하지 않을 수 있으며, 예를 들어 GitHub 앱이 그러합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### 플로팅 창 투명도

Android 플로팅 창은 투명도를 조정할 수 있습니다. 플로팅 창을 활성화하되 숨기고 싶다면 투명도를 0으로 설정하면, 플로팅 창은 클릭 이벤트를 통과하도록 자동으로 '터치 불가' 상태로 설정됩니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### 플로팅 창-SVG

Android 플로팅 창에 아이콘이 설정되지 않은 경우 기본적으로 RustDesk 아이콘이 표시됩니다.
설정 시 SVG의 텍스트 내용을 한 줄로 작성하고, [SVG support limitations](https://bigbadaboom.github.io/androidsvg/index.html)에 유의해 주십시오.

| Default | Example |
| :------: | :------: |
| RustDesk icon | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### 화면 켜기 유지

이는 Android 제어 측용입니다. 화면을 켜둔 상태로 유지하는 것은 플로팅 창에 의존합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### 수신 세션 동안 화면을 깨워두기

수신 원격 데스크톱 세션 동안 화면을 깨워둡니다. 이는 애플리케이션이 원격 연결에 적극적으로 사용되는 동안 장치가 절전 모드로 전환되지 않도록 도와줍니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `keep-awake-during-incoming-sessions=N` |

### 발신 세션 동안 화면을 깨워두기

원격 데스크톱 발신 세션 동안 화면을 깨워둡니다. 이는 애플리케이션이 원격 연결에 적극적으로 사용되는 동안 장치가 절전 모드로 전환되지 않도록 도와줍니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `keep-awake-during-outgoing-sessions=N` |

### enable-directx-capture

이는 Windows 제어 측용입니다. 문제가 발생하지 않는다면, GDI를 직접 사용하는 대신 DirectX를 스크린샷에 우선적으로 사용하도록 하는 기본 설정을 사용하는 것이 좋습니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### android 소프트웨어 인코딩 반값 활성화

이는 Android 제어 측에 적용됩니다. 기본적으로 해상도가 1200보다 클 경우 하드웨어 인코딩은 원본 해상도를 사용하고, 소프트웨어 인코딩은 속도가 느리므로 해상도의 절반을 사용합니다. 이 옵션은 소프트웨어 인코딩이 해상도의 절반으로 스케일링되어야 하는지 설정하는 데 사용됩니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### 원격 cm 수정 허용

제어 측에서 수락 창(연결 관리 창)을 클릭하여 연결을 수락하고 권한을 변경하는 등의 작업을 허용할지 여부를 제어합니다.

https://github.com/rustdesk/rustdesk/issues/7425

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### enable-perm-change-in-accept-window

사용자가 수신 세션을 수락하기 전에 수락 창(연결 관리 창)에서 권한을 변경할 수 있는지 여부를 제어합니다.

데스크톱에서는 이 설정이 수락 창(연결 관리 창)의 모든 권한에 영향을 미칩니다. Android에서는 다음 권한에 영향을 미칩니다: 파일 전송, 오디오 캡처 및 클립보드 허용입니다. 화면 캡처와 입력 제어는 영향을 받지 않습니다.

**미리보기**: https://github.com/rustdesk/rustdesk/pull/14875

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `enable-perm-change-in-accept-window=Y` |

### preset-password-경고제거

사용자 지정 클라이언트에 사전 설정된 비밀번호가 있을 때 GUI에서 보안 경고를 제거할지 여부를 제어합니다.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

일부 설정을 숨길지 여부를 제어합니다. `Disable settings`가 꺼짐 상태인지 확인하십시오. 그렇지 않으면 이 설정들이 작동하지 않습니다.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### 카드에서 사용자 이름 숨기기

장치 목록에 사용자 이름을 표시할지 여부를 제어합니다. 때로는 사용자 이름이 너무 길어 다른 정보를 숨깁니다.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

GUI에서 UAC/권한 경고를 표시할지 여부를 제어합니다.

https://github.com/rustdesk/rustdesk/issues/8687

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### 표시 이름

원격 장치에 연결할 때 팝업에 표시되는 표시 이름을 변경하세요. 기본적으로 로그인 사용자의 이름이 먼저 표시되며, 그렇지 않으면 운영 체제의 사용자 이름이 표시됩니다.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### UDP 비활성화

TCP만 사용할지 여부를 제어합니다. 더 이상 UDP 21116를 사용하지 않고 대신 TCP 21116를 사용하게 됩니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### 사전 설정된 사용자 이름 / 사전 설정된 전략 이름 / 사전 설정된 장치 그룹 이름 / 사전 설정된 장치 사용자 이름 / 사전 설정된 장치 이름 / 사전 설정된 노트

사용자 / 전략 / 장치 그룹 / 장치 사용자 이름 / 장치 이름(호스트명) / 노트를 장치에 할당하십시오. [command line](/docs/ko/self-host/rustdesk-server-pro/console/#웹-콘솔을-통해-장치-사용자전략장치-그룹을-장치에-할당하기)를 통해 이 작업을 수행할 수도 있습니다.

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

장치 그룹은 RustDesk 클라이언트 >=1.3.8, 프로 >= 1.5.0에서 사용 가능합니다.

사전 설정된 장치 사용자 이름, 사전 설정된 장치 이름, 사전 설정된 노트는 RustDesk 클라이언트 >=1.4.3, 프로 >= 1.6.6에서 사용 가능합니다.

### 기본 연결 비밀번호

`default connection password`를 사용하여 원격 장치와의 연결을 설정합니다. 이 비밀번호는 제어 측에서 구성되며, 제어되는(수신 전용) 클라이언트에서 발견되는 어떤 [preset password](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access)와도 혼동되어서는 안 됩니다.

예: `default-connect-password=abcd1234`

### 신뢰할 수 있는 장치 활성화

신뢰할 수 있는 장치가 2FA 인증을 건너뛸 수 있도록 허용합니다.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### 트레이 숨기기

시스템 트레이의 트레이 아이콘을 비활성화합니다.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### hide-stop-service

서비스가 실행 중일 때 서비스 중지/전환 컨트롤을 숨깁니다. 이는 주로 사용자 지정 클라이언트에서 사용자가 UI(데스크톱 설정, 트레이 메뉴, Android 서버 페이지 및 Android 플로팅 창 메뉴)에서 서비스를 중지하는 것을 방지하기 위한 것입니다.

서비스가 중지되면 시작/활성화 항목은 계속 표시됩니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `hide-stop-service=Y` |

### 일방향 클립보드 리디렉션

제어된 측에서 제어하는 측으로의 클립보드 동기화를 사용 안 함, RustDesk 클라이언트 >=1.3.1(제어된 측)에서 사용 가능

https://github.com/rustdesk/rustdesk/discussions/7837

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### 일방향 파일 전송

제어되는 쪽에서 제어하는 쪽으로의 파일 전송을 비활성화하며, RustDesk 클라이언트 >=1.3.1(제어되는 쪽)에서 사용 가능합니다.

https://github.com/rustdesk/rustdesk/discussions/7837

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |

### sync-init-clipboard

연결을 설정할 때 클립보드를 동기화하려면(제어 측에서 제어 대상 측으로만), RustDesk 클라이언트 >=1.3.1(제어 측)에서 사용 가능합니다.

https://github.com/rustdesk/rustdesk/discussions/9010

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### 로그온 화면 비밀번호 허용

[click-only approve mode](/docs/ko/self-host/client-configuration/advanced-settings/#승인-모드)를 사용할 때 로그온 화면에서 비밀번호 입력을 허용하는 경우, RustDesk 클라이언트 >=1.3.1(제어 측)에서 사용 가능합니다.

활성화 시 현재 세션이 로그온 또는 잠금 화면 상태일 때 영구 비밀번호도 허용됩니다. 이는 클릭, 비밀번호, 그리고 둘 다 승인 모드에 적용됩니다. RustDesk 클라이언트 >=1.4.7(제어 측)

https://github.com/rustdesk/rustdesk/discussions/9269

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

일반적으로 HTTPS는 포트 443을 사용합니다. API 서버의 포트가 실수로 21114로 설정된 경우, RustDesk 클라이언트는 기본적으로 21114 포트 설정을 제거합니다. 옵션을 Y로 설정하면 21114를 HTTPS 포트로 사용할 수 있습니다. RustDesk 클라이언트 >=1.3.9에서 사용 가능합니다.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D 렌더링은 높은 FPS를 얻을 수 있고 CPU 사용량을 줄일 수 있지만, 일부 장치에서는 원격 제어 화면이 검게 표시될 수 있습니다. RustDesk 클라이언트 >=1.3.9에서 사용 가능하며, Windows에서만 지원됩니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### 호스트명을 ID로 허용

[Use hostname as id](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), 호스트명에 공백이 있으면 '-'로 대체됩니다. 이는 100% 보장되는 것은 아니며, RustDesk 클라이언트를 처음 실행할 때만 발생합니다(즉, 새로 설치된 클라이언트에서만). 충돌이 발생하면 임의의 ID가 할당됩니다.

RustDesk 클라이언트 버전 1.4.0 이상에서 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### 웹소켓 사용

서버와 클라이언트를 연결하려면 웹소켓 프로토콜을 사용하세요. 이 기능은 RustDesk 클라이언트 버전 1.4.0 이상 및 Pro 서버 버전 1.5.7 이상에서만 사용 가능합니다. 웹소켓은 릴레이 연결만 지원한다는 점에 유의해 주세요.

웹소켓이 작동하도록 하려면 역프록시를 올바르게 구성해야 합니다. 자세한 내용은 [여기](/docs/ko/self-host/rustdesk-server-pro/faq/#8-id-서버와-릴레이-서버에-websocket-secure-wss-지원을-추가하여-모든-플랫폼에서-안전한-통신을-가능하게-하십시오)를 참조하세요.

**위치**:

**데스크톱** 설정 → 네트워크 → 웹소켓 사용  
**모바일** 설정 → 웹소켓 사용

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### 허용-숫자-only-일회용비밀번호

이 옵션은 숫자만 포함된 일회용 비밀번호의 사용을 활성화하거나 비활성화합니다.
RustDesk 클라이언트 1.4.1 이상 및 Pro 서버 1.5.9 이상에서만 사용 가능합니다.

**토론**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**미리보기**: https://github.com/rustdesk/rustdesk/pull/11846

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### 디바이스 등록

디바이스를 등록하지 마세요. 그러면 웹 콘솔의 디바이스 페이지에 표시되지 않습니다.

**Pro 서버 >= 1.6.0에서만 사용 가능하며, [custom2 license](https://rustdesk.com/pricing#custom2) 및 동시 연결 수 >= 2가 필요합니다.**

`register-device=N`인 경우, 아래는 이 장치에서 작동하지 않습니다.
- 로그인
- `--assign` 명령
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note`, `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- 감사 로그
- 전략

**토론**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 및 https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### 메인-윈도우-항상-최상위

메인 창을 항상 최상위에 유지합니다.

**토론**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

RustDesk 클라이언트 1.4.2에서만 사용 가능합니다.

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### 릴레이-서버

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### 디스커버리 패널 비활성화

RustDesk 클라이언트에서 `Discovered` 패널(또는 `Favorites` 패널 옆)을 비활성화합니다.

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### 터치 모드

원격 제어 세션 중에 터치 모드를 사용할지 마우스 모드를 사용할지 여부를 제어합니다.

#### 버전별 동작 차이

##### RustDesk(제어 측) < 1.4.3

첫 번째 연결 이후, 이 옵션은 각 피어에 대해 "터치 모드" 설정을 지정합니다. 이후에는 각 피어의 개별 설정이 터치 모드 또는 마우스 모드 사용 여부를 결정합니다.

**위치**:

1. **데스크톱**
2. **모바일** 설정 → 디스플레이 설정 → 기타 기본 옵션 → 터치 모드

##### RustDesk(제어 측) >= 1.4.3

이 옵션은 모든 피어 장치가 터치 모드 또는 마우스 모드를 사용하도록 통합적으로 제어하며, 개별 장치 설정을 무시합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

모바일 -> 데스크톱으로 전환 시 가상 마우스의 디스플레이를 제어합니다.

**위치**:

1. **데스크톱**
2. **모바일** 원격 세션 -> 하단 탐색 바 -> 제스처 도우미

RustDesk 1.4.3부터 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**노트**: 이 옵션은 **재정의 설정**이 아닌 **기본 설정**에서 구성해야 합니다.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

모바일 -> 데스크톱 시 전환 시 가상 조이스틱의 디스플레이를 제어합니다.

이 옵션을 사용하려면 **show-virtual-mouse**가 활성화되어 있어야 합니다.

**위치**:

1. **데스크톱**
2. **모바일** 원격 세션 -> 하단 탐색 바 -> 제스처 도우미

RustDesk 1.4.3부터 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**노트**: 이 옵션은 **재정의 설정**이 아닌 **기본 설정**에서 구성해야 합니다.

### 보안되지 않은 TLS 폴백 허용

기본적으로 RustDesk는 TLS를 사용하는 프로토콜에 대해 서버 인증서를 검증합니다.

이 옵션을 활성화하면, 검증 실패 시 RustDesk가 검증 단계를 건너뛰고 계속 진행하게 됩니다.

**위치**:

**데스크톱** 설정 → 네트워크 → 보안되지 않은 TLS 폴백 허용  
**모바일** 설정 → 보안되지 않은 TLS 폴백 허용  

RustDesk 1.4.4부터 사용 가능합니다.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-insecure-tls-fallback=Y` |

### allow-ask-for-note

연결이 끝날 때 제어 측에 노트를 입력하도록 요청합니다.

클라이언트 UI에서 이 옵션을 활성화하고 아직 로그인하지 않은 경우, RustDesk는 먼저 로그인하도록 요청합니다.

**위치**:

1. **데스크톱** 설정 → 기타 → 연결 종료 시 노트 요청
2. **모바일** 설정 → 연결 종료 시 노트 요청

RustDesk 1.4.4부터 사용 가능합니다.

**토론**: https://github.com/rustdesk/rustdesk/discussions/14606

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-ask-for-note=Y` |

### 비밀번호 변경 영구 금지

영구 비밀번호를 변경할 수 있는 기능을 비활성화합니다. 활성화된 경우 사용자는 UI 또는 명령줄을 통해 영구 비밀번호를 설정하거나 수정할 수 없습니다.

RustDesk 1.4.5부터 사용 가능

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-permanent-password=Y` |

### 변경-ID 비활성화

장치 ID를 변경할 수 있는 기능을 비활성화합니다. 활성화된 경우 사용자는 UI 또는 명령줄을 통해 ID를 변경할 수 없습니다.

RustDesk 1.4.5부터 사용 가능

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-id=Y` |

### unlock-pin 비활성화

PIN을 사용하여 설정 잠금 해제를 비활성화합니다. 활성화된 경우, PIN이 설정되어 있더라도 사용자는 시스템 관리자 권한을 사용해야만 설정을 잠금 해제할 수 있습니다.

RustDesk 1.4.5부터 사용 가능

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `disable-unlock-pin=Y` |

### 설정 비활성화 시 명령줄 설정 허용

사용자 지정 클라이언트에서 `Disable settings`가 활성화된 경우 명령줄 설정을 통해 구성할 수 있습니다. Y로 설정하면 UI 설정만 비활성화되며, 명령줄 설정을 사용해 클라이언트를 구성할 수 있습니다.

RustDesk 1.4.7부터 사용 가능

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | N | `allow-command-line-settings-when-settings-disabled=Y` |