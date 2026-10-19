---
title: RustDesk İstemcisi
description: "RustDesk İstemcisini Windows, macOS, Linux, Android, iOS ve Web üzerinde kurun ve yapılandırın. Cihazları bağlamayı, genel veya kendi sunucunuzu kullanmayı ve ayarları yönetmeyi öğrenin."
keywords: ["rustdesk istemci", "rustdesk indir", "rustdesk kurulum", "rustdesk windows", "rustdesk mac", "rustdesk linux", "rustdesk android", "rustdesk ios", "rustdesk web istemcisi", "rustdesk istemci yapılandırması"]
weight: 2
pre: "<b>1. </b>"
---

## RustDesk İstemcisi Nedir?
RustDesk İstemcisi (Client), RustDesk genel sunucuları veya kendi barındırdığınız RustDesk Sunucunuz aracılığıyla uzak masaüstü oturumları başlatmak veya almak için cihazlarınıza yüklediğiniz uygulamadır. Doğru derlemeyi indirmek, her platformda kurmak, başka bir cihaza bağlanmak ve istemciyi RustDesk Server OSS veya RustDesk Server Pro'ya yönlendirmek için bu kılavuzu kullanabilirsiniz.

{{% notice note %}}
Platform kılavuzları: [Linux için RustDesk](https://rustdesk.com/blog/rustdesk-for-linux) ve [Android ve iOS'tan uzaktan kontrol](https://rustdesk.com/blog/rustdesk-remote-control-android-ios). Ayrıca [en iyi ücretsiz uzak masaüstü yazılımları](https://rustdesk.com/blog/best-free-remote-desktop-software) makalesini inceleyebilirsiniz.
{{% /notice %}}

## Desteklenen Platformlar
- Microsoft Windows
- macOS
- Debian Tabanlı Dağıtımlar (Ubuntu ≥ 16, Linux Mint vb.)
- Red Hat Tabanlı Dağıtımlar (CentOS, Fedora ≥ 18, Rocky Linux vb.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (uzaktan kontrol edilemez, yalnızca istemci olarak bağlanabilir)
- Web

## Kurulum

### Windows

GitHub üzerinden exe dosyasını indirin ve kurun.

Sessiz (arka planda) kurulum yapmak için yükleyici exe dosyasını `--silent-install` parametresi ile çalıştırın.

### macOS

GitHub üzerinden dmg dosyasını indirin. Daha fazla bilgi [macOS sayfasında](/docs/tr/client/mac/) bulunabilir.

dmg dosyasını açın ve `RustDesk` simgesini `Applications` (Uygulamalar) klasörüne sürükleyin.

RustDesk'in çalışmasına izin verin.

İstenen izinleri etkinleştirin ve kurulumu tamamlamak için RustDesk'in sol tarafındaki yönlendirmeleri izleyin.

### Linux

Farklı Linux dağıtımları için kurulum talimatlarını aşağıda bulabilirsiniz (yükleyiciler GitHub üzerinde veya dağıtımın paket depolarında mevcuttur).

#### Debian Tabanlı Dağıtımlar

```sh
# lütfen hatalı disk kullanım raporunu dikkate almayın
sudo apt install -fy ./rustdesk-<version>.deb
```

#### Red Hat Tabanlı Dağıtımlar

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

Geçici olarak `rustdesk` çalışmaya hazır bir kabuk ortamına girmek için:

```sh
nix shell nixpkgs#rustdesk
```

Mevcut kullanıcı profiline yüklemek için:

```sh
nix profile install nixpkgs#rustdesk
```

NixOS sistem genelinde kurmak için `configuration.nix` dosyasını düzenledikten sonra `nixos-rebuild switch --flake /etc/nixos` komutunu çalıştırın:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

### Android
GitHub sayfamızdan apk dosyasını indirin. Daha fazla bilgi [Android sayfasında](/docs/tr/client/android/) bulunabilir.

### iOS (iPhone, iPad)
Uygulamayı [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015) üzerinden indirin.

## Kullanım
Kurulduktan (veya geçici yürütülebilir dosya olarak çalıştırıldıktan) sonra RustDesk Genel sunuculara bağlanacaktır. Altta (1) "Hazır, Daha hızlı bağlantı için lütfen kendi sunucunuzu kurun" mesajını göreceksiniz. Sol üstte (2) Kimliğinizi (ID), (3) Tek Kullanımlık Şifrenizi ve sağda kimliğini bildiğiniz başka bir bilgisayara bağlanabileceğiniz (4) kutuyu göreceksiniz.

![](/docs/en/client/images/client.png)

Ayarlara erişmek için Kimliğin (ID) sağındaki (5) Menü düğmesine [ &#8942; ] tıklayın.

Ayarlar altında şunları bulabilirsiniz:
- Genel - Servis Kontrolü, Tema, Donanım Kodeği, Ses, Kayıt ve Dil
- Güvenlik - Kontrolü alan kişiler için izinler, Şifre seçenekleri, Kimliğinizi (ID) değiştirme olanağı ve Gelişmiş Güvenlik Ayarları
- Ağ - Kendi sunucu ayarlarınızı ve proxy'nizi buradan ayarlayın
- Ekran - Uzak oturumlar için ekran ayarlarını ve diğer varsayılan seçenekleri, pano senkronizasyonunu vb. yönetin.
- Hesap - Pro Sunucu ile birlikte API'ye giriş yapmak için kullanılabilir
- Hakkında - Yazılım hakkında bilgileri gösterir.

## RustDesk Yapılandırması
RustDesk'i yapılandırmanın birkaç yolu vardır.

En kolay yol RustDesk Server Pro kullanmaktır; şifrelenmiş bir yapılandırma dizesi alabilir ve bunu ayarları içe aktarmak için `--config` ile birlikte kullanabilirsiniz. Bunu yapmak için:
1. Kullandığınız işletim sisteminde komut satırını açın ve RustDesk'in kurulu olduğu klasöre gidin (Windows'ta `C:\Program Files\RustDesk`, Linux'ta `/usr/bin`).
2. `rustdesk.exe --config sifreli-dizeniz` komutunu çalıştırın. Örnek: `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

İstemciyi manuel olarak da ayarlayabilirsiniz:
1. Ayarlar'a tıklayın.
2. Ağ'a tıklayın.
3. Ağ Ayarlarının Kilidini Aç'a tıklayın.
4. ID sunucusu, Relay sunucusu, API (pro sunucu kullanıyorsanız) ve anahtarınızı (key) girin.

![](/docs/en/client/images/network-settings.png)

Bir istemciyi manuel olarak kurduktan sonra, kullanıcı klasöründeki `RustDesk2.toml` dosyasını alabilir ve yukarıdaki örneğe benzer şekilde `--import-config` ile kullanabilirsiniz.

## Komut Satırı Parametreleri
- `--password` kalıcı bir parola belirlemek için kullanılabilir.
- `--get-id` kimliği (ID) almak için kullanılabilir.
- `--set-id` bir kimlik (ID) atamak için kullanılabilir; kimliklerin bir harfle başlaması gerektiğini unutmayın.
- `--silent-install` Windows'ta RustDesk'i sessizce kurmak için kullanılabilir.

Ek gelişmiş parametreler [burada](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242) bulunabilir.

{{% children depth="3" showhidden="true" %}}
