---
title: iOS
weight: 23
---

```
cd
# 為節省你我的時間，我們已經準備好依賴檔案了。
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
# 模擬器：VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# 祝你好運！
# 模擬器：sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# 如果你忘記的話：cd ios; pod install; cd -;
flutter run
```
