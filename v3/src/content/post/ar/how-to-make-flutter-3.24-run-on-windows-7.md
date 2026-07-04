---
publishDate: 2024-12-02T00:00:00Z
lang: ar
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: كيف تشغّل Flutter 3.24 على Windows 7؟
excerpt: أوقف Flutter دعم Windows 7 / 8 منذ الإصدار 3.22، لذا نحتاج إلى تعديل Flutter Engine.
image: ~/assets/images/blog/flutter-win7.png
category: إصدار
slug: tashghil-flutter-3-24-ala-windows-7
tags: [تطوير]
---

أدخلنا مؤخرًا Flutter 3.24.5 إلى [RustDesk](https://github.com/rustdesk/rustdesk)، فتوقف عن العمل على Windows 7. لحل المشكلة عدّلنا Flutter Engine.

## حل تشغيل Flutter 3.24.5 على Windows 7

أعلنت Flutter وDart أن Dart 3.3 وFlutter 3.19 هما آخر إصدارين يدعمان Windows 7 و8. لاستخدام Flutter 3.24.5 يجب التراجع عن بعض تغييرات Dart.

الرابط: [الإعلان الرسمي](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. إصلاح `Platform.localHostname` في البيئات الصينية

استخدم Dart واجهة `gethostname` التي سببت فشل `Platform.localHostname` في البيئات الصينية، ثم انتقل إلى `GetHostNameW` المتاحة بدءًا من Windows 8. لدعم Windows 7 يجب التراجع عن هذا التغيير، مع تأثير جانبي على `Platform.localHostname` في تلك البيئات.

Issue: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. استعادة معالجة unwinding records في Windows 7

كان Dart يعالج غياب `RtlAddGrowableFunctionTable` في Windows 7، ثم أزيل هذا التوافق. يجب التراجع عن الالتزام الذي أزاله.

Commit: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. إصلاح الروابط الرمزية النسبية للمجلدات

عدّل إصلاح Dart الدالة `File::GetType` مستخدمًا `PathCchCombineEx` المتاحة بدءًا من Windows 8 فقط. يجب التراجع عن هذا التغيير أيضًا.

Commit: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## الخلاصة

يتطلب تشغيل Flutter 3.24.5 على Windows 7 التراجع عن تغييرات أساسية في Dart. يؤثر ذلك في `Platform.localHostname` بالبيئات الصينية والروابط الرمزية النسبية، لكنه ضروري لمستخدمي Windows 7.

راجع [نظام CI](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml) للتنفيذ الكامل، و[هذا الرابط](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) لمعرفة طريقة تطبيق المحرك المعدّل.
