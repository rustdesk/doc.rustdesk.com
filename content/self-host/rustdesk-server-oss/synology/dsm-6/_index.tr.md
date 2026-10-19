---
title: Synology DSM 6
weight: 22
description: "Docker ile Synology DSM 6 üzerinde RustDesk Server OSS kurun. Eski Synology sistemlerinde konteyner kurulumu, port eşleme ve kalıcı veri adımlarını izleyin."
keywords: ["rustdesk synology dsm 6", "rustdesk synology docker", "rustdesk nas dsm 6", "rustdesk self-host synology"]
---

Eski NAS sistemlerinde Docker ile Synology DSM 6 üzerine RustDesk Server OSS kurmak için bu kılavuzu kullanın.

> Üçüncü taraftan güncel alternatif bir eğitim [burada](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/) yer almaktadır.

Bu eğitim en son DSM v6 ve v7'yi temel almaktadır.

{{% notice note %}}
DSM 7.2 güncellemesinden sonra Docker yeni "Container Manager" paketine yükseltilmiştir, bunun yerine lütfen [bu makaleyi](/docs/tr/self-host/rustdesk-server-oss/synology/dsm-7/) inceleyin.
{{% /notice %}}

## DSM 6 kılavuzunu ne zaman kullanmalısınız?

Bu kılavuzu yalnızca Synology NAS cihazınız hâlâ DSM 6 kullanıyorsa ve RustDesk Server OSS'i eski Docker paketi aracılığıyla dağıtıyorsanız kullanın. NAS cihazınız zaten DSM 7.2 sürümündeyse bunun yerine Container Manager kılavuzunu kullanın.

## DSM 6 dağıtım kontrol listesi

- NAS cihazınızın hâlâ DSM 6 çalıştırdığını doğrulayın.
- Paket Merkezi'nden Synology `Docker` paketini kurun.
- RustDesk verileri ve anahtarları için kalıcı bir ana makine klasörü oluşturun.
- Hem `hbbs` hem de `hbbr` konteynerlerini ana makine ağı (host network) ve otomatik yeniden başlatma etkin olarak çalıştırın.
- Konteynerler başladıktan sonra `id_ed25519.pub` dosyasını alın.

## Docker Kurulumu

| Paket Merkezi'ni Açın | Docker'ı Kurun |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## RustDesk Server Kurulumu

| Docker kayıt defterinde (registry) rustdesk-server arayın ve çift tıklayarak indirin | İndirilen rustdesk-server imajına çift tıklayarak konteyner oluşturun |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## hbbs konteynerini oluşturma

Yukarıda belirtildiği gibi, yeni bir konteyner oluşturmak için rustdesk-server imajına çift tıklayın, adını `hbbs` olarak ayarlayın.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Yukarıdaki `Gelişmiş Ayarlar` seçeneğine tıklayın.

- `Otomatik yeniden başlatmayı etkinleştir` seçeneğini işaretleyin.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- `Docker Host ile aynı ağı kullan` seçeneğini etkinleştirin. Ana makine ağı hakkında daha fazla bilgi için lütfen [buraya](/docs/tr/self-host/rustdesk-server-oss/docker/#net-host) bakın.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Bir ana makine dizinini (örn. `/home/rustdesk/`) `/root` dizinine bağlayın (mount). hbbs bu dizinde yeniden başlatmalarda kalıcı olması gereken bazı dosyalar (veritabanı ve `key` dosyaları) oluşturacaktır.

| Bağlama (Mount) | Ana makine dizininde oluşturulan dosyalar |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Komut belirleme
{{% notice note %}}
Synology işletim sistemi Debian tabanlıdır; bu nedenle ana makine ağı (--net=host) sorunsuz çalışır ve `-p` seçeneğiyle port eşlememize gerek kalmaz.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Tamamlandı

## hbbr konteynerini oluşturma

Lütfen yukarıdaki `hbbs` adımlarını tekrarlayın, ancak konteyner adını `hbbr` yapın ve komut (Komut Belirleme Adımı için) `hbbr` olmalıdır.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## hbbr/hbbs konteynerleri

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Konteynere çift tıklayıp günlükleri kontrol edin | hbbs/hbbr'nin host ağını kullandığını doğrulayın |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Anahtarınızı (Key) Alma

File Station kullanarak daha önce ayarlanan klasöre gidin, `id_ed25519.pub` dosyasını indirin ve bir metin düzenleyiciyle açarak anahtarınızı görüntüleyin.
