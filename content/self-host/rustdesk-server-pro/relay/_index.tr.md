---
title: Relay Sunucularını Yapılandırma
weight: 17
description: "Server Pro dağıtımına ek RustDesk relay sunucuları ekleyin ve coğrafi konuma göre bağlantıları en yakın hbbr sunucusuna yönlendirin."
keywords: ["rustdesk relay sunucusu", "rustdesk hbbr", "rustdesk coğrafi konum relay", "rustdesk ek relay", "rustdesk server pro relay"]
---

RustDesk Server Pro'ya ek relay sunucuları eklemek ve coğrafi konuma duyarlı yönlendirme ile bölgesel performansı artırmak için bu kılavuzu kullanın.

## Ne zaman ek relay sunucularına ihtiyaç duyarsınız?

Kullanıcılar bölgeler arası bağlantı kurduğunda ve doğrudan delik açma (hole punching) her zaman mümkün olmadığında ek relay sunucularına ihtiyaç duyarsınız. Fazladan `hbbr` düğümleri, RustDesk'in aktarım trafiğini daha yakın bir bölge üzerinden yönlendirmesini sağlar; bu da relay gerektiğinde gecikmeyi azaltabilir ve oturum kalitesini artırabilir.

## Relay kurulum kontrol listesi

1. Hedef bölgede fazladan bir `hbbr` relay sunucusu dağıtın.
2. `hbbr` üzerindeki `KEY` ortam değişkenini `id_ed25519.pub` dosyasındaki açık anahtara ayarlayın veya `id_ed25519` ile `id_ed25519.pub` dosyalarını relay sunucusuna kopyalayın.
3. `21117` ve `21119` TCP bağlantı noktalarını açın.
4. Yeni relay sunucu adlarını veya IP adreslerini RustDesk Pro web konsoluna ekleyin.
5. `hbbs` üzerine MaxMind GeoLite2 City veritabanını yükleyin.
6. Coğrafi konum ayarlarını yeniden yükleyin ve yeni relay sunucusunun günlüklerde göründüğünü doğrulayın.

## Docker ile ek relay sunucuları nasıl kurulur

{{% notice note %}}
[Basit kurulum](/docs/tr/self-host/rustdesk-server-pro/installscript/), aynı makinede dolaylı olarak bir relay sunucusu (`hbbr` işlemi) oluşturur; ayrıca açıkça bir relay sunucusu belirtmeniz gerekmez.

Başka bir makinede açıkça ek bir relay sunucusu oluşturmak istiyorsanız lütfen [OSS kurulumu](/docs/tr/self-host/rustdesk-server-oss/install/) adımlarını izleyerek `hbbr` çalıştırın. `hbbr` dosyasını `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` paketlerinde veya `docker` içinde (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`) bulabilirsiniz.

`hbbr` bir lisans gerektirmez ve açık kaynaklı sürümle aynıdır.
{{% /notice %}}

Dünya geneline yayılmış birkaç relay sunucusu çalıştırabilir ve uzak bilgisayarlara bağlanırken daha hızlı bir deneyim elde etmek için coğrafi konumu (GeoLocation) kullanarak en yakın relay sunucusunu otomatik olarak belirleyebilirsiniz. `hbbs`, bu relay sunucularının çevrimiçi olup olmadığını birkaç saniyede bir otomatik olarak denetler ve yalnızca çevrimiçi relay sunucularını seçer.

{{% notice note %}}
Bilinen sorun: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> `hbbr` üzerindeki `KEY` ortam değişkenini `id_ed25519.pub` içindeki açık anahtara ayarlayın veya `id_ed25519` ile `id_ed25519.pub` dosyalarını relay sunucusuna kopyalayın.

### Docker Compose

Ek bir relay sunucusu için yalnızca `hbbr` gereklidir; `hbbs` ve `depends_on` gerekmez. Aşağıdaki anahtar yapılandırma yöntemlerinden birini seçin:

- `environment` bölümünü koruyun ve aşağıda gösterildiği gibi `KEY` değişkenini `id_ed25519.pub` içeriğine ayarlayın.
- Tüm `environment` bölümünü kaldırın ve `id_ed25519` ile `id_ed25519.pub` dosyalarını `./data` içine yerleştirin.

Aşağıdaki içeriğe sahip bir `compose.yml` dosyası oluşturun:

```yaml
services:
  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    environment:
      KEY: "<PUBLIC_KEY>"
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

### Docker

#### Anahtarı bir ortam değişkeniyle ayarlama

`KEY` değerini `id_ed25519.pub` içeriğine ayarlayın.

```bash
# sudo docker run --name hbbr -e KEY="<PUBLIC_KEY>" -td --net=host rustdesk/rustdesk-server-pro hbbr
```

#### Anahtar dosyalarını kullanma

Aşağıdaki Docker örneğinde anahtar dosyası yöntemi kullanılır.

1 - Docker zaten yüklüyse, SSH aracılığıyla sunucunuza bağlanın ve hbbr için bir birim (volume) oluşturun.

```
# docker volume create hbbr
```

`hbbr` birimi `/var/lib/docker/volumes/hbbr/_data` konumunda bulunmalıdır.

2 - Özel anahtar çiftini birim konumuna kopyalayın; bu örnekte dosyaları kopyalamak için SCP kullanacağız.

Komut sözdizimi: `scp <dosya_yolu> kullanici_adi@sunucu:</hedef/yol>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Daha önce oluşturulan birimi kullanarak hbbr konteynerini dağıtın. Bu birim, özel relay sunucunuzu çalıştırmak için gereken özel anahtar çiftini barındırır.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server-pro hbbr
```

`rustdesk/rustdesk-server` imajı halen `-k <KEY>` seçeneğini kabul etmektedir. Bağlanan anahtar dosyasını kullanmak için `-k _` parametresiyle çalıştırın:

```bash
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

Burada `_`, anahtarın kendisinden ziyade özel bir değerdir. `hbbr`'a `id_ed25519` dosyasını yüklemesini veya üretmesini, açık anahtarını türetmesini ve aktarım isteklerini doğrulamak için bu anahtarı kullanmasını söyler. 1.8.6 öncesi RustDesk Server Pro sürümleri de `id_ed25519` dosyasını yüklemek için `-k _` seçeneğini kabul ediyordu.

RustDesk Server Pro 1.8.6 sürümünden itibaren, `hbbr` için `-k` seçeneği kullanımdan kaldırılmış ve yoksayılmıştır. `KEY` ayarlanmamışsa, `hbbr` açık anahtarı `id_ed25519` dosyasından türetir veya özel anahtar dosyası yoksa `id_ed25519.pub` dosyasından okur. Her iki dosya da yoksa `hbbr` genel (public) relay modunda çalışır.

4 - hbbr'ın anahtar çiftinizi kullanarak çalıştığını doğrulamak için çalışma günlüklerini kontrol edin.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

İşletim sisteminize bağlı olarak, bir güvenlik duvarı kullanarak IP'leri engellemek veya izin vermek isteyebilirsiniz.

Örneğimizde Ubuntu çalıştırırken 21117 ve 21119 numaralı bağlantı noktalarına gelen tüm TCP bağlantılarına izin vermek istiyoruz.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Güvenlik duvarını etkinleştirin**
```
# sudo ufw enable
```

**Durumu kontrol edin**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Web konsolunda coğrafi konum nasıl yapılandırılır

### GeoLite2 City veritabanı dosyasını kaydedin ve indirin

Coğrafi konumu kullanabilmek için hbbs'in MaxMind GeoLite2 City veritabanına erişimi olması gerekir. Veritabanı ücretsizdir; dosyayı indirmek ve bir API anahtarı almak için kayıt olabilirsiniz.

[Web sitesine](https://www.maxmind.com/en/account/login) giderek bir hesap oluşturun (eğer hesabınız yoksa).
`Download Databases` bölümüne gidin ve GeoLite2 City dosyasını indirin, gzip dosyasını seçin; arşivden çıkardığınızda `mmdb` dosyasını elde edersiniz.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

RustDesk Pro'yu bir Linux makinesine kurulum betiği kullanarak yüklediyseniz, `mmdb` dosyasının `/var/lib/rustdesk-server/` dizinine taşınması gerekir.

Docker kurulumlarında dosya, konteyneri dağıtırken `/root` dizinine eşlediğiniz birimde yer almalıdır.

### Süreci otomatikleştirmek için bir API anahtarı edinin - Linux sunucuları

Bu dosyayı düzenli olarak güncellemeniz gerekir ve bunun için bir cronjob kullanabiliriz. Ücretsiz indirme bağlantısına erişmek için bir API anahtarına ihtiyacınız olacak.

`Manage License Keys` bölümüne gidin ve yeni bir lisans anahtarı oluşturun. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

[İndirme sürecini](https://dev.maxmind.com/geoip/updating-databases) birkaç yolla otomatikleştirebilirsiniz; ancak crontab'ınıza aşağıdaki komutu ekleyip `{Your Access Key}` kısmını önceki adımda aldığınız API anahtarıyla değiştirebilirsiniz:

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### RustDesk Pro Web Konsolundaki ayarları değiştirin

Relay sunucusu IP adreslerinizi veya DNS adlarınızı (DNS 1.1.11 sürümünden itibaren desteklenmektedir) `Relay Servers` (Relay Sunucuları) alanına ekleyin. **Bağlantı noktası belirtilmesi gerekmez, doğrudan `21117` bağlantı noktası kullanılır.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Sunucu IP adresini ve sunucunun bulunduğu koordinatları girerek bir Coğrafi Geçersiz Kılma (Geo Override) ekleyin. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

`Reload Geo` (Coğrafi Konumu Yeniden Yükle) düğmesine tıklayın; listeniz buna benzer görünmelidir: <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Sonuçları doğrulamak için `Reload Geo` seçeneğine tıkladığınızda hbbs günlüklerinizi kontrol edin; relay sunucusu IP adreslerini ve koordinatlarını gösteren bir mesaj görmelisiniz.

> RustDesk Pro'yu bir Linux makinesinde çalıştırıyorsanız günlükleri görüntülemek için `RUST_LOG=debug ./hbbs` komutunu kullanın. Bir Docker konteynerinde çalıştırıyorsanız `docker logs hbbs` komutunu kullanın.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

Ayrıca hbbr konteyner günlüklerini denetleyerek aktarım isteklerini doğrudan hbbr örnekleriniz üzerinden de doğrulayabilirsiniz.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
