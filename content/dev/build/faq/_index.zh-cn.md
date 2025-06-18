---
title: Windows 常见问题
weight: 40
---

## vcpkg下载包失败
### 错误示例
```
 -- Fetching https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b...
   CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
       Command failed: D:/program/Git/mingw64/bin/git.exe fetch https://chromium.googlesource.com/libyuv/libyuv 287158925b0e03ea4499a18b4e08478c5781541b --depth 1 -n
```
### 解决方法
使用浏览器下载`https://chromium.googlesource.com/libyuv/libyuv/+archive/287158925b0e03ea4499a18b4e08478c5781541b.tar.gz`,  然后放到`vcpkg/downloads`下， 重新安装.



## Cargo.lock里的版本不存在
### 错误示例
```
$ cargo run
       Updating git repository `https://github.com/open-trade/confy`
   warning: spurious network error (2 tries remaining): failed to receive response: 操作超时
   ; class=Os (2)
   error: failed to get `confy` as a dependency of package `hbb_common v0.1.0 (D:\rustdesk\rustdesk\rustdesk\libs\hbb_common)`

   Caused by:
     failed to load source for dependency `confy`

   Caused by:
     Unable to update https://github.com/open-trade/confy#27fa1294

   Caused by:
     object not found - no match for id (27fa12941291b44ccd856aef4a5452c1eb646047); class=Odb (9); code=NotFound (-3)
```
可能作者使用`git force push`覆盖了之前的commit
### 解决方法
`cargo update`强制更新包



## VCPKG_ROOT环境变量未设置
### 错误示例
```
thread 'main' panicked at 'Failed to find package: VcpkgNotFound("No vcpkg installation found. Set the VCPKG_ROOT environment variable or run 'vcpkg integrate install'")', libs\scrap\build.rs:7:45
```
### 解决办法
添加VCPKG_ROOT环境变量, 或者使用`VCPKG_ROOT=<vcpkg_dir> cargo run`



## 未安装clang环境, 或未设置LIBCLANG_PATH环境变量
### 错误示例
```
thread 'main' panicked at 'Unable to find libclang: "couldn't find any valid shared libraries matching: ['clang.dll', 'libclang.dll'], set the `LIBCLANG_PATH` environment variable to a path where one of these files can be found (invalid: [])"', C:\Users\selfd\.cargo\registry\src\mirrors.ustc.edu.cn-61ef6e0cd06fb9b8\bindgen-0.59.2\src/lib.rs:2144:31
```
### 解决办法
安装[llvm](https://releases.llvm.org/download.html), 设置`LIBCLANG_PATH`环境变量为`llvm_install_dir/bin`
