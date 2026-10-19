---
title: Kurulum
weight: 2
description: "Docker, Linux kurulum betikleri veya eski Windows yöntemi ile RustDesk Server Pro kurun. Ortamınız için doğru dağıtım yolunu seçin."
keywords: ["rustdesk server pro kurulum", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux kurulum", "rustdesk pro windows kurulum"]
---

Ortamınız için en iyi RustDesk Server Pro kurulum yöntemini seçmek için buradan başlayın; önerilen seçenek Docker'dır.

## RustDesk Server Pro kurmanın en iyi yolu nedir?

Çoğu ekip için güncellemeler daha basit olduğu ve dağıtımın yeniden üretilmesi daha kolay olduğu için RustDesk Server Pro kurmanın en iyi yolu Docker'dır. Linux'ta yerel systemd servisleri istediğinizde `install.sh` yolu kullanışlıdır. Zaten RustDesk Server çalıştırıyorsanız ve Pro'ya geçmek istiyorsanız açık kaynaktan dönüştürme doğru yoldur.

## Başlamadan önce nelere ihtiyacınız var?

- Bir RustDesk Server Pro lisansı
- Bir Linux sunucusu veya VM ya da Docker'ın zaten mevcut olduğu bir ana makine
- Güvenlik duvarınızda açık gerekli RustDesk portları, ayrıca web konsolu ve API'ye ihtiyacınız varsa `21114` veya `443`
- Bir alan adı üzerinde HTTPS istiyorsanız isteğe bağlı bir DNS adı

## Hangi kurulum yöntemini seçmelisiniz?

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| Docker | Çoğu yeni Pro dağıtımı | En kolay yükseltmeler, daha basit geri alma ve tutarlı kurulum |
| `install.sh` | Yerel servisler isteyen Linux yöneticileri | systemd servisleri oluşturur ve isteğe bağlı olarak Nginx ve Certbot kurabilir |
| Açık kaynaktan dönüştürme | Mevcut OSS dağıtımları | Sıfırdan başlamadan mevcut bir RustDesk Server kurulumunu Pro'ya taşır |

## Yöntem 1: Docker (Önerilen)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Daha fazla ayrıntı için lütfen [Docker](/docs/tr/self-host/rustdesk-server-pro/installscript/docker/) sayfasını inceleyin.

## Yöntem 2: install.sh

Linux konusunda yetkinseniz lütfen aşağıdaki betiği kullanın. Aksi takdirde başarısız olursa önemli sorunlarla karşılaşabilir ve neden çalışmadığını belirlemekte zorlanabilirsiniz.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Daha fazla ayrıntı için lütfen [install.sh](/docs/tr/self-host/rustdesk-server-pro/installscript/script/) sayfasını inceleyin.

## Açık kaynaktan dönüştürme

### Docker
Açık kaynak sürümünü Docker kullanarak kurduysanız bunu dönüştürmenin doğrudan bir yolu yoktur. Bunun yerine Pro imajı ile yeni bir konteyner çalıştırmanız gerekir. Bunu yapmadan önce lütfen özel anahtarınızı (`id_ed25519.pub` değil, `id_ed25519` dosyasını) yedekleyin. Yeni konteyner kurulduktan sonra eski `id_ed25519` özel anahtar dosyasını yeni konteynerin çalışma dizinine kopyalayın, ardından konteyneri yeniden başlatın.

### install.sh
Açık kaynak sürümünü install.sh kullanarak kurduysanız lütfen [bu adımları](/docs/tr/self-host/rustdesk-server-pro/installscript/script/#açık-kaynaktan-dönüştürme) izleyin.
