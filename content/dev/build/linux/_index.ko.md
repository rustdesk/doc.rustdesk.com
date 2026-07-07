---
title: Linux
weight: 10
description: "필요한 시스템 패키지, vcpkg 종속성 및 Rust 툴체인을 사용해 Linux에서 RustDesk를 빌드하십시오. cargo를 실행하기 전에 Ubuntu, Fedora 또는 Arch 기반 설정 단계를 따르십시오."
keywords: ["build rustdesk linux", "rustdesk linux build", "rustdesk vcpkg linux", "rustdesk cargo run linux", "rustdesk ubuntu build"]
---

이 안내서를 사용하여 Linux에서 RustDesk를 빌드하고, 필요한 패키지를 설치하고, `vcpkg`를 준비한 다음 소스에서 데스크톱 앱을 컴파일하십시오.

## Linux에서 빌드하기 전에 무엇이 필요합니까?

Linux에서 RustDesk를 빌드하려면 배포판의 시스템 개발 패키지와 작동하는 `vcpkg` 설정, `rustup`를 통해 설치된 Rust, 그리고 `cargo`를 실행하기 전에 빌드 출력 디렉터리에 배치된 Sciter 공유 라이브러리가 필요합니다.

## Linux 빌드 체크리스트

- 배포판에 맞는 컴파일러와 데스크톱 종속성을 설치하세요.
- `vcpkg`를 클론하고 부트스트랩한 다음, `VCPKG_ROOT`를 내보내세요.
- `rustup`로 Rust를 설치하고 cargo 환경을 로드하세요.
- 하위 모듈과 함께 RustDesk 리포지토리를 클론하세요.
- `libsciter-gtk.so`를 `target/debug`로 다운로드하세요.
- 프로젝트 루트에서 `cargo run`를 실행하세요.

## Linux에서 빌드하는 방법

### Ubuntu 18 (Debian 10)

```sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake
```

### Fedora 28 (CentOS 8)

```sh
sudo yum -y install gcc-c++ git curl wget nasm yasm gcc gtk3-devel clang libxcb-devel libxdo-devel libXfixes-devel pulseaudio-libs-devel cmake alsa-lib-devel
```

### Arch Linux (Manjaro)

```sh
sudo pacman -Syu --needed unzip git cmake gcc curl wget yasm nasm zip make pkg-config clang gtk3 xdotool libxcb libxfixes alsa-lib pulseaudio
```

### vcpkg 설치하기

```sh
git clone --recurse-submodules https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.10.19
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install --x-install-root="$VCPKG_ROOT/installed"
```

### libvpx 수정(Fedora용)

```sh
cd vcpkg/buildtrees/libvpx/src
cd *
./configure
sed -i 's/CFLAGS+=-I/CFLAGS+=-fPIC -I/g' Makefile
sed -i 's/CXXFLAGS+=-I/CXXFLAGS+=-fPIC -I/g' Makefile
make
cp libvpx.a $VCPKG_ROOT/installed/x64-linux/lib/
cd
```

### 빌드

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.lnx/x64/libsciter-gtk.so
mv libsciter-gtk.so target/debug
# Note: VCPKG_ROOT still set
cargo run
```