---
title: 2FA (İki Faktörlü Doğrulama)
weight: 16
description: "RustDesk Server Pro'da e-posta doğrulaması veya Authy, Microsoft Authenticator, Google Authenticator gibi TOTP uygulamaları ile iki faktörlü doğrulamayı etkinleştirin."
keywords: ["rustdesk 2fa", "rustdesk totp", "rustdesk e-posta doğrulama", "rustdesk authenticator", "rustdesk server pro 2fa"]
---

Daha güçlü hesap güvenliği için RustDesk Server Pro'da iki faktörlü doğrulamayı (2FA) etkinleştirmek için bu kılavuzu kullanın.

Hesabınıza giriş yaparken İki Faktörlü Doğrulamayı (2FA) açmak hesap güvenliğini önemli ölçüde artırır.

## Hangi 2FA yöntemini seçmelisiniz?

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| E-posta doğrulaması | Hali hazırda SMTP kullanan daha basit dağıtımlar | Kullanıcılar henüz bir kimlik doğrulama uygulaması kullanmıyorsa dağıtımı en kolay yoldur |
| TOTP | Daha güçlü günlük hesap güvenliği | Uzun vadeli yönetici ve operatör hesapları için daha güvenli ve standarttır |

## 2FA hızlı yanıtlar

- RustDesk Server Pro e-posta doğrulaması ve TOTP'yi destekler
- TOTP etkinleştirildiğinde e-posta ile giriş doğrulaması artık kullanılmaz
- TOTP kurulumu 6 adet yedek kod oluşturur
- Yedek kodlar yalnızca bir kez kullanılabilir
- Süresi dolmuş 2FA çalışmaya devam edebilir, ancak yeniden etkinleştirmek daha iyi güvenlik için gizli anahtarı yeniler

Web konsolumuz şu anda iki tür 2FA'yı desteklemektedir:

1. E-posta doğrulaması
2. TOTP. Doğrulama kodunu oluşturmak için [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) ve [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) gibi üçüncü taraf bir kimlik doğrulama uygulaması gerekir.

Öncelikle hesap ayarları sayfasına gitmeniz gerekir.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## E-posta doğrulaması

Giriş için e-posta doğrulamasını etkinleştirmek için şunları yapmanız gerekir:

1. E-postanızı tanımlayın.
2. `E-posta ile giriş doğrulamasını etkinleştir` seçeneğini işaretleyin.
3. `Gönder`'e tıklayın.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Bir sonraki girişimizde RustDesk bize bir doğrulama kodu e-postası gönderecek ve web sayfası da doğrulama sayfasına geçecektir.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP yaygın olarak kullanılan bir 2FA yöntemidir, bu nedenle RustDesk Server Pro web konsolunda 2FA, TOTP doğrulamasını ifade eder.

### Kimlik doğrulama uygulamasını hazırlama

İlk olarak bir kimlik doğrulama uygulaması hazırlamanız gerekir.
[Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) veya [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) uygulamalarından birini seçebilirsiniz.

### 2FA'yı Etkinleştirme

Ayarlar sayfasında `2FA'yı Etkinleştir` düğmesi görüntülendiğinde bu, 2FA'nın şu anda etkin olmadığı anlamına gelir.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Düğmeye tıkladığınızda 2FA'yı etkinleştirmek için bir form açılacaktır.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Kimlik doğrulayıcı uygulamasını açın, QR kodunu tarayarak bir hesap ekleyin.

QR kodunu taramanız uygun değilse kodu doğrudan buraya da girebilirsiniz.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Hesabı kimlik doğrulayıcı uygulamasına ekledikten sonra, 2FA'yı açmak için uygulamadaki doğrulama kodunu girin.

2FA başarıyla açıldıktan sonra RustDesk Server Pro hesabınıza 6 adet **yedek kod** bağlanacaktır. Böylece kimlik doğrulama uygulamasını kullanamadığınız durumlarda bile doğrulamayı geçmek için bu **yedek kodları** kullanabilirsiniz.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Bu yedek kodlar yalnızca bir kez kullanılabilir.
2. Lütfen yedek kodları güvenli bir yerde saklayın.
{{% /notice %}}

### Giriş doğrulaması

2FA etkinleştirildiğinde e-posta ile giriş doğrulaması artık kullanılmaz. Bunun yerine 2FA giriş doğrulamasını kullanacağız.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Giriş yaparken doğrulama sayfasına yönlendirileceksiniz.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Ayarları değiştirme

2FA etkinleştirildiğinde hesap ayarlarını değiştirmek ek 2FA doğrulaması gerektirir.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### 2FA durumu

2FA toplam 3 duruma sahiptir: etkin değil, etkin ve süresi dolmuş.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA süresi dolduktan sonra da normal şekilde kullanılabilir. Bu yalnızca 2FA ayarlarının uzun süredir (varsayılan 180 gün) değiştirilmediği anlamına gelir. Güvenlik nedeniyle gizli verilerin güncellenebilmesi için 2FA'nın yeniden etkinleştirilmesini öneririz.
{{% /notice %}}
