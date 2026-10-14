---
publishDate: 2024-12-02T00:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: ar
translationKey: how-to-make-flutter-3-24-run-on-windows-7
title: 'كيف عدّلنا Flutter 3.24.5 ليعمل على Windows 7'
excerpt: 'كان Flutter 3.19 آخر إصدار يدعم Windows 7 و8. وهذه هي تعديلات المحرك وDart التي طبّقتها RustDesk على Flutter 3.24.5 في أواخر عام 2024.'
image: ~/assets/images/blog/flutter-win7.png
category: إصدار
slug: tashghil-flutter-3-24-ala-windows-7
tags: [تطوير]
---

يوثّق هذا المقال تعديلات المحرك التي طبّقتها RustDesk على **Flutter 3.24.5** في أواخر عام 2024. فقد أدّت ترقية [RustDesk](https://github.com/rustdesk/rustdesk) إلى Flutter 3.24.5 إلى توقفه عن العمل على Windows 7، لذا عدّلنا محرك Flutter وتراجعنا عن ثلاثة تغييرات في Dart.

## حل تشغيل Flutter 3.24.5 على Windows 7

أعلن فريقا Flutter وDart أن **Flutter 3.19 وDart 3.3** هما آخر إصدارين يدعمان Windows 7 و8. ولكي يعمل بناؤنا من Flutter 3.24.5 على Windows 7، تراجعنا عن تغييرات Dart الثلاثة أدناه. وكل تراجع يعيد أيضًا السلوك الأقدم، بما في ذلك قيده المعروف.

رابط ذو صلة: [الإعلان الرسمي](https://groups.google.com/g/flutter-announce/c/s0tM5gxAgs4/m/ryxV2vZYAQAJ?pli=1)

## 1. إصلاح مشكلة `Platform.localHostname` في البيئات الصينية

كان Dart يستخدم في الأصل واجهة `gethostname` البرمجية، ما تسبب في فشل `Platform.localHostname` في البيئات الصينية. ولحل هذه المشكلة انتقل Dart إلى واجهة `GetHostNameW`، المتاحة فقط في Windows 8 والإصدارات الأحدث. ولكي يعمل Flutter على Windows 7، علينا التراجع عن هذا التغيير. ولاحظ أن التراجع عنه سيؤثر في عمل `Platform.localHostname` في البيئات الصينية.

المشكلة ذات الصلة: [Platform.localHostname fails on Chinese Windows](https://github.com/dart-lang/sdk/issues/52701)

## 2. إزالة معالجة واجهة سجلات فك المكدس (unwinding records) في Windows 7

كان Dart قد أجرى سابقًا تعديلات توافق لتعويض غياب واجهة `RtlAddGrowableFunctionTable` في Windows 7، لكن هذا التعديل أُزيل الآن. وللحفاظ على التوافق مع Windows 7، علينا التراجع عن الإيداع (commit) الذي أزال هذه المعالجة.

الإيداع ذو الصلة: [Remove Windows7 handling of unwinding records API](https://github.com/dart-lang/sdk/commit/34213ba60578e46fc2455c5a56b09d9efabc532b)

## 3. إصلاح مشكلة عدم عمل الروابط الرمزية النسبية إلى المجلدات على Windows

كان Dart قد أصلح سابقًا مشكلة عدم عمل الروابط الرمزية النسبية إلى المجلدات على Windows، وعدّل لذلك الدالة `File::GetType`. واستخدم هذا التعديل واجهة `PathCchCombineEx`، المتاحة فقط في Windows 8 والإصدارات الأحدث. ولاستعادة دعم Windows 7، علينا التراجع عن هذا التعديل أيضًا.

الإيداع ذو الصلة: [Fix a bug where relative symlinks to directories did not work on Windows](https://github.com/dart-lang/sdk/commit/b4574904f9cd0d6f7147950c02ee2447569d0be9)

## الخلاصة

في بنائنا من Flutter 3.24.5، أعادت هذه التراجعات الثلاثة التوافق مع Windows 7. والثمن هو سلوك Dart الأقدم: إذ يعود `Platform.localHostname` إلى الفشل في البيئات باللغة الصينية، وتفقد الروابط الرمزية النسبية إلى المجلدات الإصلاح الأحدث. وقد انتهى الدعم الرسمي لـ Windows 7 مع Flutter 3.19 وDart 3.3، لذا إذا أعدت استخدام هذه التعديلات فاختبر المحرك المعدّل مع تطبيقك.

وللاطلاع على التنفيذ الكامل، راجع [نظام CI لدينا](https://github.com/rustdesk/engine/blob/main/.github/workflows/flutter-engine-windows-x64-release-build.yml).

و[هنا](https://github.com/rustdesk/rustdesk/blob/dea99ffb3ab34fee562090d214af419b557debdf/.github/workflows/flutter-build.yml#L109) تجد كيف نطبّق المحرك المعدّل على مشروعنا.
