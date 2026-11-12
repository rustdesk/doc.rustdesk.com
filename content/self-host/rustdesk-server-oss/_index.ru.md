---
title: RustDesk Server OSS
description: "Разверните собственный RustDesk Server OSS — бесплатный серверный компонент с открытым исходным кодом. Узнайте, что в него входит, когда выбирать OSS и как установить службы сервера ID и ретранслятора RustDesk."
keywords: ["rustdesk server oss", "rustdesk open source server", "self-hosted rustdesk server", "rustdesk hbbs", "rustdesk hbbr", "rustdesk docker", "rustdesk server install", "rustdesk relay server", "rustdesk id server", "rustdesk community self-hosting"]
weight: 100
pre: "<b>2.1. </b>"
---

RustDesk Server OSS — бесплатный серверный компонент RustDesk с открытым исходным кодом для развёртывания на собственном оборудовании. С ним вы запускаете свои службы сервера ID и ретранслятора, держите трафик удалённого доступа в подконтрольной вам инфраструктуре и разворачиваете RustDesk в своём облаке или локально.

Выбирайте RustDesk Server OSS, если вам нужны основные возможности собственного сервера и вы готовы сами заниматься развёртыванием, настройкой сети и обновлениями. Если нужны веб-консоль, доступ к API, OIDC, LDAP, 2FA, управление устройствами или другие функции централизованного администрирования, сравните его с [RustDesk Server Pro](/docs/ru/self-host/rustdesk-server-pro/).

{{% notice note %}}
По теме: [зачем разворачивать собственный сервер для удалённого рабочего стола](https://rustdesk.com/blog/why-self-host-remote-desktop-software) (статья на английском языке).
{{% /notice %}}

## Что входит в RustDesk Server OSS?

- `hbbs` — сервер ID, рандеву и сигнализации RustDesk.
- `hbbr` — ретрансляция трафика, когда прямое P2P-соединение невозможно.
- Поддержка сообщества и инструкции по развёртыванию в документации и в [Discord](https://discord.com/invite/nDceKgxnkV).

## Начало работы с RustDesk Server OSS

- Начните с руководства по [установке](/docs/ru/self-host/rustdesk-server-oss/install/) — это стандартный способ развёртывания.
- Если нужна установка в контейнерах, используйте руководство по [Docker](/docs/ru/self-host/rustdesk-server-oss/docker/).
- Для серверов на Windows используйте [Windows и PM2 или NSSM](/docs/ru/self-host/rustdesk-server-oss/windows/).
- Для сетевых хранилищ используйте руководство по [Synology](/docs/ru/self-host/rustdesk-server-oss/synology/).

{{% notice note %}}
Если вы развернули сервер дома или в офисе и не можете подключиться к нему по публичному IP-адресу или домену, см. [эту статью](https://rustdesk.com/docs/ru/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% children depth="3" showhidden="true" %}}
