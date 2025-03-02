---
title: iOS
weight: 23
---

```
cd
# Pour économiser votre temps et le nôtre, nous avons préparé pour vous les dépendances.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
# Pour la simulation: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Bonne chance!
# Pour la simulation: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Si besoin: cd ios; pod install; cd -;
flutter run
```
