---
title: OIDC
weight: 16
description: "Настройка OpenID Connect в RustDesk Server Pro, чтобы пользователи входили через Google, Okta, Azure, GitHub, GitLab и другие поставщики удостоверений."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

OpenID Connect в RustDesk Server Pro позволяет пользователям входить через уже используемого поставщика удостоверений, а не с отдельными локальными учётными данными.

- Используйте свои учётные записи `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab` и т. д., чтобы легко создать учётную запись `RustDesk Pro` и входить в неё.
- Спецификацию см. в [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html).

## Что такое OIDC в RustDesk Server Pro?

OIDC позволяет RustDesk Server Pro передать вход внешнему поставщику удостоверений. Вместо отдельных паролей RustDesk пользователи проходят аутентификацию у поставщика, через которого вы уже управляете учётными записями, доступом и их жизненным циклом.

## Когда использовать OIDC вместо локальных учётных записей?

- Вы уже используете Azure, Okta, GitHub, GitLab, Google или другого поставщика с поддержкой OIDC
- Вам нужны централизованные политики паролей и единый вход (SSO)
- Вы хотите отключать или отзывать доступ пользователей в одной системе учётных записей
- Вы хотите, чтобы создание учётных записей и вход в RustDesk были привязаны к существующим учётным записям вашей организации

## Порядок настройки OIDC

1. Создайте приложение у поставщика удостоверений.
2. Подготовьте идентификатор клиента (client ID), секрет клиента (client secret), URL издателя (issuer) и, при необходимости, адреса, специфичные для поставщика.
3. Добавьте настройки поставщика в RustDesk Server Pro.
4. Проверьте вход с учётной записью без прав администратора, прежде чем включать OIDC для всех.

## Примеры для поставщиков
{{% children depth="4" showhidden="true" %}}
