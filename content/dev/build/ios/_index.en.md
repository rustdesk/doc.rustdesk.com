---
title: iOS
weight: 23
---

```
cd
# For saving your time and our time, we prepared dependent files for you.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
# For simulator: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Good Luck!
# For simulator: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Forget if need: cd ios; pod install; cd -;
flutter run
```
