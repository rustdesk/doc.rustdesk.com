---
title: Клиент RustDesk
description: "Установка и настройка клиента RustDesk в Windows, macOS, Linux, Android, iOS и в браузере. Узнайте, как подключаться к устройствам, использовать публичные или собственные серверы и управлять настройками клиента."
keywords: ["rustdesk client", "rustdesk download", "rustdesk installation", "rustdesk windows", "rustdesk mac", "rustdesk linux", "rustdesk android", "rustdesk ios", "rustdesk web client", "rustdesk client configuration"]
weight: 2
pre: "<b>1. </b>"
---

## Что такое клиент RustDesk?
Клиент RustDesk — это приложение, которое устанавливается на устройства, чтобы начинать или принимать сеансы удалённого рабочего стола через публичные серверы RustDesk или через ваш собственный RustDesk Server. В этом руководстве описано, как скачать нужную сборку, установить её на каждую платформу, подключиться к другому устройству и указать клиенту сервер RustDesk Server OSS или RustDesk Server Pro.

{{% notice note %}}
Руководства по платформам: [RustDesk для Linux](https://rustdesk.com/blog/rustdesk-for-linux) и [удалённое управление с Android и iOS](https://rustdesk.com/blog/rustdesk-remote-control-android-ios). См. также [лучшие бесплатные программы для удалённого рабочего стола](https://rustdesk.com/blog/best-free-remote-desktop-software). Статьи на английском языке.
{{% /notice %}}

## Поддерживаемые платформы
- Microsoft Windows
- macOS
- Производные Debian (Ubuntu ≥ 16, Linux Mint и др.)
- Производные Red Hat (CentOS, Fedora ≥ 18, Rocky Linux и др.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (удалённо управлять им нельзя)
- Веб

## Установка

### Windows

Скачайте exe-файл с GitHub и установите его.

Для тихой установки запустите установщик с параметром `--silent-install`.

### macOS

Скачайте dmg-файл с GitHub, подробности — на [странице macOS](https://rustdesk.com/docs/ru/client/mac/).

Откройте dmg-файл и перетащите `RustDesk` в `Программы` (`Applications`).

Разрешите запуск RustDesk.

Включите запрошенные разрешения и следуйте подсказкам в левой части окна RustDesk, чтобы завершить настройку.

### Linux

Ниже приведены инструкции по установке для разных дистрибутивов Linux (установщики есть на GitHub или в репозиториях дистрибутивов).

#### Производные Debian

```sh
# please ignore the wrong disk usage report
sudo apt install -fy ./rustdesk-<version>.deb
```

#### Производные Red Hat

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

Временно открыть оболочку, в которой `rustdesk` готов к запуску:

```sh
nix shell nixpkgs#rustdesk
```

Установить в профиль текущего пользователя:

```sh
nix profile install nixpkgs#rustdesk
```

Чтобы установить для всей системы в NixOS, отредактируйте `configuration.nix` и выполните `nixos-rebuild switch --flake /etc/nixos`:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

### Android
Установите apk с нашего GitHub, подробности — на [странице Android](https://rustdesk.com/docs/ru/client/android/).

### iOS (iPhone, iPad)
Скачайте приложение из [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

## Использование
После установки (или запуска без установки) RustDesk подключится к публичным серверам. Внизу появится сообщение (1) «Готов. Для более быстрого подключения настройте собственный сервер.». В левом верхнем углу отображаются ваш (2) ID и (3) одноразовый пароль, а справа — (4) поле для подключения к другому компьютеру, если вы знаете его ID.

![](/docs/en/client/images/client.png)

Чтобы открыть настройки, нажмите кнопку (5) меню [ &#8942; ] справа от ID.

В настройках есть разделы:
- Общие — управление службой, тема, аппаратный кодек, звук, запись и язык
- Безопасность — разрешения для того, кто берёт управление, параметры пароля, смена ID и расширенные настройки безопасности
- Сеть — здесь указываются собственный сервер и прокси
- Отображение — параметры отображения для удалённых сеансов и другие настройки по умолчанию, синхронизация буфера обмена и т. д.
- Аккаунт — используется вместе с Pro-сервером для входа через API
- О приложении — сведения о программе.

## Настройка RustDesk
Настроить RustDesk можно несколькими способами.

Проще всего с RustDesk Server Pro: в нём можно получить зашифрованную строку конфигурации и импортировать настройки с помощью параметра `--config`. Для этого:
1. Откройте командную строку вашей ОС в папке, где установлен RustDesk, например `C:\Program Files\RustDesk` в Windows или `/usr/bin` в Linux.
2. Выполните команду `rustdesk.exe --config ваша-зашифрованная-строка`, например `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Клиент можно настроить и вручную. Для этого:
1. Нажмите «Настройки».
2. Нажмите «Сеть».
3. Нажмите «Разблокировать сетевые настройки».
4. Введите адреса сервера ID, ретранслятора, сервера API (если используете Pro-сервер) и ваш ключ.

![](/docs/en/client/images/network-settings.png)

Если вы настроили клиент вручную, можно взять файл `RustDesk2.toml` (в папке пользователя) и импортировать его с помощью `--import-config` так же, как в примере выше.

## Параметры командной строки
- `--password` задаёт постоянный пароль.
- `--get-id` выводит ID.
- `--set-id` задаёт ID; обратите внимание, что ID должен начинаться с буквы.
- `--silent-install` выполняет тихую установку RustDesk в Windows.

Дополнительные параметры можно найти [здесь](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}
