---
title: ARMhf
weight: 24
---

# This tutorial is contributed by [@wwjabc](https://github.com/wwjabc)

https://github.com/rustdesk/rustdesk/issues/175#issuecomment-1129516367

## Basic build steps
- Download [ubuntu18.04_rootfs.tar.gz](https://pan.baidu.com/s/1pmjw7OBn5NbiCvM6GGaEgQ), extraction code: xlnx (I tried several versions of ubuntu system, only on this one succeeded, compiled executable file can be used under other armhf systems.)
- Download and compile [cmake-3.14.5](https://cmake.org/files/v3.14/cmake-3.14.5.tar.gz), compilation [Reference Tutorial](https://blog.csdn.net/weixin_43793181/article/details/118157012). The cmake version that comes with the system is 3.10.2, compiling [vcpkg-2020.11](https://github.com/microsoft/vcpkg/archive/refs/tags/2020.11.tar.gz ) will report that the version is too low.
  - Compile on the board (I failed to build the qemu virtual machine successfully)
  
- Install [vcpkg](https://github.com/microsoft/vcpkg), set the `VCPKG_ROOT` environment variable correctly. It is recommended to download [vcpkg-2020.11](https://github.com/microsoft/vcpkg/archive/refs/tags/2020.11.tar.gz), I am using this version for the time being. 

  - Linux: vcpkg install libyuv
  - [libvpx](https://pan.baidu.com/s/1fgi0PzOrT4VpL6p3MY-IVA) Extraction code: xlnx (manual installation)
  - [opus](https://pan.baidu.com/s/1fxQayZ7FGq-Z0bn_pjBVfQ) Extraction code: xlnx (manual installation)

- Run `cargo run`

## Compile on armhf

### Install Ubuntu 18.04 to SD card

````sh
sudo tar zxmf ./ubuntu18.04_rootfs.tar.gz -C /your sd path/rootfs/
#Username (usrname): xilinx
#passwd: xilinx
````

### Install cmake
````sh
tar -xzvf cmake-3.14.5.tar.gz
cd cmake-3.14.5/
#These two steps may take a long time, enter them in turn
./bootstrap
make -j4
sudo make install
````
````sh
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
````
### Install dependencies

````sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev
````

### Install vcpkg

````sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2024.12.01
cd..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$HOME/vcpkg
vcpkg/vcpkg install libyuv
````
