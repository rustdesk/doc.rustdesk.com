---
title: Denetim Günlükleri (Audit Logs)
weight: 19
description: "Bağlantı, dosya aktarımı, konsol işlemleri ve güvenlik alarmlarını incelemek için RustDesk Server Pro web konsolundaki Denetim Günlüklerini kullanın."
keywords: ["rustdesk denetim günlükleri", "rustdesk server pro günlükleri", "rustdesk bağlantı günlükleri", "rustdesk dosya aktarım günlükleri", "rustdesk alarm günlükleri", "rustdesk konsol denetimi"]
---

RustDesk Server Pro web konsolundaki Denetim Günlükleri (Audit Logs); yöneticilerin uzaktan erişim etkinliğini, dosya aktarım hareketlerini, yönetimsel değişiklikleri ve güvenlik alarmlarını incelemesine yardımcı olur.

Web konsolunu açın, ardından sol menüden **Günlükler** (Logs) bölümüne gidin. Günlükler bölümü şunları içerir:

- **Bağlantı (Connection)**
- **Dosya (File)**
- **Konsol (Console)**
- **Alarm**

## Bağlantı günlükleri

Uzak oturumları ve ilgili bağlantı türlerini incelemek için **Günlükler > Bağlantı** bölümüne gidin.

Bağlantı günlükleri şunları gösterir:

- **Tür**: Uzak Masaüstü, Dosya Aktarımı, Port Yönlendirme, Kamera Görüntüleme, Terminal veya Giriş Yapılmadı. **Giriş Yapılmadı**, kimlik doğrulamasının başarılı olmadığı anlamına gelir.
- **Kontrol Edilen Cihaz**: Hedef cihaz kimliği (ID) ve adı.
- **Kontrol Eden Taraf**: Kontrol eden taraf oturum açtığında kontrol eden kullanıcı, ayrıca kontrol eden cihaz, cihaz adı ve IP adresi.
- **Başlangıç Zamanı**, **Bitiş Zamanı** ve **Süre**.
- **Kimlik Doğrulama**: Birincil kimlik doğrulama yöntemi ve ardından isteğe bağlı 2FA bilgisi.
- **Not**.

![Bağlantı günlükleri sayfası](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Desteklenen birincil kimlik doğrulama değerleri şunlardır:

- Tıklama Onayı (Click Confirmation)
- Tek Kullanımlık Parola (One-time Password)
- Kalıcı Parola (Permanent Password)
- Tarafları Değiştir (Switch Sides)

Desteklenen 2FA değerleri şunlardır:

- 2FA Kodu
- Güvenilen Cihaz

### Bağlantı notları

Kontrol eden taraf bir bağlantıya iki şekilde not ekleyebilir:

- Uzak oturum sırasında, bağlantı notunu eklemek veya güncellemek için uzak menüdeki **Not** eylemini kullanın.

![Bağlantı notu kutusu](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- Uzak oturumun sonunda, oturum bittiğinde RustDesk'in bir not istemesini istiyorsanız kontrol eden tarafta **Ayarlar > Genel > Diğer > Bağlantı sonunda Not Sor** seçeneğini etkinleştirin.

![Bağlantı kapatma not kutusu](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

Not, **Günlükler > Bağlantı** bölümündeki **Not** sütununda gösterilir. Bağlantı günlüğünü görüntüleyebilen kullanıcılar, notu web konsolundan güncellemek için **Not** sütunundaki düzenleme düğmesini de kullanabilir.

### Çalışan bir bağlantıyı sonlandırma

Bir bağlantı hâlâ çalışıyorsa ve hesabınızın bu denetim öğesini düzenleme izni varsa, **Eylem** (Action) sütununda **Bağlantıyı Kes** (Disconnect) seçeneği görünür. Çalışan bağlantıyı sonlandırmak için bu seçeneğe tıklayın ve işlemi onaylayın.

![Bağlantıyı kesme onayı](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Bağlantı web konsolundan kesildikten sonra, kontrol eden taraf bağlantının web konsolundan kesildiğini belirten bir mesaj görür.

![Konsol tarafından bağlantı kesildi mesajı](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Dosya aktarımı günlükleri

Dosya aktarım etkinliğini incelemek için **Günlükler > Dosya** bölümüne gidin.

![Dosya aktarım günlükleri sayfası](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Dosya aktarım günlükleri hem özel **Dosya Aktarımı** oturumlarındaki dosya işlemlerini hem de **Uzak Masaüstü** oturumları sırasındaki dosya kopyalama/yapıştırma işlemlerini içerir.

Dosya aktarım günlükleri şunları gösterir:

- **Kontrol Edilen Cihaz**.
- **Kontrol Eden Taraf**: Kontrol eden cihaz ve mevcut olduğunda kontrol eden kullanıcı.
- **Zaman**.
- **Yön**:
  - Kontrol Edilen Cihaz -> Kontrol Eden Taraf
  - Kontrol Eden Taraf -> Kontrol Edilen Cihaz
- **Dosya**: Kontrol edilen cihazdaki dosya yolu.
- **Ayrıntı**: Tek bir dosya için dosya boyutu veya çoklu dosya aktarımları için dosya sayısı.

Çoklu dosya aktarımlarında, ayrıntı çekmecesini açmak için **Ayrıntı** sütunundaki dosya sayısına tıklayın. Aktarım çekmecenin listelediğinden daha fazla dosya içerdiğinde, çekmece boyuta göre en büyük 10 dosyayı gösterir.

![Dosya aktarım ayrıntıları](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Alarm günlükleri

Güvenlikle ilgili olayları incelemek için **Günlükler > Alarm** bölümüne gidin.

![Alarm günlükleri sayfası](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Alarm günlükleri şunları gösterir:

- **Tür**.
- **Kaynak (From)**: Giriş hesabı alarmları için bu giriş yapan cihazdır. Uzak bağlantı alarmları için bu kontrol eden taraftır.
- **Hedef (Target)**: Giriş hesabı alarmları için bu giriş hesabıdır. Uzak bağlantı alarmları için bu kontrol edilen cihazdır.
- **Olay Zamanı**.

Uzak bağlantı alarmı türleri şunları içerir:

- IP beyaz listesi dışından erişim girişimi
- 30'un üzerinde ardışık erişim girişimi
- Bir dakika içinde birden fazla erişim girişimi
- Tek bir IPv6 önekinden çok fazla ardışık erişim girişimi
- Birden fazla başarısız Terminal (Yönetici olarak çalıştır) oturum açma denemesi (yanlış kullanıcı adı/parola)
- Birden fazla eşzamanlı Terminal (Yönetici olarak çalıştır) oturum açma denemesi
- Oturum kapsamı ihlali

Giriş hesabı alarmı türleri şunları içerir:

- 30'un üzerinde ardışık giriş denemesi
- Bir dakika içinde birden fazla giriş denemesi
- Bir saat içinde birden fazla giriş denemesi

## Konsol işlem günlükleri

Web konsolunda gerçekleştirilen eylemleri incelemek için **Günlükler > Konsol** bölümüne gidin.

![Konsol işlem günlükleri sayfası](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Konsol günlükleri şunları gösterir:

- **Tür**.
- **Kullanıcı**: İşlemi gerçekleştiren web konsolu kullanıcısı.
- **İşlem**: Gerçekleştirilen eylem.
- **Zaman**.
- **Ayrıntı**: İşlem için kaydedilen ekstra alanlar.

Türler şunları içerir:

- Grup Yönetimi
- Kullanıcı Yönetimi
- Cihaz Yönetimi
- Adres Defteri Yönetimi
- Yönetici Rolleri Yönetimi
- Kontrol Rolleri Yönetimi

İzlenen işlemler arasında kullanıcı girişi, kullanıcı ve cihaz değişiklikleri, bir cihazın bağlantısını kesme, adres defteri değişiklikleri, 2FA değişiklikleri, parola sıfırlama, yönetici/kontrol rolü değişiklikleri vb. yer alır.

## Günlük görünürlüğü ve saklama süresi

Günlük görünürlüğü; kullanıcının yönetici olup olmadığına, kullanıcının Denetim Günlükleri izinlerine sahip bir [Yönetici Rolü](/docs/tr/self-host/rustdesk-server-pro/admin-role/)'ne sahip olup olmadığına ve **Ayarlar > Diğerleri** bölümündeki ayara bağlıdır.

| Kullanıcı türü veya ayar | Günlük görünürlüğü |
| --- | --- |
| Yönetici | Tüm denetim günlüklerini görüntüleyebilir. |
| **Genel > Audit Logs-View** izinli Yönetici Rolü | **Yalnızca yönetici günlüklere erişebilir** etkin olduğunda bile tüm denetim günlüklerini görüntüleyebilir. |
| **Bireysel > Audit Logs-View** izinli Yönetici Rolü | **Yalnızca yönetici günlüklere erişebilir** etkin olduğunda bile kişisel denetim günlüklerini görüntüleyebilir. |
| Denetim Günlükleri izni olmayan yönetici dışı kullanıcı | Yalnızca **Yalnızca yönetici günlüklere erişebilir** devre dışı bırakıldığında kişisel denetim günlüklerini görüntüleyebilir. |
| **Ayarlar > Diğerleri > Yalnızca yönetici günlüklere erişebilir** etkin | Denetim Günlükleri izni olmayan yönetici dışı kullanıcılar denetim günlüklerine erişemez. |

Kişisel günlükler; kullanıcıya atanmış bir cihazın kontrol edilen veya kontrol eden cihaz olduğu bağlantı ve dosya aktarım kayıtlarını ve kullanıcının kontrol eden olduğu kayıtları içerir. Alarm günlükleri için kişisel günlükler, kullanıcıya veya kullanıcının oturum açma hesabına atanan cihazların kayıtlarını içerir. Konsol işlem günlükleri için kişisel günlükler, kullanıcının operatör olduğu kayıtları içerir.

Denetim günlüklerinin ne kadar süreyle tutulacağını belirlemek için **Ayarlar > Diğerleri > Günlük Saklama Süresi (Gün)** ayarını kullanın. Tüm günlükleri süresiz olarak saklamak için `0` girin. Belirtilen gün sayısından daha eski günlükleri otomatik olarak silmek için `0`'dan büyük bir sayı girin. Temizleme işlemi saatte bir kez çalışır.

## Denetim günlüklerini dışa aktarma

Her günlük sayfasının araç çubuğunda **CSV olarak dışa aktar** seçeneği bulunur. Dışa aktarılan dosya, sayfadaki geçerli filtreleri takip eder ve web konsolunda gösterilen zaman değerlerini kullanır. Her dışa aktarma en fazla 1000 kayıt içerir, ancak tüm günlükleri gruplar halinde dışa aktarmak için **Başlangıç Zamanı** filtresini kullanabilirsiniz.

Denetim günlüklerini sorgulamak için `audits.py` ile birlikte bir [API belirteci (token)](/docs/tr/self-host/rustdesk-server-pro/console/#denetimler-auditspy) de kullanabilirsiniz.
