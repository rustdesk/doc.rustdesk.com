---
title: Kontrol Rolü (Control Role)
weight: 18
description: "Bağlantı kurulduktan sonra uzak operatörlerin neler yapabileceğini tanımlamak için RustDesk Server Pro'da Kontrol Rollerini yapılandırın."
keywords: ["rustdesk kontrol rolü", "rustdesk uzaktan izinler", "rustdesk server pro kontrol rolü", "rustdesk erişim kontrolü strateji farkı", "rustdesk uzaktan kontrol politikası"]
---

Bir kullanıcının RustDesk Server Pro'da uzak bir oturum sırasında neler yapmasına izin verildiğini tanımlamak için Kontrol Rollerini kullanın.

Kontrol Rolü, farklı kullanıcılar için uzaktan kontrol izinlerini yapılandırmanıza olanak tanır. Bir kullanıcı başka bir cihazı uzaktan kontrol ettiğinde, Kontrol Rolü bağlantı kurulduktan sonra kontrol eden kullanıcının hangi işlemleri gerçekleştirmesine izin verildiğini belirler.

## Kontrol Rolünü ne zaman kullanmalısınız?

Bir operatörün uzak bir cihaza bağlandıktan sonra yapabileceklerini sınırlandırmak istediğinizde Kontrol Rolü kullanın. Bu; operatörün dosya aktarıp aktaramayacağı, panoyu kullanıp kullanamayacağı, bir terminal açıp açamayacağı, uzak cihazı yeniden başlatıp başlatamayacağı veya uzak yapılandırmayı değiştirip değiştiremeyeceği gibi kararlar için doğru özelliktir.

## Kontrol Rolü hızlı yanıtlar

- Kontrol Rolleri, bir bağlantı kurulduktan sonraki oturum içi eylemleri etkiler
- Bağlantının ilk etapta kurulmasına izin verilip verilmeyeceğine karar vermezler
- Her kullanıcının yalnızca bir Kontrol Rolü olabilir
- Kontrol Rolü izinleri, kontrol edilen cihazdaki yerel izin ayarlarını geçersiz kılabilir
- Yerleşik `Giriş Yapılmadı` (Not Logged) ve `Varsayılan` (Default) rolleri, özel bir rol atanmamış kullanıcıları kapsar

{{% notice note %}}
**Kontrol Rolü vs Erişim Kontrolü vs Strateji**

- **Kontrol Rolü**: Bağlantı kurulduktan sonra kontrol eden kullanıcının hangi işlemleri yapmasına izin verildiğini belirler.
- **Erişim Kontrolü**: Kontrol eden ve kontrol edilen cihazlar arasında bir bağlantının kurulup kurulamayacağını belirler.
- **Strateji**: Kontrol edilen cihazdaki ayarları değiştirir.
{{% /notice %}}

## Gereksinimler

- Kontrol edilen cihaz: RustDesk **1.4.5** veya üzeri (Android kontrol edilen taraf henüz desteklenmemektedir)
- Kontrol eden cihaz: Sürüm gereksinimi yoktur

### Gizlilik Modu (Privacy Mode)

**Gizlilik Modu** izni, kontrol edilen cihazda RustDesk Server Pro **1.8.7** veya üzeri ve RustDesk **1.4.7** veya üzeri gerektirir. Daha eski istemciler bu izni yok sayar.

## İzin Hesaplaması

### İzinler Nasıl Çalışır?

Kısaca: Kontrol izinleri yerel ayarlardan önceliklidir.

İki izin ayarı kaynağı vardır:

- **Kontrol edilen taraftaki Yerel Ayarlar**: Kontrol edilen cihazın ayarları (Ayarlar → Güvenlik → İzinler)
- **Kontrol İzni**: Kontrol eden kullanıcının Kontrol Rolü izinleri (web konsolunda yapılandırılır)

Her iznin üç durumu vardır:

- **İstemci Ayarlarını Kullan**: Geçersiz kılma yok, kontrol edilen cihazın yerel ayarını kullan
- **Etkinleştir**: Bu izni açıkça etkinleştir (yerel ayarı geçersiz kılar)
- **Devre Dışı Bırak**: Bu izni açıkça devre dışı bırak (yerel ayarı geçersiz kılar)

İzinler oturum düzeyinde hesaplanır:

| Kontrol İzni | Yerel Ayarlar | Sonuç |
|---|---|---|
| Etkinleştir | Etkinleştir | Etkin |
| Etkinleştir | Devre Dışı | **Etkin** |
| Devre Dışı | Etkin | **Devre Dışı** |
| Devre Dışı | Devre Dışı | Devre Dışı |
| İstemci Ayarlarını Kullan | Etkin | Etkin |
| İstemci Ayarlarını Kullan | Devre Dışı | Devre Dışı |

**Özel durum: Uzaktan Yapılandırma Değişikliği**

Aynı cihaza birden fazla kontrol eden kullanıcı bağlandığında, "Uzaktan Yapılandırma Değişikliği" izni tüm bağlantılar genelinde hesaplanır:

| Tüm Bağlantıların Kontrol İzni | Sonuç |
|---|---|
| Herhangi bir Devre Dışı | **Devre Dışı** |
| Devre Dışı Yok, Herhangi bir Etkin | **Etkin** |
| Tümü İstemci Ayarlarını Kullan | Yerel ayarı kullan |

### Hangi Rol Uygulanır?

Her kullanıcıya yalnızca bir Kontrol Rolü atanabilir. İki yerleşik rol vardır:

| Rol | Açıklama |
|------|-------------|
| **Not Logged (Giriş Yapılmadı)** | Oturum açmamış kontrol eden kullanıcılar içindir. Kullanıcılara atanamaz. |
| **Default (Varsayılan)** | Kendisine atanmış bir Kontrol Rolü bulunmayan veya açıkça Varsayılan role atanmış oturum açmış kullanıcılar içindir. |

Uygulanan Kontrol Rolü, kontrol eden kullanıcının oturum açma durumuna ve rol atamasına bağlıdır:

| Kontrol Eden Kullanıcı Durumu | Atanan Rol | Hangi Rol / Rol Durumu | Uygulanan Kontrol Rolü |
|---|---|---|---|
| Giriş yapılmadı | - | Not Logged / Etkin | Not Logged |
| Giriş yapılmadı | - | Not Logged / Devre Dışı | - |
| Giriş yapıldı | Atanmış rol var | Atanmış rol / Etkin | Atanmış rol |
| Giriş yapıldı | Atanmış rol var | Atanmış rol / Devre Dışı | - |
| Giriş yapıldı | Atanmış rol yok | Default / Etkin | Default |
| Giriş yapıldı | Atanmış rol yok | Default / Devre Dışı | - |

## Kullanılabilir İzinler

Kontrol edilebilen 13 izin, kontrol edilen cihazın Ayarlar → Güvenlik → İzinler bölümüne karşılık gelir:

- Klavye/Fare
- Uzak Yazıcı
- Pano
- Dosya Aktarımı
- Ses
- Kamera
- Terminal
- TCP Tüneli
- Uzaktan Yeniden Başlatma
- Oturum Kaydetme
- Kullanıcı Girişini Engelleme
- Uzaktan Yapılandırma Değişikliği
- Gizlilik Modu

## Konsol İşlemleri

### Rol Oluşturma

1. **Kontrol Rolleri** sayfasına gidin ve **Oluştur**'a tıklayın
2. Rol için bir **Ad** girin
3. Verilecek **İzinleri** seçin

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Rol Atama

Kullanıcılara Kontrol Rolleri atamanın iki yolu vardır:

1. **Kullanıcılar sayfası** → Bir kullanıcıda **Düzenle**'ye tıklayın → **Kontrol Rolü** alanında bir rol seçin
2. **Kontrol Rolleri sayfası** → **Kullanıcı sayısı**na veya **Kullanıcı Ata**'ya tıklayın → Role kullanıcı ekleyin veya rolden çıkarın

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
"Not Logged" rolü kullanıcılara atanamaz (yalnızca oturum açılmamış bağlantılar için geçerlidir).
{{% /notice %}}
