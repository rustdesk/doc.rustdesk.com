---
title: Windows용 FAQ
weight: 40
description: "Windows에서 흔히 발생하는 RustDesk 빌드 문제를 해결하세요. 여기에는 vcpkg 다운로드 실패, 누락된 Cargo.lock 패키지, VCPKG_ROOT 구성 및 LIBCLANG_PATH 설정이 포함됩니다."
keywords: ["rustdesk build faq windows", "rustdesk vcpkg error", "rustdesk cargo lock error", "rustdesk libclang path", "rustdesk windows build troubleshooting"]
---

이 FAQ를 사용하여 RustDesk의 일반적인 Windows 빌드 오류, 특히 `vcpkg`, Rust 종속성 및 `clang` 구성과 관련된 오류를 해결하십시오.

## 이 Windows 빌드 FAQ는 언제 사용해야 하나요?

Windows 빌드 환경이 이미 설정된 후에도 `cargo run`, `vcpkg` 또는 `bindgen`가 여전히 실패하는 경우 이 페이지를 사용하십시오. RustDesk 빌드 과정에서 가장 일반적인 Windows 측 종속성 및 환경 변수 오류를 다룹니다.

## vcpkg 패키지 다운로드 실패

### 오류

```
 -- Fetching https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b...
   CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
       Command failed: D:/program/Git/mingw64/bin/git.exe fetch https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b --depth 1 -n
```

### 해결 방법

브라우저를 사용해 [libyuv-287158925b0e03ea4499a18b4e08478c5781541b.tar.gz](https://chromium.googlesource.com/libyuv/libyuv/+archive/287158925b0e03ea4499a18b4e08478c5781541b.tar.gz)를 다운로드한 다음, 이를 `vcpkg/downloads`로 이동하고 다시 설치하십시오.

## Cargo.lock 패키지가 존재하지 않습니다

### 오류

```
$ cargo run
       Updating git repository `https://github.com/open-trade/confy`
   warning: spurious network error (2 tries remaining): failed to receive response: Operation Timeout
   ; class=Os (2)
   error: failed to get `confy` as a dependency of package `hbb_common v0.1.0 (D:\rustdesk\rustdesk\rustdesk\libs\hbb_common)`

   Caused by:
     failed to load source for dependency `confy`

   Caused by:
     Unable to update https://github.com/open-trade/confy#27fa1294

   Caused by:
     object not found - no match for id (27fa12941291b44ccd856aef4a5452c1eb646047); class=Odb (9); code=NotFound (-3)
```

아마도 작성자가 `git force push`를 사용했고 이전 커밋이 덮어쓰였을 것입니다.

### 해결 방법

`cargo update`로 패키지를 강제로 업데이트하십시오.

## VCPKG_ROOT가 설정되지 않았습니다

### 오류

```
thread 'main' panicked at 'Failed to find package: VcpkgNotFound("No vcpkg installation found. Set the VCPKG_ROOT environment variable or run 'vcpkg integrate install'")', libs\scrap\build.rs:7:45
```

### 해결 방법

`VCPKG_ROOT` 환경 변수를 추가하거나 `VCPKG_ROOT=<vcpkg_dir> cargo run`로 실행하십시오.

## clang이 설치되지 않았거나 LIBCLANG_PATH가 설정되지 않았습니다

### 오류

```
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', C:\Users\selfd\.cargo\registry\src\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\bindgen-0.59.2\src/lib.rs:2144:31
```

### 해결 방법

[LLVM](https://releases.llvm.org/download.html)를 설치하고, `LIBCLANG_PATH` 환경 변수를 `llvm_install_dir/bin`로 추가하세요.