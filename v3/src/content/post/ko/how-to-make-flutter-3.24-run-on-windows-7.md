---
publishDate: 2024-12-02T00:00:00Z
lang: ko
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: Windows 7에서 Flutter 3.24를 실행하는 방법
excerpt: Flutter 3.22부터 Windows 7 / 8 지원이 중단되어 Flutter Engine을 수정해야 합니다.
image: ~/assets/images/blog/flutter-win7.png
category: 릴리스
slug: windows-7-flutter-3-24-silhaeng-haneun-bangbeop
tags: [개발]
---

최근 [RustDesk](https://github.com/rustdesk/rustdesk)에 Flutter 3.24.5를 도입한 뒤 Windows 7에서 실행되지 않았습니다. 이를 해결하기 위해 Flutter Engine을 수정했습니다.

## Windows 7에서 Flutter 3.24.5 실행하기

Dart 3.3과 Flutter 3.19가 Windows 7 및 8을 지원하는 마지막 버전이라고 공식 발표되었습니다. Flutter 3.24.5를 사용하려면 Dart의 일부 변경 사항을 되돌려야 합니다.

관련 링크: [공식 발표](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. 중국어 환경의 `Platform.localHostname` 수정

Dart는 원래 `gethostname` API를 사용해 중국어 환경에서 `Platform.localHostname`이 실패했습니다. 이후 Windows 8 이상에서만 제공되는 `GetHostNameW`로 변경했습니다. Windows 7을 위해 이 변경을 되돌려야 하며, 중국어 환경의 `Platform.localHostname`에는 영향이 생깁니다.

Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. Windows 7 unwinding records API 처리 복원

Dart에는 Windows 7에 `RtlAddGrowableFunctionTable`이 없을 때의 호환 처리가 있었지만 삭제되었습니다. 해당 커밋을 되돌려야 합니다.

Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. 디렉터리 상대 심볼릭 링크 수정

Dart의 수정은 `File::GetType`에서 Windows 8 이상 전용 `PathCchCombineEx`를 사용합니다. Windows 7 지원을 위해 이 변경도 되돌립니다.

Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## 결론

Windows 7에서 Flutter 3.24.5를 실행하려면 Dart의 주요 변경을 되돌려야 합니다. 중국어 환경의 `Platform.localHostname`과 상대 심볼릭 링크에 부작용이 있지만 Windows 7 사용자에게는 필요한 단계입니다.

전체 구현은 [CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml), 수정 엔진 적용 방법은 [여기](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109)에서 확인하세요.
