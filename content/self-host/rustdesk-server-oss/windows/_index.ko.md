---
title: Windows 및 PM2 또는 NSSM
weight: 20
description: "PM2 또는 NSSM을 사용하여 Windows에서 RustDesk Server OSS를 실행하세요. 이 안내서에서는 Windows에서 hbbs 및 hbbr를 호스팅하기 위한 장단점, 서비스 설정 단계 및 로그 명령에 대해 설명합니다."
keywords: ["rustdesk server windows", "rustdesk pm2", "rustdesk nssm", "rustdesk hbbs windows", "rustdesk hbbr windows", "rustdesk self-host windows"]
---

이 안내서를 사용하여 PM2 또는 NSSM을 통해 Windows에서 RustDesk Server OSS를 실행하십시오. 간단한 사용자 수준 설정을 원하는지, 아니면 Windows 서비스 관리를 원하는지에 따라 선택하세요.

## Windows에서 RustDesk Server OSS를 실행해야 하나요?

Windows에서도 RustDesk Server OSS를 실행할 수 있지만, 대부분의 프로덕션 배포에서는 여전히 Linux가 더 안정적인 기본 옵션입니다. Windows는 이미 Windows 서버를 운영하고 있고 서비스 모델을 잘 이해하는 팀에게는 적합하지만, 장기적인 자체 호스팅에는 더 취약한 경향이 있습니다.

## PM2 vs NSSM

| 방법 | 최적의 사용 사례 | 사용하는 이유 |
| --- | --- | --- |
| NSSM | 전용 Windows 서버 배포 | Windows 서비스로 실행되며 사용자 로그인 없이 시작됨 |
| PM2 | 혼합형 Windows 머신 또는 보다 간단한 운영자 워크플로우 | 이미 Node.js를 사용하고 주기적으로 호스트에 로그인하는 경우 관리가 더 용이함 |

## Windows 자체 호스팅 체크리스트

1. RustDesk 서버 Windows 바이너리를 다운로드하세요.
2. NSSM과 PM2 중 어느 것이 더 적합한지 결정하세요.
3. 선택한 프로세스 관리자를 설치하세요.
4. `hbbs`와 `hbbr`를 등록하고 시작하세요.
5. 필요한 방화벽 포트를 열고 두 프로세스가 온라인 상태로 유지되는지 확인하세요.

{{% notice note %}}
Windows 보안 정책은 까다롭습니다. 이 튜토리얼이 작동하지 않거나 불안정한 연결을 경험한다면, Linux 서버로 마이그레이션해주세요.
{{% /notice %}}

{{% notice note %}}
GUI 버전인 `RustDeskServer.setup.exe`는 더 이상 유지보수가 되지 않으므로 권장하지 않습니다.
{{% /notice %}}

## 갈림길
이제 두 가지 선택지가 있습니다: PM2(더 쉬움) 또는 NSSM(조금 어려움)을 사용해 RustDesk 서버를 시작할 수 있습니다.
NSSM을 사용하는 데에는 몇 가지 장점이 있습니다:
- 이전 버전의 Windows(Windows Server 2008 R2/Windows 7 및 이전 버전)와의 하위 호환성(비록 테스트되지는 않았지만).
- Windows Server에 이상적입니다.
- 로그인 없이 부팅 시 자동으로 시작됩니다(시작 항목을 생성한 사용자가 로그인할 필요가 없습니다).
- 두 바이너리를 모두 서비스로 실행합니다.
- 독립형(노드.js에 의존하지 않음)

PM2의 장점은 다음과 같습니다:
- 서버를 주 업무용 컴퓨터와 같은 컴퓨터에서 실행하는 경우 좋습니다.
- RustDesk 시작 항목을 생성한 사용자에게 정기적으로 로그인합니다.
- 사용자 친화적입니다.

## NSSM을 이용한 설치

### NSSM 설치
[download](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip)를 다운로드하고 NSSM을 선택한 후, Windows 시스템에 맞는 아키텍처를 선택하여 압축을 풀어주세요. (x86인 경우 win32 폴더의 내용을 사용하고, x64인 경우 win64 폴더의 내용을 사용하세요.) 또한 NSSM의 바이너리를 설치 드라이브의 `Program Files\NSSM` 디렉터리로 이동하는 것이 좋습니다(일단 서비스로 시작된 NSSM은 배치된 디렉터리에서 이동할 수 없으므로, `Program Files`에 보관하는 것이 가장 적합합니다). 또한 경로 변수에 해당 경로(`C:\Program Files\NSSM` 등)를 추가하는 것이 권장됩니다.

### NSSM이 제대로 설치되었는지 확인하기
모든 작업을 올바르게 수행했다면, 폴더 `C:\Program Files\NSSM`(이 예에서는 C: 드라이브를 사용했지만 Windows를 설치한 드라이브나 원하는 경로를 사용해도 됩니다)에는 파일 `nssm.exe`만 있어야 합니다.

이 예에서는 `C:\Program Files\NSSM`를 사용하겠습니다.

명령 프롬프트를 열고 `nssm`를 실행하세요. 도움말 페이지가 표시되면 다음 단계로 진행할 준비가 된 것입니다.

### hbbr 및 hbbs 실행
[RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases)의 Windows 버전을 다운로드하세요.
프로그램을 `C:\Program Files\RustDesk Server`(또는 원하는 위치에 압축을 풀고, 서비스 설치 후 변경되지 않도록 하세요)에 압축 해제합니다. 이제 명령 프롬프트로 돌아가세요.

이 예시에서는 `C:\Program Files\RustDesk Server`를 사용하겠습니다.

```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```

**노트:**
- `RustDesk hbbs service`를 원하는 이름으로 변경하여 hbbs 서비스로 지정할 수 있습니다.
- `RustDesk hbbr service`를 원하는 이름으로 변경하여 hbbr 서비스로 지정할 수 있습니다.
- `C:\Program Files\RustDesk Server\hbbs.exe`를 RustDesk 바이너리가 있는 위치로 변경할 수 있습니다.
- `C:\Program Files\RustDesk Server\hbbr.exe`를 RustDesk 바이너리가 있는 위치로 변경할 수 있습니다.

**명령어 템플릿:**

복사해서 붙여넣고 수정하기만 하면 되는 명령어 템플릿입니다.

```cmd
nssm install <Desired hbbs servicename> <RustDesk hbbs binary path> <RustDesk hbbs arguments>
nssm install <Desired hbbr servicename> <RustDesk hbbr binary path> <RustDesk hbbr arguments>
```

**서비스 시작**

서비스를 성공적으로 설치한 후에는 서비스를 시작해야 합니다.

```cmd
nssm start <Desired hbbs servicename>
nssm start <Desired hbbr servicename>
```

**완료!**

(위의 방법은 Windows Server Core 2022 Standard에서 테스트되었습니다.)

## 또는

## PM2를 사용한 설치

### Node.js 설치하기

[download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)를 열고 Node.js를 설치해주세요.
PM2의 런타임 환경이므로 먼저 Node.js를 설치해야 합니다.

### PM2 설치하기

`cmd.exe`에 아래 명령어를 입력하고 각 줄마다 <kbd>Enter</kbd> 키를 누른 후 한 줄씩 실행해주세요.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### hbbr 및 hbbs 실행

[RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases)의 Windows 버전을 다운로드하세요. 프로그램을 C: 드라이브에 압축 해제하세요. 다음 네 가지 명령어를 실행하세요:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### 로그 보기

```cmd
pm2 log hbbr
pm2 log hbbs
```

## 대안 자습서
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat