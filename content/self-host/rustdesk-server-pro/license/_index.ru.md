---
title: Лицензия
weight: 15
description: "Покупка, ввод и управление лицензией RustDesk Server Pro в веб-консоли. Где получить лицензию и как активировать или сменить её после покупки."
keywords: ["rustdesk pro license", "rustdesk server pro activate", "rustdesk pricing license", "rustdesk change license", "rustdesk web console license"]
---

На этой странице описано, как купить, активировать и обновить лицензию RustDesk Server Pro.

## Как устроено лицензирование RustDesk Server Pro?

Лицензия RustDesk Server Pro привязывается к серверу `hbbs`, а не к каждому ретранслятору. Вы покупаете лицензию на странице с ценами, вводите её в веб-консоли, а продлением, расширением, счетами и переносом управляете на портале самообслуживания.

## Коротко о лицензии

- Одна лицензия одновременно назначается одному компьютеру с `hbbs`
- Ретрансляторам `hbbr` отдельная лицензия не нужна
- Продление и расширение оформляются на портале самообслуживания, а затем активируются обновлением лицензии в веб-консоли
- Для переноса нужно отвязать старый компьютер и установить лицензию на новом сервере
- Если у сервера нет прямого доступа в интернет, для проверки лицензии можно настроить прокси

{{% notice note %}}
По теме: [что считается управляемым устройством](https://rustdesk.com/blog/what-counts-as-a-managed-device) и [расширение лицензии в середине подписки](https://rustdesk.com/blog/upgrade-rustdesk-license-mid-subscription) (статьи на английском языке).
{{% /notice %}}

## Покупка лицензии

Купите лицензию на [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), указав действующий адрес электронной почты на странице оплаты Stripe. После успешной оплаты лицензия (и отдельным письмом счёт) придёт на вашу почту.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Установка лицензии {#set-license}

Лицензию нужно будет ввести в веб-консоли (`http://<rustdesk-server-pro-ip>:21114`); позже её можно сменить.

| Установка лицензии | Смена лицензии |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## Продление и расширение лицензии {#renewupgrade-license}

Продлить или расширить лицензию можно на [портале самообслуживания](https://rustdesk.com/self-host/account/), как описано ниже. Войдите с адресом электронной почты, на который покупали лицензию, как показано на рисунке выше.

| Страница лицензии с действиями продления и расширения | Окно расширения |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

После оплаты обновите лицензию, [как описано ниже](/docs/ru/self-host/rustdesk-server-pro/license/#refresh-license), чтобы активировать её.

### Обновление лицензии {#refresh-license}
После оплаты лицензию нужно активировать вручную в веб-консоли, как показано ниже. Просто нажмите `Edit`, затем `OK` — ничего менять не нужно, ключ лицензии остаётся прежним.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Счета, получение и перенос лицензии {#invoices-license-retrieval-and-migration}

Лицензию можно использовать только на одном компьютере (только для hbbs; hbbr лицензия не нужна). Чтобы перенести её на другой компьютер, получить лицензию повторно или скачать счета, откройте [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Войдите с адресом электронной почты, который указывали при оплате в Stripe, и отвяжите старый компьютер, с которого переносите лицензию, как показано ниже. Когда вы установите лицензию в веб-консоли нового сервера, она будет назначена ему и зарегистрирована в консоли автоматически.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Прокси
Если у сервера нет прямого доступа в интернет для проверки лицензии, можно указать прокси, например `proxy=http://username:password@example.com:8080 ./hbbs`.

Можно также добавить `proxy=http://username:password@example.com:8080` в файл `.env` в рабочей папке (там, где находятся файлы `id_ed25519` / `db.sqlite3`).

`http` можно заменить на `https` или `socks5`. Если нет `username` / `password` / `port`, можно указать просто `proxy=http://example.com`.
