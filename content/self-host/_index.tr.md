---
title: Kendi Sunucun (Self-host)
description: "Kendi RustDesk sunucunuzu nasıl barındıracağınızı öğrenin. Güvenli uzak masaüstü erişimi için RustDesk sunucu altyapısının kurulumu, yapılandırması ve dağıtım rehberi."
keywords: ["rustdesk kendi sunucun", "rustdesk self-host", "rustdesk sunucu", "uzak masaüstü sunucusu", "self-hosting rehberi", "rustdesk kurulum", "hbbs hbbr", "rustdesk pro sunucu"]
weight: 5
pre: "<b>2. </b>"
---

RustDesk'i kendi sunucunuzda barındırmak (self-hosting); kendi ID ve relay altyapınızı kontrol etmenizi, dağıtım verilerini yönettiğiniz sistemlerde tutmanızı ve uzak erişimi ağ ve uyumluluk gereksinimlerinize göre optimize etmenizi sağlar.

Destek; OSS (Açık Kaynak) için [Discord](https://discord.com/invite/nDceKgxnkV) üzerinden, Pro için [e-posta](mailto:support@rustdesk.com) üzerinden sağlanmaktadır.

{{% notice note %}}
Ön okuma: [neden uzak masaüstü yazılımını kendi sunucunuzda barındırmalısınız](https://rustdesk.com/blog/why-self-host-remote-desktop-software).
{{% /notice %}}

## Hangi RustDesk sunucusunu seçmelisiniz?

| Seçenek | Kimler İçin | Neler Sunar |
| --- | --- | --- |
| [RustDesk Server OSS](/docs/tr/self-host/rustdesk-server-oss/) | Ücretsiz ve açık kaynaklı bir arka uç isteyen bireyler ve ekipler | `hbbs` ve `hbbr`, topluluk desteği, manuel dağıtım ve yapılandırma |
| [RustDesk Server Pro](/docs/tr/self-host/rustdesk-server-pro/) | Merkezi yönetim ve kurumsal özelliklere ihtiyaç duyan işletmeler | Web konsolu, API, OIDC, LDAP, 2FA, cihaz yönetimi, erişim denetimi ve çoklu relay yönetimi |

## Kendi sunucumuz nasıl çalışır?

Teknik olarak iki yürütülebilir dosya (servis) bulunmaktadır:

- `hbbs` - RustDesk ID (buluşma / sinyalleşme) sunucusu, dinlediği portlar: TCP (`21114` - yalnızca Pro'da HTTP için, `21115`, `21116`, `21118` web socket için) ve UDP (`21116`)
- `hbbr` - RustDesk relay sunucusu, dinlediği portlar: TCP (`21117`, `21119` web socket için)

Kurulum betiği / docker compose / deb paketi aracılığıyla kurulum yaptığınızda her iki servis de yüklenecektir.

RustDesk istemcisinin `hbbr` / `hbbs` ile nasıl iletişim kurduğuna dair [şemaları](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) inceleyebilirsiniz.

RustDesk bir makinede çalıştığı sürece, mevcut IP adresini ve portunu bildirmek için ID sunucusuna (`hbbs`) sürekli sinyal (ping) gönderir.

A bilgisayarından B bilgisayarına bir bağlantı başlattığınızda, A bilgisayarı ID sunucusuyla iletişime geçer ve B bilgisayarıyla iletişim kurmayı talep eder.

ID sunucusu daha sonra delik açma (hole punching) yöntemini kullanarak A ve B'yi doğrudan birbirine bağlamaya çalışır.

Delik açma başarısız olursa, A bilgisayarı B ile relay sunucusu (`hbbr`) aracılığıyla iletişim kurar.

Vakaların büyük çoğunluğunda delik açma başarılı olur ve relay sunucusu hiçbir zaman kullanılmaz.

Burada [Bir RustDesk sunucusunu kendi altyapınızda barındırmalı mısınız?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/) üzerine bir tartışma bulunmaktadır.

## Gerekli Portlar

RustDesk Sunucusunu kendi ortamınızda barındırmak için gereken portlar büyük ölçüde ortamınıza ve RustDesk ile ne yapmak istediğinize bağlıdır. Dokümanlar boyunca gösterilen örnekler genellikle tüm ilgili portların açılmasını önerir.

Temel Portlar: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: RustDesk Server Pro'da HTTP API sunucusu için kullanılır.
- TCP `21115`: NAT tipi testi için kullanılır.
- UDP `21116`: Cihaz kaydı için kullanılır.
- TCP `21116`: Cihaz kaydı ve NAT delik açma için kullanılır.
- TCP `21117`: Relay iletişimi için kullanılır.
- TCP `21118`: WebSocket iletişimi için kullanılır.
- TCP `21119`: WebSocket iletişimi için kullanılır.

`21115`-`21117` aralığındaki portlar RustDesk'in çalışması için gereken minimum portlardır. Bunlar sinyal, relay ve NAT geçişini yönetir.

WSS yapılandırması için TCP `21118` ve TCP `21119` genellikle dışarıya açılmasına gerek olmayan portlardır çünkü bunlara Nginx gibi ters proxy tarafından dahili olarak erişilir. WebSocket kullanmıyorsanız bu portların açılmasına gerek yoktur. Lütfen bu [örnek Nginx yapılandırmasına](/docs/tr/self-host/rustdesk-server-pro/faq/#8-tüm-platformlar-için-güvenli-iletişimi-etkinleştirmek-üzere-kimlik-id-ve-relay-sunucusuna-güvenli-websocket-wss-desteği-ekleme) bakın.

SSL proxy'si olmayan Pro kullanıcıları için API'nin çalışması adına TCP `21114` portunu açmanız gerekir. Sunucu için HTTPS (`443`) yapılandırılmışsa TCP `21114` portunun İnternet'e açılmasına gerek kalmaz.

RustDesk ayrıca yalnızca TCP `443`'ün açıldığı ve diğer tüm portların kapatıldığı bir dağıtım modunu da destekler. Bu yapılandırmada iletişim yalnızca WSS relay üzerinden çalışabilir ve doğrudan eşler arası (P2P) bağlantılar kullanılamaz.

{{% children depth="4" showhidden="true" %}}
