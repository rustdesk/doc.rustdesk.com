---
title: macOS
weight: 21
---

Există mai multe moduri de a proceda; acest ghid pornește de la premisa că `Xcode`, `Git` și `Homebrew` sunt deja instalate.

Cea mai mare provocare este, probabil, să găsiți versiuni ale tuturor uneltelor care funcționează împreună, în special deoarece părți din toolchain, precum Xcode și LLVM, sunt dictate de versiunea macOS. Versiunile folosite în acest ghid s-ar putea să nu fie exact cele de care aveți nevoie. Un loc bun de început pentru a vedea ce versiuni s-au folosit este să verificați [workflow-ul de build de pe GitHub](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) pentru versiunea RustDesk pe care doriți să o compilați. Alegeți tag-ul dorit din colțul stânga-sus al paginii. Totuși, asta nu garantează succesul, deoarece tool-urile de pe runner-ul GitHub pot avea versiuni diferite față de cele de pe sistemul dvs. local.

### Export
Folosiți `export` pentru a seta diverse variabile de mediu. Când rulați `export`, variabila este setată doar pentru sesiunea terminalului curent, deci va trebui repetată pentru fiecare fereastră de terminal nouă în care doriți să compilați RustDesk. De regulă este preferabil să adăugați toate `export`-urile într-un script care se execută automat la deschiderea fiecărui terminal, de exemplu `~/.bash_profile`. Comenzile `export` listate aici pot fi adăugate pur și simplu la acel fișier, dar trebuie rulate și în terminalul curent deoarece fișierul nu va fi citit decât la deschiderea unui *nou* terminal.

## Instalați uneltele prin Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Unele instalări pot eșua deoarece anumite directoare țintă nu există pe sistem. În acest caz, creați folderul, setați proprietarul și permisiunile și rulați din nou comanda `brew`. Exemplu dacă `/usr/local/include` nu există:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## Instalați vcpkg
Vcpkg este folosit pentru a gestiona dependențele C/C++ folosite de RustDesk. Alegeți unde doriți instalarea și rulați următoarele din folderul în care doriți să rezide `vcpkg`. În exemplul de mai jos se folosește `/Users/<username>/repos/` ca locație și tag-ul `2023.04.15` ca versiune.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Instalați și configurați Rust
Folosim `rustup` pentru a gestiona Rust, care ar fi fost instalat mai sus prin Homebrew. Totuși, acesta mai trebuie configurat. Urmați instrucțiunile și asigurați-vă că atât `rustup`, cât și `rustc` sunt în `PATH`. În exemplu se folosește versiunea Rust `1.75.0`, dar este posibil să aveți nevoie de o versiune diferită. Puteți instala și administra mai multe versiuni de Rust cu `rustup`.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Pentru o privire de ansamblu asupra toolchain-urilor instalate și a celei implicite, rulați `rustup show`.

## Descărcați sursele RustDesk

Alegeți unde doriți sursele RustDesk și rulați următoarele din folderul în care vreți să apară directorul `rustdesk`. În exemplu se folosește `/Users/<username>/repos/`.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Dacă `python3` sau `pip` nu sunt recunoscute, adăugați-le în `PATH` cu ceva de genul (folosiți căile reale de pe sistemul dvs.):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
După aceea rulați din nou comenzile care au eșuat. Nu uitați să editați și `~/.bash_profile` pentru persistență.

## Instalați componentele interfeței
RustDesk poate fi compilat cu [Sciter](https://sciter.com/) sau cu [Flutter](https://flutter.dev/). Ambele necesită componente adiționale, așa că urmați pașii pentru versiunea relevantă (sau pentru ambele).

### Sciter

Din folderul `rustdesk`, rulați:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) vă permite să gestionați ce versiune de Flutter se folosește și este, probabil, cea mai simplă metodă pentru a testa versiuni diferite de Flutter.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Instalați și folosiți, de exemplu, Flutter `3.16.9` cu:

```sh
fvm global 3.16.9
```
FVM oferă un setup mai complex care poate furniza versiuni diferite de Flutter pentru proiecte diferite, dar asta depășește scopul ghidului. Ca soluție simplă, adăugați manual locația Flutter implicit furnizată de FVM în `PATH`, ceea ce înseamnă că trebuie să folosiți `fvm global` pentru a comuta versiunea de Flutter:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

După aceea, dezactivați telemetria și verificați configurarea:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Nu este grav dacă unele verificări eșuează — important este ca mediul pe care intenționați să-l folosiți să fie corect, în special `Xcode`. Dacă apar probleme, rezolvați-le înainte de a continua.

După ce Flutter este funcțional, instalați „bridge”-ul care leagă Rust de Flutter. Acesta este încă un element cu versiuni care trebuie să se potrivească; în exemplu folosim `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Build

Compilați din folderul `rustdesk`. Pentru versiunea Sciter rulați:

```sh
python3 ./build.py
```

Pentru versiunea Flutter rulați:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Dacă totul merge bine, ar trebui să aveți un fișier `dmg` pregătit pentru instalare în folderul `rustdesk`.