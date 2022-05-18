---
title: ARMhf
weight: 24
---

# 本教材由[@wwjabc](https://github.com/wwjabc)贡献提供

https://github.com/rustdesk/rustdesk/issues/175#issuecomment-1129516367

## 基本构建步骤
- 下载[ubuntu18.04_rootfs.tar.gz](https://pan.baidu.com/s/1pmjw7OBn5NbiCvM6GGaEgQ) 提取码：xlnx (我试了好几个版本的ubuntu系统，只有在这个上面成功了，编译好的可执行文件是可以在其他armhf系统下面用的。)
- 下载编译[cmake-3.14.5](https://cmake.org/files/v3.14/cmake-3.14.5.tar.gz)  编译[参考教程](https://blog.csdn.net/weixin_43793181/article/details/118157012) 系统自带的cmake版本为3.10.2，编译[vcpkg-2020.11](https://github.com/microsoft/vcpkg/archive/refs/tags/2020.11.tar.gz)时会报版本过低
  - 在板编译（qemu虚拟机我没搭建成功）
  
- 安装[vcpkg](https://github.com/microsoft/vcpkg), 正确设置`VCPKG_ROOT`环境变量。建议下载[vcpkg-2020.11](https://github.com/microsoft/vcpkg/archive/refs/tags/2020.11.tar.gz)，我暂时用的是这个版本

  - Linux: vcpkg install libyuv 
  - [libvpx](https://pan.baidu.com/s/1fgi0PzOrT4VpL6p3MY-IVA) 提取码：xlnx (手动安装)
  - [opus](https://pan.baidu.com/s/1fxQayZ7FGq-Z0bn_pjBVfQ) 提取码：xlnx (手动安装)

- 运行 `cargo run`

## 在 armhf 上编译

### 安装Ubuntu 18.04到SD卡

```sh
sudo tar zxmf ./ubuntu18.04_rootfs.tar.gz -C /your sd path/rootfs/
#用户名(usrname)：xilinx
#密码(passwd)：xilinx
```

### 安装cmake
```sh
tar -xzvf cmake-3.14.5.tar.gz
cd cmake-3.14.5/
#这两步可能需要很长时间，依次输入
./bootstrap
make -j4
sudo make install
```
```sh
root@pynq:~/cmake-3.14.5# ./bootstrap 
---------------------------------------------
CMake 3.14.5, Copyright 2000-2019 Kitware, Inc. and Contributors
Found GNU toolchain
C compiler on this system is: gcc       
C++ compiler on this system is: g++          
Makefile processor on this system is: make
g++ has setenv
g++ has unsetenv
g++ does not have environ in stdlib.h
g++ has stl wstring
g++ has <ext/stdio_filebuf.h>
---------------------------------------------
```
```sh
root@pynq:~/cmake-3.14.5# cmake --version
cmake version 3.14.5

CMake suite maintained and supported by Kitware (kitware.com/cmake).
```
### 安装依赖项

```sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev ninja-build
```

### 安装 vcpkg

```sh
tar zxmf vcpkg-2020.11.tar.gz
mv vcpkg-2020.11 vcpkg
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$HOME/vcpkg
vcpkg/vcpkg install libyuv
```

```sh
root@pynq:~# export VCPKG_ROOT=$HOME/vcpkg
root@pynq:~# export VCPKG_FORCE_SYSTEM_BINARIES=1
root@pynq:~# vcpkg/vcpkg install libyuv
Computing installation plan...
The following packages will be built and installed:
  * libjpeg-turbo[core]:arm-linux
    libyuv[core]:arm-linux
Additional packages (*) will be modified to complete this operation.
Detecting compiler hash for triplet arm-linux...
Starting package 1/2: libjpeg-turbo:arm-linux
Building package libjpeg-turbo[core]:arm-linux...
Could not locate cached archive: /root/.cache/vcpkg/archives/62/629c73ee8920588cb446128f15cbfa66dfec1528.zip
-- Using community triplet arm-linux. This triplet configuration is not guaranteed to succeed.
-- [COMMUNITY] Loading triplet configuration from: /root/vcpkg/triplets/community/arm-linux.cmake
-- Downloading https://github.com/libjpeg-turbo/libjpeg-turbo/archive/ae87a958613b69628b92088b313ded0d4f59a716.tar.gz...
-- Extracting source /root/vcpkg/downloads/libjpeg-turbo-libjpeg-turbo-ae87a958613b69628b92088b313ded0d4f59a716.tar.gz
-- Applying patch add-options-for-exes-docs-headers.patch
-- Applying patch workaround_cmake_system_processor.patch
-- Using source at /root/vcpkg/buildtrees/libjpeg-turbo/src/0d4f59a716-5f2e7bc00b.clean
-- Configuring arm-linux-dbg
-- Configuring arm-linux-rel
-- Building arm-linux-dbg
-- Building arm-linux-rel
-- Performing post-build validation
-- Performing post-build validation done
Stored binary cache: /root/.cache/vcpkg/archives/62/629c73ee8920588cb446128f15cbfa66dfec1528.zip
Building package libjpeg-turbo[core]:arm-linux... done
Installing package libjpeg-turbo[core]:arm-linux...
Installing package libjpeg-turbo[core]:arm-linux... done
Elapsed time for package libjpeg-turbo:arm-linux: 5.475 min
Starting package 2/2: libyuv:arm-linux
Building package libyuv[core]:arm-linux...
Could not locate cached archive: /root/.cache/vcpkg/archives/36/3683c357e53932d95a037b4eb8cb74fe71c15f80.zip
-- Using community triplet arm-linux. This triplet configuration is not guaranteed to succeed.
-- [COMMUNITY] Loading triplet configuration from: /root/vcpkg/triplets/community/arm-linux.cmake
-- Fetching https://chromium.googlesource.com/libyuv/libyuv...
#这里有时候会卡很久，甚至失败，可以ctrl+c后重新执行vcpkg/vcpkg install libyuv
CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:106 (message):
    Command failed: /usr/bin/git fetch https://chromium.googlesource.com/libyuv/libyuv fec9121b676eccd9acea2460aec7d6ae219701b9 --depth 1 -n
    Working Directory: /root/vcpkg/downloads/git-tmp
    Error code: 128
    See logs for more information:
      /root/vcpkg/buildtrees/libyuv/git-fetch-arm-linux-err.log

Call Stack (most recent call first):
  scripts/cmake/vcpkg_from_git.cmake:78 (vcpkg_execute_required_process)
  ports/libyuv/portfile.cmake:3 (vcpkg_from_git)
  scripts/ports.cmake:135 (include)


Error: Building package libyuv:arm-linux failed with: BUILD_FAILED
Please ensure you are using the latest portfiles with `./vcpkg update`, then
submit an issue at https://github.com/Microsoft/vcpkg/issues including:
  Package: libyuv:arm-linux
  Vcpkg version: 2020.06.15-unknownhash

Additionally, attach any relevant sections from the log files above.
```
- 或者直接下载离线包[libyuv](链接：https://pan.baidu.com/s/1NmlvsXFh2Ivc36XEyb-BIw) 提取码：xlnx 复制到vcpkg/downloads/文件夹下 继续执行
```sh
mv ./libyuv-fec9121b676eccd9acea2460aec7d6ae219701b9.tar.gz vcpkg/downloads/
vcpkg/vcpkg install libyuv
```
```sh
root@pynq:~# mv libyuv-fec9121b676eccd9acea2460aec7d6ae219701b9.tar.gz vcpkg/downloads/
root@pynq:~# vcpkg/vcpkg install libyuv
Computing installation plan...
The following packages will be built and installed:
    libyuv[core]:arm-linux
Detecting compiler hash for triplet arm-linux...
Starting package 1/1: libyuv:arm-linux
Building package libyuv[core]:arm-linux...
Could not locate cached archive: /root/.cache/vcpkg/archives/36/3683c357e53932d95a037b4eb8cb74fe71c15f80.zip
-- Using community triplet arm-linux. This triplet configuration is not guaranteed to succeed.
-- [COMMUNITY] Loading triplet configuration from: /root/vcpkg/triplets/community/arm-linux.cmake
-- Using cached /root/vcpkg/downloads/libyuv-fec9121b676eccd9acea2460aec7d6ae219701b9.tar.gz
-- Extracting source /root/vcpkg/downloads/libyuv-fec9121b676eccd9acea2460aec7d6ae219701b9.tar.gz
-- Applying patch fix_cmakelists.patch
-- Applying patch fix-build-type.patch
-- Using source at /root/vcpkg/buildtrees/libyuv/src/ae219701b9-6b491b90af.clean
-- Configuring arm-linux-dbg
-- Configuring arm-linux-rel
-- Building arm-linux-dbg
-- Building arm-linux-rel
-- Installing: /root/vcpkg/packages/libyuv_arm-linux/share/libyuv/copyright
-- Performing post-build validation
-- Performing post-build validation done
Stored binary cache: /root/.cache/vcpkg/archives/36/3683c357e53932d95a037b4eb8cb74fe71c15f80.zip
Building package libyuv[core]:arm-linux... done
Installing package libyuv[core]:arm-linux...
Installing package libyuv[core]:arm-linux... done
Elapsed time for package libyuv:arm-linux: 2.266 min

Total elapsed time: 2.59 min

The package libyuv:arm-linux provides CMake targets:

    find_package(libyuv CONFIG REQUIRED)
    target_link_libraries(main PRIVATE yuv)
```
