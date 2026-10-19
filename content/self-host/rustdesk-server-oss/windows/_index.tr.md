---
title: Windows & PM2 veya NSSM
weight: 20
description: "PM2 veya NSSM ile Windows üzerinde RustDesk Server OSS çalıştırın. Windows'ta hbbs ve hbbr barındırma için servis kurulum adımları ve günlük komutları."
keywords: ["rustdesk sunucu windows", "rustdesk pm2", "rustdesk nssm", "rustdesk hbbs windows", "rustdesk hbbr windows", "rustdesk self-host windows"]
---

Daha basit bir kullanıcı düzeyinde kurulum mu yoksa Windows servis yönetimi mi istediğinize bağlı olarak, PM2 veya NSSM ile Windows üzerinde RustDesk Server OSS çalıştırmak için bu kılavuzu kullanın.

## RustDesk Server OSS'i Windows üzerinde çalıştırmalı mısınız?

RustDesk Server OSS'i Windows üzerinde çalıştırabilirsiniz, ancak Linux çoğu üretim ortamı dağıtımı için hâlâ daha güvenli varsayılandır. Windows, halihazırda Windows Server kullanan ve servis modelini anlayan ekipler için işe yarayabilir, ancak uzun vadeli barındırma için daha hassas olma eğilimindedir.

## PM2 ve NSSM Karşılaştırması

| Yöntem | Kimler İçin | Neden Tercih Edilir |
| --- | --- | --- |
| NSSM | Özel Windows Server dağıtımları | Windows servisi olarak çalışır ve kullanıcı girişi olmadan başlar |
| PM2 | Çok amaçlı Windows makineleri veya daha basit iş akışları | Halihazırda Node.js kullanıyorsanız ve sunucuya düzenli olarak giriş yapıyorsanız yönetimi daha kolaydır |

## Windows barındırma kontrol listesi

1. RustDesk Server Windows ikili dosyalarını indirin.
2. NSSM'in mi yoksa PM2'nin mi daha uygun olduğuna karar verin.
3. Seçilen süreç yöneticisini kurun.
4. Hem `hbbs` hem de `hbbr` servislerini kaydedip başlatın.
5. Gerekli güvenlik duvarı portlarını açın ve her iki sürecin de çevrimiçi kaldığını doğrulayın.

{{% notice note %}}
Windows güvenlik politikaları hassastır; bu eğitim sizin için işe yaramazsa veya kararsız bağlantıyla karşılaşırsanız lütfen bir Linux sunucusuna geçiş yapın.
{{% /notice %}}

{{% notice note %}}
Arayüzlü sürüm olan `RustDeskServer.setup.exe` artık güncellenmemektedir ve önerilmez.
{{% /notice %}}

## Yol Ayrımı
RustDesk sunucusunu başlatmak için iki seçeneğiniz vardır: PM2 (daha kolay) veya NSSM (biraz daha teknik).
NSSM kullanmanın bazı avantajları:
- Eski Windows sürümleriyle geriye dönük uyumluluk (Windows Server 2008 R2/Windows 7 ve öncesi, test edilmemiş olsa da).
- Windows Server için idealdir.
- Oturum açmadan önyüklemede otomatik başlar (Başlangıç girdisini oluşturan kullanıcının oturum açmasına gerek yoktur).
- Her iki programı da Servis olarak çalıştırır.
- Bağımsızdır (Node.js bağımlılığı yoktur).

PM2 kullanmanın avantajları:
- Sunucuyu ana çalışma bilgisayarınızla aynı makinede çalıştırıyorsanız iyi bir fikirdir.
- RustDesk başlangıç kaydını oluşturan kullanıcıyla düzenli olarak oturum açıyorsanız uygundur.
- Kullanıcı dostudur.

## NSSM Kullanarak Kurulum

### NSSM Kurulumu
Lütfen NSSM'i [indirin](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) ve arşivden çıkarın. Windows sisteminize uygun mimariyi seçin (x86 ise win32 klasörünün içeriği, x64 ise win64 klasörünün içeriği). NSSM dosyasını kurulum sürücünüzün (genellikle C: sürücüsü) `Program Files\NSSM` dizinine taşımak en iyi uygulamadır (NSSM bir servis olarak başlatıldıktan sonra yerleştirildiği dizinden taşınamaz).
Ayrıca bu yolu (`C:\Program Files\NSSM` gibi) path ortam değişkenine eklemeniz önerilir.

### NSSM'in düzgün kurulup kurulmadığını kontrol etme
Her şeyi doğru yaptıysanız `C:\Program Files\NSSM` klasörü yalnızca `nssm.exe` dosyasını içermelidir.

Bu örnekte `C:\Program Files\NSSM` yolunu kullanacağız.

Komut İstemi'ni (cmd) açın ve `nssm` çalıştırın; bir yardım sayfası görüyorsanız bir sonraki adıma geçmeye hazırsınız.

### hbbr ve hbbs'i Çalıştırma
[RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) Windows sürümünü indirin.
Programı `C:\Program Files\RustDesk Server` dizinine açın (veya istediğiniz herhangi bir yere; yalnızca servis kurulduktan sonra yerinin değişmediğinden emin olun). Şimdi Komut İstemi'ne dönün.

Bu örnekte `C:\Program Files\RustDesk Server` yolunu kullanacağız.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Not:**
- `RustDesk hbbs service` adını dilediğiniz başka bir servis adıyla değiştirebilirsiniz
- `RustDesk hbbr service` adını dilediğiniz başka bir servis adıyla değiştirebilirsiniz
- `C:\Program Files\RustDesk Server\hbbs.exe` yolunu ikili dosyaları yerleştirdiğiniz yerle değiştirebilirsiniz
- `C:\Program Files\RustDesk Server\hbbr.exe` yolunu ikili dosyaları yerleştirdiğiniz yerle değiştirebilirsiniz

**Komut şablonları:**

Kopyalayıp düzenlemek isterseniz komut şablonu:

```cmd
nssm install <İstenen hbbs servis adı> <RustDesk hbbs dosya yolu> <RustDesk hbbs bağımsız değişkenleri>
nssm install <İstenen hbbr servis adı> <RustDesk hbbr dosya yolu> <RustDesk hbbr bağımsız değişkenleri>
```

**Servisleri başlatma**

Servisler başarıyla kurulduktan sonra başlatılmaları gerekir:
```cmd
nssm start <İstenen hbbs servis adı>
nssm start <İstenen hbbr servis adı>
```

**Tamamlandı!**

(Yukarıdaki yöntem Windows Server Core 2022 Standard üzerinde test edilmiştir).

## veya

## PM2 Kullanarak Kurulum

### Node.js Kurulumu

Lütfen Node.js'i [indirin](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) ve kurun.
Node.js, PM2'nin çalışma zamanı ortamıdır; bu nedenle önce Node.js kurmanız gerekir.

### PM2 Kurulumu

`cmd.exe` içinde aşağıdakileri girin, her satır için <kbd>Enter</kbd> tuşuna basın ve satır satır çalıştırın:

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### hbbr ve hbbs'i Çalıştırma

[RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) Windows sürümünü indirin. Programı C: sürücüsüne çıkarın. Aşağıdaki dört komutu çalıştırın:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Günlükleri görüntüleme

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Alternatif eğitimler
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
