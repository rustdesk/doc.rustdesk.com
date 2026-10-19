---
title: RustDesk Server OSS
description: "Ücretsiz ve açık kaynaklı sunucu arka ucu ile kendi RustDesk Server OSS dağıtımınızı çalıştırın. Nelerin dahil olduğunu ve servislerin nasıl kurulacağını öğrenin."
keywords: ["rustdesk server oss", "rustdesk açık kaynak sunucu", "kendi sunucun rustdesk", "rustdesk hbbs", "rustdesk hbbr", "rustdesk docker", "rustdesk sunucu kurulumu", "rustdesk relay sunucusu"]
weight: 100
pre: "<b>2.1. </b>"
---

RustDesk Server OSS, RustDesk için ücretsiz ve açık kaynaklı kendi kendine barındırılan arka uçtur (backend). Kendi ID ve relay servislerinizi çalıştırmanıza, uzaktan erişim trafiğini kontrol ettiğiniz altyapı altında tutmanıza ve RustDesk'i kendi bulut veya yerel ortamınızda dağıtmanıza olanak tanır.

Temel self-hosting yeteneklerini istediğinizde ve dağıtım, ağ ve yükseltmeleri kendiniz yönetmekten memnun olduğunuzda RustDesk Server OSS'i kullanın. Bir web konsoluna, API erişimine, OIDC, LDAP, 2FA, cihaz yönetimine veya diğer merkezi yönetici özelliklerine ihtiyacınız varsa bunu [RustDesk Server Pro](/docs/tr/self-host/rustdesk-server-pro/) ile karşılaştırın.

{{% notice note %}}
İlgili okuma: [neden uzak masaüstü yazılımını kendi sunucunuzda barındırmalısınız](https://rustdesk.com/blog/why-self-host-remote-desktop-software).
{{% /notice %}}

## RustDesk Server OSS'e neler dahildir?

- RustDesk kimliği (ID), buluşma ve sinyalleşme için `hbbs`.
- Doğrudan eşler arası (P2P) bağlantı mümkün olmadığında relay trafiği için `hbbr`.
- Dokümantasyon ve [Discord](https://discord.com/invite/nDceKgxnkV) üzerinden topluluk desteği ve dağıtım rehberliği.

## RustDesk Server OSS ile Başlayın

- Standart dağıtım yolu için [Kurulum](/docs/tr/self-host/rustdesk-server-oss/install/) kılavuzuyla başlayın.
- Konteyner tabanlı bir kurulum istiyorsanız [Docker](/docs/tr/self-host/rustdesk-server-oss/docker/) kılavuzunu kullanın.
- Windows sistemler için [Windows & PM2 veya NSSM](/docs/tr/self-host/rustdesk-server-oss/windows/) kılavuzunu kullanın.
- NAS dağıtımları için [Synology](/docs/tr/self-host/rustdesk-server-oss/synology/) kılavuzunu kullanın.

{{% notice note %}}
Sunucunuzu evinizde/ofisinizde kurup genel IP/alan adı üzerinden bağlanamıyorsanız lütfen [bu makaleyi](/docs/tr/self-host/nat-loopback-issues/) inceleyin.
{{% /notice %}}

{{% children depth="3" showhidden="true" %}}
