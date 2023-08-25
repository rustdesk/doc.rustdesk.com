---
title: Mac
weight: 3
---

### Kurulum

`.dmg` dosyasını açın ve `RustDesk` uygulamasını aşağıdaki gibi `Applications` klasörüne sürükleyin.

![](images/dmg.png)

Tüm çalışan RustDesk uygulamalarını kapattığınızdan emin olun. Ayrıca, tepside görünen RustDesk hizmetini de kapatmış olduğunuzdan emin olun.

![](images/tray.png)

### RustDesk'i Çalıştırmaya İzin Verme

| Değiştirmek için kilidi açın | "App Store ve tanımlanmış geliştiriciler" üzerine tıklayın |
| ---- | ---- |
| ![](images/allow2.png) | ![](images/allow.png) |

### İzinleri Etkinleştirme

{{% notice note %}}
macOS güvenlik politikasının değişmesi nedeniyle, yerel tarafta girdi yakalayan API'miz artık çalışmıyor.
Yerel Mac tarafında "Input Monitoring" iznini etkinleştirmeniz gerekiyor.
Lütfen bu bağlantıyı takip edin:
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

Hızlı bir çözüm görünmüyor, Flutter sürümümüzü düzeltmemiz gerekiyor.
{{% /notice %}}

Ekran yakalamak için, `RustDesk` uygulamasına **Erişilebilirlik** izni ve **Ekran Kaydı** izni vermeniz gerekmektedir. RustDesk sizi ayarlar penceresine yönlendirecektir.

| RustDesk penceresi | Ayarlar penceresi |
| ---- | ---- |
| ![](images/acc.png) | ![](images/acc3.png?v2) |

Ayarlar penceresinde etkinleştirdiyseniz ve RustDesk hala uyarı veriyorsa. Lütfen RustDesk'i ayarlar penceresinden `-` düğmesine tıklayarak kaldırın ve `+` düğmesine tıklayarak `/Applications` içinde RustDesk'i seçin.

| `-` ve `+` düğmesi | RustDesk'i Seç |
| ---- | ---- |
| ![](images/acc2.png) | ![](images/add.png?v2) |

Lütfen yukarıdaki adımları **Ekran Kaydı** izni için de uygulayın.

![](images/screen.png?v2)
