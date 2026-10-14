---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ar'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'معاينة RustDesk على Wayland: الوصول غير المراقب والوصول إلى شاشة تسجيل الدخول'
excerpt: 'معاينة من RustDesk لأنظمة x86_64 المبنية على Debian/Ubuntu تضيف الوصول غير المراقب على Wayland، مع الشاشات المتعددة وشاشة تسجيل الدخول بعد إعادة التشغيل.'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'إصدار'
tags: ['RustDesk', 'Wayland', 'Linux', 'الوصول غير المراقب']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-ar'

metadata:
  description: 'جرّب معاينة RustDesk على Wayland لأنظمة x86_64 المبنية على Debian/Ubuntu: وصول غير مراقب عبر شاشات متعددة وعند شاشة تسجيل الدخول بعد إعادة التشغيل.'
  keywords: 'RustDesk Wayland, الوصول غير المراقب على Wayland, سطح المكتب البعيد على Wayland, سطح المكتب البعيد على Linux مع Wayland, RustDesk لنظام Linux, الوصول غير المراقب عن بُعد'
---

لطالما كان دعم Wayland من أصعب جوانب سطح المكتب البعيد على Linux.

تلتقط إصدارات RustDesk القياسية أسطح مكتب Wayland أصلًا، بما في ذلك الشاشات المتعددة منذ الإصدار 1.4.3، عبر PipeWire و`xdg-desktop-portal` في جلسة مسجَّل الدخول إليها. أما **معاينة RustDesk الجديدة على Wayland لأنظمة x86_64 المبنية على Debian/Ubuntu** فتضيف **وصولًا غير مراقب حقيقيًا على Wayland**: فبعد الإعداد الأولي، لا يحتاج أحد عند الجهاز البعيد إلى الموافقة على كل جلسة. **وتعمل الشاشات المتعددة في الجلسات غير المراقبة أيضًا.**

ويمكنك الاتصال حتى عندما لا يكون أي مستخدم قد سجّل دخوله، بما في ذلك عند **شاشة تسجيل الدخول** بعد إعادة التشغيل.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">شاهد الفيديو التوضيحي على X</a></blockquote>
</div>
<script data-astro-rerun>
(function () {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  } else if (!document.getElementById('twitter-wjs')) {
    var s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(s);
  }
})();
</script>

ونصدر هذه الميزة حاليًا في صورة إصدار معاينة منفصل لـ **أنظمة x86_64 المبنية على Debian/Ubuntu**:

**[تنزيل إصدار Wayland للوصول غير المراقب](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

وللمقارنة، [توثّق AnyDesk أن Xorg مطلوب للاتصالات الواردة على Linux](https://support.anydesk.com/anydesk-for-linux-raspberry-pi)، بينما [تصف TeamViewer دعمها لـ Wayland بأنه تجريبي](https://community.teamviewer.com/English/discussion/122410).

ونودّ الحصول على مزيد من الاختبارات في بيئات حقيقية قبل جعل هذا السلوك افتراضيًا.

وبمجرد استقرار التنفيذ، نخطط لتوفير الوصول غير المراقب على Wayland في مزيد من توزيعات Linux، بما فيها **Fedora وArch Linux**، ثم إدراجه في نهاية المطاف ضمن إصدارات RustDesk القياسية.

إذا كنت تستخدم Wayland، وخاصة مع عدة شاشات، فجرّب إصدار المعاينة وأخبرنا بما يعمل وما لا يعمل. ومن الاختبارات المفيدة: الاتصال بعد إعادة التشغيل قبل أن يسجّل أي شخص دخوله، وإعادة الاتصال بعد تسجيل الخروج، واختيار كل شاشة على حدة. واذكر في ملاحظاتك التوزيعة وبيئة سطح المكتب ومدير العرض وإصدار البناء، وأبقِ وسيلة الوصول الحالية لديك إلى أن تنجح هذه الاختبارات.

## مقالات ذات صلة

- [RustDesk لنظام Linux](/ar/blog/rustdesk-for-linux-ar)
- [الوصول غير المراقب في RustDesk](/ar/blog/rustdesk-unattended-access-setup-ar)
- [RustDesk مقابل AnyDesk](/ar/blog/rustdesk-vs-anydesk-ar)
- [RustDesk مقابل TeamViewer](/ar/blog/rustdesk-vs-teamviewer-ar)
- [تنفيذ التقاط شاشة Wayland ‏(DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)
