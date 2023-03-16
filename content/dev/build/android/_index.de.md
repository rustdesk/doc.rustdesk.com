---
title: Android
weight: 22
---

{{% notice note %}}
Diese Anleitung setzt voraus, dass Sie mit [Android NDK](https://developer.android.com/ndk/downloads), [Rust](https://rustup.rs/) und [Flutter](https://flutter.dev/) **vertraut** sind.
Wenn nicht, überspringen Sie bitte diese Seite oder lesen auf eigene Gefahr weiter.
{{% /notice %}}

{{% notice note %}}
Es ist möglich, RustDesk Android auf **Windows** und **macOS** zu bauen, aber diese Anleitung ist noch in der aktiven Entwicklung.
{{% /notice %}}

# Einführung

Hier erfahren Sie, wie Sie Ihre Umgebung so weit vorbereiten, dass Sie die App erfolgreich erstellen können und in der Lage sind, den Code z. B. mit Android Studio zu bearbeiten.

Diese Anleitung basiert auf der letzten funktionierenden Workflow-Datei, um sicherzustellen, dass alles funktioniert. Wenn Sie irgendwelche Probleme haben, kontaktieren Sie uns auf unserem [Discord](https://discord.com/invite/nDceKgxnkV) oder über einen anderen Kommunikationskanal.

Man kann die Android-Version unter Windows erstellen, ausführen und bearbeiten, benötigt aber ein Verzeichnis mit gepatchtem `Flutter`.

Mit "gepatcht" ist der Zustand des Verzeichnisses vor dem Ausführen von `flutter build` auf dem Linux-Rechner gemeint.

# Voraussetzungen
- Sie verwenden **Ubuntu 20.04** oder höher (diese Anleitung basiert auf dieser Version)
- Sie haben eine funktionierende Internetverbindung
- Sie haben bereits [**Flutter**](https://docs.flutter.dev/get-started/install/linux), [**vcpkg**](https://github.com/microsoft/vcpkg) und [**Rust**](https://www.rust-lang.org/tools/install) installiert
- Sie haben das [RustDesk-Repository](https://github.com/rustdesk/rustdesk) geklont
- Sie wissen, was Sie tun

# System
Dieser Teil der Anleitung basiert auf einer sauberen Instanz von **Ubuntu 20.04** mit bereits installierten und konfigurierten Komponenten wie **Flutter**, **Rust** und **vcpkg**.

Wenn Ihnen eine dieser Komponenten fehlt, beschaffen und konfigurieren Sie sie und kehren Sie dann hierher zurück.

# Anleitung
Dies ist eine Schritt-für-Schritt-Anleitung.

## Bridge generieren 🌉

Da dieses Projekt auf [flutter_rust_bridge](https://cjycode.com/flutter_rust_bridge/index.html) basiert, sollten Sie es zuerst generieren, was Sie mit den folgenden Befehlen erreichen können.

Wechseln Sie in das Verzeichnis `rustdesk`:

```
cd rustdesk
```

**Wenn Sie noch kein Repository haben**, klonen Sie das [RustDesk-Repository](https://github.com/rustdesk/rustdesk) mit dem folgenden Kommando:

```
git clone https://github.com/rustdesk/rustdesk
```

Dann können Sie in das Verzeichnis `rustdesk` wechseln:

```
cd rustdesk
```

Möglicherweise müssen Sie auch einige Komponenten installieren, wenn Sie dies zum ersten Mal tun:
```
sudo apt update -y
sudo apt install -y g++ gcc git curl wget nasm yasm libgtk-3-dev clang cmake libclang-dev ninja-build llvm-dev libclang-10-dev llvm-10-dev pkg-config
```
### Abhängigkeiten der Flutter-Rust-Bridge installieren
In diesem Schritt werden Sie zusätzliche Abhängigkeiten installieren, die von [flutter-rust-bridge](https://cjycode.com/flutter_rust_bridge/index.html) benötigt werden. Außerdem werden Sie die Flutter-Abhängigkeiten aus der Datei `pubspec.yaml` herunterladen.

Dies kann je nach Geschwindigkeit Ihrer Internetverbindung und der Gesamtleistung Ihres Desktops einige Zeit dauern:
```
cargo install flutter_rust_bridge_codegen
pushd flutter && flutter pub get && popd
```
### Bridge-Dateien generieren
Damit alles funktioniert, müssen Sie die Flutter-Rust-Bridge generieren und einfach ausführen:

```
~/.cargo/bin/flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart
```

Wenn alles geklappt hat, sollten Sie in Ihrem Terminal-Fenster etwas wie das hier sehen:
```yaml
2023/02/27 20:44:39 [INFO] Success!
2023/02/27 20:44:39 [INFO] Now go and use it :)
```

## RustDesk für Android erstellen 📱

### Abhängigkeiten installieren

In diesem Schritt benötigen Sie möglicherweise einige zusätzliche Abhängigkeiten, die Sie mit diesem Befehl installieren können:
```
sudo apt update -y
sudo apt-get -qq install -y  git curl wget nasm yasm libgtk-3-dev clang libxcb-randr0-dev libxdo-dev libxfixes-dev libxcb-shape0-dev libxcb-xfixes0-dev libasound2-dev libpulse-dev cmake libclang-dev ninja-build libappindicator3-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libvdpau-dev libva-dev libclang-dev llvm-dev libclang-10-dev llvm-10-dev pkg-config tree g++ libc6-dev gcc-multilib g++-multilib openjdk-11-jdk-headless
```
Möglicherweise müssen Sie auch `ffigen` aktivieren:
```
dart pub global activate ffigen 5.0.1
```

### Zusätzliche Abhängigkeiten herunterladen
Für diese Anleitung haben wir einige Abhängigkeiten für Sie vorbereitet, Sie können sie gerne verwenden. Es erfordert, dass `vcpkg` installiert ist, in diesem Fall unter `/opt`:

```
pushd /opt
sudo wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
sudo tar xzf dep.tar.gz
popd
```

#### Warnung
Das Verzeichnis `vcpkg` muss sich unter `$HOME` befinden, wenn der Teil `RustDesk-Bibliothek bauen` dieser Anleitung Fehler auslöst wie:
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
Erwägen Sie, `vcpkg` in Ihrem Homeverzeichnis zu installieren und dann auszuführen:
```
pushd $HOME
sudo wget https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/dep.tar.gz
sudo tar xzf dep.tar.gz
popd
``` 

### Bau der Flutter-Rust-Bridge deaktivieren
Möglicherweise müssen Sie den Bau der Flutter-Rust-Bridge in der Datei `build.rs` deaktivieren, indem Sie dies ausführen:
```
sed -i "s/gen_flutter_rust_bridge();/\/\//g" build.rs
```

### RustDesk-Bibliothek bauen
In diesem Schritt erstellen Sie die Datei `librustdesk.so`.

Zuerst fügen Sie `triplet` zu Rust hinzu:
```
rustup target add aarch64-linux-android
```

Dann installieren Sie `cargo-ndk`. Es wird benötigt, um die Datei `librustdesk.so` zu erzeugen:

```
cargo install cargo-ndk
```

Jetzt ist es an der Zeit, `ndk_arm64.sh` auszuführen. Dieses Skript enthält Code, der Rust für Flutter baut. Es benötigt `NDK` in der Version `r23c`.

Sie können es [hier](https://dl.google.com/android/repository/android-ndk-r23c-linux.zip) herunterladen und manuell installieren oder dieser [Anleitung](https://developer.android.com/studio/projects/install-ndk) folgen. Diese Datei ist recht umfangreich, sodass dieser Vorgang eine Weile dauern kann, was hauptsächlich von Ihrer Internetverbindung abhängt.

Denken Sie daran, die Variable **ANDROID_NDK_HOME** zu setzen und zu überprüfen, ob sie gültig ist.

Dann starten Sie einfach:
```
./flutter/ndk_arm64.sh
```

### Generierte Bibliothek in das Verzeichnis `jniLibs` verschieben
Wenn Sie `librustdesk.so` generiert haben, erstellen Sie das richtige Verzeichnis:
```
mkdir -p ./flutter/android/app/src/main/jniLibs/arm64-v8a
```
Und kopieren Sie diese einfach dorthin:
```
cp ./target/aarch64-linux-android/release/liblibrustdesk.so ./flutter/android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
```

### RustDesk erstellen
Im letzten Schritt werden Sie Ihre Version der RustDesk-App erstellen.

Wenn Sie alles richtig gemacht haben, werden Sie es mit Leichtigkeit bauen können.

Zuerst müssen Sie `so.tar.gz` herunterladen:
```
pushd flutter
sudo wget -O so.tar.gz https://github.com/rustdesk/doc.rustdesk.com/releases/download/console/so.tar.gz
```
Dann entpacken Sie es:
```
tar xzvf so.tar.gz
popd
```
Wir verwenden vorübergehend `debug sign config`:

```
sed -i "s/signingConfigs.release/signingConfigs.debug/g" ./flutter/android/app/build.gradle
```
Dann müssen Sie die Datei `librustdesk.so` in das richtige Verzeichnis kopieren:
```
mkdir -p ./flutter/android/app/src/main/jniLibs/arm64-v8a
cp ./target/aarch64-linux-android/release/librustdesk.so ./flutter/android/app/src/main/jniLibs/arm64-v8a/librustdesk.so
```
Jetzt bauen wir endlich Flutter:
```
pushd flutter
flutter build apk --release --target-platform android-arm64 --split-per-abi
```
{{% notice note %}}
Bei diesem Schritt könnten Sie einige Fehler wie `incompatible version of Kotlin` oder `Runtime JAR files in the classpath should have the same version` im Terminal sehen. Das ist normal.

Wenn das Ergebnis `✓  Built build/app` lautet, dann ignorieren Sie es. Es bedeutet nur, dass Sie Ihre App erfolgreich gebaut haben.

{{% /notice %}}

### Optional
Wenn Sie möchten, können Sie die erstellte App verschieben:
```
mv build/app/outputs/flutter-apk/app-arm64-v8a-release.apk ../rustdesk-release.apk
```
