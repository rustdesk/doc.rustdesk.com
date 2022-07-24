---
title: iOS 
weight: 23
---

```
cd
# Azért hogy a te és a saját időnket egy kicsit takarítsuk, előkészítettük az építéshez szükséges fájlokat.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
# Simulatorhoz: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Sok sikert!
# Simulator: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Misc: cd ios; pod install; cd -;
flutter run
```
