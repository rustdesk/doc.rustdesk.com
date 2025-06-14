---
title: iOS
weight: 23
---

```
cd
# 为了节省您和我们的时间，我们为您准备了依赖文件。
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
# 对于模拟器：VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# 祝您好运！
# 对于模拟器：sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# 如需要可忽略：cd ios; pod install; cd -;
flutter run
```