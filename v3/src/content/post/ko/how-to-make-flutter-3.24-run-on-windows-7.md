---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: ko
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'Flutter 3.24.5를 Windows 7에서 실행한 방법'
excerpt: 'Windows 7과 8을 지원한 마지막 Flutter 릴리스는 3.19였습니다. RustDesk가 2024년 말 Flutter 3.24.5에 적용한 엔진 및 Dart 패치를 정리합니다.'
image: ~/assets/images/blog/flutter-win7.png
category: 릴리스
slug: windows-7-flutter-3-24-silhaeng-haneun-bangbeop
tags: [개발]
---

이 글은 RustDesk가 2024년 말 **Flutter 3.24.5**에 적용한 엔진 패치를 기록한 것입니다. [RustDesk](https://github.com/rustdesk/rustdesk)를 Flutter 3.24.5로 업그레이드하자 Windows 7에서 실행되지 않았기 때문에, Flutter 엔진을 수정하고 Dart 변경 사항 세 가지를 되돌렸습니다.

## Windows 7에서 Flutter 3.24.5를 실행하기 위한 해결책

Flutter 팀과 Dart 팀은 **Flutter 3.19와 Dart 3.3**이 Windows 7과 8을 지원하는 마지막 릴리스라고 발표했습니다. Flutter 3.24.5 빌드를 Windows 7에서 실행하기 위해 아래의 Dart 변경 사항 세 가지를 되돌렸습니다. 되돌린 각 변경은 알려진 한계를 포함해 이전 동작도 함께 되살립니다.

관련 링크: [공식 발표](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 중국어 환경의 `Platform.localHostname` 문제 수정

Dart는 원래 `gethostname` API를 사용했는데, 이 때문에 중국어 환경에서 `Platform.localHostname`이 실패했습니다. 이 문제를 해결하기 위해 Dart는 Windows 8 이상에서만 제공되는 `GetHostNameW` API로 바꿨습니다. Flutter를 Windows 7에서 실행하려면 이 변경을 되돌려야 합니다. 이 변경을 되돌리면 중국어 환경에서 `Platform.localHostname` 기능에 영향이 있다는 점에 유의하세요.

관련 이슈: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Windows 7용 unwinding records API 처리 제거 되돌리기

Dart에는 Windows 7에 `RtlAddGrowableFunctionTable` API가 없는 문제를 위한 호환성 수정이 있었지만, 이 수정은 이제 제거되었습니다. Windows 7 호환성을 유지하려면 이 처리를 제거한 커밋을 되돌려야 합니다.

관련 커밋: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. Windows에서 디렉터리에 대한 상대 심볼릭 링크가 작동하지 않는 문제 수정

Dart는 이전에 Windows에서 디렉터리에 대한 상대 심볼릭 링크가 작동하지 않는 문제를 수정하면서 File::GetType 메서드를 변경했습니다. 이 변경은 Windows 8 이상에서만 제공되는 PathCchCombineEx API를 사용합니다. Windows 7 지원을 되살리려면 이 변경도 되돌려야 합니다.

관련 커밋: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## 결론

저희 Flutter 3.24.5 빌드에서는 이 세 가지 변경을 되돌려 Windows 7 호환성을 되살렸습니다. 대가는 이전 Dart 동작입니다. 중국어 환경에서 `Platform.localHostname`이 다시 실패하고, 디렉터리에 대한 상대 심볼릭 링크는 새 수정을 잃습니다. 업스트림의 Windows 7 지원은 Flutter 3.19와 Dart 3.3에서 끝났으므로, 이 패치를 재사용한다면 패치한 엔진을 자체 애플리케이션으로 테스트하세요.

전체 구현은 [저희 CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml)에서 확인하세요.

수정한 엔진을 프로젝트에 적용하는 방법은 [여기](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)에서 볼 수 있습니다.
