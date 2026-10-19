---
title: Azure
weight: 16
description: "RustDesk Server Pro için OpenID Connect sağlayıcısı olarak Microsoft Entra ID (Azure) yapılandırın. Azure Portal'da uygulama kaydı ve OIDC kurulum adımları."
keywords: ["rustdesk azure oidc", "rustdesk entra id", "rustdesk azure sso", "rustdesk oidc azure", "rustdesk server pro azure"]
---

RustDesk Server Pro'yu OpenID Connect ile Microsoft Entra ID'ye bağlamak için bu kılavuzu kullanın.

## Azure OIDC kurulumu ne yapar?

Bu kurulum, kullanıcıların OpenID Connect kullanarak Microsoft Entra ID hesaplarıyla RustDesk Server Pro'da oturum açmasını sağlar. Uygulamada RustDesk'i Azure'da bir uygulama olarak kaydeder, istemci kimlik bilgilerini RustDesk Pro'ya kopyalar ve RustDesk Pro'yu Entra kiracı yayıncı URL'nize yönlendirirsiniz.

## Azure OIDC kontrol listesi

- RustDesk Pro web konsolunu kullanmak istediğiniz nihai geri çağırma (callback) kaynağı üzerinden açın.
- Microsoft Entra ID'de bir uygulama kaydı oluşturun.
- Azure'daki `İstemci Kimliği`ni (Client ID) RustDesk Pro'ya kopyalayın.
- Bir istemci parolası (client secret) oluşturun ve gizli anahtar değerini hemen kaydedin.
- `Dizin (kiracı) Kimliği`niz (Directory tenant ID) ile yayıncı URL'sini oluşturun.

## Hangi Azure değerleri RustDesk Pro'ya girilir?

| RustDesk Pro alanı | Azure kaynağı |
| --- | --- |
| Geri Çağırma URL'si (Callback URL) | RustDesk Pro OIDC ayarları sayfasından kopyalayın |
| İstemci Kimliği (Client ID) | Azure uygulama genel bakışındaki `Uygulama (istemci) Kimliği` |
| İstemci Parolası (Client secret) | `Sertifikalar ve gizli diziler` altında oluşturulan gizli anahtar `Değeri` |
| Yayıncı (Issuer) | `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` |

## Video eğitimi

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Yapılandırma

1. [Azure portalında](https://portal.azure.com) oturum açın.
2. **Microsoft Entra ID** araması yapın ve seçin.
3. Sol menüde [**Uygulama kayıtları**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) bölümünü seçin, **Yeni kayıt**'a tıklayın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. RustDesk Pro konsolunu açın, **Ayarlar** sayfasında **OIDC** modülüne tıklayın. Ardından **Geri Çağırma URL'si**ni (Callback URL) kopyalayın. **Not**: **Geri Çağırma URL'si** düzenlenemez, `Path` kısmı `api/oidc/callback` olarak sabittir ve `Protokol://AnaMakine:Port` kısmı geçerli web sayfasının kaynağıdır. `http://localhost:8000/<yol>` adresi üzerinden açarsanız **Geri Çağırma URL'si** `http://localhost:8000/api/oidc/callback` olur. `https://192.168.0.1:8000/<yol>` adresi üzerinden açarsanız `https://192.168.0.1:8000/api/oidc/callback` olur. Azure `https://` veya `http://localhost` kullanmak zorunda olduğundan lütfen RustDesk Pro konsolunuzu açmak için uygun adresi seçin.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. **Ad**'ı girin, **Desteklenen hesap türleri**'ni seçin ve RustDesk Pro'dan aldığınız **Yönlendirme URI'si**ni yapıştırın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. RustDesk Pro'da **Yeni kimlik doğrulama sağlayıcısı**'na tıklayın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. Azure'da kullanmak istediğiniz uygulamayı seçin, **Genel Bakış**'a tıklayın ve **Uygulama (istemci) Kimliği**ni kopyalayın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. RustDesk Pro'da **İstemci Kimliği**ni (Client ID) yapıştırın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. Azure'da, **Sertifikalar ve gizli diziler** bölümünden yeni bir istemci parolası oluşturun.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. Azure'da istemci parolasının değerini kopyalayın. **Not**: Bu değer yalnızca ilk oluşturduğunuzda görünür. Sayfadan ayrıldıktan sonra tekrar görüntülenemez. Lütfen bu değeri güvenli bir şekilde saklayın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. RustDesk Pro'da istemci parolası alanına bu değeri yapıştırın.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. RustDesk Pro'da **Yayıncı** (Issuer) alanını `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` şeklinde doldurun. Lütfen `Directory (tenant) ID` kısmını kendi **Dizin (kiracı) Kimliği**nizle değiştirin. **Dizin (kiracı) Kimliği**, Azure'ın uygulama **Genel Bakış** panelinde yer alır.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)

## Referanslar

- [Set up an OpenID Connect provider with Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
