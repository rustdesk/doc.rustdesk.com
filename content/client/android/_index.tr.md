### Android

### Uzaktan Kontrol

Ev sayfasında uzaktaki cihazın kimliğini girin veya doğrulama yapmak için geçmişteki bir cihazı seçin.
Doğrulama başarılı olduktan sonra uzak cihazı kontrol edebilirsiniz.

| Ev | Başarıyla bağlandı |
| --------------- | -------------------------------------------------------- |
| ![](images/connection_home_en.jpg?width=300px) | ![](images/connection_en.jpg?width=300px) |

Giriş kontrolü iki mod sağlar: `fare modu` ve `dokunmatik mod`, alt araç çubuğu aracılığıyla geçiş yapılabilir.

| Fare ayarları | Mod seçimi |
| --------------- | -------------------------------------------------------- |
| ![](images/touch_mode_icon_en.png?width=300px) | ![](images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
`Fare modunda`, uzaktaki cihazın `Sağ Fare` düğmesini aynı zamanda `İki Parmak Dokunuşu` ile tetikleyebilirsiniz.
{{% /notice %}}

### Dosya Aktarımı (Android)

> RustDesk 1.1.9+ gereklidir.

Ev sayfasındaki cihaz listesinden cihazı seçin.

Listede bir dosya veya klasöre uzun basın veya sağdaki menüye dokunun ve `Dosya Aktarımı`nı seçin.

| Ev | Başarıyla bağlandı |
| --------------- | -------------------------------------------------------- |
| ![](images/connection_home_file_en.jpg?width=300px) | ![](images/file_connection_en.jpg?width=300px) |

- İlk dizin, cihazın Ana dizinidir, `Ev`e hızlı dönmek için <i class="fas fa-home"></i> simgesine tıklayabilirsiniz.
- Başlık çubuğunun altında dizin seviyesi bulunur, ilgili klasöre hızlıca gitmek için ilgili klasörü tıklayabilirsiniz.
- <i class="fas fa-arrow-up"></i> simgesine tıklayarak üst dizine erişebilirsiniz.
- Listenin altında mevcut mutlak yol ve proje istatistikleri görüntülenecektir.
- Başlık çubuğunda `Yerel` / `Uzak`e geçmek için tıklayabilirsiniz.

#### Nasıl dosya transferi yapılır?

1. Listede bir dosyayı veya klasörü **uzun basın** ve hızlı bir şekilde **çoklu seçim moduna** girmek için seçim yapın.
2. Dosya(ları) seçtikten sonra `yerel` / `uzak` sayfasına geçin. Geçiş yaptıktan sonra, ekranda altta `Buraya Yapıştır?` iletisini göreceksiniz.
3. Resimdeki yapıştırma dosyası simgesine tıklayarak seçilen öğeleri hedef dizine aktarabilirsiniz.

| Çoklu Seçim Modu | Dosya Yapıştır |
| --------------- | -------------------------------------------------------- |
| ![](images/file_multi_select_en.jpg?width=300px) | ![](images/file_copy_en.jpg?width=300px) |

### Kimlik/Röle Sunucusu Ayarı

1. Alt gezinme çubuğunda `Ayarlar`a tıklayın.
2. `Kimlik/Röle Sunucusu`na tıklayın.
3. `Kimlik Sunucusu` alanına kimlik sunucu ana makine adını / IP Adresini girin. `Röle Sunucusu` ve `API Sunucusu` boş bırakın ve `Anahtar` alanına kamusal anahtarınızı (isteğe bağlı, şifreleme için gereklidir) girin. Ayarlarınızı kaydetmek için **Tamam** düğmesine basın. Otomatik olarak belirtilen sunuca geçiş yapılacaktır.

Ayrıca bir QR Kodu tarayarak da yapılandırabilirsiniz. QR Kodu oluşturmak için aşağıdaki formattan yararlanın (kendi `ana bilgisayar` ve `anahtar` değerlerinizi girin):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Daha sonra bir [Çevrimiçi QR Kodu Oluşturucu](https://www.qr-code-generator.com/) gidin ve yukarıdaki kodu yapıştırın.

Aşağıdaki resim, Android'den alınan bir ekran görüntüsüdür. Eğer iOS ise, lütfen ana sayfadaki sağ üst menüyü kontrol edin.

![](images/id_setting_en.jpg?width=300px)

### Android Telefonunuzun Ekran/Dosyalarını Paylaşın

Sürüm 1.1.9'dan itibaren, Android istemcisi telefon ekranını paylaşma ve telefon dosya sistemini paylaşma işlevlerini eklemiştir.

- Ekran paylaşımı için Android 6 ve üstü gereklidir.
- Dahili sesi paylaşmak için Android 10 veya üstü gereklidir.
- iOS henüz ekran paylaşımını desteklememektedir.

#### İzinleri İsteyin ve Hizmetleri Başlatın

Alt gezinme çubuğundan `Ekran Paylaşımı`na tıklayın.

Gerektiğinde çeşitli izinleri yapılandırın. Her seferinde RustDesk'i başlattığınızda "Ekran Yakalama" ve "Giriş Kontrolü" izinlerini tekrar istemeniz gerekmektedir.

![](images/server_off_en.jpg?width=300px)

| İzinler | Açıklama |
| -- | -- |
| Ekran Yakalama | Ekran yakalama paylaşım iznini etkinleştirip etkinleştirmemeye karar verir, izleme hizmeti başlatıldığında ayn

ı anda etkinleştirilir |
| Giriş Kontrolü* | Denetleyicinin, fare ile sanal dokunmatik ekran işlemi gibi mobil cihazın girişini kontrol etmesine izin verip vermeyeceğine karar verir |
| Dosya aktarımı* | Dosya aktarım iznini etkinleştirip etkinleştirmemeye karar verir, başlatıldığında bu telefonun dosya sistemini uzaktan kontrol edebilirsiniz |
| Ses yakalama | Telefonun iç sistem müziğini paylaşılıp paylaşılmayacağı (mikrofon girişi değil) |

{{% notice note %}}
Yukarıdaki * özel izinleri temsil eder. Bu tür izinlere sahip olmak için manuel olarak Android sistem ayarlar sayfasına gitmeniz gerekmektedir. Ayrıntılar aşağıda açıklanmıştır.
{{% /notice %}}

#### **Özel İzin İsteği - Dosya**

| Android dosya izinlerini isteme, otomatik olarak sistem ayarları sayfasına geçecektir |
| :---------------: |
| ![](images/get_file_en.jpg?width=300px) |

#### **Özel İzin İsteği - fare girişi**
| Adım 1 "Yüklü Hizmetler"i Bulun | Adım 2 RustDesk Girişini Başlatın |
| -- | -- |
| ![](images/get_input1_en.jpg?width=300px) | ![](images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Farklı üreticilerin sistem ayar sayfaları farklı olabilir, lütfen kendi sistem sayfanıza göre ayarlayın.
{{% /notice %}}

**Uzaktan fare kontrolü kısayolları:**

- Sağ fare düğmesine tıklama: geri gitme
- Fare tekerleğine tıklama: Ana Ekran
- Fare tekerleğini uzun basın: en son açılan uygulamalar
- Fare tekerleği kaydırma: dikey kaydırma simülasyonu

#### **Hizmeti Başlat**

`Ekran yakalama` iznini aldıktan sonra hizmet otomatik olarak başlatılacaktır. Ayrıca hizmeti başlatmak için `Hizmeti Başlat` düğmesine tıklayabilirsiniz. Hizmet başlatıldıktan sonra, başka cihazlardan masaüstü kontrol taleplerini kabul edebilir.

`Dosya aktarımı` izni etkinleştirilirse, başka cihazlardan dosya kontrol taleplerini kabul edebilir.

Hizmet başlatıldıktan sonra, bu cihaz için benzersiz bir kimlik ve rastgele bir parola otomatik olarak alınır. Diğer cihazlar, kimlik ve parola aracılığıyla telefona kontrol edebilir veya yeni bir talep alındığında manuel olarak onaylayabilir.

| Hizmeti başlatmadan önce | Hizmet başlatıldıktan sonra |
| -- | -- |
| ![](images/server_off_en.jpg?width=300px) | ![](images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. `Hizmeti Başlat`a tıklamak, `Ekran yakalama` iznini varsayılan olarak etkinleştirir.
2. `Ekran yakalama` izni alınmadığında, diğer cihazlar kontrol talepleri gönderemez.
3. `Ekran yakalama` izni dışında diğer izinlerin geçişi sadece yeni bağlantıları etkiler ve mevcut bağlantıları etkilemez. Etkin bir bağlantı için izinleri değiştirmeniz gerekiyorsa, önce mevcut bağlantıyı kapatın, izinleri değiştirin ve sonra kontrol talebi alın.
{{% /notice %}}

##### Bilgisayar (PC)

![](images/android_server_pc_side_en.png?width=700px)

##### Mobil terminal

| Hizmeti istediğiniz zaman durdurabilir veya belirli bir bağlantıyı kapatabilirsiniz | Sohbet alabilir veya başlatabilirsiniz |
| -- | -- |
| ![](images/server_on_en.jpg?width=300px) | ![](images/android_server2_en.jpg?width=300px) |
