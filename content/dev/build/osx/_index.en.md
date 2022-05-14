---
title: macOS
weight: 21
---

```
cd
git clone https://github.com/microsoft/vcpkg
git checkout 2022.04.12
./bootstrap-vcpkg.sh
brew install nasm yasm
./vcpkg install libvpx libyuv opus
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
VCPKG_ROOT=$HOME/vcpkg cargo run
```
