---
title: Windows Kurulumu (Kullanımdan kaldırıldı)
weight: 5
description: "Windows üzerinde RustDesk Server Pro kurulumu için eski kılavuz. Önkoşullar, lisans kurulumu ve indirme adımları; bunun yerine Linux veya Docker önerilir."
keywords: ["rustdesk server pro windows", "rustdesk pro windows kurulum", "rustdesk self-host pro windows", "rustdesk windows kurulum eski", "rustdesk pro lisans windows"]
---

Bu, RustDesk Server Pro için eski (deprecated) Windows kurulum yoludur. Mümkün olduğunda bunun yerine Linux veya Docker kullanın.

{{% notice note %}}
Windows güvenlik politikaları hassastır; bu eğitim sizin için işe yaramazsa veya kararsız bağlantıyla karşılaşırsanız lütfen bir Linux sunucusuna geçiş yapın.
{{% /notice %}}

{{% notice note %}}
Arayüzlü sürüm olan `RustDeskServer.setup.exe` artık güncellenmemektedir ve önerilmez.
{{% /notice %}}

## Windows kurulum yolunu kullanmalı mısınız?

Bu kılavuzu yalnızca RustDesk Server Pro ana makineniz mutlaka Windows üzerinde kalması gerekiyorsa kullanın. Yeni dağıtımlar için otomatikleştirilmesi, güncellenmesi ve güvenilir şekilde çalıştırılması daha kolay olduğundan Linux veya Docker daha iyi bir varsayılandır.

## Windows kurulumu hızlı yanıtlar

- Bunu tercih edilen dağıtım yöntemi olarak değil, eski bir yöntem olarak değerlendirin.
- Başlamadan önce Microsoft Visual C++ Yeniden Dağıtılabilir paketini yükleyin.
- Eski grafik arayüzlü yükleyici artık güncellenmemektedir.
- Uzun vadeli kararlı bir dağıtıma ihtiyacınız varsa Linux veya Docker'a geçin.
- Windows'ta kalacaksanız servisleri nasıl çalıştıracağınızı ve web konsolunu nasıl proxy yapacağınızı planlayın.

## Kurulum

RustDesk'i Windows'ta çalıştırmak için Microsoft Visual C++ Yeniden Dağıtılabilir paketi gereklidir. [Buradan](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist) indirebilirsiniz.

1. Lisansınızı [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) adresinden alın; ayrıntılar için [lisans](/docs/tr/self-host/rustdesk-server-pro/license/) sayfasını inceleyin.
2. Windows yükleyicisini [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest) üzerinden indirin.
3. Windows yükleyici arşivini açın.
4. Yükleyiciyi çalıştırın ve ekrandaki adımları izleyin. Veya [PM2 ya da NSSM](/docs/tr/self-host/rustdesk-server-oss/windows/) ile manuel olarak kurun.
5. Kurulum tamamlandıktan sonra RustDesk Server'ı açın.
6. Kurulum boyunca size rehberlik eden yönlendirmeleri izleyin.
7. `Services` ve ardından `Start`'a tıklayın.
8. Kurulum tamamlandıktan sonra `http://sunucuipadresi:21114` adresine gidin.
9. `admin` kullanıcı adı ve `test1234` parolasıyla giriş yapın.
10. Adım 1'de satın aldığınız lisans kodunu girin.

## Proxy Olarak IIS Kullanma

Lütfen `Dynamic Content Compression` (Dinamik İçerik Sıkıştırma) bileşeninin yüklü olduğundan emin olun (bu, Sunucu Rolleri ile kurulabilen bir IIS özelliğidir).
1. IIS'i açın (veya kurun).
2. Bağlamalar (İdeal olarak 443) ve ilgili sertifika ile RustDesk için yeni bir web sitesi oluşturun. Temel ayarlar bunu boş bir klasöre yönlendirmelidir. (Varsayılan siteyi kullanıyorsanız klasörde başka dosya bulunmadığından emin olun).
3. IIS üzerinde [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) ve [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module) modüllerini kurun.

## Application Request Routing

1. IIS Sunucu Ana Makinesi altında Application Request Routing'i açın.
2. Server Proxy Settings'e gidin.
3. Proxy'yi etkinleştirin; tüm ayarlar görünecektir, varsayılan olarak bırakabilirsiniz.
4. Ayarları kaydedin ve bir sonraki adıma geçin: URL Rewrite.

## URL Rewrite

1. Sol bölmedeki IIS sitesini açın ve URL Rewrite'a çift tıklayın.
2. `Add rules` (Kural ekle) seçeneğine tıklayın.
3. Yeni bir ters proxy kuralı ayarlayın.
4. Yerel adresi (21114 adresi) ayarlayın: \
Gelen Kural (Inbound Rule) – RustDesk dahili 21114 adresi \
Giden Kurallar (Outbound Rules) – `From` RustDesk dahili 21114 adresi ve `To` harici adres. \
Not: Adreslerden önce http / https koymayın; otomatik olarak işlenirler. Ayrıca tüm adreslerin hem dahili hem de harici olarak erişilebilir olduğundan emin olun.

## Sıkıştırma (Compression)

1. `Dynamic Content Compression` özelliğini devre dışı bırakın.

## Sorun Giderme

500.52 hatası alıyorsanız belirtilen değişkenleri ekleyin: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

SSL Ayarlarınızı "Require SSL → Ignore" olarak değiştirmeniz gerekebilir.
