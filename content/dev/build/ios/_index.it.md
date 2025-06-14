---
title: iOS
weight: 23
---

```
cd
# Per risparmiare il tuo tempo e il nostro tempo, abbiamo preparato file dipendenti per te.
https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/ios_dep.tar.gz
tar xzf ios_dep.tar.gz
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
# Per il simulatore: VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_x64.sh
VCPKG_ROOT=$HOME/vcpkg ./flutter/ios_arm64.sh
cd flutter
dart pub global activate ffigen
# Buona fortuna!
# Per il simulatore: sed 's/aarch64/x86_64/g' ios/Runner.xcodeproj/project.pbxproj
# Dimentica se necessario: cd ios; pod install; cd -;
flutter run
```