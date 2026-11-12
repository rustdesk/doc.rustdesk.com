---
title: Azure
weight: 16
description: "Настройка Microsoft Entra ID (Azure) как поставщика OpenID Connect для RustDesk Server Pro. Регистрация приложения и настройка OIDC на портале Azure."
keywords: ["rustdesk azure oidc", "rustdesk entra id", "rustdesk azure sso", "rustdesk oidc azure", "rustdesk server pro azure"]
---

В этом руководстве описано, как подключить RustDesk Server Pro к Microsoft Entra ID через OpenID Connect.

## Что даёт настройка OIDC с Azure?

После этой настройки пользователи могут входить в RustDesk Server Pro с учётными записями Microsoft Entra ID через OpenID Connect. На практике вы регистрируете RustDesk как приложение в Azure, копируете учётные данные клиента в RustDesk Pro и указываете в RustDesk Pro URL издателя вашего клиента (tenant) Entra.

## Порядок настройки OIDC с Azure

- Откройте веб-консоль RustDesk Pro по тому адресу, который будет использоваться для обратного вызова (callback).
- Зарегистрируйте приложение в Microsoft Entra ID.
- Скопируйте `Client ID` из Azure в RustDesk Pro.
- Создайте секрет клиента и сразу сохраните его значение.
- Составьте URL издателя с вашим `Directory (tenant) ID`.

## Какие значения из Azure вводить в RustDesk Pro?

| Поле в RustDesk Pro | Откуда взять в Azure |
| --- | --- |
| Callback URL | Скопируйте со страницы настроек OIDC в RustDesk Pro |
| Client ID | `Application (client) ID` в обзоре приложения Azure |
| Client secret | `Value` секрета, созданного в разделе `Certificates & secrets` |
| Issuer | `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` |

## Видеоурок

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Настройка

1. Войдите на [портал Azure](https://portal.azure.com).
2. Найдите и выберите **Microsoft Entra ID**.
3. В меню слева выберите [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) (регистрация приложений) и нажмите **New registration** (новая регистрация).
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Откройте консоль RustDesk Pro, на странице **Settings** нажмите модуль **OIDC** и скопируйте **Callback URL**. **Примечание**: **Callback URL** нельзя изменить: часть `Path` всегда равна `api/oidc/callback`, а часть `Protocol://Host:Port` — это адрес текущей веб-страницы. Если вы открыли консоль по адресу `http://localhost:8000/<path>`, то **Callback URL** будет `http://localhost:8000/api/oidc/callback`. Если открыли по адресу `https://192.168.0.1:8000/<path>`, то **Callback URL** будет `https://192.168.0.1:8000/api/oidc/callback`. Azure требует `https://` или `http://localhost`, поэтому открывайте консоль RustDesk Pro по подходящему адресу.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Введите **Name** (имя), выберите **Supported account types** (поддерживаемые типы учётных записей) и вставьте **Redirect URI** из RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. В RustDesk Pro нажмите **New auth provider**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. В Azure выберите нужное приложение, нажмите **Overview** (обзор) и скопируйте **Application (client) ID**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. В RustDesk Pro вставьте его в поле **Client ID**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. В Azure в разделе **Certificates & secrets** создайте новый секрет клиента или выберите существующий (обычно создают новый).
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. В Azure скопируйте значение секрета клиента. **Примечание**: значение видно только сразу после создания. Когда вы уйдёте со страницы, увидеть его будет нельзя. Сохраните его в надёжном месте.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. В RustDesk Pro вставьте значение секрета клиента.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. В RustDesk Pro заполните поле **Issuer** значением `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`, заменив `Directory (tenant) ID` на ваш **Directory (tenant) ID**. **Directory (tenant) ID** находится на панели **Overview** приложения в Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)

## Справочные материалы

- [Set up an OpenID Connect provider with Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
