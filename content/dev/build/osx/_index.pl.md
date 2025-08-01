---
title: macOS
weight: 21
---

Jest wiele sposobów żeby to zrobić, ten przewodnik zakłada, że `Xcode`, `Git` i `Homebrew` są już zainstalowane.

Prawdopodobnie największym wyzwaniem jest znalezenie wersji wszystkich narzędzi, które działają ze sobą, zwłaszcza części toolchainu takie jak Xcode i LLVM ze względu na to, że są dyktowane przez wersję twojego macOSa. Wersje w tym przewodniku pewnie nie są tymi, których powinieneś używać. Za początek w szukaniu jakich wersji należy użyć można uznać [Workflow budowania na GitHubie](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) dla danej wersji RustDeska jaką chcesz zbudować. Wybierz tag, dla którego chcesz wyświetlić plik, w lewym górnym rogu strony. Ale to niekoniecznie zadziała, ponieważ narzędzia macOS dostarczane wraz z programem GitHub Runner mogą nie być w tej samej wersji, co narzędzia zainstalowane w twoim systemie lokalnym.

### Eksport
`export` służy do ustawiania różnych zmiennych środowiskowych. Po uruchomieniu `export` zmienna ta jest ustawiana tylko dla bieżącej sesji terminala, dlatego należy ją powtarzać dla każdego nowego okna terminala, którego chcesz używać do kompilacji RustDesk, teraz lub w przyszłości. Zasadniczo zaleca się dodanie wszystkich poleceń `export` do skryptu, który jest uruchamiany automatycznie dla każdego otwartego terminala, na przykład `~/.bash_profile`. Pełne polecenia `export` wymienione tutaj można po prostu dołączyć do pliku, ale należy je również uruchomić w bieżącym terminalu, ponieważ plik nie jest odczytywany, dopóki nie zostanie otwarty *nowy* terminal.

## Zainstaluj narzędzia, których będziemy używać z Homebrewa.

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Niektóre instalacje mogą się nie udać, bo niektóre foldery docelowe nie istnieją w naszym systemie. W takim przypadku stwórz folder, ustaw właściciela i uprawnienia, a potem wykonaj znowu polecenie `brew`. Przykład jeśli`/usr/local/include` nie istnieje:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## Zainstaluj vcpkg
Vcpkg służy do zarządzania zależnościami C/C++ używanymi przez RustDesk. Zdecyduj, gdzie chcesz zainstalować program, i uruchom poniższe polecenie z folderu, w którym ma znajdować się folder `vcpkg`. W tym przykładzie jako lokalizację użyto `/Users/<nazwa użytkownika>/repos/`, a jako wersję użyto tagu `2023.04.15`.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Zainstaluj i skonfiguruj Rusta
Używamy `rustup` do zarządzania Rustem, który został już zainstalowany powyżej za pomocą Homebrew. Jednak nadal wymaga on konfiguracji. Postępuj zgodnie z instrukcjami i upewnij się, że zarówno `rustup`, jak i `rustc` znajdują się w `PATH`. W tym przykładzie używamy wersji Rust `1.75.0`, ale może być konieczne użycie innej wersji. Za pomocą `rustup` można zainstalować i zarządzać wieloma wersjami Rust.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Aby uzyskać przegląd zainstalowanych i domyślnych zestawów narzędzi Rust, uruchom polecenie `rustup show`.

## Pobierz pliki źródłowe RustDeska

Zdecyduj, gdzie chcesz umieścić pliki źródłowe RustDesk, a następnie uruchom poniższe polecenie z folderu, w którym chcesz umieścić folder `rustdesk`. W tym przykładzie jako lokalizacja została użyta ścieżka `/Users/<nazwa użytkownika>/repos/`.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Jeśli `python3` lub `pip` są nieznane, dodaj je do `PATH` za pomocą następującego polecenia (użyj rzeczywistych nazw folderów):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
Po wykonaniu tej czynności uruchom ponownie nieudane polecenie (polecenia). Pamiętaj, aby edytować również plik `~/.bash_profile`.

## Zainstaluj komponenty interfejsu użytkownika
RustDesk można skompilować zarówno przy użyciu [Scitera](https://sciter.com/), jak i [Fluttera](https://flutter.dev/). Oba wymagają dodatkowych komponentów, więc postępuj zgodnie z instrukcjami dla odpowiedniej wersji lub dla obu.

### Sciter

Z folderu `rustdesk` uruchom:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) pozwala zarządzać wersjami Fluttera i jest prawdopodobnie najłatwiejszym sposobem na wypróbowanie różnych wersji Fluttera.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Zainstaluj i używaj na przykład Flutter `3.16.9`, korzystając z:

```sh
fvm global 3.16.9
```
FVM ma na celu wykorzystanie bardziej złożonej konfiguracji, w której może zapewnić różne wersje Fluttera dla różnych projektów, ale wykracza to poza zakres niniejszego przewodnika. Zamiast tego wystarczy ręcznie dodać lokalizację domyślnego Fluttera dostarczonego przez FVM do `PATH`, co oznacza, że do zmiany wersji Fluttera należy użyć `fvm global`:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

Po wykonaniu tej czynności należy wyłączyć telemetrię i sprawdzić, czy wszystko działa poprawnie:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Nie ma znaczenia, jeśli niektóre testy zakończą się niepowodzeniem, co zazwyczaj ma miejsce. Ważne jest, aby test środowiska, z którego zamierzasz korzystać, zakończył się powodzeniem, a mianowicie `Xcode`. Jeśli pojawią się zgłoszone problemy, rozwiąż je przed kontynuowaniem.

Po uruchomieniu Fluttera należy zainstalować "most", który łączy Rusta i Fluttera. Oto kolejna wersja, która dobrze współpracuje z pozostałymi elementami. W tym przykładzie używamy wersji `1.80.1`:
należy
```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Budowanie

Zbuduj z folderu `rustdesk`. Skompiluj wersję Scitera za pomocą:

```sh
python3 ./build.py
```

Zbuduj wersję Fluttera za pomocą:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Jeśli wszystko przebiegnie pomyślnie, w folderze `rustdesk` powinien znajdować się plik `dmg` gotowy do instalacji.
