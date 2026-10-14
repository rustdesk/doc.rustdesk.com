---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-for-linux'
draft: false
title: '리눅스용 RustDesk: 오픈소스 원격 데스크톱'
excerpt: '리눅스에서 RustDesk를 설치하고 실행하는 방법: .deb, .rpm, Flatpak, AppImage 패키지 선택, X11과 Wayland 비교, 헤드리스 및 무인 접속, 서버 자체 호스팅까지 다룹니다.'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: '가이드'
tags: ['RustDesk', 'Linux', '셀프 호스팅']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-ko'
faq:
  - question: 'RustDesk는 Wayland에서 작동하나요?'
    answer: '네. 표준 RustDesk 빌드는 로그인된 세션에서 PipeWire와 xdg-desktop-portal을 통해 Wayland 데스크톱을 캡처하며, 1.4.3 버전부터는 다중 모니터도 지원합니다. 포털이 화면 공유 동의를 요청하며, 포털 버전 4 이상에서는 이 선택을 기억할 수 있습니다. 별도의 프리뷰 빌드는 무인 접속과 재부팅 후 로그인 화면 접속을 더합니다. 프리뷰는 x86_64 Debian/Ubuntu 계열 시스템을 대상으로 합니다.'
  - question: '리눅스에서 어떤 패키지를 설치해야 하나요?'
    answer: 'Debian, Ubuntu, Linux Mint에서는 .deb를, Fedora, RHEL, openSUSE에서는 .rpm을 사용하세요. 샌드박스 환경에서 폭넓은 호환성을 원한다면 Flathub의 Flatpak을, 단일 파일로 된 대안이 필요하다면 휴대용 AppImage를 사용할 수 있습니다. .deb와 .rpm 패키지는 systemd 서비스를 등록하고 시작하므로 재부팅 후에도 RustDesk가 유지되지만, Flatpak과 AppImage는 기본적으로 그렇지 않습니다.'
  - question: '헤드리스 리눅스 머신에서 왜 검은 화면이 나타나나요?'
    answer: '대개 헤드리스 리눅스 머신에 RustDesk가 캡처할 활성 디스플레이가 없기 때문입니다. 모니터가 없으면 그래픽 스택이 출력을 전혀 노출하지 않는 경우가 많아, 세션은 연결되지만 검은 화면이나 이미지 대기 화면이 표시됩니다. HDMI나 DisplayPort 더미 플러그를 연결하거나, X11에서 xserver-xorg-video-dummy 같은 가상 디스플레이를 구성한 뒤 다시 연결하세요.'
  - question: '리눅스에서 RustDesk 서버를 직접 호스팅할 수 있나요?'
    answer: '네. RustDesk 서버(hbbs ID/랑데부 프로세스와 hbbr 릴레이 프로세스)는 리눅스용으로 만들어졌으며, 리눅스에서 실행하는 것이 표준 방식입니다. RustDesk Server OSS(무료 커뮤니티 서버)는 라이선스 비용이나 만료 기한이 없고, Server Pro는 여기에 웹 콘솔, 기기 그룹, 커스텀 클라이언트 생성기를 더합니다. 두 가지 모두 일반 리눅스 VM이나 베어메탈 호스트에 설치할 수 있습니다.'
metadata:
  description: '리눅스용 RustDesk를 처음부터 끝까지 다룹니다. 배포판과 ARM 보드별 패키지 선택, Wayland 및 X11 화면 캡처, 헤드리스 설정, 자체 서버 운영까지.'
  keywords: 'RustDesk 리눅스, RustDesk 우분투, RustDesk Wayland, RustDesk X11, RustDesk 리눅스 설치'
---

RustDesk는 리눅스용 오픈소스 원격 데스크톱입니다. 클라이언트와 RustDesk Server OSS(무료 커뮤니티 서버)는 AGPL 라이선스이고, 주요 배포판용 네이티브 패키지가 제공되며, 모든 클라이언트를 여러분이 직접 호스팅하는 ID/랑데부 서비스와 릴레이 서비스에 연결할 수 있습니다. Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어로, 그 위에 웹 콘솔과 중앙 관리 기능을 더합니다. 감사 가능한 코드, 네이티브 리눅스 클라이언트, 자체 호스팅 가능한 인프라 덕분에 리눅스용 오픈소스 원격 데스크톱을 찾는 사람에게 RustDesk는 흔히 추천되는 답입니다.

이 가이드에서는 설치 방법, 누구나 한 번쯤 헷갈리는 부분(X11과 Wayland의 차이), 무인 및 헤드리스 접속을 설정하는 방법, 그리고 서버가 전체 구조에서 어떤 역할을 하는지 다룹니다.

## 리눅스에 RustDesk 설치하기

RustDesk는 흔히 쓰이는 모든 리눅스 패키징 형식으로 제공되므로, 소스에서 직접 빌드해야 하는 경우는 거의 없습니다. [GitHub의 RustDesk 릴리스 페이지](https://github.com/rustdesk/rustdesk/releases)나 [리눅스 설치 문서](https://rustdesk.com/docs/ko/client/linux/)에서 최신 릴리스를 받아 사용 중인 배포판에 맞는 형식을 고르세요.

| 형식     | 적합한 환경                   | 서비스 자동 시작?  | 참고 사항                                                                                                   |
| -------- | ----------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint    | 예(systemd)        | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE | 예(systemd)        | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | 모든 배포판, 샌드박스 환경    | 아니요             | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | 모든 배포판, 휴대용           | 아니요             | 최신 Ubuntu에서는 `libfuse2`가 필요할 수 있음. `chmod +x` 후 실행                                           |
| AUR      | Arch, Manjaro                 | 패키지에 따라 다름 | 커뮤니티 관리(`rustdesk-bin`, `rustdesk-appimage`)                                                          |

재부팅 후에도 유지되는 백그라운드 서비스로 RustDesk를 실행하고 싶다면 `.deb`와 `.rpm` 패키지를 사용하세요. 두 패키지 모두 systemd 유닛을 자동으로 등록하고 시작합니다. Flatpak([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)의 `com.rustdesk.RustDesk`)은 데스크톱 용도로 편리한 샌드박스 빌드이지만, 기본적으로 시스템 서비스를 설치하지는 않습니다. RustDesk가 직접 패키지를 제공하지 않는 배포판이라면 먼저 **Flatpak**을 시도해 보세요. 자체 런타임을 함께 포함하므로 대체로 호환성이 가장 넓습니다. AppImage는 단일 파일로 된 휴대용 대안이지만, 실제로는 호환성이 다소 들쭉날쭉합니다(예를 들어 최신 Ubuntu에서는 `libfuse2`가 필요할 수 있습니다).

실제로 RustDesk는 Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch, NixOS 등 다양한 환경에서 쓰이며, **x86_64, ARM64(aarch64), ARM32(ARMv7)** 빌드를 제공합니다. 즉 일반 PC뿐 아니라 ARM 보드와 서버에서도 실행됩니다.

## X11과 Wayland: 가장 중요한 차이

리눅스에서 RustDesk를 쓸 때 이해해야 할 가장 중요한 부분입니다. 원격 제어가 곧바로 작동할지, 아니면 먼저 작은 설정 조정이 필요할지가 여기서 결정되기 때문입니다.

**X11(Xorg): 배포판이 아직 제공한다면 가장 직접적인 캡처 경로입니다.** X11에서는 RustDesk가 프레임버퍼를 직접 읽고 입력도 직접 주입하므로, 화면 캡처와 마우스/키보드 제어가 가장 직접적인 방식으로 이루어지고 모니터 변경도 동적으로 감지됩니다. 많은 디스플레이 관리자에서 아직 로그인 화면의 톱니바퀴 메뉴로 "Xorg"/"X11"을 고를 수 있습니다. 다만 여러 배포판이 Wayland 전용으로 전환하며 X11 세션을 없애고 있으므로, X11은 마침 쓸 수 있을 때의 편의 정도로 여기고 배포 전략을 여기에 맞춰 설계하지는 마세요.

**Wayland: 표준 빌드에서 지원하며, 무인 접속용 프리뷰가 있습니다.** Wayland 컴포지터는 프레임버퍼 직접 접근을 허용하지 않으므로, 표준 RustDesk 빌드는 로그인된 세션에서 `xdg-desktop-portal`과 [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support)를 통해 화면을 캡처하고, 커널의 `uinput` 모듈로 입력을 주입합니다. RustDesk 1.4.3(2025년 10월)에서는 [Wayland 다중 모니터 공유가 추가](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)되었습니다. 별도의 [Wayland 무인 접속 프리뷰](/ko/blog/unattended-remote-access-wayland-ko)는 무인 접속과 재부팅 후 로그인 화면 접속을 더하며, **x86_64 Debian/Ubuntu 계열 시스템**을 대상으로 합니다.

- **공유를 시작할 때의 동의.** 포털은 어떤 디스플레이를 공유할지 묻는 대화 상자를 띄웁니다. 이는 RustDesk 버그가 아니라 Wayland의 보안 기능으로, 백그라운드 앱이 몰래 화면 녹화를 시작할 수 없게 합니다. 포털 v4 이상은 "복원 토큰(restore token)"을 지원하므로 연결할 때마다 다시 묻지 않습니다.
- **로그인 화면 접속.** 표준 빌드는 로그인된 세션을 캡처합니다. 재부팅 후 로그인 그리터(greeter)에 접속하려면 x86_64 Debian/Ubuntu 계열 시스템에서 무인 접속 프리뷰를 사용하거나, 배포판이 아직 제공한다면 X11 로그인 그리터를 사용하세요.

표준 빌드로 Wayland 머신에 접속했는데 검은 화면이 보인다면, 대개 포털/PipeWire 경로가 충족되지 않은 것입니다. 공유 요청을 수락하지 않았거나 `xdg-desktop-portal` 또는 PipeWire가 실행되고 있지 않은 경우입니다. [RustDesk "연결됨, 이미지 대기 중" 해결 가이드](/ko/blog/rustdesk-connected-waiting-for-image-ko)에서 Wayland 사례를 단계별로 다룹니다.

## 리눅스에서 무인 접속

무인 접속이란 화면 앞에 아무도 없는 머신에 접속하는 것으로, 전형적인 원격 지원 시나리오입니다. 리눅스에서는 다음 절차를 따르면 됩니다.

1. systemd 서비스가 등록되도록 `.deb`나 `.rpm`으로 설치하거나, 앱에서 **서비스 활성화**를 클릭하세요.
2. **설정 → 보안**에서 강력한 **영구 비밀번호**를 설정하세요. 기본 승인 모드에서 이미 영구 비밀번호가 허용되며, 두 번째 인증 요소가 필요하면 피제어 기기 연결 2FA를 추가하세요. [무인 접속 설정 가이드](/ko/blog/rustdesk-unattended-access-setup-ko)를 참고하세요.
3. Wayland에서 로그인 전에 접속하려면 x86_64 Debian/Ubuntu 계열 시스템에서 [Wayland 무인 접속 프리뷰](/ko/blog/unattended-remote-access-wayland-ko)를 사용하거나, 지원되는 경우 디스플레이 관리자의 로그인 그리터가 X11을 사용하도록 구성하세요. X11 데스크톱 세션을 선택하는 것만으로는 로그인 이후 세션에만 영향을 줍니다.

## 헤드리스 리눅스: 모니터가 없는 서버

리눅스에서 흔한 사용 사례는 디스플레이가 전혀 연결되지 않은 머신입니다. 홈 서버, 실험실 머신, VM 등이 그렇습니다. 모니터가 없으면 그래픽 스택이 활성 출력을 노출하지 않는 경우가 많아, 캡처할 이미지가 없으니 검은 화면이 나타납니다.

렌더링할 대상을 만들어 주는 방법은 두 가지입니다.

- **더미 플러그** — GPU가 모니터가 연결되어 있다고 인식하게 만드는 저렴한 물리적 HDMI/DisplayPort "헤드리스" 동글입니다.
- **가상 디스플레이 드라이버** — X11에서는 `xserver-xorg-video-dummy`, 또는 VKMS 같은 커널 수준의 옵션을 사용할 수 있습니다.

## 리눅스에서 RustDesk 서버 자체 호스팅하기

지금까지 다룬 내용은 모두 *클라이언트*에 관한 것입니다. RustDesk와 리눅스 이야기의 나머지 절반은 **서버**입니다. `hbbs` ID/랑데부 서비스와 `hbbr` 릴레이는 리눅스 네이티브 애플리케이션이며, 리눅스는 이들의 본래 자리입니다. 덕분에 세션 중개와 릴레이 트래픽을 벤더의 클라우드를 거치지 않고 직접 소유한 인프라에 둘 수 있습니다.

선택지는 두 가지입니다. **Server OSS**는 라이선스 비용이나 만료 기한 없이 무료이며, 연결과 릴레이라는 핵심 기능을 제공합니다. **RustDesk Server Pro**는 자체 호스팅 웹 콘솔, 기기 그룹, 공유 주소록을 더하고, Basic 요금제부터는 커스텀 브랜딩 클라이언트 생성기와 [LDAP/Active Directory 및 OIDC SSO](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/ldap/)도 제공합니다. Docker를 꼭 써야 하는 것도 아닙니다. 일반 VM이나 베어메탈에 설치하는 방법은 [Docker 없이 Server Pro 실행하기](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/installscript/)를 참고하세요.

자체 호스팅과 관련해 짚어 둘 점이 있습니다. Server OSS와 Server Pro는 여러분이 직접 실행하고, 패치하고, 보안을 관리해야 합니다. [하드웨어 요구 사항은 매우 낮아서](https://rustdesk.com/docs/ko/self-host/rustdesk-server-oss/install/) 기본 클라우드 서버나 Raspberry Pi로도 Server OSS를 실행할 수 있습니다. 온라인 기기 수와 릴레이 트래픽에 맞춰 규모를 정하고, 업데이트, 모니터링, 백업 담당자를 지정하세요. 유료 요금제에는 지원이 포함됩니다. (Server Pro는 약 하루 한 번 아웃바운드 HTTPS로 라이선스를 확인하므로 rustdesk.com으로 나가는 경로가 필요합니다.)

## 시작하기

사용 중인 배포판에 맞는 패키지를 설치하고, 무인 접속용 영구 비밀번호를 설정하세요. 데이터 주권 때문에 이 글을 찾으셨다면 Server OSS를 직접 구축해 보세요. 최신 요금제 정보는 [rustdesk.com/pricing](https://rustdesk.com/pricing)이 가장 정확하며, Server Pro 상담은 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하세요. 먼저 실제로 작동하는 모습을 보고 싶다면 [RustDesk 작동 영상 보기](https://www.youtube.com/@rustdesk)를 확인하세요.
