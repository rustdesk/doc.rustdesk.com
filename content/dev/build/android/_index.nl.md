---
title: Android
weight: 22
---

{{% notice note %}}
Deze handleiding veronderstelt dat u **vertrouwd** bent met [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) en [Flutter](https://flutter.dev/). Als je dat niet bent, sla dan over.
Of je kunt verder gaan maar op eigen risico
{{% /notice %}}

{{% notice note %}}
Het is mogelijk om RustDesk Android te bouwen op **Windows** en **MacOS** maar deze instructie is nog in actieve ontwikkeling
{{% /notice %}}

# Introductie

Hier leert u hoe u uw omgeving zodanig kunt voorbereiden dat u de toepassing met succes kunt bouwen en u zelf aan de code kunt werken via bijvoorbeeld Android Studio.

Deze handleiding is gebaseerd op het laatste werkende workflow bestand, om ervoor te zorgen dat alles gewoon werkt, als je problemen tegenkomt neem dan gerust contact met ons op via onze [Discord](https://discord.com/invite/nDceKgxnkV) of via een ander communicatiekanaal.

Het is mogelijk om de Android versie op Windows te bouwen, uit te voeren en te bewerken, maar dat vereist een gepatchte `flutter` map

Met "gepatcht" bedoel ik de map in staat zoals voor het draaien van `flutter build` op Linux machine.

# Veronderstellingen
- U gebruikt **Ubuntu 20.04** of later ( omdat deze handleiding gebaseerd is op deze versie )
- Je hebt een werkende internetverbinding
- Je hebt al de installatie van [**Flutter**](https://docs.flutter.dev/get-started/install/linux), [**vcpkg**]() en [**Rust**](https://www.rust-lang.org/tools/install)
- Je kloonde [RustDesk repository](https://github.com/rustdesk/rustdesk)
- e weet wat je doet

# Systeem
Dit deel van de handleiding is gebaseerd op een schone **Ubuntu 20.04** instantie met voorafgaande vereisten zoals **Flutter**, **Rust** en **vcpkg** reeds aanwezig en geconfigureerd.

Als u een van deze vereisten mist, moet u ze verkrijgen en configureren, en dan hier terugkeren.

# Instructie
Dit is een stap voor stap instructie.

## Genereer Bridge 🌉

Omdat dit project gebaseerd is op [Flutter Rust Bridge](https://cjycode.com/flutter_rust_bridge/index.html) moet je het eerst aanmaken, dat kan door de volgende commando's uit te voeren:

Wijzig uw huidige map in `rustdesk` map:

```
cd rustdesk
```

**Als je er geen had**, kloon dan [RustDesk repository](https://github.com/rustdesk/rustdesk), kun je dat voor elkaar krijgen door het draaien van:

```
git clone https://github.com/rustdesk/rustdesk
```

Dan kun je je map veranderen in `rustdesk`

```
cd rustdesk
```

Als u dit voor de eerste keer doet, moet u misschien ook een aantal vereisten installeren
```
sudo apt update -y
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang cmake libclang-dev ninja-build llvm-dev libclang-10-dev llvm-10-dev pkg-config
```
### Flutter Rust Bridge afhankelijkheden installeren
Bij deze stap installeert u extra afhankelijkheden die nodig zijn voor [Flutter Rust Bridge](https://cjycode.com/flutter_rust_bridge/index.html) ook download je flutter afhankelijkheden uit het `pubspec.yaml` bestand.

Dit kan enige tijd duren, afhankelijk van de snelheid van uw internetverbinding en de algemene prestaties van uw computer
```
cargo install flutter_rust_bridge_codegen
pushd flutter && flutter pub get && popd
```
### Bridge-bestanden Genereren
Om alles te laten werken moet je Flutter Rust Bridge genereren, om dit te doen voer je gewoon uit:

```
~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

Als alles gelukt is, zou u zoiets als dit in uw terminalvenster moeten zien:
```yaml
2023/02/27 20:44:39 [INFO] Success!
2023/02/27 20:44:39 [INFO] Now go and use it :)
```

## RustDesk bouwen voor Android 📱

### Installatie van afhankelijkheden

Bij deze stap heeft u misschien wat extra afhankelijkheden nodig, die kunt u installeren door dit uit te voeren:
```
sudo apt update -y
sudo apt-get -qq install -y  git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake libclang-dev ninja-build libappindicator3-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libvdpau-dev libva-dev libclang-dev llvm-dev libclang-10-dev llvm-10-dev pkg-config tree g++ libc6-dev gcc-multilib g++-multilib openjdk-11-jdk-headless
```
Je moet misschien ook ffigen activeren
```
dart pub global activate ffigen 5.0.1
```

### Extra afhankelijkheden downloaden
Voor deze tutorial hebben we enkele afhankelijkheden voorbereid, voel je vrij om ze te gebruiken. Het vereist dat `vcpkg` geinstalleerd is, in dit geval in `/opt`

```
pushd /opt
sudo wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
sudo tar xzf dep.tar.gz
popd
```

#### Waarschuwing
Het vereist dat de vcpkg map op `$HOME`, als het `Building rustdesk lib` deel van deze instructie fouten zal opleveren zoals:
```yaml
error: failed to run custom build command for `magnum-opus v0.4.0 (https://github.com/rustdesk/magnum-opus#79be072c)`

Caused by:
  process didn't exit successfully: `/home/user/rustdesk/target/release/build/magnum-opus-05dc0023b86da8fc/build-script-build` (exit status: 101)
  --- stdout
  cargo:info=arm64-android
  cargo:rustc-link-lib=static=opus
  cargo:rustc-link-search=/home/user/vcpkg/installed/arm64-android/lib
  cargo:include=/home/user/vcpkg/installed/arm64-android/include
  rerun-if-changed=/home/user/.cargo/git/checkouts/magnum-opus-4bb999f3bcbf6ab0/79be072/opus_ffi.h
  rerun-if-changed=/home/user/vcpkg/installed/arm64-android/include
```
Overweeg de installatie van `vcpkg` in je home map, en voer je het uit:
```
pushd $HOME
sudo wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
sudo tar xzf dep.tar.gz
popd
``` 

### Het uitschakelen van Flutter Rust Bridge build
Mogelijk moet u de build van Flutter Rust Bridge uitschakelen vanuit het bestand `build.rs`, u kunt dit doen door onderstaand uit te voeren:
```
sed -i "s/gen_flutter_rust_bridge();/\/\//g" build.rs
```

### Bouwen rustdesk lib
In deze stap bouwt u het bestand `librustdesk.so`

Voeg eerst triplet toe aan rust:
```
rustup target add aarch64-linux-android
```

Installeer daarna`cargo-ndk` het is nodig om `librustdesk.so` te genereren

```
cargo install cargo-ndk
```

Nu is het tijd om `ndk_arm64.sh` te draaien, dit script bevat code die Rust bouwt voor Flutter, het vereist `NDK` in versie `r22b`. 

Je kunt het downloaden [hier](https://dl.google.com/android/repository/android-ndk-r22b-linux-x86_64.zip), zul je het handmatig moeten installeren of volg [deze](https://developer.android.com/studio/projects/install-ndk) instructie. Dit bestand is vrij zwaar, dus dit proces kan even duren, het hangt vooral af van uw internetverbinding.

Vergeet niet de **ANDROID_NDK_HOME** variabele en kijk of deze geldig is

Voer dan gewoon uit:
```
./flutter/ndk_arm64.sh
```

### Aangemaakte bibliotheek verplaatsen naar jniLibs map
Als je `librustdesk.so` hebt aangemaakt, maak dan de juiste map aan:
```
mkdir -p ./flutter/android/app/src/main/jniLibs/arm64-v8a
```
En kopieer het gewoon daarheen
```
cp ./target/aarch64-linux-android/release/liblibrustdesk.so ./flutter/android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
```

### RustDesk Bouwen
Het is de laatste stap, nu ga je jouw versie van RustDesk apk bouwen.

Als je alles goed hebt gedaan kun je het gemakkelijk bouwen.

Eerst moet je het volgende downloaden `so.tar.gz`
```
pushd flutter
sudo wget -O so.tar.gz https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
```
Pak het dan uit
```
tar xzvf so.tar.gz
popd
```
We gebruiken tijdelijk debug sign config

```
sed -i "s/signingConfigs.release/signingConfigs.debug/g" ./flutter/android/app/build.gradle
```
Dan moet u het volgende `librustdesk.so` bestand in de juiste map plaatsen
```
mkdir -p ./flutter/android/app/src/main/jniLibs/arm64-v8a
cp ./target/aarch64-linux-android/release/liblibrustdesk.so ./flutter/android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
```
Nu gaan we eindelijk Flutter bouwen
```
pushd flutter
flutter build apk --release --target-platform android-arm64 --split-per-abi
```
{{% notice note %}}
Bij deze stap zie je misschien enkele fouten in terminal, dit is normaal zolang ze gaan over `incompatible version of Kotlin` of `Runtime JAR files in the classpath should have the same version`.

Als je resultaat is zoals `✓  Built build/app` negeer het dan, het betekent gewoon dat je je apk met succes hebt gebouwd.

{{% /notice %}}

### Optioneel
Als je wilt kun je de gebouwde app ergens anders heen verplaatsen, voel je vrij om het uit te voeren:
```
mv build/app/outputs/flutter-apk/app-arm64-v8a-release.apk ../rustdesk-release.apk
```