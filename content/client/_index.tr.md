---
title: RustDesk İstemci
weight: 2
pre: "<b>1. </b>"
---

### Giriş
RustDesk istemcisi, RustDesk Sunucusu ile bağlantı kurmak için cihazlarda kullanılır, açık kaynak veya Pro sürümü ile kullanılabilir ve [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) üzerinden indirilebilir.

### Desteklenen Platformlar
- Microsoft Windows
- Mac OS
- Debian Türevleri (Ubuntu, Mint vb.)
- Redhat Türevleri (Centos, Rocky vb.)
- Arch/Manjaro
- Opensuse
- AppImage / Flatpak
- Android
- iOS (Kontrol edilmeyi desteklemez)
- Web

### Kurulum

#### Windows

GitHub'dan .exe dosyasını indirin ve kurulumu yapın.

Sessiz kurulum için kurulum .exe dosyasını `--silent-install` ile çağırın.

#### Mac OS

GitHub'dan .dmg dosyasını indirin, daha fazla bilgiyi Mac OS sayfasında bulabilirsiniz.

.dmg dosyasını açın ve `RustDesk`i `Applications`a sürükleyin.

RustDesk'in çalışmasına izin verin.

İstenilen izinleri etkinleştirin ve RustDesk'in sol tarafındaki yönergeleri izleyerek kurulumu tamamlayın.

#### Linux

Farklı "tatlar" için aşağıdaki talimatları görmek için lütfen GitHub'daki tüm yükleyicilere bakın.

#### Debian Türevleri (>= 16)

```bash
# yanlış disk kullanımı raporunu görmezden gelin
sudo apt install -fy ./rustdesk-<sürüm>.deb
```

#### CentOS/Fedora (>= 18)

```sh
sudo yum localinstall ./rustdesk-<sürüm>.rpm
```

#### Arch/Manjaro

```sh
sudo pacman -U ./rustdesk-<sürüm>.pkg.tar.zst
```

#### Opensuse (>= Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<sürüm>-suse.rpm
```

#### Android
Apk'yı GitHub'dan indirin, daha fazla bilgiyi Android sayfasında bulabilirsiniz.

### Kullanım
Kurulduktan sonra (veya geçici olarak yürütüldüğünde), RustDesk Halka açık sunuculara bağlanır (altta (1) "Hazır, daha hızlı bir bağlantı için lütfen kendi sunucunuzu kurun) mesajını göreceksiniz). Sol üst köşede (2) Kimliğiniz ve (3) Tek Kullanımlık Şifreniz görünecek ve sağda (4) Kimliklerini bildiğiniz bir başka bilgisayara bağlanmanız için bir kutu göreceksiniz.

![image](images/client.png)

Ayarlar'a erişmek için Kimlik (5) sağdaki 3 noktaya tıklayın.

Ayarlar altında şunları bulacaksınız:
- Genel - Hizmet Kontrolü, Tema, Donanım Kodlayıcı, Ses, Kayıt ve Dil
- Güvenlik - Kontrol alan birine izinler, Şifre seçenekleri, kimliğinizi değiştirme yeteneği ve Gelişmiş Güvenlik Ayarları
- Ağ - Kendi sunucu ayarlarınızı ve proxy'yi burada ayarlayın
- Ekran - Uzaktan oturumlar için ekran ayarlarını kontrol edin ve diğer varsayılan seçenekler, panoya senkronize etme vb.
- Hesap - Bu, API'ye girmek için Pro Sunucu ile kullanılabilir.
- Hakkında - Yazılım hakkında bilgi gösterir.

### RustDesk'i Yapılandırma
RustDesk'i yapılandırmanın birkaç yolu vardır.

En kolay yol, RustDesk Sunucusu Pro'yu kullanmaktır; şifrelenmiş bir yapılandırma dizesi alabilir ve bunu `--config` ile içe aktarmak için kullanabilirsiniz. Bunu yapmak için:
1. Hangi işletim sistemini kullanırsanız kullanın komut istemcisini, RustDesk'in kurulu olduğu klasöre açın; örneğin windows'ta C:\program files\RustDesk, linux'ta /usr/bin.
2. `rustdesk.exe --config sizin-şifrelenmiş-dizeniz` komutunu kullanın; örneğin `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`

Elle bir istemciyi ayarlayabilirsiniz, bunun için
1. Ayarlar'a tıklayın
2. Ağ'a tıklayın
3. Ağ Ayarlarını Kilitle'ye tıklayın
4. Kimliğinizi, Röle, API (pro kullanıyorsanız) sunucularınızı ve anahtarınızı girin.

![image](images/network-settings.png)

Eğer elle bir istemci kurarsanız, RustDesk2.toml (kullanıcı klasöründe) dosyasını alabilir ve yukarıdaki örneğe benzer bir şekilde `--import-config` kullanabilirsiniz.

### Komut Satırı Parametreleri

- `--password`, kalıcı bir şifre ayarlamak için kullanılabilir.
- `--get-id`, Kimliği almak için kullanılabilir.
- `--set-id`, Kimliği ayarlamak için kullanılabilir; lütfen kimliklerin bir harfle başlaması gerektiğine dikkat edin.
- `--silent-install`, RustDesk'in windows üzerinde sessizce yüklenmesi için kullanılabilir.

Ek gelişmiş parametreler [burada](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242) bulunabilir.

{{% children depth="1" showhidden="true" %}}
