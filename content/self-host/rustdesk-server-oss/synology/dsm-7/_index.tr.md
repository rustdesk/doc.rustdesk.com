---
title: Synology DSM 7.2
weight: 20
description: "Container Manager ile Synology DSM 7.2 üzerinde RustDesk Server OSS kurun. Güncellenmiş Synology Docker iş akışını, desteklenen modelleri ve adımları izleyin."
keywords: ["rustdesk synology dsm 7.2", "rustdesk container manager", "rustdesk synology nas", "rustdesk synology docker", "rustdesk self-host synology"]
---

Container Manager ile Synology DSM 7.2 üzerinde RustDesk Server OSS kurmak için bu kılavuzu kullanın.

DSM 7.2 güncellemesinden sonra Synology, "Docker" paketini "Container Manager" olarak yeniden adlandırdı. Yeni bir kullanıcı arayüzü sunar ve arayüz içinde "docker-compose" desteğiyle birlikte gelir, bu da Docker oluşturmayı çok daha kolay hale getirir.

## DSM 7.2 kılavuzunu ne zaman kullanmalısınız?

Synology NAS cihazınız DSM 7.2 çalıştırıyorsa ve RustDesk Server'ı Synology Container Manager ile dağıtmak istiyorsanız bu kılavuzu kullanın. Güncel Synology yöntemidir ve eski DSM 6 Docker iş akışına göre bakımı daha kolaydır.

## DSM 7.2 dağıtım kontrol listesi

- NAS modelinizin Container Manager'ı desteklediğini doğrulayın.
- Paket Merkezi'nden `Container Manager` kurun.
- RustDesk verileri için kalıcı bir paylaşımlı klasör oluşturun.
- Tek bir compose projesinde hem `hbbs` hem de `hbbr` servislerini dağıtın.
- `id_ed25519.pub` dosyasını alın ve istemcilerinizi yapılandırın.
- Yönlendiricinizde gerekli RustDesk portlarını yönlendirin.

## Desteklenen modeller ve gereksinimler

Container Manager, J serisi gibi bazı giriş seviyesi modeller için ARM64 desteği sunar. Desteklenen modellerin ayrıntılı listesi için lütfen [Synology web sitesini](https://www.synology.com/en-us/dsm/packages/ContainerManager) inceleyin.
Çoğu zaman Docker ve RustDesk Server'ı kurmak için ekstra RAM takmanıza gerek kalmaz.

## 1. Container Manager (Docker) Kurulumu

"Paket Merkezi"ni açın, "Container Manager"ı aratıp yükleyin.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. Klasör Oluşturma

"Container Manager"ı kurduktan sonra `docker` adında bir Paylaşılan Klasör oluşturulacaktır; sunucumuzun verilerini buraya yerleştirelim.

File Station'ı açın, `rustdesk-server` adında bir klasör oluşturun (veya dilediğiniz başka bir isim). Ardından resimdeki gibi içinde `data` adında bir klasör oluşturun.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. Konteyner Oluşturma

Container Manager'ı açın, Proje (Project) bölümüne gidin ve Oluştur'a (Create) tıklayın.

Proje adını `rustdesk-server` olarak girin ve Kaynak (Source) seçeneğini "compose.yml Yükle" yerine "compose.yml Oluştur" olarak değiştirin ve aşağıdaki içeriği kutuya yapıştırın.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Pro kurmak istiyorsanız bunu rustdesk/rustdesk-server-pro:latest olarak değiştirin.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Pro kurmak istiyorsanız bunu rustdesk/rustdesk-server-pro:latest olarak değiştirin.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Docker host modu kullanıldığı için
# Portları hatırlatmak gerekirse:
# 21114 TCP web konsolu için, yalnızca Pro sürümünde mevcuttur
# 21115 TCP NAT tipi testi için
# 21116 TCP TCP delik açma (hole punching)
# 21116 UDP sinyal (heartbeat)/ID sunucusu
# 21117 TCP relay
```

Lütfen `Web portal ayarları` adımını atlayıp tamamlayın.

## 4. Çalışıp Çalışmadığını Kontrol Etme

File Station'ı açın, `docker/rustdesk-server/data` klasörünüzde `id_ed25519` ve `id_ed25519.pub` dosyalarını görmelisiniz. Bunu indirebilir ve herhangi bir metin düzenleyiciyle veya [Synology Metin Düzenleyicisi](https://www.synology.com/en-us/dsm/packages/TextEditor) ile açabilirsiniz. Bu, RustDesk istemciniz için ihtiyacınız olan genel anahtardır (public key).

Genel anahtar şu şekilde görünecektir:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

İstemcinizi kurmak için [buraya](/docs/tr/client/) bakın. Yalnızca `ID sunucusu` ve `Key` gereklidir. `Relay sunucusu` gerekli değildir çünkü bunu `hbbs` içinde belirttik; `hbbs` bu bilgiyi istemciye otomatik olarak sağlayacaktır.

## 5. Yönlendiricinizde port yönlendirmeyi ayarlama

Yönlendiricinizin yönetim web sayfasına gidin, `Port yönlendirme` (Port forwarding) ile ilgili ayarı bulun; genellikle `WAN` veya `Güvenlik Duvarı` ayarlarında yer alır.

Ayarı yine de bulamıyorsanız Google'da `{Yönlendirici markası} + port forwarding` veya `{Yönlendirici modeli} + port forwarding` araması yapın. Bu cihaz servis sağlayıcınızdan geldiyse onlara danışın.

Şu gerekli portları açın:
  * `21114` TCP: Web konsolu için, yalnızca Pro sürümünde mevcuttur
  * `21115` TCP: NAT tipi testi için
  * `21116` TCP: TCP delik açma
  * `21116` UDP: Sinyal / ID sunucusu
  * `21117` TCP: Relay
