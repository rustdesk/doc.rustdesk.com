---
title: Mac
description: "macOS üzerinde RustDesk kurun ve uzaktan kontrol için gerekli izinleri yapılandırın. Uygulamaya izin vermeyi, erişilebilirliği ve ekran kaydı erişimini öğrenin."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac kurulum", "rustdesk ekran kaydı izni", "rustdesk erişilebilirlik izni", "rustdesk mac uzaktan kontrol"]
weight: 3
---

Bu macOS kılavuzunu kullanarak RustDesk'i kurabilir, uygulamanın çalışmasına izin verebilir ve ekran yakalama ile giriş kontrolü için gereken izinleri tanımlayabilirsiniz.

## RustDesk macOS'ta nelere ihtiyaç duyar?

macOS'ta RustDesk, yalnızca uygulamanın yüklenmesinden fazlasını gerektirir. Başka bir Mac'i doğru şekilde kontrol etmek için genellikle uygulamayı `Applications` (Uygulamalar) klasörüne taşımanız, çalışmasına izin vermeniz ve ardından `Erişilebilirlik`, `Ekran Kaydı` ve bazı durumlarda `Giriş İzleme` izinlerini vermeniz gerekir.

## macOS hızlı yanıtlar

- RustDesk'i `.dmg` dosyasından `Applications` klasörüne yükleyin.
- Gatekeeper engellerse macOS güvenlik ayarları altından uygulamaya izin verin.
- Uzaktan kontrol için `Erişilebilirlik` ve `Ekran Kaydı` izinlerini verin.
- Klavye veya fare girişi yine de çalışmıyorsa `Giriş İzleme` iznini verin.
- İzin sıfırlamaları hemen etkili olmazsa sistemi yeniden başlatın.

## Kurulum

.dmg dosyasını açın ve `RustDesk` simgesini aşağıda gösterildiği gibi `Applications` klasörüne sürükleyin.

![](/docs/en/client/mac/images/dmg.png)

Çalışan tüm RustDesk pencerelerinden çıktığınızdan emin olun. Ayrıca sistem tepsisinde (menü çubuğu) gösterilen RustDesk servisinden de çıktığınızdan emin olun.

![](/docs/en/client/mac/images/tray.png)

## RustDesk'in çalışmasına izin verme

| Değiştirmek için kilidi açın | `App Store ve tanımlanan geliştiriciler` seçeneğine tıklayın |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Hangi macOS izinleri önemlidir?

| İzin | Neden önemlidir |
| --- | --- |
| Erişilebilirlik (Accessibility) | RustDesk'in klavye ve fare girişini kontrol etmesini sağlar |
| Ekran Kaydı (Screen Recording) | RustDesk'in yerel ekran görüntüsünü yakalamasını sağlar |
| Giriş İzleme (Input Monitoring) | Daha yeni macOS sürümlerinde yerel giriş yakalama başarısız olduğunda gereklidir |

## İzinleri etkinleştirme

{{% notice note %}}
macOS güvenlik politikası değişikliği nedeniyle yerel tarafta girişi yakalayan API'miz artık çalışmamaktadır. Yerel Mac tarafında "Giriş İzleme" iznini etkinleştirmeniz gerekir.
Lütfen burayı takip edin:
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

1.2.4 sürümünde, araç çubuğundaki klavye simgesine tıklanarak görülebilen `Giriş kaynağı 2` (Input source 2) seçeneğini deneyebilirsiniz.
{{% /notice %}}

Ekranı yakalamak için RustDesk'e **Erişilebilirlik** izni ve **Ekran Kaydı** izni vermeniz gerekir. RustDesk sizi ayarlar penceresine yönlendirecektir.

| RustDesk penceresi | Ayarlar penceresi |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Ayarlar penceresinde etkinleştirdiğiniz halde RustDesk hâlâ uyarı veriyorsa: Lütfen `-` düğmesi ile ayarlar penceresinden `RustDesk`'i kaldırın ve `+` düğmesine tıklayarak `Applications` içindeki `RustDesk`'i seçin.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Diğer sıfırlama denemeleri: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Yeniden başlatma hâlâ gerekebilir.
{{% /notice %}}

| `-` ve `+` düğmesi | `RustDesk`'i seçin |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Lütfen **Ekran Kaydı** izni için yukarıdaki adımları tekrarlayın.

![](/docs/en/client/mac/images/screen.png?v2)
