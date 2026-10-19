---
title: Web Konsolu
weight: 10
description: "Cihazları, kullanıcıları, izinleri, günlükleri ve diğer yönetimsel ayarları 21114 portundan yönetmek için RustDesk Server Pro web konsolunu kullanın."
keywords: ["rustdesk web konsolu", "rustdesk server pro konsol", "rustdesk port 21114", "rustdesk cihaz yönetimi", "rustdesk yönetici konsolu"]
---

RustDesk Server Pro web konsolu; cihazları, kullanıcıları, izinleri ve günlükleri yönetmek için kullanılan ana yönetim arayüzüdür.

Web konsolu, RustDesk Server Pro'ya entegredir ve `21114` portu üzerinden hizmet verir.

## RustDesk Server Pro web konsolu nedir?

Web konsolu, kendi barındırdığınız bir RustDesk Server Pro dağıtımının ana kontrol merkezidir. Yöneticilerin kullanıcıları, cihazları, grupları, izinleri, stratejileri, relay ayarlarını, SMTP'yi, belirteçleri ve özel istemcileri yönettiği yerdir.

## İlk yönetici kontrol listesi

1. `21114` portundan web konsolunda oturum açın.
2. Varsayılan `admin` parolasını derhal değiştirin.
3. Henüz etkinleştirilmediyse lisansı tanımlayın.
4. Davetler ve e-posta doğrulaması istiyorsanız SMTP'yi yapılandırın.
5. Yalnızca varsayılan hesaba güvenmek yerine ek yönetici veya yetki devredilmiş hesaplar oluşturun.
6. Geniş çaplı dağıtımdan önce relay, stratejiler ve istemci ayarlarını yapılandırın.

## Web konsolunda neler yapabilirsiniz?

- Kullanıcıları, kullanıcı gruplarını ve yönetici erişimini yönetin
- Cihazları, cihaz gruplarını ve cihaz atamalarını yönetin
- Erişim kurallarını, stratejileri, kontrol rollerini ve yönetici rollerini yapılandırın
- Günlükleri ve aktif oturumları görüntüleyin
- SMTP, relay, belirteçler ve diğer sunucu ayarlarını yönetin
- Özel istemci derlemeleri ve yapılandırma paketleri oluşturun

Özellikler:

- Cihazlara göz atma
- Kullanıcıları ve kullanıcı gruplarını ekleme/düzenleme
- Cihaz erişim izinlerini değiştirme
- Cihaz bağlantı günlüklerini ve diğer günlükleri inceleme
- Ayarları güncelleme
- İstemci ayarları senkronizasyon stratejilerini yönetme
- Paylaşılan adres defterlerini yönetme
- Özel istemci derlemesi oluşturma

## Giriş yapma

Web konsolunun varsayılan portu 21114'tür. Konsol sayfasına girmek için tarayıcıya aşağıdaki şekilde gösterildiği gibi `http://<sunucu ip>:21114` yazın. Varsayılan yönetici kullanıcı adı/parolası `admin`/`test1234` şeklindedir:

![](/docs/tr/self-host/rustdesk-server-pro/console/images/console-login.png)

HTTPS desteğine ihtiyacınız varsa lütfen `Nginx` gibi bir web sunucusu kurun veya Windows için `IIS` kullanın.

Giriş yaptıktan sonra lütfen parolayı mutlaka değiştirin; aşağıdaki şekilde gösterildiği gibi parola değiştirme sayfasına girmek için sağ üst köşedeki hesap menüsünden `Ayarlar`'ı seçin. Başka bir yönetici hesabı oluşturup bu hesabı silebilirsiniz. E-posta ile giriş doğrulamasını etkinleştirmeniz de önerilir.

<a name=console-home></a>
![](/docs/tr/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Yönetici olmayan kullanıcılar da oturum açarak cihazlarına ve günlüklerine göz atabilir, kendi kullanıcı ayarlarını değiştirebilir.

## Otomatik Yapılandırmalar
`Windows EXE` düğmesine tıklayarak kendi RustDesk Server Pro'nuz için yapılandırmaları alabilirsiniz; bu, istemcilerinizi yapılandırmanıza yardımcı olur.

Windows istemcileri için özel sunucu yapılandırmasını dışarıda bırakabilir ve yapılandırma bilgilerini `rustdesk.exe` dosya adına ekleyebilirsiniz. Yukarıda gösterildiği gibi, lütfen konsol karşılama sayfasına gidin ve `Windows EXE` seçeneğine tıklayın. **İstemci ≥ 1.1.9 gereklidir.**

İstemcilerinizi kurmak için bunu [istemci yapılandırması](/docs/tr/self-host/client-configuration/) ve [dağıtım betikleri](/docs/tr/self-host/client-deployment/) ile birlikte kullanabilirsiniz.

## Varsayılan `admin` kullanıcısı dışında yeni bir kullanıcı oluşturma

{{% notice note %}}
`Individual` (Bireysel) planı bu özelliğe sahip değildir.
{{% /notice %}}

1. Sol menüdeki `Kullanıcılar` (Users) seçeneğine tıklayın.
2. `Yönetici` (administrator) seçeneği etkinleştirilmiş başka bir hesap oluşturun.
3. Yeni yönetici hesabıyla oturum açın.
4. `Kullanıcılar` sayfasında eski `admin` hesabını silin.

## Yeni bir kullanıcı oluşturma
1. Sol menüdeki `Kullanıcılar` seçeneğine tıklayın.
2. Yeni bir kullanıcı oluşturun.
3. Hangi grupta yer alması gerektiğini seçin (yeni gruplar eklemeniz gerekiyorsa okumaya devam edin).

## Yeni bir Grup Ekleme
1. Sol menüdeki `Gruplar` (Groups) seçeneğine tıklayın.
2. Yeni bir grup oluşturun.
3. Oluşturulduktan sonra grupların birbirine erişmesine izin verebilirsiniz, `Düzenle`'ye tıklayın.
4. Erişmesini istediğiniz ilgili grupları seçin (karşılık gelen grupta otomatik olarak eklenir).

## Birden çok relay sunucusu kurma
1. Sol menüdeki `Ayarlar` bölümüne gidin.
2. Alt menüdeki `Relay` seçeneğine tıklayın.
3. `Relay Sunucuları` yanındaki `+` işaretine tıklayın.
4. Şimdi görünen kutuya Relay sunucusu DNS adresini veya IP adresini girin ve <kbd>Enter</kbd> tuşuna basın.
5. Birden fazla Relay sunucunuz varsa `+` işaretine tıklamaya devam edebilir ve gerekirse Geo ayarlarını uyarlayabilirsiniz (anahtarınızı diğer sunuculara da kopyalamayı unutmayın).

## Lisansı tanımlama veya değiştirme
1. Sol menüdeki `Ayarlar` bölümüne gidin.
2. Alt menüdeki `Lisans` (License) seçeneğine tıklayın.
3. `Düzenle`'ye tıklayın ve lisans kodunuzu yapıştırın.
4. `Tamam`'a tıklayın.

## Günlükleri Görüntüleme
Sol taraftaki `Günlükler` (Logs) seçeneğine tıklayın. Konsol; bağlantı, dosya aktarımı, alarm ve konsol işlemi (denetim) günlüklerini listeler; bunları `audits.py` API'si aracılığıyla da sorgulayabilir ve dışa aktarabilirsiniz.

Server Pro, **Ayarlar > Diğerleri > Günlük Saklama Süresi (Gün)** altında **yapılandırılabilir denetim günlüğü saklama** özelliğini destekler. `0` değeri günlükleri süresiz olarak saklar; pozitif bir değer belirtilen gün sayısından eski kayıtları saatte bir kez temizleyerek siler. Dönemi saklama politikanıza göre yapılandırın ve dışa aktarılan kopyaları ile yedekleri ayrı yönetin. Bkz. [günlük görünürlüğü ve saklama süresi](/docs/tr/self-host/rustdesk-server-pro/audit-logs/#günlük-görünürlüğü-ve-saklama-süresi).

## E-posta Kurulumu
Bu örnekte Gmail kullanılmıştır:

1. Sol menüdeki `Ayarlar` bölümüne gidin.
2. Alt menüdeki `SMTP` seçeneğine tıklayın.
3. SMTP adresi olarak `smtp.gmail.com` girin.
4. `SMTP Port` alanına 587 girin.
5. `Mail Account` alanına Gmail hesabınızı (örn. `myrustdeskserver@gmail.com`) girin.
6. Parolanızı girin (bir uygulama parolası gerekebilir).
7. `From` alanına Gmail hesabınızı girin.
8. Kaydetmek için `Check` düğmesine tıklayın.

## Web Konsolu ile Cihazlara Kullanıcı/Strateji/Cihaz Grubu Atama

Kullanıcı; cihazda oturum açmış veya cihazın yanındaki **Düzenle**'ye tıklanarak atanan RustDesk Kullanıcısıdır; **Kullanıcı** kutusuna tıklayıp açılır menüden kullanıcınızı seçin.  
Ayrıca **Kullanıcı Listesi**'nde **Daha Fazla → Cihazları Ata** seçeneğine tıklayarak cihazları bir kullanıcıya toplu olarak atayabilirsiniz.

Bir cihazı bir cihaz grubuna eklemek için **Cihaz Listesi**'nde cihazın yanındaki **Düzenle**'ye tıklayıp **Grubu** değiştirebilir veya **Cihaz Grupları** listesine gidip bir cihaz grubu adına tıklayarak o gruptaki cihazları ayarlayabilirsiniz.

Bir cihaza bir strateji atamak için **Strateji** listesinin sağ tarafının üzerine gelin ve menüdeki **Cihazları Düzenle**, **Kullanıcıları Düzenle** veya **Cihaz Gruplarını Düzenle** seçeneğine tıklayarak ilgili cihazları, kullanıcı cihazlarını veya cihaz grubu cihazlarını seçilen stratejiye ekleyin.

---

## API Belirteci (Token)

Öncelikle **Ayarlar → Belirteçler → Oluştur** bölümüne gitmeli ve gerekli izinlerle bir belirteç oluşturmalısınız: **Device, Audit Log, User, Group, Strategy, Address Book, Admin Role, Control Role**.

Oluşturulduktan sonra, bu belirteçleri karşılık gelen izinlerle eylemler gerçekleştirmek için **komut satırı** veya **Python CLI** aracılığıyla kullanabilirsiniz.

### Komut Satırından Belirteç ile Atama Yapma

RustDesk yürütülebilir dosyasını `--assign` parametresi ile kullanarak da atamalar yapabilirsiniz.  
Bu, kullanıcıları, stratejileri, adres defterlerini veya cihaz gruplarını doğrudan komut satırından bir cihaza atamayı sağlar.

**Example:**  

```bash
"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>
```

Desteklenen Parametreler

| Parametre                               | Açıklama                                | RustDesk Server Pro | RustDesk İstemci |
| --------------------------------------- | --------------------------------------- | ------------------- | --------------- |
| `--user_name <username>`                | Cihaza bir kullanıcı atar             |                     |                 |
| `--strategy_name <strategyname>`        | Cihaza bir strateji atar         |                     |                 |
| `--address_book_name <addressbookname>` | Cihazı bir adres defterine atar        |                     |                 |
| `--address_book_tag <addressbooktag>`   | Adres defteri etiketiyle atar            |                     |                 |
| `--address_book_alias <alias>`          | Adres defteri takma adıyla atar          | 1.5.8               | 1.4.1           |
| `--address_book_password <password>`    | Adres defteri girdisi için parola belirler | 1.6.6               | 1.4.3           |
| `--address_book_note <note>`            | Adres defteri girdisi için not belirler     | 1.6.6               | 1.4.3           |
| `--device_group_name <devicegroupname>` | Cihazı bir cihaz grubuna atar         |                     |                 |
| `--note <note>`                         | Cihaza not ekler                  | 1.6.6               | 1.4.3           |
| `--device_username <device_username>`   | Cihaz kullanıcı adını belirler                 | 1.6.6               | 1.4.3           |
| `--device_name <device_name>`           | Cihaz adını belirler                     | 1.6.6               | 1.4.3           |
| [`--deploy`](/docs/tr/self-host/client-deployment/#yeni-cihazlar-için-açıkça-dağıtım-explicit-deployment) | **Yeni cihazlar için dağıtım gerektir** etkinleştirildiğinde yeni bir cihazı kaydeder. **Cihazlar** (Devices) izni **Okuma ve yazma** olarak ayarlanmış bir API belirteci gerektirir. | 1.8.3 | 1.4.7 |

Windows'ta komut satırı varsayılan olarak çıktı vermez. Çıktı almak için lütfen `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` veya `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String` şeklinde çalıştırın, bkz. [burası](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Python CLI Yönetim Araçları

#### Kullanıcı Yönetimi (`users.py`)

**Yardımı göster:**  
`./users.py -h`

**Kullanıcıları görüntüle:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filtreler:**  
- `--name`: username (fuzzy search)
- `--group_name`: user group (exact match)

**Example:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Temel işlemler:**

- **Kullanıcıyı devre dışı bırak:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Kullanıcıyı etkinleştir:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Kullanıcıyı sil:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Kullanıcı oluşturma ve davet:**

- **Yeni kullanıcı oluştur:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "note"]`
  
  Gerekli: `--name`, `--password`, `--group_name`  
  İsteğe bağlı: `--email`, `--note`

- **Invite user by email:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "note"]`
  
  Gerekli: `--email`, `--name`, `--group_name`  
  İsteğe bağlı: `--note`

**2FA and security operations:**

- **Enable 2FA enforcement:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Gerekli: `--web-console-url`

- **Disable 2FA enforcement:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  İsteğe bağlı: `--web-console-url`

- **Reset 2FA:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Disable email verification:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Oturumu kapatmaya zorla (Force logout):**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Notlar:**
- Birden fazla kullanıcı üzerinde işlem yaparken (filtrelerle eşleşen), sizden onay istenecektir
- Filtreyle eşleşen kullanıcı yoksa "Found 0 users" (0 kullanıcı bulundu) görüntülenecektir

---

#### Kullanıcı Grupları Yönetimi (`user-groups.py`)

**Yardımı göster:**  
`./user-groups.py -h`

**Kullanıcı gruplarını görüntüleme:**  
`./user-groups.py --url <url> --token <token> view [--name <group_name>]`

**Example:**  
`./user-groups.py --url https://example.com --token <token> view --name "Sales Team"`

**Group operations:**

- **Create user group:**  
  `./user-groups.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Example with access control:  
  `./user-groups.py --url <url> --token <token> add --name "Engineering" --accessed-from '[{"type":0,"name":"Managers"}]' --access-to '[{"type":1,"name":"DevServers"}]'`

- **Update user group:**  
  `./user-groups.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Delete user group:**  
  `./user-groups.py --url <url> --token <token> delete --name "GroupName"`
  
  Supports comma-separated names: `--name "Group1,Group2,Group3"`

**User management in groups:**

- **View users in group:**  
  `./user-groups.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filters:
  - `--name`: group name (exact match, optional)
  - `--user-name`: username (fuzzy search, optional)
  
  Example:  
  `./user-groups.py --url <url> --token <token> view-users --name Default --user-name john`

- **Add users to group:**  
  `./user-groups.py --url <url> --token <token> add-users --name "GroupName" --users "user1,user2,user3"`

**Erişim kontrol parametreleri:**

- `--accessed-from`: Bu kullanıcı grubuna kimlerin erişebileceğini tanımlayan JSON dizisi
  - Tür 0 = Kullanıcı Grubu (örn., `[{"type":0,"name":"Admins"}]`)
  - Tür 2 = Kullanıcı (örn., `[{"type":2,"name":"john"}]`)

- `--access-to`: Bu kullanıcı grubunun nelere erişebileceğini tanımlayan JSON dizisi
  - Tür 0 = Kullanıcı Grubu (örn., `[{"type":0,"name":"Support"}]`)
  - Tür 1 = Cihaz Grubu (örn., `[{"type":1,"name":"Servers"}]`)

**İzin gereksinimleri:**
- `view/add/update/delete/add-users` komutları **Kullanıcı Grubu İzni** gerektirir
- `view-users` komutu **Kullanıcı İzni** gerektirir

---

#### Yönetici Rolleri Yönetimi (`admin-roles.py`)

Belirteç (token) tam bir yöneticiye ait olmalı ve **Yönetici Rolü** okuma veya okuma/yazma iznine sahip olmalıdır. Kullanıcı adlarını çözümleyen veya rol üyelerini listeleyen komutlar ayrıca **Kullanıcı** okuma izni gerektirir.

**Rolleri görüntüleme:**

```bash
# List roles, optionally filtered by exact name or type
./admin-roles.py --url <url> --token <token> view [--name <role_name>] [--type global|individual|group]

# View one role by GUID
./admin-roles.py --url <url> --token <token> view --guid <role_guid>
```

**Create a role:**

```bash
# Global role
./admin-roles.py --url <url> --token <token> add \
  --name "Support Admin" --type global \
  --permissions "users.view,devices.view,audits.view" --note "Read-only support"

# Group-scoped role
./admin-roles.py --url <url> --token <token> add \
  --name "Support Scope" --type group \
  --permissions "users.view,devices.view,devices.enable_disable" \
  --user-groups "Support" --device-groups "Servers" --unassigned
```

Rol türü oluşturulduktan sonra değiştirilemez. `--permissions`, virgülle ayrılmış izin adlarını, ondalık kimlikleri veya `0x` ön ekli kimlikleri kabul eder ve bu biçimler karıştırılabilir. Örneğin, `users.view,513,0x0203`, `257,513,515` ile eşdeğerdir. Sunucu, seçilen rol türü için geçerli olmayan izinleri reddeder.

`view` komutu bilinen izin kimliklerini aşağıdaki adlara dönüştürür. Betik tarafından bilinmeyen bir kimlik sayı olarak korunur, böylece daha yeni bir sunucu tarafından eklenen izinler gizlenmez.

| Alan | İzinler | Geçerli rol türleri |
| --- | --- | --- |
| Users | `users.view` (`257`); `users.create` (`259`); `users.invite` (`260`); `users.delete` (`261`); `users.enable_disable` (`262`); `users.edit_email` (`263`); `users.edit_password` (`264`); `users.edit_note` (`265`); `users.manage_2fa` (`266`); `users.force_logout` (`267`); `users.change_strategy` (`269`); `users.change_control_role` (`270`); `users.edit_display_name` (`271`) | global, group |
| Users | `users.change_group` (`268`) | global |
| Devices | `devices.view` (`513`) | global, group |
| Devices | `devices.enable_disable` (`515`); `devices.delete` (`516`); `devices.edit_info` (`517`); `devices.change_strategy` (`520`) | global, individual, group |
| Devices | `devices.assign_to_user` (`518`); `devices.change_group` (`519`) | global |
| User groups | `user_groups.view` (`769`); `user_groups.edit` (`770`) | global |
| Device groups | `device_groups.view` (`1025`); `device_groups.edit` (`1026`); `device_groups.change_strategy` (`1027`) | global |
| Audits | `audits.view` (`1281`); `audits.edit` (`1282`) | global, individual |
| Strategies | `strategies.view` (`1537`); `strategies.edit` (`1538`) | global |
| Custom clients | `custom_clients.view` (`1793`); `custom_clients.edit` (`1794`) | global |
| Control roles | `control_roles.view` (`2049`); `control_roles.edit` (`2050`) | global |

**Rolü güncelleme veya silme:**

```bash
./admin-roles.py --url <url> --token <token> update --name "Support Admin" \
  [--new-name "Helpdesk Admin"] [--note "new note"] [--permissions "users.view,devices.view"] \
  [--user-groups "Support"] [--device-groups "Servers"] [--unassigned|--no-unassigned]

./admin-roles.py --url <url> --token <token> delete --name "Support Admin"
```

Pass an empty value to clear `--note`, `--permissions`, `--user-groups`, or `--device-groups`, for example `--permissions ""`.

**Manage role members:**

```bash
./admin-roles.py --url <url> --token <token> view-users --name "Support Admin"
./admin-roles.py --url <url> --token <token> add-users --name "Support Admin" --users "user1,user2"
./admin-roles.py --url <url> --token <token> remove-users --name "Support Admin" --users "user1,user2"
```

Rol hedefleri ve kullanıcılar GUID ile de belirtilebilir. Kullanıcı adları ve GUID'ler `--users` içinde birlikte kullanılabilir.

---

#### Kontrol Rolleri Yönetimi (`control-roles.py`)

Belirteç (token) **Kontrol Rolü** okuma veya okuma/yazma iznine ihtiyaç duyar. Kullanıcı adlarını çözümleyen veya rol üyelerini listeleyen komutlar ayrıca **Kullanıcı** okuma izni gerektirir.

**Rolleri görüntüleme:**

```bash
./control-roles.py --url <url> --token <token> view [--name <role_name>] [--status enabled|disabled]
./control-roles.py --url <url> --token <token> view --guid <role_guid>
```

**Rol oluşturma, güncelleme, silme, etkinleştirme veya devre dışı bırakma:**

```bash
./control-roles.py --url <url> --token <token> add --name "Contractors" [--note "Restricted access"]
./control-roles.py --url <url> --token <token> update --name "Contractors" [--new-name "Vendors"] [--note "new note"]
./control-roles.py --url <url> --token <token> delete --name "Contractors"
./control-roles.py --url <url> --token <token> enable --name "Contractors"
./control-roles.py --url <url> --token <token> disable --name "Contractors"
```

Bu betik tarafından oluşturulan yeni roller kontrol izinlerini içermez. Kullanıcıları atamadan önce bunları web konsolunda yapılandırın. Kontrol izni tanımları bu betik tarafından yönetilmez veya görüntülenmez.

**Rol üyelerini yönetme:**

```bash
./control-roles.py --url <url> --token <token> view-users --name "Contractors"
./control-roles.py --url <url> --token <token> assign-users --name "Contractors" --users "user1,user2"
./control-roles.py --url <url> --token <token> remove-users --users "user1,user2"
```

Role targets and users can also be supplied by GUID. `remove-users` clears each user's current control role, so it does not take `--name` or `--guid`. For the reserved `Default` role, `view-users` lists explicit assignments only; users without a control-role assignment also inherit `Default`. The reserved `Not Logged` role cannot be assigned to users, and reserved roles cannot be renamed, given a note, or deleted.

---

#### Device Groups Management (`device-groups.py`)

**Yardımı göster:**  
`./device-groups.py -h`

**View device groups:**  
`./device-groups.py --url <url> --token <token> view [--name <group_name>]`

**Example:**  
`./device-groups.py --url https://example.com --token <token> view`

**Group operations:**

- **Create device group:**  
  `./device-groups.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>']`
  
  Example:  
  `./device-groups.py --url <url> --token <token> add --name "Production" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Update device group:**  
  `./device-groups.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>']`

- **Delete device group:**  
  `./device-groups.py --url <url> --token <token> delete --name "GroupName"`
  
  Supports comma-separated names: `--name "Group1,Group2,Group3"`

**Device management in groups:**

- **View devices in group:**  
  `./device-groups.py --url <url> --token <token> view-devices [filters]`
  
  Available filters:
  - `--name`: device group name (exact match)
  - `--id`: device ID (fuzzy search)
  - `--device-name`: device name (fuzzy search)
  - `--user-name`: user name/owner (fuzzy search)
  - `--device-username`: logged-in username on device (fuzzy search)
  
  Examples:  
  ```bash
  # View all devices in a group
  ./device-groups.py --url <url> --token <token> view-devices --name Production
  
  # Search by device name
  ./device-groups.py --url <url> --token <token> view-devices --device-name server
  
  # Combine filters
  ./device-groups.py --url <url> --token <token> view-devices --name Production --user-name john
  ```

- **Gruba cihaz ekleme:**  
  `./device-groups.py --url <url> --token <token> add-devices --name "GroupName" --ids "deviceid1,deviceid2"`

- **Gruptan cihaz çıkarma:**  
  `./device-groups.py --url <url> --token <token> remove-devices --name "GroupName" --ids "deviceid1,deviceid2"`

**Erişim kontrol parametresi:**

- `--accessed-from`: Bu cihaz grubuna kimlerin erişebileceğini tanımlayan JSON dizisi
  - Tür 0 = Kullanıcı Grubu (örn., `[{"type":0,"name":"Engineers"}]`)
  - Tür 2 = Kullanıcı (örn., `[{"type":2,"name":"admin"}]`)

**İzin gereksinimleri:**
- `view/add/update/delete/add-devices/remove-devices` komutları **Cihaz Grubu İzni** gerektirir
- `view-devices` komutu **Cihaz İzni** gerektirir

---

#### Cihazlar Yönetimi (`devices.py`)

**Yardımı göster:**  
`./devices.py -h`

**Cihazları görüntüleme:**  
`./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]`

**Filtreler:**  
`--id`: cihaz kimliği (ID)  
`--device_name`: cihaz adı  
`--user_name`: atanan kullanıcı  
`--group_name`: kullanıcı grubu  
`--device_group_name`: cihaz grubu  
`--offline_days`: çevrimdışı geçen gün sayısı

**Örnek:**  
`./devices.py --url https://example.com --token <token> view --user_name mike`

**İşlemler:**  
`view` yerine `enable`, `disable`, `delete` veya `assign` kullanılabilir.

**Örnek (cihaz atama):**  
`./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike`

---

#### Adres Defteri Yönetimi (`ab.py`)

**Yardımı göster:**  
`./ab.py -h`

**Paylaşılan adres defterlerini görüntüleme:**  
`./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]`

**Kişisel adres defteri GUID'sini alma:**  
`./ab.py --url <url> --token <token> get-personal-ab`

**Paylaşılan adres defteri ekleme:**  
`./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]`

**Paylaşılan adres defterini güncelleme veya silme:**  
`./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]`  
`./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>`

**Adres defterindeki eşleri (peers) görüntüleme:**  
`./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]`

**Eş ekleme, güncelleme veya silme:**  
`./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>`

**Etiket yönetimi:**  
`./ab.py --url <url> --token <token> view-tag --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]`  
`./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000`  
`./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>`

**Erişim kuralları yönetimi:**  
`./ab.py --url <url> --token <token> view-rule --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full`  
`./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw`  
`./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>`

**Örnek ("mike" kullanıcısı için salt okunur kural ekleme):**  
`./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro`

---

#### Stratejiler Yönetimi (`strategies.py`)

**Yardımı göster:**  
`./strategies.py -h`

**Tüm stratejileri listeleme:**  
`./strategies.py --url <url> --token <token> list`

**Belirli bir stratejiyi görüntüleme:**  
```bash
# By name
./strategies.py --url <url> --token <token> view --name "Default"

# By GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Stratejiyi etkinleştirme veya devre dışı bırakma:**  
```bash
./strategies.py --url <url> --token <token> enable --name "StrategyName"
./strategies.py --url <url> --token <token> disable --name "StrategyName"
```

**Stratejiyi cihazlara, kullanıcılara veya cihaz gruplarına atama:**  
```bash
# Cihazlara atama (cihaz kimliğine göre)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Kullanıcılara atama (kullanıcı adına göre)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Cihaz gruplarına atama (grup adına göre)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Karışık atama
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Strateji atamasını kaldırma:**  
```bash
# Cihazlardan atamayı kaldırma
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Kullanıcılardan atamayı kaldırma
./strategies.py --url <url> --token <token> unassign --users "admin"

# Cihaz gruplarından atamayı kaldırma
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Notlar:**
- Betik, kullanıcılar ve cihaz grupları için hem adları hem de GUID'leri destekler
- Cihaz kimlikleri (ID) otomatik olarak GUID'lere dönüştürülür
- Tüm atama/atama kaldırma işlemleri aynı anda birden fazla kaynağı hedefleyebilir

**İzin gereksinimleri:**
- `list/view/enable/disable/assign/unassign` komutları **Strateji İzni** gerektirir
- `--peers`, **Cihaz İzni:r** gerektirir (ID'den GUID'e çözümleme için)
- `--users`, **Kullanıcı İzni:r** gerektirir (kullanıcı adından GUID'e çözümleme için)
- `--device-groups`, **Cihaz Grubu İzni:r** gerektirir (addan GUID'e çözümleme için)

---

#### Denetimler (`audits.py`)

**Yardımı göster:**  
`./audits.py -h`

**Bağlantı denetimlerini görüntüleme:**  
`./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Dosya denetimlerini görüntüleme:**  
`./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Alarm denetimlerini görüntüleme:**  
`./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Konsol denetimlerini görüntüleme:**  
`./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Filtreler:**  
`--remote`: Eş Kimliği (bağlantı veya dosya denetimleri için)  
`--conn-type`: 0=Uzak Masaüstü, 1=Dosya Aktarımı, 2=Port Yönlendirme, 3=Kamera Görüntüleme, 4=Terminal  
`--device`: Cihaz Kimliği (alarm denetimleri için)  
`--operator`: İşlemi yapan yönetici kullanıcı adı (konsol denetimleri için)  
`--created-at`: Yerel zaman filtresi, örn., "2025-09-16 14:15:57"  
`--days-ago`: Belirtilen gün sayısından daha yeni kayıtları filtreler  
`--page-size` / `--current`: Sayfalandırma

**Örnek:**  
`./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7`


## Bir cihazı arama
1. Cihazlar'a gidin.
2. Cihaz Adı Arama Alanına adı yazın ve `Sorgula` (Query) seçeneğine tıklayın veya <kbd>Enter</kbd> tuşuna basın.
3. Joker karakter kullanmak için arama teriminin başına, sonuna veya her iki tarafına `%` ekleyin.
