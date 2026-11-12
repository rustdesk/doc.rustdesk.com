---
title: Частые вопросы по Windows
weight: 40
description: "Решение частых проблем при сборке RustDesk в Windows: ошибки загрузки пакетов vcpkg, отсутствующие пакеты из Cargo.lock, настройка VCPKG_ROOT и LIBCLANG_PATH."
keywords: ["rustdesk build faq windows", "rustdesk vcpkg error", "rustdesk cargo lock error", "rustdesk libclang path", "rustdesk windows build troubleshooting"]
---

Здесь собраны решения частых ошибок сборки RustDesk в Windows, особенно связанных с `vcpkg`, зависимостями Rust и настройкой `clang`.

## Когда пригодится эта страница?

Откройте эту страницу, если окружение для сборки в Windows уже настроено, но `cargo run`, `vcpkg` или `bindgen` всё равно завершаются с ошибкой. Здесь описаны самые частые ошибки зависимостей и переменных окружения при сборке RustDesk в Windows.

## Не удаётся загрузить пакет vcpkg

### Ошибка

```
 -- Fetching https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b...
   CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
       Command failed: D:/program/Git/mingw64/bin/git.exe fetch https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b --depth 1 -n
```

### Решение

Скачайте в браузере [libyuv-287158925b0e03ea4499a18b4e08478c5781541b.tar.gz](https://chromium.googlesource.com/libyuv/libyuv/+archive/287158925b0e03ea4499a18b4e08478c5781541b.tar.gz), переместите файл в `vcpkg/downloads` и повторите установку.



## Пакета из Cargo.lock не существует

### Ошибка

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

Возможно, автор выполнил `git force push` и прежний коммит был перезаписан.

### Решение

Выполните `cargo update`, чтобы принудительно обновить пакет.



## Не задана переменная VCPKG_ROOT

### Ошибка

```
thread 'main' panicked at 'Failed to find package: VcpkgNotFound("No vcpkg installation found. Set the VCPKG_ROOT environment variable or run 'vcpkg integrate install'")', libs\scrap\build.rs:7:45
```

### Решение

Добавьте переменную окружения `VCPKG_ROOT` или запустите сборку командой `VCPKG_ROOT=<vcpkg_dir> cargo run`.



## Не установлен clang или не задана переменная LIBCLANG_PATH

### Ошибка

```
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', C:\Users\selfd\.cargo\registry\src\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\bindgen-0.59.2\src/lib.rs:2144:31
```

### Решение

Установите [LLVM](https://releases.llvm.org/download.html) и добавьте переменную окружения `LIBCLANG_PATH` со значением `llvm_install_dir/bin`.
