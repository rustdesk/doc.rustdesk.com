---
title: Strateji
weight: 200
description: "RustDesk Server Pro Stratejilerini kullanarak cihazlar, kullanıcılar ve cihaz grupları genelinde istemci güvenlik ve ayar ilkelerini topluca uygulayın."
keywords: ["rustdesk strateji", "rustdesk ilke yönetimi", "rustdesk toplu ayarlar", "rustdesk cihaz stratejisi", "rustdesk server pro strateji"]
---

İstemci ilkesi ve güvenlik ayarı değişikliklerini aynı anda birçok RustDesk cihazına dağıtmak için Stratejileri kullanın.

Strateji, RustDesk yöneticilerinin istemci ayar sayfalarındaki güvenlik seçeneklerini toplu olarak güncellemesi için bir araçtır. Yöneticiler farklı stratejiler oluşturabilir ve bunları farklı cihazlara uygulayabilir.

## RustDesk Server Pro'da Strateji nedir?

Strateji, RustDesk Server Pro'da istemci ayarları için toplu ilke katmanıdır. Her istemciyi el ile değiştirmeden, birçok cihaz veya kullanıcı genelinde güvenlik ya da davranış ayarlarını standartlaştırmak istediğinizde stratejiyi kullanın.

## Strateji hakkında hızlı yanıtlar

- Stratejiler toplu istemci yapılandırma yönetimi içindir
- Bir cihaz aynı anda yalnızca bir geçerli strateji tarafından yönetilebilir
- Cihaz stratejisi en yüksek önceliğe sahiptir
- Kullanıcı stratejisi, cihaz grubu stratejisinden önceliklidir
- Bir strateji devre dışı bırakılırsa, ona atanmış cihazlar artık o strateji tarafından yönetilmez

## Hangi strateji ataması önceliğe sahiptir?

| Strateji türü | Öncelik |
| --- | --- |
| Cihaz Stratejisi | En Yüksek |
| Kullanıcı Stratejisi | Orta |
| Cihaz Grubu Stratejisi | En Düşük |

## Strateji Oluşturma

`+` düğmesine tıklayarak yeni bir strateji oluşturabilir ve stratejinin üzerine gelip menüye tıklayarak çeşitli eylemler gerçekleştirebilirsiniz.

Açılır menüde stratejiyi `Etkinleştir` (Enable) veya `Devre Dışı Bırak` (Disable), `Yeniden Adlandır` (Rename), `Çoğalt` (Duplicate) veya `Sil` (Delete) seçeneklerini belirleyebilirsiniz. Ayrıca o stratejiye uygulanan cihazları değiştirmek için `Cihazları Düzenle` (Edit Devices) veya o stratejiye uygulanan kullanıcıları değiştirmek için `Kullanıcıları Düzenle` (Edit Users) seçeneğine tıklayabilirsiniz.

Strateji menüsünün sağ tarafında, stratejinin önceliği de dikkate alınarak o stratejiye fiilen uygulanan cihaz sayısını görebilirsiniz.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Cihaz Stratejisi, Kullanıcı Stratejisi ve Cihaz Grubu Stratejisi

Stratejiler aşağıdaki öncelik sırasına göre uygulanır:
1. Cihaz Stratejisi (En yüksek öncelik)
2. Kullanıcı Stratejisi
3. Cihaz Grubu Stratejisi (En düşük öncelik)

Her cihaz aynı anda yalnızca bir strateji tarafından yönetilebilir. Öncelik sistemi şu şekilde çalışır:
- Cihaz stratejileri, hem kullanıcı stratejilerinden hem de cihaz grubu stratejilerinden önce gelir
- Kullanıcı stratejileri, cihaz grubu stratejilerinden önce gelir
- Cihaz grubu stratejileri, bir cihaz stratejisi veya kullanıcı stratejisi atanmamış cihaz grubundaki tüm cihazlar için geçerlidir

## Cihazları Düzenle

`Cihazları Düzenle` (Edit Devices) menüsüne tıkladığınızda tüm cihazları gösteren bir düzenleme iletişim kutusu açılır. Onay kutularının seçim durumunu değiştirebilir ve geçerli sayfada yapılan cihaz değişikliklerini uygulamak için `Kaydet` (Save) düğmesine tıklayabilirsiniz. Diğer sayfalardaki cihazları değiştirmeniz gerekiyorsa lütfen o sayfalara gidin. Cihazları filtrelemek için sağ üst köşedeki açılır menüyü de kullanabilirsiniz.

Strateji sütunu biçimi: cihaz stratejisi/kullanıcı stratejisi/cihaz grubu stratejisi veya varsayılan strateji için "-".

"demo1" menüsünde `Cihazları Düzenle` seçeneğine tıkladığınızda görünen iletişim kutusu örneği aşağıdadır. Bu örnekte "1981241962" cihazına "demo3" stratejisi uygulanmıştır; "1279471875" cihazına "demo2" stratejisi uygulanmıştır; "a123456" cihazına "demo1" stratejisi uygulanmıştır; "1227624460" cihazına ise varsayılan strateji uygulanmıştır.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

## Kullanıcıları Düzenle

`Kullanıcıları Düzenle` (Edit Users) menüsüne tıkladığınızda tüm kullanıcıları gösteren bir düzenleme iletişim kutusu açılır. Onay kutularının seçim durumunu değiştirebilir ve geçerli sayfada yapılan kullanıcı değişikliklerini uygulamak için `Kaydet` (Save) düğmesine tıklayabilirsiniz. Diğer sayfalardaki kullanıcıları değiştirmeniz gerekiyorsa lütfen o sayfalara gidin. Kullanıcıları filtrelemek için sağ üst köşedeki açılır menüyü de kullanabilirsiniz.

"demo2" menüsünde `Kullanıcıları Düzenle` seçeneğine tıkladığınızda görünen iletişim kutusu örneği aşağıdadır. Bu örnekte "admin" kullanıcısına "default" stratejisi uygulanmıştır; "user1" kullanıcısına "demo2" stratejisi uygulanmıştır; "user2" kullanıcısına ise "demo3" stratejisi uygulanmıştır.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

## Cihaz Gruplarını Düzenle

`Cihaz Gruplarını Düzenle` (Edit Device Group) menüsüne tıkladığınızda tüm cihaz gruplarını gösteren bir düzenleme iletişim kutusu açılır. Onay kutularının seçim durumunu değiştirebilir ve geçerli sayfada yapılan cihaz grubu değişikliklerini uygulamak için `Kaydet` (Save) düğmesine tıklayabilirsiniz. Diğer sayfalardaki cihaz gruplarını değiştirmeniz gerekiyorsa lütfen o sayfalara gidin. Cihaz gruplarını filtrelemek için sağ üst köşedeki açılır menüyü de kullanabilirsiniz.

"demo1" menüsünde `Cihaz Gruplarını Düzenle` seçeneğine tıkladığınızda görünen iletişim kutusu örneği aşağıdadır. Bu örnekte "device_group1" cihaz grubuna "demo1" stratejisi uygulanmıştır; "group2" cihaz grubuna "demo2" stratejisi uygulanmıştır; "group3" cihaz grubuna ise "default" stratejisi uygulanmıştır.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

## Strateji Senkronizasyonu

Her cihaz yalnızca tek bir strateji tarafından yönetilebilir ve bu strateji devre dışı bırakılırsa cihaz herhangi bir strateji tarafından yönetilmeyecektir. Stratejileri senkronize ederken RustDesk, senkronizasyonun gerekli olup olmadığını belirlemek için yerel ve sunucu strateji zaman damgalarını kaydeder. Yani strateji senkronizasyonu tamamlandıktan sonra:

* Kullanıcı bazı seçenekleri değiştirirse, istemci kullanıcının seçeneklerini kullanır.
* Yönetici strateji içeriğini değiştirirse, istemcinin seçenekleri senkronize edilir.
* Yönetici cihazın ait olduğu stratejiyi değiştirirse, istemcinin seçenekleri senkronize edilir.

## Stratejileri Düzenleme

Stratejinin altındaki `Düzenle` (Edit) düğmesine tıklayın, değişiklikleri yapın ve `Gönder` (Submit) seçeneğine tıklayın. Strateji 30 saniye içinde cihazlarla senkronize edilecektir.
