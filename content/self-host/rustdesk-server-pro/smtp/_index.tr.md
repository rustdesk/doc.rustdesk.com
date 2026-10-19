---
title: SMTP
weight: 16
description: "RustDesk Server Pro üzerinde davetler, giriş doğrulama e-postaları ve bağlantı alarmları göndermek için giden SMTP ayarlarını yapılandırın."
keywords: ["rustdesk smtp", "rustdesk e-posta bildirimleri", "rustdesk giriş doğrulama e-postası", "rustdesk davet e-postası", "rustdesk server pro smtp"]
---

RustDesk Server Pro için giden e-postaları SMTP ile yapılandırmak üzere bu kılavuzu kullanın.

SMTP kurulumu; sunucunuzun kullanıcı davetleri, giriş doğrulamaları ve bağlantı alarmları gibi e-posta bildirimleri göndermesini sağlar.

## RustDesk Server Pro'da SMTP ne için kullanılır?

SMTP, RustDesk Server Pro dağıtımınızdan giden e-postalar için kullanılır. Pratikte bu genellikle davet e-postaları, oturum açma doğrulama kodları ve bağlantı alarmı bildirimleri anlamına gelir.

## SMTP kurulum kontrol listesi

1. Barındırma ortamınızdan giden postalara izin veren bir SMTP sunucusu seçin.
2. Sunucu adresi (host), bağlantı noktası (port), kullanıcı adı, parola ve gönderici adresini edinin.
3. Bu ayarları RustDesk Server Pro web konsoluna ekleyin.
4. Kullanıcılar için e-posta tabanlı akışları etkinleştirmeden önce konsoldan bir test gerçekleştirin.

## E-posta çalışmıyorsa ilk olarak neleri kontrol etmelisiniz?

- VPS sağlayıcınızın `25`, `465` veya `587` gibi bağlantı noktalarını engelleyip engellemediği
- Posta sağlayıcınızın bir uygulama parolası veya relay'e özel kimlik bilgileri gerektirip gerektirmediği
- `Kimden` (From) adresine posta sağlayıcınız tarafından izin verilip verilmediği
- TLS ve seçilen SMTP bağlantı noktasının posta sağlayıcınızın gereksinimleriyle eşleşip eşleşmediği

Microsoft 365 OAuth2 kurulumu için [Microsoft 365](/docs/tr/self-host/rustdesk-server-pro/smtp/microsoft-365/) bölümüne bakın.

[Video Eğitimi](https://youtu.be/0LyQY1JS4Uc)
