---
title: macOS
weight: 21
description: "Homebrew, vcpkg, Rust 및 Sciter 또는 Flutter를 사용하여 macOS에서 RustDesk를 빌드하십시오. 이 안내서는 데스크톱 빌드를 위한 툴체인 설정, 종속성 및 패키징 흐름을 다룹니다."
keywords: ["build rustdesk macos", "rustdesk mac build", "rustdesk sciter mac", "rustdesk flutter macos build", "rustdesk vcpkg macos"]
---

이 가이드를 사용하여 `Xcode`, `Homebrew`, `vcpkg`, Rust 및 Sciter 또는 Flutter 데스크톱 스택을 사용하여 macOS에서 RustDesk를 빌드하십시오.

이를 수행하는 방법은 여러 가지가 있으며, 이 안내서에서는 `Xcode`, `Git` 및 `Homebrew`가 이미 설치되어 있다고 가정합니다.

## 어떤 macOS 빌드 경로를 사용해야 하나요?

| 필요 | 최적의 경로 |
| --- | --- |
| 전통적인 데스크톱 UI 구축 | Sciter |
| 더 새로운 데스크톱 스택 구축 | Flutter |
| 공유 네이티브 종속성 준비 | Homebrew + `vcpkg` + Rust |

## macOS 빌드 체크리스트

- `Xcode`, `Git` 및 `Homebrew`가 이미 설치되었는지 확인하세요.
- Homebrew에서 필요한 패키지를 설치하세요.
- `vcpkg`를 복제하고 부트스트랩한 다음, `VCPKG_ROOT`를 내보내세요.
- `rustup`를 사용해 Rust를 설치하고 구성하세요.
- RustDesk 소스 저장소와 하위 모듈을 복제하세요.
- 빌드하기 전에 Sciter 런타임 또는 Flutter 툴체인을 추가하세요.

가장 큰 도전 과제는 아마도 모든 도구의 버전을 서로 호환되도록 찾는 것일 것입니다. 특히 Xcode와 LLVM과 같은 툴체인의 일부는 macOS 버전에 따라 결정되기 때문입니다. 이 안내서에서 사용된 버전이 실제로 여러분이 사용해야 할 버전은 아닐 수 있습니다. 어떤 버전을 사용할지 파악하기 위한 시작점은 [GitHub build workflow](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml)에서 빌드하고자 하는 RustDesk 버전을 확인하는 것입니다. 페이지 왼쪽 상단에서 해당 태그를 선택하여 파일을 확인하세요. 하지만 이것이 반드시 통용되는 것은 아닙니다. GitHub 러너와 함께 제공되는 macOS 도구가 로컬 시스템의 도구와 동일한 버전이 아닐 수도 있기 때문입니다.

### 내보내기
`export`는 다양한 환경 변수를 설정하는 데 사용됩니다. `export`를 실행하면 해당 변수가 현재 터미널 세션에만 설정되며, 따라서 지금 또는 앞으로 RustDesk를 빌드하는 데 사용하고자 하는 모든 새 터미널 창에서 이 변수를 다시 설정해야 합니다. 일반적으로 모든 `export`를 열리는 각 터미널마다 자동으로 실행되는 스크립트에 추가하는 것이 바람직합니다(예: `~/.bash_profile`). 여기에 나열된 전체 `export` 명령어를 파일에 간단히 추가할 수 있지만, 해당 파일은 *새로운* 터미널이 열릴 때까지 읽히지 않으므로 현재 터미널에서도 반드시 실행해야 합니다.

## Homebrew에서 사용할 도구를 설치하기

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

일부 설치가 실패할 수 있습니다. 이는 대상 폴더 중 일부가 시스템에 존재하지 않기 때문입니다. 이 경우 폴더를 생성하고 소유자와 권한을 설정한 다음 `brew` 명령을 다시 실행하세요. 예를 들어 `/usr/local/include`가 존재하지 않는 경우:

```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## vcpkg 설치
Vcpkg는 RustDesk에서 사용하는 C/C++ 종속성을 관리하는 데 사용됩니다. 설치를 원하는 위치를 결정하고, `vcpkg` 폴더가 저장되기를 원하는 폴더에서 다음 명령을 실행하십시오. 이 예제에서는 `/Users/<username>/repos/`를 위치로 사용하고, 태그 `2023.04.15`를 버전으로 사용합니다.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Rust 설치 및 구성
우리는 이미 Homebrew를 사용해 위에서 설치한 Rust를 관리하기 위해 `rustup`를 사용합니다. 하지만 여전히 구성해야 합니다. 지침을 따르고 `rustup`와 `rustc`가 모두 `PATH`에 있는지 확인하세요. 이 예에서는 Rust 버전 `1.75.0`를 사용하지만, 다른 버전을 사용해야 할 수도 있습니다. `rustup`를 통해 여러 버전의 Rust를 설치하고 관리할 수 있습니다.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```

설치된 및 기본 Rust 도구 체인에 대한 개요를 보려면 `rustup show`를 실행하세요.

## RustDesk 소스 파일 다운로드하기

RustDesk 소스 파일을 저장할 위치를 결정하고, `rustdesk` 폴더가 저장될 폴더에서 다음 명령을 실행하세요. 이 예제에서는 `/Users/<username>/repos/`를 저장 위치로 사용합니다.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

`python3` 또는 `pip`가 알려지지 않은 경우, 다음과 같이 `PATH`에 추가하세요(실제 폴더 이름을 사용하십시오):

```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```

이 작업이 완료되면 실패한 명령어를 다시 실행하세요. 또한 `~/.bash_profile`를 편집하는 것도 잊지 마세요.

## 사용자 인터페이스 구성 요소 설치
RustDesk는 [Sciter](https://sciter.com/)와 [Flutter](https://flutter.dev/)를 모두 사용해 빌드할 수 있습니다. 이 두 가지 모두 추가적인 구성 요소가 필요하므로 해당 버전 또는 두 가지 모두에 대한 단계를 따르세요.

### Sciter

`rustdesk` 폴더에서 다음을 실행하세요:

```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/)를 사용하면 어떤 버전의 Flutter를 사용할지 관리할 수 있으며, 다양한 Flutter 버전을 쉽게 시도해 볼 수 있는 가장 쉬운 방법일 것입니다.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```

예를 들어 Flutter `3.16.9`를 설치하고 사용하려면:

```sh
fvm global 3.16.9
```

FVM은 서로 다른 프로젝트에 서로 다른 Flutter 버전을 제공할 수 있는 보다 복잡한 설정을 사용하도록 설계되었지만, 이 안내서의 범위를 넘어서는 내용입니다. 대신, FVM에서 제공하는 기본 Flutter의 위치를 수동으로 `PATH`에 추가하세요. 즉, Flutter 버전을 전환하려면 `fvm global`를 사용해야 합니다:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

이 작업이 완료되면 원격 측정 기능을 비활성화하고 모든 것이 정상인지 확인해야 합니다:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```

일부 검사가 실패해도 상관없습니다. 보통 그러한 일이 발생하곤 하죠. 중요한 것은 사용하려는 환경에 대한 검사가 정상이라는 것입니다. 즉, `Xcode`입니다. 문제가 보고되면 다음으로 진행하기 전에 이를 해결하세요.

Flutter가 설치되고 실행된 후에는 Rust와 Flutter를 연결하는 '브리지'를 설치할 차례입니다. 여기서는 다른 모든 것과 함께 잘 작동하는 버전 중 하나를 소개합니다. 이 예제에서는 `1.80.1`를 사용합니다:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## 빌드

`rustdesk` 폴더에서 빌드하십시오. Sciter 버전을 빌드하려면:

```sh
python3 ./build.py
```

Flutter 버전을 빌드하려면:

```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```

모든 것이 잘 진행된다면, 이제 `rustdesk` 폴더에 설치할 준비가 된 `dmg` 파일이 있을 것입니다.