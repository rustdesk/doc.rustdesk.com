---
title: Lisans
weight: 15
description: "RustDesk Server Pro lisansınızı satın alın, tanımlayın ve web konsolunda yönetin. Lisansı nereden alacağınızı ve satın alma sonrasında nasıl etkinleştireceğinizi öğrenin."
keywords: ["rustdesk pro lisans", "rustdesk server pro etkinleştir", "rustdesk lisans satın al", "rustdesk lisans değiştir", "rustdesk web konsol lisans"]
---

Bir RustDesk Server Pro lisansını nasıl satın alacağınızı, etkinleştireceğinizi ve güncelleyeceğinizi anlamak için bu sayfayı kullanın.

## RustDesk Server Pro lisanslaması nasıl çalışır?

RustDesk Server Pro lisanslaması her bir relay düğümüne değil, `hbbs` sunucusuna bağlıdır. Lisansı fiyatlandırma sayfası üzerinden satın alır, web konsoluna girer ve ardından self-servis lisans portalı üzerinden yenilemeleri, yükseltmeleri, faturaları ve taşımayı yönetirsiniz.

## Lisans hızlı yanıtlar

- Bir lisans aynı anda bir `hbbs` makinesine atanır
- `hbbr` relay sunucuları ayrı bir lisans gerektirmez
- Yenilemeler ve yükseltmeler self-servis portalında işlenir, ardından web konsolunda lisans yenilenerek aktif edilir
- Taşıma işlemi, eski makinenin bağlantısının kaldırılması ve yeni sunucuda lisansın tanımlanmasıyla yapılır
- Sunucu doğrudan internete erişemiyorsa lisans doğrulaması için bir proxy yapılandırabilirsiniz

{{% notice note %}}
İlgili okuma: [yönetilen cihaz olarak ne sayılır](https://rustdesk.com/blog/what-counts-as-a-managed-device) ve [abonelik ortasında lisans yükseltme](https://rustdesk.com/blog/upgrade-rustdesk-license-mid-subscription).
{{% /notice %}}

## Lisans satın alma

Lütfen lisansınızı [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) adresinden alın, Stripe ödeme sayfasında geçerli bir e-posta adresi girin. Ödeme başarıyla tamamlandığında lisans (ve ayrı bir e-postada fatura) e-postanıza gönderilecektir.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Lisansı tanımlama

Lisansı web konsolunda (`http://<rustdesk-server-pro-ip>:21114`) girmeniz veya daha sonra lisansı değiştirmeniz istenecektir.

| Lisansı tanımlama | Lisansı değiştirme |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## Lisansı yenileme/yükseltme

Lisansı yenileme/yükseltme işlemi aşağıda açıklandığı gibi [self-servis lisans portalı](https://rustdesk.com/self-host/account/) üzerinden yapılabilir; yukarıdaki resimdeki gibi lisansı satın almak için kullandığınız e-posta ile giriş yapın.

| Yenileme/yükseltme işlemlerini içeren lisans sayfası | Yükseltme penceresi |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Ödemeyi yaptıktan sonra etkinleştirmek için lütfen lisansı [aşağıdaki gibi](#lisansı-yenileme) tazeleyin.

### Lisansı yenileme
Ödemeden sonra, aşağıda gösterildiği gibi manuel olarak etkinleştirmek için web konsoluna gitmeniz gerekir. Sadece `Düzenle`'ye (Edit) ve ardından `Tamam`'a (OK) tıklayın; lisans anahtarınız aynı kaldığı için hiçbir şeyi düzenlemenize gerek yoktur.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Faturalar, Lisans Alma ve Taşıma

Lisans yalnızca bir makinede kullanılabilir (yalnızca hbbs için, hbbr lisans gerektirmez); başka bir makineye geçmek, lisansınızı almak veya faturaları indirmek istiyorsanız lütfen [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/) adresine gidin. Stripe ödemesinde kullanılan e-posta adresiyle giriş yapın, taşımak istediğiniz eski makinenin bağlantısını aşağıda gösterildiği gibi kaldırın; yeni sunucunun web konsolunda lisansı tanımladığınızda lisansı atayacak ve konsola otomatik olarak kaydedecektir.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Proxy
Sunucunuz lisansı doğrudan doğrulamak için internete erişemiyorsa bir proxy ekleyebilirsiniz; örneğin `proxy=http://kullaniciadi:parola@example.com:8080 ./hbbs`.

Alternatif olarak, çalışma dizinindeki (`id_ed25519` / `db.sqlite3` dosyalarının bulunduğu yer) `.env` dosyasına `proxy=http://kullaniciadi:parola@example.com:8080` ekleyebilirsiniz.

`http`, `https` veya `socks5` ile değiştirilebilir. `kullanıcıadı` / `parola` / `port` yoksa `proxy=http://example.com` şeklinde olabilir.
