---
title: NAT Loopback Sorunları
weight: 500
pre: "<b>2.5. </b>"
description: "Yönlendirici arkasında RustDesk barındırırken NAT loopback veya hairpin NAT sorunlarını çözün. Yerel ağ istemcilerinin genel IP/alan adında neden hata aldığını ve çözümlerini öğrenin."
keywords: ["rustdesk nat loopback", "rustdesk hairpin nat", "rustdesk yerel dns", "rustdesk hosts dosyası", "rustdesk self-hosted alan adı sorunu", "rustdesk lan genel ip sorunu"]
---

{{% notice note %}}
Bu açıklama karmaşık ağ bilgisi içerir, okunabilirliğini geliştirmek için yardımlarınızı bekliyoruz.
{{% /notice %}}

NAT loopback (hairpin NAT olarak da adlandırılır), aynı yerel ağdaki (LAN) cihazların kendi barındırdığınız RustDesk sunucusuna genel IP adresi veya alan adı üzerinden erişmeye çalıştığında bir sorun haline gelir. Bu kılavuz bunun neden olduğunu ve yönlendirici desteği, yerel DNS veya hosts dosyası geçersiz kılmaları ile nasıl düzeltileceğini açıklar.

## Hızlı yanıt

Kendi sunucunuz yerel ağ dışından sorunsuz çalışıyor ancak aynı yerel ağdaki istemciler genel IP veya alan adını kullandığında başarısız oluyorsa, genellikle nedeni NAT loopback'tir. En iyi çözüm, mümkün olduğunda yönlendiricide hairpin NAT özelliğini etkinleştirmektir. Bu mümkün değilse yerel DNS kullanın. Hosts dosyası düzenlemesi ise az sayıda cihaz için geçici bir çözümdür.

## Hangi çözümü seçmelisiniz?

| Çözüm | Ne Zaman En İyisi | Karşılaşılan Durum |
| --- | --- | --- |
| Yönlendiricide NAT loopback etkinleştirme | Yönlendiriciniz hairpin NAT destekliyorsa | En iyi uzun vadeli çözüm, ancak tüm yönlendiriciler bu ayarı sunmaz |
| Yerel ağda yerel DNS kullanma | Aynı ağda birden fazla cihazı yönetiyorsanız | Her cihazı manuel olarak düzenlemekten çok daha ölçeklenebilir |
| Hosts dosyasına kayıt ekleme | Yalnızca birkaç cihazı düzeltmeniz gerekiyorsa | Manueldir; dizüstü veya gezici cihazlarda unutulması kolaydır |

NAT Loopback hakkında daha fazla ayrıntı için lütfen [Vikipedi](https://en.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning) sayfasına bakın.

RustDesk sunucusunu ev ağınızda veya bir NAT güvenlik duvarının arkasında bulunan başka bir ağ ortamında dağıttığınızda, RustDesk sunucusu ve istemcileriniz **MUTLAKA** şunlardan birini yapmalıdır:
A: Birbirlerine erişmek için yerel IP adresini kullanmalıdır VEYA:
B: NAT Loopback'i destekleyen ve etkinleştirilmiş bir güvenlik duvarına/yönlendiriciye sahip olmalıdır.

Sunucunuza **Genel IP** veya **Alan Adınız** (teoride genel IP'nizi işaret eden) üzerinden bağlanamadığınızı fark edebilirsiniz.

## Sorun
Bu örnekte, yerel ağ cihazlarının `rustdesk.example.com` adresine bağlanmaya çalıştığında ne olduğunu adım adım izleyeceğiz. Yönlendiricinizin genel IP adresinin `172.16.16.1`, sunucunuzun LAN IP adresinin `192.168.11.20`, hedef alan adınızın `rustdesk.example.com` ve istemcinizin `192.168.11.2` olduğunu varsayalım.

Yönlendiricinin NAT'ı arkasında bir sunucu kurduğunuzda, `172.16.16.1` GENEL IP'sine gelen herhangi bir mesajı `192.168.11.20` adresindeki sunucuya yönlendirmek için yönlendiriciye bir port yönlendirme (port forward) kuralı eklersiniz.

Bir yerel ağ cihazı İnternet'e (örneğin 8.8.8.8 üzerindeki bir web sunucusuna) erişmek istediğinde, isteği 192.168.11.2 kaynağından çıkmış olarak yönlendiriciye gönderir. Yönlendirici bu isteği yakalar ve 8.8.8.8'e giden isteği 172.16.16.1'den geliyormuş gibi yeniden yazar. 8.8.8.8 adresi 172.16.16.1'e yanıt verdiğinde yönlendirici önceki bağlantı tablosunu kontrol eder ve bu yanıtı tekrar 192.168.11.2'ye yönlendirir.

8.8.8.8 adresindeki kullanıcı 172.16.16.1'i kullanarak ağımıza bir mesaj gönderirse, port yönlendirme kuralı hedefin 172.16.16.1 kısmını 192.168.11.20'deki sunucu olarak yeniden yazar ve isteğin kaynağını 8.8.8.8 olarak bırakır, böylece sunucu doğrudan 8.8.8.8'e yanıt verebilir.

8.8.8.8 adresindeki kullanıcı ağımıza yetkisiz sızmaya karar verip mesajlarını 192.168.11.2'den gönderiyormuş gibi gösterirse, yönlendirici 192.168.11.2'den gelen trafiğin yalnızca LAN cihazlarından geçerli olduğunu bilir ve genellikle bu trafiği engeller.

Sorun, yerel ağa geri döngü (loop back) yapmaya çalıştığınızda ortaya çıkar. Yerel ağ cihazı `rustdesk.example.com` (`172.16.16.1`) adresine bağlanmaya çalışırsa yönlendirici bir kararsızlıkla karşılaşır: LAN portundan WAN portuna 192.168.11.2'den gelip 172.16.16.1'e giden bir mesaj almıştır. WAN portuna ulaştığında bu mesaj, dışarıdan ağa sızmaya çalışan birinin sahte paketiyle ayırt edilemez hale gelir.

NAT Loopback özelliği, adresteki "192.168.11.2'den gelen" kaynak kısmını sürecin daha başında değiştirir, böylece sunucu ve istemci arasında mesajları iletmek için NAT tablosunu kullanması gerektiğini bilir.

Yalnızca yerel ağın (LAN) içindeyken bağlantı sorunları yaşıyorsanız ancak dışarıdan sorunsuz çalışıyorsa, yaşadığınız sorun tam olarak budur.

## Çözümler
Bu sorunu çözmenin üç yolu vardır.

### 1. Yönlendiricinizde NAT Loopback Kurulumu
Nasıl yapılacağını biliyorsanız yönlendiricinizde NAT Loopback ayarlayabilirsiniz, ancak bunu ayarlamak ağ bilgisi gerektirir. Bazı yönlendiricilerde bu ayarı değiştirme özelliği bulunmadığından bu herkes için en iyi seçenek değildir.

{{% notice note %}}
[MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) tarafından hazırlanan bir makale bunu çok iyi açıklamaktadır. Buradan öğrenmeye başlayabilirsiniz.
{{% /notice %}}

### 2. Yerel Ağınızda bir DNS Sunucusu Dağıtma
Öncelikle hangisini tercih ettiğinizi seçin: [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) veya [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Bunu Docker üzerinden veya RustDesk Sunucunuzla aynı sunucuya dağıtabilirsiniz. Aşağıdaki örnek size bu adımları gösterecektir.

Her ikisi de DNS tabanlı reklam engelleyicilerdir, ancak reklamları engellemek istemiyorsanız bu işlevi devre dışı bırakabilirsiniz.

İlk olarak, `alan adınızı` RustDesk sunucunuzun yerel ağ (LAN) IP'sine (örneğin `192.168.11.20`) yönlendirin. Ardından yönlendiricinizin `DHCP` ayarına gidin (Dikkat: WAN DEĞİL) ve `Birincil` DNS IP'nizi AdGuard Home veya Pi-hole kurduğunuz sunucuya ayarlayın. `İkincil` DNS, internet servis sağlayıcınızın DNS'i veya Cloudflare için `1.1.1.1`, Google için `8.8.8.8` gibi başka bir genel DNS olabilir.

İşte bir örnek:
#### AdGuard Home
Reklam engelleme sorunlara neden olabilir; çözümü araştırmak istemiyorsanız ve bu işlevi devre dışı bırakmak istiyorsanız "Korumayı devre dışı bırak" düğmesine tıklayın.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_disable_protection.png)
<br>

"DNS yeniden yazmaları" (DNS rewrites) ayarına gidin.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_click_dns_rewrites.png)
<br>

"DNS yeniden yazma ekle"ye tıklayın, ardından alana `alan adınızı` ve sunucunuzun `LAN IP`sini yazın.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_dialog.png)

Nihai sonuç aşağıdaki gibi görünecektir:

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_final_result.png)

***AdGuard Home sunucunuzu yönlendiricinizin LAN DHCP ayarlarına tanımlamayı unutmayın!***
<hr>

#### Pi-hole
Reklamları engellemek sorunlara neden olabilir; çözümü aramak istemiyorsanız ve bu işlevi kapatmak istiyorsanız "Disable Blocking" alt menüsündeki "Indefinitely" düğmesine tıklayın.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_disable_blocking.png)

"Local DNS → DNS Records" bölümüne gidin.
Kutuya `alan adınızı` ve `IP` adresinizi yazın, ardından "Add"e tıklayın.

Nihai sonuçları doğrulamak için resimdeki sarı çizgileri kontrol edin.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_local_dns_dns_records.png)

***Pi-hole sunucunuzu yönlendiricinizin LAN DHCP ayarlarına tanımlamayı unutmayın!***

### 3. hosts dosyanıza kurallar ekleme
Bu yöntem yalnızca az sayıda cihazınız varsa önerilir. Çok sayıda cihazınız varsa DNS yöntemi tercih edilmelidir. Aksi takdirde sunucuya erişmesi gereken her cihazda bunu manuel olarak yapmanız gerekir.

{{% notice warning %}}
Bu yöntem dizüstü bilgisayar gibi taşınabilir bir cihazda kullanılırsa, yerel ağınızın dışına çıktığında sunucuya bağlanamayacaktır.
{{% /notice %}}

Farklı İşletim Sistemleri için dosya yolları:

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Yönetici ayrıcalıklarıyla düzenleyebilir veya bu dosyayı `Masaüstü`ne kopyalayıp düzenleyebilirsiniz. Düzenledikten sonra orijinal yola geri kopyalayın.

#### macOS
```text
/etc/hosts
```
Önceden yüklü gelen `vim`i kullanabilirsiniz:
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
`vim` veya `nano` kullanabilirsiniz:
```sh
sudo vim /etc/hosts
```

<hr>

Biçim her üç işletim sisteminde de aynıdır: Önce `IP`, ardından `alan adı`. Her satıra bir girdi.

Örneğin:
```text
192.168.11.20   rustdesk.example.com
```
