---
title: 주소록
weight: 201
description: "RustDesk Server Pro에서 주소록을 사용하여 원격 장치를 저장하고, 장치 목록을 공유하고, 태그로 장치를 정리하고, RustDesk 클라이언트에서 공유 비밀번호로 연결하십시오."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

주소록을 사용하면 RustDesk 장치 ID를 저장하고, 태그로 정리하고, 장치 목록을 공유하고, RustDesk 클라이언트에서 저장된 비밀번호로 연결할 수 있습니다.

## 빠른 답변

- **내 주소록**은 로그인한 사용자에게만 표시되는 개인 주소록입니다. 수동으로 입력한 후 기억된 비밀번호는 **내 주소록**에 저장되며 해당 사용자의 여러 장치 간에 동기화할 수 있습니다.
- **공유** 주소록은 특정 사용자, 사용자 그룹 또는 모든 사용자와 공유할 수 있습니다.
- 공유 주소록에는 주소록 수준 비밀번호를 저장할 수 있고, 각 장치 항목에는 장치 수준 비밀번호를 저장할 수 있습니다. 장치 수준 비밀번호가 설정되지 않은 경우 주소록 수준 비밀번호가 사용됩니다.
- 태그를 사용하여 웹 콘솔과 RustDesk 클라이언트에서 장치를 필터링할 수 있습니다.

## 공유 주소록을 사용한 원클릭 연결

사용자가 매번 원격 비밀번호를 수동으로 입력하지 않고 연결해야 하는 경우 공유 주소록을 사용하십시오.

1. 공유 주소록을 만들거나 엽니다. 필요한 경우 주소록에 **주소록 수준 비밀번호**를 설정합니다.

2. 주소록 이름을 클릭하여 장치 페이지를 엽니다. **가져오기**를 클릭하고 주소록으로 가져올 장치를 선택한 다음, 하단의 **저장**을 클릭하여 선택한 장치를 저장합니다. 또는 **추가**를 클릭하여 ID로 장치를 추가합니다. 직접 IP 접근의 경우 IP 주소를 ID로 사용합니다. 필요한 경우 개별 장치 항목에 **장치 수준 비밀번호**를 설정합니다.

3. 특정 사용자, 사용자 그룹 또는 모든 사용자와 주소록을 공유합니다.

4. 사용자가 RustDesk 클라이언트에 로그인하고 **주소록** 탭을 엽니다.

5. 사용자가 공유 주소록을 선택하고 장치 카드를 클릭합니다.

![클라이언트에서 공유 주소록의 장치 카드 클릭](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
공유 비밀번호는 해당 공유 주소록에서 장치 카드를 클릭하거나 드롭다운 메뉴를 사용하여 연결할 때만 사용됩니다. 다른 장치 탭, ID 입력란 옆의 **연결** 버튼, 또는 다른 공유 주소록에서 연결할 때는 사용되지 않습니다.
{{% /notice %}}

## 공유 주소록 권한

| 권한 | 사용자가 할 수 있는 작업 |
| --- | --- |
| **읽기 전용** | 장치와 태그를 볼 수 있고, 비밀번호를 사용할 수 있습니다. |
| **읽기/쓰기** | 장치와 태그를 편집할 수 있습니다. |
| **모든 권한** | 주소록을 다시 공유하거나 삭제하거나 이름을 변경할 수 있습니다. |

동일한 사용자에게 여러 규칙이 적용되는 경우 우선순위는 다음과 같습니다.

1. 사용자
2. 그룹
3. 모든 사용자

예를 들어 **모든 사용자**가 읽기 전용이더라도 특정 사용자에게 모든 권한이 부여되어 있으면, 해당 사용자는 모든 권한을 갖습니다.

![주소록 공유 권한](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![웹 콘솔의 공유 주소록 권한](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## 웹 콘솔

### 공유 주소록 만들기 또는 편집

**주소록 > 공유**에서 이름, 선택 사항인 메모, 선택 사항인 **기본 공유 비밀번호**를 지정하여 공유 주소록을 만듭니다. 이것이 주소록 수준 비밀번호입니다.

![기본 공유 비밀번호로 공유 주소록 만들기](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### 장치 및 비밀번호 추가

장치는 ID로 직접 추가하거나 Server Pro 장치 목록에서 가져올 수 있습니다. 각 항목에 별칭, 태그, 메모를 설정할 수 있으며, 공유 주소록의 경우 장치 수준 비밀번호를 설정할 수 있습니다.

![공유 주소록에 장치 추가](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![장치](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![공유 주소록의 장치 편집](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### 태그 및 필터링

태그로 장치를 정리하고 필터링할 수 있습니다. `Untagged`는 태그가 없는 장치를 필터링합니다. **교집합으로 필터링**을 켜면 선택한 모든 태그와 일치하는 장치만 표시됩니다.

### 휴지통

주소록에서 장치를 삭제하면 해당 항목이 그 주소록의 휴지통으로 이동합니다. RustDesk Server Pro에서 장치 자체가 삭제되지는 않습니다.

## 공유 비밀번호 동작

| 비밀번호 수준 | 우선순위 |
| --- | --- |
| 장치 수준 비밀번호 | 장치 항목에 비밀번호가 설정되어 있으면 먼저 사용됩니다. |
| 주소록 수준 비밀번호 | 장치 항목에 비밀번호가 없을 때 사용됩니다. |

두 비밀번호가 모두 설정되지 않은 경우 사용자는 평소대로 연결하며, 비밀번호를 직접 입력해야 할 수 있습니다. 웹 콘솔의 비밀번호 열에는 비밀번호 설정 여부만 표시됩니다.

## RustDesk 클라이언트

로그인한 후 주소록 선택기를 사용하여 **내 주소록**과 공유 주소록 사이를 전환합니다. 공유 주소록의 경우 클라이언트에 현재 사용자의 권한이 표시됩니다.

![RustDesk 클라이언트의 주소록 선택기](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![읽기 전용 주소록](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### 클라이언트에서 편집

쓰기 권한이 있는 사용자는 ID 추가, 태그 추가, 별칭 편집, 태그 편집, 메모 편집, 공유 비밀번호 설정, 항목 삭제를 할 수 있습니다.

![RustDesk 클라이언트의 주소록 장치 메뉴 1](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![RustDesk 클라이언트의 ID 추가](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![RustDesk 클라이언트의 주소록 장치 메뉴 2](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![RustDesk 클라이언트의 비밀번호 변경](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## 배포 사전 설정

RustDesk 클라이언트 구성으로 주소록 할당을 미리 설정할 수 있습니다.

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note`는 RustDesk 클라이언트 1.4.3 이상 및 RustDesk Server Pro 1.6.6 이상이 필요합니다.

자세한 내용은 [고급 클라이언트 구성](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note)을 참조하십시오.

## 관련 설정

| 설정 | 위치 | 효과 |
| --- | --- | --- |
| **관리자가 아닌 사용자가 다른 그룹에 주소록을 공유하도록 허용** | **설정 > 기타** | 관리자가 아닌 사용자가 다른 사용자 그룹에 주소록을 공유할 수 있습니다. |
| **주소록 비활성화** | **사용자 지정 클라이언트** | 생성된 사용자 지정 클라이언트에서 주소록을 숨기거나 비활성화합니다. |

## 문제 해결

### 비밀번호 오류

공유 주소록에 저장된 비밀번호는 제어하는 쪽의 RustDesk 클라이언트에서 사용됩니다. 이 비밀번호가 피제어 장치에 설정되는 것은 아닙니다. 피제어 장치의 비밀번호는 해당 장치에서 **설정 > 보안 > 비밀번호**를 통해 설정하십시오.

공유 비밀번호를 사용하려면 해당 공유 주소록에서 장치 카드를 클릭하여 연결하십시오. 다른 주소록, 다른 장치 탭, 또는 ID 입력란 옆의 **연결** 버튼으로 연결하면 이 주소록의 공유 비밀번호가 사용되지 않습니다.
