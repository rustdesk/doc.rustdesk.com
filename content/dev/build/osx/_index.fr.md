---
title: macOS
weight: 21
---

```
cd
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2022.04.12
./bootstrap-vcpkg.sh
brew install nasm yasm
./vcpkg install libvpx libyuv opus
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
export VCPKG_ROOT=$HOME/vcpkg
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
cargo run
```
