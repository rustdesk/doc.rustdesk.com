---
title: ARMhf
weight: 24
---

# 本教材由[@wwjabc](https://github.com/wwjabc)貢獻提供

https://github.com/rustdesk/rustdesk/issues/175#issuecomment-1129516367

## 基本構建步驟
- 下載[ubuntu18.04_rootfs.tar.gz](https://pan.baidu.com/s/1pmjw7OBn5NbiCvM6GGaEgQ) 提取碼：xlnx (我試了好幾個版本的ubuntu系統，只有在這個上面成功了，編譯好的可執行文件是可以在其他armhf系統下面用的。)
- 下載編譯[cmake-3.14.5](https://cmake.org/files/v3.14/cmake-3.14.5.tar.gz)  編譯[參考教程](https://blog.csdn.net/weixin_43793181/article/details/118157012) 系統自帶的cmake版本為3.10.2，編譯[vcpkg-2020.11](https://github.com/microsoft/vcpkg/archive/refs/tags/2020.11.tar.gz)時會報版本過低
  - 在板編譯（qemu虛擬機我沒搭建成功）
  
- 安裝[vcpkg](https://github.com/microsoft/vcpkg), 正確設置`VCPKG_ROOT`環境變量。建議下載[vcpkg-2020.11](https://github.com/microsoft/vcpkg/archive/refs/tags/2020.11.tar.gz)，我暫時用的是這個版本

  - Linux: vcpkg install libyuv 
  - [libvpx](https://pan.baidu.com/s/1fgi0PzOrT4VpL6p3MY-IVA) 提取碼：xlnx (手動安裝)
  - [opus](https://pan.baidu.com/s/1fxQayZ7FGq-Z0bn_pjBVfQ) 提取碼：xlnx (手動安裝)

- 運行 `cargo run`

## 在 armhf 上編譯

### 安裝Ubuntu 18.04到SD卡

```sh
sudo tar zxmf ./ubuntu18.04_rootfs.tar.gz -C /your sd path/rootfs/
#用戶名(usrname)：xilinx
#密碼(passwd)：xilinx
```

### 安裝cmake
```sh
tar -xzvf cmake-3.14.5.tar.gz
cd cmake-3.14.5/
#這兩步可能需要很長時間，依次輸入
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
### 安裝依賴項

```sh
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev
```

### 安裝 vcpkg

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2024.12.01
cd ..
vcpkg/bootstrap-vcpkg.sh
export VCPKG_ROOT=$HOME/vcpkg
vcpkg/vcpkg install libyuv
```