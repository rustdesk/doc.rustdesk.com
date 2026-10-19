---
title: install.sh
weight: 4
description: "Lisans aldıktan sonra install.sh betiği ile Linux üzerinde RustDesk Server Pro kurun. Pro sunucu bileşenlerinin basit betik kurulumu için bu yöntemi kullanın."
keywords: ["rustdesk server pro install.sh", "rustdesk pro linux kurulum", "rustdesk pro betik kurulum", "rustdesk self-host pro linux", "rustdesk server pro kurulum rehberi"]
---

Kendi servis kurulumunuzu sıfırdan yazmadan basit bir Linux tabanlı RustDesk Server Pro kurulumu istediğinizde `install.sh` yöntemini kullanın.

{{% notice note %}}
Lisansınızı [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/) adresinden almayı unutmayın; daha fazla ayrıntı için [lisans](/docs/tr/self-host/rustdesk-server-pro/license/) sayfasını inceleyin.

Bu basit kurulumu yapmadan önce lütfen [OSS kurulumunu](/docs/tr/self-host/rustdesk-server-oss/install/) okuyun. Orada arka plandaki temel ayrıntıları daha iyi anlayabilirsiniz.
{{% /notice %}}

## install.sh yöntemini ne zaman kullanmalısınız?

RustDesk Server Pro'yu `systemd` ile bir Linux ana makinesinde dağıtmanın en hızlı yolunu istediğinizde `install.sh` kullanın. Betiğin bağımlılıkları yüklemesini, ikili dosyaları yerleştirmesini, servisler oluşturmasını ve isteğe bağlı olarak web konsolu için HTTPS hazırlamasını istediğiniz doğrudan tek sunuculu kurulumlar için en iyisidir.

## install.sh hızlı yanıtlar

- `systemd` ile basit bir Linux dağıtımı için bu yöntemi kullanın.
- Daha kolay yükseltmeler, geri alma ve konteyner tabanlı operasyonlar istiyorsanız bunun yerine [Docker](/docs/tr/self-host/rustdesk-server-pro/installscript/docker/#docker-compose-önerilen) kullanın.
- Başlamadan önce Pro lisansınızı hazır bulundurun.
- Bir alan adı kullanıyorsanız betik HTTPS için `nginx` ve `certbot` kurulumunu da yapabilir.
- İlk kurulumdan sonraki yükseltmeler için `update.sh` kullanın.

## Kurulum

RustDesk Server Pro'yu kurmak için aşağıdaki komutu Linux terminalinize kopyalayıp yapıştırın:

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
[Docker imajını](/docs/tr/self-host/rustdesk-server-pro/installscript/docker/#docker-compose-önerilen) kullanmanızı öneririm; çözümü dağıtma ve güncelleme sürecini büyük ölçüde basitleştirir. Kaynak tüketimi çok düşüktür.

Ayrıca lütfen yukarıdaki komutu yazma izniniz olmayan bir dizin yerine ana (home) dizininiz altında çalıştırın.
{{% /notice %}}

Betiğin yaptıkları:

- Bazı bağımlılıkları yükler
- Mevcutsa UFW güvenlik duvarını ayarlar
- Bir çalışma dizini `/var/lib/rustdesk-server` ve bir günlük dizini `/var/log/rustdesk-server` oluşturur
- Yürütülebilir dosyaları `/usr/bin` dizinine yükler
- RustDesk Pro Servislerini yukarıdaki klasöre indirir ve çıkarır
- hbbs ve hbbr için systemd servisleri oluşturur (servis adları `rustdesk-hbbs.service` ve `rustdesk-hbbr.service`)
- Domain (Alan Adı) seçerseniz Nginx ve Certbot kurar; böylece API `443` (HTTPS) portunda kullanılabilir hale gelir ve `80` portu üzerinden otomatik olarak yenilenen bir SSL sertifikası alınır. HTTPS hazır olduğunda lütfen `https://alanadiniz.com:21114` yerine `https://alanadiniz.com` ile erişin.

{{% notice note %}}
[Web konsolu için manuel olarak HTTPS kurma](/docs/tr/self-host/rustdesk-server-pro/faq/#web-konsolu-için-manuel-olarak-https-kurma).
{{% /notice %}}

{{% notice note %}}
systemd servisi başlatılamazsa büyük olasılıkla SELinux ile ilgilidir, lütfen [burayı](/docs/tr/self-host/rustdesk-server-pro/faq/#selinux) inceleyin.
{{% /notice %}}

{{% notice note %}}
İstemciniz sunucunuza bağlanamıyorsa veya web konsoluna erişemiyorsanız lütfen [burayı](/docs/tr/self-host/rustdesk-server-pro/faq/#güvenlik-duvarı) inceleyin.
{{% /notice %}}

## Yükseltme

Mevcut RustDesk Server Pro kurulumunuzu yükseltmek için aşağıdaki komutu Linux terminalinize kopyalayıp yapıştırın; bu komut yerel olarak da kaydedilip cron ile zamanlanabilir:

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Bu betikle ilgili sorun yaşarsanız adımları manuel olarak tek tek incelemenizi ve yürütmenizi öneririm.

Lütfen yukarıdaki komutu yazma izniniz olmayan bir dizin yerine ev (home) dizininiz altında çalıştırın.
{{% /notice %}}

Betiğin yaptıkları:

- RustDesk Server Pro'nun yeni sürümlerini kontrol eder
- Yeni bir sürüm bulursa API dosyalarını kaldırır ve yeni yürütülebilir dosyalar ile API dosyalarını indirir

## Açık kaynaktan dönüştürme

RustDesk Server'dan RustDesk Server Pro'ya dönüştürmek için aşağıdaki komutu Linux terminalinize kopyalayıp yapıştırın:

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Lütfen güvenlik duvarınıza `21114` TCP portunu ekleyin; bu port web konsolu ve RustDesk istemcisinde kullanıcı girişi için ek porttur.
{{% /notice %}}

{{% notice note %}}
Bu betikle sorun yaşarsanız Docker kurulumuna geçmeniz önerilir. Alternatif olarak betiği inceleyip adımları tek tek manuel olarak uygulayabilirsiniz.
{{% /notice %}}

Betiğin yaptıkları:

- Eski servisleri devre dışı bırakır ve kaldırır
- Bazı bağımlılıkları yükler
- Varsa UFW güvenlik duvarını ayarlar
- `/var/lib/rustdesk-server` klasörünü oluşturur ve sertifikaları buraya kopyalar
- `/var/log/rustdesk` klasörünü silip `/var/log/rustdesk-server` oluşturur
- RustDesk Pro Servislerini yukarıdaki klasöre indirir ve çıkarır
- hbbs ve hbbr için systemd servisleri oluşturur (servis adları rustdesk-hbbs.service ve rustdesk-hbbr.service)
- Alan Adı (Domain) seçerseniz Nginx ve Certbot kurar; böylece API 443 (HTTPS) portunda kullanılabilir hale gelir ve 80 portu üzerinden otomatik yenilenen bir SSL sertifikası alınır
