---
title: iOS
weight: 23
---

```
cd
# あなたと私たちの時間を節約するため、依存ファイルを準備しました。
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
# シミュレーター用: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# 幸運を！
# シミュレーター用: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# 必要な場合は忘れずに: cd ios; pod install; cd -;
flutter run
```
