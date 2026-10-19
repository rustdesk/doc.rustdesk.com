---
title: OIDC
weight: 16
description: "Kullanıcıların Google, Okta, Azure, GitHub, GitLab gibi kimlik sağlayıcılarla oturum açabilmesi için RustDesk Server Pro'da OpenID Connect yapılandırması."
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure giriş", "rustdesk okta giriş", "rustdesk github giriş"]
---

Kullanıcıların ayrı yerel kimlik bilgileri yerine mevcut bir kimlik sağlayıcıyla oturum açmasını sağlamak için RustDesk Server Pro'da OpenID Connect'i kullanın.

- `RustDesk Pro` hesabınızı kolayca oluşturmak ve oturum açmak için mevcut `Google`, `Okta`, `Facebook`, `Azure`, `GitHub`, `GitLab` vb. hesaplarınızı kullanın.
- Belirtim için [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html) belgesine bakın.

## RustDesk Server Pro'da OIDC nedir?

OIDC, RustDesk Server Pro'nun oturum açma işlemini harici bir kimlik sağlayıcıya devretmesini sağlar. Ayrı RustDesk parolalarını yönetmek yerine, kullanıcılar kimlik, erişim denetimi ve hesap yaşam döngüsü için halihazırda kullandığınız sağlayıcı ile kimlik doğrulaması yapar.

## Yerel hesaplar yerine OIDC'yi ne zaman kullanmalısınız?

- Zaten Azure, Okta, GitHub, GitLab, Google veya OIDC destekli başka bir sağlayıcı kullanıyorsanız
- Merkezi parola politikaları ve tek oturum açma (SSO) istiyorsanız
- Kullanıcı erişimini tek bir kimlik sisteminden devre dışı bırakmak veya sonlandırmak istiyorsanız
- RustDesk hesap oluşturma ve oturum açma süreçlerini mevcut kuruluş kimliğinize bağlamak istiyorsanız

## OIDC kurulum kontrol listesi

1. Kimlik sağlayıcınızda bir uygulama oluşturun.
2. İstemci kimliğini (client ID), istemci gizli anahtarını (client secret), yayıncı URL'sini (issuer URL) ve sağlayıcıya özel uç noktaları toplayın.
3. Sağlayıcı ayarlarını RustDesk Server Pro'ya ekleyin.
4. Geniş çapta sunmadan önce yönetici olmayan bir hesapla oturum açmayı test edin.

## Sağlayıcı örnekleri
{{% children depth="4" showhidden="true" %}}
