---
title: Установка в Windows (устарело)
weight: 5
description: "Устаревшее руководство по установке RustDesk Server Pro в Windows: требования, установка лицензии и загрузка. Вместо этого рекомендуется Linux или Docker."
keywords: ["rustdesk server pro windows", "rustdesk pro windows install", "rustdesk self-host pro windows", "rustdesk windows install deprecated", "rustdesk pro license windows"]
---

Это устаревший способ установки RustDesk Server Pro в Windows. По возможности используйте Linux или Docker.

{{% notice note %}}
Политики безопасности Windows бывают непредсказуемы. Если это руководство вам не помогло или соединение нестабильно, перенесите сервер на Linux.
{{% /notice %}}

{{% notice note %}}
Версия с графическим интерфейсом, `RustDeskServer.setup.exe`, больше не поддерживается и не рекомендуется.
{{% /notice %}}

## Стоит ли устанавливать сервер в Windows?

Используйте это руководство, только если сервер RustDesk Server Pro обязательно должен работать в Windows. Для новых собственных серверов лучше выбрать Linux или Docker: их проще автоматизировать, обновлять и надёжно обслуживать.

## Коротко об установке в Windows

- Это устаревший способ, а не рекомендуемый.
- Перед началом установите распространяемый пакет Microsoft Visual C++.
- Старый установщик с графическим интерфейсом больше не поддерживается.
- Если нужно долговременное стабильное развёртывание, перейдите на Linux или Docker.
- Если остаётесь на Windows, продумайте, как будут запускаться службы и как веб-консоль будет работать через прокси.

## Установка

Для работы rustdesk в Windows нужен распространяемый пакет Microsoft Visual C++. Скачать его можно [здесь](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

1. Приобретите лицензию на [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), подробнее см. страницу [Лицензия](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/).
2. Скачайте установщик для Windows с [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Распакуйте установщик для Windows.
4. Запустите установщик и следуйте инструкциям на экране. Или установите вручную с помощью [PM2 или NSSM](https://rustdesk.com/docs/ru/self-host/rustdesk-server-oss/windows/).
5. После завершения откройте RustDesk Server.
6. Следуйте подсказкам мастера установки.
7. Нажмите `Services`, затем `Start`.
8. Когда установка завершится, откройте `http://youripaddress:21114`.
9. Войдите с именем пользователя `admin` и паролем `test1234`.
10. Введите код лицензии, купленной на шаге 1.

## Использование IIS в качестве прокси

Убедитесь, что установлен компонент `Dynamic Content Compression` (сжатие динамического содержимого; это компонент IIS, который устанавливается через роли сервера).
1. Откройте IIS (или установите его).
2. Создайте для RustDesk новый веб-сайт с привязками (лучше всего к порту 443) и соответствующим сертификатом. В основных настройках укажите пустую папку. (Если используете сайт по умолчанию, убедитесь, что в его папке нет других файлов.)
3. Установите в IIS [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) и [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

## Application Request Routing

1. На узле сервера IIS откройте Application Request Routing.
2. Перейдите в Server Proxy Settings.
3. Включите прокси — появятся все настройки, их можно оставить по умолчанию.
4. Сохраните настройки и переходите к следующему шагу: URL Rewrite.

## URL Rewrite

1. Откройте сайт в IIS на левой панели и дважды щёлкните URL Rewrite.
2. Нажмите `Add rules`.
3. Создайте новое правило обратного прокси.
4. Укажите локальный адрес (адрес с портом 21114) \
Входящее правило (Inbound Rule) — внутренний адрес RustDesk с портом 21114 \
Исходящие правила (Outbound Rules) — в `From` внутренний адрес RustDesk с портом 21114, в `To` внешний адрес. \
Примечание: не указывайте http / https перед адресами — они обрабатываются автоматически. Также убедитесь, что все адреса доступны и изнутри, и снаружи сети.

## Сжатие

1. Отключите `Dynamic Content Compression`.

## Устранение неполадок

Если появляется ошибка 500.52, добавьте указанные переменные: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259) (на английском языке).

Возможно, понадобится изменить настройки SSL на «Require SSL → Ignore».
