---
title: Synology
weight: 22
description: "Развёртывание RustDesk Server OSS на сетевом хранилище Synology. Выберите руководство для DSM 6 или DSM 7.2 с Container Manager и разверните сервер в Docker на поддерживаемых моделях Synology."
keywords: ["rustdesk synology", "rustdesk nas", "rustdesk synology docker", "rustdesk dsm 7.2", "rustdesk synology container manager"]
---

Эти руководства помогут развернуть RustDesk Server OSS на сетевом хранилище с DSM 6 или DSM 7.2 с Container Manager.

У Synology есть два варианта Docker: «Docker» и «Container Manager». Если у вас DSM 7.2 или новее, следуйте руководству для DSM 7.2, а для более старых систем — руководству для DSM 6.

## Какое руководство по Synology выбрать?

| Версия платформы | Подходящее руководство |
| --- | --- |
| DSM 7.2 и новее | [Synology DSM 7.2](/docs/ru/self-host/rustdesk-server-oss/synology/dsm-7/) |
| Старые системы Synology со старым пакетом Docker | [Synology DSM 6](/docs/ru/self-host/rustdesk-server-oss/synology/dsm-6/) |

## Порядок развёртывания на Synology

1. Узнайте, какая версия DSM на вашем хранилище: DSM 6 или DSM 7.2+.
2. Установите подходящий для этой версии DSM пакет: Docker или Container Manager.
3. Следуйте руководству по развёртыванию RustDesk для этого пакета.
4. Откройте нужные порты RustDesk и убедитесь, что данные контейнеров хранятся постоянно.

Если вы используете Synology с Portainer, см. [это руководство](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/) (на английском языке).

{{% children depth="3" showhidden="true" %}}
