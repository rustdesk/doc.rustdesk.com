---
title: Sıkça Sorulan Sorular (SSS)
description: "RustDesk Server Pro kurulumu, yapılandırması, lisanslama, sorun giderme ve taşıma hakkında sıkça sorulan sorular. Yaygın sorunlar, SSL, veritabanı ve yükseltmeler."
keywords: ["rustdesk server pro sss", "rustdesk pro yardım", "rustdesk kurulum yardımı", "rustdesk sorun giderme", "rustdesk sunucu kurulumu", "rustdesk lisans sorunları", "rustdesk ssl yapılandırması"]
weight: 600
---

## RustDesk Server Pro hızlı yanıtlar

Bu SSS bölümü en yaygın RustDesk Server Pro görevlerini kapsar: Kurulum, OSS'ten geçiş, yükseltmeler, lisans taşıma, günlük kaydı, SMTP sorunları ve cihaz yönetimi problemleri. Sıfırdan başlıyorsanız [kurulum kılavuzu](/docs/tr/self-host/rustdesk-server-pro/installscript/) ile başlayın. Zaten çalışan bir sunucunuz varsa en yaygın takip sayfaları [Lisans](/docs/tr/self-host/rustdesk-server-pro/license/), [SMTP](/docs/tr/self-host/rustdesk-server-pro/smtp/) ve [İstemci Dağıtımı](/docs/tr/self-host/client-deployment/)'dır.

{{% notice note %}}
Sorun giderme yardımı: ["bağlandı, görüntü bekleniyor"](https://rustdesk.com/blog/rustdesk-connected-waiting-for-image).
{{% /notice %}}

## Her yaygın görev için hangi sayfayı kullanmalısınız?

| Görev | En İyi Sayfa |
| --- | --- |
| Yeni bir Pro sunucu kurmak | [Kurulum](/docs/tr/self-host/rustdesk-server-pro/installscript/) |
| Docker ile Pro kurmak | [Docker kurulumu](/docs/tr/self-host/rustdesk-server-pro/installscript/docker/) |
| OSS'ten Pro'ya geçmek | [Kurulum](/docs/tr/self-host/rustdesk-server-pro/installscript/#açık-kaynaktan-dönüştürme) |
| Lisans satın almak veya taşımak | [Lisans](/docs/tr/self-host/rustdesk-server-pro/license/) |
| E-posta bildirimlerini ayarlamak | [SMTP](/docs/tr/self-host/rustdesk-server-pro/smtp/) |
| SSO veya kimlik girişini yapılandırmak | [OIDC](/docs/tr/self-host/rustdesk-server-pro/oidc/) veya [LDAP](/docs/tr/self-host/rustdesk-server-pro/ldap/) |
| İstemcileri büyük ölçekte dağıtmak | [İstemci Dağıtımı](/docs/tr/self-host/client-deployment/) |

## Basit Kurulum Betiği ile nasıl kurulum yapabilirim?
1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) adresinden lisansınızı alın, daha fazla ayrıntı için [lisans](/docs/tr/self-host/rustdesk-server-pro/license/) sayfasına bakın.
2. Bir VPS, fiziksel sunucu (bare metal) veya Linux sanal makinesi (VM) oluşturun.
3. DNS ve SSL kullanmak istiyorsanız bir DNS adı oluşturun (örn. `rustdesk.alanadiniz.com`).
4. [Bu sayfaya](/docs/tr/self-host/rustdesk-server-pro/installscript/#yöntem-2-installsh) gidin.
5. Komutu kopyalayıp Linux terminalinize yapıştırın.
6. Kurulum boyunca size rehberlik eden komut istemlerini takip edin.
7. Kurulum tamamlandığında `https://rustdesk.alanadiniz.com` veya `http://sunucu_ip_adresiniz:21114` adresine gidin.
8. `admin` kullanıcı adı ve `test1234` parolası ile giriş yapın.
9. 1. adımda satın aldığınız lisans kodunu girin.

## RustDesk Server Açık Kaynaktan RustDesk Server Pro'ya nasıl geçebilirim?
1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) adresinden lisansınızı alın, daha fazla bilgi için [lisans](/docs/tr/self-host/rustdesk-server-pro/license/) sayfasına bakın.
2. TCP 21114 bağlantı noktasını açın.
3. RustDesk Sunucunuzda oturum açın.
4. Henüz DNS kullanmadıysanız ve SSL kullanmak istiyorsanız bir DNS adı oluşturun (örn. `rustdesk.alanadiniz.com`).
5. [Bu sayfaya](/docs/tr/self-host/rustdesk-server-pro/installscript/#açık-kaynaktan-dönüştürme) gidin.
6. Komutu kopyalayıp Linux terminalinize yapıştırın.
7. Kurulum boyunca size rehberlik eden komut istemlerini takip edin.
8. Kurulum tamamlandığında `https://rustdesk.alanadiniz.com` veya `http://sunucu_ip_adresiniz:21114` adresine gidin.
9. `admin` kullanıcı adı ve `test1234` parolası ile giriş yapın.
10. 1. adımda satın aldığınız lisans kodunu girin.

## RustDesk Server Pro'nun yeni bir sürümü çıktı, nasıl yükseltebilirim?
Öncelikle veri dosyalarını (sqlite3 dosyaları vb.) yedeklemeniz önerilir, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Betik ile kurduysanız (`install.sh`)
Lütfen [update.sh](/docs/tr/self-host/rustdesk-server-pro/installscript/script/#yükseltme) betiğini çalıştırın.
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Ancak bu durum Docker sürümünüze bağlıdır; daha fazla bilgi için [burayı](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository) kontrol edin.
- ### Docker
```
sudo docker ps
## kılavuzumuzu izlediyseniz <CONTAINER NAME> (örn. `hbbs` ve `hbbr`) de kullanabilirsiniz.
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # daha önce kurduğunuz komutun aynısı
```

Örneğin:

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Daha fazla ayrıntı için [bu makaleyi](https://www.cherryservers.com/blog/how-to-update-docker-image) inceleyin.

## Betik ile kurdum, servisleri nasıl başlatıp durdurabilirim?
Servisler systemd kullandığından `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` komutlarıyla (örneğin `sudo systemctl restart rustdesk-hbbs`) başlatılabilir ve durdurulabilir.

## Betik ile kurdum, Linux günlüklerini nasıl görüntüleyebilirim?
Günlükler `/var/log/rustdesk-server` konumunda saklanır. `tail /var/log/rustdesk-server/hbbs.log` veya `tail /var/log/rustdesk-server/hbbs.error` komutlarıyla görüntüleyebilirsiniz.

## Betik ile kurdum, RustDesk servislerinin durumunu nasıl kontrol edebilirim?
Durumu kontrol etmek için `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` (örneğin `sudo systemctl status rustdesk-hbbs`) komutunu kullanabilirsiniz.

## Yönetici parolasını nasıl değiştirebilirim?
1. `https://rustdesk.alanadiniz.com` veya `http://sunucu_ip_adresiniz:21114` adresine gidin.
2. `admin` kullanıcı adı ve `test1234` parolası ile giriş yapın.
3. Sağ üst köşedeki `admin` öğesine tıklayın.
4. `Ayarlar` (Settings) seçeneğine tıklayın.
5. İlgili kutulara yeni parolanızı girin.

## Lisansımı yeni bir sunucuya nasıl taşıyabilirim?
Lütfen [buraya](/docs/tr/self-host/rustdesk-server-pro/license/#faturalar-lisans-alma-ve-taşıma) bakın.

## VPS sunucumdan e-postalar gönderilmiyor
Birçok VPS sağlayıcısı 465 ve 25 numaralı bağlantı noktalarını engeller.

Bunu kontrol etmenin basit bir yolu telnet kullanmaktır. Linux terminalinde test etmek için `telnet posta.sunucunuz.com 25` yazın. Windows'ta PowerShell ile `Test-NetConnection -ComputerName posta.sunucunuz.com -Port 25` komutunu kullanın.

Posta sunucunuz 25 numaralı portu kullanmıyor olabilir. Lütfen doğru portları kullandığınızdan emin olun.

## RustDesk'i PowerShell veya benzeri bir yöntemle dağıtabilir miyim?
Elbette, dağıtıma yardımcı betikleri [burada](/docs/tr/self-host/client-deployment/) bulabilirsiniz.

## Hata raporunu nasıl iletebilirim?
Lütfen [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues) üzerinden bildirin.

## Kendi sunucumda barındırıyorsam bu neden ücretsiz ve açık kaynaklı değil?
1. RustDesk birçok kişi için tam zamanlı bir iş haline geldi; herkesin hayatı, eşleri, işleri ve ilgilenilmesi gereken, masraf gerektiren çocukları var!
2. Gelecek yıllarda da burada olmak ve harika ilerlemeler kaydetmeye devam etmek istiyoruz.
3. Açık kaynaklı sürüm açık kaynak kalmaya devam edecek ve başkalarını AGPL lisansına uygun gelişmeler yapmaya teşvik ediyoruz.

## Farklı gruplardaki cihazlara bağlanamıyorum, neden?
Bu kolayca çözülür; gruplar arası erişime izin vermeniz gerekir.
1. Yeni gruplar ekleyin.
2. `Düzenle` (Edit) düğmesine tıklayın.
3. Erişmek istediğiniz ilgili grupları seçin (otomatik olarak karşı grupta da eklenir).

## Yapılandırmaları otomatik olarak nasıl alabilirim?
Yapılandırmalar otomatik olarak oluşturulur.
1. En yeni istemcileri [GitHub](https://github.com/rustdesk/rustdesk/releases/latest)'tan indirin.
2. Web konsolunun ana sayfasında `Windows EXE` seçeneğine tıklayın.
3. Sunucu adresi ve API bilgilerini girin (yapılandırmanızdan farklıysa).
4. `Gönder` (Submit) seçeneğine tıklayın.
5. Android'de QR Kodunu tarayın ve exe dosyasını oluşturulan ada göre yeniden adlandırın.

## RustDesk Server Pro için barındırma (hosting) hizmeti sunuyor musunuz?
Lütfen [satış](mailto://sales@rustdesk.com) ekibimizle iletişime geçin.

## Video kurulum kılavuzlarını görebileceğim bir yer var mı?
Evet! Bir [YouTube Kanalımız](https://youtube.com/@RustDesk) var.

## Günlüklerim / cihaz adlarım neden boş?
Kontrol edilen cihazda API'nin doğru ayarlandığından emin olun, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## RustDesk Server Pro'yu nasıl kaldırabilirim?
Aşağıdaki komutları çalıştırın:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm /etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
Betiğin Nginx kurması durumunda kaldırmak için:
```sh
sudo apt remove nginx
```

## Web konsolundaki cihaz listesinden cihazları nasıl kaldırabilirim?
Cihazı önce devre dışı bırakın, ardından silme seçeneği kullanılabilir hale gelecektir.

## PowerShell ile RustDesk'i nasıl güncelleyebilirim?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver en yeni sürümdür."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## `Key mismatch` (Anahtar uyuşmazlığı) hatası
Lütfen istemcinizi [doğru anahtar](/docs/tr/self-host/rustdesk-server-pro/relay/) ile yapılandırın.

## `Failed to connect to relay server` (Relay sunucusuna bağlanılamadı) hatası
Lütfen `hbbr`'ın çalıştığından emin olun. `hbbr` hakkında daha fazla bilgiyi [burada](/docs/tr/self-host/rustdesk-server-oss/install/) bulabilirsiniz.
`hbbr` sunucunuz `hbbs` ile aynı makinede çalışmıyorsa veya birden fazla relay sunucunuz varsa ya da varsayılan `21117` portunda çalıştırmıyorsanız, bunu `hbbs`'e açıkça belirtmeniz gerekir. Lütfen [burayı](/docs/tr/self-host/rustdesk-server-pro/relay/) kontrol edin.

## Yönetici hesabı için MFA'yı (2FA) sıfırlama
https://github.com/rustdesk/rustdesk/discussions/6576

## Web konsolu için manuel olarak HTTPS kurma

### 1. Bir alan adı satın alın ve sunucunuzun IP adresine yönlendirin.
* GoDaddy, Namecheap veya Namesilo gibi bir alan adı kayıt kuruluşundan alan adı satın alın.
* Aşağıdakilerden birini kullanarak alan adını sunucunuzun IP adresine yönlendirin:
    - Alan adı kayıt kuruluşunuzun kontrol paneli (önerilir)
    - [DNS sağlayıcıları](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Örneğin, `Namesilo`'dan `example.com` alan adını satın aldıysanız ve sunucunuzun IP adresi `123.123.123.123` ise, HTTPS web konsolu adresiniz olarak `rustdesk.example.com` alt alan adını kullanmak istiyorsunuz. [Bağlantıyı](https://www.namesilo.com/account_domains.php) açmanız, `Manage dns for the domain` ipucuna sahip butona tıklamanız ve `rustdesk` ana bilgisayar adı ile sunucunuzun IP adresini içeren bir `A` kaydı eklemeniz gerekir.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* DNS'in etkili olması biraz zaman alabilir; https://www.whatsmydns.net adresinden alan adının sunucunuzun IP adresine çözümlenip çözümlenmediğini kontrol edin. 6. adım doğru çözümleme sonucuna bağlıdır. Aşağıdaki adımlarda `YOUR_DOMAIN` yerine alt alan adınızı (örn. `rustdesk.example.com`) yazın.

### 2. Nginx Kurulumu
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` veya `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Alpine: `sudo apk add --no-cache nginx`

Başarıyla kurulup kurulmadığını kontrol etmek için `nginx -h` çalıştırın.

### 3. Certbot Kurulumu
* Yöntem 1: `snap` yüklüyse, `sudo snap install certbot --classic` çalıştırın.
* Yöntem 2: `python3-certbot-nginx` paketini kullanın, örn. Ubuntu için `sudo apt-get install python3-certbot-nginx`.
* Yöntem 3: Yukarıdaki iki yöntem başarısız olursa `certbot-nginx` paketini kurmayı deneyin, örn. CentOS 7 için `sudo yum install certbot-nginx`.

Başarıyla kurulup kurulmadığını kontrol etmek için `certbot -h` çalıştırın.

### 4. Nginx Yapılandırması
İki yol vardır:
* `/etc/nginx/sites-available` ve `/etc/nginx/sites-enabled` dizinleri mevcutsa, aşağıdaki komuttaki `YOUR_DOMAIN` ifadesini alan adınızla değiştirip çalıştırın.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Ardından `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf` komutunu çalıştırın.

İçeriğin doğru olduğundan emin olmak için `cat /etc/nginx/sites-available/rustdesk.conf` çalıştırın.

* `/etc/nginx/sites-available` ve `/etc/nginx/sites-enabled` dizinleri yoksa ve `/etc/nginx/conf.d` dizini varsa, aşağıdaki komuttaki `YOUR_DOMAIN` ifadesini alan adınızla değiştirip çalıştırın.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
İçeriğin doğru olduğundan emin olmak için `cat /etc/nginx/conf.d/rustdesk.conf` komutunu çalıştırın.

### 5. Alan adı için güvenlik duvarı kurallarını etkinleştirin
Aşağıdaki komutları çalıştırın:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. SSL sertifikası oluşturun
`$YOUR_DOMAIN` ifadesini alan adınızla değiştirin, ardından çalıştırın:
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

`Enter email address (used for urgent renewal and security notices)` uyarısı gelirse e-posta adresinizi girin.

Son olarak `rustdesk.conf` içeriği şu şekilde olmalıdır:
```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # Certbot tarafından yönetilir
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # Certbot tarafından yönetilir
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # Certbot tarafından yönetilir
    include /etc/letsencrypt/options-ssl-nginx.conf; # Certbot tarafından yönetilir
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # Certbot tarafından yönetilir
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # Certbot tarafından yönetilir

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # Certbot tarafından yönetilir
}
```

İşte bazı yaygın hatalar:

* Konsolda `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../rustdesk.conf` yerine `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default` yazması.

Nedeni Certbot'un `rustdesk.conf` dosyasını bulamaması olabilir; aşağıdaki çözümlerden birini deneyebilirsiniz:
- 5. adımın sonucunu kontrol edin, `sudo service nginx restart` komutunu çalıştırın.
- `YOUR_DOMAIN` içeren `server{...}` sunucu yapılandırmalarını `rustdesk.conf` dosyasına kopyalayın ve `location{...}` kısmını aşağıdaki içerikle değiştirin:

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours` (Son 168 saat içinde bu tam alan adı kümesi için çok fazla sertifika düzenlendi)

Çözüm: DNS'e başka bir alan adı ekleyin ve `YOUR_DOMAIN` değerini buna göre değiştirin (örn. `rustdesk2.example.com`). Ardından 1, 4 ve 6. adımları tekrarlayın.

* `Error getting validation data` (Doğrulama verisi alınırken hata)

Çözüm: Güvenlik duvarından kaynaklanıyor olabilir, lütfen [güvenlik duvarı](#güvenlik-duvarı) bölümüne bakın.

Uyarı: `rustdesk.conf` dosyasını manuel olarak değiştirirseniz `sudo service nginx restart` komutunu çalıştırın.

### 7. Web sayfasına giriş yapın
* Tarayıcıda `https://YOUR_DOMAIN` adresini açın, varsayılan "admin" kullanıcı adı ve "test1234" parolasıyla giriş yapın, ardından parolayı kendinize ait bir parolayla değiştirin.

### 8. Tüm platformlar için güvenli iletişimi etkinleştirmek üzere kimlik (id) ve relay sunucusuna Güvenli WebSocket (WSS) desteği ekleme

Aşağıdaki yapılandırmayı `/etc/nginx/.../rustdesk.conf` dosyasının ilk `server` bölümüne ekleyin, ardından `Nginx` servisini yeniden başlatın. 
Web istemcisine `https://YOUR_DOMAIN/web` üzerinden erişilebilir. Özel istemciler, gelişmiş seçeneklerde `allow-websocket=Y` ayarını yaparak WebSocket kullanabilir. WebSocket etkinleştirilmiş özel istemci kullanılırsa, TCP/UDP kullanmaz ve yalnızca relay üzerinden bağlanabilir (doğrudan IP bağlantıları hariç). Yalnızca bu WebSocket özellikli istemci kullanılırsa, sunucu 21114 ila 21119 arasındaki bağlantı noktalarını kapatabilir ve yalnızca 443 bağlantı noktasını açık tutabilir.

```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

Tam yapılandırma şöyledir:

```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # Certbot tarafından yönetilir
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # Certbot tarafından yönetilir
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # Certbot tarafından yönetilir
    include /etc/letsencrypt/options-ssl-nginx.conf; # Certbot tarafından yönetilir
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # Certbot tarafından yönetilir
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # Certbot tarafından yönetilir

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # Certbot tarafından yönetilir
}
```

{{% notice note %}}
Daha önce web istemcileri için dağıtım yaptıysanız ve bunu tüm platformlarda kullanmak istiyorsanız `proxy_read_timeout` eklemeniz gerekir.
{{% /notice %}}

### 9. RustDesk genel web istemcisi `https://rustdesk.com/web` kullanılıyorsa CORS'u atlama

Tarayıcıların CORS kısıtlamasını atlamak için `/etc/nginx/.../rustdesk.conf` dosyasının `location /` bölümüne aşağıdakileri eklemeniz gerekir. Kendi web istemcinizi kullanıyorsanız bu adımı atlayın.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux

Kurulum sırasında `Waiting for RustDesk Relay service to become active...` uyarısı görünüyorsa, bunun nedeni SELinux olabilir. Aşağıdaki komutları deneyebilirsiniz:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Güvenlik Duvarı

### Bulut sağlayıcı güvenlik duvarı
AWS/Azure/Google/DigitalOcean bulutunda çalıştırıyorsanız, lütfen bulut sağlayıcısının yönetim panelinde UDP (21116) ve TCP (21114-21119) gelen bağlantı noktalarını açın.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Şirket içi (on-premise) sunucu güvenlik duvarı
RustDesk, güvenlik duvarını `ufw` ile ayarlar. CentOS 9 gibi bazı dağıtımlarda çalışmayabilir, `firewall-cmd` ile deneyebilirsiniz:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

IP kullanıyorsanız:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

DNS/Alan adı kullanıyorsanız:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Yukarıdakilerden sonra, güvenlik duvarını yeniden yüklemek için `sudo firewall-cmd --reload` çalıştırın.

## Web konsolunda yönetici parolasını değiştirdikten sonra giriş yapamıyorum. Parolayı sıfırlamanın basit bir yolu var mı?
1. `rustdesk-utils` yüklü olduğundan emin olun. Değilse [buradan](https://github.com/rustdesk/rustdesk-server-pro) edinebilirsiniz. Ayrıca komutu veritabanının bulunduğu klasörden, yani `/var/lib/rustdesk-server` konumundan çalıştırmanız gerekir.
2. Komut şudur: `rustdesk-utils set_password username password`. Çalışırsa *Done* yazacaktır.

`rustdesk-utils` ile kullanılabilecek diğer komutlar da şunlardır: `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` ve `reset_2fa_verification`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Docker konteynerine kök CA sertifikası ekleme (SMTP, OIDC vb. ile TLS hatası için)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
