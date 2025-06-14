---
title: FAQ
weight: 40
---

# Échec du téléchargement du package vcpkg

## Erreur

```
 -- Fetching https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b...
   CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
       Command failed: D:/program/Git/mingw64/bin/git.exe fetch https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b --depth 1 -n
```

## Solution

Utiliser un navigateur pour télécharger `https://chromium.googlesource.com/libyuv/libyuv/+archive/287158925b0e03ea4499a18b4e08478c5781541b.tar.gz`,  puis déplacez-le dans `vcpkg/downloads` et réinstallez.


# Le paquet dans Cargo.lock n'existe pas

## Erreur

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

Peut-être que l'auteur a utilisé `git force push` et que le commit précédent a été écrasé.

## Solution

`cargo update`, forcer la mise à jour du paquet.


# VCPKG_ROOT non défini

## Erreur

```
thread 'main' panicked at 'Failed to find package: VcpkgNotFound("No vcpkg installation found. Set the VCPKG_ROOT environment variable or run 'vcpkg integrate install'")', libs\scrap\build.rs:7:45
```

## Solution

Ajoutez la variable d'environnement `VCPKG_ROOT` ou lancer avec la commande `VCPKG_ROOT=<vcpkg_dir> cargo run`

# clang non installé ou LIBCLANG_PATH non défini

## Erreur

```
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', C:\Users\selfd\.cargo\registry\src\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\bindgen-0.59.2\src/lib.rs:2144:31
```

## Solution

Installer [llvm](https://releases.llvm.org/download.html), et ajoutez la variable d'environnement `LIBCLANG_PATH` avec la valeur `llvm_install_dir/bin`