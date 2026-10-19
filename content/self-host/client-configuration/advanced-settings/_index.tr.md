---
title: Gelişmiş Ayarlar
weight: 49
description: "Geçersiz kılma, varsayılan, kullanıcı ve sabit ayarlar genelinde yetki düzeyleri ve seçenek davranışları dahil RustDesk özel istemcilerindeki gelişmiş ayarlar referansı."
keywords: ["rustdesk gelişmiş ayarlar", "rustdesk özel istemci ayarları", "rustdesk yetki düzeyleri", "rustdesk geçersiz kılma ayarları", "rustdesk varsayılan ayarlar"]
---

RustDesk'teki gelişmiş özel istemci ayarlarını ve her ayarın farklı yetki düzeylerinde nasıl davrandığını anlamak için bu referansı kullanın.

Özel istemcilerdeki tüm gelişmiş ayarlar burada ele alınmaktadır.

## RustDesk özel istemcilerinde gelişmiş ayarlar nelerdir?

Gelişmiş ayarlar; RustDesk özel istemcileri, kullanıcı ayarları ve sunucu tarafı ilkeleri aracılığıyla denetleyebileceğiniz düşük düzeyli istemci seçenekleridir. Birçok istemcide tutarlı davranışa ihtiyaç duyduğunuzda veya güvenlik, izinler ve kullanıcı arayüzü varsayılanları üzerinde daha sıkı denetim istediğinizde kullanışlıdır.

## Ayar öncelikleri nasıl çalışır?

| Kaynak | Öncelik |
| --- | --- |
| Geçersiz Kılma (Override) | En Yüksek |
| Strateji (Strategy) | Yüksek |
| Kullanıcı (User) | Orta |
| Varsayılan (Default) | En Düşük |

## Gelişmiş ayarlar hızlı yanıtlar

- Geçersiz kılma (Override) ayarları diğer tüm kaynaklara göre önceliklidir
- Strateji (Strategy) ayarları kullanıcı ve varsayılan ayarları geçersiz kılabilir
- Kullanıcı (User) ayarları yalnızca daha yüksek öncelikli bir kaynak bunları geçersiz kılmadığında uygulanır
- Varsayılan (Default) ayarlar yedek geri dönüş katmanıdır
- Bu sayfa ayar anahtarları, değerleri, varsayılanları ve örnekleri için kesin referanstır

## Ayarlar için Yetki Düzeyleri

Dört tür ayar vardır:

1. Geçersiz kılma ayarları: `Web Konsolu` → `Özel İstemciler`
2. Varsayılan ayarlar: `Web Konsolu` → `Özel İstemciler`
3. Kullanıcı ayarları: RustDesk istemcisi içinde
4. Strateji ayarları: `Web Konsolu` → `Stratejiler`

Bu ayarlar için yetki hiyerarşisi şu şekildedir: `Geçersiz Kılma (Override) > Strateji > Kullanıcı > Varsayılan`.

## Güvenlik Ayarları

### access-mode

Gelen bağlantılar için erişim modunu (izinleri) belirler.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Gelen bağlantılar için klavye/fare girişini etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Klavyeyi etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Gelen bağlantılar için kopyala ve yapıştırı etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Panoyu etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Gelen bağlantılar için dosya kopyala/yapıştırı veya dosya aktarımı (oturumunu) etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Dosya aktarımını etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |


### enable-camera

Gelen bağlantılar için kamerayı etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Kamerayı etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Gelen bağlantılar için terminali etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Terminali etkinleştir

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Gelen bağlantılar için uzak yazıcıyı etkinleştirir.

**Konum**:

1. **Windows** Ayarlar → Güvenlik → İzinler → Uzak yazıcıyı etkinleştir

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Ses kaydını ve eşe aktarılmasını etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Sesi etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

TCP tünellemeyi etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → TCP tünellemesini etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Kontrol eden tarafça yeniden başlatılabilmeyi etkinleştirir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Uzaktan yeniden başlatmayı etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Enable sessions to be recorded.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Oturum kaydını etkinleştir
2. **Mobil** Ayarlar → Ekranı paylaş → Oturum kaydını etkinleştir

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Enable the control side to block other users' input.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Kullanıcı girişini engellemeyi etkinleştir (yalnızca Windows)
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### enable-privacy-mode

Kontrol edilen tarafın, kontrol eden tarafın gizlilik modunu kullanmasına izin verip vermeyeceğini belirler.

Bu ayar [`privacy-mode`](#privacy-mode) ayarından farklıdır: o ayar ilk bağlantıdan sonra her eş için varsayılan gizlilik modu davranışını denetlerken, `enable-privacy-mode` gizlilik moduna izin verilip verilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Gizlilik modunu etkinleştir

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-privacy-mode=Y` |

### allow-remote-config-modification

Kontrol eden tarafın, kontrol edilen RustDesk kullanıcı arayüzündeki ayarları değiştirmesine izin verir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → İzinler → Uzaktan yapılandırma değişikliğini etkinleştir
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Yerel ağdaki (LAN) eşlerin bu cihazı keşfetmesine izin verir.

LAN keşfinden sonra, yerel olarak destekleniyorsa [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) (Wake-on-LAN) çalışabilir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → LAN keşfini reddet
2. **Mobil** Ayarlar → Ekranı paylaş → LAN keşfini reddet

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Doğrudan IP erişimini etkinleştir.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → Doğrudan IP erişimini etkinleştir
2. **Mobil** Ayarlar → Ekranı paylaş → Doğrudan IP erişimi

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Doğrudan IP erişim portu.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → Doğrudan IP erişimi port ("Doğrudan IP erişimini etkinleştir" işaretliyse görünür)
2. **Mobil** Ayarlar → Ekranı paylaş → Doğrudan IP erişimi

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

IP Beyaz Listesini Kullan.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → IP Beyaz Listesini Kullan
2. **Mobil** Ayarlar → Ekranı paylaş → IP Beyaz Listesini Kullan

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | `,` or `<ip1>,<ip2>,<ip3>` | `,` means no filter | `whitelist=,` |

CIDR gösterimi desteklenir, örn. `whitelist=192.168.1.0/24,10.0.0.5`.

### id-whitelist

Kimlik (ID) beyaz listesini kullanır. Yalnızca listede bulunan kimlikler bu cihaza bağlanabilir.

Joker karakterler desteklenir: `*` herhangi bir sayıda karakterle eşleşir, `?` tam olarak bir karakterle eşleşir. Eşleme büyük/küçük harfe duyarsızdır.

**Not**: Kimlik (ID), bağlanan istemci tarafından bildirilir; bu nedenle tek başına bir kimlik doğrulama mekanizması değildir. Bu beyaz liste maruz kalma riskini azaltır, parola veya 2FA'nın yerini almaz.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → Kimlik (ID) Beyaz Listesini Kullan
2. **Mobil** Ayarlar → Ekranı paylaş → Kimlik (ID) Beyaz Listesini Kullan

| Kurulum gerekli | Değerler | Varsayılan | Örnek | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | `,` or `<id1>,<id2>,<id3>` | `,` means no filter | `id-whitelist=123456789,98765432?,abc*` | >= 1.5.0 |

### allow-auto-disconnect & auto-disconnect-timeout

Automatically close incoming sessions after a period of user inactivity.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → Kullanıcı hareketsizliğinde gelen oturumları otomatik kapat
2. **Mobil** Ayarlar → Ekranı paylaş → Kullanıcı hareketsizliğinde gelen oturumları otomatik kapat

| Seçenek | Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minutes | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Yalnızca RustDesk penceresi açıksa bağlantıya izin ver.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Güvenlik → Yalnızca RustDesk penceresi açıksa bağlantıya izin ver
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Accept incoming connections via password or manually click.

**Konum**:

1. **Masaüstü** Ayarlar → Güvenlik → Parola → Açılır kutu
2. **Mobil** Ekranı paylaş → Sağ üst köşedeki açılır menü

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Hangi tür parolanın kullanılabileceğini belirler; `geçici parola` tek kullanımlık rastgele parolayı ifade eder.

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Masaüstü** Ayarlar → Güvenlik → Parola → Tek kullanımlık parola uzunluğu
2. **Mobil** Ekranı paylaş → Sağ üst köşedeki açılır menü → Tek kullanımlık parola uzunluğu

Geçici parolanın uzunluğu.

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | `temporary-password-length=6` |

### proxy-url

Proxy URL'si.

Şu anda `http` ve `socks5` desteklenmektedir.

**Konum**:

1. **Masaüstü** Ayarlar → Ağ → Proxy → Socks5/Http(s) proxy
2. **Mobil**

Örnekler:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Proxy username and password.

**Konum**:

1. **Masaüstü** Ayarlar → Ağ → Proxy → Socks5/Http(s) proxy
2. **Mobil**

| Seçenek | Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Genel Ayarlar

### theme

Controls the UI theme of RustDesk client.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Tema
2. **Mobil** Ayarlar → Ayarlar → Tema

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Controls the language of RustDesk client.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Dil
2. **Mobil** Ayarlar → Ayarlar → Dil

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Currently available languages are:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

En güncel dil listesi için koddaki [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) listesine bakabilirsiniz.

### allow-auto-record-incoming

Gelen oturumları otomatik olarak kaydeder.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Kayıt → Gelen oturumları otomatik kaydet
2. **Mobil** Ayarlar → Kayıt → Gelen oturumları otomatik kaydet

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Giden oturumları otomatik olarak kaydeder.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Kayıt → Giden oturumları otomatik kaydet
2. **Mobil** Ayarlar → Kayıt → Giden oturumları otomatik kaydet

| Kurulum gerekli | Değerler | Varsayılan | Örnek | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### hide-recording-button

Kontrol eden tarafta uzak oturumlardaki kayıt düğmesini gizler. Bu, kayıt özelliğini devre dışı bırakmaz. Otomatik giden oturum kaydı etkinleştirilmişse oturumlar yine kaydedilir, ancak kullanıcılar oturum araç çubuğundan kaydı durduramaz.

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `hide-recording-button=Y` |

### video-save-directory

Kaydedilen videoların kaydedileceği dizin.

Yüklü Windows servisi tarafından yapılan kontrol edilen taraf kayıtları için [`windows-service-video-save-directory`](#windows-service-video-save-directory) seçeneğini kullanın.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Kayıt → Video kayıt dizini
2. **Mobil** Ayarlar → Kayıt

Varsayılan değerler:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Not**: **app_name** ifadesi geçerli uygulama adını belirtir.

### windows-service-video-save-directory

Yüklü bir Windows istemcisinin servis olarak çalışırken kayıtları kaydedeceği dizin. Yol mutlak olmalıdır. Boş veya göreli bir yol yoksayılır ve RustDesk bunun yerine varsayılan dizini kullanır.

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| Y | Absolute Windows path | `<system drive>\ProgramData\<app_name>\recording` | `windows-service-video-save-directory=D:\RustDesk\recordings` |

### allow-auto-update

Otomatik güncellemelere izin verir. Etkinleştirildiğinde istemci, yeni bir sürüm çıktığında GitHub resmi sürümlerinden en son sürümü otomatik olarak indirip yükler.

Bu ayar yalnızca Windows üzerinde Bağlantı türü Çift Yönlü veya Gelen olarak ayarlandığında geçerlidir. Giden bağlantı türü için geçerli değildir.

**Konum**:

1. **Windows** Ayarlar → Genel → Diğerleri → Otomatik güncelleme

| Kurulum gerekli | Değerler | Varsayılan | Örnek | Version |
| :------: | :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-auto-update=Y` | >= 1.4.6 |

### enable-confirm-closing-tabs

Tüm uzak sekmeleri kapatmadan önce bir onay iletişim kutusu gösterilip gösterilmeyeceğini belirler.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → Birden çok sekmeyi kapatmadan önce onayla
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Enable adaptive bitrate.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → Uyarlanabilir bit hızı
2. **Mobil** Ayarlar → Ekranı paylaş → Uyarlanabilir bit hızı (beta)

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Gelen oturumlarda duvar kağıdını kaldır.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → Gelen oturumlarda duvar kağıdını kaldır
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Yeni bir bağlantı açmak için yeni bir sekmenin mi yoksa yeni bir pencerenin mi kullanılacağını belirler.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → Bağlantıyı yeni sekmede aç
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Her zaman yazılım tabanlı oluşturmayı kullan.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → Her zaman yazılım tabanlı oluşturmayı kullan
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### enable-hwcodec

Enable hardware encoding to make the picture smoother.

**Konum**:

1. **Masaüstü**
2. **Mobil** Ayarlar → Donanım kodeği

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Controls the view of peer cards, includes "Big tiles", "Small tiles" and "List".

**Konum**:

1. **Masaüstü** Ana Sayfa → Eş paneli → Sağ üst ızgara simgesi
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Big tiles  
**1** Small tiles  
**2** List

### peer-sorting

Controls the ordering of peer cards.

**Konum**:

1. **Masaüstü** Ana Sayfa → Eş paneli → Sağ üst sıralama simgesi
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Adres defterinin son oturumlarla senkronize edilip edilmeyeceğini belirler.

**Konum**:

1. **Masaüstü** Ana Sayfa → Eş paneli → Adres defteri → Etiketler → Açılır menü → Son oturumlarla eşitle
2. **Mobil** Ana Sayfa → Eş paneli → Adres defteri → Etiketler → Açılır menü → Son oturumlarla eşitle

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Adres defteri etiketlerinin sıralanıp sıralanmayacağını belirler.

**Konum**:

1. **Masaüstü** Ana Sayfa → Eş paneli → Adres defteri → Etiketler → Açılır menü → Etiketleri sırala
2. **Mobil** Ana Sayfa → Eş paneli → Adres defteri → Etiketler → Açılır menü → Etiketleri sırala

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filter address book by tag intersection.

**Preview**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Konum**:

1. **Masaüstü** Ana Sayfa → Eş paneli → Adres defteri → Etiketler → Açılır menü → Kesişime göre filtrele
2. **Mobil** Ana Sayfa → Eş paneli → Adres defteri → Etiketler → Açılır menü → Kesişime göre filtrele

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → Doku oluşturma kullan

Görüntüleri daha pürüzsüz hale getirmek için doku oluşturma (texture rendering) kullanır. Görüntüleme sorunlarıyla karşılaşırsanız bu seçeneği devre dışı bırakmayı deneyebilirsiniz. Only available on desktop.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-tcp-punch

TCP delik açmayı (hole punching) etkinleştirir. Hem kendi barındırdığınız hem de genel sunucular için varsayılan olarak etkindir.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → TCP delik açmayı etkinleştir
2. **Mobil** Ayarlar → TCP delik açmayı etkinleştir

Available since RustDesk 1.5.0

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `enable-tcp-punch=N` |

### enable-udp-punch

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → UDP delik açmayı etkinleştir
2. **Mobil** Ayarlar → UDP delik açmayı etkinleştir

Available since RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | selfhost:N, otherwise:Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → IPv6 P2P bağlantısını etkinleştir
2. **Mobil** Ayarlar → Genel → Diğerleri → IPv6 P2P bağlantısını etkinleştir

Available since RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | selfhost:N, otherwise:Y | `enable-ipv6-punch=N` |

### enable-webrtc

WebRTC P2P bağlantılarını etkinleştirir. UDP delik açma ve IPv6 P2P bağlantılarında olduğu gibi, bu seçenek de kendi barındırdığınız sunucular için varsayılan olarak devre dışıdır. Açıkça etkinleştirmek için `enable-webrtc=Y` olarak ayarlayın.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → WebRTC P2P bağlantısını etkinleştir
2. **Mobil** Ayarlar → WebRTC P2P bağlantısını etkinleştir

Available since RustDesk 1.5.0, RustDesk Server Pro 1.8.7

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | selfhost:N, otherwise:Y | `enable-webrtc=Y` |

### relay-fallback-delay

Önceden kurulmuş bir aktarım (relay) bağlantısının, doğrudan bir WebRTC bağlantısı kurulana kadar aktarımı kullanmadan önce saniye cinsinden ne kadar bekleyeceğini belirler. Yavaş bir doğrudan bağlantıya daha fazla süre tanımak için bu değeri artırın; doğrudan bir bağlantı kurulamadığında aktarımı daha erken kullanmak için bu değeri azaltın.

Yalnızca WebRTC etkinleştirildiğinde (`enable-webrtc`) geçerlidir. Masaüstü alanı WebRTC devre dışıyken gizlenir. Varsayılan olan 2,5 saniyeyi kullanmak için boş bırakın. Geçersiz, sıfır veya negatif değerler de varsayılanı kullanır.

**Konum**:

1. **Masaüstü** Ayarlar → Genel → Diğerleri → WebRTC P2P bağlantısını etkinleştir → Saniye cinsinden aktarıma geri dönüş gecikmesi

Available since RustDesk 1.5.0

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Positive number of seconds, or empty | 2.5 | `relay-fallback-delay=2.5` |

## Ekran Ayarları

### view-only

Bu seçenek, ilk bağlantıdan sonra her bir eş için "view-only" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "view-only" seçeneği, bağlantının yalnızca görüntüleme amaçlı olup olmayacağını denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Görüntüleme modu
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Görüntüleme modu

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Araç çubuğunda monitörlerin gösterilip gösterilmeyeceğini belirler.

![show-monitors-toolbar](/docs/tr/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Monitörler araç çubuğunu göster
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Bağlantı kurulduktan sonra uzak araç çubuğunun daraltılıp daraltılmayacağını belirler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Araç çubuğunu daralt
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Bu seçenek, ilk bağlantıdan sonra her bir eş için "show-remote-cursor" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "show-remote-cursor" seçeneği, uzaktan kontrol sayfasında uzak imlecin görüntülenip görüntülenmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Uzak imleci göster
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Uzak imleci göster

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Bu seçenek, ilk bağlantıdan sonra her bir eş için "follow-remote-cursor" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "follow-remote-cursor" seçeneği, uzak imlecin takip edilip edilmeyeceğini denetler.

**Preview**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Uzak imleci takip et
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Uzak imleci takip et

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Bu seçenek, ilk bağlantıdan sonra her bir eş için "follow-remote-window" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "follow-remote-window" seçeneği, uzak pencerenin takip edilip edilmeyeceğini denetler.

**Preview**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Uzak pencere odağını takip et
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Uzak pencere odağını takip et

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Bu seçenek, ilk bağlantıdan sonra her bir eş için "zoom-cursor" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "zoom-cursor" seçeneği, imlecin uzak çözünürlüğe göre ölçeklendirilip ölçeklendirilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → İmleci yakınlaştır
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Bu seçenek, ilk bağlantıdan sonra her bir eş için "show-quality-monitor" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "show-quality-monitor" seçeneği, kalite izleyicisinin gösterilip gösterilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Kalite izleyicisini göster
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Kalite izleyicisini göster

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Bu seçenek, ilk bağlantıdan sonra her bir eş için "disable-audio" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "disable-audio" seçeneği, sesin çalınıp çalınmayacağını denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Sesi kapat
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Sesi kapat

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Bu seçenek, ilk bağlantıdan sonra her bir eş için "enable-file-copy-paste" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "enable-file-copy-paste" seçeneği, dosya kopyalama ve yapıştırmanın etkinleştirilip etkinleştirilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Dosya kopyalama ve yapıştırmayı etkinleştir (yalnızca Windows)
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Bu seçenek, ilk bağlantıdan sonra her bir eş için "disable-clipboard" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "disable-clipboard" seçeneği, metin kopyalama ve yapıştırmanın etkinleştirilip etkinleştirilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Panoyu devre dışı bırak
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Panoyu devre dışı bırak

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Bu seçenek, ilk bağlantıdan sonra her bir eş için "lock-after-session-end" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "lock-after-session-end" seçeneği, oturum sona erdikten sonra eşin kilitlenip kilitlenmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Oturum bittikten sonra kilitle
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Oturum bittikten sonra kilitle

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Bu seçenek, ilk bağlantıdan sonra her bir eş için "privacy-mode" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "privacy-mode" seçeneği, ilk bağlantıdan sonra gizlilik modunun kullanılıp kullanılmayacağını denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Gizlilik modu
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Gizlilik modu

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

Bu seçenek, ilk bağlantıdan sonra her bir eş için "i444" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "i444" seçeneği, gerçek rengin (true color) kullanılıp kullanılmayacağını denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Gerçek renk (4:4:4)
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Gerçek renk (4:4:4)

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Bu seçenek, ilk bağlantıdan sonra her bir eş için "reverse-mouse-wheel" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "reverse-mouse-wheel" seçeneği, fare tekerleğinin yönünün tersine çevrilip çevrilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Fare tekerleğini ters çevir
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Fare tekerleğini ters çevir

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Bu seçenek, ilk bağlantıdan sonra her bir eş için "swap-left-right-mouse" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "swap-left-right-mouse" seçeneği, sol-sağ fare düğmelerinin yerinin değiştirilip değiştirilmeyeceğini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Sol-sağ fare düğmelerini değiştir
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Sol-sağ fare düğmelerini değiştir

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Bu seçenek, ilk bağlantıdan sonra her bir eş için "displays-as-individual-windows" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "displays-as-individual-windows" seçeneği, her bir ekranın ayrı bir pencere olarak gösterilip gösterilmeyeceğini denetler.

**Preview**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Ekranları ayrı pencereler olarak göster
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Bu seçenek, ilk bağlantıdan sonra her bir eş için "use-all-my-displays-for-the-remote-session" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "use-all-my-displays-for-the-remote_session" seçeneği, tüm ekranların uzak oturum için kullanılıp kullanılmayacağını denetler.

**Preview**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Uzak oturum için tüm ekranlarımı kullan
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Bu seçenek, ilk bağlantıdan sonra her bir eş için "view-style" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "view-style" seçeneği görüntüleme stilini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan görüntüleme stili
2. **Mobil** Ayarlar → Ekran ayarları → Varsayılan görüntüleme stili

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Bu seçenek, ilk bağlantıdan sonra her bir eş için "scroll-style" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "scroll-style" seçeneği kaydırma stilini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan kaydırma stili
2. **Mobil**

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar, scrolledge | scrollauto | `scroll-style=scrollauto` |

**Not**: `scrolledge` seçeneği RustDesk 1.4.4 sürümünden itibaren kullanılabilir.

### edge-scroll-edge-thickness

Bu seçenek, `scroll-style` seçeneği `scrolledge` olarak ayarlandığında kenar kalınlığını denetler. Kenar kalınlığı, ekran kenarlarındaki kaydırılabilir alanın boyutunu belirler.

Bu seçenek yalnızca `scroll-style=scrolledge` olduğunda geçerlidir.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Kenar kaydırma kenar kalınlığı

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | 20-150 | 100 | `edge-scroll-edge-thickness=100` |

**Not**: Bu seçenek RustDesk 1.4.4 sürümünden itibaren kullanılabilir.

### image-quality

Bu seçenek, ilk bağlantıdan sonra her bir eş için "image-quality" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "image-quality" seçeneği görüntü kalitesini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan görüntü kalitesi
2. **Mobil** Ayarlar → Ekran ayarları → Varsayılan görüntü kalitesi

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Bu seçenek, ilk bağlantıdan sonra her bir eş için "custom-image-quality" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "custom-image-quality" seçeneği, "image-quality" özel (custom) olarak ayarlanmışsa görüntü kalitesini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan görüntü kalitesi → Özel
2. **Mobil** Ayarlar → Ekran ayarları → Varsayılan görüntü kalitesi → Özel

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Bu seçenek, ilk bağlantıdan sonra her bir eş için "custom-fps" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "custom-fps" seçeneği, "image-quality" özel olarak ayarlanmışsa FPS değerini denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan görüntü kalitesi → Özel
2. **Mobil** Ayarlar → Ekran ayarları → Varsayılan görüntü kalitesi → Özel

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Bu seçenek, ilk bağlantıdan sonra her bir eş için "codec-preference" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "codec-preference" seçeneği görüntüler için kodeği denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan kodek
2. **Mobil** Ayarlar → Ekran ayarları → Varsayılan kodek

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**Dikkat**: "vp8" ve "vp9" dışındaki seçenekler çalışmayabilir. Bu, makinenizin neyi desteklediğine bağlıdır.

### terminal-persistent

Bu seçenek, ilk bağlantıdan sonra her bir eş için "terminal-persistent" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "terminal-persistent" seçeneği, terminal pencerelerinin oturumlar arasında korunup korunmayacağını denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Diğer varsayılan seçenekler → Bağlantı kesildiğinde terminal oturumlarını koru
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Bağlantı kesildiğinde terminal oturumlarını koru

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Bu seçenek, ilk bağlantıdan sonra her bir eş için "trackpad-speed" seçeneğini belirler.

Ardından her bir eşin ayarlarındaki "trackpad-speed" seçeneği, dokunmatik yüzey hızını denetler.

**Konum**:

1. **Masaüstü** Ayarlar → Ekran → Varsayılan dokunmatik yüzey hızı
2. **Mobil** Ayarlar → Ekran ayarları → Varsayılan dokunmatik yüzey hızı

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Diğerleri

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

Önceden tanımlanmış adres defteri adı, cihaz etiketi, cihaz takma adı, cihaz parolası, cihaz notu, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Etiket belirlemek istemiyorsanız yalnızca preset-address-book-name ayarlayabilirsiniz.
Lütfen web konsolunuzun adres defteri sayfasındaki geçerli bir adres defteri adını ve etiketini kullanın.

| Seçenek | Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<address book name>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<address book tag name>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<device alias>` |
| preset-address-book-password | N | | | `preset-address-book-password=<device password>` |
| preset-address-book-note | N | | | `preset-address-book-note=<device note>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note seçenekleri RustDesk istemcisi >=1.4.3, pro >= 1.6.6 sürümlerinde kullanılabilir.

### disable-group-panel

RustDesk istemcisinde grup panelini (adres defteri panelinin yanındaki, 1.3.8 sürümünden itibaren "Erişilebilir cihazlar" olarak adlandırılan panel) devre dışı bırakır, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Seçenek | Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Taşınabilir Windows istemcisi çalıştırıldığında otomatik yetki yükseltme, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Seçenek | Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Android servisi başladığında, sistemin RustDesk servisini sonlandırmasını önlemeye yardımcı olan bir kayan pencere (floating window) görüntüler.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Android servisi başladığında, sistemin RustDesk servisini sonlandırmasını önlemeye yardımcı olan bir kayan pencere (floating window) görüntüler. Boyut 120'den küçük olduğunda kayan pencereye tıklamak zorlaşacaktır. Çok küçük bir boyut bazı cihazlarda arka plan servisini ayakta tutamayabilir.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Varsayılan olarak, kayan pencereye tıklandığında bir menü açılır. 'untouchable' (dokunulmaz) olarak ayarlandıktan sonra, tıklama veya kaydırma işlemleri kayan pencerenin içinden geçerek alttaki pencereye iletilir. 'untouchable' olarak ayarlandıktan sonra kayan pencerenin konumu değiştirilemez ve sistem kayan pencereyi otomatik olarak yarı saydam hale getirebilir. Ancak bu özellik GitHub uygulaması gibi az sayıda uygulamada çalışmayabilir.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Android kayan pencereleri ayarlanabilir saydamlığa sahiptir. Kayan pencereyi etkinleştirmek ancak gizlemek istiyorsanız saydamlığı 0 olarak ayarlayabilirsiniz; kayan pencere, tıklama olaylarını alta iletmek için otomatik olarak 'untouchable' durumuna getirilecektir.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Android kayan penceresi için bir simge ayarlanmazsa varsayılan olarak RustDesk simgesi görüntülenir.
Ayar yaparken lütfen SVG'nin metin içeriğini tek bir satıra yazın ve [SVG destek sınırlamalarına](https://bigbadaboom.github.io/androidsvg/index.html) dikkat edin.

| Varsayılan | Örnek |
| :------: | :------: |
| RustDesk icon | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Bu, Android kontrol edilen taraf içindir. Ekranın açık tutulmasının kayan pencereye bağlı olduğunu unutmayın.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### keep-awake-during-incoming-sessions

Gelen uzak masaüstü oturumları sırasında ekranı uyanık tutar. Uygulama uzaktan bağlantılar için aktif olarak kullanılırken cihazın uyku moduna geçmesini önlemeye yardımcı olur.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `keep-awake-during-incoming-sessions=N` |

### keep-awake-during-outgoing-sessions

Giden uzak masaüstü oturumları sırasında ekranı uyanık tutar. Uygulama uzaktan bağlantılar için aktif olarak kullanılırken cihazın uyku moduna geçmesini önlemeye yardımcı olur.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `keep-awake-during-outgoing-sessions=N` |

### enable-directx-capture

Bu, Windows kontrol edilen taraf içindir. Herhangi bir sorunla karşılaşmıyorsanız, doğrudan GDI kullanmak yerine ekran görüntüleri için DirectX kullanımına öncelik veren varsayılan ayarları kullanmanız önerilir.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Bu, Android kontrol edilen taraf içindir. Varsayılan olarak çözünürlük 1200'den büyük olduğunda, donanım kodlaması orijinal çözünürlüğü kullanırken yazılım kodlaması daha yavaş olduğundan yarı çözünürlüğü kullanır. Bu seçenek, yazılım kodlamasının yarı çözünürlüğe ölçeklendirilip ölçeklendirilmeyeceğini belirlemek için kullanılır.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Kontrol eden tarafın bağlantıları kabul etmek, izinleri değiştirmek vb. için kabul penceresine (bağlantı yönetim penceresi) tıklamasına izin verilip verilmeyeceğini belirler.

https://github.com/rustdesk/rustdesk/issues/7425

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### enable-perm-change-in-accept-window

Kullanıcıların gelen bir oturumu kabul etmeden önce kabul penceresinde (bağlantı yönetim penceresi) izinleri değiştirip değiştiremeyeceğini belirler.

Masaüstünde bu ayar kabul penceresindeki (bağlantı yönetim penceresi) tüm izinleri etkiler. Android'de ise şu izinleri etkiler: Dosya aktarımı, Ses yakalama ve Panoyu etkinleştir. Ekran yakalama ve Giriş denetimi etkilenmez.

**Preview**: https://github.com/rustdesk/rustdesk/pull/14875

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `enable-perm-change-in-accept-window=Y` |

### remove-preset-password-warning

Özel istemcide önceden ayarlanmış parola olduğunda grafik arayüzündeki güvenlik uyarısının kaldırılıp kaldırılmayacağını belirler. 

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-general-settings

Ayarlar sayfasının `Genel` sekmesinin gizlenip gizlenmeyeceğini belirler. Diğer `hide-*-settings` seçeneklerinden farklı olarak bu seçenek `Disable settings` etkinleştirildiğinde de çalışır, çünkü `Disable settings` `Genel` sekmesini gizlemez.

https://github.com/rustdesk/rustdesk-server-pro/issues/1001

Available since RustDesk 1.5.0

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `hide-general-settings=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Bazı ayarların gizlenip gizlenmeyeceğini belirler. Lütfen `Disable settings` seçeneğinin kapalı olduğundan emin olun, aksi takdirde bunlar çalışmaz.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Cihazlar listesinde kullanıcı adının gösterilip gösterilmeyeceğini belirler. Çünkü bazen kullanıcı adı çok uzun olduğunda diğer bilgileri gizleyebilir.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Grafik arayüzde UAC / izin uyarılarının gösterilip gösterilmeyeceğini belirler.

https://github.com/rustdesk/rustdesk/issues/8687

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Uzak cihaza bağlandığınızda açılır pencerede gösterilecek görünen adınızı değiştirin. Varsayılan olarak önce giriş yapan kullanıcının adını, yoksa işletim sistemi kullanıcı adınızı görüntüler.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Yalnızca TCP kullanılıp kullanılmayacağını denetler. Artık UDP 21116 kullanılmaz, yerine TCP 21116 kullanılır.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

Cihaza kullanıcı / strateji / cihaz grubu / cihaz kullanıcı adı / cihaz adı (ana bilgisayar adı) / not atayın. Bunu [komut satırı](/docs/tr/self-host/rustdesk-server-pro/console/#komut-satırından-belirteç-ile-atama-yapma) üzerinden de yapabilirsiniz.

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

device group is available in RustDesk client >=1.3.8, pro >= 1.5.0

preset-device-username, preset-device-name, preset-note are available in RustDesk client >=1.4.3, pro >= 1.6.6. 

### default-connect-password

Uzak cihazlara bağlantı kurmak için `varsayılan bağlantı parolası`nı kullanırsınız. Bu parola kontrol eden tarafta yapılandırılır ve kontrol edilen (yalnızca gelen) istemcide bulunan herhangi bir [önceden ayarlanmış parola](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) ile karıştırılmamalıdır.

e.g. `default-connect-password=abcd1234`

### enable-trusted-devices

Güvenilen cihazların 2FA doğrulamasını atlamasına izin verir.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Sistem tepsisindeki (systray) tepsi simgesini devre dışı bırakır.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### hide-stop-service

Servis çalışırken servisi durdurma/açma-kapama kontrollerini gizler. Bu özellik temel olarak özel istemcilerde kullanıcıların servisi kullanıcı arayüzünden (masaüstü ayarları, sistem tepsisi menüsü, Android sunucu sayfası ve Android kayan pencere menüsü) durdurmasını önlemek içindir.

Servis durdurulduğunda başlatma/etkinleştirme girdisi görünür kalmaya devam eder.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `hide-stop-service=Y` |

### one-way-clipboard-redirection

Kontrol edilen taraftan kontrol eden tarafa pano senkronizasyonunu devre dışı bırakır; RustDesk istemcisi >=1.3.1 sürümünde mevcuttur (kontrol edilen taraf).

https://github.com/rustdesk/rustdesk/discussions/7837

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Kontrol edilen taraftan kontrol eden tarafa dosya aktarımını devre dışı bırakır; RustDesk istemcisi >=1.3.1 sürümünde mevcuttur (kontrol edilen taraf).

https://github.com/rustdesk/rustdesk/discussions/7837

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |


### sync-init-clipboard

Bağlantı kurulurken başlangıç panosunun senkronize edilip edilmeyeceğini belirler (yalnızca kontrol eden taraftan kontrol edilen tarafa), RustDesk istemcisi >=1.3.1 sürümünde kullanılabilir (kontrol eden taraf).

https://github.com/rustdesk/rustdesk/discussions/9010

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Oturum açma ekranında [yalnızca tıklama onay modu](/docs/tr/self-host/client-configuration/advanced-settings/#approve-mode) kullanıldığında parola girişine izin verilip verilmeyeceğini belirler, RustDesk istemcisi >=1.3.1 sürümünde kullanılabilir (kontrol edilen taraf).

Etkinleştirildiğinde, geçerli oturum bir oturum açma veya kilit ekranı durumundayken kalıcı parolaya da izin verilir. Bu durum Tıklama, Parola ve Her İkisi onay modları için geçerlidir. RustDesk istemcisi >=1.4.7 (kontrol edilen taraf).

https://github.com/rustdesk/rustdesk/discussions/9269

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Genellikle HTTPS 443 bağlantı noktasını kullanır. API sunucusunun bağlantı noktası yanlışlıkla 21114 olarak ayarlandığında, RustDesk istemcisi varsayılan olarak 21114 bağlantı noktası ayarını kaldırır. Bu seçeneği Y olarak ayarlamak, 21114'ün HTTPS bağlantı noktası olarak kullanılmasına izin verir. RustDesk istemcisi >=1.3.9 sürümünde kullanılabilir.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D oluşturma yüksek FPS sağlayabilir ve CPU kullanımını azaltabilir; ancak bazı cihazlarda uzaktan kontrol ekranı siyah kalabilir. RustDesk istemcisi >=1.3.9 sürümünde yalnızca Windows için kullanılabilir.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Ana bilgisayar adını kimlik (ID) olarak kullan](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), ana bilgisayar adındaki boşluklar '-' ile değiştirilir. Bu %100 garanti edilmez ve yalnızca RustDesk istemcisi ilk kez çalıştırıldığında (yani yeni yüklenen bir istemcide) gerçekleşir; bir çakışma oluşursa rastgele bir kimlik atanır. 

Available in RustDesk client version 1.4.0 and later. 

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Sunucu ve istemciyi bağlamak için WebSocket protokolünü kullanır. Yalnızca RustDesk istemcisi >=1.4.0 ve Pro sunucusu >= 1.5.7 sürümünde kullanılabilir. WebSocket'in yalnızca relay bağlantısını desteklediğini unutmayın.

WebSocket'in çalışması için ters proxy'nizi doğru yapılandırmanız gerekir: [Güvenli WebSocket (WSS) Yapılandırma Kılavuzu](/docs/tr/self-host/rustdesk-server-pro/faq/#8-tüm-platformlar-için-güvenli-iletişimi-etkinleştirmek-üzere-kimlik-id-ve-relay-sunucusuna-güvenli-websocket-wss-desteği-ekleme).

**Konum**:

1. **Masaüstü** Ayarlar → Ağ → WebSocket Kullan
2. **Mobil** Ayarlar → WebSocket Kullan

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Bu seçenek yalnızca sayılardan oluşan tek kullanımlık parolaların kullanımını etkinleştirir veya devre dışı bırakır.
Only available in RustDesk client >=1.4.1 and Pro server >= 1.5.9.

**Discussion**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Preview**: https://github.com/rustdesk/rustdesk/pull/11846

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Cihazı kaydetmez, web konsolundaki cihazlar sayfasında göremezsiniz. 

**Only available in Pro server >= 1.6.0 and requires [custom2 license](https://rustdesk.com/pricing#custom2) and number of concurrent connections >= 2.**

`register-device=N` ise, aşağıdakiler bu cihaz için çalışmayacaktır.
- Log in
- `--assign` command
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- Audit Logs
- Strategy

**Discussion**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 and https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Ana pencereyi her zaman en üstte tutar.

**Discussion**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Only available in RustDesk client 1.4.2.

| Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Disable `Discovered` panel (next to `Favorites` panel) on RustDesk client

| Seçenek | Kurulum gerekli | Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

Controls whether to use touch mode or mouse mode during remote control sessions.

#### Version Behavior Differences

##### RustDesk (Controlling Side) < 1.4.3

İlk bağlantıdan sonra bu seçenek her eş için "touch-mode" (dokunmatik mod) ayarını belirler. Bundan sonra, her eşin bireysel ayarları dokunmatik modun mu yoksa fare modunun mu kullanılacağını belirler.

**Konum**:

1. **Masaüstü**
2. **Mobil** Ayarlar → Ekran ayarları → Diğer varsayılan seçenekler → Dokunmatik mod

##### RustDesk (Controlling Side) >= 1.4.3

Bu seçenek, bireysel cihaz ayarlarını geçersiz kılarak tüm eş cihazların dokunmatik mod mu yoksa fare modu mu kullanacağını tek tip olarak denetler.

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

Mobil cihazdan masaüstüne bağlanırken sanal farenin gösterilmesini denetler.

**Konum**:

1. **Masaüstü**
2. **Mobil** Remote session -> bottom navigation bar -> gesture helper

Available since RustDesk 1.4.3

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**Not**: Bu seçenek **Geçersiz kılma ayarları** yerine **Varsayılan ayarlar** içinde yapılandırılmalıdır.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

Mobil cihazdan masaüstüne bağlanırken sanal oyun kolunun (joystick) gösterilmesini denetler.

Bu seçenek **show-virtual-mouse** seçeneğinin etkinleştirilmesini gerektirir.

**Konum**:

1. **Masaüstü**
2. **Mobil** Remote session -> bottom navigation bar -> gesture helper

Available since RustDesk 1.4.3

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**Not**: Bu seçenek **Geçersiz kılma ayarları** yerine **Varsayılan ayarlar** içinde yapılandırılmalıdır.

### allow-insecure-tls-fallback

Varsayılan olarak RustDesk, TLS kullanan protokoller için sunucu sertifikasını doğrular.

Bu seçenek etkinleştirildiğinde RustDesk, doğrulama hatası durumunda doğrulama adımını atlamaya geri döner ve işleme devam eder.

**Konum**:

1. **Masaüstü** Ayarlar → Ağ → Güvenli olmayan TLS geri dönüşüne izin ver
2. **Mobil** Ayarlar → Güvenli olmayan TLS geri dönüşüne izin ver

Available since RustDesk 1.4.4

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-insecure-tls-fallback=Y` |

### allow-ask-for-note

Bağlantı sona erdiğinde kontrol eden taraftan bir not girmesini ister.

Bu seçeneği istemci kullanıcı arayüzünden etkinleştirirseniz ve henüz oturum açmadıysanız, RustDesk önce oturum açmanızı ister.

**Konum**:

1. **Masaüstü** Ayarlar → Diğerleri → Bağlantı sonunda not iste
2. **Mobil** Ayarlar → Bağlantı sonunda not iste

Available since RustDesk 1.4.4.

**Discussion**: https://github.com/rustdesk/rustdesk/discussions/14606

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-ask-for-note=Y` |

### disable-change-permanent-password

Kalıcı parolayı değiştirme yeteneğini devre dışı bırakır. Etkinleştirildiğinde kullanıcılar arayüz veya komut satırı üzerinden kalıcı parolayı ayarlayamaz veya değiştiremez.

Available since RustDesk 1.4.5

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-permanent-password=Y` |

### disable-change-id

Cihaz kimliğini (ID) değiştirme yeteneğini devre dışı bırakır. Etkinleştirildiğinde kullanıcılar arayüz veya komut satırı üzerinden kimliği değiştiremez.

Available since RustDesk 1.4.5

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-id=Y` |

### disable-unlock-pin

Ayarların kilidini açmak için PIN kullanımını devre dışı bırakır. Etkinleştirildiğinde, bir PIN belirlenmiş olsa bile kullanıcıların ayarların kilidini açmak için sistem yöneticisi ayrıcalıklarını kullanması gerekir.

Available since RustDesk 1.4.5

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `disable-unlock-pin=Y` |

### allow-command-line-settings-when-settings-disabled

Özel istemcide `Disable settings` etkinleştirildiğinde komut satırı ayarları aracılığıyla yapılandırmaya izin verir. Y olarak ayarlandığında yalnızca kullanıcı arayüzü ayarları devre dışı bırakılır; ancak istemciyi yapılandırmak için komut satırı ayarları halen kullanılabilir.

Available since RustDesk 1.4.7

| Değerler | Varsayılan | Örnek |
| :------: | :------: | :------: |
| Y, N | N | `allow-command-line-settings-when-settings-disabled=Y` |
