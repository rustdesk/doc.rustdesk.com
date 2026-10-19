---
title: Yönetici Rolü (Admin Role)
weight: 17
description: "RustDesk Server Pro'da kullanıcılar, cihazlar, stratejiler, kontrol rolleri ve konsol kaynakları genelinde kapsamlı yönetim izinleri atamak için Yönetici Rollerinden yararlanın."
keywords: ["rustdesk yönetici rolü", "rustdesk devredilmiş yönetici", "rustdesk server pro izinleri", "rustdesk rol yönetimi", "rustdesk web konsol rolleri"]
---

Tam yönetici ayrıcalıkları vermeden RustDesk Server Pro'da kısmi yönetim erişimi devretmeniz gerektiğinde Yönetici Rollerinden (Admin Roles) yararlanın.

Yönetici Rolü, yöneticilerin yönetici olmayan kullanıcılara kısmi yönetim izinleri devretmesine olanak tanır. Genel kaynaklar (stratejiler, kontrol rolleri ve özel istemciler gibi) ile farklı kapsamlardaki kullanıcılar ve cihazlar için izinler tanımlayabilirsiniz.

Bir kullanıcıya Yönetici Rolü atandıktan sonra, verilen izinlere bağlı olarak web konsolunda ilgili sayfaları ve menüleri görür.

## Bir Yönetici Rolünü ne zaman kullanmalısınız?

Birinin tam yönetici olmadan RustDesk ortamınızın bir kısmını yönetmesi gerektiğinde Yönetici Rolü kullanın. Bu; yardım masası liderleri, bölgesel BT ekipleri, cihaz sahipleri veya filonun yalnızca bir bölümünü yönetmesi gereken grup kapsamındaki operatörler için doğru modeldir.

## Yönetici Rolü hızlı yanıtlar

- Yönetici Rolleri konsol yönetim izinlerini devreder
- Tam yönetici hesaplarının yerini almazlar
- Bir kullanıcı aynı anda birden fazla Yönetici Rolüne sahip olabilir
- Geçerli izin kümesi, atanan tüm Yönetici Rollerinin birleşimidir
- Yönetimin yalnızca seçilen gruplarla sınırlı kalması gerektiğinde Grup Kapsamlı (Group Scoped) roller doğru seçenektir

## Yöneticiler ve Yönetici Rolleri Karşılaştırması

- Yalnızca yöneticiler Yönetici Rollerini düzenleyebilir ve kullanıcılara atayabilir.
- Yöneticilere Yönetici Rolleri atanabilse de, yöneticiler bu roller tarafından kısıtlanmaz.
- Yönetici olmayan kullanıcılar, genel Kullanıcı İzinleri verilmiş olsa bile yönetici hesaplarını düzenleyemez.

## Rol Türleri

Yönetici Rolleri, her biri farklı kapsama ve kullanılabilir izinlere sahip üç türe ayrılır:

| Tür | Açıklama |
|------|-------------|
| **Genel (Global)** | Tüm ekip genelindeki tüm kaynakları yönetebilir |
| **Bireysel (Individual)** | Yalnızca kullanıcının kendi cihazlarını ve denetim günlüklerini yönetebilir |
| **Grup Kapsamlı (Group Scoped)** | Belirtilen gruplar içindeki kullanıcıları ve cihazları yönetebilir |

### Grup Kapsamı Hakkında

| Seçilen izinler | Uygulandığı alan |
|-------|-------------|
| **Kullanıcı İzinleri** | Seçilen kullanıcı grupları içindeki kullanıcılara uygulanır |
| **Cihaz İzinleri** | Şunlardaki cihazlara uygulanır: <ul><li>Seçilen cihaz grupları</li><li>Seçilen kullanıcı gruplarındaki kullanıcılara atanan cihazlar</li><li>Atanmamış cihazlar (etkinleştirilmişse)</li></ul> |

İzinleri ve kapsamı daha net hale getirmek için Grup Kapsamlı bir rolde yalnızca Kullanıcı İzinlerini veya yalnızca Cihaz İzinlerini seçebilirsiniz. Örneğin, yalnızca Kullanıcı İzinlerini seçmek herhangi bir cihaz erişimi olmadan kullanıcıları yönetmeye izin verirken, yalnızca Cihaz İzinlerini seçmek kapsam olarak kullanıcı gruplarını, cihaz gruplarını veya atanmamış cihazları seçerek cihazları yönetmeye olanak tanır.

## İzin Kuralları

### Herhangi bir Düzenleme İzni, İlgili Görüntüleme İznini İçerir

Herhangi bir düzenleme izni otomatik olarak ilgili görüntüleme iznini de içerir. Örneğin, "Cihazları Etkinleştir/Devre Dışı Bırak" izni "Cihazları Görüntüle" iznini içerir.

### Düzenleme İzni Atamayı İçermez

Kaynaklar (Kullanıcı Grupları, Cihaz Grupları, Stratejiler, Kontrol Rolleri) için düzenleme izinleri yalnızca kaynakların kendilerini düzenlemeye izin verir; bunları kullanıcılara veya cihazlara atamaya izin vermez.

Örneğin, "Cihaz Gruplarını Düzenle" izni cihaz grupları oluşturmaya ve değiştirmeye izin verir, ancak gruplara cihaz eklemek veya kaldırmak için "Cihazlar Grubunu Güncelle" iznine ihtiyacınız vardır.

### Görüntüleme İzni Üyeleri İçermez

Kaynaklar için görüntüleme izinleri yalnızca kaynakların kendilerini görüntülemeye izin verir, içlerindeki üyeleri görüntülemeye izin vermez.

Örneğin, "Cihaz Gruplarını Görüntüle" izni cihaz grupları listesini görüntülemeye izin verir, ancak bir gruptaki cihazları görüntülemek için "Cihazları Görüntüle" iznine veya herhangi bir cihaz düzenleme iznine ihtiyacınız vardır. Cihaz izni genel ise gruptaki tüm cihazları görebilirsiniz; grup kapsamlı veya bireysel ise yalnızca izin verilen kapsamınızdaki cihazları görebilirsiniz.

{{% notice note %}}
Adres defterleri için cihazları okumak Yönetici Rolleri tarafından kısıtlanmaz. İstemcideki erişilebilir cihazlar eşler sekmesi yalnızca konsoldaki **Ayarlar → Diğerleri → Erişilebilir cihazları almayı devre dışı bırak** seçeneğiyle denetlenir ve Yönetici Rolleri tarafından kısıtlanmaz.
{{% /notice %}}

## Konsol İşlemleri

### Rol Oluşturma

1. **Yönetici Rolleri** sayfasına gidin ve **Oluştur**'a tıklayın
2. Rol için bir **Ad** girin
3. Bir **Tür** seçin (**Grup Kapsamlı** için kapsamı da yapılandırın)
4. Verilecek **İzinleri** seçin

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Rol Atama

Kullanıcılara Yönetici Rolleri atamanın iki yolu vardır:

1. **Kullanıcılar sayfası** → Bir kullanıcıda **Düzenle**'ye tıklayın → **Yönetici Rolleri** alanında rolleri seçin
2. **Yönetici Rolleri sayfası** → **Kullanıcı sayısı**na veya **Kullanıcı Ata**'ya tıklayın → Role kullanıcı ekleyin veya rolden çıkarın

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Bir kullanıcıya atanmış birden fazla Yönetici Rolü olabilir. Atanan tüm rollerin izinleri birleştirilir (tüm izinlerin birleşimi).
{{% /notice %}}

## İzin Referansı

### Genel İzinler (Global Permissions)

| İzin | Açıklama |
|------------|-------------|
| Users-View | Tüm kullanıcıların liste bilgilerini okur. |
| Users-Create | Doğrudan yönetici olmayan kullanıcılar oluşturur. |
| Users-Invite | Kullanıcıları e-posta yoluyla davet eder. |
| Users-Delete | Yönetici olmayan herhangi bir kullanıcıyı siler. Kullanıcılar silinmeden önce devre dışı bırakılmalıdır. |
| Users-Enable/Disable | Yönetici olmayan herhangi bir kullanıcıyı etkinleştirir veya devre dışı bırakır. |
| Users-Edit Email | Yönetici olmayan herhangi bir kullanıcının e-postasını değiştirir. |
| Users-Edit Password | Yönetici olmayan herhangi bir kullanıcının parolasını değiştirir. |
| Users-Edit Note | Yönetici olmayan herhangi bir kullanıcının notunu değiştirir. |
| Users-Manage 2FA | Yönetici olmayan herhangi bir kullanıcı için oturum açma doğrulamasını yönetir (2FA zorunluluğunu açma/kapatma, 2FA yapılandırmasını sıfırlama, e-posta doğrulamasını kapatma). |
| Users-Force Logout | Yönetici olmayan herhangi bir kullanıcının tüm cihazlardaki oturumunu zorla kapatır. |
| Users-Update Group | Yönetici olmayan herhangi bir kullanıcının grubunu değiştirir. |
| Users-Update Strategy | Yönetici olmayan herhangi bir kullanıcının stratejisini değiştirir. |
| Users-Update Control Role | Yönetici olmayan herhangi bir kullanıcının kontrol rolünü değiştirir. |
| Devices-View | Tüm cihazların liste bilgilerini okur. |
| Devices-Enable/Disable | Herhangi bir cihazı etkinleştirir veya devre dışı bırakır. |
| Devices-Delete | Herhangi bir cihazı siler. Cihazlar silinmeden önce devre dışı bırakılmalıdır. |
| Devices-Edit Info | Herhangi bir cihaz için cihaz adını, cihaz kullanıcı adını (RustDesk kullanıcısı değil, sistem kullanıcı adı) ve notunu düzenler. |
| Devices-Assign to User | Herhangi bir cihazı herhangi bir kullanıcıya atar. |
| Devices-Update Group | Herhangi bir cihazın grubunu değiştirir. |
| Devices-Update Strategy | Herhangi bir cihazın stratejisini değiştirir. |
| User Groups-View | Tüm kullanıcı gruplarının liste bilgilerini okur. Kullanıcıları Görüntüle izni varsa grup üyelerini görebilir. |
| User Groups-Edit | Kullanıcı grupları oluşturur, düzenler ve siler; grup üyelerini güncellemeyi içermez. |
| Device Groups-View | Tüm cihaz gruplarının liste bilgilerini okur. Cihazları Görüntüle izni varsa grup üyelerini görebilir. |
| Device Groups-Edit | Cihaz grupları oluşturur, düzenler ve siler; grup üyelerini güncellemeyi içermez. Strateji Güncelleme iznini içerir. |
| Device Groups-Update Strategy | Herhangi bir cihaz grubunun stratejisini değiştirir. |
| Audit Logs-View | Tüm günlükleri okur. Notları düzenleyebilir. "Yalnızca yönetici günlüklere erişebilir" seçeneği etkin olduğunda bile geçerlidir. |
| Audit Logs-Edit | Çalışan herhangi bir aktif bağlantıyı sonlandırabilir. |
| Strategies-View | Herhangi bir stratejiyi okur. İlgili görüntüleme izinleri varsa kullanıcılar, cihazlar ve cihaz grupları için stratejileri görebilir. |
| Strategies-Edit | Stratejiler oluşturur, düzenler ve siler. |
| Control Roles-View | Herhangi bir kontrol rolünü okur. |
| Control Roles-Edit | Kontrol rolleri oluşturur, düzenler ve siler. |
| Custom Clients-View | Özel istemciler listesini okur. Derlenmiş özel istemcileri indirebilir. |
| Custom Clients-Edit | Özel istemciler oluşturur, düzenler ve siler. |

### Bireysel İzinler (Individual Permissions)

| İzin | Açıklama |
|------------|-------------|
| Devices-View | Kullanıcının kendi cihazlarının liste bilgilerini okur. |
| Devices-Enable/Disable | Kullanıcının kendi cihazlarını etkinleştirir veya devre dışı bırakır. |
| Devices-Delete | Kullanıcının kendi cihazlarını siler. Cihazlar silinmeden önce devre dışı bırakılmalıdır. |
| Devices-Edit Info | Kullanıcının kendi cihazları için cihaz adını, cihaz kullanıcı adını ve notunu düzenler. |
| Devices-Update Strategy | Kullanıcının kendi cihazlarının stratejisini değiştirir. |
| Audit Logs-View | Kişisel günlükleri okur. Notları düzenleyebilir. |
| Audit Logs-Edit | Kişisel aktif bağlantıları sonlandırabilir. |

### Grup Kapsamlı İzinler (Group Scoped Permissions)

| İzin | Açıklama |
|------------|-------------|
| Users-View | Seçilen kullanıcı grupları içindeki kullanıcıların liste bilgilerini okur. |
| Users-Create | Seçilen kullanıcı grupları içinde yönetici olmayan kullanıcılar oluşturur. |
| Users-Invite | Seçilen kullanıcı grupları içinde e-posta yoluyla kullanıcıları davet eder. |
| Users-Delete | Seçilen kullanıcı grupları içindeki yönetici olmayan kullanıcıları siler. |
| Users-Enable/Disable | Seçilen kullanıcı grupları içindeki yönetici olmayan kullanıcıları etkinleştirir veya devre dışı bırakır. |
| Users-Edit Email | Seçilen kullanıcı grupları içindeki yönetici olmayan kullanıcıların e-postasını değiştirir. |
| Users-Edit Password | Seçilen kullanıcı grupları içindeki yönetici olmayan kullanıcıların parolasını değiştirir. |
| Users-Edit Note | Seçilen kullanıcı grupları içindeki yönetici olmayan kullanıcıların notunu değiştirir. |
| Users-Manage 2FA | Seçilen kullanıcı grupları içindeki kullanıcılar için giriş doğrulamasını yönetir. |
| Users-Force Logout | Seçilen kullanıcı grupları içindeki kullanıcıların tüm cihazlardaki oturumunu zorla kapatır. |
| Users-Update Strategy | Seçilen kullanıcı grupları içindeki kullanıcıların stratejisini değiştirir. |
| Users-Update Control Role | Seçilen kullanıcı grupları içindeki kullanıcıların kontrol rolünü değiştirir. |
| Devices-View | Mevcut rol tarafından yönetilen cihazların liste bilgilerini okur. |
| Devices-Enable/Disable | Mevcut rol tarafından yönetilen cihazları etkinleştirir veya devre dışı bırakır. |
| Devices-Delete | Mevcut rol tarafından yönetilen cihazları siler. |
| Devices-Edit Info | Mevcut rol tarafından yönetilen cihazlar için cihaz adı, kullanıcı adı ve notu düzenler. |
| Devices-Update Strategy | Mevcut rol tarafından yönetilen cihazların stratejisini değiştirir. |
