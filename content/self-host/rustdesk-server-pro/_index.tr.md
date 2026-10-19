---
title: RustDesk Server Pro
description: "RustDesk Server Pro için eksiksiz kılavuz - gelişmiş kurumsal self-host uzak masaüstü çözümü. Kurumsal kimlik doğrulama (OIDC, LDAP, 2FA), web konsolu, API ve güvenlik denetimleri."
keywords: ["rustdesk server pro", "rustdesk pro sunucu", "uzak masaüstü sunucusu", "kurumsal uzaktan erişim", "rustdesk profesyonel", "self-hosted rdp", "rustdesk lisanslama", "rustdesk web konsolu"]
aliases:
  - /tr/self-host/pro/
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro; RustDesk Server çekirdeğinin üzerine merkezi yönetim, kurumsal kimlik entegrasyonları ve gelişmiş denetimlere ihtiyaç duyan ekipler için ticari barındırma çözümüdür.

## RustDesk Server Pro hızlı yanıtlar

- Merkezi yönetici özelliklerine, kimlik entegrasyonlarına veya politika denetimine ihtiyaç duyduğunuzda Pro'yu seçin.
- En hızlı ve en kolay dağıtım için [Docker](/docs/tr/self-host/rustdesk-server-pro/installscript/docker/) ile başlayın.
- `systemd` ile betik tabanlı bir Linux kurulumu istiyorsanız [install.sh](/docs/tr/self-host/rustdesk-server-pro/installscript/script/) kullanın.
- [Windows kurulumunu](/docs/tr/self-host/rustdesk-server-pro/installscript/windows/) eski yöntem olarak değerlendirin.
- Sunucu başladıktan hemen sonra HTTPS, lisanslama ve istemci yapılandırmasını planlayın.

{{% notice note %}}
Pro'nun size uygun olup olmadığına mı karar veriyorsunuz? İnceleyin: [Kurumsal ortamlar için RustDesk](https://rustdesk.com/blog/rustdesk-for-enterprise).
{{% /notice %}}

## Ne zaman RustDesk Server Pro seçilmeli?

RustDesk Server OSS yeterli gelmediğinde ve şunlara ihtiyaç duyduğunuzda RustDesk Server Pro'yu seçin:

- Kullanıcı hesapları
- [Web konsolu](/docs/tr/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](/docs/tr/self-host/rustdesk-server-pro/oidc/), [LDAP](/docs/tr/self-host/rustdesk-server-pro/ldap/), [2FA](/docs/tr/self-host/rustdesk-server-pro/2fa/)
- [Adres defteri](/docs/tr/self-host/rustdesk-server-pro/address-book/)
- [Günlük yönetimi](/docs/tr/self-host/rustdesk-server-pro/audit-logs/) (Bağlantı, dosya aktarımı, alarm vb.)
- Cihaz yönetimi
- [Güvenlik Ayarları senkronizasyonu](/docs/tr/self-host/rustdesk-server-pro/strategy/)
- [Erişim kontrolü](/docs/tr/self-host/rustdesk-server-pro/permissions/)
- [Çoklu relay sunucusu](/docs/tr/self-host/rustdesk-server-pro/relay/) (en yakın relay'i otomatik seçer)
- [Özel istemci oluşturucu](/docs/tr/self-host/client-configuration/#1-özel-istemci-oluşturucu-yalnızca-pro-temel-veya-özel-plan)
- WebSocket
- Web istemcisini kendi sunucunuzda barındırma

{{% notice note %}}
Sunucunuzu evinizde/ofisinizde kurup genel IP/alan adı üzerinden bağlanamıyorsanız lütfen [bu makaleyi](/docs/tr/self-host/nat-loopback-issues/) inceleyin.
{{% /notice %}}

{{% notice note %}}
Devam etmeden önce [Kendi sunucumuz nasıl çalışır?](/docs/tr/self-host/#kendi-sunucumuz-nasıl-çalışır) bölümünü okumanızı öneririz.
{{% /notice %}}

## Donanım gereksinimi

En düşük seviye VPS bile kullanım senaryolarınız için yeterlidir. Sunucu yazılımı CPU ve bellek yoğun değildir. 2 CPU/4 GB Vultr sunucusunda barındırılan genel ID sunucumuz 1 milyondan fazla uç noktaya hizmet vermektedir. Her relay bağlantısı saniyede ortalama 180 kb tüketir. 1 CPU çekirdeği ve 1 GB RAM, eşzamanlı 1000 relay bağlantısını desteklemek için yeterlidir. Büyük ölçekli boyutlandırma için [50.000–200.000 cihaza ölçekleme](https://rustdesk.com/blog/rustdesk-scale-50000-200000-devices) makalesine bakın.

## Makale eğitimleri
[Adım Adım Kılavuz: Güvenli Uzaktan Erişim İçin Docker ile Bulutta RustDesk Server Pro Barındırma](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Video eğitimleri

[Başlangıç Kılavuzu: Yeni Başlayan Linux Kullanıcıları İçin RustDesk Server Pro Barındırma](https://www.youtube.com/watch?v=MclmfYR3frk)

[Hızlı Kılavuz: İleri Düzey Linux Kullanıcıları İçin RustDesk Server Pro Barındırma](https://youtu.be/gMKFEziajmo)

## Lisans

Lisansı https://rustdesk.com/pricing.html adresinden alabilirsiniz; daha fazla bilgi için [lisans](/docs/tr/self-host/rustdesk-server-pro/license/) sayfasına bakın.

## Başlarken
### 1, Kurulum

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Daha fazla ayrıntı için lütfen [Docker](/docs/tr/self-host/rustdesk-server-pro/installscript/docker/) sayfasını inceleyin.

### 2, Gerekli Portlar

TCP `21114`-`21119` ve UDP `21116` portlarının açık olması gerekir; güvenlik duvarı kurallarını ve Docker port eşlemesini ayarlarken bu portların tanımlandığından emin olun.

Bu portlar hakkında daha fazla bilgi için lütfen [buraya](/docs/tr/self-host/rustdesk-server-oss/install/#güvenlik-duvarı) bakın.

### 3, Lisans Tanımlama

`http://<sunucu-ip>:21114` adresine giderek web konsolunuzu açın, varsayılan `admin`/`test1234` kimlik bilgileriyle [giriş yapın](/docs/tr/self-host/rustdesk-server-pro/console/#giriş-yapma). Lisansı tanımlamak için [bu kılavuzu](/docs/tr/self-host/rustdesk-server-pro/license/#lisansı-tanımlama) izleyin.

### 4, Web konsolu için HTTPS Kurulumu

> Deneme süresince HTTPS kullanmak istemiyorsanız bu adımı atlayabilirsiniz; ancak HTTPS'i kurduktan sonra istemcinin API adresini değiştirmeyi unutmayın.

İşte [manuel HTTPS kurulumu](/docs/tr/self-host/rustdesk-server-pro/faq/#web-konsolu-için-manuel-olarak-https-kurma) için basit bir eğitim.

### 5, İstemciyi kendi sunucunuzu kullanacak şekilde yapılandırma

Ayrıntılı adımlar için [İstemci Yapılandırması](/docs/tr/self-host/client-configuration/) sayfasına bakın.

### 6, WebSocket Yapılandırması

Web istemcisinin veya [masaüstü / mobil istemcinin](/docs/tr/self-host/client-configuration/advanced-settings/#allow-websocket) WebSocket ile düzgün çalışmasını sağlamak için ters proxy yapılandırmanıza gerekli ayarları eklemeniz gerekir. Ayrıntılı kurulum için [Güvenli WebSocket (WSS) Yapılandırma Kılavuzu](/docs/tr/self-host/rustdesk-server-pro/faq/#8-tüm-platformlar-için-güvenli-iletişimi-etkinleştirmek-üzere-kimlik-id-ve-relay-sunucusuna-güvenli-websocket-wss-desteği-ekleme)'na bakın.

## Sunucuyu Yükseltme

Farklı kurulum yöntemlerine göre RustDesk Server Pro'yu alt sürümlerden yükseltmek için [bu kılavuza](/docs/tr/self-host/rustdesk-server-pro/faq/#rustdesk-server-pronun-yeni-bir-sürümü-çıktı-nasıl-yükseltebilirim) bakın.

## Yeni ana makineye geçiş ve yedekleme / geri yükleme

Ayrıntılı [eğitim buradadır](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Lisans taşıma

Lütfen bu [kılavuzu](/docs/tr/self-host/rustdesk-server-pro/license/#faturalar-lisans-alma-ve-taşıma) takip edin.

## Lisansı yükseltme

Daha fazla kullanıcı ve cihaz için lisansınızı dilediğiniz zaman yükseltmek üzere [bu kılavuzu](/docs/tr/self-host/rustdesk-server-pro/license/#lisansı-yenilemeyükseltme) takip edin.

## Güvenlik hakkında

https://github.com/rustdesk/rustdesk/discussions/9835
