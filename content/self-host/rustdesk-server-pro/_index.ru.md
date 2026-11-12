---
title: RustDesk Server Pro
description: "Полное руководство по RustDesk Server Pro — платному решению для удалённого рабочего стола на собственном сервере. Корпоративная аутентификация (OIDC, LDAP, 2FA), веб-консоль, доступ к API и расширенные средства безопасности для профессионального развёртывания."
keywords: ["rustdesk server pro", "rustdesk pro server", "remote desktop server", "enterprise remote access", "rustdesk professional", "self-hosted rdp", "rustdesk enterprise", "remote desktop solution", "rustdesk licensing", "rustdesk web console"]
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro — коммерческий вариант собственного сервера для команд, которым помимо базовых возможностей RustDesk Server нужны централизованное администрирование, интеграция с системами учётных записей и расширенные средства управления.

## Коротко о RustDesk Server Pro

- Выбирайте Pro, если нужны централизованное администрирование, интеграция с системами учётных записей или управление политиками.
- Самое быстрое и простое развёртывание — через [Docker](/docs/ru/self-host/rustdesk-server-pro/installscript/docker/).
- Используйте [install.sh](/docs/ru/self-host/rustdesk-server-pro/installscript/script/), если нужна установка сценарием в Linux с `systemd`.
- [Установка в Windows](/docs/ru/self-host/rustdesk-server-pro/installscript/windows/) считается устаревшей.
- Сразу после запуска сервера настройте HTTPS, лицензию и клиенты.

{{% notice note %}}
Не уверены, подходит ли вам Pro? См. [RustDesk для предприятий](https://rustdesk.com/blog/rustdesk-for-enterprise) (статья на английском языке).
{{% /notice %}}

## Когда выбирать RustDesk Server Pro

Выбирайте RustDesk Server Pro, если возможностей RustDesk Server OSS недостаточно и вам нужны:

- Учётные записи
- [Веб-консоль](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/2fa/)
- [Адресная книга](/docs/ru/self-host/rustdesk-server-pro/address-book/)
- [Управление журналами](/docs/ru/self-host/rustdesk-server-pro/audit-logs/) (подключения, передача файлов, тревоги и т. д.)
- Управление устройствами
- [Синхронизация настроек безопасности](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/strategy/)
- [Контроль доступа](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/permissions/)
- [Несколько ретрансляторов](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/relay/) (автоматически выбирается ближайший)
- [Генератор собственного клиента](https://rustdesk.com/docs/ru/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Собственный веб-клиент

{{% notice note %}}
Если вы развернули сервер дома или в офисе и не можете подключиться к нему по публичному IP-адресу или домену, см. [эту статью](https://rustdesk.com/docs/ru/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Прежде чем продолжить, рекомендуем прочитать раздел [Как работает собственный сервер?](/docs/ru/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Требования к оборудованию

Самого простого VPS вполне достаточно. Серверная программа не требовательна к процессору и памяти. Наш публичный сервер ID на сервере Vultr с 2 CPU и 4 ГБ обслуживает более 1 миллиона устройств. Каждое соединение через ретранслятор в среднем потребляет 180 КБ/с. 1 ядра процессора и 1 ГБ оперативной памяти достаточно для 1000 одновременных соединений через ретранслятор. О расчёте ресурсов для крупных развёртываний см. [масштабирование до 50 000–200 000 устройств](https://rustdesk.com/blog/rustdesk-scale-50000-200000-devices) (на английском языке).

## Статьи
[Step-by-Step Guide: Self-Host RustDesk Server Pro on Cloud via Docker for Secure Remote Access](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/) (на английском языке)

## Видеоуроки

[Beginner's Guide: Self-Host RustDesk Server Pro for Novice Linux User](https://www.youtube.com/watch?v=MclmfYR3frk)

[Quick Guide: Self-Host RustDesk Server Pro for Adavanced Linux User](https://youtu.be/gMKFEziajmo)


## Лицензия

Лицензию можно приобрести на https://rustdesk.com/pricing.html, подробнее см. страницу [Лицензия](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/).

## Начало работы
### 1. Установка

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Подробнее см. [Docker](/docs/ru/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Необходимые порты

Нужно открыть порты `21114`-`21119` TCP и `21116` UDP; убедитесь, что они учтены в правилах брандмауэра и в пробросе портов Docker.

Подробнее об этих портах см. [здесь](/docs/ru/self-host/rustdesk-server-oss/install/#ports).

### 3. Установка лицензии

Откройте веб-консоль по адресу `http://<server ip>:21114` и [войдите](/docs/ru/self-host/rustdesk-server-pro/console/#log-in) с учётными данными по умолчанию `admin`/`test1234`. Установите лицензию по [этому руководству](/docs/ru/self-host/rustdesk-server-pro/license/#set-license).

### 4. Настройка HTTPS для веб-консоли

> Этот шаг можно пропустить, если во время пробного периода HTTPS не нужен, но не забудьте изменить адрес API в клиентах после настройки HTTPS

Вот простое руководство по [ручной настройке HTTPS](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Настройка клиентов на работу с собственным сервером

https://rustdesk.com/docs/ru/self-host/client-configuration/

### 6. Настройка WebSocket

Чтобы веб-клиент или [настольный и мобильный клиент](/docs/ru/self-host/client-configuration/advanced-settings/#allow-websocket) правильно работали через WebSocket, добавьте следующие настройки в конфигурацию обратного прокси.

https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## Обновление сервера

В этом [руководстве](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) описано, как обновить RustDesk Server Pro с более старой версии при разных способах установки.

## Перенос на новый сервер и резервное копирование / восстановление

Вот подробное [руководство](https://github.com/rustdesk/rustdesk-server-pro/discussions/184) (на английском языке).

## Перенос лицензии

Следуйте этому [руководству](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Расширение лицензии

Следуйте [этому руководству](/docs/ru/self-host/rustdesk-server-pro/license/#renewupgrade-license), чтобы в любой момент расширить лицензию на большее число пользователей и устройств.

## О безопасности

https://github.com/rustdesk/rustdesk/discussions/9835
