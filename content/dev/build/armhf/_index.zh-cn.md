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
