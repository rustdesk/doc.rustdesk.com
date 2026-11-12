---
title: Сборка
weight: 1
description: "Сборка RustDesk из исходного кода и подготовка пакетов. Начните отсюда, чтобы собрать проект на поддерживаемых настольных платформах."
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

Эти руководства пригодятся, если вы хотите скомпилировать RustDesk из исходного кода или подготовить пакет для настольных платформ. Для сборки пакета настольной версии см. [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py).

## Что описано в разделе о сборке?

В этом разделе описана подготовка окружения для сборки настольной версии в Linux, Windows и macOS. В руководстве для каждой платформы описаны установка зависимостей, настройка `vcpkg`, подготовка инструментов Rust и команды для итоговой сборки или создания пакета.

## Какое руководство по сборке выбрать?

| Платформа | Руководство |
| --- | --- |
| Linux | [Linux](/docs/ru/dev/build/linux/) |
| Windows | [Windows](/docs/ru/dev/build/windows/) |
| macOS | [macOS](/docs/ru/dev/build/osx/) |
| Решение проблем в Windows | [Частые вопросы по Windows](/docs/ru/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
