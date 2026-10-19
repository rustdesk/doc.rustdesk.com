---
title: Docker
weight: 3
description: "Lisanslama için ana makine ağı (host net) kullanarak Docker Compose ile RustDesk Server Pro kurun. hbbs, hbbr ve web konsolu dağıtım rehberi."
keywords: ["rustdesk server pro docker", "rustdesk pro docker compose", "rustdesk pro host network", "rustdesk hbbs hbbr docker", "rustdesk self-host pro docker"]
---

Docker Compose ve gerekli ana makine ağı (host network) yapılandırması ile RustDesk Server Pro kurmak için bu kılavuzu kullanın.

## RustDesk Server Pro için önerilen Docker kurulumu nedir?

`network_mode: "host"` ile Docker Compose, Linux tabanlı çoğu RustDesk Server Pro dağıtımı için önerilen kurulumdur. `hbbs` ve `hbbr` servislerini tekrarlanabilir tek bir yapılandırmada bir arada tutar ve ana makine ağı kullanılmadığında ortaya çıkabilecek lisanslama sorunlarını önler.

## RustDesk Server Pro Docker kontrol listesi

1. Docker'ı kurun.
2. Anahtarlar ve veritabanı gibi RustDesk dosyaları için kalıcı bir `data` dizini oluşturun.
3. Docker Compose ile `hbbs` ve `hbbr` servislerini başlatın.
4. Gerekli RustDesk portlarını açın; doğrudan web konsolunu kullanıyorsanız özellikle `21114` portunu açın.
5. Web konsolunun bir alan adı arkasında olmasını istiyorsanız HTTPS'i ayrıca ekleyin.

## Ham `docker run` yerine ne zaman Compose kullanmalısınız?

Uzun süreli üretim ortamı dağıtımları ve yükseltmeler için Docker Compose kullanın. Ham `docker run` komutlarını esas olarak test etme, hata ayıklama veya her bir konteyner üzerinde tamamen manuel kontrol istediğiniz ortamlar için kullanın.

## Docker Compose (Önerilen)

Docker Compose ile lisanslamanın çalışmasını sağlamak için MUTLAKA `network_mode: "host"` kullanmalısınız. En güncel sürüm olduğundan emin olmak için Docker'ı bu [kılavuz](https://docs.docker.com/engine/install) ile kurun!

Aşağıdakileri `compose.yml` dosyasına kopyalayın:

```yaml
services:
  hbbs:
    container_name: hbbs
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

Ardından `sudo docker compose up -d` veya `podman-compose up -d` komutunu çalıştırın.

> `podman-compose` kurulumu için `sudo apt install podman-compose`

{{% notice note %}}
[Web konsolu için manuel olarak HTTPS kurma](/docs/tr/self-host/rustdesk-server-pro/faq/#web-konsolu-için-manuel-olarak-https-kurma).
{{% /notice %}}

## Docker Komutları

En güncel sürüm olduğundan emin olmak için Docker'ı bu [kılavuz](https://docs.docker.com/engine/install) ile kurun!

Veya tek bir komutla Docker kurabilirsiniz:

```
bash <(wget -qO- https://get.docker.com)
```

Aşağıdaki komutları çalıştırın (s6 imajı `./data:/root` yerine `./data:/data` gerektirebilir):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Yukarıdaki örnek `sudo` ve `--net=host` kullanır; bu Windows'ta çalışmaz, lütfen bu komutları kaldırın. `--net=host` seçeneğini kaldırırsanız lütfen aşağıdakileri inceleyin.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
[Web konsolu için manuel olarak HTTPS kurma](/docs/tr/self-host/rustdesk-server-pro/faq/#web-konsolu-için-manuel-olarak-https-kurma).
{{% /notice %}}

> Fedora üzerinde SELinux ile sorun yaşıyorsanız lütfen bu [sorunu](https://github.com/rustdesk/rustdesk-server/issues/230) inceleyin.
