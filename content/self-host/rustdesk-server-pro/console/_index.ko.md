---
title: 웹 콘솔
weight: 10
description: "RustDesk Server Pro 웹 콘솔을 사용하여 포트 21114에서 장치, 사용자, 권한, 로그 및 기타 관리 설정을 관리하십시오."
keywords: ["rustdesk web console", "rustdesk server pro console", "rustdesk port 21114", "rustdesk device management", "rustdesk admin console"]
---

RustDesk Server Pro 웹 콘솔은 디바이스, 사용자, 권한 및 로그를 관리하는 주요 관리 인터페이스입니다.

웹 콘솔은 RustDesk 서버 Pro에 통합되어 있으며, `21114` 포트에서 서비스됩니다.

## RustDesk Server Pro 웹 콘솔이란?

웹 콘솔은 자체 호스팅된 RustDesk Server Pro 배포의 주요 제어 플레인입니다. 관리자는 여기서 사용자, 디바이스, 그룹, 권한, 정책, 릴레이 설정, SMTP, 토큰 및 사용자 지정 클라이언트를 관리합니다.

## 첫 번째 관리자 체크리스트

1. `21114` 포트에서 웹 콘솔에 로그인하세요.
2. 기본 `admin` 비밀번호를 즉시 변경하세요.
3. 라이선스가 아직 활성화되지 않았다면 입력하세요.
4. 초대 및 이메일 인증을 원한다면 SMTP를 구성하세요.
5. 기본 계정에 의존하지 않고 추가 관리자 또는 위임 계정을 생성하세요.
6. 더 넓은 배포 전에 릴레이, 정책 및 클라이언트 설정을 구성하세요.

## 웹 콘솔에서 할 수 있는 일은 무엇인가요?

- 사용자, 사용자 그룹 및 관리자 접근권한 관리
- 디바이스, 디바이스 그룹 및 할당 관리
- 접근 규칙, 정책, 제어 역할 및 관리자 역할 구성
- 로그 및 활성 세션 보기
- SMTP, 릴레이, 토큰 및 기타 서버 설정 관리
- 사용자 지정 클라이언트 빌드 및 구성 페이로드 생성

기능:

- 장치 둘러보기
- 사용자 및 사용자 그룹 추가/수정
- 장치 액세스 권한 수정
- 장치 연결 로그 및 기타 로그 둘러보기
- 설정 업데이트
- 클라이언트 설정 동기화 전략(Strategy) 관리
- 공유 주소록 관리
- 사용자 지정 클라이언트 빌드 생성

## 로그인

웹 콘솔의 기본 포트는 21114입니다. 다음 그림과 같이 브라우저에 `http://<server ip>:21114`를 입력하여 콘솔 페이지로 들어가세요. 기본 관리자 사용자 이름/비밀번호는 `admin`/`test1234`입니다:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

HTTPS 지원이 필요하다면 `Nginx`와 같은 웹 서버를 설치하거나 Windows용 `IIS`를 사용하십시오.

로그인한 후 반드시 비밀번호를 변경하십시오. 오른쪽 상단의 계정 메뉴에서 `Settings`를 선택하여 비밀번호 변경 페이지로 이동하십시오. 아래 그림과 같습니다. 또한 다른 관리자 계정을 생성하고 현재 계정을 삭제할 수도 있습니다. 이메일 로그인 인증을 활성화하는 것이 좋습니다.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

비관리자 사용자도 로그인하여 기기 및 로그를 둘러보고 사용자 설정을 변경할 수 있습니다.

## 자동 구성
`Windows EXE`를 클릭하면 자신의 RustDesk Server Pro용 구성 파일을 얻을 수 있으며, 이는 클라이언트를 구성하는 데 도움이 됩니다.

Windows 클라이언트의 경우 사용자 지정 서버 구성은 생략하고 대신 `rustdesk.exe` 파일명에 구성 정보를 입력할 수 있습니다. 위와 같이 콘솔 환영 페이지로 이동한 후 `Windows EXE`를 클릭하십시오. **클라이언트 ≥ 1.1.9 필요합니다.**

이 기능은 [client config](https://rustdesk.com/docs/en/self-host/client-configuration/) 및 [deployment scripts](https://rustdesk.com/docs/en/self-host/client-deployment/)와 함께 사용하여 클라이언트를 설정하는 데 활용할 수 있습니다.

## 기본 `admin` 사용자 외에 새 사용자 생성하기

{{% notice note %}}
`Individual` 플랜에는 이 기능이 없습니다.
{{% /notice %}}

1. 왼쪽 메뉴에서 `Users`를 클릭하세요.
2. `administrator`가 활성화된 다른 계정을 생성하세요.
3. 새 관리자 계정으로 로그인하세요.
4. `Users` 페이지에서 `admin`를 삭제하세요.

## 새 사용자 생성
1. 왼쪽 메뉴에서 `Users`를 클릭하세요.
2. 새 사용자를 생성하세요.
3. 그들이 속할 그룹을 선택하세요(새로운 그룹을 추가해야 하는 경우 계속 읽어주세요).

## 새 그룹 추가
1. 왼쪽 메뉴에서 `Groups`를 클릭하세요.
2. 새 그룹을 생성하세요.
3. 생성된 후 그룹 간에 서로 접근 권한을 부여할 수 있습니다. `Edit`를 클릭하세요.
4. 접근하고자 하는 관련 그룹을 선택하세요(해당 그룹에 자동으로 추가됩니다).

## 여러 릴레이 서버 설정하기
1. 왼쪽 메뉴에서 `Settings`로 이동하세요.
2. 하위 메뉴에서 `Relay`를 클릭하세요.
3. `Relay Servers` 옆에 있는 `+`를 클릭하세요.
4. 이제 표시되는 상자에 릴레이 서버의 DNS 주소 또는 IP 주소를 입력하고 <kbd>Enter</kbd> 키를 누르세요.
5. 릴레이 서버가 하나 이상인 경우 계속해서 `+`를 클릭하고 지리적 설정을 조정할 수 있습니다(다른 서버에도 키를 기억하고 복사해 두세요).

## 라이선스 설정 또는 변경
1. 왼쪽 메뉴에서 `Settings`로 이동하세요.
2. 하위 메뉴에서 `License`를 클릭하세요.
3. `Edit`를 클릭하고 라이선스 코드를 붙여넣으세요.
4. `OK`를 클릭하세요.

## 로그 보기
왼쪽에서 `Logs`를 클릭하세요.

## 이메일 설정
이 예제에서는 Gmail을 사용합니다.

1. 왼쪽 메뉴에서 `Settings`로 이동하세요.
2. 하위 메뉴에서 `SMTP`를 클릭하세요.
3. SMTP 주소 `smtp.gmail.com`를 입력하세요.
4. `SMTP Port`에 포트 587을 입력하세요.
5. Gmail 계정, 즉 `myrustdeskserver@gmail.com`를 `Mail Account`에 입력하세요.
6. 비밀번호를 입력하세요(앱 비밀번호가 필요할 수 있습니다).
7. Gmail 계정, 즉 `myrustdeskserver@gmail.com`를 `From`에 입력하세요.
8. 저장하려면 `Check`를 클릭하세요.

## 웹 콘솔을 통해 장치 사용자/전략/장치 그룹을 장치에 할당하기

사용자는 장치에서 로그인한 RustDesk 사용자이거나, 장치 옆의 **편집**을 클릭하여 장치에 할당된 사용자입니다. **사용자** 상자에서 클릭하고 드롭다운 메뉴를 열어 사용자를 선택하세요.  
또한 **사용자 목록**에서 **더 보기 → 장치 할당**을 클릭하여 여러 장치를 한 번에 사용자에게 할당할 수도 있습니다.

장치 그룹에 장치를 추가하려면, **장치 목록**에서 장치 옆의 **편집**을 클릭하고 **그룹**을 변경하거나, **장치 그룹** 목록으로 이동해 장치 그룹 이름을 클릭한 후 해당 그룹 내의 장치를 조정할 수 있습니다.

장치에 전략을 할당하려면, **전략** 목록의 오른쪽을 마우스로 가리킨 후 메뉴에서 **장치 편집**, **사용자 편집**, 또는 **장치 그룹 편집**을 클릭해 선택된 전략에 해당 장치, 사용자 장치, 또는 장치 그룹 장치를 추가하세요.

---

## API 토큰

먼저 **설정 → 토큰 → 생성**으로 이동해 필요한 권한을 가진 토큰을 생성해야 합니다: **장치, 감사 로그, 사용자, 그룹, 전략, 주소록**.  

토큰이 생성되면, 이를 **명령줄**이나 **파이썬 CLI**를 통해 해당 권한을 가진 작업을 수행하는 데 사용할 수 있습니다.

### 명령줄에서 토큰을 통한 할당

RustDesk 실행 파일을 `--assign` 매개변수와 함께 사용해 할당 작업을 수행할 수도 있습니다.  
이를 통해 명령줄에서 바로 사용자, 전략, 주소록, 또는 장치 그룹을 장치에 할당할 수 있습니다.

**예시:**

```bash
"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>
```

지원되는 매개변수

| 매개변수                               | 설명                             | RustDesk 서버 Pro | RustDesk 클라이언트 |
| --------------------------------------- | --------------------------------------- | ------------------- | --------------- |
| `--user_name <username>`                | 사용자를 장치에 할당              |                     |                 |
| `--strategy_name <strategyname>`        | 장치에 전략을 할당               |                     |                 |
| `--address_book_name <addressbookname>` | 장치를 주소록에 할당              |                     |                 |
| `--address_book_tag <addressbooktag>`   | 주소록 태그로 할당                |                     |                 |
| `--address_book_alias <alias>`          | 주소록 별명으로 할당              | 1.5.8               | 1.4.1           |
| `--address_book_password <password>`    | 주소록 항목의 비밀번호 설정       | 1.6.6               | 1.4.3           |
| `--address_book_note <note>`            | 주소록 항목의 노트 설정           | 1.6.6               | 1.4.3           |
| `--device_group_name <devicegroupname>` | 장치를 장치 그룹에 할당           |                     |                 |
| `--note <note>`                         | 장치에 노트 추가                  | 1.6.6               | 1.4.3           |
| `--device_username <device_username>`   | 장치의 사용자 이름 설정           | 1.6.6               | 1.4.3           |
| `--device_name <device_name>`           | 장치의 이름 설정                   | 1.6.6               | 1.4.3           |
| [`--deploy`](/docs/ko/self-host/client-deployment/#explicit-deployment-for-new-devices) | **새 장치 배포 필요**가 활성화된 경우 새 장치를 등록합니다. **장치** 권한이 **읽기 및 쓰기**로 설정된 API 토큰이 필요합니다. | 1.8.3 | 1.4.7 |

Windows의 명령줄은 기본적으로 출력이 없습니다. 출력을 얻으려면 다음과 같이 실행하세요: `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` 또는 `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, [here](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)를 참조하세요.

### Python CLI 관리 도구

#### 사용자 관리 (`users.py`)

**도움말 표시:**  
`./users.py -h`

**사용자 보기:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**필터:**  
- `--name`: 사용자 이름(퍼지 검색)
- `--group_name`: 사용자 그룹(정확한 일치)

**예제:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**기본 작업:**

- **사용자 비활성화:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **사용자 활성화:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **사용자 삭제:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**사용자 생성 및 초대:**

- **새 사용자 생성:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "note"]`
  
  필수: `--name`, `--password`, `--group_name`  
  선택적: `--email`, `--note`

- **이메일로 사용자 초대:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "note"]`
  
  필수: `--email`, `--name`, `--group_name`  
  선택적: `--note`

**2FA 및 보안 작업:**

- **2FA 시행 활성화:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  필수: `--web-console-url`

- **2FA 시행 비활성화:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  선택적: `--web-console-url`

- **2FA 재설정:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **이메일 인증 비활성화:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **강제 로그아웃:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**참고:**
- 여러 사용자(필터로 매칭됨)를 작업할 때, 확인을 요청받게 됩니다.
- 필터에 맞는 사용자가 없으면 "사용자 0명 발견"이라고 표시됩니다.

---

#### 사용자 그룹 관리 (`user_group.py`)

**도움말 표시:**  
`./user_group.py -h`

**사용자 그룹 보기:**  
`./user_group.py --url <url> --token <token> view [--name <group_name>]`

**예제:**  
`./user_group.py --url https://example.com --token <token> view --name "Sales Team"`

**그룹 작업:**

- **사용자 그룹 생성:**  
  `./user_group.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  접근 제어 포함 예제:  
  `./user_group.py --url <url> --token <token> add --name "Engineering" --accessed-from '[{"type":0,"name":"Managers"}]' --access-to '[{"type":1,"name":"DevServers"}]'`

- **사용자 그룹 업데이트:**  
  `./user_group.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>'] [--access-to '<json>']`

- **사용자 그룹 삭제:**  
  `./user_group.py --url <url> --token <token> delete --name "GroupName"`
  
  쉼표로 구분된 이름 지원: `--name "Group1,Group2,Group3"`

**그룹 내 사용자 관리:**

- **그룹의 사용자 보기:**  
  `./user_group.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  필터:
  - `--name`: 그룹 이름(정확한 일치, 선택 사항)
  - `--user-name`: 사용자 이름(부분 일치 검색, 선택 사항)
  
  예제:  
  `./user_group.py --url <url> --token <token> view-users --name Default --user-name john`

- **그룹에 사용자 추가:**  
  `./user_group.py --url <url> --token <token> add-users --name "GroupName" --users "user1,user2,user3"`

**액세스 제어 매개변수:**

- `--accessed-from`: 이 사용자 그룹에 액세스할 수 있는 사람을 정의하는 JSON 배열
  - 유형 0 = 사용자 그룹(예: `[{"type":0,"name":"Admins"}]`)
  - 유형 2 = 사용자(예: `[{"type":2,"name":"john"}]`)

- `--access-to`: 이 사용자 그룹이 액세스할 수 있는 내용을 정의하는 JSON 배열
  - 유형 0 = 사용자 그룹(예: `[{"type":0,"name":"Support"}]`)
  - 유형 1 = 디바이스 그룹(예: `[{"type":1,"name":"Servers"}]`)

**권한 요구 사항:**
- `view/add/update/delete/add-users` 명령은 **사용자 그룹 권한**이 필요합니다.
- `view-users` 명령은 **사용자 권한**이 필요합니다.

---

#### 디바이스 그룹 관리 (`device_group.py`)

**도움말 표시:**  
`./device_group.py -h`

**디바이스 그룹 보기:**  
`./device_group.py --url <url> --token <token> view [--name <group_name>]`

**예제:**  
`./device_group.py --url https://example.com --token <token> view`

**그룹 작업:**

- **디바이스 그룹 생성:**  
  `./device_group.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>']`
  
  예제:  
  `./device_group.py --url <url> --token <token> add --name "Production" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **기기 그룹 업데이트:**  
  `./device_group.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>']`

- **기기 그룹 삭제:**  
  `./device_group.py --url <url> --token <token> delete --name "GroupName"`
  
  쉼표로 구분된 이름 지원: `--name "Group1,Group2,Group3"`

**그룹별 기기 관리:**

- **그룹의 장치 보기:**  
  `./device_group.py --url <url> --token <token> view-devices [filters]`
  
  사용 가능한 필터:
  - `--name`: 장치 그룹 이름(정확한 일치)
  - `--id`: 장치 ID(부분 일치 검색)
  - `--device-name`: 장치 이름(부분 일치 검색)
  - `--user-name`: 사용자 이름/소유자(부분 일치 검색)
  - `--device-username`: 장치에서 로그인한 사용자 이름(부분 일치 검색)
  
  예시:

  ```bash
  # View all devices in a group
  ./device_group.py --url <url> --token <token> view-devices --name Production
  
  # Search by device name
  ./device_group.py --url <url> --token <token> view-devices --device-name server
  
  # Combine filters
  ./device_group.py --url <url> --token <token> view-devices --name Production --user-name john
  ```

- **그룹에 장치 추가:**  
  `./device_group.py --url <url> --token <token> add-devices --name "GroupName" --ids "deviceid1,deviceid2"`

- **그룹에서 장치 제거:**  
  `./device_group.py --url <url> --token <token> remove-devices --name "GroupName" --ids "deviceid1,deviceid2"`

**액세스 제어 매개변수:**

- `--accessed-from`: 이 장치 그룹에 접근할 수 있는 사람을 정의하는 JSON 배열
  - 유형 0 = 사용자 그룹(예: `[{"type":0,"name":"Engineers"}]`)
  - 유형 2 = 사용자(예: `[{"type":2,"name":"admin"}]`)

**권한 요구 사항:**
- `view/add/update/delete/add-devices/remove-devices` 명령은 **장치 그룹 권한**이 필요합니다.
- `view-devices` 명령은 **장치 권한**이 필요합니다.

---

#### 장치 관리 (`devices.py`)

**도움말 표시:**  
`./devices.py -h`

**장치 보기:**  
`./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]`

**필터:**  
`--id`: 장치 ID  
`--device_name`: 장치 이름  
`--user_name`: 할당된 사용자  
`--group_name`: 사용자 그룹  
`--device_group_name`: 장치 그룹  
`--offline_days`: 오프라인 일수

**예제:**  
`./devices.py --url https://example.com --token <token> view --user_name mike`

**작업:**  
view는 `enable`, `disable`, `delete` 또는 `assign`로 대체할 수 있습니다.

**예제 (장치 할당):**  
`./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike`

---

#### 주소록 관리 (`ab.py`)

**도움말 표시:**  
`./ab.py -h`

**공유된 주소록 보기:**  
`./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]`

**개인 주소록 GUID 받기:**  
`./ab.py --url <url> --token <token> get-personal-ab`

**공유 주소록 추가하기:**  
`./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]`

**공유 주소록 업데이트 또는 삭제하기:**  
`./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]`  
`./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>`

**주소록에서 피어 보기:**  
`./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]`

**피어 추가, 업데이트 또는 삭제:**  
`./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>`

**태그 관리:**  
`./ab.py --url <url> --token <token> view-tag --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]`  
`./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000`  
`./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>`

**액세스 규칙 관리:**  
`./ab.py --url <url> --token <token> view-rule --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full`  
`./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw`  
`./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>`

**예제 (사용자 "mike"에 대한 읽기 전용 규칙 추가):**  
`./ab.py --url https://example.com --token <토큰> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro`

---

#### 전략 관리(`strategies.py`)

**도움말 표시:**  
`./strategies.py -h`

**모든 전략 목록 보기:**  
`./strategies.py --url <url> --token <토큰> list`

**특정 전략 보기:**

```bash
# By name
./strategies.py --url <url> --token <token> view --name "Default"

# By GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**전략 활성화 또는 비활성화:**

```bash
./strategies.py --url <url> --token <token> enable --name "StrategyName"
./strategies.py --url <url> --token <token> disable --name "StrategyName"
```

**장치, 사용자 또는 장치 그룹에 전략 할당:**

```bash
# Assign to devices (by device ID)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Assign to users (by username)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Assign to device groups (by group name)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Mixed assignment
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**할당 해제 전략:**  

```bash
# Unassign from devices
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Unassign from users
./strategies.py --url <url> --token <token> unassign --users "admin"

# Unassign from device groups
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**참고:**
- 스크립트는 사용자 및 장치 그룹에 대해 이름과 GUID 모두를 지원합니다.
- 장치 ID는 자동으로 GUID로 변환됩니다.
- 모든 할당/해제 작업은 한 번에 여러 리소스를 대상으로 할 수 있습니다.

**권한 요구 사항:**
- `list/view/enable/disable/assign/unassign` 명령은 **전략 권한**이 필요합니다.
- `--peers`는 **장치 권한:r**이 필요합니다. (ID에서 GUID 조회용)
- `--users`는 **사용자 권한:r**이 필요합니다. (사용자 이름에서 GUID 조회용)
- `--device-groups`는 **장치 그룹 권한:r**이 필요합니다. (이름에서 GUID 조회용)

---

#### 감사( `audits.py`)

**도움말 표시:**  
`./audits.py -h`

**연결 감사 보기:**  
`./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**파일 감사 보기:**  
`./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**알람 감사 보기:**  
`./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**콘솔 감사 보기:**  
`./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**필터:**  
`--remote`: 피어 ID(연결 또는 파일 감사용)  
`--conn-type`: 0=원격 데스크톱, 1=파일 전송, 2=포트 전송, 3=카메라 보기, 4=터미널  
`--device`: 장치 ID(알람 감사용)  
`--operator`: 운영자 사용자 이름(콘솔 감사용)  
`--created-at`: 로컬 시간 필터, 예: "2025-09-16 14:15:57"  
`--days-ago`: 주어진 일수보다 새로운 기록 필터  
`--page-size` / `--current`: 페이징

**예제:**  
`./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7`

## 장치 검색
1. 장치로 이동하세요.
2. 장치 이름 검색 필드에 이름을 입력하고 `Query`를 클릭하거나 <kbd>Enter</kbd> 키를 누르세요.
3. 와일드카드를 사용하려면 검색어의 시작, 끝 또는 양쪽에 `%`를 추가하세요.