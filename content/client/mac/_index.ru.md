---
title: Mac
description: "Установка RustDesk в macOS и настройка разрешений, необходимых для удалённого управления. Узнайте, как разрешить запуск приложения, включить универсальный доступ и выдать доступ к записи экрана."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
weight: 3
---

В этом руководстве описано, как установить RustDesk в macOS, разрешить запуск приложения и выдать разрешения, нужные для захвата экрана и управления вводом.

## Что нужно RustDesk в macOS?

В macOS одной установки приложения недостаточно. Чтобы управление другим Mac работало правильно, обычно нужно переместить приложение в `Программы` (`Applications`), разрешить его запуск, а затем выдать разрешения `Универсальный доступ` (`Accessibility`), `Запись экрана` (`Screen Recording`) и в некоторых случаях `Мониторинг ввода` (`Input Monitoring`).

## Коротко о macOS

- Установите RustDesk из файла `.dmg` в `Программы`.
- Если Gatekeeper блокирует приложение, разрешите его запуск в настройках безопасности macOS.
- Для удалённого управления выдайте разрешения `Универсальный доступ` и `Запись экрана`.
- Если ввод с клавиатуры или мыши всё равно не работает, выдайте разрешение `Мониторинг ввода`.
- Если сброс разрешений не срабатывает сразу, перезагрузите компьютер.

## Установка

Откройте файл .dmg и перетащите `RustDesk` в `Программы`, как показано ниже.

![](/docs/en/client/mac/images/dmg.png)

Убедитесь, что вы закрыли все запущенные копии RustDesk, в том числе службу RustDesk в строке меню.

![](/docs/en/client/mac/images/tray.png)

## Разрешите запуск RustDesk

| Снимите блокировку, чтобы вносить изменения | Выберите `App Store и от установленных разработчиков` (`App Store and identified developers`) |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Какие разрешения macOS важны?

| Разрешение | Зачем оно нужно |
| --- | --- |
| Универсальный доступ (Accessibility) | Позволяет RustDesk управлять вводом с клавиатуры и мыши |
| Запись экрана (Screen Recording) | Позволяет RustDesk захватывать изображение локального экрана |
| Мониторинг ввода (Input Monitoring) | Нужно в новых версиях macOS, если захват локального ввода всё ещё не работает |

## Включите разрешения

{{% notice note %}}
Из-за изменения политики безопасности macOS наш API, который захватывает ввод на локальной стороне, больше не работает.
Нужно включить разрешение «Мониторинг ввода» на локальном Mac.
Следуйте этой инструкции:
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

В версии 1.2.4 можно попробовать `Источник ввода 2`: он появляется при нажатии на значок клавиатуры на панели инструментов.
{{% /notice %}}

Для захвата экрана RustDesk нужны разрешения **Универсальный доступ** и **Запись экрана**. RustDesk сам откроет нужное окно настроек.

| Окно RustDesk | Окно настроек |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Если вы включили разрешение в окне настроек, но RustDesk всё равно показывает предупреждение, удалите `RustDesk` из списка кнопкой `-`, затем нажмите `+` и выберите `RustDesk` в папке `Программы`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Другие попытки, которые не помогают: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Перезагрузка всё равно нужна.
{{% /notice %}}

| Кнопки `-` и `+` | Выберите `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Повторите эти же шаги для разрешения **Запись экрана**.

![](/docs/en/client/mac/images/screen.png?v2)
