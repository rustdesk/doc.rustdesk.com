---
title: RustDesk 클라이언트
description: "Windows, macOS, Linux, Android, iOS 및 웹에서 RustDesk 클라이언트를 설치하고 구성하세요. 장치를 연결하는 방법, 공개 또는 자체 호스팅 서버 사용 방법, 클라이언트 설정 관리 방법을 알아보세요."
keywords: ["rustdesk client", "rustdesk download", "rustdesk installation", "rustdesk windows", "rustdesk mac", "rustdesk linux", "rustdesk android", "rustdesk ios", "rustdesk web client", "rustdesk client configuration"]
weight: 2
pre: "<b>1. </b>"
---

## RustDesk 클라이언트란 무엇인가요?
RustDesk 클라이언트는 장치에 설치하여 RustDesk 공공 서버 또는 사용자가 직접 호스팅하는 RustDesk 서버를 통해 원격 데스크톱 세션을 시작하거나 받을 수 있는 애플리케이션입니다. 이 안내서를 따라 올바른 빌드를 다운로드하고 각 플랫폼에 설치한 후, 다른 장치와 연결하고 클라이언트를 RustDesk Server OSS 또는 RustDesk Server Pro로 지정하세요.

## 지원되는 플랫폼
- Microsoft Windows
- macOS
- Debian 파생판 (Ubuntu ≥ 16, Linux Mint 등)
- Red Hat 파생판 (CentOS, Fedora ≥ 18, Rocky Linux 등)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (원격으로 제어할 수 없음)
- 웹

## 설치

### Windows

GitHub에서 exe 파일을 다운로드하여 설치하세요.

자동으로 설치하려면 `--silent-install`를 사용해 설치용 exe를 호출하세요.

### macOS

GitHub에서 dmg 파일을 다운로드하세요. 더 자세한 정보는 [macOS page](/docs/ko/client/mac/)에서 확인하실 수 있습니다.

dmg 파일을 열고 `RustDesk`를 `Applications`로 드래그하세요.

RustDesk가 실행되도록 허용하세요.

필요한 권한을 허용하고 RustDesk 왼쪽의 안내에 따라 설정을 마무리하세요.

### Linux

다양한 Linux 배포판별 설치 방법은 아래를 참조하세요. (설치 프로그램은 GitHub에 있거나 배포판의 저장소에서 제공됩니다.)

#### Debian 파생판

```sh
# please ignore the wrong disk usage report
sudo apt install -fy ./rustdesk-<version>.deb
```

#### 레드햇 파생 상품

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

일시적으로 `rustdesk`가 실행될 준비가 된 셸로 들어갑니다:

```sh
nix shell nixpkgs#rustdesk
```

현재 사용자 프로필에 설치하기:

```sh
nix profile install nixpkgs#rustdesk
```

NixOS에서 시스템 전체를 설치하려면 `configuration.nix`를 편집한 후 `nixos-rebuild switch --flake /etc/nixos`를 실행하세요:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

### Android
GitHub에서 apk를 설치하세요. 자세한 정보는 [Android page](/docs/ko/client/android/)에서 확인할 수 있습니다.

### iOS(iPhone, iPad)
[App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015)에서 앱을 다운로드하세요.

## 사용법
설치(또는 임시 실행 파일로 실행)한 후 RustDesk는 공공 서버에 연결됩니다. 하단에 "(1) 준비 완료, 더 빠른 연결을 위해 자신의 서버를 설정해주세요"라는 메시지가 표시됩니다. 왼쪽 상단에는 (2) ID와 (3) 일회성 비밀번호가 표시되고, 오른쪽에는 다른 컴퓨터의 ID를 알고 있다면 연결할 수 있는 (4) 입력란이 있습니다.

![](/docs/en/client/images/client.png)

설정에 접근하려면 ID 오른쪽에 있는 (5) 메뉴 버튼 [ &#8942; ]을 클릭하세요.

설정 메뉴에서는 다음을 찾을 수 있습니다:
- 일반 - 서비스 제어, 테마, 하드웨어 코덱, 오디오, 녹화 및 언어
- 보안 - 누군가 제어를 맡을 때의 권한, 비밀번호 옵션, ID 변경 가능 여부 및 고급 보안 설정
- 네트워크 - 여기서 자신의 서버 설정과 프록시를 설정하세요.
- 디스플레이 - 원격 세션의 디스플레이 설정 및 기타 기본 옵션, 클립보드 동기화 등을 제어하세요.
- 계정 - Pro 서버와 함께 사용하여 API에 로그인할 수 있습니다.
- 정보 - 소프트웨어에 대한 정보를 표시합니다.

## RustDesk 구성하기
RustDesk를 구성하는 방법은 여러 가지가 있습니다.

가장 쉬운 방법은 RustDesk 서버 프로를 사용하는 것입니다. 암호화된 구성 문자열을 얻을 수 있으며, 이는 `--config`와 함께 설정을 가져오는 데 사용할 수 있습니다. 이를 수행하려면:
1. 사용 중인 운영체제의 명령줄을 열고, RustDesk가 설치된 폴더로 이동하세요. 예를 들어 Windows에서는 `C:\Program Files\RustDesk`, Linux에서는 `/usr/bin`입니다.
2. `rustdesk.exe --config your-encrypted-string` 명령어를 사용하세요. 예를 들어 `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`입니다.

클라이언트를 수동으로 설정할 수 있습니다. 이를 위해서는 다음을 수행하십시오:
1. 설정을 클릭하세요.
2. 네트워크를 클릭하세요.
3. 네트워크 설정 잠금 해제를 클릭하세요.
4. ID, 릴레이, API(프로 서버 사용 시) 및 키를 입력하세요.

![](/docs/en/client/images/network-settings.png)

클라이언트를 수동으로 설정한 경우, `RustDesk2.toml`(사용자 폴더에 있음) 파일을 가져와 위의 예시와 유사한 방식으로 `--import-config`를 사용할 수 있습니다.

## 명령줄 매개변수
- `--password`는 영구 비밀번호를 설정하는 데 사용할 수 있습니다.
- `--get-id`는 ID를 검색하는 데 사용할 수 있습니다.
- `--set-id`는 ID를 설정하는 데 사용할 수 있으며, ID는 반드시 문자로 시작해야 합니다.
- `--silent-install`는 Windows에서 RustDesk를 무인 설치하는 데 사용할 수 있습니다.

추가 고급 매개변수는 [here](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242)에서 확인할 수 있습니다.

{{% children depth="3" showhidden="true" %}}