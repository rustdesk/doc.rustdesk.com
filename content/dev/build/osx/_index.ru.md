---
title: macOS
weight: 21
description: "Сборка RustDesk в macOS с помощью Homebrew, vcpkg, Rust и Sciter или Flutter. В руководстве описаны настройка инструментов, зависимости и подготовка пакета настольной версии."
keywords: ["build rustdesk macos", "rustdesk mac build", "rustdesk sciter mac", "rustdesk flutter macos build", "rustdesk vcpkg macos"]
---

В этом руководстве описано, как собрать RustDesk в macOS с помощью `Xcode`, `Homebrew`, `vcpkg`, Rust и интерфейса настольной версии на Sciter или Flutter.

Сделать это можно несколькими способами. Руководство предполагает, что `Xcode`, `Git` и `Homebrew` уже установлены.

## Какой способ сборки в macOS выбрать?

| Задача | Подходящий способ |
| --- | --- |
| Собрать классический интерфейс настольной версии | Sciter |
| Собрать новый интерфейс настольной версии | Flutter |
| Подготовить общие системные зависимости | Homebrew + `vcpkg` + Rust |

## Порядок сборки в macOS

- Убедитесь, что `Xcode`, `Git` и `Homebrew` уже установлены.
- Установите нужные пакеты из Homebrew.
- Склонируйте и инициализируйте `vcpkg`, затем задайте `VCPKG_ROOT` через `export`.
- Установите и настройте Rust с помощью `rustup`.
- Склонируйте репозиторий с исходным кодом RustDesk и его подмодули.
- Перед сборкой добавьте среду выполнения Sciter или инструменты Flutter.

Самое сложное — подобрать версии всех инструментов, которые работают вместе, особенно с учётом того, что версии части инструментов, например Xcode и LLVM, определяются вашей версией macOS. Версии в этом руководстве, скорее всего, не те, что подойдут вам. Чтобы понять, какие версии нужны, для начала загляните в [сценарий сборки на GitHub](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) для той версии RustDesk, которую хотите собрать. Нужный тег выбирается в левом верхнем углу страницы с файлом. Но и это может не сработать: инструменты macOS на сборочном сервере GitHub могут отличаться по версиям от тех, что установлены у вас.

### Export
Команда `export` задаёт переменные окружения. Переменная, заданная через `export`, действует только в текущем сеансе терминала, поэтому такие команды нужно повторять в каждом новом окне терминала, в котором вы собираете RustDesk — сейчас или в будущем. Обычно удобнее добавить все команды `export` в сценарий, который автоматически выполняется при открытии каждого терминала, например в `~/.bash_profile`. Приведённые здесь команды `export` можно просто дописать в конец этого файла, но их также нужно выполнить в текущем терминале, потому что файл читается только при открытии *нового* терминала.

## Установка нужных инструментов из Homebrew

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

Часть установок может завершиться ошибкой, потому что некоторых целевых папок нет в системе. В этом случае создайте папку, назначьте владельца и права и снова выполните команду `brew`. Пример, если нет папки `/usr/local/include`:
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## Установка vcpkg
Vcpkg управляет зависимостями C/C++, которые использует RustDesk. Решите, куда его установить, и выполните следующие команды в папке, где должна находиться папка `vcpkg`. В этом примере используется расположение `/Users/<username>/repos/` и версия с тегом `2023.04.15`.

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Установка и настройка Rust
Для управления Rust используется `rustup`, который мы уже установили через Homebrew выше. Но его ещё нужно настроить. Следуйте инструкциям и убедитесь, что `rustup` и `rustc` доступны через `PATH`. В этом примере используется Rust версии `1.75.0`, но вам может понадобиться другая версия. С помощью `rustup` можно устанавливать несколько версий Rust и управлять ими.

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
Чтобы посмотреть установленные наборы инструментов Rust и набор по умолчанию, выполните `rustup show`.

## Загрузка исходного кода RustDesk

Решите, где будет храниться исходный код RustDesk, и выполните следующие команды в папке, где должна находиться папка `rustdesk`. В этом примере используется расположение `/Users/<username>/repos/`.

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

Если команды `python3` или `pip` не находятся, добавьте их в `PATH` примерно так (подставьте свои названия папок):
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
После этого снова выполните команды, которые завершились ошибкой. Не забудьте также дописать это в `~/.bash_profile`.

## Установка компонентов интерфейса
RustDesk можно собрать как с [Sciter](https://sciter.com/), так и с [Flutter](https://flutter.dev/). Обоим нужны дополнительные компоненты, поэтому выполните шаги для нужного варианта или для обоих.

### Sciter

В папке `rustdesk` выполните:
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) позволяет выбирать используемую версию Flutter и, вероятно, проще всего даёт возможность пробовать разные версии Flutter.

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
Установите и включите нужную версию, например Flutter `3.16.9`:

```sh
fvm global 3.16.9
```
FVM рассчитан на более сложную схему, в которой разные проекты используют разные версии Flutter, но это выходит за рамки руководства. Вместо этого просто вручную добавьте в `PATH` расположение Flutter по умолчанию из FVM. Тогда переключать версию Flutter нужно будет командой `fvm global`:

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

После этого отключите телеметрию и проверьте, всё ли в порядке:

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
Не страшно, если часть проверок не пройдёт — обычно так и бывает. Важно, чтобы прошла проверка для окружения, которое вы собираетесь использовать, то есть `Xcode`. Если найдены проблемы, устраните их, прежде чем продолжать.

Когда Flutter заработает, пора установить «мост», который связывает Rust и Flutter. Это ещё один компонент, версия которого должна сочетаться со всем остальным. В этом примере используется `1.80.1`:

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## Сборка

Собирайте из папки `rustdesk`. Версия на Sciter собирается командой:

```sh
python3 ./build.py
```

Версия на Flutter собирается так:
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
Если всё прошло успешно, в папке `rustdesk` появится готовый к установке файл `dmg`.
