---
title: Android
description: "Android'de uzaktan kontrol, dosya aktarımı, ID ve relay sunucu ayarları ile ekran paylaşımı için RustDesk'i kullanın. Gerekli izinleri ve servisin nasıl başlatılacağını öğrenin."
keywords: ["rustdesk android", "rustdesk android uzaktan kontrol", "rustdesk android dosya aktarımı", "rustdesk android ekran paylaşımı", "rustdesk android id relay sunucusu", "rustdesk android izinler"]
weight: 4
---

Bu Android kılavuzunu kullanarak uzak cihazları kontrol edebilir, dosya aktarabilir, ID ve relay sunucunuzu yapılandırabilir ve bir Android telefonun ekranını veya dosya sistemini paylaşabilirsiniz.

{{% notice note %}}
Ayrıca bakınız: [Android ve iOS'tan uzaktan kontrol](https://rustdesk.com/blog/rustdesk-remote-control-android-ios).
{{% /notice %}}

## Uzaktan Kontrol

Ana sayfada uzak cihazın kimliğini (ID) girin veya doğrulamak için geçmişteki bir cihazı seçin.
Doğrulama başarılı olduktan sonra uzak cihazı kontrol edebilirsiniz.

| Ana Sayfa | Başarıyla Bağlandı |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Giriş kontrolü iki mod sunar: Alt araç çubuğu üzerinden geçiş yapılabilen `Fare modu` ve `Dokunmatik mod`.

| Fare ayarları | Mod seçimi |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
`Fare modunda`, `İki Parmakla Dokunarak` uzak cihazın `Sağ Fare Tıklamasını` da tetikleyebilirsiniz.
{{% /notice %}}

## Dosya Aktarımı (Android)

> RustDesk ≥ 1.1.9 gerektirir

Ana sayfadaki cihaz listesinden cihazı seçin.

Uzun basın veya sağdaki menüye dokunarak `Dosya Aktarımı` seçeneğini belirleyin.

| Ana Sayfa | Başarıyla Bağlandı |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- Başlangıç dizini cihazın Ana dizinidir, Ana dizine hızla dönmek için <i class="fas fa-home"></i> simgesine tıklayabilirsiniz.
- Başlık çubuğunun altında dizin seviyesi yer alır, hızlıca geçiş yapmak için ilgili klasöre tıklayabilirsiniz.
- Üst dizine erişmek için <i class="fas fa-arrow-up"></i> simgesine tıklayın.
- Listenin altında geçerli mutlak yol ve proje istatistikleri gösterilir.
- Sayfaları değiştirmek için başlık çubuğundaki `Yerel` / `Uzak` seçeneğine tıklayın.

### Dosyaları nasıl aktarırım?

1. Çoklu öğe seçebilen **çoklu seçim moduna** hızla girmek için listedeki bir dosya veya klasöre **uzun basın**.
2. Dosyaları seçtikten sonra `Yerel` / `Uzak` sayfasına geçiş yapın. Geçiş yaptıktan sonra ekranın altında `Buraya yapıştırılsın mı?` istemini göreceksiniz.
3. Seçilen öğeleri hedef dizine aktarmak için görseldeki dosya yapıştırma simgesine tıklayın.

| Çoklu Seçim Modu | Dosya Yapıştırma |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## ID/Relay Sunucusunu Ayarlama

1. Alt gezinme çubuğundaki `Ayarlar`'a tıklayın.
2. `ID/Relay Sunucusu`'na tıklayın.
3. `ID Sunucusu` alanına ID Sunucusu ana bilgisayar adınızı/IP Adresinizi girin. `Relay Sunucusu` ve `API Sunucusu` alanlarını boş bırakın ve `Key` alanına genel anahtarınızı (isteğe bağlı, şifreleme için gereklidir) girin. Ayarlarınızı kaydetmek için **Tamam**'a basın. Otomatik olarak belirtilen sunucuya geçecektir.

Ayrıca bir QR Kodu tarayarak da yapılandırabilirsiniz. QR Kodunu oluşturmak için aşağıdaki biçimi kullanın (`host` ve `key` değerlerini kendinize göre değiştirin):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Ardından bir [Çevrimiçi QR Kod Oluşturucu](https://www.qr-code-generator.com/) sitesine gidin ve yukarıdaki kodu yapıştırın.

Aşağıdaki resim bir Android ekran görüntüsüdür. iOS kullanıyorsanız lütfen ana sayfadaki sağ üst menüyü kontrol edin.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## Android telefonunuzun ekranını/dosyalarını paylaşma

1.1.9 sürümünden itibaren Android istemcisine telefon ekranını paylaşma ve telefonun dosya sistemini paylaşma işlevleri eklenmiştir.

- Ekran paylaşımı için Android 6 ve üzeri gereklidir
- Cep telefonu sisteminin dahili sesini paylaşmak için Android 10 veya üzeri gereklidir
- iOS henüz ekran paylaşımını desteklememektedir

### İzin isteme ve servisleri başlatma

Alt gezinme çubuğundan `Ekranı Paylaş` seçeneğine tıklayın.

İhtiyaca göre çeşitli izinleri yapılandırın. RustDesk'i her başlattığınızda "Ekran Yakalama" ve "Giriş Kontrolü" izinlerini tekrar istemeniz gerekir.

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| İzinler | Açıklama |
| --- | --- |
| Ekran Yakalama | Ekran yakalama paylaşım izninin etkinleştirilip etkinleştirilmeyeceği; izleme servisi başlatma ile aynı anda açılır |
| Giriş Kontrolü* | Kontrol edenin, fareyle sanal dokunmatik ekran işlemi gibi cep telefonunun girişini kontrol etmesine izin verilip verilmeyeceği |
| Dosya aktarımı* | Dosya aktarım izninin etkinleştirilip etkinleştirilmeyeceği; başlatıldıktan sonra bu telefonun dosya sistemini uzaktan kontrol edebilirsiniz |
| Ses yakalama | Telefonun içindeki sistem sesinin (mikrofon girişi değil) paylaşılıp paylaşılmayacağı |

{{% notice note %}}
Yukarıdaki * işareti özel izinleri temsil eder. Bu tür izinleri almak için manuel olarak Android sistem ayarları sayfasına gitmeniz gerekir. Ayrıntılar aşağıdaki gibidir.
{{% /notice %}}

### Özel İzin İsteği - Dosya

| Android dosya izinlerini istemek sizi otomatik olarak sistem ayarları sayfasına yönlendirir |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### Özel İzin İsteği - Fare Girişi
| Adım 1: "Yüklü Servisler"i bulun | Adım 2: RustDesk Girişini Başlatın |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Farklı üreticilerin sistem ayar sayfaları farklı olabilir, lütfen sistem sayfanıza göre uyarlayın.
{{% /notice %}}

| Uzak fare kontrol kısayolları | Açıklama |
| --- | --- |
| Sağ fare düğmesine tıklama | Geri git |
| Fare tekerleğine tıklama | Ana ekran (Home) |
| Fare tekerleğine uzun basma | Son açılan uygulamalar |
| Fare tekerleğini kaydırma | Dikey kaydırmayı simüle etme |

### Servisi Başlatma

`Ekran Yakalama` iznini aldıktan sonra servis otomatik olarak başlatılacaktır. Servisi başlatmak için `Servisi Başlat` düğmesine de tıklayabilirsiniz. Servis başlatıldıktan sonra diğer cihazlardan gelen masaüstü kontrol isteklerini kabul edebilir.

`Dosya Aktarımı` izni etkinleştirilirse diğer cihazlardan gelen dosya kontrol isteklerini de kabul edebilir.

Servis başlatıldıktan sonra bu cihaz için benzersiz bir ID ve rastgele şifre otomatik olarak alınacaktır. Diğer cihazlar bu ID ve şifre aracılığıyla telefonu kontrol edebilir veya yeni bir istek alındığında manuel olarak onaylayabilirsiniz.

| Servis başlatılmadan önce | Servis başlatıldıktan sonra |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. `Servisi Başlat` seçeneğine tıklamak varsayılan olarak `Ekran Yakalama` iznini etkinleştirir.
2. `Ekran Yakalama` izni alınmadığında diğer cihazlar kontrol isteği gönderemez.
3. `Ekran Yakalama` izni hariç diğer izinlerin değiştirilmesi yalnızca yeni bağlantıyı etkiler ve kurulmuş bağlantıyı etkilemez. Kurulmuş bir bağlantı için izinleri değiştirmek istiyorsanız lütfen önce mevcut bağlantıyı kapatın, izinleri değiştirin ve ardından kontrol isteği alın.
{{% /notice %}}

#### Bilgisayar Tarafı

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### Mobil Uç Nokta

| Servisi istediğiniz zaman durdurabilir veya belirtilen bağlantıyı kapatabilirsiniz | Sohbet alabilir veya başlatabilirsiniz |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
