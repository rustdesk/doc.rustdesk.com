---
title: Synology DSM 6
weight: 22
description: "Установка RustDesk Server OSS на Synology DSM 6 с помощью Docker. Порядок настройки контейнеров, портов и постоянного хранения данных на старых системах Synology."
keywords: ["rustdesk synology dsm 6", "rustdesk synology docker", "rustdesk nas dsm 6", "rustdesk self-host synology"]
---

В этом руководстве описано, как установить RustDesk Server OSS на Synology DSM 6 с помощью Docker на старых сетевых хранилищах.

> Альтернативное актуальное руководство от стороннего автора (на английском языке) — [здесь](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Это руководство основано на последних версиях DSM 6 и 7.

{{% notice note %}}
После обновления DSM 7.2 пакет Docker был заменён новым «Container Manager», поэтому смотрите вместо этого [эту статью](/docs/ru/self-host/rustdesk-server-oss/synology/dsm-7).
{{% /notice %}}

## Когда использовать руководство для DSM 6?

Используйте это руководство, только если на вашем хранилище Synology всё ещё DSM 6 и вы разворачиваете RustDesk Server OSS через старый пакет Docker. Если на хранилище уже DSM 7.2, используйте руководство по Container Manager.

## Порядок развёртывания на DSM 6

- Убедитесь, что на хранилище всё ещё DSM 6.
- Установите пакет Synology `Docker` из Центра пакетов (Package Center).
- Создайте на хосте постоянную папку для данных и ключей RustDesk.
- Запустите `hbbs` и `hbbr` с сетью хоста и включённым автоматическим перезапуском.
- После запуска контейнеров получите файл `id_ed25519.pub`.

## Установка Docker

| Откройте Центр пакетов (Package Center) | Установите Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Установка RustDesk Server

| Найдите rustdesk-server в реестре Docker и установите его двойным щелчком | Образ rustdesk-server установлен: дважды щёлкните по нему, чтобы создать контейнер rustdesk-server |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Создание контейнера hbbs

Как описано выше, дважды щёлкните по образу rustdesk-server, чтобы создать новый контейнер, и назовите его `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Нажмите `Дополнительные настройки` (`Advanced Settings`), как показано выше.

- Включите `Включить автоматический перезапуск` (`Enable auto-restart`).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Включите `Использовать ту же сеть, что и Docker Host` (`Use the same network as Docker Host`). Подробнее о сети хоста — [здесь](https://rustdesk.com/docs/ru/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Подключите папку хоста (например, `/home/rustdesk/`) к `/root`: hbbs создаст в ней файлы (базу данных и файлы `key`), которые должны сохраняться после перезагрузки.

| Подключение папки | Файлы, созданные в папке хоста |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Задайте команду
{{% notice note %}}
ОС Synology основана на Debian, поэтому сеть хоста (--net=host) работает нормально, и пробрасывать порты параметром `-p` не нужно.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Готово

## Создание контейнера hbbr

Повторите шаги для `hbbs`, но назовите контейнер `hbbr`, а в качестве команды (на шаге «Задайте команду») укажите `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## Контейнеры hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Дважды щёлкните по контейнеру и проверьте журнал | Ещё раз убедитесь, что hbbs/hbbr используют сеть хоста |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Получение ключа

С помощью File Station откройте папку, которую вы настроили ранее, скачайте `id_ed25519.pub` и откройте его в текстовом редакторе, чтобы посмотреть ключ.
