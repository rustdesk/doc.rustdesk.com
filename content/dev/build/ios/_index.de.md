---
title: iOS 
weight: 23
---

```
cd
# Um Ihre und unsere Zeit zu sparen, haben wir abhängige Dateien für Sie vorbereitet.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
# Für den Simulator: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Viel Glück!
# Für den Simulator: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Bei Bedarf vergessen: cd ios; pod install; cd -;
flutter run
```
