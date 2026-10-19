---
title: Microsoft 365
weight: 16
description: "Exchange Online üzerinden e-posta göndermek için RustDesk Server Pro üzerinde SMTP OAuth2 (Microsoft 365) yapılandırmasını gerçekleştirin."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

RustDesk Server Pro'yu OAuth2 ile Microsoft 365 Exchange Online üzerinden e-posta gönderecek şekilde yapılandırmak için bu kılavuzu kullanın.

Bu kurulum; davet e-postaları, giriş doğrulama e-postaları ve bağlantı alarmı bildirimleri için uygundur.

Genel SMTP kurulumu için [SMTP](/docs/tr/self-host/rustdesk-server-pro/smtp/) sayfasına bakın.

## Hangi Değerler RustDesk Pro'ya Girilir?

| RustDesk Pro alanı | Ne girilmeli |
| --- | --- |
| Kimden (From) | Giden e-postada gösterilen gönderici adresi. |
| Posta Hesabı (Mail Account) | RustDesk'in XOAUTH2 SMTP kullanıcı adı olarak kullandığı posta kutusu adresi. |
| OAuth2 Kiracı Kimliği (Tenant ID) | Uygulamaya genel bakış sayfasındaki `Dizin (kiracı) kimliği` (Directory (tenant) ID) |
| OAuth2 İstemci Kimliği (Client ID) | Uygulamaya genel bakış sayfasındaki `Uygulama (istemci) kimliği` (Application (client) ID) |
| OAuth2 İstemci Gizli Anahtarı (Client secret) | `Sertifikalar ve gizli diziler` altında oluşturulan gizli anahtar değeri (`Value`) |

Bu ekran görüntüsü, bu değerlerin RustDesk'te nereye girildiğini gösterir:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Yapılandırma

Bu yapılandırmaya başlamadan önce aşağıdakilere sahip olduğunuzdan emin olun:

- RustDesk Server Pro `1.8.1` veya üzeri
- Mevcut bir Microsoft 365 posta kutusu veya e-posta göndermek için oluşturmayı planladığınız bir posta kutusu (örneğin `no-reply@contoso.com`)
- Microsoft Entra'da yönetici onayı verebilen ve Exchange Online hizmet sorumlularını (service principals) yönetebilen bir Microsoft 365 yönetici hesabı

Bu yapılandırma üç bölümden oluşur:

- Azure'da uygulama kaydı, istemci gizli anahtarı, API izni ve yönetici onayının yapılandırılması
- PowerShell'de Exchange Online hizmet sorumlusu, posta kutusu ve izinlerin yapılandırılması
- RustDesk'te SMTP OAuth2 yapılandırması ve test e-postası gönderilmesi

### 1. Azure'da Yapılandırma

1. [Azure portal](https://portal.azure.com)'ında oturum açın.
1. **Uygulama kayıtları** (App registrations) öğesini arayıp seçin.
1. Sol menüde [**Uygulama kayıtları**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) bölümünü seçin, ardından **Yeni kayıt** (New registration) düğmesine tıklayın.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/1-Azure-AppRegistrations.png)
1. Uygulama kaydını oluşturun.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/3-Azure-RegisterAnApp.png)
1. `Dizin (kiracı) kimliği` (Directory (tenant) ID) ve `Uygulama (istemci) kimliği` (Application (client) ID) değerlerini not edin. Bunları daha sonra RustDesk'e gireceksiniz.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/4-Azure-NewApp-Overview.png)
1. **Sertifikalar ve gizli diziler** (Certificates & secrets) sayfasını açın, ardından yeni bir istemci gizli anahtarı (client secret) oluşturun.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/5-Azure-NewClientSecret.png)
1. İstemci gizli anahtarı `Değeri`ni (Value) hemen kopyalayın. Microsoft bu değeri yalnızca bir kez gösterir.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/6-Azure-Secret.png)
1. **API izinleri** (API permissions) bölümünü açın ve Microsoft 365 Exchange Online SMTP uygulama iznini ekleyin.
1. **İzin ekle** (Add a permission) seçeneğini belirleyin.
1. **Kuruluşumun kullandığı API'ler** (APIs my organization uses) sekmesini seçin ve **Office 365 Exchange Online** araması yapın.
1. **Uygulama izinleri** (Application permissions) seçeneğini belirleyin.
1. **SMTP.SendAsApp** iznini seçin ve değişikliği kaydedin.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/9-Azure-SMTP-Send.png)
1. Yeni eklediğiniz izin için yönetici onayı (admin consent) verin.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/11-Azure-ApiPermissions.png)

### 2. PowerShell'de Yapılandırma

Bu bölümde Exchange Online'a bağlanacak, hizmet sorumlusunu oluşturacak, posta kutusunu hazırlayacak ve izinleri tanımlayacaksınız.

1. PowerShell'i yerel yönetici olarak açın.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/12-Powershell-RunAsAdmin.png)
1. Exchange Online modülünü yükleyin ve kiracı yönetici hesabınızla bağlanın.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Yönetici hesabını açıkça belirtmek isterseniz şunı da kullanabilirsiniz:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. Microsoft Entra **Kurumsal uygulamalar** (Enterprise applications) bölümünde uygulamayı bulun ve `Nesne Kimliği`ni (Object ID) not edin. Exchange Online hizmet sorumlusunu oluştururken buna ihtiyacınız olacak.

{{% notice note %}}
Buradaki `OBJECT_ID`, **Uygulama kayıtları** genel bakış sayfasındaki nesne kimliği değil, uygulamanın **Kurumsal uygulamalar** (Enterprise applications) altındaki nesne kimliği olmalıdır.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/15-Powershell-Get-ObjectId.png)

1. Uygulama kaydı için Exchange Online hizmet sorumlusunu oluşturmak üzere bu komutu çalıştırın. Microsoft bu adımı, bir Microsoft Entra uygulamasının hizmet sorumlusunun Exchange Online'a kaydedilmesi olarak tanımlar.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Exchange bağlantısı başarılı olmasına rağmen bu komut başarısız olursa, yönetici hesabının Exchange Online hizmet sorumlularını yönetme yetkisine sahip olduğunu doğrulayın.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/16-Powershell-New-ServicePrincipal.png)

1. Exchange'in hizmet sorumlusunu oluşturduğunu doğrulayın ve sonraki adımlar için `Identity` değerini not edin.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Burada döndürülen `Identity` değerini sonraki iki izin komutunda `<SERVICE_PRINCIPAL_ID>` olarak kullanın.

1. Gönderici posta kutusu henüz mevcut değilse, öncelikle paylaşılan bir posta kutusu oluşturabilirsiniz, örneğin:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Posta göndermek için zaten bir posta kutunuz varsa bu adımı atlayabilirsiniz.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/17-Powershell-New-Mailbox.png)

1. Kiracı ve gönderici posta kutusu için `Authenticated SMTP` özelliğinin etkin olup olmadığını denetleyin.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Etkin değilse test e-postaları şu hatayla başarısız olabilir:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

Posta kutusu düzeyindeki ayar için gerekirse şunu çalıştırın:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Kiracı düzeyindeki ayar `True` döndürürse, kuruluş ilkenize göre şunu çalıştırmaya karar verin:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Yukarıdaki her iki ayar da doğru görünmesine rağmen aynı `535 5.7.139` hatası devam ederse, kiracının Microsoft Entra `Güvenlik varsayılanları`nı (Security defaults) kullanıp kullanmadığını da denetleyin. Microsoft Learn belgeleri, `Security defaults` etkinleştirildiğinde Exchange Online'da SMTP AUTH'un devre dışı bırakıldığını belirtir.

Komut ayrıntıları için Microsoft Learn sayfasına bakın: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. RustDesk'in posta göndermek için kullanacağı posta kutusuna Exchange hizmet sorumlusu için `FullAccess` (Tam Erişim) izni verin.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

RustDesk `Posta Hesabı` (Mail Account) alanına girmeyi planladığınız posta kutusunu kullanın.

Bu komut şuna benzer bir hata döndürürse:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

`-Identity` parametresine geçirilen değer Exchange Online'da gerçek bir posta kutusu nesnesine çözümlenememiş demektir.

Öncelikle posta kutusunun Exchange Online'da gerçekten var olduğunu doğrulayın:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Hiçbir posta kutusu döndürülmezse, önce bu posta kutusunu oluşturun veya doğrulayın. Bir `no-reply` gönderici adresi için paylaşılan bir posta kutusu oluşturabilirsiniz:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Posta kutusu zaten mevcutsa, `Add-MailboxPermission -Identity ...` komutunda kullandığınız değerin posta kutusunun gerçek adresi, takma adı veya çözümlenebilir başka bir posta kutusu kimliği olduğundan emin olun.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/18-Powershell-Add-MailboxPermission.png)

1. Aynı hizmet sorumlusuna `SendAs` (Farklı Gönder) izni verin.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Bu adım aynı zamanda Microsoft'un resmi yalnızca-uygulama (app-only) SMTP yapılandırmasının da bir parçasıdır.

### 3. RustDesk'te Yapılandırma

Bu noktada şunlara zaten sahip olmalısınız:

- `Kimden` (From) alanında kullanacağınız gönderici adresi
- `Posta Hesabı` (Mail Account) alanında kullanacağınız posta kutusu adresi
- `Dizin (kiracı) kimliği` (Directory (tenant) ID)
- `Uygulama (istemci) kimliği` (Application (client) ID)
- İstemci gizli anahtarı değeri (`Value`)
- `Posta Hesabı` için kullanılan posta kutusunda `FullAccess` ve `SendAs` izinlerine sahip olduğu onaylanmış bir Exchange Online hizmet sorumlusu

RustDesk, Exchange hizmet sorumlusu `Identity` değerini sormaz; ancak e-postayı test etmeden önce yukarıdaki izin adımlarının tamamlanmış olması gerekir.

1. RustDesk [web konsolunda](/docs/tr/self-host/rustdesk-server-pro/console/), **Ayarlar** -> **SMTP** bölümüne gidin.
1. OAuth2'yi etkinleştirin ve sağlayıcı olarak **Microsoft 365**'i seçin.
1. Şu alanları doldurun:

   - `Kimden` (From)
   - `Posta Hesabı` (Mail Account)
   - `OAuth2 Kiracı Kimliği` (OAuth2 Tenant ID)
   - `OAuth2 İstemci Kimliği` (OAuth2 Client ID)
   - `OAuth2 İstemci Gizli Anahtarı` (OAuth2 Client secret)

1. Yapılandırmayı kaydetmek ve bir test e-postası göndermek için **Kontrol Et** (Check) seçeneğine tıklayın.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

Test e-postası yine de başarısız olursa, PowerShell bölümüne dönün ve Exchange Online hizmet sorumlusunu, `Authenticated SMTP` ayarını ve `Mail Account` için kullanılan posta kutusu izinlerini yeniden kontrol edin.

## Kaynaklar

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Exchange Online uygulama izni ve hizmet sorumlusu adımları için kullanılmıştır.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). `Authenticated SMTP` denetimi ve etkinleştirilmesi için kullanılmıştır.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Paylaşılan posta kutusu oluşturmak için kullanılmıştır.
