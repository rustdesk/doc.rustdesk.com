---
title: Windows
weight: 20
description: "Сборка RustDesk в Windows с помощью MSVC, Rust, vcpkg, Sciter и LLVM. В руководстве описана подготовка инструментов перед компиляцией настольного приложения из исходного кода."
keywords: ["build rustdesk windows", "rustdesk windows build", "rustdesk vcpkg windows", "rustdesk sciter dll", "rustdesk llvm libclang"]
---

В этом руководстве описано, как собрать RustDesk в Windows: сначала подготовить инструменты MSVC, Rust, `vcpkg`, Sciter и LLVM.

{{% notice note %}}
Приведённые здесь команды нужно выполнять в Git Bash, а не в командной строке Windows, иначе будут синтаксические ошибки.
{{% /notice %}}

## Что нужно для сборки в Windows?

Для сборки RustDesk в Windows нужны инструменты C++ из Visual Studio, Rust, `vcpkg`, `sciter.dll` и LLVM с настроенной переменной `LIBCLANG_PATH`. Выполняйте команды в Git Bash, чтобы примеры и синтаксис переменных окружения работали так, как написано.

## Порядок сборки в Windows

- Установите Visual Studio с рабочей нагрузкой для C++.
- Установите Rust с помощью `rustup-init.exe`.
- Склонируйте и инициализируйте `vcpkg`, затем задайте `VCPKG_ROOT`.
- Скачайте `sciter.dll` для интерфейса настольной версии.
- Установите LLVM и укажите в `LIBCLANG_PATH` его папку `bin`.
- Склонируйте RustDesk и выполните стандартные шаги сборки в Git Bash.

## Зависимости

### Окружение для сборки C++

Скачайте и установите [MSVC](https://visualstudio.microsoft.com/).
Выберите `Windows` как ОС компьютера разработчика и отметьте `C++`, затем скачайте и установите Visual Studio Community. Установка может занять некоторое время.

### Окружение для разработки на Rust

Скачайте [rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe) и запустите его от имени администратора, чтобы установить `rust`.

### vcpkg

Перейдите в папку, куда хотите склонировать vcpkg, и выполните в [Git Bash](https://git-scm.com/download/win) следующие команды: они скачают `vcpkg` и установят 64-битные версии `libvpx`, `libyuv` и `opus`.
Если `Git` у вас не установлен, скачайте его [здесь](https://git-scm.com/download/win).

```sh
git clone https://github.com/microsoft/vcpkg
vcpkg/bootstrap-vcpkg.bat
export VCPKG_ROOT=$PWD/vcpkg
vcpkg/vcpkg install libvpx:x64-windows-static libyuv:x64-windows-static opus:x64-windows-static aom:x64-windows-static
```

Добавьте системную переменную окружения `VCPKG_ROOT`=`<path>\vcpkg`, где `<path>` — папка, которую вы выбрали выше для клонирования `vcpkg`.

![](/docs/en/dev/build/windows/images/env.png)

### Sciter

Настольные версии используют [Sciter](https://sciter.com/) для графического интерфейса, скачайте [sciter.dll](https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll).

### LLVM

`rust-bindgen` зависит от `clang`: скачайте и установите [LLVM](https://github.com/llvm/llvm-project/releases), затем добавьте системную переменную окружения `LIBCLANG_PATH`=`<llvm_install_dir>/bin`.

Готовые сборки LLVM версии 15.0.2 можно скачать здесь: [64 бита](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win64.exe) / [32 бита](https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.2/LLVM-15.0.2-win32.exe).

## Сборка

### Стандартная сборка

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk
mkdir -p target/debug
wget https://raw.githubusercontent.com/c-smile/sciter-sdk/master/bin.win/x64/sciter.dll
mv sciter.dll target/debug
cargo run
```
