---
title: iOS
weight: 23
---

```
cd
# Для экономии вашего и нашего времени мы подготовили для вас файлы зависимостей.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
# Для симулятора: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Удачи!
# Для симулятора: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Забыть, если надо: cd ios; pod install; cd -;
flutter run
```
