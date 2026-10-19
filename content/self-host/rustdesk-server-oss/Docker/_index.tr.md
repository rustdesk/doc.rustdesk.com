---
title: Docker
weight: 7
description: "Docker, Docker Compose veya Podman ile RustDesk Server OSS barındırın. Gerekli portları, ana makine ağı (host net) notlarını ve örnek konteyner tanımlarını inceleyin."
keywords: ["rustdesk docker", "rustdesk docker compose", "rustdesk sunucu docker", "rustdesk hbbs hbbr docker", "rustdesk podman", "rustdesk self-host docker"]
---

Docker, Docker Compose veya Podman ile RustDesk Server OSS'i barındırmak ve `hbbs` ile `hbbr` için doğru portları açmak için bu kılavuzu kullanın.

## RustDesk Server OSS'i Docker'da çalıştırmanın en iyi yolu nedir?

Çoğu Linux dağıtımı için `network_mode: "host"` ile Docker Compose en basit ve en güvenilir seçenektir. Kurulumu tekrarlanabilir tutar, yükseltmeleri kolaylaştırır ve ana makine ağı mevcut olduğunda fazladan port eşleme karmaşıklığını önler.

## Docker dağıtım kontrol listesi

1. Docker veya Podman kurun.
2. `hbbs` ve `hbbr` için kalıcı bir veri dizini veya birimi (volume) oluşturun.
3. Güvenlik duvarınızda gerekli RustDesk portlarını açın.
4. Docker Compose, `docker run` veya Podman Quadlet ile `hbbs` ve `hbbr` konteynerlerini başlatın.
5. İstemcileri yeni sunucuya yönlendirin ve kayıt ile relay trafiğini doğrulayın.

## Hangi konteyner kurulumunu seçmelisiniz?

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| Docker Compose | Çoğu Linux sunucusu | Tekrarlanabilir kurulum ve daha kolay devam eden bakım |
| `docker run` | Hızlı manuel testler | Basit bir konteyner çiftini başlatmanın en hızlı yolu |
| Podman Quadlet | Podman ve systemd ortamları | Yerel systemd tarzı servis yönetimi |

> Burada bir başka faydalı eğitim bulunmaktadır: [Building Your Own Remote Desktop Solution: RustDesk Self-Hosted on Cloud with Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Docker ile kendi sunucunuzu kurun

### Gereksinimler
RustDesk sunucusunu bir Docker konteyneri olarak çalıştırmak için Docker/Podman kurulu olmalıdır. Tereddüt ediyorsanız, en güncel sürüm olduğundan emin olmak için Docker'ı bu [kılavuz](https://docs.docker.com/engine/install) ile kurun!

Güvenlik duvarında bu portları açtığınızdan emin olun:
- `hbbs`:
  - `21114` (TCP): web konsolu için kullanılır, yalnızca `Pro` sürümünde mevcuttur.
  - `21115` (TCP): NAT tipi testi için kullanılır.
  - `21116` (TCP/UDP): **Lütfen `21116`'nın hem TCP hem de UDP için etkinleştirilmesi gerektiğini unutmayın.** `21116/UDP` kimlik kaydı ve sinyal (heartbeat) servisi için kullanılır. `21116/TCP` TCP delik açma ve bağlantı servisi için kullanılır.
  - `21118` (TCP): web istemcilerini desteklemek için kullanılır.
- `hbbr`:
  - `21117` (TCP): Relay servisleri için kullanılır.
  - `21119` (TCP): web istemcilerini desteklemek için kullanılır.

*Web istemcisi desteğine ihtiyacınız yoksa ilgili `21118`, `21119` portları kapatılabilir.*

{{% notice warning %}}
WebSocket etkinleştirildiğinde ([web istemcisi](https://rustdesk.com/web/) için `21118`/`21119` portları açıktır), `hbbs`/`hbbr` istemcinin gerçek IP adresini belirlemek için gelen WebSocket bağlantılarının `X-Real-IP` / `X-Forwarded-For` başlıklarına güvenir, böylece WebSocket trafiği bir ters proxy ([WSS](/docs/tr/self-host/rustdesk-server-pro/faq/#8-tüm-platformlar-için-güvenli-iletişimi-etkinleştirmek-üzere-kimlik-id-ve-relay-sunucusuna-güvenli-websocket-wss-desteği-ekleme)) üzerinden geçtiğinde istemci IP'si korunur. Bu başlıklar doğrulanmaz; bu nedenle `21118`/`21119` portlarına doğrudan ulaşabilen herkes sahte başlıklarla rastgele bir IP adresi taklit edebilir, IP tabanlı hız sınırlamalarını ve engellemeleri atlatabilir ve kayıtlardaki IP adreslerini manipüle edebilir.

Web istemcisini kullanıyorsanız WebSocket portlarını yalnızca `X-Real-IP` değerini kendisi ayarlayan bir ters proxy üzerinden açın ve `21118`/`21119` portlarını yalnızca ters proxy'nin bağlanabileceği şekilde güvenlik duvarı kurallarıyla kısıtlayın. Web istemcisini kullanmıyorsanız `21118` ve `21119` portlarını kapalı tutun.
{{% /notice %}}

### Docker örnekleri

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` yalnızca **Linux** üzerinde çalışır ve `hbbs`/`hbbr`'nin Konteyner IP'si (172.17.0.1) yerine gerçek gelen IP Adresini görmesini sağlar.
`--net=host` sorunsuz çalışıyorsa `-p` seçenekleri kullanılmaz. Windows üzerinde çalışıyorsanız `sudo` ve `--net=host` parametrelerini kaldırın.

**Platformunuzda bağlantı sorunları yaşıyorsanız lütfen `--net=host` seçeneğini kaldırın.**
{{% /notice %}}

{{% notice note %}}
`-td` ile günlükleri göremiyorsanız `docker logs hbbs` ile görebilirsiniz. Ya da `-it` ile çalıştırabilirsiniz, bu durumda `hbbs/hbbr` arka plan (daemon) modunda çalışmaz.
{{% /notice %}}

### Docker Compose örnekleri
Docker dosyalarını burada açıklandığı gibi `compose.yml` ile çalıştırmak için [Docker Compose](https://docs.docker.com/compose/) kurulu olmalıdır.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

Yapılandırma değişiklikleri yapmanız gerekiyorsa (örneğin ALWAYS_USE_RELAY=Y ayarlamak gibi), docker-compose.yml içinde environment kullanabilirsiniz:

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    environment:
      - ALWAYS_USE_RELAY=Y
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

### Podman Quadlet örnekleri

Konteynerleri Podman ile bir systemd servisi olarak çalıştırmak istiyorsanız bu örnek Podman Quadlet yapılandırmalarını kullanabilirsiniz:

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

veya

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```
