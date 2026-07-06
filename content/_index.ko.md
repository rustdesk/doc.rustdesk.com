---
title: "RustDesk 문서 - 오픈소스 원격 데스크톱"
description: "오픈소스 원격 데스크톱 소프트웨어인 RustDesk의 전체 문서입니다. 자체 호스팅 방법, 클라이언트 구성 방법, 그리고 인프라 전반에 걸쳐 RustDesk를 배포하는 방법을 알아보세요."
keywords: ["rustdesk", "remote desktop", "open source", "self-host", "documentation", "remote access", "VNC alternative", "teamviewer alternative"]
type: docs
breadcrumbs: false
weight: 1
---

RustDesk는 최소한의 구성으로 자체 호스팅과 보안을 위한 완벽한 기능의 오픈소스 원격 제어 대안입니다. 귀하는 데이터에 대한 완전한 제어권을 가지며, 보안에 대한 우려가 없습니다. 클라이언트는 오픈소스이며, 저희 [website](https://rustdesk.com)에서 구매 가능한 완벽한 기능의 **전문 서버**와 기본 무료 및 오픈소스 소프트웨어인 저희 **전문 서버**를 기반으로 한 서버 중에서 선택할 수 있습니다.

## 어떤 RustDesk 경로를 선택해야 할까요?

| 필요 | 최고의 시작점 |
| --- | --- |
| RustDesk를 최종 사용자 또는 관리자로 사용하기 | [Client](/docs/ko/client/) |
| 무료 오픈소스 서버를 셀프호스팅하기 | [RustDesk Server OSS](/docs/ko/self-host/rustdesk-server-oss/) |
| 웹 콘솔, SSO 및 기업용 제어 기능과 함께 셀프호스팅하기 | [RustDesk Server Pro](/docs/ko/self-host/rustdesk-server-pro/) |
| 소스에서 RustDesk를 빌드하거나 패키지화하기 | [Development](/docs/ko/dev/) |

## 특징
- Windows, macOS, Linux, iOS, Android, 웹에서 작동합니다.
- VP8 / VP9 / AV1 소프트웨어 코덱과 H264 / H265 하드웨어 코덱을 지원합니다.
- 데이터를 직접 관리하고, 귀하의 인프라에 쉽게 자체 호스팅 솔루션을 설정할 수 있습니다.
- NaCl 기반의 엔드투엔드 암호화를 사용한 P2P 연결입니다.
- Windows에서는 관리자 권한이나 설치가 필요 없으며, 필요 시 현지 또는 원격에서 권한 상승이 가능합니다.
- 우리는 간단하게 유지하는 것을 좋아하며 가능한 한 더 간단하게 만들기 위해 노력하겠습니다.

## GitHub 리포지토리
- **메인 클라이언트 리포지토리**: https://github.com/rustdesk/rustdesk
- **오픈소스 서버 리포지토리**: https://github.com/rustdesk/rustdesk-server  
- **Pro 서버 리포지토리**: https://github.com/rustdesk/rustdesk-server-pro
- **문서 리포지토리**: https://github.com/rustdesk/doc.rustdesk.com

{{% children depth="4" showhidden="true" %}}