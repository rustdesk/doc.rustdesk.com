---
title: Synology DSM 7.2
weight: 20
description: "Установка RustDesk Server OSS на Synology DSM 7.2 с помощью Container Manager. Обновлённый порядок работы с Docker в Synology, поддерживаемые модели и шаги настройки контейнеров."
keywords: ["rustdesk synology dsm 7.2", "rustdesk container manager", "rustdesk synology nas", "rustdesk synology docker", "rustdesk self-host synology"]
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
В этом руководстве описано, как установить RustDesk Server OSS на Synology DSM 7.2 с помощью Container Manager.

После обновления DSM 7.2 Synology переименовала пакет «Docker» в «Container Manager». У него новый графический интерфейс со встроенным «docker-compose», что упрощает создание контейнеров Docker.

## Когда использовать руководство для DSM 7.2?

Используйте это руководство, если на вашем хранилище Synology установлена DSM 7.2 и вы хотите развернуть RustDesk Server с помощью Synology Container Manager. Это актуальный способ для Synology, и обслуживать его проще, чем старую схему с Docker в DSM 6.

## Порядок развёртывания на DSM 7.2

- Убедитесь, что ваша модель хранилища поддерживает Container Manager.
- Установите `Container Manager` из Центра пакетов (Package Center).
- Создайте постоянную общую папку для данных RustDesk.
- Разверните `hbbs` и `hbbr` в одном проекте compose.
- Получите `id_ed25519.pub` и настройте клиенты.
- Пробросьте нужные порты RustDesk на маршрутизаторе.

## Поддерживаемые модели и требования

Container Manager добавляет поддержку ARM64 для некоторых бюджетных моделей, например серии J. Полный список поддерживаемых моделей см. на [сайте Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
В большинстве случаев дополнительная оперативная память для установки Docker и RustDesk Server не нужна.

## 1. Установка Container Manager (Docker)

Откройте «Центр пакетов» (Package Center), найдите и установите «Container Manager».

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. Создание папки

После установки «Container Manager» появится общая папка `docker` — данные сервера будем хранить в ней.

Откройте File Station и создайте папку `rustdesk-server` (или с любым другим названием). Затем создайте в ней папку `data`, как на рисунке.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. Создание контейнера

Откройте Container Manager, перейдите в раздел «Проект» (Project) и нажмите «Создать» (Create).

Введите имя проекта `rustdesk-server`, смените источник (Source) с «Загрузить compose.yml» (Upload compose.yml) на «Создать compose.yml» (Create compose.yml) и скопируйте в поле следующее содержимое.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Please change this to rustdesk/rustdesk-server-pro:latest if you want to install Pro.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Please change this to rustdesk/rustdesk-server-pro:latest if you want to install Pro.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Because using docker host mode
# Just in case you forgot the ports:
# 21114 TCP for web console, only available in Pro version
# 21115 TCP for NAT type test
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/ID server
# 21117 TCP relay
```

Если вы устанавливаете Pro, замените в обеих строках `image` значение на `rustdesk/rustdesk-server-pro:latest`. Пропустите `Настройки веб-портала` (`Web portal settings`) и завершите создание.

## 4. Проверка работы

Откройте File Station: в папке `docker/rustdesk-server/data` должны появиться файлы `id_ed25519` и `id_ed25519.pub`. Файл можно скачать и открыть в любом текстовом редакторе или в [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). Это открытый ключ, который нужен клиенту RustDesk.

Открытый ключ выглядит примерно так:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

Как настроить клиент, см. [здесь](/docs/ru/client). Нужны только `Сервер ID` и `Ключ`. `Ретранслятор` указывать не нужно: он задан в `hbbs`, и `hbbs` сообщит его клиентам автоматически.

## 5. Проброс портов на маршрутизаторе

Откройте веб-интерфейс администрирования маршрутизатора и найдите пункт, связанный с `пробросом портов` (`Port forwarding`). Обычно он находится в настройках `WAN` или `Брандмауэр` (`Firewall`).

Если не можете найти эту настройку, поищите в интернете `{марка маршрутизатора} + проброс портов` или `{модель маршрутизатора} + проброс портов`. Если устройство вам выдал провайдер, спросите у него.

Откройте следующие порты:
  * `21114` TCP — веб-консоль, только в версии Pro
  * `21115` TCP — проверка типа NAT
  * `21116` TCP — пробивка NAT через TCP
  * `21116` UDP — служебные сигналы (heartbeat) / сервер ID
  * `21117` TCP — ретранслятор
