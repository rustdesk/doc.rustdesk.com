---
publishDate: 2026-07-09T08:32:00Z
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
    answer: '네 — RustDesk는 1.4.3에서 추가된 다중 모니터 공유를 포함해 원격 데스크톱 도구 중에서도 손꼽히게 강력한 Wayland 지원을 제공합니다. Wayland에서는 PipeWire와 XDG 데스크톱 포털을 통해 화면을 캡처하며, 공유할 디스플레이를 선택하는 동의 대화상자가 표시됩니다 — 대부분의 경우 선택 사항이 기억되어 다시 묻지 않으며, 현재 로그인된 세션 내에서 작동합니다. 이 동의 절차는 모든 화면 공유 앱에 공통으로 적용되는 Wayland의 보안 설계입니다. 로그인 이전이나 완전 무인 상태의 머신에서는 아래의 헤드리스 가상 디스플레이 설정을 사용하세요(또는 배포판이 아직 X11 세션을 제공한다면 X11 세션을 사용할 수 있습니다 — 여러 배포판이 Wayland 전용으로 전환하고 있기 때문입니다). 완전 무인 Wayland 캡처는 현재 활발히 개발 중입니다(github.com/rustdesk/rustdesk/pull/15420 참고).'
  - question: '리눅스에서 어떤 패키지를 설치해야 하나요?'
    answer: 'Debian, Ubuntu, Linux Mint에서는 .deb를, Fedora, RHEL, openSUSE에서는 .rpm을 사용하세요. 샌드박스 환경에서 폭넓은 호환성을 원한다면 Flathub의 Flatpak을, 단일 파일로 된 대안이 필요하다면 휴대용 AppImage를 사용할 수 있습니다. .deb와 .rpm 패키지는 systemd 서비스를 등록하고 시작하므로 재부팅 후에도 RustDesk가 유지되지만, Flatpak과 AppImage는 기본적으로 그렇지 않습니다.'
  - question: '헤드리스 리눅스 머신에서 왜 검은 화면이 나타나나요?'
    answer: '모니터가 연결되어 있지 않으면 X나 Wayland는 프레임버퍼를 전혀 할당하지 않으므로 RustDesk가 캡처할 화면 자체가 없어, 뷰어에는 검은 화면 또는 이미지 대기 화면이 표시됩니다. 더미 HDMI/DisplayPort 플러그를 연결하거나, xserver-xorg-video-dummy나 VKMS 같은 가상 디스플레이를 구성하거나, RustDesk의 선택적 리눅스 헤드리스 모드를 활성화해 가상 디스플레이가 자동으로 생성되도록 하세요.'
  - question: '리눅스에서 RustDesk 서버를 직접 호스팅할 수 있나요?'
    answer: '네. RustDesk 서버(hbbs ID/랑데부 프로세스와 hbbr 릴레이 프로세스)는 리눅스용으로 제작되었으며 이것이 표준적인 실행 방식입니다. 무료 오픈소스 커뮤니티 서버는 비용 없이 무기한 실행할 수 있으며, Server Pro는 여기에 웹 콘솔, 기기 그룹, 맞춤 클라이언트 생성기를 추가로 제공합니다. 두 가지 모두 일반 리눅스 VM이나 베어메탈 호스트에 설치할 수 있습니다.'
metadata:
  description: '리눅스용 RustDesk를 처음부터 끝까지 다룹니다: 모든 배포판과 ARM 보드에 맞는 패키지 선택, Wayland 및 X11 화면 캡처, 헤드리스 설정, 자체 서버 운영까지.'
  keywords: 'RustDesk 리눅스, RustDesk 우분투, RustDesk Wayland, RustDesk X11, RustDesk 리눅스 설치'
---

리눅스 사용자에게는 그동안 괜찮은 원격 데스크톱 도구의 선택지가 그리 많지 않았고, 존재하는 도구들도 대부분 폐쇄형 상용 제품이거나 오래된 VNC 스택이었습니다. RustDesk는 이와는 다른 위치에 있습니다. AGPL 라이선스로 배포되는 오픈소스 원격 데스크톱 클라이언트이며, 모든 주요 배포판에서 네이티브로 실행되고, 직접 호스팅하는 서버를 지정해 사용할 수도 있습니다. 감사 가능한 코드, 네이티브 리눅스 클라이언트, 자체 호스팅 가능한 인프라라는 이 조합이야말로 누군가 리눅스용 오픈소스 원격 데스크톱을 찾을 때 RustDesk가 가장 먼저 거론되는 답 중 하나가 된 이유입니다.

이 가이드에서는 설치 방법, 누구나 한 번쯤 헷갈리는 부분(X11과 Wayland의 차이), 무인 및 헤드리스 접속을 설정하는 방법, 그리고 서버가 전체 구조에서 어떤 역할을 하는지 다룹니다.

## 리눅스에 RustDesk 설치하기

RustDesk는 일반적으로 사용되는 모든 리눅스 패키징 형식으로 제공되므로, 소스에서 직접 빌드해야 하는 경우는 거의 없습니다. [GitHub의 RustDesk 릴리스 페이지](https://github.com/rustdesk/rustdesk/releases)나 [리눅스 설치 문서](https://rustdesk.com/docs/en/client/linux/)에서 최신 릴리스를 받아 사용 중인 배포판에 맞는 형식을 선택하세요.

| 형식     | 적합한 환경                   | 서비스 자동 시작?  | 참고 사항                                                                                                   |
| -------- | ----------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint    | 예 (systemd)       | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE | 예 (systemd)       | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | 모든 배포판, 샌드박스 환경    | 아니요             | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | 모든 배포판, 휴대용           | 아니요             | 최신 Ubuntu에서는 `libfuse2`가 필요할 수 있음; `chmod +x` 후 실행                                           |
| AUR      | Arch, Manjaro                 | 패키지에 따라 다름 | 커뮤니티 관리 (`rustdesk-bin`, `rustdesk-appimage`)                                                         |

재부팅 후에도 유지되는 백그라운드 서비스로 RustDesk를 실행하고 싶다면 `.deb`와 `.rpm` 패키지를 사용하세요 — 두 패키지 모두 systemd 유닛을 자동으로 등록하고 시작합니다. Flatpak([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)의 `com.rustdesk.RustDesk`)은 데스크톱 용도로 편리한 샌드박스 빌드이지만, 기본적으로 시스템 서비스를 설치하지는 않습니다. RustDesk가 직접 패키지를 제공하지 않는 배포판이라면 우선 **Flatpak**을 시도해 보세요 — 자체 런타임을 함께 포함하고 있어 대체로 가장 폭넓은 호환성을 보입니다. AppImage는 단일 파일로 된 휴대용 대안이지만, 실제로는 호환성이 다소 들쭉날쭉합니다(예를 들어 최신 Ubuntu에서는 `libfuse2`가 필요할 수 있습니다).

실제로 RustDesk는 Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch, NixOS 등 다양한 환경에서 사용되며, **x86_64, ARM64(aarch64), ARM32(ARMv7)** 빌드를 제공합니다 — 즉 일반 PC뿐 아니라 ARM 보드와 서버에서도 실행됩니다.

## X11과 Wayland: 가장 중요한 차이

이는 리눅스에서 RustDesk를 사용할 때 이해해야 할 가장 중요한 부분입니다. 원격 제어가 별다른 조치 없이 바로 작동할지, 아니면 사전에 작은 설정 조정이 필요할지가 여기서 결정되기 때문입니다.

**X11(Xorg): 배포판이 아직 제공한다면 가장 직접적인 캡처 경로입니다.** X11에서는 RustDesk가 프레임버퍼를 직접 읽고 입력도 직접 주입하므로, 화면 캡처와 마우스/키보드 제어가 가능한 한 가장 직접적인 방식으로 이루어지며 모니터 변경 사항도 동적으로 감지됩니다. 아직 많은 디스플레이 관리자에서 로그인 화면의 톱니바퀴 메뉴에서 "Xorg"/"X11"을 선택할 수 있습니다. 다만 여러 배포판이 Wayland 전용으로 전환하며 X11 세션을 단계적으로 폐지하고 있다는 점을 염두에 두세요 — 따라서 X11은 마침 사용 가능할 때 누리는 편의 정도로 여기고, 배포 전략을 여기에 맞춰 설계하지는 마세요.

**Wayland: RustDesk는 원격 데스크톱 도구 중에서도 단연 가장 강력한 지원을 제공한다고 할 만합니다.** RustDesk는 버전 1.2.0부터 Wayland를 지원해 왔으며 이후로도 계속 기능을 확장해 왔습니다. Wayland 컴포지터는 프레임버퍼에 직접 접근하는 것을 허용하지 않기 때문에, RustDesk는 `xdg-desktop-portal` 서비스와 [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support)를 통해 화면을 캡처하고, 커널의 `uinput` 모듈을 통해 입력을 주입합니다. 이는 Wayland 자체의 설계에서 비롯된 두 가지 결과이며, RustDesk뿐 아니라 모든 Wayland 화면 공유 도구에 동일하게 적용됩니다:

- **연결마다 필요한 동의.** 포털은 공유할 디스플레이를 선택하도록 요청하는 대화상자를 표시합니다. 이는 RustDesk의 버그가 아니라 Wayland가 의도적으로 설계한 보안 기능입니다 — 백그라운드 앱이 사용자 몰래 화면 녹화를 시작할 수 없도록 하기 위함입니다. 포털 v4 이상에서는 "복원 토큰(restore token)"을 지원해 매번 다시 묻지 않지만, 최초 공유 시에는 화면에서 클릭이 필요합니다.
- **활성 세션에서만 작동.** Wayland 캡처는 로그인된 그래픽 세션에 종속됩니다. Wayland 로그인 화면(그리터) 캡처는 아직 지원되지 않으며, 현재 활발히 개발 중입니다([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). 현재 로그인 이전 접속이 필요하다면 아래의 헤드리스/가상 디스플레이 구성을 사용하거나, 아직 X11 세션을 제공하는 배포판이라면 X11 세션을 사용하세요.

Wayland 지원은 계속 개선되고 있습니다 — 예를 들어 RustDesk 1.4.3(2025년 10월)에서는 [Wayland용 다중 모니터 공유가 추가](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)되었습니다. 다만 Wayland 환경에서 접속했는데 검은 화면이 보인다면, 이는 거의 항상 portal/PipeWire 경로가 제대로 충족되지 않은 경우입니다. Wayland의 검은 화면 문제를 구체적으로 다루는 [RustDesk가 연결되었지만 이미지를 기다리는 경우](/ko/blog/rustdesk-connected-waiting-for-image-ko) 글을 참고하세요.

## 리눅스에서 무인 접속

무인 접속이란 화면 앞에 아무도 없는 상태의 머신에 접속하는 것을 의미합니다 — 전형적인 원격 지원 시나리오입니다. 리눅스에서는 다음과 같은 절차를 따르면 됩니다:

1. systemd 서비스가 등록되도록 `.deb` 또는 `.rpm`으로 설치하거나, 앱에서 **서비스 활성화**를 클릭하세요.
2. RustDesk의 연결 설정에서 강력한 **고정 비밀번호**를 설정하세요(가능하면 2단계 인증도 활성화하세요).
3. 로그인 이전이나 사용자 로그인 전반에 걸친 접속이 필요하다면 아래의 헤드리스 가상 디스플레이 구성을 사용하세요(위에서 다룬 Wayland 그리터의 한계가 여기에도 적용됩니다).

염두에 두어야 할 Wayland의 현실이 하나 있습니다. Wayland 절에서 설명한 동의 기반 포털 방식 때문에, 개발 중인 무인 지원 기능이 정식으로 도입되기 전까지는 완전한 무인 캡처가 X11보다 까다롭습니다. 따라서 사람이 개입하지 않는 머신에는 헤드리스 가상 디스플레이 설정을 계획해 두세요.

## 헤드리스 리눅스: 모니터가 없는 서버

리눅스에서 매우 흔한 사용 사례 중 하나는 디스플레이가 전혀 연결되지 않은 머신입니다 — 홈 서버, 실험실용 머신, VM 등이 그렇습니다. 이 경우 문제는 RustDesk가 아니라 그래픽 스택에 있습니다. 모니터가 연결되어 있지 않으면 X나 Wayland는 프레임버퍼를 전혀 할당하지 않으므로, 그야말로 캡처할 이미지 자체가 없어 검은 화면이 나타납니다.

렌더링할 대상을 만들어 주는 세 가지 방법이 있습니다:

- **더미 플러그** — GPU가 모니터가 연결되어 있다고 인식하게 만드는 저렴한 물리적 HDMI/DisplayPort "헤드리스" 동글입니다.
- **가상 디스플레이 드라이버** — X11에서는 `xserver-xorg-video-dummy`, 또는 VKMS 같은 커널 수준의 옵션을 사용할 수 있습니다.
- **RustDesk의 선택적 헤드리스 모드** — `sudo rustdesk --option allow-linux-headless Y` 명령으로 활성화할 수 있습니다. [헤드리스 리눅스 지원 위키](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support)에 따르면 이 기능은 기본적으로 비활성화되어 있으며, 주로 GNOME이 설치된 Ubuntu에서 테스트되었고 `xserver-xorg-video-dummy`와 `lightdm` 같은 패키지가 필요합니다. `sudo rustdesk --get-id`로 머신의 ID를 확인할 수 있고, `sudo rustdesk --password <password>`로 비밀번호를 설정할 수 있습니다.

헤드리스 모드는 아직 다듬어지지 않은 부분이 있으므로, 바로 사용 가능한 완성형 기능이라기보다는 "조심스럽게 다뤄야 작동하는" 기능으로 여기시기 바랍니다.

## 리눅스에서 RustDesk 서버 자체 호스팅하기

지금까지 다룬 내용은 모두 *클라이언트*에 관한 것입니다. RustDesk와 리눅스의 관계에서 나머지 절반은 **서버**입니다 — `hbbs` ID/랑데부 서비스와 `hbbr` 릴레이는 리눅스 네이티브 애플리케이션이며, 리눅스는 이들이 원래 있어야 할 자리입니다. 이 덕분에 세션 중개와 릴레이 트래픽을 벤더의 클라우드를 거치지 않고 직접 소유한 인프라 위에 유지할 수 있습니다.

선택지는 두 가지입니다. 무료 오픈소스 **커뮤니티 서버**는 비용 없이 무기한 실행할 수 있으며 연결 및 릴레이라는 핵심 기능을 제공합니다. **RustDesk Server Pro**는 여기에 더해 자체 호스팅 웹 콘솔, 기기 그룹, 공유 주소록, 맞춤 브랜드 클라이언트 생성기, 그리고 [LDAP/Active Directory 및 OIDC SSO](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/ldap/)를 제공합니다. Docker를 반드시 사용해야 하는 것도 아닙니다 — 일반 VM이나 베어메탈에 설치하는 방법은 [Docker 없이 Server Pro 실행하기](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/installscript/)를 참고하세요. 대규모 기기군을 위한 하드웨어 사이징이 필요하다면, 확정하기 전에 실제 동시 접속 및 릴레이 프로파일을 기준으로 용량을 계획하세요.

자체 호스팅에 관해 한 가지 짚어둘 점이 있습니다. 무료 커뮤니티 서버와 Server Pro는 직접 실행하고, 패치하고, 보안을 관리해야 하는 대상입니다. 하드웨어 요구 사항은 낮은 편이고, 한 번 설정해 두면 유지 관리 부담도 크지 않습니다 — 궁금한 점이 생기면 RustDesk 지원팀의 도움을 받을 수도 있습니다. 이렇게 직접 소유하고 통제할 수 있다는 점이야말로 자체 호스팅의 핵심입니다. (Server Pro 라이선스는 활성화 및 라이선스 유지를 위해 rustdesk.com으로의 아웃바운드 경로도 필요합니다.)

## 시작하기

사용 중인 배포판에 맞는 패키지를 설치하고, 무인 접속을 위한 고정 비밀번호를 설정하세요. 그리고 데이터 주권이 이 글을 찾아온 이유라면 무료 커뮤니티 서버를 직접 구축해 보세요. 최신 요금제 정보는 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인하는 것이 가장 정확하며, Server Pro에 대한 상담은 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하시면 됩니다. 먼저 실제로 작동하는 모습을 보고 싶으신가요? [RustDesk 실제 작동 모습 보기](https://www.youtube.com/@rustdesk)를 확인해 보세요.
