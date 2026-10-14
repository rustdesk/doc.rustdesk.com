---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'RustDesk Wayland 프리뷰: 무인 접속과 로그인 화면 접속'
excerpt: 'x86_64 Debian/Ubuntu 계열 시스템용 RustDesk 프리뷰는 다중 모니터 환경과 재부팅 후 로그인 화면을 포함해 Wayland 무인 접속을 지원합니다.'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: '릴리스'
tags: ['RustDesk', 'Wayland', 'Linux', '무인 접속']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-ko'

metadata:
  description: 'x86_64 Debian/Ubuntu 계열 시스템용 RustDesk Wayland 프리뷰를 사용해 보세요. 다중 모니터에서도, 재부팅 후 로그인 화면에서도 무인 접속이 가능합니다.'
  keywords: 'RustDesk Wayland, Wayland 무인 접속, Wayland 원격 데스크톱, Linux 원격 데스크톱 Wayland, RustDesk Linux, 무인 원격 접속'
---

Wayland 지원은 Linux 원격 데스크톱에서 가장 까다로운 과제 중 하나였습니다.

표준 RustDesk 빌드는 이미 로그인된 세션에서 PipeWire와 `xdg-desktop-portal`을 통해 Wayland 데스크톱을 캡처하며, 1.4.3 버전부터는 다중 모니터도 지원합니다. 새로운 **x86_64 Debian/Ubuntu 계열 시스템용 RustDesk Wayland 프리뷰**는 여기에 **Wayland에서의 진정한 무인 접속**을 더합니다. 최초 설정을 마치면 원격 컴퓨터 앞에서 누군가가 세션을 매번 승인할 필요가 없습니다. **무인 세션에서도 다중 모니터 환경이 작동합니다.**

아무도 로그인하지 않은 상태에서도 접속할 수 있으며, 재부팅 후 **로그인 화면**에서도 가능합니다.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">X에서 데모 영상 보기</a></blockquote>
</div>
<script data-astro-rerun>
(function () {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  } else if (!document.getElementById('twitter-wjs')) {
    var s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(s);
  }
})();
</script>

현재는 **x86_64 Debian/Ubuntu 계열 시스템**용 별도 프리뷰 빌드로 공개합니다.

**[Wayland 무인 접속 빌드 다운로드](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

비교하자면, [AnyDesk는 Linux 수신 연결에 Xorg가 필요하다고 문서화](https://support.anydesk.com/anydesk-for-linux-raspberry-pi)하고 있으며, [TeamViewer는 Wayland 지원을 실험적 기능으로 설명](https://community.teamviewer.com/English/discussion/122410)합니다.

기본값으로 전환하기 전에 더 많은 실사용 환경에서의 테스트를 거치고자 합니다.

구현이 안정화되면 **Fedora와 Arch Linux**를 비롯한 더 많은 Linux 배포판에 Wayland 무인 접속을 제공하고, 최종적으로는 RustDesk 표준 릴리스에 포함할 계획입니다.

Wayland를 사용 중이라면, 특히 다중 모니터 환경이라면 프리뷰 빌드를 사용해 보시고 잘 되는 점과 안 되는 점을 알려 주세요. 확인해 볼 만한 항목은 재부팅 후 아무도 로그인하기 전에 접속하기, 로그아웃 후 다시 접속하기, 모니터를 하나씩 선택해 보기입니다. 피드백에는 배포판, 데스크톱 환경, 디스플레이 관리자, 빌드 버전을 함께 적어 주시고, 이 항목들을 통과할 때까지는 기존 접속 경로를 유지하세요.

## 관련 글

- [리눅스용 RustDesk](/ko/blog/rustdesk-for-linux-ko)
- [RustDesk 무인 접속](/ko/blog/rustdesk-unattended-access-setup-ko)
- [RustDesk vs AnyDesk](/ko/blog/rustdesk-vs-anydesk-ko)
- [RustDesk vs TeamViewer](/ko/blog/rustdesk-vs-teamviewer-ko)
- [Wayland 화면 캡처 구현(DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)
