---
title: Kurulum
weight: 1
description: "Docker, systemd betikleri veya Debian paketleri ile RustDesk Server OSS kurun. Sunucu gereksinimlerini, güvenlik duvarı kurallarını ve istemci ayarlarını inceleyin."
keywords: ["rustdesk sunucu kurulumu", "rustdesk server oss kur", "rustdesk docker kurulumu", "rustdesk sunucu güvenlik duvarı portları", "rustdesk hbbs hbbr kur", "rustdesk self-host kurulum"]
---

RustDesk Server OSS'i kurmak, gerekli güvenlik duvarı portlarını açmak ve istemcileri yeni sunucuya bağlamak için bu kılavuzu kullanın.

## RustDesk Server OSS kurmanın önerilen yolu nedir?

Çoğu dağıtım için Docker, yeniden üretilmesi, yükseltilmesi ve sunucular arasında taşınması en kolay yöntem olduğundan önerilen kurulum yöntemidir. Linux'ta yerel servisleri tercih ediyorsanız bir systemd kurulum betiği veya Debian paketleri de oldukça iyi sonuç verir.

## Hangi kurulum yöntemini seçmelisiniz?

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| Docker | Çoğu self-hosted dağıtım | En basit yükseltmeler, öngörülebilir kurulum ve kolay geri alma |
| Kurulum betiği | Hızlıca systemd servisi isteyen Linux yöneticileri | `hbbs`, `hbbr` ve istemci yapılandırma akışını daha az manuel çabayla kurar |
| Debian paketi | Paket araçlarını kullanan Debian tabanlı sistemler | Kurulumu yerel paket yönetimine daha yakın tutar |

## Video eğitimleri
YouTube üzerinde birçok video eğitimi bulunmaktadır: https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Sunucu Gereksinimleri
Donanım gereksinimleri oldukça düşüktür; temel bir bulut sunucusunun minimum yapılandırması yeterlidir, CPU ve bellek gereksinimleri minimum düzeydedir. Bir Raspberry Pi veya benzeri bir cihaz da kullanabilirsiniz. Ağ bant genişliği açısından, TCP delik açma (hole punching) doğrudan bağlantısı başarısız olursa relay trafiği tüketilecektir. Bir relay bağlantısının bant genişliği, çözünürlük ayarlarına ve ekran güncellemelerine bağlı olarak 30 K/sn ile 3 M/sn (1920x1080 ekran) arasındadır. Yalnızca standart ofis çalışması ihtiyacı için trafik yaklaşık 100 K/sn civarındadır.

## Güvenlik Duvarı
UFW kullanıyorsanız güvenlik duvarını yapılandırmak için aşağıdaki komutları çalıştırın:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

{{% notice warning %}}
WebSocket etkinleştirildiğinde ([web istemcisi](https://rustdesk.com/web/) için `21118`/`21119` portları açıktır), `hbbs`/`hbbr` istemcinin gerçek IP adresini belirlemek için gelen WebSocket bağlantılarının `X-Real-IP` / `X-Forwarded-For` başlıklarına güvenir, böylece WebSocket trafiği bir ters proxy ([WSS](/docs/tr/self-host/rustdesk-server-pro/faq/#8-tüm-platformlar-için-güvenli-iletişimi-etkinleştirmek-üzere-kimlik-id-ve-relay-sunucusuna-güvenli-websocket-wss-desteği-ekleme)) üzerinden geçtiğinde istemci IP'si korunur. Bu başlıklar doğrulanmaz; bu nedenle `21118`/`21119` portlarına doğrudan ulaşabilen herkes sahte başlıklarla rastgele bir IP adresi taklit edebilir, IP tabanlı hız sınırlamalarını ve engellemeleri atlatabilir ve kayıtlardaki IP adreslerini manipüle edebilir.

Web istemcisini kullanıyorsanız WebSocket portlarını yalnızca `X-Real-IP` değerini kendisi ayarlayan bir ters proxy üzerinden açın ve `21118`/`21119` portlarını yalnızca ters proxy'nin bağlanabileceği şekilde güvenlik duvarı kurallarıyla kısıtlayın. Web istemcisini kullanmıyorsanız `21118` ve `21119` portlarını kapalı tutun.
{{% /notice %}}

## Kurulum
### Yöntem 1: Docker (Önerilen)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Daha fazla ayrıntı için lütfen [Docker](/docs/tr/self-host/rustdesk-server-oss/docker/) sayfasına bakın.

### Yöntem 2: Basit bir kurulum betiği ile kendi sunucunuzu systemd servisi olarak kurma
Betik [Techahold](https://github.com/techahold/rustdeskinstall) üzerinde barındırılmakta ve [Discord](https://discord.com/invite/nDceKgxnkV) kanalımızda desteklenmektedir.

Betik şu anda Relay ve Sinyal Sunucularını (hbbr ve hbbs) indirecek, kuracak, yapılandırmalar oluşturacak ve istemcilere basit dağıtım için bunları parola korumalı bir web sayfasında barındıracaktır.

Aşağıdaki komutları çalıştırın:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

Ayrıca [Techahold'un](https://github.com/techahold/rustdeskinstall) deposunda bir güncelleme betiği de bulunmaktadır.

Oradan, kurulumun sonunda gösterilen IP/DNS ve Anahtarı (Key) not edin ve bunları istemcinizin Ayarlar > Ağ > ID/Relay sunucusu altındaki `ID sunucusu` ve `Key` alanlarına ekleyin, diğer alanları boş bırakın.

### Yöntem 3: Debian dağıtımları için deb dosyası kullanarak kendi sunucunuzu systemd servisi olarak kurma

Lütfen deb dosyalarını [GitHub](https://github.com/rustdesk/rustdesk-server/releases/latest) üzerinden kendiniz indirin ve `apt-get -f install <dosya-adi>.deb` veya `dpkg -i <dosya-adi>.deb` ile kurun.

## Sunucu kurulumundan sonra istemcilerin neye ihtiyacı var?

Sunucu çalıştıktan sonra istemciler genellikle `ID Sunucusu` adresine ve sunucunun genel `Key` (Anahtar) değerine ihtiyaç duyar. RustDesk Server Pro istemcilerini yapılandırıyorsanız `API Sunucusu`na da ihtiyacınız olabilir. Lütfen [bu sayfayı](/docs/tr/self-host/client-configuration/#2-manuel-yapılandırma) inceleyin.
