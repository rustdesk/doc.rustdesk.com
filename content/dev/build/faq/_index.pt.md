---
title: FAQ para Windows
weight: 40
---

## Falha no download de pacote vcpkg

### Erro

```
 -- Fetching https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b...
   CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
       Command failed: D:/program/Git/mingw64/bin/git.exe fetch https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b --depth 1 -n
```

### Solução

Use um navegador para baixar [libyuv-287158925b0e03ea4499a18b4e08478c5781541b.tar.gz](https://chromium.googlesource.com/libyuv/libyuv/+archive/287158925b0e03ea4499a18b4e08478c5781541b.tar.gz), depois mova para `vcpkg/downloads` e reinstale.



## Pacote no Cargo.lock não existe

### Erro

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

Talvez o autor tenha usado `git force push` e o commit anterior foi sobrescrito.

### Solução

`cargo update`, força a atualização do pacote.



## VCPKG_ROOT não definido

### Erro

```
thread 'main' panicked at 'Failed to find package: VcpkgNotFound("No vcpkg installation found. Set the VCPKG_ROOT environment variable or run 'vcpkg integrate install'")', libs\scrap\build.rs:7:45
```

### Solução

Adicione a variável de ambiente `VCPKG_ROOT`, ou execute com `VCPKG_ROOT=<vcpkg_dir> cargo run`.



## clang não instalado, ou LIBCLANG_PATH não definido

### Erro

```
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', C:\Users\selfd\.cargo\registry\src\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\bindgen-0.59.2\src/lib.rs:2144:31
```

### Solução

Instale [LLVM](https://releases.llvm.org/download.html), adicione a variável de ambiente `LIBCLANG_PATH` como `llvm_install_dir/bin`.