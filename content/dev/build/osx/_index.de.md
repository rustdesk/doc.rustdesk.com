---
title: macOS
weight: 21
---

Es gibt mehrere Möglichkeiten, dies zu tun. Diese Anleitung geht davon aus, dass `Xcode`, `Git` und `Homebrew` bereits installiert sind.

Die größte Herausforderung besteht wahrscheinlich darin, Versionen aller Tools zu finden, die zusammen funktionieren, zumal Teile der Toolchain wie Xcode und LLVM von Ihrer macOS-Version abhängig sind. Die in diesem Leitfaden verwendeten Versionen sind wahrscheinlich nicht die, die Sie verwenden sollten. Um herauszufinden, welche Versionen Sie verwenden sollten, können Sie im [GitHub-Build-Workflow] (https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) nach der RustDesk-Version suchen, die Sie bauen möchten. Wählen Sie den Tag aus, für den Sie die Datei oben links auf der Seite sehen möchten. Das wird aber nicht unbedingt funktionieren, weil die macOS-Tools, die mit dem GitHub-Runner geliefert werden, möglicherweise nicht die gleichen Versionen sind wie die auf Ihrem lokalen System.

#### Export
`export` wird verwendet, um verschiedene Umgebungsvariablen zu setzen. Wenn Sie `export` ausführen, wird diese Variable nur für die aktuelle Terminalsitzung gesetzt und muss daher für jedes neue Terminalfenster, das Sie jetzt oder in Zukunft zum Erstellen von RustDesk verwenden wollen, wiederholt werden. Im Allgemeinen ist es besser, alle `export` in ein Skript einzufügen, das automatisch für jedes geöffnete Terminal ausgeführt wird, zum Beispiel `~/.bash_profile`. Die hier aufgelisteten vollständigen `export`-Befehle können einfach an die Datei angehängt werden, müssen aber auch im aktuellen Terminal ausgeführt werden, da die Datei erst gelesen wird, wenn ein *neues* Terminal geöffnet wird.

### Tools installieren, die wir in Homebrew verwenden werden

```sh
brew install python3 create-dmg nasm cmake ggc wget ninja pkg-config wget rustup
```

Einige der Installationen können fehlschlagen, weil einige der Zielordner auf unserem System nicht vorhanden sind. In diesem Fall erstellen Sie den Ordner, setzen Sie den Besitzer und die Rechte und führen Sie den Befehl `brew` erneut aus. Beispiel, wenn `/usr/local/include` nicht existiert:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

### vcpkg installieren
Vcpkg wird verwendet, um die C/C++-Abhängigkeiten zu verwalten, die von RustDesk verwendet werden. Entscheiden Sie, wo Sie die Installation durchführen möchten, und führen Sie den folgenden Befehl in dem Ordner aus, in dem sich der Ordner `vcpkg` befinden soll. In diesem Beispiel wird `/Users/<Benutzername>/repos/` als Speicherort und das Tag `2023.04.15` als Version verwendet.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

### Rust installieren und konfigurieren
Wir verwenden `rustup`, um Rust zu verwalten, das bereits oben mit Homebrew installiert wurde. Es muss aber noch konfiguriert werden. Folgen Sie den Anweisungen und stellen Sie sicher, dass sich sowohl `rustup` als auch `rustc` im `PATH` befinden. In diesem Beispiel verwenden wir die Rust-Version `1.75.0`, aber möglicherweise müssen Sie eine andere Version verwenden. Sie können mehrere Versionen von Rust mit `rustup` installieren und verwalten.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Für einen Überblick über die installierten und standardmäßigen Rust-Toolchains führen Sie `rustup show` aus.

### RustDesk-Quelldateien herunterladen

Entscheiden Sie, wo Sie die RustDesk-Quelldateien haben möchten, und führen Sie den folgenden Befehl in dem Ordner aus, in dem sich der Ordner `rustdesk` befinden soll. In diesem Beispiel wird `/Users/<Benutzername>/repos/` als Speicherort verwendet.

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Wenn `python3` oder `pip` nicht bekannt sind, fügen Sie sie Ihren tatsächlichen Ordnernamen dem `PATH` hinzu:
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Sobald das erledigt ist, führen Sie die fehlgeschlagenen Befehle erneut aus. Denken Sie daran, auch `~/.bash_profile` zu editieren.

### Komponenten der Benutzeroberfläche installieren
RustDesk kann sowohl mit [Sciter](https://sciter.com/) als auch mit [Flutter](https://flutter.dev/) erstellt werden. Beide benötigen zusätzliche Komponenten. Folgen Sie daher den Schritten für die jeweilige Version oder für beide.

#### Sciter

Führen Sie im Ordner `rustdesk` aus:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

#### Flutter

[FVM](https://fvm.app/) lässt Sie verwalten, welche Version von Flutter verwendet wird. Es ist wahrscheinlich der einfachste Weg, verschiedene Flutter-Versionen zu testen.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Installieren und verwenden Sie z. B. Flutter `3.16.9` mit:

```sh
fvm global 3.16.9
```
FVM ist für ein komplexeres Setup gedacht, bei dem es verschiedene Flutter-Versionen für verschiedene Projekte bereitstellen kann, aber das würde den Rahmen dieser Anleitung sprengen. Fügen Sie stattdessen einfach den Ort des von FVM bereitgestellten Standard-Flutters manuell zu Ihrem `PATH` hinzu. Das bedeutet, dass Sie `fvm global` verwenden müssen, um die Flutter-Version zu wechseln:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Sobald dies geschehen ist, sollten Sie die Telemetrie deaktivieren und prüfen, ob alles in Ordnung ist:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Es spielt keine Rolle, ob einige der Prüfungen fehlschlagen, das tun sie in der Regel. Wichtig ist nur, dass die Prüfung für die Umgebung, die Sie verwenden möchten, in Ordnung ist, nämlich `Xcode`. Wenn Probleme gemeldet werden, beheben Sie diese, bevor Sie fortfahren.

Sobald Flutter läuft, ist es an der Zeit, die "Brücke" zu installieren, die Rust und Flutter verbindet. Hier ist eine andere Version, die mit allen anderen zusammenarbeitet. In diesem Beispiel verwenden wir `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

### Erstellen

Erstellen Sie im Ordner `rustdesk` die Sciter-Version mit:

```sh
python3 ./build.py
```

Erstellen Sie die Flutter-Version mit:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Wenn alles gut geht, sollten Sie jetzt eine Datei `dmg` haben, die Sie in Ihrem Ordner `rustdesk` installieren können.
