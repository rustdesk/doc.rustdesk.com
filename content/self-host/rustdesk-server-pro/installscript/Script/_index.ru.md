---
title: install.sh
weight: 4
description: "Установка RustDesk Server Pro в Linux сценарием install.sh после получения лицензии. Простой способ установить серверные компоненты Pro сценарием."
keywords: ["rustdesk server pro install.sh", "rustdesk pro linux install", "rustdesk pro script install", "rustdesk self-host pro linux", "rustdesk server pro setup"]
---

Способ с `install.sh` подходит, если нужна простая установка RustDesk Server Pro в Linux без самостоятельной настройки служб с нуля.

{{% notice note %}}
Не забудьте приобрести лицензию на [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/), подробнее см. страницу [Лицензия](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/).

Перед этой простой установкой прочитайте [установку OSS](https://rustdesk.com/docs/ru/self-host/rustdesk-server-oss/install/): там описаны подробности того, как всё устроено.
{{% /notice %}}

## Когда использовать install.sh?

Используйте `install.sh`, если нужно как можно быстрее развернуть RustDesk Server Pro на компьютере с Linux и `systemd`. Лучше всего он подходит для простой установки на один сервер, когда сценарий сам устанавливает зависимости, раскладывает исполняемые файлы, создаёт службы и при желании готовит HTTPS для веб-консоли.

## Коротко об install.sh

- Используйте этот способ для простого развёртывания в Linux с `systemd`.
- Если нужны более простые обновления, откат и работа с контейнерами, используйте вместо него [Docker](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/installscript/docker/#docker-compose).
- Подготовьте лицензию Pro до начала установки.
- Если вы используете домен, сценарий может также настроить `nginx` и `certbot` для HTTPS.
- После первой установки обновляйте сервер с помощью `update.sh`.

## Установка

Скопируйте и вставьте следующую команду в терминал Linux, чтобы установить RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Рекомендую использовать [образ Docker](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/installscript/docker/#docker-compose): он сильно упрощает и развёртывание, и обновление. Потребление ресурсов очень низкое.

И запускайте команду выше в своей домашней папке, а не в папке, на запись в которую у вас нет прав.
{{% /notice %}}

Что делает сценарий:

- Устанавливает необходимые зависимости
- Настраивает брандмауэр UFW, если он есть
- Создаёт рабочую папку `/var/lib/rustdesk-server` и папку журналов `/var/log/rustdesk-server`
- Устанавливает исполняемые файлы в `/usr/bin`
- Скачивает и распаковывает службы RustDesk Pro в указанную папку
- Создаёт службы systemd для hbbs и hbbr (имена служб — `rustdesk-hbbs.service` и `rustdesk-hbbr.service`)
- Если вы выберете вариант с доменом, устанавливает Nginx и Certbot: API становится доступен на порту `443` (HTTPS), а SSL-сертификат получается через порт `80` и продлевается автоматически. Когда HTTPS заработает, открывайте `https://yourdomain.com`, а не `https://yourdomain.com:21114`.

{{% notice note %}}
Как [настроить HTTPS для веб-консоли вручную](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Если служба systemd не запускается, скорее всего, дело в SELinux, см. [здесь](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Если клиент не может подключиться к серверу или вы не можете открыть веб-консоль, см. [здесь](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

## Обновление {#upgrade}

Скопируйте и вставьте следующую команду в терминал Linux, чтобы обновить установленный RustDesk Server Pro. Команду также можно сохранить локально и запускать по расписанию через cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Если со сценарием возникли проблемы, советую просмотреть его и выполнить шаги вручную, по одному.

И запускайте команду выше в своей домашней папке, а не в папке, на запись в которую у вас нет прав.
{{% /notice %}}

Что делает сценарий:

- Проверяет, есть ли новая версия RustDesk Server Pro
- Если она есть, удаляет файлы API и скачивает новые исполняемые файлы и файлы API

## Перевод с версии с открытым исходным кодом {#convert-from-open-source}

Скопируйте и вставьте следующую команду в терминал Linux, чтобы перевести RustDesk Server на RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Добавьте в брандмауэр порт TCP `21114` — это дополнительный порт для веб-консоли и входа пользователей в клиенте RustDesk.
{{% /notice %}}

{{% notice note %}}
Если со сценарием возникли проблемы, советую перейти на установку через Docker. Можно также просмотреть сценарий и выполнить шаги вручную, по одному.
{{% /notice %}}

Что делает сценарий:

- Отключает и удаляет старые службы
- Устанавливает необходимые зависимости
- Настраивает брандмауэр UFW, если он есть
- Создаёт папку `/var/lib/rustdesk-server` и копирует в неё сертификаты
- Удаляет `/var/log/rustdesk` и создаёт `/var/log/rustdesk-server`
- Скачивает и распаковывает службы RustDesk Pro в указанную папку
- Создаёт службы systemd для hbbs и hbbr (имена служб — rustdesk-hbbs.service и rustdesk-hbbr.service)
- Если вы выберете вариант с доменом, устанавливает Nginx и Certbot: API становится доступен на порту 443 (HTTPS), а SSL-сертификат получается через порт 80 и продлевается автоматически
