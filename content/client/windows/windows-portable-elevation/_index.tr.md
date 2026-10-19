---
title: Windows Taşınabilir Ayrıcalık Yükseltme
weight: 49
description: "RustDesk taşınabilir uygulamasını Windows'ta yükselterek uzak oturumların UAC istemlerini, Görev Yöneticisi'ni ve yönetici pencerelerini yönetmesini sağlayın."
keywords: ["rustdesk taşınabilir yetki yükseltme", "rustdesk uac", "rustdesk windows yönetici hakları", "rustdesk görev yöneticisi fare sorunu", "rustdesk yetki isteme"]
---

RustDesk taşınabilir istemcisinin UAC istemlerini, yönetici ayrıcalıklı uygulamaları ve tam giriş kontrolünü yönetmek için yönetici ayrıcalıklarına ihtiyaç duyduğu durumlarda Windows'ta taşınabilir ayrıcalık yükseltmeyi (portable elevation) kullanın.

Windows taşınabilir programları yönetici ayrıcalıklarına sahip değildir, bu da aşağıdaki sorunlara yol açabilir:

- UAC (Kullanıcı Hesabı Denetimi) penceresi açıldığında ekran iletilemez.
- Görev Yöneticisi gibi yönetici yetkili bir pencere açıldığında fare yanıt vermez hale gelir.

Ayrıcalıkları yükselterek RustDesk, başlangıçta veya oturum sırasında yönetici ayrıcalıklarına sahip bir süreç oluşturabilir, ekran görüntüsü alma ve fare işlemlerini gerçekleştirebilir ve böylece yukarıdaki sorunların önüne geçebilir.

## Taşınabilir yetki yükseltmeye ne zaman ihtiyacınız olur?

RustDesk taşınabilir istemcisinin Windows'ta yönetici düzeyindeki kullanıcı arayüzü ile etkileşime girmesi gerektiğinde taşınabilir yetki yükseltmeye ihtiyacınız olur. En yaygın belirtiler engellenen UAC istemleri, yetkilendirme iletişim kutuları sırasında ekran iletiminin kesilmesi veya Görev Yöneticisi gibi yükseltilmiş pencereler üzerinde fare kontrolünün kaybolmasıdır.

## Taşınabilir yetki yükseltme hızlı yanıtlar

- Yetki yükseltme yalnızca taşınabilir sürümün yönetici düzeyindeki Windows kullanıcı arayüzü ile etkileşime girmesi gerektiğinde gereklidir.
- Kontrol edilen tarafta kimse olmadığında başlangıçta yetki yükseltme en iyisidir.
- Kullanıcı `Kabul Et ve Yükselt` seçeneğine tıklayabiliyorsa kontrol edilen uçta yetki yükseltme en iyisidir.
- Kontrol eden uçtan yetki yükseltme isteği, kontrol edilen taraftaki birinin UAC istemini kabul etmesini gerektirir.
- Özellikle taşınabilir bir iş akışına ihtiyacınız yoksa programın tam kurulumunu yapmak her zaman daha iyi bir seçenektir.

## Başlangıçta yetki yükseltme

Bu sayede uzak kullanıcıların bağlanırken yetki yükseltme talep etmelerine gerek kalmaz. İki yöntem vardır:

* Yöntem 1: Taşınabilir programın adını `-qs-` veya `-qs.exe` ya da `_qs.exe` (>= 1.4.6) içerecek veya `qs.exe` (1.2.0 ~ 1.4.5) ile bitecek şekilde değiştirin. Çalıştırmak için sol fare düğmesiyle tıklayın, UAC penceresinde `Kabul Et`'e tıklayın.

* Yöntem 2: Sağ tıklayın ve yönetici olarak çalıştırın.

## Kontrol edilen uçta yetki yükseltme

Kontrol edilen taraf, bağlanırken doğrudan `Kabul Et ve Yükselt` seçeneğine tıklayabilir veya zaten bağlıyken `Yükselt` seçeneğine tıklayabilir.

| Bağlanırken | Bağlıyken |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Kontrol eden uçtan yetki yükseltme isteme

İşlem menüsünden `Ayrıcalık Yükseltme İste` seçildikten sonra aşağıdaki iletişim kutusu görünecektir. `Uzak kullanıcıdan kimlik doğrulaması iste` seçeneğini belirlerseniz bir kullanıcı adı ve parola girmeniz gerekmez, ancak uzak bilgisayardaki kullanıcının yönetici ayrıcalıklarına sahip olması gerekir. `Yöneticinin kullanıcı adını ve parolasını ilet` seçeneğini belirlerseniz uzak bilgisayardaki kullanıcının yalnızca UAC penceresinde onay vermesi yeterlidir. İsteği gönderdikten sonra lütfen diğer taraftaki kullanıcının UAC penceresini onaylamasını bekleyin. Onaylandıktan sonra bir başarı mesajı görünecektir. **Her iki yöntemin de kontrol edilen uçta birisinin UAC penceresini kabul etmesini gerektirdiğini** unutmayın. Bu nedenle, diğer tarafta kimse yoksa kontrol eden uçtan yetki yükseltme talep edilmemelidir.

| Menü | İletişim Kutusu |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Bekleme** | **Başarılı** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

## Nasıl Seçilir

| Senaryo | Yöntem |
| :---: | :---: |
| Yetki yükseltme gerekmiyor | Programı kurun |
| Kontrol edilen uçta kullanıcı yok | Yeniden adlandırın<br/>*veya*<br/> Yönetici olarak çalıştırın |
| Kontrol edilen uçta kullanıcı var<br/>*ve*<br/> Bağlanıldığında hemen yetki yükseltme<br/>*ve*<br/> Tıklama ile kabul bağlantısı | Kontrol edilen uçta bağlantıyı alırken `Kabul Et ve Yükselt` seçeneğine tıklayın |
| Kontrol edilen uçta kullanıcı var<br/>*ve*<br/> Gerektiğinde yetki yükseltme | Kontrol edilen uçtaki bağlantı yönetimi penceresinde `Yükselt`'e tıklayın<br/>*veya*<br/> Kontrol eden uçtan yetki yükseltme isteyin |
