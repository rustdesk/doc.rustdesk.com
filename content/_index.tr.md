---
title: "RustDesk Dokümantasyonu - Açık Kaynaklı Uzak Masaüstü"
description: "RustDesk için eksiksiz dokümantasyon: Açık kaynaklı uzak masaüstü yazılımı. Kendi sunucunuzu kurmayı, istemcileri yapılandırmayı ve dağıtmayı öğrenin."
keywords: ["rustdesk", "uzak masaüstü", "açık kaynak", "kendi sunucun", "dokümantasyon", "uzaktan erişim", "VNC alternatifi", "teamviewer alternatifi"]
type: docs
breadcrumbs: false
weight: 1
---

RustDesk, minimum yapılandırma ile kendi sunucunuzda barındırma (self-hosting) ve üst düzey güvenlik sağlayan tam özellikli, açık kaynaklı bir uzak masaüstü yazılımıdır. Güvenlik endişesi taşımadan verilerinizin tam kontrolüne sahip olursunuz. İstemci (Client) açık kaynaklıdır; sunucu tarafında ise [web sitemizden](https://rustdesk.com) satın alınabilen tam özellikli **Professional Server** ile bu sunucuyu temel alan ücretsiz ve temel açık kaynaklı **OSS Server** seçenekleri mevcuttur.

## Hangi RustDesk yolunu seçmelisiniz?

| İhtiyaç | En İyi Başlangıç Noktası |
| --- | --- |
| RustDesk'i son kullanıcı veya yönetici olarak kullanmak | [İstemci](/docs/tr/client/) |
| Ücretsiz açık kaynaklı sunucuyu kendi altyapınızda barındırmak | [RustDesk Server OSS](/docs/tr/self-host/rustdesk-server-oss/) |
| Web konsolu, SSO ve kurumsal denetimlerle kendi sunucunuzu kurmak | [RustDesk Server Pro](/docs/tr/self-host/rustdesk-server-pro/) |
| RustDesk'i kaynaktan derlemek veya paketlemek | [Geliştirme](/docs/tr/dev/) |

## Özellikler
- Windows, macOS, Linux, iOS, Android ve Web üzerinde çalışır.
- VP8 / VP9 / AV1 yazılımsal kodekleri ve H264 / H265 donanımsal kodekleri destekler.
- Kendi verinizin sahibi olun; altyapınızda kendi sunucu çözümünüzü kolayca kurun.
- NaCl tabanlı uçtan uca şifreleme ile P2P bağlantı.
- Windows için yönetici ayrıcalığı veya kurulum gerekmez; gerektiğinde yerel veya uzaktan ayrıcalık yükseltme yapılabilir.
- Her şeyi basit tutmayı seviyoruz ve mümkün olan her yerde daha da basitleştirmeye çalışıyoruz.

## GitHub Depoları
- **Ana İstemci Deposu**: https://github.com/rustdesk/rustdesk
- **Açık Kaynak Sunucu Deposu**: https://github.com/rustdesk/rustdesk-server  
- **Pro Sunucu Deposu**: https://github.com/rustdesk/rustdesk-server-pro
- **Dokümantasyon Deposu**: https://github.com/rustdesk/doc.rustdesk.com

{{% children depth="4" showhidden="true" %}}
