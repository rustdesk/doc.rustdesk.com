---
title: Windows 설치(사용 중단됨)
weight: 5
description: "Windows에서 RustDesk Server Pro를 설치하는 레거시 가이드입니다. 사전 요구사항, 라이선스 설정 및 다운로드 단계가 포함되어 있지만, 대신 Linux 또는 Docker를 사용하는 것이 좋습니다."
keywords: ["rustdesk server pro windows", "rustdesk pro windows install", "rustdesk self-host pro windows", "rustdesk windows install deprecated", "rustdesk pro license windows"]
---

이것은 RustDesk Server Pro의 레거시 Windows 설치 경로입니다. 가능하면 대신 Linux 또는 Docker를 사용하십시오.

{{% notice note %}}
Windows 보안 정책은 까다롭습니다. 이 튜토리얼이 작동하지 않거나 불안정한 연결을 경험한다면, Linux 서버로 마이그레이션해 주세요.
{{% /notice %}}

{{% notice note %}}
GUI 버전인 `RustDeskServer.setup.exe`는 더 이상 유지보수가 되지 않으므로 권장하지 않습니다.
{{% /notice %}}

## Windows 설치 경로를 사용해야 하나요?

이 가이드는 RustDesk Server Pro 호스트가 반드시 Windows에 있어야 할 때만 사용하십시오. 새로운 자체 호스팅 배포의 경우, Linux나 Docker가 더 나은 기본 옵션입니다. 자동화, 업데이트 및 안정적인 운영이 더 쉽기 때문입니다.

## Windows 설치 빠른 답변

- 이 경로는 레거시 경로로 간주하며, 선호하는 배포 방식은 아닙니다.
- 시작하기 전에 Microsoft Visual C++ 재배포 가능 패키지를 설치하세요.
- 오래된 GUI 설치 프로그램은 더 이상 유지보수가 되지 않습니다.
- 장기적으로 안정적인 배포가 필요하다면, Linux나 Docker로 이동하세요.
- Windows에 계속 머무를 경우, 서비스를 어떻게 실행하고 웹 콘솔을 어떻게 프록시할지 계획하세요.

## 설치

Windows에서 rustdesk를 실행하려면 Microsoft Visual C++ 재배포 가능 패키지가 필요합니다. 이를 [here](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)에서 다운로드할 수 있습니다.

1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)에서 라이선스를 받고, 자세한 내용은 [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) 페이지를 확인하세요.
2. [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest)에서 Windows 설치 프로그램을 다운로드하세요.
3. Windows 설치 프로그램을 압축 해제하세요.
4. 설치 프로그램을 실행하고 화면에 표시된 단계를 따르세요. 또는 [PM2 or NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/)를 사용해 수동으로 설치하세요.
5. 설치가 완료되면 RustDesk 서버를 엽니다.
6. 안내에 따라 설치를 진행하세요.
7. `Services`를 클릭한 다음 `Start`를 클릭하세요.
8. 설치가 완료되면 `http://youripaddress:21114`로 이동하세요.
9. 사용자 이름 `admin`와 비밀번호 `test1234`로 로그인하세요.
10. 1단계에서 구매한 라이선스 코드를 입력하세요.

## IIS를 프록시로 사용하기

`Dynamic Content Compression`가 설치되어 있는지 확인하세요(이는 서버 역할과 함께 설치할 수 있는 IIS 기능입니다).
1. IIS를 열거나 설치하세요.
2. RustDesk용 새 웹사이트를 생성하고 바인딩(이상적으로 443)과 관련 인증서를 설정하세요. 기본 설정은 이 웹사이트를 빈 폴더로 지정해야 합니다. (기본 사이트를 사용하는 경우, 해당 폴더에 다른 파일이 없도록 하세요).
3. IIS에서 [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing)와 [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module)를 설치하세요.

## 애플리케이션 요청 라우팅

1. IIS 서버 호스트 아래에서 애플리케이션 요청 라우팅을 엽니다.
2. 서버 프록시 설정으로 이동하세요.
3. 프록시를 활성화하면 모든 설정이 표시되며, 기본값으로 두어도 됩니다.
4. 설정을 저장한 후 다음 단계인 URL 다시쓰기로 넘어갈 수 있습니다.

## URL 다시쓰기

1. 왼쪽 창에서 IIS의 사이트를 열고 URL 다시 쓰기를 두 번 클릭하세요.
2. `Add rules`를 클릭하세요.
3. 새 리버스 프록시 규칙을 설정하세요.
4. 로컬 주소(21114 주소)를 설정하세요.  
인바운드 규칙 – RustDesk 내부 21114 주소  
아웃바운드 규칙 – `From`는 RustDesk 내부 21114 주소이고, `To`는 외부 주소입니다.  
노트: 주소 앞에 http/https를 붙이지 마세요 – 자동으로 처리됩니다. 또한 모든 주소가 내부와 외부에서 모두 접근 가능하도록 확인하세요.

## 압축

1. `Dynamic Content Compression`를 비활성화하세요.

## 문제 해결

오류 500.52가 발생한 경우, 언급된 변수를 추가하세요: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

SSL 설정을 'SSL 필요 → 무시'로 변경해야 할 수 있습니다.