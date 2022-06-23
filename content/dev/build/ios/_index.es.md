---
title: iOS 
weight: 23
---

```
cd
# Para ahorrar su tiempo y el nuestro, preparamos archivos dependientes para usted.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
# Para simulador: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Buena suerte!
# Para simulador: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Olvídese si es necesario: cd ios; pod install; cd -;
flutter run
```
