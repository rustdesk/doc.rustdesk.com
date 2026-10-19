---
title: İstemci Yapılandırması
description: "Kendi sunucunuz için RustDesk istemcilerini yapılandırın. Logonuzla özel istemci oluşturucu (Pro), manuel yapılandırma, ayarları içe/dışa aktarma ve kurumsal dağıtım stratejileri."
keywords: ["rustdesk istemci yapılandırması", "özel istemci oluşturucu", "rustdesk markalı istemci", "rustdesk white label", "rustdesk kurumsal dağıtım", "rustdesk istemci kurulumu", "özel rustdesk uygulaması", "rustdesk pro istemci", "rustdesk yapılandırma yönetimi"]
weight: 300
pre: "<b>2.3. </b>"
---

## Kendi sunucunuz için RustDesk istemcilerini yapılandırmanın en iyi yolu nedir?

En iyi yapılandırma yöntemi, kaç cihazı yönettiğinize ve RustDesk Server Pro kullanıp kullanmadığınıza bağlıdır. Pro dağıtımları için Özel İstemci Oluşturucu (Custom Client Generator) sunucu ayarlarını ve kurumsal markanızı önceden yüklediğinden genellikle en iyi seçenektir. Daha küçük veya OSS dağıtımları için manuel yapılandırma, içe/dışa aktarma veya komut dosyasıyla dağıtım genellikle daha hızlıdır.

## Hangi istemci yapılandırma yöntemini seçmelisiniz?

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| Özel istemci oluşturucu | RustDesk Server Pro ekipleri | Sunucu ayarlarınız, markanız ve imzalama iş akışınızla önceden yapılandırılmış istemciler üretir |
| Manuel yapılandırma | Test ve küçük dağıtımlar | Birkaç istemciyi kendi sunucunuza bağlamanın en hızlı yolu |
| İçe veya dışa aktarma | Sorunsuz bir kurulumu çoğaltmak | Aynı sunucu ayarlarını bir istemciden diğerine kopyalar |
| Dağıtım betikleri | RMM, Intune veya büyük dağıtımlar | RustDesk'i kurar ve yapılandırmayı otomatik olarak uygular |
| `--config` komut satırı | Yönetilen kurulumlar ve otomasyon | Betik tabanlı kurulum sırasında yapılandırma dizesini kullanıcı müdahalesiz uygular |

## Çoğu istemcinin hangi değerlere ihtiyacı vardır?

Kendi sunucunuzu kullanan çoğu RustDesk istemcisi yalnızca birkaç değere ihtiyaç duyar:

- `ID Server`: Zorunludur, genellikle `hbbs` ana bilgisayarınız veya IP adresinizdir
- `Key`: Kendi sunucunuza şifreli bağlantılar için zorunludur
- `API Server`: Pro hesap girişi ve web konsolu özellikleri için gereklidir
- `Relay Server`: RustDesk bunu otomatik olarak çıkarabildiği için açıkça ayarlamak istemediğiniz sürece genellikle isteğe bağlıdır

## 1. Özel istemci oluşturucu (Yalnızca Pro, temel veya özel plan)

Kendi uygulama adınıza, logonuza, simgenize, yapılandırmanıza, dijital imzanıza ve daha fazlasına sahip olabilirsiniz.

Şu anda Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64 desteklenmektedir.

[Video](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Manuel Yapılandırma

Ana RustDesk İstemcisi ana sayfasında Kimliğinizin (ID) yanındaki Menü [ &#8942; ] düğmesine ve ardından Ağ seçeneğine tıklayın. Artık yönetici ayrıcalıklarını kullanarak ayarların kilidini açabilir ve `ID`, `Relay`, `API` ve `Key` değerlerinizi belirleyebilirsiniz. Bu `Key` değerinin, Pro sürümü satın alımınızla sağlanan lisans anahtarından farklı olarak, bağlantı şifrelemesi için kullanılan genel anahtar olduğunu unutmamanız önemlidir.

![](/docs/en/self-host/client-configuration/images/network-config.png)

**ID Sunucusu** giriş kutusuna `hbbs` ana bilgisayarını veya IP Adresini girin (yerel taraf + uzak taraf). Diğer iki adres boş bırakılabilir, RustDesk otomatik olarak çıkaracaktır (özel olarak ayarlanmamışsa) ve Relay Sunucusu `hbbr`'yi (port 21117) ifade eder.

Örn:

```nolang
hbbs.example.com
```

veya

```nolang
hbbs.example.com:21116
```

### `Key` (Anahtar) Ayarlama

Kendi barındırdığınız sunucunuzla şifreli bir bağlantı kurmak için sunucunun genel anahtarını girmeniz gerekir. Anahtar genellikle `hbbs`'in ilk çalıştırılmasında oluşturulur ve çalışma dizininizdeki / veri klasörünüzdeki `id_ed25519.pub` dosyasında bulunabilir.

Bir `Pro` kullanıcısı olarak `Key` değerini ayrıca [web konsolundan](/docs/tr/self-host/rustdesk-server-pro/console/) da alabilirsiniz.

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### `API Sunucusu` Ayarlama

Bu yalnızca `Pro` kullanıcıları içindir. Web konsoluna giriş yapabildiğiniz halde RustDesk istemcisinde giriş yapamıyorsanız, büyük olasılıkla `API Sunucusu`nu doğru ayarlamamışsınızdır.

API Sunucunuz varsayılan `21114` portunda çalışmıyorsa (açık kaynak sürümünden geliyorsanız bu portu güvenlik duvarına eklememiş olabilirsiniz), lütfen `API Sunucusu`nu açıkça belirtin.
Örn: API Sunucunuz varsayılan HTTPS portunda çalışıyorsa lütfen `API Sunucusu`nu `https://hbbs.example.com` olarak belirtin.

`API Sunucusu` değerini yine de doğrulayamıyorsanız lütfen web konsolunun karşılama sayfasına gidin, `API Sunucusu` yukarıdaki resimde gösterilmektedir (`API:` etiketli giriş kutusu).

## 3. İçe veya Dışa Aktarma Kullanarak Kurulum

1. Bir cihazda RustDesk İstemcisini yapılandırmak için [yukarıdaki](#2-manuel-yapılandırma) adımları izleyin.
2. Ayarlanan makinede Ayarlar'a, ardından Ağ'a gidin ve kilidi açın.
3. `Sunucu Yapılandırmasını Dışa Aktar` seçeneğine tıklayın.
4. Kopyalanan dizeyi Not Defteri'ne veya benzeri bir yere yapıştırın.
5. Yeni istemciye gidin ve yukarıdakini panoya kopyalayın.
6. Yeni RustDesk İstemcisinde Ayarlar ve ardından Ağ bölümüne gidin, kilidi açın ve `Sunucu Yapılandırmasını İçe Aktar` seçeneğine tıklayın.
7. Ayarları otomatik olarak yapıştıracaktır.
8. `Uygula`'ya tıklayın.

## 4. Otomatik Yapılandırma

Otomatik olarak kurmanın en kolay yolu [burada](/docs/tr/self-host/client-deployment/) bulunan dağıtım komut dosyalarını kullanmaktır.

## 5. Pano aracılığıyla `Pro`'dan yapılandırma içe aktarma

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Komut satırı `--config` kullanımı
`rustdesk.exe --config <yapılandırma-dizesi>`

Yapılandırma dizesini web konsolundan (yukarıdaki resimde görebilirsiniz) veya RustDesk istemcisi "Ayarlar → Ağ" bölümünden alabilirsiniz ([burada](https://github.com/rustdesk/rustdesk/discussions/7118) bununla ilgili bir tartışma bulunmaktadır).
