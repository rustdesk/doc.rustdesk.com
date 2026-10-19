---
title: Windows için SSS
weight: 40
description: "vcpkg indirme hataları, eksik Cargo.lock paketleri, VCPKG_ROOT yapılandırması ve LIBCLANG_PATH ayarları dahil Windows'taki yaygın derleme sorunlarını giderin."
keywords: ["rustdesk derleme sss windows", "rustdesk vcpkg hatası", "rustdesk cargo lock hatası", "rustdesk libclang path", "rustdesk windows derleme sorun giderme"]
---

Özellikle `vcpkg`, Rust bağımlılıkları ve `clang` yapılandırması etrafında RustDesk için yaygın Windows derleme hatalarını çözmek için bu SSS bölümünü kullanın.

## Bu Windows derleme SSS'sini ne zaman kullanmalısınız?

Windows derleme ortamınız zaten kurulmuşsa ancak `cargo run`, `vcpkg` veya `bindgen` komutları hâlâ başarısız oluyorsa bu sayfayı kullanın. RustDesk derleme sürecindeki en yaygın Windows tarafı bağımlılık ve ortam değişkeni hatalarını kapsar.

## vcpkg paketi indirme başarısız oldu

### Hata

```
 -- Fetching https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b...
   CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
       Command failed: D:/program/Git/mingw64/bin/git.exe fetch https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b --depth 1 -n
```

### Çözüm

[libyuv-287158925b0e03ea4499a18b4e08478c5781541b.tar.gz](https://chromium.googlesource.com/libyuv/libyuv/+archive/287158925b0e03ea4499a18b4e08478c5781541b.tar.gz) dosyasını indirmek için bir tarayıcı kullanın, ardından `vcpkg/downloads` dizinine taşıyın ve yeniden kurun.

## Cargo.lock içindeki paket mevcut değil

### Hata

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

Yazar `git force push` kullanmış olabilir ve önceki commit üzerine yazılmış olabilir.

### Çözüm

`cargo update` çalıştırarak paketi güncellenmeye zorlayın.

## VCPKG_ROOT ayarlanmamış

### Hata

```
thread 'main' panicked at 'Failed to find package: VcpkgNotFound("No vcpkg installation found. Set the VCPKG_ROOT environment variable or run 'vcpkg integrate install'")', libs\scrap\build.rs:7:45
```

### Çözüm

`VCPKG_ROOT` ortam değişkenini ekleyin veya `VCPKG_ROOT=<vcpkg_dizini> cargo run` komutuyla çalıştırın.

## clang kurulu değil veya LIBCLANG_PATH ayarlanmamış

### Hata

```
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', C:\Users\selfd\.cargo\registry\src\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\bindgen-0.59.2\src/lib.rs:2144:31
```

### Çözüm

[LLVM](https://releases.llvm.org/download.html) kurun ve `LIBCLANG_PATH` ortam değişkenini `llvm_kurulum_dizini/bin` olarak ekleyin.
