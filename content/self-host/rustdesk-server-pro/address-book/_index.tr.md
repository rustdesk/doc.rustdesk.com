---
title: Adres Defteri
weight: 201
description: "RustDesk Server Pro'da Adres Defteri ile uzak cihazları kaydedin, cihaz listelerini paylaşın, etiketlerle düzenleyin ve paylaşılan parolalarla bağlanın."
keywords: ["rustdesk adres defteri", "rustdesk server pro adres defteri", "rustdesk paylaşılan adres defteri", "rustdesk cihaz etiketleri", "rustdesk paylaşılan parola"]
---

Adres Defteri; kullanıcıların RustDesk cihaz kimliklerini (ID) kaydetmesine, bunları etiketlerle düzenlemesine, cihaz listelerini paylaşmasına ve RustDesk istemcisinden kayıtlı parolalarla bağlanmasına olanak tanır.

## Hızlı yanıtlar

- **Adres defterim**, oturum açmış kullanıcıya özeldir. Manuel olarak girilip hatırlanan parolalar **Adres defterim** içinde saklanır ve kullanıcının cihazları arasında senkronize edilebilir.
- **Paylaşılan** adres defterleri belirli kullanıcılarla, kullanıcı gruplarıyla veya tüm kullanıcılarla paylaşılabilir.
- Paylaşılan bir adres defteri, adres defteri düzeyinde bir parola saklayabilir ve her cihaz girdisi cihaz düzeyinde bir parola saklayabilir. Cihaz düzeyinde parola ayarlanmadığında adres defteri düzeyindeki parola kullanılır.
- Etiketler, web konsolunda ve RustDesk istemcisinde cihazları filtrelemek için kullanılabilir.

## Paylaşılan bir adres defteriyle tek tıklamayla bağlantı

Kullanıcıların her seferinde uzak parolayı manuel olarak girmeden bağlanması gerektiğinde paylaşılan bir adres defteri kullanın.

1. Paylaşılan bir adres defteri oluşturun veya açın. İsteğe bağlı olarak adres defterinde bir **adres defteri düzeyi parola** belirleyin.

2. Cihazlar sayfasını açmak için adres defteri adına tıklayın. **İçe Aktar**'a tıklayın, adres defterine aktarılacak cihazları seçin ve seçilen cihazları kaydetmek için alttaki **Kaydet**'e tıklayın. Veya doğrudan IP erişimi için bir IP adresini ID olarak kullanarak ID ile bir cihaz eklemek üzere **Ekle**'ye tıklayın. İsteğe bağlı olarak tek tek cihaz girdilerinde bir **cihaz düzeyi parola** belirleyin.

3. Adres defterini belirli kullanıcılarla, kullanıcı gruplarıyla veya tüm kullanıcılarla paylaşın.

4. Kullanıcı RustDesk istemcisinde oturum açar ve **Adres defteri** sekmesini açar.

5. Kullanıcı paylaşılan adres defterini seçer ve cihaz kartına tıklar.

![İstemcide paylaşılan adres defteri cihaz kartına tıklama](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
Paylaşılan parola yalnızca cihaz kartına tıklanarak veya açılır menüsü kullanılarak ilgili paylaşılan adres defterinden bağlanıldığında kullanılır. Başka bir cihaz sekmesinden, ID giriş kutusunun yanındaki **Bağlan** düğmesinden veya başka bir paylaşılan adres defterinden bağlanırken kullanılmaz.
{{% /notice %}}

## Paylaşılan adres defteri izinleri

| İzin | Kullanıcıların Yapabilecekleri |
| --- | --- |
| **Salt Okunur (Read-only)** | Cihazları ve etiketleri görüntüleyebilir, parolayı kullanabilir. |
| **Okuma/Yazma (Read/Write)** | Cihazları ve etiketleri düzenleyebilir. |
| **Tam Denetim (Full Control)** | Adres defterini yeniden paylaşabilir, silebilir veya yeniden adlandırabilir. |

Birden fazla kural aynı kullanıcıyla eşleştiğinde öncelik sırası:

1. Kullanıcı (User)
2. Grup (Group)
3. Herkes (Everyone)

Örneğin, **Herkes** Salt Okunur ise ancak belirli bir kullanıcı Tam Denetim'e sahipse, o kullanıcı Tam Denetim iznini alır.

![Adres defteri izinlerini paylaşma](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Web konsolunda paylaşılan adres defteri izni](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Web konsolu

### Paylaşılan adres defteri oluşturma veya düzenleme

**Adres Defteri > Paylaşılan** bölümünde bir ad, isteğe bağlı not ve isteğe bağlı **Varsayılan Paylaşılan Parola** ile paylaşılan bir adres defteri oluşturun. Bu, adres defteri düzeyindeki paroladır.

![Varsayılan paylaşılan parola ile paylaşılan adres defteri oluşturma](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Cihaz ve parola ekleme

Cihazlar ID ile manuel olarak eklenebilir veya Server Pro cihaz listesinden içe aktarılabilir. Her girdi için bir takma ad, etiketler, not ve paylaşılan adres defterleri için cihaz düzeyinde bir parola belirleyebilirsiniz.

![Paylaşılan adres defterine cihaz ekleme](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Cihazlar](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Paylaşılan adres defterinde cihaz düzenleme](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Etiketler ve filtreleme

Etiketler cihazları düzenler ve filtreler. `Etiketsiz`, etiketi olmayan cihazları filtreler. **Kesişime göre filtrele** açıkken yalnızca seçilen tüm etiketlerle eşleşen cihazlar gösterilir.

### Geri dönüşüm kutusu

Bir cihazı adres defterinden silmek, girdiyi o adres defterinin geri dönüşüm kutusuna taşır. Cihazı RustDesk Server Pro'dan silmez.

## Paylaşılan parola davranışı

| Parola düzeyi | Öncelik |
| --- | --- |
| Cihaz düzeyi parola | Cihaz girdisinde parola olduğunda ilk olarak kullanılır. |
| Adres defteri düzeyi parola | Cihaz girdisinde parola olmadığında kullanılır. |

Her iki parola da ayarlanmamışsa kullanıcı normal şekilde bağlanır ve parolayı manuel olarak girmesi gerekebilir. Web konsolunda parola sütunları yalnızca bir parolanın ayarlanıp ayarlanmadığını gösterir.

## RustDesk istemcisi

Oturum açtıktan sonra, **Adres defterim** ve paylaşılan adres defterleri arasında geçiş yapmak için adres defteri seçicisini kullanın. Paylaşılan adres defterleri için istemci mevcut kullanıcının iznini gösterir.

![RustDesk istemci adres defteri seçici](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Salt okunur adres defteri](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### İstemciden düzenleme

Yazma iznine sahip kullanıcılar ID ekleyebilir, etiket ekleyebilir, takma adları düzenleyebilir, etiketleri düzenleyebilir, notları düzenleyebilir, paylaşılan parolaları ayarlayabilir veya girdileri kaldırabilir.

![RustDesk istemcisinde adres defteri cihaz menüsü 1](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![RustDesk istemcisi ID Ekle](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![RustDesk istemcisinde adres defteri cihaz menüsü 2](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![RustDesk istemcisi Parola Değiştir](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Dağıtım önayarları

RustDesk istemci yapılandırması adres defteri atamasını önceden ayarlayabilir:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` ve `preset-address-book-note` seçenekleri RustDesk istemcisi 1.4.3 veya üzeri ve RustDesk Server Pro 1.6.6 veya üzeri gerektirir.

Daha fazla ayrıntı için [gelişmiş istemci yapılandırmasına](/docs/tr/self-host/client-configuration/advanced-settings/#preset-user-name--preset-strategy-name--preset-device-group-name--preset-device-username--preset-device-name--preset-note) bakın.

## İlgili ayarlar

| Ayar | Nerede | Etki |
| --- | --- | --- |
| **Yönetici olmayanların adres defterlerini diğer gruplarla paylaşmasına izin ver** | **Ayarlar > Diğerleri** | Yönetici olmayan kullanıcıların adres defterlerini diğer kullanıcı gruplarıyla paylaşmasına olanak tanır. |
| **Adres defterini devre dışı bırak** | **Özel İstemci** | Oluşturulan özel istemcide Adres Defterini gizler veya devre dışı bırakır. |

## Sorun Giderme

### Yanlış Parola

Paylaşılan bir adres defterinde saklanan parola, kontrol eden RustDesk istemcisi tarafından kullanılır. Kontrol edilen cihaza atanmaz. Kontrol edilen cihazın parolasını o cihazda **Ayarlar > Güvenlik > Parola** bölümünden ayarlayın.

Paylaşılan parolayı kullanmak için cihaz kartına tıklayarak ilgili paylaşılan adres defterinden bağlanın. Başka bir adres defterinden, başka bir cihaz sekmesinden veya ID giriş kutusunun yanındaki **Bağlan** düğmesinden bağlanmak bu adres defterinin paylaşılan parolasını kullanmaz.
